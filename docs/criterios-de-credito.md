# CRITERIOS DE EVALUACIÓN CREDITICIA — SEEDLLITE

> **Este documento es el insumo directo del prompt de `scripts/generar_dictamen.py`.**
> Define qué evalúa SEEDLLITE, con qué peso, y cómo se traduce en una decisión.
> Sin este documento el dictamen sale genérico.
>
> **Estado: BORRADOR v1 — pendiente de revisión de Laura Rodríguez.**
> Los puntos marcados 🔍 requieren su criterio antes de congelarse.

---

## 1. Qué es y qué no es este modelo

**SEEDLLITE emite una recomendación de crédito dirigida a un intermediario financiero
vigilado por la Superintendencia Financiera de Colombia.**

| No es | Sí es |
|---|---|
| Una oferta de crédito | Un insumo de decisión para el comité de crédito |
| Asesoría financiera al productor | Una evaluación de riesgo con evidencia verificable |
| Un sustituto del análisis del intermediario | Un reemplazo del **balance financiero** que hoy se le exige al pequeño productor |

### El problema que resuelve

Para solicitar crédito con recursos FINAGRO, hoy se le exige al pequeño productor un
**balance con fecha no mayor a 90 días** respecto del formulario de vinculación.

Un campesino sin contabilidad formal no puede producir ese documento. **Ese solo requisito
excluye a cientos de miles de personas** de un sistema que tiene capital disponible y garantía
estatal del 80%.

**SEEDLLITE sustituye ese balance por evidencia satelital de 10 años.**

---

## 2. Clasificación del productor

| Categoría | Criterio | Efecto |
|---|---|---|
| **Pequeño productor** | Activos totales ≤ **284 SMMLV** (incluidos los del cónyuge o compañero permanente), **y** al menos 75% de sus activos invertidos en el sector agropecuario **o** al menos 2/3 de sus ingresos provenientes de la actividad agropecuaria | Tope de crédito: 70% de sus activos (≈198,8 SMMLV) · Tasa hasta **IBR + 6,7%** · **FAG hasta 80%** |
| **Mediano productor** | No clasifica como pequeño y tiene activos totales ≤ **5.000 SMMLV** | Según línea |
| **Gran productor** | Por encima de 5.000 SMMLV | FAG hasta 50% |

🔍 **Verificar el SMMLV vigente a 2026** para convertir los topes a pesos. El valor en SMMLV
está confirmado; la conversión a pesos no la hemos verificado y **no se usa en el video sin
fuente**.

**Cobertura FAG especial: 100%** para desplazados, víctimas, reinsertados y proyectos de
desarrollo alternativo. Comisión anual del FAG: **1,5% a 4,5%**.

---

## 3. Los cuatro ejes de evaluación

Cada eje se califica de 0 a 100. El puntaje final es la suma ponderada, multiplicada por 10,
sobre una escala de **0 a 1000**.

### EJE A · Verificación del predio — peso 20

*¿Existe el predio, es agrícola, y coincide con lo declarado?*

| Variable | Fuente | Qué descarta |
|---|---|---|
| El polígono declarado existe y presenta actividad agrícola | Sentinel-2 | Predios fantasma |
| Área detectada vs. área declarada | Sentinel-2 | Sobredeclaración para inflar el monto |
| Coincidencia con cartografía catastral | IGAC | Inconsistencia en la ubicación |

**Regla:** si el área detectada es menor al **50%** de la declarada → **rechazo automático**,
sin importar los demás ejes.

---

### EJE B · Historial productivo — peso 35 ⭐ *el de mayor peso*

*¿Este productor efectivamente siembra, y termina lo que siembra?*

| Variable | Qué prueba |
|---|---|
| **Ciclos de cosecha completados** en 10 años | **El mejor predictor de repago.** No basta con sembrar: hay que llegar a cosecha |
| Continuidad del patrón cíclico | Un predio abandonado pierde la forma de diente de sierra aunque conserve verde |
| NDVI pico promedio | Vigor del cultivo en su punto máximo |
| Percentil frente a productores de la misma vereda | Compara contra pares reales, no contra un promedio nacional |
| Consistencia interanual | Volatilidad alta = riesgo alto |

