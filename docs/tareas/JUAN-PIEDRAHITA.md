# TAREAS · JUAN PIEDRAHITA — Frente 🅰 APP

> **Tu frente:** todo lo que el jurado ve en pantalla.
> **Tus archivos:** `index.html` y `assets/`. **Nadie más los toca. Tú no tocas los de nadie.**
> **Tu rama:** `app`
> **Lee primero:** [`00-COMO-TRABAJAMOS.md`](00-COMO-TRABAJAMOS.md)

---

## Por qué tu frente importa

Vales **20 puntos** de "demo funcional" y buena parte de los **15** de "ejecución técnica y UX".
Pero el número real es más alto: **no hay pitch en vivo.** El jurado solo ve tu pantalla en un
video de 60 segundos. Si la app no se ve, el proyecto no existe.

**No eres ingeniero y no importa.** Claude Code escribe el código. Tú decides cómo se ve y
verificas que funcione.

---

## Preparación (15 minutos, una sola vez)

### 1. Clona el repositorio

Abre la Terminal y pega:

```bash
cd ~/Desktop
git clone https://github.com/laurodriguez2016-cmd/seedllite-ctw2026.git
cd seedllite-ctw2026
git checkout -b app
```

### 2. Abre Claude Code en esa carpeta

```bash
cd ~/Desktop/seedllite-ctw2026
claude
```

### 3. Lee estos dos archivos antes de nada

- `data/CONTRATO-DATOS.md` ← **el más importante para ti.** Define exactamente qué datos vas a
  recibir de Torres y con qué nombres. Constrúyelo contra ese esquema aunque los datos todavía
  no existan.
- `PLAN-MAESTRO.md`

### ⚠️ La regla que te desbloquea

**No esperes a Torres.** El contrato de datos está congelado. Tú construyes contra el esquema;
cuando él suba los datos reales, todo encaja solo. Si esperas, perdemos 4 horas.

---

## Restricciones técnicas — no negociables

| ✅ Sí | ❌ No |
|---|---|
| Un solo archivo `index.html` autocontenido | `npm install`, Node, bundlers |
| HTML + CSS + JavaScript plano | React, Vue, Tailwind, frameworks |
| Gráficas en SVG escrito a mano | Librerías de gráficas (Chart.js, D3) |
| Datos leídos de los `.json` de `data/` | Backend, base de datos, login |
| Que abra con doble clic | Que necesite servidor para correr |

**Por qué:** ninguno de los tres es ingeniero y no hay tiempo para depurar un entorno de
desarrollo a las 3 de la mañana. Un archivo que abre con doble clic no se rompe nunca.

---

## Las 5 pantallas

| # | Pantalla | Qué pasa |
|---|---|---|
| 1 | **Mapa** | Colombia con los 4 predios. Se elige uno. |
| 2 | **Ficha del predio** | Imagen satelital, datos del productor, y la **serie NDVI de 10 años** graficada |
| 3 | **Análisis** ⭐ | Botón *"Evaluar con SEEDLLITE"* → pasos animados → **el dictamen se escribe solo en pantalla** |
| 4 | **Dictamen** | Puntaje, monto, línea FINAGRO, FAG, evidencia, recomendación |
| 5 | **Cartera** | *(solo si sobra tiempo)* Los 4 predios como los vería un analista |

**La pantalla 3 es la que gana el hackathon. Es donde más tiempo debes invertir.**

---

# TAREA 1 · 16:00–17:00 — Esqueleto y sistema visual

### Pégale esto a Claude Code

