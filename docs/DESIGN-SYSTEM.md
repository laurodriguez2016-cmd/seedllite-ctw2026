# SISTEMA DE DISEÑO — SEEDLLITE

> **Para Juan Piedrahita (frente 🅰 APP).**
> Esto no es una sugerencia estética: son los valores exactos que van en `index.html`.
> Al final está **el prompt completo** para pegar en Claude Code.

---

## 1. Los cinco principios

**1 · Esto es una herramienta de riesgo crediticio, no una app de consumo.**
Debe verse como algo que un analista de Bancamía abre a las 8 de la mañana. Denso en
información, sobrio, serio. Si parece una app de startup, perdimos credibilidad.

**2 · "Impacto sobre estética" — el deck lo dice literal.**
No invertimos en pulido visual a costa de sustancia. La belleza aquí es **claridad**: que un
jurado entienda el dictamen sin que nadie se lo explique.

**3 · El dato manda.**
Cada afirmación va pegada al número que la sustenta. La jerarquía visual sirve para que el
ojo encuentre la evidencia, no para decorar.

**4 · Campo colombiano, no Silicon Valley.**
Paleta de tierra: hueso, oliva, ocre. **Prohibido:** degradados morados o azul-cian, glassmorphism,
sombras de neón, emojis decorativos, "✨", lenguaje de startup.

**5 · Un solo momento de espectáculo: la pantalla 3.**
Todo lo demás es sobrio para que el dictamen escribiéndose solo se sienta importante.

---

## 2. Color

Todo va en variables CSS sobre `:root`. **Nunca colores sueltos en el código.**

### Tema claro

```css
:root {
  /* Superficies — papel, no blanco puro */
  --fondo:        #FAF9F6;
  --superficie:   #FFFFFF;
  --superficie-2: #F2F0EA;
  --borde:        #E2DED4;
  --borde-fuerte: #C9C3B5;

  /* Texto */
  --texto:        #1C1B18;
  --texto-2:      #5C584F;
  --texto-3:      #8A857A;

  /* Acento — oliva de tierra */
  --acento:       #4A5D3A;
  --acento-hover: #3A4A2C;
  --acento-suave: #E9EDE3;

  /* Semántica de riesgo */
  --bajo:         #3F7A4A;
  --bajo-fondo:   #E6F0E7;
  --medio:        #A67C00;
  --medio-fondo:  #F7EFD9;
  --alto:         #C1621F;
  --alto-fondo:   #FBEBDF;
  --rechazo:      #A32E2E;
  --rechazo-fondo:#F8E5E5;

  /* Datos de la gráfica */
  --linea-ndvi:   #4A5D3A;
  --nino:         #E8C9A0;   /* banda El Niño — cálida */
  --nina:         #B9CEDD;   /* banda La Niña — fría */
  --rejilla:      #EBE8E0;
}
```

### Tema oscuro

```css
@media (prefers-color-scheme: dark) {
  :root {
    --fondo:        #131412;
    --superficie:   #1C1D19;
    --superficie-2: #24251F;
    --borde:        #35362F;
    --borde-fuerte: #4A4B42;

    --texto:        #F0EEE6;
    --texto-2:      #A8A499;
    --texto-3:      #7A766C;

    --acento:       #8FA87A;
    --acento-hover: #A3BA8E;
    --acento-suave: #232A1D;

    --bajo:         #6FB57E;
    --bajo-fondo:   #1B2A1F;
    --medio:        #D4A537;
    --medio-fondo:  #2B2517;
    --alto:         #E08A4B;
    --alto-fondo:   #2E2016;
    --rechazo:      #E06B6B;
    --rechazo-fondo:#2E1A1A;

    --linea-ndvi:   #8FA87A;
    --nino:         #6B5638;
    --nina:         #3A4A55;
    --rejilla:      #2A2B25;
  }
}
```

### Regla de uso del color

| Color | Solo para |
|---|---|
| `--acento` | Acciones primarias y la línea de la gráfica |
| `--bajo` / `--medio` / `--alto` / `--rechazo` | **Exclusivamente** para bandas de riesgo y evidencia. Nunca decorativo. |
| Todo lo demás | Neutros |

Si el color no comunica riesgo o acción, es neutro.

---

## 3. Tipografía

```css
--fuente: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, sans-serif;
--fuente-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
```

Sin fuentes externas: **no se cargan Google Fonts** (ralentiza y puede fallar sin red).

