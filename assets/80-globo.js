/* 80-globo.js — La vista global.

   POR QUE EXISTE
   --------------
   El argumento de expansion de SEEDLLITE no es una proyeccion de mercado: es una
   propiedad del insumo. Sentinel-2 pasa sobre TODA la superficie terrestre cada
   cinco dias y la imagen es gratuita y publica. Lo que cambia de un pais a otro no
   es el dato, es el reglamento de credito. Esta vista dice exactamente eso,
   mostrando el planeta que ya esta cubierto y el punto donde hoy operamos.

   COMO SE DIBUJA SIN DEPENDENCIAS
   -------------------------------
   La tierra viene de Natural Earth 110m, rasterizada offline a una malla de 1,5
   grados (240 x 120 celdas) y empacada como un bit por celda en base64. Son 4,8 KB
   de texto: mas barato que cualquier libreria de mapas, y funciona bajo file://.

   La proyeccion es ortografica —la vista de un satelite lejano— asi que solo se
   pinta el hemisferio visible y el tamano de cada punto cae con el coseno del
   angulo respecto al centro. El globo gira; el usuario puede arrastrarlo. */
(function (global) {
  "use strict";

  var S = global.SEEDLLITE = global.SEEDLLITE || {};

  var PASO = 1.5, NLON = 240, NLAT = 120;
  var MASCARA = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//8////44AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPx/n/////AAAA/AAYAAAAfAAAAAAAAAAAAAAAAEO3v4f////+AAAPgAAAAAAAAcAAAAAAAAAAAAAADAAAfgP////+AAAHAAAAAAAAAMAAAAAAAAAAAAAAA9jjCAAP///+AAAAAAAAHgAAP/8AAPAAAAAAAAAAcAAAAAAD///8AAAAAAAAYAAD//gAAAAAAAAAAAAAe6zs/AAB///4AAAAAAABgDA/////wGAAAAwAEAAAI/wM//AAf//4AAAAAAABwHf/////z/+AABAB//wPI/+sEP4A///wAAAAf8AACHf////////8B8wH/////ww3mB4Af/8AAAAD//xjf7v///////////7A////////+B/g//gAAAAH//4///f///////////GH////////0P5Af4AH4AAPx+H///////////////AAf///////Ng+AP4ADAAA/n////////////////+AD///////8COMAHwAAAAD/P///////////////v8AD/7/////4APwABgAAAAH/P//////////////wfAAA+AH////4APzAAAAAAAD/D/////////////JhgAAAFAAf///8AH/gAAAAAIAOD////////////4AHAAAAQAAP////wH/gAAAAAMBuP////////////wAPgAACAAAH////+f/8AAAAAWAhf////////////AAPAAAAAAAT////+f/+AAAAA3H//////////////+AOAAAAAAAB/////f/8AAAAAHn//////////////+AIAAAAAAAB//////8wAAAAAMf//////////////9AAAAAAAAAA//////2HAAAAAF///////////////4AAAAAAAAAAf/////+AgAAAAD///////////////4AAAAAAAAAAf//////wAAAAAB///yf//////////wAAAAAAAAAAf/////yAAAAAAB/z/gP//////////jAAAAAAAAAAf/////gAAAAAA/wY/gD/////////8HAAAAAAAAAAf/////AAAAAAA/gGfnn/////////wAAAAAAAAAAAf////+AAAAAAA/ACY//////////1gGAAAAAAAAAAP////8AAAAAAA/ACM//////////hwEAAAAAAAAAAH////4AAAAAAAOLgA//////////4wcAAAAAAAAAAH////4AAAAAAAN/gDC/////////wz8AAAAAAAAAAB////wAAAAAAAf/gAA/////////wDgAAAAAAAAAAA////AAAAAAAA//8YB/////////4EAAAAAAAAAAAAX///AAAAAAAA///f//////////4AAAAAAAAAAAAAX/5BAAAAAAAB//////z///////4AAAAAAAAAAAAAb/gBAAAAAAAH////8/5///////4AAAAAAAAAAAAAF/gBoAAAAAAP////+/4f//////wAAAAAAAAAAAAAE/gAAAAAAAAP////+f8wH/////gAAAAAAAAAAAAAAfgAAAAAAAAf/////P/4D/////IAAAAAAAAAAAAAAPgAQAAAAAAf/////v/8D/+f/4AAAAAAAAAAAAAAAPgwOAAAAAAf/////n/4Af8P+AAAAAAAAAAAAAAAAHxwAwAAAAAf/////n/wAfwH+wAAAAAAAAAAAAAAAB/gAAAAAAAf/////z/gAfgH+AMAAAAAAAAAAAAAAAT8AAAAAAAf/////z+AAfAF/AIAAAAAAAAAAAAAAAB+AAAAAAAf/////94AAOAB/gIAAAAAAAAAAAAAAAAMAAAAAAAf//////AAAOAA/gCAAAAAAAAAAAAAAAAEBQAAAAAP/////+MAAGAAHAFAAAAAAAAAAAAAAAACDfgAAAAH//////8AAGAACAAAAAAAAAAAAAAAAAABP/wAAAAH//////4AABABgADAAAAAAAAAAAAAAAAAP/4AAAAD//////4AABAAQABAAAAAAAAAAAAAAAAAP//gAAAA/H////wAAAACYBgAAAAAAAAAAAAAAAAAH//wAAAAAA////wAAAADYDAAAAAAAAAAAAAAAAAAP//wAAAAAA////gAAAABoPgAAAAAAAAAAAAAAAAAf//4AAAAAA///+AAAAAA4fuQAAAAAAAAAAAAAAAA///+AAAAAA///8AAAAAAYfASAAAAAAAAAAAAAAAA////AAAAAA///4AAAAAAcfYBYAAAAAAAAAAAAAAA////8AAAAAf//4AAAAAAOCEh/AAAAAAAAAAAAAAA/////AAAAAP//wAAAAAAGAAAPgAAAAAAAAAAAAAA/////gAAAAP//wAAAAAADIABPwIAAAAAAAAAAAAAf////gAAAAH//wAAAAAAAOAAPYCAAAAAAAAAAAAAP////AAAAAH//4AAAAAAAACAAMAAAAAAAAAAAAAAP///+AAAAAH//4AAAAAAAAAAAAAAAAAAAAAAAAAAH///+AAAAAH//4AAAAAAAAAHhAAAAAAAAAAAAAAAH///8AAAAAP//4IAAAAAAAAvjAAAAAAAAAAAAAAAD///8AAAAAP//4cAAAAAAAB/jgAAAAAAAAAAAAAAA///8AAAAAP//h4AAAAAAAD/7gAAAAAAAAAAAAAAAf//8AAAAAP//B4AAAAAAAH//wAAAAAAAAAAAAAAAf//4AAAAAH/+AwAAAAAAAf//4AQAAAAAAAAAAAAAf//4AAAAAH//BwAAAAAAB///8AIAAAAAAAAAAAAAf//gAAAAAD//BwAAAAAAD///+AAAAAAAAAAAAAAAf/8AAAAAAD/+BgAAAAAAD////AAAAAAAAAAAAAAAf/8AAAAAAD/8AAAAAAAAD////AAAAAAAAAAAAAAAf/8AAAAAAD/8AAAAAAAAD////AAAAAAAAAAAAAAA//4AAAAAAB/4AAAAAAAAB////AAAAAAAAAAAAAAA//wAAAAAAA/wAAAAAAAAB////AAAAAAAAAAAAAAA//gAAAAAAA/gAAAAAAAAB/h//AAAAAAAAAAAAAAA//AAAAAAAA+AAAAAAAAAB+Av+AAAAAAAAAAAAAAA/8AAAAAAAAAAAAAAAAAAAAAP8AAQAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAH8AAIAAAAAAAAAAAB/4AAAAAAAAAAAAAAAAAAAAADQAAOAAAAAAAAAAAB/gAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAB+AAAAAAAAAAAAAAAAAAAAAAAYAAIAAAAAAAAAAAB+AAAAAAAAAAAAAAAAAAAAAAAYAAwAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAADwAACAefH/gAAAAAAAAAAAAAAAAEAAAAAAAAAAAB//8B///////4AAAAAAAAAAAAAAA/AAAAAAAAAAH///8P////////8AAAAAAAAAAAAAB3gAAAAATf//////8//////////+AAAAAAAAAAAgAHgAAAAH////////////////////AAAAAAAB4B////gAAAAP///////////////////4AAAAD////////4AAAAD////////////////////gAAALP///////8AAAAD/////////////////////gAABj////////wAAHg//////////////////////4AAAAD///////8AQ/AB////////////////////+AAAAB//////////AGP//////////////////////AAAAA///////////////////////////////////8A/8AAf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////";

  var LADO = 460, R = 196, CX = LADO / 2, CY = LADO / 2;
  var COLOMBIA = { lat: 4.6, lon: -74.1 };

  /* --- Decodificacion de la mascara ------------------------------------ */

  var bytes = null;
  function tierra(iy, ix) {
    if (!bytes) {
      var bin = global.atob(MASCARA);
      bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) { bytes[i] = bin.charCodeAt(i); }
    }
    var n = iy * NLON + ix;
    return (bytes[n >> 3] >> (7 - (n & 7))) & 1;
  }

  /* --- Proyeccion ortografica ------------------------------------------ */

  var RAD = Math.PI / 180;

  function ortografica(lat, lon, lat0, lon0) {
    var f = lat * RAD, f0 = lat0 * RAD, dl = (lon - lon0) * RAD;
    var cosc = Math.sin(f0) * Math.sin(f) + Math.cos(f0) * Math.cos(f) * Math.cos(dl);
    if (cosc < 0) { return null; }              // cara oculta del planeta
    return {
      x: CX + R * Math.cos(f) * Math.sin(dl),
      y: CY - R * (Math.cos(f0) * Math.sin(f) - Math.sin(f0) * Math.cos(f) * Math.cos(dl)),
      z: cosc
    };
  }

  function el(nombre, atributos) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", nombre);
    for (var k in atributos) {
      if (Object.prototype.hasOwnProperty.call(atributos, k)) {
        e.setAttribute(k, atributos[k]);
      }
    }
    return e;
  }

  /* --- Dibujo ----------------------------------------------------------- */

  function pintar(svg, lon0) {
    svg.textContent = "";

    svg.appendChild(el("circle", {
      cx: CX, cy: CY, r: R, fill: "var(--superficie-2, var(--superficie))",
      stroke: "var(--borde-fuerte, var(--borde))", "stroke-width": 1
    }));

    /* Graticula: cada 30 grados, como referencia de que esto es una esfera. */
    var g = el("g", { stroke: "var(--borde)", "stroke-width": 0.6,
                      fill: "none", opacity: 0.5 });
    var lat, lon, d, p, i;
    for (lat = -60; lat <= 60; lat += 30) {
      d = "";
      for (lon = -180; lon <= 180; lon += 3) {
        p = ortografica(lat, lon, 0, lon0);
        d += p ? (d ? " L" : "M") + p.x.toFixed(1) + " " + p.y.toFixed(1) : "";
      }
      if (d) { g.appendChild(el("path", { d: d })); }
    }
    for (lon = -180; lon < 180; lon += 30) {
      d = "";
      for (lat = -90; lat <= 90; lat += 3) {
        p = ortografica(lat, lon, 0, lon0);
        d += p ? (d ? " L" : "M") + p.x.toFixed(1) + " " + p.y.toFixed(1) : "";
      }
      if (d) { g.appendChild(el("path", { d: d })); }
    }
    svg.appendChild(g);

    /* Tierra. Colombia y su vecindad se pintan en acento: es el unico pais
       donde el reglamento ya esta implementado, no solo cubierto por el satelite. */
    var puntos = el("g", null);
    for (var iy = 0; iy < NLAT; iy++) {
      lat = 90 - (iy + 0.5) * PASO;
      for (var ix = 0; ix < NLON; ix++) {
        if (!tierra(iy, ix)) { continue; }
        lon = -180 + (ix + 0.5) * PASO;
        p = ortografica(lat, lon, 0, lon0);
        if (!p) { continue; }
        var operando = lat > -4.3 && lat < 12.6 && lon > -79.1 && lon < -66.8;
        puntos.appendChild(el("circle", {
          cx: p.x.toFixed(1), cy: p.y.toFixed(1),
          r: (operando ? 1.9 : 1.5) * Math.max(0.35, p.z),
          fill: operando ? "var(--acento)" : "var(--texto-3)",
          opacity: (operando ? 1 : 0.55) * Math.max(0.25, p.z)
        }));
      }
    }
    svg.appendChild(puntos);

    /* El marcador de Bogota, con su anillo, cuando esta de cara. */
    p = ortografica(COLOMBIA.lat, COLOMBIA.lon, 0, lon0);
    if (p) {
      var m = el("g", null);
      m.appendChild(el("circle", { cx: p.x, cy: p.y, r: 13, fill: "none",
        stroke: "var(--acento)", "stroke-width": 1, opacity: 0.7 }));
      m.appendChild(el("circle", { cx: p.x, cy: p.y, r: 3, fill: "var(--acento)" }));
      var t = el("text", { x: p.x + 19, y: p.y + 4, class: "glb-rot",
                           fill: "var(--acento)" });
      t.textContent = "COLOMBIA · EN OPERACIÓN";
      m.appendChild(t);
      svg.appendChild(m);
    }
  }

  /* --- Montaje ---------------------------------------------------------- */

  function montar(host) {
    host.innerHTML =
      '<nav class="migas"><a href="#mapa">← Mapa</a> <span>/</span> ' +
        'Cobertura</nav>' +
      '<section class="rejilla glb-rejilla">' +

        '<div class="tarjeta glb-tarjeta">' +
          '<div class="tarjeta-cab">' +
            '<span class="etiqueta">La cobertura no es una proyección</span>' +
          '</div>' +
          '<div class="tarjeta-cuerpo">' +
            '<div class="glb-lienzo"><svg class="glb-svg" role="img" ' +
              'aria-label="Globo terráqueo con la superficie continental en ' +
              'puntos y Colombia resaltada"></svg></div>' +
            '<p class="glb-pie">Arrastra para girar. Cada punto es una celda de ' +
              '1,5° de superficie continental (Natural Earth 110m). El área en ' +
              'acento es la ventana donde el reglamento ya está implementado.</p>' +
          '</div>' +
        '</div>' +

        '<div class="glb-col">' +
          '<div class="tarjeta">' +
            '<div class="tarjeta-cab">' +
              '<span class="etiqueta">Qué viaja y qué no</span>' +
            '</div>' +
            '<div class="tarjeta-cuerpo">' +
              '<dl class="glb-lista">' +
                '<dt>Viaja el insumo</dt>' +
                '<dd>Sentinel-2 revisita cualquier punto del planeta cada 5 días, ' +
                  'a 10 m por píxel, con licencia abierta. El costo marginal de ' +
                  'evaluar un lote en Perú es el mismo que en Meta: cero.</dd>' +
                '<dt>Viaja el método</dt>' +
                '<dd>La tesis —la amplitud del ciclo distingue tierra manejada de ' +
                  'tierra verde— es fenología, no regulación. Un arrozal cicla ' +
                  'igual en Tolima que en Lambayeque.</dd>' +
                '<dt>No viaja el reglamento</dt>' +
                '<dd>Las causales de rechazo salen del manual de FINAGRO y de la ' +
                  'Resolución 08 de 2023 de la CNCA. Cada país exige reescribir ' +
                  '<code>criterios-de-credito.md</code>, no el pipeline.</dd>' +
                '<dt>No viaja el catastro</dt>' +
                '<dd>La matrícula inmobiliaria y el círculo registral son ' +
                  'colombianos. La entrada por coordenada sí es universal.</dd>' +
              '</dl>' +
            '</div>' +
          '</div>' +

          '<div class="tarjeta">' +
            '<div class="tarjeta-cab">' +
              '<span class="etiqueta">Dónde muerde primero</span>' +
            '</div>' +
            '<div class="tarjeta-cuerpo">' +
              '<p class="glb-nota">El embudo que SEEDLLITE ataca es de ' +
                '<strong>originación</strong>, no de riesgo: en Colombia el ' +
                '88,4 % de las UPA nunca solicita crédito, y a las que sí ' +
                'solicitan se les aprueba el 89,3 %. El cuello no está en la ' +
                'decisión del banco — está antes.</p>' +
              '<dl class="glb-datos">' +
                '<dt>UPA en Colombia</dt><dd class="mono">2.370.099</dd>' +
                '<dt>De menos de 5 ha</dt><dd class="mono">70,4 % · ~1,67 M</dd>' +
                '<dt>Nunca solicitan crédito</dt><dd class="mono">88,4 %</dd>' +
                '<dt>Aprobación de quien sí solicita</dt><dd class="mono">89,3 %</dd>' +
                '<dt>Colocación de fomento 2025</dt><dd class="mono">$48,1 bill.</dd>' +
              '</dl>' +
              '<p class="glb-fuente">DANE, Censo Nacional Agropecuario 2014 ' +
                '(boletines definitivos 1 y 2) · FINAGRO, cierre 2025.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +

      '</section>';

    var svg = host.querySelector(".glb-svg");
    svg.setAttribute("viewBox", "0 0 " + LADO + " " + LADO);

    var lon0 = -74, girando = true, arrastre = null;
    pintar(svg, lon0);

    /* Quien pidio menos movimiento recibe el globo quieto sobre Colombia, y
       sigue pudiendo arrastrarlo: el giro es decoracion, no informacion.

       `?quieto` es la misma costura: un bucle de requestAnimationFrame que no
       termina nunca deja colgado a cualquier capturador de pantalla (headless,
       grabar-demo.sh), porque el reloj virtual jamas se queda sin trabajo. Con
       el parametro, el globo se pinta una vez y la pagina queda en reposo. */
    var quieto = (global.location.search || "").indexOf("quieto") >= 0
      || !!(global.matchMedia
            && global.matchMedia("(prefers-reduced-motion: reduce)").matches);

    if (!quieto) {
      (function paso() {
        if (!host.isConnected) { return; }
        if (girando) { lon0 = (lon0 + 0.16 + 180) % 360 - 180; pintar(svg, lon0); }
        global.requestAnimationFrame(paso);
      }());
    }

    svg.style.cursor = "grab";
    svg.addEventListener("pointerdown", function (ev) {
      girando = false; arrastre = { x: ev.clientX, lon: lon0 };
      svg.style.cursor = "grabbing";
      svg.setPointerCapture(ev.pointerId);
    });
    svg.addEventListener("pointermove", function (ev) {
      if (!arrastre) { return; }
      var caja = svg.getBoundingClientRect();
      lon0 = arrastre.lon - (ev.clientX - arrastre.x) / caja.width * 360;
      lon0 = (lon0 + 540) % 360 - 180;
      pintar(svg, lon0);
    });
    ["pointerup", "pointercancel"].forEach(function (n) {
      svg.addEventListener(n, function () {
        arrastre = null; svg.style.cursor = "grab";
        if (!quieto) {
          global.setTimeout(function () { if (!arrastre) { girando = true; } }, 1600);
        }
      });
    });
  }

  /* --- Enganche a la navegacion ---------------------------------------- */

  function quizas() {
    if ((global.location.hash || "") !== "#globo") { return; }
    var host = document.querySelector("#vista");
    /* El testigo es el contenido, NO un atributo en el host: el router hace
       `host.innerHTML = ""` y un atributo sobrevive a eso, asi que quedaria
       marcado como montado sobre una vista vacia. */
    if (!host || host.querySelector(".glb-svg")) { return; }
    montar(host);
  }

  /* El router de 90-app.js no conoce #globo y repinta el mapa encima. El
     observador lo detecta y vuelve a montar; es el mismo contrato aditivo de
     70-nuevo-caso.js, que evita tocar el archivo del otro frente. */
  var obs = new MutationObserver(quizas);

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.querySelector("#vista");
    if (host) { obs.observe(host, { childList: true }); }
    quizas();
  });
  global.addEventListener("hashchange", function () { global.setTimeout(quizas, 30); });

  S.globo = { montar: montar };
}(window));
