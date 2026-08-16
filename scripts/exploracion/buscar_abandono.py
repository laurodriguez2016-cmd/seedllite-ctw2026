#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Busca la firma del ABANDONO en datos reales: una parcela que ciclaba y se aplano.

Criterio duro:
  - ciclos(2017-2022) >= 5          -> hubo actividad agricola verificable
  - amplitud(2024-2025) <= 0.18     -> la serie se aplano
  - meses medidos >= 70             -> hay con que sostener la afirmacion
  - ndvi mediano 2024-25 >= 0.35    -> NO esta pelado: hay rastrojo. Ese es el matiz.
"""
import json, math, os, sys, urllib.parse, urllib.request, urllib.error

DIR = os.path.dirname(os.path.abspath(__file__))
URL = "https://sh.dataspace.copernicus.eu/api/v1/statistics"
RES = 10.0 / 111320.0
EV = open(os.path.join(DIR, "evalscript.js")).read()


def token():
    env = {}
    for ln in open("os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".env")"):
        ln = ln.strip()
        if ln and not ln.startswith("#") and "=" in ln:
            k, v = ln.split("=", 1); env[k] = v
    d = urllib.parse.urlencode({"grant_type": "client_credentials",
                                "client_id": env["CDSE_CLIENT_ID"],
                                "client_secret": env["CDSE_CLIENT_SECRET"]}).encode()
    r = urllib.request.Request(
        "https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token",
        data=d, headers={"content-type": "application/x-www-form-urlencoded"})
    with urllib.request.urlopen(r, timeout=60) as x:
        return json.loads(x.read())["access_token"]


TOK = token()


def poli(lat, lon, ha):
    lado = math.sqrt(ha * 10000.0)
    dla = (lado / 2.0) / 110574.0
    dlo = (lado / 2.0) / (111320.0 * math.cos(math.radians(lat)))
    return [[[lon - dlo, lat - dla], [lon + dlo, lat - dla], [lon + dlo, lat + dla],
             [lon - dlo, lat + dla], [lon - dlo, lat - dla]]]


def serie(lat, lon, ha):
    c = {"input": {"bounds": {"geometry": {"type": "Polygon", "coordinates": poli(lat, lon, ha)},
                              "properties": {"crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"}},
                   "data": [{"type": "sentinel-2-l2a", "dataFilter": {"mosaickingOrder": "leastCC"}}]},
         "aggregation": {"timeRange": {"from": "2017-01-01T00:00:00Z", "to": "2026-01-01T00:00:00Z"},
                         "aggregationInterval": {"of": "P1M"}, "resx": RES, "resy": RES,
                         "evalscript": EV},
         "calculations": {"default": {"statistics": {"default": {"percentiles": {"k": [50]}}}}}}
    rq = urllib.request.Request(URL, data=json.dumps(c).encode(),
                                headers={"Content-Type": "application/json",
                                         "Accept": "application/json",
                                         "Authorization": "Bearer " + TOK}, method="POST")
    with urllib.request.urlopen(rq, timeout=180) as x:
        d = json.loads(x.read())
    out = []
    for it in d["data"]:
        m = it["interval"]["from"][:7]
        if "outputs" not in it:
            out.append((m, None)); continue
        s = it["outputs"]["ndvi"]["bands"]["B0"]["stats"]
        v = s["percentiles"]["50.0"]
        out.append((m, None if isinstance(v, str) else round(v, 3)))
    return out


def amplitud(vals):
    v = sorted(x for x in vals if x is not None)
    if len(v) < 6:
        return 0.0
    return v[int(len(v) * .90)] - v[int(len(v) * .10)]


def ciclos(vals, minimo=8):
    v = [x for x in vals if x is not None]
    if len(v) < minimo:
        return 0
    o = sorted(v); p10, p90 = o[int(len(o) * .10)], o[int(len(o) * .90)]
    amp = p90 - p10
    if amp < 0.10:
        return 0
    alto, bajo = p10 + amp * .70, p10 + amp * .30
    n, arm = 0, False
    for x in vals:
        if x is None: continue
        if not arm and x >= alto: arm = True
        elif arm and x <= bajo: n += 1; arm = False
    return n


def mediana(vals):
    v = sorted(x for x in vals if x is not None)
    return v[len(v) // 2] if v else 0.0


LAT0, LON0, HA = 3.5421, -73.7059, 4.0
RADIO, PASO = 0.10, 0.02
ks = [round(i * PASO, 4) for i in range(-int(RADIO / PASO), int(RADIO / PASO) + 1)]

print("Barrido de abandono alrededor de Granada, Meta — %d puntos" % (len(ks) ** 2))
hallazgos = []
n = 0
for dla in ks:
    for dlo in ks:
        n += 1
        lat, lon = round(LAT0 + dla, 4), round(LON0 + dlo, 4)
        try:
            s = serie(lat, lon, HA)
        except Exception:
            continue
        vals = [v for _, v in s]
        medidos = sum(1 for v in vals if v is not None)
        viejo = [v for m, v in s if m < "2023-01"]
        nuevo = [v for m, v in s if m >= "2024-01"]
        c_viejo = ciclos(viejo)
        amp_nuevo = amplitud(nuevo)
        med_nuevo = mediana(nuevo)
        if medidos >= 70 and c_viejo >= 5 and amp_nuevo <= 0.18 and med_nuevo >= 0.35:
            hallazgos.append((lat, lon, medidos, c_viejo, amp_nuevo, med_nuevo, s))
            print("  *** (%.4f, %.4f)  medidos=%d  ciclos17-22=%d  amp24-25=%.2f  ndvi24-25=%.2f"
                  % (lat, lon, medidos, c_viejo, amp_nuevo, med_nuevo))
        if n % 25 == 0:
            print("  ... %d/%d revisados, %d hallazgos" % (n, len(ks) ** 2, len(hallazgos)))

print("\n=== %d PARCELAS CON FIRMA DE ABANDONO ===" % len(hallazgos))
hallazgos.sort(key=lambda h: (-h[3], h[4]))
for lat, lon, med, cv, an, mn, s in hallazgos[:4]:
    print("\n(%.4f, %.4f)  medidos=%d  ciclos 2017-22=%d  amplitud 24-25=%.2f  ndvi 24-25=%.2f"
          % (lat, lon, med, cv, an, mn))
    por = {}
    for m, v in s:
        por.setdefault(m[:4], []).append(v)
    for a in sorted(por):
        print("   ", a, " ".join("  . " if v is None else "%.2f" % v for v in por[a]))
json.dump([{"lat": h[0], "lon": h[1], "medidos": h[2], "ciclos_viejos": h[3],
            "amp_nueva": h[4], "ndvi_nuevo": h[5], "serie": h[6]} for h in hallazgos],
          open(os.path.join(DIR, "abandono.json"), "w"), indent=1)
