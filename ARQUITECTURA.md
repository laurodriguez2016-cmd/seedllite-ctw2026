# ARQUITECTURA — SEEDLLITE

> Documento técnico. Complementa `PLAN-MAESTRO.md` (reparto de trabajo) y
> `.specify/memory/constitution.md` (gobierno). **No los contradice ni los modifica.**
>
> Versión 1.0 · 15-ago-2026, 15:40 · Autor: frente 🅱 MOTOR

---

## 0. Resumen para quien tiene prisa

| Decisión | Qué se eligió | Por qué |
|---|---|---|
| **Stack** | HTML + CSS + JS planos. **Cero dependencias, cero build.** | Constitución V. Un `npm install` fallido a las 2am cuesta el proyecto. |
| **Librerías de terceros** | **Ninguna. Ni una.** Gráficas en SVG a mano, mapa en SVG generado. | Ver §3 — la justificación es técnica, no ideológica. |
| **Carga de datos** | `data/datos.js` (un `<script>`), **no `fetch()` de JSON** | ⚠️ Ver §2 — **`fetch()` no funciona con doble clic.** Es el hallazgo crítico. |
| **Módulos JS** | `<script>` clásicos numerados. **Sin `type="module"`, sin `import`** | ⚠️ Mismo motivo que arriba. Los ES modules tampoco cargan bajo `file://`. |
| **Pipeline de datos** | 3 JSON (contrato) → `empaquetar_datos.py` → 1 `datos.js` (consumo) | El JSON sigue siendo la verdad y lo lee el jurado; el `.js` es el artefacto de carga. |
| **Modelo de IA** | `claude-opus-5`, salida forzada por **structured outputs** | §5 — garantiza que el JSON cumpla el contrato. Costo total del proyecto: centavos. |
| **Python** | 3.9, solo `urllib` + `json` + `math` + `random` | Constitución V. Ya verificado: `Python 3.9.6`. |

**Lo que hay que hacer con esto:** nada, ya está construido y corriendo. Se abre
`index.html` con doble clic y funciona. Los tres frentes forkean de aquí.

---

## 1. Estructura de archivos (con dueño)

Respeta exactamente el árbol de `PLAN-MAESTRO.md §2`. Los archivos nuevos se
acomodan dentro de las carpetas ya asignadas — **no se inventó ninguna carpeta nueva**.

```
seedllite-ctw2026/
├── index.html                        🅰 APP      esqueleto + SVG inline del mapa
├── assets/                           🅰 APP
│   ├── app.css                       🅰   sistema de diseño (tokens, claro/oscuro)
│   ├── 10-mapa.js                    🅰   proyección geográfica + render del mapa
│   ├── 20-grafica-ndvi.js            🅰   constructor de la gráfica SVG (autónomo)
│   ├── 30-vistas.js                  🅰   render de las 5 pantallas
│   ├── 90-app.js                     🅰   estado, router, arranque
│   └── satelite/*.jpg                🅱 los produce · 🅰 los consume
│
├── scripts/                          🅱 MOTOR    (exclusivo)
│   ├── generar_series_ndvi.py        🅱   fenología por cultivo → series_ndvi.json
│   ├── ingesta_sentinel.py           🅱   pipeline real Copernicus (lo lee el jurado)
│   ├── generar_dictamen.py           🅱 ⭐ el prompt a Claude → dictamenes.json
│   └── empaquetar_datos.py           🅱   los 3 JSON → data/datos.js
│
├── data/                             🅱 MOTOR    (exclusivo)
│   ├── CONTRATO-DATOS.md             🔒 congelado
│   ├── predios.json                  🅱 ✅
│   ├── series_ndvi.json              🅱 ✅ generado
│   ├── dictamenes.json               🅱 (placeholder hasta que corra el generador)
│   └── datos.js                      🅱 ⚙️ GENERADO — no editar a mano
│
├── docs/ · README.md · video/        🅲 PRODUCTO
└── ARQUITECTURA.md                   este archivo
```

**El prefijo numérico de los `.js` no es decoración: es el orden de carga.**
Sin bundler, el orden de los `<script>` es el orden de ejecución. Numerar el
archivo hace que el orden sea evidente al leer la carpeta y elimina la clase de
bug "funciona en mi máquina porque cargué distinto".

