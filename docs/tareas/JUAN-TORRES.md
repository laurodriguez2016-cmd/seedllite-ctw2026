# TAREAS · JUAN TORRES — Frente 🅱 MOTOR

> **Tu frente:** los datos satelitales y **el dictamen de IA**.
> **Tus archivos:** `scripts/`, `data/` y `assets/satelite/`. **Nadie más los toca.**
> **Tu rama:** `motor`
> **Lee primero:** [`00-COMO-TRABAJAMOS.md`](00-COMO-TRABAJAMOS.md)

---

## Por qué tu frente es el más importante del proyecto

Eres dueño de los **25 puntos de "uso real de IA"** — el criterio más pesado junto con impacto.
La pregunta textual del jurado es: *"¿La IA es el núcleo y está bien aplicada?"*

**Tu prompt en `generar_dictamen.py` es la respuesta a esa pregunta.** Si el dictamen que
produce suena a texto genérico de chatbot, perdemos. Si suena a un memorando que un comité de
crédito de Bancamía leería sin parpadear, ganamos.

**No eres ingeniero y aquí eso es una ventaja.** Eres abogado tributarista con perfil legaltech:
sabes cómo se lee un documento que tiene que sostenerse frente a un tercero que decide con
plata de por medio. Eso es exactamente lo que hay que enseñarle al modelo. El código lo escribe
Claude Code; **el criterio de qué hace bueno a un dictamen es tuyo.**

---

## Preparación (15 minutos, una sola vez)

```bash
cd ~/Desktop
git clone https://github.com/laurodriguez2016-cmd/seedllite-ctw2026.git
cd seedllite-ctw2026
git checkout -b motor
claude
```

### Lee antes de nada
- `data/CONTRATO-DATOS.md` ← **tu contrato con Piedrahita.** Los esquemas exactos que debes producir. **No los cambies sin avisar.**
- `data/predios.json` ← ya está hecho, es tu punto de partida
- `docs/criterios-de-credito.md` ← **LISTO Y CONGELADO.** Es el insumo de tu prompt. Los 4 ejes
  estan mapeados contra el SARC. Leelo completo antes de la tarea 4.
- `docs/dictamen-modelo.md` ← **LISTO.** Es la vara: el prompt tiene que producir algo de esa
  calidad. Trae las 7 propiedades a reproducir y los 5 errores prohibidos.

---

## Restricciones técnicas

| ✅ Sí | ❌ No |
|---|---|
| Python 3 con **solo biblioteca estándar** | `pip install` de cualquier cosa |
| Salida a archivos `.json` en `data/` | Base de datos, servidor |
| Clave de API leída de variable de entorno | Clave escrita en el código |
| Código legible y comentado en español | Optimización prematura |

**El jurado va a leer tus scripts.** Que estén limpios y comentados vale puntos en "ejecución
técnica" (15 pts).

---

## Los tres archivos que produces

| Archivo | Qué es | Para cuándo |
|---|---|---|
| `data/series_ndvi.json` | Serie NDVI mensual 2016–2025 de los 4 predios | **17:30** |
| `assets/satelite/*.jpg` | Captura satelital real de cada predio | **19:30** |
| `data/dictamenes.json` | ⭐ **La salida real de Claude** | **00:30** |

---

# TAREA 1 · 16:00–17:30 — Las series NDVI

**Qué es NDVI:** un índice de 0 a 1 que mide cuánto verde vivo hay en un pedazo de tierra.
Se calcula desde satélite. Un cultivo sano en pico de desarrollo da ~0,8; suelo desnudo
recién arado da ~0,15.

**La idea central del producto:** cuando graficas el NDVI de un lote mes a mes durante
10 años, aparecen **dientes de sierra** — sube en el desarrollo del cultivo, cae en la
cosecha, vuelve a subir. **Cada diente es una cosecha.** Contar esos dientes es contar
cuántas veces ese campesino efectivamente terminó lo que sembró. Y eso, según la literatura
de crédito agrícola, es el mejor predictor de que va a pagar.

### Pégale esto a Claude Code

