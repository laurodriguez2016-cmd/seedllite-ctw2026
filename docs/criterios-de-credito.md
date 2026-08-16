# CRITERIOS DE EVALUACIÓN CREDITICIA — SEEDLLITE

> **Insumo directo del prompt de `scripts/generar_dictamen.py`.**
> **Versión 2 — 15-ago-2026, 17:00.** Reescrita con fuentes tras la revisión de Laura Rodríguez.
>
> El cambio principal de esta versión: **los ejes ya no son una invención nuestra.**
> Están mapeados uno a uno contra los criterios que la Superintendencia Financiera le exige
> a cualquier establecimiento de crédito en Colombia.

---

## 1. Qué es y qué no es este modelo

**SEEDLLITE emite una recomendación de crédito dirigida a un intermediario financiero
vigilado por la Superintendencia Financiera de Colombia.**

| No es | Sí es |
|---|---|
| Una oferta de crédito | Un insumo de decisión para el comité de crédito |
| Asesoría financiera al productor | Evaluación de riesgo con evidencia verificable |
| Un sustituto del análisis del intermediario | Un reemplazo del **balance financiero** que hoy se le exige al pequeño productor |

### El problema

Para solicitar crédito con recursos FINAGRO se le exige al pequeño productor un **balance con
fecha no mayor a 90 días** respecto del formulario de vinculación. Un campesino sin
contabilidad formal no puede producirlo. **Ese solo requisito excluye a cientos de miles de
personas** de un sistema que tiene capital disponible y garantía estatal de hasta el 80%.

**SEEDLLITE sustituye ese balance por evidencia satelital de 10 años.**

---

## 2. 🔑 El hallazgo que reordena el modelo

Buscamos qué pesa de verdad en un comité de crédito colombiano. La respuesta no está en un
manual de banco: está en **norma vinculante**.

La **Circular Básica Contable y Financiera, Capítulo II — Sistema de Administración del Riesgo
de Crédito (SARC)** obliga a todo establecimiento de crédito a evaluar, como mínimo:

| # | Criterio SARC | Texto |
|---|---|---|
| 1 | **Capacidad de pago** | *"debe actualizarse y analizarse a través de información de flujos de ingresos y egresos del deudor o información del proyecto"* |
| 2 | **Solvencia** | *"nivel de endeudamiento, calidad y composición de activos, pasivos y patrimonio"* |
| 3 | **Garantías** | Idoneidad, liquidez y cobertura |
| 4 | **Historial en centrales de riesgo** | Comportamiento crediticio previo |
| 5 | **Variables sectoriales** | Riesgo del sector económico del deudor |

> **La consecuencia para nosotros:** el criterio número uno **no** es el predio ni el papeleo.
> Es **la capacidad de pago**. Y para un pequeño productor agropecuario, la capacidad de pago
> **es la cosecha**. No hay otra fuente de flujo.
>
> Por eso el eje de historial productivo sube de 35 a **40**: no porque nos parezca, sino
> porque es el que responde al criterio que la norma pone de primero.

Esto además nos da un argumento fuerte para el jurado: **cada eje de SEEDLLITE está anclado a
un criterio que la Superintendencia Financiera ya exige.** No inventamos un scoring; traducimos
uno obligatorio a datos que el pequeño productor sí puede acreditar.

---

## 3. Los cuatro ejes — versión 2

Cada eje se califica de 0 a 100. El puntaje final es la suma ponderada × 10, sobre **0 a 1000**.

| Eje | Peso | Responde al criterio SARC | Antes |
|---|---|---|---|
| **A · Capacidad de pago proyectada** | **40** | 1 · Capacidad de pago | 35 |
| **B · Verificación del activo productivo** | **20** | 2 · Solvencia | 20 |
| **C · Riesgo sectorial y climático** | **25** | 5 · Variables sectoriales | 25 |
| **D · Coherencia del destino del crédito** | **15** | Resolución 08 de 2023 CNCA | 20 |

