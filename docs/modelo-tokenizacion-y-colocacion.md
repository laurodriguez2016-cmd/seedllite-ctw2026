# MODELO DE TOKENIZACIÓN Y COLOCACIÓN

> **Qué responde este documento:** por qué SEEDLLITE opera en la capa de colocación y no en la
> de tokenización, qué tendría que existir para pasar de una a la otra, y por qué la evidencia
> satelital es lo que vuelve financiable una cartera agropecuaria colombiana por un tercero.
>
> **Autor:** Juan Torres, abogado tributarista (CO/US/EAU), estructuración de activos digitales.
> **Fecha:** 16-ago-2026.
>
> **Complementa** y no reemplaza a `docs/estructura-legal.md` (captación masiva y habitual) ni a
> la sección 6.3 de `docs/modelo-de-negocio.md` (arquitectura offshore). Aquellos responden
> *"¿cómo se fondea sin cometer un delito?"*. Este responde *"¿qué se está vendiendo, y a quién?"*.
>
> **Advertencia:** análisis de diseño de estructura, no concepto jurídico. Las afirmaciones
> normativas cuyo texto no se verificó contra fuente primaria en esta sesión van marcadas
> `SUPUESTO:`.

---

## 1. Las dos capas

El proyecto vive en una sola capa hoy, y confundirla con la otra destruye el argumento.

**COLOCACIÓN es aguas arriba.** Es la decisión de a quién se le presta y por cuánto. El producto
es el dictamen de crédito. El cliente es un intermediario financiero vigilado por la
Superintendencia Financiera. El dinero es de FINAGRO, la garantía es del FAG, el desembolso lo
hace el intermediario. SEEDLLITE cobra honorarios por evaluar. **Esto es lo que existe hoy:**
nueve predios, nueve dictámenes reales en `data/dictamenes.json`.

**TOKENIZACIÓN es aguas abajo.** Es convertir una cartera ya colocada en un activo transferible
a un tercero que no la originó. El producto es un instrumento financiero. El cliente es un fondo,
una tesorería o un inversionista de impacto. **SEEDLLITE no tokeniza nada.** Produce la evidencia
que haría posible que alguien lo hiciera.

| | Colocación | Tokenización |
|---|---|---|
| Momento | Antes del desembolso | Después del desembolso |
| Pregunta | ¿Este crédito debe existir? | ¿Este crédito se puede transferir? |
| Producto | Dictamen (puntaje 0 a 1000, cuatro ejes SARC, memorando) | Instrumento representativo de un derecho económico |
| Cliente | Intermediario vigilado | Comprador de cartera |
| Régimen aplicable | Circular Externa 100 de 1995, Cap. II (SARC); Manual de Servicios FINAGRO v.26.21; Resolución 08 de 2023 CNCA | Ley 964 de 2005; Decreto 2555 de 2010; régimen cambiario |
| Estado en el proyecto | Construido y demostrable | Diseño en papel |

### Por qué confundirlas rompe el argumento

**Primero, por régimen.** Vender una metodología de evaluación a una entidad vigilada no requiere
autorización de nadie: es un contrato de prestación de servicios. Emitir un derecho económico
negociable sobre esa misma cartera activa, de golpe, la Ley 964 de 2005, el Decreto 2555 de 2010
y, si hay difusión a personas indeterminadas, el artículo 316 del Código Penal. Un pitch que
mezcla las dos capas obliga al evaluador a aplicarle a la primera el escrutinio de la segunda, y
la primera no lo necesita.

**Segundo, por comprador.** El banco compra reducción de costo de originación: hoy evaluar a un
productor de 2,25 hectáreas cuesta más de lo que deja el crédito. El fondo compra otra cosa
distinta: la posibilidad de verificar el activo subyacente sin visitar la finca. Son dos
propuestas de valor, dos precios y dos ciclos de venta. Prometerlas juntas no vende ninguna.

**Tercero, por honestidad de lo construido.** La capa de colocación tiene nueve dictámenes
reales de `claude-opus-5`, con un rechazo fundado y un caso declarado sin concepto. La capa de
tokenización no tiene ni un peso desembolsado. Presentarlas al mismo nivel convierte un
resultado verificable en una promesa.

