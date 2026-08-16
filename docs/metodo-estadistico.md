# MÉTODO ESTADÍSTICO Y PROBABILÍSTICO — SEEDLLITE

> **Qué resuelve este documento.** Hoy el dictamen dice «amplitud histórica 0,341» y «pérdida
> 39,0%» como si fueran hechos exactos. No lo son: son **estimaciones** sobre una muestra
> incompleta —entre 48 y 96 meses medidos de 108— y sobre una rejilla de 16 celdas. Un evaluador
> de riesgo pregunta de inmediato cuánta incertidumbre hay detrás. Hasta hoy no teníamos
> respuesta. Este documento la construye, con la matemática explícita y calculada sobre los
> predios reales.
>
> **Versión 1 — 16-ago-2026.** Insumo del frente MOTOR. La sección 6 es el encargo de
> implementación.

---

## 0. Regla de la casa aplicada a la estadística

La regla del proyecto es **sin fuente, no es un hecho**. Aplicada aquí significa tres cosas:

1. **Toda cifra de este documento es reproducible** ejecutando el código que se especifica en la
   sección 6 sobre `data/series_ndvi.json` y `data/predios.json` tal como están commiteados hoy.
   No hay ningún número traído de memoria ni de un paper.
2. **Todo supuesto va marcado** con `SUPUESTO:` y con qué habría que hacer para verificarlo.
3. **Una estimación sin intervalo es una afirmación sin fuente.** Publicar «0,341» sin decir que
   el intervalo al 95% es [0,268 – 0,400] es exactamente el mismo pecado que inventar el 0,341.

### 0.1 Qué estima cada cifra, y con qué convenio exacto

Antes de poner intervalos hay que fijar el estimador. `ingesta_sentinel.amplitud()` hace esto:

```
A = q90 − q10   sobre  S = { suavizar(serie enmascarada) : valor ≠ None }
```

con `suavizar` = mediana móvil de 3 meses, y con el convenio de percentil por **índice entero**:

```
q10 = orden[ int(n × 0,10) ]      q90 = orden[ int(n × 0,90) ]
```

Es decir, no interpola entre estadísticos de orden. Verificado sobre `boyaca-papa`, ventana
histórica (2017-01 a 2023-12):

| | valor |
|---|---|
| meses medidos en la ventana | 68 de 84 |
| tamaño de `S` (`n_ef`) | **82** |
| índice 10 | `int(82 × 0,10)` = 8 → `S[8]` = 0,325 |
| índice 90 | `int(82 × 0,90)` = 73 → `S[73]` = 0,666 |
| **A** | 0,666 − 0,325 = **0,341** ✓ coincide con el publicado |

### 0.2 Primer hallazgo: la muestra efectiva no es la que uno cree

**`n_ef` (82) es mayor que el número de meses medidos (68).** No es un error de conteo: `suavizar`
devuelve valor en toda posición donde al menos uno de los tres meses de la ventana esté medido,
de modo que **un mes sin observación adyacente a uno medido hereda su valor**. La serie
suavizada de `huila-cafe` tiene 80 puntos sobre 57 meses medidos: un 40% de inflación.

| predio (ventana histórica) | meses medidos | `n_ef` | inflación |
|---|---|---|---|
| `huila-cafe` | 57 | 80 | +40% |
| `boyaca-papa` | 68 | 82 | +21% |
| `boyaca-papa-nubes` | 37 | 67 | +81% |
| `tolima-arroz` | 71 | 84 | +18% |

**Consecuencia para el intervalo:** si el bootstrap remuestrea `n_ef` valores, trata como
información nueva lo que es la misma medición copiada por el filtro, y **el intervalo sale
demasiado angosto**. En todo lo que sigue, **la réplica bootstrap tiene tamaño `n_medidos`, no
`n_ef`**: el pool de valores es la serie suavizada (porque ese es el estimador), pero el número
de extracciones es el número de mediciones independientes que realmente hubo.

---

## 1. Intervalo de confianza de la amplitud

### 1.1 Por qué bootstrap y no una fórmula cerrada

`A = q90 − q10` es una función **no suave** de estadísticos de orden. Su varianza asintótica
depende de la densidad `f` evaluada en los cuantiles:

```
Var(q_p) ≈ p(1−p) / ( n · f(q_p)² )
```

Para usarla habría que estimar `f(0,325)` y `f(0,666)` a partir de las mismas 68 observaciones,
lo cual es circular y numéricamente peor que el problema original. El bootstrap evita estimar la
densidad: sustituye la distribución desconocida `F` por la empírica `F̂` y calcula la variabilidad
del estimador por simulación. Para funcionales de cuantiles con `n` de varias decenas es el
método estándar y no requiere ningún supuesto de normalidad —que aquí sería falso, porque la
distribución de un NDVI mensual es bimodal en transitorios (dosel / suelo desnudo).

### 1.2 Procedimiento base — bootstrap percentil i.i.d.

```
1. v      = serie de la ventana, con None en los meses interpolados
2. pool   = [x for x in suavizar(v) if x is not None]        (tamaño n_ef)
3. n_med  = número de meses medidos en la ventana
4. repetir B veces:
       r  = n_med extracciones CON reemplazo de pool
       A* = orden(r)[int(n_med×0,90)] − orden(r)[int(n_med×0,10)]
5. IC95 = [ percentil 2,5 de {A*} , percentil 97,5 de {A*} ]
```

### 1.3 Cuántas réplicas: B = 5.000

No se elige por costumbre, se mide. Repetimos el bootstrap completo con **20 semillas distintas**
y observamos cuánto se mueven los extremos del intervalo (`huila-cafe`, ventana histórica):

| B | rango del límite inferior entre 20 semillas | rango del límite superior |
|---|---|---|
| 500 | 0,0080 | 0,0030 |
| 1.000 | 0,0040 | 0,0030 |
| 2.000 | 0,0010 | 0,0030 |
| **5.000** | **0,0000** | **0,0000** |
| 10.000 | 0,0000 | 0,0000 |

Con B = 5.000 el error de Monte Carlo cae **por debajo de la tercera cifra decimal**, que es la
precisión con la que se publica la amplitud. Publicar tres decimales con B = 500 sería reportar
ruido del simulador como si fuera dato del predio.

**La semilla se fija y se publica.** Un dictamen es un documento que un comité de crédito firma:
correrlo dos veces tiene que dar lo mismo. `semilla = 20260816` entra al contrato de datos.

### 1.4 Resultados — ventana histórica (2017-01 a 2023-12, 84 meses)

| predio | medidos | A publicada | **IC95 i.i.d.** | ancho | IC95 bloque móvil (L=12) | ancho |
|---|---|---|---|---|---|---|
| `huila-cafe` | 57 | **0,123** | **[0,092 – 0,183]** | 0,091 | [0,074 – 0,186] | 0,112 |
| `tolima-arroz` | 71 | **0,756** | **[0,684 – 0,795]** | 0,111 | [0,676 – 0,796] | 0,120 |
| `boyaca-papa` | 68 | **0,341** | **[0,268 – 0,400]** | 0,132 | [0,257 – 0,389] | 0,132 |
| `meta-cacao` | 74 | **0,107** | **[0,058 – 0,178]** | 0,120 | [0,054 – 0,326] | 0,272 |
| `boyaca-papa-nubes` | 37 | 0,335 | [0,259 – 0,554] | 0,295 | [0,216 – 0,524] | 0,308 |
| `meta-cacao-productivo` | 72 | 0,421 | [0,398 – 0,586] | 0,188 | [0,387 – 0,556] | 0,169 |
| `meta-cacao-sin-manejo` | 73 | 0,248 | [0,166 – 0,285] | 0,119 | [0,163 – 0,285] | 0,122 |
| `boyaca-papa-media` | 48 | 0,357 | [0,284 – 0,429] | 0,145 | [0,244 – 0,418] | 0,174 |
| `meta-cacao-vigor-bajo` | 74 | 0,133 | [0,090 – 0,180] | 0,090 | [0,100 – 0,225] | 0,125 |

**Lectura de los dos casos pedidos:**

- **`boyaca-papa`: 0,341 con IC95 [0,268 – 0,400].** El intervalo mide 0,132, un **±19%** relativo
  sobre el punto. Es un predio bien medido (68 de 84 meses) y con amplitud grande; el intervalo
  no toca ningún umbral del sistema. Esta cifra se puede defender ante un comité.
- **`huila-cafe`: 0,123 con IC95 [0,092 – 0,183].** El piso del detector es **0,120**. El
  intervalo lo contiene. Ver 1.6.

### 1.5 Resultados — ventana reciente (24 meses, 2024-01 a 2025-12)

Aquí es donde la incertidumbre deja de ser académica: es la ventana de la que sale
`perdida_amplitud_pct`, que es la métrica insignia del producto.

| predio | medidos | A publicada | IC95 i.i.d. | ancho | IC95 bloque (L=6) |
|---|---|---|---|---|---|
| `huila-cafe` | 18 | 0,089 | [0,059 – 0,145] | 0,086 | [0,056 – 0,136] |
| `tolima-arroz` | 16 | 0,746 | [0,378 – 0,775] | **0,397** | [0,378 – 0,775] |
| `boyaca-papa` | 18 | 0,208 | [0,138 – 0,294] | 0,156 | [0,090 – 0,252] |
| `meta-cacao` | 22 | 0,092 | [0,044 – 0,127] | 0,083 | [0,030 – 0,127] |
| `meta-cacao-productivo` | 21 | 0,397 | [0,227 – 0,718] | **0,491** | [0,216 – 0,718] |
| `meta-cacao-sin-manejo` | 21 | 0,088 | [0,061 – 0,127] | 0,066 | [0,055 – 0,127] |
| `boyaca-papa-media` | 16 | 0,321 | [0,192 – 0,412] | 0,220 | [0,139 – 0,412] |
| `meta-cacao-vigor-bajo` | 20 | 0,089 | [0,060 – 0,191] | 0,131 | [0,012 – 0,191] |
| `boyaca-papa-nubes` | 11 | 0,117 | [0,053 – 0,117] | — | [0,032 – 0,208] |

