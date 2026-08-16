# ESTRUCTURA DEL DICTAMEN: especificación de entregable de firma

> **Para el frente APP.** Esta es la especificación de cómo se arma en pantalla el dictamen que
> hoy vive en `data/dictamenes.json`. No trae código: trae jerarquía, orden, longitudes, fuente
> de cada dato y reglas de redacción.
>
> **No pide nada al frente MOTOR.** Todos los datos que se especifican aquí ya existen en
> `data/predios.json`, `data/series_ndvi.json` y `data/dictamenes.json`. Lo que falta es
> estructura de lectura, no información.
>
> Vara de calidad: [`docs/dictamen-modelo.md`](dictamen-modelo.md) · Criterio:
> [`docs/criterios-de-credito.md`](criterios-de-credito.md) · Contrato:
> [`data/CONTRATO-DATOS.md`](../data/CONTRATO-DATOS.md)
>
> *16-ago-2026.*

---

## 0. El diagnóstico: por qué el dictamen actual no se firma

El contenido del dictamen es correcto. El problema es de forma, y es un problema de decisión:
un comité de crédito no lee, **falla**. Y para fallar necesita dos cosas que el documento actual
no separa.

| Lo que el comité necesita | Cuánto tarda | Qué encuentra hoy |
|---|---|---|
| Saber qué se le está pidiendo aprobar | 5 segundos | Un puntaje suelto y un campo `decision` en snake_case |
| Poder sostener su voto ante otro miembro | 1 minuto | Un párrafo de 230 palabras con las cinco evidencias en orden de generación |
| Poder responderle a la auditoría en seis meses | 10 minutos | Nada: no hay serie, no hay rejilla, no hay metodología, no hay versión de modelo |

Las tres necesidades son reales y **se contradicen en el mismo espacio**: quien quiere el fallo
en cinco segundos no quiere ver la rejilla de medición, y quien audita no acepta que la rejilla
no exista. La solución no es un resumen ejecutivo pegado arriba. Es diseñar el documento en
**tres niveles de lectura**, con reglas duras sobre qué puede vivir en cada uno.

**El criterio de éxito de esta especificación:** un miembro del comité que nunca ha oído hablar
de NDVI debe poder votar en 30 segundos, y debe poder llegar del monto aprobado hasta la celda
de rejilla que lo determinó sin salir del documento.

---

## 1. Mapa de lectura: tres velocidades en un solo documento

### 1.1 Los tres niveles

| | **N1 · EL FALLO** | **N2 · LA SUSTENTACIÓN** | **N3 · EL EXPEDIENTE** |
|---|---|---|---|
| **Tiempo** | 5 segundos | 60 a 90 segundos | 10 minutos o más |
| **Quién lee** | El comité completo, votando | El miembro que sustenta o discrepa | Auditoría interna, SFC, revisoría |
| **Pregunta que responde** | ¿Qué apruebo y por cuánto? | ¿Por qué, y qué riesgo estoy asumiendo? | ¿De dónde salió cada número? |
| **Superficie** | Bloque superior, sin desplazar la página | Cuerpo del memorando, visible sin clic | Anexos A a F, plegados por defecto |
| **Presupuesto** | 5 datos, máximo 25 palabras | 350 a 450 palabras | Sin límite |
| **Interacción** | Ninguna. Está ahí | Ninguna. Está ahí | Se despliega, y en impresión sale entero |

### 1.2 Las cuatro reglas duras de la jerarquía

1. **Nada del N1 depende de un despliegue.** Si hay que hacer clic para saber si se aprueba, el
   documento falló. El N1 es lo que se ve al abrir, en la primera pantalla, sin desplazar.
2. **Nada del N3 es necesario para entender el N1.** El anexo sustenta; no completa. Un
   dictamen al que le falte el sentido sin abrir la rejilla está mal redactado en el cuerpo.
3. **El N2 no repite el N1, lo explica.** Prohibido volver a escribir el monto y la decisión en
   prosa después de haberlos puesto en el bloque de fallo. Repetir gasta el presupuesto de
   atención sin agregar criterio.
4. **La alerta sube de nivel, nunca baja.** Si hay una alerta, aparece en el N1 como conteo
   (`1 alerta que no bloquea`) y en el N2 con su cifra y su razón. No se esconde en el anexo,
   ni siquiera cuando el resultado es aprobar. Esta es la regla que separa un dictamen de un
   folleto.

### 1.3 Progressive disclosure: dónde vive cada cosa

| Siempre visible | Se despliega en el mismo documento | Va a anexo |
|---|---|---|
| Decisión, monto, puntaje, banda, conteo de alertas | El detalle de cada eje (qué mide y por qué esa nota) | La serie NDVI completa, 108 puntos |
| Identificación del solicitante y del predio | El texto completo de las 5 evidencias | La rejilla de medición, celda por celda |
| Las 3 razones del fallo, una línea cada una | La cobertura mes a mes por año | La metodología y los 5 límites declarados |
| La alerta con su cifra y por qué no bloquea | Las verificaciones de exclusión (RTDAF, RUPTA, ambiental) | El marco normativo con las citas completas |
| Condiciones de la operación (línea, FAG, plazo, tramos) | Lo que SEEDLLITE no evaluó | La trazabilidad del modelo y del dato |
| Memorando del analista y recomendación operativa | | El glosario mínimo |
| Descargo legal y bloque de firma | | |

**Mecánica bajo `file://`:** `<details>`/`<summary>` nativo, sin JavaScript. En `@media print`
todos los `<details>` se fuerzan abiertos y cada anexo empieza en página nueva. Un comité firma
papel: si el documento no imprime completo, no sirve.

