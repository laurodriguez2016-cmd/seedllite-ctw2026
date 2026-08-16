#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mide el area con actividad agricola detectable dentro del poligono declarado.

POR QUE EXISTE
--------------
`area_detectada_ha` venia escrita a mano en `predios.json`. Ningun script la
calculaba. Eso es un problema serio y no cosmetico: el ajuste del monto sugerido
—`solicitado x (area detectada / area declarada)`— es el argumento comercial del
producto, y estaba apoyado en un numero sin fuente. La regla 6 del repositorio es
"sin fuente, no es un hecho", y esto la incumplia.

Ademas, `meta-cacao` declaraba `area_detectada_ha: 0.0` sobre un poligono cuyo
NDVI pico es 0,87. Decir "cero hectareas detectadas" sobre tierra visiblemente
verde no sobrevive a la primera pregunta de un jurado.

COMO SE MIDE
------------
El poligono declarado se parte en una rejilla de 4x4 y se descarga la serie
mensual completa de cada celda. Una celda cuenta como agricola si cumple LAS DOS:

  1. Esta vegetada           mediana de NDVI sobre meses medidos >= 0,30
  2. Tiene dinamica de manejo amplitud observada (p90-p10) >= 0,12

El segundo criterio es el que hace el trabajo, y es el mismo umbral que usa
`contar_ciclos()` en el pipeline: por debajo de 0,12 la serie esta aplanada y no
hay ciclo que contar. Una celda de bosque o de rastrojo pasa el primer criterio
—esta verde— y falla el segundo. Una celda de suelo desnudo falla el primero.
Solo la tierra que se siembra y se cosecha pasa los dos.

    area_detectada = (celdas agricolas / celdas totales) x area_declarada

Es una medida de PROPORCION, no de geometria: no delimita linderos, estima que
fraccion del predio declarado muestra actividad. La delimitacion catastral no le
corresponde a un satelite, le corresponde al IGAC.

    python3 scripts/medir_area.py                 # los cuatro predios
    python3 scripts/medir_area.py meta-cacao      # uno solo
    python3 scripts/medir_area.py --escribir      # ademas actualiza predios.json
