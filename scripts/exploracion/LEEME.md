# Cómo se eligieron los lotes

> Estos scripts no son parte del producto. Son la **bitácora de exploración** con
> la que se escogieron las coordenadas de los cuatro predios del demo, y se
> conservan porque son la prueba de que los lotes se eligieron contra el dato
> y no en un mapa.

## El problema

`data/predios.json` arrancó con coordenadas inventadas — "ubicaciones plausibles"
de cada zona productora. Al correr el pipeline real contra ellas, **tres de las
cuatro no caían sobre lotes agrícolas**: NDVI plano entre 0,13 y 0,28 durante
nueve años seguidos, que es la firma de suelo desnudo o terreno construido, no de
un cultivo.

## El método

Barrer una rejilla sobre cada zona, descargar la serie NDVI real de cada
candidato desde Copernicus, y puntuar por tres cosas:

1. **Cobertura** — cuántos de los 108 meses tienen observación óptica utilizable.
2. **Amplitud** — cuánto sube y baja la serie (percentil 90 menos percentil 10).
   Es lo que distingue un cultivo de un potrero.
3. **Ciclos detectados** — coherencia con la fenología del cultivo declarado.

```bash
python3 scripts/exploracion/buscar_parcelas.py arroz     # tambien: papa, cacao, cafe
```

## Resultados

| Script | Qué buscaba | Resultado |
|---|---|---|
| `buscar_parcelas.py` | Lote con la fenología de cada cultivo | ✅ Arroz, papa y café resueltos |
| `buscar_abandono.py` | Cacaotal abandonado cerca de Granada, Meta | ⚠️ 20 candidatos, **ninguno real** — ver abajo |
| `buscar_abandono_transitorio.py` | Cultivo transitorio que dejó de ciclar | ❌ Espinal, Saldaña y Villavicencio: **0** |
| `evaluar_candidato.py` | Verificar una candidata con el detector de producción | 🔧 La herramienta que tumbó las tres candidatas |
| `buscar_abandono_real.py` | Lo mismo, pero puntuando con el pipeline real | ❌ 2 candidatas, **las dos falsas** — ver abajo |
| `buscar_area_inflada.py` | Polígono declarado donde falta la actividad agrícola | ✅ **El caso de rechazo del demo** |

Las salidas crudas están en los `out_*.txt` de esta carpeta.

### El falso positivo que costó una hora, y por qué se descarta

`buscar_abandono.py` devolvió 20 lotes que parecían encajar: ciclaban entre
2017 y 2022 y se aplanaban después. **Era ruido.** Las caídas de los años viejos
eran meses sueltos —nubes finas que el enmascarado SCL no atrapó— y no cosechas.
Al aplicar la mediana móvil de 3 meses que usa el detector de ciclos, esas caídas
desaparecen y con ellas el patrón.

Se deja documentado a propósito. Es exactamente la clase de hallazgo que se
confirma solo si uno quiere que se confirme, y en un sistema que decide sobre
crédito ese sesgo no es un detalle metodológico: es el fallo.

**Regla que salió de aquí:** una caída de un solo mes nunca es una cosecha.
Está implementada en `suavizar()` dentro de `scripts/ingesta_sentinel.py`.

### El segundo intento, y por qué también falló

Con el falso positivo entendido, se construyó `evaluar_candidato.py`, que puntúa una
coordenada **con el código de producción en vez de con una copia simplificada**, y
`buscar_abandono_real.py`, que barre una zona entera con ese mismo detector.

Encontró dos candidatas con firma perfecta. Ninguna sobrevivió a mirarle la serie:

| Candidata | Lo que decía el indicador | Lo que había |
|---|---|---|
| (5.3772, −73.5018) | 6 ciclos → 0 en 24 meses | La serie nunca se aplanó; 2025 estaba medio interpolado |
| (5.3672, −73.5518) | Amplitud cae 66,3% conservando pico 0,76 | **11 de 24 meses medidos.** La amplitud no colapsó: la borró la nube |

### 🔴 El hallazgo de fondo: abandono y nubosidad son la misma firma

Después de cuatro zonas barridas y tres candidatas verificadas una por una, la
conclusión no es "no encontramos". Es más incómoda y más útil:

> **Una serie NDVI aplanada puede significar "el predio dejó de producir" o "no pudimos
> verlo". En el trópico andino las dos cosas se ven idénticas, y ninguna búsqueda por
> forma de la serie puede separarlas.**

La interpolación rellena los meses sin observación, el suavizado los promedia, los cruces
de umbral desaparecen y el detector devuelve cero ciclos — exactamente el número que
devuelve un predio abandonado de verdad.

**Esto dejó de ser un problema de exploración y pasó a ser una corrección del producto.**
En `scripts/ingesta_sentinel.py`, `ciclos_ultimos_24m` se calculaba sobre valores
interpolados mientras `ciclos_detectados` sí los excluía; era la métrica que dispara la
causal de rechazo automático. Y `docs/criterios-de-credito.md` ahora exige **12 meses
medidos** en la ventana de 24 antes de dejar operar esa causal.

Rechazar un crédito porque estuvo nublado sobre el lote es el peor error que este
sistema puede cometer: es invisible, se ve técnico, y le cae encima a quien menos
capacidad tiene de apelarlo. **Cuando el dato no alcanza, la respuesta correcta no es
"no" — es "no sé, vaya y mire".**

### La salida: medir el área, no la forma

`buscar_area_inflada.py` cambió de pregunta. En vez de "¿esta serie se aplanó?", pregunta
"¿cuánta de esta tierra muestra actividad agrícola?" — partiendo el polígono en una
rejilla de 4×4 y midiendo cada celda por separado, sobre los nueve años completos.

La nubosidad deja de confundir porque se promedia sobre nueve años en vez de sobre dos.
Y la causal 2 —área detectada bajo el 50% de la declarada— existe en el reglamento real,
no la inventamos nosotros.

Encontró `(3.4921, −73.6559)`: **0,5 ha con actividad agrícola dentro de un polígono
declarado de 4,0 ha.** Catorce de las dieciséis celdas tienen NDVI entre 0,82 y 0,86 con
amplitud de 0,08 — dosel de bosque cerrado. Es el caso de rechazo del demo, y es más
fuerte que el abandono que se buscaba: el NDVI de ese predio es **el más alto de los
cuatro**, así que un modelo que mire cuánto verde hay lo aprueba sin dudarlo.

## Nota

Estos scripts leen `.env` de la raíz del repositorio. Corren solos y no los
necesita ni el demo ni el pipeline.