### 1.4 La cadena de trazabilidad

Todo número que aparezca en el N1 tiene que poder recorrerse hacia abajo hasta el dato crudo,
**en el mismo documento y sin buscar**. El ejemplo canónico, que es el argumento más fuerte del
producto en `huila-cafe`:

```
$8.437.500                       N1 · bloque de fallo
   ↑ es 15/16 del solicitado
15 de 16 celdas con actividad    N2 · línea 3 de "por qué"
   ↑ la celda excluida es la de lat 1,882878 / lon -76,061578
NDVI mediana 0,71 · amplitud 0,104 (umbral 0,12)   Anexo B · rejilla
   ↑ medida por
scripts/medir_area.py sobre serie Sentinel-2 por celda    Anexo C · metodología
```

Se implementa como enlace ancla: la cifra del N1 lleva al párrafo del N2, y la cifra del N2
lleva a la fila del anexo. Sin modal, sin tooltip, sin `fetch`.

> **Por qué esta cadena es el producto y no un adorno.** El recorte de $562.500 no es criterio
> del analista: es una celda de rejilla de 0,15 ha que no pasó el umbral de amplitud. Un comité
> que puede ver esa celda deja de estar confiando en un modelo y pasa a estar leyendo una
> medición. Es exactamente lo que la Circular 100 llama *"información obtenida y documentada en
> el lugar donde se desarrolla la actividad económica"*.

---

## 2. Estructura del memorando, sección por sección

### 2.1 Tabla maestra

| # | Sección | Nivel | Longitud objetivo | De dónde sale |
|---|---|---|---|---|
| 0 | Encabezado de expediente | N1 | 1 línea | `predios[].id`, fecha de generación |
| 1 | **Bloque de fallo** | N1 | 5 datos, ≤ 25 palabras | `decision`, `monto_sugerido_cop`, `puntaje`, `banda_riesgo`, conteo de `evidencia[].tipo` |
| 2 | Identificación | N1 | 2 líneas | `predios[]`: productor, cultivo, variedad, vereda, municipio, departamento, área |
| 3 | **Las tres razones** | N2 | 3 líneas, ≤ 30 palabras c/u | `evidencia[]` tipo `favorable`, reordenadas |
| 4 | **La alerta que no bloquea** | N2 | 45 a 70 palabras | `evidencia[]` tipo `alerta` + umbral de `criterios-de-credito.md` |
| 5 | Condiciones de la operación | N1 | Tabla de 6 filas | `linea_finagro`, `cobertura_fag_pct`, `plazo_meses`, `desembolso`, montos |
| 6 | Habilitación normativa | N2 | 2 líneas + cita | Fijo: Circular Externa 100 de 1995, Cap. II lit. c |
| 7 | Los cuatro ejes | N2 | Tabla de 4 filas + barra | `ejes[]`: `eje`, `peso`, `puntaje` |
| 8 | Memorando del analista | N2 | 150 a 200 palabras | `memorando` |
| 9 | Verificaciones de exclusión | N2 | 3 líneas | `evidencia[]` con RTDAF/RUPTA y ambiental |
| 10 | Cobertura del dato y límites | N2 | 40 a 60 palabras | `cobertura_meses_medidos`, `cobertura_24m_medidos`, conteo por año |
| 11 | Lo que SEEDLLITE no evaluó | N2 | 4 viñetas | Fijo: `criterios-de-credito.md` §3 |
| 12 | **Recomendación operativa** | N1 | 40 a 60 palabras | `recomendacion` |
| 13 | Bloque de decisión del comité | N1 | Formulario en blanco | No sale de datos: es el objeto de firma |
| 14 | Descargo legal | N1 | 55 palabras, fijo | `criterios-de-credito.md` §10.6 |
| 15 | Pie de trazabilidad | N3 | 3 líneas | `modelo`, `pasarela`, versiones de los tres JSON |

### 2.2 Detalle de las secciones que hoy no existen o están mal ordenadas

#### §1 · Bloque de fallo

Es lo único que muchos van a leer. Contiene exactamente cinco datos y nada más:

```
[DECISIÓN EN VERSALES]
[monto sugerido] de [monto solicitado] solicitados
[puntaje]/1000 · riesgo [banda] · [n] alerta(s) que no bloquea(n)
```

**Reglas.**
- La decisión se escribe en español natural, nunca el valor crudo del campo: `aprobar_con_ajuste`
  se renderiza **APROBAR CON AJUSTE**. El campo es una llave, no una etiqueta.
- El monto solicitado va siempre al lado del sugerido, aunque sean iguales. Sin el contraste, el
  ajuste no se ve.
- El conteo de alertas es parte del fallo. Un comité tiene derecho a saber, antes de leer nada,
  que está aprobando con una advertencia encima.
- El color del estado nunca es la única señal: siempre hay una palabra. Un comité que imprime en
  blanco y negro tiene que poder votar.

#### §3 · Las tres razones

Hoy las cinco evidencias salen en el orden en que las generó el modelo. **Se reordenan por
función**, no por tipo:

1. **La razón económica**: rendimiento del predio contra el municipal oficial de EVA.
2. **La razón de resiliencia**: comportamiento en El Niño 2023-24 y nivel de vigor.
3. **La razón del monto**: por qué el número aprobado es ese y no el solicitado.

Cada una en una línea de máximo 30 palabras, con su cifra y su fuente entre paréntesis. Si el
modelo no produjo una de las tres, la línea se omite; no se rellena con prosa.

#### §4 · La alerta que no bloquea