### Lo que SEEDLLITE explícitamente NO evalúa

Decirlo es lo que hace creíble el resto:

- **Historial en centrales de riesgo** (criterio 4) → le corresponde al intermediario
- **Garantías** (criterio 3) → las aporta el FAG, no las evaluamos
- **Endeudamiento con otras entidades** → el intermediario lo consulta

**SEEDLLITE cubre 3 de los 5 criterios SARC.** No pretende reemplazar el comité: le entrega
resuelto lo que hoy no puede resolver — la capacidad de pago de alguien sin estados financieros.

---

### EJE A · Capacidad de pago proyectada — peso 40 ⭐

*¿Este productor efectivamente cosecha, y cuánto?*

| Variable | Qué prueba |
|---|---|
| **Ciclos de cosecha completados** en 10 años | No basta sembrar: hay que llegar a cosecha. Es el flujo de caja real |
| **Continuidad del patrón cíclico** | Un predio abandonado pierde la forma de diente de sierra aunque conserve verde |
| Rendimiento estimado vs. rendimiento municipal del cultivo | **Fuente: EVA — Evaluaciones Agropecuarias Municipales** |
| Consistencia interanual | Volatilidad alta = flujo impredecible |

> **El criterio que define el producto:** se evalúa **la forma de la serie, no su nivel.** Un
> predio abandonado se llena de rastrojo y mantiene NDVI medio. Lo que desaparece es el ciclo.
> Un modelo que mire solo el nivel de verde aprueba un crédito sobre un predio abandonado.

**Rechazo automático:** sin ciclo de cosecha detectable en los últimos **24 meses**.

---

### EJE B · Verificación del activo productivo — peso 20

*¿Existe el predio, es agrícola, y coincide con lo declarado?*

| Variable | Fuente |
|---|---|
| El polígono declarado presenta actividad agrícola | Sentinel-2 |
| Área detectada vs. área declarada | Sentinel-2 |
| Coincidencia con cartografía catastral | IGAC |

**Rechazo automático:** área detectada menor al **50%** de la declarada.

---

### EJE C · Riesgo sectorial y climático — peso 25

*¿Qué tan expuesto está, y cómo se comportó cuando le pegó?*

| Variable | Fuente |
|---|---|
| Comportamiento en **El Niño 2023-24** vs. el promedio de su municipio | Serie NDVI + IDEAM |
| Exposición histórica a sequía e inundación | IDEAM |
| Aptitud del suelo para el cultivo declarado | UPRA |
| Pronóstico estacional del período del crédito | IDEAM |

**Este eje es lo que hace que SEEDLLITE pertenezca al Track 04.** No evaluamos solo si es buen
productor: evaluamos **si es resiliente al clima**. Que un productor perdiera 18% de vigor en
El Niño cuando su municipio promedió 34% es información de riesgo que no aparece en ningún
estado financiero — y es exactamente lo que un banco necesita saber en un país que va a tener
más Niños, no menos.

---

### EJE D · Coherencia del destino del crédito — peso 15

*¿Lo que dice que va a hacer tiene sentido y está permitido?*

El destino del crédito agropecuario **está reglamentado**: Resolución 08 de 2023 de la CNCA
define destinos y usuarios. No es una formalidad.

| Variable | Qué detecta |
|---|---|
| ¿El cultivo declarado corresponde a lo observado? | Declaración falsa |
| ¿El monto es proporcional al área real y al costo por hectárea? | Sobredimensionamiento |
| ¿El calendario del plan coincide con el ciclo observado? | Plan de inversión irreal |
| **¿El destino es elegible según Resolución 08/2023 CNCA?** | Destino no financiable |

---

## 4. 🌿 Filtro de viabilidad ambiental — sección nueva

**Laura tenía razón: esto no es un adorno, es un requisito.**

### La base jurídica

En el **Manual de Servicios de FINAGRO**, al presentar la solicitud de crédito **el
intermediario financiero certifica que el proyecto a financiar es técnica, financiera y
ambientalmente viable**.