```
Lee CLAUDE.md, data/CONTRATO-DATOS.md y data/predios.json antes de empezar.

Crea scripts/generar_series_ndvi.py usando SOLO biblioteca estándar de Python 3.

Genera data/series_ndvi.json con la serie NDVI mensual de 2016-01 a 2025-12
(120 puntos) para los 4 predios, siguiendo EXACTAMENTE el esquema del contrato
de datos.

Las series deben estar CALIBRADAS sobre la fenología real de cada cultivo:

huila-cafe (Café, Huila) — PERENNE:
  NDVI base alto y estable, 0.62-0.85. Dos picos de cosecha al año
  (principal oct-dic, mitaca abr-jun) pero SIN caer a suelo desnudo:
  el cafetal siempre tiene follaje. Debe dar 9 ciclos detectables
  entre 2016 y 2025. Durante El Niño 2023-24 cae ~18%, y se recupera.

tolima-arroz (Arroz, Tolima) — TRANSITORIO, 2 cosechas/año:
  Ciclos muy marcados de ~5 meses. Baja hasta 0.15-0.20 (suelo inundado o
  preparado) y sube hasta 0.80-0.88 en macollamiento. Dientes de sierra
  pronunciados y regulares. Durante El Niño 2023-24 un semestre se pierde:
  un ciclo que arranca y no llega al pico. Alta volatilidad interanual.

boyaca-papa (Papa, Boyacá) — TRANSITORIO, ciclo de ~5 meses:
  Sube de 0.18 a 0.75. Ciclos regulares pero el área efectiva es menor a la
  declarada: el NDVI promedio del polígono es más bajo de lo que debería
  porque parte del predio no está sembrado.

meta-cacao (Cacao, Meta) — EL CASO DE RECHAZO:
  ESTO ES LO MÁS IMPORTANTE Y LO MÁS SUTIL.
  De 2016 a 2023 se comporta como cacao establecido: 0.55-0.75 con ciclos.
  Desde mediados de 2023 el predio se abandona. PERO EL NDVI NO CAE:
  se queda entre 0.50 y 0.62, porque crece rastrojo y maleza — sigue
  habiendo verde.
  LO QUE DESAPARECE ES EL PATRÓN CÍCLICO. La serie se APLANA.
  La varianza mensual colapsa. No hay picos ni valles: solo ruido plano.

  Este es el punto entero del producto: un modelo que mire el NIVEL de NDVI
  aprobaría este crédito. Solo un modelo que lea la FORMA de la serie detecta
  el abandono. Que se note clarísimo en la gráfica.

Además:
- Agrega ruido realista mes a mes (±0.03) para que no se vea sintético.
- Campo "nubosidad" de 0 a 1: Colombia es nublada. El Chocó y el piedemonte
  tienen mucha; sube en temporada de lluvias. Algunos meses por encima de 0.6.
- Calcula y escribe en el JSON: ciclos_detectados, ndvi_pico_promedio,
  rendimiento_estimado_t_ha, rendimiento_municipal_eva_t_ha y fuente_referencia.
  (El campo percentil_vereda YA NO EXISTE — se eliminó en el contrato v1.1
  porque no hay estadistica oficial por vereda en Colombia. Ver
  docs/criterios-de-credito.md seccion 6.)
- Comenta el código en español explicando la fenología de cada cultivo.

En el JSON, el campo nota_datos debe decir con todas las letras que son series
calibradas sobre fenología documentada, y que el pipeline real de ingesta está
en scripts/ingesta_sentinel.py.
```

### Verifica
- [ ] `data/series_ndvi.json` existe y tiene 120 puntos por predio
- [ ] Los valores están entre 0 y 1
- [ ] **Que `meta-cacao` se aplane desde 2023** — es lo más importante
- [ ] `huila-cafe` da 9 ciclos

```bash
git add . && git commit -m "motor: series NDVI calibradas por fenologia — desbloquea la grafica de la app" && git push -u origin motor
```

**Avisa al chat apenas subas esto: desbloquea a Piedrahita.**

---

# TAREA 2 · 17:30–18:30 — El pipeline real de Copernicus

**Por qué importa aunque no lo ejecutemos:** el jurado abre el repositorio. Si ve que existe
el código real de ingesta satelital, entiende que el proyecto es serio y que las series
calibradas son un atajo de demo, no una mentira. Esto defiende directamente los 15 puntos de
ejecución técnica.