### La tesis

> Hoy un fondo que quiera comprar cartera agropecuaria colombiana no tiene cómo verificar el
> activo subyacente sin visitar fincas. **SEEDLLITE no vende el crédito: vende la trazabilidad
> que lo hace financiable por un tercero.**

Y hay un detalle que ordena todo el modelo de negocio: la evidencia que la Circular Externa 100
de 1995 exige para **originar** microcrédito, esa metodología que debe "compensar las
deficiencias de información" del deudor informal y que "podrá ser obtenida y documentada en el
lugar donde se desarrolla la actividad económica", es exactamente la misma evidencia que un
tercero necesita para **comprar** el crédito después. Se produce una vez, por obligación
regulatoria del originador, y sirve dos veces. Ese es el arbitraje del modelo.

---

## 2. El activo subyacente y qué representa una unidad tokenizada

### Qué es el subyacente, con precisión

No es la tierra. No es el cultivo. No es la serie NDVI.

**El subyacente es una obligación dineraria:** un crédito agropecuario en pesos colombianos,
originado por un intermediario vigilado con recursos FINAGRO, con destino reglamentado por la
Resolución 08 de 2023 de la CNCA y respaldado por el FAG hasta el 80% del capital cuando el
deudor es pequeño productor.

Eso ya existe hoy en Colombia y no tiene nada de novedoso. **Lo novedoso es lo que viaja pegado
al crédito.** Cada operación evaluada por SEEDLLITE lleva un expediente con seis piezas:

| # | Pieza | Contenido en el demo |
|---|---|---|
| 1 | Polígono y coordenadas del predio | Latitud y longitud del punto y de las 16 celdas de la rejilla |
| 2 | Serie NDVI mensual 2017 a 2025 | 108 meses, cada uno marcado como medido o interpolado por nubosidad |
| 3 | Medición de área | Rejilla 4x4, celda agrícola si mediana de NDVI ≥ 0,30 y amplitud ≥ 0,12 |
| 4 | Dictamen | Puntaje sobre 1000, cuatro ejes con peso, evidencia clasificada, memorando y recomendación |
| 5 | Fuente y licencia | Copernicus Sentinel-2 L2A, 10 m, licencia abierta con uso comercial permitido |
| 6 | Referencias oficiales | Rendimiento municipal EVA (UPRA/MinAgricultura), Manual FINAGRO v.26.21, Resolución 08 de 2023 CNCA |

Ese expediente es el activo real de SEEDLLITE. El crédito lo origina otro.

Con una advertencia que hay que decir antes de que la pregunte el comprador: **el expediente no
es un archivo de crédito completo.** SEEDLLITE cubre tres de los cinco criterios de evaluación
del SARC. Centrales de riesgo, garantías adicionales y endeudamiento agregado con otras
entidades quedan en cabeza del intermediario. El expediente resuelve la parte que hoy no existe,
no la que ya existía.

### Las tres formas posibles de la unidad tokenizada

**Opción A: participación en un crédito individual.** Un token apunta a una operación: el
crédito de $8.437.500 sobre las 2,25 hectáreas verificadas de café en Pitalito.

*A favor:* trazabilidad perfecta. El tenedor mira un predio, una serie y un dictamen.
*En contra:* concentra todo el riesgo idiosincrático en un solo deudor y un solo clima. Los
tickets son minúsculos, del orden de US$2.000 por operación, así que el costo de estructurar y
administrar cada unidad se come el retorno. Y es la forma que más se parece a ofrecer
participación en un negocio ajeno, es decir, la que más rápido se cataloga como valor y la que
más se acerca a financiación colaborativa no autorizada.

**Opción B: participación patrimonial en un pool abierto.** El token es una cuota parte de un
vehículo que compra créditos de forma continua.

*A favor:* diversifica y escala sin reestructurar en cada emisión.
*En contra:* el tenedor deja de comprar cartera y pasa a comprar el juicio del gestor. En un pool
abierto la composición cambia, la valoración depende de criterios del administrador y la
evidencia satelital se diluye en un promedio. Eso destruye la única ventaja del modelo: si lo que
se compra es la palabra del gestor, la serie NDVI sobra.