### Escala

| Uso | Tamaño | Peso | Notas |
|---|---|---|---|
| Puntaje de crédito | `72px` | 700 | El elemento más grande de la app |
| Título de pantalla | `28px` | 600 | |
| Cifra destacada | `32px` | 600 | Indicadores de NDVI, montos |
| Subtítulo / sección | `18px` | 600 | |
| Cuerpo | `15px` | 400 | `line-height: 1.6` |
| Etiqueta / metadato | `13px` | 500 | `letter-spacing: .02em`, mayúsculas |
| Descargo legal | `12px` | 400 | `--texto-3` |

### 🔢 Regla no negociable para números

```css
font-variant-numeric: tabular-nums;
```

En **todo** número: montos, puntajes, NDVI, porcentajes. Sin esto las cifras bailan al
actualizarse y se ve amateur.

**Formato de moneda colombiano:** `$8.400.000` — punto de miles, sin decimales, sin "COP".
**NDVI:** dos decimales con coma — `0,78`.

---

## 4. Espaciado y forma

```css
--e1: 4px;   --e2: 8px;   --e3: 12px;  --e4: 16px;
--e5: 24px;  --e6: 32px;  --e7: 48px;  --e8: 64px;

--radio:    6px;    /* tarjetas, botones */
--radio-lg: 10px;   /* paneles grandes */

--sombra:    0 1px 2px rgba(0,0,0,.04), 0 1px 3px rgba(0,0,0,.06);
--sombra-lg: 0 2px 8px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.08);
```

- **Ancho máximo del contenido:** `1280px`, centrado
- **Radios pequeños.** Las esquinas muy redondeadas leen como app de consumo
- **Sombras discretas.** Preferir bordes de 1px sobre sombras

---

## 5. Componentes

### Tarjeta de predio (pantalla 1)
Fondo `--superficie`, borde 1px `--borde`, radio `--radio`, padding `--e5`.
Al pasar el mouse: borde `--acento`, elevación sutil. Transición 150 ms.
Contenido: productor (18px/600) · municipio, depto (13px `--texto-2`) · cultivo y área ·
monto solicitado (destacado).

### Gráfica NDVI (pantalla 2) ⭐
- SVG escrito a mano. **Sin librerías.**
- Alto ~320px, ancho fluido, `viewBox` con `preserveAspectRatio="none"` solo en el área de trazado
- **Bandas climáticas al fondo, primero** — rectángulos `--nino` / `--nina` al 35% de opacidad,
  con etiqueta arriba en 12px
- Rejilla horizontal `--rejilla`, 1px, cada 0,2 de NDVI
- Línea NDVI: `--linea-ndvi`, 2px, `stroke-linejoin: round`, **sin suavizado de curva** —
  los picos son el dato
- Puntos con nubosidad > 0,6: opacidad 0,3
- Eje X: solo los años, 12px `--texto-3`
- Debajo: tres indicadores en fila — cifra 32px + etiqueta 13px mayúsculas

> **La prueba de que la gráfica sirve:** que a un metro de distancia se vean los dientes de
> sierra de las cosechas. Si no se ven, la gráfica está mal.

### Barra de eje de evaluación (pantalla 4)
Nombre del eje + peso a la izquierda · barra horizontal · puntaje a la derecha.
Barra: alto 8px, radio 4px, fondo `--superficie-2`, relleno con el color de la banda.

### Ítem de evidencia (pantalla 4)
Icono a la izquierda, alineado con la primera línea:
`favorable` → ✓ en `--bajo` · `alerta` → ⚠ en `--medio` · `critico` → ● en `--rechazo`
Texto en cuerpo 15px. Separación `--e3` entre ítems.

### Bloque del puntaje (pantalla 4)
El número en 72px/700, con el color de su banda. Al lado, `/ 1000` en 24px `--texto-3`.
Debajo, la banda de riesgo como etiqueta con `--*-fondo` de fondo.
La decisión (APROBAR / APROBAR CON AJUSTE / RECHAZAR) en 28px/600, mayúsculas.

### Botones
**Primario:** fondo `--acento`, texto blanco, padding `12px 24px`, radio `--radio`, 15px/600.
**Secundario:** transparente, borde 1px `--borde-fuerte`, texto `--texto`.
Sin degradados. Sin sombras de color.