---

## 2. ⚠️ El hallazgo crítico: `file://` mata a `fetch()`

La constitución (V.4) exige: *"Debe abrirse con doble clic sobre `index.html` y funcionar."*

Eso entra en conflicto directo con la forma normal de cargar datos en una web.
**Bajo el protocolo `file://`, el navegador trata cada archivo como un origen
opaco y bloquea por CORS:**

| Técnica | Con `python -m http.server` | Con doble clic (`file://`) |
|---|---|---|
| `fetch('data/predios.json')` | ✅ funciona | 🔴 **CORS error** |
| `<script type="module">` + `import` | ✅ funciona | 🔴 **CORS error** |
| `<img src="assets/x.jpg">` | ✅ | ✅ |
| `<script src="data/datos.js">` | ✅ | ✅ |
| SVG inline dentro del HTML | ✅ | ✅ |

> Este bug no aparece mientras uno desarrolla con un servidor local. Aparece a
> las 6am, cuando alguien abre el archivo para grabar el video y ve una pantalla
> en blanco. **Es exactamente el tipo de fallo que mata proyectos de hackathon.**

### La solución: los JSON siguen siendo la verdad, el `.js` es el vehículo

```
data/predios.json      ┐
data/series_ndvi.json  ├──▶  scripts/empaquetar_datos.py  ──▶  data/datos.js
data/dictamenes.json   ┘                                        (window.SEEDLLITE)
```

- Los **tres JSON del contrato no cambian**. Siguen siendo el formato de
  intercambio entre 🅱 y 🅰, y son lo que el jurado abre para auditar.
- `data/datos.js` es un artefacto **generado**, de una sola línea conceptual:
  `window.SEEDLLITE = { ... }`. La APP solo lee de ahí.
- Cada vez que MOTOR regenera datos, corre `python3 scripts/empaquetar_datos.py`
  y commitea ambos. Un comando, sin ceremonia.

**Consecuencia para 🅰 APP:** nunca escribas `fetch`. Los datos ya están en
`window.SEEDLLITE` cuando arranca `90-app.js`.

**Consecuencia para 🅱 MOTOR:** después de tocar cualquier JSON, re-empaquetar.
Si no, la APP muestra datos viejos y nadie entiende por qué.

---

## 3. Por qué cero librerías (y no es purismo)

Se evaluó usar librerías por CDN (Chart.js, D3, Leaflet). Se descartaron:

1. **Rompen el doble clic.** Un CDN exige internet. En el momento de grabar el
   video, o en el computador del jurado, eso es una apuesta que no hay por qué hacer.
2. **Lo que necesitamos es poco.** Una serie temporal y cuatro pines en un mapa.
   D3 pesa 270 KB para resolver algo que son ~120 líneas de generación de `<path>`.
3. **Control total del render.** La constitución IX exige una estética densa y
   sobria de herramienta de riesgo. Las librerías traen su propia estética y se
   pelea más contra ellas de lo que ahorran.
4. **El SVG a mano se ve mejor aquí.** La gráfica NDVI necesita bandas de eventos
   climáticos de fondo, puntos atenuados por nubosidad y marcadores de ciclo
   detectado. Eso es trabajo de diseño de información, no de configurar una librería.

**Lo único que se "importa" es el navegador:** SVG, CSS custom properties,
`prefers-color-scheme`, `Intl.NumberFormat`. Todo GA desde hace años.

---

## 4. Contratos internos de la APP

Tres módulos con frontera clara. Cada uno se puede probar solo.

### `10-mapa.js` — proyección
```js
SEEDLLITE.mapa.render(svgEl, predios, onSeleccion)
```
El polígono de Colombia y los pines usan **la misma proyección equirectangular**
(`§10-mapa.js: proyectar()`). Por eso los pines caen donde deben: no hay dos
sistemas de coordenadas que sincronizar. Cambiar el encuadre es cambiar una
constante, no re-dibujar el mapa.

