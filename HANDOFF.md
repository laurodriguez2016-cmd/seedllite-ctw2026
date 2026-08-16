# HANDOFF — SEEDLLITE

> **Léeme primero.** Estado real del proyecto al **15-ago-2026, 23:40**.
> Cierre: **domingo 16, 09:00**. Subida objetivo: **08:00**.
>
> Este archivo lo escribe y lo actualiza quien esté operando el frente MOTOR.
> Si algo aquí contradice a `PLAN-MAESTRO.md`, gana el plan salvo en los puntos
> marcados **CAMBIO**, que son decisiones ya tomadas y comunicadas.

---

## 0. Lo que cambió en la sesión de las 23:00 — léelo antes que nada

**El frente MOTOR está cerrado.** Los cuatro dictámenes son salida real de
`claude-opus-5`, commiteada. `./verificar.sh` pasa en verde. Lo que queda es APP,
capturas y video.

| Problema del handoff anterior | Estado |
|---|---|
| **A** · el café se auto-rechazaba | ✅ **Resuelto.** La causal ahora depende de `tipo_cultivo` |
| **B** · el rechazo sin evidencia | ✅ **Resuelto, pero cambió de causal.** Ver abajo |
| **C** · dictámenes sin generar | ✅ **Los cuatro generados** con guarda de coherencia |
| **D** · la app | ⚠️ **Sigue siendo el riesgo número uno** |

### Los cuatro predios, con cifras reales

| Predio | Declarada → medida | Puntaje | Decisión |
|---|---|---|---|
| `huila-cafe` | 2,4 → **2,25 ha** (94%) | **870** · bajo | aprobar con ajuste a $8.437.500 |
| `tolima-arroz` | 6,1 → **6,10 ha** (100%) | **850** · bajo | aprobar $22.000.000 |
| `boyaca-papa` | 1,8 → **1,80 ha** (100%) | **750** · bajo | aprobar con ajuste a $6.750.000 |
| `meta-cacao` | 4,0 → **0,50 ha** (12%) | **240** · rechazo | **rechazar** |

### El rechazo ya no es por abandono, es por área — y es mejor así

Se buscó el cacaotal abandonado en cuatro zonas y no existe. Las tres candidatas
que pasaron los filtros resultaron ser lotes con la mitad de los últimos dos
años sin observación óptica: **en el trópico andino la firma de abandono y la de
nubosidad son indistinguibles.** El recorrido completo está en
`scripts/exploracion/LEEME.md` y vale la pena leerlo antes del video.

`meta-cacao` se reapuntó a `(3.4921, -73.6559)`, mismo municipio. De las 4 ha
declaradas, la medición encuentra **0,5 con actividad agrícola**; las otras 3,5 son
dosel de bosque cerrado. Dispara la **causal 2** —área bajo el 50%— con 38 puntos
de margen.

**Y conserva la frase del video intacta:** el NDVI de ese predio es el **más alto
de los cuatro** (pico 0,88). Un modelo que mire cuánto verde hay lo aprueba sin
dudarlo. Lo que no tiene es dinámica de manejo.

### Dos bugs que se corrigieron y que conviene saber contar

1. **`ciclos_ultimos_24m` se calculaba sobre datos interpolados** mientras
   `ciclos_detectados` sí los excluía. Era la métrica que dispara el rechazo
   automático: se negaba crédito a un productor por haber estado nublado sobre su
   lote. Ahora `criterios-de-credito.md` exige 12 meses medidos antes de dejar
   operar la causal.
2. **`area_detectada_ha` estaba escrita a mano** en los cuatro predios y ningún
   script la calculaba. `scripts/medir_area.py` la mide con una rejilla 4×4. El
   `0.0` de `meta-cacao` y el "12% menor" de `boyaca-papa` eran inventados; los dos
   se cayeron.

Los dos son buen material de video: **muestran un equipo que auditó su propio
sistema y encontró cómo se equivocaba.**

