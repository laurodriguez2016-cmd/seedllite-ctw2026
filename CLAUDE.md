# CLAUDE.md — Reglas de trabajo del repo SEEDLLITE

Contexto para cualquier instancia de Claude Code que opere en este repositorio.

## Qué es esto

**SEEDLLITE** — puntaje de crédito agrícola construido desde imágenes satelitales.
Hackathon Colombia Tech Week 2026 · **Track 04 · Planeta y Comunidad · Resiliencia**.
Equipo de 3: 2 abogados + 1 ingeniero. Entrega: **16-ago-2026, 09:00**.

**Fase actual: construcción.** El concepto está decidido y el equipo inscrito.
No se reabre la discusión de concepto ni de track.

## El producto en una frase

> Un pequeño productor sin extractos bancarios sí tiene historia financiera: está escrita
> en 10 años de imágenes satelitales de su parcela. SEEDLLITE la lee y la convierte en un
> dictamen de crédito que un banco puede firmar.

## Idioma

Español para todo el contenido, la documentación y la interfaz. Inglés aceptable en nombres
de archivo, variables y estructura de código.

## Reglas de documentación

1. **Fuente o no existe.** Toda afirmación de hecho lleva su fuente: URL, número de norma con
   artículo, o "Manual de Servicios FINAGRO v.26.21". Sin fuente, se marca explícitamente como
   supuesto: `SUPUESTO:` al inicio del párrafo.
2. **Distinguir hecho de opinión.** Los hallazgos van en `docs/`. Las recomendaciones van en
   secciones marcadas "Lectura" o "Evaluación".
3. **No borrar, archivar.** Si algo queda obsoleto, se mueve a `docs/_archivo/` con nota de por qué.
4. **Un archivo, un tema.** Si un archivo pasa de ~300 líneas, probablemente son dos temas.
5. **Fechas absolutas.** "El martes" no; "12-ago-2026" sí.

## Reglas jurídicas

1. **Citar norma con artículo.** "Decreto 1981 de 1988, art. 1" — no "la norma de captación".
2. **Marcar la disputa.** Cuando haya discusión doctrinal, se dice. No se afirma la
   interpretación conveniente como si fuera pacífica.
3. **Separar conservador de agresivo.** En análisis de riesgo legal, las dos lecturas por separado.
4. **SEEDLLITE no da asesoría financiera.** El producto emite una **recomendación de crédito
   dirigida a un intermediario financiero vigilado**, no una oferta ni una asesoría al productor.
   Todo output lleva esa advertencia.

## Reglas de datos — no negociables

1. **Solo fuentes con licencia de uso comercial:** Copernicus **Sentinel-2** (licencia libre y
   abierta) y **Landsat/USGS** (dominio público).
2. **PROHIBIDO usar mosaicos Planet/NICFI.** Su licencia autoriza el uso únicamente para el
   "Propósito NICFI" y **no con ánimo de lucro**. Usarlos en un producto de crédito es
   violación de licencia.
3. Toda fuente se atribuye en el README con su licencia.
4. **Todo dato simulado, calibrado o cacheado se rotula como tal** — en la interfaz y en el README.

## Reglas de IA

1. La IA produce **el dictamen de crédito**. Ese es el núcleo. Nada de chatbots de ayuda ni
   texto de relleno generado.
2. Las salidas de IA que se muestran son **salidas reales de Claude**, generadas por
   `scripts/generar_dictamen.py` y commiteadas en `data/dictamenes.json`.
   **Nunca texto escrito a mano haciéndose pasar por IA.**
3. El prompt vive en el repositorio y es legible por el jurado.

## Restricciones técnicas

1. **Sin paso de compilación.** HTML + CSS + JavaScript planos, autocontenidos.
2. **Sin npm, sin `node_modules`, sin bundler.** (No hay Node instalado en la máquina de Laura.)
3. **Sin backend, sin base de datos, sin login.** Todo dato en archivos JSON.
4. Debe abrirse con doble clic sobre `index.html` y funcionar.
5. Los scripts de Python usan **solo biblioteca estándar** (la máquina tiene Python 3.9).
6. **Ninguna clave de API se commitea.** Los scripts leen de variable de entorno.

## Herramientas

- **Context7** (MCP): documentación actualizada de librerías. Úsalo antes de escribir código
  contra cualquier API, en vez de asumir la API de memoria. *(Pendiente de conectar.)*
- **WebSearch / WebFetch**: para investigación. Siempre citar la URL en el documento resultante.
- **Skills del repo** en `.claude/skills/`: `ctw-contexto` (rúbrica y reglas del evento),
  `ctw-pitch` (cómo se evalúa), `ctw-documentar` (convenciones de escritura).
- **Spec Kit** instalado: `/speckit-specify` → `/speckit-plan` → `/speckit-tasks` →
  `/speckit-implement`. **No correr** `/speckit-analyze` ni `/speckit-checklist` — consumen
  tokens que hacen falta para construir.

## Presupuesto de modelos

- **Opus** escribe specs, planes y decisiones de arquitectura. Se usa poco y temprano.
- **Sonnet** ejecuta la implementación. Se usa mucho.
- Cuentas asimétricas: dos de US$100 (los dos Juanes) y una de US$20 (Laura).
  El trabajo intensivo en generación de código va a las cuentas grandes.

## Git

- Commits en español, formato: `<área>: <qué> — <por qué>`.
  Ejemplo: `motor: prompt del dictamen v2 — el v1 no citaba la evidencia satelital`
- **Commit cada vez que algo funcione.** En un hackathon, el trabajo no commiteado es trabajo perdido.
- Ramas por frente: `app`, `motor`, `producto`. Integración a `main` por PR en los hitos.
- **Nadie edita archivos de otro frente.** Ver `PLAN-MAESTRO.md`, sección de propiedad de archivos.

## Lo que NO se hace

- No inventar cifras. Si no se encontró un dato: "no encontrado".
- No prometer en el video funcionalidad que el demo no muestre.
- No construir nada que no salga en los 60 segundos del video.
- No agregar funcionalidades después del congelamiento de las 02:30.
