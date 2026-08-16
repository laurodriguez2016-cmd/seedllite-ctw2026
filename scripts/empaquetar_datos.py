#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
empaquetar_datos.py — SEEDLLITE · frente MOTOR

Toma los tres JSON del contrato de datos y los emite como UN archivo JS:

    data/predios.json  ┐
    data/series_ndvi.json  ├──▶  data/datos.js   →  window.SEEDLLITE_DATOS
    data/dictamenes.json   ┘

POR QUE EXISTE ESTE PASO
------------------------
La constitucion (V.4) exige que la app funcione con doble clic sobre index.html.
Bajo el protocolo file://, el navegador trata cada archivo como origen opaco y
BLOQUEA POR CORS tanto fetch() como los ES modules (import).

    fetch('data/predios.json')   con file://  ->  CORS error, pantalla en blanco
    <script src="data/datos.js"> con file://  ->  funciona

Los JSON siguen siendo la verdad y el formato de intercambio entre frentes
(y lo que audita el jurado). Este script solo produce el vehiculo de carga.

CORRERLO: cada vez que cambie cualquiera de los tres JSON.
    python3 scripts/empaquetar_datos.py

Solo biblioteca estandar (Python 3.9).
"""

import json
import os
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(RAIZ, "data")
SALIDA = os.path.join(DATA, "datos.js")

# nombre logico -> (archivo real, archivo de respaldo, obligatorio)
# El respaldo en data/_ejemplo/ permite que el frente APP trabaje ANTES de que
# MOTOR haya generado los datos reales. Contrato de datos, seccion final.
FUENTES = [
    ("predios",    "predios.json",     True),
    ("series",     "series_ndvi.json", True),
    ("dictamenes", "dictamenes.json",  False),
]


def cargar(nombre_archivo, obligatorio):
    real = os.path.join(DATA, nombre_archivo)
    ejemplo = os.path.join(DATA, "_ejemplo", nombre_archivo)

    for ruta, origen in ((real, "real"), (ejemplo, "EJEMPLO")):
        if os.path.exists(ruta):
            with open(ruta, "r", encoding="utf-8") as f:
                return json.load(f), origen

    if obligatorio:
        sys.stderr.write(
            "ERROR: falta data/%s y no hay respaldo en data/_ejemplo/\n" % nombre_archivo
        )
        sys.exit(1)
    return None, "AUSENTE"


def main():
    paquete = {}
    reporte = []

    for clave, archivo, obligatorio in FUENTES:
        contenido, origen = cargar(archivo, obligatorio)
        if contenido is not None:
            paquete[clave] = contenido
        reporte.append((archivo, origen))

    cuerpo = json.dumps(paquete, ensure_ascii=False, indent=1)

    js = (
        "/* ARCHIVO GENERADO por scripts/empaquetar_datos.py — NO EDITAR A MANO.\n"
        "   Los datos de verdad viven en data/*.json. Este archivo existe solo\n"
        "   porque fetch() no funciona bajo file:// y la app debe abrir con\n"
        "   doble clic (constitución V.4). Ver ARQUITECTURA.md §2. */\n"
        "window.SEEDLLITE_DATOS = %s;\n" % cuerpo
    )

    with open(SALIDA, "w", encoding="utf-8") as f:
        f.write(js)

    kb = len(js.encode("utf-8")) / 1024.0
    print("OK  data/datos.js  (%.0f KB)" % kb)
    for archivo, origen in reporte:
        marca = "  " if origen == "real" else "! "
        print("  %s%-20s %s" % (marca, archivo, origen))

    if any(o != "real" for _, o in reporte):
        print("\n  ! Hay fuentes de ejemplo o ausentes. La app corre, pero con datos de juguete.")


if __name__ == "__main__":
    main()