```
Crea scripts/ingesta_sentinel.py — el pipeline REAL de ingesta de Copernicus
Sentinel-2, usando solo biblioteca estándar (urllib, json).

Debe implementar de verdad, no como esqueleto vacío:
1. Autenticación OAuth contra Copernicus Data Space Ecosystem
   (identity.dataspace.copernicus.eu) leyendo CDSE_CLIENT_ID y
   CDSE_CLIENT_SECRET de variables de entorno. NUNCA claves en el código.
2. Búsqueda de productos Sentinel-2 L2A por polígono y rango de fechas,
   con filtro de cobertura de nubes.
3. Cálculo de NDVI = (B08 - B04) / (B08 + B04), explicando en un comentario
   qué es cada banda (B08 infrarrojo cercano, B04 rojo).
4. Agregación a mediana mensual sobre el polígono del predio.
5. Salida en el mismo esquema de series_ndvi.json.

Al inicio del archivo, un comentario de cabecera en español que explique:
- Qué hace el script
- Que Sentinel-2 tiene licencia abierta con uso comercial permitido
- Que en el demo no se ejecuta en vivo por tiempo y por estabilidad de red,
  y que las series del demo están calibradas sobre fenología documentada
- La atribución: "Contiene datos Copernicus Sentinel modificados 2016-2025"

Que el código sea legible y esté comentado en español. Un jurado lo va a leer.
```

```bash
git add . && git commit -m "motor: pipeline real de ingesta Sentinel-2 — trazabilidad de la fuente de datos" && git push
```

---

# TAREA 3 · 18:30–19:30 — Las imágenes satelitales

**Esto lo haces tú a mano, no Claude Code.**

1. Entra a **https://browser.dataspace.copernicus.eu/**
2. Busca cada predio por sus coordenadas (están en `data/predios.json`):

| Predio | Lat | Lon |
|---|---|---|
| `huila-cafe` | 1.8534 | -76.0521 |
| `tolima-arroz` | 4.1489 | -74.8836 |
| `boyaca-papa` | 5.3672 | -73.5218 |
| `meta-cacao` | 3.5421 | -73.7059 |

3. Selecciona **Sentinel-2 L2A**, una fecha con poca nube, visualización *True Color*
4. Acércate hasta que se vea el paisaje agrícola
5. Descarga **al menos dos cortes por predio** y guárdalos como
   `assets/satelite/{id}-{año}.jpg` — uno temprano (2016-2018) y uno reciente (2025)

### ⭐ `meta-cacao` es el prioritario

Busca un corte de **~2020** (cacaotal establecido, hileras ordenadas) y uno de **2025**
(abandonado, rastrojo). **Esa pareja de imágenes es la toma que gana el video:** el abandono
se ve con los ojos, sin que el jurado tenga que entender qué es un NDVI.

Si el tiempo aprieta, saca la secuencia de `meta-cacao` primero y el resto después.

**Que se vea el parcelado agrícola.** Si sale toda verde y uniforme, aléjate o cambia de fecha.

> ⚠️ **Nunca uses los mosaicos NICFI de Planet**, aunque el navegador los ofrezca. Su licencia
> prohíbe el uso con ánimo de lucro. Solo **Sentinel-2**.

```bash
git add . && git commit -m "motor: capturas Sentinel-2 de los 4 predios — evidencia visual real" && git push
```

## 🔗 20:30 — INTEGRACIÓN A `main`

```bash
git checkout main && git pull && git merge motor && git push && git checkout motor
```

---

# TAREA 4 · 20:30–23:00 — EL PROMPT DEL DICTAMEN ⭐⭐⭐

**Esta es tu tarea más importante. Vale 25 puntos. Dedícale las 2,5 horas completas.**

### Antes de escribir nada

Lee **`docs/criterios-de-credito.md`** y **`docs/dictamen-modelo.md`** de Laura. El segundo es
el dictamen ideal escrito a mano por una abogada litigante: **ese es el estándar al que tienes
que llevar el prompt.** Tu trabajo es que el modelo produzca algo de esa calidad para los
cuatro predios.

