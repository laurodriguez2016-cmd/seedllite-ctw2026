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

CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
[ -x "$CHROME" ] || CHROME="/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
RAIZ="file:///$(pwd | sed 's|^/\([a-z]\)|\1:|')/index.html"

PREDIOS="huila-cafe tolima-arroz boyaca-papa meta-cacao"
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

echo "── Barrido de las 14 rutas ──────────────────────────────────"

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
    "Puntaje SEEDLLITE" "Evaluar otro predio" "de 1000" "intermediario financiero vigilado"
done

comprobar "#cartera" "5 · cartera" "Cartera evaluada" "Ciclos 24m" "Decisión"

echo "── Resultado ────────────────────────────────────────────────"
if [ "$FALLOS" -eq 0 ]; then
  printf '\033[32m LAS 14 RUTAS SE ARMAN COMPLETAS\033[0m\n'
else
  printf '\033[31m %d RUTA(S) INCOMPLETAS\033[0m\n' "$FALLOS"
  exit 1
fi