Con 16 a 22 meses medidos los intervalos son **dos a cuatro veces más anchos** que en la ventana
histórica. En `tolima-arroz` el ancho (0,397) es más de la mitad del valor puntual.

### 1.6 El resultado incómodo: `huila-cafe` está sobre el filo del piso de 0,12

`contar_ciclos()` devuelve 0 si la amplitud observada es menor a 0,12. `huila-cafe` mide **0,123**:
tres milésimas de margen. Con el intervalo en la mano se puede cuantificar el filo:

| predio | A | P(A < 0,120) i.i.d. | P(A < 0,120) bloque móvil |
|---|---|---|---|
| `huila-cafe` | 0,123 | **0,322** | **0,473** |
| `meta-cacao` | 0,107 | 0,724 | 0,550 |
| `meta-cacao-vigor-bajo` | 0,133 | 0,199 | 0,238 |
| los otros seis | ≥ 0,248 | 0,000 | ≤ 0,001 |

**Entre un tercio y la mitad de las réplicas de `huila-cafe` caen por debajo del piso.** La
evidencia «9 ciclos productivos completos detectados entre 2017 y 2025», que hoy va como primera
línea favorable del dictamen del predio insignia, es un resultado con probabilidad cercana a
la de una moneda. No es falsa: es indeterminada, y hoy se presenta como determinada.

Simétricamente, el «0 ciclos» de `meta-cacao` tiene un 28 a 45% de probabilidad de ser un
recuento positivo. Esto **respalda por la vía estadística** la decisión ya tomada en
`criterios-de-credito.md` §9 de mover el rechazo de `meta-cacao` de la causal 1 a la causal 2: la
causal de ciclos no soportaba el peso, y ahora sabemos por cuánto.

### 1.7 La pérdida de amplitud, con intervalo

`perdida_amplitud_pct = (A_hist − A_24m) / A_hist × 100`. Se bootstrapean **las dos ventanas a la
vez**, cada una con su propio `n_med`, y se recalcula el cociente en cada réplica.

| predio | pérdida publicada | **IC95** | P(pérdida ≥ 40%) |
|---|---|---|---|
| `huila-cafe` | 27,6% | [0,0 – 57,2] | 0,135 |
| `tolima-arroz` | 1,3% | [0,0 – 48,0] | 0,028 |
| **`boyaca-papa`** | **39,0%** | **[6,7 – 59,5]** | **0,299** |
| `meta-cacao` | 14,0% | [0,0 – 70,6] | 0,375 |
| `boyaca-papa-nubes` | 65,1% | [55,7 – 87,6] | 1,000 |
| `meta-cacao-productivo` | 5,7% | [0,0 – 46,5] | 0,069 |
| `meta-cacao-sin-manejo` | 64,5% | [35,0 – 75,8] | 0,953 |
| `boyaca-papa-media` | 10,1% | [0,0 – 49,4] | 0,092 |
| `meta-cacao-vigor-bajo` | 33,1% | [0,0 – 63,9] | 0,480 |

**El caso que hay que decir en voz alta:** el dictamen de `boyaca-papa` justifica su ajuste de
monto diciendo *«pierde 39% de amplitud»*. El intervalo de esa cifra es **[6,7% – 59,5%]**. La
diferencia entre «perdió 7%» y «perdió 60%» es la diferencia entre un predio sano y uno en
abandono. **La cifra puntual no distingue esos dos mundos, y hoy se publica como si sí.**

Solo dos predios tienen una pérdida que el dato sostiene con firmeza: `boyaca-papa-nubes`
(P = 1,000) y `meta-cacao-sin-manejo` (P = 0,953). Son, no por casualidad, los dos casos
construidos para mostrar deterioro.

### 1.8 El supuesto del bootstrap i.i.d., y por qué hay que dar también el de bloque

El bootstrap i.i.d. supone que los meses son **intercambiables**. En una serie fenológica eso es
falso, y se puede medir. Autocorrelación de la serie suavizada medida, ventana histórica:

| predio | r(1) | r(6) | r(12) |
|---|---|---|---|
| `boyaca-papa` | **+0,740** | −0,382 | **+0,545** |
| `meta-cacao` | +0,652 | −0,151 | −0,186 |
| `tolima-arroz` | +0,485 | +0,592 | +0,474 |
| `huila-cafe` | +0,091 | +0,126 | −0,012 |

Con r(1) = +0,74 en `boyaca-papa`, los meses **no** son independientes: dos meses consecutivos
comparten fase del cultivo. El r(12) positivo en papa y arroz es la estacionalidad anual, que es
precisamente la señal que la amplitud mide. Un bootstrap que rompe el orden temporal destruye esa
estructura y **subestima la varianza**.

**Alternativa correcta: bootstrap de bloque móvil (moving block bootstrap).** En vez de
remuestrear meses sueltos se remuestrean **tramos contiguos** de longitud L, que se concatenan
hasta reconstruir una serie de la misma longitud, y sobre ella se corre el estimador completo
—incluido `suavizar`, e incluidos los huecos, que viajan dentro del bloque.

Elección de L:

- **Ventana histórica: L = 12 meses.** Un bloque tiene que contener un ciclo estacional completo
  o el remuestreo destruye justamente lo que se está midiendo. Lo respalda r(12) = +0,55.
- **Ventana de 24 meses: L = 6.** Con n = 24 y L = 12 solo hay 13 bloques distintos y el
  procedimiento queda casi degenerado. Que no se pueda hacer mejor **es en sí mismo el hallazgo**:
  sobre 24 meses no existe un intervalo estrecho y honesto para la amplitud.

El bloque móvil da intervalos **iguales o más anchos** en 8 de los 9 predios (ver tabla 1.4). El
caso extremo es `meta-cacao`: i.i.d. da [0,058 – 0,178] y bloque da **[0,054 – 0,326]**, más del
doble de ancho. Ahí la dependencia temporal estaba escondiendo casi toda la incertidumbre.

**Regla que proponemos:** se publica el intervalo **de bloque móvil** como intervalo oficial del
dictamen, y el i.i.d. queda como diagnóstico interno. Es el más ancho de los dos en casi todos los
casos, y en un producto de crédito el error caro es el intervalo demasiado angosto.

### 1.9 Lo que el bootstrap NO corrige, y hay que decirlo

El bootstrap describe la variabilidad **dado el conjunto de meses que sí se midieron**. No corrige
el **sesgo** de que los meses faltantes no faltan al azar. Y no faltan al azar: la nubosidad es
estacional. Meses interpolados por mes calendario, sobre los nueve predios (81 predio-mes cada uno):

| mes | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| % interpolado | 6,2 | 16,0 | 32,1 | 22,2 | 35,8 | 28,4 | **42,0** | 22,2 | 29,6 | 22,2 | 23,5 | 9,9 |

Julio se pierde siete veces más que enero. Si la fase de suelo desnudo de un cultivo cae
sistemáticamente en la temporada nublada, el `q10` observado está sesgado hacia arriba y la
amplitud se subestima **de forma sistemática, no aleatoria**. Ningún intervalo de confianza
arregla eso.

> **Redacción obligatoria en el dictamen:** el intervalo es «incertidumbre por muestreo de los
> meses observados». No es «incertidumbre total de la medición». La diferencia entre las dos es
> el sesgo de nubosidad estacional, que queda declarado y no cuantificado.
>
> `SUPUESTO A VERIFICAR:` cuantificar ese sesgo exige contrastar contra una fuente que sí vea
> bajo nube —Sentinel-1 (radar, todo tiempo)— sobre las mismas parcelas. No se hizo. Es la
> primera línea de trabajo posterior al hackathon.

---

## 2. Probabilidad de detectar un ciclo dada la cobertura

**Esta es la sección que convierte la regla de los 12 meses de `criterios-de-credito.md` §3, hoy
un umbral puesto a ojo, en un número.** La pregunta: si de 24 meses solo se midieron m, ¿cuál es
la probabilidad de que un ciclo real haya pasado desapercibido y el sistema devuelva 0?

Un falso negativo aquí **no es un error estadístico: es la negación de un crédito a alguien que sí
produce, por causa de una nube.**

### 2.1 Qué tiene que ver el detector para contar un ciclo

De `contar_ciclos()`: se arma cuando observa un mes con `NDVI ≥ alto` y suma un ciclo cuando
después observa uno con `NDVI ≤ bajo`, donde `alto = q10 + 0,70·A` y `bajo = q10 + 0,30·A`.

**Condición necesaria y suficiente para contar ≥ 1 ciclo:** existe un mes observado en fase alta
**seguido en el tiempo** por un mes observado en fase baja. Perder cualquiera de los dos cruces
borra el ciclo entero.

### 2.2 La geometría del ciclo, medida y no supuesta

Etiquetamos cada mes de la serie real de `boyaca-papa` (108 meses) contra sus propios umbrales
—`q10 = 0,325`, `q90 = 0,631`, `A = 0,306`, `alto = 0,539`, `bajo = 0,417`— con A = alto,
B = bajo, `-` = zona intermedia:

```
BBB----AAABBBBBBBA---AA-BBBBAAAAAA--BBBBBB.AA---BBBB---.AAA---BAAAA--AAA-BBAAAAAA----BBBB----AAA------BAAAAA
```

| medido sobre la serie real | `boyaca-papa` | `tolima-arroz` | `boyaca-papa-media` |
|---|---|---|---|
| racha media en fase ALTA | 3,45 meses | 3,12 | 4,45 |
| racha media en fase BAJA | 3,56 meses | 2,53 | 2,62 |
| ciclos en 108 meses | 8 | 14 | 6 |
| **periodo medio** | **13,5 meses** | 7,7 | 18,0 |

`SUPUESTO:` el enunciado agronómico «un ciclo de papa dura entre 4 y 6 meses» se refiere al
**cultivo en campo**, y es consistente con lo medido: una racha alta de ~3,5 meses es el pico de
dosel dentro de un ciclo de 4-6 meses. El periodo de 13,5 meses incluye el barbecho entre
siembras. Verificar contra la ficha técnica de Fedepapa o el calendario de siembras de Agronet
para Ventaquemada antes de citarlo en público.

### 2.3 Modelo combinatorio exacto

Sobre una ventana de 24 meses con etiquetas fijas, se elige un subconjunto de m meses observados,
uniformemente entre los `C(24,m)` posibles. El evento **falso negativo** es «la palabra observada
no contiene ninguna A seguida de una B», es decir, la palabra tiene la forma `B*A*`.

Se cuenta exactamente por programación dinámica sobre las 24 posiciones, con estado `a` = «ya se
observó una A»:

```
dp[a][t]  = número de subconjuntos de tamaño t entre las primeras i posiciones, sin violación
transición al observar la posición i+1 con etiqueta L:
    L = '-'  →  dp[a][t+1] += dp[a][t]
    L = 'A'  →  dp[1][t+1] += dp[a][t]
    L = 'B'  →  dp[0][t+1] += dp[0][t]      (una B tras una A viola: se descarta)
P(falso negativo) = ( dp[0][m] + dp[1][m] ) / C(24, m)
```

Se promedia sobre las T fases posibles del ciclo, porque el mes de siembra respecto del inicio de
la ventana es arbitrario. Escenarios parametrizados con las rachas medidas en 2.2:

```
papa Boyacá  (T=13, alta 3, baja 3)   AAA-BBB------AAA-BBB----
papa corta   (T=8,  alta 3, baja 3)   AAA-BBB-AAA-BBB-AAA-BBB-
papa larga   (T=14, alta 3, baja 3)   AAA-BBB-------AAA-BBB---
arroz Tolima (T=8,  alta 3, baja 2)   AAA-BB--AAA-BB--AAA-BB--
caso adverso (T=14, alta 2, baja 2)   AA-BB---------AA-BB-----
```

**P(falso negativo) — modelo combinatorio exacto, ventana de 24 meses:**

| m | papa Boyacá | papa corta | papa larga | arroz | caso adverso | **promedio** |
|---|---|---|---|---|---|---|
| 6 | 0,483 | 0,223 | 0,519 | 0,344 | 0,703 | **0,454** |
| 8 | 0,301 | 0,086 | 0,339 | 0,173 | 0,543 | **0,288** |
| 10 | 0,174 | 0,028 | 0,206 | 0,077 | 0,396 | **0,176** |
| 11 | 0,129 | 0,015 | 0,156 | 0,049 | 0,330 | **0,136** |
| **12** | **0,094** | **0,008** | **0,116** | **0,030** | **0,271** | **0,104** |
| 13 | 0,067 | 0,004 | 0,084 | 0,018 | 0,219 | **0,078** |
| 14 | 0,046 | 0,002 | 0,059 | 0,010 | 0,173 | **0,058** |
| 15 | 0,031 | 0,001 | 0,040 | 0,005 | 0,134 | **0,042** |
| 16 | 0,020 | 0,000 | 0,026 | 0,003 | 0,101 | **0,030** |
| 18 | 0,007 | 0,000 | 0,009 | 0,000 | 0,051 | **0,013** |
| 20 | 0,001 | 0,000 | 0,002 | 0,000 | 0,019 | **0,005** |

### 2.4 Monte Carlo con el detector real sobre ventanas reales

El modelo de 2.3 es pesimista por construcción: ignora que el detector **recalcula sus umbrales
sobre la submuestra**, lo que le permite adaptarse. La contraparte es una simulación que corre
`contar_ciclos()` de verdad.

**Diseño.** Se toman todas las ventanas deslizantes de 24 meses de los cuatro predios transitorios
que cumplan (i) ≥ 20 meses medidos y (ii) el detector encuentra ≥ 1 ciclo con esa cobertura.
Esas son las ventanas donde **sabemos que hubo ciclo**. Resultan **85 ventanas de referencia**
(46 de `tolima-arroz`, 38 de `boyaca-papa`, 1 de `boyaca-papa-media`). Para cada una y cada m se
extraen 4.000 submuestras de m meses entre los medidos, se corre `contar_ciclos(..., minimo=6)`, y
se cuenta cuántas devuelven 0.

| m | **P(falso negativo) global** | `boyaca-papa` | `tolima-arroz` |
|---|---|---|---|
| ≤ 5 | **1,000** | 1,000 | 1,000 |
| 6 | 0,161 | 0,209 | 0,124 |
| 7 | 0,118 | 0,170 | 0,077 |
| 8 | 0,089 | 0,143 | 0,046 |
| 9 | 0,068 | 0,118 | 0,028 |
| 10 | 0,054 | 0,101 | 0,016 |
| 11 | **0,042** | 0,083 | 0,009 |
| **12** | **0,033** | **0,068** | **0,005** |
| 13 | 0,026 | 0,054 | 0,002 |
| 14 | 0,020 | 0,043 | 0,002 |
| 16 | 0,012 | 0,025 | 0,000 |
| 18 | 0,005 | 0,010 | 0,000 |
| 20 | 0,001 | 0,001 | 0,000 |

El salto de 1,000 a 0,161 entre m = 5 y m = 6 no es un artefacto: es el parámetro `minimo = 6` de
`contar_ciclos()`, que devuelve 0 sin mirar nada. **Por debajo de 6 meses medidos el detector no
puede acertar nunca**, y ese es su comportamiento correcto.

### 2.5 Corrección por nubes agrupadas

Las dos tablas anteriores suponen que los meses faltantes se sortean **uniformemente**. No es así:
las nubes vienen en rachas.

| rachas de meses sin observación, los 9 predios | valor |
|---|---|
| número de rachas | 150 |
| longitud media | **1,57 meses** |
| longitud máxima | 6 meses |
| distribución | 1 mes: 108 · 2: 22 · 3: 6 · 4: 8 · 5: 3 · 6: 3 |
| longitud media esperada si los huecos fueran independientes (p = 0,24) | 1,32 |

Para medir el efecto se **trasplantan máscaras reales**: se toman ventanas de referencia con ≥ 22
meses medidos (30 ventanas) y se les aplica el patrón de ausencia observado en ventanas reales de
los nueve predios con exactamente m meses presentes.

| m | P(FN) con huecos uniformes | P(FN) con **máscara real** | factor |
|---|---|---|---|
| 10 | 0,018 | 0,026 | 1,46 |
| 11 | 0,011 | 0,017 | 1,52 |
| **12** | **0,007** | **0,011** | **1,56** |
| 13 | 0,004 | 0,012 | 3,08 |
| 14 | 0,003 | 0,007 | 2,65 |

*(Los valores absolutos son menores que en 2.4 porque estas 30 ventanas son las de cobertura más
alta, es decir, las más fáciles. Lo que importa aquí es el factor, no el nivel.)*

**El agrupamiento de las nubes multiplica el falso negativo por un factor de aproximadamente 1,5 a
3.** Aplicado a la curva operativa de 2.4, m = 12 pasa de 3,3% a **entre 5% y 10%**.

### 2.6 Veredicto sobre la regla de los 12 meses

Los tres cálculos, puestos juntos, para m = 12 de 24:

| método | P(falso negativo) en m = 12 |
|---|---|
| combinatorio, promedio de escenarios (pesimista) | 10,4% |
| combinatorio, escenario adverso (alta 2 / baja 2, T = 14) | 27,1% |
| detector real, huecos uniformes (optimista) | 3,3% |
| detector real, corregido por agrupamiento de nubes | **5% – 10%** |

Cobertura mínima necesaria según el criterio de tolerancia que se adopte:

| tolerancia a falso negativo | detector real | combinatorio (promedio) | combinatorio (adverso) |
|---|---|---|---|
| ≤ 20% | m ≥ 6 | m ≥ 10 | m ≥ 14 |
| ≤ 15% | m ≥ 7 | m ≥ 11 | m ≥ 15 |
| ≤ 10% | m ≥ 8 | m ≥ 13 | m ≥ 17 |
| ≤ 5% | m ≥ 11 | m ≥ 15 | m ≥ 19 |
| ≤ 2% | m ≥ 14 | m ≥ 18 | — |

**Conclusión 1 — el umbral de 12 se sostiene, y ahora se sabe qué compra.** Doce meses de 24
sitúan el falso negativo entre **3% y 10%** según lo conservador que se sea, y en **10,4%** bajo
el modelo combinatorio calibrado. No es un número puesto a ojo: es el punto donde el detector
real cruza el 5% y el modelo pesimista cruza el 10%. Un umbral de 12 corresponde, en la lectura
más exigente que sostienen estos datos, a **«acepto rechazar por error a 1 de cada 10 productores
que sí producen»**.