---

## 1. Qué es esto, en treinta segundos

Un pequeño productor sin extractos bancarios sí tiene historia financiera: está
escrita en años de imágenes satelitales de su lote. SEEDLLITE la lee y la
convierte en un **dictamen de crédito** que un comité de banco puede firmar.

No prestamos plata. El capital ya existe (FINAGRO) y la garantía estatal también
(FAG cubre 80% al pequeño productor). Lo que falta es una forma barata de
evaluar. Esa es la capa.

Entrega: **video de 1 minuto + código**. No hay pitch en vivo. Rúbrica de 100:
impacto 25 · IA como núcleo 25 · demo funcional 20 · viabilidad 15 · ejecución 15.

---

## 2. Estado por frente

| Frente | Quién | Estado |
|---|---|---|
| **MOTOR** — datos + IA | Juan Torres | ✅ **CERRADO.** Series reales · áreas medidas · 4 dictámenes de opus-5 · verificar.sh verde |
| **PRODUCTO** — criterio, docs, diseño | Laura | Criterios ✅ · dictamen-modelo ✅ · legal ✅ · README ✅ · design system v1.1 ✅ · mockups 🔄 |
| **APP** — la pantalla | Juan Piedrahita | ⚠️ **Sin un solo commit suyo.** Ver §5 |
| **VIDEO** | Juan Torres | **CAMBIO**: el video lo hace Torres, no Laura |

### Ramas

```
main            integrada y al día — MOTOR cerrado, docs actualizados
app             frente APP, parte de app-baseline sobre main
motor           histórico del frente de datos
app-baseline    app navegable de referencia (red de seguridad, no borrar)
```

⚠️ **Dos agentes trabajando: reparte los worktrees.** El directorio principal
`seedllite-ctw2026` está en la rama `app`. MOTOR trabajó desde un worktree aparte
(`git worktree add ../seedllite-motor main`) precisamente porque dos agentes en el
mismo directorio se cambian la rama el uno al otro sin avisar. Si retomas MOTOR,
usa el worktree; si retomas APP, usa el directorio principal.

---

## 3. CAMBIO grande: los datos ya no son simulados

La serie NDVI **se descarga de Copernicus**. Ya no es calibrada.

```bash
python3 scripts/ingesta_sentinel.py
```

Una petición por predio a la Statistical API de Sentinel Hub, 108 meses
(2017-01 → 2025-12), ~3 segundos cada una. Estado actual del dato:

| Predio | Meses medidos | Ciclos | 24m | Veredicto |
|---|---|---|---|---|
| `tolima-arroz` | 87/108 | 14 | 2 | **Excelente.** Dientes de sierra reales: 0,90 → 0,07 → 0,90 |
| `boyaca-papa` | 86/108 | 8 | 1 | Sirve. Amplitud 0,34 |
| `huila-cafe` | 75/108 | 9 | **0** | Perenne y plano. **Ver problema abierto A** |
| `meta-cacao` | 89/108 | 8 | **0** | Perenne y plano. **Ver problema abierto B** |

Coordenadas actuales (re-elegidas por barrido contra dato real; las originales
eran inventadas y tres de cuatro no caían sobre lotes agrícolas):

```
huila-cafe     1.8834, -76.0621
tolima-arroz   4.1789, -74.8836
boyaca-papa    5.3372, -73.4918
meta-cacao     3.5821, -73.6859     ← provisional, ver problema B
```

### Las dos trampas de la Statistical API — no las vuelvas a pisar

1. **Con CRS84 la resolución va en GRADOS.** `resx: 10` pide 10 *grados* y la API
   devuelve **un solo píxel por mes**, sin error ni advertencia — solo
   `sampleCount: 1`. El valor correcto es `10/111320`.
2. **Un mes enteramente enmascarado vuelve como la cadena `"NaN"`**, no como
   `null`. Hay que compararlo, no operarlo.