### `20-grafica-ndvi.js` — la gráfica
```js
SEEDLLITE.grafica.ndvi({ serie, eventos, ancho, alto }) → SVGElement
```
Función pura: recibe datos, devuelve un `<svg>`. No toca el DOM global, no
conoce el estado de la app. Se puede abrir en aislamiento para iterarla.

### `30-vistas.js` — pantallas
```js
SEEDLLITE.vistas.mapa() · .ficha(id) · .analisis(id) · .dictamen(id) · .cartera()
```
Cada una devuelve el HTML de su pantalla. El router de `90-app.js` decide cuál.

### `90-app.js` — estado y router
Un objeto de estado (`{ vista, predioId }`) y un `hashchange`. El hash en la URL
significa que **se puede abrir el dictamen directo en `index.html#dictamen/meta-cacao`** —
que es lo que se va a querer a las 5am grabando el video sin tener que hacer clic
por toda la app en cada toma.

---

## 5. El motor de IA (`generar_dictamen.py`)

### Modelo: `claude-opus-5`

La constitución II dice que la IA es el núcleo y vale 25 de 100 puntos. El
dictamen es el único artefacto de IA del producto y se generan **4 en total**.

Costo estimado del proyecto completo, incluyendo iteración del prompt:
a $5/MTok entrada y $25/MTok salida, con ~30 corridas de 4 dictámenes,
**el orden de magnitud es un dólar.** El costo no es una variable de decisión
aquí; la calidad del dictamen sí. Se usa el modelo más capaz.

### Llamada: `urllib.request`, sin SDK, vía OpenRouter

La constitución prohíbe dependencias. La API es HTTP + JSON, así que la llamada
completa son ~25 líneas de `urllib`. Además tiene una ventaja para este proyecto
en particular: **el jurado puede leer el archivo completo y ver exactamente qué
se le pidió al modelo y qué headers se mandaron**, sin tener que confiar en el
comportamiento de un SDK que no está en el repo.

Se usa **OpenRouter** como pasarela. La tarifa de `claude-opus-5` a través suyo
es la misma que contra la API directa (US$5 por millón de entrada, US$25 de
salida), así que la elección no cambia el costo estimado del proyecto.

```
POST https://openrouter.ai/api/v1/chat/completions
  Content-Type: application/json
  Authorization: Bearer $OPENROUTER_API_KEY   ← variable de entorno, nunca commiteada
```

### Salida forzada por esquema (structured outputs)

El riesgo obvio de "pedirle JSON a un modelo" es que devuelva JSON que no encaje
con `CONTRATO-DATOS.md` y la APP explote. Se elimina el riesgo de raíz:

```python
"response_format": {
    "type": "json_schema",
    "json_schema": {"name": "dictamen_credito", "strict": True,
                    "schema": ESQUEMA_DICTAMEN},
}
```

`strict: true` obliga a que la salida valide contra el esquema completo; por eso
`ESQUEMA_DICTAMEN` lleva `additionalProperties: false` y `required` exhaustivo
en todos sus niveles.

El esquema en `generar_dictamen.py` es **la traducción literal del contrato de
datos**: `puntaje` entero, `banda_riesgo` con enum de 4 valores, `ejes` con sus
pesos, `evidencia` con `tipo` en `favorable|alerta|critico`. La API garantiza la
forma. Si el contrato cambia, cambia el esquema — en un solo lugar.

### Honestidad (constitución III)

- El prompt vive en el repositorio y es legible.
- `dictamenes.json` lleva `modelo`, `generado` y `nota_ia` diciendo que son
  salidas reales commiteadas y que el demo las reproduce cacheadas.
- La animación de escritura de la pantalla 3 **reproduce** una salida real. La
  interfaz lo rotula. No se presenta como una llamada en vivo.

### Secretos

`.env` está en `.gitignore`. Los scripts leen `OPENROUTER_API_KEY` y
`CDSE_CLIENT_ID` / `CDSE_CLIENT_SECRET` del entorno, y fallan con un mensaje
claro si faltan. El demo **no** necesita ninguna credencial: lee los JSON ya
commiteados. `verificar.sh` comprueba en cada integración que no se haya colado
ninguna clave al índice de git.

---

