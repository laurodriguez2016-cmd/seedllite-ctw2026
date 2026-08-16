/* ==========================================================================
   30-vistas.js — las pantallas
   Frente 🅰 APP · sin dependencias

   Cada vista recibe el estado y pinta dentro del contenedor que se le pasa.
   El router de 90-app.js decide cuál se muestra.
   ========================================================================== */

(function (global) {
  "use strict";

  var S = global.SEEDLLITE = global.SEEDLLITE || {};

  /* --- utilidades ------------------------------------------------------- */

  var pesos = new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", maximumFractionDigits: 0
  });

  function cop(n) { return pesos.format(n || 0); }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var GLIFO = { favorable: "✓", alerta: "⚠", critico: "🔴" };

  var TEXTO_DECISION = {
    aprobar: "Aprobar",
    aprobar_con_ajuste: "Aprobar con ajuste",
    rechazar: "Rechazar"
  };

  function marcaRiesgo(dict) {
    return '<span class="marca-riesgo riesgo-' + esc(dict.banda_riesgo) + '">' +
           esc(TEXTO_DECISION[dict.decision] || dict.decision) + "</span>";
  }

  /* --- panel lateral de predios (compartido por varias vistas) ---------- */

  function listaPredios(datos, seleccionado) {
    return datos.predios.predios.map(function (p) {
      var dict = S.estado.dictamen(p.id);
      return '<button class="predio-item" data-predio="' + esc(p.id) + '" ' +
             'aria-current="' + (p.id === seleccionado) + '">' +
               '<div class="fila">' +
                 '<span class="nombre">' + esc(p.productor) + "</span>" +
                 (dict ? '<span class="mono cifra">' + dict.puntaje + "</span>" : "") +
               "</div>" +
               '<div class="fila">' +
                 '<span class="meta">' + esc(p.cultivo) + " · " + esc(p.municipio) +
                   ", " + esc(p.departamento) + "</span>" +
                 '<span class="meta">' + p.area_declarada_ha + " ha</span>" +
               "</div>" +
             "</button>";
    }).join("");
  }

  /* ======================================================================
     PANTALLA 1 — Mapa
     ====================================================================== */

  function mapa(host, datos, estado) {
    host.innerHTML =
      '<div class="rejilla">' +
        '<div class="tarjeta">' +
          '<div class="tarjeta-cab"><span class="etiqueta">Cartera en evaluación</span></div>' +
          '<div id="lista">' + listaPredios(datos, estado.predioId) + "</div>" +
        "</div>" +
        '<div class="tarjeta">' +
          '<div class="tarjeta-cab">' +
            "<h2>Predios evaluados</h2>" +
            '<span class="etiqueta" style="margin-left:auto">Colombia</span>' +
          "</div>" +
          '<div class="tarjeta-cuerpo" style="display:flex;justify-content:center">' +
            '<svg id="svg-mapa" style="max-width:420px"></svg>' +
          "</div>" +
        "</div>" +
      "</div>";

    S.mapa.render(
      host.querySelector("#svg-mapa"),
      datos.predios.predios,
      (datos.dictamenes || {}).dictamenes,
      estado.predioId,
      function (id) { location.hash = "#ficha/" + id; }
    );

    host.querySelectorAll("[data-predio]").forEach(function (b) {
      b.addEventListener("click", function () {
        location.hash = "#ficha/" + b.getAttribute("data-predio");
      });
    });
  }

  /* ======================================================================
     PANTALLA 2 — Ficha del predio + serie NDVI
     ====================================================================== */

  function ficha(host, datos, estado) {
    var p = S.estado.predio(estado.predioId);
    if (!p) { return mapa(host, datos, estado); }

    var serie = datos.series.series[p.id];
    var desvio = p.area_declarada_ha
      ? ((p.area_detectada_ha - p.area_declarada_ha) / p.area_declarada_ha * 100)
      : 0;

    host.innerHTML =
      '<div class="migas"><a href="#mapa">← Mapa</a><span>/</span><span>' +
        esc(p.municipio) + ", " + esc(p.departamento) + "</span></div>" +

      '<div class="rejilla">' +
        '<div>' +
          '<div class="tarjeta" style="margin-bottom:var(--e3)">' +
            '<div class="tarjeta-cab"><span class="etiqueta">Solicitante</span></div>' +
            '<div class="tarjeta-cuerpo">' +
              "<h1>" + esc(p.productor) + "</h1>" +
              '<p style="color:var(--texto-2);margin-top:4px">Vereda ' + esc(p.vereda) +
                ", " + esc(p.municipio) + ", " + esc(p.departamento) + "</p>" +
              '<table class="datos" style="margin-top:var(--e3)">' +
                fila("Tipo de productor", esc(p.tipo_productor)) +
                fila("Cultivo", esc(p.cultivo) + " (" + esc(p.variedad) + ")") +
                fila("Años en el predio", p.anos_en_el_predio) +
                fila("Crédito previo", p.credito_previo ? "Sí" : "No") +
                fila("Activos declarados", p.activos_declarados_smmlv + " SMMLV") +
                fila("Monto solicitado", cop(p.monto_solicitado_cop)) +
                fila("Destino", esc(p.destino)) +
              "</table>" +
            "</div>" +
          "</div>" +

          '<div class="tarjeta" style="margin-bottom:var(--e3)">' +
            '<div class="tarjeta-cab"><span class="etiqueta">Verificación satelital del área</span></div>' +
            '<div class="tarjeta-cuerpo">' +
              '<table class="datos">' +
                fila("Área declarada", p.area_declarada_ha + " ha") +
                fila("Área con cultivo activo", p.area_detectada_ha + " ha") +
                fila("Desvío", '<span style="color:' +
                  (Math.abs(desvio) > 5 ? "var(--critico)" : "var(--favorable)") + '">' +
                  (desvio > 0 ? "+" : "") + desvio.toFixed(1) + "%</span>") +
              "</table>" +
            "</div>" +
          "</div>" +

          '<button class="boton boton-primario" style="width:100%;padding:11px" ' +
            'data-ir="#analisis/' + esc(p.id) + '">Evaluar con SEEDLLITE</button>' +
        "</div>" +

        '<div>' +
          '<div class="tarjeta">' +
            '<div class="tarjeta-cab">' +
              "<h2>Historial productivo satelital</h2>" +
              '<span class="etiqueta" style="margin-left:auto">' +
                serie.desde + " → " + serie.hasta + " · " + serie.puntos.length + " observaciones</span>" +
            "</div>" +
            '<div class="tarjeta-cuerpo">' +
              '<div id="host-grafica"></div>' +
            "</div>" +
          "</div>" +

          '<div class="tarjeta" style="margin-top:var(--e3)">' +
            '<div class="tarjeta-cab"><span class="etiqueta">Indicadores calculados sobre la serie</span></div>' +
            '<div class="tarjeta-cuerpo">' +
              '<table class="datos">' +
                /* El rango se lee de la serie, no se escribe a mano: decia "en la
                   década" cuando el dato real va de 2017 a 2025 — nueve años. */
                fila("Ciclos completos (" + String(serie.desde).slice(0, 4) +
                     "–" + String(serie.hasta).slice(0, 4) + ")",
                     serie.ciclos_detectados) +
                fila("Ciclos en los últimos 24 meses",
                  '<span style="color:' + (serie.ciclos_ultimos_24m === 0 ? "var(--critico)" : "var(--favorable)") +
                  '">' + serie.ciclos_ultimos_24m + "</span>") +
                fila("NDVI pico promedio", serie.ndvi_pico_promedio.toFixed(2)) +
                fila("Rendimiento estimado", serie.rendimiento_estimado_t_ha + " t/ha") +
                fila("Rendimiento municipal (EVA)", serie.rendimiento_municipal_eva_t_ha + " t/ha") +
                fila("Caída durante El Niño 2023-24", serie.caida_enso_pct + "%") +
                fila("Caída promedio regional", datos.series.caida_enso_regional_pct + "%") +
              "</table>" +
              '<p class="etiqueta" style="margin-top:var(--e2)">Fuente: ' +
                esc(serie.fuente_referencia) + "</p>" +
            "</div>" +
          "</div>" +

          '<div class="aviso" style="margin-top:var(--e3)">' +
            esc(datos.series.nota_datos) +
          "</div>" +
        "</div>" +
      "</div>";

    var hostG = host.querySelector("#host-grafica");
    hostG.appendChild(S.grafica.ndvi({ serie: serie, eventos: datos.series.eventos_climaticos }));
    hostG.appendChild(S.grafica.leyenda());
  }

  function fila(k, v) {
    return "<tr><th>" + k + "</th><td>" + v + "</td></tr>";
  }

  /* ======================================================================
     PANTALLA 3 — Análisis  ⭐ la que vale 25 puntos de la rúbrica
     ====================================================================== */

  /* ======================================================================
     PANTALLA 3 - Analisis  (25 puntos de la rubrica; es la toma del video)

     Presupuesto de tiempo, TAREA 4: el efecto completo entre 8 y 12 s.
       seis pasos ....... 7,3 s   (PASOS_MS)
       memorando ........ 3,2 s   (MEMO_MS, duracion fija)
       total ........... 10,5 s
     ====================================================================== */

  var PASOS_MS = [1200, 1200, 1500, 1200, 1200, 1000];
  var MEMO_MS  = 3200;

  /* Token de la corrida en curso. El router repinta en cada hashchange y para
     el video se graban varias tomas seguidas; sin esto la cadena de timeouts
     anterior sigue viva escribiendo sobre nodos ya desechados y dos
     animaciones se pisan. */
  var corrida = null;

  function num(n, dec) {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: dec || 0,
      maximumFractionDigits: dec || 0
    }).format(n);
  }

  /* Los seis pasos y la cifra con que cada uno cierra.
     Toda cifra sale de la serie real; ninguna esta escrita a mano.
     Contrato v1.1: el paso 4 contrasta contra el rendimiento municipal de EVA,
     no contra un percentil veredal (que no existe como estadistica). */
  function pasosDe(serie) {
    var hay  = !!(serie && serie.puntos);
    var n    = hay ? serie.puntos.length : 0;
    var ini  = hay ? String(serie.desde).slice(0, 4) : "";
    var fin  = hay ? String(serie.hasta).slice(0, 4) : "";
    var c24  = hay ? serie.ciclos_ultimos_24m : null;
    var re   = hay ? serie.rendimiento_estimado_t_ha : null;
    var rm   = hay ? serie.rendimiento_municipal_eva_t_ha : null;
    var enso = hay ? serie.caida_enso_pct : null;
    var pct  = (enso == null) ? null
             : (Math.abs(enso) <= 1 ? Math.abs(enso) * 100 : Math.abs(enso));

    return [
      { texto: "Recuperando imagenes Copernicus Sentinel-2\u2026",
        conteo: n,
        cifra: hay ? num(n) + " observaciones mensuales \u00b7 " + ini + "\u2013" + fin
                   : "Sin serie para este predio" },

      { texto: "Calculando serie NDVI sobre el pol\u00edgono del predio\u2026",
        cifra: "Mediana mensual \u00b7 resoluci\u00f3n 10 m" },

      { texto: "Detectando ciclos de siembra y cosecha\u2026",
        cifra: !hay ? "\u2014"
             : num(serie.ciclos_detectados) + " ciclos en la serie" +
               (c24 == null ? "" : " \u00b7 " + num(c24) + " en los \u00faltimos 24 meses") },

      { texto: "Contrastando rendimiento con el promedio municipal \u2014 EVA\u2026",
        cifra: (re == null || rm == null) ? "Sin referencia municipal"
             : num(re, 2) + " t/ha frente a " + num(rm, 2) + " t/ha" },

      { texto: "Evaluando exposici\u00f3n clim\u00e1tica \u2014 IDEAM\u2026",
        cifra: (pct == null) ? "El Ni\u00f1o 2023-24 \u00b7 La Ni\u00f1a 2022"
             : "Ca\u00edda de vigor de " + num(pct) + "% en El Ni\u00f1o 2023-24" },

      { texto: "Redactando dictamen\u2026" }
    ];
  }

  /* Contador ascendente sincronizado con la duracion del paso. */
  function contar(destino, total, ms, yo) {
    var t0 = new Date().getTime();
    (function tic() {
      if (yo.cancelada) { return; }
      var avance = Math.min(1, (new Date().getTime() - t0) / ms);
      destino.textContent = num(Math.round(total * avance)) + " / " + num(total);
      if (avance < 1) { setTimeout(tic, 40); }
    })();
  }

  function analisis(host, datos, estado) {
    var p = S.estado.predio(estado.predioId);
    if (!p) { return mapa(host, datos, estado); }

    var dict  = S.estado.dictamen(p.id);
    var serie = (datos.series && datos.series.series)
              ? datos.series.series[p.id] : null;

    if (corrida) { corrida.cancelada = true; }
    var yo = corrida = { cancelada: false };
    yo.rehacer = function () { analisis(host, datos, estado); };

    var maqueta = !!(datos.dictamenes && datos.dictamenes.es_placeholder);
    var modelo  = (!maqueta && datos.dictamenes && datos.dictamenes.modelo)
                ? datos.dictamenes.modelo : "claude-opus-5";

    host.innerHTML =
      '<div class="migas"><a href="#ficha/' + esc(p.id) + '">\u2190 Ficha</a>' +
        "<span>/</span><span>An\u00e1lisis</span></div>" +
      '<div class="tarjeta" style="max-width:760px;margin:0 auto">' +
        '<div class="tarjeta-cab">' +
          "<h2>Evaluando " + esc(p.productor) + "</h2>" +
          '<span class="etiqueta" style="margin-left:auto">SEEDLLITE</span>' +
        "</div>" +
        '<div class="tarjeta-cuerpo">' +
          '<ol id="pasos" style="list-style:none;padding:0;margin:0 0 var(--e3)"></ol>' +
          '<div id="cab-memo" style="display:none;align-items:center;' +
            'border-top:1px solid var(--borde);padding-top:var(--e3);margin-bottom:10px">' +
            '<span class="chip-modelo">Generado por Claude \u00b7 ' + esc(modelo) +
              (maqueta ? " \u00b7 dictamen de ejemplo" : "") +
            "</span>" +
          "</div>" +
          '<div id="memorando" class="mono" style="white-space:pre-wrap;font-size:12.5px;' +
            'line-height:1.65;min-height:120px"></div>' +
          '<div id="pie" style="margin-top:var(--e3)"></div>' +
        "</div>" +
      "</div>";

    var pasos = pasosDe(serie);
    var ol = host.querySelector("#pasos");
    var i = 0;

    (function siguiente() {
      if (yo.cancelada) { return; }
      if (i >= pasos.length) { return escribirMemorando(host, dict, p, yo); }

      var paso = pasos[i];
      var ms = PASOS_MS[i] || 1200;

      var li = document.createElement("li");
      li.className = "paso paso-curso";
      li.innerHTML =
        '<span class="paso-glifo">\u00b7</span>' +
        '<span class="paso-texto">' + esc(paso.texto) + "</span>" +
        '<span class="paso-cifra"></span>';
      ol.appendChild(li);

      if (paso.conteo) {
        contar(li.querySelector(".paso-cifra"), paso.conteo, ms, yo);
      }

      setTimeout(function () {
        if (yo.cancelada) { return; }
        li.className = "paso paso-ok";
        li.querySelector(".paso-glifo").textContent = "\u2713";
        li.querySelector(".paso-cifra").textContent = paso.cifra || "";
        i++;
        siguiente();
      }, ms);
    })();
  }

  /* Animacion de escritura del memorando.
     Velocidad ADAPTATIVA: el memorando de maqueta tiene ~260 caracteres y el
     real tendra 120-200 palabras (~900). A caracteres-por-tick fijos el efecto
     pasaria de 3 s a 11 s cuando lleguen los datos buenos y se saldria del
     minuto de video. Se fija la DURACION y se derivan los caracteres. */
  function escribirMemorando(host, dict, p, yo) {
    var destino = host.querySelector("#memorando");
    var cab = host.querySelector("#cab-memo");

    if (!dict || !dict.memorando) {
      if (cab) { cab.style.display = "none"; }
      destino.innerHTML = '<span class="vacio">Sin dictamen para este predio.</span>';
      return;
    }

    if (cab) { cab.style.display = "flex"; }

    var texto = dict.memorando;
    var tick  = 24;
    var salto = Math.max(1, Math.ceil(texto.length / (MEMO_MS / tick)));
    var n = 0;

    (function teclear() {
      if (yo.cancelada) { return; }
      if (n < texto.length) {
        n = Math.min(texto.length, n + salto);
        destino.textContent = texto.slice(0, n);
        setTimeout(teclear, tick);
        return;
      }
      destino.textContent = texto;
      rematar(host, p, yo);
    })();
  }

  /* Remate: los dos botones y el rotulo de que esto reproduce una salida ya
     generada. Los manejadores se enganchan aqui a mano y no por data-ir: el
     router asigna los suyos al pintar, y estos nodos nacen segundos despues,
     cuando ese recorrido ya paso. Con data-ir el boton nace muerto. */
  function rematar(host, p, yo) {
    var pie = host.querySelector("#pie");
    pie.innerHTML =
      '<button class="boton boton-primario" id="ir-dictamen">Ver dictamen completo</button> ' +
      '<button class="boton" id="repetir">Repetir an\u00e1lisis</button>' +
      '<div class="aviso" style="margin-top:var(--e3)">' +
        "Reproducci\u00f3n de una salida generada previamente por el modelo y " +
        "commiteada en <code>data/dictamenes.json</code>. El demo no llama a la " +
        "API en vivo; el prompt est\u00e1 en <code>scripts/generar_dictamen.py</code>." +
      "</div>";

    pie.querySelector("#ir-dictamen").addEventListener("click", function () {
      location.hash = "#dictamen/" + p.id;
    });

    /* Sin recargar: para grabar varias tomas seguidas del mismo predio. */
    pie.querySelector("#repetir").addEventListener("click", function () {
      yo.rehacer();
    });
  }

  /* ======================================================================
     PANTALLA 4 — Dictamen
     ====================================================================== */

  function dictamen(host, datos, estado) {
    var p = S.estado.predio(estado.predioId);
    if (!p) { return mapa(host, datos, estado); }

    var d = S.estado.dictamen(p.id);
    if (!d) {
      host.innerHTML = '<div class="vacio">A\u00fan no hay dictamen para este predio.</div>';
      return;
    }

    var rechazado = d.decision === "rechazar";

    /* Defensas ante el dictamen real. Los que hay ahora son de relleno; entre
       las 00:30 y las 02:00 los reemplaza la salida del modelo y cualquier
       campo que no venga como se espera dejaria la pantalla en blanco a las
       dos de la manana. Se degrada, no se cae. */
    var losEjes = (d.ejes && d.ejes.length) ? d.ejes : [];
    var laEvidencia = (d.evidencia && d.evidencia.length) ? d.evidencia : [];

    var ejes = losEjes.map(function (e) {
      var peso = e.peso || 0;
      var pct = peso ? Math.max(0, Math.min(100, e.puntaje / peso * 100)) : 0;
      return '<div class="eje">' +
        '<div class="eje-fila"><span class="eje-nombre">' + esc(e.eje) + "</span>" +
        '<span class="eje-cifra">' + esc(e.puntaje) + " / " + esc(peso) + "</span></div>" +
        '<div class="eje-riel"><div class="eje-barra" style="width:' +
          pct.toFixed(0) + '%"></div></div></div>';
    }).join("") ||
      '<div class="vacio" style="font-size:12px">Ejes de evaluaci\u00f3n pendientes.</div>';

    var evidencia = laEvidencia.map(function (ev) {
      return '<li class="ev-' + esc(ev.tipo) + '">' +
        '<span class="glifo">' + (GLIFO[ev.tipo] || "\u00b7") + "</span>" +
        "<span>" + esc(ev.texto) + "</span></li>";
    }).join("") ||
      '<li class="vacio">Evidencia pendiente de generar.</li>';

    /* Monto: el recorte es la historia, no un detalle de formato.
       boyaca-papa existe en el demo para mostrar que el satelite midio 12%
       menos area de la declarada y que por eso se recorta el desembolso. Si
       los dos montos se ven igual de discretos, esa historia no se cuenta. */
    var solicitado = p.monto_solicitado_cop || 0;
    var sugerido = d.monto_sugerido_cop || 0;
    var recorte = (!rechazado && sugerido && solicitado && sugerido !== solicitado)
                ? solicitado - sugerido : 0;
    var pctRecorte = (recorte && solicitado)
                   ? Math.round(Math.abs(recorte) / solicitado * 100) : 0;

    var celdaSugerido;
    if (rechazado) {
      celdaSugerido = '<span style="color:var(--critico);font-weight:600">Sin desembolso</span>';
    } else if (recorte > 0) {
      celdaSugerido =
        '<span style="color:var(--alerta);font-weight:600">' + cop(sugerido) + "</span>" +
        '<span class="delta delta-baja">\u2212' + cop(recorte) +
          " \u00b7 " + pctRecorte + "% menos</span>";
    } else {
      celdaSugerido =
        '<span style="color:var(--favorable);font-weight:600">' + cop(sugerido) + "</span>" +
        '<span class="delta delta-igual">Completo, sin recorte</span>';
    }

    var claseDecision = "decision-" + (rechazado ? "rechazar"
                      : (d.decision === "aprobar_con_ajuste" ? "ajuste" : "aprobar"));

    host.innerHTML =
      '<div class="migas"><a href="#mapa">\u2190 Mapa</a><span>/</span>' +
        '<a href="#ficha/' + esc(p.id) + '">Ficha</a><span>/</span><span>Dictamen</span></div>' +

      '<div class="rejilla">' +
        '<div class="tarjeta dict-veredicto">' +
          '<div class="tarjeta-cab"><span class="etiqueta">Puntaje SEEDLLITE</span></div>' +
          '<div class="tarjeta-cuerpo">' +

            /* El puntaje y la banda, juntos y arriba: es lo primero que tiene
               que leerse en la toma del video. */
            '<div class="dict-cab">' +
              "<div>" +
                '<div class="puntaje" style="color:' +
                  (rechazado ? "var(--critico)" : "var(--texto)") + '">' +
                  esc(d.puntaje) + "</div>" +
                '<div class="puntaje-sub">de 1000</div>' +
              "</div>" +
              '<span class="marca-riesgo riesgo-' + esc(d.banda_riesgo) + '">Riesgo ' +
                esc(d.banda_riesgo) + "</span>" +
            "</div>" +

            '<div class="decision ' + claseDecision + '">' +
              esc(TEXTO_DECISION[d.decision] || d.decision) + "</div>" +

            ejes +
          "</div>" +
        "</div>" +

        "<div>" +
          '<div class="tarjeta" style="margin-bottom:var(--e3)">' +
            '<div class="tarjeta-cab">' +
              "<h2>" + esc(p.productor) + "</h2>" +
              '<span class="etiqueta" style="margin-left:auto">' +
                esc(p.cultivo) + " \u00b7 " + esc(p.municipio) + "</span>" +
            "</div>" +
            '<div class="tarjeta-cuerpo">' +
              '<table class="datos">' +
                fila("Monto solicitado", cop(solicitado)) +
                fila("Monto sugerido", celdaSugerido) +
                fila("L\u00ednea FINAGRO", esc(d.linea_finagro) || "No aplica") +
                fila("Cobertura FAG", d.cobertura_fag_pct ? d.cobertura_fag_pct + "%" : "No aplica") +
                fila("Plazo", d.plazo_meses ? d.plazo_meses + " meses" : "No aplica") +
                fila("Desembolso", esc(d.desembolso) || "No aplica") +
              "</table>" +
            "</div>" +
          "</div>" +

          '<div class="tarjeta" style="margin-bottom:var(--e3)">' +
            '<div class="tarjeta-cab"><span class="etiqueta">Evidencia satelital</span></div>' +
            '<div class="tarjeta-cuerpo"><ul class="evidencia">' + evidencia + "</ul></div>" +
          "</div>" +

          '<div class="tarjeta" style="margin-bottom:var(--e3)">' +
            '<div class="tarjeta-cab">' +
              '<span class="etiqueta">Memorando al comit\u00e9 de cr\u00e9dito</span>' +
            "</div>" +
            '<div class="tarjeta-cuerpo">' +
              '<p style="font-size:13.5px;line-height:1.65">' +
                esc(d.memorando || "Memorando pendiente de generar.") + "</p>" +
              (d.recomendacion
                ? '<p style="font-weight:600;margin-top:var(--e3);margin-bottom:0">' +
                    esc(d.recomendacion) + "</p>"
                : "") +
            "</div>" +
          "</div>" +

          '<div class="aviso' + (rechazado ? " aviso-fuerte" : "") + '">' +
            "SEEDLLITE emite una recomendaci\u00f3n de cr\u00e9dito dirigida a un intermediario " +
            "financiero vigilado. No constituye una oferta de cr\u00e9dito al productor ni " +
            "asesor\u00eda financiera. La decisi\u00f3n final es del comit\u00e9 de cr\u00e9dito." +
          "</div>" +

          /* Salida del callejon: el spec de TAREA 5 la pide y no existia.
             data-ir basta aqui porque este nodo nace durante el pintado y el
             router engancha sus manejadores justo despues. */
          '<div style="margin-top:var(--e3)">' +
            '<button class="boton boton-primario" data-ir="#mapa">Evaluar otro predio</button>' +
          "</div>" +
        "</div>" +
      "</div>";
  }

  /* ======================================================================
     PANTALLA 5 — Cartera (opcional; se corta a las 02:30 si no alcanza)
     ====================================================================== */

  function cartera(host, datos) {
    var filas = datos.predios.predios.map(function (p) {
      var d = S.estado.dictamen(p.id);
      var s = datos.series.series[p.id];
      if (!d) return "";
      return "<tr>" +
        "<td>" + esc(p.productor) + '<div class="meta" style="color:var(--texto-2);font-size:12px">' +
          esc(p.municipio) + ", " + esc(p.departamento) + "</div></td>" +
        "<td>" + esc(p.cultivo) + "</td>" +
        '<td class="num mono">' + p.area_detectada_ha + "</td>" +
        '<td class="num mono">' + s.ciclos_ultimos_24m + "</td>" +
        '<td class="num mono" style="font-weight:700">' + d.puntaje + "</td>" +
        '<td class="num mono">' + (d.monto_sugerido_cop ? cop(d.monto_sugerido_cop) : "—") + "</td>" +
        "<td>" + marcaRiesgo(d) + "</td>" +
        "</tr>";
    }).join("");

    host.innerHTML =
      '<div class="migas"><a href="#mapa">← Mapa</a><span>/</span><span>Cartera</span></div>' +
      '<div class="tarjeta">' +
        '<div class="tarjeta-cab"><h2>Cartera evaluada</h2>' +
          '<span class="etiqueta" style="margin-left:auto">Vista de analista</span></div>' +
        '<div class="tarjeta-cuerpo">' +
          /* .datos sola es para tablas clave/valor de dos columnas: lleva
             th{width:45%} y sin margen horizontal. Con siete columnas los
             encabezados se pegan entre si. De ahi la variante -lista. */
          '<table class="datos datos-lista">' +
            "<tr><th>Productor</th><th>Cultivo</th><th>Ha activas</th>" +
            "<th>Ciclos 24m</th><th>Puntaje</th><th>Monto</th><th>Decisión</th></tr>" +
            filas +
          "</table>" +
        "</div>" +
      "</div>";
  }

  S.vistas = {
    mapa: mapa,
    ficha: ficha,
    analisis: analisis,
    dictamen: dictamen,
    cartera: cartera
  };
})(window);