**Es la sección que más credibilidad aporta y la que hoy no existe como sección.** Estructura
fija en tres movimientos:

1. **Qué se advierte**, con su cifra y su comparación contra sí mismo.
2. **Por qué no bloquea**, citando el umbral exacto que no se alcanzó.
3. **Qué la explica**, en términos del cultivo y del destino del crédito.

Nunca se escribe "sin embargo" ni "cabe destacar". Se escribe el umbral: *"el umbral de rechazo
del eje A para un perenne exige 40% y además rendimiento por debajo del municipal; no se cumple
ninguna de las dos"*. Un comité no necesita que lo tranquilicen: necesita la regla.

#### §6 · Habilitación normativa

Dos líneas fijas, arriba de los ejes, porque contestan la pregunta que un jurado y un auditor
hacen igual: *¿con qué derecho un satélite reemplaza un balance?*

> La Circular Externa 100 de 1995 de la Superintendencia Financiera, Capítulo II literal c,
> exige que para microcrédito la entidad cuente con una metodología *"cuyos elementos permitan
> compensar las deficiencias de información del deudor de acuerdo a su grado de informalidad"*,
> y admite que esa información *"podrá ser obtenida y documentada en el lugar donde se
> desarrolla la actividad económica del deudor"*. Los cuatro ejes de este dictamen son esa
> metodología, y el lote es ese lugar.

#### §7 · Los cuatro ejes

Cada fila lleva: nombre del eje, aporte obtenido, peso máximo, barra, y una línea plegable con
qué mide ese eje.

**La trampa que ya produjo un error:** `ejes[].puntaje` **es el aporte, no la nota sobre 100**.
Un eje con peso 40 y puntaje 33 se dibuja como 33 de 40, es decir 82,5% del riel. Dibujarlo
sobre 100 rompe la barra. La suma de los cuatro aportes por 10 tiene que dar exactamente el
`puntaje`: 33+18+23+13 = 87, por 10 = 870. **Si no cuadra, la pantalla no publica el dictamen.**

#### §10 · Cobertura del dato

Se dice siempre, aprobado o rechazado, con tres cifras: meses medidos sobre 108, meses medidos
en la ventana de decisión de 24, y los dos peores años con su conteo. Termina con la frase fija:
*"los meses interpolados quedan fuera de todos los indicadores"*.

Un dictamen que no dice cuánto vio no se puede auditar.

#### §13 · Bloque de decisión del comité

**El documento no es un informe, es un objeto de firma.** Al final va, en blanco:

```
[ ] Acoge la recomendación          [ ] Se aparta          [ ] Aplaza
Motivación (obligatoria si se aparta): ______________________________
Nombre · Cargo · Fecha · Firma
```

Que exista la casilla "Se aparta" con motivación obligatoria es lo que convierte el dictamen en
un insumo del SARC y no en un veredicto automatizado. El intermediario decide; SEEDLLITE aporta.

### 2.3 Reglas de cifra y formato, obligatorias

| Magnitud | Formato | Ejemplo |
|---|---|---|
| Pesos | Punto de miles, sin decimales, sin "COP" salvo en el encabezado | `$8.437.500` |
| Porcentaje | Coma decimal, un decimal; entero solo si el dato es entero | `27,6%` · `80%` |
| Hectáreas | Dos decimales siempre, aun cuando terminen en cero | `2,25 ha` · `1,60 ha` |
| NDVI | Dos decimales en prosa, tres solo en anexo | `0,79` en cuerpo · `0,837` en anexo A |
| Rendimiento | Dos decimales y unidad | `1,23 t/ha` |
| Fecha de serie | `AAAA-MM` en tabla, mes en letras en prosa | `2025-08` · `agosto de 2025` |
| Cobertura | Siempre como fracción y porcentaje | `75 de 108 (69%)` |

**Regla de coherencia de redondeo:** la misma magnitud se escribe con el mismo redondeo en todo
el documento. El área verificada de `huila-cafe` es **93,8%** en las quince apariciones, no 94%
en unas y 93,8% en otras. Un comité que ve dos cifras para la misma cosa deja de creer las dos.

**Prohibiciones de redacción.** Ningún adjetivo sin cifra. Nada de "excelente", "sólido",
"muy buen productor". Nada de hipoteca: el respaldo es el FAG. Nunca confundir la cobertura FAG
del 80% con el porcentaje desembolsado, que es el 100% de lo aprobado. Ninguna cifra que no sea
oficial o medida por nosotros: no hay una tercera categoría.

### 2.4 Aplicación del sistema Industry

| Elemento | Tratamiento |
|---|---|
| Bloque de fallo | Tarjeta transparente con borde de un pelo y marcas de registro `+` en las cuatro esquinas. Esquina recta |
| Estado | Palabra en versales, Barlow Condensed, en el color del estado. Nunca solo color |
| Barras de eje | Riel de un pelo, relleno sólido en acento. Sin degradado |
| Alerta | Franja con borde izquierdo en `#8a5f08`, fondo transparente |
| Cifras del cuerpo | Texto en `#416180` (5,78:1) cuando van en acento. El `#5980a6` solo en iconos, bordes y titulares |
| Botón "Firmar" o "Imprimir" | Único objeto sólido de la pantalla |
| Anexos | `<details>` con sumario en Barlow Condensed y regla superior de un pelo |

---

## 3. Anexos: lo que hoy no existe y sostiene la firma

Los seis anexos se construyen con datos **que ya están en el repositorio**. Ninguno requiere
volver a llamar al modelo ni a Copernicus.

### Anexo A · La serie completa

