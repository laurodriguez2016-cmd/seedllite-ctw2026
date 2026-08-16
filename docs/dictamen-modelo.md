# DICTAMEN MODELO — el estándar de calidad

> **Para Juan Torres (frente MOTOR).**
> Este es el texto al que tiene que llegar `scripts/generar_dictamen.py`. No es un ejemplo
> ilustrativo: es la vara. Itera el prompt hasta que la salida del modelo se parezca a esto.
>
> Redactado por **Laura Rodríguez**, abogada litigante, sobre el expediente de `huila-cafe`.
> El criterio es suyo; la forma se ajustó al formato de dictamen.

---

## 1. El dictamen

### DICTAMEN DE RIESGO CREDITICIO
**Solicitante:** María Ligia Osorio · **Predio:** vereda El Carmen, Pitalito (Huila) · **Cultivo:** Café

**Clasificación.** La solicitante se clasifica como **pequeño productor**: 41 SMMLV en activos,
dentro del límite de 284 SMMLV. La operación es elegible para recursos FINAGRO y para cobertura
del Fondo Agropecuario de Garantías.

**Verificación del activo productivo.** El predio existe y presenta actividad agrícola continua.
No se trata de un predio fantasma. La medición satelital detecta **2,25 ha con actividad
agrícola de las 2,4 ha declaradas —el 94%—**, sin inconsistencias frente a la información
catastral disponible.

**Capacidad de pago.** Tratándose de un **cultivo perenne**, la evaluación no se apoya en el
conteo de cosechas: el café no las dibuja en la serie satelital. Se apoya en el vigor sostenido
y en el ritmo de manejo. El predio registra **NDVI pico promedio de 0,79 a lo largo de nueve
años** y un rendimiento estimado de **1,23 t/ha** frente a **1,14 t/ha** del promedio municipal
de Pitalito reportado en EVA 2018. La solicitante acredita capacidad y solvencia para responder
por la obligación.

**Riesgo sectorial y climático.** La serie **no registra caída de vigor atribuible a El Niño
2023-24**: el predio sostuvo su nivel durante la ventana del evento. La única alerta del
expediente es distinta: la amplitud de los últimos 24 meses cae **27,6%** frente a la histórica
del propio predio. Se pondera a la baja porque en un perenne la amplitud refleja el ritmo de
manejo y no la cosecha, y porque el rendimiento estimado sigue por encima del municipal —el
patrón compatible con una **renovación por zoca** en curso, que es precisamente el destino
declarado del crédito.

**Verificaciones de exclusión.** El predio **no figura en el RTDAF** ni registra medida de
protección vigente en RUPTA. **No presenta restricción ambiental**: no se ubica en Parque
Nacional Natural, páramo delimitado ni reserva forestal de Ley 2ª de 1959.

**Puntaje: 870 / 1000 — riesgo bajo.**

### RECOMENDACIÓN

**Aprobar con ajuste** por **$8.437.500** de los $9.000.000 solicitados. El recorte no es una
reserva sobre la solicitante: es la proporción del área que la medición satelital verifica
—2,25 de 2,4 ha—, y así se le explica. Línea **Inversión** para pequeño productor, con
**cobertura FAG del 80%** y plazo de **48 meses**. Desembolso en **dos tramos**, el segundo
condicionado a verificación satelital de la siembra efectiva.

---

## 2. Por qué este dictamen sirve — para calibrar el prompt

Torres: estas son las **nueve** propiedades que hay que reproducir. Si una salida del modelo
falla en cualquiera, el prompt está incompleto. Las dos últimas se agregaron al corregir la
regla de perenne vs. transitorio.

> ⚠️ **Actualizado 15-ago-2026, 23:05 contra la serie real.** La versión original de este
> dictamen citaba 1,42 t/ha, "9 ciclos en 10 años" y una caída del 18% en El Niño. Esas cifras
> venían de la serie calibrada. Corrida la serie real de Copernicus, el rendimiento es 1,23 t/ha,
> la ventana es de nueve años y **la caída ENSO del café es 0,0%**. Iterar el prompt contra la
> vara vieja habría empujado al modelo a inventar la cifra que la vara pedía y su propio insumo
> no contenía. El criterio de Laura no cambió; cambiaron los números a los que se aplica.

