# MARCA SEEDLLITE

> La marca de una herramienta de riesgo crediticio, no de una startup. Va a estar en
> pantalla frente a un comité de banco, junto a un dictamen que alguien tiene que firmar.
> Todo lo que sigue está listo para copiar y pegar: SVG de una sola tinta, sin
> dependencias, sin CDN, sin `<style>` dentro del SVG, sin `@import` de fuentes.

---

## 1. Qué expresa el símbolo

Dos cosas, y son las dos que el motor realmente hace:

1. **La rejilla 4×4 de medición.** `scripts/medir_area.py` divide el polígono declarado en
   16 celdas y cuenta cuáles tienen actividad agrícola. Ese es el paso que rechaza a
   meta-cacao: declara 4 ha, la rejilla encuentra 0,5 con actividad; el resto es dosel de
   bosque. La rejilla no es decoración, es el instrumento.
2. **La serie NDVI.** 108 meses, 2017 a 2025, leídos sobre esa misma parcela. Es la
   dimensión que un balance con fecha no tiene: el tiempo.

El símbolo es la parcela vista desde arriba, con la rejilla encima y la serie corriendo
por dentro. Una lectura, no un logo agrícola. No hay hoja, no hay sol, no hay satélite
dibujado.

---

## 2. Geometría

Todo está construido sobre un `viewBox` de 32 unidades. Una unidad = 1 px cuando el
símbolo se renderiza a 32 px.

| Elemento | Coordenadas | Nota |
|---|---|---|
| Linde de la parcela | `x=4 y=4 w=24 h=24` | 24 u de lado, 4 u de aire por cada costado |
| Rejilla 4×4 | verticales en `x = 10, 16, 22`; horizontales en `y = 10, 16, 22` | celda = 6 u |
| Serie NDVI | `M4 16 L10 10 L16 22 L22 13 L28 16` | 4 tramos, 5 vértices |

**Los cinco vértices de la serie:**

| # | x | y | Qué es |
|---|---|---|---|
| 1 | 4 | 16 | Entra por el linde izquierdo, sobre la fila central |
| 2 | 10 | 10 | Primer pico. Nodo de rejilla |
| 3 | 16 | 22 | Valle. Nodo de rejilla, centro exacto de la parcela en x |
| 4 | 22 | 13 | Segundo pico, media celda por debajo del primero |
| 5 | 28 | 16 | Sale por el linde derecho, sobre la fila central |

Cuatro de los cinco vértices caen en nodos de la rejilla. **El cuarto no**: está a media
celda. Ese único desajuste hace tres cosas y por eso se queda:

- Rompe la lectura de letra. Con los dos picos a la misma altura el símbolo se lee como
  una "M", y una M gigante junto a la palabra SEEDLLITE es un error de marca.
- Es honesto con el dato: dos ciclos NDVI consecutivos nunca son iguales.
- Deja la entrada y la salida sobre la fila central (`y=16`), que es el eje óptico con el
  que se alinea el wordmark en el lockup.

**Pesos de trazo.** Tres niveles, una sola tinta. La jerarquía la da el grosor, no el color:

| Capa | Corte completo | Corte compacto |
|---|---|---|
| Rejilla | 1 u, `opacity 0.35` | no se dibuja |
| Linde | 1,5 u | 2 u |
| Serie | 2 u | 3 u |

**Uniones en inglete (`miter`), no redondeadas.** El sistema Industry es de esquina recta.
Verificado: el inglete más largo es el del vértice 2, con razón 1,71, muy por debajo del
`stroke-miterlimit` de 4, así que ningún pico se corta ni se dispara fuera del linde.

---

## 3. Símbolo

### 3.1 Corte completo · para 32 px y más

Rejilla visible. Es el símbolo de cabecera, de portada y de impresión.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"
     fill="none" stroke="currentColor" stroke-linejoin="miter"
     role="img" aria-label="SEEDLLITE">
  <!-- rejilla 4x4: las 16 celdas que el motor cuenta sobre el predio -->
  <g stroke-width="1" opacity="0.35">
    <path d="M10 4V28M16 4V28M22 4V28M4 10H28M4 16H28M4 22H28"/>
  </g>
  <!-- linde de la parcela -->
  <rect x="4" y="4" width="24" height="24" stroke-width="1.5"/>
  <!-- serie NDVI leida sobre esa parcela -->
  <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="2"/>