**Qué contiene:** los 108 puntos mensuales de `series_ndvi.json → series[id].puntos`, en tabla
de cuatro columnas: fecha, NDVI, nubosidad, origen (`medido` | `interpolado`).

**Forma:** tabla con desplazamiento vertical propio, agrupada por año, con un subtotal de meses
medidos por año. Las filas interpoladas van atenuadas y con la etiqueta textual `interpolado`,
nunca solo en gris: en impresión el gris desaparece.

**Por qué existe:** responde a la pregunta de auditoría *"¿cuántos de estos números son medición
y cuántos son relleno?"*. Sin este anexo, la frase "75 de 108 meses" es una afirmación
incomprobable dentro del propio documento.

### Anexo B · La rejilla de medición, celda por celda

**Qué contiene:** las 16 filas de `predios[].medicion_area.rejilla`: latitud, longitud, NDVI
mediana, amplitud, y el veredicto `agrícola` sí o no. Encabezado con el método
(`rejilla 4x4 sobre el polígono declarado`) y los dos umbrales (`ndvi_mediana ≥ 0,30` vegetada,
`amplitud ≥ 0,12` con dinámica de manejo).

**Forma:** tabla de 16 filas más una cuadrícula de 4×4 dibujada en SVG inline, con cada celda
sombreada según su veredicto. Las celdas excluidas llevan trama diagonal, no color rojo.

**Por qué existe:** es **el anexo que gana el argumento**. En `huila-cafe` la celda excluida
tiene NDVI mediana 0,71, que es alto, y amplitud 0,104, por debajo del umbral de 0,12. Es la
tesis del producto a escala de 0,15 ha: sobra verde y falta manejo. Y es la misma lógica que en
`meta-cacao` rechaza 3,5 de 4,0 ha. Un comité que ve esta tabla entiende el modelo entero.

**Cierre obligatorio del anexo:** la frase de `predios.json → nota_area`, textual: la medición
*"es una estimación de proporción, no una delimitación de linderos"*.

### Anexo C · Metodología y límites declarados

**Qué contiene:** los cinco estudios satelitales de `criterios-de-credito.md` §8 con su insumo,
método, salida y límite; y la lista de lo que SEEDLLITE no puede ver, textual: no identifica
variedad, no ve bajo nube densa, no acredita propiedad ni tenencia, no detecta arrendamiento ni
aparcería, no sustituye la visita técnica cuando el intermediario la exija.

**Por qué existe:** declarar el límite es lo que hace creíble el resto. Un modelo que promete
verlo todo pierde en la primera pregunta del jurado.

### Anexo D · Marco normativo y descargo

**Qué contiene:** las citas completas, cada una con su norma y su enlace, de: Circular Externa
100 de 1995 Cap. II lit. c (SARC y microcrédito), Resolución 08 de 2023 CNCA (destino del
crédito), Ley 1448 de 2011 (RTDAF, control anti despojo), Ley 387 de 1997 (RUPTA), Ley 1930 de
2018 (páramos), Ley 2 de 1959 (reserva forestal), Manual de Servicios FINAGRO v.26.21 (FAG,
líneas, topes), Decreto 1469 de 2025 (SMMLV 2026 de $1.750.905), EVA de UPRA y MinAgricultura
(rendimiento municipal).

**Por qué existe:** cada afirmación normativa del cuerpo tiene que poder verificarse sin salir
del documento. Y porque este anexo es, literalmente, el argumento diferencial del proyecto.

### Anexo E · Trazabilidad del modelo y del dato

**Qué contiene:**

| Campo | Valor | Fuente |
|---|---|---|
| Modelo | `anthropic/claude-opus-5` | `dictamenes.json → modelo` |
| Pasarela | OpenRouter | `dictamenes.json → pasarela` |
| Forma de salida | Structured outputs con `strict: true` contra el esquema del contrato | `scripts/generar_dictamen.py` |
| Presupuesto de tokens | 16.000 | `scripts/generar_dictamen.py` |
| Prompt | Íntegro y legible en `scripts/generar_dictamen.py` | El propio repositorio |
| Guarda de coherencia | `incoherencias()` rechaza y reintenta si el aporte de un eje excede su peso | `scripts/generar_dictamen.py` |
| Datos de entrada | `predios.json` v1.0 · `series_ndvi.json` v2.0 · Copernicus Sentinel-2 L2A | Los tres JSON |
| Atribución | *"Contains modified Copernicus Sentinel data 2017-2025"* | `series_ndvi.json → atribucion` |
| Costo de la corrida | US$1,58 por los nueve dictámenes | Corrida del 15-ago-2026 |

**Por qué existe:** porque la pregunta *"¿esto lo escribió una IA?"* se responde mejor con la
versión, la pasarela, el esquema y el costo, que con un descargo. Y porque un dictamen sin
versión de modelo no es reproducible, y lo que no es reproducible no es auditable.

**Lo que este anexo declara y no puede ocultar:** el dictamen es salida de un modelo de lenguaje
sobre indicadores calculados por `scripts/`. La estructura del JSON está garantizada por el
esquema; **el criterio del texto no está garantizado por nada distinto de la lista de
verificación de la sección 6.**

### Anexo F · Glosario mínimo

Seis entradas, dos líneas cada una: NDVI, amplitud de la serie, ciclo de cosecha, SMMLV, FAG,
EVA. Va al final y se enlaza desde la primera aparición de cada término en el cuerpo.

**Por qué existe:** el comité de crédito de un banco agrario no es un comité de teledetección.
Que el documento no exija conocimiento previo es legal design, no cortesía.

