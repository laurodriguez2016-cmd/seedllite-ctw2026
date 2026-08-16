# Bitácora de la noche — SEEDLLITE

> Estado al **16-ago-2026, 07:35**, hora de entrega.
> Este archivo empezó como un traspaso entre sesiones a medianoche y se cierra
> como lo que acabó siendo: el registro de qué se decidió y por qué.
> La documentación del producto está en [`README.md`](README.md) y
> [`ARQUITECTURA.md`](ARQUITECTURA.md).

---

## Dónde quedó

| | |
|---|---|
| **Aplicación** | https://seedllite-motor.vercel.app/app/ |
| **Landing** | https://seedllite-motor.vercel.app |
| **Video** | [`video/seedllite-demo.mp4`](video/seedllite-demo.mp4) — 63 s, ocho planos |
| **Verificación** | `./verificar.sh` — 174 comprobaciones en verde |

Nueve expedientes: seis aprobados en distintas condiciones, uno rechazado, uno
sin concepto por falta de dato, uno aprobado con ajuste de monto.

---

## Las tres decisiones que cambiaron el proyecto

### 1 · Los datos dejaron de ser simulados (22:30)

La serie NDVI pasó de calibrada a **descargada de Copernicus**. Una petición por
lote a la Statistical API de Sentinel Hub, 108 meses de 2017 a 2025, unos tres
segundos cada una. `scripts/ingesta_sentinel.py` corre de verdad.

Al hacerlo apareció algo que no esperábamos: **tres de las cuatro coordenadas
originales no caían sobre lotes agrícolas.** Eran "ubicaciones plausibles"
inventadas, y el satélite mostraba NDVI plano entre 0,13 y 0,28 durante nueve
años — suelo desnudo. Se re-eligieron barriendo una rejilla y descargando la
serie real de cada candidato. El procedimiento quedó en
[`scripts/exploracion/`](scripts/exploracion/LEEME.md).

**Dos trampas de esa API**, documentadas en el script para quien venga después:
con CRS84 la resolución va en grados, así que `resx: 10` pide diez *grados* y
devuelve un único píxel por mes sin dar error; y un mes enteramente enmascarado
vuelve como la cadena `"NaN"`, no como `null`.

### 2 · El falso positivo que no sobrevivió (23:00)

Buscando un cacaotal abandonado aparecieron veinte lotes que encajaban: ciclaban
hasta 2022 y se aplanaban después. **Era ruido.** Las caídas de los años viejos
eran meses sueltos de nube que el enmascarado SCL no atrapó, y desaparecen al
aplicar la mediana móvil de tres meses.

Se dejó escrito en vez de borrarlo. Veinte lotes encajaban con el patrón que
queríamos encontrar y ninguno resistió el filtro; en un sistema que decide sobre
crédito, ese sesgo no es una anécdota metodológica. De ahí salió la regla de que
una caída de un solo mes nunca es una cosecha, que hoy vive en `suavizar()`
dentro de `scripts/ingesta_sentinel.py`.

### 3 · Contar ciclos no bastaba (01:30)

Con datos reales apareció un problema de fondo: el café da **cero ciclos en los
últimos 24 meses**, igual que un lote abandonado. El café es perenne y no dibuja
cosechas en NDVI. Con la regla de rechazo automático escrita como estaba, el caso
insignia de aprobación se rechazaba.

Se resolvió por dos vías, y las dos mejoraron el producto:

- **La regla se volvió consciente del cultivo.** La ausencia de ciclo solo es
  causal en transitorios; en perennes la señal es otra.
- **El rechazo se ancló en área medida, no en serie construida.** `meta-cacao` se
  rechaza porque Sentinel-2 detecta **0,5 ha con actividad agrícola frente a 4,0
  declaradas** — 12,5% del polígono, por debajo del umbral del 50%. Es una
  medición, no un supuesto.

Con eso, **ningún lote del demo lleva serie inventada.**

---

## Lo que el sistema no sabe, y lo dice

El caso `boyaca-papa-nubes` existe para eso: cuando la cobertura óptica no
alcanza, el dictamen **declara que no puede evaluar** en vez de estimar.

Un sistema de crédito que siempre responde es un sistema que a veces adivina.
Poder decir "no sé" es parte del producto, no una carencia suya.

---

## Reglas del repositorio

1. **Un archivo, un dueño.** `index.html` y `assets/` son de APP; `scripts/` y
   `data/` de MOTOR; `docs/`, `README.md` y `video/` de PRODUCTO.
2. **Nada de `fetch()`, `import`, `type="module"` ni CDN.** Bajo `file://` mueren
   por CORS. Los datos llegan por `window.SEEDLLITE_DATOS`, que carga
   `data/datos.js`. `verificar.sh` lo vigila.
3. **`data/datos.js` es generado.** Se regenera con
   `python3 scripts/empaquetar_datos.py`, que valida el contrato antes de emitir:
   si no se cumple, no reescribe nada y la app sigue mostrando lo último bueno.
4. **Ninguna credencial en el repositorio.** Viven en `.env`, que está en
   `.gitignore`. El demo no necesita ninguna: lee los JSON commiteados.

```bash
./verificar.sh      # antes de cada integración
```

---

*Cerrado el 16-ago-2026 a las 07:35.*