</svg>
```

### 3.2 Corte compacto · para 24 px y menos

Mismo linde, misma serie, mismos vértices. Se le quita la rejilla y se le sube el trazo.
El `viewBox` se recorta a `2 2 28 28` para que la parcela ocupe el 86 % del lienzo en vez
del 75 %: a 16 px cada píxel cuenta.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 28 28" width="16" height="16"
     fill="none" stroke="currentColor" stroke-linejoin="miter"
     role="img" aria-label="SEEDLLITE">
  <rect x="4" y="4" width="24" height="24" stroke-width="2"/>
  <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="3"/>
</svg>
```

**Por qué dos cortes.** A 16 px la celda de la rejilla mide 3 px y la línea 0,5 px: se
cierra en una mancha gris y el símbolo deja de leerse. El corte compacto no es otro
símbolo, es el mismo con la rejilla apagada. La silueta, las proporciones y los cinco
vértices son idénticos.

**Regla de corte:**

| Tamaño renderizado | Corte |
|---|---|
| ≥ 32 px | completo |
| ≤ 24 px | compacto |
| 25 a 31 px | compacto (no interpolar) |

**Accesibilidad.** El símbolo solo lleva `role="img" aria-label="SEEDLLITE"` cuando va
suelto. Dentro del lockup, donde el wordmark ya es texto vivo, va con `aria-hidden="true"`
para no leer la marca dos veces.

---

## 4. Wordmark

**SEEDLLITE**, siempre en versales, siempre como **texto vivo**, nunca trazado a curvas.
Trazarlo obligaría a versionar un SVG por tamaño y rompería la selección y la búsqueda en
página. Con texto vivo el costo es cero y el peso también.

```css
.marca {
  font-family: "Barlow Condensed", "Arial Narrow", "Barlow",
               ui-sans-serif, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-right: -0.05em;   /* mata el espacio de tracking sobrante tras la E final */
  line-height: 1;
  text-transform: none;    /* la cadena ya viene en versales; no se transforma */
}
```

Si el bloque de `TOKENS-FUSIONADOS.css` ya está en `assets/app.css`, la pila es el token
`var(--display)` y no hace falta escribirla. Hoy `assets/app.css` todavía no lo declara,
por eso arriba va literal.

**Tracking.** Una condensada en versales se cierra sin tracking, y SEEDLLITE tiene una
doble L que se empasta. Es la única variable que cambia con el tamaño:

| Tamaño del wordmark | `letter-spacing` |
|---|---|
| ≥ 32 px | 0,04 em |
| 20 a 31 px | 0,05 em |
| 14 a 19 px | 0,07 em |
| < 14 px | 0,09 em |

Nunca negativo. El `margin-right` negativo siempre iguala al tracking, con signo contrario.

**Relación símbolo / texto.** Una sola regla:

> **La altura de mayúscula del wordmark ocupa tres celdas de la rejilla (18 u).**

De ahí sale el número práctico, porque la altura de mayúscula de Barlow Condensed es
≈ 0,72 em:

```
font-size del wordmark = 18 / 0,72 = 25 u  →  0,78 × la altura del símbolo
```

| Altura del símbolo | `font-size` del wordmark |
|---|---|
| 24 px | 19 px |
| 32 px | 25 px |
| 48 px | 37 px |
| 64 px | 50 px |

La pila de respaldo no rompe esto: Arial Narrow tiene una altura de mayúscula de ≈ 0,716 em
frente a ≈ 0,72 em de Barlow Condensed, media décima de diferencia. Sí cambia el peso: como
Arial Narrow no trae un 600, el navegador resuelve a Arial Narrow Bold y el wordmark se ve
un punto más denso. Es aceptable y es la razón por la que el lockup se especifica por
altura de mayúscula y no por peso.

---

## 5. Lockup

### 5.1 Horizontal · cabecera

El símbolo va en acento, el wordmark en texto. Los dos heredan del tema por token, así que
el lockup cambia solo entre claro y oscuro sin duplicar marcado.