---

## 4. Los cuatro estados

### 4.1 Qué cambia en cada uno

| | **aprobar** | **aprobar_con_ajuste** | **rechazar** | **aplazar_por_verificacion** |
|---|---|---|---|---|
| Palabra del fallo | APROBAR | APROBAR CON AJUSTE | RECHAZAR | SIN CONCEPTO · SE APLAZA |
| Color | `#2b7048` | `#8a5f08` | `#a83a2c` | `#5d5d60` |
| Puntaje en el N1 | Sí | Sí | Sí | **No: se escribe SIN CONCEPTO** |
| Monto | Solicitado, verbatim | Sugerido junto al solicitado y el delta | `$0`, con la palabra "no aplica" | "Hasta $X, sujeto a acta" |
| Barras de eje | Normales | Normales | Normales | **Trama diagonal, sin valor** |
| §4 Alerta | Si existe | **Obligatoria**: explica el ajuste | Se convierte en §Causal | Se convierte en §Qué NO significa |
| Sección propia | Ninguna | Origen del ajuste | Causal invocada y cómo se subsana | Qué falta, quién lo hace, qué sigue |
| Condiciones | Completas | Completas, con la condición del tramo | Ocultas | "Por definir tras la visita" |
| Recomendación | Operativa | Operativa | Operativa, con vía de reevaluación | Operativa, dirigida a la visita |

### 4.2 `aprobar`

El más simple y el más fácil de arruinar: la tentación es celebrar. **No se celebra.** Las tres
razones van con cifra, la alerta menor va igual si existe, y el bloque de cobertura del dato
aparece completo. Un dictamen aprobatorio sin ninguna advertencia se lee como propaganda.

### 4.3 `aprobar_con_ajuste`

Gana una sección obligatoria, **Origen del ajuste**, de 35 a 50 palabras, con esta estructura:

1. La cifra del ajuste y su proporción exacta.
2. La medición de la que sale, con su unidad mínima.
3. La frase que desactiva la lectura reputacional: *"el recorte no es una reserva sobre el
   solicitante, es la proporción del área que la medición verifica"*.

Esa tercera línea existe porque un ajuste de monto sin explicación se lee como desconfianza, y
esto es exactamente lo contrario: es el sistema exponiendo su propia aritmética.

### 4.4 `rechazar`

La sección §4 se convierte en **Causal invocada**, y va antes que cualquier otra cosa del N2.
Estructura fija:

1. **Cuál causal**, con su número y su umbral (`causal 2: área detectada menor al 50% de la
   declarada`).
2. **Con qué margen se dispara** (`12,5% contra un umbral de 50%: 37,5 puntos de margen`).
3. **Qué no se está diciendo**, obligatorio. En `meta-cacao`: que el NDVI no es bajo, es el más
   alto de los nueve predios, con pico de 0,88; lo que falta no es verde, es actividad.
4. **Cómo se subsana**, si se puede: reevaluación si el productor delimita de nuevo el polígono
   efectivamente sembrado.

El punto 3 es innegociable. Un rechazo que no dice qué descartó invita a la sospecha de que el
modelo se equivocó, y en este caso el modelo tiene la mejor respuesta posible.

### 4.5 `aplazar_por_verificacion`

**Es el estado que peor se comunica hoy y el que más nos diferencia.** Vale la pena escribir por
qué falla, porque el fallo es de diseño, no de redacción.

#### El diagnóstico

En `boyaca-papa-nubes` el JSON trae, legítimamente: `puntaje: 0`, `monto_sugerido_cop: 0`,
`plazo_meses: 0`, y los cuatro ejes en `0`. Renderizado con las mismas reglas que los otros tres
estados, el resultado en pantalla es **cero sobre mil, cero pesos, cuatro barras vacías**. Eso no
se lee como "no sé": se lee como el peor rechazo del expediente. El comité vota "no" antes de
llegar al memorando que explica que no es un no.

**El cero es correcto como dato y catastrófico como interfaz.** La corrección es de
renderizado, no de datos: MOTOR está cerrado y no hay que tocarlo.

#### Reglas de renderizado, obligatorias

| Campo | Nunca se muestra así | Se muestra así |
|---|---|---|
| `puntaje: 0` | `0/1000` | **SIN CONCEPTO** |
| `banda_riesgo: "sin_concepto"` | Chip vacío | `no evaluable por cobertura` |
| `ejes[].puntaje: 0` | Cuatro barras vacías | Una franja única con trama diagonal y la leyenda `sin concepto: cobertura óptica insuficiente` |
| `monto_sugerido_cop: 0` | `$0` | `hasta $6.800.000, sujeto a acta de visita` |
| `plazo_meses: 0` | `0 meses` | `por definir` |
| `cobertura_fag_pct: 80` | Se oculta | Se conserva: la cobertura no depende de la visita |

Y una regla de color: el gris `#5d5d60` se usa para el chip de estado, **nunca acompañado de la
iconografía de crítico**. Un aplazamiento con marca roja es un rechazo con otro nombre.

#### Tres secciones propias, en este orden

**1 · Qué NO significa** (primero, antes que nada). Los indicadores de forma están contaminados
por la interpolación y el comité no debe leerlos como abandono: 0 ciclos en 24 meses y 65,1% de
pérdida de amplitud son, en esta ventana, el resultado de 13 meses interpolados. La frase que
tiene que aparecer, porque es la tesis:

> Un predio nublado y un predio abandonado producen exactamente la misma firma satelital.
> Rechazar por nubosidad es negar crédito por el clima, y es un error invisible que le cae encima
> al productor con menos capacidad de apelarlo.