> Es decir: hoy el banco **ya está obligado a certificar viabilidad ambiental** — y lo hace
> sin ninguna herramienta para verificarla. Firma sobre la palabra del solicitante.
>
> **SEEDLLITE puede verificarla automáticamente cruzando el polígono del predio contra las
> capas oficiales de áreas protegidas.** Eso deja de ser un extra y se vuelve una razón
> comercial para comprarnos: le quitamos al banco un riesgo de certificación que hoy asume a ciegas.

### Las cuatro capas de restricción

| Capa | Norma | Efecto |
|---|---|---|
| **Reserva forestal de Ley 2ª** | **Ley 2 de 1959** — zonas de reserva forestal, vigente e interpretada en armonía con la Constitución de 1991 | Uso restringido. Requiere sustracción previa |
| **Páramo delimitado** | **Ley 1930 de 2018** | Prohibición de actividades agropecuarias en los términos de la ley |
| **Parque Nacional Natural** | Decreto-Ley 2811 de 1974 (CNRNR) · Ley 99 de 1993 | Prohibición |
| **Otras áreas del SINAP** | Ley 99 de 1993 · Decreto 1076 de 2015 | Según categoría |

### Cómo lo aplicamos

| Situación | Efecto en el dictamen |
|---|---|
| Predio **dentro** de PNN o páramo delimitado | 🔴 **Rechazo automático** — el intermediario no podría certificar viabilidad ambiental |
| Predio **dentro** de reserva Ley 2ª **sin** acto de sustracción acreditado | 🔴 **Rechazo automático**, con nota de que es subsanable acreditando la sustracción |
| Predio **colindante** (< 500 m) con área protegida | ⚠️ **Alerta**, no rechazo. Se advierte al comité |
| Sin restricción | ✓ Se deja constancia expresa de la verificación |

> 🔍 **Laura: dos precisiones que necesito de ti.**
> **(a)** La reserva Ley 2ª admite ocupación campesina histórica y hay tensión jurisprudencial
> sobre el punto — ¿lo tratamos como rechazo duro, o como alerta con requerimiento de
> acreditar sustracción? *(Mi inclinación: alerta, no rechazo — un rechazo duro sería
> injusto con el campesino que lleva 40 años ahí, y ese matiz nos hace ver bien.)*
> **(b)** ¿Falta alguna capa? Estoy pensando en resguardos indígenas y consejos comunitarios
> de comunidades negras — ahí no hay prohibición de crédito, pero sí particularidades de
> garantía por la inembargabilidad del territorio colectivo. **Ese punto puede ser oro para
> el pitch** y es tu terreno, no el mío.

**En el código va solo la verificación de PNN y páramo.** El resto vive en el documento y en
el README — decisión de alcance, no de criterio.

---

## 5. Escala, bandas y causales de rechazo

| Puntaje | Banda | Decisión por defecto |
|---|---|---|
| 700 – 1000 | Bajo | **Aprobar** |
| 550 – 699 | Medio | **Aprobar** con condición de desembolso |
| 400 – 549 | Alto | **Aprobar con ajuste** de monto y garantías reforzadas |
| 0 – 399 | Rechazo | **Rechazar** |

### Causales de rechazo automático

Operan **con independencia del puntaje**. Basta una.

1. Sin ciclo de cosecha detectable en los últimos **24 meses**
2. Área detectada menor al **50%** del área declarada
3. Cultivo detectado no corresponde al declarado
4. **Predio dentro de PNN o páramo delimitado** (Ley 1930 de 2018)
5. **Predio en reserva Ley 2ª de 1959 sin sustracción acreditada** 🔍 *(pendiente de decisión de Laura)*
6. Destino del crédito no elegible según Resolución 08 de 2023 CNCA

---

## 6. Costos por hectárea — qué los determina y de dónde salen

