#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Evalua una coordenada candidata con EXACTAMENTE el mismo codigo del pipeline
de produccion (scripts/ingesta_sentinel.py). No reimplementa nada.

Existe porque los barridos de `buscar_parcelas.py` puntuan con una version
simplificada del detector, y una candidata solo cuenta como valida si sobrevive
al detector real: mediana movil de 3 meses, umbrales derivados de los
percentiles 10 y 90 observados, y piso de amplitud en 0,12.

    python3 scripts/exploracion/evaluar_candidato.py 3.5421 -73.7449 4.0

En lote, con un solo token para no golpear el endpoint de autenticacion:

    python3 scripts/exploracion/evaluar_candidato.py --area 1.8 \
        5.3772,-73.5018  5.3772,-73.4918  5.3472,-73.5018

Lee .env de la raiz del repositorio, igual que el pipeline.
"""

import os
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(RAIZ, "scripts"))

import ingesta_sentinel as ing


def evaluar(token, lat, lon, area_ha):
    filas = ing.pedir_serie(token, lat, lon, area_ha)
    medidos = sum(1 for _, v, _ in filas if v is not None)
    puntos = ing.rellenar(filas)

    # Los agregados se calculan solo sobre meses medidos: los interpolados
    # entran como None para que no inflen ningun conteo.
    valores_medidos = [p["ndvi"] if not p["interpolado"] else None for p in puntos]
    recientes = [p for p in puntos if p["fecha"] >= "2024-01"]
    perdida, a_hist, a_rec = ing.perdida_amplitud(puntos)

    # La cobertura de la ventana de 24 meses decide si la causal puede operar:
    # con menos de 12 meses medidos el sistema no rechaza, declara que no sabe.
    medidos_24m = sum(1 for p in recientes if not p["interpolado"])
    valores_24m = [p["ndvi"] if not p["interpolado"] else None for p in recientes]

    return {
        "medidos": medidos,
        "totales": len(puntos),
        "medidos_24m": medidos_24m,
        "ciclos": ing.contar_ciclos(valores_medidos),
        "ciclos_24m": ing.contar_ciclos(valores_24m, minimo=6),
        "pico": ing.pico_promedio(puntos),
        "amp_hist": a_hist,
        "amp_rec": a_rec,
        "perdida_pct": perdida,
        "caida_enso": ing.caida_enso(puntos),
    }


def firma_abandono(r):
    """Ciclaba de verdad, dejo de hacerlo, y NO perdio el verde."""
    return (r["ciclos"] >= 6 and r["ciclos_24m"] == 0
            and r["amp_hist"] >= 0.30 and r["pico"] >= 0.60)


def coordenadas(args):
    """Acepta `lat lon` suelto o una lista de pares `lat,lon`."""
    pares = [a for a in args if "," in a]
    if pares:
        return [tuple(float(x) for x in p.split(",")) for p in pares]
    return [(float(args[0]), float(args[1]))]


def main():
    args = [a for a in sys.argv[1:] if a != "--area"]
    if "--area" in sys.argv:
        i = sys.argv.index("--area")
        area = float(sys.argv[i + 1])
        args = [a for a in args if a != sys.argv[i + 1]]
    else:
        area = float(args[2]) if len(args) > 2 and "," not in args[0] else 4.0

    if not args:
        raise SystemExit(__doc__)

    puntos = coordenadas(args)

    # Un solo token para todo el lote: pedirlo por candidato golpea el endpoint
    # de autenticacion y lo tumba a mitad del barrido.
    token = ing.obtener_token()
    print("Copernicus Data Space · token OK · %.1f ha por lote\n" % area)

    hallazgos = []
    for lat, lon in puntos:
        try:
            r = evaluar(token, lat, lon, area)
        except SystemExit as e:
            print("  (%.4f, %.4f)  descartada: %s" % (lat, lon, e))
            continue

        if r["medidos_24m"] < 12:
            marca = "◀ COBERTURA INSUFICIENTE — el sistema no puede decidir"
        elif firma_abandono(r):
            marca = "◀ FIRMA DE ABANDONO"
        else:
            marca = ""
        print("  (%.4f, %.4f)  %d/%d meses (24m: %d/24) · ciclos %d → %d · "
              "amp %.3f → %.3f (−%.1f%%) · pico %.2f  %s"
              % (lat, lon, r["medidos"], r["totales"], r["medidos_24m"],
                 r["ciclos"], r["ciclos_24m"],
                 r["amp_hist"], r["amp_rec"], r["perdida_pct"], r["pico"], marca))
        if firma_abandono(r):
            hallazgos.append(((lat, lon), r))

    print("\n%d de %d candidatas con firma de abandono" % (len(hallazgos), len(puntos)))
    if hallazgos:
        # La mejor es la que mas ritmo perdio conservando el verde: ese es el
        # caso que el producto tiene que saber leer.
        mejor = max(hallazgos, key=lambda h: h[1]["perdida_pct"])
        print("mejor: (%.4f, %.4f) — pierde %.1f%% de su propio ritmo, pico %.2f"
              % (mejor[0][0], mejor[0][1], mejor[1]["perdida_pct"], mejor[1]["pico"]))


if __name__ == "__main__":
    main()