```html
<a class="lockup" href="./index.html" aria-label="SEEDLLITE">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"
       fill="none" stroke="currentColor" stroke-linejoin="miter" aria-hidden="true">
    <g stroke-width="1" opacity="0.35">
      <path d="M10 4V28M16 4V28M22 4V28M4 10H28M4 16H28M4 22H28"/>
    </g>
    <rect x="4" y="4" width="24" height="24" stroke-width="1.5"/>
    <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="2"/>
  </svg>
  <span class="lockup-nombre">SEEDLLITE</span>
</a>
```

```css
.lockup {
  display: inline-flex;
  align-items: center;
  gap: 4px;                 /* a simbolo de 32 px. El SVG ya aporta 4 u de aire propio,
                               asi que el hueco optico real queda en 8 px */
  color: var(--acento);     /* lo toma el simbolo por currentColor */
  text-decoration: none;
}
.lockup-nombre {
  color: var(--texto);
  font-family: "Barlow Condensed", "Arial Narrow", "Barlow",
               ui-sans-serif, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 25px;          /* 0,78 x 32 */
  letter-spacing: 0.05em;
  margin-right: -0.05em;
  line-height: 1;
}
```

**Hueco óptico entre símbolo y texto = 1/3 del lado de la parcela** (8 u de 24). Como el
`viewBox` ya lleva 4 u de aire a la derecha, el `gap` en CSS es la mitad: 4 px a símbolo de
32 px, 6 px a 48 px, 8 px a 64 px. La regla general es `gap = 0,125 × altura del símbolo`.

**Alineación vertical.** `align-items: center` da el resultado correcto: el bloque de
versales (18 u) queda centrado sobre la parcela (24 u), con 3 u de holgura arriba y abajo.
Quien lo reconstruya en un editor vectorial: la línea base del wordmark va 3 u por encima
del borde inferior de la parcela.

**Descriptor.** Cuando acompaña un descriptor (`Originación y monitoreo satelital de
crédito agropecuario`), este va en Barlow regular, `var(--texto-2)`, a 0,44 × el tamaño del
wordmark (11 px con el wordmark a 25 px), y **nunca dentro del lockup**: va a la derecha,
separado por un filete vertical de un pelo, o debajo alineado al borde izquierdo del
símbolo. El lockup son dos piezas, no tres.

### 5.2 Compacto · favicon, avatar, esquina de gráfica

Solo el símbolo en corte compacto, sin wordmark. Es la versión que va en el favicon, en la
marca de agua de una gráfica NDVI y en cualquier caja de menos de 120 px de ancho.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 28 28" width="24" height="24"
     fill="none" stroke="currentColor" stroke-linejoin="miter"
     role="img" aria-label="SEEDLLITE">
  <rect x="4" y="4" width="24" height="24" stroke-width="2"/>
  <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="3"/>
</svg>
```

---

## 6. Favicon

### 6.1 SVG

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 28 28" fill="none"
     stroke="#5980a6" stroke-linejoin="miter">
  <rect x="4" y="4" width="24" height="24" stroke-width="2"/>
  <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="3"/>
</svg>
```

**El favicon es la única pieza que no usa `currentColor`, y es a propósito.** Un favicon se
pinta fuera del documento: no hereda ningún token, y `currentColor` resolvería a negro,
que desaparece contra la barra de pestañas en modo oscuro. La regla del sistema, "sin
`<style>` dentro del SVG", cierra la otra salida (una `@media (prefers-color-scheme)`
interna). Queda una: fijar el acento, que es un tono medio y por eso funciona contra
cualquier cromo de navegador.

| `#5980a6` contra | Contraste |
|---|---|
| Cromo claro `#ffffff` | 4,15:1 |
| Fondo claro `#f2f2f3` | 3,71:1 |
| Cromo oscuro `#1d1f20` | 3,99:1 |
| Fondo oscuro `#0e1013` | 4,59:1 |

Los cuatro superan el 3:1 que WCAG 1.4.11 exige para un elemento gráfico no textual. Es
el único hex escrito a mano en toda la marca.

### 6.2 Data URI

