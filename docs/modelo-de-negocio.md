# SEEDLLITE — Modelo de negocio, estructura legal y arquitectura
### Hackathon CTW·2026 · Track 04 · Planeta y Comunidad · Resiliencia
**Versión 1.0 — 15 de agosto de 2026**

> **Tesis en una frase:** el campo colombiano no tiene un problema de falta de plata; tiene un problema de **falta de capacidad de evaluación**. SEEDLLITE no presta dinero: construye la capa de *originación y monitoreo satelital* que le permite a la banca desplegar el capital subsidiado que ya existe y hoy no se coloca.

---

# 1. LA COMPETENCIA — QUIÉN YA ESTÁ EN ESTE NEGOCIO

## 1.1 Los que hacen exactamente esto (referentes globales)

| Empresa | País | Qué hace | Tracción / capital |
|---|---|---|---|
| **Apollo Agriculture** | Kenia | El referente exacto: ML + imágenes satelitales para construir perfiles de crédito de pequeños agricultores sin historia financiera. Financia insumos, no efectivo. | **US$70,3M** levantados en 14 rondas · **+350.000 agricultores** a inicios de 2025 |
| **SatSure** | India | Inteligencia satelital vendida **a los bancos** para originar crédito agrícola. Es el modelo B2B puro. | Opera con banca india; expansión a África (programa SSAGA, Ruanda, ene-2025) |
| **Pula** | Kenia | Seguro agrícola paramétrico con datos satelitales | Millones de agricultores asegurados |

**Lectura:** Apollo probó que el modelo funciona (unit economics + escala) y SatSure probó que se puede vender a bancos sin volverse banco. **Ninguno de los dos opera en América Latina.**

## 1.2 América Latina — el frente cercano

| Empresa | País | Qué hace | Capital |
|---|---|---|---|
| **Agrolend** | Brasil | Fintech de crédito agrícola directo a pequeño/mediano productor | **+US$100M** en equity · Serie C de US$53M (2024) · alianza de R$100M con UPL |
| **Verqor** | México | Crédito para insumos, aprobación en <48h | US$7,5M (pre-Serie A liderada por Yara Growth Ventures + deuda) |
| **ProducePay** | México/EE.UU. | Financiamiento de cosecha de exportación | +US$100M acumulados |
| **Agrosmart / Agranimo** | Brasil / Chile | Datos de clima y suelo (los del deck) | Datos, **no crédito** |

**Dato duro del mercado:** menos del **5% de los hogares rurales en LatAm** accede a crédito formal. Ese es el hueco.

## 1.3 Colombia — el campo de juego real

| Actor | Qué es | Por qué importa |
|---|---|---|
| **FINAGRO** | Banco de segundo piso del Estado. No presta al productor: le pone los recursos y las condiciones a los bancos. | **Es el aliado, no el competidor.** Tiene la plata. |
| **Banco Agrario** | El principal colocador de crédito FINAGRO | Cliente objetivo #1 |
| **FAG (Fondo Agropecuario de Garantías)** | Garantiza hasta el **80%** del crédito a pequeño productor (100% para víctimas, desplazados, reinsertados). Comisión anual 1,5%–4,5%. | **Baja el riesgo del banco a ~20%.** Es la palanca que hace viable todo. |
| **Bancamía, Crezcamos, Contactar, Microfinanzas** | Microfinancieras rurales | Clientes objetivo: son las que más sufren el costo de evaluación |
| **Agrapp** | Plataforma colombiana de financiación de proyectos agrícolas | Único jugador local cercano — pero es financiación, no *scoring* |

> ⚠️ **Conclusión estratégica: en Colombia no hay nadie haciendo scoring crediticio agrícola con imágenes satelitales vendido a la banca.** Ni una sola empresa. Es campo abierto.

---

# 2. LA BRECHA DE MERCADO — DÓNDE ESTÁ EL HUECO DE VERDAD

## 2.1 La paradoja colombiana

Colombia tiene lo que casi ningún país tiene:

1. **Capital disponible y subsidiado** — FINAGRO, con tasas techo reguladas (pequeño productor hasta IBR + 6,7%)
2. **Garantía estatal** — el FAG cubre hasta el 80% del riesgo
3. **Mandato político** — colocar en el campo es prioridad de gobierno

**Y aun así el pequeño productor no accede.** ¿Por qué?

## 2.2 El cuello de botella real: el costo de evaluar

Para desembolsar un crédito de $5.000.000 COP a un campesino en Vichada, el banco necesita:

- Un asesor que **viaje físicamente** al predio
- Verificar que el predio existe, que es de él, y que efectivamente siembra
- Estimar si la cosecha va a dar para pagar
- Volver a visitar para monitorear

**El costo de originar y monitorear ese crédito se come el margen completo.** Por eso el banco prefiere un solo crédito de $500 millones a un gran productor que 100 créditos de $5 millones. No es maldad: es aritmética.

## 2.3 La brecha, formulada

> **No falta dinero. Falta una forma barata de saber a quién prestarle y de vigilar que la plata se sembró.**

SEEDLLITE ataca exactamente eso. La visita de campo cuesta cientos de miles de pesos; **la imagen satelital cuesta cero** y existe desde hace más de 10 años sobre cada metro cuadrado de Colombia.

## 2.4 El giro que nos diferencia de Apollo y Agrolend

Apollo y Agrolend **prestan de su balance** — necesitan levantar deuda, asumen el riesgo crediticio y compiten contra tasas subsidiadas que no pueden igualar.

**SEEDLLITE no presta.** Vende la decisión. Eso significa:

| | Prestamista (Apollo, Agrolend) | SEEDLLITE (infraestructura) |
|---|---|---|
| Necesita levantar capital para operar | Sí, mucho | No |
| Asume riesgo de crédito | Sí | No |
| Compite con tasas FINAGRO | Sí (pierde) | No (las habilita) |
| Riesgo regulatorio | Alto (actividad financiera) | Bajo (software) |
| Margen bruto | ~30-40% | **>80% (software)** |
| Velocidad de escala | Limitada por el capital | Limitada solo por ventas |

---

# 3. CÓMO SE VENDE ESTE NEGOCIO

## 3.1 A quién le vendemos (en orden de facilidad)

**Cliente 1 — Microfinancieras rurales (Crezcamos, Contactar, Bancamía)**
Son las que más duele el costo de evaluación y las más rápidas para decidir. Entrada por aquí.
*Argumento:* "Hoy usted evalúa 30 solicitudes por asesor al mes. Con SEEDLLITE evalúa 300, con el mismo asesor."

**Cliente 2 — Banco Agrario y bancos con cartera FINAGRO**
El volumen grande. Ciclo de venta largo, pero es el premio.
*Argumento:* "Usted tiene cupo FINAGRO sin colocar y metas de colocación rural que no cumple. Nosotros le quitamos el cuello de botella."

**Cliente 3 — Aseguradoras y reaseguro**
El mismo dato satelital que sirve para prestar sirve para asegurar (seguro paramétrico).
*Argumento:* "Le liquidamos el siniestro sin ajustador, con el índice satelital."

**Cliente 4 — FINAGRO / MinAgricultura (B2G)**
No como comprador inicial, sino como **validador**. Un piloto con FINAGRO abre todas las demás puertas.

## 3.2 El pitch de una frase, por audiencia

| Audiencia | Frase |
|---|---|
| **Banco** | "Le bajamos el costo de originar un crédito rural de $400.000 a $8.000." |
| **Inversionista** | "Somos la capa de underwriting de un mercado de crédito de miles de millones que hoy no se coloca porque nadie sabe evaluarlo." |
| **Jurado del hackathon** | "Un campesino sin extractos bancarios sí tiene historia financiera: está escrita en 10 años de imágenes satelitales de su parcela. Nosotros la leemos." |
| **Prensa / público** | "Puntaje de crédito hecho desde el espacio para quien nunca tuvo cuenta de banco." |

## 3.3 La frase que cierra la venta

> *"Nosotros no le pedimos que confíe en el campesino. Le pedimos que confíe en 10 años de evidencia satelital de que ese campesino sí siembra."*

---

# 4. IMÁGENES SATELITALES — DE DÓNDE SE SACAN LEGALMENTE

Esta es la mejor noticia del proyecto: **la materia prima es gratis y legal.**

## 4.1 Fuentes recomendadas (por orden de uso)

### ✅ FUENTE PRINCIPAL — Copernicus Sentinel-2 (Unión Europea / ESA)

| | |
|---|---|
| **Qué es** | Constelación europea, imagen óptica de **10 metros** de resolución, revisita cada **5 días** |
| **Cobertura temporal** | Desde **2015** — más de 10 años sobre Colombia ✅ |
| **Licencia** | **Libre, completa y abierta.** Permite reproducción, distribución, comunicación al público, adaptación, modificación y combinación con otros datos. **Sin restricción de uso comercial.** |
| **Costo** | $0 |
| **Cómo se accede** | Copernicus Data Space Ecosystem (`dataspace.copernicus.eu`), API abierta |
| **Obligación** | Solo atribución: citar "Contiene datos Copernicus Sentinel modificados [año]" |

**Esta es la fuente de SEEDLLITE.** Resolución de 10m es suficiente para calcular NDVI (vigor vegetal) en predios desde ~0,5 hectáreas.

### ✅ FUENTE SECUNDARIA — Landsat (USGS / NASA, EE.UU.)

| | |
|---|---|
| **Qué es** | 30 metros de resolución, revisita 16 días |
| **Cobertura temporal** | **Desde 1972.** Más de 50 años. |
| **Licencia** | **Dominio público.** Prácticamente sin restricciones de uso. |
| **Costo** | $0 |
| **Para qué sirve en SEEDLLITE** | Reconstruir historia de uso del suelo **más allá de 2015** — para un predio con 30 años de historia agrícola, esto es oro |

### ⚠️ FUENTE DE ALTA RESOLUCIÓN — Planet / NICFI

| | |
|---|---|
| **Qué es** | Mosaicos de ~4,7 metros de resolución sobre todo el trópico (30°N a 30°S — Colombia está adentro), financiados por el gobierno de Noruega |
| **Licencia** | Gratis para cualquier usuario, **incluidas entidades comerciales — PERO únicamente para el "Propósito NICFI"** (reducir deforestación tropical), **no con ánimo de lucro** |
| **⚠️ Implicación legal para SEEDLLITE** | **NO podemos usar NICFI para el producto comercial de scoring crediticio.** Sería violación de licencia. |
| **Uso válido** | Solo el componente ambiental/anti-deforestación, y aun así hay que leer la licencia con lupa |

> 🔴 **Decisión de arquitectura: SEEDLLITE se construye sobre Sentinel-2 + Landsat.** Ambas permiten uso comercial sin restricción. NICFI queda fuera del producto de crédito. Esto se dice explícitamente en el pitch — demuestra rigor y ningún otro equipo lo va a mencionar.

## 4.2 Datos colombianos complementarios (todos abiertos)