**Opción C: derecho al flujo de un pool cerrado e identificado.** El token representa un derecho
sobre el flujo de recaudo de una lista definida de créditos, sin promesa de rendimiento fijo, con
retorno variable atado al desempeño real de la cartera.

*A favor:* diversifica como B, pero conserva la trazabilidad de A, porque la composición del pool
es una lista cerrada y cada línea de esa lista conserva su expediente. El tenedor puede auditar el
promedio y también cada componente.
*En contra:* exige definir en el contrato el orden de prelación, el tratamiento de prepagos y
qué pasa cuando el FAG honra la garantía. Es más trabajo documental por adelantado.

### Recomendación: opción C

Cinco razones, en orden de peso:

1. **Conserva la evidencia.** Un pool cerrado de seis créditos por $70.937.500 sobre 19,36
   hectáreas verificadas es auditable línea por línea. Un pool abierto no.
2. **Elimina la concentración de A** sin caer en la opacidad de B.
3. **El retorno no es discrecional.** En C el flujo está definido contractualmente por el recaudo
   real, no por la valoración que haga el gestor de su propio portafolio.
4. **La ausencia de rentabilidad fija garantizada es un rasgo de sustancia económica.** La promesa
   de retorno fijo es el marcador clásico de los esquemas de captación; su ausencia no es un
   tecnicismo defensivo, es la prueba de que hay un activo detrás.
5. **Es compatible con la restricción del FAG** que se explica en la sección 5: si la garantía
   estatal no sigue automáticamente al cesionario, el diseño no puede apoyarse en ceder la
   cartera. Un derecho al flujo permite que el intermediario siga siendo el acreedor de registro,
   que es quien tiene la relación con el FAG.

Esa quinta razón es la que menos se ve y la que más manda. Vale la pena decirla al derecho: **la
forma del instrumento no la elige el diseño financiero, la elige la garantía estatal.**

Recomendar C no saca al instrumento del régimen de valores. Muy probablemente lo mete, como se
explica enseguida. La recomendación es sobre diseño económico, no sobre calificación regulatoria.

---

## 3. El monitoreo posterior al desembolso

Aquí es donde el modelo deja de parecerse a cualquier otro.

### La asimetría que existe hoy

Quien compra cartera agropecuaria compra una fotografía tomada el día de la originación. A partir
de ahí, la única información sobre el activo subyacente es la que le reporte el administrador de
la cartera, que es parte interesada. Verificar de forma independiente exige visitar fincas
dispersas, y eso nunca fue rentable sobre créditos de ocho millones de pesos.

El resultado es conocido: el inversionista institucional no compra lo que no puede verificar, y
la cartera rural pequeña se queda sin mercado secundario.

### Qué cambia cuando la serie no se detiene

La serie NDVI que originó el crédito **sigue corriendo**. Sentinel-2 vuelve a pasar sobre la misma
lote y la mediana mensual sobre el mismo polígono se sigue produciendo contra la misma fuente
pública. El tenedor del token observa el estado del activo subyacente mes a mes sin pedirle
información a nadie.

Y hay una propiedad que importa más que la frecuencia: **es re-ejecutable por un tercero.** Con
las coordenadas, el rango de fechas, el método declarado (mediana mensual de NDVI sobre el
polígono, enmascarada con la banda SCL del producto L2A, resolución de 10 metros) y una fuente de
licencia abierta, cualquiera puede volver a correr el cálculo y llegar al mismo número. Un informe
de auditoría hay que creerlo. Esto se vuelve a correr.

### Cómo se ve, con los predios del demo

El pool de la demostración serían los seis créditos recomendados, por $70.937.500 sobre 19,36
hectáreas verificadas de 20,70 declaradas. El tablero mensual del tenedor tendría esta forma, con
los datos reales de `data/series_ndvi.json`:

