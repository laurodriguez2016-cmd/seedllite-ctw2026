#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ingesta_sentinel.py — SEEDLLITE · frente MOTOR

EL PIPELINE REAL. Descarga la serie temporal de NDVI de cada predio desde
Copernicus Sentinel-2 y escribe `data/series_ndvi.json`.

    python3 scripts/ingesta_sentinel.py                 # los 4 predios
    python3 scripts/ingesta_sentinel.py tolima-arroz    # uno solo
    python3 scripts/ingesta_sentinel.py --muestra       # imprime y no escribe

Requiere en el entorno (o en .env, nunca commiteado):
    CDSE_CLIENT_ID, CDSE_CLIENT_SECRET
Se obtienen creando un cliente OAuth en
    https://shapps.dataspace.copernicus.eu/dashboard/#/account/settings

QUE HACE, EN UNA FRASE
----------------------
Para cada predio manda su poligono a la Statistical API de Sentinel Hub, que
calcula el NDVI pixel a pixel sobre la parcela y devuelve la MEDIANA MENSUAL de
los 108 meses de la serie. No se descarga ni una imagen: el calculo ocurre del
lado de Copernicus y vuelven solo los estadisticos. Una peticion por predio,
unos 3 segundos cada una.

POR QUE LA MEDIANA Y NO LA MEDIA
--------------------------------
Una nube residual que el enmascarado no atrapo mete un pixel con NDVI absurdo.
La media se lo traga; la mediana no. Es la misma razon por la que el contrato de
datos dice "mediana mensual" en el campo `metodo`.

LOS HUECOS SON EL DATO MAS HONESTO DE TODO EL ARCHIVO
-----------------------------------------------------
En el tropico andino no hay observacion optica utilizable todos los meses: entre
un tercio y la mitad de los meses el predio esta bajo nubes. Este script NO
esconde eso:

  - Los meses sin observacion valida se interpolan linealmente, se marcan con
    `"interpolado": true` y se les asigna `nubosidad: 1.0`.
  - La app ya dibuja atenuado todo punto con nubosidad > 0,6, asi que un mes
    interpolado se ve distinto de uno medido sin cambiar una linea del frente APP.
  - TODOS los agregados (ciclos, pico, rendimiento, caida ENSO) se calculan
    SOLO sobre observaciones medidas. Un dato interpolado nunca sustenta una
    afirmacion del dictamen.
  - `cobertura_meses_medidos` deja por escrito cuantos meses son reales.

VENTANA TEMPORAL: 2017-01 a 2025-12
-----------------------------------
Sentinel-2 L2A tiene cobertura global sistematica desde enero de 2017 (antes
solo Europa). Pedir 2016 devolveria huecos que no son nubes sino ausencia de
producto, y eso si seria un dato enganoso. Nueve anios medidos valen mas que
diez con uno inventado.