### Pasos del análisis (pantalla 3)
Lista vertical. Cada paso: círculo de 20px a la izquierda (vacío → giro → ✓ en `--bajo`),
texto 15px. El paso activo en `--texto`, los pendientes en `--texto-3`, los terminados en
`--texto-2`. Aparecen encadenados, no todos de una vez.

---

## 6. Movimiento

| Elemento | Duración |
|---|---|
| Hover, cambios de color | 150 ms |
| Cambio de pantalla | 250 ms, `ease-out` |
| Paso del análisis | 1.000–1.500 ms cada uno |
| Escritura del dictamen | ~18 ms por carácter |

**Toda la secuencia de la pantalla 3 debe durar entre 8 y 12 segundos.** Más no cabe en el
video de 1 minuto.

```css
@media (prefers-reduced-motion: reduce) { /* desactivar animaciones */ }
```

---

## 7. Lista de verificación visual

- [ ] ¿Parece una herramienta financiera o una app de startup?
- [ ] ¿El puntaje es el elemento más grande de la pantalla de dictamen?
- [ ] ¿Se ven los dientes de sierra en la gráfica NDVI?
- [ ] ¿Todos los números tienen `tabular-nums`?
- [ ] ¿Los montos se ven `$8.400.000`?
- [ ] ¿El color solo comunica riesgo o acción, nunca decoración?
- [ ] ¿Funciona igual de bien en claro y en oscuro?
- [ ] ¿Nada se rompe entre 1280 y 1920 px?
- [ ] ¿Cero texto en inglés?

---

# 8. EL PROMPT — pégalo completo en Claude Code

```
Lee CLAUDE.md, PLAN-MAESTRO.md, data/CONTRATO-DATOS.md y docs/DESIGN-SYSTEM.md.

Crea index.html para SEEDLLITE: un archivo HTML autocontenido, sin dependencias
externas, sin frameworks, sin CDN, sin build. Todo el CSS y el JS van dentro del
mismo archivo. Debe abrir con doble clic y funcionar.

QUÉ ES: la interfaz de una herramienta de evaluación de riesgo crediticio
agropecuario que usaría un analista de crédito de un banco colombiano para
decidir si le presta a un pequeño productor, usando 10 años de imágenes
satelitales de su parcela.

SISTEMA VISUAL: implementa EXACTAMENTE los valores de docs/DESIGN-SYSTEM.md —
las variables CSS de color en claro y oscuro, la escala tipográfica, el
espaciado, los radios y las sombras. No inventes colores nuevos ni cargues
fuentes externas.

Principio rector: debe verse como una herramienta financiera profesional y
seria, densa en información. NO como una app de consumo. Prohibido: degradados
morados o azul-cian, glassmorphism, sombras de neón, emojis decorativos,
esquinas muy redondeadas, lenguaje de startup.

ESTRUCTURA: una sola página con 4 vistas que se alternan mostrando y ocultando
secciones, sin recargar:
  1. Mapa de Colombia con los 4 predios seleccionables
  2. Ficha del predio con la serie NDVI de 10 años graficada
  3. Análisis con IA (pasos animados + dictamen escribiéndose en pantalla)
  4. Dictamen de crédito completo

Barra superior: "SEEDLLITE" y el subtítulo "Evaluación de riesgo crediticio
agropecuario por análisis satelital".
Pie: "Datos de demostración. Imágenes Copernicus Sentinel-2, licencia abierta."

DATOS: lee data/predios.json, data/series_ndvi.json y data/dictamenes.json
según el esquema de data/CONTRATO-DATOS.md. Si un archivo todavía no existe,
genera datos de ejemplo con la MISMA estructura para poder construir — nunca
dejes la pantalla rota ni una imagen quebrada.

REGLAS NO NEGOCIABLES:
- font-variant-numeric: tabular-nums en TODOS los números
- Montos en formato colombiano: $8.400.000 (punto de miles, sin decimales)
- NDVI con coma y dos decimales: 0,78
- Todo el texto en español
- Tema claro y oscuro con variables CSS
- No se rompe entre 1280px y 1920px de ancho
- Respeta prefers-reduced-motion

AHORA: construye solo el esqueleto y el sistema visual completo, con las 4
vistas creadas y la navegación entre ellas funcionando. Deja las vistas con
contenido de marcador de posición. NO construyas todavía el mapa, la gráfica
ni la animación del análisis: eso va en las tareas siguientes.
```

---

*Versión 1.0 · 15-ago-2026 · Congelado. Cambios visuales se discuten, no se improvisan.*