| Fuente | Qué aporta |
|---|---|
| **IDEAM** | Series históricas de clima, precipitación, alertas — el dato oficial de riesgo climático |
| **IGAC** | Cartografía catastral, uso y vocación del suelo, geoportal de datos abiertos |
| **DANE — Censo Nacional Agropecuario** | Estructura de la producción, tamaño de UPA |
| **UPRA** | Aptitud del suelo por cultivo — clave para validar si lo que siembra tiene sentido agronómico |
| **datos.gov.co** | Portal de datos abiertos del Estado |

## 4.3 Qué hay que hacer para obtenerlas (el procedimiento real)

**Sentinel-2 — 3 pasos, gratis, sin contrato:**
1. Crear cuenta gratuita en Copernicus Data Space Ecosystem
2. Generar credenciales de API (OAuth)
3. Consultar por coordenadas + rango de fechas → descarga de bandas

**Landsat — 2 pasos:**
1. Cuenta en USGS EarthExplorer
2. Descarga directa o vía API

**Para producción a escala** (fuera del hackathon), las opciones profesionales son **Google Earth Engine** (procesamiento en la nube, licencia comercial requerida para uso empresarial), **AWS Open Data** o **Microsoft Planetary Computer** — los tres alojan Sentinel y Landsat con sus licencias abiertas intactas.

## 4.4 Lo que hay que decir en el pitch (importa)

> "Toda nuestra materia prima es de licencia abierta con uso comercial permitido: Copernicus Sentinel-2 de la Unión Europea y Landsat del USGS en dominio público. No hay un solo dato en SEEDLLITE cuya cadena de derechos no podamos documentar. Descartamos deliberadamente los mosaicos NICFI, de mayor resolución, porque su licencia prohíbe el uso lucrativo."

---

# 5. CRÉDITO AGRÍCOLA EN COLOMBIA — CRITERIOS, CONDICIONES Y ALIADOS

## 5.1 Cómo funciona el sistema (arquitectura institucional)

```
MinAgricultura  →  define política
      ↓
   FINAGRO      →  banco de 2º piso: pone los recursos y las condiciones
      ↓                        ↓
 Banco Agrario           FAG (garantía hasta 80%)
 Bancos / Coop. /
 Microfinancieras        →  desembolsan al productor
      ↓
   PRODUCTOR
```

**SEEDLLITE se inserta aquí:** entre el intermediario financiero y el productor, como capa de evaluación.

## 5.2 Clasificación del productor (define todo lo demás)

| Categoría | Criterio | Tope de crédito |
|---|---|---|
| **Pequeño productor** | Activos totales ≤ **284 SMMLV** (incluyendo los del cónyuge), **y** al menos 75% de activos invertidos en el sector agropecuario **o** ≥ 2/3 de sus ingresos vienen de la actividad agropecuaria | Hasta 70% de sus activos (≈198,8 SMMLV) |
| **Mediano productor** | Activos totales ≤ **5.000 SMMLV** | Según línea |
| **Gran productor** | Por encima de eso | Según línea |

*La definición de pequeño productor se actualizó recientemente, duplicando el umbral de activos (de ~$93M a ~$183M COP en su momento). **Verificar el SMMLV y el tope vigente a agosto de 2026 en el Manual de Servicios FINAGRO** — va por versión 26.21 (abril 2026).*

## 5.3 Condiciones financieras vigentes

- **Tasa pequeño productor:** hasta **IBR + 6,7%** nominal
- **Desde el 1 de julio de 2026:** para pequeño productor y pequeño de ingresos bajos que **ingresan por primera vez** al Sistema Nacional de Crédito Agropecuario, la tasa techo sube hasta **+200 puntos básicos** sobre la tasa techo *(este dato hay que verificarlo directo en FINAGRO — es reciente)*
- **Garantía FAG:** hasta **80%** para pequeño productor; **100%** para desplazados, víctimas, reinsertados y desarrollo alternativo; **50%** para gran productor. Comisión anual **1,5% a 4,5%**

## 5.4 Requisitos documentales actuales (lo que hoy se le pide al campesino)

- Fotocopia del documento de identidad del solicitante, codeudor, deudor solidario o avalista
- **Balance con fecha no mayor a 90 días** respecto del diligenciamiento del formulario de vinculación
- Formulario de vinculación de cliente y solicitud de productos
- Certificaciones según actividad: **BPA** (Buenas Prácticas Agropecuarias, ICA), **BPG** (Buenas Prácticas Ganaderas, ICA), **GlobalGAP**, **Rainforest Alliance** y otras certificaciones ambientales vigentes
- Descripción del proyecto productivo (plan de inversión)

> 💡 **El insight comercial:** fíjate que le piden un **balance financiero** a un campesino. Ese requisito, solo, excluye a cientos de miles de personas. **El score satelital de SEEDLLITE es exactamente el sustituto de ese balance.**

## 5.5 Los criterios que SEEDLLITE evalúa (el modelo)

### Dimensión A — Existencia y verificación del predio (peso ~20%)
| Variable | Fuente | Qué prueba |
|---|---|---|
| El polígono declarado existe y es agrícola | Sentinel-2 + IGAC | Que no es un predio fantasma |
| Área real cultivada vs. declarada | Sentinel-2 | Detecta sobredeclaración |
| Coincidencia catastral | IGAC | Vínculo con la tenencia |

### Dimensión B — Historial productivo (peso ~35%) ← **el corazón**
| Variable | Fuente | Qué prueba |
|---|---|---|
| **Serie NDVI de 10 años** (índice de vigor vegetal) | Sentinel-2 (2015→) + Landsat (histórico previo) | Que efectivamente ha sembrado |
| **Ciclos de cosecha completados** | Serie NDVI | Que **termina** lo que empieza — el mejor predictor de repago |
| Rendimiento estimado vs. par regional | NDVI + UPRA | Si es buen o mal productor comparado con su vecindario |
| Consistencia interanual | Serie histórica | Volatilidad = riesgo |