"""

import json
import math
import os
import sys
import collections

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(RAIZ, "scripts"))

import ingesta_sentinel as ing

DATA = os.path.join(RAIZ, "data")
REJILLA = 4                      # 4x4 = 16 celdas por predio
NDVI_VEGETADA = 0.30
AMPLITUD_MANEJO = 0.12           # el mismo piso que usa contar_ciclos()


def celdas(lat, lon, area_ha, n=REJILLA):
    """Centros de una rejilla n x n sobre el cuadrado declarado."""
    lado_m = math.sqrt(area_ha * 10000.0)
    lado_celda = lado_m / n
    # A esta latitud un grado de longitud se acorta por el coseno; ignorarlo
    # deforma la rejilla y mide celdas que caen fuera del predio.
    dlat = lado_celda / 111320.0
    dlon = lado_celda / (111320.0 * math.cos(math.radians(lat)))

    salida = []
    for i in range(n):
        for j in range(n):
            off_i = (i - (n - 1) / 2.0)
            off_j = (j - (n - 1) / 2.0)
            salida.append((round(lat + off_i * dlat, 6),
                           round(lon + off_j * dlon, 6),
                           (area_ha / (n * n))))
    return salida


def mediana(v):
    v = sorted(v)
    return v[len(v) // 2] if v else 0.0


def clasificar(token, lat, lon, area_celda_ha):
    """¿Esta celda muestra actividad agricola? Devuelve (agricola, ndvi, amp)."""
    filas = ing.pedir_serie(token, lat, lon, area_celda_ha)
    medidos = [v for _, v, _ in filas if v is not None]
    if len(medidos) < 12:
        return None, None, None          # sin dato suficiente: no se cuenta ni a favor ni en contra

    puntos = ing.rellenar(filas)
    amp = ing.amplitud([p["ndvi"] if not p["interpolado"] else None for p in puntos])
    med = mediana(medidos)
    return (med >= NDVI_VEGETADA and amp >= AMPLITUD_MANEJO), med, amp


def medir(token, predio):
    lat = predio["coordenadas"]["lat"]
    lon = predio["coordenadas"]["lon"]
    declarada = predio["area_declarada_ha"]

    agricolas, evaluadas = 0, 0
    rejilla = []
    for clat, clon, area_celda in celdas(lat, lon, declarada):
        es, med, amp = clasificar(token, clat, clon, area_celda)
        if es is None:
            continue
        evaluadas += 1
        if es:
            agricolas += 1
        # Se guarda celda por celda: es lo que `capturar_predio.py` dibuja encima
        # de la imagen satelital. Sin esto, la medicion es un numero que hay que
        # creer; con esto, es un numero que se puede ver sobre la foto.
        rejilla.append({"lat": clat, "lon": clon, "ndvi_mediana": round(med, 2),
                        "amplitud": round(amp, 3), "agricola": bool(es)})
        sys.stdout.write("    celda (%.5f, %.5f)  ndvi %.2f  amp %.3f  %s\n"
                         % (clat, clon, med, amp, "AGRICOLA" if es else "—"))
        sys.stdout.flush()

    if not evaluadas:
        raise SystemExit("Ninguna celda de %s devolvio dato utilizable" % predio["id"])

    fraccion = agricolas / float(evaluadas)
    return {
        "celdas_agricolas": agricolas,
        "celdas_evaluadas": evaluadas,
        "fraccion": round(fraccion, 3),
        "area_detectada_ha": round(declarada * fraccion, 2),
        "area_declarada_ha": declarada,
        "rejilla": rejilla,
    }


def main():
    escribir = "--escribir" in sys.argv
    ids = [a for a in sys.argv[1:] if not a.startswith("--")]

    with open(os.path.join(DATA, "predios.json"), encoding="utf-8") as f:
        doc = json.load(f, object_pairs_hook=collections.OrderedDict)

    seleccion = [p for p in doc["predios"] if not ids or p["id"] in ids]
    token = ing.obtener_token()
    print("Copernicus Data Space · token OK · rejilla %dx%d por predio\n"
          % (REJILLA, REJILLA))

    resultados = {}
    for predio in seleccion:
        print("· %s — %.1f ha declaradas" % (predio["id"], predio["area_declarada_ha"]))
        r = medir(token, predio)
        resultados[predio["id"]] = r
        pct = 100.0 * r["fraccion"]
        print("  → %d/%d celdas agricolas · %.2f ha detectadas de %.1f declaradas (%.0f%%)\n"
              % (r["celdas_agricolas"], r["celdas_evaluadas"],
                 r["area_detectada_ha"], r["area_declarada_ha"], pct))

        if r["fraccion"] < 0.50:
            print("  ⚠ CAUSAL 2: area detectada por debajo del 50%% de la declarada\n")

        if escribir:
            predio["area_detectada_ha"] = r["area_detectada_ha"]
            predio["medicion_area"] = {
                "metodo": "rejilla %dx%d sobre el polígono declarado" % (REJILLA, REJILLA),
                "celdas_agricolas": r["celdas_agricolas"],
                "celdas_evaluadas": r["celdas_evaluadas"],
                "umbral_ndvi_vegetada": NDVI_VEGETADA,
                "umbral_amplitud_manejo": AMPLITUD_MANEJO,
                "rejilla": r["rejilla"],
            }

    if escribir:
        doc["nota_area"] = (
            "area_detectada_ha se MIDE con scripts/medir_area.py: rejilla 4x4 sobre el "
            "poligono declarado, una serie NDVI real por celda, y se cuenta como agricola "
            "la celda vegetada (mediana >= 0.30) con dinamica de manejo (amplitud >= 0.12). "
            "Es una estimacion de proporcion, no una delimitacion de linderos.")
        with open(os.path.join(DATA, "predios.json"), "w", encoding="utf-8") as f:
            json.dump(doc, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print("predios.json actualizado con las areas medidas.")

    return resultados


if __name__ == "__main__":
    main()
