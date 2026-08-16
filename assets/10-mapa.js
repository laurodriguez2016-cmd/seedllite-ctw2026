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

  /* Frontera de Colombia simplificada, en sentido horario desde Punta Gallinas.
     ~45 vértices [lon, lat]. Precisión suficiente para una silueta de demo;
     no es cartografía oficial y el README lo dice. */
  var FRONTERA = [
    [-71.13, 12.43], [-72.45, 11.75], [-73.35, 11.30], [-74.20, 11.10],
    [-74.85, 10.95], [-75.55, 10.40], [-75.70,  9.45], [-76.20,  8.95],
    [-76.90,  8.65], [-77.35,  8.50], [-77.40,  7.90], [-77.90,  7.55],
    [-77.35,  6.95], [-77.55,  6.20], [-77.40,  5.60], [-77.30,  4.80],
    [-77.50,  4.00], [-78.20,  2.60], [-78.90,  1.80], [-78.85,  1.45],
    [-77.70,  0.85], [-76.90,  0.40], [-75.30, -0.15], [-74.80, -0.60],
    [-73.65, -1.25], [-72.90, -2.30], [-71.75, -2.15], [-70.95, -2.35],
    [-70.05, -2.70], [-69.60, -4.20], [-69.95, -4.23], [-69.40, -1.10],
    [-69.85,  1.05], [-69.15,  1.10], [-67.90,  1.75], [-67.30,  2.20],
    [-67.85,  2.85], [-67.45,  3.80], [-67.85,  4.55], [-67.45,  6.20],
    [-69.30,  6.15], [-70.10,  6.95], [-71.10,  6.98], [-72.00,  7.05],
    [-72.45,  7.40], [-72.40,  8.35], [-72.90,  9.10], [-72.65, 10.15],
    [-71.95, 11.35]
  ];

  /* Encuadre geográfico del lienzo. Único lugar donde se toca el mapa. */
  var LON_MIN = -79.6, LON_MAX = -66.4;
  var LAT_MIN =  -4.8, LAT_MAX =  13.2;

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
  function render(svg, predios, dictamenes, seleccionado, alSeleccionar) {
    svg.setAttribute("viewBox", "0 0 " + ANCHO + " " + ALTO);
    svg.setAttribute("class", "mapa");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Mapa de Colombia con los predios evaluados");
    svg.textContent = "";

    var d = FRONTERA.map(function (p, i) {
      var xy = proyectar(p[0], p[1]);
      return (i === 0 ? "M" : "L") + xy[0].toFixed(1) + " " + xy[1].toFixed(1);
    }).join(" ") + " Z";

    svg.appendChild(svgEl("path", { d: d, "class": "pais" }));

    predios.forEach(function (predio, indice) {
      var xy = proyectar(predio.coordenadas.lon, predio.coordenadas.lat);
      var dict = dictamenes && dictamenes[predio.id];
      var color = dict ? (COLOR_DECISION[dict.decision] || "var(--acento)") : "var(--acento)";

      var g = svgEl("g", {
        "class": "pin",
        "aria-current": predio.id === seleccionado ? "true" : "false",
        tabindex: "0",
        role: "button",
        "aria-label": predio.municipio + ", " + predio.departamento + " — " + predio.cultivo
      });

      /* Los pines caen sobre el mapa, uno detrás de otro. El contorno del país
         entra primero (0,25 s) para que aterricen sobre algo ya dibujado; el
         escalonado de 0,11 s hace que se lean como cuatro solicitudes que van
         llegando, no como una lámina que aparece de golpe. Es la primera imagen
         del video. */
      g.style.animationDelay = (0.25 + indice * 0.11).toFixed(2) + "s";

      g.appendChild(svgEl("circle", { cx: xy[0], cy: xy[1], r: 6, fill: color }));

      var t = svgEl("text", { x: xy[0] + 11, y: xy[1] + 3.5 });
      t.textContent = predio.municipio;
      g.appendChild(t);

      function activar() { alSeleccionar(predio.id); }
      g.addEventListener("click", activar);
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activar(); }
      });

      svg.appendChild(g);
    });
  }

  global.SEEDLLITE = global.SEEDLLITE || {};
  global.SEEDLLITE.mapa = { render: render, proyectar: proyectar };
})(window);
