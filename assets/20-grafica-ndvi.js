/* ==========================================================================
   20-grafica-ndvi.js — la serie temporal satelital de nueve años
   Frente 🅰 APP · sin dependencias

   Es la pieza visual central del producto: 108 observaciones mensuales, las
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

  function esNumero(valor) {
    return typeof valor === "number" && isFinite(valor);
  }

  function estadoVacio(mensaje) {
    var div = document.createElement("div");
    div.className = "grafica-vacia vacio";
    div.setAttribute("role", "img");
    div.setAttribute("aria-label", mensaje);
    div.textContent = mensaje;
    return div;
  }

  /**
   * @param {Object} opciones
   *   serie   {desde, hasta, puntos:[{fecha, ndvi, nubosidad}]}
   *   eventos [{nombre, desde, hasta, tipo}]
   *   ancho, alto  (opcionales)
   * @returns {SVGElement}
   */
  function ndvi(opciones) {
    opciones = opciones || {};
    var serie = opciones.serie || {};
    var puntos = Array.isArray(serie.puntos) ? serie.puntos : [];
    var eventos = Array.isArray(opciones.eventos) ? opciones.eventos : [];

    if (!puntos.length) {
      return estadoVacio("No hay observaciones NDVI disponibles para graficar.");
    }

    var W = opciones.ancho || 900;
    var H = opciones.alto || 260;
    var M = { arriba: 18, derecha: 12, abajo: 26, izquierda: 34 };

    var ancho = W - M.izquierda - M.derecha;
    var alto = H - M.arriba - M.abajo;

    var Y_MIN = 0, Y_MAX = 1;

    function x(i) {
      if (puntos.length === 1) return M.izquierda + ancho / 2;
      return M.izquierda + (i / (puntos.length - 1)) * ancho;
    }
    function y(v) { return M.arriba + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * alto; }

    /* Índice por fecha para ubicar las bandas de eventos sin recorrer dos veces. */
    var indicePorFecha = {};
    puntos.forEach(function (p, i) {
      if (p && typeof p.fecha === "string") indicePorFecha[p.fecha] = i;
    });

    var svg = svgEl("svg", {
      viewBox: "0 0 " + W + " " + H,
      "class": "grafica",
      role: "img",
      "aria-label":
        "Serie NDVI mensual de " + (serie.desde || "fecha inicial no disponible") +
        " a " + (serie.hasta || "fecha final no disponible") +
        ". Los puntos huecos representan meses interpolados por nubosidad."
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
      t.textContent = v.toFixed(2).replace(".", ",");
      svg.appendChild(t);
    });

    /* --- 3. área y línea de la serie ----------------------------------- */
    var d = "";
    var iniciarSegmento = true;
    var todosValidos = true;
    puntos.forEach(function (p, i) {
      if (!p || !esNumero(p.ndvi)) {
        iniciarSegmento = true;
        todosValidos = false;
        return;
      }
      d += (iniciarSegmento ? "M" : "L") + x(i).toFixed(1) + " " +
        y(Math.max(Y_MIN, Math.min(Y_MAX, p.ndvi))).toFixed(1) + " ";
      iniciarSegmento = false;
    });

    if (d) {
      if (todosValidos && puntos.length > 1) {
        svg.appendChild(svgEl("path", {
          d: d + "L" + x(puntos.length - 1).toFixed(1) + " " + y(0) +
             " L" + x(0).toFixed(1) + " " + y(0) + " Z",
          "class": "serie-area"
        }));
      }
      svg.appendChild(svgEl("path", { d: d.trim(), "class": "serie-linea" }));
    }

    /* --- 4. puntos: interpolados y nublados se distinguen explícitamente */
    puntos.forEach(function (p, i) {
      if (!p || !esNumero(p.ndvi)) return;
      var interpolado = p.interpolado === true;
      var nublado = esNumero(p.nubosidad) && p.nubosidad > UMBRAL_NUBE;
      svg.appendChild(svgEl("circle", {
        cx: x(i), cy: y(p.ndvi),
        r: interpolado ? 2.8 : (nublado ? 2.4 : 1.6),
        "class": interpolado ? "punto-interpolado" : (nublado ? "punto-nube" : "punto")
      }));
    });

    /* --- 5. eje X: una marca por año ----------------------------------- */
    puntos.forEach(function (p, i) {
      if (!p || typeof p.fecha !== "string" || p.fecha.slice(5) !== "01") return;
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
      '<span><i class="leyenda-ndvi"></i>NDVI mensual medido</span>' +
      '<span><i class="leyenda-interpolado"></i>Mes interpolado sin observación óptica</span>' +
      '<span><i class="leyenda-sequia"></i>Evento de sequía (El Niño)</span>' +
      '<span><i class="leyenda-lluvia"></i>Exceso de lluvia (La Niña)</span>';
    return div;
  }

  global.SEEDLLITE = global.SEEDLLITE || {};
  global.SEEDLLITE.grafica = { ndvi: ndvi, leyenda: leyenda };
})(window);