```
Lee CLAUDE.md, PLAN-MAESTRO.md y data/CONTRATO-DATOS.md antes de empezar.

Crea index.html: un archivo HTML autocontenido, sin dependencias externas, sin
frameworks, sin CDN. Todo el CSS y el JS van dentro del mismo archivo.

Es la interfaz de SEEDLLITE, una herramienta de evaluación de riesgo crediticio
agrícola que usaría un analista de crédito de un banco colombiano.

SISTEMA VISUAL:
- Debe verse como una herramienta financiera profesional y seria, no como una app
  de consumo. Densa en información. Sobria.
- Nada de degradados morados, nada de emojis decorativos, nada de lenguaje de startup.
- Paleta: fondos neutros, un solo color de acento (verde tierra/oliva, NO verde neón),
  y colores semánticos para riesgo (verde aprobado, ámbar alerta, rojo rechazo).
- Tipografía de sistema, con jerarquía clara. Números grandes y legibles: el puntaje
  de crédito es el elemento más importante de la pantalla de dictamen.
- Funciona en tema claro y oscuro usando variables CSS.
- No se rompe en pantallas angostas.

ESTRUCTURA:
- Una sola página con 4 vistas que se alternan mostrando/ocultando secciones (sin recargar).
- Barra superior con el nombre SEEDLLITE y el subtítulo
  "Evaluación de riesgo crediticio agropecuario por análisis satelital".
- Pie de página con: "Datos de demostración. Imágenes Copernicus Sentinel-2,
  licencia abierta."

Por ahora crea solo el esqueleto y el sistema visual, con las 4 vistas vacías
y navegación entre ellas. Todavía no metas contenido real.
```

### Verifica antes de commitear
- [ ] `index.html` abre con doble clic y se ve
- [ ] Puedes navegar entre las 4 vistas
- [ ] Se ve serio y profesional, no juguetón
- [ ] Funciona en claro y oscuro

```bash
git add . && git commit -m "app: esqueleto y sistema visual — base de las 4 pantallas" && git push -u origin app
```

---

# TAREA 2 · 17:00–18:30 — Pantalla 1: el mapa

```
Construye la pantalla 1 de index.html: el mapa de selección de predios.

- Un mapa de Colombia dibujado en SVG en línea, dentro del mismo archivo.
  NO uses Mapbox, Leaflet, Google Maps ni ninguna librería externa.
  Un contorno simplificado de Colombia con la división departamental es suficiente;
  no tiene que ser cartográficamente perfecto, tiene que ser reconocible.
- Lee data/predios.json y pinta un marcador por cada predio en sus coordenadas.
  Los 4 predios están en Huila, Tolima, Boyacá y Meta.
- Al pasar el mouse sobre un marcador: nombre del productor, cultivo y área.
- Al hacer clic: se abre la pantalla 2 con ese predio.
- Al lado del mapa, una lista de los 4 predios como tarjetas, también clicables.
  Cada tarjeta: productor, municipio, departamento, cultivo, área declarada y
  monto solicitado. Formatea los pesos como $9.000.000.
- Un encabezado que diga "4 solicitudes de crédito en evaluación".
```

### Verifica
- [ ] Se ve Colombia y se reconoce
- [ ] Los 4 marcadores están en el departamento correcto
- [ ] Al hacer clic en cualquiera pasa a la pantalla 2
- [ ] Los montos se ven como `$9.000.000`, no como `9000000`

```bash
git add . && git commit -m "app: pantalla del mapa con los 4 predios — punto de entrada del demo" && git push
```

---

# TAREA 3 · 18:30–20:30 — Pantalla 2: la ficha y la gráfica NDVI ⭐

**Esta es tu tarea técnicamente más difícil. La gráfica NDVI es el corazón visual del producto.**

