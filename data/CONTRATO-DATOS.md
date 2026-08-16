# CONTRATO DE DATOS — SEEDLLITE

> 🔒 **CONGELADO.** Este documento es el acuerdo entre el frente **APP** y el frente **MOTOR**.
> Se congela a las 16:00 del 15-ago-2026 y **no se modifica sin avisar a todo el equipo**.
>
> Gracias a este contrato, APP y MOTOR trabajan **en paralelo desde el minuto cero**:
> APP construye contra estos esquemas aunque MOTOR todavía no haya generado los datos reales.

---

## Los tres archivos

| Archivo | Lo produce | Lo consume |
|---|---|---|
| `data/predios.json` | MOTOR | APP |
| `data/series_ndvi.json` | MOTOR | APP |
| `data/dictamenes.json` | MOTOR | APP |

---

## 1. `predios.json`

Identidad y contexto de cada predio del demo. **4 predios.**

```jsonc
{
  "version": "1.0",
  "generado": "2026-08-15T16:00:00-05:00",
  "nota_datos": "Predios y productores ficticios construidos para demostración.",
  "predios": [
    {
      "id": "huila-cafe",                    // string, único, kebab-case. LA LLAVE de todo.
      "productor": "María Ligia Osorio",     // string — ficticio
      "tipo_productor": "pequeño",           // "pequeño" | "mediano" | "grande"
      "vereda": "El Carmen",
      "municipio": "Pitalito",
      "departamento": "Huila",
      "coordenadas": { "lat": 1.8534, "lon": -76.0521 },
      "cultivo": "Café",
      "tipo_cultivo": "perenne",             // "transitorio" | "perenne" — v1.2
      "area_declarada_ha": 2.4,              // number — lo que declara el productor
      "area_detectada_ha": 2.4,              // number — lo que ve el satélite
      "monto_solicitado_cop": 9000000,       // integer
      "destino": "Renovación de cafetal y compra de insumos",
      "activos_declarados_smmlv": 41,        // integer — para clasificar productor
      "imagenes_satelitales": [                // SECUENCIA temporal, minimo 2 cortes
        { "anio": 2017, "ruta": "assets/satelite/huila-cafe-2017.jpg" },
        { "anio": 2025, "ruta": "assets/satelite/huila-cafe-2025.jpg" }
      ]
    }
  ]
}
```

### Reglas
- `id` es la llave primaria. Aparece igual en los tres archivos.
- `tipo_productor` se deriva de `activos_declarados_smmlv`: **pequeño ≤ 284 SMMLV**.
- **`tipo_cultivo`** (v1.2) es `"transitorio"` | `"perenne"`. No es decorativo: **la causal de
  rechazo automático del EJE A es distinta según su valor.** En transitorio, la ausencia de
  ciclo significa que no se está produciendo; en perenne no significa nada, porque la planta
  permanece. Ver `docs/criterios-de-credito.md` §3, EJE A.
- Las coordenadas son reales (ubicaciones plausibles); los productores son **ficticios**.
- `imagenes_satelitales` es una **secuencia**, no una imagen. Mínimo dos cortes (uno temprano,
  uno reciente) para que el cambio del predio se vea a simple vista. **En `meta-cacao` es
  obligatorio** — es donde el abandono se ve sin necesidad de entender el NDVI.

---

## 2. `series_ndvi.json`

La serie temporal satelital. **El corazón del producto.**

