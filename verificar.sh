#!/usr/bin/env bash
# verificar.sh — SEEDLLITE
#
# Las comprobaciones que se corren ANTES de cada integración a main.
# Dos minutos. Si alguna falla, no se integra.
#
#     ./verificar.sh
#
# Existe porque los tres fallos que de verdad matan este proyecto son
# silenciosos: un JSON que ya no cumple el contrato, un fetch() que rompe el
# doble clic, y una clave commiteada. Ninguno de los tres da error hasta que es
# tarde. Aquí los tres gritan.

set -u
cd "$(dirname "$0")"

VERDE=$'\033[32m'; ROJO=$'\033[31m'; AMBAR=$'\033[33m'; FIN=$'\033[0m'
FALLOS=0

titulo() { printf '\n%s\n' "── $1 ──────────────────────────────────────────"; }
ok()     { printf '%s ✓ %s%s\n' "$VERDE" "$1" "$FIN"; }
mal()    { printf '%s ✗ %s%s\n' "$ROJO" "$1" "$FIN"; FALLOS=$((FALLOS + 1)); }
aviso()  { printf '%s ! %s%s\n' "$AMBAR" "$1" "$FIN"; }

# ---------------------------------------------------------------------------
titulo "1 · El contrato de datos se cumple"
# ---------------------------------------------------------------------------
if python3 scripts/validar_contrato.py; then
  ok "los tres JSON son conformes a data/CONTRATO-DATOS.md"
else
  mal "el contrato de datos no se cumple (detalle arriba)"
fi

# ---------------------------------------------------------------------------
titulo "2 · El pipeline de datos corre limpio"
# ---------------------------------------------------------------------------
if python3 scripts/empaquetar_datos.py > /tmp/seedllite_empaq.log 2>&1; then
  ok "$(grep -m1 'OK' /tmp/seedllite_empaq.log || echo 'data/datos.js regenerado')"
  grep '^  !' /tmp/seedllite_empaq.log || true
else
  mal "empaquetar_datos.py falló:"
  sed 's/^/      /' /tmp/seedllite_empaq.log
fi

# ---------------------------------------------------------------------------
titulo "3 · La app abre con doble clic (file://)"
# ---------------------------------------------------------------------------
# Bajo file:// el navegador trata cada archivo como origen opaco: fetch() y los
# ES modules mueren por CORS y la pantalla queda en blanco. Es el bug que
# aparece a las 6am grabando el video. Ver ARQUITECTURA.md §2.
if [ ! -f index.html ]; then
  aviso "todavía no hay index.html en esta rama — se salta"
else
  # Se buscan los patrones sobre el codigo CON LOS COMENTARIOS YA QUITADOS.
  #
  # Por que: la version anterior grepeaba el archivo crudo y saltaba con el propio
  # comentario de index.html que explicaba por que no se deben usar modulos —
  # porque para explicarlo hay que nombrarlos. El frente APP lo resolvio
  # reescribiendo el comentario para que no contuviera las cadenas literales.
  # Diagnostico correcto, correccion al reves: se cambio lo medido para que el
  # guardian callara, y el comentario perdio justo la advertencia que un futuro
  # mantenedor necesita leer.
  #
  # Cuando un guardian grita en falso se arregla el guardian, no la cosa medida.
  # Se quitan comentarios de bloque, de linea y comentarios HTML antes de mirar.
  DESNUDO=$(mktemp)
  for f in index.html $(find assets -name '*.js' -o -name '*.html' 2>/dev/null); do
    [ -f "$f" ] || continue
    python3 - "$f" >> "$DESNUDO" <<'PYEOF'
import re, sys
ruta = sys.argv[1]
t = open(ruta, encoding="utf-8", errors="replace").read()
t = re.sub(r'<!--.*?-->', '', t, flags=re.S)      # comentarios HTML
t = re.sub(r'/\*.*?\*/', '', t, flags=re.S)       # comentarios de bloque JS/CSS
t = re.sub(r'(?m)^\s*//.*$', '', t)                # comentarios de linea
for n, linea in enumerate(t.split("\n"), 1):
    print("%s:%d:%s" % (ruta, n, linea))
