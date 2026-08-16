# HANDOFF — SEEDLLITE

> **Léeme primero.** Estado real del proyecto al **15-ago-2026, 23:40**.
> Cierre: **domingo 16, 09:00**. Subida objetivo: **08:00**. Quedan ~8 horas.
>
> Este archivo lo escribe y lo actualiza quien esté operando el frente MOTOR.
> Si algo aquí contradice a `PLAN-MAESTRO.md`, gana el plan salvo en los puntos
> marcados **CAMBIO**, que son decisiones ya tomadas y comunicadas.

---

## 1. Qué es esto, en treinta segundos

Un pequeño productor sin extractos bancarios sí tiene historia financiera: está
escrita en años de imágenes satelitales de su parcela. SEEDLLITE la lee y la
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
| **MOTOR** — datos + IA | Juan Torres | Series reales ✅ · validador ✅ · prompt ⚠️ sin correr |
| **PRODUCTO** — criterio, docs, diseño | Laura | Criterios ✅ · dictamen-modelo ✅ · legal ✅ · README ✅ · design system v1.1 ✅ · mockups 🔄 |
| **APP** — la pantalla | Juan Piedrahita | ⚠️ **Sin un solo commit suyo.** Ver §5 |
| **VIDEO** | Juan Torres | **CAMBIO**: el video lo hace Torres, no Laura |

### Ramas

```
main            integrada y al día — motor + docs de Laura
motor           frente de datos e IA
app-baseline    app navegable de referencia (la escribió Torres como red de seguridad)
```

No existe rama `app`. **Nadie ha construido la app salvo el `app-baseline`.**

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
eran inventadas y tres de cuatro no caían sobre parcelas agrícolas):

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

## 4. Problemas abiertos — en orden de urgencia

### A · El café se auto-rechazaría ⚠️ BLOQUEANTE

`huila-cafe` da **0 ciclos en los últimos 24 meses**, porque el café es perenne y
no dibuja cosechas en NDVI. La regla de rechazo automático de
`docs/criterios-de-credito.md` dice *"sin ciclo detectable en los últimos 24
meses → rechazar"*. Tal como está, **el caso insignia de aprobación se rechaza**.

**Arreglo:** la regla tiene que ser consciente del tipo de cultivo. En transitorio
(arroz, papa) la ausencia de ciclo significa que no se está produciendo. En
perenne (café, cacao) el ciclo no es la señal; lo es el vigor sostenido.

Toca `docs/criterios-de-credito.md` y `docs/dictamen-modelo.md`, **ambos de
Laura** — hay que pedírselo, no editarlos. El párrafo de capacidad de pago del
dictamen modelo cita "9 ciclos de cosecha completos" y debe pasar a hablar de
vigor sostenido. Es más correcto así, no menos.

### B · El caso de rechazo no tiene evidencia real

`meta-cacao` es el que gana el video: *"un modelo que solo aprueba no es un
modelo"*. Da 0 ciclos en 24 meses, que es lo que queremos — pero el matiz que el
contrato exige mostrar (*el NDVI NO baja, hay rastrojo; lo que desaparece es el
patrón*) **no está sostenido por el dato**. Lo que parecía "ciclaba y se aplanó"
resultaron ser meses sueltos de nube en 2017-2022 que desaparecen al aplicar la
mediana móvil.

Hay un barrido corriendo sobre Espinal, Saldaña y Villavicencio buscando parcela
transitoria con amplitud ≥ 0,35 hasta 2021 y ≤ 0,15 desde 2023
(`scratchpad/buscar2.py`, salidas en `out_ab2_*.txt`). Si no aparece nada:

- **Opción 1** — mover el rechazo a `boyaca-papa`, cuya área detectada real es
  12% menor que la declarada. Esa regla sí está sostenida por dato.
- **Opción 2** — dejar `meta-cacao` como el único predio con serie calibrada,
  rotulado como tal. Honesto, pero cuesta explicarlo en 60 segundos.

### C · Los dictámenes reales no se han generado

Se aplazó a propósito para no gastar dos rondas de prompt antes de cerrar A y B.

```bash
python3 scripts/generar_dictamen.py --dry-run        # revisar el prompt
python3 scripts/generar_dictamen.py huila-cafe       # uno, para iterar
python3 scripts/generar_dictamen.py                  # los cuatro
python3 scripts/empaquetar_datos.py
```

La vara es `docs/dictamen-modelo.md` §2: siete propiedades que la salida debe
reproducir. Se itera contra eso hasta que se parezcan.

### D · La app

Ver §5. Es el mayor riesgo del proyecto.

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

Y el matiz que demuestra que el equipo entendió el problema:

> *"Un predio abandonado no tiene NDVI bajo: se llena de rastrojo y el verde
> sigue ahí. Lo que desaparece es el patrón. Por eso el modelo lee la forma de la
> serie, no su nivel."*

Ese segundo párrafo **solo se puede decir si se resuelve el problema B.** Si no se
resuelve, se dice la versión honesta: que el predio dejó de mostrar ciclo
detectable en 24 meses, que es cierta y sigue siendo suficiente.

---

*Actualizado 15-ago-2026, 23:40 · frente MOTOR*