Listo para pegar. Va inline, así que no pide red y no rompe el doble clic bajo `file://`.
Verificado: decodifica exactamente al SVG de arriba.

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='2 2 28 28' fill='none' stroke='%235980a6' stroke-linejoin='miter'%3E%3Crect x='4' y='4' width='24' height='24' stroke-width='2'/%3E%3Cpath d='M4 16L10 10L16 22L22 13L28 16' stroke-width='3'/%3E%3C/svg%3E">
```

273 caracteres. Las comillas internas son simples para poder vivir dentro del `href`; `<`,
`>` y `#` van percent-encoded (`%3C`, `%3E`, `%23`), que es lo mínimo que exigen los
navegadores.

---

## 7. Zona de protección y tamaño mínimo

**Zona de protección = una celda de la rejilla (6 u), medida desde el linde de la parcela.**
Ningún texto, filete, borde de tarjeta ni marca de registro `+` entra en esa banda.

El `viewBox` ya aporta 4 de esas 6 unidades. Faltan 2 por fuera:

```
margen adicional = 0,0625 × altura del símbolo
```

| Altura del símbolo | Margen adicional por lado |
|---|---|
| 32 px | 2 px |
| 48 px | 3 px |
| 64 px | 4 px |

**Tamaños mínimos:**

| Pieza | Pantalla | Impresión |
|---|---|---|
| Símbolo compacto | 16 px | 5 mm |
| Símbolo completo | 32 px | 10 mm |
| Lockup horizontal | símbolo 24 px + wordmark 19 px | símbolo 8 mm |

Por debajo del lockup mínimo se usa solo el símbolo compacto. Nunca se encoge el wordmark
por su cuenta para que quepa.

---

## 8. Color

| Contexto | Símbolo | Wordmark |
|---|---|---|
| Cabecera, tema claro | `var(--acento)` `#5980a6` | `var(--texto)` `#1d1f20` |
| Cabecera, tema oscuro | `var(--acento)` `#94bce3` | `var(--texto)` `#e7e9ec` |
| Una sola tinta | `currentColor` | `currentColor` |
| Sobre campo de acento | `#ffffff` | `#ffffff` |

El símbolo hereda por `currentColor`: basta con darle `color` al contenedor. No lleva
`fill` en ninguna capa, así que no hay nada que reventar al cambiar de tema.

El acento a `#5980a6` da 3,71:1 sobre el fondo claro. Alcanza de sobra para el símbolo,
que es cromo gráfico y solo necesita 3:1. **No alcanza para el wordmark** si alguien lo
pinta de acento a tamaño de párrafo: para eso está `var(--acento-texto)` `#416180`, a
5,78:1. En el lockup el wordmark va en `--texto` y el problema no aparece.

---

## 9. Usos prohibidos

1. **No rotar ni inclinar el símbolo.** La rejilla es una medición sobre el terreno; girada deja de serlo.
2. **No rellenar la parcela ni sus celdas.** El símbolo es un dibujo de línea, como toda tarjeta del sistema Industry.
3. **No suavizar la serie a curva.** Es una poligonal entre observaciones mensuales; una spline dibuja meses que no se midieron.
4. **No usar el corte completo por debajo de 32 px.** La rejilla se cierra y el símbolo se vuelve una mancha.
5. **No teñir el símbolo de `--favorable`, `--alerta` ni `--critico`.** Esos tres colores están atados a `evidencia[].tipo` del contrato de datos: un logo verde se lee como "aprobado".
6. **No poner el símbolo sobre foto, mapa ni imagen satelital.** Va sobre fondo plano, siempre.
7. **No añadir degradado, sombra, bisel ni glassmorphism.** El único objeto sólido del sistema es el botón primario.
8. **No escribir la marca de otra forma.** Es SEEDLLITE, con dos L y en versales. Ni Seedllite, ni SeedLite, ni SEEDLITE.
9. **No sustituir la condensada por otra** (Oswald, Roboto Condensed, Fira Sans Condensed) cuando Barlow Condensed no cargue. La pila de respaldo ya define el sustituto.
10. **No separar el lockup en dos líneas** ni apilar el símbolo sobre el wordmark. Solo existe la versión horizontal.

