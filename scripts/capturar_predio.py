#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Descarga la imagen satelital REAL de cada predio y le dibuja la medición encima.

POR QUE EXISTE
--------------
Laura pidió, revisando el dictamen modelo: *"sería prudente tener junto a cada caso
imágenes del predio, que se pueda ver no solo la información en físico sino que
también se pueda examinar el predio en las imágenes de los últimos años"*.

Tenía razón por una razón que va más allá de lo estético: **el NDVI es una
abstracción que exige explicación; dos fotos de un pedazo de tierra no exigen
ninguna.** El caso de rechazo del demo —un polígono declarado como 4 ha de cacao
donde la medición encuentra 0,5 con actividad— se entiende de inmediato al ver la
foto: dosel de bosque cerrado con un cuadro sembrado en una esquina.

QUE PRODUCE
-----------
Un `.svg` autocontenido por predio y año, en `assets/satelite/`:

  - La imagen real de Sentinel-2 en color natural, embebida como data URI.
  - El **polígono declarado** por el productor, en línea continua.
  - La **rejilla de medición 4x4**, con cada celda marcada según haya dado
    actividad agrícola o no. Es la misma rejilla que produjo `area_detectada_ha`,
    leída de `predios.json` — no se vuelve a calcular aquí.
  - Escala en metros, el año, y la atribución que exige la licencia Copernicus.

Se emite SVG y no JPG por tres razones: el trazado queda nítido a cualquier
tamaño, la anotación es texto legible y auditable en vez de píxeles quemados, y
**no hace falta ninguna dependencia** — la constitución del proyecto prohíbe
librerías, así que dibujar sobre un raster con PIL no era una opción.

El SVG lleva la imagen embebida, así que funciona dentro de un `<img src="...svg">`
bajo `file://`. No pide un solo recurso externo.

    python3 scripts/capturar_predio.py                 # los cuatro predios
    python3 scripts/capturar_predio.py meta-cacao      # uno solo
    python3 scripts/capturar_predio.py --anios 2017,2025
