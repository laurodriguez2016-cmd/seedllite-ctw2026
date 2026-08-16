/* ARCHIVO GENERADO por scripts/empaquetar_datos.py — NO EDITAR A MANO.
   Los datos de verdad viven en data/*.json. Este archivo existe solo
   porque fetch() no funciona bajo file:// y la app debe abrir con
   doble clic (constitución V.4). Ver ARQUITECTURA.md §2. */
window.SEEDLLITE_DATOS = {
 "predios": {
  "version": "1.0",
  "generado": "2026-08-15T16:00:00-05:00",
  "nota_datos": "Predios y productores FICTICIOS construidos para demostración. Las PARCELAS son reales: cada coordenada fue verificada descargando su serie NDVI de Copernicus Sentinel-2 y comprobando que la fenología observada corresponde al cultivo declarado. Las personas, los montos y los destinos del crédito no existen. Las imágenes satelitales son una secuencia temporal de al menos dos cortes por predio.",
  "predios": [
   {
    "id": "huila-cafe",
    "productor": "María Ligia Osorio",
    "tipo_productor": "pequeño",
    "vereda": "El Carmen",
    "municipio": "Pitalito",
    "departamento": "Huila",
    "coordenadas": {
     "lat": 1.8834,
     "lon": -76.0621
    },
    "cultivo": "Café",
    "variedad": "Castillo",
    "area_declarada_ha": 2.4,
    "area_detectada_ha": 2.4,
    "monto_solicitado_cop": 9000000,
    "destino": "Renovación de cafetal y compra de insumos",
    "activos_declarados_smmlv": 41,
    "anos_en_el_predio": 11,
    "credito_previo": false,
    "imagenes_satelitales": [
     {
      "anio": 2017,
      "ruta": "assets/satelite/huila-cafe-2017.jpg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/huila-cafe-2025.jpg"
     }
    ]
   },
   {
    "id": "tolima-arroz",
    "productor": "Hernán Darío Betancourt",
    "tipo_productor": "pequeño",
    "vereda": "La Palmita",
    "municipio": "El Espinal",
    "departamento": "Tolima",
    "coordenadas": {
     "lat": 4.1789,
     "lon": -74.8836
    },
    "cultivo": "Arroz",
    "variedad": "Fedearroz 67",
    "area_declarada_ha": 6.1,
    "area_detectada_ha": 5.9,
    "monto_solicitado_cop": 22000000,
    "destino": "Capital de trabajo para siembra semestre B",
    "activos_declarados_smmlv": 198,
    "anos_en_el_predio": 8,
    "credito_previo": true,
    "imagenes_satelitales": [
     {
      "anio": 2017,
      "ruta": "assets/satelite/tolima-arroz-2017.jpg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/tolima-arroz-2025.jpg"
     }
    ]
   },
   {
    "id": "boyaca-papa",
    "productor": "Blanca Cecilia Rojas",
    "tipo_productor": "pequeño",
    "vereda": "Puente de Boyacá",
    "municipio": "Ventaquemada",
    "departamento": "Boyacá",
    "coordenadas": {
     "lat": 5.3372,
     "lon": -73.4918
    },
    "cultivo": "Papa",
    "variedad": "Pastusa Suprema",
    "area_declarada_ha": 1.8,
    "area_detectada_ha": 1.58,
    "monto_solicitado_cop": 7500000,
    "destino": "Semilla certificada y fertilizantes",
    "activos_declarados_smmlv": 33,
    "anos_en_el_predio": 6,
    "credito_previo": false,
    "imagenes_satelitales": [
     {
      "anio": 2017,
      "ruta": "assets/satelite/boyaca-papa-2017.jpg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/boyaca-papa-2025.jpg"
     }
    ]
   },
   {
    "id": "meta-cacao",
    "productor": "Jorge Eliécer Ramírez",
    "tipo_productor": "pequeño",
    "vereda": "Los Naranjos",
    "municipio": "Granada",
    "departamento": "Meta",
    "coordenadas": {
     "lat": 3.5821,
     "lon": -73.6859
    },
    "cultivo": "Cacao",
    "variedad": "CCN-51",
    "area_declarada_ha": 4.0,
    "area_detectada_ha": 0.0,
    "monto_solicitado_cop": 18000000,
    "destino": "Mantenimiento de cacaotal establecido",
    "activos_declarados_smmlv": 112,
    "anos_en_el_predio": 4,
    "credito_previo": false,
    "imagenes_satelitales": [
     {
      "anio": 2020,
      "ruta": "assets/satelite/meta-cacao-2020.jpg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/meta-cacao-2025.jpg"
     }
    ]
   }
  ],
  "eventos_climaticos": [
   {
    "nombre": "La Niña 2022",
    "desde": "2022-01",
    "hasta": "2022-12",
    "tipo": "exceso_lluvia"
   },
   {
    "nombre": "El Niño 2023-24",
    "desde": "2023-06",
    "hasta": "2024-05",
    "tipo": "sequia"
   }
  ],
  "fuentes": {
   "imagenes": "Copernicus Sentinel-2 L2A — licencia abierta, uso comercial permitido",
   "clima": "IDEAM — series históricas y alertas",
   "aptitud_suelo": "UPRA — aptitud por cultivo",
   "marco_credito": "Manual de Servicios FINAGRO v.26.21 (16-04-2026)"
  },
  "verificacion_parcelas": "Coordenadas seleccionadas por barrido sobre la Statistical API de Sentinel Hub (scripts/ingesta_sentinel.py). Criterio: cobertura de meses con observación válida, amplitud de la serie y número de ciclos detectados coherentes con el cultivo."
 },
 "series": {
  "version": "2.0",
  "fuente": "Copernicus Sentinel-2 L2A",
  "licencia": "Copernicus open licence — uso comercial permitido",
  "atribucion": "Contains modified Copernicus Sentinel data 2017-2025",
  "resolucion_m": 10,
  "metodo": "Mediana mensual de NDVI sobre el polígono del predio, calculada del lado de Copernicus por la Statistical API de Sentinel Hub. Enmascarado de nubes, sombras y agua con la banda SCL del producto L2A.",
  "nota_datos": "SERIE REAL descargada de Copernicus por scripts/ingesta_sentinel.py. Los meses sin observación óptica utilizable (nubosidad) se interpolan linealmente y quedan marcados con \"interpolado\": true y nubosidad 1.0; todos los agregados —ciclos, pico, rendimiento, caída ENSO— se calculan únicamente sobre meses medidos. El rendimiento estimado es una estimación relativa anclada al rendimiento municipal oficial de EVA, con el método declarado en el mismo script. Los productores son ficticios; las parcelas y sus series son reales.",
  "fuente_rendimiento": "Evaluaciones Agropecuarias Municipales (EVA) — UPRA / MinAgricultura",
  "caida_enso_regional_pct": 2.0,
  "series": {
   "huila-cafe": {
    "desde": "2017-01",
    "hasta": "2025-12",
    "puntos": [
     {
      "fecha": "2017-01",
      "ndvi": 0.688,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-02",
      "ndvi": 0.712,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-03",
      "ndvi": 0.736,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-04",
      "ndvi": 0.76,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-05",
      "ndvi": 0.764,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-06",
      "ndvi": 0.768,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-07",
      "ndvi": 0.617,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-08",
      "ndvi": 0.717,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-09",
      "ndvi": 0.676,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-10",
      "ndvi": 0.711,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-11",
      "ndvi": 0.746,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-12",
      "ndvi": 0.781,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-01",
      "ndvi": 0.711,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-02",
      "ndvi": 0.641,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-03",
      "ndvi": 0.655,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-04",
      "ndvi": 0.67,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-05",
      "ndvi": 0.684,
      "nubosidad": 0.59,
      "interpolado": false
     },
     {
      "fecha": "2018-06",
      "ndvi": 0.641,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-07",
      "ndvi": 0.598,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-08",
      "ndvi": 0.616,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-09",
      "ndvi": 0.635,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-10",
      "ndvi": 0.653,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-11",
      "ndvi": 0.672,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-12",
      "ndvi": 0.69,
      "nubosidad": 0.14,
      "interpolado": false
     },
     {
      "fecha": "2019-01",
      "ndvi": 0.791,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-02",
      "ndvi": 0.606,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-03",
      "ndvi": 0.667,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-04",
      "ndvi": 0.751,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-05",
      "ndvi": 0.684,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-06",
      "ndvi": 0.71,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-07",
      "ndvi": 0.736,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-08",
      "ndvi": 0.755,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-09",
      "ndvi": 0.686,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-10",
      "ndvi": 0.529,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-11",
      "ndvi": 0.372,
      "nubosidad": 0.65,
      "interpolado": false
     },
     {
      "fecha": "2019-12",
      "ndvi": 0.713,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-01",
      "ndvi": 0.771,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-02",
      "ndvi": 0.511,
      "nubosidad": 0.52,
      "interpolado": false
     },
     {
      "fecha": "2020-03",
      "ndvi": 0.568,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-04",
      "ndvi": 0.624,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-05",
      "ndvi": 0.676,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-06",
      "ndvi": 0.728,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-07",
      "ndvi": 0.81,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-08",
      "ndvi": 0.665,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-09",
      "ndvi": 0.732,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-10",
      "ndvi": 0.7,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-11",
      "ndvi": 0.687,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-12",
      "ndvi": 0.724,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-01",
      "ndvi": 0.703,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-02",
      "ndvi": 0.704,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-03",
      "ndvi": 0.366,
      "nubosidad": 0.17,
      "interpolado": false
     },
     {
      "fecha": "2021-04",
      "ndvi": 0.817,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-05",
      "ndvi": 0.658,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-06",
      "ndvi": 0.29,
      "nubosidad": 0.66,
      "interpolado": false
     },
     {
      "fecha": "2021-07",
      "ndvi": 0.701,
      "nubosidad": 0.88,
      "interpolado": false
     },
     {
      "fecha": "2021-08",
      "ndvi": 0.701,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-09",
      "ndvi": 0.701,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-10",
      "ndvi": 0.684,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-11",
      "ndvi": 0.667,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-12",
      "ndvi": 0.684,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-01",
      "ndvi": 0.712,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-02",
      "ndvi": 0.721,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-03",
      "ndvi": 0.73,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-04",
      "ndvi": 0.744,
      "nubosidad": 0.61,
      "interpolado": false
     },
     {
      "fecha": "2022-05",
      "ndvi": 0.713,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-06",
      "ndvi": 0.379,
      "nubosidad": 0.94,
      "interpolado": false
     },
     {
      "fecha": "2022-07",
      "ndvi": 0.738,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-08",
      "ndvi": 0.734,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-09",
      "ndvi": 0.741,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-10",
      "ndvi": 0.639,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-11",
      "ndvi": 0.538,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-12",
      "ndvi": 0.679,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-01",
      "ndvi": 0.737,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-02",
      "ndvi": 0.72,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-03",
      "ndvi": 0.685,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-04",
      "ndvi": 0.65,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-05",
      "ndvi": 0.615,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-06",
      "ndvi": 0.58,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-07",
      "ndvi": 0.545,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-08",
      "ndvi": 0.815,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-09",
      "ndvi": 0.639,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-10",
      "ndvi": 0.463,
      "nubosidad": 0.52,
      "interpolado": false
     },
     {
      "fecha": "2023-11",
      "ndvi": 0.614,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-12",
      "ndvi": 0.765,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-01",
      "ndvi": 0.686,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-02",
      "ndvi": 0.767,
      "nubosidad": 0.31,
      "interpolado": false
     },
     {
      "fecha": "2024-03",
      "ndvi": 0.794,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-04",
      "ndvi": 0.822,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-05",
      "ndvi": 0.687,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-06",
      "ndvi": 0.708,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-07",
      "ndvi": 0.722,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-08",
      "ndvi": 0.737,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-09",
      "ndvi": 0.756,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-10",
      "ndvi": 0.672,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-11",
      "ndvi": 0.675,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-12",
      "ndvi": 0.677,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-01",
      "ndvi": 0.797,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-02",
      "ndvi": 0.776,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-03",
      "ndvi": 0.754,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-04",
      "ndvi": 0.733,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-05",
      "ndvi": 0.518,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-06",
      "ndvi": 0.765,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-07",
      "ndvi": 0.709,
      "nubosidad": 1.0,
      "interpolado": false
     },
     {
      "fecha": "2025-08",
      "ndvi": 0.837,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-09",
      "ndvi": 0.713,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-10",
      "ndvi": 0.718,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-11",
      "ndvi": 0.704,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-12",
      "ndvi": 0.691,
      "nubosidad": 0.99,
      "interpolado": false
     }
    ],
    "cobertura_meses_medidos": 75,
    "cobertura_meses_totales": 108,
    "ciclos_detectados": 9,
    "ciclos_ultimos_24m": 0,
    "ndvi_pico_promedio": 0.79,
    "rendimiento_estimado_t_ha": 1.23,
    "rendimiento_municipal_eva_t_ha": 1.14,
    "fuente_referencia": "EVA 2018 — PITALITO, HUILA — CAFE",
    "caida_enso_pct": 0.0,
    "amplitud_historica": 0.123,
    "amplitud_reciente_24m": 0.089,
    "perdida_amplitud_pct": 27.6
   },
   "tolima-arroz": {
    "desde": "2017-01",
    "hasta": "2025-12",
    "puntos": [
     {
      "fecha": "2017-01",
      "ndvi": 0.077,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-02",
      "ndvi": 0.077,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-03",
      "ndvi": 0.436,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-04",
      "ndvi": 0.795,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-05",
      "ndvi": 0.757,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-06",
      "ndvi": 0.516,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-07",
      "ndvi": 0.274,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-08",
      "ndvi": 0.251,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-09",
      "ndvi": 0.086,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-10",
      "ndvi": 0.117,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-11",
      "ndvi": 0.85,
      "nubosidad": 0.06,
      "interpolado": false
     },
     {
      "fecha": "2017-12",
      "ndvi": 0.899,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-01",
      "ndvi": 0.65,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-02",
      "ndvi": 0.092,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-03",
      "ndvi": 0.095,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-04",
      "ndvi": 0.189,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-05",
      "ndvi": 0.873,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-06",
      "ndvi": 0.789,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-07",
      "ndvi": 0.704,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-08",
      "ndvi": 0.62,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-09",
      "ndvi": 0.352,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-10",
      "ndvi": 0.085,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-11",
      "ndvi": 0.725,
      "nubosidad": 0.4,
      "interpolado": false
     },
     {
      "fecha": "2018-12",
      "ndvi": 0.793,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-01",
      "ndvi": 0.871,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-02",
      "ndvi": 0.539,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-03",
      "ndvi": 0.011,
      "nubosidad": 0.96,
      "interpolado": false
     },
     {
      "fecha": "2019-04",
      "ndvi": 0.244,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-05",
      "ndvi": 0.499,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-06",
      "ndvi": 0.755,
      "nubosidad": 0.99,
      "interpolado": false
     },
     {
      "fecha": "2019-07",
      "ndvi": 0.598,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-08",
      "ndvi": 0.308,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-09",
      "ndvi": 0.066,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-10",
      "ndvi": 0.035,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-11",
      "ndvi": 0.474,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-12",
      "ndvi": 0.912,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-01",
      "ndvi": 0.876,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-02",
      "ndvi": 0.254,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-03",
      "ndvi": 0.103,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-04",
      "ndvi": 0.256,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-05",
      "ndvi": 0.807,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-06",
      "ndvi": 0.857,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-07",
      "ndvi": 0.635,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-08",
      "ndvi": 0.229,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-09",
      "ndvi": 0.108,
      "nubosidad": 0.14,
      "interpolado": false
     },
     {
      "fecha": "2020-10",
      "ndvi": 0.56,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-11",
      "ndvi": 0.918,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-12",
      "ndvi": 0.935,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-01",
      "ndvi": 0.439,
      "nubosidad": 0.71,
      "interpolado": false
     },
     {
      "fecha": "2021-02",
      "ndvi": 0.119,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-03",
      "ndvi": 0.07,
      "nubosidad": 0.28,
      "interpolado": false
     },
     {
      "fecha": "2021-04",
      "ndvi": 0.397,
      "nubosidad": 0.94,
      "interpolado": false
     },
     {
      "fecha": "2021-05",
      "ndvi": 0.868,
      "nubosidad": 0.02,
      "interpolado": false
     },
     {
      "fecha": "2021-06",
      "ndvi": 0.891,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-07",
      "ndvi": 0.688,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-08",
      "ndvi": 0.191,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-09",
      "ndvi": 0.146,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-10",
      "ndvi": 0.062,
      "nubosidad": 0.01,
      "interpolado": false
     },
     {
      "fecha": "2021-11",
      "ndvi": 0.763,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-12",
      "ndvi": 0.831,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-01",
      "ndvi": 0.664,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-02",
      "ndvi": 0.17,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-03",
      "ndvi": 0.197,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-04",
      "ndvi": 0.065,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-05",
      "ndvi": 0.793,
      "nubosidad": 0.33,
      "interpolado": false
     },
     {
      "fecha": "2022-06",
      "ndvi": 0.891,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-07",
      "ndvi": 0.759,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-08",
      "ndvi": 0.627,
      "nubosidad": 0.79,
      "interpolado": false
     },
     {
      "fecha": "2022-09",
      "ndvi": 0.528,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-10",
      "ndvi": 0.428,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-11",
      "ndvi": 0.329,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-12",
      "ndvi": 0.703,
      "nubosidad": 0.57,
      "interpolado": false
     },
     {
      "fecha": "2023-01",
      "ndvi": 0.695,
      "nubosidad": 0.56,
      "interpolado": false
     },
     {
      "fecha": "2023-02",
      "ndvi": 0.773,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-03",
      "ndvi": 0.11,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-04",
      "ndvi": 0.489,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-05",
      "ndvi": 0.868,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-06",
      "ndvi": 0.479,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-07",
      "ndvi": 0.272,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-08",
      "ndvi": 0.066,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-09",
      "ndvi": 0.115,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-10",
      "ndvi": 0.156,
      "nubosidad": 0.67,
      "interpolado": false
     },
     {
      "fecha": "2023-11",
      "ndvi": 0.845,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-12",
      "ndvi": 0.784,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-01",
      "ndvi": 0.481,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-02",
      "ndvi": 0.3,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-03",
      "ndvi": 0.119,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-04",
      "ndvi": 0.506,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-05",
      "ndvi": 0.895,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-06",
      "ndvi": 0.54,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-07",
      "ndvi": 0.734,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-08",
      "ndvi": 0.276,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-09",
      "ndvi": 0.107,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-10",
      "ndvi": 0.342,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-11",
      "ndvi": 0.578,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-12",
      "ndvi": 0.813,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-01",
      "ndvi": 0.84,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-02",
      "ndvi": 0.8,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-03",
      "ndvi": 0.457,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-04",
      "ndvi": 0.113,
      "nubosidad": 0.24,
      "interpolado": false
     },
     {
      "fecha": "2025-05",
      "ndvi": 0.486,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-06",
      "ndvi": 0.859,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-07",
      "ndvi": 0.601,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-08",
      "ndvi": 0.342,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-09",
      "ndvi": 0.084,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-10",
      "ndvi": 0.17,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-11",
      "ndvi": 0.7,
      "nubosidad": 0.81,
      "interpolado": false
     },
     {
      "fecha": "2025-12",
      "ndvi": 0.7,
      "nubosidad": 1.0,
      "interpolado": true
     }
    ],
    "cobertura_meses_medidos": 87,
    "cobertura_meses_totales": 108,
    "ciclos_detectados": 14,
    "ciclos_ultimos_24m": 2,
    "ndvi_pico_promedio": 0.89,
    "rendimiento_estimado_t_ha": 8.91,
    "rendimiento_municipal_eva_t_ha": 7.69,
    "fuente_referencia": "EVA 2018 — ESPINAL, TOLIMA — ARROZ",
    "caida_enso_pct": 8.1,
    "amplitud_historica": 0.756,
    "amplitud_reciente_24m": 0.746,
    "perdida_amplitud_pct": 1.3
   },
   "boyaca-papa": {
    "desde": "2017-01",
    "hasta": "2025-12",
    "puntos": [
     {
      "fecha": "2017-01",
      "ndvi": 0.373,
      "nubosidad": 0.92,
      "interpolado": false
     },
     {
      "fecha": "2017-02",
      "ndvi": 0.373,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-03",
      "ndvi": 0.384,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-04",
      "ndvi": 0.395,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-05",
      "ndvi": 0.451,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-06",
      "ndvi": 0.5,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-07",
      "ndvi": 0.269,
      "nubosidad": 0.85,
      "interpolado": false
     },
     {
      "fecha": "2017-08",
      "ndvi": 0.612,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-09",
      "ndvi": 0.57,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-10",
      "ndvi": 0.476,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-11",
      "ndvi": 0.382,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-12",
      "ndvi": 0.325,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-01",
      "ndvi": 0.382,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-02",
      "ndvi": 0.312,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-03",
      "ndvi": 0.266,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-04",
      "ndvi": 0.216,
      "nubosidad": 0.7,
      "interpolado": false
     },
     {
      "fecha": "2018-05",
      "ndvi": 0.606,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-06",
      "ndvi": 0.401,
      "nubosidad": 0.25,
      "interpolado": false
     },
     {
      "fecha": "2018-07",
      "ndvi": 0.454,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-08",
      "ndvi": 0.507,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-09",
      "ndvi": 0.297,
      "nubosidad": 0.92,
      "interpolado": false
     },
     {
      "fecha": "2018-10",
      "ndvi": 0.434,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-11",
      "ndvi": 0.572,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-12",
      "ndvi": 0.479,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-01",
      "ndvi": 0.346,
      "nubosidad": 0.03,
      "interpolado": false
     },
     {
      "fecha": "2019-02",
      "ndvi": 0.334,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-03",
      "ndvi": 0.294,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-04",
      "ndvi": 0.331,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-05",
      "ndvi": 0.493,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-06",
      "ndvi": 0.655,
      "nubosidad": 0.22,
      "interpolado": false
     },
     {
      "fecha": "2019-07",
      "ndvi": 0.727,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-08",
      "ndvi": 0.672,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-09",
      "ndvi": 0.62,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-10",
      "ndvi": 0.568,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-11",
      "ndvi": 0.478,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-12",
      "ndvi": 0.439,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-01",
      "ndvi": 0.409,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-02",
      "ndvi": 0.303,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-03",
      "ndvi": 0.281,
      "nubosidad": 0.27,
      "interpolado": false
     },
     {
      "fecha": "2020-04",
      "ndvi": 0.355,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-05",
      "ndvi": 0.344,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-06",
      "ndvi": 0.429,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-07",
      "ndvi": 0.514,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-08",
      "ndvi": 0.598,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-09",
      "ndvi": 0.683,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-10",
      "ndvi": 0.416,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-11",
      "ndvi": 0.451,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-12",
      "ndvi": 0.52,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-01",
      "ndvi": 0.392,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-02",
      "ndvi": 0.238,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-03",
      "ndvi": 0.265,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-04",
      "ndvi": 0.285,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-05",
      "ndvi": 0.392,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-06",
      "ndvi": 0.5,
      "nubosidad": 0.69,
      "interpolado": false
     },
     {
      "fecha": "2021-07",
      "ndvi": 0.514,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-08",
      "ndvi": 0.528,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-09",
      "ndvi": 0.541,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-10",
      "ndvi": 0.555,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-11",
      "ndvi": 0.561,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-12",
      "ndvi": 0.539,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-01",
      "ndvi": 0.436,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-02",
      "ndvi": 0.368,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-03",
      "ndvi": 0.435,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-04",
      "ndvi": 0.503,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-05",
      "ndvi": 0.57,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-06",
      "ndvi": 0.666,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-07",
      "ndvi": 0.583,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-08",
      "ndvi": 0.43,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-09",
      "ndvi": 0.421,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-10",
      "ndvi": 0.575,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-11",
      "ndvi": 0.692,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-12",
      "ndvi": 0.593,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-01",
      "ndvi": 0.447,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-02",
      "ndvi": 0.412,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-03",
      "ndvi": 0.367,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-04",
      "ndvi": 0.468,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-05",
      "ndvi": 0.569,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-06",
      "ndvi": 0.631,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-07",
      "ndvi": 0.722,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-08",
      "ndvi": 0.671,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-09",
      "ndvi": 0.559,
      "nubosidad": 0.35,
      "interpolado": false
     },
     {
      "fecha": "2023-10",
      "ndvi": 0.509,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-11",
      "ndvi": 0.478,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-12",
      "ndvi": 0.512,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-01",
      "ndvi": 0.424,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-02",
      "ndvi": 0.366,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-03",
      "ndvi": 0.314,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-04",
      "ndvi": 0.322,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-05",
      "ndvi": 0.404,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-06",
      "ndvi": 0.419,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-07",
      "ndvi": 0.434,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-08",
      "ndvi": 0.458,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-09",
      "ndvi": 0.482,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-10",
      "ndvi": 0.506,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-11",
      "ndvi": 0.572,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-12",
      "ndvi": 0.58,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-01",
      "ndvi": 0.482,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-02",
      "ndvi": 0.452,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-03",
      "ndvi": 0.493,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-04",
      "ndvi": 0.534,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-05",
      "ndvi": 0.489,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-06",
      "ndvi": 0.447,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-07",
      "ndvi": 0.406,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-08",
      "ndvi": 0.364,
      "nubosidad": 0.29,
      "interpolado": false
     },
     {
      "fecha": "2025-09",
      "ndvi": 0.616,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-10",
      "ndvi": 0.566,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-11",
      "ndvi": 0.484,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-12",
      "ndvi": 0.568,
      "nubosidad": 0.0,
      "interpolado": false
     }
    ],
    "cobertura_meses_medidos": 86,
    "cobertura_meses_totales": 108,
    "ciclos_detectados": 8,
    "ciclos_ultimos_24m": 1,
    "ndvi_pico_promedio": 0.64,
    "rendimiento_estimado_t_ha": 25.48,
    "rendimiento_municipal_eva_t_ha": 30.0,
    "fuente_referencia": "EVA 2018 — VENTAQUEMADA, BOYACA — PAPA",
    "caida_enso_pct": 0.0,
    "amplitud_historica": 0.341,
    "amplitud_reciente_24m": 0.208,
    "perdida_amplitud_pct": 39.0
   },
   "meta-cacao": {
    "desde": "2017-01",
    "hasta": "2025-12",
    "puntos": [
     {
      "fecha": "2017-01",
      "ndvi": 0.837,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-02",
      "ndvi": 0.811,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-03",
      "ndvi": 0.785,
      "nubosidad": 0.26,
      "interpolado": false
     },
     {
      "fecha": "2017-04",
      "ndvi": 0.795,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-05",
      "ndvi": 0.841,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-06",
      "ndvi": 0.886,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-07",
      "ndvi": 0.864,
      "nubosidad": 0.13,
      "interpolado": false
     },
     {
      "fecha": "2017-08",
      "ndvi": 0.842,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-09",
      "ndvi": 0.856,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-10",
      "ndvi": 0.448,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-11",
      "ndvi": 0.819,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-12",
      "ndvi": 0.845,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-01",
      "ndvi": 0.838,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-02",
      "ndvi": 0.806,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-03",
      "ndvi": 0.733,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-04",
      "ndvi": 0.667,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-05",
      "ndvi": 0.602,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-06",
      "ndvi": 0.61,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-07",
      "ndvi": 0.618,
      "nubosidad": 0.53,
      "interpolado": false
     },
     {
      "fecha": "2018-08",
      "ndvi": 0.833,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-09",
      "ndvi": 0.838,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-10",
      "ndvi": 0.805,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-11",
      "ndvi": 0.78,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-12",
      "ndvi": 0.774,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-01",
      "ndvi": 0.749,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-02",
      "ndvi": 0.653,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-03",
      "ndvi": 0.661,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-04",
      "ndvi": 0.668,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-05",
      "ndvi": 0.758,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-06",
      "ndvi": 0.859,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-07",
      "ndvi": 0.487,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-08",
      "ndvi": 0.755,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-09",
      "ndvi": 0.794,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-10",
      "ndvi": 0.833,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-11",
      "ndvi": 0.838,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-12",
      "ndvi": 0.806,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-01",
      "ndvi": 0.774,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-02",
      "ndvi": 0.784,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-03",
      "ndvi": 0.637,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-04",
      "ndvi": 0.603,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-05",
      "ndvi": 0.718,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-06",
      "ndvi": 0.833,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-07",
      "ndvi": 0.568,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-08",
      "ndvi": 0.821,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-09",
      "ndvi": 0.781,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-10",
      "ndvi": 0.791,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-11",
      "ndvi": 0.801,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-12",
      "ndvi": 0.811,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-01",
      "ndvi": 0.821,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-02",
      "ndvi": 0.786,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-03",
      "ndvi": 0.752,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-04",
      "ndvi": 0.778,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-05",
      "ndvi": 0.58,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-06",
      "ndvi": 0.877,
      "nubosidad": 0.25,
      "interpolado": false
     },
     {
      "fecha": "2021-07",
      "ndvi": 0.619,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-08",
      "ndvi": 0.676,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-09",
      "ndvi": 0.733,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-10",
      "ndvi": 0.79,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-11",
      "ndvi": 0.711,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-12",
      "ndvi": 0.822,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-01",
      "ndvi": 0.832,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-02",
      "ndvi": 0.792,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-03",
      "ndvi": 0.327,
      "nubosidad": 0.99,
      "interpolado": false
     },
     {
      "fecha": "2022-04",
      "ndvi": 0.804,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-05",
      "ndvi": 0.854,
      "nubosidad": 0.63,
      "interpolado": false
     },
     {
      "fecha": "2022-06",
      "ndvi": 0.888,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-07",
      "ndvi": 0.504,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-08",
      "ndvi": 0.724,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-09",
      "ndvi": 0.853,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-10",
      "ndvi": 0.859,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-11",
      "ndvi": 0.435,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-12",
      "ndvi": 0.836,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-01",
      "ndvi": 0.84,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-02",
      "ndvi": 0.797,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-03",
      "ndvi": 0.812,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-04",
      "ndvi": 0.827,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-05",
      "ndvi": 0.849,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-06",
      "ndvi": 0.775,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-07",
      "ndvi": 0.818,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-08",
      "ndvi": 0.86,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-09",
      "ndvi": 0.824,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-10",
      "ndvi": 0.88,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-11",
      "ndvi": 0.85,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-12",
      "ndvi": 0.861,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-01",
      "ndvi": 0.84,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-02",
      "ndvi": 0.796,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-03",
      "ndvi": 0.404,
      "nubosidad": 0.47,
      "interpolado": false
     },
     {
      "fecha": "2024-04",
      "ndvi": 0.705,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-05",
      "ndvi": 0.856,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-06",
      "ndvi": 0.897,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-07",
      "ndvi": 0.875,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-08",
      "ndvi": 0.854,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-09",
      "ndvi": 0.835,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-10",
      "ndvi": 0.877,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-11",
      "ndvi": 0.862,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-12",
      "ndvi": 0.855,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-01",
      "ndvi": 0.872,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-02",
      "ndvi": 0.746,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-03",
      "ndvi": 0.752,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-04",
      "ndvi": 0.792,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-05",
      "ndvi": 0.831,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-06",
      "ndvi": 0.871,
      "nubosidad": 0.97,
      "interpolado": false
     },
     {
      "fecha": "2025-07",
      "ndvi": 0.855,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-08",
      "ndvi": 0.859,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-09",
      "ndvi": 0.794,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-10",
      "ndvi": 0.846,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-11",
      "ndvi": 0.479,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-12",
      "ndvi": 0.808,
      "nubosidad": 0.0,
      "interpolado": false
     }
    ],
    "cobertura_meses_medidos": 89,
    "cobertura_meses_totales": 108,
    "ciclos_detectados": 8,
    "ciclos_ultimos_24m": 0,
    "ndvi_pico_promedio": 0.87,
    "rendimiento_estimado_t_ha": 0.72,
    "rendimiento_municipal_eva_t_ha": 0.6,
    "fuente_referencia": "EVA 2018 — GRANADA, META — CACAO",
    "caida_enso_pct": 0.0,
    "amplitud_historica": 0.136,
    "amplitud_reciente_24m": 0.119,
    "perdida_amplitud_pct": 12.5
   }
  },
  "eventos_climaticos": [
   {
    "nombre": "La Niña 2022",
    "desde": "2022-01",
    "hasta": "2022-12",
    "tipo": "exceso_lluvia"
   },
   {
    "nombre": "El Niño 2023-24",
    "desde": "2023-06",
    "hasta": "2024-05",
    "tipo": "sequia"
   }
  ]
 },
 "dictamenes": {
  "version": "1.0",
  "modelo": "NINGUNO — placeholder",
  "nota_ia": "⚠️ PLACEHOLDER. Texto de relleno escrito a mano para desbloquear al frente APP antes de que MOTOR corra el generador. NO son salidas de IA y no deben mostrarse como tales ni aparecer en el video. Se reemplazan por completo al correr `python3 scripts/generar_dictamen.py`, que sobrescribe data/dictamenes.json con salidas reales de Claude.",
  "es_placeholder": true,
  "dictamenes": {
   "huila-cafe": {
    "puntaje": 780,
    "banda_riesgo": "bajo",
    "decision": "aprobar",
    "monto_sugerido_cop": 8400000,
    "linea_finagro": "Capital de trabajo — pequeño productor",
    "cobertura_fag_pct": 80,
    "plazo_meses": 24,
    "desembolso": "Dos tramos, el segundo condicionado a verificación satelital de siembra",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 38
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 18
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 19
     },
     {
      "eje": "Coherencia del destino del crédito",
      "peso": 15,
      "puntaje": 12
     }
    ],
    "evidencia": [
     {
      "tipo": "favorable",
      "texto": "PLACEHOLDER — pendiente de generación por el modelo."
     },
     {
      "tipo": "favorable",
      "texto": "PLACEHOLDER — pendiente de generación por el modelo."
     },
     {
      "tipo": "alerta",
      "texto": "PLACEHOLDER — pendiente de generación por el modelo."
     },
     {
      "tipo": "favorable",
      "texto": "PLACEHOLDER — verificación RTDAF/RUPTA, pendiente de generación por el modelo."
     }
    ],
    "memorando": "PLACEHOLDER. Este bloque se reemplaza por el memorando real que genera Claude a partir de la serie satelital. Existe únicamente para que el frente APP pueda maquetar la pantalla del dictamen y la animación de escritura antes de que el motor de IA esté listo.",
    "recomendacion": "PLACEHOLDER — pendiente de generación por el modelo."
   },
   "tolima-arroz": {
    "puntaje": 640,
    "banda_riesgo": "medio",
    "decision": "aprobar",
    "monto_sugerido_cop": 20000000,
    "linea_finagro": "Capital de trabajo — pequeño productor",
    "cobertura_fag_pct": 80,
    "plazo_meses": 18,
    "desembolso": "Tramo único",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 36
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 17
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 12
     },
     {
      "eje": "Coherencia del destino del crédito",
      "peso": 15,
      "puntaje": 11
     }
    ],
    "evidencia": [
     {
      "tipo": "favorable",
      "texto": "PLACEHOLDER — pendiente de generación por el modelo."
     },
     {
      "tipo": "alerta",
      "texto": "PLACEHOLDER — pendiente de generación por el modelo."
     },
     {
      "tipo": "alerta",
      "texto": "PLACEHOLDER — pendiente de generación por el modelo."
     },
     {
      "tipo": "favorable",
      "texto": "PLACEHOLDER — verificación RTDAF/RUPTA, pendiente de generación por el modelo."
     }
    ],
    "memorando": "PLACEHOLDER. Se reemplaza por la salida real del modelo.",
    "recomendacion": "PLACEHOLDER — pendiente de generación por el modelo."
   },
   "boyaca-papa": {
    "puntaje": 590,
    "banda_riesgo": "medio",
    "decision": "aprobar_con_ajuste",
    "monto_sugerido_cop": 6600000,
    "linea_finagro": "Capital de trabajo — pequeño productor",
    "cobertura_fag_pct": 80,
    "plazo_meses": 12,
    "desembolso": "Dos tramos, el segundo condicionado a verificación satelital de siembra",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 28
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 15
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 16
     },
     {
      "eje": "Coherencia del destino del crédito",
      "peso": 15,
      "puntaje": 10
     }
    ],
    "evidencia": [
     {
      "tipo": "favorable",
      "texto": "PLACEHOLDER — pendiente de generación por el modelo."
     },
     {
      "tipo": "alerta",
      "texto": "PLACEHOLDER — pendiente de generación por el modelo."
     },
     {
      "tipo": "alerta",
      "texto": "PLACEHOLDER — pendiente de generación por el modelo."
     },
     {
      "tipo": "favorable",
      "texto": "PLACEHOLDER — verificación RTDAF/RUPTA, pendiente de generación por el modelo."
     }
    ],
    "memorando": "PLACEHOLDER. Se reemplaza por la salida real del modelo.",
    "recomendacion": "PLACEHOLDER — pendiente de generación por el modelo."
   },
   "meta-cacao": {
    "puntaje": 310,
    "banda_riesgo": "rechazo",
    "decision": "rechazar",
    "monto_sugerido_cop": 0,
    "linea_finagro": "",
    "cobertura_fag_pct": 0,
    "plazo_meses": 0,
    "desembolso": "No aplica",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 12
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 5
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 12
     },
     {
      "eje": "Coherencia del destino del crédito",
      "peso": 15,
      "puntaje": 3
     }
    ],
    "evidencia": [
     {
      "tipo": "critico",
      "texto": "PLACEHOLDER — pendiente de generación por el modelo."
     },
     {
      "tipo": "critico",
      "texto": "PLACEHOLDER — pendiente de generación por el modelo."
     },
     {
      "tipo": "alerta",
      "texto": "PLACEHOLDER — pendiente de generación por el modelo."
     },
     {
      "tipo": "favorable",
      "texto": "PLACEHOLDER — verificación RTDAF/RUPTA, pendiente de generación por el modelo."
     }
    ],
    "memorando": "PLACEHOLDER. Se reemplaza por la salida real del modelo.",
    "recomendacion": "PLACEHOLDER — pendiente de generación por el modelo."
   }
  }
 }
};
