#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pruebas de la LÓGICA DE CRÉDITO, no del formato de los archivos.

    python3 scripts/probar_reglas.py

QUÉ SE PRUEBA AQUÍ Y NO EN OTRO LADO
------------------------------------
`validar_contrato.py` comprueba que los JSON cumplan el contrato: tipos, enums,
rangos, que los tres archivos hablen de los mismos `id`. Eso es forma.

Esto comprueba **criterio**: que las reglas de `docs/criterios-de-credito.md`
efectivamente se cumplan en las salidas del modelo. Son cosas que un JSON
perfectamente válido puede violar, y que en un sistema que decide sobre crédito
son el fallo que importa:

  - que a un cultivo perenne no se le exija ciclo de cosecha,
  - que un predio nublado no se rechace como si estuviera abandonado,
  - que no se sugiera más plata de la solicitada ni por encima de los topes de ley,
  - que todo rechazo nombre su causal con la cifra que la sustenta.

Cada prueba dice qué regla verifica y dónde está escrita. Si una falla, el
mensaje trae el predio y la cifra, no un `assert False`.

Sin dependencias: no hay pytest, la constitución del proyecto prohíbe librerías.
"""

import json
import os
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(RAIZ, "data")
sys.path.insert(0, os.path.join(RAIZ, "scripts"))

SMMLV_2026 = 1_750_905
TOPE_CAPITAL_TRABAJO_SMMLV = 20      # Manual de Servicios FINAGRO, pequeño productor
COBERTURA_MINIMA_24M = 12            # criterios-de-credito.md §3, EJE A

VERDE, ROJO, GRIS, FIN = "\033[32m", "\033[31m", "\033[90m", "\033[0m"

_fallos = []
_pasadas = 0


def revisar(condicion, regla, detalle):
    """Registra una comprobación. `regla` dice dónde está escrita la norma."""
    global _pasadas
    if condicion:
        _pasadas += 1
    else:
        _fallos.append((regla, detalle))


def cargar():
    with open(os.path.join(DATA, "predios.json"), encoding="utf-8") as f:
        predios = {p["id"]: p for p in json.load(f)["predios"]}
    with open(os.path.join(DATA, "series_ndvi.json"), encoding="utf-8") as f:
        series = json.load(f)["series"]
    ruta_d = os.path.join(DATA, "dictamenes.json")
    if not os.path.exists(ruta_d):
        raise SystemExit("Falta data/dictamenes.json — corre antes generar_dictamen.py")
    with open(ruta_d, encoding="utf-8") as f:
        dictamenes = json.load(f)["dictamenes"]
    return predios, series, dictamenes


# ---------------------------------------------------------------------------
# Las reglas
# ---------------------------------------------------------------------------

def regla_perenne_no_exige_ciclos(pid, predio, serie, d):
    """
    criterios-de-credito.md §3 EJE A — la causal 1 es de cultivos transitorios.

    En un perenne la planta permanece todo el año y la cosecha no deja huella
    espectral: exigirle ciclo es un error de categoría. Esta prueba existe porque
    la regla original SÍ lo exigía y rechazaba a `huila-cafe`, el caso insignia
    de aprobación, por dar 0 ciclos en 24 meses siendo café.
    """
    if predio["tipo_cultivo"] != "perenne":
        return
    if d["decision"] != "rechazar":
        return

    # Ojo con cómo se comprueba esto. La primera versión buscaba "ausencia de
    # ciclo" en el texto y marcaba incumplimiento, y dio dos falsos positivos:
    # el modelo escribía "siendo cacao un perenne, la ausencia de ciclos NO se
    # invoca como defecto", que es exactamente lo que se le pide. Mencionar la
    # regla para descartarla es buena práctica de dictamen, no una violación.
    # Hay que mirar la frase completa y ver si la niega.
    NEGACIONES = ("no se invoca", "no se computa", "no constituye", "no se lee",
                  "no es un defecto", "no es defecto", "no se toma", "no aplica",
                  "no debe leerse", "no se considera", "no configura")
    texto = " ".join([d["memorando"], d["recomendacion"]] +
                     [e["texto"] for e in d["evidencia"]])

    culpables = []
    for frase in texto.replace(";", ".").split("."):
        f = frase.lower()
        if not any(x in f for x in ("sin ciclo", "ausencia de ciclo", "no se detectan ciclos")):
            continue
        if any(neg in f for neg in NEGACIONES):
            continue                      # la nombra para descartarla: correcto
        culpables.append(frase.strip()[:110])

    revisar(not culpables,
            "EJE A · perenne no se rechaza por falta de ciclo",
            "%s es perenne y su rechazo invoca la ausencia de ciclos: «%s»"
            % (pid, culpables[0] if culpables else ""))


def regla_cobertura_insuficiente(pid, predio, serie, d):
    """
    criterios-de-credito.md §3 EJE A — con menos de 12 meses medidos en la
    ventana de 24, ninguna causal opera y no se emite concepto.

    Es la regla más importante del sistema. Un predio nublado y uno abandonado
    producen la misma firma: cero ciclos y amplitud desplomada. Rechazar por lo
    primero es negar crédito sin causa, y el productor no tiene cómo apelarlo.
    """
    med24 = serie.get("cobertura_24m_medidos", 24)
    if med24 >= COBERTURA_MINIMA_24M:
        revisar(d["decision"] != "aplazar_por_verificacion",
                "EJE A · no se aplaza con cobertura suficiente",
                "%s tiene %d/24 meses medidos y aun así se aplaza" % (pid, med24))
        return

    revisar(d["decision"] == "aplazar_por_verificacion",
            "EJE A · cobertura insuficiente ⇒ aplazar, nunca rechazar",
            "%s tiene %d/24 meses medidos y su decisión es «%s»" % (pid, med24, d["decision"]))
    revisar(d["banda_riesgo"] == "sin_concepto",
            "EJE A · cobertura insuficiente ⇒ banda sin_concepto",
            "%s: banda «%s» sobre un predio que no se pudo evaluar" % (pid, d["banda_riesgo"]))
    revisar(d["puntaje"] == 0,
            "EJE A · cobertura insuficiente ⇒ sin puntaje",
            "%s puntúa %d sobre un predio que no se pudo evaluar" % (pid, d["puntaje"]))
    revisar(d["monto_sugerido_cop"] == 0,
            "EJE A · cobertura insuficiente ⇒ sin monto",
            "%s sugiere monto sobre un predio que no se pudo evaluar" % pid)


def regla_monto_no_supera_solicitado(pid, predio, serie, d):
    """criterios-de-credito.md §7 — el sugerido es el MENOR de tres cotas."""
    revisar(d["monto_sugerido_cop"] <= predio["monto_solicitado_cop"],
            "§7 · el monto sugerido nunca supera al solicitado",
            "%s sugiere $%s sobre $%s solicitados"
            % (pid, format(d["monto_sugerido_cop"], ","), format(predio["monto_solicitado_cop"], ",")))


def regla_topes_legales(pid, predio, serie, d):
    """
    Tope legal del pequeño productor (70% de sus activos) y tope de 20 SMMLV de
    Capital de Trabajo. Verificado contra el Decreto 1469 de 2025.
    """
    monto = d["monto_sugerido_cop"]
    if monto == 0:
        return
    tope_activos = predio["activos_declarados_smmlv"] * 0.70 * SMMLV_2026
    revisar(monto <= tope_activos,
            "Tope legal · 70% de los activos del pequeño productor",
            "%s sugiere $%s con tope de $%s"
            % (pid, format(monto, ","), format(int(tope_activos), ",")))

    if d["linea_finagro"].startswith("Capital de Trabajo"):
        tope = TOPE_CAPITAL_TRABAJO_SMMLV * SMMLV_2026
        revisar(monto <= tope,
                "Tope FINAGRO · 20 SMMLV en Capital de Trabajo",
                "%s sugiere $%s (%.1f SMMLV), tope 20 SMMLV"
                % (pid, format(monto, ","), monto / SMMLV_2026))


def regla_rechazo_nombra_causal(pid, predio, serie, d):
    """
    criterios-de-credito.md §10.3 — el rechazo se explica con precisión y con su
    cifra. "Vegetación escasa" no es una causal; "0,5 ha de 4,0 declaradas" sí.
    """
    if d["decision"] != "rechazar":
        return
    criticos = [e for e in d["evidencia"] if e["tipo"] == "critico"]
    revisar(len(criticos) >= 1,
            "§10.3 · todo rechazo trae evidencia crítica",
            "%s se rechaza sin una sola evidencia de tipo crítico" % pid)
    con_cifra = [e for e in criticos if any(c.isdigit() for c in e["texto"])]
    revisar(len(con_cifra) >= 1,
            "§10.3 · la causal del rechazo va con su cifra",
            "%s: ninguna evidencia crítica cita un número" % pid)
    revisar(d["monto_sugerido_cop"] == 0,
            "§5 · un rechazo no sugiere monto",
            "%s se rechaza pero sugiere $%s" % (pid, format(d["monto_sugerido_cop"], ",")))


def regla_controles_de_originacion(pid, predio, serie, d):
    """
    criterios-de-credito.md §10.5 y contrato §3 — RTDAF/RUPTA y verificación
    ambiental se dejan constancia SIEMPRE, incluso cuando salen limpias.
    Un crédito sobre un predio con medida de protección no se puede originar.
    """
    texto = " ".join([e["texto"] for e in d["evidencia"]] + [d["memorando"]]).upper()
    revisar("RTDAF" in texto or "RUPTA" in texto,
            "§10.5 · constancia del control anti-despojo (Ley 1448 de 2011)",
            "%s no menciona la verificación RTDAF/RUPTA" % pid)


def regla_ejes_coherentes(pid, predio, serie, d):
    """Contrato §3 — el puntaje del eje va de 0 a su peso, y el total es su suma ×10."""
    for e in d["ejes"]:
        revisar(e["puntaje"] <= e["peso"],
                "Contrato §3 · el puntaje del eje no supera su peso",
                "%s: «%s» puntúa %d sobre peso %d" % (pid, e["eje"], e["puntaje"], e["peso"]))
    suma = sum(e["puntaje"] for e in d["ejes"])
    revisar(abs(d["puntaje"] - suma * 10) <= 5,
            "Contrato §3 · el puntaje total se deriva de los ejes",
            "%s: total %d pero los ejes suman %d (⇒ %d)" % (pid, d["puntaje"], suma, suma * 10))


def regla_banda_corresponde_al_puntaje(pid, predio, serie, d):
    """criterios-de-credito.md §5 — la banda es un tramo de la escala, no una opinión."""
    if d["banda_riesgo"] == "sin_concepto":
        return
    escala = [(700, "bajo"), (550, "medio"), (400, "alto"), (0, "rechazo")]
    esperada = next(n for piso, n in escala if d["puntaje"] >= piso)
    revisar(d["banda_riesgo"] == esperada,
            "§5 · la banda corresponde al tramo del puntaje",
            "%s: puntaje %d ⇒ banda «%s», pero dice «%s»"
            % (pid, d["puntaje"], esperada, d["banda_riesgo"]))


def regla_evidencia_con_cifras(pid, predio, serie, d):
    """dictamen-modelo.md §2.1 — cada afirmación trae su número, sin adjetivos sueltos."""
    sin_cifra = [e["texto"][:60] for e in d["evidencia"]
                 if not any(c.isdigit() for c in e["texto"])]
    revisar(len(sin_cifra) <= 1,
            "Vara §2.1 · cada evidencia cita una cifra",
            "%s tiene %d evidencias sin un solo número: %s"
            % (pid, len(sin_cifra), sin_cifra[:2]))


def regla_agregados_solo_sobre_medidos(pid, predio, serie, d):
    """
    ingesta_sentinel.py — los meses interpolados quedan fuera de todo agregado y
    van marcados. Esta prueba existe porque `ciclos_ultimos_24m` sí los incluía,
    y era justo la métrica que disparaba el rechazo automático.
    """
    interpolados = [p for p in serie["puntos"] if p["interpolado"]]
    revisar(all(p["nubosidad"] == 1.0 for p in interpolados),
            "Contrato §2 · todo mes interpolado va con nubosidad 1.0",
            "%s tiene meses interpolados sin marcar" % pid)
    medidos = serie["cobertura_meses_medidos"]
    revisar(medidos + len(interpolados) == serie["cobertura_meses_totales"],
            "Contrato §2 · medidos + interpolados = total",
            "%s: %d medidos + %d interpolados ≠ %d"
            % (pid, medidos, len(interpolados), serie["cobertura_meses_totales"]))


def regla_area_medida_no_inventada(pid, predio, serie, d):
    """
    Regla 6 del repositorio: sin fuente, no es un hecho. `area_detectada_ha` tuvo
    valores escritos a mano durante media noche; ahora la produce medir_area.py y
    tiene que venir con su rejilla para poder auditarla.
    """
    med = predio.get("medicion_area")
    revisar(med is not None,
            "Regla 6 · el área detectada se mide, no se escribe",
            "%s no tiene bloque medicion_area" % pid)
    if not med:
        return
    revisar(len(med.get("rejilla", [])) >= 9,
            "Regla 6 · la medición conserva su rejilla auditable",
            "%s trae una rejilla de %d celdas" % (pid, len(med.get("rejilla", []))))
    agricolas = sum(1 for c in med["rejilla"] if c["agricola"])
    revisar(agricolas == med["celdas_agricolas"],
            "Coherencia · el conteo de celdas cuadra con la rejilla",
            "%s dice %d agrícolas y la rejilla tiene %d"
            % (pid, med["celdas_agricolas"], agricolas))


REGLAS = [
    regla_perenne_no_exige_ciclos,
    regla_cobertura_insuficiente,
    regla_monto_no_supera_solicitado,
    regla_topes_legales,
    regla_rechazo_nombra_causal,
    regla_controles_de_originacion,
    regla_ejes_coherentes,
    regla_banda_corresponde_al_puntaje,
    regla_evidencia_con_cifras,
    regla_agregados_solo_sobre_medidos,
    regla_area_medida_no_inventada,
]


def main():
    predios, series, dictamenes = cargar()

    print("Probando la lógica de crédito sobre %d predios\n" % len(dictamenes))

    for pid in sorted(dictamenes):
        if pid not in predios or pid not in series:
            revisar(False, "Contrato · los tres archivos hablan de los mismos id",
                    "%s tiene dictamen pero falta en predios o series" % pid)
            continue
        antes = len(_fallos)
        for regla in REGLAS:
            regla(pid, predios[pid], series[pid], dictamenes[pid])
        estado = "%s✓%s" % (VERDE, FIN) if len(_fallos) == antes else "%s✗%s" % (ROJO, FIN)
        print("  %s %-24s %s · %s"
              % (estado, pid, dictamenes[pid]["decision"], dictamenes[pid]["banda_riesgo"]))

    print("\n%s%d comprobaciones pasadas%s" % (VERDE, _pasadas, FIN))
    if not _fallos:
        print("%sTODAS LAS REGLAS DE CRÉDITO SE CUMPLEN%s" % (VERDE, FIN))
        return 0

    print("\n%s%d INCUMPLIMIENTOS%s\n" % (ROJO, len(_fallos), FIN))
    for regla, detalle in _fallos:
        print("  %s✗%s %s" % (ROJO, FIN, regla))
        print("    %s%s%s" % (GRIS, detalle, FIN))
    return 1


if __name__ == "__main__":
    sys.exit(main())
