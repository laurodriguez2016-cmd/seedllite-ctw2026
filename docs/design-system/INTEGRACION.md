# Cómo llevar el design system "Industry" a la app

> **Para el frente APP.** Laura entregó el design system y un mockup de las cinco pantallas.
> Este archivo dice **qué se puede copiar tal cual, qué hay que traducir, y qué no puede cruzar
> nunca.** Léelo antes de tocar `assets/app.css`.
>
> Integrado 15-ago-2026, 23:40.

---

## Lo que hay en esta carpeta

| Archivo | Qué es | Cómo se usa |
|---|---|---|
| `styles.css` | **El design system.** Tokens, componentes, estados | Se traduce a `assets/app.css` — ver §2 |
| `LEEME-industry.md` | La guía de Laura: dirección, color, tipografía, componentes | Es el criterio. Cuando dudes, gana este archivo |
| `mockup-SEEDLLITE.html` | **Mockup de las 5 pantallas** con datos de ejemplo | Referencia visual. **No se despliega** — ver §3 |
| `mockup-support.js` | El motor del mockup | Referencia |
| `_ds_manifest.json` | Manifiesto de tokens generado | Referencia |

Abre `mockup-SEEDLLITE.html` con doble clic para ver a qué apuntamos. Necesita internet: el
mockup sí puede darse ese lujo, la app no.

---

## 1. La estética, en una frase

Azul acero sobre fondo técnico claro. **Todo es un objeto de plano:** esquina recta, borde de
un pelo, y cuatro marcas de registro `+` en las esquinas. Las tarjetas y las figuras son dibujos
de línea transparentes; **el único objeto sólido de la pantalla es el botón primario.**

Eso encaja bien con lo que ya construimos: una herramienta de riesgo crediticio, no una landing.

---

## 2. ⛔ Lo que NO puede cruzar a la app

El design system y el mockup traen cuatro recursos externos. **Los cuatro rompen el requisito
de abrir con doble clic** (constitución V.4): bajo `file://` el navegador los bloquea por CORS o
exigen internet, y la pantalla queda en blanco. `./verificar.sh` los detecta y falla.

| Dónde | Qué | Por qué no puede |
|---|---|---|
| `styles.css:2` | `@import` de **Google Fonts** (Barlow, Barlow Condensed) | Exige internet. `verificar.sh` marca `googleapis.com` |
| `mockup:12` | `unpkg.com/d3` | CDN |
| `mockup:13` | `unpkg.com/topojson-client` | CDN |
| `mockup:558` | `fetch()` de `world-atlas` desde jsDelivr | **`fetch()` + CDN**, los dos prohibidos |

### Las traducciones

**Tipografía.** Hay que **vendorizar los `.woff2` de Barlow y Barlow Condensed** dentro de
`assets/fuentes/` y reemplazar el `@import` por `@font-face` con rutas relativas. Mientras eso
no esté, usa la pila de respaldo y la app se ve con la tipografía del sistema:

```css
--font-heading: "Barlow Condensed", "Arial Narrow", system-ui, sans-serif;
--font-body: "Barlow", system-ui, -apple-system, sans-serif;
```

**El mapa.** El mockup dibuja el mapa bajando `world-atlas` con `fetch()` y proyectándolo con
d3. **Eso no se copia.** `assets/10-mapa.js` ya resuelve el mapa de Colombia con un SVG propio y
una proyección equirectangular de ~120 líneas, funciona offline y ya está probado. Toma del
mockup **el aspecto** del mapa, no su implementación.

**Los iconos.** El sistema pide Lucide a stroke 1.5. Lucide por CDN está prohibido: copia como
SVG inline **solo los iconos que uses**, manteniendo `stroke-width="1.5"`.

> Regla general: del mockup se copia **el diseño**, nunca las dependencias. Si un componente del
> mockup necesita una librería, se reimplementa en SVG o CSS plano.

---

## 3. Qué tomar del mockup, pantalla por pantalla

El mockup usa plantillas tipo Vue (`{{ predio.productor }}`) sobre cinco vistas que mapean casi
uno a uno contra las que ya existen en `assets/30-vistas.js`:

| Mockup | Vista en la app | Qué copiar |
|---|---|---|
| Predios en evaluación | `vistas.mapa()` | Composición de la rejilla y la tarjeta de predio |
| Ficha del productor | `vistas.ficha()` | Jerarquía tipográfica y el tratamiento de cifras |
| Evaluando… | `vistas.analisis()` | **El ritmo del proceso** — es la pantalla del video |
| Decisión | `vistas.dictamen()` | Cómo se lee el veredicto de un golpe |
| Los cuatro expedientes | `vistas.cartera()` | La tabla |

⚠️ **El mockup se hizo con los datos anteriores.** Si muestra a `meta-cacao` rechazado por
abandono o por falta de ciclos, **está desactualizado**: el rechazo ahora es por área —0,5 ha
con actividad de 4,0 declaradas— y los puntajes cambiaron. Manda `data/datos.js`, no el mockup.

---

## 4. Lo que ya está en la app y no hay que rehacer

Antes de reescribir `app.css` entero, ten presente que la app ya resuelve:

- Tema claro y oscuro por `prefers-color-scheme` con tokens en `:root`.
- Mapa SVG de Colombia con proyección propia, offline.
- Gráfica NDVI en SVG a mano, con bandas de eventos climáticos y puntos atenuados por nubosidad.
- Las cinco pantallas navegables con router por `hash`.

**El design system es una capa de estética sobre eso, no un reemplazo.** La migración correcta
es sustituir el bloque de tokens de `:root` en `assets/app.css` por los de `styles.css` y luego
ajustar componentes — no empezar de cero a las dos de la mañana.

---

## 5. Orden sugerido

1. **Tokens primero.** Copia el bloque `--color-*`, `--font-*`, `--space-*`, `--radius-*`,
   `--shadow-*` a `:root` en `assets/app.css`. Con eso solo, la app ya cambia de piel.
2. **El marco `blueprint`.** La clase más la de las cuatro esquinas `+`. Es lo que hace que se
   vea como un plano y es barato de aplicar.
3. **Tarjetas y tabla.** Bordes de un pelo, esquina recta, sin relleno.
4. **Botón primario** como único objeto sólido.
5. **Tipografía**, cuando las fuentes estén vendorizadas.

Después de cada paso: `./verificar.sh` y abrir `index.html` con doble clic.