### Dimensión C — Riesgo climático prospectivo (peso ~25%)
| Variable | Fuente |
|---|---|
| Exposición histórica a sequía / inundación | IDEAM + serie satelital |
| Comportamiento en el último evento ENSO (El Niño/La Niña) | Serie NDVI + IDEAM |
| Aptitud del suelo para el cultivo declarado | UPRA |
| Pronóstico estacional | IDEAM |

### Dimensión D — Coherencia agronómica y del plan (peso ~20%)
| Variable | Fuente |
|---|---|
| ¿El cultivo declarado corresponde a lo que se ve? | Clasificación satelital |
| ¿El monto pedido es proporcional al área real? | Cruce área × costo/ha |
| ¿El calendario del plan coincide con el ciclo observado? | Serie NDVI |

### 🔑 La salida del modelo — y aquí está la IA como núcleo

SEEDLLITE **no** escupe un número opaco. Genera un **memorando de crédito explicable**:

```
PREDIO:            Vereda El Carmen, Santander · 3,2 ha
PRODUCTOR:         Pequeño productor (art. FINAGRO)
PUNTAJE SEEDLLITE:      720 / 1000  ·  Riesgo MEDIO-BAJO
MONTO SUGERIDO:    $8.400.000 COP
LÍNEA APLICABLE:   FINAGRO capital de trabajo · pequeño productor
GARANTÍA:          FAG 80%

EVIDENCIA:
✓ 9 ciclos de cosecha completos detectados entre 2016 y 2025
✓ NDVI pico promedio 0,78 — percentil 71 de su vereda
✓ Sobrevivió El Niño 2023-24 con caída de vigor de solo 18%
  (promedio regional: 34%) → resiliencia superior al par
⚠ Área sembrada real 2,8 ha vs. 3,2 ha declaradas (-12%)
  → ajustar monto a la baja
⚠ Aptitud UPRA del suelo para el cultivo declarado: MEDIA

RECOMENDACIÓN: APROBAR con monto ajustado y desembolso en
dos tramos, condicionado a verificación satelital de siembra
antes del segundo desembolso.
```

**Esto es lo que un comité de crédito necesita y lo que la regulación exige: decisiones explicables.** Y es exactamente lo que un modelo de lenguaje hace bien. La IA no es decoración — es el órgano que convierte una serie de números satelitales en un dictamen que un banco puede firmar.

## 5.6 Aliados para evaluar y validar

| Aliado | Rol | Prioridad |
|---|---|---|
| **FINAGRO** | Validación metodológica + acceso al sistema | 🔴 Crítico |
| **Banco Agrario** | Piloto de colocación | 🔴 Crítico |
| **Bancamía / Crezcamos / Contactar** | Piloto rápido, ciclo corto de decisión | 🟢 Empezar aquí |
| **IDEAM** | Convenio de datos climáticos | 🟡 Medio |
| **AGROSAVIA** | Validación agronómica del modelo (que el NDVI sí prediga rendimiento por cultivo) | 🔴 Crítico para credibilidad |
| **UPRA** | Aptitud del suelo | 🟡 Medio |
| **CIAT / Alianza Bioversity (Palmira)** | Investigación agrícola de clase mundial, en Colombia | 🟢 Alto valor reputacional |
| **Federaciones (Fedecafé, Fedearroz, Fedepapa)** | Acceso a base de productores + datos de rendimiento reales | 🔴 Canal de distribución |
| **Banca de las Oportunidades** | Programa estatal de inclusión financiera | 🟡 Medio |

> 💡 **Fedecafé merece un párrafo aparte:** tiene ~540.000 caficultores registrados con cédula cafetera, historial de entregas y georreferenciación. Es el dataset de validación más valioso del país. Si SEEDLLITE consigue un convenio con la Federación, tiene *ground truth* que nadie más puede comprar.

---

# 6. ESTRUCTURA LEGAL DEL RECAUDO — CAPTACIÓN ILEGAL Y TOKENIZACIÓN INTERNACIONAL

Esta sección es la que te va a diferenciar del resto de la sala. Nadie en un hackathon estructura esto.

## 6.1 Primero: qué es captación ilegal en Colombia (el riesgo)

**Marco:** Decreto 1981 de 1988 (define la conducta) + **artículo 316 del Código Penal** (Ley 599 de 2000) — *captación masiva y habitual de dineros*.

Hay captación masiva cuando se cumple **cualquiera** de estos criterios — **son alternativos, no acumulativos**:

| # | Criterio |
|---|---|
| **1** | Tener obligaciones con **más de 20 personas**, o haber suscrito **más de 50 contratos** de esa naturaleza |
| **2** | Que el valor total del dinero recibido **supere el 50% del patrimonio líquido** de quien lo recibe |
| **3** | Que las operaciones provengan de **oferta pública o difusión colectiva dirigida a personas indeterminadas** — publicidad, redes sociales, volantes, mensajería masiva |

**Penas:**
- Art. 316: prisión por desarrollar, promover, patrocinar, inducir, financiar, colaborar o realizar cualquier acto para captar dinero del público de forma masiva y habitual **sin autorización previa**
- **Agravante de hasta 1/4 más** si se usaron redes sociales u otros medios de difusión colectiva
- **Art. 316A:** si además no se reintegra el dinero → **96 a 180 meses (8 a 15 años)** y multa de 133,33 a 15.000 SMMLV