**2 · Qué sí quedó verificado.** Lo favorable no desaparece porque falte concepto: 7 ciclos
completos en 9 años, área detectada de 1,60 ha igual a la declarada con 16 de 16 celdas,
rendimiento estimado de 31,2 t/ha contra 30,0 t/ha municipales (EVA 2018, Ventaquemada, papa),
RTDAF, RUPTA y ambiental sin coincidencias, y monto solicitado muy por debajo del tope de
$40.445.905. Se rotula como **antecedente**, no como concepto: corresponde a años previos y no
sustituye la ventana de decisión.

**3 · Qué falta, quién lo hace y qué sigue.** Es lo que convierte el aplazamiento en una acción
en lugar de un limbo:

| | |
|---|---|
| Qué falta | 12 meses medidos en la ventana de 24. Hay 11 |
| Quién lo resuelve | Visita técnica de campo del intermediario |
| Qué debe verificar el acta | Siembra vigente o lote preparado · etapa fenológica · semilla y fertilizante aplicados · calendario de los dos ciclos financiados |
| Qué pasa después | Con acta favorable, el expediente vuelve a comité para Capital de Trabajo, pequeño productor, hasta $6.800.000 con FAG del 80% |
| Cuánto cuesta | Una visita, contra los $6.800.000 en riesgo |

#### Prohibiciones de redacción en este estado

- Nunca "no se pudo evaluar" en voz pasiva sin sujeto. Se escribe **qué** faltó y **cuánto**.
- Nunca "el predio no cumple". El predio no fue evaluado. La diferencia es todo.
- Nunca poner el aplazamiento junto a los rechazos en una lista de cartera. Va en su propia
  agrupación, "en verificación".
- La primera línea del cuerpo dice, textualmente: **"No es un rechazo."**

> **Por qué esto es lo que más nos diferencia.** Cualquier equipo puede construir un modelo que
> apruebe y rechace. Un modelo que declara los límites de su propia evidencia y se abstiene, en
> vez de convertir la nubosidad en un no, es el que un regulador deja operar. La Circular 100
> pide compensar deficiencias de información, no fingir que no existen.

---

## 5. Ejemplo completo: `huila-cafe`

> Redactado a mano sobre `data/dictamenes.json`, `data/predios.json` y `data/series_ndvi.json`.
> **Esta es la vara.** Toda cifra de este ejemplo existe en esos tres archivos. Si la pantalla
> produce algo distinto, la pantalla está mal.

---

<sub>EXPEDIENTE SEEDLLITE · `huila-cafe` · emitido 15-ago-2026</sub>

### DICTAMEN DE RIESGO CREDITICIO

> ## APROBAR CON AJUSTE
> ## $8.437.500 de $9.000.000 solicitados
> **870 / 1000 · riesgo bajo · 2 alertas que no bloquean**

**María Ligia Osorio** · Café variedad Castillo, cultivo perenne · Vereda El Carmen, Pitalito
(Huila) · **2,25 ha verificadas** de 2,40 declaradas · Pequeño productor: 41 SMMLV en activos,
dentro del límite de 284 · 11 años en el predio, sin crédito formal previo.

---

#### POR QUÉ

1. **Rinde por encima de su municipio.** Rendimiento estimado de 1,23 t/ha contra 1,14 t/ha del
   municipal oficial, un 7,9% por encima (EVA 2018, Pitalito, café).
2. **Sostuvo el vigor cuando le pegó el clima.** Caída de 0,0% durante El Niño 2023-24 frente a
   1,6% regional, con NDVI pico promedio de 0,79 y máximo de 0,84 en agosto de 2025, el más alto
   de los nueve años.
3. **El recorte es aritmético, no reputacional.** La medición verifica 15 de las 16 celdas de la
   rejilla, 2,25 de 2,40 ha (93,8%). Una celda son 0,15 ha y $562.500: el ajuste es exactamente
   esa celda.

#### ALERTA QUE NO BLOQUEA · 1 de 2

**La amplitud de los últimos 24 meses cae 27,6% frente a la historia del propio predio**, de
0,123 a 0,089. No bloquea porque la causal de rechazo del eje A para un cultivo perenne exige
las dos condiciones a la vez: pérdida de amplitud igual o superior al 40% **y** rendimiento por
debajo del municipal. Aquí no se cumple ninguna. En café la amplitud mide ritmo de manejo, no
cosecha, y una pérdida de ese orden es compatible con una renovación por zoca en curso, que es
precisamente el destino declarado del crédito.

#### ALERTA QUE NO BLOQUEA · 2 de 2

**Cobertura óptica de 75 de 108 meses (69%).** Los años 2018 y 2023 se sostienen con 4 y 6 meses
medidos de 12. La ventana de decisión de 24 meses tiene 18 medidos, por encima del mínimo de 12
que exige la metodología para dejar operar las causales del eje A. Los 33 meses interpolados
quedan fuera de todos los indicadores.

#### CONDICIONES DE LA OPERACIÓN

| | |
|---|---|
| Línea FINAGRO | Inversión, pequeño productor |
| Monto solicitado | $9.000.000 |
| **Monto sugerido** | **$8.437.500** (ajuste de $562.500, 6,3%) |
| Cobertura FAG | 80% del saldo insoluto. El desembolso al productor es el 100% de lo aprobado |
| Plazo | 84 meses |
| Desembolso | Dos tramos. **70% ($5.906.250)** al perfeccionamiento de la garantía FAG, destinado a material vegetal y labores de renovación. **30% ($2.531.250)** a los 12 meses, condicionado a que la serie NDVI del polígono muestre recuperación de vigor en las celdas renovadas (pico ≥ 0,75) y no registre reducción del área con actividad agrícola por debajo de 2,10 ha |
| Tope legal | $50.250.973 (70% de 41 SMMLV a $1.750.905, Decreto 1469 de 2025). El monto se ubica muy por debajo |

