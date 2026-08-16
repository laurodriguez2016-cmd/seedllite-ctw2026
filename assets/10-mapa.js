/* ==========================================================================
   10-mapa.js — mapa de Colombia con los predios del demo
   Frente 🅰 APP · sin dependencias

   POR QUE EL MAPA SE DIBUJA Y NO SE IMPORTA
   -----------------------------------------
   La alternativa era un SVG de Colombia bajado de internet más una librería de
   mapas. El problema no es el peso: es que el contorno y los pines quedarían en
   dos sistemas de coordenadas distintos, y sincronizarlos a mano es la clase de
   trabajo que se rompe en silencio (el pin de Boyacá cae en el mar y nadie lo
   nota hasta la grabación).

   Acá el contorno del país y los pines pasan por LA MISMA función `proyectar()`.
   Por construcción, un predio en Pitalito cae sobre Pitalito. Cambiar el
   encuadre es cambiar una constante.
   ========================================================================== */

(function (global) {
  "use strict";

  /* Contorno de Colombia continental — 522 vértices [lon, lat].

     Fuente: Natural Earth, 1:10.000.000 Admin 0 Countries. DOMINIO PÚBLICO
     (naturalearthdata.com/about/terms-of-use). Cumple la regla de datos del
     repo: solo fuentes con uso comercial permitido.

     El original trae 3.088 vértices; se redujo con Douglas-Peucker a una
     tolerancia de 0,021° conservando la forma. A 4 decimales la precisión es
     de unos 400 m, muy por debajo de lo que un lienzo de 420 px puede mostrar.

     Las islas del Caribe (San Andrés y Providencia) quedan fuera: caen a −81,7°
     de longitud y meterlas obligaría a ensanchar el encuadre y encoger el
     continente. Este mapa localiza cuatro predios; no es un mapa político.

     La versión anterior era una silueta de 45 vértices dibujada a mano y se
     veía artificial, que es justamente lo que un jurado nota primero. */
  var FRONTERA = [
    [-78.8287,1.4343],[-78.8607,1.5585],[-78.8996,1.5453],[-79.0215,1.6383],
    [-78.8461,1.8216],[-78.5712,1.7822],[-78.5454,1.9147],[-78.5914,1.8968],
    [-78.6080,2.0280],[-78.6656,1.9829],[-78.7032,2.1898],[-78.5741,2.4332],
    [-78.5590,2.4492],[-78.5590,2.3815],[-78.5250,2.4955],[-78.3460,2.6480],
    [-78.2548,2.5419],[-78.2469,2.6636],[-78.2078,2.5373],[-78.1325,2.4927],
    [-78.0853,2.5161],[-78.0961,2.6515],[-77.9498,2.6745],[-77.8881,2.6347],
    [-77.9043,2.5800],[-77.7604,2.5916],[-77.8124,2.7645],[-77.7336,2.7861],
    [-77.7858,2.7948],[-77.7646,2.8157],[-77.6888,2.7917],[-77.7235,2.8402],
    [-77.6361,2.8696],[-77.7093,2.8607],[-77.7101,2.9181],[-77.6434,2.8981],
    [-77.6197,2.9316],[-77.6339,2.9949],[-77.7218,2.9820],[-77.4797,3.2275],
    [-77.5418,3.2461],[-77.4649,3.3016],[-77.4574,3.3561],[-77.3810,3.3876],
    [-77.3189,3.3200],[-77.3671,3.4021],[-77.3530,3.4298],[-77.3332,3.4118],
    [-77.3332,3.5118],[-77.2643,3.4709],[-77.2990,3.5118],[-77.2749,3.5328],
    [-77.3218,3.5478],[-77.2096,3.5806],[-77.1892,3.6626],[-77.1183,3.6780],
    [-77.1708,3.6772],[-77.1265,3.7172],[-77.1854,3.7036],[-77.2008,3.7435],
    [-77.1256,3.7335],[-77.1749,3.7582],[-77.1265,3.7787],[-77.1504,3.8137],
    [-77.1203,3.7991],[-77.1145,3.8526],[-77.0316,3.9158],[-77.1265,3.9295],
    [-77.1230,3.8861],[-77.2532,3.8408],[-77.3118,3.9084],[-77.3002,3.9691],
    [-77.2096,3.9773],[-77.2438,3.9773],[-77.1892,4.0673],[-77.2643,4.1082],
    [-77.2643,4.0673],[-77.3189,4.0530],[-77.3462,3.9295],[-77.4352,4.0294],
    [-77.4083,4.0456],[-77.4267,4.1804],[-77.3481,4.2247],[-77.2990,4.2032],
    [-77.2363,4.2653],[-77.3365,4.2687],[-77.3872,4.3472],[-77.3127,4.4714],
    [-77.3189,4.6837],[-77.2990,4.6557],[-77.2916,4.6821],[-77.3258,4.7525],
    [-77.2580,4.7041],[-77.3486,4.8542],[-77.3729,5.1492],[-77.3462,5.2448],
    [-77.4086,5.3862],[-77.3810,5.4030],[-77.4621,5.5010],[-77.5592,5.5031],
    [-77.4908,5.5948],[-77.4049,5.6284],[-77.3332,5.6153],[-77.2459,5.7342],
    [-77.3530,6.0262],[-77.3667,5.9989],[-77.4844,6.1888],[-77.4834,6.2943],
    [-77.4151,6.2391],[-77.3810,6.3005],[-77.3993,6.3876],[-77.3605,6.3899],
    [-77.3810,6.4445],[-77.3454,6.5661],[-77.4151,6.6363],[-77.4112,6.6938],
    [-77.4626,6.7207],[-77.5380,6.6636],[-77.5933,6.8281],[-77.6711,6.8797],
    [-77.6963,6.8492],[-77.6650,7.0156],[-77.8958,7.2351],[-77.8202,7.4765],
    [-77.7551,7.4861],[-77.7312,7.5303],[-77.7642,7.7057],[-77.6799,7.6710],
    [-77.6133,7.5375],[-77.5800,7.5284],[-77.3397,7.7072],[-77.3799,7.7744],
    [-77.3004,7.9021],[-77.1633,7.9393],[-77.3169,8.2508],[-77.3744,8.2893],
    [-77.4223,8.4564],[-77.4887,8.4736],[-77.4340,8.6283],[-77.3517,8.6693],
    [-77.2747,8.4958],[-77.1444,8.4211],[-77.0316,8.2600],[-76.9620,8.2665],
    [-76.9631,8.2037],[-76.9176,8.1890],[-76.9425,8.1289],[-76.8323,8.1365],
    [-76.8254,8.0955],[-76.8602,8.0825],[-76.8391,8.0546],[-76.8664,8.0620],
    [-76.8323,8.0273],[-76.9217,8.0273],[-76.9071,7.9295],[-76.7572,7.9236],
    [-76.7306,8.0513],[-76.7748,8.4167],[-76.8386,8.5004],[-76.9472,8.5455],
    [-76.8937,8.6203],[-76.6602,8.6874],[-76.6473,8.7473],[-76.5469,8.7846],
    [-76.4269,8.9105],[-76.3155,8.9477],[-76.1926,9.1349],[-76.1681,9.2470],
    [-76.1169,9.2658],[-76.0961,9.3332],[-75.9533,9.4023],[-75.9438,9.4407],
    [-75.8110,9.4435],[-75.7982,9.4182],[-75.8529,9.4121],[-75.8119,9.3915],
    [-75.7392,9.4257],[-75.6726,9.4100],[-75.6206,9.4529],[-75.5764,9.6211],
    [-75.6180,9.6893],[-75.7051,9.7007],[-75.6399,9.7833],[-75.5762,10.0418],
    [-75.5894,10.1283],[-75.5307,10.2407],[-75.7036,10.1344],[-75.5922,10.3027],
    [-75.5838,10.2824],[-75.5157,10.3190],[-75.5238,10.3915],[-75.5511,10.4194],
    [-75.5785,10.3983],[-75.5028,10.4877],[-75.5222,10.4329],[-75.4933,10.4346],
    [-75.5196,10.5765],[-75.2796,10.7427],[-75.2495,10.7068],[-75.2222,10.7347],
    [-75.2296,10.7683],[-75.2700,10.7591],[-75.2674,10.7953],[-75.0495,10.9012],
    [-75.0236,10.9743],[-74.9236,11.0457],[-74.8615,11.0488],[-74.8444,11.1097],
    [-74.5230,10.9959],[-74.2978,10.9915],[-74.4916,10.9795],[-74.5174,10.9267],
    [-74.4818,10.8508],[-74.5250,10.8834],[-74.5970,10.8678],[-74.5985,10.7819],
    [-74.5643,10.8310],[-74.5438,10.7620],[-74.4997,10.7647],[-74.5096,10.8445],
    [-74.4566,10.7480],[-74.3951,10.7495],[-74.2149,11.0870],[-74.2336,11.2412],
    [-74.1534,11.3437],[-74.0046,11.3553],[-73.8260,11.2768],[-73.7051,11.2683],
    [-73.2924,11.2940],[-72.7413,11.7080],[-72.4335,11.7961],[-72.2631,11.8860],
    [-72.1387,12.1046],[-72.1728,12.2213],[-72.1387,12.2560],[-71.9696,12.2551],
    [-72.0151,12.1940],[-71.9673,12.1530],[-71.9376,12.1664],[-71.8680,12.2082],
    [-71.8711,12.2560],[-71.9605,12.2827],[-71.8291,12.3762],[-71.8431,12.3381],
    [-71.8028,12.3237],[-71.7325,12.4102],[-71.6936,12.3653],[-71.6309,12.4274],
    [-71.6791,12.4170],[-71.6588,12.4404],[-71.6936,12.4274],[-71.6861,12.4547],
    [-71.7408,12.4199],[-71.6756,12.4683],[-71.5113,12.4433],[-71.2618,12.3419],
    [-71.1139,12.0944],[-71.1381,12.0158],[-71.4097,11.8123],[-71.9906,11.6491],
    [-72.2671,11.1549],[-72.4993,11.1208],[-72.5765,10.9574],[-72.6830,10.8556],
    [-72.7544,10.6749],[-72.9149,10.4329],[-72.9356,10.1752],[-72.9877,9.9994],
    [-72.9855,9.8122],[-73.1077,9.5780],[-73.1784,9.5230],[-73.3911,9.1728],
    [-73.2122,9.1734],[-73.0097,9.2954],[-72.9553,9.1040],[-72.8267,9.1417],
    [-72.7910,9.1139],[-72.6754,8.6515],[-72.3935,8.3554],[-72.3960,8.2566],
    [-72.3358,8.1039],[-72.3501,8.0426],[-72.4071,8.0438],[-72.4912,7.9375],
    [-72.4518,7.8328],[-72.4787,7.4845],[-72.4146,7.4138],[-72.2062,7.3819],
    [-72.1640,7.3289],[-72.1641,7.2208],[-72.0983,7.0868],[-71.9938,7.0129],
    [-71.8482,6.9839],[-71.7740,7.0289],[-71.6204,7.0521],[-71.4677,7.0124],
    [-71.2925,7.0258],[-71.2755,6.9844],[-71.1840,6.9626],[-71.1360,6.9921],
    [-71.0113,6.9909],[-70.8955,7.0685],[-70.7033,7.0999],[-70.5786,7.0858],
    [-70.5107,7.0097],[-70.3191,6.9383],[-70.1292,6.9725],[-69.4436,6.1222],
    [-69.3314,6.1564],[-69.2461,6.0807],[-69.0611,6.2178],[-68.6353,6.1359],
    [-68.4490,6.1950],[-68.3042,6.1770],[-68.1465,6.2238],[-67.9780,6.2178],
    [-67.8272,6.3134],[-67.5740,6.2662],[-67.4500,6.1979],[-67.4912,6.1145],
    [-67.4286,6.0385],[-67.4225,5.9782],[-67.6251,5.7845],[-67.6491,5.6561],
    [-67.6170,5.5416],[-67.6525,5.4780],[-67.8346,5.3393],[-67.8266,5.1204],
    [-67.7931,5.0633],[-67.8751,4.5326],[-67.7931,4.4290],[-67.7862,4.1730],
    [-67.7206,4.0750],[-67.6318,3.7619],[-67.4998,3.7179],[-67.4039,3.5045],
    [-67.3046,3.4257],[-67.3095,3.3839],[-67.3958,3.2666],[-67.8386,2.8861],
    [-67.8559,2.7898],[-67.7510,2.8421],[-67.6266,2.8134],[-67.5756,2.6911],
    [-67.5003,2.6753],[-67.3254,2.4746],[-67.1897,2.3944],[-67.1737,2.3364],
    [-67.2173,2.2661],[-67.1778,2.1545],[-67.1146,2.1030],[-67.1326,1.9908],
    [-67.0668,1.8941],[-66.9327,1.4246],[-66.8835,1.3499],[-66.8751,1.2225],
    [-67.0861,1.1760],[-67.0736,1.5412],[-67.1172,1.7098],[-67.3406,2.0901],
    [-67.4246,2.1381],[-67.5930,2.0548],[-67.8208,1.7840],[-67.9288,1.7413],
    [-68.0318,1.7775],[-68.1111,1.9424],[-68.1922,2.0149],[-68.2802,1.8294],
    [-68.1633,1.7213],[-69.3524,1.7202],[-69.5420,1.7727],[-69.8562,1.7077],
    [-69.8522,1.0594],[-69.7626,1.0911],[-69.7160,1.0586],[-69.4783,1.0607],
    [-69.4182,1.0286],[-69.3550,1.0671],[-69.2888,1.0384],[-69.1524,0.8678],
    [-69.1923,0.7289],[-69.1375,0.6501],[-69.2971,0.6181],[-69.3021,0.6565],
    [-69.3626,0.6409],[-69.4781,0.7328],[-69.6192,0.6507],[-69.6947,0.6687],
    [-69.8053,0.6069],[-70.0542,0.5881],[-70.0680,-0.1601],[-69.9336,-0.3143],
    [-69.6198,-0.5246],[-69.5842,-0.6446],[-69.6284,-0.7334],[-69.5326,-0.9341],
    [-69.4429,-1.0084],[-69.4482,-1.0921],[-69.3995,-1.1827],[-69.9650,-4.2365],
    [-70.0305,-4.1316],[-70.1884,-4.0290],[-70.2170,-3.9250],[-70.3111,-3.8293],
    [-70.3777,-3.8188],[-70.4909,-3.8785],[-70.7341,-3.7820],[-70.0506,-2.7151],
    [-70.1058,-2.6252],[-70.1505,-2.6692],[-70.1839,-2.6195],[-70.2361,-2.6251],
    [-70.2739,-2.5463],[-70.3646,-2.5576],[-70.3575,-2.4869],[-70.4453,-2.4985],
    [-70.5786,-2.4055],[-70.5986,-2.4466],[-70.6476,-2.4508],[-70.7066,-2.3283],
    [-70.7879,-2.3074],[-70.9046,-2.2111],[-71.0214,-2.1967],[-71.0297,-2.2640],
    [-71.1200,-2.2521],[-71.2091,-2.3392],[-71.3155,-2.3341],[-71.4208,-2.3760],
    [-71.4116,-2.3266],[-71.4565,-2.2551],[-71.4981,-2.3151],[-71.5384,-2.2230],
    [-71.6785,-2.1695],[-71.7314,-2.1899],[-71.7461,-2.1323],[-71.8362,-2.1798],
    [-71.9487,-2.3241],[-72.0615,-2.3200],[-72.1764,-2.4103],[-72.2510,-2.3963],
    [-72.3780,-2.4508],[-72.6443,-2.3341],[-72.7124,-2.4221],[-72.7337,-2.3676],
    [-72.7617,-2.4023],[-72.8047,-2.3778],[-72.9354,-2.4253],[-72.9876,-2.3377],
    [-73.0564,-2.2999],[-73.0838,-2.3451],[-73.1589,-2.2930],[-73.1978,-2.2136],
    [-73.1111,-2.0734],[-73.1687,-1.9593],[-73.1930,-1.7887],[-73.2573,-1.7424],
    [-73.2677,-1.7722],[-73.3505,-1.7906],[-73.4401,-1.7587],[-73.5310,-1.6737],
    [-73.4845,-1.5725],[-73.4972,-1.4780],[-73.5742,-1.4169],[-73.5629,-1.3722],
    [-73.6366,-1.2552],[-73.7547,-1.1833],[-73.8025,-1.2236],[-73.8572,-1.2105],
    [-73.9199,-1.1138],[-73.9813,-1.1075],[-73.9828,-1.0662],[-74.0372,-1.0797],
    [-74.0769,-0.9909],[-74.1196,-1.0210],[-74.2668,-0.9723],[-74.3444,-0.8586],
    [-74.2891,-0.8363],[-74.3028,-0.7854],[-74.3851,-0.7220],[-74.3649,-0.6762],
    [-74.4180,-0.5427],[-74.6423,-0.3398],[-74.6866,-0.3534],[-74.7907,-0.3126],
    [-74.7553,-0.2783],[-74.8247,-0.1705],[-74.8727,-0.2219],[-74.9335,-0.2094],
    [-75.1417,-0.0435],[-75.2221,-0.0324],[-75.2835,-0.1070],[-75.4649,-0.0397],
    [-75.6268,0.0789],[-75.7897,0.0844],[-75.9520,0.2040],[-76.0535,0.3635],
    [-76.1196,0.3518],[-76.1363,0.3967],[-76.2237,0.4067],[-76.3005,0.4616],
    [-76.4164,0.4019],[-76.4080,0.2545],[-76.5654,0.2161],[-76.7245,0.2776],
    [-76.7344,0.2331],[-76.8825,0.2401],[-77.0829,0.3489],[-77.2069,0.3342],
    [-77.3975,0.3876],[-77.4347,0.4338],[-77.4681,0.6509],[-77.6456,0.7163],
    [-77.7032,0.8431],[-77.8480,0.8093],[-77.9183,0.8744],[-78.1200,0.9212],
    [-78.3492,1.0558],[-78.4852,1.1926],[-78.5701,1.1958],[-78.6021,1.2636],
    [-78.6647,1.2666],[-78.8287,1.4343]
  ];

  /* Encuadre geográfico del lienzo. Único lugar donde se toca el mapa. */
  /* Ajustado al contorno real: el país ocupa de −79,02° a −66,88° de longitud
     y de −4,24° a 12,47° de latitud. Con medio grado de aire alrededor, la
     silueta llena el lienzo en vez de flotar en el centro. */
  var LON_MIN = -79.5, LON_MAX = -66.4;
  var LAT_MIN =  -4.7, LAT_MAX =  12.9;

  var ANCHO = 420, ALTO = 560, MARGEN = 14;

  function proyectar(lon, lat) {
    /* Equirectangular. Para un solo país cerca del ecuador la distorsión es
       irrelevante y evita traer una librería de proyecciones. */
    var x = (lon - LON_MIN) / (LON_MAX - LON_MIN);
    var y = 1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN);
    return [
      MARGEN + x * (ANCHO - MARGEN * 2),
      MARGEN + y * (ALTO - MARGEN * 2)
    ];
  }

  function svgEl(nombre, atributos) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", nombre);
    for (var k in atributos) {
      if (Object.prototype.hasOwnProperty.call(atributos, k)) {
        el.setAttribute(k, atributos[k]);
      }
    }
    return el;
  }

  var COLOR_DECISION = {
    aprobar: "var(--favorable)",
    aprobar_con_ajuste: "var(--alerta)",
    rechazar: "var(--critico)"
  };

  /**
   * Dibuja el mapa dentro de un <svg> existente.
   * @param {SVGElement} svg
   * @param {Array}  predios
   * @param {Object} dictamenes  para colorear el pin según la decisión
   * @param {string} seleccionado  id del predio activo
   * @param {Function} alSeleccionar  callback(id)
   */
  /* Duración del trazado del contorno. Los pines no caen hasta que termina:
     el retardo de cada uno arranca aquí. */
  var TRAZO_MS = 1300;

  function movimientoReducido() {
    return !!(global.matchMedia &&
              global.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /**
   * Dibuja la silueta del país como un trazo a lápiz.
   *
   * Misma técnica que la serie NDVI: el borde se pinta como una línea
   * discontinua cuyo guion mide exactamente lo que mide todo el contorno, y se
   * desplaza ese guion desde fuera hasta su sitio, de modo que la silueta
   * aparece trazándose. El relleno entra al final, cuando el trazo ya cerró.
   *
   * El SVG ya está en el documento cuando se llama: getTotalLength() necesita
   * geometría calculada.
   */
  function dibujarContorno(pais) {
    if (movimientoReducido() || typeof pais.getTotalLength !== "function") { return; }

    var largo;
    try { largo = pais.getTotalLength(); } catch (e) { return; }
    if (!largo) { return; }

    pais.style.strokeDasharray = largo + " " + largo;
    pais.style.strokeDashoffset = largo;
    pais.style.fillOpacity = "0";

    global.requestAnimationFrame(function () {
      pais.style.transition =
        "stroke-dashoffset " + TRAZO_MS + "ms ease-in-out, " +
        "fill-opacity 600ms ease-out " + Math.round(TRAZO_MS * 0.7) + "ms";
      pais.style.strokeDashoffset = "0";
      pais.style.fillOpacity = "";
    });
  }

  /* ======================================================================
     LA MALLA HEXAGONAL

     El mapa no es una silueta rellena: es una malla de celdas. No es adorno.
     Sentinel-2 lee el territorio como una cuadricula de celdas de 10 m, y el
     producto entero consiste en mirar celda por celda que pasa en el suelo.
     Que el mapa este hecho de celdas dice, sin una sola palabra, como funciona
     esto por dentro.

     Las celdas NO llevan color de dato. Un mapa de calor exigiria una variable
     por celda que no tenemos, y pintarla seria inventarla — la linea roja del
     proyecto es "sin fuente, no es un hecho". Solo se encienden las cuatro
     celdas donde cae un predio evaluado, con el color de su decision. Eso si
     es dato.
     ====================================================================== */

  /* Radio de la celda. A 4,6 px la malla pasa de ~400 a ~1.500 celdas: la
     densidad es lo que la hace leerse como una superficie muestreada y no como
     un mosaico decorativo. Es el mismo lenguaje de los mapas de puntos del
     Economist o de Zeit. */
  var HEX_R = 4.6;
  var MALLA_MS = 1100;           /* cuanto tarda la malla en acomodarse */

  /* Hexagono de vertice plano a izquierda y derecha: teselan sin huecos con
     paso horizontal de 1,5·r y vertical de √3·r, desfasando columnas impares. */
  function rutaHex(cx, cy, r) {
    var p = [];
    for (var i = 0; i < 6; i++) {
      var a = Math.PI / 3 * i;
      p.push((cx + r * Math.cos(a)).toFixed(1) + "," + (cy + r * Math.sin(a)).toFixed(1));
    }
    return "M" + p.join("L") + "Z";
  }

  /* Lanzamiento de rayo: cuenta cruces del borde a la derecha del punto. */
  function dentro(x, y, poligono) {
    var adentro = false;
    for (var i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
      var xi = poligono[i][0], yi = poligono[i][1];
      var xj = poligono[j][0], yj = poligono[j][1];
      if (((yi > y) !== (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        adentro = !adentro;
      }
    }
    return adentro;
  }

  /* Desorden reproducible: la malla debe acomodarse distinto en cada celda,
     pero igual en cada reproduccion. Math.random daria tomas de video que no
     se pueden repetir. */
  function ruido(n) {
    var s = Math.sin(n * 12.9898) * 43758.5453;
    return s - Math.floor(s);
  }

  function construirMalla(svg, poligono, predios) {
    var malla = svgEl("g", { "class": "malla" });

    var pasoX = HEX_R * 1.5;
    var pasoY = HEX_R * Math.sqrt(3);

    /* Celda de cada predio: la mas cercana a su coordenada real. */
    var marcados = predios.map(function (p) {
      var xy = proyectar(p.coordenadas.lon, p.coordenadas.lat);
      return { x: xy[0], y: xy[1], id: p.id, mejor: Infinity, celda: null };
    });

    var celdas = [];
    var col = 0;

    for (var cx = MARGEN; cx <= ANCHO - MARGEN; cx += pasoX, col++) {
      var desfase = (col % 2) ? pasoY / 2 : 0;
      for (var cy = MARGEN + desfase; cy <= ALTO - MARGEN; cy += pasoY) {
        if (!dentro(cx, cy, poligono)) { continue; }
        celdas.push({ x: cx, y: cy });

        for (var m = 0; m < marcados.length; m++) {
          var d = (marcados[m].x - cx) * (marcados[m].x - cx) +
                  (marcados[m].y - cy) * (marcados[m].y - cy);
          if (d < marcados[m].mejor) {
            marcados[m].mejor = d;
            marcados[m].celda = celdas.length - 1;
          }
        }
      }
    }

    /* Se acomodan de norte a sur, con un desorden corto encima para que no se
       lea como un barrido mecanico. */
    celdas.forEach(function (c, i) {
      var hex = svgEl("path", { d: rutaHex(c.x, c.y, HEX_R * 0.78), "class": "hex" });
      var avance = (c.y - MARGEN) / (ALTO - MARGEN * 2);
      hex.style.animationDelay =
        (avance * (MALLA_MS / 1000) * 0.75 + ruido(i) * 0.22).toFixed(3) + "s";
      malla.appendChild(hex);
      c.nodo = hex;
    });

    marcados.forEach(function (m) {
      if (m.celda != null && celdas[m.celda]) {
        celdas[m.celda].nodo.setAttribute("class", "hex hex-predio hex-" + m.id);
      }
    });

    svg.appendChild(malla);
    svg.__celdas = celdas;
    return celdas.length;
  }

  /**
   * Onda que recorre la malla desde el punto de impacto de una aguja.
   *
   * Las celdas se encienden con el color de la decisión y vuelven a su tono en
   * seguida. Es un efecto de animación, no una capa de datos: no queda nada
   * pintado al terminar, justamente para que nadie lo lea como información
   * sobre esas celdas. El impacto visual viene del movimiento y la densidad,
   * no de colorear un dato que no tenemos.
   *
   * @param {Element} svg     lienzo con la malla ya construida
   * @param {number}  cx, cy  punto de impacto, en coordenadas del lienzo
   * @param {string}  color   color de la decisión del predio
   */
  function ondaEnMalla(svg, cx, cy, color) {
    if (movimientoReducido()) { return; }

    var celdas = svg.__celdas || [];
    var ALCANCE = 150;      /* px: hasta dónde llega la onda */
    var VELOCIDAD = 0.42;   /* px por ms: cómo de rápido viaja */

    celdas.forEach(function (c) {
      if (c.nodo.getAttribute("class").indexOf("hex-predio") >= 0) { return; }

      var dx = c.x - cx, dy = c.y - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > ALCANCE) { return; }

      /* La intensidad decae con la distancia: el frente de onda se apaga. */
      var fuerza = 1 - dist / ALCANCE;

      global.setTimeout(function () {
        c.nodo.style.transition = "none";
        c.nodo.style.fill = color;
        c.nodo.style.fillOpacity = (0.15 + fuerza * 0.6).toFixed(2);

        global.setTimeout(function () {
          c.nodo.style.transition = "fill 700ms ease-out, fill-opacity 700ms ease-out";
          c.nodo.style.fill = "";
          c.nodo.style.fillOpacity = "";
        }, 30);
      }, dist / VELOCIDAD);
    });
  }

  /**
   * Zoom de salida: la cámara se mete hacia la celda del predio elegido.
   *
   * No es un adorno de transición. Es el argumento del producto contado con el
   * encuadre: el país es una malla de celdas, se entra a UNA de ellas, y del
   * otro lado está la parcela con su rejilla de medición de 10 m. País →
   * celda → predio, sin corte.
   *
   * La curva es de entrada (acelera) porque una cámara que se lanza hacia algo
   * no frena al llegar; frenar se leería como aterrizaje suave, no como
   * inmersión.
   *
   * @param {Element}  svg        el lienzo del mapa
   * @param {number}   cx, cy     destino, en coordenadas del lienzo
   * @param {Function} alTerminar se llama cuando la cámara llegó
   */
  function zoomA(svg, cx, cy, alTerminar) {
    if (!svg || movimientoReducido()) { alTerminar(); return; }

    var DUR = 620;
    var CIERRE = 0.13;              /* fracción del lienzo a la que se entra */

    var v0 = [0, 0, ANCHO, ALTO];
    var w1 = ANCHO * CIERRE, h1 = ALTO * CIERRE;
    var v1 = [cx - w1 / 2, cy - h1 / 2, w1, h1];

    var malla = svg.querySelector(".malla");
    var pais = svg.querySelector(".pais");
    var t0 = new Date().getTime();

    (function paso() {
      var a = Math.min(1, (new Date().getTime() - t0) / DUR);
      var e = a * a * a;            /* aceleración cúbica */

      svg.setAttribute("viewBox", [
        v0[0] + (v1[0] - v0[0]) * e,
        v0[1] + (v1[1] - v0[1]) * e,
        v0[2] + (v1[2] - v0[2]) * e,
        v0[3] + (v1[3] - v0[3]) * e
      ].map(function (n) { return n.toFixed(1); }).join(" "));

      /* La malla y el contorno se disuelven mientras se entra: al final solo
         queda la celda de destino, que es la que se convierte en la parcela. */
      if (malla) { malla.style.opacity = (1 - a * 0.92).toFixed(2); }
      if (pais) { pais.style.opacity = (1 - a).toFixed(2); }
      svg.style.opacity = (1 - Math.max(0, (a - 0.6) / 0.4)).toFixed(2);

      if (a < 1) { global.requestAnimationFrame(paso); return; }
      alTerminar();
    })();
  }

  function render(svg, predios, dictamenes, seleccionado, alSeleccionar) {
    svg.setAttribute("viewBox", "0 0 " + ANCHO + " " + ALTO);
    svg.setAttribute("class", "mapa");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Mapa de Colombia con los predios evaluados");
    svg.textContent = "";

    var poligono = FRONTERA.map(function (p) { return proyectar(p[0], p[1]); });

    var d = poligono.map(function (xy, i) {
      return (i === 0 ? "M" : "L") + xy[0].toFixed(1) + " " + xy[1].toFixed(1);
    }).join(" ") + " Z";

    /* Orden de capas: la malla al fondo, el contorno encima para definirla, y
       las agujas al final para que nada las tape. */
    construirMalla(svg, poligono, predios);

    var pais = svgEl("path", { d: d, "class": "pais" });
    svg.appendChild(pais);
    dibujarContorno(pais);

    predios.forEach(function (predio, indice) {
      var xy = proyectar(predio.coordenadas.lon, predio.coordenadas.lat);
      var dict = dictamenes && dictamenes[predio.id];
      var color = dict ? (COLOR_DECISION[dict.decision] || "var(--acento)") : "var(--acento)";

      /* La celda donde cae el predio se enciende con el color de su decisión.
         Es el único dato que la malla representa; el resto son celdas neutras.
         Pintarlas todas sería un mapa de calor sin variable que lo sostenga. */
      var celda = svg.querySelector(".hex-" + predio.id);
      if (celda) {
        celda.style.fill = color;
        celda.style.fillOpacity = "0.85";
      }

      var g = svgEl("g", {
        "class": "pin",
        "aria-current": predio.id === seleccionado ? "true" : "false",
        tabindex: "0",
        role: "button",
        "aria-label": predio.municipio + ", " + predio.departamento + " — " + predio.cultivo
      });

      /* Las agujas caen despues de que la malla se acomoda y el contorno cierra.
         El escalonado de 0,14 s las lee como cuatro solicitudes que van
         llegando, no como una lamina que aparece de golpe. */
      g.style.animationDelay =
        (TRAZO_MS / 1000 + 0.15 + indice * 0.14).toFixed(2) + "s";

      /* La aguja: tallo fino que termina en punta sobre la coordenada exacta, y
         cabeza arriba con el color de la decision. El punto de contacto con el
         mapa es la punta, no la cabeza — el pin senala donde esta el predio. */
      g.appendChild(svgEl("line", {
        x1: xy[0], y1: xy[1] - 26, x2: xy[0], y2: xy[1],
        "class": "aguja-tallo", stroke: color
      }));
      g.appendChild(svgEl("circle", {
        cx: xy[0], cy: xy[1] - 26, r: 4.5, fill: color, "class": "aguja-cabeza"
      }));
      g.appendChild(svgEl("circle", {
        cx: xy[0], cy: xy[1], r: 1.6, fill: color, "class": "aguja-punta"
      }));

      /* Onda de impacto: nace en la punta al clavarse y se desvanece. */
      var impacto = TRAZO_MS + 150 + indice * 140 + 510;   /* ms hasta clavarse */

      var onda = svgEl("circle", {
        cx: xy[0], cy: xy[1], r: 3, fill: "none", stroke: color, "class": "aguja-onda"
      });
      onda.style.animationDelay = (impacto / 1000).toFixed(2) + "s";
      g.appendChild(onda);

      /* Al clavarse, la onda se propaga por la malla desde la punta. */
      global.setTimeout(function () {
        ondaEnMalla(svg, xy[0], xy[1], color);
      }, impacto);

      var t = svgEl("text", { x: xy[0] + 9, y: xy[1] - 24 });
      t.textContent = predio.municipio;
      g.appendChild(t);

      /* Al elegir, la cámara se mete hacia la celda antes de cambiar de
         pantalla: el paso al predio es un movimiento, no un corte. */
      function activar() {
        zoomA(svg, xy[0], xy[1], function () { alSeleccionar(predio.id); });
      }
      g.addEventListener("click", activar);
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activar(); }
      });

      svg.appendChild(g);
    });
  }

  global.SEEDLLITE = global.SEEDLLITE || {};
  global.SEEDLLITE.mapa = { render: render, proyectar: proyectar, zoomA: zoomA };
})(window);