---

## 10. Bloque de previsualización

Autocontenido: sin CDN, sin `fetch`, sin módulos. Guardar como `.html` y abrir con doble
clic. Muestra el símbolo a 16, 24, 32 y 64 px sobre `#f2f2f3` y sobre `#0e1013`, con el
corte que le corresponde a cada tamaño, más el lockup y el favicon.

```html
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>SEEDLLITE · verificación de marca</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='2 2 28 28' fill='none' stroke='%235980a6' stroke-linejoin='miter'%3E%3Crect x='4' y='4' width='24' height='24' stroke-width='2'/%3E%3Cpath d='M4 16L10 10L16 22L22 13L28 16' stroke-width='3'/%3E%3C/svg%3E">
<style>
  body { margin: 0; font: 13px/1.45 "Barlow", ui-sans-serif, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  section { padding: 32px 36px; }
  .claro  { background: #f2f2f3; color: #1d1f20; }
  .oscuro { background: #0e1013; color: #e7e9ec; }
  .claro  .acento { color: #5980a6; }
  .oscuro .acento { color: #94bce3; }
  h2 { font-family: "Barlow Condensed", "Arial Narrow", sans-serif; font-weight: 600;
       font-size: 13px; letter-spacing: .12em; text-transform: uppercase;
       opacity: .55; margin: 0 0 20px; }
  .fila { display: flex; align-items: flex-end; gap: 40px; margin-bottom: 36px; }
  .pieza { margin: 0; text-align: center; }
  .pieza figcaption { margin-top: 10px; font-size: 10px; letter-spacing: .08em;
                      opacity: .55; white-space: nowrap;
                      font-variant-numeric: tabular-nums; }
  .lockup { display: inline-flex; align-items: center; gap: 4px; }
  .lockup-nombre { font-family: "Barlow Condensed", "Arial Narrow", "Barlow", sans-serif;
                   font-weight: 600; font-size: 25px; letter-spacing: .05em;
                   margin-right: -.05em; line-height: 1; }
  .claro  .lockup-nombre { color: #1d1f20; }
  .oscuro .lockup-nombre { color: #e7e9ec; }
</style>
</head>
<body>

<section class="claro">
  <h2>Sobre fondo claro #f2f2f3</h2>

  <div class="fila acento">
    <figure class="pieza">
      <svg viewBox="2 2 28 28" width="16" height="16" fill="none" stroke="currentColor"
           stroke-linejoin="miter" role="img" aria-label="SEEDLLITE">
        <rect x="4" y="4" width="24" height="24" stroke-width="2"/>
        <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="3"/>
      </svg>
      <figcaption>16 · compacto</figcaption>
    </figure>
    <figure class="pieza">
      <svg viewBox="2 2 28 28" width="24" height="24" fill="none" stroke="currentColor"
           stroke-linejoin="miter" role="img" aria-label="SEEDLLITE">
        <rect x="4" y="4" width="24" height="24" stroke-width="2"/>
        <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="3"/>
      </svg>
      <figcaption>24 · compacto</figcaption>
    </figure>
    <figure class="pieza">
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor"
           stroke-linejoin="miter" role="img" aria-label="SEEDLLITE">
        <g stroke-width="1" opacity="0.35">
          <path d="M10 4V28M16 4V28M22 4V28M4 10H28M4 16H28M4 22H28"/>
        </g>
        <rect x="4" y="4" width="24" height="24" stroke-width="1.5"/>
        <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="2"/>
      </svg>
      <figcaption>32 · completo</figcaption>
    </figure>
    <figure class="pieza">
      <svg viewBox="0 0 32 32" width="64" height="64" fill="none" stroke="currentColor"
           stroke-linejoin="miter" role="img" aria-label="SEEDLLITE">
        <g stroke-width="1" opacity="0.35">
          <path d="M10 4V28M16 4V28M22 4V28M4 10H28M4 16H28M4 22H28"/>
        </g>
        <rect x="4" y="4" width="24" height="24" stroke-width="1.5"/>
        <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="2"/>
      </svg>
      <figcaption>64 · completo</figcaption>
    </figure>
  </div>

  <div class="lockup">
    <svg class="acento" viewBox="0 0 32 32" width="32" height="32" fill="none"
         stroke="currentColor" stroke-linejoin="miter" aria-hidden="true">
      <g stroke-width="1" opacity="0.35">
        <path d="M10 4V28M16 4V28M22 4V28M4 10H28M4 16H28M4 22H28"/>
      </g>
      <rect x="4" y="4" width="24" height="24" stroke-width="1.5"/>
      <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="2"/>
    </svg>
    <span class="lockup-nombre">SEEDLLITE</span>
  </div>
</section>

<section class="oscuro">
  <h2>Sobre fondo oscuro #0e1013</h2>

  <div class="fila acento">
    <figure class="pieza">
      <svg viewBox="2 2 28 28" width="16" height="16" fill="none" stroke="currentColor"
           stroke-linejoin="miter" role="img" aria-label="SEEDLLITE">
        <rect x="4" y="4" width="24" height="24" stroke-width="2"/>
        <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="3"/>
      </svg>
      <figcaption>16 · compacto</figcaption>
    </figure>
    <figure class="pieza">
      <svg viewBox="2 2 28 28" width="24" height="24" fill="none" stroke="currentColor"
           stroke-linejoin="miter" role="img" aria-label="SEEDLLITE">
        <rect x="4" y="4" width="24" height="24" stroke-width="2"/>
        <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="3"/>
      </svg>
      <figcaption>24 · compacto</figcaption>
    </figure>
    <figure class="pieza">
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor"
           stroke-linejoin="miter" role="img" aria-label="SEEDLLITE">
        <g stroke-width="1" opacity="0.35">
          <path d="M10 4V28M16 4V28M22 4V28M4 10H28M4 16H28M4 22H28"/>
        </g>
        <rect x="4" y="4" width="24" height="24" stroke-width="1.5"/>
        <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="2"/>
      </svg>
      <figcaption>32 · completo</figcaption>
    </figure>
    <figure class="pieza">
      <svg viewBox="0 0 32 32" width="64" height="64" fill="none" stroke="currentColor"
           stroke-linejoin="miter" role="img" aria-label="SEEDLLITE">
        <g stroke-width="1" opacity="0.35">
          <path d="M10 4V28M16 4V28M22 4V28M4 10H28M4 16H28M4 22H28"/>
        </g>
        <rect x="4" y="4" width="24" height="24" stroke-width="1.5"/>
        <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="2"/>
      </svg>
      <figcaption>64 · completo</figcaption>
    </figure>
  </div>

  <div class="lockup">
    <svg class="acento" viewBox="0 0 32 32" width="32" height="32" fill="none"
         stroke="currentColor" stroke-linejoin="miter" aria-hidden="true">
      <g stroke-width="1" opacity="0.35">
        <path d="M10 4V28M16 4V28M22 4V28M4 10H28M4 16H28M4 22H28"/>
      </g>
      <rect x="4" y="4" width="24" height="24" stroke-width="1.5"/>
      <path d="M4 16L10 10L16 22L22 13L28 16" stroke-width="2"/>
    </svg>
    <span class="lockup-nombre">SEEDLLITE</span>
  </div>
</section>

</body>
</html>
```

---

## 11. Cómo se verificó

El símbolo se renderizó a 16, 20, 24, 32, 48, 64, 96 y 112 px sobre `#f2f2f3` y sobre
`#0e1013` antes de fijar la geometría. Tres cosas cambiaron por esa prueba y quedan
anotadas para que nadie las deshaga:

1. La serie bajó de 2,5 a **2 u**. A 2,5 el trazo dominaba el cuadro y el símbolo se leía
   como una letra maciza en vez de como una línea trazada sobre una parcela.
2. Los picos dejaron de ser iguales. Con los dos a `y=10` la figura se lee "M"; con el
   segundo a `y=13` se lee serie.
3. La rejilla pasó a `opacity 0.35`. A trazo pleno competía con el linde y el símbolo se
   convertía en una ventana enrejada.

Los cuatro contrastes del favicon (§6.1) están calculados con la fórmula de luminancia
relativa de WCAG 2.1, no estimados.
