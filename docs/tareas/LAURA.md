# TAREAS · LAURA — Frente 🅲 PRODUCTO

> **Tu frente:** el criterio experto, la documentación, el guion y **el video**.
> **Tus archivos:** `README.md`, `docs/` y `video/`. **Nadie más los toca.**
> **Tu rama:** `producto`
> **Trabajas conmigo (Claude) en esta conversación.** No tienes que escribir sola.

---

## Por qué tu frente no es el de apoyo

Defiendes **25 puntos de impacto público** y **15 de viabilidad y escala** — 40 de 100. Y hay
algo que no se ve en la rúbrica: **el prompt de Torres vale 25 puntos, y el insumo de ese prompt
lo escribes tú.**

Si `criterios-de-credito.md` sale genérico, el dictamen sale genérico y perdemos la mitad de la
nota de IA. Si sale con los ejes bien pesados y el marco FINAGRO correcto, el dictamen suena a
memorando de banco.

**Eres la única del equipo que ha estado dentro de un proceso donde se decide con plata de por
medio.** Ni Torres ni Piedrahita pueden escribir esto por ti.

---

## Preparación

```bash
cd ~/Desktop/HACKATON/seedllite
git checkout -b producto
```

---

# TAREA 1 · 16:00–17:30 — `docs/criterios-de-credito.md` ⭐ BLOQUEANTE

**Es lo primero y lo más urgente: Torres no puede escribir su prompt sin esto.**

Contenido:

1. **Clasificación del productor** — pequeño = activos ≤ 284 SMMLV, con ≥75% de activos en el
   agro o ≥2/3 de ingresos del agro. Qué implica para tope de crédito y tasa.
2. **Los 4 ejes con sus pesos** y, dentro de cada uno, las variables concretas:

   | Eje | Peso | Qué mira |
   |---|---|---|
   | Verificación del predio | 20 | ¿Existe? ¿El área declarada coincide con la detectada? |
   | Historial productivo | 35 | Ciclos completados, NDVI pico, consistencia interanual, percentil de la vereda |
   | Riesgo climático | 25 | Comportamiento en El Niño 2023-24, exposición histórica, aptitud del suelo |
   | Coherencia agronómica | 20 | ¿El cultivo declarado es el que se ve? ¿El monto es proporcional al área? |

3. **Reglas de decisión** — qué puntaje corresponde a aprobar, aprobar con ajuste y rechazar.
4. **Reglas de ajuste de monto** — si el área detectada es menor que la declarada, cómo se recorta.
5. **Línea FINAGRO y cobertura FAG** aplicables a cada uno de los 4 casos.
6. **El descargo** — SEEDLLITE emite una recomendación a un intermediario financiero vigilado,
   no una oferta de crédito ni asesoría financiera.

> Lo escribimos juntas en la conversación. Tú pones el criterio, yo lo estructuro.

**Avísale a Torres apenas esté subido.**

---

# TAREA 2 · 17:30–18:30 — `docs/dictamen-modelo.md`

Escribe **a mano** el dictamen ideal del predio `huila-cafe`, como si fueras la analista que lo
firma. 150 palabras.

No es para el producto: **es el estándar de calidad al que Torres va a llevar el prompt.** Él
va a comparar la salida del modelo contra tu texto hasta que se parezcan.

Que tenga: evidencia numérica en cada afirmación, tono sobrio, sin adjetivos, y una
recomendación concreta con condición de desembolso.

---

# TAREA 3 · 18:30–20:00 — `docs/estructura-legal.md`

Migrar y afinar lo que ya investigamos: captación masiva (Decreto 1981 de 1988 + art. 316 CP),
las cinco rutas legales, la estructura de tokenización internacional con ring-fence territorial,
y las banderas rojas.

**Este documento es territorio de Torres profesionalmente** (tributarista, tokenización) —
que lo revise cuando termine su tarea 3.

---

# TAREA 4 · 20:00–22:00 — `README.md`

La portada. **Es lo primero que abre el jurado.** Debe responder en 30 segundos:

1. Qué es SEEDLLITE, en una frase
2. El problema — le piden un balance con menos de 90 días a un campesino
3. Cómo funciona — el diagrama del flujo
4. **Dónde está la IA** y por qué es el núcleo
5. Las fuentes de datos **con su licencia** (Sentinel-2 abierta, Landsat dominio público,
   y por qué descartamos NICFI)
6. Qué es real y qué es demostración — sin ambigüedad
7. Cómo correrlo
8. El modelo de negocio, resumido, con enlace a `docs/modelo-de-negocio.md`

---

# TAREA 5 · 22:00–23:30 — `docs/guion-video.md`

El guion segundo a segundo. Borrador en `PLAN-MAESTRO.md`, sección 6. Ajustarlo a lo que el
producto **realmente** muestre a esa hora — nada que el demo no tenga.

---

# TAREA 6 · 00:30–02:30 — Control de calidad ⭐

**Tu tarea más valiosa después de los criterios.**

Recorre el producto como si fueras el jurado y anota todo lo que se ve mal:

- [ ] ¿Se entiende qué hace sin que nadie lo explique?
- [ ] ¿Hay algún texto en inglés? ¿Alguna falta de ortografía?
- [ ] ¿Los montos se ven como `$8.400.000`?
- [ ] ¿El dictamen suena a analista o a chatbot?
- [ ] ¿`meta-cacao` se ve claramente rechazado?
- [ ] ¿Está el descargo de responsabilidad?
- [ ] ¿Está rotulado lo que es simulado?
- [ ] ¿Algo promete más de lo que hace?

Manda la lista a Piedrahita. **Sus correcciones van antes que cualquier pulido.**

---

# TAREA 7 · 04:00–06:00 — 🎬 EL VIDEO

**El entregable. Máximo 1 minuto. No hay pitch en vivo: esto es todo lo que el jurado ve.**

1. Graba la pantalla recorriendo el camino del guion — **ensáyalo tres veces antes de grabar**
2. Corta a exactamente 60 segundos o menos
3. Texto sobreimpreso en los momentos clave
4. **Graba una versión de respaldo.** El wifi de un hackathon con 200 personas es un riesgo real.

---

# 08:00 — SUBIDA

```bash
~/bin/gh repo edit laurodriguez2016-cmd/seedllite-ctw2026 --visibility public --accept-visibility-change-consequences
```

Después: subir al repositorio oficial del hackathon según diga `#entregas` en Discord.

**Verifica que lo subido funciona. Y para.**

---

## Tu norte

> Tú no escribes el código. Escribes **el criterio que hace que el código valga algo**.
>
> El jurado no va a saber quién escribió qué. Va a ver un dictamen de crédito que suena real
> — y eso va a ser porque una abogada litigante le dijo al modelo cómo se escribe uno.