> 🔴 **Traducción:** cualquier esquema donde SEEDLLITE recoja plata de colombianos por internet prometiendo rendimiento por financiar campesinos **es delito**, salvo que se encuadre en una de las estructuras autorizadas de abajo. Y el criterio #3 se activa con un solo post en Instagram.

## 6.2 Las cinco rutas legales, de menor a mayor complejidad

### 🟢 RUTA 0 — No recaudar nada (SaaS puro) ← **AQUÍ EMPEZAMOS**
SEEDLLITE vende software. El banco cobra el crédito, SEEDLLITE cobra por consulta.
**Captación: imposible.** Riesgo regulatorio: cero.
*Esta es la ruta del hackathon y de los primeros 18 meses.*

### 🟢 RUTA 1 — Originación para terceros
SEEDLLITE origina y monitorea; **el desembolso lo hace un establecimiento de crédito vigilado por la SFC**. SEEDLLITE cobra comisión de originación.
**No hay captación** porque SEEDLLITE nunca toca el dinero del público.

### 🟡 RUTA 2 — Financiación colaborativa regulada (crowdfunding)
**Marco:** Decreto 1357 de 2018, modificado por el Decreto 1235 de 2020, incorporados al Decreto 2555 de 2010.

- Es la actividad de entidades **autorizadas por la Superintendencia Financiera** que, mediante infraestructura electrónica, ponen en contacto a una pluralidad de aportantes con receptores que solicitan financiación para un **proyecto productivo**
- Solo pueden hacerlo: **sociedades anónimas cuyo objeto exclusivo sea la financiación colaborativa**, las **bolsas de valores**, y los sistemas de negociación o registro de valores
- **Límite al aportante no calificado:** hasta el **20%** de su patrimonio o ingresos anuales. El inversionista calificado no tiene límite
- El Decreto 1235 de 2020 amplió los montos máximos de financiación

**Dos caminos aquí:**
- **(a) Rápido:** aliarse con una plataforma ya autorizada — **a2censo** (de la Bolsa de Valores de Colombia) o **Agrapp**. SEEDLLITE pone el motor de scoring; ellos ponen la licencia.
- **(b) Lento:** constituir la propia Sociedad de Financiación Colaborativa. Capital mínimo, licencia SFC, meses de trámite.

> ✅ **Recomendación: camino (a).** Ser el motor de riesgo de una plataforma licenciada es más rápido, más barato y estratégicamente mejor.

### 🟡 RUTA 3 — Vehículo fiduciario / fondo de capital privado
Un **patrimonio autónomo** administrado por una **sociedad fiduciaria vigilada** compra la cartera originada; los inversionistas suscriben derechos fiduciarios. O un **Fondo de Capital Privado** administrado por una sociedad administradora, colocado **solo a inversionistas profesionales**.

**No es captación** porque (i) hay un vigilado administrando y (ii) no hay oferta a público indeterminado.

### 🔵 RUTA 4 — TOKENIZACIÓN INTERNACIONAL ← *la parte que te interesa*

---

## 6.3 LA ESTRUCTURA DE TOKENIZACIÓN — diseñada para no ser captación

### El error que comete todo el mundo

La intuición natural es: *"emitimos un token, lo vendemos por internet, la gente compra, financiamos campesinos."*

**Eso es, casi con certeza, captación masiva ilegal + oferta pública de valores no autorizada.** Porque:
- Se ofrece a personas indeterminadas → criterio #3 del Decreto 1981/1988 ✔️
- Habrá más de 20 personas → criterio #1 ✔️
- El token representa un derecho económico negociable emitido en serie → es un **valor** bajo la **Ley 964 de 2005**, y su oferta al público requiere inscripción en el RNVE ante la SFC

### El giro que la vuelve legal: invertir el sentido del flujo

> **No tokenizamos para captar dinero EN Colombia.**
> **Tokenizamos AFUERA para traer capital A Colombia por la vía cambiaria formal.**

Esa inversión de sentido cambia el régimen aplicable por completo — y además es mejor negocio, porque el capital entra en dólares.

### Arquitectura de la estructura

```
┌─────────────────────────────────────────────────────────────┐
│  NIVEL 1 · OFFSHORE — donde vive el token                   │
│                                                             │
│  SEEDLLITE Capital SPV (Cayman / Delaware / Luxemburgo)          │
│  · Emite NOTES respaldadas por la cartera colombiana        │
│  · El TOKEN = representación digital de esa nota            │
│  · Colocación: Reg S (fuera de EE.UU.) y/o                  │
│    Reg D 506(c) (accredited investors en EE.UU.)            │
│  · Token PERMISSIONED: whitelist, no circula a cualquiera   │
│  · 🔒 GEOBLOQUEO Y PROHIBICIÓN EXPRESA a residentes         │
│    colombianos — declaración en KYC + bloqueo por IP        │
└──────────────────────────┬──────────────────────────────────┘
                           │  El dinero entra a Colombia como
                           │  INVERSIÓN EXTRANJERA / CRÉDITO
                           │  EXTERNO, canalizado por el mercado
                           │  cambiario y REGISTRADO ante el
                           │  BANCO DE LA REPÚBLICA
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  NIVEL 2 · COLOMBIA — donde vive la cartera                 │
│                                                             │
│  Patrimonio autónomo administrado por sociedad fiduciaria   │
│  vigilada por la SFC                                        │
│  · Recibe los recursos externos                             │
│  · Compra / fondea la cartera originada                     │
│  · SEEDLLITE S.A.S. actúa como ORIGINADOR y ADMINISTRADOR        │
│    de la cartera — NUNCA como receptor del dinero público   │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
                    PRODUCTOR AGRÍCOLA
```