### Los huecos

Entre 19 y 33 de los 108 meses no tienen observación óptica utilizable (nubes).
Se interpolan, se marcan `"interpolado": true` con `nubosidad: 1.0`, y **quedan
fuera de todos los agregados**. Como la app atenúa los puntos con nubosidad > 0,6,
un mes interpolado se distingue en pantalla sin cambiar nada del frente APP.

**Ventana 2017-2025, no 2016.** L2A solo tiene cobertura global sistemática desde
enero de 2017. En el video se dice **nueve años**, no diez.

---

## 4. Lo único que queda abierto

### A · La app — el riesgo número uno

Ver §5. No cambió: sigue sin haber commit de Piedrahita.

### B · Las capturas satelitales

`predios.json` declara `imagenes_satelitales` con dos cortes por predio y **los
archivos no existen todavía**. La app debe degradar con elegancia mientras tanto.

Para `meta-cacao` la captura importa más que en los otros tres: es donde se ve, sin
entender NDVI, que el polígono declarado es bosque con un cuadro sembrado en una
esquina. Coordenadas: `3.4921, -73.6559`.

### C · Pendiente de Laura, no bloqueante

- Visto bueno al cambio de la regla perenne vs. transitorio en
  `docs/criterios-de-credito.md` §3 EJE A. Está marcado con 🔄 CAMBIO y explicado.
- El tope de 20 SMMLV en Capital de Trabajo para pequeño productor: si aplica,
  `tolima-arroz` a $22.000.000 lo excede. Es la única cifra del demo con una
  advertencia sin resolver.

---

## 5. El riesgo número uno: nadie ha construido la app

A las 23:40 no hay ningún commit de Piedrahita. El hito de las 20:30
("navegable de punta a punta") lo cubrió Torres con `app-baseline`.

`app-baseline` **ya funciona y ya está alineada al contrato v1.1**: mapa SVG de
Colombia, gráfica NDVI, las 5 pantallas, tema claro/oscuro, abre con doble clic.
Quien retome esto debe partir de ahí, nunca de cero:

```bash
git fetch origin && git checkout -b app origin/app-baseline
```

Lo que falta pulir es **pantalla 3 (análisis) y pantalla 4 (dictamen)** — 45 de
los 100 puntos y lo único que sale en el video.

**Trampa conocida:** `docs/tareas/JUAN-PIEDRAHITA.md` quedó desactualizado tras
el contrato v1.1. Si alguien construye contra ese archivo, sale mal:

- Los ejes buenos son **Capacidad de pago proyectada (40) · Verificación del
  activo productivo (20) · Riesgo sectorial y climático (25) · Coherencia del
  destino del crédito (15)**. El archivo de tareas lista los viejos.
- **`percentil_vereda` ya no existe** — se reemplazó por
  `rendimiento_estimado_t_ha` vs `rendimiento_municipal_eva_t_ha` (EVA, oficial).
  Queda un texto viejo en `assets/30-vistas.js` línea 206.
- El modelo es **`claude-opus-5`**, no sonnet.

---

## 6. Reglas que no se pueden romper

1. **Un archivo, un dueño.** `index.html` y `assets/` son de APP. `scripts/` y
   `data/` son de MOTOR. `docs/`, `README.md` y `video/` son de PRODUCTO. Si
   necesitas algo ajeno, se pide.
2. **Nada de `fetch()`, `import`, `type="module"` ni CDN.** Bajo `file://` mueren
   por CORS y la pantalla queda en blanco. Los datos llegan por
   `window.SEEDLLITE_DATOS`, que carga `data/datos.js`.
3. **`data/datos.js` es generado.** Editarlo a mano es trabajo perdido.
4. **Ninguna credencial al repo.** Están en `.env`, que está en `.gitignore`.
5. **Todo lo simulado se rotula**, en la interfaz y en el README.
6. **Sin fuente, no es un hecho.**

---