#### HABILITACIÓN NORMATIVA

La Circular Externa 100 de 1995 de la Superintendencia Financiera, Capítulo II literal c, exige
que para microcrédito la entidad cuente con una metodología *"cuyos elementos permitan compensar
las deficiencias de información del deudor de acuerdo a sus características y grado de
informalidad"*, y admite que esa información *"podrá ser obtenida y documentada en el lugar donde
se desarrolla la actividad económica del deudor"*. Los cuatro ejes siguientes son esa
metodología; el lote es ese lugar.

#### LOS CUATRO EJES · 87 de 100, por 10 = 870

| Eje | Aporte | Peso | Riel |
|---|---|---|---|
| A · Capacidad de pago proyectada | **33** | 40 | 82,5% |
| B · Verificación del activo productivo | **18** | 20 | 90,0% |
| C · Riesgo sectorial y climático | **23** | 25 | 92,0% |
| D · Coherencia del destino del crédito | **13** | 15 | 86,7% |

#### MEMORANDO

Se trata de un cultivo perenne, café variedad Castillo, con once años de tenencia y sin historial
de crédito formal, de modo que la capacidad de pago se sustenta enteramente en la evidencia
satelital. Ninguna causal de rechazo se activa. La pérdida de amplitud contra su propia historia
es de 27,6%, de 0,123 a 0,089, por debajo del umbral de 40%, y el rendimiento estimado de
1,23 t/ha supera el municipal oficial de 1,14 t/ha. Al ser perenne, la baja amplitud reciente
refleja ritmo de manejo y no ausencia de cosecha: citar los 0 ciclos de los últimos 24 meses
como defecto sería aplicarle a un cafetal la regla del arroz. El vigor sostenido lo confirma:
pico de 0,84 en 2025 y ausencia total de caída durante El Niño 2023-24 frente a 1,6% regional.
La limitación del dictamen es la cobertura del dato, con 2018 y 2023 medidos apenas en 4 y 6
meses de 12. El área detectada de 2,25 ha obliga a ajustar el monto en esa misma proporción.

#### VERIFICACIONES DE EXCLUSIÓN

- **RTDAF y RUPTA (Ley 1448 de 2011, Ley 387 de 1997):** sin coincidencias. El predio no figura
  en el Registro de Tierras Despojadas y Abandonadas Forzosamente ni tiene medida de protección
  vigente.
- **Ambiental:** sin superposición con Parque Nacional Natural, páramo delimitado (Ley 1930 de
  2018) ni reserva forestal de Ley 2ª de 1959. El intermediario puede certificar viabilidad
  ambiental con soporte.
- **Destino:** renovación de cafetal y compra de insumos, elegible conforme a la Resolución 08
  de 2023 de la CNCA.

#### LO QUE SEEDLLITE NO EVALUÓ

Historial en centrales de riesgo · Endeudamiento con otras entidades · Garantías adicionales al
FAG · Propiedad, tenencia o contrato sobre el predio. Esas verificaciones quedan en cabeza del
intermediario antes del desembolso. SEEDLLITE cubre 3 de los 5 criterios del literal c: no
reemplaza al comité, le resuelve la capacidad de pago de alguien sin estados financieros.

#### RECOMENDACIÓN

**Aprobar con ajuste por $8.437.500** bajo línea de Inversión para pequeño productor, con
cobertura FAG del 80% y plazo de 84 meses, condicionando el segundo tramo a la verificación
satelital de recuperación de vigor en las celdas renovadas a los 12 meses.

#### DECISIÓN DEL COMITÉ

```
[ ] Acoge la recomendación    [ ] Se aparta    [ ] Aplaza
Motivación (obligatoria si se aparta): ______________________________________
Nombre ____________________  Cargo ____________  Fecha __________  Firma ______
```

> *SEEDLLITE emite una recomendación dirigida a un intermediario financiero vigilado. No
> constituye oferta de crédito, promesa de desembolso ni asesoría financiera al productor. La
> decisión de otorgamiento corresponde exclusivamente al intermediario, conforme a su reglamento
> de crédito, al SARC y al Manual de Servicios de FINAGRO.*

<sub>Dictamen generado por `anthropic/claude-opus-5` vía OpenRouter con salida estructurada
validada contra el esquema de `data/CONTRATO-DATOS.md`. Datos: `predios.json` v1.0,
`series_ndvi.json` v2.0, Copernicus Sentinel-2 L2A. *Contains modified Copernicus Sentinel data
2017-2025.* Anexos A a F adjuntos.</sub>

---

## 6. Lista de verificación antes de publicar un dictamen

Catorce preguntas binarias. **Una sola respuesta "no" impide publicar.**

