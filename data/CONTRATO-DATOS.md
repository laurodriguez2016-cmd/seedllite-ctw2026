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
      "area_declarada_ha": 2.4,              // number — lo que declara el productor
      "area_detectada_ha": 2.4,              // number — lo que ve el satélite
      "monto_solicitado_cop": 9000000,       // integer
      "destino": "Renovación de cafetal y compra de insumos",
      "activos_declarados_smmlv": 41,        // integer — para clasificar productor
      "imagen_satelital": "assets/satelite/huila-cafe.jpg"  // ruta relativa
    }
  ]
}
```

### Reglas
- `id` es la llave primaria. Aparece igual en los tres archivos.
- `tipo_productor` se deriva de `activos_declarados_smmlv`: **pequeño ≤ 284 SMMLV**.
- Las coordenadas son reales (ubicaciones plausibles); los productores son **ficticios**.

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
  "nota_datos": "SERIE CALIBRADA sobre fenología documentada del cultivo. El pipeline real de ingesta está en scripts/ingesta_sentinel.py.",
  "series": {
    "huila-cafe": {
      "desde": "2016-01",
      "hasta": "2025-12",
      "puntos": [
        { "fecha": "2016-01", "ndvi": 0.71, "nubosidad": 0.12 },
        { "fecha": "2016-02", "ndvi": 0.74, "nubosidad": 0.08 }
        // ... 120 puntos mensuales
      ],
      "ciclos_detectados": 9,
      "ndvi_pico_promedio": 0.78,
      "rendimiento_estimado_t_ha": 1.9,
      "rendimiento_municipal_eva_t_ha": 1.6,
      "fuente_referencia": "EVA 2024 — Pitalito, Huila — Café"
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
- Serie **mensual**, de `2016-01` a `2025-12` → **120 puntos por predio**.
- `nubosidad` de 0 a 1. Por encima de **0,6** la APP dibuja el punto atenuado
  (así se ve que el dato satelital es real y tiene ruido — eso da credibilidad).
- `eventos_climaticos` es global, no por predio. La APP los pinta como bandas de fondo.

---

## 3. `dictamenes.json`

**La salida real de Claude.** Generado por `scripts/generar_dictamen.py`, commiteado.

```jsonc
{
  "version": "1.0",
  "modelo": "claude-sonnet-5",
  "generado": "2026-08-15T22:00:00-05:00",
  "nota_ia": "Salidas reales del modelo. El prompt está en scripts/generar_dictamen.py.",
  "dictamenes": {
    "huila-cafe": {
      "puntaje": 780,                        // integer 0-1000
      "banda_riesgo": "bajo",                // "bajo" | "medio" | "alto" | "rechazo"
      "decision": "aprobar",                 // "aprobar" | "aprobar_con_ajuste" | "rechazar"
      "monto_sugerido_cop": 8400000,
      "linea_finagro": "Capital de trabajo — pequeño productor",
      "cobertura_fag_pct": 80,
      "plazo_meses": 24,
      "desembolso": "Dos tramos, el segundo condicionado a verificación satelital de siembra",

      "ejes": [                               // los 4 ejes de evaluación, con su peso
        { "eje": "Verificación del predio",  "peso": 20, "puntaje": 19 },
        { "eje": "Historial productivo",     "peso": 35, "puntaje": 32 },
        { "eje": "Riesgo climático",         "peso": 25, "puntaje": 19 },
        { "eje": "Coherencia agronómica",    "peso": 20, "puntaje": 16 }
      ],

      "evidencia": [                          // lo que sustenta la decisión
        { "tipo": "favorable", "texto": "9 ciclos de cosecha completos detectados entre 2016 y 2025" },
        { "tipo": "favorable", "texto": "NDVI pico promedio 0,78 — percentil 71 de su vereda" },
        { "tipo": "favorable", "texto": "Sobrevivió El Niño 2023-24 con caída de vigor de 18% frente al 34% promedio regional" },
        { "tipo": "alerta",    "texto": "Aptitud UPRA del suelo para el cultivo declarado: MEDIA" }
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
- La suma de `ejes[].peso` es siempre **100**.

---

## Los 4 predios del demo

| `id` | Depto. | Cultivo | Área | Puntaje | Decisión | Qué demuestra |
|---|---|---|---|---|---|---|
| `huila-cafe` | Huila | Café | 2,4 ha | **780** | aprobar | El caso ideal: 9 ciclos completos, resistió El Niño |
| `tolima-arroz` | Tolima | Arroz | 6,1 ha | **640** | aprobar | Buen productor, alta exposición climática |
| `boyaca-papa` | Boyacá | Papa | 1,8 ha | **590** | aprobar_con_ajuste | Área real 12% menor a la declarada → se recorta monto |
| `meta-cacao` | Meta | Cacao | 4,0 ha | **310** | **rechazar** | Sin ciclos de cosecha detectables en 2 años |

### ⭐ El predio `meta-cacao` es el que gana el video

Un modelo que solo aprueba no es un modelo. Mostrar que SEEDLLITE **dice que no**, con la
evidencia satelital de por qué, es lo que convence al jurado de que esto es evaluación de
riesgo real y no un adorno.

> **Matiz técnico que hay que mostrar:** en el predio abandonado el NDVI **no es bajo** — hay
> rastrojo y maleza creciendo, el verde sigue ahí. Lo que desaparece es el **patrón cíclico**
> de siembra y cosecha. La serie se aplana.
>
> Por eso hace falta un modelo que lea la **forma** de la serie, no su nivel. Ese matiz, dicho
> en el video, demuestra que el equipo entendió el problema de verdad — y es exactamente el
> tipo de detalle que separa un ganador de un proyecto bonito.

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

*Versión 1.1 · 15-ago-2026*