## 7. Comandos

```bash
./verificar.sh
```

Las cinco comprobaciones previas a integrar: contrato de datos, pipeline limpio,
que no se haya colado un `fetch`, que `datos.js` cargue, que no haya secretos.
**Correrlo antes de cada merge a main.**

```bash
python3 scripts/ingesta_sentinel.py && python3 scripts/empaquetar_datos.py
```

Regenerar todo el pipeline de datos. El empaquetador valida el contrato antes de
emitir; si no se cumple, **no** regenera `datos.js` y la app sigue mostrando lo
último bueno.

### Credenciales

Viven en `.env` en la raíz (fuera de git). Las lee cada script solo:

- `CDSE_CLIENT_ID` / `CDSE_CLIENT_SECRET` — Copernicus. Se crean en
  `https://shapps.dataspace.copernicus.eu/dashboard/#/account/settings`
- `OPENROUTER_API_KEY` — generación del dictamen

Si `.env` no está, cada script falla con el mensaje de qué falta y dónde se saca.
**El demo no necesita ninguna credencial**: lee los JSON commiteados.

---

## 8. Camino crítico hasta las 08:00

| Hora | Qué | Quién |
|---|---|---|
| **00:00** | Cerrar problema A (regla perenne vs transitorio) | Laura + Torres |
| **00:30** | Cerrar problema B (caso de rechazo) e integrar a `main` | Torres |
| **00:30–02:00** | Generar los 4 dictámenes e iterar el prompt contra la vara | Torres |
| **00:30–02:30** | Pantallas 3 y 4 | APP |
| **02:30** | 🧊 **Congelamiento.** De aquí solo errores | todos |
| **02:30–03:00** | Control de calidad recorriendo el producto como jurado | Laura |
| **03:00–04:00** | Capturas satelitales de Copernicus Browser (8 imágenes) | Laura |
| **04:00–06:00** | 🎬 Grabar y editar el video de 60 s | Torres |
| **06:00–07:00** | Vercel (despliegue estático, sin build) + repo público | Torres |
| **08:00** | **Subida** | todos |

**Si algo se cae, el orden de sacrificio es:** pantalla 5 (cartera) primero, luego
las capturas satelitales, luego Vercel. **El video no se sacrifica nunca** — sin
él no hay entrega.

### Para hacer público al entregar

```bash
~/bin/gh repo edit laurodriguez2016-cmd/seedllite-ctw2026 --visibility public --accept-visibility-change-consequences
```

---

## 9. Qué decir en el video sobre los datos

Lo que ahora se puede afirmar sin mentir, y que hace ocho horas no se podía:

> *"108 observaciones mensuales reales de Sentinel-2 sobre el polígono del predio,
> descargadas de Copernicus. Enmascaradas de nubes con la clasificación de ESA.
> Nueve años."*

Y el matiz que demuestra que el equipo entendió el problema — **ya se puede decir
entero, y apoyado en medición:**

> *"El predio que rechazamos no tiene NDVI bajo. Tiene el más alto de los cuatro:
> 0,88. Está cubierto de verde. Lo que no tiene es una sola señal de manejo en nueve
> años. De las cuatro hectáreas declaradas, medimos media con actividad agrícola. Un
> modelo que mire cuánto verde hay aprueba ese crédito."*

Y si sobran diez segundos, el remate que ningún otro equipo va a tener:

> *"Encontramos un sesgo en nuestro propio sistema: rechazaba lotes por haber
> estado nubladas. Lo corregimos y lo dejamos escrito en el repositorio."*

Eso último es verificable en `scripts/exploracion/LEEME.md` y en el commit que
arregla `ciclos_ultimos_24m`. **Un jurado técnico premia más un equipo que auditó su
propio modelo que uno que solo lo mostró funcionando.**

---

*Actualizado 15-ago-2026, 23:40 · frente MOTOR — motor cerrado, quedan APP, capturas y video*