Laura preguntó **por qué vale lo que vale una hectárea**. La respuesta importa porque de ahí
sale el techo del monto.

### Los cinco factores que determinan el costo por hectárea

| Factor | Efecto |
|---|---|
| **Tipo de cultivo: transitorio vs. perenne** | Un transitorio (arroz, papa) exige el costo completo **cada ciclo**: preparación, semilla, siembra. Un perenne (café, cacao) concentra la inversión en el establecimiento y luego solo sostiene. **Por eso un transitorio pide más capital de trabajo y un perenne más crédito de inversión** |
| **Intensidad en insumos** | La papa es de los cultivos más intensivos del país en fertilizante y fungicida (por presión de gota). El café demanda más mano de obra por la recolección manual |
| **Mecanizable o no** | El arroz de riego en el Tolima es plano y mecanizable → menos jornales. El café de ladera en Huila no → la mano de obra domina el costo |
| **Rendimiento esperado del municipio** | El mismo cultivo rinde distinto según piso térmico, suelo y agua. **Aquí entra EVA** |
| **Precio de los agroinsumos** | Es lo más volátil. Hay **índice oficial**: el Índice de Precios de Agroinsumos (MinAgricultura + DANE + UPRA) |

### Las fuentes oficiales y citables

| Fuente | Qué da | Acceso |
|---|---|---|
| **EVA · Evaluaciones Agropecuarias Municipales** (UPRA/MinAgricultura) | Área sembrada, área cosechada, producción y **rendimiento por municipio y cultivo**. Incluye estructuras de costos en productos priorizados y **precios de primera venta** | **Datos abiertos** — `datos.gov.co` |
| **Índice de Precios de Agroinsumos** (MinAgricultura + DANE + UPRA) | Variación de precios de insumos | Público, UPRA |
| **Cenicafé / FNC** | Estructura de costos del café — hay informe de costos 2024 | Publicaciones Cenicafé |
| **Fedearroz** | Costos y rendimiento del arroz; su programa cubre ~60% del área arrocera (~600.000 ha) | Fedearroz |
| **Fedepapa** | Costos y precios de la papa | Fedepapa |
| **UPRA — aptitud** | Aptitud del suelo por cultivo | UPRA |

> ### 🎯 El hallazgo más útil de esta búsqueda: **EVA**
>
> EVA es **datos abiertos** y trae el **rendimiento por municipio y cultivo**. Eso nos permite
> dejar de decir "percentil de la vereda" (que era una invención nuestra) y decir algo
> verificable: **"rendimiento estimado del predio frente al rendimiento municipal reportado en
> EVA para ese cultivo"**.
>
> Deja de ser una comparación inventada y pasa a ser una comparación contra estadística
> oficial. **Es un cambio pequeño en la interfaz y grande en credibilidad.**
>
> 🔍 **Decisión para el equipo:** ¿cambiamos `percentil_vereda` por `rendimiento_vs_municipio_eva`?
> Cuesta ~20 minutos de Torres y vale mucho ante el jurado. **Mi voto: sí.**

`SUPUESTO:` los costos de referencia por hectárea que usa el demo (café $3,5M, arroz $3,7M,
papa $4,5M) siguen siendo estimación del equipo. **No se citan como dato en el video.** Si
alcanza el tiempo, se reemplazan con EVA.

---

## 7. Reglas de ajuste del monto

El monto sugerido es **el menor** de estos tres:

1. El monto solicitado
2. **Ajuste por área real:** `solicitado × (área detectada ÷ área declarada)`
3. **Techo agronómico:** `costo de referencia por ha × área detectada`

Y en todo caso sujeto al **tope legal del pequeño productor** (70% de sus activos).

---

## 8. 🛰️ Delimitación de los estudios satelitales

**Laura pidió delimitar exactamente qué se analiza. Esto es lo que SEEDLLITE hace, y solo esto.**

Decir los límites es lo que hace creíble el resto: un modelo que promete verlo todo no lo cree
nadie.

