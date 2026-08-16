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
    "tipo_cultivo": "perenne",
    "variedad": "Castillo",
    "area_declarada_ha": 2.4,
    "area_detectada_ha": 2.25,
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
    "tipo_cultivo": "transitorio",
    "variedad": "Fedearroz 67",
    "area_declarada_ha": 6.1,
    "area_detectada_ha": 6.1,
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
    "tipo_cultivo": "transitorio",
    "variedad": "Pastusa Suprema",
    "area_declarada_ha": 1.8,
    "area_detectada_ha": 1.8,
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
    "vereda": "La Esmeralda",
    "municipio": "Granada",
    "departamento": "Meta",
    "coordenadas": {
     "lat": 3.4921,
     "lon": -73.6559
    },
    "cultivo": "Cacao",
    "tipo_cultivo": "perenne",
    "variedad": "CCN-51",
    "area_declarada_ha": 4.0,
    "area_detectada_ha": 0.5,
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
  "verificacion_parcelas": "Coordenadas seleccionadas por barrido sobre la Statistical API de Sentinel Hub (scripts/ingesta_sentinel.py). Criterio: cobertura de meses con observación válida, amplitud de la serie y número de ciclos detectados coherentes con el cultivo.",
  "nota_area": "area_detectada_ha se MIDE con scripts/medir_area.py: rejilla 4x4 sobre el poligono declarado, una serie NDVI real por celda, y se cuenta como agricola la celda vegetada (mediana >= 0.30) con dinamica de manejo (amplitud >= 0.12). Es una estimacion de proporcion, no una delimitacion de linderos."
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
    "cobertura_24m_medidos": 18,
    "cobertura_24m_totales": 24,
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
    "ciclos_ultimos_24m": 3,
    "cobertura_24m_medidos": 16,
    "cobertura_24m_totales": 24,
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
    "cobertura_24m_medidos": 18,
    "cobertura_24m_totales": 24,
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
      "ndvi": 0.853,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-02",
      "ndvi": 0.801,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-03",
      "ndvi": 0.813,
      "nubosidad": 0.64,
      "interpolado": false
     },
     {
      "fecha": "2017-04",
      "ndvi": 0.771,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-05",
      "ndvi": 0.77,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-06",
      "ndvi": 0.768,
      "nubosidad": 0.89,
      "interpolado": false
     },
     {
      "fecha": "2017-07",
      "ndvi": 0.441,
      "nubosidad": 0.05,
      "interpolado": false
     },
     {
      "fecha": "2017-08",
      "ndvi": 0.854,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-09",
      "ndvi": 0.883,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-10",
      "ndvi": 0.878,
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
      "ndvi": 0.83,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-01",
      "ndvi": 0.852,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-02",
      "ndvi": 0.819,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-03",
      "ndvi": 0.764,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-04",
      "ndvi": 0.81,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-05",
      "ndvi": 0.857,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-06",
      "ndvi": 0.73,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-07",
      "ndvi": 0.602,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-08",
      "ndvi": 0.86,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-09",
      "ndvi": 0.855,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-10",
      "ndvi": 0.865,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-11",
      "ndvi": 0.846,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-12",
      "ndvi": 0.827,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-01",
      "ndvi": 0.842,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-02",
      "ndvi": 0.561,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-03",
      "ndvi": 0.281,
      "nubosidad": 0.98,
      "interpolado": false
     },
     {
      "fecha": "2019-04",
      "ndvi": 0.763,
      "nubosidad": 0.06,
      "interpolado": false
     },
     {
      "fecha": "2019-05",
      "ndvi": 0.807,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-06",
      "ndvi": 0.888,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-07",
      "ndvi": 0.37,
      "nubosidad": 0.76,
      "interpolado": false
     },
     {
      "fecha": "2019-08",
      "ndvi": 0.852,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-09",
      "ndvi": 0.828,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-10",
      "ndvi": 0.871,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-11",
      "ndvi": 0.856,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-12",
      "ndvi": 0.843,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-01",
      "ndvi": 0.8,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-02",
      "ndvi": 0.82,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-03",
      "ndvi": 0.7,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-04",
      "ndvi": 0.699,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-05",
      "ndvi": 0.83,
      "nubosidad": 0.44,
      "interpolado": false
     },
     {
      "fecha": "2020-06",
      "ndvi": 0.838,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-07",
      "ndvi": 0.596,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-08",
      "ndvi": 0.865,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-09",
      "ndvi": 0.839,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-10",
      "ndvi": 0.698,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-11",
      "ndvi": 0.594,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-12",
      "ndvi": 0.858,
      "nubosidad": 0.5,
      "interpolado": false
     },
     {
      "fecha": "2021-01",
      "ndvi": 0.853,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-02",
      "ndvi": 0.861,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-03",
      "ndvi": 0.87,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-04",
      "ndvi": 0.878,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-05",
      "ndvi": 0.909,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-06",
      "ndvi": 0.883,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-07",
      "ndvi": 0.765,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-08",
      "ndvi": 0.844,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-09",
      "ndvi": 0.853,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-10",
      "ndvi": 0.877,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-11",
      "ndvi": 0.821,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-12",
      "ndvi": 0.86,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-01",
      "ndvi": 0.839,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-02",
      "ndvi": 0.832,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-03",
      "ndvi": 0.332,
      "nubosidad": 0.97,
      "interpolado": false
     },
     {
      "fecha": "2022-04",
      "ndvi": 0.826,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-05",
      "ndvi": 0.538,
      "nubosidad": 0.99,
      "interpolado": false
     },
     {
      "fecha": "2022-06",
      "ndvi": 0.416,
      "nubosidad": 0.43,
      "interpolado": false
     },
     {
      "fecha": "2022-07",
      "ndvi": 0.817,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-08",
      "ndvi": 0.821,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-09",
      "ndvi": 0.826,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-10",
      "ndvi": 0.864,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-11",
      "ndvi": 0.862,
      "nubosidad": 0.33,
      "interpolado": false
     },
     {
      "fecha": "2022-12",
      "ndvi": 0.546,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-01",
      "ndvi": 0.848,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-02",
      "ndvi": 0.816,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-03",
      "ndvi": 0.821,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-04",
      "ndvi": 0.826,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-05",
      "ndvi": 0.836,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-06",
      "ndvi": 0.365,
      "nubosidad": 0.59,
      "interpolado": false
     },
     {
      "fecha": "2023-07",
      "ndvi": 0.609,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-08",
      "ndvi": 0.854,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-09",
      "ndvi": 0.838,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-10",
      "ndvi": 0.903,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-11",
      "ndvi": 0.87,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-12",
      "ndvi": 0.868,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-01",
      "ndvi": 0.844,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-02",
      "ndvi": 0.805,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-03",
      "ndvi": 0.897,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-04",
      "ndvi": 0.63,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-05",
      "ndvi": 0.855,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-06",
      "ndvi": 0.787,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-07",
      "ndvi": 0.826,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-08",
      "ndvi": 0.864,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-09",
      "ndvi": 0.834,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-10",
      "ndvi": 0.875,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-11",
      "ndvi": 0.821,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-12",
      "ndvi": 0.864,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-01",
      "ndvi": 0.818,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-02",
      "ndvi": 0.772,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-03",
      "ndvi": 0.737,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-04",
      "ndvi": 0.89,
      "nubosidad": 0.38,
      "interpolado": false
     },
     {
      "fecha": "2025-05",
      "ndvi": 0.499,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-06",
      "ndvi": 0.851,
      "nubosidad": 0.93,
      "interpolado": false
     },
     {
      "fecha": "2025-07",
      "ndvi": 0.866,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-08",
      "ndvi": 0.861,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-09",
      "ndvi": 0.82,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-10",
      "ndvi": 0.81,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-11",
      "ndvi": 0.836,
      "nubosidad": 0.77,
      "interpolado": false
     },
     {
      "fecha": "2025-12",
      "ndvi": 0.808,
      "nubosidad": 0.0,
      "interpolado": false
     }
    ],
    "cobertura_meses_medidos": 96,
    "cobertura_meses_totales": 108,
    "ciclos_detectados": 0,
    "ciclos_ultimos_24m": 0,
    "cobertura_24m_medidos": 22,
    "cobertura_24m_totales": 24,
    "ndvi_pico_promedio": 0.88,
    "rendimiento_estimado_t_ha": 0.73,
    "rendimiento_municipal_eva_t_ha": 0.6,
    "fuente_referencia": "EVA 2018 — GRANADA, META — CACAO",
    "caida_enso_pct": 0.0,
    "amplitud_historica": 0.107,
    "amplitud_reciente_24m": 0.092,
    "perdida_amplitud_pct": 14.0
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
  "modelo": "anthropic/claude-opus-5",
  "pasarela": "OpenRouter",
  "nota_ia": "Salidas reales del modelo, generadas por scripts/generar_dictamen.py y commiteadas. El demo las reproduce cacheadas; el prompt completo está en ese mismo archivo y es legible. La forma del JSON está garantizada por structured outputs contra el esquema del contrato de datos.",
  "dictamenes": {
   "huila-cafe": {
    "puntaje": 870,
    "banda_riesgo": "bajo",
    "decision": "aprobar_con_ajuste",
    "monto_sugerido_cop": 8437500,
    "linea_finagro": "Inversión — pequeño productor",
    "cobertura_fag_pct": 80,
    "plazo_meses": 84,
    "desembolso": "Dos tramos: 70% ($5.906.250) al perfeccionamiento de la garantía FAG, destinado a material vegetal y labores de renovación; 30% ($2.531.250) a los 12 meses, condicionado a que la serie NDVI del polígono muestre recuperación de vigor en las celdas renovadas (pico ≥ 0,75) y no registre reducción del área con actividad agrícola por debajo de 2,10 ha.",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 33
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 18
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 23
     },
     {
      "eje": "Coherencia del destino del crédito",
      "peso": 15,
      "puntaje": 13
     }
    ],
    "evidencia": [
     {
      "tipo": "favorable",
      "texto": "Rendimiento estimado del predio de 1,23 t/ha frente a 1,14 t/ha del municipal oficial (EVA 2018 — PITALITO, HUILA — CAFE), es decir 7,9% por encima de la referencia. La cifra del predio es una estimación derivada del vigor satelital, no producción medida."
     },
     {
      "tipo": "favorable",
      "texto": "Resiliencia climática verificada: caída de vigor de 0,0% durante El Niño 2023-24 contra una caída promedio regional de 2,0%, con NDVI pico promedio de 0,79 y pico de 0,84 en 2025, el más alto de los nueve años de serie."
     },
     {
      "tipo": "favorable",
      "texto": "Control anti-despojo RTDAF/RUPTA (Ley 1448 de 2011): sin coincidencias, el predio no figura en el registro ni tiene medida de protección vigente. Verificación ambiental del polígono sin superposición con áreas protegidas ni frontera agrícola excluida."
     },
     {
      "tipo": "alerta",
      "texto": "Área con actividad agrícola detectada de 2,25 ha frente a 2,4 ha declaradas (desvío -6,2%); el monto se ajusta en esa misma proporción, de $9.000.000 a $8.437.500, para que la exposición corresponda al área efectivamente verificada."
     },
     {
      "tipo": "alerta",
      "texto": "Cobertura óptica de 75 de 108 meses (69%); años clave como 2018 (4/12 meses medidos) y 2023 (6/12) sostienen la lectura con información parcial, lo que amplía el intervalo de incertidumbre de la amplitud histórica de 0,123."
     }
    ],
    "memorando": "Se trata de un cultivo perenne (café Castillo) con once años de tenencia y sin historial de crédito formal, por lo que la capacidad de pago se sustenta enteramente en la evidencia satelital. Ninguna causal de rechazo se activa: la pérdida de amplitud contra su propia historia es de 27,6% (0,123 a 0,089), por debajo del umbral de 40%, y el rendimiento estimado de 1,23 t/ha supera el municipal oficial de 1,14 t/ha (EVA 2018 — Pitalito, Huila — Café). Al ser perenne, la baja amplitud reciente refleja ritmo de manejo y es compatible con el destino declarado de renovación; no constituye defecto. El vigor sostenido lo confirma: pico de 0,84 en 2025 y ausencia total de caída durante El Niño 2023-24 frente a 2,0% regional. La limitación del dictamen es la cobertura del dato: 75 de 108 meses con observación utilizable, con 2018 y 2023 medidos apenas en 4 y 6 meses; los meses interpolados no entran en ningún indicador. El área detectada de 2,25 ha obliga a ajustar el monto en proporción. SEEDLLITE no evalúa centrales de riesgo, garantías adicionales ni endeudamiento con otras entidades; esa verificación queda en cabeza del intermediario antes del desembolso.",
    "recomendacion": "Aprobar con ajuste por $8.437.500 bajo línea de Inversión para pequeño productor con cobertura FAG del 80%, condicionando el segundo tramo a la verificación satelital de recuperación de vigor en las celdas renovadas a los 12 meses."
   },
   "tolima-arroz": {
    "puntaje": 850,
    "banda_riesgo": "bajo",
    "decision": "aprobar",
    "monto_sugerido_cop": 22000000,
    "linea_finagro": "Capital de Trabajo — pequeño productor",
    "cobertura_fag_pct": 80,
    "plazo_meses": 12,
    "desembolso": "Tramo único, contra verificación de destino para siembra del semestre B",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 36
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 19
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 16
     },
     {
      "eje": "Coherencia del destino del crédito",
      "peso": 15,
      "puntaje": 14
     }
    ],
    "evidencia": [
     {
      "tipo": "favorable",
      "texto": "14 ciclos completos de siembra-cosecha detectados entre 2017 y 2025, con 3 ciclos en los últimos 24 meses: patrón de diente de sierra continuo, consistente con doble campaña de arroz bajo riego."
     },
     {
      "tipo": "favorable",
      "texto": "Pérdida de amplitud contra su propia historia de apenas 1,3% (histórica 0,756 frente a 0,746 en los últimos 24 meses); ninguna causal de rechazo por colapso del ciclo se activa."
     },
     {
      "tipo": "favorable",
      "texto": "Área con actividad agrícola detectada por Sentinel-2 de 6,1 ha sobre 6,1 ha declaradas (desvío +0,0%); el monto solicitado de $22.000.000 equivale a $3.606.557 por hectárea verificada, proporcional a capital de trabajo de un ciclo de arroz."
     },
     {
      "tipo": "alerta",
      "texto": "Caída de vigor durante El Niño 2023-24 de 8,1% frente a 2,0% del promedio regional, con amplitud de 2024 en 0,54 —la más baja de la serie— lo que indica sensibilidad a restricción hídrica por encima de sus pares del distrito."
     },
     {
      "tipo": "favorable",
      "texto": "Control anti-despojo RTDAF/RUPTA (Ley 1448 de 2011): sin coincidencias ni medida de protección vigente. Verificación ambiental sin superposición con áreas protegidas ni frontera agrícola excluida."
     }
    ],
    "memorando": "Se somete a consideración del comité la solicitud de $22.000.000 de capital de trabajo para siembra de semestre B sobre 6,1 hectáreas en la vereda La Palmita, El Espinal. La serie NDVI de Copernicus Sentinel-2 (2017-01 a 2025-12; 87 de 108 meses con observación óptica utilizable, 21 interpolados y excluidos de los indicadores) muestra un patrón cíclico ininterrumpido: 14 ciclos completos en nueve años, 3 de ellos en los últimos 24 meses, con amplitud actual de 0,746 frente a 0,756 histórica, es decir 1,3% de pérdida. En un cultivo transitorio esa continuidad es el mejor predictor disponible de repago y sustituye razonablemente la ausencia de estados financieros. El rendimiento estimado a partir del vigor satelital es de 8,91 t/ha, por encima de las 7,69 t/ha del dato oficial EVA 2018 — ESPINAL, TOLIMA — ARROZ. El área verificada coincide exactamente con la declarada, de modo que no procede ajuste del monto. La reserva es climática: la caída de vigor de 8,1% durante El Niño 2023-24 cuadruplica el 2,0% regional. El expediente carece de información sobre centrales de riesgo, garantías y endeudamiento con otras entidades; esa verificación corresponde al intermediario.",
    "recomendacion": "Aprobar $22.000.000 en línea de Capital de Trabajo a 12 meses con cobertura FAG del 80%, condicionado a que el intermediario ajuste el calendario de amortización al cierre del ciclo del semestre B y consulte centrales de riesgo antes del desembolso."
   },
   "boyaca-papa": {
    "puntaje": 750,
    "banda_riesgo": "bajo",
    "decision": "aprobar_con_ajuste",
    "monto_sugerido_cop": 6000000,
    "linea_finagro": "Capital de Trabajo — pequeño productor",
    "cobertura_fag_pct": 80,
    "plazo_meses": 12,
    "desembolso": "Dos tramos: 60% ($3.600.000) contra desembolso inicial para compra de semilla certificada y fertilizantes; 40% ($2.400.000) a los 90 días, condicionado a verificación satelital de emergencia del cultivo (recuperación de amplitud NDVI ≥ 0,20 en el ciclo en curso).",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 23
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 18
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 22
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
      "texto": "8 ciclos completos de siembra-cosecha detectados en los 9 años de serie (2017-2025), con amplitud histórica de 0,341: patrón de diente de sierra propio de un transitorio efectivamente sembrado."
     },
     {
      "tipo": "alerta",
      "texto": "Solo 1 ciclo completo en los últimos 24 meses y amplitud 2025 de 0,09 frente a 0,25-0,26 en 2023-2024; la pérdida de amplitud contra su propia historia es de 39,0%, por debajo del umbral de rechazo de 40% pero indicativa de una reducción de la intensidad de siembra."
     },
     {
      "tipo": "favorable",
      "texto": "Caída de vigor durante El Niño 2023-24 de 0,0% frente a 2,0% de caída promedio regional; el año 2023 registró pico 0,72, el segundo más alto de la serie: resiliencia verificada bajo estrés hídrico."
     },
     {
      "tipo": "alerta",
      "texto": "Rendimiento estimado del predio 25,48 t/ha frente a 30,0 t/ha municipales (EVA 2018 — VENTAQUEMADA, BOYACA — PAPA): 85% del referente oficial. Es estimación derivada del vigor satelital, no producción medida."
     },
     {
      "tipo": "favorable",
      "texto": "Controles de originación en firme: RTDAF/RUPTA (Ley 1448 de 2011) sin coincidencias ni medida de protección vigente, y polígono sin superposición con áreas protegidas ni frontera agrícola excluida. Área declarada 1,8 ha frente a 1,8 ha con actividad detectada (desvío +0,0%)."
     }
    ],
    "memorando": "Se somete a consideración del comité la solicitud de Blanca Cecilia Rojas por $7.500.000 sobre 1,8 ha de papa Pastusa Suprema en Ventaquemada, Boyacá. La serie Sentinel-2 confirma un predio en producción: 8 ciclos completos entre 2017 y 2025, área con actividad agrícola coincidente al 100% con la declarada y NDVI pico promedio de 0,64. El comportamiento climático es el punto más sólido del expediente: cero caída de vigor durante El Niño 2023-24 contra 2,0% de caída regional. La reserva es la dinámica reciente: un solo ciclo en 24 meses, amplitud 2025 de 0,09 y pérdida de 39,0% frente a su propia historia. No se activa causal de rechazo —hay ciclo detectable y el área coincide—, pero la intensidad de siembra observada sostiene aproximadamente un ciclo anual, no dos, y el rendimiento estimado equivale al 85% del municipal de EVA 2018. Por ello se recomienda ajustar el monto a $6.000.000 y desembolsar en dos tramos. Limitación del dictamen: 22 de 108 meses fueron interpolados por nubosidad y no alimentan los indicadores; la cobertura efectiva de 86 meses es suficiente pero no plena. SEEDLLITE no evalúa centrales de riesgo, garantías ni endeudamiento con otras entidades: corresponde al intermediario.",
    "recomendacion": "Aprobar con ajuste a $6.000.000 en línea de Capital de Trabajo — pequeño productor con FAG 80%, condicionando el segundo tramo del 40% a la verificación satelital de emergencia del cultivo a los 90 días."
   },
   "meta-cacao": {
    "puntaje": 240,
    "banda_riesgo": "rechazo",
    "decision": "rechazar",
    "monto_sugerido_cop": 0,
    "linea_finagro": "",
    "cobertura_fag_pct": 0,
    "plazo_meses": 0,
    "desembolso": "No aplica: la solicitud se rechaza, no hay desembolso que estructurar.",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 8
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 2
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 12
     },
     {
      "eje": "Coherencia del destino del crédito",
      "peso": 15,
      "puntaje": 2
     }
    ],
    "evidencia": [
     {
      "tipo": "critico",
      "texto": "Área con actividad agrícola detectada por Sentinel-2: 0.5 ha frente a 4.0 ha declaradas (12.5% del polígono, desvío -87.5%), por debajo del umbral del 50% que constituye causal de rechazo automático."
     },
     {
      "tipo": "critico",
      "texto": "La estimación de rendimiento (0.73 t/ha contra 0.6 t/ha del municipal oficial, EVA 2018 — GRANADA, META — CACAO) NO es interpretable en este expediente: se deriva del vigor NDVI y en 3.5 ha del polígono ese vigor corresponde a vegetación permanente sin dinámica de manejo. No se toma como hallazgo favorable."
     },
     {
      "tipo": "alerta",
      "texto": "En 15 de las 16 celdas de la rejilla el NDVI se mantiene alto (pico promedio 0.88) con amplitud de apenas 0.092 en los últimos 24 meses: el patrón es el de cobertura vegetal estable —bosque o rastrojo— y no el de un cacaotal en manejo con poda y recolección."
     },
     {
      "tipo": "favorable",
      "texto": "Verificación RTDAF/RUPTA (Ley 1448 de 2011): sin coincidencias, el predio no figura en el registro ni presenta medida de protección vigente. Verificación ambiental: sin superposición con áreas protegidas ni frontera agrícola excluida."
     },
     {
      "tipo": "favorable",
      "texto": "Cobertura del dato satisfactoria: 96 de 108 meses con observación óptica utilizable (89%); los 12 meses interpolados por nubosidad quedaron excluidos de todos los indicadores, de modo que la conclusión de área no se apoya en relleno."
     }
    ],
    "memorando": "Se recomienda al comité negar la solicitud por $18.000.000. La causal es objetiva y no admite compensación entre ejes: la verificación satelital identifica 0.5 ha con actividad agrícola dentro de un polígono declarado de 4.0 ha, es decir 12.5% del área, muy por debajo del umbral del 50%. El destino declarado —mantenimiento de cacaotal establecido— no es sostenible frente a esa medición: no hay activo productivo de la escala que respalda el monto. Se advierte expresamente que la pérdida de amplitud contra su propia historia es de solo 14.0% y que no hubo caída de vigor durante El Niño 2023-24 frente a 2.0% regional; ninguno de esos dos indicadores se lee como fortaleza, porque provienen de cobertura vegetal permanente y no de un cultivo en manejo. Por la misma razón la estimación de rendimiento de 0.73 t/ha no debe compararse con el municipal de EVA 2018 para Granada, Meta. Siendo cacao un perenne, la ausencia de ciclos de cosecha no se invoca como defecto. Los controles RTDAF/RUPTA y ambiental resultaron limpios, pero no subsanan la inconsistencia de área. Si el productor precisa el polígono efectivamente sembrado, SEEDLLITE puede reevaluar sobre el área corregida.",
    "recomendacion": "Rechazar la solicitud por área con actividad agrícola detectada de 0.5 ha frente a 4.0 ha declaradas (12.5%), con reevaluación posible únicamente si el productor delimita nuevamente el polígono sembrado."
   }
  }
 }
};