## 5-bis. La puerta de calidad del contrato (`validar_contrato.py`)

El contrato cambió una vez durante el desarrollo (v1.0 → v1.1, se eliminó
`percentil_vereda`). Los archivos que no se regeneraron quedaron **mudos-rotos**:
el empaquetador los aceptó sin protestar, `datos.js` se generó igual, y la app
pintó `undefined` en pantalla **sin un solo error en consola**.

Ese es el peor fallo posible aquí: silencioso, y se descubre a las 5am. Por eso
`empaquetar_datos.py` ahora corre el validador **antes** de emitir nada, y si el
contrato no se cumple **no regenera `datos.js`** — la app sigue mostrando lo
último bueno en vez de romperse.

Qué comprueba, más allá de que el JSON esté bien formado: enums (`banda_riesgo`,
`decision`, `tipo` de evidencia), rangos (NDVI, nubosidad, puntaje, FAG), que los
tres archivos hablen del mismo conjunto de `id`, que los ejes sean exactamente
los cuatro del contrato v1.1 y sumen 100, que ningún dictamen sugiera más plata
de la solicitada, que toda evidencia incluya la verificación RTDAF/RUPTA, y que
`percentil_vereda` no reaparezca. Los incumplimientos de archivos de
`data/_ejemplo/` se degradan a **aviso**, para no bloquear al frente APP.

---

## 6. Las series NDVI son datos reales (`ingesta_sentinel.py`)

> **Cambio del 15-ago a las 22:30.** La serie dejó de ser calibrada y pasó a ser
> **descargada de Copernicus**. `generar_series_ndvi.py` queda como referencia del
> modelo fenológico; el archivo que consume la app lo produce `ingesta_sentinel.py`.

Una petición por predio a la Statistical API de Sentinel Hub devuelve la mediana
mensual de NDVI sobre el polígono, 108 meses (2017-01 a 2025-12), en unos tres
segundos. No se descarga ninguna imagen: el cálculo ocurre del lado de Copernicus.

**Dos trampas de esa API que costaron encontrar y que están comentadas en el script:**

1. **Con CRS84 la resolución va en grados, no en metros.** Poner `resx: 10`
   pensando en metros pide 10 *grados* y la API devuelve **un solo píxel por
   mes** — sin error, sin advertencia, solo con `sampleCount: 1`. El valor
   correcto es `10/111320`.
2. **Un mes enteramente enmascarado vuelve como la cadena `"NaN"`**, no como
   `null`. Hay que compararlo, no operarlo, o el script revienta a mitad de serie.

**Los huecos son el dato más honesto del archivo.** En el trópico andino entre 19
y 33 de los 108 meses no tienen observación óptica utilizable. Se interpolan
linealmente, se marcan con `"interpolado": true` y `nubosidad: 1.0`, y **quedan
fuera de todos los agregados**. Como la app ya atenúa los puntos con nubosidad
alta, un mes interpolado se distingue en pantalla sin cambiar una línea del
frente APP.

**Por qué 2017 y no 2016:** Sentinel-2 L2A solo tiene cobertura global sistemática
desde enero de 2017. Pedir 2016 devolvería huecos que no son nubes sino ausencia
de producto. Nueve años medidos valen más que diez con uno inventado.

**Las coordenadas se eligieron contra el dato, no en un mapa.** Las originales
eran "ubicaciones plausibles" inventadas y tres de las cuatro no caían sobre
lotes agrícolas: NDVI plano entre 0,13 y 0,28 durante nueve años, o sea suelo
desnudo. Se barrió una rejilla sobre cada zona productora corriendo la serie real
de cada candidato, y se eligieron las que muestran la fenología del cultivo
declarado.

---

## 6-bis. El modelo fenológico de referencia (`generar_series_ndvi.py`)

Se conserva porque documenta qué forma *debería* tener cada cultivo, y sirve de
contraste contra lo que el satélite realmente ve. Cada cultivo tiene un modelo
explícito:

