#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Busca un poligono donde el area con actividad agricola sea MUY menor que el area
que lo encierra: la firma del area declarada inflada.

POR QUE ESTA BUSQUEDA Y NO OTRA
-------------------------------
El demo necesita un caso de rechazo. Se intentaron dos vias y las dos murieron
contra el dato:

1. Cacaotal abandonado (`buscar_abandono.py`): 20 candidatos, todos ruido de nube.
2. Transitorio que dejo de ciclar (`buscar_abandono_transitorio.py` y
   `buscar_abandono_real.py`): 4 zonas barridas. Los dos unicos candidatos que
   pasaron el detector de produccion resultaron ser parcelas con la mitad de los
   ultimos 24 meses sin observacion optica. La amplitud no colapso: la borro la
   nubosidad.

**El hallazgo de fondo es que en el tropico andino la firma de abandono y la firma
de nubosidad son la misma cosa.** Una serie aplanada puede significar "dejo de
producir" o "no pudimos ver". Ninguna busqueda por forma de la serie puede separar
las dos, y por eso `criterios-de-credito.md` ahora exige 12 meses medidos en la
ventana de 24 antes de dejar operar la causal.

La causal 2 no tiene ese problema. El area con actividad agricola se mide sobre
NUEVE ANOS, no sobre una ventana de dos: la nubosidad se promedia y deja de
confundir. Y es una causal que existe en el reglamento real, no una que inventamos.

    python3 scripts/exploracion/buscar_area_inflada.py granada

Un hallazgo aqui es un predio donde una parte sustancial del poligono declarado es
bosque, rastrojo permanente o agua — verde, pero sin dinamica de manejo.
"""

import json
import os
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(RAIZ, "scripts"))

import ingesta_sentinel as ing
from medir_area import celdas, clasificar

# lat, lon, hectareas declaradas, radio en grados, paso en grados
ZONAS = {
    "granada":      (3.5421, -73.7059, 4.0, 0.05, 0.025),
    "ventaquemada": (5.3672, -73.5118, 1.8, 0.04, 0.020),
    "pitalito":     (1.8834, -76.0621, 2.4, 0.04, 0.020),
}

# La causal exige menos del 50%. Se busca con margen para abajo: un caso al 48%
# es tecnicamente valido pero se discute; uno al 35% no se discute.
OBJETIVO_MAX = 0.55
OBJETIVO_MIN = 0.15      # por debajo de esto ya no es un predio, es otra cosa


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in ZONAS:
        raise SystemExit("Zonas: %s" % ", ".join(sorted(ZONAS)))

    zona = sys.argv[1]
    lat0, lon0, ha, radio, paso = ZONAS[zona]

    centros = []
    n = int(radio / paso)
    for i in range(-n, n + 1):
        for j in range(-n, n + 1):
            centros.append((round(lat0 + i * paso, 4), round(lon0 + j * paso, 4)))

    token = ing.obtener_token()
    print("Buscando area inflada en %s — %d poligonos de %.1f ha, rejilla 4x4 cada uno"
          % (zona, len(centros), ha))
    sys.stdout.flush()

    hallazgos = []
    for k, (lat, lon) in enumerate(centros, 1):
        agricolas, evaluadas = 0, 0
        for clat, clon, area_celda in celdas(lat, lon, ha):
            try:
                es, _, _ = clasificar(token, clat, clon, area_celda)
            except Exception:
                continue
            if es is None:
                continue
            evaluadas += 1
            if es:
                agricolas += 1

        if evaluadas < 12:          # muy pocas celdas utiles: no concluye nada
            continue

        fraccion = agricolas / float(evaluadas)
        marca = ""
        if OBJETIVO_MIN <= fraccion <= OBJETIVO_MAX:
            hallazgos.append({"lat": lat, "lon": lon, "fraccion": round(fraccion, 3),
                              "celdas_agricolas": agricolas, "celdas_evaluadas": evaluadas,
                              "area_detectada_ha": round(ha * fraccion, 2),
                              "area_declarada_ha": ha})
            marca = "◀ AREA INFLADA"

        print("  (%.4f, %.4f)  %2d/%2d celdas agricolas  %.0f%%  %s"
              % (lat, lon, agricolas, evaluadas, 100 * fraccion, marca))
        sys.stdout.flush()

    salida = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                          "area_inflada_%s.json" % zona)
    with open(salida, "w", encoding="utf-8") as f:
        json.dump(hallazgos, f, ensure_ascii=False, indent=2)

    print("\n=== %d POLIGONOS CON AREA INFLADA en %s ===" % (len(hallazgos), zona))
    if hallazgos:
        # El mejor caso didactico no es el mas extremo, es el mas claramente por
        # debajo del 50% sin ser un absurdo: se ve en la imagen y no se discute.
        mejor = min(hallazgos, key=lambda h: abs(h["fraccion"] - 0.35))
        print("mejor: (%.4f, %.4f) — %.2f ha detectadas de %.1f declaradas (%.0f%%)"
              % (mejor["lat"], mejor["lon"], mejor["area_detectada_ha"],
                 mejor["area_declarada_ha"], 100 * mejor["fraccion"]))
    sys.stdout.flush()


if __name__ == "__main__":
    main()