### Por qué esta estructura NO es captación ilegal — los cinco blindajes

| # | Blindaje | Fundamento |
|---|---|---|
| **1** | **Ring-fence territorial.** Ninguna oferta, promoción ni venta a residentes colombianos. Geobloqueo + declaración en KYC + prohibición contractual de reventa a colombianos. | No hay "público" colombiano → no se configura la oferta pública del criterio #3 ni la captación del art. 316 |
| **2** | **Los recursos entran por el canal cambiario formal**, con declaración de cambio y registro ante el Banco de la República (Régimen de Inversiones Internacionales / endeudamiento externo). | El dinero es *inversión extranjera registrada*, figura expresamente regulada — no dinero captado |
| **3** | **SEEDLLITE S.A.S. nunca recibe dinero del público.** Lo recibe un patrimonio autónomo administrado por una fiduciaria vigilada por la SFC. | La actividad de administración la ejerce un vigilado autorizado |
| **4** | **Colocación privada, a inversionistas determinados y calificados.** Nada de difusión masiva ni redes sociales. Reg S / Reg D 506(c). | Sin difusión colectiva a indeterminados no hay oferta pública |
| **5** | **El token es deuda senior sobre un pool diversificado, sin rentabilidad fija garantizada.** Retorno variable atado al desempeño real de la cartera. | La promesa de rentabilidad fija es el marcador clásico de pirámide; su ausencia es prueba de sustancia económica real |

### 🚩 La lista de banderas rojas — lo que JAMÁS puede hacer SEEDLLITE

| ❌ Prohibido | Por qué |
|---|---|
| Prometer rentabilidad **fija garantizada** | Marcador #1 de esquema de captación |
| Ofrecer el token a colombianos por redes sociales | Activa el criterio #3 del Decreto 1981/88 + agravante penal de 1/4 |
| Pagar **comisiones por referidos** (multinivel) | Firma inconfundible de pirámide |
| Que SEEDLLITE S.A.S. reciba dinero directo de inversionistas en su cuenta | Configura captación directa |
| Retorno sin subyacente identificable y auditable | Sin activo real, es captación |
| Traer el dinero por fuera del mercado cambiario | Infracción cambiaria + señal de LA/FT |
| Prometer liquidez inmediata del token | Genera obligación de reembolso a la vista = actividad financiera |

### Cumplimiento obligatorio (no negociable)

- **SARLAFT / prevención de LA/FT** — Circular Básica Jurídica de la SFC, reportes a la **UIAF**
- **Screening OFAC / listas restrictivas** para todo inversionista
- **KYC/AML reforzado** — el sector cripto es de alto riesgo por definición
- **Régimen cambiario** — Resolución Externa 1 de 2018 de la Junta Directiva del Banco de la República: declaración de cambio, canalización obligatoria, registro
- **Contabilidad y auditoría** del patrimonio autónomo por revisor fiscal
- **Reporte de la cartera** a centrales de riesgo (Habeas Data, Ley 1266 de 2008)

### Estado regulatorio de la tokenización en Colombia (a agosto de 2026)

- **No existe regulación específica de tokenización de activos financieros** en Colombia. La materia se rige por analogía con las normas de **valores** (Ley 964 de 2005, Decreto 2555 de 2010) y de **financiación colaborativa**
- Los tokens que representan valores (acciones, deuda, participaciones en fondos) quedan sujetos al Decreto 2555 de 2010 y a supervisión de la SFC
- Matiz importante: aunque un instrumento reúna las características esenciales de un valor, **se ha sostenido que debe mediar un pronunciamiento de la Superintendencia Financiera que lo catalogue como tal** para que se aplique el régimen respectivo. *(Zona gris — se navega con concepto previo, no con suposiciones.)*
- La SFC ha operado **"la Arenera"**, su espacio controlado de prueba (sandbox regulatorio), para pilotos de innovación financiera
- **Ruta recomendada:** solicitar **concepto previo a la SFC** sobre la naturaleza del instrumento antes de emitir. Es gratis, tarda, y convierte una zona gris en una certeza documentada.

> ⚖️ **Advertencia profesional:** esta sección es una arquitectura de diseño, no un concepto jurídico. Antes de emitir un solo token hay que contratar concepto de una firma con práctica de mercado de capitales y derecho cambiario, y solicitar pronunciamiento de la SFC. Para el hackathon, esto es exactamente el nivel de rigor que hay que mostrar — y es más de lo que va a mostrar cualquier otro equipo.

### 🎯 Cómo se dice esto en 15 segundos de video

> *"Sabemos que un modelo así se rompe por el lado legal. Por eso SEEDLLITE arranca sin tocar un peso del público: vendemos software a bancos vigilados. Y cuando escalemos a fondeo internacional, la estructura ya está diseñada — emisión offshore bajo Reg S, prohibida a residentes colombianos, con el capital entrando por el mercado cambiario registrado ante el Banco de la República. No es captación: es inversión extranjera."*

---

# 7. EL MODELO DE NEGOCIO — ¿ES ESCALABLE DE VERDAD?

## 7.1 Las cinco líneas de ingreso, por fase