| Crédito | Área verificada | Cobertura del dato | Ciclos últimos 24 m | Pérdida de amplitud | Lectura |
|---|---|---|---|---|---|
| Café, Pitalito (perenne) | 2,25 de 2,4 ha | 75 de 108 meses | 0 | 27,6% | Normal, con hito contractual al mes 12 |
| Arroz, El Espinal (transitorio) | 6,1 de 6,1 ha | 87 de 108 | 3 | 1,3% | Normal |
| Papa, Ventaquemada (transitorio) | 1,8 de 1,8 ha | 86 de 108 | 1 | 39,0% | Vigilancia: a un punto del umbral de 40% |
| Cacao productivo, Granada (perenne) | 4,5 de 4,5 ha | 93 de 108 | 2 | 5,7% | Ancla de calidad del pool |
| Cacao sin manejo, Granada (perenne) | 2,61 de 3,8 ha | 94 de 108 | 0 | 64,5% | Vigilancia estrecha |
| Papa, Ventaquemada (transitorio) | 2,1 de 2,1 ha | 64 de 108 | 1 | 10,1% | Normal, sensible al déficit hídrico (caída de 6,5% en El Niño 2023-24) |

En cultivo perenne la ausencia de ciclos no es defecto: la causal de rechazo exige pérdida de
amplitud igual o superior al 40% **y** rendimiento por debajo del municipal de EVA, de forma
simultánea. Por eso el cacao sin manejo, con 64,5% de pérdida, entró al pool: su rendimiento
estimado de 0,67 t/ha está por encima del municipal de 0,60 t/ha.

**Tres cosas concretas que el tenedor puede hacer con ese tablero y hoy no puede hacer con
ninguna cartera:**

**Verificar el cumplimiento de una condición contractual sin preguntarle al administrador.** El
dictamen del café de Pitalito estructuró el desembolso en dos tramos: 70% ($5.906.250) contra el
perfeccionamiento de la garantía FAG, y 30% ($2.531.250) a los 12 meses, condicionado a que la
serie NDVI muestre recuperación de vigor en las celdas renovadas con pico igual o superior a 0,75
y a que el área con actividad agrícola no baje de 2,10 hectáreas. Esas dos condiciones son
observables desde el espacio. En el mes 12 el tenedor no espera el informe: mira la serie.

**Anticipar el deterioro antes del vencimiento.** La mora es un indicador retrospectivo: aparece
cuando el productor ya no pagó. La caída de amplitud y la reducción del área con actividad
agrícola aparecen en la serie meses antes. El crédito de papa en Ventaquemada, con 39,0% de
pérdida de amplitud sobre un umbral de 40%, es el que un comité querría revisar cada mes, y esa
revisión no cuesta una visita.

**Ver la selección adversa que no entró.** De $117.000.000 solicitados en los nueve expedientes,
el sistema recomendó $70.937.500, es decir el 60,6%. Quedaron fuera $32.500.000 rechazados y
$6.800.000 aplazados por verificación. Para el comprador de la cartera, el filtro es tan
informativo como el contenido: sabe qué se descartó y con qué evidencia.

### El límite, dicho antes de que lo encuentren

El monitoreo también se puede quedar ciego. En el altiplano de Ventaquemada, el predio
`boyaca-papa-nubes` tiene 11 de 24 meses medidos en la ventana de decisión y 48 de 108 en la serie
completa. Con esa cobertura, la interpolación aplana la curva y la firma del abandono se vuelve
indistinguible de la firma de la nubosidad: cero ciclos y 65,1% de pérdida de amplitud aparecen en
el tablero sin significar nada. El sistema declara `sin_concepto` y remite a visita técnica en vez
de rechazar.

Esa disciplina hay que trasladarla al monitoreo: **el indicador de cobertura del dato tiene que
viajar en la misma fila que el indicador de estado.** Un panel que nunca dice "no sé" no es
confiable, es decorativo. Por eso la tabla de arriba tiene una columna de cobertura y no una
sola de semáforo.

---

## 4. Riesgo regulatorio en Colombia

### Punto de partida

En Colombia no existe regulación específica de tokenización de activos financieros. Eso no es un
vacío: la materia se rige por las normas existentes de valores (Ley 964 de 2005 y Decreto 2555 de
2010) y, cuando hay público, por el régimen de financiación colaborativa (Decreto 1357 de 2018,
modificado por el Decreto 1235 de 2020).

**Llamarlo token no lo saca del régimen. Lo mete.**