| # | Verificación |
|---|---|
| 1 | La decisión se lee en palabras en la primera pantalla, sin desplazar y sin clic |
| 2 | El monto sugerido aparece junto al solicitado, aunque sean iguales |
| 3 | La suma de los cuatro aportes por 10 da exactamente el puntaje publicado |
| 4 | Ningún aporte de eje excede su peso |
| 5 | Toda alerta del JSON aparece en el cuerpo, con su cifra y con el umbral que no alcanzó |
| 6 | Si se aprueba con alerta, está escrito **por qué no bloquea**, citando el umbral |
| 7 | Ninguna afirmación lleva adjetivo sin cifra al lado |
| 8 | Toda cifra del texto existe literalmente en `data/`. Ninguna se calculó en la vista |
| 9 | La misma magnitud usa el mismo redondeo en todas sus apariciones |
| 10 | La cobertura del dato se declara: medidos sobre 108 y medidos sobre 24 |
| 11 | RTDAF, RUPTA y verificación ambiental aparecen aunque salgan limpias |
| 12 | En perenne no se cita "0 ciclos" como defecto; en transitorio sí es la señal |
| 13 | No aparece la palabra hipoteca, y el 80% del FAG no se confunde con lo desembolsado |
| 14 | Están el descargo, el bloque de firma y el pie de trazabilidad del modelo |

**Verificación adicional solo para `aplazar_por_verificacion`:** el documento no muestra ningún
cero, la primera línea del cuerpo dice "No es un rechazo", y existe la sección de qué falta con
quién lo resuelve.

---

## 7. Qué cabe en dos horas y qué no

Ordenado por impacto sobre un jurado que ve el documento por primera vez. Todo lo de la primera
tabla se implementa **sin tocar `data/` ni `scripts/`**: el dato ya está.

| Orden | Qué | Minutos | Por qué primero |
|---|---|---|---|
| 1 | **Bloque de fallo del N1**: decisión en palabras, monto contra solicitado, puntaje, conteo de alertas | 20 | Es el primer segundo de la demo. Hoy el jurado ve un puntaje sin veredicto |
| 2 | **Sección "La alerta que no bloquea"** con su umbral, y las evidencias reordenadas en las tres razones | 20 | Es lo que demuestra que el sistema evalúa y no adorna. Cero riesgo técnico |
| 3 | **Cadena de trazabilidad del monto**: la línea que conecta $8.437.500 con 15 de 16 celdas y con $562.500 por celda | 15 | El mayor retorno por minuto del proyecto. Convierte un número en una medición visible |
| 4 | **Estado `aplazar` rehecho**: sin ceros, franja con trama en vez de barras vacías, "No es un rechazo" primero, bloque de qué falta | 25 | Es el caso que nos diferencia y hoy se lee como el peor rechazo del expediente |
| 5 | **Anexo B, la rejilla**: tabla de 16 filas más cuadrícula SVG de 4×4 | 20 | El dato ya está en `predios.json`. Es el anexo que explica el modelo entero |
| 6 | **Pie de trazabilidad y anexo E**: modelo, pasarela, esquema, versiones de datos, atribución Copernicus | 10 | Responde de frente la pregunta "¿esto lo escribió una IA?" |
| 7 | **Descargo y bloque de firma del comité** | 10 | Convierte la pantalla en un objeto de firma. Es texto fijo |

**Total: 120 minutos.**

### Lo que no cabe, y por qué no duele

| Qué | Por qué se deja fuera |
|---|---|
| Anexo A completo con los 108 puntos en tabla navegable | La gráfica NDVI de la pantalla 3 ya muestra la serie. Basta con el conteo de cobertura por año en el cuerpo |
| Glosario con enlace desde cada primera aparición | Enlazar término por término es trabajo manual sin retorno en 60 segundos de video |
| Hoja de impresión completa con anexos en página nueva | Nadie va a imprimir durante la calificación. Se deja `@media print` mínimo: forzar `<details>` abiertos |
| Hash del prompt y versionado del dictamen | Exige tocar `scripts/generar_dictamen.py`, y el frente MOTOR está cerrado |
| Casilla de firma con captura real | Es una funcionalidad de producto, no de demo. El formulario en blanco comunica lo mismo |
| Anexos C y D como páginas propias | Su contenido ya vive en `docs/criterios-de-credito.md` y en el README. Se enlaza, no se duplica |

**Orden de sacrificio si el tiempo se acorta:** cae primero el anexo B, después el bloque de
firma, después el pie de trazabilidad. **Los puntos 1 a 4 no se sacrifican:** sin ellos el
dictamen sigue siendo una ficha, que es exactamente el problema que esta especificación resuelve.

---

## 8. Tres inconsistencias detectadas al escribir esta especificación

No son bloqueantes, pero un jurado que compare dos pantallas las ve.

1. **Caída ENSO regional: 2,0% o 1,6%.** `series_ndvi.json` trae
   `caida_enso_regional_pct: 1.6`, y los memorandos de `huila-cafe` y `meta-cacao` citan
   *"2,0% regional"*. Es la única cifra del cuerpo que no existe en `data/`. **En pantalla debe
   mostrarse 1,6%**, que es el dato; el 2,0% del texto del modelo no se puede sustentar. Si no
   hay tiempo de tocar el texto, no se muestre la cifra regional en el N1.
2. **Plazo de `huila-cafe`: 84, 48 o 36 meses.** `dictamenes.json` dice **84**, que es el dato
   vivo. `dictamen-modelo.md` dice 48 y `criterios-de-credito.md` §9 dice 36. **Manda el JSON.**
   Los dos documentos quedaron desactualizados respecto de la corrida real.
3. **Área verificada: 94% o 93,8%.** 2,25 sobre 2,40 es 93,75%. Los documentos lo redondean a
   94% y la evidencia del JSON declara un desvío de 6,2%. **Se fija un decimal: 93,8% y 6,2%**,
   coherentes entre sí, en todas las apariciones.

---

*Especificación de estructura · 16-ago-2026. Escrita contra los datos reales de `data/`.
No modifica el contrato de datos ni pide nada al frente MOTOR.*