**Conclusión 2 — pero 12 no es el umbral que uno elegiría desde cero.** Si el criterio es que un
falso negativo cueste como máximo 5% bajo el modelo conservador, el umbral correcto es **15
meses**, no 12. La diferencia importa: con 15 quedarían en aplazamiento `tolima-arroz` (16, al
filo) y `boyaca-papa-media` (16), que hoy se evalúan y se aprueban.

**Recomendación.** Mantener 12 como umbral de **rechazo por causal**, y añadir una **franja de
cautela de 12 a 15 meses** en la que la causal opere pero el dictamen declare explícitamente la
probabilidad de falso negativo calculada para esa cobertura. Es decir: no cambiar quién pasa,
cambiar **qué se le dice al comité sobre la confianza con que pasa**. Concretamente, en un predio
con 12 meses medidos el dictamen debe decir *«con esta cobertura, la probabilidad de que un ciclo
real no haya sido detectado es de aproximadamente 7%»*, en vez de callarla.

**Conclusión 3 — el caso `boyaca-papa-nubes` queda blindado.** Tiene 11 meses medidos de 24 y hoy
se aplaza. A m = 11 el falso negativo es 4,2% global y **8,3% en el predio de papa**, que es el
que se le parece. Pero hay un argumento más fuerte todavía, en la sección 4.5: con 11 meses, el
recuento de ciclos de ese predio depende de un criterio de desempate del filtro de mediana. El
aplazamiento no es prudencia: es la única respuesta que el dato permite.

---

## 3. Incertidumbre del área medida

### 3.1 El estimador es una proporción binomial

`medir_area.py` parte el polígono en una rejilla de 4×4, clasifica cada celda como agrícola o no,
y estima `fracción = k / n` con n = 16. **La causal 2 —rechazo si el área detectada es menor al
50% de la declarada— es una prueba de hipótesis sobre esa proporción con 16 observaciones.**

Se usa el **intervalo de Wilson (score)** y no el de Wald (`p̂ ± z·√(p̂(1−p̂)/n)`), porque Wald
tiene cobertura real desastrosa con n pequeño y da límites fuera de [0,1] cuando p̂ se acerca a 0
o 1 —exactamente los casos del demo (2/16 y 16/16).

```
                p̂ + z²/2n                 z              ⎡ p̂(1−p̂)     z²  ⎤
   centro =  ─────────────      semiancho = ────────  · √ ⎢ ───────  + ──── ⎥
                1 + z²/n                   1 + z²/n       ⎣    n       4n²  ⎦
```

### 3.2 Aritmética completa del caso decisivo: 2 de 16

```
p̂ = 2/16 = 0,1250        z = 1,959964        z² = 3,8415
z²/n = 3,8415/16 = 0,24009           1 + z²/n = 1,24009

centro    = (0,1250 + 0,12005) / 1,24009 = 0,19760
raíz      = √( 0,10938/16 + 3,8415/1024 ) = √0,0105874 = 0,102895
semiancho = (1,959964 / 1,24009) × 0,102895 = 0,16263

IC95 = [0,0350 ; 0,3602]
```

**Respuesta a la pregunta que decide el rechazo: con 2 de 16, el límite superior al 95% es
36,0%, y sigue por debajo del umbral del 50%.** El rechazo de `meta-cacao` **resiste**. No es
frágil: incluso en el extremo optimista del intervalo, el predio no llega a la mitad del área
declarada. El intervalo exacto de Clopper-Pearson, más conservador, da [0,0155 – 0,3835]: el
límite superior sigue en 38,4%, también por debajo de 50%.

### 3.3 Tabla completa para n = 16

| k/16 | p̂ | **Wilson 95%** | ancho | Clopper-Pearson 95% | ¿el IC cruza 0,50? |
|---|---|---|---|---|---|
| 0/16 | 0,000 | [0,000 – 0,194] | 0,194 | [0,000 – 0,206] | no |
| 1/16 | 0,063 | [0,011 – 0,283] | 0,272 | [0,002 – 0,302] | no |
| **2/16** | **0,125** | **[0,035 – 0,360]** | 0,325 | [0,016 – 0,384] | **no** |
| 3/16 | 0,188 | [0,066 – 0,430] | 0,364 | [0,041 – 0,457] | no |
| 4/16 | 0,250 | [0,102 – 0,495] | 0,393 | [0,073 – 0,524] | no |
| 5/16 | 0,313 | [0,142 – 0,556] | 0,414 | [0,110 – 0,587] | **sí** |
| 6/16 | 0,375 | [0,185 – 0,614] | 0,429 | [0,152 – 0,646] | **sí** |
| **7/16** | **0,438** | **[0,231 – 0,668]** | 0,437 | [0,198 – 0,701] | **sí** |
| 8/16 | 0,500 | [0,280 – 0,720] | 0,440 | [0,247 – 0,754] | sí |
| 9/16 | 0,563 | [0,332 – 0,769] | 0,437 | [0,299 – 0,803] | sí |
| 10/16 | 0,625 | [0,386 – 0,815] | 0,429 | [0,354 – 0,848] | sí |
| **11/16** | **0,688** | **[0,444 – 0,858]** | 0,414 | [0,413 – 0,890] | **sí** |
| 12/16 | 0,750 | [0,505 – 0,898] | 0,393 | [0,476 – 0,927] | no |
| 13/16 | 0,813 | [0,570 – 0,934] | 0,364 | [0,544 – 0,960] | no |
| 14/16 | 0,875 | [0,640 – 0,965] | 0,325 | [0,617 – 0,985] | no |
| **15/16** | **0,938** | **[0,717 – 0,989]** | 0,272 | [0,698 – 0,998] | no |
| **16/16** | **1,000** | **[0,806 – 1,000]** | 0,194 | [0,794 – 1,000] | no |

> **La regla que hay que grabar:** con una rejilla de 4×4, la causal del 50% solo tiene respuesta
> concluyente al 95% cuando **k ≤ 4** (rechazo sostenible) o **k ≥ 12** (aprobación sostenible).
> **Para k entre 5 y 11 —siete de los diecisiete resultados posibles— el dato no alcanza para
> pronunciarse.**

### 3.4 Aplicación a los nueve predios

| predio | k/16 | p̂ | Wilson 95% | decisión actual | lectura |
|---|---|---|---|---|---|
| `tolima-arroz` | 16/16 | 1,000 | [0,806 – 1,000] | aprobar | concluyente |
| `boyaca-papa` | 16/16 | 1,000 | [0,806 – 1,000] | aprobar con ajuste | concluyente |
| `boyaca-papa-nubes` | 16/16 | 1,000 | [0,806 – 1,000] | aplazar | concluyente |
| `meta-cacao-productivo` | 16/16 | 1,000 | [0,806 – 1,000] | aprobar | concluyente |
| `boyaca-papa-media` | 16/16 | 1,000 | [0,806 – 1,000] | aprobar | concluyente |
| `huila-cafe` | 15/16 | 0,938 | [0,717 – 0,989] | aprobar con ajuste | concluyente |
| `meta-cacao-sin-manejo` | 11/16 | 0,688 | **[0,444 – 0,858]** | aprobar con ajuste | **INDETERMINADO** |
| **`meta-cacao-vigor-bajo`** | **7/16** | **0,438** | **[0,231 – 0,668]** | **rechazar** | **INDETERMINADO** |
| `meta-cacao` | 2/16 | 0,125 | [0,035 – 0,360] | rechazar | concluyente |

**Dos de los nueve dictámenes se apoyan en una medición de área que no distingue del 50%:**

- **`meta-cacao-vigor-bajo` se rechaza con 7/16 = 43,75%.** Su límite superior al 95% es **66,8%**.
  Con estos datos **no se puede rechazar** la hipótesis de que el predio tiene el 50% o más de su
  área declarada en producción. **Este rechazo sí es frágil**, y en dirección grave: es un
  rechazo, no una aprobación.
- **`meta-cacao-sin-manejo` se aprueba con 11/16 = 68,75%.** Su límite inferior es **44,4%**. La
  simetría es exacta: tampoco se puede afirmar que supere el 50%.

**Recomendación operativa.** La causal 2 debe exigir que el **intervalo completo** esté del lado
del rechazo, no solo el estimador puntual:

```
causal 2 se activa   ⟺   límite superior de Wilson al 95% < 0,50   ⟺   k ≤ 4 con n = 16
en la zona 5 ≤ k ≤ 11:  decisión = aplazar_por_verificacion, con remisión a visita técnica
```

Es la misma lógica ya aceptada para la cobertura de nubes en `criterios-de-credito.md` §3
—*«cuando el dato no alcanza, la respuesta correcta no es "no", es "no sé, vaya y mire"»*— aplicada
al eje B. **Consecuencia concreta y verificable: de los nueve dictámenes actuales, uno cambia.**
`meta-cacao-vigor-bajo` pasa de `rechazar` a `aplazar_por_verificacion`. Los otros ocho no se
mueven. `meta-cacao`, el rechazo insignia, se mantiene intacto.

### 3.5 Cuánto cuesta reducir la incertidumbre: agrandar la rejilla

El ancho del intervalo va como `1/√n`. Cada celda es una petición a la Statistical API (~3 s),
así que el costo es lineal en n.