| # | Estudio | Insumo | Método | Salida | Límite declarado |
|---|---|---|---|---|---|
| **1** | **Serie NDVI de 10 años** | Sentinel-2 L2A, bandas B04 y B08 | `NDVI = (B08−B04)/(B08+B04)`, mediana mensual sobre el polígono | 120 puntos mensuales | Sentinel-2 existe **desde 2015**. Antes de esa fecha solo hay Landsat, a 30 m |
| **2** | **Detección de ciclos** | Serie NDVI | Conteo de picos y valles con umbral de amplitud mínima | N.º de ciclos, duración, amplitud | En perennes (café, cacao) el ciclo es menos marcado: **mayor incertidumbre declarada** |
| **3** | **Área efectivamente cultivada** | Sentinel-2, resolución 10 m | Fracción del polígono con NDVI y estacionalidad de cultivo | Hectáreas detectadas | **Resolución 10 m: no distingue predios menores a ~0,5 ha.** Es un límite duro |
| **4** | **Respuesta a estrés climático** | Serie NDVI + eventos IDEAM | Caída de vigor en la ventana del evento vs. la del municipio | % de caída relativa | Correlación, **no causalidad**: una caída puede ser plaga, no clima |
| **5** | **Verificación ambiental** | Polígono + capas de áreas protegidas | Intersección geométrica | Dentro / colindante / sin restricción | Depende de la vigencia de la capa oficial descargada |

### Lo que SEEDLLITE NO puede ver — y hay que decirlo

- **No identifica la variedad** del cultivo, solo la firma espectral compatible
- **No ve bajo nube densa** — el Chocó y el piedemonte tienen meses ilegibles, por eso se
  reporta la nubosidad de cada punto
- **No acredita la propiedad ni la tenencia** del predio. Eso sigue siendo del intermediario
- **No detecta trabajo informal, arrendamiento ni aparcería** — ve la tierra, no el contrato
- **No sustituye la visita técnica** cuando el intermediario la exija

> Esta tabla va **en el README y en el video**. Un jurado técnico que vea que declaramos
> nuestras limitaciones nos va a creer el resto. El equipo que promete que el satélite lo ve
> todo pierde credibilidad en la primera pregunta.

---

## 9. Aplicación a los cuatro predios del demo

| Predio | Puntaje | Banda | Decisión | Solicitado | Sugerido | Por qué |
|---|---|---|---|---|---|---|
| `huila-cafe` | **780** | Bajo | Aprobar | $9.000.000 | **$8.400.000** | Techo agronómico |
| `tolima-arroz` | **640** | Medio | Aprobar | $22.000.000 | **$21.800.000** | Ajuste leve por área |
| `boyaca-papa` | **590** | Medio | Aprobar con ajuste | $7.500.000 | **$6.600.000** | Área detectada 12% menor |
| `meta-cacao` | **310** | Rechazo | **Rechazar** | $18.000.000 | **$0** | Causal 1: sin ciclo en 24 meses |

| Predio | Línea FINAGRO | FAG | Plazo | Condición |
|---|---|---|---|---|
| `huila-cafe` | Inversión — renovación de perennes · pequeño productor | 80% | 36 m | Dos tramos; el segundo condicionado a verificación satelital de siembra |
| `tolima-arroz` | Capital de trabajo · pequeño productor | 80% | 12 m | Desembolso único con monitoreo satelital mensual |
| `boyaca-papa` | Capital de trabajo · pequeño productor | 80% | 12 m | Monto ajustado al área verificada. Dos tramos |
| `meta-cacao` | — | — | — | Reevaluable si acredita reactivación y se verifica un ciclo completo |

🔍 Verificar denominación oficial de las líneas contra el Manual de Servicios FINAGRO v.26.21.

---

## 10. Lo que el dictamen debe decir siempre

1. **Cada afirmación con su dato.** Prohibido "el productor parece confiable". Obligatorio
   "9 ciclos de cosecha completos entre 2016 y 2025, NDVI pico promedio 0,78".