```jsonc
{
  "version": "1.0",
  "fuente": "Copernicus Sentinel-2 L2A",
  "licencia": "Copernicus open licence — uso comercial permitido",
  "resolucion_m": 10,
  "metodo": "Mediana mensual de NDVI sobre el polígono del predio",
  "nota_datos": "SERIE REAL descargada de Copernicus por scripts/ingesta_sentinel.py. …",
  "series": {
    "huila-cafe": {
      "desde": "2017-01",
      "hasta": "2025-12",
      "puntos": [
        { "fecha": "2017-01", "ndvi": 0.71, "nubosidad": 0.12, "interpolado": false },
        { "fecha": "2017-02", "ndvi": 0.74, "nubosidad": 1.0,  "interpolado": true  }
        // ... 108 puntos mensuales
      ],

      // Cobertura — cuánto de la serie es medición y cuánto es relleno
      "cobertura_meses_medidos": 75,
      "cobertura_meses_totales": 108,

      // La FORMA de la serie: el corazón del producto
      "ciclos_detectados": 9,
      "ciclos_ultimos_24m": 0,
      "amplitud_historica": 0.123,
      "amplitud_reciente_24m": 0.089,
      "perdida_amplitud_pct": 27.6,

      // El NIVEL de la serie, y el contraste contra la cifra oficial
      "ndvi_pico_promedio": 0.79,
      "rendimiento_estimado_t_ha": 1.23,
      "rendimiento_municipal_eva_t_ha": 1.14,
      "fuente_referencia": "EVA 2018 — PITALITO, HUILA — CAFE",
      "caida_enso_pct": 0.0
    }
  },
  "eventos_climaticos": [
    { "nombre": "El Niño 2023-24", "desde": "2023-06", "hasta": "2024-05", "tipo": "sequia" },
    { "nombre": "La Niña 2022",    "desde": "2022-01", "hasta": "2022-12", "tipo": "exceso_lluvia" }
  ]
}
```

### Reglas
- `ndvi` es un número entre **0 y 1**, con 2 decimales.
- Serie **mensual**, de `2017-01` a `2025-12` → **108 puntos por predio**.
  Nueve años, no diez: Sentinel-2 L2A solo tiene cobertura global sistemática
  desde enero de 2017. Pedir 2016 devolvería huecos que no son nubes sino
  ausencia de producto.
- `nubosidad` de 0 a 1. Por encima de **0,6** la APP dibuja el punto atenuado
  (así se ve que el dato satelital es real y tiene ruido — eso da credibilidad).
- **`interpolado: true`** marca los meses sin observación óptica utilizable. Van
  con `nubosidad: 1.0`, se rellenan por interpolación lineal para que la línea de
  la gráfica no se corte, y **quedan fuera de todos los agregados**. Entre 19 y 33
  de los 108 meses son interpolados según el predio: en el trópico andino eso no
  es un defecto del dato, es el dato. **La APP debe distinguirlos en pantalla.**
- `eventos_climaticos` es global, no por predio. La APP los pinta como bandas de fondo.

### Los agregados, y qué mide cada uno

Se calculan **solo sobre meses medidos**. La distinción que importa:

| Grupo | Campos | Qué responde |
|---|---|---|
| **Forma** | `ciclos_detectados`, `ciclos_ultimos_24m`, `amplitud_historica`, `amplitud_reciente_24m`, `perdida_amplitud_pct` | ¿El predio sigue el ritmo de siembra y cosecha que tenía? |
| **Nivel** | `ndvi_pico_promedio` | ¿Cuánto verde hay? |
| **Contraste oficial** | `rendimiento_estimado_t_ha` vs `rendimiento_municipal_eva_t_ha` | ¿Rinde más o menos que su municipio? |
| **Clima** | `caida_enso_pct` | ¿Cómo se comportó en El Niño 2023-24? |
| **Honestidad** | `cobertura_meses_medidos` / `cobertura_meses_totales` | ¿Cuánto de esto es medición? |

> **Forma contra nivel es la tesis del producto.** Un predio abandonado se llena de
> rastrojo y conserva el nivel; lo que pierde es la forma. Un modelo que mire solo
> `ndvi_pico_promedio` aprueba un crédito sobre un predio que no produce. Por eso
> `perdida_amplitud_pct` importa más que cualquier otro número del archivo.

---

## 3. `dictamenes.json`

**La salida real de Claude.** Generado por `scripts/generar_dictamen.py`, commiteado.

