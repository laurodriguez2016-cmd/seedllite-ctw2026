# Cómo se eligieron las parcelas

> Estos scripts no son parte del producto. Son la **bitácora de exploración** con
> la que se escogieron las coordenadas de los cuatro predios del demo, y se
> conservan porque son la prueba de que las parcelas se eligieron contra el dato
> y no en un mapa.

## El problema

`data/predios.json` arrancó con coordenadas inventadas — "ubicaciones plausibles"
de cada zona productora. Al correr el pipeline real contra ellas, **tres de las
cuatro no caían sobre parcelas agrícolas**: NDVI plano entre 0,13 y 0,28 durante
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
| `buscar_parcelas.py` | Parcela con la fenología de cada cultivo | ✅ Arroz, papa y café resueltos |
| `buscar_abandono.py` | Cacaotal abandonado cerca de Granada, Meta | ⚠️ 20 candidatos, **ninguno real** — ver abajo |
| `buscar_abandono_transitorio.py` | Cultivo transitorio que dejó de ciclar | 🔄 Espinal: 0 · Saldaña y Villavicencio pendientes |

Las salidas crudas están en los `out_*.txt` de esta carpeta.

### El falso positivo que costó una hora, y por qué se descarta

`buscar_abandono.py` devolvió 20 parcelas que parecían encajar: ciclaban entre
2017 y 2022 y se aplanaban después. **Era ruido.** Las caídas de los años viejos
eran meses sueltos —nubes finas que el enmascarado SCL no atrapó— y no cosechas.
Al aplicar la mediana móvil de 3 meses que usa el detector de ciclos, esas caídas
desaparecen y con ellas el patrón.

Se deja documentado a propósito. Es exactamente la clase de hallazgo que se
confirma solo si uno quiere que se confirme, y en un sistema que decide sobre
crédito ese sesgo no es un detalle metodológico: es el fallo.

**Regla que salió de aquí:** una caída de un solo mes nunca es una cosecha.
Está implementada en `suavizar()` dentro de `scripts/ingesta_sentinel.py`.

## Nota

Estos scripts leen `.env` de la raíz del repositorio. Corren solos y no los
necesita ni el demo ni el pipeline.