| Fase | Línea | Modelo | Margen |
|---|---|---|---|
| **1 · Meses 0-18** | **Score-as-a-Service** | Pago por consulta al banco/microfinanciera. Referencia: USD $2–6 por evaluación | **>85%** |
| **2 · Meses 6-24** | **Monitoreo de cartera** | Suscripción mensual por crédito vigente. Vigilancia satelital continua: alerta si el predio no se sembró o si el cultivo colapsa | **>85%** · recurrente y pegajoso |
| **3 · Meses 12-30** | **Comisión de originación** | 1–3% del monto originado a través de SEEDLLITE | Alto |
| **4 · Meses 18-36** | **Riesgo climático para aseguradoras** | Índice paramétrico licenciado a aseguradoras y reaseguro | **>90%** |
| **5 · Año 3+** | **Fondeo propio / tokenizado** | Spread sobre cartera propia (Ruta 4) | Menor margen, mucho volumen |

> **La línea 2 es la joya de la corona y casi nadie la ve.** Cobrar por *originar* es un ingreso de una sola vez. Cobrar por *vigilar* el crédito todos los meses hasta que se pague es ingreso recurrente — y el banco no te puede sacar sin quedarse ciego sobre su propia cartera.

## 7.2 Por qué escala (la mecánica)

**a) El costo marginal es prácticamente cero.**
Sentinel-2 y Landsat son gratis. Evaluar el predio número 1.000.000 cuesta casi lo mismo que evaluar el número 1: unos centavos de cómputo. Es economía de software pura sobre un problema físico.

**b) El volante de datos (esto es el foso defensivo).**

```
Más créditos evaluados
        ↓
Más resultados de repago observados (¿pagó / no pagó?)
        ↓
El modelo aprende qué firma satelital predice mora
        ↓
Mejor score → menos pérdida esperada para el banco
        ↓
El banco coloca más y paga más por consulta
        ↓
Más créditos evaluados ⟳
```

**El activo defendible no son las imágenes** — esas las tiene cualquiera, son gratis. **El activo es la base de resultados de repago vinculados a firmas satelitales.** Eso no se compra en ninguna parte y solo se acumula operando. Un competidor con más plata que nosotros tendría que esperar tres ciclos de cosecha para tener lo que nosotros tendríamos.

**c) El motor es geográficamente portátil.**
Sentinel-2 cubre el planeta entero con la misma licencia abierta. Expandir a Perú, Ecuador, Guatemala o México no requiere reentrenar desde cero: requiere calibrar. Lo único local es la regulación financiera y los aliados.

**d) Los clientes tienen concentración alta.**
No hay que vender a un millón de campesinos. Hay que venderle a ~30 instituciones financieras en Colombia. Ciclo de venta B2B enterprise: largo, pero cada contrato vale mucho y no se va.

## 7.3 Ruta de expansión

```
Fase 1  Colombia · un cultivo (café o arroz) · 2-3 microfinancieras
Fase 2  Colombia · multicultivo · Banco Agrario + banca comercial
Fase 3  Colombia · seguro paramétrico (nueva línea, mismo dato)
Fase 4  Región Andina (Perú, Ecuador) · mismo motor, nueva regulación
Fase 5  Fondeo internacional tokenizado · cartera propia
```

## 7.4 Evaluación honesta: ¿es de verdad tamaño unicornio?

**A favor:**
- ✅ Mercado enorme y desatendido: <5% de hogares rurales de LatAm con crédito formal
- ✅ Capital ya existe (FINAGRO) — no hay que crear el mercado, hay que destrabarlo
- ✅ Garantía estatal del 80% baja el riesgo del cliente drásticamente
- ✅ Márgenes de software sobre un problema de infraestructura física
- ✅ Foso de datos real y acumulativo
- ✅ Comparables que ya levantaron: Apollo US$70M, Agrolend +US$100M
- ✅ Cero competencia directa en Colombia

**En contra (hay que decirlo):**
- ⚠️ Venta B2B a bancos = ciclos de 6-18 meses. Es un negocio lento al principio.
- ⚠️ El score tiene que **probarse** contra repago real. Eso toma mínimo 2-3 ciclos de cosecha. No hay atajo.
- ⚠️ Riesgo de que un banco grande lo construya internamente (mitigación: velocidad y el foso de datos)
- ⚠️ Precedente de fracaso: **Gro Intelligence** (agri-data, US$85M levantados) **cerró en 2024**. Vender datos sin estar pegado a una decisión con plata de por medio no funciona. **Por eso SEEDLLITE vende una decisión de crédito, no un dashboard.**

**Veredicto:** no es un unicornio de crecimiento explosivo tipo consumo. Es un **negocio de infraestructura financiera de crecimiento compuesto** — más lento al principio, mucho más difícil de matar después. El techo realista en LatAm es de cientos de millones de dólares de valoración, con vía a más si captura el seguro paramétrico. **Es una compañía grande de verdad, y el jurado lo va a reconocer.**

---

# 8. QUÉ CONSTRUIMOS EN LAS PRÓXIMAS HORAS

> ⏰ Deadline: **domingo 16 de agosto, 09:00**. Video de máx. 1 minuto + código al repositorio oficial.

## 8.1 Alcance del MVP — lo que SÍ

1. **Una pantalla con mapa de Colombia.** Seleccionas un predio (3–5 predios reales precargados)
2. **Serie NDVI histórica** de ese predio, graficada — con datos reales de Sentinel-2 precargados
3. **La IA analiza y dictamina** — Claude recibe la serie temporal + contexto climático y produce el **memorando de crédito explicable** de la sección 5.5
4. **Salida:** puntaje, monto sugerido, línea FINAGRO aplicable, cobertura FAG, y las alertas
5. **Un panel de riesgo climático** con el comportamiento en el último evento El Niño

## 8.2 Lo que NO — y esto es tan importante como lo anterior