```
Construye la pantalla 2: la ficha del predio.

ARRIBA — identidad:
- Nombre del productor, vereda, municipio, departamento
- Cultivo y variedad, área declarada, monto solicitado, destino del crédito
- Una etiqueta que diga "Pequeño productor" (viene de tipo_productor)
- La imagen satelital del predio desde assets/satelite/{id}.jpg
  Si el archivo todavía no existe, muestra un marco con textura y el texto
  "Imagen Sentinel-2 pendiente" — NO dejes la imagen rota.

CENTRO — LA GRÁFICA NDVI (lo más importante):
- Lee data/series_ndvi.json. Si todavía no existe, genera datos de ejemplo con
  la MISMA estructura del contrato para poder construir.
- Gráfica de líneas en SVG puro, escrita a mano. Sin librerías.
- Eje X: 10 años, de 2016 a 2025. Eje Y: NDVI de 0 a 1.
- Bandas verticales de fondo para los eventos climáticos (vienen en el JSON):
  El Niño 2023-24 en tono cálido, La Niña 2022 en tono frío. Cada banda con su
  etiqueta.
- Los puntos con nubosidad mayor a 0,6 se dibujan atenuados: es dato satelital real
  y tiene ruido. Que se note.
- Debajo de la gráfica, tres indicadores grandes:
  ciclos detectados · NDVI pico promedio · percentil de la vereda

LO QUE TIENE QUE LOGRAR LA GRÁFICA:
Que a simple vista se vean los DIENTES DE SIERRA de las cosechas — sube, baja,
sube, baja. Ese patrón cíclico es toda la tesis del producto. Si la gráfica no
comunica eso de un vistazo, no sirve.

ABAJO:
- Un botón grande y prominente: "Evaluar con SEEDLLITE"
- Un botón discreto para volver al mapa
```

### Verifica
- [ ] **Se ven los dientes de sierra** de las cosechas
- [ ] Las bandas de El Niño y La Niña están y se entienden
- [ ] La gráfica no se deforma al cambiar el tamaño de la ventana
- [ ] El botón "Evaluar" se ve y da ganas de apretarlo

```bash
git add . && git commit -m "app: ficha del predio con serie NDVI de 10 anos — el corazon visual" && git push
```

## 🔗 20:30 — INTEGRACIÓN A `main`

```bash
git checkout main && git pull && git merge app && git push && git checkout app
```

**A esta hora la app se navega de punta a punta, aunque esté fea.** Si no llegas, avisa al
equipo — no lo escondas.

---

# TAREA 4 · 20:30–22:30 — Pantalla 3: el análisis ⭐⭐

**Esta pantalla vale 25 puntos. Es el momento del video. Dale todo.**

```
Construye la pantalla 3: el análisis con IA.

Al pulsar "Evaluar con SEEDLLITE" NO aparece el resultado de una vez.
Ocurre una secuencia de análisis, paso a paso, con ritmo:

PASO 1 (~1,2 s)  "Recuperando imágenes Copernicus Sentinel-2…"
                 contador que sube hasta 847 imágenes · 2016–2025
PASO 2 (~1,2 s)  "Calculando serie NDVI sobre el polígono del predio…"
PASO 3 (~1,5 s)  "Detectando ciclos de siembra y cosecha…"
                 termina mostrando el número de ciclos encontrados
PASO 4 (~1,2 s)  "Contrastando con productores de la misma vereda…"
PASO 5 (~1,2 s)  "Evaluando exposición climática — IDEAM…"
PASO 6 (~1,0 s)  "Redactando dictamen…"

Cada paso: check verde al terminar, el siguiente aparece encadenado.
Que se sienta un proceso real trabajando, no una barra de carga falsa.

DESPUÉS DE LOS PASOS — el momento clave:
El memorando del dictamen se ESCRIBE EN PANTALLA carácter por carácter, como si
el modelo lo estuviera redactando en vivo. Velocidad legible, ni muy lento ni
instantáneo. El texto sale de data/dictamenes.json, campo "memorando".

Arriba del texto, una etiqueta discreta: "Generado por Claude · claude-sonnet-5"

Si dictamenes.json todavía no existe, usa un texto de ejemplo con la misma
estructura para poder construir la animación.

Al terminar de escribirse, aparece un botón: "Ver dictamen completo" → pantalla 4.
```

### Verifica
- [ ] La secuencia se siente real y tiene ritmo, no atropellada
- [ ] El texto que se escribe solo se lee bien
- [ ] **Todo el efecto dura entre 8 y 12 segundos** — tiene que caber en el video
- [ ] Se puede volver a ejecutar sin recargar la página

