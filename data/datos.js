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
      "ruta": "assets/satelite/huila-cafe-2017.svg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/huila-cafe-2025.svg"
     }
    ],
    "medicion_area": {
     "metodo": "rejilla 4x4 sobre el polígono declarado",
     "celdas_agricolas": 15,
     "celdas_evaluadas": 16,
     "umbral_ndvi_vegetada": 0.3,
     "umbral_amplitud_manejo": 0.12,
     "rejilla": [
      {
       "lat": 1.882878,
       "lon": -76.062622,
       "ndvi_mediana": 0.7,
       "amplitud": 0.163,
       "agricola": true
      },
      {
       "lat": 1.882878,
       "lon": -76.062274,
       "ndvi_mediana": 0.7,
       "amplitud": 0.173,
       "agricola": true
      },
      {
       "lat": 1.882878,
       "lon": -76.061926,
       "ndvi_mediana": 0.7,
       "amplitud": 0.167,
       "agricola": true
      },
      {
       "lat": 1.882878,
       "lon": -76.061578,
       "ndvi_mediana": 0.71,
       "amplitud": 0.104,
       "agricola": false
      },
      {
       "lat": 1.883226,
       "lon": -76.062622,
       "ndvi_mediana": 0.73,
       "amplitud": 0.199,
       "agricola": true
      },
      {
       "lat": 1.883226,
       "lon": -76.062274,
       "ndvi_mediana": 0.71,
       "amplitud": 0.194,
       "agricola": true
      },
      {
       "lat": 1.883226,
       "lon": -76.061926,
       "ndvi_mediana": 0.71,
       "amplitud": 0.159,
       "agricola": true
      },
      {
       "lat": 1.883226,
       "lon": -76.061578,
       "ndvi_mediana": 0.69,
       "amplitud": 0.165,
       "agricola": true
      },
      {
       "lat": 1.883574,
       "lon": -76.062622,
       "ndvi_mediana": 0.7,
       "amplitud": 0.185,
       "agricola": true
      },
      {
       "lat": 1.883574,
       "lon": -76.062274,
       "ndvi_mediana": 0.73,
       "amplitud": 0.198,
       "agricola": true
      },
      {
       "lat": 1.883574,
       "lon": -76.061926,
       "ndvi_mediana": 0.7,
       "amplitud": 0.152,
       "agricola": true
      },
      {
       "lat": 1.883574,
       "lon": -76.061578,
       "ndvi_mediana": 0.68,
       "amplitud": 0.182,
       "agricola": true
      },
      {
       "lat": 1.883922,
       "lon": -76.062622,
       "ndvi_mediana": 0.73,
       "amplitud": 0.17,
       "agricola": true
      },
      {
       "lat": 1.883922,
       "lon": -76.062274,
       "ndvi_mediana": 0.74,
       "amplitud": 0.209,
       "agricola": true
      },
      {
       "lat": 1.883922,
       "lon": -76.061926,
       "ndvi_mediana": 0.73,
       "amplitud": 0.191,
       "agricola": true
      },
      {
       "lat": 1.883922,
       "lon": -76.061578,
       "ndvi_mediana": 0.71,
       "amplitud": 0.155,
       "agricola": true
      }
     ]
    }
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
      "ruta": "assets/satelite/tolima-arroz-2017.svg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/tolima-arroz-2025.svg"
     }
    ],
    "medicion_area": {
     "metodo": "rejilla 4x4 sobre el polígono declarado",
     "celdas_agricolas": 16,
     "celdas_evaluadas": 16,
     "umbral_ndvi_vegetada": 0.3,
     "umbral_amplitud_manejo": 0.12,
     "rejilla": [
      {
       "lat": 4.178068,
       "lon": -74.884434,
       "ndvi_mediana": 0.4,
       "amplitud": 0.814,
       "agricola": true
      },
      {
       "lat": 4.178068,
       "lon": -74.883878,
       "ndvi_mediana": 0.43,
       "amplitud": 0.801,
       "agricola": true
      },
      {
       "lat": 4.178068,
       "lon": -74.883322,
       "ndvi_mediana": 0.45,
       "amplitud": 0.807,
       "agricola": true
      },
      {
       "lat": 4.178068,
       "lon": -74.882766,
       "ndvi_mediana": 0.48,
       "amplitud": 0.799,
       "agricola": true
      },
      {
       "lat": 4.178623,
       "lon": -74.884434,
       "ndvi_mediana": 0.54,
       "amplitud": 0.711,
       "agricola": true
      },
      {
       "lat": 4.178623,
       "lon": -74.883878,
       "ndvi_mediana": 0.53,
       "amplitud": 0.719,
       "agricola": true
      },
      {
       "lat": 4.178623,
       "lon": -74.883322,
       "ndvi_mediana": 0.5,
       "amplitud": 0.718,
       "agricola": true
      },
      {
       "lat": 4.178623,
       "lon": -74.882766,
       "ndvi_mediana": 0.5,
       "amplitud": 0.76,
       "agricola": true
      },
      {
       "lat": 4.179177,
       "lon": -74.884434,
       "ndvi_mediana": 0.49,
       "amplitud": 0.772,
       "agricola": true
      },
      {
       "lat": 4.179177,
       "lon": -74.883878,
       "ndvi_mediana": 0.51,
       "amplitud": 0.761,
       "agricola": true
      },
      {
       "lat": 4.179177,
       "lon": -74.883322,
       "ndvi_mediana": 0.49,
       "amplitud": 0.765,
       "agricola": true
      },
      {
       "lat": 4.179177,
       "lon": -74.882766,
       "ndvi_mediana": 0.43,
       "amplitud": 0.78,
       "agricola": true
      },
      {
       "lat": 4.179732,
       "lon": -74.884434,
       "ndvi_mediana": 0.51,
       "amplitud": 0.784,
       "agricola": true
      },
      {
       "lat": 4.179732,
       "lon": -74.883878,
       "ndvi_mediana": 0.54,
       "amplitud": 0.781,
       "agricola": true
      },
      {
       "lat": 4.179732,
       "lon": -74.883322,
       "ndvi_mediana": 0.48,
       "amplitud": 0.771,
       "agricola": true
      },
      {
       "lat": 4.179732,
       "lon": -74.882766,
       "ndvi_mediana": 0.47,
       "amplitud": 0.781,
       "agricola": true
      }
     ]
    }
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
      "ruta": "assets/satelite/boyaca-papa-2017.svg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/boyaca-papa-2025.svg"
     }
    ],
    "medicion_area": {
     "metodo": "rejilla 4x4 sobre el polígono declarado",
     "celdas_agricolas": 16,
     "celdas_evaluadas": 16,
     "umbral_ndvi_vegetada": 0.3,
     "umbral_amplitud_manejo": 0.12,
     "rejilla": [
      {
       "lat": 5.336748,
       "lon": -73.492254,
       "ndvi_mediana": 0.49,
       "amplitud": 0.341,
       "agricola": true
      },
      {
       "lat": 5.336748,
       "lon": -73.491951,
       "ndvi_mediana": 0.49,
       "amplitud": 0.225,
       "agricola": true
      },
      {
       "lat": 5.336748,
       "lon": -73.491649,
       "ndvi_mediana": 0.61,
       "amplitud": 0.208,
       "agricola": true
      },
      {
       "lat": 5.336748,
       "lon": -73.491346,
       "ndvi_mediana": 0.56,
       "amplitud": 0.267,
       "agricola": true
      },
      {
       "lat": 5.337049,
       "lon": -73.492254,
       "ndvi_mediana": 0.45,
       "amplitud": 0.372,
       "agricola": true
      },
      {
       "lat": 5.337049,
       "lon": -73.491951,
       "ndvi_mediana": 0.45,
       "amplitud": 0.336,
       "agricola": true
      },
      {
       "lat": 5.337049,
       "lon": -73.491649,
       "ndvi_mediana": 0.5,
       "amplitud": 0.321,
       "agricola": true
      },
      {
       "lat": 5.337049,
       "lon": -73.491346,
       "ndvi_mediana": 0.42,
       "amplitud": 0.309,
       "agricola": true
      },
      {
       "lat": 5.337351,
       "lon": -73.492254,
       "ndvi_mediana": 0.46,
       "amplitud": 0.366,
       "agricola": true
      },
      {
       "lat": 5.337351,
       "lon": -73.491951,
       "ndvi_mediana": 0.43,
       "amplitud": 0.312,
       "agricola": true
      },
      {
       "lat": 5.337351,
       "lon": -73.491649,
       "ndvi_mediana": 0.5,
       "amplitud": 0.365,
       "agricola": true
      },
      {
       "lat": 5.337351,
       "lon": -73.491346,
       "ndvi_mediana": 0.41,
       "amplitud": 0.393,
       "agricola": true
      },
      {
       "lat": 5.337652,
       "lon": -73.492254,
       "ndvi_mediana": 0.41,
       "amplitud": 0.392,
       "agricola": true
      },
      {
       "lat": 5.337652,
       "lon": -73.491951,
       "ndvi_mediana": 0.4,
       "amplitud": 0.407,
       "agricola": true
      },
      {
       "lat": 5.337652,
       "lon": -73.491649,
       "ndvi_mediana": 0.5,
       "amplitud": 0.324,
       "agricola": true
      },
      {
       "lat": 5.337652,
       "lon": -73.491346,
       "ndvi_mediana": 0.4,
       "amplitud": 0.375,
       "agricola": true
      }
     ]
    }
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
      "anio": 2017,
      "ruta": "assets/satelite/meta-cacao-2017.svg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/meta-cacao-2025.svg"
     }
    ],
    "medicion_area": {
     "metodo": "rejilla 4x4 sobre el polígono declarado",
     "celdas_agricolas": 2,
     "celdas_evaluadas": 16,
     "umbral_ndvi_vegetada": 0.3,
     "umbral_amplitud_manejo": 0.12,
     "rejilla": [
      {
       "lat": 3.491426,
       "lon": -73.656575,
       "ndvi_mediana": 0.83,
       "amplitud": 0.097,
       "agricola": false
      },
      {
       "lat": 3.491426,
       "lon": -73.656125,
       "ndvi_mediana": 0.82,
       "amplitud": 0.108,
       "agricola": false
      },
      {
       "lat": 3.491426,
       "lon": -73.655675,
       "ndvi_mediana": 0.83,
       "amplitud": 0.107,
       "agricola": false
      },
      {
       "lat": 3.491426,
       "lon": -73.655225,
       "ndvi_mediana": 0.84,
       "amplitud": 0.09,
       "agricola": false
      },
      {
       "lat": 3.491875,
       "lon": -73.656575,
       "ndvi_mediana": 0.85,
       "amplitud": 0.092,
       "agricola": false
      },
      {
       "lat": 3.491875,
       "lon": -73.656125,
       "ndvi_mediana": 0.83,
       "amplitud": 0.094,
       "agricola": false
      },
      {
       "lat": 3.491875,
       "lon": -73.655675,
       "ndvi_mediana": 0.83,
       "amplitud": 0.085,
       "agricola": false
      },
      {
       "lat": 3.491875,
       "lon": -73.655225,
       "ndvi_mediana": 0.83,
       "amplitud": 0.09,
       "agricola": false
      },
      {
       "lat": 3.492325,
       "lon": -73.656575,
       "ndvi_mediana": 0.86,
       "amplitud": 0.08,
       "agricola": false
      },
      {
       "lat": 3.492325,
       "lon": -73.656125,
       "ndvi_mediana": 0.85,
       "amplitud": 0.08,
       "agricola": false
      },
      {
       "lat": 3.492325,
       "lon": -73.655675,
       "ndvi_mediana": 0.83,
       "amplitud": 0.084,
       "agricola": false
      },
      {
       "lat": 3.492325,
       "lon": -73.655225,
       "ndvi_mediana": 0.74,
       "amplitud": 0.158,
       "agricola": true
      },
      {
       "lat": 3.492774,
       "lon": -73.656575,
       "ndvi_mediana": 0.85,
       "amplitud": 0.086,
       "agricola": false
      },
      {
       "lat": 3.492774,
       "lon": -73.656125,
       "ndvi_mediana": 0.84,
       "amplitud": 0.084,
       "agricola": false
      },
      {
       "lat": 3.492774,
       "lon": -73.655675,
       "ndvi_mediana": 0.82,
       "amplitud": 0.099,
       "agricola": false
      },
      {
       "lat": 3.492774,
       "lon": -73.655225,
       "ndvi_mediana": 0.76,
       "amplitud": 0.164,
       "agricola": true
      }
     ]
    }
   },
   {
    "id": "boyaca-papa-nubes",
    "productor": "Rosalba Cárdenas Fonseca",
    "tipo_productor": "pequeño",
    "vereda": "Puente de Boyacá",
    "municipio": "Ventaquemada",
    "departamento": "Boyacá",
    "coordenadas": {
     "lat": 5.3672,
     "lon": -73.5518
    },
    "cultivo": "Papa",
    "tipo_cultivo": "transitorio",
    "variedad": "Pastusa suprema",
    "area_declarada_ha": 1.6,
    "area_detectada_ha": 1.6,
    "monto_solicitado_cop": 6800000,
    "destino": "Compra de semilla certificada y fertilizante para dos ciclos",
    "activos_declarados_smmlv": 33,
    "anos_en_el_predio": 9,
    "credito_previo": false,
    "imagenes_satelitales": [
     {
      "anio": 2017,
      "ruta": "assets/satelite/boyaca-papa-nubes-2017.svg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/boyaca-papa-nubes-2025.svg"
     }
    ],
    "medicion_area": {
     "metodo": "rejilla 4x4 sobre el polígono declarado",
     "celdas_agricolas": 16,
     "celdas_evaluadas": 16,
     "umbral_ndvi_vegetada": 0.3,
     "umbral_amplitud_manejo": 0.12,
     "rejilla": [
      {
       "lat": 5.366774,
       "lon": -73.552228,
       "ndvi_mediana": 0.65,
       "amplitud": 0.382,
       "agricola": true
      },
      {
       "lat": 5.366774,
       "lon": -73.551943,
       "ndvi_mediana": 0.63,
       "amplitud": 0.398,
       "agricola": true
      },
      {
       "lat": 5.366774,
       "lon": -73.551657,
       "ndvi_mediana": 0.6,
       "amplitud": 0.478,
       "agricola": true
      },
      {
       "lat": 5.366774,
       "lon": -73.551372,
       "ndvi_mediana": 0.55,
       "amplitud": 0.328,
       "agricola": true
      },
      {
       "lat": 5.367058,
       "lon": -73.552228,
       "ndvi_mediana": 0.64,
       "amplitud": 0.46,
       "agricola": true
      },
      {
       "lat": 5.367058,
       "lon": -73.551943,
       "ndvi_mediana": 0.64,
       "amplitud": 0.386,
       "agricola": true
      },
      {
       "lat": 5.367058,
       "lon": -73.551657,
       "ndvi_mediana": 0.63,
       "amplitud": 0.453,
       "agricola": true
      },
      {
       "lat": 5.367058,
       "lon": -73.551372,
       "ndvi_mediana": 0.59,
       "amplitud": 0.387,
       "agricola": true
      },
      {
       "lat": 5.367342,
       "lon": -73.552228,
       "ndvi_mediana": 0.6,
       "amplitud": 0.508,
       "agricola": true
      },
      {
       "lat": 5.367342,
       "lon": -73.551943,
       "ndvi_mediana": 0.61,
       "amplitud": 0.536,
       "agricola": true
      },
      {
       "lat": 5.367342,
       "lon": -73.551657,
       "ndvi_mediana": 0.64,
       "amplitud": 0.437,
       "agricola": true
      },
      {
       "lat": 5.367342,
       "lon": -73.551372,
       "ndvi_mediana": 0.57,
       "amplitud": 0.456,
       "agricola": true
      },
      {
       "lat": 5.367626,
       "lon": -73.552228,
       "ndvi_mediana": 0.62,
       "amplitud": 0.518,
       "agricola": true
      },
      {
       "lat": 5.367626,
       "lon": -73.551943,
       "ndvi_mediana": 0.58,
       "amplitud": 0.481,
       "agricola": true
      },
      {
       "lat": 5.367626,
       "lon": -73.551657,
       "ndvi_mediana": 0.59,
       "amplitud": 0.585,
       "agricola": true
      },
      {
       "lat": 5.367626,
       "lon": -73.551372,
       "ndvi_mediana": 0.66,
       "amplitud": 0.496,
       "agricola": true
      }
     ]
    }
   },
   {
    "id": "meta-cacao-productivo",
    "productor": "Aníbal Reyes Ospina",
    "tipo_productor": "pequeño",
    "vereda": "Canaguaro",
    "municipio": "Granada",
    "departamento": "Meta",
    "coordenadas": {
     "lat": 3.5031,
     "lon": -73.7059
    },
    "cultivo": "Cacao",
    "tipo_cultivo": "perenne",
    "variedad": "CCN-51",
    "area_declarada_ha": 4.5,
    "area_detectada_ha": 4.5,
    "monto_solicitado_cop": 16000000,
    "destino": "Mantenimiento de cacaotal en producción y compra de insumos",
    "activos_declarados_smmlv": 58,
    "anos_en_el_predio": 14,
    "credito_previo": true,
    "imagenes_satelitales": [
     {
      "anio": 2017,
      "ruta": "assets/satelite/meta-cacao-productivo-2017.svg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/meta-cacao-productivo-2025.svg"
     }
    ],
    "medicion_area": {
     "metodo": "rejilla 4x4 sobre el polígono declarado",
     "celdas_agricolas": 16,
     "celdas_evaluadas": 16,
     "umbral_ndvi_vegetada": 0.3,
     "umbral_amplitud_manejo": 0.12,
     "rejilla": [
      {
       "lat": 3.502385,
       "lon": -73.706616,
       "ndvi_mediana": 0.5,
       "amplitud": 0.501,
       "agricola": true
      },
      {
       "lat": 3.502385,
       "lon": -73.706139,
       "ndvi_mediana": 0.47,
       "amplitud": 0.543,
       "agricola": true
      },
      {
       "lat": 3.502385,
       "lon": -73.705661,
       "ndvi_mediana": 0.44,
       "amplitud": 0.663,
       "agricola": true
      },
      {
       "lat": 3.502385,
       "lon": -73.705184,
       "ndvi_mediana": 0.43,
       "amplitud": 0.668,
       "agricola": true
      },
      {
       "lat": 3.502862,
       "lon": -73.706616,
       "ndvi_mediana": 0.54,
       "amplitud": 0.601,
       "agricola": true
      },
      {
       "lat": 3.502862,
       "lon": -73.706139,
       "ndvi_mediana": 0.51,
       "amplitud": 0.443,
       "agricola": true
      },
      {
       "lat": 3.502862,
       "lon": -73.705661,
       "ndvi_mediana": 0.46,
       "amplitud": 0.62,
       "agricola": true
      },
      {
       "lat": 3.502862,
       "lon": -73.705184,
       "ndvi_mediana": 0.41,
       "amplitud": 0.643,
       "agricola": true
      },
      {
       "lat": 3.503338,
       "lon": -73.706616,
       "ndvi_mediana": 0.68,
       "amplitud": 0.275,
       "agricola": true
      },
      {
       "lat": 3.503338,
       "lon": -73.706139,
       "ndvi_mediana": 0.5,
       "amplitud": 0.509,
       "agricola": true
      },
      {
       "lat": 3.503338,
       "lon": -73.705661,
       "ndvi_mediana": 0.44,
       "amplitud": 0.635,
       "agricola": true
      },
      {
       "lat": 3.503338,
       "lon": -73.705184,
       "ndvi_mediana": 0.44,
       "amplitud": 0.63,
       "agricola": true
      },
      {
       "lat": 3.503815,
       "lon": -73.706616,
       "ndvi_mediana": 0.59,
       "amplitud": 0.314,
       "agricola": true
      },
      {
       "lat": 3.503815,
       "lon": -73.706139,
       "ndvi_mediana": 0.43,
       "amplitud": 0.611,
       "agricola": true
      },
      {
       "lat": 3.503815,
       "lon": -73.705661,
       "ndvi_mediana": 0.44,
       "amplitud": 0.629,
       "agricola": true
      },
      {
       "lat": 3.503815,
       "lon": -73.705184,
       "ndvi_mediana": 0.44,
       "amplitud": 0.583,
       "agricola": true
      }
     ]
    }
   },
   {
    "id": "meta-cacao-sin-manejo",
    "productor": "Gilma Peñaloza Arias",
    "tipo_productor": "pequeño",
    "vereda": "Puerto Caldas",
    "municipio": "Granada",
    "departamento": "Meta",
    "coordenadas": {
     "lat": 3.5681,
     "lon": -73.6669
    },
    "cultivo": "Cacao",
    "tipo_cultivo": "perenne",
    "variedad": "Criollo regional",
    "area_declarada_ha": 3.8,
    "area_detectada_ha": 2.61,
    "monto_solicitado_cop": 15000000,
    "destino": "Renovación de cacaotal y control de sombrío",
    "activos_declarados_smmlv": 44,
    "anos_en_el_predio": 12,
    "credito_previo": false,
    "imagenes_satelitales": [
     {
      "anio": 2017,
      "ruta": "assets/satelite/meta-cacao-sin-manejo-2017.svg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/meta-cacao-sin-manejo-2025.svg"
     }
    ],
    "medicion_area": {
     "metodo": "rejilla 4x4 sobre el polígono declarado",
     "celdas_agricolas": 11,
     "celdas_evaluadas": 16,
     "umbral_ndvi_vegetada": 0.3,
     "umbral_amplitud_manejo": 0.12,
     "rejilla": [
      {
       "lat": 3.567443,
       "lon": -73.667558,
       "ndvi_mediana": 0.77,
       "amplitud": 0.15,
       "agricola": true
      },
      {
       "lat": 3.567443,
       "lon": -73.667119,
       "ndvi_mediana": 0.63,
       "amplitud": 0.347,
       "agricola": true
      },
      {
       "lat": 3.567443,
       "lon": -73.666681,
       "ndvi_mediana": 0.66,
       "amplitud": 0.355,
       "agricola": true
      },
      {
       "lat": 3.567443,
       "lon": -73.666242,
       "ndvi_mediana": 0.67,
       "amplitud": 0.416,
       "agricola": true
      },
      {
       "lat": 3.567881,
       "lon": -73.667558,
       "ndvi_mediana": 0.81,
       "amplitud": 0.122,
       "agricola": true
      },
      {
       "lat": 3.567881,
       "lon": -73.667119,
       "ndvi_mediana": 0.7,
       "amplitud": 0.283,
       "agricola": true
      },
      {
       "lat": 3.567881,
       "lon": -73.666681,
       "ndvi_mediana": 0.67,
       "amplitud": 0.304,
       "agricola": true
      },
      {
       "lat": 3.567881,
       "lon": -73.666242,
       "ndvi_mediana": 0.69,
       "amplitud": 0.33,
       "agricola": true
      },
      {
       "lat": 3.568319,
       "lon": -73.667558,
       "ndvi_mediana": 0.84,
       "amplitud": 0.087,
       "agricola": false
      },
      {
       "lat": 3.568319,
       "lon": -73.667119,
       "ndvi_mediana": 0.84,
       "amplitud": 0.096,
       "agricola": false
      },
      {
       "lat": 3.568319,
       "lon": -73.666681,
       "ndvi_mediana": 0.72,
       "amplitud": 0.275,
       "agricola": true
      },
      {
       "lat": 3.568319,
       "lon": -73.666242,
       "ndvi_mediana": 0.66,
       "amplitud": 0.351,
       "agricola": true
      },
      {
       "lat": 3.568757,
       "lon": -73.667558,
       "ndvi_mediana": 0.84,
       "amplitud": 0.086,
       "agricola": false
      },
      {
       "lat": 3.568757,
       "lon": -73.667119,
       "ndvi_mediana": 0.84,
       "amplitud": 0.096,
       "agricola": false
      },
      {
       "lat": 3.568757,
       "lon": -73.666681,
       "ndvi_mediana": 0.83,
       "amplitud": 0.09,
       "agricola": false
      },
      {
       "lat": 3.568757,
       "lon": -73.666242,
       "ndvi_mediana": 0.79,
       "amplitud": 0.128,
       "agricola": true
      }
     ]
    }
   },
   {
    "id": "boyaca-papa-media",
    "productor": "Efraín Buitrago Sáenz",
    "tipo_productor": "pequeño",
    "vereda": "Parroquia Vieja",
    "municipio": "Ventaquemada",
    "departamento": "Boyacá",
    "coordenadas": {
     "lat": 5.3372,
     "lon": -73.5318
    },
    "cultivo": "Papa",
    "tipo_cultivo": "transitorio",
    "variedad": "Diacol capiro",
    "area_declarada_ha": 2.1,
    "area_detectada_ha": 2.1,
    "monto_solicitado_cop": 8200000,
    "destino": "Capital de trabajo para el ciclo de siembra",
    "activos_declarados_smmlv": 39,
    "anos_en_el_predio": 16,
    "credito_previo": true,
    "imagenes_satelitales": [
     {
      "anio": 2017,
      "ruta": "assets/satelite/boyaca-papa-media-2017.svg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/boyaca-papa-media-2025.svg"
     }
    ],
    "medicion_area": {
     "metodo": "rejilla 4x4 sobre el polígono declarado",
     "celdas_agricolas": 16,
     "celdas_evaluadas": 16,
     "umbral_ndvi_vegetada": 0.3,
     "umbral_amplitud_manejo": 0.12,
     "rejilla": [
      {
       "lat": 5.336712,
       "lon": -73.53229,
       "ndvi_mediana": 0.74,
       "amplitud": 0.32,
       "agricola": true
      },
      {
       "lat": 5.336712,
       "lon": -73.531963,
       "ndvi_mediana": 0.56,
       "amplitud": 0.294,
       "agricola": true
      },
      {
       "lat": 5.336712,
       "lon": -73.531637,
       "ndvi_mediana": 0.68,
       "amplitud": 0.404,
       "agricola": true
      },
      {
       "lat": 5.336712,
       "lon": -73.53131,
       "ndvi_mediana": 0.58,
       "amplitud": 0.418,
       "agricola": true
      },
      {
       "lat": 5.337037,
       "lon": -73.53229,
       "ndvi_mediana": 0.77,
       "amplitud": 0.295,
       "agricola": true
      },
      {
       "lat": 5.337037,
       "lon": -73.531963,
       "ndvi_mediana": 0.5,
       "amplitud": 0.188,
       "agricola": true
      },
      {
       "lat": 5.337037,
       "lon": -73.531637,
       "ndvi_mediana": 0.69,
       "amplitud": 0.377,
       "agricola": true
      },
      {
       "lat": 5.337037,
       "lon": -73.53131,
       "ndvi_mediana": 0.62,
       "amplitud": 0.393,
       "agricola": true
      },
      {
       "lat": 5.337363,
       "lon": -73.53229,
       "ndvi_mediana": 0.78,
       "amplitud": 0.321,
       "agricola": true
      },
      {
       "lat": 5.337363,
       "lon": -73.531963,
       "ndvi_mediana": 0.74,
       "amplitud": 0.4,
       "agricola": true
      },
      {
       "lat": 5.337363,
       "lon": -73.531637,
       "ndvi_mediana": 0.63,
       "amplitud": 0.43,
       "agricola": true
      },
      {
       "lat": 5.337363,
       "lon": -73.53131,
       "ndvi_mediana": 0.62,
       "amplitud": 0.422,
       "agricola": true
      },
      {
       "lat": 5.337688,
       "lon": -73.53229,
       "ndvi_mediana": 0.78,
       "amplitud": 0.294,
       "agricola": true
      },
      {
       "lat": 5.337688,
       "lon": -73.531963,
       "ndvi_mediana": 0.71,
       "amplitud": 0.427,
       "agricola": true
      },
      {
       "lat": 5.337688,
       "lon": -73.531637,
       "ndvi_mediana": 0.64,
       "amplitud": 0.454,
       "agricola": true
      },
      {
       "lat": 5.337688,
       "lon": -73.53131,
       "ndvi_mediana": 0.69,
       "amplitud": 0.346,
       "agricola": true
      }
     ]
    }
   },
   {
    "id": "meta-cacao-vigor-bajo",
    "productor": "Nohora Elvira Cuéllar",
    "tipo_productor": "pequeño",
    "vereda": "La Playa",
    "municipio": "Granada",
    "departamento": "Meta",
    "coordenadas": {
     "lat": 3.5811,
     "lon": -73.6929
    },
    "cultivo": "Cacao",
    "tipo_cultivo": "perenne",
    "variedad": "ICS-95",
    "area_declarada_ha": 4.2,
    "area_detectada_ha": 1.84,
    "monto_solicitado_cop": 14500000,
    "destino": "Poda de rehabilitación y renovación parcial",
    "activos_declarados_smmlv": 51,
    "anos_en_el_predio": 10,
    "credito_previo": true,
    "imagenes_satelitales": [
     {
      "anio": 2017,
      "ruta": "assets/satelite/meta-cacao-vigor-bajo-2017.svg"
     },
     {
      "anio": 2025,
      "ruta": "assets/satelite/meta-cacao-vigor-bajo-2025.svg"
     }
    ],
    "medicion_area": {
     "metodo": "rejilla 4x4 sobre el polígono declarado",
     "celdas_agricolas": 7,
     "celdas_evaluadas": 16,
     "umbral_ndvi_vegetada": 0.3,
     "umbral_amplitud_manejo": 0.12,
     "rejilla": [
      {
       "lat": 3.58041,
       "lon": -73.693592,
       "ndvi_mediana": 0.58,
       "amplitud": 0.117,
       "agricola": false
      },
      {
       "lat": 3.58041,
       "lon": -73.693131,
       "ndvi_mediana": 0.63,
       "amplitud": 0.14,
       "agricola": true
      },
      {
       "lat": 3.58041,
       "lon": -73.692669,
       "ndvi_mediana": 0.58,
       "amplitud": 0.16,
       "agricola": true
      },
      {
       "lat": 3.58041,
       "lon": -73.692208,
       "ndvi_mediana": 0.58,
       "amplitud": 0.156,
       "agricola": true
      },
      {
       "lat": 3.58087,
       "lon": -73.693592,
       "ndvi_mediana": 0.64,
       "amplitud": 0.132,
       "agricola": true
      },
      {
       "lat": 3.58087,
       "lon": -73.693131,
       "ndvi_mediana": 0.81,
       "amplitud": 0.111,
       "agricola": false
      },
      {
       "lat": 3.58087,
       "lon": -73.692669,
       "ndvi_mediana": 0.8,
       "amplitud": 0.125,
       "agricola": true
      },
      {
       "lat": 3.58087,
       "lon": -73.692208,
       "ndvi_mediana": 0.83,
       "amplitud": 0.12,
       "agricola": true
      },
      {
       "lat": 3.58133,
       "lon": -73.693592,
       "ndvi_mediana": 0.8,
       "amplitud": 0.12,
       "agricola": true
      },
      {
       "lat": 3.58133,
       "lon": -73.693131,
       "ndvi_mediana": 0.82,
       "amplitud": 0.109,
       "agricola": false
      },
      {
       "lat": 3.58133,
       "lon": -73.692669,
       "ndvi_mediana": 0.83,
       "amplitud": 0.101,
       "agricola": false
      },
      {
       "lat": 3.58133,
       "lon": -73.692208,
       "ndvi_mediana": 0.83,
       "amplitud": 0.106,
       "agricola": false
      },
      {
       "lat": 3.58179,
       "lon": -73.693592,
       "ndvi_mediana": 0.82,
       "amplitud": 0.1,
       "agricola": false
      },
      {
       "lat": 3.58179,
       "lon": -73.693131,
       "ndvi_mediana": 0.83,
       "amplitud": 0.085,
       "agricola": false
      },
      {
       "lat": 3.58179,
       "lon": -73.692669,
       "ndvi_mediana": 0.83,
       "amplitud": 0.094,
       "agricola": false
      },
      {
       "lat": 3.58179,
       "lon": -73.692208,
       "ndvi_mediana": 0.83,
       "amplitud": 0.109,
       "agricola": false
      }
     ]
    }
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
  "caida_enso_regional_pct": 1.6,
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
    "perdida_amplitud_pct": 27.6,
    "incertidumbre": {
     "amplitud_ic95": [
      0.055,
      0.162
     ],
     "amplitud_reciente_ic95": [
      0.046,
      0.279
     ],
     "area_ic95": [
      0.717,
      0.989
     ],
     "area_techo_cruza_umbral": true,
     "prob_falso_negativo": 0.0069,
     "margenes": {
      "area_vs_50pct": {
       "valor": 0.9375,
       "umbral": 0.5,
       "distancia": 0.4375,
       "distancia_relativa_pct": 87.5,
       "cruza": true
      },
      "cobertura_vs_12m": {
       "valor": 18.0,
       "umbral": 12.0,
       "distancia": 6.0,
       "distancia_relativa_pct": 50.0,
       "cruza": true
      },
      "perdida_vs_40pct": {
       "valor": 27.6,
       "umbral": 40.0,
       "distancia": 12.4,
       "distancia_relativa_pct": 31.0,
       "cruza": true
      },
      "amplitud_vs_piso": {
       "valor": 0.123,
       "umbral": 0.12,
       "distancia": 0.003,
       "distancia_relativa_pct": 2.5,
       "cruza": true
      }
     },
     "nota": "Intervalos al 95%. La amplitud usa bootstrap por bloques móviles de 4 meses, que respeta la dependencia temporal de la serie. El área usa el intervalo de Wilson sobre las celdas de la rejilla. La probabilidad de falso negativo simula ciclos reales de 5 meses contra la cobertura observada."
    }
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
    "perdida_amplitud_pct": 1.3,
    "incertidumbre": {
     "amplitud_ic95": [
      0.623,
      0.784
     ],
     "amplitud_reciente_ic95": [
      0.3,
      0.782
     ],
     "area_ic95": [
      0.806,
      1.0
     ],
     "area_techo_cruza_umbral": true,
     "prob_falso_negativo": 0.0237,
     "margenes": {
      "area_vs_50pct": {
       "valor": 1.0,
       "umbral": 0.5,
       "distancia": 0.5,
       "distancia_relativa_pct": 100.0,
       "cruza": true
      },
      "cobertura_vs_12m": {
       "valor": 16.0,
       "umbral": 12.0,
       "distancia": 4.0,
       "distancia_relativa_pct": 33.3,
       "cruza": true
      },
      "amplitud_vs_piso": {
       "valor": 0.756,
       "umbral": 0.12,
       "distancia": 0.636,
       "distancia_relativa_pct": 530.0,
       "cruza": true
      }
     },
     "nota": "Intervalos al 95%. La amplitud usa bootstrap por bloques móviles de 4 meses, que respeta la dependencia temporal de la serie. El área usa el intervalo de Wilson sobre las celdas de la rejilla. La probabilidad de falso negativo simula ciclos reales de 5 meses contra la cobertura observada."
    }
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
    "perdida_amplitud_pct": 39.0,
    "incertidumbre": {
     "amplitud_ic95": [
      0.217,
      0.386
     ],
     "amplitud_reciente_ic95": [
      0.085,
      0.258
     ],
     "area_ic95": [
      0.806,
      1.0
     ],
     "area_techo_cruza_umbral": true,
     "prob_falso_negativo": 0.0069,
     "margenes": {
      "area_vs_50pct": {
       "valor": 1.0,
       "umbral": 0.5,
       "distancia": 0.5,
       "distancia_relativa_pct": 100.0,
       "cruza": true
      },
      "cobertura_vs_12m": {
       "valor": 18.0,
       "umbral": 12.0,
       "distancia": 6.0,
       "distancia_relativa_pct": 50.0,
       "cruza": true
      },
      "amplitud_vs_piso": {
       "valor": 0.341,
       "umbral": 0.12,
       "distancia": 0.221,
       "distancia_relativa_pct": 184.2,
       "cruza": true
      }
     },
     "nota": "Intervalos al 95%. La amplitud usa bootstrap por bloques móviles de 4 meses, que respeta la dependencia temporal de la serie. El área usa el intervalo de Wilson sobre las celdas de la rejilla. La probabilidad de falso negativo simula ciclos reales de 5 meses contra la cobertura observada."
    }
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
    "perdida_amplitud_pct": 14.0,
    "incertidumbre": {
     "amplitud_ic95": [
      0.053,
      0.322
     ],
     "amplitud_reciente_ic95": [
      0.032,
      0.234
     ],
     "area_ic95": [
      0.035,
      0.36
     ],
     "area_techo_cruza_umbral": false,
     "prob_falso_negativo": 0.0001,
     "margenes": {
      "area_vs_50pct": {
       "valor": 0.125,
       "umbral": 0.5,
       "distancia": 0.375,
       "distancia_relativa_pct": 75.0,
       "cruza": false
      },
      "cobertura_vs_12m": {
       "valor": 22.0,
       "umbral": 12.0,
       "distancia": 10.0,
       "distancia_relativa_pct": 83.3,
       "cruza": true
      },
      "perdida_vs_40pct": {
       "valor": 14.0,
       "umbral": 40.0,
       "distancia": 26.0,
       "distancia_relativa_pct": 65.0,
       "cruza": true
      },
      "amplitud_vs_piso": {
       "valor": 0.107,
       "umbral": 0.12,
       "distancia": 0.013,
       "distancia_relativa_pct": 10.8,
       "cruza": false
      }
     },
     "nota": "Intervalos al 95%. La amplitud usa bootstrap por bloques móviles de 4 meses, que respeta la dependencia temporal de la serie. El área usa el intervalo de Wilson sobre las celdas de la rejilla. La probabilidad de falso negativo simula ciclos reales de 5 meses contra la cobertura observada."
    }
   },
   "boyaca-papa-nubes": {
    "desde": "2017-01",
    "hasta": "2025-12",
    "puntos": [
     {
      "fecha": "2017-01",
      "ndvi": 0.591,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-02",
      "ndvi": 0.738,
      "nubosidad": 0.99,
      "interpolado": false
     },
     {
      "fecha": "2017-03",
      "ndvi": 0.768,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-04",
      "ndvi": 0.797,
      "nubosidad": 0.28,
      "interpolado": false
     },
     {
      "fecha": "2017-05",
      "ndvi": 0.742,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-06",
      "ndvi": 0.688,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-07",
      "ndvi": 0.633,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-08",
      "ndvi": 0.579,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-09",
      "ndvi": 0.524,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-10",
      "ndvi": 0.611,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-11",
      "ndvi": 0.698,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-12",
      "ndvi": 0.437,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-01",
      "ndvi": 0.68,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-02",
      "ndvi": 0.711,
      "nubosidad": 0.01,
      "interpolado": false
     },
     {
      "fecha": "2018-03",
      "ndvi": 0.665,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-04",
      "ndvi": 0.618,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-05",
      "ndvi": 0.572,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-06",
      "ndvi": 0.526,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-07",
      "ndvi": 0.479,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-08",
      "ndvi": 0.433,
      "nubosidad": 0.23,
      "interpolado": false
     },
     {
      "fecha": "2018-09",
      "ndvi": 0.544,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-10",
      "ndvi": 0.656,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-11",
      "ndvi": 0.767,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-12",
      "ndvi": 0.316,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-01",
      "ndvi": 0.301,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-02",
      "ndvi": 0.286,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-03",
      "ndvi": 0.225,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-04",
      "ndvi": 0.243,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-05",
      "ndvi": 0.353,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-06",
      "ndvi": 0.463,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-07",
      "ndvi": 0.573,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-08",
      "ndvi": 0.683,
      "nubosidad": 0.29,
      "interpolado": false
     },
     {
      "fecha": "2019-09",
      "ndvi": 0.482,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-10",
      "ndvi": 0.28,
      "nubosidad": 0.15,
      "interpolado": false
     },
     {
      "fecha": "2019-11",
      "ndvi": 0.516,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-12",
      "ndvi": 0.751,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-01",
      "ndvi": 0.768,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-02",
      "ndvi": 0.557,
      "nubosidad": 0.92,
      "interpolado": false
     },
     {
      "fecha": "2020-03",
      "ndvi": 0.532,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-04",
      "ndvi": 0.506,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-05",
      "ndvi": 0.506,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-06",
      "ndvi": 0.505,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-07",
      "ndvi": 0.504,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-08",
      "ndvi": 0.504,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-09",
      "ndvi": 0.504,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-10",
      "ndvi": 0.503,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-11",
      "ndvi": 0.444,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-12",
      "ndvi": 0.385,
      "nubosidad": 0.99,
      "interpolado": false
     },
     {
      "fecha": "2021-01",
      "ndvi": 0.66,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-02",
      "ndvi": 0.7,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-03",
      "ndvi": 0.74,
      "nubosidad": 0.54,
      "interpolado": false
     },
     {
      "fecha": "2021-04",
      "ndvi": 0.713,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-05",
      "ndvi": 0.687,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-06",
      "ndvi": 0.66,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-07",
      "ndvi": 0.633,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-08",
      "ndvi": 0.606,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-09",
      "ndvi": 0.58,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-10",
      "ndvi": 0.553,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-11",
      "ndvi": 0.676,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-12",
      "ndvi": 0.478,
      "nubosidad": 0.08,
      "interpolado": false
     },
     {
      "fecha": "2022-01",
      "ndvi": 0.578,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-02",
      "ndvi": 0.61,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-03",
      "ndvi": 0.642,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-04",
      "ndvi": 0.675,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-05",
      "ndvi": 0.707,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-06",
      "ndvi": 0.739,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-07",
      "ndvi": 0.728,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-08",
      "ndvi": 0.718,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-09",
      "ndvi": 0.707,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-10",
      "ndvi": 0.696,
      "nubosidad": 0.27,
      "interpolado": false
     },
     {
      "fecha": "2022-11",
      "ndvi": 0.642,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-12",
      "ndvi": 0.588,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-01",
      "ndvi": 0.615,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-02",
      "ndvi": 0.531,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-03",
      "ndvi": 0.603,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-04",
      "ndvi": 0.675,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-05",
      "ndvi": 0.747,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-06",
      "ndvi": 0.827,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-07",
      "ndvi": 0.785,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-08",
      "ndvi": 0.744,
      "nubosidad": 0.29,
      "interpolado": false
     },
     {
      "fecha": "2023-09",
      "ndvi": 0.627,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-10",
      "ndvi": 0.509,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-11",
      "ndvi": 0.585,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-12",
      "ndvi": 0.661,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-01",
      "ndvi": 0.737,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-02",
      "ndvi": 0.739,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-03",
      "ndvi": 0.629,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-04",
      "ndvi": 0.519,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-05",
      "ndvi": 0.675,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-06",
      "ndvi": 0.681,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-07",
      "ndvi": 0.687,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-08",
      "ndvi": 0.693,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-09",
      "ndvi": 0.698,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-10",
      "ndvi": 0.704,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-11",
      "ndvi": 0.71,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-12",
      "ndvi": 0.716,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-01",
      "ndvi": 0.717,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-02",
      "ndvi": 0.668,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-03",
      "ndvi": 0.509,
      "nubosidad": 0.04,
      "interpolado": false
     },
     {
      "fecha": "2025-04",
      "ndvi": 0.643,
      "nubosidad": 0.6,
      "interpolado": false
     },
     {
      "fecha": "2025-05",
      "ndvi": 0.64,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-06",
      "ndvi": 0.637,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-07",
      "ndvi": 0.634,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-08",
      "ndvi": 0.631,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-09",
      "ndvi": 0.628,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-10",
      "ndvi": 0.625,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-11",
      "ndvi": 0.622,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-12",
      "ndvi": 0.44,
      "nubosidad": 0.56,
      "interpolado": false
     }
    ],
    "cobertura_meses_medidos": 48,
    "cobertura_meses_totales": 108,
    "ciclos_detectados": 7,
    "ciclos_ultimos_24m": 0,
    "cobertura_24m_medidos": 11,
    "cobertura_24m_totales": 24,
    "ndvi_pico_promedio": 0.76,
    "rendimiento_estimado_t_ha": 31.2,
    "rendimiento_municipal_eva_t_ha": 30.0,
    "fuente_referencia": "EVA 2018 — VENTAQUEMADA, BOYACA — PAPA",
    "caida_enso_pct": 0.0,
    "amplitud_historica": 0.335,
    "amplitud_reciente_24m": 0.117,
    "perdida_amplitud_pct": 65.1,
    "incertidumbre": {
     "amplitud_ic95": [
      0.193,
      0.508
     ],
     "amplitud_reciente_ic95": [
      0.032,
      0.297
     ],
     "area_ic95": [
      0.806,
      1.0
     ],
     "area_techo_cruza_umbral": true,
     "prob_falso_negativo": 0.1675,
     "margenes": {
      "area_vs_50pct": {
       "valor": 1.0,
       "umbral": 0.5,
       "distancia": 0.5,
       "distancia_relativa_pct": 100.0,
       "cruza": true
      },
      "cobertura_vs_12m": {
       "valor": 11.0,
       "umbral": 12.0,
       "distancia": 1.0,
       "distancia_relativa_pct": 8.3,
       "cruza": false
      },
      "amplitud_vs_piso": {
       "valor": 0.335,
       "umbral": 0.12,
       "distancia": 0.215,
       "distancia_relativa_pct": 179.2,
       "cruza": true
      }
     },
     "nota": "Intervalos al 95%. La amplitud usa bootstrap por bloques móviles de 4 meses, que respeta la dependencia temporal de la serie. El área usa el intervalo de Wilson sobre las celdas de la rejilla. La probabilidad de falso negativo simula ciclos reales de 5 meses contra la cobertura observada."
    }
   },
   "meta-cacao-productivo": {
    "desde": "2017-01",
    "hasta": "2025-12",
    "puntos": [
     {
      "fecha": "2017-01",
      "ndvi": 0.365,
      "nubosidad": 0.2,
      "interpolado": false
     },
     {
      "fecha": "2017-02",
      "ndvi": 0.158,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-03",
      "ndvi": 0.133,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-04",
      "ndvi": 0.387,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-05",
      "ndvi": 0.41,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-06",
      "ndvi": 0.433,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-07",
      "ndvi": 0.456,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-08",
      "ndvi": 0.365,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-09",
      "ndvi": 0.234,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-10",
      "ndvi": 0.715,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-11",
      "ndvi": 0.826,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-12",
      "ndvi": 0.752,
      "nubosidad": 0.89,
      "interpolado": false
     },
     {
      "fecha": "2018-01",
      "ndvi": 0.514,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-02",
      "ndvi": 0.404,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-03",
      "ndvi": 0.189,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-04",
      "ndvi": 0.484,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-05",
      "ndvi": 0.78,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-06",
      "ndvi": 0.347,
      "nubosidad": 0.97,
      "interpolado": false
     },
     {
      "fecha": "2018-07",
      "ndvi": 0.562,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-08",
      "ndvi": 0.344,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-09",
      "ndvi": 0.638,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-10",
      "ndvi": 0.711,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-11",
      "ndvi": 0.723,
      "nubosidad": 0.76,
      "interpolado": false
     },
     {
      "fecha": "2018-12",
      "ndvi": 0.57,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-01",
      "ndvi": 0.42,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-02",
      "ndvi": 0.427,
      "nubosidad": 0.99,
      "interpolado": false
     },
     {
      "fecha": "2019-03",
      "ndvi": 0.582,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-04",
      "ndvi": 0.737,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-05",
      "ndvi": 0.745,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-06",
      "ndvi": 0.659,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-07",
      "ndvi": 0.511,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-08",
      "ndvi": 0.363,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-09",
      "ndvi": 0.541,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-10",
      "ndvi": 0.738,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-11",
      "ndvi": 0.748,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-12",
      "ndvi": 0.731,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-01",
      "ndvi": 0.557,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-02",
      "ndvi": 0.255,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-03",
      "ndvi": 0.187,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-04",
      "ndvi": 0.398,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-05",
      "ndvi": 0.605,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-06",
      "ndvi": 0.811,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-07",
      "ndvi": 0.599,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-08",
      "ndvi": 0.188,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-09",
      "ndvi": 0.5,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-10",
      "ndvi": 0.841,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-11",
      "ndvi": 0.382,
      "nubosidad": 0.84,
      "interpolado": false
     },
     {
      "fecha": "2020-12",
      "ndvi": 0.434,
      "nubosidad": 0.84,
      "interpolado": false
     },
     {
      "fecha": "2021-01",
      "ndvi": 0.395,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-02",
      "ndvi": 0.378,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-03",
      "ndvi": 0.36,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-04",
      "ndvi": 0.343,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-05",
      "ndvi": 0.299,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-06",
      "ndvi": 0.81,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-07",
      "ndvi": 0.916,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-08",
      "ndvi": 0.74,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-09",
      "ndvi": 0.453,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-10",
      "ndvi": 0.47,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-11",
      "ndvi": 0.364,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-12",
      "ndvi": 0.6,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-01",
      "ndvi": 0.399,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-02",
      "ndvi": 0.156,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-03",
      "ndvi": 0.204,
      "nubosidad": 0.77,
      "interpolado": false
     },
     {
      "fecha": "2022-04",
      "ndvi": 0.331,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-05",
      "ndvi": 0.743,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-06",
      "ndvi": 0.742,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-07",
      "ndvi": 0.537,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-08",
      "ndvi": 0.332,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-09",
      "ndvi": 0.313,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-10",
      "ndvi": 0.573,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-11",
      "ndvi": 0.621,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-12",
      "ndvi": 0.669,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-01",
      "ndvi": 0.159,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-02",
      "ndvi": 0.138,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-03",
      "ndvi": 0.388,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-04",
      "ndvi": 0.742,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-05",
      "ndvi": 0.819,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-06",
      "ndvi": 0.558,
      "nubosidad": 0.96,
      "interpolado": false
     },
     {
      "fecha": "2023-07",
      "ndvi": 0.618,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-08",
      "ndvi": 0.678,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-09",
      "ndvi": 0.418,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-10",
      "ndvi": 0.834,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-11",
      "ndvi": 0.507,
      "nubosidad": 0.93,
      "interpolado": false
     },
     {
      "fecha": "2023-12",
      "ndvi": 0.437,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-01",
      "ndvi": 0.367,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-02",
      "ndvi": 0.39,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-03",
      "ndvi": 0.394,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-04",
      "ndvi": 0.397,
      "nubosidad": 0.27,
      "interpolado": false
     },
     {
      "fecha": "2024-05",
      "ndvi": 0.534,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-06",
      "ndvi": 0.606,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-07",
      "ndvi": 0.566,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-08",
      "ndvi": 0.525,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-09",
      "ndvi": 0.428,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-10",
      "ndvi": 0.741,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-11",
      "ndvi": 0.798,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-12",
      "ndvi": 0.702,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-01",
      "ndvi": 0.67,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-02",
      "ndvi": 0.357,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-03",
      "ndvi": 0.379,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-04",
      "ndvi": 0.587,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-05",
      "ndvi": 0.344,
      "nubosidad": 0.83,
      "interpolado": false
     },
     {
      "fecha": "2025-06",
      "ndvi": 0.702,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-07",
      "ndvi": 0.188,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-08",
      "ndvi": 0.18,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-09",
      "ndvi": 0.426,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-10",
      "ndvi": 0.906,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-11",
      "ndvi": 0.674,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-12",
      "ndvi": 0.443,
      "nubosidad": 0.0,
      "interpolado": false
     }
    ],
    "cobertura_meses_medidos": 93,
    "cobertura_meses_totales": 108,
    "ciclos_detectados": 11,
    "ciclos_ultimos_24m": 2,
    "cobertura_24m_medidos": 21,
    "cobertura_24m_totales": 24,
    "ndvi_pico_promedio": 0.82,
    "rendimiento_estimado_t_ha": 0.63,
    "rendimiento_municipal_eva_t_ha": 0.6,
    "fuente_referencia": "EVA 2018 — GRANADA, META — CACAO",
    "caida_enso_pct": 0.0,
    "amplitud_historica": 0.421,
    "amplitud_reciente_24m": 0.397,
    "perdida_amplitud_pct": 5.7,
    "incertidumbre": {
     "amplitud_ic95": [
      0.355,
      0.579
     ],
     "amplitud_reciente_ic95": [
      0.158,
      0.514
     ],
     "area_ic95": [
      0.806,
      1.0
     ],
     "area_techo_cruza_umbral": true,
     "prob_falso_negativo": 0.0005,
     "margenes": {
      "area_vs_50pct": {
       "valor": 1.0,
       "umbral": 0.5,
       "distancia": 0.5,
       "distancia_relativa_pct": 100.0,
       "cruza": true
      },
      "cobertura_vs_12m": {
       "valor": 21.0,
       "umbral": 12.0,
       "distancia": 9.0,
       "distancia_relativa_pct": 75.0,
       "cruza": true
      },
      "perdida_vs_40pct": {
       "valor": 5.7,
       "umbral": 40.0,
       "distancia": 34.3,
       "distancia_relativa_pct": 85.8,
       "cruza": true
      },
      "amplitud_vs_piso": {
       "valor": 0.421,
       "umbral": 0.12,
       "distancia": 0.301,
       "distancia_relativa_pct": 250.8,
       "cruza": true
      }
     },
     "nota": "Intervalos al 95%. La amplitud usa bootstrap por bloques móviles de 4 meses, que respeta la dependencia temporal de la serie. El área usa el intervalo de Wilson sobre las celdas de la rejilla. La probabilidad de falso negativo simula ciclos reales de 5 meses contra la cobertura observada."
    }
   },
   "meta-cacao-sin-manejo": {
    "desde": "2017-01",
    "hasta": "2025-12",
    "puntos": [
     {
      "fecha": "2017-01",
      "ndvi": 0.754,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-02",
      "ndvi": 0.527,
      "nubosidad": 0.44,
      "interpolado": false
     },
     {
      "fecha": "2017-03",
      "ndvi": 0.799,
      "nubosidad": 0.69,
      "interpolado": false
     },
     {
      "fecha": "2017-04",
      "ndvi": 0.748,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-05",
      "ndvi": 0.822,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-06",
      "ndvi": 0.895,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-07",
      "ndvi": 0.793,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-08",
      "ndvi": 0.774,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-09",
      "ndvi": 0.787,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-10",
      "ndvi": 0.794,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-11",
      "ndvi": 0.801,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-12",
      "ndvi": 0.8,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-01",
      "ndvi": 0.735,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-02",
      "ndvi": 0.759,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-03",
      "ndvi": 0.708,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-04",
      "ndvi": 0.58,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-05",
      "ndvi": 0.451,
      "nubosidad": 0.01,
      "interpolado": false
     },
     {
      "fecha": "2018-06",
      "ndvi": 0.336,
      "nubosidad": 0.65,
      "interpolado": false
     },
     {
      "fecha": "2018-07",
      "ndvi": 0.768,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-08",
      "ndvi": 0.815,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-09",
      "ndvi": 0.774,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-10",
      "ndvi": 0.803,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-11",
      "ndvi": 0.621,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-12",
      "ndvi": 0.637,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-01",
      "ndvi": 0.641,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-02",
      "ndvi": 0.596,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-03",
      "ndvi": 0.249,
      "nubosidad": 0.99,
      "interpolado": false
     },
     {
      "fecha": "2019-04",
      "ndvi": 0.677,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-05",
      "ndvi": 0.781,
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
      "ndvi": 0.57,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-08",
      "ndvi": 0.817,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-09",
      "ndvi": 0.833,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-10",
      "ndvi": 0.85,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-11",
      "ndvi": 0.817,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-12",
      "ndvi": 0.786,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-01",
      "ndvi": 0.756,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-02",
      "ndvi": 0.748,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-03",
      "ndvi": 0.519,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-04",
      "ndvi": 0.565,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-05",
      "ndvi": 0.612,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-06",
      "ndvi": 0.659,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-07",
      "ndvi": 0.711,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-08",
      "ndvi": 0.85,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-09",
      "ndvi": 0.844,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-10",
      "ndvi": 0.877,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-11",
      "ndvi": 0.825,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-12",
      "ndvi": 0.773,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-01",
      "ndvi": 0.721,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-02",
      "ndvi": 0.665,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-03",
      "ndvi": 0.61,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-04",
      "ndvi": 0.638,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-05",
      "ndvi": 0.753,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-06",
      "ndvi": 0.742,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-07",
      "ndvi": 0.52,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-08",
      "ndvi": 0.633,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-09",
      "ndvi": 0.745,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-10",
      "ndvi": 0.789,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-11",
      "ndvi": 0.644,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-12",
      "ndvi": 0.735,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-01",
      "ndvi": 0.725,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-02",
      "ndvi": 0.636,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-03",
      "ndvi": 0.511,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-04",
      "ndvi": 0.775,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-05",
      "ndvi": 0.722,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-06",
      "ndvi": 0.762,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-07",
      "ndvi": 0.341,
      "nubosidad": 0.31,
      "interpolado": false
     },
     {
      "fecha": "2022-08",
      "ndvi": 0.651,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-09",
      "ndvi": 0.781,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-10",
      "ndvi": 0.811,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-11",
      "ndvi": 0.389,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-12",
      "ndvi": 0.76,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-01",
      "ndvi": 0.719,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-02",
      "ndvi": 0.679,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-03",
      "ndvi": 0.367,
      "nubosidad": 0.98,
      "interpolado": false
     },
     {
      "fecha": "2023-04",
      "ndvi": 0.61,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-05",
      "ndvi": 0.55,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-06",
      "ndvi": 0.579,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-07",
      "ndvi": 0.69,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-08",
      "ndvi": 0.801,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-09",
      "ndvi": 0.711,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-10",
      "ndvi": 0.801,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-11",
      "ndvi": 0.781,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-12",
      "ndvi": 0.801,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-01",
      "ndvi": 0.792,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-02",
      "ndvi": 0.763,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-03",
      "ndvi": 0.73,
      "nubosidad": 0.15,
      "interpolado": false
     },
     {
      "fecha": "2024-04",
      "ndvi": 0.673,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-05",
      "ndvi": 0.736,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-06",
      "ndvi": 0.857,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-07",
      "ndvi": 0.832,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-08",
      "ndvi": 0.806,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-09",
      "ndvi": 0.732,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-10",
      "ndvi": 0.812,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-11",
      "ndvi": 0.809,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-12",
      "ndvi": 0.804,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-01",
      "ndvi": 0.74,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-02",
      "ndvi": 0.71,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-03",
      "ndvi": 0.772,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-04",
      "ndvi": 0.766,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-05",
      "ndvi": 0.76,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-06",
      "ndvi": 0.754,
      "nubosidad": 0.84,
      "interpolado": false
     },
     {
      "fecha": "2025-07",
      "ndvi": 0.824,
      "nubosidad": 0.12,
      "interpolado": false
     },
     {
      "fecha": "2025-08",
      "ndvi": 0.769,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-09",
      "ndvi": 0.777,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-10",
      "ndvi": 0.844,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-11",
      "ndvi": 0.428,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-12",
      "ndvi": 0.744,
      "nubosidad": 0.0,
      "interpolado": false
     }
    ],
    "cobertura_meses_medidos": 94,
    "cobertura_meses_totales": 108,
    "ciclos_detectados": 5,
    "ciclos_ultimos_24m": 0,
    "cobertura_24m_medidos": 21,
    "cobertura_24m_totales": 24,
    "ndvi_pico_promedio": 0.84,
    "rendimiento_estimado_t_ha": 0.67,
    "rendimiento_municipal_eva_t_ha": 0.6,
    "fuente_referencia": "EVA 2018 — GRANADA, META — CACAO",
    "caida_enso_pct": 0.0,
    "amplitud_historica": 0.248,
    "amplitud_reciente_24m": 0.088,
    "perdida_amplitud_pct": 64.5,
    "incertidumbre": {
     "amplitud_ic95": [
      0.157,
      0.281
     ],
     "amplitud_reciente_ic95": [
      0.04,
      0.136
     ],
     "area_ic95": [
      0.444,
      0.858
     ],
     "area_techo_cruza_umbral": true,
     "prob_falso_negativo": 0.0005,
     "margenes": {
      "area_vs_50pct": {
       "valor": 0.6875,
       "umbral": 0.5,
       "distancia": 0.1875,
       "distancia_relativa_pct": 37.5,
       "cruza": true
      },
      "cobertura_vs_12m": {
       "valor": 21.0,
       "umbral": 12.0,
       "distancia": 9.0,
       "distancia_relativa_pct": 75.0,
       "cruza": true
      },
      "perdida_vs_40pct": {
       "valor": 64.5,
       "umbral": 40.0,
       "distancia": 24.5,
       "distancia_relativa_pct": 61.3,
       "cruza": false
      },
      "amplitud_vs_piso": {
       "valor": 0.248,
       "umbral": 0.12,
       "distancia": 0.128,
       "distancia_relativa_pct": 106.7,
       "cruza": true
      }
     },
     "nota": "Intervalos al 95%. La amplitud usa bootstrap por bloques móviles de 4 meses, que respeta la dependencia temporal de la serie. El área usa el intervalo de Wilson sobre las celdas de la rejilla. La probabilidad de falso negativo simula ciclos reales de 5 meses contra la cobertura observada."
    }
   },
   "boyaca-papa-media": {
    "desde": "2017-01",
    "hasta": "2025-12",
    "puntos": [
     {
      "fecha": "2017-01",
      "ndvi": 0.753,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-02",
      "ndvi": 0.516,
      "nubosidad": 0.22,
      "interpolado": false
     },
     {
      "fecha": "2017-03",
      "ndvi": 0.641,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-04",
      "ndvi": 0.765,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-05",
      "ndvi": 0.729,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-06",
      "ndvi": 0.692,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-07",
      "ndvi": 0.656,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-08",
      "ndvi": 0.619,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-09",
      "ndvi": 0.583,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-10",
      "ndvi": 0.7,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-11",
      "ndvi": 0.817,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-12",
      "ndvi": 0.812,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-01",
      "ndvi": 0.59,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-02",
      "ndvi": 0.585,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-03",
      "ndvi": 0.442,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-04",
      "ndvi": 0.446,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-05",
      "ndvi": 0.449,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-06",
      "ndvi": 0.453,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-07",
      "ndvi": 0.456,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-08",
      "ndvi": 0.46,
      "nubosidad": 0.04,
      "interpolado": false
     },
     {
      "fecha": "2018-09",
      "ndvi": 0.527,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-10",
      "ndvi": 0.593,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-11",
      "ndvi": 0.66,
      "nubosidad": 0.13,
      "interpolado": false
     },
     {
      "fecha": "2018-12",
      "ndvi": 0.782,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-01",
      "ndvi": 0.754,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-02",
      "ndvi": 0.725,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-03",
      "ndvi": 0.516,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-04",
      "ndvi": 0.298,
      "nubosidad": 0.77,
      "interpolado": false
     },
     {
      "fecha": "2019-05",
      "ndvi": 0.458,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-06",
      "ndvi": 0.617,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-07",
      "ndvi": 0.777,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-08",
      "ndvi": 0.829,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-09",
      "ndvi": 0.726,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-10",
      "ndvi": 0.622,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-11",
      "ndvi": 0.674,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-12",
      "ndvi": 0.726,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-01",
      "ndvi": 0.765,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-02",
      "ndvi": 0.421,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-03",
      "ndvi": 0.435,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-04",
      "ndvi": 0.448,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-05",
      "ndvi": 0.462,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-06",
      "ndvi": 0.476,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-07",
      "ndvi": 0.489,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-08",
      "ndvi": 0.503,
      "nubosidad": 0.12,
      "interpolado": false
     },
     {
      "fecha": "2020-09",
      "ndvi": 0.643,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-10",
      "ndvi": 0.783,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-11",
      "ndvi": 0.855,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-12",
      "ndvi": 0.8,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-01",
      "ndvi": 0.64,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-02",
      "ndvi": 0.383,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-03",
      "ndvi": 0.254,
      "nubosidad": 0.9,
      "interpolado": false
     },
     {
      "fecha": "2021-04",
      "ndvi": 0.545,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-05",
      "ndvi": 0.504,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-06",
      "ndvi": 0.462,
      "nubosidad": 0.26,
      "interpolado": false
     },
     {
      "fecha": "2021-07",
      "ndvi": 0.494,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-08",
      "ndvi": 0.526,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-09",
      "ndvi": 0.558,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-10",
      "ndvi": 0.59,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-11",
      "ndvi": 0.622,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-12",
      "ndvi": 0.538,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-01",
      "ndvi": 0.598,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-02",
      "ndvi": 0.615,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-03",
      "ndvi": 0.631,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-04",
      "ndvi": 0.648,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-05",
      "ndvi": 0.664,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-06",
      "ndvi": 0.681,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-07",
      "ndvi": 0.801,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-08",
      "ndvi": 0.718,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-09",
      "ndvi": 0.753,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-10",
      "ndvi": 0.788,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-11",
      "ndvi": 0.828,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2022-12",
      "ndvi": 0.867,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-01",
      "ndvi": 0.773,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-02",
      "ndvi": 0.64,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-03",
      "ndvi": 0.482,
      "nubosidad": 0.03,
      "interpolado": false
     },
     {
      "fecha": "2023-04",
      "ndvi": 0.594,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-05",
      "ndvi": 0.765,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-06",
      "ndvi": 0.737,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-07",
      "ndvi": 0.765,
      "nubosidad": 0.25,
      "interpolado": false
     },
     {
      "fecha": "2023-08",
      "ndvi": 0.784,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-09",
      "ndvi": 0.803,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-10",
      "ndvi": 0.727,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-11",
      "ndvi": 0.57,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-12",
      "ndvi": 0.591,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-01",
      "ndvi": 0.611,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-02",
      "ndvi": 0.455,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-03",
      "ndvi": 0.366,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-04",
      "ndvi": 0.466,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-05",
      "ndvi": 0.49,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-06",
      "ndvi": 0.57,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-07",
      "ndvi": 0.649,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-08",
      "ndvi": 0.636,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-09",
      "ndvi": 0.623,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-10",
      "ndvi": 0.611,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-11",
      "ndvi": 0.598,
      "nubosidad": 0.49,
      "interpolado": false
     },
     {
      "fecha": "2024-12",
      "ndvi": 0.771,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-01",
      "ndvi": 0.577,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-02",
      "ndvi": 0.562,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-03",
      "ndvi": 0.639,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-04",
      "ndvi": 0.716,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-05",
      "ndvi": 0.546,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-06",
      "ndvi": 0.705,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-07",
      "ndvi": 0.534,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-08",
      "ndvi": 0.364,
      "nubosidad": 0.32,
      "interpolado": false
     },
     {
      "fecha": "2025-09",
      "ndvi": 0.57,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-10",
      "ndvi": 0.776,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-11",
      "ndvi": 0.769,
      "nubosidad": 0.92,
      "interpolado": false
     },
     {
      "fecha": "2025-12",
      "ndvi": 0.769,
      "nubosidad": 1.0,
      "interpolado": true
     }
    ],
    "cobertura_meses_medidos": 64,
    "cobertura_meses_totales": 108,
    "ciclos_detectados": 6,
    "ciclos_ultimos_24m": 1,
    "cobertura_24m_medidos": 16,
    "cobertura_24m_totales": 24,
    "ndvi_pico_promedio": 0.79,
    "rendimiento_estimado_t_ha": 32.24,
    "rendimiento_municipal_eva_t_ha": 30.0,
    "fuente_referencia": "EVA 2018 — VENTAQUEMADA, BOYACA — PAPA",
    "caida_enso_pct": 6.5,
    "amplitud_historica": 0.357,
    "amplitud_reciente_24m": 0.321,
    "perdida_amplitud_pct": 10.1,
    "incertidumbre": {
     "amplitud_ic95": [
      0.21,
      0.417
     ],
     "amplitud_reciente_ic95": [
      0.121,
      0.407
     ],
     "area_ic95": [
      0.806,
      1.0
     ],
     "area_techo_cruza_umbral": true,
     "prob_falso_negativo": 0.0237,
     "margenes": {
      "area_vs_50pct": {
       "valor": 1.0,
       "umbral": 0.5,
       "distancia": 0.5,
       "distancia_relativa_pct": 100.0,
       "cruza": true
      },
      "cobertura_vs_12m": {
       "valor": 16.0,
       "umbral": 12.0,
       "distancia": 4.0,
       "distancia_relativa_pct": 33.3,
       "cruza": true
      },
      "amplitud_vs_piso": {
       "valor": 0.357,
       "umbral": 0.12,
       "distancia": 0.237,
       "distancia_relativa_pct": 197.5,
       "cruza": true
      }
     },
     "nota": "Intervalos al 95%. La amplitud usa bootstrap por bloques móviles de 4 meses, que respeta la dependencia temporal de la serie. El área usa el intervalo de Wilson sobre las celdas de la rejilla. La probabilidad de falso negativo simula ciclos reales de 5 meses contra la cobertura observada."
    }
   },
   "meta-cacao-vigor-bajo": {
    "desde": "2017-01",
    "hasta": "2025-12",
    "puntos": [
     {
      "fecha": "2017-01",
      "ndvi": 0.582,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-02",
      "ndvi": 0.673,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-03",
      "ndvi": 0.765,
      "nubosidad": 0.07,
      "interpolado": false
     },
     {
      "fecha": "2017-04",
      "ndvi": 0.713,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-05",
      "ndvi": 0.784,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2017-06",
      "ndvi": 0.856,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-07",
      "ndvi": 0.569,
      "nubosidad": 0.08,
      "interpolado": false
     },
     {
      "fecha": "2017-08",
      "ndvi": 0.805,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-09",
      "ndvi": 0.816,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-10",
      "ndvi": 0.401,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-11",
      "ndvi": 0.784,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2017-12",
      "ndvi": 0.811,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-01",
      "ndvi": 0.796,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-02",
      "ndvi": 0.813,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-03",
      "ndvi": 0.721,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-04",
      "ndvi": 0.666,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2018-05",
      "ndvi": 0.611,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-06",
      "ndvi": 0.336,
      "nubosidad": 0.72,
      "interpolado": false
     },
     {
      "fecha": "2018-07",
      "ndvi": 0.767,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-08",
      "ndvi": 0.822,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-09",
      "ndvi": 0.397,
      "nubosidad": 0.95,
      "interpolado": false
     },
     {
      "fecha": "2018-10",
      "ndvi": 0.841,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-11",
      "ndvi": 0.816,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2018-12",
      "ndvi": 0.818,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-01",
      "ndvi": 0.809,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-02",
      "ndvi": 0.735,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-03",
      "ndvi": 0.197,
      "nubosidad": 0.93,
      "interpolado": false
     },
     {
      "fecha": "2019-04",
      "ndvi": 0.742,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-05",
      "ndvi": 0.769,
      "nubosidad": 0.58,
      "interpolado": false
     },
     {
      "fecha": "2019-06",
      "ndvi": 0.867,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-07",
      "ndvi": 0.372,
      "nubosidad": 0.27,
      "interpolado": false
     },
     {
      "fecha": "2019-08",
      "ndvi": 0.808,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-09",
      "ndvi": 0.812,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2019-10",
      "ndvi": 0.817,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-11",
      "ndvi": 0.842,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2019-12",
      "ndvi": 0.815,
      "nubosidad": 0.07,
      "interpolado": false
     },
     {
      "fecha": "2020-01",
      "ndvi": 0.78,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-02",
      "ndvi": 0.809,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-03",
      "ndvi": 0.676,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-04",
      "ndvi": 0.45,
      "nubosidad": 0.15,
      "interpolado": false
     },
     {
      "fecha": "2020-05",
      "ndvi": 0.642,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-06",
      "ndvi": 0.835,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-07",
      "ndvi": 0.794,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-08",
      "ndvi": 0.839,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-09",
      "ndvi": 0.809,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2020-10",
      "ndvi": 0.863,
      "nubosidad": 0.96,
      "interpolado": false
     },
     {
      "fecha": "2020-11",
      "ndvi": 0.854,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2020-12",
      "ndvi": 0.845,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-01",
      "ndvi": 0.836,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-02",
      "ndvi": 0.799,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-03",
      "ndvi": 0.763,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-04",
      "ndvi": 0.792,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-05",
      "ndvi": 0.457,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2021-06",
      "ndvi": 0.88,
      "nubosidad": 0.43,
      "interpolado": false
     },
     {
      "fecha": "2021-07",
      "ndvi": 0.832,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2021-08",
      "ndvi": 0.784,
      "nubosidad": 0.05,
      "interpolado": false
     },
     {
      "fecha": "2021-09",
      "ndvi": 0.741,
      "nubosidad": 0.7,
      "interpolado": false
     },
     {
      "fecha": "2021-10",
      "ndvi": 0.843,
      "nubosidad": 0.07,
      "interpolado": false
     },
     {
      "fecha": "2021-11",
      "ndvi": 0.454,
      "nubosidad": 0.02,
      "interpolado": false
     },
     {
      "fecha": "2021-12",
      "ndvi": 0.847,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-01",
      "ndvi": 0.862,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-02",
      "ndvi": 0.829,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-03",
      "ndvi": 0.513,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-04",
      "ndvi": 0.77,
      "nubosidad": 0.28,
      "interpolado": false
     },
     {
      "fecha": "2022-05",
      "ndvi": 0.795,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-06",
      "ndvi": 0.84,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-07",
      "ndvi": 0.39,
      "nubosidad": 0.01,
      "interpolado": false
     },
     {
      "fecha": "2022-08",
      "ndvi": 0.697,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-09",
      "ndvi": 0.845,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-10",
      "ndvi": 0.852,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-11",
      "ndvi": 0.582,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2022-12",
      "ndvi": 0.814,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-01",
      "ndvi": 0.829,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-02",
      "ndvi": 0.794,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-03",
      "ndvi": 0.43,
      "nubosidad": 0.97,
      "interpolado": false
     },
     {
      "fecha": "2023-04",
      "ndvi": 0.792,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-05",
      "ndvi": 0.609,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-06",
      "ndvi": 0.714,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-07",
      "ndvi": 0.775,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2023-08",
      "ndvi": 0.836,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-09",
      "ndvi": 0.798,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-10",
      "ndvi": 0.855,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-11",
      "ndvi": 0.834,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2023-12",
      "ndvi": 0.853,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-01",
      "ndvi": 0.824,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-02",
      "ndvi": 0.784,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-03",
      "ndvi": 0.362,
      "nubosidad": 0.24,
      "interpolado": false
     },
     {
      "fecha": "2024-04",
      "ndvi": 0.658,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-05",
      "ndvi": 0.839,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-06",
      "ndvi": 0.849,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-07",
      "ndvi": 0.843,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2024-08",
      "ndvi": 0.837,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-09",
      "ndvi": 0.805,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-10",
      "ndvi": 0.87,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-11",
      "ndvi": 0.848,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2024-12",
      "ndvi": 0.849,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-01",
      "ndvi": 0.894,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-02",
      "ndvi": 0.772,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-03",
      "ndvi": 0.789,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-04",
      "ndvi": 0.804,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-05",
      "ndvi": 0.819,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-06",
      "ndvi": 0.834,
      "nubosidad": 1.0,
      "interpolado": true
     },
     {
      "fecha": "2025-07",
      "ndvi": 0.849,
      "nubosidad": 0.0,
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
      "ndvi": 0.76,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-10",
      "ndvi": 0.775,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-11",
      "ndvi": 0.466,
      "nubosidad": 0.0,
      "interpolado": false
     },
     {
      "fecha": "2025-12",
      "ndvi": 0.814,
      "nubosidad": 0.0,
      "interpolado": false
     }
    ],
    "cobertura_meses_medidos": 94,
    "cobertura_meses_totales": 108,
    "ciclos_detectados": 7,
    "ciclos_ultimos_24m": 0,
    "cobertura_24m_medidos": 20,
    "cobertura_24m_totales": 24,
    "ndvi_pico_promedio": 0.87,
    "rendimiento_estimado_t_ha": 0.71,
    "rendimiento_municipal_eva_t_ha": 0.6,
    "fuente_referencia": "EVA 2018 — GRANADA, META — CACAO",
    "caida_enso_pct": 0.0,
    "amplitud_historica": 0.133,
    "amplitud_reciente_24m": 0.089,
    "perdida_amplitud_pct": 33.1,
    "incertidumbre": {
     "amplitud_ic95": [
      0.082,
      0.234
     ],
     "amplitud_reciente_ic95": [
      0.035,
      0.383
     ],
     "area_ic95": [
      0.231,
      0.668
     ],
     "area_techo_cruza_umbral": true,
     "prob_falso_negativo": 0.0022,
     "margenes": {
      "area_vs_50pct": {
       "valor": 0.4375,
       "umbral": 0.5,
       "distancia": 0.0625,
       "distancia_relativa_pct": 12.5,
       "cruza": false
      },
      "cobertura_vs_12m": {
       "valor": 20.0,
       "umbral": 12.0,
       "distancia": 8.0,
       "distancia_relativa_pct": 66.7,
       "cruza": true
      },
      "perdida_vs_40pct": {
       "valor": 33.1,
       "umbral": 40.0,
       "distancia": 6.9,
       "distancia_relativa_pct": 17.2,
       "cruza": true
      },
      "amplitud_vs_piso": {
       "valor": 0.133,
       "umbral": 0.12,
       "distancia": 0.013,
       "distancia_relativa_pct": 10.8,
       "cruza": true
      }
     },
     "nota": "Intervalos al 95%. La amplitud usa bootstrap por bloques móviles de 4 meses, que respeta la dependencia temporal de la serie. El área usa el intervalo de Wilson sobre las celdas de la rejilla. La probabilidad de falso negativo simula ciclos reales de 5 meses contra la cobertura observada."
    }
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
   },
   "boyaca-papa-nubes": {
    "puntaje": 0,
    "banda_riesgo": "sin_concepto",
    "decision": "aplazar_por_verificacion",
    "monto_sugerido_cop": 0,
    "linea_finagro": "Capital de Trabajo — pequeño productor",
    "cobertura_fag_pct": 80,
    "plazo_meses": 0,
    "desembolso": "Sin desembolso por ahora: el expediente queda abierto y se remite a visita técnica de campo. Una vez radicada el acta de visita, el caso vuelve a comité para definir monto, plazo y tramos.",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 0
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 0
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 0
     },
     {
      "eje": "Coherencia del destino del crédito",
      "peso": 15,
      "puntaje": 0
     }
    ],
    "evidencia": [
     {
      "tipo": "alerta",
      "texto": "Cobertura óptica insuficiente en la ventana de decisión: 11 de 24 meses medidos (48 de 108 en la serie completa). No se emite concepto de riesgo; no es un hallazgo desfavorable sobre el predio."
     },
     {
      "tipo": "alerta",
      "texto": "Los indicadores de forma —0 ciclos completos en los últimos 24 meses y pérdida de amplitud de 65,1% frente a la amplitud histórica de 0,335— están contaminados por la interpolación de 13 meses y NO deben leerse como evidencia de abandono."
     },
     {
      "tipo": "favorable",
      "texto": "Control anti-despojo RTDAF/RUPTA (Ley 1448 de 2011): sin coincidencias; el predio no figura en el registro ni tiene medida de protección vigente. Verificación ambiental del polígono sin superposición con áreas protegidas ni frontera agrícola excluida."
     },
     {
      "tipo": "favorable",
      "texto": "Área con actividad agrícola detectada por Sentinel-2 de 1,6 ha frente a 1,6 ha declaradas (desvío +0,0%); el monto solicitado de $6.800.000 se ubica muy por debajo del tope de crédito de $40.445.905 para 33 SMMLV de activos."
     },
     {
      "tipo": "favorable",
      "texto": "Antecedentes de la serie histórica —7 ciclos completos en 9 años, NDVI pico promedio de 0,76 y rendimiento estimado de 31,2 t/ha contra 30,0 t/ha municipales (EVA 2018 — VENTAQUEMADA, BOYACA — PAPA)— son consistentes, pero corresponden a años previos y no sustituyen la ventana de decisión."
     }
    ],
    "memorando": "Se somete al comité un aplazamiento por verificación, no un rechazo. La ventana de decisión de 24 meses solo cuenta con 11 meses de observación óptica utilizable; los 13 restantes fueron interpolados por nubosidad, condición habitual en el altiplano de Ventaquemada. En esa situación la interpolación aplana la serie: los ciclos de siembra y cosecha dejan de detectarse y la amplitud cae, de modo que un predio nublado produce exactamente la misma firma que uno abandonado. Por eso los indicadores de forma que aparecen en el detalle —cero ciclos recientes y 65,1% de pérdida de amplitud— no constituyen evidencia de inactividad y el comité no debe leerlos así. Los ejes se puntúan en cero porque no hay concepto que emitir, no porque el predio haya sido evaluado desfavorablemente. Los antecedentes son favorables: 7 ciclos completos en 9 años, área detectada igual a la declarada, rendimiento estimado de 31,2 t/ha frente a 30,0 t/ha municipales (EVA 2018), y controles RTDAF/RUPTA y ambiental sin coincidencias. La visita técnica debe verificar siembra vigente o lote preparado, etapa fenológica, semilla y fertilizante aplicados, y calendario de los dos ciclos financiados.",
    "recomendacion": "Aplazar por verificación —no rechazar— y remitir a visita técnica de campo que confirme actividad reciente en las 1,6 ha; con acta favorable el expediente vuelve a comité para Capital de Trabajo — pequeño productor por hasta $6.800.000 con cobertura FAG del 80%."
   },
   "meta-cacao-productivo": {
    "puntaje": 900,
    "banda_riesgo": "bajo",
    "decision": "aprobar",
    "monto_sugerido_cop": 16000000,
    "linea_finagro": "Capital de Trabajo — pequeño productor",
    "cobertura_fag_pct": 80,
    "plazo_meses": 24,
    "desembolso": "Tramo único, contra verificación de la cédula catastral y firma de pagaré con garantía FAG al 80%.",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 34
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 19
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 23
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
      "texto": "Rendimiento estimado del predio 0,63 t/ha frente a 0,6 t/ha del municipal oficial (EVA 2018 — GRANADA, META — CACAO): la estimación derivada del vigor satelital ubica el predio 5% por encima del referente municipal."
     },
     {
      "tipo": "favorable",
      "texto": "Vigor sostenido con NDVI pico promedio de 0,82 y 11 ciclos de manejo identificados en 9 años, 2 de ellos en la ventana de decisión; pérdida de amplitud de apenas 5,7% frente a su propia historia (0,421 histórica vs. 0,397 en 24 meses), muy por debajo del umbral de 40%."
     },
     {
      "tipo": "favorable",
      "texto": "Resiliencia verificada en El Niño 2023-24: caída de vigor de 0,0% contra 1,6% de caída promedio regional; la amplitud de 2023 (0,66) y de 2025 (0,72) son las dos más altas de la serie."
     },
     {
      "tipo": "favorable",
      "texto": "Área declarada 4,5 ha contra 4,5 ha con actividad agrícola detectada por Sentinel-2 (desvío +0,0%); el monto solicitado equivale a $3.555.556 por hectárea, consistente con mantenimiento de cacaotal en producción, y a 22,5% del tope de crédito del productor ($71.086.742)."
     },
     {
      "tipo": "alerta",
      "texto": "Control anti-despojo RTDAF/RUPTA (Ley 1448 de 2011): sin coincidencias ni medida de protección vigente. Verificación ambiental del polígono sin superposición con áreas protegidas. Se reporta como limitación que 15 de 108 meses de la serie se interpolaron por nubosidad y no alimentan los indicadores."
     }
    ],
    "memorando": "Se somete a consideración del comité la solicitud del señor Aníbal Reyes Ospina por $16.000.000 para mantenimiento de cacaotal en producción e insumos, sobre 4,5 ha en la vereda Canaguaro, Granada, Meta. La cobertura del dato es adecuada: 93 de 108 meses con observación óptica utilizable y 21 de 24 en la ventana de decisión, de modo que los indicadores del eje de capacidad de pago operan con normalidad. Tratándose de un cultivo perenne, la lectura se centra en vigor sostenido y rendimiento comparado: el NDVI pico promedio de 0,82 y la pérdida de amplitud de solo 5,7% frente a la historia del propio predio indican manejo continuo, y el rendimiento estimado de 0,63 t/ha supera el municipal oficial de 0,6 t/ha (EVA 2018). El comportamiento durante El Niño 2023-24, sin caída de vigor frente al 1,6% regional, constituye evidencia observada de resiliencia. El área detectada coincide íntegramente con la declarada y el monto solicitado representa 22,5% del tope aplicable al productor. Se recuerda al comité que SEEDLLITE no evalúa centrales de riesgo, endeudamiento con otras entidades ni garantías distintas del FAG: esa verificación corresponde al intermediario antes del desembolso.",
    "recomendacion": "Aprobar $16.000.000 en línea de Capital de Trabajo — pequeño productor a 24 meses con cobertura FAG del 80%, condicionado a la verificación de centrales de riesgo y endeudamiento agregado por parte del intermediario."
   },
   "meta-cacao-sin-manejo": {
    "puntaje": 750,
    "banda_riesgo": "bajo",
    "decision": "aprobar_con_ajuste",
    "monto_sugerido_cop": 10300000,
    "linea_finagro": "Inversión — pequeño productor",
    "cobertura_fag_pct": 80,
    "plazo_meses": 84,
    "desembolso": "Dos tramos: 60% al desembolso inicial ($6.180.000) y 40% ($4.120.000) contra verificación en campo de la renovación efectiva del cacaotal y del control de sombrío sobre las 2,61 ha con actividad detectada.",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 28
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 13
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 23
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
      "texto": "Rendimiento estimado del predio 0,67 t/ha frente a 0,6 t/ha del municipal oficial (EVA 2018 — GRANADA, META — CACAO): estimación derivada del vigor satelital, 11,7% por encima de la referencia municipal."
     },
     {
      "tipo": "favorable",
      "texto": "Durante El Niño 2023-24 la caída de vigor del predio fue de 0,0% contra 1,6% de caída promedio regional; resiliencia verificada sobre 11 de 12 meses medidos en 2023 y 11 de 12 en 2024."
     },
     {
      "tipo": "alerta",
      "texto": "Pérdida de amplitud de 64,5% contra su propia historia (histórica 0,248 → 0,088 en los últimos 24 meses; amplitud 2025 de 0,04), consistente con una fase de renovación y regulación de sombrío, con NDVI pico promedio sostenido en 0,84."
     },
     {
      "tipo": "alerta",
      "texto": "Área con actividad agrícola detectada de 2,61 ha sobre 3,8 ha declaradas (desvío -31,3%); el monto se ajusta en proporción al área efectivamente verificada."
     },
     {
      "tipo": "favorable",
      "texto": "RTDAF/RUPTA (Ley 1448 de 2011): sin coincidencias, sin medida de protección vigente. Verificación ambiental del polígono: sin superposición con áreas protegidas ni frontera agrícola excluida."
     }
    ],
    "memorando": "Se somete a consideración del comité la solicitud de Gilma Peñaloza Arias por $15.000.000 para renovación de cacaotal y control de sombrío. La cobertura del dato es adecuada: 94 de 108 meses con observación óptica utilizable y 21 de 24 meses medidos en la ventana de decisión, por lo que los indicadores del eje de capacidad de pago operan sin reservas. Tratándose de un cultivo perenne, la ausencia de ciclos en los últimos 24 meses es el comportamiento esperado y no se computa como defecto. La pérdida de amplitud de 64,5% frente a la historia del propio predio es la única señal adversa, pero no configura causal: el rendimiento estimado, 0,67 t/ha, supera el municipal oficial de 0,6 t/ha (EVA 2018 — Granada, Meta — Cacao) y el pico promedio se mantiene en 0,84, patrón compatible con la renovación que el crédito precisamente financia. El comportamiento durante El Niño 2023-24 fue de 0,0% de caída frente a 1,6% regional. El área con actividad detectada, 2,61 ha sobre 3,8 declaradas, obliga a ajustar el monto a $10.300.000. Se recuerda que SEEDLLITE no evalúa centrales de riesgo, endeudamiento con terceros ni garantías: esa verificación corresponde al intermediario.",
    "recomendacion": "Aprobar con ajuste por $10.300.000 en Inversión — pequeño productor, con FAG al 80% y segundo tramo condicionado a la verificación en campo de la renovación sobre las 2,61 ha detectadas."
   },
   "boyaca-papa-media": {
    "puntaje": 730,
    "banda_riesgo": "bajo",
    "decision": "aprobar",
    "monto_sugerido_cop": 8200000,
    "linea_finagro": "Capital de Trabajo — pequeño productor",
    "cobertura_fag_pct": 80,
    "plazo_meses": 12,
    "desembolso": "Dos tramos: 60% ($4.920.000) al perfeccionamiento del pagaré y 40% ($3.280.000) a los cuatro meses, contra confirmación satelital de emergencia del cultivo en el polígono verificado (repunte de NDVI sobre el valle de siembra).",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 29
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 18
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 14
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
      "texto": "Cultivo transitorio con ciclos verificados: 6 ciclos completos entre 2017 y 2025 y 1 ciclo completo dentro de la ventana de decisión de 24 meses; no se activa la causal de ausencia de ciclo en transitorios."
     },
     {
      "tipo": "favorable",
      "texto": "Área declarada 2.1 ha frente a 2.1 ha con actividad agrícola detectada por Sentinel-2 (desvío +0.0%): el activo productivo queda verificado sin ajuste de monto."
     },
     {
      "tipo": "favorable",
      "texto": "Pérdida de amplitud de apenas 10.1% frente a su propia historia (0.357 histórica contra 0.321 en los últimos 24 meses): el patrón de siembra y cosecha se mantiene, con pico promedio de 0.79."
     },
     {
      "tipo": "alerta",
      "texto": "Durante El Niño 2023-24 el predio perdió 6.5% de vigor contra 1.6% del promedio regional, es decir cuatro veces la caída de su entorno; la amplitud de 2023 bajó a 0.21 y la de 2025 a 0.20, las dos más bajas de la serie."
     },
     {
      "tipo": "favorable",
      "texto": "Controles de originación en firme: RTDAF/RUPTA (Ley 1448 de 2011) sin coincidencias y sin medida de protección vigente; polígono sin superposición con áreas protegidas ni frontera agrícola excluida."
     }
    ],
    "memorando": "Se recomienda aprobar el crédito de capital de trabajo por $8.200.000 solicitado por el señor Efraín Buitrago Sáenz sobre 2.1 hectáreas de papa Diacol capiro en la vereda Parroquia Vieja, Ventaquemada. El monto equivale al 17% del tope de crédito estimado para el productor ($47.799.706 sobre activos de 39 SMMLV) y a $3.905.000 por hectárea verificada, proporción consistente con un ciclo de siembra de papa. La serie Sentinel-2 muestra 6 ciclos completos en nueve años y 1 ciclo dentro de la ventana de decisión, con pérdida de amplitud de solo 10.1% frente a su propia historia: el predio sigue sembrándose. El rendimiento estimado a partir del vigor satelital, 32.24 t/ha, se ubica sobre el municipal oficial de 30.0 t/ha (EVA 2018 — VENTAQUEMADA, BOYACA — PAPA). La reserva del dictamen es climática: la caída de vigor de 6.5% durante El Niño 2023-24 cuadruplica la caída regional de 1.6%, lo que sugiere menor resiliencia hídrica que sus vecinos y sustenta el desembolso fraccionado. Se advierte además que la cobertura óptica es de 64 de 108 meses y 16 de 24 en la ventana de decisión: los indicadores son sólidos pero se calculan sobre una serie con nubosidad alta, propia del altiplano boyacense.",
    "recomendacion": "Aprobar $8.200.000 en línea Capital de Trabajo — pequeño productor a 12 meses con cobertura FAG del 80%, condicionando el segundo tramo del 40% a la confirmación satelital de emergencia del cultivo, dada la mayor sensibilidad del predio al déficit hídrico observada en El Niño 2023-24."
   },
   "meta-cacao-vigor-bajo": {
    "puntaje": 420,
    "banda_riesgo": "alto",
    "decision": "rechazar",
    "monto_sugerido_cop": 0,
    "linea_finagro": "",
    "cobertura_fag_pct": 0,
    "plazo_meses": 0,
    "desembolso": "No aplica: no se origina desembolso.",
    "ejes": [
     {
      "eje": "Capacidad de pago proyectada",
      "peso": 40,
      "puntaje": 14
     },
     {
      "eje": "Verificación del activo productivo",
      "peso": 20,
      "puntaje": 3
     },
     {
      "eje": "Riesgo sectorial y climático",
      "peso": 25,
      "puntaje": 18
     },
     {
      "eje": "Coherencia del destino del crédito",
      "peso": 15,
      "puntaje": 7
     }
    ],
    "evidencia": [
     {
      "tipo": "critico",
      "texto": "Área con actividad agrícola detectada por Sentinel-2: 1,84 ha frente a 4,2 ha declaradas, es decir 43,8% del polígono (desvío -56,2%). Al ubicarse por debajo del umbral del 50% se activa la causal de rechazo automático por inconsistencia de área."
     },
     {
      "tipo": "alerta",
      "texto": "El rendimiento estimado de 0,71 t/ha frente al municipal oficial de 0,60 t/ha (EVA 2018 — Granada, Meta — Cacao) NO es interpretable en este expediente: se deriva del escalamiento del vigor NDVI y el polígono no presenta actividad agrícola suficiente, por lo que la vegetación permanente (bosque o rastrojo, NDVI pico promedio 0,87) infla la cifra. No se computa como evidencia favorable."
     },
     {
      "tipo": "favorable",
      "texto": "La pérdida de amplitud contra su propia historia es de 33,1% (histórica 0,133 vs. 0,089 en los últimos 24 meses), por debajo del umbral de 40%: la causal de rechazo aplicable a perennes —pérdida ≥40% junto con rendimiento inferior al municipal— NO se activa. El rechazo obedece exclusivamente al criterio de área."
     },
     {
      "tipo": "favorable",
      "texto": "Comportamiento climático verificado: caída de vigor de 0,0% durante El Niño 2023-24 frente a 1,6% de caída promedio regional, con picos anuales estables entre 0,84 y 0,89 en los nueve años de serie (94 de 108 meses medidos)."
     },
     {
      "tipo": "favorable",
      "texto": "Control anti-despojo RTDAF/RUPTA (Ley 1448 de 2011): sin coincidencias, el predio no figura en el registro ni tiene medida de protección vigente. Verificación ambiental del polígono sin superposición con áreas protegidas ni frontera agrícola excluida."
     }
    ],
    "memorando": "Se recomienda al comité no originar la operación por $14.500.000 solicitada. La causal es única y objetiva: sobre el polígono declarado de 4,2 ha, la rejilla de análisis identifica apenas 1,84 ha con actividad agrícola verificable, equivalentes al 43,8% del área, por debajo del umbral del 50% que la política define como rechazo automático sin compensación entre ejes. El resto del polígono está vegetado pero sin dinámica de manejo, firma propia de bosque o rastrojo. Por esa misma razón el rendimiento estimado de 0,71 t/ha frente a 0,60 t/ha del municipio (EVA 2018 — Granada, Meta — Cacao) no puede leerse como fortaleza: la estimación escala vigor NDVI y la vegetación permanente lo eleva artificialmente. Se deja constancia de que, tratándose de un cultivo perenne, la ausencia de ciclos en la ventana reciente no se computa como defecto y la pérdida de amplitud de 33,1% no alcanza el umbral de 40%; la resiliencia climática observada es favorable (0,0% de caída en El Niño 2023-24 contra 1,6% regional). Los controles RTDAF/RUPTA y ambiental resultaron limpios. El expediente puede reconsiderarse si el productor reformula el área y el monto sobre las hectáreas efectivamente en producción, con soporte de linderos del IGAC.",
    "recomendacion": "Rechazar la solicitud por área con actividad agrícola detectada equivalente al 43,8% de la declarada, con posibilidad de reconsideración si se reformula el monto sobre las 1,84 ha efectivamente productivas y se acredita el área con delimitación del IGAC."
   }
  }
 }
};
