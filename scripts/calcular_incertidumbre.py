#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Calcula la incertidumbre de cada predio y la escribe en los datos.

No descarga nada: trabaja sobre `data/series_ndvi.json` y `data/predios.json` que
ya estan en disco. Se puede correr las veces que haga falta y da lo mismo, porque
las semillas del remuestreo son fijas.

    python3 scripts/calcular_incertidumbre.py            # muestra el informe
    python3 scripts/calcular_incertidumbre.py --escribir # ademas guarda los campos

QUE AGREGA A CADA PREDIO
    amplitud_ic95              intervalo de la amplitud historica (bloques moviles)
    amplitud_reciente_ic95     lo mismo para la ventana de 24 meses
    area_ic95                  intervalo de Wilson sobre las 16 celdas
    area_techo_cruza_umbral    si el techo del intervalo pasa el 50% de la causal
    prob_falso_negativo        prob. de no ver un ciclo real dada la cobertura
    margenes                   cuanto le falta a cada cifra para cruzar su umbral
"""

import json
import os
import sys
import collections

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(RAIZ, "scripts"))

import estadistica as est
from ingesta_sentinel import amplitud as amplitud_serie

DATA = os.path.join(RAIZ, "data")

UMBRAL_AREA = 0.50          # causal 2: area detectada bajo el 50% de la declarada
UMBRAL_PERDIDA = 40.0       # perennes: perdida de amplitud que activa la causal
UMBRAL_COBERTURA = 12       # meses medidos minimos en la ventana de 24
UMBRAL_AMPLITUD = 0.12      # piso del detector de ciclos


def medidos(serie):
    return [p["ndvi"] for p in serie["puntos"] if not p["interpolado"]]


def medidos_24m(serie):
    return [p["ndvi"] for p in serie["puntos"]
            if not p["interpolado"] and p["fecha"] >= "2024-01"]


def calcular(pid, predio, serie):
    hist = [p["ndvi"] if not p["interpolado"] else None
            for p in serie["puntos"] if p["fecha"] < "2024-01"]
    rec = [p["ndvi"] if not p["interpolado"] else None
           for p in serie["puntos"] if p["fecha"] >= "2024-01"]

    ic_hist = est.intervalo_bloques(hist, amplitud_serie) or est.intervalo_bootstrap(hist, amplitud_serie)
    ic_rec = est.intervalo_bootstrap(rec, amplitud_serie)

    med = predio.get("medicion_area") or {}
    ag, tot = med.get("celdas_agricolas"), med.get("celdas_evaluadas")
    ic_area = est.wilson(ag, tot) if tot else None

    m24 = serie.get("cobertura_24m_medidos", 24)
    pfn = est.prob_ciclo_invisible(m24)

    fraccion = (ag / float(tot)) if tot else None
    margenes = {}
    if fraccion is not None:
        margenes["area_vs_50pct"] = est.margen_al_umbral(fraccion, UMBRAL_AREA)
    margenes["cobertura_vs_12m"] = est.margen_al_umbral(float(m24), float(UMBRAL_COBERTURA))
    if predio["tipo_cultivo"] == "perenne":
        margenes["perdida_vs_40pct"] = est.margen_al_umbral(
            serie["perdida_amplitud_pct"], UMBRAL_PERDIDA, mayor_es_peor=True)
    margenes["amplitud_vs_piso"] = est.margen_al_umbral(
        serie["amplitud_historica"], UMBRAL_AMPLITUD)

    return collections.OrderedDict([
        ("amplitud_ic95", list(ic_hist) if ic_hist else None),
        ("amplitud_reciente_ic95", list(ic_rec) if ic_rec else None),
        ("area_ic95", list(ic_area) if ic_area else None),
        ("area_techo_cruza_umbral", bool(ic_area and ic_area[1] >= UMBRAL_AREA)),
        ("prob_falso_negativo", pfn),
        ("margenes", margenes),
        ("nota", "Intervalos al 95%. La amplitud usa bootstrap por bloques móviles "
                 "de 4 meses, que respeta la dependencia temporal de la serie. El "
                 "área usa el intervalo de Wilson sobre las celdas de la rejilla. "
                 "La probabilidad de falso negativo simula ciclos reales de 5 meses "
                 "contra la cobertura observada."),
    ])


def main():
    escribir = "--escribir" in sys.argv

    with open(os.path.join(DATA, "predios.json"), encoding="utf-8") as f:
        doc = json.load(f, object_pairs_hook=collections.OrderedDict)
    with open(os.path.join(DATA, "series_ndvi.json"), encoding="utf-8") as f:
        series = json.load(f, object_pairs_hook=collections.OrderedDict)

    print("INCERTIDUMBRE POR PREDIO\n")
    print("%-24s %-20s %-22s %-9s %s"
          % ("predio", "amplitud hist IC95", "área IC95", "P(falso-", "¿rechazo por área"))
    print("%-24s %-20s %-22s %-9s %s" % ("", "", "", "negativo)", "robusto?"))
    print("-" * 104)

    for p in doc["predios"]:
        pid = p["id"]
        s = series["series"].get(pid)
        if not s:
            continue
        r = calcular(pid, p, s)

        ic = r["amplitud_ic95"]
        ica = r["area_ic95"]
        frac = (p["medicion_area"]["celdas_agricolas"] /
                float(p["medicion_area"]["celdas_evaluadas"])) if p.get("medicion_area") else None

        if frac is not None and frac < UMBRAL_AREA:
            robusto = "NO — el techo pasa el 50%" if r["area_techo_cruza_umbral"] else "sí"
        else:
            robusto = "—  (no se rechaza por área)"

        print("%-24s %-20s %-22s %8.1f%%  %s"
              % (pid,
                 ("[%.3f, %.3f]" % tuple(ic)) if ic else "—",
                 ("[%.1f%%, %.1f%%]" % (ica[0] * 100, ica[1] * 100)) if ica else "—",
                 r["prob_falso_negativo"] * 100,
                 robusto))

        if escribir:
            s["incertidumbre"] = r

    if escribir:
        with open(os.path.join(DATA, "series_ndvi.json"), "w", encoding="utf-8") as f:
            json.dump(series, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print("\nseries_ndvi.json actualizado con el bloque `incertidumbre`.")

    print("\n\nCURVA QUE SUSTENTA EL UMBRAL DE COBERTURA")
    print("Probabilidad de declarar inactivo un predio que SÍ produjo:\n")
    for m, prob in est.curva_cobertura():
        marca = "   ← umbral vigente" if m == UMBRAL_COBERTURA else ""
        print("   %2d/24 meses medidos   %5.1f%%%s" % (m, prob * 100, marca))


if __name__ == "__main__":
    main()