| rejilla | n celdas | semiancho en p̂ = 0,938 | semiancho en p̂ = 0,438 | zona indeterminada respecto de 0,50 |
|---|---|---|---|---|
| **4×4 (hoy)** | **16** | **±0,136** | **±0,219** | **p̂ ∈ [0,31 ; 0,69]** |
| 6×6 | 36 | ±0,083 | ±0,154 | p̂ ∈ [0,36 ; 0,64] |
| 8×8 | 64 | ±0,063 | ±0,118 | p̂ ∈ [0,38 ; 0,62] |
| 10×10 | 100 | ±0,049 | ±0,096 | p̂ ∈ [0,40 ; 0,60] |
| 12×12 | 144 | ±0,041 | ±0,080 | p̂ ∈ [0,42 ; 0,58] |

Pasar de 4×4 a 8×8 cuesta **4 veces más peticiones** (16 → 64, unos 3 minutos por predio en vez de
45 segundos) y **reduce la zona indeterminada a la mitad**. Es la mejora con mejor relación
costo-beneficio de todo el sistema. Con 12×12, `meta-cacao-vigor-bajo` tendría respuesta.

### 3.6 Por qué el intervalo de Wilson es una cota INFERIOR de la incertidumbre real

Wilson supone 16 ensayos **independientes**. Las 16 celdas no lo son: son un mosaico contiguo, y
el uso agrícola está espacialmente correlacionado —un lote sembrado ocupa celdas vecinas—. Se
mide con un conteo de uniones (pares de celdas contiguas en rejilla rook que comparten clase):

| predio | k/16 | pares vecinos iguales | esperado si fueran independientes | exceso |
|---|---|---|---|---|
| `meta-cacao-sin-manejo` | 11/16 | 19/24 = 0,792 | 0,570 | **+0,222** |
| `meta-cacao-vigor-bajo` | 7/16 | 15/24 = 0,625 | 0,508 | **+0,117** |
| `meta-cacao` | 2/16 | 21/24 = 0,875 | 0,781 | +0,094 |
| `huila-cafe` | 15/16 | 22/24 = 0,917 | 0,883 | +0,034 |

**En los cuatro predios con celdas mixtas hay más concordancia entre vecinos que la que produciría
el azar.** Eso significa que el número efectivo de observaciones independientes es **menor que
16**, y por lo tanto **el intervalo verdadero es más ancho que el de Wilson**.

> El intervalo de Wilson se publica como **cota inferior de la incertidumbre del área**. Decirlo
> refuerza las conclusiones de 3.4 en la dirección conservadora: si con Wilson `meta-cacao-vigor-bajo`
> ya es indeterminado, con el efecto de diseño lo es más.
>
> `SUPUESTO A VERIFICAR:` no estimamos el efecto de diseño. Con n = 16 cualquier estimación de
> autocorrelación espacial (I de Moran y similares) es demasiado ruidosa para publicarse. Se
> vuelve estimable con la rejilla de 8×8 de 3.5.

### 3.7 Propagación al monto sugerido

`monto = solicitado × (área detectada / área declarada)` y esa fracción **es** p̂. El monto hereda
el intervalo entero:

| predio | solicitado | sugerido hoy | banda por incertidumbre de área |
|---|---|---|---|
| `huila-cafe` | $9.000.000 | $8.437.500 | $6.450.413 – $8.899.925 |
| `boyaca-papa` | $7.500.000 | $6.000.000 | $6.047.942 – $7.500.000 |
| `meta-cacao-sin-manejo` | $15.000.000 | $10.300.000 | $6.660.653 – $12.875.303 |
| `tolima-arroz` | $22.000.000 | $22.000.000 | $17.740.631 – $22.000.000 |

**El monto sugerido de `huila-cafe` tiene una banda de $2,45 millones de ancho** —el 27% del
monto— por la sola incertidumbre de la rejilla.

**Qué hacer con eso.** No usar el límite inferior: castigaría al productor por un límite de
nuestra medición, que es lo contrario de la promesa del producto. Se mantiene el punto estimado
como monto sugerido y **la banda se declara en el dictamen**, con el mismo criterio con que un
avalúo declara su rango. El comité decide si la banda le importa; lo que no puede es ignorarla
porque nadie se la mostró.

---

## 4. Sensibilidad de la decisión

Un dictamen robusto es el que no cambia con un empujón pequeño. Para cada umbral: cuánto tendría
que moverse para que **alguna de las nueve decisiones** cambiara.

### 4.1 Tabla maestra

| # | Umbral | Valor hoy | Margen a la baja | Margen al alza | Qué decisión cambia primero | Robustez |
|---|---|---|---|---|---|---|
| 1 | Amplitud de celda agrícola (`medir_area`) | 0,120 | **−0,003 (−2,5%)** | +0,054 (+45%) | a la baja, `meta-cacao-vigor-bajo`: 7/16 → 8/16, se desactiva la causal 2 | **MUY FRÁGIL** |
| 2 | Cobertura mínima en 24 meses | 12 meses | **−1 mes** | +5 meses | `boyaca-papa-nubes`: aplazar → **rechazar** | **FRÁGIL** |
| 3 | Área detectada mínima | 50% | **−6,25 pp** | +18,75 pp | `meta-cacao-vigor-bajo`: rechazar → no rechazado | **FRÁGIL** |
| 4 | Amplitud mínima del detector (`contar_ciclos`) | 0,120 | −0,013 (−10,8%) | **+0,003 (+2,5%)** | `huila-cafe`: 9 ciclos → 0 ciclos (evidencia y puntaje, no causal) | FRÁGIL en narrativa |
| 5 | Pérdida de amplitud en perennes | 40% | **sin límite** | **sin límite** | **ninguna** | INERTE |
| 6 | Constante `VIGOR_REFERENCIA` | 0,72 | −∞ | **+11,4%** | `meta-cacao-sin-manejo`: aprobar con ajuste → **rechazar** | **FRÁGIL Y SIN FUENTE** |
| 7 | Convenio de desempate de `suavizar` | «valor superior» | — | — | `meta-cacao`: 0 ciclos → 8 ciclos; `huila-cafe`: 9 → 6 | **NO ES UN UMBRAL, Y ES LO MÁS FRÁGIL** |

### 4.2 Umbral de área (50%) — detalle

Fracciones observadas en los nueve predios: 0,125 · 0,4375 · 0,6875 · 0,9375 · 1,000.

- La más cercana **por debajo** es 0,4375 (`meta-cacao-vigor-bajo`): bajar el umbral a 43,75%
  desactiva su causal. **Margen: −6,25 pp.**
- La más cercana **por arriba** es 0,6875 (`meta-cacao-sin-manejo`): subir el umbral a 68,76%
  activa su causal. **Margen: +18,75 pp.**

> **El dato que ordena toda esta sección:** el margen de sensibilidad del umbral de área es de
> **6,25 puntos porcentuales**, y el semiancho del intervalo de muestreo de la misma cantidad es
> de **±21,9 puntos** (§3.3, fila 7/16). **La decisión se toma dentro del ruido, con un margen
> 3,5 veces menor que la incertidumbre de la medición que la sustenta.** Esta es la justificación
> cuantitativa de la recomendación de 3.4.

### 4.2-bis El umbral de celda agrícola (0,12) — el margen más estrecho del sistema

`medir_area.py` cuenta una celda como agrícola si su mediana de NDVI es ≥ 0,30 **y** su amplitud
observada es ≥ 0,12. Barriendo ese segundo umbral sobre las nueve rejillas reales:

| umbral de amplitud de celda | k/16 de `meta-cacao-vigor-bajo` | k/16 de `huila-cafe` | predios con k < 8 |
|---|---|---|---|
| **0,117 (−2,5%)** | **8** | 15 | `meta-cacao` |
| **0,120 (hoy)** | **7** | 15 | `meta-cacao`, `meta-cacao-vigor-bajo` |
| 0,150 (+25%) | 2 | 15 | los mismos dos |
| 0,173 (+44%) | 0 | 8 | los mismos dos |
| **0,174 (+45%)** | 0 | **7** | + `huila-cafe` |

Las amplitudes de las nueve celdas no agrícolas de `meta-cacao-vigor-bajo` son 0,117 · 0,111 ·
0,109 · 0,109 · 0,106 · 0,101 · … **La celda que decide su rechazo mide 0,117 contra un umbral de
0,120: tres milésimas.** Bajar el umbral esas tres milésimas lo lleva a 8/16 = 50% y desactiva la
causal 2.

En el otro sentido el sistema aguanta mucho más: hace falta subir el umbral un 45% —hasta
0,174— para que cambie otra decisión (`huila-cafe` cae a 7/16). La asimetría es total: **−2,5% a
la baja, +45% al alza.**

Y el umbral 0,12 no tiene fuente propia. `medir_area.py` lo justifica diciendo que es «el mismo
piso que usa `contar_ciclos()`», y `contar_ciclos()` lo usa como constante sin justificación
citada. Es un umbral heredado de sí mismo.

### 4.3 Umbral de cobertura (12 meses) — detalle

Cobertura de 24 meses por predio: 11 · 16 · 16 · 18 · 18 · 20 · 21 · 21 · 22.

- **Un solo mes menos** en el umbral (12 → 11) saca a `boyaca-papa-nubes` del aplazamiento y lo
  manda a **rechazo automático** (es transitorio con `ciclos_ultimos_24m = 0`). Un mes de nube
  separa «aplazar y visitar» de «negar el crédito».
- Al alza hace falta llegar a 17 para que entren tres predios más en aplazamiento
  (`tolima-arroz` y `boyaca-papa-media` con 16, y no más).

