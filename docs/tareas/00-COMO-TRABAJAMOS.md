# CÓMO TRABAJAMOS — manual del equipo SEEDLLITE

> **Léelo completo antes de tocar nada. Son 10 minutos que ahorran 3 horas.**
> Aplica a los tres por igual.

---

## 0. Lo primero que hay que entender

**Somos tres abogados. Ninguno es ingeniero. Y eso no es un problema.**

Nadie aquí va a escribir código a mano. **Claude Code escribe el código; nosotros lo dirigimos.**
Nuestro trabajo es:

1. Decirle **qué** construir, con precisión
2. **Revisar** que lo que hizo sea lo que pedimos
3. **Guardar** el avance (commit)

Es exactamente lo mismo que dirigir a un pasante brillante pero literal: si le das una
instrucción vaga, te entrega algo vago. Si le das el criterio exacto, te entrega algo bueno.

**Nuestra ventaja frente a los otros equipos:** ellos tienen ingenieros que no saben qué es una
línea de redescuento FINAGRO ni por qué el FAG cubre el 80%. Nosotros sí. El código lo escribe
la máquina para todos por igual — **el criterio no.**

---

## 1. Qué estamos construyendo

**SEEDLLITE** — puntaje de crédito agrícola construido desde imágenes satelitales.

> Un pequeño productor sin extractos bancarios sí tiene historia financiera: está escrita en
> 10 años de imágenes satelitales de su parcela. SEEDLLITE la lee y la convierte en un
> dictamen de crédito que un banco puede firmar.

**No prestamos dinero. Vendemos la decisión.** El capital ya existe (FINAGRO) y la garantía
estatal también (FAG cubre hasta el 80% al pequeño productor). Lo que falta es una forma barata
de evaluar y de vigilar. Esa es la capa que construimos.

**Track de inscripción: 04 · Planeta y Comunidad · Resiliencia** — confirmado en el registro.

---

## 2. La rúbrica oficial — 100 puntos

> Textual del deck: *"El jurado califica sobre 100 puntos. Misma rúbrica para los 4 tracks.
> Lo que importa: impacto real y que la IA sea el núcleo, no decoración."*

| Criterio | Pts | Pregunta textual del deck | Quién lo defiende |
|---|---|---|---|
| **Impacto público** | **25** | "¿Resuelve un problema real del track? ¿A quién sirve?" | Laura (criterios) + guion |
| **Uso real de IA** | **25** | "¿La IA es el núcleo y está bien aplicada?" | **Torres** (el prompt) |
| **Demo funcional** | **20** | "¿El MVP corre? ¿Se ve en el video de 1 min?" | **Piedrahita** (la app) |
| **Viabilidad + escala** | **15** | "¿Puede vivir después de las 24h? ¿Crece?" | Laura (README) |
| **Ejecución técnica + UX** | **15** | "Calidad de código, arquitectura y usabilidad" | Piedrahita + Torres |

Lema del pie de página del deck: **"IA COMO NÚCLEO · IMPACTO SOBRE ESTÉTICA"**

### Las tres consecuencias prácticas

1. **50 de 100 puntos están en impacto + IA.** Todo lo demás vale la mitad.
2. **"Demo funcional" se juzga DENTRO del video de 1 minuto.** Lo que no se vea en 60
   segundos, no existe para el jurado. Por eso la regla: *si no sale en el video, no se construye*.
3. **No hay pitch en vivo.** No podemos explicar nada. El video y el repositorio hablan solos.

---

## 3. Qué entregamos y cuándo

| | |
|---|---|
| **Entregable** | Video demo de **máximo 1 minuto** + **código** en el repositorio oficial |
| **Cierre** | **Domingo 16-ago-2026, 09:00.** "No se aceptan retrasos" |
| **Nuestra meta de subida** | **08:00** — una hora antes. No a las 08:55. |

### Hitos duros

| Hora | Qué debe estar listo |
|---|---|
| **20:30** | 🔗 Integración: la app se navega de punta a punta, aunque sea fea |
| **00:30** | 🔗 Integración: producto completo funcionando |
| **02:30** | 🧊 **Congelamiento de funcionalidades.** De aquí en adelante **solo se arreglan errores** |
| **04:00** | README terminado |
| **06:00** | 🎬 Video terminado |
| **08:00** | ⬆️ Subida final |

**Lo que no esté a las 02:30 se corta. Sin debate.** La causa número uno de demos incompletos
en hackathons no es la dificultad: es seguir agregando cosas.

---

## 4. Las reglas de oro

1. **Si no sale en el video de 1 minuto, no se construye.**
2. **Nadie edita archivos de otro frente.** Si necesitas algo de otro, lo pides por el chat.
3. **Commit cada hora.** Trabajo no commiteado es trabajo perdido. Un portátil que se muere
   sin haber subido es el proyecto muerto.