### Cuándo esto sería un valor

`SUPUESTO:` el texto exacto del artículo 2 de la Ley 964 de 2005 y la numeración del artículo del
Decreto 2555 de 2010 sobre oferta pública se toman de conocimiento general y deben verificarse
contra el texto oficial antes de cualquier documento público.

La prueba tiene tres elementos que se leen juntos: un **derecho de naturaleza negociable**, que
**hace parte de una emisión**, cuando tenga por **objeto o efecto la captación de recursos del
público** (Ley 964 de 2005, art. 2).

Las tres formas analizadas en la sección 2 cumplen los dos primeros elementos sin discusión. El
tercero es el que se puede administrar por diseño. Y el concepto de oferta pública del Decreto
2555 de 2010 fija el corte: se considera pública la oferta dirigida a **personas no determinadas**
o a **cien o más personas determinadas**, sobre documentos emitidos en serie o en masa.

**Qué implicaría ser valor con oferta pública:** inscripción en el Registro Nacional de Valores y
Emisores, prospecto, calificación cuando aplique, revisor fiscal, revelación periódica de
información y supervisión de la Superintendencia Financiera sobre el emisor y sobre quien
intermedie. Para una operación cuyo pool inicial sería del orden de setenta millones de pesos, ese
costo fijo supera con holgura el activo. No es un obstáculo jurídico: es una imposibilidad
aritmética en la etapa temprana.

**El matiz que no se puede ocultar:** se ha sostenido que, aun cuando un instrumento reúna las
características esenciales de un valor, debe mediar un pronunciamiento de la Superintendencia
Financiera que lo catalogue como tal para que se aplique el régimen. Es una discusión doctrinal
abierta, no una posición pacífica, y apoyarse en ella como si fuera doctrina establecida es
exactamente la clase de optimismo que hunde estructuras. Se navega con concepto previo, no con
suposiciones.

### El papel de la Superintendencia Financiera

Cuatro funciones distintas que conviene no mezclar:

1. **Consulta previa** sobre la naturaleza del instrumento. No cuesta dinero, cuesta tiempo, y
   convierte una zona gris en una certeza documentada.
2. **La Arenera**, su espacio controlado de prueba para pilotos de innovación financiera.
3. **El RNVE**, si hay oferta pública.
4. **La vigilancia sobre los terceros de la estructura**: la sociedad fiduciaria que administre el
   patrimonio autónomo y la plataforma de financiación colaborativa, si se usa una.

La cuarta es la relevante en la etapa temprana. Toda la actividad regulada la ejerce un vigilado
que ya tiene la autorización; SEEDLLITE es proveedor de metodología, no emisor.

### La diferencia frente a un vehículo de fondeo privado

Un vehículo de fondeo privado no es una versión pequeña de una emisión: es otra cosa. Un mutuo
entre dos personas jurídicas determinadas, o una colocación dirigida a menos de cien
inversionistas determinados sin publicidad ni difusión colectiva, no constituye oferta pública, y
por lo tanto no dispara la inscripción en el RNVE.

Lo que traza la línea no es la tecnología ni el tamaño del ticket: es **la determinación de los
destinatarios y la ausencia de difusión colectiva**. Un instrumento idéntico, con el mismo pool y
el mismo retorno, cae de un lado o del otro según a quién se le ofrezca y cómo. Y el criterio de
difusión es el más fácil de activar por descuido: un posteo que diga "invierta en crédito agrícola
desde $500.000" lo activa por sí solo aunque respondan tres personas.

### OPCIÓN CONSERVADORA

**No emitir nada.** SEEDLLITE se queda en la capa de colocación y cobra honorarios por dictamen.
El fondeo, si se necesita, sale de recursos propios, crédito bancario o una colocación privada a
inversionistas determinados sin publicidad, con los recursos aislados en un patrimonio autónomo
administrado por una fiduciaria vigilada. Si en algún momento se quiere público colombiano, se va
con una plataforma de financiación colaborativa **ya autorizada**, no se constituye una: hacer
autorizar una sociedad de financiación colaborativa toma más de un año.

*Costo:* techo de escala. *Riesgo penal y regulatorio:* mínimo. *Tiempo a mercado:* inmediato.