"""

import base64
import json
import math
import os
import sys
import urllib.error
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(RAIZ, "scripts"))

import ingesta_sentinel as ing

DATA = os.path.join(RAIZ, "data")
SALIDA = os.path.join(RAIZ, "assets", "satelite")
URL_PROCESS = "https://sh.dataspace.copernicus.eu/api/v1/process"

ANIOS = [2017, 2025]
LADO_PX = 640          # resolución de la imagen descargada
# Cuánto encuadre alrededor del predio (1 = justo el borde). Se abre a 3,5 a
# propósito: un predio de 4 ha mide 200 m de lado, o sea 20 píxeles nativos de
# Sentinel-2. Encuadrado justo se ve una mancha; encuadrado ancho se ve el bloque
# de bosque CONTRA los lotes sembradas del vecino, que es exactamente el
# contraste que sostiene el rechazo. El contexto no es decoración: es el argumento.
MARGEN = 3.5

# Color natural. El factor 3.5 abre las sombras del trópico: sin él, el dosel de
# bosque sale casi negro y no se distingue del agua.
EVALSCRIPT = """//VERSION=3
function setup(){return{input:["B04","B03","B02"],output:{bands:3}}}
function evaluatePixel(s){return [s.B04*3.5, s.B03*3.5, s.B02*3.5]}"""


def grados_por_metro(lat):
    """Un grado de longitud se acorta con el coseno de la latitud."""
    return 1.0 / 111320.0, 1.0 / (111320.0 * math.cos(math.radians(lat)))


# Si en todo el año no hay una escena bajo el umbral de nubes, la Process API NO
# falla: devuelve una imagen vacía de ~1 KB, sin aviso. Es el mismo tipo de fallo
# silencioso que la Statistical API con `sampleCount: 1`. Por eso se afloja el
# umbral por pasos y se comprueba el tamaño del PNG antes de darlo por bueno.
UMBRALES_NUBE = [15, 30, 60, 100]
PNG_MINIMO = 6000          # por debajo de esto la imagen viene en blanco


def descargar(token, lat, lon, area_ha, anio, nubes=15):
    """Mosaico del año con la menor nubosidad disponible."""
    lado_m = math.sqrt(area_ha * 10000.0) * MARGEN
    dlat, dlon = grados_por_metro(lat)
    dy = lado_m / 2.0 * dlat
    dx = lado_m / 2.0 * dlon

    cuerpo = {
        "input": {
            "bounds": {"bbox": [lon - dx, lat - dy, lon + dx, lat + dy],
                       "properties": {"crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"}},
            "data": [{"type": "sentinel-2-l2a",
                      "dataFilter": {
                          "timeRange": {"from": "%d-01-01T00:00:00Z" % anio,
                                        "to": "%d-12-31T23:59:59Z" % anio},
                          "maxCloudCoverage": nubes},
                      # leastCC: de todo el año, la toma menos nublada. En el
                      # tropico andino pedir una fecha concreta devuelve nube.
                      "mosaickingOrder": "leastCC"}]},
        "output": {"width": LADO_PX, "height": LADO_PX,
                   "responses": [{"identifier": "default",
                                  "format": {"type": "image/png"}}]},
        "evalscript": EVALSCRIPT,
    }

    req = urllib.request.Request(
        URL_PROCESS, data=json.dumps(cuerpo).encode("utf-8"),
        headers={"Authorization": "Bearer %s" % token,
                 "Content-Type": "application/json",
                 "Accept": "image/png"})
    try:
        return urllib.request.urlopen(req, timeout=120).read(), (lon - dx, lat - dy, lon + dx, lat + dy)
    except urllib.error.HTTPError as e:
        raise SystemExit("Process API HTTP %s: %s" % (e.code, e.read().decode()[:300]))


def a_pixel(lon, lat, bbox, lado=LADO_PX):
    """Coordenada geográfica → píxel dentro de la imagen descargada."""
    x0, y0, x1, y1 = bbox
    px = (lon - x0) / (x1 - x0) * lado
    py = (1.0 - (lat - y0) / (y1 - y0)) * lado      # el eje y de la imagen va al revés
    return px, py


def svg(predio, png, bbox, anio):
    lat = predio["coordenadas"]["lat"]
    lon = predio["coordenadas"]["lon"]
    area = predio["area_declarada_ha"]
    medicion = predio.get("medicion_area") or {}
    rejilla = medicion.get("rejilla") or []

    lado_m = math.sqrt(area * 10000.0)
    dlat, dlon = grados_por_metro(lat)
    dy, dx = lado_m / 2.0 * dlat, lado_m / 2.0 * dlon

    # El polígono declarado
    x0, y0 = a_pixel(lon - dx, lat + dy, bbox)
    x1, y1 = a_pixel(lon + dx, lat - dy, bbox)

    partes = []
    b64 = base64.b64encode(png).decode("ascii")
    partes.append(
        '<image x="0" y="0" width="%d" height="%d" '
        'xlink:href="data:image/png;base64,%s"/>' % (LADO_PX, LADO_PX, b64))

    # Oscurecer todo lo que queda FUERA del predio declarado, para que el ojo
    # sepa de inmediato de qué pedazo de tierra estamos hablando.
    partes.append(
        '<path fill="#000" fill-opacity="0.45" fill-rule="evenodd" '
        'd="M0,0 H%d V%d H0 Z M%.1f,%.1f H%.1f V%.1f H%.1f Z"/>'
        % (LADO_PX, LADO_PX, x0, y0, x1, y1, x0))

    # La rejilla de medición: cada celda como la clasificó medir_area.py
    if rejilla:
        n = int(round(math.sqrt(len(rejilla))))
        paso_x = (x1 - x0) / n
        paso_y = (y1 - y0) / n
        for c in rejilla:
            cx, cy = a_pixel(c["lon"], c["lat"], bbox)
            rx, ry = cx - paso_x / 2.0, cy - paso_y / 2.0
            if c["agricola"]:
                partes.append(
                    '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="#5980a6" '
                    'fill-opacity="0.22" stroke="#5980a6" stroke-width="1.2"/>'
                    % (rx, ry, paso_x, paso_y))
            else:
                # Sin actividad: se raya en diagonal. Se distingue en blanco y
                # negro y en una proyeccion mala de sala, que es donde se ve el video.
                partes.append(
                    '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" '
                    'fill="url(#rayado)" stroke="#e8e8e8" stroke-width="0.8" '
                    'stroke-dasharray="3 3"/>' % (rx, ry, paso_x, paso_y))

    # El borde del predio declarado, encima de todo
    partes.append(
        '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="none" '
        'stroke="#fff" stroke-width="2.5"/>' % (x0, y0, x1 - x0, y1 - y0))

    # Escala: 100 m medidos sobre la propia imagen
    m100 = 100.0 * dlon * LADO_PX / (bbox[2] - bbox[0])
    partes.append(
        '<g transform="translate(18,%d)">'
        '<rect x="0" y="-9" width="%.1f" height="4" fill="#fff"/>'
        '<text x="%.1f" y="-14" fill="#fff" font-size="13" font-family="system-ui,sans-serif" '
        'text-anchor="middle">100 m</text></g>' % (LADO_PX - 18, m100, m100 / 2.0))

    detectada = predio.get("area_detectada_ha")
    pie = "%s · %d · declarado %.1f ha · con actividad agrícola %.2f ha" % (
        predio["id"], anio, area, detectada if detectada is not None else 0.0)

    return """<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 %d %d" width="%d" height="%d" role="img"
     aria-label="Imagen Sentinel-2 de %s en %d, con el polígono declarado y la rejilla de medición">
  <defs>
    <pattern id="rayado" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="7" stroke="#ffffff" stroke-width="1.4" stroke-opacity="0.55"/>
    </pattern>
  </defs>
  %s
  <text x="12" y="22" fill="#fff" font-size="15" font-family="system-ui,sans-serif"
        font-weight="600">%s</text>
  <text x="12" y="%d" fill="#fff" font-size="11" font-family="system-ui,sans-serif"
        fill-opacity="0.85">Contains modified Copernicus Sentinel data %d</text>