4. **A las 02:30 se congela.**
5. **Todo lo simulado se rotula como simulado** — en la interfaz y en el README.
6. **Ninguna clave de API se commitea. Nunca.**
7. **Nada se promete en el video que el demo no muestre.**
8. **Ante la duda de alcance, la respuesta por defecto es NO.**

---

## 5. "Fuente o no existe" — qué vale como fuente y qué no

Esta es la regla que nos separa de un equipo que improvisa. **Toda afirmación de hecho lleva
su fuente.**

### ✅ Sirve como fuente

| Tipo | Cómo se cita |
|---|---|
| Norma colombiana | `Decreto 1981 de 1988, art. 1` — **con artículo, siempre** |
| Manual oficial | `Manual de Servicios FINAGRO v.26.21 (16-04-2026)` |
| Documento de entidad | URL completa a minagricultura.gov.co, finagro.com.co, bancoagrario.gov.co |
| Licencia de datos | URL a los términos de Copernicus / USGS |
| Estudio o nota de prensa | URL completa + fecha |

### ❌ NO sirve

- "Se sabe que…", "es sabido", "todo el mundo dice"
- Una cifra sin origen
- Lo que recordamos de memoria sin verificar
- Lo que dijo un modelo de IA sin que lo hayamos comprobado

### Si no hay fuente

Se escribe así, con la palabra literal al inicio del párrafo:

```
SUPUESTO: el costo de originar un crédito rural está entre $300.000 y $500.000.
No encontramos cifra pública; es estimación del equipo a partir de conversaciones.
```

**Marcarlo como supuesto es perfectamente válido. Presentarlo como hecho, no.**

### Las cifras que ya están verificadas y podemos usar

| Dato | Fuente |
|---|---|
| FAG cubre hasta **80%** a pequeño productor (100% a víctimas/desplazados); comisión 1,5%–4,5% | MinAgricultura / FINAGRO |
| Pequeño productor = activos ≤ **284 SMMLV**, con ≥75% de activos en el agro o ≥2/3 de ingresos del agro | FINAGRO |
| Tasa pequeño productor: hasta **IBR + 6,7%** | FINAGRO |
| Se le exige **balance con menos de 90 días** para solicitar el crédito | Banco Agrario, requisitos FINAGRO |
| **Sentinel-2**: licencia libre y abierta, **uso comercial permitido**, desde 2015, 10 m | Copernicus / ESA |
| **Landsat**: dominio público, desde 1972 | USGS |
| **NICFI: prohibido** para uso lucrativo | Guía de usuario NICFI |
| **<5%** de hogares rurales de LatAm accede a crédito formal | AgFunderNews |
| Apollo Agriculture: US$70,3M levantados, +350.000 agricultores | Tracxn / GSMA |

Todo el detalle con enlaces está en [`docs/modelo-de-negocio.md`](../modelo-de-negocio.md).

---

## 6. Las skills del repositorio

Están en `.claude/skills/`. **Se cargan solas** cuando el tema aplica, o las invocas con `/`.

| Skill | Para qué sirve | Cuándo la invocas |
|---|---|---|
| `ctw-contexto` | Reglas del hackathon, rúbrica de 100 puntos, tracks, agenda, premios | Cuando dudes de cómo se evalúa algo o qué hay que entregar |
| `ctw-pitch` | Cómo se arma el video de 60 segundos y cómo se prepara el repo para el jurado | Al escribir el guion o preparar la entrega |
| `ctw-documentar` | Convenciones de escritura de este repo | Al crear o editar cualquier archivo en `docs/` |
| `speckit-specify` | Convierte una descripción en una especificación formal | Antes de construir algo nuevo y grande |
| `speckit-plan` | Convierte la spec en plan técnico | Después de `specify` |
| `speckit-tasks` | Convierte el plan en lista de tareas accionables | Después de `plan` |
| `speckit-implement` | Ejecuta las tareas | Para construir |

**No corran** `/speckit-analyze` ni `/speckit-checklist` — son opcionales y consumen tokens
que necesitamos para construir.

---

## 7. Estructura de la documentación

```
seedllite-ctw2026/
├── README.md                  Portada. Lo primero que lee el jurado.
├── CLAUDE.md                  Reglas para Claude Code. No se toca.
├── PLAN-MAESTRO.md            El reparto entre los tres. No se toca.
│
├── index.html                 🅰 LA APLICACIÓN — dueño: Piedrahita
├── assets/                    🅰 Imágenes y mapa
│
├── scripts/                   🅱 Python — dueño: Torres
├── data/                      🅱 Los datos
│   └── CONTRATO-DATOS.md      🔒 Congelado. Acuerdo entre 🅰 y 🅱.
│
├── docs/                      🅲 Documentación — dueña: Laura
│   ├── modelo-de-negocio.md       investigación completa
│   ├── criterios-de-credito.md    los 4 ejes de evaluación
│   ├── dictamen-modelo.md         el estándar de calidad
│   ├── estructura-legal.md        captación y tokenización
│   ├── guion-video.md             el guion de los 60 segundos
│   └── tareas/                    este manual y las tareas de cada uno
│
└── video/                     🅲 El entregable
```

