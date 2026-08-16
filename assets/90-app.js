/* ==========================================================================
   90-app.js — estado, router y arranque
   Frente 🅰 APP · sin dependencias · se carga de último

   ROUTER POR HASH — no es capricho
   --------------------------------
   Cada pantalla tiene URL propia: index.html#dictamen/meta-cacao
   A las 5am, grabando el video, se llega a cualquier toma directo, sin repetir
   la navegación completa en cada intento. Y recargar no pierde el lugar.
   ========================================================================== */

(function (global) {
  "use strict";

  var S = global.SEEDLLITE = global.SEEDLLITE || {};

  var datos = global.SEEDLLITE_DATOS;

  var estado = {
    vista: "mapa",
    predioId: null
  };

  S.estado = {
    predio: function (id) {
      var lista = datos.predios.predios;
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].id === id) return lista[i];
      }
      return null;
    },
    dictamen: function (id) {
      return datos.dictamenes && datos.dictamenes.dictamenes
        ? datos.dictamenes.dictamenes[id]
        : null;
    }
  };

  /* --- tema claro/oscuro ------------------------------------------------ */

  function alternarTema() {
    var raiz = document.documentElement;
    var actual = raiz.getAttribute("data-tema");
    if (!actual) {
      var oscuroPorSistema =
        global.matchMedia && global.matchMedia("(prefers-color-scheme: dark)").matches;
      actual = oscuroPorSistema ? "oscuro" : "claro";
    }
    raiz.setAttribute("data-tema", actual === "oscuro" ? "claro" : "oscuro");
  }

  /* --- router ----------------------------------------------------------- */

  var VISTAS_VALIDAS = ["mapa", "ficha", "analisis", "dictamen", "cartera"];

  function leerHash() {
    var partes = (location.hash || "#mapa").replace(/^#/, "").split("/");
    var vista = VISTAS_VALIDAS.indexOf(partes[0]) >= 0 ? partes[0] : "mapa";
    return { vista: vista, predioId: partes[1] || null };
  }

  function pintar() {
    var ruta = leerHash();
    estado.vista = ruta.vista;
    estado.predioId = ruta.predioId;

    var host = document.getElementById("vista");
    host.innerHTML = "";
    S.vistas[estado.vista](host, datos, estado);

    // Enlaces internos declarativos: data-ir="#dictamen/xxx"
    host.querySelectorAll("[data-ir]").forEach(function (b) {
      b.addEventListener("click", function () {
        location.hash = b.getAttribute("data-ir");
      });
    });

    document.querySelectorAll("[data-nav]").forEach(function (b) {
      b.setAttribute("aria-current", b.getAttribute("data-nav") === estado.vista);
    });

    global.scrollTo(0, 0);
  }

  /* --- portada ---------------------------------------------------------- */

  /**
   * El plano de apertura se disuelve solo y devuelve la pantalla a la app.
   *
   * Solo aparece cuando se entra SIN ruta. Con ruta directa no se muestra, para
   * que durante la grabación se pueda saltar a cualquier toma sin esperarla en
   * cada intento. Un clic o una tecla la saltan.
   *
   * Los 2,2 s son los que tarda el mapa en trazarse y en clavar sus agujas: al
   * disolverse, el país ya está apareciendo detrás. La portada no hace esperar
   * a nadie, ocupa el tiempo que la primera pantalla ya necesitaba.
   */
  function resolverPortada() {
    var portada = document.getElementById("portada");
    if (!portada) { return; }

    if (location.hash && location.hash !== "#mapa") {
      portada.parentNode.removeChild(portada);
      return;
    }

    var cerrada = false;
    function cerrar() {
      if (cerrada) { return; }
      cerrada = true;
      portada.classList.add("portada-sale");

      /* El mapa se REPINTA aquí, no antes.
         Si se deja correr con la portada encima, el país se traza y las agujas
         se clavan detrás de un telón: cuando el telón cae, ya pasó todo y la
         primera pantalla se ve muerta. Repintar al empezar la disolución hace
         que el contorno se trace mientras la portada se va, y que las agujas
         caigan cuando la pantalla ya está limpia. */
      if (estado.vista === "mapa") { pintar(); }

      global.setTimeout(function () {
        if (portada.parentNode) { portada.parentNode.removeChild(portada); }
      }, 620);
    }

    var espera = global.setTimeout(cerrar, 2200);

    function saltar() {
      global.clearTimeout(espera);
      cerrar();
    }

    portada.addEventListener("click", saltar);
    document.addEventListener("keydown", saltar, { once: true });
  }

  /* --- arranque --------------------------------------------------------- */

  function arrancar() {
    if (!datos || !datos.predios) {
      document.getElementById("vista").innerHTML =
        '<div class="tarjeta"><div class="tarjeta-cuerpo">' +
        "<h2>No se cargaron los datos</h2>" +
        "<p>Falta <code>data/datos.js</code>. Generarlo con:</p>" +
        "<pre class=\"mono\">python3 scripts/empaquetar_datos.py</pre>" +
        "</div></div>";
      return;
    }

    // Aviso visible si los dictámenes todavía son el placeholder de maqueta.
    // Constitución III: lo simulado se rotula. Esto NO puede salir en el video.
    if (datos.dictamenes && datos.dictamenes.es_placeholder) {
      var aviso = document.createElement("div");
      aviso.className = "aviso aviso-fuerte";
      aviso.style.margin = "var(--e3) var(--e4) 0";
      aviso.textContent =
        "MAQUETA: los dictámenes en pantalla son texto de relleno, no salidas de IA. " +
        "Correr scripts/generar_dictamen.py para reemplazarlos.";
      document.body.insertBefore(aviso, document.getElementById("vista"));
    }

    document.getElementById("tema").addEventListener("click", alternarTema);
    document.querySelectorAll("[data-nav]").forEach(function (b) {
      b.addEventListener("click", function () {
        location.hash = "#" + b.getAttribute("data-nav");
      });
    });

    global.addEventListener("hashchange", pintar);
    pintar();
    resolverPortada();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", arrancar);
  } else {
    arrancar();
  }
})(window);