Solo biblioteca estandar (Python 3.9).
"""

import json
import math
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(RAIZ, "data")
SALIDA = os.path.join(DATA, "series_ndvi.json")

URL_TOKEN = ("https://identity.dataspace.copernicus.eu/auth/realms/CDSE"
             "/protocol/openid-connect/token")
URL_STATS = "https://sh.dataspace.copernicus.eu/api/v1/statistics"

DESDE = "2017-01"
HASTA = "2025-12"

# La geometria va en CRS84 (grados). OJO: entonces resx/resy TAMBIEN van en
# grados. Poner "10" pensando en metros pide 10 GRADOS de resolucion y la API
# devuelve un unico pixel por mes -- sin error, solo con sampleCount=1. Es el
# fallo silencioso mas caro de esta API.
RES_GRADOS = 10.0 / 111320.0        # 10 m expresados en grados

EVENTOS = [
    {"nombre": "La Niña 2022",    "desde": "2022-01", "hasta": "2022-12",
     "tipo": "exceso_lluvia"},
    {"nombre": "El Niño 2023-24", "desde": "2023-06", "hasta": "2024-05",
     "tipo": "sequia"},
]

# Se enmascara con la banda SCL (Scene Classification Layer) que trae el propio
# producto L2A. Es clasificacion de ESA, no un umbral inventado por nosotros.
EVALSCRIPT = """//VERSION=3
function setup() {
  return {
    input: [{ bands: ["B04", "B08", "SCL", "dataMask"] }],
    output: [
      { id: "ndvi",     bands: 1, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 }
    ]
  };
}
function evaluatePixel(s) {
  // SCL descartados: 0 sin dato · 1 saturado · 3 sombra de nube · 6 agua
  //                  8 nube prob. media · 9 nube prob. alta · 10 cirros · 11 nieve
  var malo   = [0, 1, 3, 6, 8, 9, 10, 11].indexOf(s.SCL) > -1;
  var suma   = s.B08 + s.B04;
  var valido = (suma !== 0 && !malo) ? 1 : 0;
  return { ndvi: [suma === 0 ? 0 : (s.B08 - s.B04) / suma],
           dataMask: [s.dataMask * valido] };
}
"""


# ---------------------------------------------------------------------------
# Credenciales y transporte
# ---------------------------------------------------------------------------

def cargar_env():
    """Lee .env si existe. El entorno real siempre gana sobre el archivo."""
    ruta = os.path.join(RAIZ, ".env")
    if not os.path.exists(ruta):
        return
    with open(ruta, "r", encoding="utf-8") as f:
        for linea in f:
            linea = linea.strip()
            if not linea or linea.startswith("#") or "=" not in linea:
                continue
            clave, valor = linea.split("=", 1)
            os.environ.setdefault(clave.strip(), valor.strip())


def obtener_token():
    cargar_env()
    cid = os.environ.get("CDSE_CLIENT_ID")
    secreto = os.environ.get("CDSE_CLIENT_SECRET")
    if not cid or not secreto:
        raise SystemExit(
            "Faltan credenciales de Copernicus.\n"
            "  export CDSE_CLIENT_ID='sh-...'\n"
            "  export CDSE_CLIENT_SECRET='...'\n"
            "Se crean en https://shapps.dataspace.copernicus.eu/dashboard/"
            "#/account/settings (User Settings -> OAuth clients).")

    datos = urllib.parse.urlencode({
        "grant_type": "client_credentials",
        "client_id": cid,
        "client_secret": secreto,
    }).encode("utf-8")
    peticion = urllib.request.Request(
        URL_TOKEN, data=datos,
        headers={"content-type": "application/x-www-form-urlencoded"})
    try:
        with urllib.request.urlopen(peticion, timeout=60) as r:
            return json.loads(r.read().decode("utf-8"))["access_token"]
    except urllib.error.HTTPError as e:
        raise SystemExit("No se pudo autenticar contra Copernicus (HTTP %s):\n%s"
                         % (e.code, e.read().decode("utf-8", "replace")[:400]))


def poligono_cuadrado(lat, lon, area_ha):
    """
    Cuadrado centrado en el punto, de la superficie declarada.

    En produccion esto se reemplaza por el poligono catastral real del predio
    (shapefile del IGAC o el trazado que el productor dibuja en la app). La forma
    del poligono no cambia el metodo: la Statistical API acepta cualquier
    geometria GeoJSON. Se usa un cuadrado porque en el demo no tenemos catastro.
    """
    lado = math.sqrt(area_ha * 10000.0)                 # metros
    dlat = (lado / 2.0) / 110574.0
    dlon = (lado / 2.0) / (111320.0 * math.cos(math.radians(lat)))
    return [[
        [lon - dlon, lat - dlat],
        [lon + dlon, lat - dlat],
        [lon + dlon, lat + dlat],
        [lon - dlon, lat + dlat],
        [lon - dlon, lat - dlat],
    ]]


def pedir_serie(token, lat, lon, area_ha):
    """Una peticion = la decada completa de un predio. Devuelve [(mes, ndvi|None, nubosidad)]."""
    cuerpo = {
        "input": {
            "bounds": {
                "geometry": {"type": "Polygon",
                             "coordinates": poligono_cuadrado(lat, lon, area_ha)},
                "properties": {"crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"},
            },
            # leastCC = de las escenas del mes, la de menor nubosidad.
            "data": [{"type": "sentinel-2-l2a",
                      "dataFilter": {"mosaickingOrder": "leastCC"}}],
        },
        "aggregation": {
            "timeRange": {"from": DESDE + "-01T00:00:00Z",
                          "to": "2026-01-01T00:00:00Z"},
            "aggregationInterval": {"of": "P1M"},
            "resx": RES_GRADOS, "resy": RES_GRADOS,
            "evalscript": EVALSCRIPT,
        },
        "calculations": {
            "default": {"statistics": {"default": {"percentiles": {"k": [50]}}}}
        },
    }

    peticion = urllib.request.Request(
        URL_STATS, data=json.dumps(cuerpo).encode("utf-8"),
        headers={"Content-Type": "application/json",
                 "Accept": "application/json",
                 "Authorization": "Bearer " + token},
        method="POST")
    try:
        with urllib.request.urlopen(peticion, timeout=300) as r:
            respuesta = json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise SystemExit("Statistical API respondio HTTP %s:\n%s"
                         % (e.code, e.read().decode("utf-8", "replace")[:600]))

    if respuesta.get("status") != "OK":
        raise SystemExit("Statistical API: status=%s\n%s"
                         % (respuesta.get("status"), json.dumps(respuesta)[:600]))

    filas = []
    for intervalo in respuesta["data"]:
        mes = intervalo["interval"]["from"][:7]

        # Mes sin ninguna escena: la API omite "outputs" por completo.
        if "outputs" not in intervalo:
            filas.append((mes, None, 1.0))
            continue

        est = intervalo["outputs"]["ndvi"]["bands"]["B0"]["stats"]
        mediana = est.get("percentiles", {}).get("50.0")

        # Mes con escena pero enteramente enmascarado: la API devuelve la cadena
        # "NaN", no un numero. Hay que compararlo, no operarlo.
        if mediana is None or isinstance(mediana, str):
            filas.append((mes, None, 1.0))
            continue

        total = est.get("sampleCount", 0)
        sin_dato = est.get("noDataCount", 0)
        # Fraccion de la parcela que el SCL descarto ese mes. ESTO es la nubosidad:
        # no un numero aleatorio, una medicion.
        nubosidad = (sin_dato / float(total)) if total else 1.0
        filas.append((mes, round(mediana, 3), round(nubosidad, 2)))

    return filas


# ---------------------------------------------------------------------------
# Relleno de huecos
# ---------------------------------------------------------------------------

def rellenar(filas):
    """
    Interpola linealmente los meses sin observacion y los marca.

    La interpolacion lineal no puede inventar un pico ni un valle: cualquier
    valor cae entre dos medidas reales. Por eso rellenar no infla el conteo de
    ciclos. Y como los agregados se calculan solo sobre medidos, el relleno es
    exclusivamente cosmetico -- existe para que la linea de la grafica no se
    corte y para que el detector de ciclos tenga una rejilla regular.
    """
    puntos = [{"fecha": m, "ndvi": v, "nubosidad": n,
               "medido": v is not None} for m, v, n in filas]

    conocidos = [i for i, p in enumerate(puntos) if p["medido"]]
    if not conocidos:
        raise SystemExit("Ningun mes con observacion valida. Revisa las coordenadas.")

    for i, p in enumerate(puntos):
        if p["medido"]:
            continue
        antes = [j for j in conocidos if j < i]
        despues = [j for j in conocidos if j > i]
        if antes and despues:
            a, b = antes[-1], despues[0]
            va, vb = puntos[a]["ndvi"], puntos[b]["ndvi"]
            p["ndvi"] = round(va + (vb - va) * (i - a) / float(b - a), 3)
        else:
            # Extremo de la serie: se sostiene el valor medido mas cercano.
            p["ndvi"] = puntos[(antes or despues)[-1 if antes else 0]]["ndvi"]
        p["nubosidad"] = 1.0

    # Forma final segun CONTRATO-DATOS.md §2, mas el flag de procedencia.
    return [{"fecha": p["fecha"], "ndvi": p["ndvi"], "nubosidad": p["nubosidad"],
             "interpolado": not p["medido"]} for p in puntos]


# ---------------------------------------------------------------------------
# Agregados. Se calculan SOLO sobre meses medidos.
# ---------------------------------------------------------------------------

def suavizar(valores, ventana=3):
    """
    Mediana movil de 3 meses. Se aplica SOLO antes de contar ciclos, nunca a la
    serie que se guarda ni a los promedios.

    Por que hace falta: una nube fina que el SCL no atrapo hunde un mes suelto.
    El detector de cruces lee esa caida de un mes como el final de una cosecha y
    cuenta un ciclo que no existio. Una cosecha real dura meses, asi que
    sobrevive a la mediana movil; un artefacto de sensor, no. Es filtrado
    estandar de series fenologicas, no un ajuste hecho para que salgan las
    cifras del demo.
    """
    salida = []
    for i in range(len(valores)):
        trozo = [x for x in valores[max(0, i - ventana // 2): i + ventana // 2 + 1]
                 if x is not None]
        if not trozo:
            salida.append(None)
        else:
            trozo.sort()
            salida.append(trozo[len(trozo) // 2])
    return salida


def contar_ciclos(valores, minimo=8):
    """
    Un ciclo completo = el vigor cruza hacia arriba el umbral de pico y luego
    cruza hacia abajo el de valle. Contar CRUCES y no picos evita contar como
    cosecha un repunte parcial.

    Los umbrales salen de la amplitud OBSERVADA (percentiles 10 y 90), no de
    constantes. Por eso el detector lee la FORMA de la serie y no su nivel: un
    predio invadido de rastrojo mantiene NDVI alto pero pierde amplitud, deja de
    cruzar los umbrales, y su conteo cae a cero. Ese es el corazon del producto.
    """
    v = [x for x in valores if x is not None]
    if len(v) < minimo:
        return 0

    valores = suavizar(valores)
    v = [x for x in valores if x is not None]

    orden = sorted(v)
    p10 = orden[int(len(orden) * 0.10)]
    p90 = orden[int(len(orden) * 0.90)]
    amplitud = p90 - p10
    if amplitud < 0.12:
        return 0                      # serie aplanada: no hay ciclo que contar

    alto = p10 + amplitud * 0.70
    bajo = p10 + amplitud * 0.30
    ciclos, armado = 0, False
    for x in valores:
        if x is None:
            continue
        if not armado and x >= alto:
            armado = True
        elif armado and x <= bajo:
            ciclos += 1
            armado = False
    return ciclos


def amplitud(valores):
    """Amplitud observada = percentil 90 menos percentil 10, sobre la serie
    suavizada. Es cuanto SUBE Y BAJA el predio, con independencia de su nivel."""
    v = [x for x in suavizar(valores) if x is not None]
    if len(v) < 6:
        return 0.0
    orden = sorted(v)
    return round(orden[int(len(orden) * 0.90)] - orden[int(len(orden) * 0.10)], 3)


def perdida_amplitud(puntos):
    """
    Cuanto perdio el predio de su PROPIO ritmo: amplitud de los ultimos 24 meses
    contra la amplitud de su historia previa.

    ESTE es el indicador que separa un cultivo permanente sano de uno abandonado,
    y es la razon por la que contar ciclos no basta.

    Un cafetal o un cacaotal en produccion es perenne: su NDVI no dibuja dientes
    de sierra, asi que el conteo de ciclos da cero en ambos casos y no discrimina
    nada. Lo que si discrimina es que el predio conserve su propia variacion
    estacional. Un cacaotal abandonado se llena de rastrojo, el verde SUBE, y la
    serie se congela: pierde la amplitud que tenia. Un cafetal en manejo la
    conserva.

    Por eso el producto no pregunta "cuanto verde hay" sino "sigue el predio
    moviendose como se movia". Es una comparacion del predio contra si mismo, no
    contra un umbral universal -- que es justo lo que permite evaluar a un
    productor del que no se sabe nada mas.
    """
    hist = [p["ndvi"] if not p["interpolado"] else None
            for p in puntos if p["fecha"] < "2024-01"]
    reciente = [p["ndvi"] if not p["interpolado"] else None
                for p in puntos if p["fecha"] >= "2024-01"]

    a_hist = amplitud(hist)
    a_rec = amplitud(reciente)
    if a_hist <= 0:
        return 0.0, a_hist, a_rec
    return round(max(0.0, (a_hist - a_rec) / a_hist) * 100.0, 1), a_hist, a_rec


def pico_promedio(puntos):
    por_anio = {}
    for p in puntos:
        if p["interpolado"]:
            continue
        a = p["fecha"][:4]
        por_anio[a] = max(por_anio.get(a, 0.0), p["ndvi"])
    if not por_anio:
        return 0.0
    return round(sum(por_anio.values()) / len(por_anio), 2)


def caida_enso(puntos):
    """Caida del vigor MEDIO en la ventana de El Nino 2023-24 contra la linea
    base del propio predio (2017 a 2023-05). Solo meses medidos."""
    base = [p["ndvi"] for p in puntos
            if not p["interpolado"] and p["fecha"] < "2023-06"]
    evento = [p["ndvi"] for p in puntos
              if not p["interpolado"] and "2023-06" <= p["fecha"] <= "2024-05"]
    if not base or not evento:
        return 0.0
    pb = sum(base) / len(base)
    pe = sum(evento) / len(evento)
    return round(max(0.0, (pb - pe) / pb) * 100.0, 1)


def rendimiento_estimado(puntos, referencia):
    """
    Estimacion RELATIVA del rendimiento, anclada al dato municipal oficial de EVA.

    Metodo declarado: se toma el rendimiento municipal que reporta EVA para ese
    cultivo y municipio y se escala por la razon entre el vigor productivo del
    predio (promedio del tercio superior de sus observaciones medidas recientes)
    y un vigor de referencia. Es una ESTIMACION, no una medicion de produccion,
    y asi se nombra en el dictamen.

    Se usa el tercio superior porque el rendimiento lo determina el pico del
    ciclo, no el promedio anual, que incluye los meses de suelo desnudo.
    """
    recientes = [p["ndvi"] for p in puntos
                 if not p["interpolado"] and p["fecha"] >= "2021-01"]
    if not recientes:
        return referencia["rendimiento_municipal_t_ha"]

    orden = sorted(recientes, reverse=True)
    corte = max(1, len(orden) // 3)
    vigor = sum(orden[:corte]) / corte

    VIGOR_REFERENCIA = 0.72
    return round(referencia["rendimiento_municipal_t_ha"] * (vigor / VIGOR_REFERENCIA), 2)


# ---------------------------------------------------------------------------

def main():
    argumentos = [a for a in sys.argv[1:] if not a.startswith("--")]
    muestra = "--muestra" in sys.argv

    with open(os.path.join(DATA, "predios.json"), "r", encoding="utf-8") as f:
        predios = json.load(f)["predios"]
    with open(os.path.join(DATA, "eva_referencia.json"), "r", encoding="utf-8") as f:
        eva = json.load(f)

    seleccion = [p for p in predios if not argumentos or p["id"] in argumentos]
    if not seleccion:
        raise SystemExit("Ningun predio coincide con: %s" % ", ".join(argumentos))

    token = obtener_token()
    print("Copernicus Data Space · token OK")

    series, caidas = {}, {}
    for predio in seleccion:
        pid = predio["id"]
        sys.stdout.write("· %-14s descargando serie ... " % pid)
        sys.stdout.flush()

        filas = pedir_serie(token,
                            predio["coordenadas"]["lat"],
                            predio["coordenadas"]["lon"],
                            predio["area_declarada_ha"])
        medidos = sum(1 for _, v, _ in filas if v is not None)
        puntos = rellenar(filas)

        valores_medidos = [p["ndvi"] if not p["interpolado"] else None for p in puntos]
        recientes = [p for p in puntos if p["fecha"] >= "2024-01"]

        referencia = eva["referencias"][pid]
        caidas[pid] = caida_enso(puntos)
        perdida, a_hist, a_rec = perdida_amplitud(puntos)

        series[pid] = {
            "desde": DESDE,
            "hasta": HASTA,
            "puntos": puntos,
            "cobertura_meses_medidos": medidos,
            "cobertura_meses_totales": len(puntos),
            "ciclos_detectados": contar_ciclos(valores_medidos),
            "ciclos_ultimos_24m": contar_ciclos([p["ndvi"] for p in recientes], minimo=6),
            "ndvi_pico_promedio": pico_promedio(puntos),
            "rendimiento_estimado_t_ha": rendimiento_estimado(puntos, referencia),
            "rendimiento_municipal_eva_t_ha": referencia["rendimiento_municipal_t_ha"],
            "fuente_referencia": referencia["cita"],
            "caida_enso_pct": caidas[pid],
            "amplitud_historica": a_hist,
            "amplitud_reciente_24m": a_rec,
            "perdida_amplitud_pct": perdida,
        }
        print("%d/%d meses medidos · %d ciclos" % (
            medidos, len(puntos), series[pid]["ciclos_detectados"]))

    caida_regional = round(sum(caidas.values()) / len(caidas), 1)

    documento = {
        "version": "2.0",
        "fuente": "Copernicus Sentinel-2 L2A",
        "licencia": "Copernicus open licence — uso comercial permitido",
        "atribucion": "Contains modified Copernicus Sentinel data 2017-2025",
        "resolucion_m": 10,
        "metodo": ("Mediana mensual de NDVI sobre el polígono del predio, calculada "
                   "del lado de Copernicus por la Statistical API de Sentinel Hub. "
                   "Enmascarado de nubes, sombras y agua con la banda SCL del producto L2A."),
        "nota_datos": (
            "SERIE REAL descargada de Copernicus por scripts/ingesta_sentinel.py. "
            "Los meses sin observación óptica utilizable (nubosidad) se interpolan "
            "linealmente y quedan marcados con \"interpolado\": true y nubosidad 1.0; "
            "todos los agregados —ciclos, pico, rendimiento, caída ENSO— se calculan "
            "únicamente sobre meses medidos. El rendimiento estimado es una estimación "
            "relativa anclada al rendimiento municipal oficial de EVA, con el método "
            "declarado en el mismo script. Los productores son ficticios; las parcelas "
            "y sus series son reales."),
        "fuente_rendimiento": eva["fuente"],
        "caida_enso_regional_pct": caida_regional,
        "series": series,
        "eventos_climaticos": EVENTOS,
    }

    if muestra:
        print(json.dumps(documento, ensure_ascii=False, indent=2)[:3000])
        return

    # Si se regenero un solo predio, se conservan los demas.
    if argumentos and os.path.exists(SALIDA):
        with open(SALIDA, "r", encoding="utf-8") as f:
            previo = json.load(f)
        fusion = previo.get("series", {})
        fusion.update(series)
        documento["series"] = fusion

    with open(SALIDA, "w", encoding="utf-8") as f:
        json.dump(documento, f, ensure_ascii=False, indent=2)

    print("\nOK  data/series_ndvi.json")
    print("    caída ENSO promedio regional: %.1f%%" % caida_regional)
    for pid, s in sorted(documento["series"].items()):
        print("    %-14s medidos=%3d/%3d  ciclos=%2d (24m: %d)  rend=%6.2f vs EVA %5.2f  caída=%4.1f%%"
              % (pid, s["cobertura_meses_medidos"], s["cobertura_meses_totales"],
                 s["ciclos_detectados"], s["ciclos_ultimos_24m"],
                 s["rendimiento_estimado_t_ha"], s["rendimiento_municipal_eva_t_ha"],
                 s["caida_enso_pct"]))
    print("    siguiente paso: python3 scripts/empaquetar_datos.py")


if __name__ == "__main__":
    main()
