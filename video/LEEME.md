# El video del demo

`seedllite-demo.mp4` — 63 s, 1440×900, ocho planos.

Se genera con `bash grabar-demo.sh` desde la raíz del repositorio. Es determinista: se
corre las veces que haga falta y sale idéntico, con cada plano durando exactamente lo que
dice el guion dentro del script.

## Por qué así y no con una grabadora de pantalla

Una grabación de pantalla depende de que nadie mueva el cursor, de que no entre una
notificación, y de repetir la toma si algo sale mal. Y el destino de este material es una
segunda pasada de animación, que le pone zooms, textos y transiciones: lo que necesita de
nosotros son planos limpios y bien encuadrados, no una captura temblorosa.

`cuadros/` guarda los ocho planos sueltos en PNG por si conviene trabajar plano a plano en
vez de sobre el video ya armado.

## Los ocho planos

| # | Ruta | Seg | Qué cuenta |
|---|---|---|---|
| 01 | `#mapa` | 5 | Nueve predios en evaluación sobre el mapa de Colombia |
| 02 | `#ficha/tolima-arroz` | 6 | Un productor de arroz: 14 ciclos en nueve años |
| 03 | `#analisis/tolima-arroz` | 10 | El análisis corriendo: seis pasos y el memorando escribiéndose |
| 04 | `#dictamen/tolima-arroz` | 7 | El dictamen aprobado, con sus cuatro ejes |
| 05 | `#ficha/meta-cacao` | 7 | El caso del rechazo: la imagen satelital con la rejilla de medición |
| 06 | `#dictamen/meta-cacao` | 8 | Rechazado: 0,5 ha de actividad sobre 4,0 declaradas |
| 07 | `#dictamen/boyaca-papa-nubes` | 8 | Sin concepto: el sistema declara que no puede evaluar |
| 08 | `#cartera` | 6 | La cartera completa: nueve expedientes |

El orden no es el de la aplicación, es el de la historia: primero el país, después la
lote, después la evidencia, después el veredicto. El plano del rechazo va tarde porque
es el remate, y el de "sin concepto" va al final porque es lo que nos diferencia.
