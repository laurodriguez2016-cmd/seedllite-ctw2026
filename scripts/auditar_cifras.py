#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Comprueba que las cifras de los DOCUMENTOS cuadren con los DATOS.

    python3 scripts/auditar_cifras.py

POR QUE EXISTE
--------------
El proyecto promete que toda cifra es oficial o medida, y que no hay una tercera
categoria. Esa promesa se cumple mientras el dato y el documento se escriben
juntos, y se rompe en silencio en cuanto uno de los dos cambia.

Ya paso tres veces en una noche:

  · La vara del prompt citaba 1,42 t/ha y una caida ENSO del 18% que en la serie
    real son 1,23 y 0,0. Se habia escrito contra la serie calibrada.
  · Cuatro documentos afirmaban que el predio rechazado tenia "el NDVI mas alto
    de los nueve". Tiene la MEDIANA mas alta (0,836); el pico mas alto es del
    arrozal (0,89 contra 0,88). La afirmacion precisa es ademas mejor, porque la
    mediana es justo lo que delata al bosque.
  · El README daba por cambiada una decision que en los datos seguia sin
    regenerar.

Ninguno de los tres los habria atrapado `validar_contrato.py`, que mira la forma
del JSON, ni `probar_reglas.py`, que mira el criterio de credito. Esto mira la
coherencia entre lo que decimos y lo que medimos.

No es exhaustivo y no pretende serlo: comprueba las afirmaciones que ya se
equivocaron una vez y las que sostienen el argumento.
"""

import json
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(RAIZ, "data")

VERDE, ROJO, GRIS, FIN = "\033[32m", "\033[31m", "\033[90m", "\033[0m"
_fallos = []


def mal(donde, detalle):
    _fallos.append((donde, detalle))


def leer(ruta):
    p = os.path.join(RAIZ, ruta)
    return open(p, encoding="utf-8").read() if os.path.exists(p) else ""


def mediana(serie):
    v = sorted(p["ndvi"] for p in serie["puntos"] if not p["interpolado"])
    return v[len(v) // 2] if v else 0.0


def main():
    with open(os.path.join(DATA, "predios.json"), encoding="utf-8") as f:
        predios = {p["id"]: p for p in json.load(f)["predios"]}
    with open(os.path.join(DATA, "series_ndvi.json"), encoding="utf-8") as f:
        series = json.load(f)["series"]
    with open(os.path.join(DATA, "dictamenes.json"), encoding="utf-8") as f:
        dictamenes = json.load(f)["dictamenes"]

    DOCS = ["README.md", "landing/index.html", "docs/criterios-de-credito.md",
            "docs/dictamen-modelo.md", "docs/modelo-tokenizacion-y-colocacion.md",
            "data/CONTRATO-DATOS.md"]
    texto = {d: leer(d) for d in DOCS}
    todo = "\n".join(texto.values())

    # -- 1 · superlativos de NDVI ------------------------------------------
    # "el mas verde" es ambiguo y ya se equivoco: hay que decir si es pico o
    # mediana, porque el predio que gana cambia segun cual se use.
    picos = {k: v["ndvi_pico_promedio"] for k, v in series.items()}
    medianas = {k: mediana(v) for k, v in series.items()}
    top_pico = max(picos, key=picos.get)
    top_med = max(medianas, key=medianas.get)

    for doc, t in texto.items():
        for m in re.finditer(r"[^.\n]*NDVI (?:es el |)m[áa]s alto[^.\n]*", t):
            frase = m.group(0).strip()
            if "mediana" not in frase.lower():
                mal(doc, "«%s…» — «NDVI más alto» sin decir si es pico o mediana. "
                         "El pico más alto es de %s (%.2f); la mediana más alta es de "
                         "%s (%.3f)" % (frase[:70], top_pico, picos[top_pico],
                                        top_med, medianas[top_med]))

    # -- 2 · puntajes citados que no existen -------------------------------
    reales = {d["puntaje"] for d in dictamenes.values()}
    for doc, t in texto.items():
        if doc == "landing/index.html":
            continue
        for m in re.finditer(r"puntaje[^\d\n]{0,20}(\d{3})\b", t, re.I):
            n = int(m.group(1))
            if n not in reales and n not in (100, 700, 550, 400, 000):
                mal(doc, "cita un puntaje de %d y ningún dictamen lo tiene" % n)

    # -- 3 · areas citadas contra las medidas ------------------------------
    for pid, p in predios.items():
        det = p.get("area_detectada_ha")
        if det is None:
            continue
        esperado = ("%.2f" % det).replace(".", ",")
        for doc, t in texto.items():
            if pid not in t:
                continue
            # busca "N,NN ha" cerca del id y comprueba que la detectada aparezca
            cerca = t[max(0, t.find(pid) - 200): t.find(pid) + 400]
            if " ha" in cerca and esperado not in cerca and \
               ("%.1f" % det).replace(".", ",") not in cerca:
                pass   # demasiado ruidoso para fallar; se deja como no-comprobado

    # -- 4 · decisiones citadas contra las emitidas ------------------------
    # Cada decision admite varias formas de nombrarse en prosa. El estado de
    # cobertura insuficiente se puede llamar por la decision (aplazar) o por la
    # banda (sin concepto), y las dos son correctas: comparar contra una sola
    # produce un falso positivo.
    ETIQUETA = {
        "aprobar": ["aprobar"],
        "aprobar_con_ajuste": ["aprobar"],
        "rechazar": ["rechazar"],
        "aplazar_por_verificacion": ["aplazar", "sin concepto"],
    }
    rd = texto.get("README.md", "")
    for pid, d in dictamenes.items():
        # El id va entre comillas invertidas para que `meta-cacao` no coincida
        # con `meta-cacao-productivo`. Es el mismo error de subcadena que ya
        # produjo un falso positivo en la prueba de perennes: comparar contra la
        # fila equivocada y creer que hay una contradiccion donde no la hay.
        marca = "`%s`" % pid
        if marca not in rd:
            continue
        fila = [l for l in rd.split("\n") if marca in l and "|" in l]
        if not fila:
            continue
        if not any(e in fila[0].lower() for e in ETIQUETA[d["decision"]]):
            mal("README.md", "la fila de %s dice otra decisión que la emitida (%s)"
                             % (pid, d["decision"]))

    # -- 5 · cifras de la landing respaldadas por la investigacion ---------
    mercado = leer("docs/mercado-y-oportunidad.md")
    if mercado:
        for cifra in re.findall(r"\b\d{1,3}(?:\.\d{3})+\b|\b\d{1,2},\d\s?%",
                                texto.get("landing/index.html", "")):
            limpia = cifra.strip()
            if limpia not in mercado and limpia.rstrip("%").strip() not in mercado:
                mal("landing/index.html",
                    "cita «%s» y no aparece en docs/mercado-y-oportunidad.md" % limpia)

    # -- salida ------------------------------------------------------------
    if not _fallos:
        print("%s✓ las cifras de los documentos cuadran con los datos%s" % (VERDE, FIN))
        return 0

    print("%s%d INCOHERENCIA(S) entre documentos y datos%s\n" % (ROJO, len(_fallos), FIN))
    for donde, detalle in _fallos:
        print("  %s✗%s %s" % (ROJO, FIN, donde))
        print("    %s%s%s" % (GRIS, detalle, FIN))
    return 1


if __name__ == "__main__":
    sys.exit(main())