Esta es la opción correcta hoy, y no por prudencia genérica: es que la capa de tokenización no
tiene todavía el insumo que la haría creíble, que es la validación contra mora observada de la
sección 6.

### OPCIÓN AGRESIVA

Emisión desde un vehículo offshore de notas respaldadas por la cartera colombiana, con el token
como representación digital de la nota, colocación bajo Reg S o Reg D 506(c), token
*permissioned* con lista blanca, prohibición expresa y geobloqueo a residentes colombianos,
entrada de los recursos por el mercado cambiario formal con registro ante el Banco de la República
(Resolución Externa 1 de 2018 de la JDBR) y cartera alojada en un patrimonio autónomo de fiduciaria
vigilada, con SEEDLLITE como originador y administrador que nunca recibe dinero del público.

Es la arquitectura ya documentada en `docs/modelo-de-negocio.md`, sección 6.3. Los riesgos
residuales que hay que nombrar en voz alta:

- **La estructura offshore no protege contra la promoción.** Un solo acto de difusión dirigido a
  residentes colombianos reabre el criterio de oferta pública y el artículo 316, y el hecho de que
  el emisor esté en otra jurisdicción no lo cura.
- **La calificación del instrumento en la jurisdicción de emisión es un análisis independiente**,
  con su propia opinión legal. Que no sea oferta pública en Colombia no dice nada sobre si es un
  *security* allá.
- **El régimen cambiario es una fuente de sanción autónoma.** Traer el dinero por fuera del
  mercado cambiario es infracción cambiaria y, además, una señal de alerta en LA/FT.
- **SARLAFT, reportes a la UIAF y screening OFAC** no son opcionales y encarecen cada suscripción.
- **Habeas data.** El expediente asocia un polígono con un productor identificado. Lo que debe
  viajar con el token es la evidencia del **predio**, no la identidad del deudor: coordenadas,
  serie, área medida y dictamen despersonalizado. Es una exigencia de la Ley 1266 de 2008 y de la
  Ley 1581 de 2012, y de paso es mejor diseño, porque el comprador necesita saber que el lote
  produce, no cómo se llama quien la trabaja.

`SUPUESTO:` si la estructura se articula como titularización de cartera, el análisis se desplaza al
régimen de titularización del Decreto 2555 de 2010 y a las entidades habilitadas para administrar
universalidades. No se verificó en esta sesión qué figura exacta aplicaría ni si habilita o
excluye la ruta offshore. Es la primera pregunta para la firma de mercado de capitales.

### Las cuatro líneas que no se cruzan, en ninguna de las dos opciones

1. Ninguna promoción de la inversión dirigida al público colombiano.
2. Ningún aportante colombiano indeterminado.
3. Nunca rendimiento fijo garantizado a personas indeterminadas.
4. Ninguna emisión sin concepto previo de la SFC sobre la naturaleza del instrumento.

---

## 5. Cómo interactúa con el FAG

El Fondo Agropecuario de Garantías, administrado por FINAGRO, respalda hasta el **80% del capital**
cuando el deudor es pequeño productor. Los seis créditos del pool de la demostración salieron con
esa cobertura.

### Qué significa para quien compre el activo

El respaldo estatal reduce de forma estructural la pérdida esperada, no la probabilidad de
incumplimiento. Sobre el pool de $70.937.500, la exposición de capital no cubierta sería del orden
de **$14.187.500**, el 20%. Esa aritmética es ilustrativa y se sostiene solo si se cumplen tres
condiciones simultáneas: garantía válidamente constituida, comisión al día, y cumplimiento por el
intermediario del procedimiento de cobro previsto en el Manual de Servicios.

Ese es el punto: la cobertura no es un dato del activo, es un dato del **comportamiento del
intermediario**. Quien compre el flujo hereda ese riesgo operativo.

### Qué NO significa, dicho sin rodeos

