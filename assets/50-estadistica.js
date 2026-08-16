/* ==========================================================================
   50-estadistica.js — la incertidumbre en pantalla
   Frente 🅰 APP

   POR QUE EXISTE
   El dictamen mostraba "amplitud 0,341" y "0,50 ha" como si fueran hechos
   exactos. No lo son: son estimaciones sobre muestras incompletas — entre 48 y
   96 meses medidos de 108, y una rejilla de 16 celdas. Un evaluador de riesgo
   pregunta cuanta incertidumbre hay detras, y hasta ahora la respuesta estaba
   calculada en los datos pero no aparecia en ninguna parte.

   COMO ESTA HECHO
   Archivo NUEVO que no toca el marcado de las vistas: observa el contenedor y,
   cuando aparece la pantalla del dictamen, le agrega su seccion al final. Si la
   vista cambia de estructura la seccion simplemente no se inserta; nunca rompe
   la pantalla.

   Lee `incertidumbre` de la serie, que produce scripts/calcular_incertidumbre.py.
   Si el bloque no esta, no dibuja nada en vez de inventar cifras.
   ========================================================================== */

(function (global) {
  "use strict";

  var S = global.SEEDLLITE || {};

  function pct(x) { return (x * 100).toFixed(1).replace(".", ",") + "%"; }
  function num(x) { return Number(x).toFixed(3).replace(".", ","); }

  /* Barra que sitúa un valor y su intervalo dentro de una escala. Es la pieza
     que hace entendible un intervalo de confianza sin explicarlo: se ve donde
     cae el valor y cuanto margen tiene a cada lado. */
  function barraIC(valor, ic, maximo, umbral) {
    var esc = function (v) { return Math.max(0, Math.min(100, v / maximo * 100)); };
    var izq = esc(ic[0]), der = esc(ic[1]), aqui = esc(valor);
    var marcaUmbral = umbral != null
      ? '<i class="ic-umbral" style="left:' + esc(umbral).toFixed(1) + '%"></i>' : "";
    return '<span class="ic-riel">' +
             '<i class="ic-rango" style="left:' + izq.toFixed(1) + '%;width:' +
                Math.max(1, der - izq).toFixed(1) + '%"></i>' +
             '<i class="ic-punto" style="left:' + aqui.toFixed(1) + '%"></i>' +
             marcaUmbral +
           '</span>';
  }

  function fila(rotulo, cuerpo, nota) {
    return '<div class="est-fila">' +
             '<div class="est-rot">' + rotulo + "</div>" +
             '<div class="est-cuerpo">' + cuerpo +
               (nota ? '<div class="est-nota">' + nota + "</div>" : "") +
             "</div></div>";
  }

  function seccion(pid) {
    var datos = global.SEEDLLITE_DATOS;
    if (!datos || !datos.series || !datos.series.series) { return ""; }
    var serie = datos.series.series[pid];
    if (!serie) { return ""; }
    var inc = serie.incertidumbre;
    if (!inc) { return ""; }               /* sin calcular: no se inventa nada */

    var partes = [];

    /* 1 · amplitud, que es la cifra que sostiene la lectura de la forma */
    if (inc.amplitud_ic95) {
      var a = serie.amplitud_historica, ic = inc.amplitud_ic95;
      partes.push(fila(
        "Amplitud histórica",
        '<b class="est-val">' + num(a) + "</b>" +
          '<span class="est-ic">intervalo 95% · ' + num(ic[0]) + " a " + num(ic[1]) + "</span>" +
          barraIC(a, ic, Math.max(ic[1] * 1.25, 0.9), 0.12),
        "La marca vertical es el piso de 0,120 bajo el cual el detector no " +
        "reconoce ciclos. Calculado por remuestreo de bloques móviles, que " +
        "respeta que un mes se parece al siguiente."));
    }

    /* 2 · area, que es la cifra que decide un rechazo */
    if (inc.area_ic95) {
      var med = (datos.predios.predios.filter(function (p) { return p.id === pid; })[0] || {}).medicion_area;
      var frac = med ? med.celdas_agricolas / med.celdas_evaluadas : null;
      var ica = inc.area_ic95;
      var cruza = inc.area_techo_cruza_umbral;
      partes.push(fila(
        "Área con actividad",
        '<b class="est-val">' + (frac != null ? pct(frac) : "—") + "</b>" +
          '<span class="est-ic">intervalo 95% · ' + pct(ica[0]) + " a " + pct(ica[1]) + "</span>" +
          barraIC(frac || 0, ica, 1, 0.5),
        cruza
          ? '<b class="est-alerta">El techo del intervalo pasa el umbral del 50%.</b> ' +
            "Con 16 celdas la muestra no alcanza para afirmar que el predio esté " +
            "por debajo, así que la causal de área no opera."
          : "El techo del intervalo queda bajo el umbral del 50%: la causal se " +
            "sostiene con holgura."));
    }

    /* 3 · cobertura: la probabilidad de habernos equivocado por no ver */
    if (inc.prob_falso_negativo != null) {
      var p = inc.prob_falso_negativo;
      var m24 = serie.cobertura_24m_medidos, t24 = serie.cobertura_24m_totales || 24;
      partes.push(fila(
        "Riesgo de falso negativo",
        '<b class="est-val">' + pct(p) + "</b>" +
          '<span class="est-ic">' + m24 + " de " + t24 + " meses medidos</span>",
        "Probabilidad de declarar inactivo un predio que sí produjo, dada la " +
        "nubosidad de esta ventana. Simulado sobre ciclos reales de cinco meses."));
    }

    /* 4 · margenes: cuanto aguanta la decision antes de darse vuelta */
    var m = inc.margenes || {};
    var NOMBRES = {
      area_vs_50pct: "Área contra el umbral del 50%",
      cobertura_vs_12m: "Cobertura contra el mínimo de 12 meses",
      perdida_vs_40pct: "Pérdida de amplitud contra el 40%",
      amplitud_vs_piso: "Amplitud contra el piso del detector"
    };
    var margenes = Object.keys(m).filter(function (k) { return m[k]; }).map(function (k) {
      return '<div class="est-margen"><span>' + (NOMBRES[k] || k) + "</span>" +
             "<b>" + m[k].distancia_relativa_pct.toFixed(1).replace(".", ",") + "%</b></div>";
    });
    if (margenes.length) {
      partes.push(fila(
        "Robustez de la decisión",
        '<div class="est-margenes">' + margenes.join("") + "</div>",
        "Cuánto tendría que moverse cada cifra para que la decisión cambiara. " +
        "Un dictamen robusto no se da vuelta con un empujón pequeño."));
    }

    if (!partes.length) { return ""; }

    return '<section class="tarjeta est-tarjeta">' +
             '<div class="tarjeta-cab">Análisis estadístico' +
               '<span class="est-cab-nota">intervalos al 95%</span></div>' +
             '<div class="tarjeta-cuerpo">' + partes.join("") +
               '<p class="est-pie">Ninguna de estas cifras es exacta: todas se estiman ' +
               'sobre una muestra. Mostrar el rango es más honesto que mostrar un ' +
               'número solo, y es lo que permite saber cuándo una decisión se sostiene ' +
               'y cuándo no.</p>' +
             "</div></section>";
  }

  function inyectar() {
    var host = document.getElementById("vista");
    if (!host || host.querySelector(".est-tarjeta")) { return; }

    /* Solo en la pantalla del dictamen, y solo si se puede saber de quien es. */
    var hash = location.hash || "";
    var m = hash.match(/#dictamen\/([a-z0-9-]+)/i);
    if (!m) { return; }

    var html = seccion(m[1]);
    if (!html) { return; }

    /* La vista es una rejilla de dos columnas: a la izquierda el veredicto, a
       la derecha el contenido ancho. La seccion va DESPUES de la ultima tarjeta
       de la columna ancha; colgarla del ultimo hijo de la rejilla la mete en la
       columna estrecha y el texto queda cortado. */
    var rejilla = host.querySelector(".rejilla") || host;
    var tarjetas = rejilla.querySelectorAll(":scope > .tarjeta:not(.dict-veredicto)");
    var ancla = tarjetas.length ? tarjetas[tarjetas.length - 1] : null;

    var envoltorio = document.createElement("div");
    envoltorio.innerHTML = html;
    var nodo = envoltorio.firstChild;

    if (ancla && ancla.parentNode) {
      ancla.parentNode.insertBefore(nodo, ancla.nextSibling);
    } else {
      rejilla.appendChild(nodo);
    }

    if (S.tooltips && S.tooltips.enganchar) { S.tooltips.enganchar(host); }
  }

  function observar() {
    var host = document.getElementById("vista") || document.body;
    inyectar();
    if ("MutationObserver" in window) {
      new MutationObserver(function () { inyectar(); })
        .observe(host, { childList: true, subtree: true });
    }
    window.addEventListener("hashchange", function () { setTimeout(inyectar, 60); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observar);
  } else {
    observar();
  }

  global.SEEDLLITE = S;
  global.SEEDLLITE.estadistica = { seccion: seccion };
})(window);
