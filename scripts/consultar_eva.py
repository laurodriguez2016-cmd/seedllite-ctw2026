#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
consultar_eva.py — Rendimiento agrícola municipal oficial para SEEDLLITE

QUÉ HACE
    Consulta las Evaluaciones Agropecuarias Municipales (EVA) —la operación estadística
    oficial del sector agropecuario colombiano, publicada como datos abiertos— y extrae
    el rendimiento histórico (t/ha) del cultivo de cada predio en su propio municipio.

PARA QUÉ SIRVE
    El eje "Capacidad de pago proyectada" compara el rendimiento estimado del predio contra
    el rendimiento de su municipio. Sin una referencia oficial, esa comparación sería una
    cifra inventada. Con EVA, es contrastable contra una fuente pública y auditable.

    Reemplaza el campo "percentil_vereda" del contrato v1.0, que era inverificable:
    en Colombia no existe estadística de producción agropecuaria por vereda.

FUENTE
    Evaluaciones Agropecuarias Municipales — EVA
    UPRA / Ministerio de Agricultura y Desarrollo Rural
    https://www.datos.gov.co/Agricultura-y-Desarrollo-Rural/Evaluaciones-Agropecuarias-Municipales-EVA/2pnw-mmge
    Licencia: datos abiertos. Acceso vía API Socrata, sin autenticación.

LIMITACIÓN DECLARADA
    Este recurso llega hasta el año 2018. Las cifras se citan como "EVA <año>", nunca como
    dato actual. Para producción se debería migrar al recurso EVA más reciente publicado
    por UPRA.

USO
    python3 scripts/consultar_eva.py
    Escribe data/eva_referencia.json
"""

import json
import pathlib
import urllib.parse
import urllib.request

RECURSO = "https://www.datos.gov.co/resource/2pnw-mmge.json"

# Cada predio del demo, con su municipio y cultivo tal como aparecen en EVA.
PREDIOS = [
    {"id": "huila-cafe",   "municipio": "PITALITO",     "cultivo": "CAFE"},
    {"id": "tolima-arroz", "municipio": "ESPINAL",      "cultivo": "ARROZ"},
    {"id": "boyaca-papa",  "municipio": "VENTAQUEMADA", "cultivo": "PAPA"},
    {"id": "meta-cacao",   "municipio": "GRANADA",      "cultivo": "CACAO"},
]


def consultar(municipio, cultivo, limite=40):
    """Trae los registros de EVA de un municipio y cultivo, del más reciente al más antiguo."""
    params = {
        "$where": f"upper(municipio) like '%{municipio}%' AND upper(cultivo) like '%{cultivo}%'",
        "$order": "a_o DESC",
        "$limit": str(limite),
    }
    url = f"{RECURSO}?{urllib.parse.urlencode(params)}"
    with urllib.request.urlopen(url, timeout=30) as r:
        return json.load(r)


def resumir(registros):
    """
    Se queda con el registro más reciente y calcula el promedio de los últimos años.

    Nota metodológica: cuando un municipio reporta varias series para el mismo cultivo
    (por ejemplo papa común y papa criolla, o semestres A y B), se toma la de mayor área
    sembrada como referencia municipal, por ser la representativa del municipio.
    """
    if not registros:
        return None

    def num(v):
        try:
            return float(v)
        except (TypeError, ValueError):
            return 0.0

    anio_reciente = max(r.get("a_o", "0") for r in registros)
    del_anio = [r for r in registros if r.get("a_o") == anio_reciente]
    principal = max(del_anio, key=lambda r: num(r.get("rea_sembrada_ha")))

    rendimientos = [num(r.get("rendimiento_t_ha")) for r in registros if num(r.get("rendimiento_t_ha")) > 0]
    promedio = round(sum(rendimientos) / len(rendimientos), 2) if rendimientos else None

    return {
        "municipio": principal.get("municipio"),
        "departamento": principal.get("departamento"),
        "cultivo": principal.get("cultivo"),
        "ciclo_de_cultivo": principal.get("ciclo_de_cultivo"),
        "anio_referencia": anio_reciente,
        "rendimiento_municipal_t_ha": num(principal.get("rendimiento_t_ha")),
        "rendimiento_promedio_historico_t_ha": promedio,
        "area_sembrada_ha": num(principal.get("rea_sembrada_ha")),
        "area_cosechada_ha": num(principal.get("rea_cosechada_ha")),
        "series_disponibles": len(registros),
        "cita": f"EVA {anio_reciente} — {principal.get('municipio')}, {principal.get('departamento')} — {principal.get('cultivo')}",
    }


def main():
    salida = {
        "fuente": "Evaluaciones Agropecuarias Municipales (EVA) — UPRA / MinAgricultura",
        "recurso": RECURSO,
        "licencia": "Datos abiertos — datos.gov.co",
        "nota": "Este recurso llega hasta 2018. Las cifras se citan con su año, nunca como dato actual.",
        "referencias": {},
    }

    for p in PREDIOS:
        registros = consultar(p["municipio"], p["cultivo"])
        resumen = resumir(registros)
        if resumen:
            salida["referencias"][p["id"]] = resumen
            print(f"✓ {p['id']:14s} {resumen['cita']:50s} {resumen['rendimiento_municipal_t_ha']} t/ha")
        else:
            print(f"✗ {p['id']:14s} sin registros en EVA")

    destino = pathlib.Path(__file__).resolve().parent.parent / "data" / "eva_referencia.json"
    destino.write_text(json.dumps(salida, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"\nEscrito: {destino}")


if __name__ == "__main__":
    main()