</svg>
""" % (LADO_PX, LADO_PX, LADO_PX, LADO_PX, predio["id"], anio,
       "\n  ".join(partes), pie, LADO_PX - 10, anio)


def main():
    ids = [a for a in sys.argv[1:] if not a.startswith("--")]
    anios = ANIOS
    if "--anios" in sys.argv:
        anios = [int(x) for x in sys.argv[sys.argv.index("--anios") + 1].split(",")]

    with open(os.path.join(DATA, "predios.json"), encoding="utf-8") as f:
        doc = json.load(f)
    seleccion = [p for p in doc["predios"] if not ids or p["id"] in ids]

    if not os.path.isdir(SALIDA):
        os.makedirs(SALIDA)

    token = ing.obtener_token()
    print("Copernicus Data Space · token OK · color natural, mosaico de menor nubosidad\n")

    for predio in seleccion:
        if not predio.get("medicion_area"):
            print("· %-14s SIN medicion_area — corre antes: python3 scripts/medir_area.py --escribir"
                  % predio["id"])
            continue
        for anio in anios:
            sys.stdout.write("· %-14s %d ... " % (predio["id"], anio))
            sys.stdout.flush()

            png, bbox, usado = None, None, None
            for umbral in UMBRALES_NUBE:
                png, bbox = descargar(token, predio["coordenadas"]["lat"],
                                      predio["coordenadas"]["lon"],
                                      predio["area_declarada_ha"], anio, umbral)
                usado = umbral
                if len(png) >= PNG_MINIMO:
                    break
                sys.stdout.write("(vacía a %d%% nubes) " % umbral)
                sys.stdout.flush()

            if len(png) < PNG_MINIMO:
                print("SIN IMAGEN UTILIZABLE en %d — ese año no hay escena despejada" % anio)
                continue

            ruta = os.path.join(SALIDA, "%s-%d.svg" % (predio["id"], anio))
            with open(ruta, "w", encoding="utf-8") as f:
                f.write(svg(predio, png, bbox, anio))
            print("%d KB · nubes ≤%d%% → assets/satelite/%s-%d.svg"
                  % (len(png) // 1024, usado, predio["id"], anio))

    print("\nRecuerda actualizar imagenes_satelitales en predios.json si cambiaron los años.")


if __name__ == "__main__":
    main()
