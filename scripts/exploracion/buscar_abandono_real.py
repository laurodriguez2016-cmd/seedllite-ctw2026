#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Barrido de abandono con el detector de PRODUCCION.

Los dos barridos anteriores (`buscar_abandono.py`, `buscar_abandono_transitorio.py`)
puntuaban con una version simplificada del detector y por eso devolvieron veinte
falsos positivos primero y cero hallazgos despues: el umbral estaba calibrado
contra una metrica que el pipeline real no usa. Este barrido llama directamente
a `scripts/ingesta_sentinel.py`, de modo que **una candidata que aparece aqui ya
esta verificada** — no hay que volver a comprobarla.

    python3 scripts/exploracion/buscar_abandono_real.py espinal

Zonas: espinal, saldana, villavo (arroz) · ventaquemada (papa) · granada (cacao).

La firma que busca, y por que cada condicion esta:

    ciclos >= 6          ciclaba de verdad, no es ruido de nubes
    ciclos_24m == 0      dejo de ciclar
    amplitud_hist >= 0.30 la amplitud vieja era real, no un temblor
    perdida >= 25%       y de verdad perdio su propio ritmo
    pico >= 0.55         el verde SIGUE AHI — esto es lo que lo distingue de
                         un lote de tierra pelada, y es el matiz que el
                         producto entero existe para leer

Un predio abandonado no tiene NDVI bajo: se llena de rastrojo. Lo que
desaparece es el patron. Por eso la ultima condicion no es opcional.
"""

import json
import os
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(RAIZ, "scripts"))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import ingesta_sentinel as ing
from evaluar_candidato import evaluar

# lat, lon, hectareas, radio en grados, paso en grados
ZONAS = {
    "espinal":      (4.1789, -74.8836, 6.0, 0.09, 0.015),
    "saldana":      (3.9300, -75.0200, 6.0, 0.09, 0.015),
    "villavo":      (4.0500, -73.2000, 6.0, 0.09, 0.015),
    "ventaquemada": (5.3672, -73.5118, 1.8, 0.06, 0.010),
    "granada":      (3.5421, -73.7059, 4.0, 0.06, 0.013),
}


def es_abandono(r):
    return (r["ciclos"] >= 6
            and r["ciclos_24m"] == 0
            and r["amp_hist"] >= 0.30
            and r["perdida_pct"] >= 25.0
            and r["pico"] >= 0.55)


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in ZONAS:
        raise SystemExit("Zonas: %s" % ", ".join(sorted(ZONAS)))

    zona = sys.argv[1]
    lat0, lon0, ha, radio, paso = ZONAS[zona]

    rejilla = []
    n = int(radio / paso)
    for i in range(-n, n + 1):
        for j in range(-n, n + 1):
            rejilla.append((round(lat0 + i * paso, 4), round(lon0 + j * paso, 4)))

    token = ing.obtener_token()
    print("Barrido REAL sobre %s — %d puntos, %.1f ha cada uno"
          % (zona, len(rejilla), ha))
    sys.stdout.flush()

    hallazgos = []
    for k, (lat, lon) in enumerate(rejilla, 1):
        try:
            r = evaluar(token, lat, lon, ha)
        except SystemExit:
            continue        # sin un solo mes valido: no es una parcela
        except Exception as e:
            print("  (%.4f, %.4f) error: %s" % (lat, lon, e))
            sys.stdout.flush()
            continue

        if es_abandono(r):
            hallazgos.append({"lat": lat, "lon": lon, **r})
            print("  ✓ (%.4f, %.4f)  %d/%d meses · ciclos %d → 0 en 24m · "
                  "amp %.3f → %.3f (−%.1f%%) · pico %.2f"
                  % (lat, lon, r["medidos"], r["totales"], r["ciclos"],
                     r["amp_hist"], r["amp_rec"], r["perdida_pct"], r["pico"]))
            sys.stdout.flush()

        if k % 25 == 0:
            print("  ... %d/%d revisados, %d hallazgos" % (k, len(rejilla), len(hallazgos)))
            sys.stdout.flush()

    salida = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                          "abandono_real_%s.json" % zona)
    with open(salida, "w", encoding="utf-8") as f:
        json.dump(hallazgos, f, ensure_ascii=False, indent=2)

    print("\n=== %d PARCELAS CON FIRMA DE ABANDONO en %s ===" % (len(hallazgos), zona))
    if hallazgos:
        mejor = max(hallazgos, key=lambda h: h["perdida_pct"])
        print("mejor: (%.4f, %.4f) — pierde %.1f%% de su ritmo conservando pico %.2f"
              % (mejor["lat"], mejor["lon"], mejor["perdida_pct"], mejor["pico"]))
    sys.stdout.flush()


if __name__ == "__main__":
    main()