PYEOF
  done

  PROHIBIDO=0
  for patron in 'fetch(' 'type="module"' "type='module'" 'import ' 'XMLHttpRequest'; do
    if grep -F "$patron" "$DESNUDO" | head -3 | grep -q .; then
      mal "aparece «$patron» en codigo — eso rompe el doble clic"
      grep -F "$patron" "$DESNUDO" | head -3 | sed 's/^/      /'
      PROHIBIDO=1
    fi
  done
  rm -f "$DESNUDO"
  [ "$PROHIBIDO" -eq 0 ] && ok "sin fetch, sin import, sin type=module"

  for cdn in 'https://cdn' 'unpkg.com' 'jsdelivr' 'googleapis.com'; do
    if grep -rn -F "$cdn" index.html assets/ 2>/dev/null | head -1 | grep -q .; then
      mal "carga algo desde $cdn — exige internet, no se puede depender de eso"
    fi
  done
fi

# ---------------------------------------------------------------------------
titulo "4 · datos.js es cargable y trae lo que debe"
# ---------------------------------------------------------------------------
if [ ! -f data/datos.js ]; then
  mal "no existe data/datos.js"
else
  python3 - <<'PY'
import json, re, sys
s = open("data/datos.js", encoding="utf-8").read()
if "window.SEEDLLITE_DATOS" not in s:
    print("      no asigna window.SEEDLLITE_DATOS"); sys.exit(1)
cuerpo = s[s.index("=") + 1: s.rstrip().rstrip(";").rindex("}") + 1]
try:
    d = json.loads(cuerpo)
except ValueError as e:
    print("      el objeto embebido no es JSON válido: %s" % e); sys.exit(1)
faltan = [k for k in ("predios", "series") if k not in d]
if faltan:
    print("      faltan claves: %s" % faltan); sys.exit(1)
ids = sorted(p["id"] for p in d["predios"]["predios"])
tiene = "dictamenes" in d and d["dictamenes"].get("dictamenes")
print("      %d predios · %s · dictámenes: %s"
      % (len(ids), ", ".join(ids), "sí" if tiene else "NO"))
sys.exit(0 if tiene else 2)
PY
  case $? in
    0) ok "data/datos.js carga y trae predios, series y dictámenes" ;;
    2) aviso "data/datos.js carga pero AÚN NO tiene dictámenes reales" ;;
    *) mal "data/datos.js no es cargable" ;;
  esac
fi

# ---------------------------------------------------------------------------
titulo "4-bis · Las reglas de crédito se cumplen"
# ---------------------------------------------------------------------------
# validar_contrato.py comprueba la FORMA de los datos; esto comprueba el
# CRITERIO: que las reglas de docs/criterios-de-credito.md se cumplan en las
# salidas del modelo. Un JSON perfectamente valido puede rechazar a un perenne
# por falta de ciclos, o sugerir mas plata de la solicitada.
if [ -f scripts/probar_reglas.py ] && [ -f data/dictamenes.json ]; then
  if python3 scripts/probar_reglas.py > /tmp/seedllite_reglas.txt 2>&1; then
    ok "$(grep -o '[0-9]* comprobaciones pasadas' /tmp/seedllite_reglas.txt | head -1) · todas las reglas de credito se cumplen"
  else
    mal "hay reglas de credito incumplidas"
    grep -A1 '✗' /tmp/seedllite_reglas.txt | head -12 | sed 's/^/      /'
  fi
else
  aviso "todavia no hay dictamenes generados — se salta"
fi

titulo "5 · Ningún secreto commiteado"
# ---------------------------------------------------------------------------
FUGAS=$(git grep -nIE 'sk-or-v1-[A-Za-z0-9]|sk-ant-[A-Za-z0-9]|CDSE_CLIENT_SECRET *= *[A-Za-z0-9]' \
          -- . ':!*.md' ':!verificar.sh' 2>/dev/null || true)
if [ -n "$FUGAS" ]; then
  mal "hay credenciales en archivos versionados:"
  printf '%s\n' "$FUGAS" | sed 's/^/      /'
else
  ok "sin claves en el índice de git"
fi

if git ls-files --error-unmatch .env > /dev/null 2>&1; then
  mal ".env está versionado — sácalo YA: git rm --cached .env"
else
  ok ".env fuera de git"
fi

# ---------------------------------------------------------------------------
titulo "Resultado"
# ---------------------------------------------------------------------------
if [ "$FALLOS" -eq 0 ]; then
  printf '%s TODO EN ORDEN — se puede integrar a main.%s\n\n' "$VERDE" "$FIN"
  exit 0
fi
printf '%s %d COMPROBACIÓN(ES) FALLARON — no integres todavía.%s\n\n' "$ROJO" "$FALLOS" "$FIN"
exit 1