```
Lee docs/criterios-de-credito.md y docs/dictamen-modelo.md.

Crea scripts/generar_dictamen.py: llama a la API de Claude para producir el
dictamen de crédito de cada predio, y escribe data/dictamenes.json con el
esquema exacto del contrato de datos.

TÉCNICO:
- Solo biblioteca estándar (urllib.request, json).
- Lee ANTHROPIC_API_KEY de variable de entorno. Nunca en el código.
- Modelo: claude-sonnet-5.
- Recorre los 4 predios; para cada uno arma el contexto con sus datos de
  predios.json y su serie de series_ndvi.json (incluye estadísticas derivadas:
  ciclos, picos, varianza por año, comportamiento durante El Niño).
- Pide la salida en JSON estricto y valida que cumpla el esquema antes de escribir.
- Si un predio falla, que no tumbe los otros tres.

EL PROMPT — esto es lo que de verdad importa:

El modelo debe actuar como un ANALISTA DE RIESGO CREDITICIO AGROPECUARIO
colombiano que le escribe a un comité de crédito. No como un asistente.

Reglas que el prompt debe imponer:

1. EVIDENCIA SIEMPRE. Cada afirmación va con el dato satelital que la sustenta.
   Prohibido "el productor parece confiable". Obligatorio "9 ciclos de cosecha
   completos entre 2016 y 2025, NDVI pico promedio 0,78".

2. USA EL MARCO COLOMBIANO REAL. Línea FINAGRO aplicable, clasificación de
   pequeño productor (activos ≤ 284 SMMLV), cobertura FAG (hasta 80% para
   pequeño productor). Los datos están en docs/criterios-de-credito.md.

3. LOS 4 EJES CON SUS PESOS: verificación del predio (20), historial
   productivo (35), riesgo climático (25), coherencia agronómica (20).
   Puntúa cada uno y que la suma sostenga el puntaje final de 0 a 1000.

4. TONO: sobrio, técnico, sin adjetivos de más. Como un memorando interno de
   banco. Nada de "¡excelente productor!". El memorando: 120 a 200 palabras.

5. TIENE QUE SABER DECIR QUE NO. Para meta-cacao debe RECHAZAR, y la razón
   tiene que ser precisa: no que el NDVI sea bajo — no lo es —, sino que
   DESAPARECIÓ EL PATRÓN CÍCLICO de siembra y cosecha desde 2023, lo que
   indica abandono con rastrojo. Si el dictamen dice "vegetación escasa",
   está mal y hay que corregir el prompt.

6. AJUSTE DE MONTO. Cuando el área detectada sea menor que la declarada
   (boyaca-papa), el monto sugerido debe bajar proporcionalmente y decirlo.

7. SIN INVENTAR. Solo lo que esté en los datos que se le pasan.

Guarda el prompt en una constante bien visible al inicio del archivo, comentado
en español. El jurado lo va a leer y es nuestro mejor argumento de "IA como núcleo".
```

### Cómo iterar (esto es el 80% del trabajo)

Corre el script, **lee los cuatro dictámenes con ojo de abogado** y pregúntate:

- [ ] ¿Un comité de crédito de Bancamía leería esto sin reírse?
- [ ] ¿Cada afirmación tiene su número al lado?
- [ ] ¿El de `meta-cacao` explica el **colapso del patrón cíclico**, no "poca vegetación"?
- [ ] ¿El de `boyaca-papa` baja el monto y dice por qué?
- [ ] ¿Suena a analista o suena a ChatGPT?
- [ ] ¿Hay algún adjetivo de más? Quítalo del prompt.

**Espera corregir el prompt entre 5 y 10 veces. Eso es el trabajo, no un problema.**
Cada versión, commit — el historial de cómo mejoró el prompt es evidencia de rigor.

```bash
export ANTHROPIC_API_KEY="tu-clave"   # en la terminal, NO en el código
python3 scripts/generar_dictamen.py
```

```bash
git add . && git commit -m "motor: dictamenes generados con Claude — salida real commiteada" && git push
```

## 🔗 00:30 — INTEGRACIÓN A `main`

---

# TAREA 5 · 00:30–02:30 — Apoyo

Piedrahita va a estar integrando tus dictámenes en la pantalla 3. Quédate disponible:
si el formato no le encaja, **el que ajusta eres tú** — nunca él tocando `data/`.

---

## Si te bloqueas

| Problema | Qué hacer |
|---|---|
| El script falla | Pégale el error completo a Claude Code |
| El dictamen suena genérico | El problema es el prompt, no el modelo. Sé más específico sobre el tono y exige evidencia numérica |
| No tienes clave de API | Avísale a Laura de inmediato — es bloqueante |
| El JSON no cumple el esquema | Pídele al script que valide y reintente |
| 10 minutos atascado | **Escribe al chat.** No 40 minutos. |

---

## Tu norte

> El jurado va a abrir `scripts/generar_dictamen.py` y va a leer tu prompt.
> Ese archivo es nuestro argumento entero de que la IA es el núcleo y no decoración.
>
> **Escríbelo como si fuera el memorando que sustenta una decisión de $8 millones.
> Porque eso es exactamente lo que es.**