### Reglas de escritura

1. **Un archivo, un tema.** Si pasa de ~300 líneas, probablemente son dos temas.
2. **Fechas absolutas.** "El martes" no; "12-ago-2026" sí.
3. **Distinguir hecho de opinión.** Los hallazgos van derecho; las recomendaciones van en una
   sección marcada "Lectura" o "Evaluación".
4. **No borrar, archivar.** Si algo queda obsoleto va a `docs/_archivo/` con nota de por qué.
   El historial de por qué descartamos algo vale tanto como lo que elegimos.
5. **Español** para todo el contenido y la interfaz. Inglés solo en nombres de variables.

---

## 8. Convención de commits

**Formato:** `<área>: <qué hiciste> — <por qué>`

El área es tu frente: `app`, `motor`, `docs`, `data`, `bases`.

```
app: pantalla del predio con gráfica NDVI — es la base de la pantalla 3
motor: prompt del dictamen v2 — el v1 no citaba la evidencia satelital
docs: criterios de crédito con los 4 ejes — insumo del prompt de Torres
data: series NDVI de los 4 predios — desbloquea la gráfica de la app
```

**En español. Siempre con el "por qué".** El jurado lee el historial de commits, y un historial
que explica decisiones puntúa en "ejecución técnica".

---

## 9. Git — los cinco comandos que necesitas

No hay que entender git. Hay que saber estos cinco.

**Una sola vez, al empezar:**

```bash
cd ~/Desktop/HACKATON/seedllite
git checkout -b TU-RAMA
```

Tu rama es: `app` (Piedrahita) · `motor` (Torres) · `producto` (Laura).

**Cada hora, sin falta:**

```bash
git add .
git commit -m "app: lo que hiciste — por qué"
git push -u origin TU-RAMA
```

**Si algo se rompió y quieres volver atrás:**

```bash
git checkout .
```

> Si git se pone raro, **no pelees con él**: pégale el error a Claude Code y que lo resuelva.
> No pierdas 20 minutos en git.

---

## 10. Cómo trabajar con Claude Code siendo abogado

Esta sección es la más importante del documento.

### El ciclo

```
1. Abres Claude Code en la carpeta del proyecto
2. Le pegas el prompt de tu tarea (están escritos, no hay que inventarlos)
3. Él construye
4. TÚ REVISAS  ← la parte que no se delega
5. Commit
6. Siguiente tarea
```

### Las seis reglas de oro al dirigirlo

**1. Un objetivo por conversación.** No le pidas "haz la pantalla del predio y también el
dictamen y también el mapa". Pídele una cosa, revísala, y sigue. Las conversaciones largas y
revueltas producen resultados revueltos.

**2. Dile el criterio, no solo la tarea.** Mal: *"haz una gráfica"*. Bien: *"haz una gráfica de
la serie NDVI donde se vea que el predio tiene 9 ciclos de cosecha, con bandas de fondo en los
períodos de El Niño"*. El criterio es tuyo; él no lo puede adivinar.

**3. Si no te gusta, dilo concreto.** Mal: *"no me gusta"*. Bien: *"el puntaje se pierde entre
el resto, hazlo el elemento más grande de la pantalla"*.

**4. Si algo se enredó mucho, empieza conversación nueva.** Es más barato y más rápido que
seguir peleando en un hilo largo.

**5. Revisa lo que dice que hizo.** A veces reporta más de lo que efectivamente hizo. Ábrelo
en el navegador y míralo con tus ojos.

**6. Modelo correcto para cada cosa:**
- **Opus** para pensar: decidir arquitectura, escribir specs, resolver un problema difícil.
  Caro. Se usa poco.
- **Sonnet** para construir: escribir el código de una tarea ya definida. Barato. Se usa mucho.

  Como regla: **si ya sabes lo que quieres, Sonnet. Si no sabes cómo hacerlo, Opus.**

### Lo que NO se le delega

- **Decidir qué es un criterio de riesgo crediticio válido.** Eso es nuestro.
- **Decidir si un dictamen suena creíble para un comité de crédito.** Eso es nuestro.
- **Inventar cifras.** Si no tiene fuente, no entra.
- **Decidir qué se corta cuando falta tiempo.** Eso lo decide el equipo.

---

## 11. Si te bloqueas

1. **10 minutos atascado → escribe al chat del equipo.** No 40 minutos.
2. **Si tu frente se cae, no te pases al de otro.** Avisa y ayuda desde donde estás.
3. **Si a las 00:30 tu parte no funciona de punta a punta, se recorta** — no se acelera.

---

*Versión 1.0 · 15-ago-2026*