> **El criterio que define el producto:** lo que se evalúa es **la forma de la serie, no su
> nivel.** Un predio abandonado se llena de rastrojo y mantiene NDVI medio. Lo que desaparece
> es el ciclo. Un modelo que mire solo el nivel de verde aprueba un crédito sobre un predio
> abandonado.

**Regla:** sin ciclo de cosecha detectable en los últimos **24 meses** → **rechazo automático**.

---

### EJE C · Riesgo climático — peso 25

*¿Qué tan expuesto está, y cómo se comportó cuando le pegó?*

| Variable | Fuente |
|---|---|
| Comportamiento durante **El Niño 2023-24** frente al promedio de su región | Serie NDVI + IDEAM |
| Exposición histórica a sequía e inundación | IDEAM |
| Aptitud del suelo para el cultivo declarado | UPRA |
| Pronóstico estacional del período del crédito | IDEAM |

**Este eje es lo que hace que SEEDLLITE pertenezca al Track 04.** No evaluamos solo si es
buen productor: evaluamos **si es resiliente al clima**. Un productor que perdió 18% de vigor
en El Niño cuando la región promedio perdió 34% es un mejor riesgo, y eso no aparece en
ningún estado financiero.

---

### EJE D · Coherencia agronómica — peso 20

*¿Lo que dice que va a hacer tiene sentido?*

| Variable | Qué detecta |
|---|---|
| ¿El cultivo declarado corresponde a la firma espectral observada? | Declaración falsa de cultivo |
| ¿El monto solicitado es proporcional al área real y al costo por hectárea del cultivo? | Sobredimensionamiento del crédito |
| ¿El calendario del plan de inversión coincide con el ciclo observado? | Plan de inversión copiado o irreal |

---

## 4. Escala de puntaje y bandas de riesgo

| Puntaje | Banda | Decisión por defecto |
|---|---|---|
| **700 – 1000** | Bajo | **Aprobar** |
| **550 – 699** | Medio | **Aprobar**, con condición de desembolso |
| **400 – 549** | Alto | **Aprobar con ajuste** de monto y garantías reforzadas |
| **0 – 399** | Rechazo | **Rechazar** |

---

## 5. Causales de rechazo automático

Operan **con independencia del puntaje**. Basta una.

1. Sin ciclo de cosecha detectable en los últimos **24 meses**
2. Área detectada menor al **50%** del área declarada
3. Cultivo detectado no corresponde al declarado
4. 🔍 Predio ubicado en zona de restricción ambiental — Parque Nacional Natural, páramo
   delimitado, o reserva forestal de la **Ley 2 de 1959** *(¿lo incluimos? Es jurídicamente
   correcto y ningún otro equipo lo va a pensar, pero suma complejidad al demo)*

---

## 6. Reglas de ajuste del monto

El monto sugerido es **el menor** de estos tres:

1. **El monto solicitado**
2. **Ajuste por área real:** `monto solicitado × (área detectada ÷ área declarada)`
3. **Techo agronómico:** `costo de referencia por hectárea del cultivo × área detectada`

Y en todo caso sujeto al **tope legal del pequeño productor** (70% de sus activos).

`SUPUESTO:` los costos de referencia por hectárea que usamos son estimaciones del equipo, no
tienen fuente verificada, y por eso **no se citan como dato en el video**:

| Cultivo | Costo de referencia por ha | Fuente |
|---|---|---|
| Café (renovación) | ~$3.500.000 | `SUPUESTO` |
| Arroz (capital de trabajo) | ~$3.700.000 | `SUPUESTO` |
| Papa (semilla y fertilización) | ~$4.500.000 | `SUPUESTO` |

🔍 **Laura: si conoces cifras reales o una fuente (Fedearroz, Fedepapa, Fedecafé, DANE), las
cambiamos.** Si no, se quedan marcadas como supuesto — que es legítimo.

---

## 7. Aplicación a los cuatro predios del demo

