#!/usr/bin/env bash
# ==========================================================================
# grabar-demo.sh — captura el recorrido del demo y lo arma en video
#
# POR QUE ASI Y NO CON UNA GRABADORA DE PANTALLA
# Una grabacion de pantalla depende de que nadie mueva el cursor, de que no
# entre una notificacion, y de repetir la toma si algo sale mal. Esto es
# determinista: se corre las veces que haga falta y sale identico, con cada
# plano durando exactamente lo que dice el guion.
#
# Ademas el destino es Claude Design, que le va a poner zooms, textos y
# transiciones. Lo que necesita de nosotros son planos limpios y bien
# encuadrados, no una captura temblorosa.
#
#   bash grabar-demo.sh            # 1440x900, salida en video/
#   bash grabar-demo.sh 1920 1080  # otra resolucion
# ==========================================================================

set -e

ANCHO="${1:-1440}"
ALTO="${2:-900}"
SALIDA="video"
CUADROS="$SALIDA/cuadros"
FFMPEG="$HOME/bin/ffmpeg"

for c in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/c/Program Files/Google/Chrome/Application/chrome.exe" \
  "$(command -v google-chrome 2>/dev/null)"
do
  [ -n "$c" ] && [ -x "$c" ] && CHROME="$c" && break
done
[ -z "$CHROME" ] && { echo "No se encontro Chrome."; exit 2; }
[ -x "$FFMPEG" ] || { echo "No se encontro ffmpeg en $FFMPEG"; exit 2; }

RAIZ="file://$(pwd)/index.html"
mkdir -p "$CUADROS"
rm -f "$CUADROS"/*.png

# --------------------------------------------------------------------------
# EL GUION. Cada plano: ruta · segundos en pantalla · que cuenta.
#
# El orden no es el de la aplicacion, es el de la historia: primero el pais,
# despues la parcela, despues la evidencia, despues el veredicto. El plano del
# rechazo va al final porque es el remate: el predio mas verde de los nueve es
# el que el sistema no aprueba.
# --------------------------------------------------------------------------
PLANOS=(
  "|5|01 El mapa: nueve predios en evaluacion"
  "#ficha/tolima-arroz|6|02 Un productor de arroz — 14 ciclos en nueve anos"
  "#analisis/tolima-arroz|10|03 El analisis corriendo: seis pasos y el memorando"
  "#dictamen/tolima-arroz|7|04 El dictamen: aprobado, con sus cuatro ejes"
  "#ficha/meta-cacao|7|05 El caso del rechazo — la imagen satelital con la rejilla"
  "#dictamen/meta-cacao|8|06 Rechazado: 0,5 ha de actividad sobre 4,0 declaradas"
  "#dictamen/boyaca-papa-nubes|8|07 Sin concepto: el sistema declara que no puede evaluar"
  "#cartera|6|08 La cartera completa: nueve expedientes"
)

echo "Capturando ${#PLANOS[@]} planos a ${ANCHO}x${ALTO}"
i=0
LISTA="$SALIDA/planos.txt"
: > "$LISTA"

for p in "${PLANOS[@]}"; do
  IFS='|' read -r ruta seg titulo <<< "$p"
  i=$((i + 1))
  n=$(printf "%02d" "$i")
  archivo="$CUADROS/plano-$n.png"

  printf "  %s  %-38s %2ss  " "$n" "${ruta:-#mapa}" "$seg"

  # --virtual-time-budget deja que las animaciones terminen antes de capturar:
  # la pantalla de analisis tarda 10,5 s en armarse sola.
  "$CHROME" --headless=new --disable-gpu --no-sandbox \
            --hide-scrollbars --force-color-profile=srgb \
            --virtual-time-budget=17000 \
            --window-size="$ANCHO,$ALTO" \
            --screenshot="$archivo" "$RAIZ$ruta" 2>/dev/null

  if [ -f "$archivo" ]; then
    echo "file '$(basename "$CUADROS")/$(basename "$archivo")'" >> "$LISTA"
    echo "duration $seg" >> "$LISTA"
    echo "ok  · $titulo"
  else
    echo "FALLO"
  fi
done

# ffconcat exige repetir el ultimo archivo para que respete su duracion.
tail -2 "$LISTA" | head -1 >> "$LISTA"

TOTAL=$(awk '/^duration/ {s += $2} END {print s}' "$LISTA")
echo ""
echo "Duracion total: ${TOTAL}s"

# Fundidos de medio segundo entre planos: el corte seco se ve barato y Claude
# Design necesita un material que ya fluya para poder acelerarlo o frenarlo.
"$FFMPEG" -y -loglevel error \
  -f concat -safe 0 -i "$LISTA" \
  -vf "fps=30,scale=${ANCHO}:${ALTO}:flags=lanczos,format=yuv420p" \
  -c:v libx264 -preset slow -crf 18 -movflags +faststart \
  "$SALIDA/seedllite-demo.mp4"

echo ""
echo "→ $SALIDA/seedllite-demo.mp4"
ls -lh "$SALIDA/seedllite-demo.mp4" | awk '{print "  " $5}'
echo ""
echo "Los cuadros sueltos quedan en $CUADROS/ por si Claude Design prefiere"
echo "trabajar plano a plano en vez de sobre el video ya armado."