```bash
git add . && git commit -m "app: pantalla de analisis con dictamen en streaming — el momento del video" && git push
```

---

# TAREA 5 · 22:30–00:30 — Pantalla 4: el dictamen

```
Construye la pantalla 4: el dictamen de crédito completo.
Lee la estructura exacta en data/CONTRATO-DATOS.md, sección dictamenes.json.

ENCABEZADO:
- El PUNTAJE enorme, el elemento más grande de toda la aplicación (ej. 780 / 1000)
- Al lado, la banda de riesgo con color semántico:
  bajo=verde, medio=ámbar, alto=naranja, rechazo=rojo
- La decisión en texto grande: APROBAR / APROBAR CON AJUSTE / RECHAZAR

BLOQUE DE CONDICIONES (formato de ficha financiera, dos columnas):
- Monto solicitado vs. Monto sugerido (si difieren, que se note)
- Línea FINAGRO aplicable
- Cobertura FAG (%)
- Plazo en meses
- Condición de desembolso

LOS 4 EJES DE EVALUACIÓN:
Cada eje con su peso y su puntaje, como barra horizontal:
  Verificación del predio (20) · Historial productivo (35) ·
  Riesgo climático (25) · Coherencia agronómica (20)

LA EVIDENCIA — lo que sustenta la decisión:
Lista donde cada ítem lleva su icono según el campo "tipo":
  favorable = ✓ verde · alerta = ⚠ ámbar · critico = ● rojo
Esta lista es la que prueba que el dictamen es explicable. Que se lea bien.

EL MEMORANDO:
El texto corrido completo, en un bloque tipo documento.

AL PIE:
- "Recomendación: <texto>"
- En letra pequeña: "SEEDLLITE emite una recomendación dirigida a un intermediario
  financiero vigilado. No constituye oferta de crédito ni asesoría financiera."
- Botón "Evaluar otro predio" → vuelve al mapa
```

### Verifica
- [ ] El puntaje domina la pantalla
- [ ] **Prueba el predio `meta-cacao`**: debe verse claramente RECHAZADO en rojo
- [ ] La evidencia se lee y se entiende sin explicación
- [ ] El descargo de responsabilidad está

```bash
git add . && git commit -m "app: pantalla de dictamen completo — el entregable del producto" && git push
```

## 🔗 00:30 — INTEGRACIÓN A `main`

---

# TAREA 6 · 00:30–02:30 — Pulido

```
Pule index.html sin agregar funcionalidades nuevas:
- Transiciones suaves entre pantallas
- Que ninguna pantalla se rompa entre 1280px y 1920px de ancho
- Revisa espaciados inconsistentes y alineaciones
- Que el tema oscuro se vea tan bien como el claro
- Que no haya ningún texto en inglés
- Estados de carga y de error para archivos JSON que no existan
```

**Laura te va a mandar una lista de errores de su control de calidad. Esos van primero.**

## 🧊 02:30 — CONGELAMIENTO. De aquí en adelante solo errores.

---

## Si te bloqueas

| Problema | Qué hacer |
|---|---|
| El código se rompió y no sabes por qué | `git checkout .` y vuelve a pedirlo con más detalle |
| Claude se enredó en la conversación | Empieza conversación nueva y pégale solo la tarea |
| No te gusta cómo quedó | Descríbelo concreto: *"el puntaje se pierde, hazlo el doble de grande"* |
| Un JSON no existe todavía | Construye con datos de ejemplo del mismo esquema. **No esperes.** |
| Llevas 10 minutos atascado | **Escribe al chat del equipo.** No 40 minutos. |

---

## Tu norte

> Si a las 02:30 la pantalla 3 se ve espectacular y las demás están decentes,
> ganaste tu frente.
> Si todas están perfectas menos la 3, perdimos 25 puntos.
>
> **Prioriza la pantalla 3 sobre todo lo demás.**