2. **Tono de memorando interno de banco.** Sobrio, técnico, sin adjetivos.
3. **El rechazo se explica con precisión.** Para `meta-cacao`: **colapso del patrón cíclico**,
   no "vegetación escasa" — el NDVI no es bajo.
4. **Las alertas se dicen aunque se apruebe.**
5. **Constancia expresa de la verificación ambiental**, incluso cuando sea favorable.
6. **El descargo va siempre:**

> *SEEDLLITE emite una recomendación dirigida a un intermediario financiero vigilado. No
> constituye oferta de crédito, promesa de desembolso ni asesoría financiera al productor.
> La decisión de otorgamiento corresponde exclusivamente al intermediario, conforme a su
> reglamento de crédito, al SARC y al Manual de Servicios de FINAGRO.*

---

## 11. Fuentes

| Tema | Fuente |
|---|---|
| Criterios obligatorios de evaluación de riesgo de crédito (SARC) | [Circular Básica Contable y Financiera, Cap. II — SARC](https://www.supersolidaria.gov.co/sites/default/files/data/capitulo_ii_sistema_de_administracion_del_riesgo_de_credito_-_sarc_0_0.pdf) |
| Pequeño productor, topes, tasas | [Manual de Servicios FINAGRO v.26.21](https://www.finagro.com.co/sites/default/files/documents/2026-04/Manual%20de%20servicios%20V.%20%2026.21%20(16-04-2026).pdf) |
| Balance con menos de 90 días | [Requisitos crédito FINAGRO — Banco Agrario](https://www.bancoagrario.gov.co/system/files/2026-01/gc-ec-ht-044_2.2_requisitos_para_credito_con_recursos_finagro_pequeno_productor_agropecuario_joven_rural_mujer_rural_bajos_ingresos_2.pdf) |
| Destino del crédito agropecuario | [Resolución 08 de 2023 CNCA](https://www.finagro.com.co/transparencia-acceso-informacion-publica/normativa/resoluciones-cnca/cnca/resolucion-no-08-2023-cnca-cual-se-reglamenta-destino-del-credito-agropecuario-rural-se-definen) |
| Cobertura FAG | [FAG — MinAgricultura](https://www.minagricultura.gov.co/tramites-servicios/credito-agropecuario/Paginas/v1/Fondo-Agropecuario-de-Garant%C3%ADas-FAG.aspx) |
| Reserva forestal | [Ley 2 de 1959](https://www.minambiente.gov.co/wp-content/uploads/2021/08/ley-2-1959.pdf) · [ANLA](https://www.anla.gov.co/07rediseureka2024/normativa/leyes/ley-2-de-1959-economia-forestal-de-la-nacion-zonas-de-reserva-forestal) |
| Páramos | [Ley 1930 de 2018](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=87764) |
| Rendimiento municipal por cultivo | [EVA — Datos Abiertos Colombia](https://www.datos.gov.co/Agricultura-y-Desarrollo-Rural/Evaluaciones-Agropecuarias-Municipales-EVA/2pnw-mmge) · [EVA — UPRA](https://upra.gov.co/en/eva) |
| Precios de agroinsumos | [Índice de Precios de Agroinsumos — UPRA](https://upra.gov.co/es-co/destacados/indice-de-precios-de-agroinsumos) |
| Costos del café | [Informe de Costos 2024](https://acuerdocafebosqueyclima.com/wp-content/uploads/2025/07/Informe-Costos-2024.pdf) · [Cenicafé](https://publicaciones.cenicafe.org/index.php/memorias/article/view/3130) |
| Imágenes satelitales y licencia | [Copernicus Sentinel — licencia abierta](https://open.esa.int/copernicus-sentinel-satellite-imagery-under-open-licence/) |

---

*Versión 2 · 15-ago-2026, 17:00. Pendientes marcados 🔍 para Laura.*