El margen a la baja es de **un mes**, pero a diferencia de los otros casos **este umbral sí tiene
sustento cuantitativo** (§2.6) y el margen apunta en la dirección segura: la regla protege al
productor. Es frágil, pero es frágil hacia el lado correcto.

### 4.4 La causal perenne está inerte

La causal de rechazo en cultivos perennes exige **las dos** condiciones. Estado real de los cinco
perennes del demo:

| predio | pérdida de amplitud | ¿≥ 40%? | rendimiento estimado | EVA municipal | ¿rinde por debajo? | ¿causal? |
|---|---|---|---|---|---|---|
| `huila-cafe` | 27,6% | no | 1,23 | 1,14 | **no** | no |
| `meta-cacao` | 14,0% | no | 0,73 | 0,60 | **no** | no |
| `meta-cacao-productivo` | 5,7% | no | 0,63 | 0,60 | **no** | no |
| `meta-cacao-sin-manejo` | **64,5%** | **sí** | 0,67 | 0,60 | **no** | no |
| `meta-cacao-vigor-bajo` | 33,1% | no | 0,71 | 0,60 | **no** | no |

**Ninguno de los cinco cumple la segunda condición: los cinco rinden por encima de su municipio
según EVA.** Por lo tanto **mover el umbral del 40% a cualquier valor entre 0 y 100 no cambia
ninguna de las nueve decisiones.** La causal existe en el documento y en el prompt, pero en los
datos actuales **no puede activarse**: la condición que manda es la comparación de rendimiento, no
la de amplitud.

Esto no es necesariamente un defecto —exigir las dos condiciones fue una decisión deliberada para
proteger al cafetal en renovación por zoca—, pero **hay que decirlo**: hoy no tenemos ningún caso
que demuestre que la causal perenne funciona. Es una regla sin evidencia de ejecución.

### 4.5 La constante que sí muerde: `VIGOR_REFERENCIA = 0,72`

La segunda condición depende de `rendimiento_estimado_t_ha`, que sale de:

```
rendimiento_estimado = rendimiento_municipal_EVA × (vigor_del_predio / VIGOR_REFERENCIA)
```

con `VIGOR_REFERENCIA = 0.72` escrita como literal en `ingesta_sentinel.py` **sin fuente citada**.
Álgebra elemental: la condición `rendimiento_estimado < EVA` equivale a `VIGOR_REFERENCIA > vigor`.

| predio perenne | vigor medido | `VIGOR_REFERENCIA` que activa la 2ª condición | movimiento desde 0,72 | ¿pérdida ≥ 40%? | ¿se activa la causal? |
|---|---|---|---|---|---|
| `meta-cacao-productivo` | 0,7540 | > 0,7540 | **+4,7%** | no (5,7%) | no |
| `huila-cafe` | 0,7741 | > 0,7741 | +7,5% | no (27,6%) | no |
| **`meta-cacao-sin-manejo`** | **0,8021** | **> 0,8021** | **+11,4%** | **sí (64,5%)** | **SÍ — rechazo** |
| `meta-cacao-vigor-bajo` | 0,8536 | > 0,8536 | +18,6% | no (33,1%) | no |
| `meta-cacao` | 0,8759 | > 0,8759 | +21,7% | no (14,0%) | no |

**Un movimiento del 11,4% en una constante sin fuente convierte una aprobación en un rechazo.**
`meta-cacao-sin-manejo` pasa de `aprobar_con_ajuste` con $10.300.000 a rechazo con $0.

Y 0,72 no es un valor que se pueda defender: es un NDVI de referencia que no corresponde a ninguna
publicación citada en el repositorio. **El insumo más frágil de la causal perenne no es ninguno de
sus dos umbrales declarados: es una constante escondida en el denominador.**

> `SUPUESTO A VERIFICAR — prioridad máxima:` `VIGOR_REFERENCIA = 0,72` no tiene fuente. Bajo la
> regla del proyecto debería ir marcada como supuesto en el dictamen o sustituirse por una
> referencia derivada del propio dato —por ejemplo, el percentil de vigor de las parcelas del
> mismo cultivo y municipio—, que es una cantidad medible. Mientras no se resuelva, **todo
> `rendimiento_estimado_t_ha` del sistema es una estimación anclada a un número sin fuente**, y
> el README no puede afirmar que no hay una tercera categoría entre «oficial» y «medido por
> nosotros».

### 4.6 Lo más frágil del sistema no es un umbral: es un desempate

`suavizar()` toma la mediana de la ventana de 3 meses como `trozo[len(trozo)//2]` sobre la lista
ordenada. Cuando la ventana tiene **dos** valores válidos —lo que ocurre en los bordes de la serie
y **en toda posición adyacente a un hueco de nubes**— `len(trozo)//2 = 1` devuelve el **mayor** de
los dos. No es la mediana de dos valores: es el máximo. Y no fue una decisión, es una consecuencia
de la indexación.

`boyaca-papa` tiene 8 huecos de un mes rodeados de meses medidos en su ventana histórica;
`huila-cafe` tiene 13. Más todas las posiciones vecinas a huecos largos.

Efecto de cambiar solo ese desempate, sin tocar nada más:

| predio | amplitud histórica: superior (hoy) / inferior / promedio | ciclos en 108 m: sup / inf / prom | pérdida: sup / prom |
|---|---|---|---|
| `meta-cacao` | **0,107** / 0,330 / 0,253 | **0** / 5 / **8** | 14,0% / **64,8%** |
| `huila-cafe` | **0,123** / 0,198 / 0,137 | **9** / 6 / 6 | 27,6% / **46,0%** |
| `meta-cacao-vigor-bajo` | 0,133 / 0,227 / 0,173 | 7 / 7 / 8 | 33,1% / **0,0%** |
| `meta-cacao-productivo` | 0,421 / 0,551 / 0,481 | 11 / 6 / 8 | 5,7% / 25,6% |
| `boyaca-papa-nubes` | 0,335 / 0,467 / 0,334 | 7 / 6 / 7 | 65,1% / 38,0% |
| `boyaca-papa` | 0,341 / 0,296 / 0,305 | 8 / 7 / 8 | 39,0% / 33,4% |
| `tolima-arroz` | 0,756 / 0,773 / 0,733 | 14 / 14 / 15 | 1,3% / 2,6% |

**`meta-cacao` pasa de 0 ciclos a 8 ciclos y de 14,0% a 64,8% de pérdida** según cómo se rompa un
empate entre dos números. Esa es una variación **mayor que la de cualquier umbral de la tabla 4.1**.

**Lo que salva al sistema, y hay que verificarlo antes de cantar victoria:** ninguna de las nueve
decisiones cambia. Se comprobó explícitamente sobre `ciclos_ultimos_24m`, que es la métrica que
dispara la causal transitoria: bajo los tres convenios, los cuatro transitorios mantienen su
recuento (3, 1, 1 y —en `boyaca-papa-nubes`— 0/2/1, que es irrelevante porque está aplazado por
cobertura). Y la causal perenne está inerte por 4.4. **Las decisiones aguantan; las evidencias
citadas en el dictamen, no.**

Y hay un detalle que cierra el círculo con la sección 2: **`boyaca-papa-nubes`, con 11 meses
medidos, cuenta 0 ciclos con el convenio actual y 2 con el convenio inferior.** Si el umbral de
cobertura fuera 11 en vez de 12, ese predio se rechazaría o se aprobaría **según un criterio de
desempate del filtro de mediana**. La regla de los 12 meses no solo tiene el sustento
probabilístico de §2.6: además es lo único que impide que una decisión de crédito se apoye en un
detalle de indexación.

**Recomendación.** Hacer explícito el caso par en `suavizar()` —promedio de los dos valores
centrales, que es la definición estándar de mediana— y **volver a correr la ingesta**. No porque
el convenio actual esté mal, sino porque un estimador cuyo valor triplica según una convención no
declarada no cumple la regla de la casa. Y publicar en el contrato de datos cuál se usó.

### 4.7 Resumen ejecutivo de la sensibilidad

De los siete parámetros examinados:

- **Uno tiene sustento cuantitativo**: la cobertura de 12 meses (§2.6). Es el único.
- **Tres son frágiles y decisivos**: el umbral de amplitud de celda (0,12), cuyo margen a la baja
  es de tres milésimas y decide un rechazo; el umbral de área del 50%, cuyo margen (6,25 pp) es
  3,5 veces menor que la incertidumbre de su propia medición (±21,9 pp); y `VIGOR_REFERENCIA`,
  que mueve una decisión con un +11,4% y no tiene fuente.
- **Uno está inerte**: la pérdida de amplitud del 40% en perennes, que no puede activarse con
  ninguno de los datos actuales.
- **Uno es frágil solo en el relato**: el piso de amplitud de 0,12, del que depende que el predio
  insignia diga «9 ciclos» o «0 ciclos», con probabilidad 0,32–0,47 de caer del otro lado.
- **Uno no es un parámetro y es el más frágil de todos**: el desempate del filtro de mediana.
- **Ninguna de las nueve decisiones cambia** ante los movimientos de 4.6, y solo una cambia si se
  adopta la recomendación de 3.4.

---

## 5. Lo que NO se puede afirmar

Esta sección vale más que las cuatro anteriores, porque es la que un evaluador de riesgo va a
buscar primero.

### 5.1 Probabilidad de incumplimiento (PD): no existe y no se puede estimar

**SEEDLLITE no puede emitir una probabilidad de incumplimiento, y no debe insinuarla.**