| Lectura equivocada | Realidad |
|---|---|
| "El inversionista está cubierto al 80%" | El FAG cubre al **intermediario** que otorgó el crédito. No hay acción directa del tenedor del token contra FINAGRO |
| "Es un seguro" | No paga a la vista. Paga contra acreditación del incumplimiento y cumplimiento del procedimiento y los términos del Manual |
| "Cubre todo lo adeudado" | La cobertura se predica del capital. `SUPUESTO:` el tratamiento de intereses, costas y gastos de cobranza debe verificarse contra el Manual de Servicios FINAGRO v.26.21 |
| "Es gratis" | Tiene comisión, que reduce el rendimiento neto de la operación. `SUPUESTO:` la tarifa vigente debe verificarse contra el Manual |
| "La garantía viaja con la cartera" | **Es la pregunta abierta más importante de todo este documento** |

### La pregunta que define la forma del instrumento

`SUPUESTO:` no se verificó si la cobertura del FAG subsiste, se extingue o requiere autorización
previa de FINAGRO cuando la cartera se cede a un tercero no vigilado o a un patrimonio autónomo, ni
si el Manual de Servicios restringe la cesión de cartera fondeada con recursos FINAGRO. Es lo
primero que hay que resolver, porque de la respuesta depende toda la estructura.

La consecuencia de diseño ya está incorporada en la recomendación de la sección 2: si la garantía
no sigue automáticamente al cesionario, **no se puede ceder la cartera**, y entonces la unidad
tokenizada tiene que ser un derecho al flujo con el intermediario permaneciendo como acreedor de
registro. La opción C no se eligió por elegancia financiera: se eligió porque es la única que
sobrevive a la respuesta desfavorable.

### El argumento que le interesa a FINAGRO

El FAG es dinero público. Una cobertura del 80% sobre un crédito de $18.000.000 destinado a
"mantenimiento de cacaotal establecido" en un polígono declarado de 4,0 hectáreas donde la
medición encuentra **0,5 hectáreas** con actividad agrícola, es una garantía estatal sobre un
crédito mal originado. El resto son 3,5 hectáreas de dosel de bosque, con la mediana de NDVI más alta de los
nueve predios, 0,88 de pico promedio, y una amplitud de apenas 0,092 en los últimos 24 meses:
cobertura vegetal permanente, no un cultivo en manejo.

Un modelo que mire cuánto verde hay lo aprueba sin dudar. El sistema lo rechaza con 240 puntos
sobre 1000.

**El FAG cubre el incumplimiento, no cubre el error de originación.** Evaluar el activo productivo
antes del desembolso no protege solo el balance del banco: protege el patrimonio del fondo de
garantías. Ese es un argumento de política pública, y es más fuerte que cualquier proyección de
ingresos.

---

## 6. Qué haría falta construir

En orden, con la dependencia crítica señalada. Los horizontes son estimaciones, no compromisos.

| Etapa | Qué | Horizonte | Quién |
|---|---|---|---|
| 0 | **El dictamen.** Hecho: nueve expedientes reales, series de Copernicus, áreas medidas | Existe | SEEDLLITE |
| 1 | **El expediente persistente.** Identificador estable por operación, versionado del método (un dictamen debe declarar con qué versión de umbrales se emitió) y sellado con hash fechado para que un tercero verifique que no se alteró. No requiere blockchain: un hash publicado y con fecha cierta basta | 0 a 6 meses | SEEDLLITE |
| 2 | **El monitoreo corriendo solo.** Proceso mensual que reejecuta la serie de cada predio con crédito vivo, recalcula área con actividad y amplitud, y emite señal con su indicador de cobertura al lado | 3 a 9 meses | SEEDLLITE |
| 3 | **Validación retrospectiva contra mora observada.** Conseguir de un intermediario una cartera histórica con desenlace conocido, correr el motor a ciegas sobre las coordenadas y medir si separa cumplidos de incumplidos | 6 a 12 meses | **Requiere un tercero** |
| 4 | **El vehículo y los conceptos.** Fiduciaria, patrimonio autónomo, consulta previa a la SFC sobre la naturaleza del instrumento y opinión legal en la jurisdicción de emisión | 9 a 18 meses | Firma de mercado de capitales |
| 5 | **La emisión.** Pool cerrado, lista identificada, sin rendimiento fijo | 18 meses en adelante | Emisor |

Dos observaciones sobre el orden.