```jsonc
{
  "version": "1.0",
  "modelo": "claude-opus-5",
  "generado": "2026-08-15T22:00:00-05:00",
  "nota_ia": "Salidas reales del modelo. El prompt está en scripts/generar_dictamen.py.",
  "dictamenes": {
    "huila-cafe": {
      "puntaje": 870,                        // integer 0-1000 — el de huila-cafe
      "banda_riesgo": "bajo",                // "bajo" | "medio" | "alto" | "rechazo"
      "decision": "aprobar",                 // "aprobar" | "aprobar_con_ajuste" | "rechazar"
      "monto_sugerido_cop": 9000000,
      "linea_finagro": "Capital de trabajo — pequeño productor",
      "cobertura_fag_pct": 80,
      "plazo_meses": 24,
      "desembolso": "Dos tramos, el segundo condicionado a verificación satelital de siembra",

      "ejes": [                               // los 4 ejes de evaluación, con su peso
        { "eje": "Capacidad de pago proyectada",        "peso": 40, "puntaje": 36 },
        { "eje": "Verificación del activo productivo",  "peso": 20, "puntaje": 19 },
        { "eje": "Riesgo sectorial y climático",        "peso": 25, "puntaje": 19 },
        { "eje": "Coherencia del destino del crédito",  "peso": 15, "puntaje": 12 }
      ],

      "evidencia": [                          // lo que sustenta la decisión
        { "tipo": "favorable", "texto": "9 ciclos productivos completos detectados entre 2017 y 2025" },
        { "tipo": "favorable", "texto": "Rendimiento estimado 1,23 t/ha frente a 1,14 t/ha del promedio municipal de Pitalito (EVA 2018)" },
        { "tipo": "favorable", "texto": "Sin caída de vigor atribuible a El Niño 2023-24: el predio sostuvo su nivel durante la ventana del evento" },
        { "tipo": "alerta",    "texto": "La amplitud de los últimos 24 meses cae 27,6% frente a la histórica del propio predio" },
        { "tipo": "favorable", "texto": "Verificación RTDAF/RUPTA: el predio no figura en el Registro de Tierras Despojadas ni tiene medida de protección vigente" }
      ],

      "memorando": "Texto corrido del dictamen...",  // string, 120-200 palabras
      "recomendacion": "APROBAR con desembolso en dos tramos."
    }
  }
}
```

### Reglas
- `evidencia[].tipo` es `"favorable"` | `"alerta"` | `"critico"`. La APP los pinta ✓ ⚠ 🔴.
- Deben ser **entre 3 y 5 evidencias** por predio. Menos se ve pobre, más no cabe en pantalla.
- `memorando` es lo que se muestra con **animación de escritura** en la pantalla 3.
- La suma de `ejes[].peso` es siempre **100**. Los nombres y pesos de los ejes están fijados en
  [`docs/criterios-de-credito.md`](../docs/criterios-de-credito.md) §3 y **mapean uno a uno
  contra los criterios del SARC**. No se cambian.
- **Toda evidencia debe incluir la verificación RTDAF/RUPTA** (control anti-despojo, Ley 1448
  de 2011) y la **verificación ambiental**, aunque el resultado sea favorable.

---

## Los 4 predios del demo

Puntajes y decisiones **reales**, emitidas por `claude-opus-5` el 15-ago-2026 a las 23:20 y
commiteadas en `data/dictamenes.json`. No son objetivos de diseño: son la salida del modelo.

| `id` | Depto. | Cultivo | Declarada → detectada | Puntaje | Decisión | Qué demuestra |
|---|---|---|---|---|---|---|
| `huila-cafe` | Huila | Café (perenne) | 2,4 → **2,25 ha** (94%) | **870** | aprobar_con_ajuste | Perenne sano: el ciclo no aplica, manda el vigor sostenido |
| `tolima-arroz` | Tolima | Arroz (transitorio) | 6,1 → **6,10 ha** (100%) | **850** | aprobar | 14 ciclos en 9 años y el único que resistió El Niño medido |
| `boyaca-papa` | Boyacá | Papa (transitorio) | 1,8 → **1,80 ha** (100%) | **750** | aprobar_con_ajuste | Pierde 39% de su propio ritmo y rinde bajo el municipal |
| `meta-cacao` | Meta | Cacao (perenne) | 4,0 → **0,50 ha** (12%) | **240** | **rechazar** | Causal 2: el polígono declarado es bosque, no cacaotal |

### ⭐ El predio `meta-cacao` es el que gana el video

Un modelo que solo aprueba no es un modelo. Mostrar que SEEDLLITE **dice que no**, con la
evidencia satelital de por qué, es lo que convence al jurado de que esto es evaluación de
riesgo real y no un adorno.