Una PD se calibra observando desempeño: se otorgan créditos, se espera al horizonte de la
obligación, se cuentan los que entraron en mora según la definición de incumplimiento aplicable,
y se ajusta un modelo sobre esa observación. **SEEDLLITE no ha originado un solo crédito.** No hay
cero eventos de incumplimiento: hay cero eventos, punto. Con cero observaciones no existe
estimador de PD, ni frecuentista ni bayesiano sin un prior que sería puro invento.

**Consecuencia directa sobre el puntaje 0-1000.** El puntaje **no es** una probabilidad, ni una
transformación monótona de una probabilidad, ni comparable con un score de buró. Es una
**ordenación de evidencia** producida por un modelo de lenguaje contra la rúbrica de
`criterios-de-credito.md` §3. Que `tolima-arroz` saque 850 y `boyaca-papa` 750 significa que el
primero tiene mejor evidencia satelital, **no** que su probabilidad de incumplimiento sea
proporcionalmente menor.

> **Redacción obligatoria:** *«El puntaje SEEDLLITE ordena la evidencia productiva verificable del
> predio. No es una probabilidad de incumplimiento ni un score de comportamiento crediticio. La
> estimación de PD, la calificación de cartera y la constitución de provisiones corresponden al
> intermediario conforme a su SARC.»*
>
> Esto además es coherente con el mapeo normativo de `criterios-de-credito.md` §2: SEEDLLITE cubre
> 3 de los 5 criterios del SARC. Los dos que no cubre —historial en centrales de riesgo y
> reestructuraciones— son justamente los que más pesan en una PD.

### 5.2 Tampoco se puede afirmar

| Afirmación | Por qué no |
|---|---|
| **LGD, EAD o pérdida esperada** | Se derivan de PD y del comportamiento de las garantías. Sin PD, no hay ninguna de las tres. |
| **Poder discriminante del modelo (AUC, KS, Gini)** | Requiere etiquetas de resultado. No hay ninguna. No existe ni el conjunto de validación. |
| **Que el puntaje esté calibrado** | Nunca se contrastó contra un resultado observado. No hay curva de calibración posible. |
| **Que la caída de NDVI en El Niño 2023-24 fue causada por El Niño** | Es coincidencia temporal en una ventana definida a priori. Una caída puede ser plaga, cambio de cultivo o manejo. `criterios-de-credito.md` §8 ya lo declara como correlación, no causalidad; la estadística no lo mejora. |
| **Que `rendimiento_estimado_t_ha` mide producción** | Es una reescala del rendimiento municipal de EVA por un cociente de vigor, anclada además a `VIGOR_REFERENCIA = 0,72`, constante sin fuente (§4.5). Es un **índice relativo**, no una medición de toneladas. Nunca se ha contrastado contra una producción reportada de estas parcelas. |
| **Causal 3: «cultivo detectado no corresponde al declarado»** | **No hay clasificador de cultivos en el sistema.** La causal está enunciada en `criterios-de-credito.md` §5 pero **ninguna función la puede evaluar**. Su tasa de acierto no es baja: es indefinida. Debe declararse como no implementada. |
| **Que 9 predios permitan estimar tasas de error del sistema** | Nueve casos, de los cuales cinco son variantes construidas de dos parcelas base. Cualquier «tasa de acierto» sobre esta muestra es descriptiva de estos nueve, no del método. |
| **Que los intervalos de §1 cubran la incertidumbre total** | Cubren el muestreo de los meses observados. No cubren el sesgo de nubosidad estacional (§1.9), ni el error de georreferenciación del polígono, ni la mezcla espectral dentro del píxel de 10 m. |
| **Que el intervalo de Wilson cubra la incertidumbre del área** | Es cota inferior: las 16 celdas están espacialmente correlacionadas (§3.6). |

### 5.3 Lo que sí se puede afirmar

Para que la sección no se lea como una retirada, el inventario positivo:

1. **La serie de NDVI es una medición**, hecha por un tercero (ESA), con fecha cierta, anterior a
   la solicitud, imposible de fabricar por el solicitante y **reproducible por el banco**
   corriendo el mismo script contra Copernicus.
2. **La cobertura está declarada mes a mes**, y todo agregado se calcula solo sobre meses medidos.
3. **Los agregados publicados se reproducen exactamente** desde el archivo commiteado: los nueve
   valores de `amplitud_historica`, `amplitud_reciente_24m` y `ciclos_detectados` se recalcularon
   como verificación previa a este documento y **coinciden en las tres cifras decimales**.
4. **Cada estimación tiene ahora un intervalo**, y cada umbral un margen medido.
5. **La probabilidad de falso negativo del detector de ciclos está cuantificada** en función de la
   cobertura (§2), que es exactamente el tipo de cosa que un modelo de scoring tradicional no
   puede decir de sí mismo.

> El argumento no es «nuestro modelo predice el incumplimiento mejor que un balance». Es: **«el
> balance de 90 días que hoy se exige no existe para este productor, y lo que ofrecemos en su
> lugar es una medición verificable, con su incertidumbre declarada, sobre la que el comité decide
> con su propio SARC.»** Un modelo que declara que no puede estimar una PD es más creíble, ante un
> comité de riesgo, que uno que la inventa.

---

## 6. Implementación

Encargo para el frente MOTOR. Todo en biblioteca estándar de Python 3.9, sin dependencias nuevas
—coherente con el resto de `scripts/`.

### 6.1 Archivo nuevo: `scripts/incertidumbre.py`

```python
# --- Núcleo compartido -------------------------------------------------------

def muestra_efectiva(valores):
    """valores: lista con None en meses interpolados (como la que ya arma la ingesta).
    Devuelve (pool, n_ef, n_medidos):
      pool      list[float]  serie suavizada sin None — es el soporte del estimador
      n_ef      int          len(pool)  (mayor que n_medidos: ver §0.2)
      n_medidos int          meses con observación real en la ventana
    """

def percentil_indice(orden, p):
    """orden[int(len(orden) * p)] — replica EXACTAMENTE el convenio de
    ingesta_sentinel.amplitud(). No interpola. No cambiar sin re-correr la ingesta."""

# --- §1 Bootstrap ------------------------------------------------------------

def bootstrap_amplitud(valores, B=5000, semilla=20260816, bloque=None):
    """Intervalo de confianza al 95% de la amplitud p90-p10.

    valores : list[float|None]  ventana enmascarada
    B       : int               réplicas (5000 justificado en §1.3)
    semilla : int               fija; entra al contrato de datos
    bloque  : int|None          None -> bootstrap i.i.d. (réplica de tamaño n_medidos)
                                int  -> bootstrap de bloque móvil de esa longitud
                                        (12 para la ventana histórica, 6 para 24 meses)

    ->  {"punto": 0.341, "ic95": [0.257, 0.389], "metodo": "bloque_movil",
         "bloque_meses": 12, "replicas": 5000, "semilla": 20260816,
         "n_medidos": 68, "n_efectivo": 82,
         "p_bajo_piso_012": 0.000}
    """

def bootstrap_perdida_amplitud(puntos, corte="2024-01", B=5000, semilla=20260816, bloque=None):
    """Bootstrap conjunto de las dos ventanas; recalcula el cociente en cada réplica.
    puntos: la lista `puntos` de series_ndvi.json para un predio.
    ->  {"punto": 39.0, "ic95": [6.7, 59.5], "p_sobre_umbral_40": 0.299, ...}
    """

# --- §2 Cobertura y falso negativo -------------------------------------------

def p_fallo_patron(etiquetas, m):
    """Probabilidad exacta (DP de §2.3) de no observar ninguna 'A' seguida de una 'B'.
    etiquetas: str de longitud n sobre el alfabeto {'A','B','-'}
    m        : int, meses observados
    -> float
    """

def curva_falso_negativo(n=24, escenarios=None):
    """-> [{"m": 12, "p_falso_negativo": 0.104, "por_escenario": {...}}, ...]
    escenarios por defecto: los cinco de §2.3, calibrados con las rachas medidas."""

def prob_falso_negativo(cobertura_medidos, ventana=24, factor_agrupamiento=1.6):
    """Consulta a la curva, con la corrección por nubes agrupadas de §2.5.
    Es la función que el dictamen usa para declarar su propia confianza.
    factor_agrupamiento: 1.6 medido en §2.5.  SUPUESTO: re-medir con más predios.
    -> float
    """

# --- §3 Área -----------------------------------------------------------------

def wilson(k, n, z=1.959963985):
    """Intervalo score de Wilson. -> (lo, hi)"""

def clopper_pearson(k, n, alpha=0.05):
    """Intervalo exacto, para el contraste conservador de §3.2. -> (lo, hi)"""

def intervalo_area(medicion_area):
    """medicion_area: el dict que ya escribe medir_area.py en predios.json.
    ->  {"fraccion": 0.4375, "ic95_wilson": [0.231, 0.668],
         "ic95_clopper": [0.198, 0.701],
         "concluyente_50": False,       # el IC no cruza 0,50
         "sentido": "indeterminado",    # "sobre_umbral" | "bajo_umbral" | "indeterminado"
         "concordancia_vecinos": 0.625, # conteo de uniones rook, §3.6
         "concordancia_esperada": 0.508,
         "nota": "cota inferior: las celdas están espacialmente correlacionadas"}
    """

def banda_monto(monto_solicitado, medicion_area):
    """-> {"punto": 8437500, "ic95": [6450413, 8899925]}  (§3.7)"""

# --- §4 Sensibilidad ---------------------------------------------------------

def margen_umbral(nombre_umbral, valores_observados, valor_actual):
    """-> {"umbral": "area_minima", "actual": 0.50,
           "margen_baja": -0.0625, "margen_alza": 0.1875,
           "predio_critico": "meta-cacao-vigor-bajo",
           "decision_que_cambia": "rechazar -> no rechazado"}"""

def tabla_sensibilidad(predios, series, dictamenes):
    """Regenera la tabla 4.1 completa desde los datos. Salida a
    output/sensibilidad-<fecha>.md — es un entregable auditable, no un print."""
```

