/* ==========================================================================
   20-grafica-ndvi.js — la serie temporal satelital de 10 años
   Frente 🅰 APP · sin dependencias

   Es la pieza visual central del producto: 120 observaciones mensuales, las
   bandas de los eventos ENSO de fondo, y los puntos con nubosidad alta
   atenuados.

   Función pura: recibe datos, devuelve un <svg>. No toca el DOM global ni
   conoce el estado de la app, así que se puede iterar en aislamiento.

   POR QUE LOS PUNTOS NUBLADOS SE DIBUJAN Y NO SE ESCONDEN
   ------------------------------------------------------
   Una serie perfectamente limpia se ve inventada. El dato óptico real en el
   trópico tiene huecos por nubes: mostrarlos es lo que hace creíble que esto
   salió de un satélite y no de una hoja de cálculo. Es honestidad y es diseño
   de información al mismo tiempo.
   ========================================================================== */

(function (global) {
  "use strict";

  function svgEl(nombre, atributos) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", nombre);
    for (var k in atributos) {
      if (Object.prototype.hasOwnProperty.call(atributos, k)) {
        el.setAttribute(k, atributos[k]);
      }
    }
    return el;
  }

  var UMBRAL_NUBE = 0.6;   // contrato de datos §2: por encima, punto atenuado

  /**
   * @param {Object} opciones
   *   serie   {desde, hasta, puntos:[{fecha, ndvi, nubosidad}]}
   *   eventos [{nombre, desde, hasta, tipo}]
   *   ancho, alto  (opcionales)
   * @returns {SVGElement}
   */
  function ndvi(opciones) {
    var puntos = opciones.serie.puntos;
    var eventos = opciones.eventos || [];
    var W = opciones.ancho || 900;
    var H = opciones.alto || 260;
    var M = { arriba: 18, derecha: 12, abajo: 26, izquierda: 34 };

    var ancho = W - M.izquierda - M.derecha;
    var alto = H - M.arriba - M.abajo;

    var Y_MIN = 0, Y_MAX = 1;

    function x(i) { return M.izquierda + (i / (puntos.length - 1)) * ancho; }
    function y(v) { return M.arriba + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * alto; }

    /* Índice por fecha para ubicar las bandas de eventos sin recorrer dos veces. */
    var indicePorFecha = {};
    puntos.forEach(function (p, i) { indicePorFecha[p.fecha] = i; });

    var svg = svgEl("svg", {
      viewBox: "0 0 " + W + " " + H,
      "class": "grafica",
      role: "img",
      "aria-label":
        "Serie NDVI mensual de " + opciones.serie.desde + " a " + opciones.serie.hasta
    });

    /* --- 1. bandas de eventos climáticos, al fondo --------------------- */
    eventos.forEach(function (ev) {
      var i0 = indicePorFecha[ev.desde];
      var i1 = indicePorFecha[ev.hasta];
      if (i0 === undefined || i1 === undefined) return;

      var x0 = x(i0), x1 = x(i1);
      svg.appendChild(svgEl("rect", {
        x: x0, y: M.arriba, width: Math.max(1, x1 - x0), height: alto,
        "class": ev.tipo === "sequia" ? "banda-sequia" : "banda-lluvia"
      }));

      var etiqueta = svgEl("text", {
        x: x0 + 4, y: M.arriba + 11, "class": "banda-texto"
      });
      etiqueta.textContent = ev.nombre;
      svg.appendChild(etiqueta);
    });

    /* --- 2. rejilla horizontal + escala Y ------------------------------ */
    [0, 0.25, 0.5, 0.75, 1].forEach(function (v) {
      svg.appendChild(svgEl("line", {
        x1: M.izquierda, x2: M.izquierda + ancho, y1: y(v), y2: y(v),
        "class": "eje-linea"
      }));
      var t = svgEl("text", {
        x: M.izquierda - 6, y: y(v) + 3, "class": "eje-texto", "text-anchor": "end"
      });
      t.textContent = v.toFixed(2);
      svg.appendChild(t);
    });

    /* --- 3. área y línea de la serie ----------------------------------- */
    var d = puntos.map(function (p, i) {
      return (i === 0 ? "M" : "L") + x(i).toFixed(1) + " " + y(p.ndvi).toFixed(1);
    }).join(" ");

    svg.appendChild(svgEl("path", {
      d: d + " L" + x(puntos.length - 1).toFixed(1) + " " + y(0) +
         " L" + x(0).toFixed(1) + " " + y(0) + " Z",
      "class": "serie-area"
    }));
    svg.appendChild(svgEl("path", { d: d, "class": "serie-linea" }));

    /* --- 4. puntos: los muy nublados van atenuados --------------------- */
    puntos.forEach(function (p, i) {
      var nublado = p.nubosidad > UMBRAL_NUBE;
      svg.appendChild(svgEl("circle", {
        cx: x(i), cy: y(p.ndvi),
        r: nublado ? 2.4 : 1.6,
        "class": nublado ? "punto-nube" : "punto"
      }));
    });

    /* --- 5. eje X: una marca por año ----------------------------------- */
    puntos.forEach(function (p, i) {
      if (p.fecha.slice(5) !== "01") return;
      var t = svgEl("text", {
        x: x(i), y: H - 8, "class": "eje-texto", "text-anchor": "middle"
      });
      t.textContent = p.fecha.slice(0, 4);
      svg.appendChild(t);
    });

    return svg;
  }

  /** Leyenda que acompaña a la gráfica. Se separa para poder ubicarla aparte. */
  function leyenda() {
    var div = document.createElement("div");
    div.className = "leyenda";
    div.innerHTML =
      '<span><i style="background:var(--ndvi-linea)"></i>NDVI mensual</span>' +
      '<span><i style="background:var(--texto-3);opacity:.4"></i>Observación con nubosidad &gt; 0,60</span>' +
      '<span><i style="background:var(--banda-sequia)"></i>Evento de sequía (El Niño)</span>' +
      '<span><i style="background:var(--banda-lluvia)"></i>Exceso de lluvia (La Niña)</span>';
    return div;
  }

  /**
   * Traza la serie como si se estuviera dibujando, de izquierda a derecha.
   *
   * La técnica es la clásica de SVG: se pinta el trazo como una línea
   * discontinua cuyo guion mide exactamente lo que mide la ruta, y se desplaza
   * ese guion desde fuera hasta su sitio. El resultado es que la curva aparece
   * avanzando en el tiempo, que es justo lo que la serie representa.
   *
   * Debe llamarse con el SVG YA insertado en el documento: getTotalLength()
   * necesita que el elemento tenga geometría calculada.
   *
   * @param {Element} host  contenedor donde ya se insertó la gráfica
   * @param {number}  ms    duración del trazado
   */
  function animarTrazo(host, ms) {
    if (!host) { return; }
    var linea = host.querySelector(".serie-linea");
    if (!linea || typeof linea.getTotalLength !== "function") { return; }

    var dur = ms || 1500;
    var largo;
    try { largo = linea.getTotalLength(); } catch (e) { return; }
    if (!largo) { return; }

    linea.style.strokeDasharray = largo + " " + largo;
    linea.style.strokeDashoffset = largo;
    linea.getBoundingClientRect();                 /* fuerza el reflujo */
    linea.style.transition = "stroke-dashoffset " + dur + "ms linear";
    linea.style.strokeDashoffset = "0";

    /* El área bajo la curva y los puntos de nube entran detrás del trazo, para
       que no se adelanten a la línea que los explica. */
    var rezagados = host.querySelectorAll(".serie-area, .punto, .punto-nube");
    for (var i = 0; i < rezagados.length; i++) {
      rezagados[i].style.opacity = "0";
      rezagados[i].style.transition = "opacity " + dur + "ms ease-in";
    }
    requestAnimationFrame(function () {
      for (var k = 0; k < rezagados.length; k++) { rezagados[k].style.opacity = ""; }
    });
  }

  global.SEEDLLITE = global.SEEDLLITE || {};
  global.SEEDLLITE.grafica = { ndvi: ndvi, leyenda: leyenda, animarTrazo: animarTrazo };
})(window);
