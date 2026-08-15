---
name: ctw-documentar
description: Convenciones de escritura y estructura de la documentación de este repo — dónde va cada cosa, cómo se cita una fuente, cómo se marca un supuesto, formato de las fichas de concepto y de los informes de investigación. Usa esta skill al crear o editar cualquier archivo en docs/.
---

# Cómo documentar en este repo

## Dónde va cada cosa

| Carpeta | Qué va ahí | Qué NO va ahí |
|---|---|---|
| `docs/00-hackaton/` | Reglas del evento, rúbrica, tracks, transcripciones literales de las charlas | Análisis nuestro |
| `docs/01-contexto/` | Hechos del mundo: el terremoto, el marco normativo, los antecedentes | Opiniones sobre qué construir |
| `docs/02-investigacion/` | Investigación de mercado, competencia, comparables, fuentes de datos | Decisiones |
| `docs/03-conceptos/` | Una ficha por concepto candidato | Investigación cruda |
| `docs/04-decision/` | Criterios y el acta de decisión | Conceptos descartados (esos quedan en 03) |
| `docs/05-equipo/` | Roles, reparto, plan por horas | Cualquier otra cosa |
| `docs/_archivo/` | Lo que quedó obsoleto, con nota de por qué | — |

## Reglas de contenido

1. **Fuente o no existe.** Toda afirmación de hecho lleva URL, o norma con artículo, o
   `transcripción de <quién>, <fecha>`.
2. **Supuestos marcados.** Si algo no está verificado, el párrafo abre con `SUPUESTO:`.
3. **Datos no encontrados se dicen.** `no encontrado` es una respuesta válida. Inventar una
   cifra no lo es.
4. **Fechas absolutas.** `12-ago-2026`, nunca "el martes".
5. **Hecho ≠ lectura.** Los hallazgos primero; la interpretación en una sección aparte titulada
   "Lectura" o "Evaluación".
6. **Marcar la disputa.** Si hay discusión doctrinal, jurisprudencial o de datos, se dice
   explícitamente en vez de elegir la versión conveniente.

## Formato de una ficha de concepto (`docs/03-conceptos/<letra>-<slug>.md`)

```markdown
# <Letra> · <Nombre>
> Una frase que diga qué es.

## El problema
Concreto, con evidencia y fuente. Idealmente en palabras de alguien real.

## La solución
Qué hace, en pasos.

## Por qué la IA lo hace posible hoy
Atacar el test de los seis años de frente.

## Modelo de negocio
Quién paga, por qué, cuánto. Comparable real si existe.

## Puntaje contra la rúbrica
| Criterio | Puntaje | Por qué |

## Riesgos
Los reales, no los cómodos.

## Qué se construye en 22 horas
Alcance mínimo demostrable.
```

## Formato de un informe de investigación (`docs/02-investigacion/<tema>.md`)

Abre con **Pregunta** (qué se investigó), sigue con **Hallazgos** (hechos con fuente), y
cierra con **Lectura** (qué significa para nosotros) y **Fuentes** (lista de URLs).

## Commits

`<área>: <qué> — <por qué>`

Ejemplos:
- `docs: ficha del concepto D — para comparar contra VIGÍA en la decisión`
- `skills: contexto del hackathon — para que los tres arranquen con la misma rúbrica`
- `investigacion: comparables de mercado — validar el techo de unicornio`

## Estilo

Español. Sin emojis. Frases cortas. Tablas cuando comparan, prosa cuando explican.
Un archivo, un tema; si pasa de ~300 líneas, probablemente son dos.