| # | Propiedad | Cómo se ve |
|---|---|---|
| 1 | **Cada afirmación trae su número** | "NDVI pico 0,79", "1,23 t/ha frente a 1,14", "amplitud cae 27,6%". Ningún adjetivo suelto |
| 2 | **Sigue el orden del SARC** | Clasificación → activo → capacidad de pago → riesgo sectorial → exclusiones → decisión |
| 3 | **La alerta se dice aunque se apruebe** | La pérdida de amplitud del 27,6% aparece, se pondera y se explica por qué no bloquea |
| 4 | **Explica el criterio, no solo el resultado** | *"tratándose de un cultivo perenne, la evaluación no se apoya en el conteo de cosechas"* — el dictamen enseña cómo se leyó el dato |
| 5 | **Deja constancia de lo verificado aunque salga favorable** | RTDAF, RUPTA y ambiental se mencionan incluso estando limpias |
| 6 | **Tono de memorando interno** | Sin "excelente", sin "muy buena productora", sin signos de admiración |
| 7 | **La recomendación es operativa** | Monto, línea, cobertura, plazo y condición de desembolso. Un comité puede firmar sobre esto |
| 8 | **Distingue perenne de transitorio** | En un perenne no se cita "0 ciclos" como defecto: es el comportamiento normal del cultivo. Citarlo delata que el modelo no entiende lo que mide |
| 9 | **Declara la cobertura del dato** | Cuántos de los 108 meses son medición y cuántos relleno. Un dictamen que no dice cuánto vio no se puede auditar |

### Lo que NO puede aparecer nunca

- ❌ *"El productor parece confiable"* → sin dato, no va
- ❌ *"Excelente historial"* → adjetivo sin cifra
- ❌ Hablar de **hipoteca**. No hay garantía real: el respaldo es el **FAG**. Ese es justamente
  el punto del producto — el pequeño productor no tiene con qué hipotecar
- ❌ Confundir la **cobertura FAG (80%)** con el porcentaje desembolsado. El FAG es lo que el
  Estado respalda ante incumplimiento; la solicitante recibe el 100% de lo aprobado
- ❌ Decir "percentil" cuando es un porcentaje de caída
- ❌ **Cualquier cifra que no sea oficial o medida por nosotros.** No hay una tercera categoría

---

## 3. El insumo original de Laura

> Se conserva porque es la fuente del criterio, y porque el orden de razonamiento —no la
> redacción— es lo que hay que enseñarle al modelo.

1. La posible consumidora es una pequeña productora.
2. No cumple con alguna condición especial, por lo que procedería el crédito conforme a los
   topes de ley.
3. Se hizo verificación del predio; no es un predio fantasma y coincide con la información
   catastral.
4. Presenta un riesgo bajo respecto de la capacidad de pago: cumple con la capacidad y solvencia
   para responder por el crédito.
5. Ha sido constante en los ciclos de cosecha y cayó en un porcentaje muy inferior al promedio
   regional.
6. Si bien la aptitud del suelo es un riesgo, es de evidenciar que es una productora resiliente
   y constante, y no hay evidencia de que no haya producido en los últimos 24 meses.

> **Nota de verificación:** los puntos 5 y 6 del insumo original mencionaban el promedio
> regional y la aptitud del suelo. Ninguno de los dos se pudo sustentar con fuente, así que
> **no pasaron al dictamen final**. Se conservan aquí porque el razonamiento —ponderar la
> alerta contra la evidencia de resiliencia— sí pasó, y es lo que hay que enseñarle al modelo.

**En consecuencia**, y al tener un riesgo bajo, se está de acuerdo con otorgar el crédito por
$9.000.000 en las condiciones detectadas.

---

## 4. Observación de producto que salió de esta revisión

> *"Sería prudente tener junto a cada caso imágenes del predio, que se pueda ver no solo la
> información en físico sino que también se pueda examinar el predio en las imágenes de los
> últimos años."* — Laura Rodríguez

**Aceptada.** Cambia el requisito de **una** imagen satelital por predio a una **secuencia
temporal** de al menos dos cortes.

Razón: el NDVI es una abstracción que exige explicación. **Dos fotos del mismo pedazo de tierra
con nueve años de diferencia no exigen ninguna.** Para `meta-cacao` la imagen muestra dosel de
bosque cerrado ocupando casi todo el polígono declarado, con un cuadro sembrado en una esquina
—las 0,5 ha que la medición detecta—. La inconsistencia entre lo declarado y lo que hay se ve
con los ojos, sin entender qué es el NDVI.

Especificación en `data/CONTRATO-DATOS.md` y en la tarea 3 de Torres.

---

*15-ago-2026, 18:00 · Congelado. Es la vara del prompt, no se edita durante la iteración.*
