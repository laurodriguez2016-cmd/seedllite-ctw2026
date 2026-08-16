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
No se trata de un predio fantasma. El área detectada por análisis satelital —2,4 ha— coincide
con el área declarada, sin inconsistencias frente a la información catastral disponible.

**Capacidad de pago.** Se detectan **9 ciclos de cosecha completos en 10 años**, con rendimiento
estimado de **1,42 t/ha** frente a **1,14 t/ha** del promedio municipal de Pitalito reportado
en EVA 2018. Es la constancia del patrón productivo —y no su nivel puntual— la que sustenta la
proyección de flujo. La solicitante acredita capacidad y solvencia para responder por la
obligación.

**Riesgo sectorial y climático.** Durante la ventana de El Niño 2023-24 la serie registra una
caída de vigor del **18%** —el mayor descenso de los diez años analizados— con recuperación
completa en los dos ciclos siguientes. Es la única alerta del expediente, y se pondera a la baja
porque el predio no perdió el ciclo productivo: lo sostuvo con menor vigor.

**Verificaciones de exclusión.** El predio **no figura en el RTDAF** ni registra medida de
protección vigente en RUPTA. **No presenta restricción ambiental**: no se ubica en Parque
Nacional Natural, páramo delimitado ni reserva forestal de Ley 2ª de 1959.

**Puntaje: 780 / 1000 — riesgo bajo.**

### RECOMENDACIÓN

**Aprobar** por **$9.000.000** —el monto solicitado completo—. El área declarada coincide con la
verificada y el monto es proporcional al costo documentado del cultivo. Línea de inversión para pequeño productor, con **cobertura FAG del 80%** y plazo de
**36 meses**. Desembolso en **dos tramos**, el segundo condicionado a verificación satelital de
la siembra efectiva.

---

## 2. Por qué este dictamen sirve — para calibrar el prompt

Torres: estas son las siete propiedades que hay que reproducir. Si una salida del modelo falla
en cualquiera, el prompt está incompleto.

| # | Propiedad | Cómo se ve |
|---|---|---|
| 1 | **Cada afirmación trae su número** | "9 ciclos", "1,42 t/ha frente a 1,14", "caída de 18%". Ningún adjetivo suelto |
| 2 | **Sigue el orden del SARC** | Clasificación → activo → capacidad de pago → riesgo sectorial → exclusiones → decisión |
| 3 | **La alerta se dice aunque se apruebe** | La aptitud MEDIA aparece, se pondera y se explica por qué no bloquea |
| 4 | **Explica el criterio, no solo el resultado** | *"la constancia del patrón productivo, y no su nivel puntual"* — el dictamen enseña cómo se leyó el dato |
| 5 | **Deja constancia de lo verificado aunque salga favorable** | RTDAF, RUPTA y ambiental se mencionan incluso estando limpias |
| 6 | **Tono de memorando interno** | Sin "excelente", sin "muy buena productora", sin signos de admiración |
| 7 | **La recomendación es operativa** | Monto, línea, cobertura, plazo y condición de desembolso. Un comité puede firmar sobre esto |

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
con diez años de diferencia no exigen ninguna.** Para `meta-cacao` la secuencia muestra hileras
de cacao ordenadas en 2020 y rastrojo en 2025 — el abandono se ve con los ojos.

Especificación en `data/CONTRATO-DATOS.md` y en la tarea 3 de Torres.

---

*15-ago-2026, 18:00 · Congelado. Es la vara del prompt, no se edita durante la iteración.*