**La etapa 3 no se puede saltar.** Sin ella el puntaje es una hipótesis bien fundada, no un modelo
validado, y ningún comité de riesgo compra una hipótesis. Es también la única etapa que no depende
del equipo: exige que un intermediario vigilado entregue cartera histórica. Esa es la dependencia
crítica del proyecto entero, y conviene decirlo antes de que alguien pregunte.

**La etapa 4 arranca en paralelo con la 3, no después.** La consulta a la Superintendencia
Financiera tarda, y su respuesta puede cambiar la forma del instrumento. Empezarla al final es la
forma más común de perder seis meses.

---

## 7. Qué es hoy y qué es visión

**Es hoy, y se puede verificar abriendo el repositorio:**

- Nueve predios reales con serie NDVI descargada de Copernicus Sentinel-2, 108 meses entre 2017 y
  2025, cada mes marcado como medido o interpolado.
- Áreas medidas con rejilla 4x4 por `scripts/medir_area.py`, no escritas a mano.
- Nueve dictámenes reales de `claude-opus-5` en `data/dictamenes.json`. Evaluar $117.000.000 en
  solicitudes costó **US$1,58** de inferencia, cerca de US$0,18 por dictamen.
- Un rechazo bien fundado sobre el predio con la mediana de NDVI más alta de los nueve, y un caso declarado
  sin concepto en vez de rechazado por falta de cobertura del dato.
- Un demo que abre con doble clic, sin servidor y sin dependencias.

**Es visión, y no existe:**

- Ningún crédito colocado. Ningún peso desembolsado. Ningún productor real: los predios son
  reales, las personas no.
- Ningún token, ningún vehículo, ninguna nota, ninguna fiduciaria contratada.
- Ninguna validación contra mora observada. El puntaje no se ha contrastado contra un solo
  desenlace de crédito real.
- Ningún convenio con intermediario vigilado.
- El monitoreo posterior al desembolso, que es el corazón de la sección 3, hoy es la reejecución
  manual de un script sobre un predio. No es un servicio corriendo, y no lo será hasta la etapa 2.

**Lo que sí está construido del argumento de tokenización es el método.** Cualquiera con las
coordenadas de un predio puede volver a correr la serie contra Copernicus y llegar al mismo
número, porque la fuente es pública, la licencia permite uso comercial y el método está declarado
en el repositorio. Esa reproducibilidad es la pieza que vuelve financiable una cartera por un
tercero, y es la única parte de este documento que no hay que creer: se comprueba.

Todo lo demás es diseño.

---

## Fuentes

| Tema | Norma o fuente |
|---|---|
| Metodología de microcrédito para deudor informal | Circular Externa 100 de 1995, Cap. II, literal c, SFC |
| Concepto de valor | Ley 964 de 2005, art. 2 (texto por verificar) |
| Oferta pública y RNVE | Decreto 2555 de 2010 (numeración de artículos por verificar) |
| Captación masiva y habitual | Ley 599 de 2000, arts. 316 y 316A; Decreto 1981 de 1988, art. 1 |
| Financiación colaborativa | Decreto 1357 de 2018, modificado por Decreto 1235 de 2020 |
| Régimen cambiario | Resolución Externa 1 de 2018, JDBR |
| Habeas data | Ley 1266 de 2008; Ley 1581 de 2012 |
| Línea, clasificación de productor y cobertura FAG | Manual de Servicios FINAGRO v.26.21 (16-04-2026) |
| Destino del crédito agropecuario | Resolución 08 de 2023, CNCA |
| Rendimiento municipal de referencia | Evaluaciones Agropecuarias Municipales (EVA), UPRA y MinAgricultura |
| Imágenes | Copernicus Sentinel-2 L2A, licencia abierta con uso comercial permitido. *Contains modified Copernicus Sentinel data 2017-2025* |

---

> Este documento es análisis de diseño de estructura, no concepto jurídico. Cualquier
> implementación real exige concepto previo de la Superintendencia Financiera, verificación de los
> puntos marcados `SUPUESTO:` contra fuente primaria y acompañamiento de firma especializada en
> mercado de capitales y derecho cambiario.

*16-ago-2026 · Juan Torres · Frente producto.*