❌ Descarga de imágenes satelitales en vivo (se cae y quema la noche)
❌ Login, base de datos, usuarios
❌ App móvil
❌ Cualquier cosa relacionada con tokens o pagos — **eso va en el README y en el pitch, NO en el código**
❌ Entrenar un modelo de ML propio — la IA aquí es el razonamiento sobre la serie, no un clasificador entrenado en 19 horas

## 8.3 Dónde vive todo lo de este documento

En el **README del repositorio** y en **8 segundos del video**. El jurado califica *viabilidad y escala* (15 pts) y este documento los gana solo. Pero **ni un minuto de construcción se gasta en la estructura legal.**

---

# 9. FUENTES

**Crédito agropecuario Colombia**
- [Manual de Servicios FINAGRO v.26.21 (abril 2026)](https://www.finagro.com.co/sites/default/files/documents/2026-04/Manual%20de%20servicios%20V.%20%2026.21%20(16-04-2026).pdf)
- [Requisitos crédito FINAGRO pequeño productor — Banco Agrario (2026)](https://www.bancoagrario.gov.co/system/files/2026-01/gc-ec-ht-044_2.2_requisitos_para_credito_con_recursos_finagro_pequeno_productor_agropecuario_joven_rural_mujer_rural_bajos_ingresos_2.pdf)
- [Fondo Agropecuario de Garantías (FAG) — MinAgricultura](https://www.minagricultura.gov.co/tramites-servicios/credito-agropecuario/Paginas/v1/Fondo-Agropecuario-de-Garant%C3%ADas-FAG.aspx)
- [Gobierno respalda créditos de pequeños productores con el 80% de la garantía — FINAGRO](https://www.finagro.com.co/noticias/gobierno-respalda-creditos-pequenos-productores-80-garantia)
- [MinAgricultura actualiza la definición del pequeño productor — FINAGRO](https://www.finagro.com.co/noticias/minagricultura-actualiza-definicion-del-pequeno-productor)

**Imágenes satelitales y licencias**
- [Copernicus Sentinel data licence — ESA](https://open.esa.int/copernicus-sentinel-satellite-imagery-under-open-licence/)
- [Términos y condiciones — Copernicus Data Space Ecosystem](https://dataspace.copernicus.eu/terms-and-conditions)
- [Programa de datos satelitales NICFI — Guía de usuario (español)](https://assets.planet.com/docs/NICFI_User_Guide_v4_ES.pdf)
- [NICFI — Preguntas frecuentes (español)](https://assets.planet.com/docs/NICFI_GeneralFAQs_SPAN.pdf)
- [Fuentes de imágenes satelitales gratuitas 2026 — EOS](https://eos.com/blog/free-satellite-imagery-sources/)

**Captación ilegal y regulación financiera**
- [El delito de captación masiva y habitual de dineros (Art. 316 CP) — Nuevo Foro Penal, EAFIT](https://publicaciones.eafit.edu.co/index.php/nuevo-foro-penal/article/view/4758/pdf)
- [De las pirámides al delito del ejercicio ilegal de la actividad financiera — SUIN-Juriscol](https://www.suin-juriscol.gov.co/biblioteca/DboRegistros/DetailsBasic/De%20las%20piramides%20al%20delito.pdf)
- [Decreto 1357 de 2018 — Función Pública](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=87770)
- [Reglamentación de la actividad de financiación colaborativa — URF](https://www.urf.gov.co/documents/d/guest/20180731-dt-crowdfunding-1357_2018?download=true)
- [Ley 964 de 2005 — Función Pública](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=22412)
- [¿El negocio de la tokenización de activos puede desarrollarse legalmente en Colombia? — Ámbito Jurídico](https://www.ambitojuridico.com/noticias/columnista-online/el-negocio-de-la-tokenizacion-de-activos-puede-desarrollarse-legalmente)
- [Nuevos lineamientos para crowdfunding (Decreto 1235 de 2020) — La República](https://www.larepublica.co/finanzas/el-gobierno-expide-decreto-que-define-los-lineamientos-para-el-crowdfunding-en-el-pais-3061181)

**Competencia y mercado**
- [Apollo Agriculture — perfil y financiación (Tracxn)](https://tracxn.com/d/companies/apollo-agriculture/__FimqHUVzwrjz9g8-T6wX0ho-St1OlxbZ90yv3dT5xWU)
- [AI-driven smallholder farmer lending in Africa: Apollo Agriculture — GSMA](https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/programme/agritech/ai-driven-smallholder-farmer-lending-in-africa-insights-from-apollo-agriculture/)
- [SatSure — inteligencia satelital para agricultura (Intellecap)](https://www.intellecap.com/startup-story/how-satsure-is-revolutionising-agriculture-with-satellite-intelligence-data-analytics-and-predictive-insights/)
- [Agrifoodtech y climate tech en LatAm, primer semestre 2025 — AgFunderNews](https://agfundernews.com/guest-article-what-the-first-half-of-2025-tells-us-about-agrifoodtech-climate-tech-in-latin-america)
- [Agrolend levanta Serie B — Tekios](https://tekiosmag.com/2022/11/10/agrolend-la-fintech-brasilena-para-pequenos-y-medianos-agricultores-levanta-us28-millones-en-ronda-serie-b/)
- [Verqor levanta US$7,5M — Contxto](https://contxto.com/es/fondeo/verqor-levanta-usd7-5-millones-para-digitalizar-sector-agricola/)
- [Agrapp — plataforma colombiana](https://agrapp.co/)

---

*Documento de trabajo. Las cifras marcadas para verificar deben confirmarse contra fuente oficial antes de usarse en material público.*