| Predio | Puntaje | Banda | Decisión | Solicitado | Sugerido | Por qué |
|---|---|---|---|---|---|---|
| `huila-cafe` | **780** | Bajo | Aprobar | $9.000.000 | **$8.400.000** | Techo agronómico: 2,4 ha × $3,5M |
| `tolima-arroz` | **640** | Medio | Aprobar | $22.000.000 | **$21.800.000** | Ajuste leve por área (5,9 vs 6,1 ha) |
| `boyaca-papa` | **590** | Medio | Aprobar con ajuste | $7.500.000 | **$6.600.000** | Área detectada 12% menor a la declarada |
| `meta-cacao` | **310** | Rechazo | **Rechazar** | $18.000.000 | **$0** | Causal automática 1: sin ciclo en 24 meses |

### Condiciones de desembolso

| Predio | Línea FINAGRO | FAG | Plazo | Condición |
|---|---|---|---|---|
| `huila-cafe` | Inversión — renovación de cultivos perennes · pequeño productor | 80% | 36 m | Dos tramos; el segundo condicionado a verificación satelital de siembra |
| `tolima-arroz` | Capital de trabajo · pequeño productor | 80% | 12 m | Desembolso único, con monitoreo satelital mensual |
| `boyaca-papa` | Capital de trabajo · pequeño productor | 80% | 12 m | Monto ajustado al área verificada. Dos tramos |
| `meta-cacao` | — | — | — | No aplica. Reevaluable si acredita reactivación del predio y se verifica un ciclo completo |

🔍 **Laura: verificar los nombres exactos de las líneas contra el Manual de Servicios FINAGRO
v.26.21.** Los que puse son descriptivos, no necesariamente la denominación oficial.

---

## 8. Lo que el dictamen debe decir siempre

1. **Cada afirmación con su dato.** Prohibido "el productor parece confiable". Obligatorio
   "9 ciclos de cosecha completos entre 2016 y 2025, NDVI pico promedio 0,78".
2. **Tono de memorando interno de banco.** Sobrio, técnico, sin adjetivos de más.
3. **El rechazo se explica con precisión.** Para `meta-cacao` la razón es el **colapso del
   patrón cíclico**, no "vegetación escasa" — el NDVI no es bajo.
4. **Las alertas se dicen aunque se apruebe.** Un dictamen que solo trae buenas noticias no
   es un dictamen.
5. **El descargo va siempre:**

> *SEEDLLITE emite una recomendación dirigida a un intermediario financiero vigilado. No
> constituye oferta de crédito, promesa de desembolso ni asesoría financiera al productor.
> La decisión de otorgamiento corresponde exclusivamente al intermediario, conforme a su
> reglamento de crédito y al Manual de Servicios de FINAGRO.*

---

## 9. Fuentes

| Dato | Fuente |
|---|---|
| Definición de pequeño y mediano productor, topes y tasas | [Manual de Servicios FINAGRO v.26.21 (16-04-2026)](https://www.finagro.com.co/sites/default/files/documents/2026-04/Manual%20de%20servicios%20V.%20%2026.21%20(16-04-2026).pdf) · [MinAgricultura actualiza la definición](https://www.finagro.com.co/noticias/minagricultura-actualiza-definicion-del-pequeno-productor) |
| Requisito de balance con menos de 90 días | [Requisitos crédito FINAGRO pequeño productor — Banco Agrario](https://www.bancoagrario.gov.co/system/files/2026-01/gc-ec-ht-044_2.2_requisitos_para_credito_con_recursos_finagro_pequeno_productor_agropecuario_joven_rural_mujer_rural_bajos_ingresos_2.pdf) |
| Cobertura FAG 80% / 100% / 50% y comisiones | [FAG — MinAgricultura](https://www.minagricultura.gov.co/tramites-servicios/credito-agropecuario/Paginas/v1/Fondo-Agropecuario-de-Garant%C3%ADas-FAG.aspx) · [FINAGRO](https://www.finagro.com.co/noticias/gobierno-respalda-creditos-pequenos-productores-80-garantia) |
| Imágenes satelitales y licencia | [Copernicus Sentinel — licencia abierta](https://open.esa.int/copernicus-sentinel-satellite-imagery-under-open-licence/) |

---

*Borrador v1 · 15-ago-2026, 16:30 · Redactado por Claude sobre la investigación del equipo.
Pendiente de revisión de Laura Rodríguez antes de congelar.*
