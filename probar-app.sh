#!/usr/bin/env bash
# ==========================================================================
# probar_app.sh — barrido de humo del frente APP
# Frente 🅰 APP
#
# Recorre las 14 rutas de la aplicación en Chrome headless (JavaScript real,
# tiempo virtual acelerado) y comprueba que cada pantalla termine de armarse.
#
# Para la pantalla 3 no es un detalle: el tiempo virtual adelanta los
# setTimeout, así que si la cadena de seis pasos + tecleo se rompe a la mitad,
# el botón final no aparece y esto lo caza. A mano habría que mirar 10,5
# segundos por predio.
#
#   bash scripts/probar_app.sh
# ==========================================================================

# Chrome en Windows y en macOS: el equipo trabaja en los dos. Antes solo
# miraba Windows, asi que en un Mac $CHROME apuntaba a un binario inexistente,
# el DOM volvia vacio y reportaba las 14 rutas incompletas. Un falso 14/14 a
# las cinco de la manana cuesta media hora de panico.
for c in \
  "/c/Program Files/Google/Chrome/Application/chrome.exe" \
  "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "$(command -v google-chrome 2>/dev/null)" "$(command -v chromium 2>/dev/null)"
do
  [ -n "$c" ] && [ -x "$c" ] && CHROME="$c" && break
done
if [ -z "$CHROME" ]; then
  printf '\033[31m ✗\033[0m No se encontro Chrome ni Chromium.\n'; exit 2
fi
case "$(uname -s)" in
  MINGW*|MSYS*|CYGWIN*) RAIZ="file:///$(pwd | sed 's|^/\([a-z]\)|\1:|')/index.html" ;;
  *)                    RAIZ="file://$(pwd)/index.html" ;;
esac

PREDIOS="huila-cafe tolima-arroz boyaca-papa meta-cacao boyaca-papa-nubes          meta-cacao-productivo meta-cacao-sin-manejo boyaca-papa-media          meta-cacao-vigor-bajo"
FALLOS=0

verde() { printf '\033[32m ✓\033[0m %s\n' "$1"; }
rojo()  { printf '\033[31m ✗\033[0m %s\n' "$1"; FALLOS=$((FALLOS + 1)); }

# render <ruta> — devuelve el DOM ya pintado
render() {
  "$CHROME" --headless=new --disable-gpu --no-sandbox \
            --virtual-time-budget=16000 --dump-dom "$RAIZ$1" 2>/dev/null
}

# comprobar <ruta> <descripcion> <patron...>
comprobar() {
  ruta="$1"; desc="$2"; shift 2
  dom=$(render "$ruta")
  faltan=""
  for pat in "$@"; do
    echo "$dom" | grep -qF "$pat" || faltan="$faltan  «$pat»"
  done
  if [ -n "$faltan" ]; then rojo "$desc — falta:$faltan"; else verde "$desc"; fi
}

echo "── Barrido de todas las rutas ──────────────────────────────────"

comprobar "#mapa" "1 · mapa" "Predios evaluados" "Cartera en evaluación" "Pitalito"

for p in $PREDIOS; do
  comprobar "#ficha/$p" "2 · ficha $p" \
    "Historial productivo satelital" "Evaluar con SEEDLLITE" "Ciclos completos ("
done

for p in $PREDIOS; do
  # El boton final solo existe si los 6 pasos y el tecleo llegaron al final.
  comprobar "#analisis/$p" "3 · analisis $p" \
    "Generado por Claude" "Ver dictamen completo" "Repetir an" "observaciones mensuales"
done

for p in $PREDIOS; do
  comprobar "#dictamen/$p" "4 · dictamen $p" \
    "Puntaje SEEDLLITE" "Evaluar otro predio" "intermediario financiero vigilado"
done

comprobar "#cartera" "5 · cartera" "Cartera evaluada" "Ciclos 24m" "Decisión"

echo "── Contrato v1.2 · el estado sin concepto ──────────────────────"

# boyaca-papa-nubes es el predio que el sistema declara que no puede evaluar.
# Si algún día vuelve a caer al else de la decisión, se pinta de verde y se
# lee como aprobado: un predio no evaluado presentado como aprobación.
dom=$(render "#dictamen/boyaca-papa-nubes")

echo "$dom" | grep -qF "decision-aplazar"   && verde "no evaluado va en tono neutro"   || rojo  "no evaluado NO lleva la clase decision-aplazar"

echo "$dom" | grep -qF "decision-aprobar"   && rojo  "PELIGRO: un predio sin concepto se está pintando como aprobado"   || verde "no se pinta como aprobación"

echo "$dom" | grep -qF "Sin concepto"   && verde "muestra «Sin concepto» en vez del cero"   || rojo  "muestra el puntaje 0 en vez de «Sin concepto»"

echo "── Capturas satelitales ────────────────────────────────────────"

comprobar "#ficha/meta-cacao" "imagenes en la ficha"   "assets/satelite/meta-cacao-2017.svg" "assets/satelite/meta-cacao-2025.svg"

echo "── Resultado ────────────────────────────────────────────────"
if [ "$FALLOS" -eq 0 ]; then
  printf '\033[32m TODAS LAS RUTAS SE ARMAN COMPLETAS\033[0m\n'
else
  printf '\033[31m %d RUTA(S) INCOMPLETAS\033[0m\n' "$FALLOS"
  exit 1
fi