### 6.2 Cambios en `scripts/ingesta_sentinel.py`

1. **Hacer explícito el caso par de `suavizar()`** (§4.6). Añadir el parámetro
   `desempate="promedio"` con los valores `"superior"` (comportamiento actual, para reproducir la
   ingesta commiteada) / `"promedio"` (definición estándar). **Volver a correr la ingesta y
   registrar el cambio en el contrato de datos.** No hacerlo silenciosamente: `amplitud_historica`
   de `meta-cacao` pasa de 0,107 a 0,253.
2. Llamar a `bootstrap_amplitud` y `bootstrap_perdida_amplitud` al construir cada entrada de
   `series[pid]` y escribir el bloque `incertidumbre` de 6.4.
3. **Marcar `VIGOR_REFERENCIA` como supuesto sin fuente** hasta que se resuelva (§4.5), y
   propagarlo al dictamen como tal.

### 6.3 Cambios en `scripts/medir_area.py`

1. Llamar a `intervalo_area()` y escribir el resultado dentro de `medicion_area`.
2. Cambiar el aviso de consola: hoy imprime «CAUSAL 2» cuando `fraccion < 0.50`. Debe distinguir
   los tres estados —**causal sostenible** (`hi < 0,50`), **zona indeterminada**
   (`lo < 0,50 < hi`), **sin causal** (`lo ≥ 0,50`)— porque son tres decisiones distintas (§3.4).
3. Elevar `REJILLA` de 4 a 8 si el presupuesto de peticiones lo permite (§3.5): 64 celdas por
   predio, ~3 minutos por predio. Es la mejora de mayor rendimiento del sistema.

### 6.4 Contrato de datos — campos nuevos

Adición a `data/CONTRATO-DATOS.md`. **No rompe nada:** todos los campos son nuevos y opcionales
para la APP, que puede ignorarlos.

En `series_ndvi.json`, dentro de cada `series[pid]`:

```jsonc
"incertidumbre": {
  "metodo": "bootstrap percentil, bloque móvil",
  "replicas": 5000,
  "semilla": 20260816,
  "bloque_meses_historico": 12,
  "bloque_meses_reciente": 6,
  "desempate_suavizado": "superior",          // "superior" | "promedio" | "inferior"
  "n_medidos_historico": 68,
  "n_efectivo_historico": 82,
  "amplitud_historica_ic95":     [0.257, 0.389],
  "amplitud_reciente_24m_ic95":  [0.090, 0.252],
  "perdida_amplitud_pct_ic95":   [6.7, 59.5],
  "p_amplitud_bajo_piso_012": 0.000,
  "p_perdida_sobre_40": 0.299,
  "prob_falso_negativo_ciclo": 0.053,          // según cobertura_24m_medidos, §2.5
  "nota": "Incertidumbre por muestreo de los meses observados. NO incluye el sesgo de nubosidad estacional (docs/metodo-estadistico.md §1.9)."
}
```

En `predios.json`, dentro de `medicion_area`:

```jsonc
"fraccion_ic95_wilson":  [0.231, 0.668],
"fraccion_ic95_clopper": [0.198, 0.701],
"causal_area_concluyente": false,
"sentido_causal_area": "indeterminado",       // "bajo_umbral" | "sobre_umbral" | "indeterminado"
"concordancia_vecinos": 0.625,
"concordancia_esperada_independencia": 0.508
```

En `dictamenes.json`, dentro de cada dictamen:

```jsonc
"incertidumbre_declarada": {
  "amplitud_historica": "0,341 (IC95 0,257–0,389)",
  "perdida_amplitud_pct": "39,0% (IC95 6,7–59,5)",
  "fraccion_area": "1,000 (IC95 0,806–1,000)",
  "prob_falso_negativo_ciclo": 0.033,
  "monto_banda_cop": [6047942, 7500000],
  "limitaciones": [
    "El puntaje no es una probabilidad de incumplimiento. SEEDLLITE no dispone de créditos desembolsados y no puede calibrar una PD.",
    "La causal 3 (cultivo detectado distinto del declarado) no está implementada."
  ]
}
```

### 6.5 Reglas nuevas para `scripts/probar_reglas.py`

```python
def regla_causal_area_concluyente(pid, predio, serie, d):
    """Un rechazo por causal 2 exige que el límite SUPERIOR de Wilson al 95%
    esté por debajo de 0,50. En zona indeterminada (5 <= k <= 11 con n=16) la
    decisión debe ser 'aplazar_por_verificacion', nunca 'rechazar'.
    docs/metodo-estadistico.md §3.4.
    Al activarla, `meta-cacao-vigor-bajo` deja de cumplir: pasa de rechazar a aplazar."""

def regla_toda_cifra_con_intervalo(pid, predio, serie, d):
    """Toda evidencia del dictamen que cite amplitud, pérdida de amplitud o
    fracción de área debe traer su intervalo. §0."""

def regla_no_afirmar_probabilidad_de_incumplimiento(pid, predio, serie, d):
    """El memorando y la recomendación no pueden contener 'probabilidad de
    incumplimiento', 'PD', 'default', 'mora esperada' ni 'pérdida esperada'
    aplicados al productor. §5.1."""

def regla_confianza_declarada_si_cobertura_baja(pid, predio, serie, d):
    """Si cobertura_24m_medidos < 15, el dictamen debe declarar la probabilidad
    de falso negativo del detector de ciclos. §2.6, franja de cautela 12-15."""
```

### 6.6 Ampliación de `scripts/validar_contrato.py`

- Todo `*_ic95` es una lista de dos números con `ic95[0] <= punto <= ic95[1]`.
- Toda probabilidad publicada está en [0, 1].
- `semilla` y `replicas` presentes en todo bloque `incertidumbre` (sin ellos el resultado no es
  reproducible y el dictamen no es auditable).
- `n_efectivo >= n_medidos` en toda ventana (invariante de §0.2; si se rompe, hay un error en el
  enmascarado).

### 6.7 Orden de ejecución sugerido

| # | Tarea | Impacto | Costo |
|---|---|---|---|
| 1 | `wilson()` + `intervalo_area()` + `regla_causal_area_concluyente` | Corrige el rechazo frágil de `meta-cacao-vigor-bajo` | bajo |
| 2 | `bootstrap_amplitud` y `bootstrap_perdida_amplitud` sobre los 9 predios | Todas las cifras del dictamen ganan intervalo | bajo |
| 3 | Declarar `VIGOR_REFERENCIA` como supuesto sin fuente | Cierra el único incumplimiento de la regla de la casa | trivial |
| 4 | `curva_falso_negativo` + declaración de confianza en el dictamen | Convierte la regla de 12 meses en un número defendible | medio |
| 5 | `desempate="promedio"` en `suavizar()` y re-correr la ingesta | Elimina la fragilidad mayor del sistema | medio (re-descarga) |
| 6 | Rejilla 8×8 en `medir_area.py` | Reduce a la mitad la zona indeterminada del área | alto (4× peticiones) |

---

## 7. Reproducibilidad

Todas las cifras de este documento salen de `data/series_ndvi.json` y `data/predios.json` tal como
están commiteados al 16-ago-2026, con la implementación de la sección 6 y `semilla = 20260816`.
Como verificación previa se recalcularon desde cero los nueve valores de `amplitud_historica`,
`amplitud_reciente_24m` y `ciclos_detectados` reproduciendo `suavizar`, `amplitud` y
`contar_ciclos`: **los 27 coinciden con los publicados en las tres cifras decimales.** Si alguno
dejara de coincidir tras un cambio en `ingesta_sentinel.py`, este documento queda invalidado y hay
que regenerarlo antes de usar cualquiera de sus intervalos.

| Sección | Qué la sustenta |
|---|---|
| §0, §1 | `data/series_ndvi.json`, campo `puntos` de los 9 predios; `ingesta_sentinel.suavizar/amplitud` |
| §2 | Ídem, más las 85 ventanas deslizantes de 24 meses de los 4 predios transitorios y el banco de máscaras de ausencia de los 9 |
| §3 | `data/predios.json`, campo `medicion_area.rejilla` de los 9 predios |
| §4 | Los tres archivos de datos más las constantes de `ingesta_sentinel.py` y `medir_area.py` |
| §5 | Ausencia de datos de desempeño crediticio: no hay archivo que citar, y ese es el punto |

**Supuestos declarados en este documento**, todos marcados en su lugar:

1. Duración del ciclo de papa de 4 a 6 meses (§2.2) — verificar contra Fedepapa o Agronet.
2. `VIGOR_REFERENCIA = 0,72` (§4.5) — sin fuente en el código. Prioridad máxima.
3. Factor de agrupamiento de nubes de 1,6 (§2.5) — medido sobre 9 predios; muestra pequeña.
4. Efecto de diseño de la rejilla no cuantificado (§3.6) — no estimable con n = 16.
5. Sesgo de nubosidad estacional no cuantificado (§1.9) — exigiría contraste con Sentinel-1.

---

*Versión 1 · 16-ago-2026 · frente MOTOR. Se lee junto con `docs/criterios-de-credito.md` §3 y §5
y con `data/CONTRATO-DATOS.md` §2.*
