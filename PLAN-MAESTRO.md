# PLAN MAESTRO — SEEDLLITE
### Reparto de trabajo para 3 personas · Hackathon CTW 2026 · Track 04
**Cierre: domingo 16 de agosto, 09:00. Subida objetivo: 08:00.**

---

## El producto

> **SEEDLLITE** — Un pequeño productor sin extractos bancarios sí tiene historia financiera:
> está escrita en 10 años de imágenes satelitales de su parcela. SEEDLLITE la lee y la convierte
> en un dictamen de crédito que un banco puede firmar.

**No prestamos dinero. Vendemos la decisión.** El capital ya existe (FINAGRO) y la garantía
estatal también (FAG cubre 80% al pequeño productor). Lo que falta es una forma barata de
evaluar y de vigilar. Esa es la capa que construimos.

---

## 1. Los tres frentes

| Frente | Quién | Cuenta | Responsabilidad |
|---|---|---|---|
| **🅰 APP** | **Juan Piedrahita** | US$100 | Todo lo que el jurado ve en pantalla |
| **🅱 MOTOR** | **Juan Torres** | US$100 | Datos satelitales + el dictamen de IA |
| **🅲 PRODUCTO** | **Laura** (+ Claude) | US$20 | Criterio experto, documentación, video, control de calidad |

> ⚠️ **Verificar antes de arrancar:** asigné APP a Juan Piedrahita y MOTOR a Juan Torres
> asumiendo que Piedrahita es el ingeniero y Torres el abogado tributarista con perfil
> legaltech. **Si es al revés, intercambien los frentes** — el reparto de tareas no cambia.

### Por qué Laura va en PRODUCTO y no en código

Es la única del equipo que sabe cómo funciona realmente un crédito, qué mira un comité y por
qué el marco legal se sostiene. Ese criterio es lo que hace creíble el proyecto y **no se puede
delegar en un modelo**. Además su cuenta es la más pequeña y este frente es el que menos tokens
consume: se escribe en español, no en código.

---

## 2. Propiedad de archivos — la regla que evita que se destruyan entre sí

**Cada archivo tiene un solo dueño. Nadie edita archivos ajenos. Si necesitas algo, lo pides.**

```
seedllite/
├── index.html                      🅰 APP       (exclusivo)
├── assets/                         🅰 APP
│   ├── satelite/*.jpg              🅱 MOTOR los produce, 🅰 los consume
│   └── mapa-colombia.svg           🅰 APP
│
├── scripts/                        🅱 MOTOR     (exclusivo)
│   ├── ingesta_sentinel.py             el pipeline real de Copernicus
│   ├── generar_series_ndvi.py          series NDVI calibradas
│   └── generar_dictamen.py             ⭐ el prompt a Claude
├── data/                           🅱 MOTOR     (exclusivo)
│   ├── predios.json                    ✅ ya está
│   ├── series_ndvi.json
│   └── dictamenes.json
│
├── README.md                       🅲 PRODUCTO  (exclusivo)
├── docs/                           🅲 PRODUCTO  (exclusivo)
│   ├── modelo-de-negocio.md            ✅ ya está
│   ├── criterios-de-credito.md         ⬜ el insumo del prompt de 🅱
│   ├── dictamen-modelo.md              ⬜ el estándar de calidad
│   ├── estructura-legal.md             ⬜ captación / tokenización
│   └── guion-video.md                  ⬜
├── video/                          🅲 PRODUCTO
│
├── CLAUDE.md                       🔒 congelado
├── PLAN-MAESTRO.md                 🔒 congelado
├── data/CONTRATO-DATOS.md          🔒 congelado — no se toca sin avisar al equipo
└── .specify/memory/constitution.md 🔒 congelado
```

**Cero archivos compartidos = cero conflictos de merge.** Es la única forma de que tres
personas avancen en paralelo a esta velocidad.

---

## 3. Git

```bash
git checkout -b app        # 🅰 Juan Piedrahita
git checkout -b motor      # 🅱 Juan Torres
git checkout -b producto   # 🅲 Laura
```

Subir **cada 45–60 minutos**, sin excepción:

```bash
git add . && git commit -m "app: <qué hiciste> — <por qué>" && git push -u origin app
```

**Integraciones obligatorias a `main`:** 20:30 · 00:30 · 02:30 · 06:00

---

## 4. Las cinco pantallas

| # | Pantalla | Dueño | Qué pasa |
|---|---|---|---|
| 1 | **Mapa** | 🅰 | Colombia con los 4 predios. Se elige uno. |
| 2 | **Ficha del predio** | 🅰 | Imagen satelital, datos del productor, y la **serie NDVI de 10 años** graficada con los eventos climáticos de fondo |
| 3 | **Análisis** ⭐ | 🅰 + 🅱 | *"Evaluar con SEEDLLITE"* → pasos animados (leyendo 847 imágenes… detectando ciclos… comparando contra la vereda…) → **el dictamen se escribe en streaming** |
| 4 | **Dictamen** | 🅰 | Puntaje, monto, línea FINAGRO, cobertura FAG, evidencia ✓ ⚠ 🔴, recomendación |
| 5 | **Cartera** | 🅰 | *(opcional)* Los 4 predios como los vería un analista de banco |

**La pantalla 3 vale 25 puntos de la rúbrica. Es la que más pulido merece.**

---

## 5. Cronograma

### 🅰 APP — Juan Piedrahita