> **Matiz técnico que hay que mostrar:** el NDVI de ese predio **no es bajo — es altísimo.**
> Pico promedio de 0,88, más alto que el de los tres predios que sí se aprueban. Un modelo
> que mire cuánto verde hay lo aprueba sin dudarlo.
>
> Lo que no tiene es **dinámica de manejo**: 15 de las 16 celdas de la rejilla se mantienen
> planas, con amplitud de 0,09 durante nueve años. Eso no es un cacaotal con poda y
> recolección: es **cobertura vegetal permanente**. De las 4 ha declaradas, la medición
> encuentra 0,5 con actividad agrícola.
>
> Por eso hace falta un modelo que lea la **forma** del dato, no su nivel. Ese matiz, dicho en
> el video, demuestra que el equipo entendió el problema — y es exactamente el tipo de detalle
> que separa un ganador de un proyecto bonito.

> **De dónde salió este caso.** Se buscó primero un cacaotal abandonado y luego un transitorio
> que dejara de ciclar. Cuatro zonas barridas, cero hallazgos: en el trópico andino la firma de
> abandono y la de nubosidad son indistinguibles, y los únicos dos candidatos que pasaron el
> detector resultaron ser lotes con la mitad de los últimos 24 meses sin observación. El
> recorrido completo, con sus falsos positivos, está en `scripts/exploracion/LEEME.md`. La
> causal de área no tiene ese problema: se mide sobre nueve años, no sobre una ventana de dos.

---

## Datos de ejemplo para desbloquear a APP

Mientras MOTOR genera los datos reales, APP trabaja contra `data/_ejemplo/` — mismos
esquemas, un solo predio, valores de juguete. **APP nunca espera a MOTOR.**

---

### Cambio v1.1 — 15-ago-2026, 17:30

`percentil_vereda` se elimina y se reemplaza por `rendimiento_estimado_t_ha`,
`rendimiento_municipal_eva_t_ha` y `fuente_referencia`.

**Motivo:** el percentil veredal era inverificable — no existe estadística de producción por
vereda en Colombia. EVA (Evaluaciones Agropecuarias Municipales, datos abiertos) sí reporta
rendimiento por municipio y cultivo. Justificación completa en
[`docs/criterios-de-credito.md`](../docs/criterios-de-credito.md), sección 6.

**Es el único cambio al contrato. No habrá más.**

---

### Cambio v1.2 — 15-ago-2026, 22:55 · **documental, no rompe nada**

La v1.1 se escribió cuando la serie era calibrada sobre fenología. Al pasar el pipeline a
descarga real de Copernicus, el archivo emitido ganó campos que este documento no describía y
perdió una ventana temporal que sí describía. **No se eliminó ni se renombró ningún campo: todo
lo que la APP ya consumía sigue existiendo igual.** Lo que cambia es que el contrato ahora dice
la verdad sobre lo que hay en el archivo.

| Qué | Antes decía | Ahora |
|---|---|---|
| Ventana | `2016-01` a `2025-12`, 120 puntos | **`2017-01` a `2025-12`, 108 puntos** — L2A no tiene cobertura sistemática antes de 2017 |
| Naturaleza | "SERIE CALIBRADA sobre fenología" | **Serie real descargada de Copernicus** |
| Meses sin dato | no se mencionaban | **`interpolado: true`**, fuera de todos los agregados |
| Agregados | 4 campos | **12 campos**, agrupados en forma / nivel / contraste oficial / clima / cobertura |
| Modelo | `claude-sonnet-5` | **`claude-opus-5`** |

Los campos nuevos —`ciclos_ultimos_24m`, `amplitud_historica`, `amplitud_reciente_24m`,
`perdida_amplitud_pct`, `cobertura_meses_medidos`, `cobertura_meses_totales`, `caida_enso_pct`—
**ya estaban en `data/series_ndvi.json` desde el commit `11684eb`.** Este cambio los documenta;
no los introduce. Son la evidencia de la tesis del producto y la pantalla 3 debe mostrarlos.

---

*Versión 1.2 · 15-ago-2026*
