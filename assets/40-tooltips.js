/* ==========================================================================
   40-tooltips.js — glosario flotante
   Frente 🅰 APP

   POR QUE EXISTE
   La pantalla estaba llena de texto explicativo porque cada cifra necesitaba su
   aclaracion al lado. Eso hace dos danos: satura la lectura, y aun asi deja
   fuera al que no sabe que es una amplitud de NDVI.

   La explicacion se saca del cuerpo de la pantalla y se pone donde se necesita:
   pegada al termino, a un paso del cursor. La pantalla queda limpia y el
   contenido queda MAS completo, no menos.

   COMO ESTA HECHO
   Este archivo NO toca el marcado de las vistas. Se engancha por selector y por
   texto, y si una vista cambia de estructura el tooltip simplemente no aparece:
   nunca rompe la pantalla. Por eso vive aparte y se carga al final.

   Los textos estan escritos para alguien que nunca ha visto un indice de
   vegetacion. Sin jerga, y cuando la jerga es inevitable, se define en la misma
   frase.
   ========================================================================== */

(function (global) {
  "use strict";

  /* --- El glosario. Clave: el texto que aparece en pantalla. ------------- */
  var GLOSARIO = {
    "ndvi": {
      t: "NDVI",
      d: "Índice de vegetación. El satélite mide cuánta luz roja absorbe la planta " +
         "y cuánta infrarroja refleja. Va de 0 a 1: suelo desnudo queda cerca de " +
         "0,15 y un cultivo en pleno desarrollo pasa de 0,80. Es, en corto, cuánto " +
         "verde vivo hay en ese pedazo de tierra."
    },
    "amplitud": {
      t: "Amplitud",
      d: "Cuánto sube y baja el verde a lo largo del año. Se mide como la " +
         "diferencia entre los meses más altos y los más bajos. Es LA cifra del " +
         "producto: un cultivo sembrado y cosechado sube y baja; el monte se queda " +
         "quieto aunque esté igual de verde."
    },
    "pérdida de amplitud": {
      t: "Pérdida de amplitud",
      d: "Cuánto ritmo perdió el predio contra su propia historia, no contra otros " +
         "predios. Se compara consigo mismo porque cada parcela tiene su altura, su " +
         "variedad y su sombrío. Si un predio que subía y bajaba deja de hacerlo, " +
         "algo cambió en el manejo."
    },
    "ciclos": {
      t: "Ciclos de cosecha",
      d: "Cada vez que el verde sube hasta el pico y vuelve a bajar, eso fue una " +
         "siembra que llegó a cosecha. No basta sembrar: hay que terminar. Por eso " +
         "el conteo de ciclos es el mejor indicio de flujo de caja que existe para " +
         "alguien sin contabilidad."
    },
    "ciclos en los últimos 24 meses": {
      t: "Ciclos recientes",
      d: "Lo mismo, pero solo en los últimos dos años. Mide si el predio SIGUE " +
         "produciendo, no si produjo alguna vez. Ojo: en cultivos perennes como el " +
         "café o el cacao este número es cero de forma normal, porque la planta no " +
         "se cosecha entera."
    },
    "área con actividad": {
      t: "Área con actividad agrícola",
      d: "De la tierra que el productor declaró, cuánta se ve efectivamente " +
         "trabajada. Se parte el predio en 16 cuadros y se mira cada uno por " +
         "separado: cuenta el que está verde Y se mueve con las estaciones. Un " +
         "cuadro de bosque está verde pero no se mueve, y no cuenta."
    },
    "área detectada": {
      t: "Área con actividad agrícola",
      d: "De la tierra que el productor declaró, cuánta se ve efectivamente " +
         "trabajada. Se parte el predio en 16 cuadros y cuenta el que está verde Y " +
         "se mueve con las estaciones. El bosque está verde pero no se mueve."
    },
    "cobertura": {
      t: "Cobertura del dato",
      d: "Cuántos de los 108 meses tienen foto utilizable. En el trópico andino la " +
         "nube tapa entre 19 y 33 meses. Esos meses se rellenan para que la línea " +
         "no se corte, pero NO entran en ningún cálculo. Decir cuánto vimos es " +
         "parte de decir qué tan confiable es el dictamen."
    },
    "interpolado": {
      t: "Mes interpolado",
      d: "Mes sin foto utilizable por nubes. El valor se estima entre el mes " +
         "anterior y el siguiente solo para dibujar la línea, y queda marcado. No " +
         "entra en ningún indicador."
    },
    "rendimiento estimado": {
      t: "Rendimiento estimado",
      d: "Cuánto produciría el predio por hectárea, calculado a partir del vigor " +
         "que ve el satélite. Es una ESTIMACIÓN, no una medición de la cosecha. Se " +
         "compara contra la cifra oficial del municipio para saber si está por " +
         "encima o por debajo de sus vecinos."
    },
    "eva": {
      t: "EVA",
      d: "Evaluaciones Agropecuarias Municipales, la estadística oficial del " +
         "Ministerio de Agricultura. Dice cuánto rinde cada cultivo en cada " +
         "municipio. Es dato público y auditable: contra eso se compara el predio."
    },
    "fag": {
      t: "FAG",
      d: "Fondo Agropecuario de Garantías. El Estado respalda hasta el 80% del " +
         "crédito ante un incumplimiento. Ojo con la confusión frecuente: NO es " +
         "que al productor le den el 80%. Recibe el 100% de lo aprobado; el 80% es " +
         "lo que el banco recupera si la cosa sale mal."
    },
    "finagro": {
      t: "FINAGRO",
      d: "Fondo para el Financiamiento del Sector Agropecuario. Es banco de segundo " +
         "piso: pone los recursos y las condiciones, pero quien desembolsa y decide " +
         "es el banco. SEEDLLITE no presta: le entrega al banco la evaluación que " +
         "hoy no puede hacer."
    },
    "sarc": {
      t: "SARC",
      d: "Sistema de Administración del Riesgo Crediticio. Es lo que la " +
         "Superintendencia Financiera le exige a todo banco para decidir un " +
         "crédito. Los cuatro ejes del dictamen están mapeados uno a uno contra " +
         "sus criterios: no nos los inventamos."
    },
    "rtdaf": {
      t: "RTDAF y RUPTA",
      d: "Registros de tierras despojadas y de predios abandonados por la fuerza " +
         "(Ley 1448 de 2011). Un crédito sobre un predio con medida de protección " +
         "no se puede originar. Se verifica siempre y se deja constancia, incluso " +
         "cuando sale limpio."
    },
    "sin concepto": {
      t: "Sin concepto",
      d: "El sistema no pudo evaluar y lo dice. Pasa cuando la nube tapó más de la " +
         "mitad de los últimos dos años: ahí un predio nublado y uno abandonado se " +
         "ven idénticos. NO es un rechazo. El expediente se remite a visita técnica."
    },
    "aplazar por verificación": {
      t: "Aplazar por verificación",
      d: "Ni sí ni no: todavía no se sabe. El dato satelital no alcanza para " +
         "concluir, así que se manda a visita de campo con la lista de qué " +
         "verificar. Negar un crédito por falta de información sería castigar al " +
         "productor por el clima."
    },
    "intervalo": {
      t: "Intervalo de confianza",
      d: "El rango donde está el valor real con 95% de confianza. Las cifras se " +
         "calculan sobre una muestra —los meses que se pudieron ver, los 16 cuadros " +
         "de la rejilla— así que no son exactas. Mostrar el rango es más honesto " +
         "que mostrar un número solo."
    },
    "el niño": {
      t: "El Niño 2023-24",
      d: "Evento climático que trajo sequía. Sirve como prueba de resistencia: se " +
         "mira cuánto cayó el vigor del predio durante esa ventana comparado con " +
         "el promedio de la región. El que aguantó, aguantará la próxima."
    },
    "puntaje": {
      t: "Puntaje SEEDLLITE",
      d: "De 0 a 1000, es la suma de los cuatro ejes ponderados por su peso. No es " +
         "un juicio aparte del análisis: sale de los ejes y tiene que cuadrar con " +
         "ellos. Sobre 700 es riesgo bajo."
    }
  };

  /* --- El elemento flotante, uno solo para toda la app ------------------- */
  var globo = null, anclaActual = null;

  function crearGlobo() {
    if (globo) { return globo; }
    globo = document.createElement("div");
    globo.className = "tip";
    globo.setAttribute("role", "tooltip");
    globo.id = "tip-global";
    document.body.appendChild(globo);
    return globo;
  }

  function mostrar(ancla, dato) {
    var g = crearGlobo();
    g.innerHTML = '<b class="tip-t"></b><span class="tip-d"></span>';
    g.querySelector(".tip-t").textContent = dato.t;
    g.querySelector(".tip-d").textContent = dato.d;
    g.classList.add("visible");
    anclaActual = ancla;
    ancla.setAttribute("aria-describedby", "tip-global");

    var r = ancla.getBoundingClientRect();
    var gr = g.getBoundingClientRect();
    var x = r.left + r.width / 2 - gr.width / 2;
    var y = r.top - gr.height - 10;
    if (y < 8) { y = r.bottom + 10; }                 /* no cabe arriba: va abajo */
    x = Math.max(10, Math.min(x, window.innerWidth - gr.width - 10));
    g.style.left = Math.round(x) + "px";
    g.style.top = Math.round(y) + "px";
  }

  function ocultar() {
    if (globo) { globo.classList.remove("visible"); }
    if (anclaActual) { anclaActual.removeAttribute("aria-describedby"); anclaActual = null; }
  }

  /* --- Enganche: envuelve el termino en un <span> accesible -------------- */
  function normalizar(s) {
    return String(s || "").toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/\s+/g, " ").trim();
  }

  var CLAVES = Object.keys(GLOSARIO).map(function (k) {
    return { crudo: k, norm: normalizar(k), dato: GLOSARIO[k] };
  }).sort(function (a, b) { return b.norm.length - a.norm.length; });  /* la mas larga gana */

  function buscarDato(texto) {
    var n = normalizar(texto);
    for (var i = 0; i < CLAVES.length; i++) {
      if (n.indexOf(CLAVES[i].norm) !== -1) { return CLAVES[i].dato; }
    }
    return null;
  }

  /* Elementos donde tiene sentido explicar: rotulos de fila, encabezados de
     tabla, nombres de eje y etiquetas. NO se tocan las cifras: se explica el
     concepto, no el numero. */
  var SELECTORES = [
    "th",                    /* los rotulos de fila son <th> dentro de <table> */
    "dt",
    ".etiqueta", ".eje-nombre", ".kpi-rotulo", ".stat span",
    ".rot-dato", ".meta", ".cart-nota", ".leyenda span"
  ];

  function enganchar(raiz) {
    var vistos = 0;
    SELECTORES.forEach(function (sel) {
      var nodos;
      try { nodos = (raiz || document).querySelectorAll(sel); } catch (e) { return; }
      Array.prototype.forEach.call(nodos, function (n) {
        if (n.getAttribute("data-tip") === "listo") { return; }
        var dato = buscarDato(n.textContent);
        if (!dato) { return; }
        n.setAttribute("data-tip", "listo");
        n.classList.add("con-tip");
        n.setAttribute("tabindex", "0");
        n.addEventListener("mouseenter", function () { mostrar(n, dato); });
        n.addEventListener("mouseleave", ocultar);
        n.addEventListener("focus", function () { mostrar(n, dato); });
        n.addEventListener("blur", ocultar);
        vistos += 1;
      });
    });
    return vistos;
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { ocultar(); }
  });
  window.addEventListener("scroll", ocultar, true);

  /* La app repinta la vista entera en cada navegacion, asi que hay que volver a
     enganchar. Se observa el contenedor en vez de parchear el router: asi este
     archivo sigue sin conocer nada del resto de la app. */
  function observar() {
    var host = document.getElementById("vista") || document.body;
    enganchar(host);
    if (!("MutationObserver" in window)) { return; }
    new MutationObserver(function () { enganchar(host); })
      .observe(host, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observar);
  } else {
    observar();
  }

  global.SEEDLLITE = global.SEEDLLITE || {};
  global.SEEDLLITE.tooltips = { glosario: GLOSARIO, enganchar: enganchar };
})(window);