| Cultivo | Ciclos/año | NDVI base | Pico | Comportamiento |
|---|---|---|---|---|
| Café (Huila) | 1 | 0,55 | 0,82 | Perenne: nunca baja a suelo desnudo |
| Arroz (Tolima) | 2 | 0,18 | 0,86 | Dos semestres, suelo desnudo entre ciclos |
| Papa (Boyacá) | 2 | 0,20 | 0,74 | Ciclo corto, alta amplitud |
| Cacao (Meta) | 1 → **abandono** | 0,58 | 0,74 | Se aplana desde 2024: rastrojo sin ciclo |

Encima de la fenología se aplican, en orden:

1. **Eventos ENSO** — El Niño 2023-24 deprime el vigor; La Niña 2022 lo eleva
   levemente y aumenta la nubosidad. La caída de cada predio es distinta: ese
   diferencial es literalmente la evidencia del dictamen ("cayó 18% contra 34%
   del promedio regional").
2. **Ruido de nubosidad** — un valor `nubosidad` por punto. Por encima de 0,6 la
   APP dibuja el punto atenuado. **Esto importa:** una serie perfectamente limpia
   se ve falsa. El ruido de nubes es la firma de un dato satelital real en el trópico.
3. **Semilla fija** (`random.seed`) — las series son **reproducibles**. Correr el
   script dos veces da el mismo archivo. Sin esto, cada corrida ensucia el `git diff`.

El script además **calcula** (no inventa) los agregados que consume el dictamen:
`ciclos_detectados`, `ndvi_pico_promedio`, `percentil_vereda`, y la caída ENSO.

> ⚠️ **Rotulado obligatorio:** el JSON dice, en `nota_datos`, que la serie es
> **calibrada sobre fenología documentada**, no descargada. `ingesta_sentinel.py`
> es el pipeline real y está en el repo para que el jurado lo lea.
> Esto es la constitución III.1, y es lo que separa un demo honesto de uno que miente.

---

## 7. Reglas para trabajar sin pisarse

1. **No `fetch()`, no `import`, no `type="module"`.** (§2)
2. **`data/datos.js` es generado.** Editarlo a mano es trabajo que se pierde en la
   siguiente corrida del empaquetador.
3. **Nadie edita archivos de otro frente.** Ya está en el plan maestro; aquí solo
   se ratifica con el árbol de §1.
4. **CSS: solo tokens.** Todo color, espacio y tipografía sale de una custom
   property en `:root`. Cambiar el tema es cambiar el bloque de tokens, no cazar
   valores sueltos por el archivo. Nada de `#hex` disperso.
5. **Cifras con `tabular-nums`.** Las columnas de números se alinean. Es un detalle
   de 20 caracteres de CSS que hace que la interfaz se lea como una herramienta
   financiera en vez de como una página web.
6. **Todo texto en español, incluidos los `aria-label`.**

---

## 8. Verificación antes de cada integración

Cuatro comprobaciones, dos minutos:

```bash
# 1. El pipeline de datos corre limpio
python3 scripts/generar_series_ndvi.py && python3 scripts/empaquetar_datos.py

# 2. La app abre por doble clic (la prueba que de verdad importa)
open index.html

# 3. Cero errores en consola del navegador

# 4. Ningún secreto commiteado
git grep -nE 'sk-ant|ANTHROPIC_API_KEY *=' -- . ':!*.md'
```

Si (2) falla, casi siempre es que alguien metió un `fetch` o un `import`. §2.

---

## 9. Riesgos abiertos

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Las capturas satelitales reales de Copernicus tardan más de lo previsto | Media | La app ya funciona con el bloque de imagen vacío; se enchufan cuando lleguen. No bloquea a nadie. |
| El prompt del dictamen no converge a la calidad de `docs/dictamen-modelo.md` | Media | Es la tarea de 20:30–23:00 de 🅱 y tiene 2,5 horas asignadas. Si a las 00:30 no converge, se congela la mejor versión y se pasa a apoyar la pantalla 3. |
| La pantalla 5 (cartera) no alcanza | Alta | Ya está marcada opcional en el plan. Se corta a las 02:30 sin discusión. |
| Alguien introduce un `fetch()` y rompe el doble clic | **Alta** | Es el paso 2 de la verificación de §8, en cada integración. |

---

*Versión 1.0 · 15-ago-2026, 15:40*