| Hora | Tarea |
|---|---|
| 16:00–17:00 | Esqueleto HTML, sistema de diseño (tipografía, color, espaciado), tema claro/oscuro |
| 17:00–18:30 | Pantalla 1: mapa de Colombia con los 4 predios seleccionables |
| 18:30–20:30 | Pantalla 2: ficha + **gráfica NDVI en SVG puro** (sin librerías) |
| **20:30** | 🔗 **Integración a `main`** — debe navegarse de punta a punta, aunque sea feo |
| 20:30–22:30 | Pantalla 3: animación de análisis + streaming del dictamen ⭐ |
| 22:30–00:30 | Pantalla 4: dictamen completo |
| **00:30** | 🔗 **Integración** |
| 00:30–02:30 | Pulido: transiciones, responsive, detalles |
| **02:30** | 🧊 **Congelamiento — de aquí solo se arreglan errores** |

### 🅱 MOTOR — Juan Torres

| Hora | Tarea |
|---|---|
| 16:00–17:30 | `generar_series_ndvi.py` — series NDVI calibradas por fenología de cada cultivo → `series_ndvi.json` |
| 17:30–18:30 | `ingesta_sentinel.py` — el pipeline **real** de Copernicus. Aunque no se corra en vivo, el jurado lo lee |
| 18:30–19:30 | Capturas satelitales reales de los 4 predios desde Copernicus Browser → `assets/satelite/` |
| 19:30–20:30 | Cálculo de ciclos detectados y percentiles por vereda |
| **20:30** | 🔗 **Integración** |
| 20:30–23:00 | `generar_dictamen.py` — **el prompt a Claude.** Iterar hasta que el dictamen quede impecable ⭐ **Lo más importante del proyecto** |
| 23:00–00:30 | Ejecutar y commitear `dictamenes.json` con salidas reales |
| **00:30** | 🔗 **Integración** |
| 00:30–02:30 | Apoyo a 🅰 en la pantalla 3 |

### 🅲 PRODUCTO — Laura (conmigo)

| Hora | Tarea |
|---|---|
| 16:00–17:30 | `docs/criterios-de-credito.md` — **los 4 ejes con sus pesos**, definición de pequeño productor (≤284 SMMLV), línea FINAGRO y cobertura FAG por caso ⭐ **Insumo directo del prompt de 🅱** |
| 17:30–18:30 | `docs/dictamen-modelo.md` — el dictamen ideal del predio `huila-cafe`, escrito a mano. Es el estándar de calidad al que 🅱 lleva el prompt |
| 18:30–20:00 | `docs/estructura-legal.md` — captación ilegal, rutas legales, tokenización internacional |
| 20:00–22:00 | `README.md` — la portada que lee el jurado |
| 22:00–23:30 | `docs/guion-video.md` — guion segundo a segundo |
| 00:30–02:30 | **Control de calidad:** recorrer el producto como si fueras el jurado. Anotar todo lo que se ve mal → lista para 🅰 |
| 02:30–04:00 | Cerrar README: arquitectura, licencias de datos, modelo de negocio |
| **04:00–06:00** | 🎬 **Grabar y editar el video de 1 minuto** |
| 06:00–08:00 | Colchón |
| **08:00** | **Subir** |

---

## 6. El guion del video (60 segundos)

| Seg | Qué se ve |
|---|---|
| 0–8 | Un campesino y su parcela. Texto: *"Para pedir un crédito le piden un balance financiero con menos de 90 días."* |
| 8–15 | *"Él no tiene. Pero su parcela lleva 10 años siendo fotografiada desde el espacio."* |
| 15–28 | Mapa → predio → **la serie NDVI de 10 años apareciendo**, con El Niño 2023-24 marcado |
| 28–42 | *"Evaluar"* → pasos del análisis → **el dictamen escribiéndose solo** |
| 42–52 | Puntaje 780 · $8.400.000 · línea FINAGRO · FAG 80% · la evidencia |
| 52–58 | Corte al predio rechazado: **"310 · RECHAZADO — sin ciclos de cosecha en 2 años"** |
| 58–60 | *"SEEDLLITE. El banco no tiene que confiar en el campesino: tiene que confiar en la evidencia."* |

---

## 7. Reglas de oro

1. **Si no sale en el video de 1 minuto, no se construye.**
2. **Nadie edita archivos de otro frente.**
3. **Commit cada hora.** Trabajo no commiteado es trabajo perdido.
4. **A las 02:30 se congela.** Lo que no esté, no va.
5. **Se sube a las 08:00**, no a las 08:55.
6. **Todo lo simulado se rotula como simulado** — en la interfaz y en el README.
7. **Ninguna clave de API se commitea.**
8. **Sin fuente, no es un hecho.** Se marca `SUPUESTO:`.

---

## 8. Lo que NO se construye

❌ Descarga de imágenes satelitales en vivo
❌ Login, usuarios, base de datos, backend
❌ Aplicación móvil
❌ Tokens, blockchain, pagos — **eso vive en el README, no en el código**
❌ Entrenar un modelo de machine learning propio
❌ Cualquier cosa que requiera `npm install`

---

## 9. Estado de arranque

- ✅ Repositorio: **`laurodriguez2016-cmd/seedllite-ctw2026`** (privado)
- ✅ Spec Kit instalado con integración Claude
- ✅ `CLAUDE.md` con las reglas de trabajo
- ✅ Constitución del proyecto
- ✅ **Contrato de datos congelado** → APP y MOTOR pueden arrancar ya
- ✅ `data/predios.json` con los 4 predios
- ✅ Investigación de negocio en `docs/modelo-de-negocio.md`
- ⬜ Invitar a los dos Juanes como colaboradores del repo
- ⬜ Confirmar que el registro quedó en **Track 04**
- ⬜ Hacer el repositorio público antes de entregar

**Para hacerlo público al entregar:**

```bash
~/bin/gh repo edit laurodriguez2016-cmd/seedllite-ctw2026 --visibility public --accept-visibility-change-consequences
```

---

*Versión 1.0 · 15-ago-2026, 15:45*
