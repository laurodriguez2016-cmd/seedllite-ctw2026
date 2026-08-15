# Constitución del proyecto SEEDLLITE

> Documento de gobierno para Spec-Driven Development.
> Toda spec, plan y tarea de este repositorio debe respetar estos principios.
> Si una tarea los contradice, la tarea está mal — no el principio.

**Proyecto:** SEEDLLITE — Puntaje de crédito agrícola construido desde imágenes satelitales
**Evento:** Hackathon Colombia Tech Week 2026 · Track 04 · Planeta y Comunidad · Resiliencia
**Deadline inamovible:** domingo 16 de agosto de 2026, 09:00 (hora de Bogotá)

---

## I. El principio rector: esto es una prueba de concepto, no un producto

El entregable es **un video de 1 minuto + código**. No hay pitch en vivo. El jurado
solo ve lo que corre en pantalla.

**Regla:** si una funcionalidad no aparece en los 60 segundos del video, **no se construye**.

Ante cualquier duda de alcance, la respuesta por defecto es NO.

---

## II. La IA es el núcleo, no la decoración

La rúbrica asigna 25 de 100 puntos a "uso real de IA". El criterio explícito del deck
es *"¿la IA es el núcleo y está bien aplicada?"*.

**Regla:** el corazón de SEEDLLITE es la conversión de una serie temporal satelital en un
**dictamen de crédito explicable en lenguaje natural**. Eso lo hace un modelo de lenguaje.
Si se le quita la IA al producto, no debe quedar nada en pie.

**Prohibido:** usar la IA para adornos (un chatbot de ayuda, texto generado de relleno,
un asistente lateral). La IA produce el dictamen o no está.

---

## III. Honestidad radical sobre lo que es real y lo que es demo

Un demo con datos preparados es legítimo y estándar. **Ocultarlo no lo es.**

**Reglas:**
1. Todo dato precalculado, cacheado o calibrado se rotula como tal **en la interfaz y en el README**.
2. El pipeline real (ingesta Sentinel-2, prompt a Claude, generación del dictamen) se
   implementa y se deja visible en el repositorio, aunque en el demo se reproduzca cacheado.
3. Las salidas de IA que se muestran son **salidas reales de Claude**, generadas por el
   script del repositorio y commiteadas. Nunca texto escrito a mano haciéndose pasar por IA.
4. Ninguna cifra de negocio se presenta como dato duro si no tiene fuente. Si no hay fuente,
   se marca como estimación.

Si el jurado abre el código, todo debe cuadrar con lo que dijo el video.

---

## IV. Legalidad de los datos, verificable

**Reglas:**
1. Solo se usan fuentes con licencia que permita uso comercial:
   **Copernicus Sentinel-2** (licencia libre y abierta) y **Landsat/USGS** (dominio público).
2. **Prohibido usar mosaicos Planet/NICFI** en el producto: su licencia autoriza el uso
   únicamente para el "Propósito NICFI" y no con ánimo de lucro.
3. Toda fuente se atribuye en el README con su licencia.

---

## V. Cero fricción de infraestructura

Con 18 horas, una hora perdida en configuración es el 6% del proyecto.

**Reglas:**
1. **Sin paso de compilación.** HTML + CSS + JavaScript planos, autocontenidos.
2. **Sin dependencias de npm.** Sin `node_modules`. Sin bundler.
3. **Sin base de datos, sin login, sin backend en vivo.** Todo dato vive en archivos JSON.
4. Debe abrirse con doble clic sobre `index.html` y funcionar.
5. Los scripts de Python usan solo biblioteca estándar.

---

## VI. Cero secretos en el repositorio

**Reglas:**
1. Ninguna clave de API se commitea, jamás. `.env` está en `.gitignore`.
2. Los scripts leen credenciales de variables de entorno, nunca de código.
3. El demo no requiere clave para funcionar (reproduce salidas ya generadas).

---

## VII. Propiedad exclusiva de archivos (trabajo en paralelo sin choques)

Tres personas trabajando sobre un repositorio en 18 horas se destruyen entre sí si
tocan los mismos archivos.

**Regla:** cada archivo tiene **un solo dueño**. Ver `PLAN-MAESTRO.md`.
Si necesitas cambiar un archivo que no es tuyo, lo pides — no lo editas.

Los contratos de datos (`data/CONTRATO-DATOS.md`) se congelan al inicio y no se cambian
sin avisar a todo el equipo.

---

## VIII. Presupuesto de tokens

El equipo tiene cuentas asimétricas: dos de US$100 y una de US$20.

**Reglas:**
1. El trabajo intensivo en generación de código va a las cuentas de US$100.
2. La cuenta de US$20 hace contenido, documentación, control de calidad y video.
3. No se corren flujos multiagente pesados. Spec Kit se usa en su forma simple:
   `specify → plan → tasks → implement`.

---

## IX. Diseño: sobrio, denso, creíble

Esto es una herramienta de riesgo crediticio, no una app de consumo.

**Reglas:**
1. Debe verse como algo que un analista de crédito usaría: denso en información, serio.
2. Nada de degradados morados, emojis decorativos ni lenguaje de startup.
3. La evidencia manda: cada afirmación del dictamen va acompañada del dato que la sustenta.
4. Funciona en tema claro y oscuro, y no se rompe en pantallas angostas.

---

## X. El reloj gana todas las discusiones

**Hitos duros:**

| Hora | Hito |
|---|---|
| 20:30 | Interfaz navegable de punta a punta, aunque sea fea |
| 00:30 | Producto completo funcionando |
| 02:30 | Congelamiento de funcionalidades — **de aquí en adelante solo se arreglan errores** |
| 04:00 | README terminado |
| 06:00 | Video terminado |
| 08:00 | **Subida final** (una hora antes del cierre, no a las 08:55) |

Cualquier funcionalidad que no esté lista a las 02:30 se corta. Sin debate.

---

**Versión 1.0 · 15 de agosto de 2026**
