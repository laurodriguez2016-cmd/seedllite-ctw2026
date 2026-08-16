#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Busca coordenadas reales cuya serie NDVI de Copernicus muestre la fenologia
que necesita cada caso del demo. Barre una rejilla y puntua cada candidato.
"""
import json, math, os, sys, time, urllib.request, urllib.error

DIR = os.path.dirname(os.path.abspath(__file__))
URL = "https://sh.dataspace.copernicus.eu/api/v1/statistics"
RES = 10.0 / 111320.0

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
  var malo   = [0, 1, 3, 6, 8, 9, 10, 11].indexOf(s.SCL) > -1;
  var suma   = s.B08 + s.B04;
  var valido = (suma !== 0 && !malo) ? 1 : 0;
  return { ndvi: [suma === 0 ? 0 : (s.B08 - s.B04) / suma],
           dataMask: [s.dataMask * valido] };
}
"""


def token():
    import urllib.parse
    env = {}
    for ln in open("os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".env")"):
        ln = ln.strip()
        if ln and not ln.startswith("#") and "=" in ln:
            k, v = ln.split("=", 1)
            env[k] = v
    datos = urllib.parse.urlencode({
        "grant_type": "client_credentials",
        "client_id": env["CDSE_CLIENT_ID"],
        "client_secret": env["CDSE_CLIENT_SECRET"],
    }).encode()
    req = urllib.request.Request(
        "https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token",
        data=datos, headers={"content-type": "application/x-www-form-urlencoded"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read())["access_token"]


TOK = token()


def poligono(lat, lon, area_ha):
    lado = math.sqrt(area_ha * 10000.0)
    dlat = (lado / 2.0) / 110574.0
    dlon = (lado / 2.0) / (111320.0 * math.cos(math.radians(lat)))
    return [[[lon - dlon, lat - dlat], [lon + dlon, lat - dlat],
             [lon + dlon, lat + dlat], [lon - dlon, lat + dlat],
             [lon - dlon, lat - dlat]]]


def serie(lat, lon, ha):
    cuerpo = {
        "input": {"bounds": {"geometry": {"type": "Polygon", "coordinates": poligono(lat, lon, ha)},
                             "properties": {"crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"}},
                  "data": [{"type": "sentinel-2-l2a", "dataFilter": {"mosaickingOrder": "leastCC"}}]},
        "aggregation": {"timeRange": {"from": "2017-01-01T00:00:00Z", "to": "2026-01-01T00:00:00Z"},
                        "aggregationInterval": {"of": "P1M"},
                        "resx": RES, "resy": RES, "evalscript": EVALSCRIPT},
        "calculations": {"default": {"statistics": {"default": {"percentiles": {"k": [50]}}}}},
    }
    req = urllib.request.Request(URL, data=json.dumps(cuerpo).encode(),
                                 headers={"Content-Type": "application/json",
                                          "Accept": "application/json",
                                          "Authorization": "Bearer " + TOK}, method="POST")
    with urllib.request.urlopen(req, timeout=180) as r:
        d = json.loads(r.read())
    out = []
    for it in d["data"]:
        m = it["interval"]["from"][:7]
        if "outputs" not in it:
            out.append((m, None)); continue
        s = it["outputs"]["ndvi"]["bands"]["B0"]["stats"]
        med = s["percentiles"]["50.0"]
        out.append((m, None if isinstance(med, str) else round(med, 3)))
    return out


def contar_ciclos(vals):
    """Mismo detector que generar_series_ndvi.py: cruces sobre umbrales derivados
    de la amplitud observada. Lee la FORMA, no el nivel."""
    v = [x for x in vals if x is not None]
    if len(v) < 20:
        return 0, 0.0
    o = sorted(v)
    p10, p90 = o[int(len(o) * .10)], o[int(len(o) * .90)]
    amp = p90 - p10
    if amp < 0.10:
        return 0, amp
    alto, bajo = p10 + amp * .70, p10 + amp * .30
    n, armado = 0, False
    for x in vals:
        if x is None:
            continue
        if not armado and x >= alto:
            armado = True
        elif armado and x <= bajo:
            n += 1; armado = False
    return n, amp


def evaluar(pid, lat, lon, ha):
    s = serie(lat, lon, ha)
    vals = [x for _, x in s]
    con = sum(1 for x in vals if x is not None)
    ciclos, amp = contar_ciclos(vals)
    recientes = [x for m, x in s if m >= "2024-01"]
    c24, _ = contar_ciclos(recientes)
    pico = max([x for x in vals if x is not None] or [0])
    return {"lat": lat, "lon": lon, "meses": con, "amplitud": round(amp, 3),
            "ciclos": ciclos, "ciclos24": c24, "pico": pico, "serie": s}


def barrer(nombre, lat0, lon0, ha, radio, paso, criterio, tope=40):
    print("\n" + "=" * 78)
    print("BUSCANDO: %s   centro (%.4f, %.4f)  ±%.3f°" % (nombre, lat0, lon0, radio))
    print("=" * 78)
    cands, n = [], 0
    ks = [i * paso for i in range(-int(radio / paso), int(radio / paso) + 1)]
    for dl in ks:
        for dn in ks:
            if n >= tope:
                break
            n += 1
            try:
                r = evaluar(nombre, lat0 + dl, lon0 + dn, ha)
            except Exception as e:
                continue
            if criterio(r):
                cands.append(r)
                print("  ✓ (%.4f, %.4f)  meses=%3d  amp=%.2f  pico=%.2f  ciclos=%2d  24m=%d" % (
                    r["lat"], r["lon"], r["meses"], r["amplitud"], r["pico"],
                    r["ciclos"], r["ciclos24"]))
    cands.sort(key=lambda r: (-r["amplitud"], -r["meses"]))
    return cands


if __name__ == "__main__":
    cual = sys.argv[1] if len(sys.argv) > 1 else "arroz"

    if cual == "arroz":
        # Distrito de riego del Espinal / Guamo, Tolima. Arroz de dos semestres.
        c = barrer("arroz", 4.1489, -74.8836, 6.1, 0.045, 0.015,
                   lambda r: r["amplitud"] >= 0.30 and r["meses"] >= 60, tope=49)
    elif cual == "papa":
        # Altiplano de Ventaquemada, Boyaca. Papa, ciclo corto.
        c = barrer("papa", 5.3672, -73.5218, 1.8, 0.030, 0.010,
                   lambda r: r["amplitud"] >= 0.28 and r["meses"] >= 55, tope=49)
    elif cual == "cacao":
        # Granada, Meta. Se busca algo con ciclo que se aplane al final.
        c = barrer("cacao", 3.5421, -73.7059, 4.0, 0.040, 0.013,
                   lambda r: r["meses"] >= 65 and r["pico"] >= 0.55, tope=49)
    else:
        # Pitalito, Huila. Cafe: perenne, vigor alto y estable, pocas nubes.
        c = barrer("cafe", 1.8534, -76.0521, 2.4, 0.030, 0.010,
                   lambda r: r["meses"] >= 75 and r["pico"] >= 0.80, tope=49)

    print("\n--- MEJORES 3 ---")
    for r in c[:3]:
        print("\n(%.4f, %.4f)  meses=%d  amplitud=%.2f  ciclos=%d  ultimos24m=%d" % (
            r["lat"], r["lon"], r["meses"], r["amplitud"], r["ciclos"], r["ciclos24"]))
        por = {}
        for m, x in r["serie"]:
            por.setdefault(m[:4], []).append(x)
        for a in sorted(por):
            print("   ", a, " ".join("  . " if x is None else "%.2f" % x for x in por[a]))
    json.dump([{k: v for k, v in r.items()} for r in c[:5]],
              open(os.path.join(DIR, "cand_%s.json" % cual), "w"), indent=1)
