#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
validar_contrato.py — SEEDLLITE · frente MOTOR

Valida que los tres JSON cumplen `data/CONTRATO-DATOS.md` ANTES de que el
empaquetador emita `data/datos.js`.

    python3 scripts/validar_contrato.py        # valida y explica

POR QUE EXISTE
--------------
El contrato cambió una vez durante el desarrollo (v1.0 -> v1.1: se elimino
`percentil_vereda`). Los archivos que no se regeneraron quedaron MUDOS-ROTOS: el
empaquetador los acepto sin protestar, `datos.js` se genero igual, y la app
mostro `undefined` en pantalla sin un solo error en consola.

Ese es el peor fallo posible en un hackathon: silencioso, y solo se descubre a
las 5am cuando alguien mira la pantalla con cuidado. Este validador lo convierte
en un error inmediato y con nombre propio.

No valida "que el JSON este bien formado" — eso ya lo hace json.load. Valida las
REGLAS DEL CONTRATO: enums, rangos, que la suma de pesos de los ejes sea 100,
que los tres archivos hablen del mismo conjunto de predios, que ningun dictamen
sugiera mas plata de la solicitada.

Solo biblioteca estandar (Python 3.9).
"""

import json
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(RAIZ, "data")

TIPOS_PRODUCTOR = ("pequeño", "mediano", "grande")
BANDAS = ("bajo", "medio", "alto", "rechazo")
DECISIONES = ("aprobar", "aprobar_con_ajuste", "rechazar")
TIPOS_EVIDENCIA = ("favorable", "alerta", "critico")

# Contrato v1.1 §3: nombres y pesos fijos, mapean uno a uno contra el SARC.
EJES = (
    ("Capacidad de pago proyectada", 40),
    ("Verificación del activo productivo", 20),
    ("Riesgo sectorial y climático", 25),
    ("Coherencia del destino del crédito", 15),
)

# Caja aproximada de Colombia continental. Atrapa el error de signo en la
# longitud, que es el que de verdad ocurre.
COLOMBIA = {"lat": (-4.3, 13.6), "lon": (-79.1, -66.8)}

RE_MES = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")
RE_ID = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")


class Fallos(object):
    """
    Recoge incumplimientos. Los que vienen de un archivo de `data/_ejemplo/` se
    degradan a aviso: ese directorio existe para que el frente APP construya
    ANTES de que MOTOR genere los datos reales (contrato, sección final). Que un
    marcador de posición no cumpla el contrato es lo esperado, no un error --
    pero tiene que verse, para que nadie entregue con datos de juguete.
    """

    def __init__(self):
        self.lista = []
        self.avisos = []
        self.origen_ejemplo = set()

    def __call__(self, donde, mensaje):
        archivo = donde.split("/")[0]
        if archivo in self.origen_ejemplo:
            self.avisos.append((donde, mensaje))
        else:
            self.lista.append((donde, mensaje))

    def __len__(self):
        return len(self.lista)


def numero(v):
    return isinstance(v, (int, float)) and not isinstance(v, bool)


# ---------------------------------------------------------------------------

def validar_predios(doc, err):
    if not isinstance(doc.get("predios"), list) or not doc["predios"]:
        err("predios.json", "no trae una lista 'predios' con al menos un elemento")
        return []

    ids = []
    for i, p in enumerate(doc["predios"]):
        donde = "predios.json[%d]" % i
        pid = p.get("id")
        if not isinstance(pid, str) or not RE_ID.match(pid):
            err(donde, "'id' ausente o no es kebab-case: %r" % (pid,))
            continue
        donde = "predios.json/%s" % pid
        ids.append(pid)

        for campo in ("productor", "vereda", "municipio", "departamento",
                      "cultivo", "destino"):
            if not isinstance(p.get(campo), str) or not p[campo].strip():
                err(donde, "'%s' ausente o vacío" % campo)

        if p.get("tipo_productor") not in TIPOS_PRODUCTOR:
            err(donde, "'tipo_productor' = %r, debe ser uno de %s"
                % (p.get("tipo_productor"), list(TIPOS_PRODUCTOR)))

        c = p.get("coordenadas") or {}
        for eje in ("lat", "lon"):
            v = c.get(eje)
            lo, hi = COLOMBIA[eje]
            if not numero(v):
                err(donde, "coordenadas.%s no es número: %r" % (eje, v))
            elif not (lo <= v <= hi):
                err(donde, "coordenadas.%s = %s cae fuera de Colombia (%s a %s)"
                    % (eje, v, lo, hi))

        ad = p.get("area_declarada_ha")
        at = p.get("area_detectada_ha")
        if not numero(ad) or ad <= 0:
            err(donde, "'area_declarada_ha' debe ser > 0, es %r" % (ad,))
        if not numero(at) or at < 0:
            err(donde, "'area_detectada_ha' debe ser >= 0, es %r" % (at,))

        monto = p.get("monto_solicitado_cop")
        if not isinstance(monto, int) or monto <= 0:
            err(donde, "'monto_solicitado_cop' debe ser entero > 0, es %r" % (monto,))

        smmlv = p.get("activos_declarados_smmlv")
        if not isinstance(smmlv, int) or smmlv < 0:
            err(donde, "'activos_declarados_smmlv' debe ser entero >= 0, es %r" % (smmlv,))
        elif p.get("tipo_productor") == "pequeño" and smmlv > 284:
            err(donde, "declarado 'pequeño' con %d SMMLV: el tope legal es 284" % smmlv)

        imgs = p.get("imagenes_satelitales")
        if not isinstance(imgs, list) or len(imgs) < 2:
            err(donde, "'imagenes_satelitales' debe ser una secuencia de al menos 2 "
                       "cortes (contrato §1)")
        else:
            for img in imgs:
                if not isinstance(img.get("anio"), int) or not isinstance(img.get("ruta"), str):
                    err(donde, "imagen mal formada: %r" % (img,))

    if len(set(ids)) != len(ids):
        err("predios.json", "hay ids repetidos")
    return ids


def validar_series(doc, ids, err):
    series = doc.get("series")
    if not isinstance(series, dict):
        err("series_ndvi.json", "no trae un objeto 'series'")
        return

    faltan = [i for i in ids if i not in series]
    if faltan:
        err("series_ndvi.json", "faltan series para: %s" % ", ".join(faltan))
    sobran = [i for i in series if i not in ids]
    if sobran:
        err("series_ndvi.json", "series de predios inexistentes: %s" % ", ".join(sobran))

    if not isinstance(doc.get("eventos_climaticos"), list) or not doc["eventos_climaticos"]:
        err("series_ndvi.json", "'eventos_climaticos' ausente o vacío: la app "
                                "pinta las bandas de fondo con eso")

    for pid, s in series.items():
        donde = "series_ndvi.json/%s" % pid
        puntos = s.get("puntos")
        if not isinstance(puntos, list) or len(puntos) < 24:
            err(donde, "'puntos' ausente o con menos de 24 observaciones")
            continue

        anterior = None
        for j, punto in enumerate(puntos):
            fecha = punto.get("fecha")
            if not isinstance(fecha, str) or not RE_MES.match(fecha):
                err(donde, "punto %d: fecha inválida %r (se espera AAAA-MM)" % (j, fecha))
                continue
            if anterior and fecha <= anterior:
                err(donde, "punto %d: la serie no es monótona creciente (%s tras %s)"
                    % (j, fecha, anterior))
            anterior = fecha

            v = punto.get("ndvi")
            if not numero(v):
                err(donde, "punto %s: 'ndvi' no es número: %r  ← esto pinta "
                           "'undefined' en la gráfica" % (fecha, v))
            elif not (-1.0 <= v <= 1.0):
                err(donde, "punto %s: ndvi = %s fuera del rango [-1, 1]" % (fecha, v))

            n = punto.get("nubosidad")
            if not numero(n) or not (0.0 <= n <= 1.0):
                err(donde, "punto %s: 'nubosidad' debe estar entre 0 y 1, es %r" % (fecha, n))

        if s.get("desde") != puntos[0].get("fecha"):
            err(donde, "'desde' (%r) no coincide con el primer punto (%r)"
                % (s.get("desde"), puntos[0].get("fecha")))
        if s.get("hasta") != puntos[-1].get("fecha"):
            err(donde, "'hasta' (%r) no coincide con el último punto (%r)"
                % (s.get("hasta"), puntos[-1].get("fecha")))

        # Campos que el dictamen CITA como evidencia. Si falta uno, el modelo
        # se queda sin la cifra y el dictamen sale con un adjetivo suelto.
        for campo in ("ciclos_detectados", "ciclos_ultimos_24m", "ndvi_pico_promedio",
                      "rendimiento_estimado_t_ha", "rendimiento_municipal_eva_t_ha",
                      "caida_enso_pct"):
            if not numero(s.get(campo)):
                err(donde, "falta el agregado '%s' (contrato v1.1)" % campo)
        if not isinstance(s.get("fuente_referencia"), str) or not s["fuente_referencia"]:
            err(donde, "falta 'fuente_referencia': sin fuente, la cifra de "
                       "rendimiento no se puede citar")

        # v1.0 -> v1.1: este campo se eliminó. Si reaparece, alguien regeneró
        # con un script viejo.
        if "percentil_vereda" in s:
            err(donde, "'percentil_vereda' fue eliminado en el contrato v1.1 — "
                       "este archivo se generó con un script desactualizado")


def validar_dictamenes(doc, ids, predios_por_id, err):
    dic = doc.get("dictamenes")
    if not isinstance(dic, dict):
        err("dictamenes.json", "no trae un objeto 'dictamenes'")
        return

    faltan = [i for i in ids if i not in dic]
    if faltan:
        err("dictamenes.json", "faltan dictámenes para: %s" % ", ".join(faltan))

    for pid, d in dic.items():
        donde = "dictamenes.json/%s" % pid
        if pid not in ids:
            err(donde, "dictamen de un predio que no existe")
            continue

        p = predios_por_id[pid]

        puntaje = d.get("puntaje")
        if not isinstance(puntaje, int) or not (0 <= puntaje <= 1000):
            err(donde, "'puntaje' debe ser entero de 0 a 1000, es %r" % (puntaje,))

        if d.get("banda_riesgo") not in BANDAS:
            err(donde, "'banda_riesgo' = %r, debe ser uno de %s"
                % (d.get("banda_riesgo"), list(BANDAS)))
        if d.get("decision") not in DECISIONES:
            err(donde, "'decision' = %r, debe ser uno de %s"
                % (d.get("decision"), list(DECISIONES)))

        monto = d.get("monto_sugerido_cop")
        if not isinstance(monto, int) or monto < 0:
            err(donde, "'monto_sugerido_cop' debe ser entero >= 0, es %r" % (monto,))
        elif monto > p["monto_solicitado_cop"]:
            err(donde, "sugiere %d, más de lo solicitado (%d). Nunca se ofrece "
                       "más de lo pedido" % (monto, p["monto_solicitado_cop"]))
        if d.get("decision") == "rechazar" and monto:
            err(donde, "decisión 'rechazar' con monto sugerido %d — debe ser 0" % monto)

        fag = d.get("cobertura_fag_pct")
        if not isinstance(fag, int) or not (0 <= fag <= 100):
            err(donde, "'cobertura_fag_pct' debe ser entero de 0 a 100, es %r" % (fag,))

        ejes = d.get("ejes")
        if not isinstance(ejes, list) or len(ejes) != 4:
            err(donde, "'ejes' debe traer exactamente los 4 ejes del contrato")
        else:
            vistos = [(e.get("eje"), e.get("peso")) for e in ejes]
            if vistos != list(EJES):
                err(donde, "los ejes no coinciden con el contrato v1.1.\n"
                           "        esperado: %s\n        recibido: %s"
                    % (list(EJES), vistos))
            suma = sum(e.get("peso", 0) for e in ejes)
            if suma != 100:
                err(donde, "la suma de pesos es %s, debe ser 100" % suma)
            for e in ejes:
                pt, pe = e.get("puntaje"), e.get("peso")
                if not isinstance(pt, int) or not isinstance(pe, int) or pt > pe:
                    err(donde, "eje %r: puntaje %r supera su peso %r"
                        % (e.get("eje"), pt, pe))

        ev = d.get("evidencia")
        if not isinstance(ev, list) or not (3 <= len(ev) <= 5):
            err(donde, "'evidencia' debe traer entre 3 y 5 hallazgos, trae %s"
                % (len(ev) if isinstance(ev, list) else None))
        else:
            for e in ev:
                if e.get("tipo") not in TIPOS_EVIDENCIA:
                    err(donde, "evidencia con tipo %r, debe ser uno de %s"
                        % (e.get("tipo"), list(TIPOS_EVIDENCIA)))
                if not isinstance(e.get("texto"), str) or not e["texto"].strip():
                    err(donde, "evidencia sin texto")
            # Control anti-despojo: contrato §3, es obligatorio reportarlo
            # aunque salga limpio.
            junto = " ".join(e.get("texto", "") for e in ev).upper()
            if "RTDAF" not in junto and "RUPTA" not in junto:
                err(donde, "ninguna evidencia menciona la verificación RTDAF/RUPTA. "
                           "El contrato la exige siempre, incluso favorable")

        memo = d.get("memorando")
        if not isinstance(memo, str) or not memo.strip():
            err(donde, "'memorando' vacío — es el texto que se escribe en pantalla")
        else:
            palabras = len(memo.split())
            if not (100 <= palabras <= 240):
                err(donde, "el memorando tiene %d palabras; el contrato pide entre "
                           "120 y 200 (se tolera 100-240)" % palabras)

        if not isinstance(d.get("recomendacion"), str) or not d["recomendacion"].strip():
            err(donde, "'recomendacion' vacía")


# ---------------------------------------------------------------------------

def validar(silencioso=False):
    """Devuelve la lista de fallos. Vacía = todo conforme."""
    err = Fallos()

    def abrir(nombre, obligatorio):
        real = os.path.join(DATA, nombre)
        ejemplo = os.path.join(DATA, "_ejemplo", nombre)
        for ruta, es_ejemplo in ((real, False), (ejemplo, True)):
            if os.path.exists(ruta):
                if es_ejemplo:
                    err.origen_ejemplo.add(nombre)
                try:
                    with open(ruta, "r", encoding="utf-8") as f:
                        return json.load(f)
                except ValueError as e:
                    err(nombre, "no es JSON válido: %s" % e)
                    return None
        if obligatorio:
            err(nombre, "no existe, ni siquiera en data/_ejemplo/")
        return None

    predios = abrir("predios.json", True)
    series = abrir("series_ndvi.json", True)
    dictamenes = abrir("dictamenes.json", False)

    ids = validar_predios(predios, err) if predios else []
    por_id = {p["id"]: p for p in (predios or {}).get("predios", []) if "id" in p}

    if series and ids:
        validar_series(series, ids, err)
    if dictamenes and ids:
        validar_dictamenes(dictamenes, ids, por_id, err)

    if not silencioso:
        if err:
            print("\n✗ EL CONTRATO DE DATOS NO SE CUMPLE — %d problema(s):\n" % len(err))
            for donde, mensaje in err.lista:
                print("  [%s]\n        %s" % (donde, mensaje))
            print("\n  Referencia: data/CONTRATO-DATOS.md")
        else:
            print("✓ contrato de datos conforme  (%d predios · series · %s)"
                  % (len(ids), "dictámenes" if dictamenes else "sin dictámenes todavía"))

        if err.avisos:
            print("\n! %d aviso(s) en archivos de data/_ejemplo/ — son marcadores "
                  "de posición.\n  NO se puede entregar así: falta correr "
                  "scripts/generar_dictamen.py." % len(err.avisos))
            for donde, mensaje in err.avisos[:4]:
                print("    [%s] %s" % (donde, mensaje))
    return err.lista


if __name__ == "__main__":
    sys.exit(1 if validar() else 0)
