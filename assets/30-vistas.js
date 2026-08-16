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
                fila("Ciclos completos en la década", serie.ciclos_detectados) +
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

  var PASOS = [
    "Leyendo 120 observaciones Sentinel-2 del polígono…",
    "Descartando observaciones con nubosidad alta…",
    "Detectando ciclos de siembra y cosecha…",
    "Comparando vigor contra el percentil de la vereda…",
    "Midiendo el comportamiento durante El Niño 2023-24…",
    "Redactando el dictamen de crédito…"
  ];

  function analisis(host, datos, estado) {
    var p = S.estado.predio(estado.predioId);
    if (!p) { return mapa(host, datos, estado); }
    var dict = S.estado.dictamen(p.id);

    host.innerHTML =
      '<div class="migas"><a href="#ficha/' + esc(p.id) + '">← Ficha</a>' +
        "<span>/</span><span>Análisis</span></div>" +
      '<div class="tarjeta" style="max-width:760px;margin:0 auto">' +
        '<div class="tarjeta-cab">' +
          "<h2>Evaluando " + esc(p.productor) + "</h2>" +
          '<span class="etiqueta" style="margin-left:auto">SEEDLLITE</span>' +
        "</div>" +
        '<div class="tarjeta-cuerpo">' +
          '<ol id="pasos" style="list-style:none;padding:0;margin:0 0 var(--e3);font-size:13px"></ol>' +
          '<div id="memorando" class="mono" style="white-space:pre-wrap;font-size:12.5px;' +
            'line-height:1.65;min-height:120px;border-top:1px solid var(--borde);padding-top:var(--e3)"></div>' +
          '<div id="pie" style="margin-top:var(--e3)"></div>' +
        "</div>" +
      "</div>";

    var ol = host.querySelector("#pasos");
    var i = 0;

    (function siguientePaso() {
      if (i < PASOS.length) {
        var li = document.createElement("li");
        li.style.padding = "3px 0";
        li.style.color = "var(--texto-2)";
        li.innerHTML = '<span style="color:var(--favorable);font-weight:700">✓</span> ' + esc(PASOS[i]);
        ol.appendChild(li);
        i++;
        setTimeout(siguientePaso, 420);
        return;
      }
      escribirMemorando(host, dict, p);
    })();
  }

  /** Animación de escritura del memorando. Reproduce una salida ya generada. */
  function escribirMemorando(host, dict, p) {
    var destino = host.querySelector("#memorando");
    if (!dict) {
      destino.innerHTML = '<span class="vacio">Sin dictamen para este predio.</span>';
      return;
    }

    var texto = dict.memorando;
    var n = 0;

    (function teclear() {
      if (n <= texto.length) {
        destino.textContent = texto.slice(0, n);
        n += 3;
        setTimeout(teclear, 12);
        return;
      }
      destino.textContent = texto;
      var pie = host.querySelector("#pie");
      pie.innerHTML =
        '<button class="boton boton-primario" data-ir="#dictamen/' + esc(p.id) + '">' +
          "Ver dictamen completo</button>" +
        '<div class="aviso" style="margin-top:var(--e3)">' +
          "Reproducción de una salida generada previamente por el modelo y " +
          "commiteada en <code>data/dictamenes.json</code>. El demo no llama a la " +
          "API en vivo; el prompt está en <code>scripts/generar_dictamen.py</code>." +
        "</div>";
    })();
  }

  /* ======================================================================
     PANTALLA 4 — Dictamen
     ====================================================================== */

  function dictamen(host, datos, estado) {
    var p = S.estado.predio(estado.predioId);
    if (!p) { return mapa(host, datos, estado); }
    var d = S.estado.dictamen(p.id);
    if (!d) {
      host.innerHTML = '<div class="vacio">Aún no hay dictamen para este predio.</div>';
      return;
    }

    var ejes = d.ejes.map(function (e) {
      return '<div class="eje">' +
        '<div class="eje-fila"><span class="eje-nombre">' + esc(e.eje) + "</span>" +
        '<span class="eje-cifra">' + e.puntaje + " / " + e.peso + "</span></div>" +
        '<div class="eje-riel"><div class="eje-barra" style="width:' +
          (e.puntaje / e.peso * 100).toFixed(0) + '%"></div></div></div>';
    }).join("");

    var evidencia = d.evidencia.map(function (ev) {
      return '<li class="ev-' + esc(ev.tipo) + '">' +
        '<span class="glifo">' + (GLIFO[ev.tipo] || "·") + "</span>" +
        "<span>" + esc(ev.texto) + "</span></li>";
    }).join("");

    var rechazado = d.decision === "rechazar";

    host.innerHTML =
      '<div class="migas"><a href="#mapa">← Mapa</a><span>/</span>' +
        '<a href="#ficha/' + esc(p.id) + '">Ficha</a><span>/</span><span>Dictamen</span></div>' +

      '<div class="rejilla">' +
        '<div class="tarjeta">' +
          '<div class="tarjeta-cab"><span class="etiqueta">Puntaje SEEDLLITE</span></div>' +
          '<div class="tarjeta-cuerpo">' +
            '<div class="puntaje" style="color:' +
              (rechazado ? "var(--critico)" : "var(--texto)") + '">' + d.puntaje + "</div>" +
            '<div class="puntaje-sub">de 1000 · riesgo ' + esc(d.banda_riesgo) + "</div>" +
            '<div style="margin:var(--e3) 0">' + marcaRiesgo(d) + "</div>" +
            ejes +
          "</div>" +
        "</div>" +

        '<div>' +
          '<div class="tarjeta" style="margin-bottom:var(--e3)">' +
            '<div class="tarjeta-cab">' +
              "<h2>" + esc(p.productor) + "</h2>" +
              '<span class="etiqueta" style="margin-left:auto">' +
                esc(p.cultivo) + " · " + esc(p.municipio) + "</span>" +
            "</div>" +
            '<div class="tarjeta-cuerpo">' +
              '<table class="datos">' +
                fila("Monto solicitado", cop(p.monto_solicitado_cop)) +
                fila("Monto sugerido", '<span style="color:' +
                  (rechazado ? "var(--critico)" : "var(--favorable)") + '">' +
                  (rechazado ? "—" : cop(d.monto_sugerido_cop)) + "</span>") +
                fila("Línea FINAGRO", esc(d.linea_finagro) || "No aplica") +
                fila("Cobertura FAG", d.cobertura_fag_pct ? d.cobertura_fag_pct + "%" : "No aplica") +
                fila("Plazo", d.plazo_meses ? d.plazo_meses + " meses" : "No aplica") +
                fila("Desembolso", esc(d.desembolso)) +
              "</table>" +
            "</div>" +
          "</div>" +

          '<div class="tarjeta" style="margin-bottom:var(--e3)">' +
            '<div class="tarjeta-cab"><span class="etiqueta">Evidencia satelital</span></div>' +
            '<div class="tarjeta-cuerpo"><ul class="evidencia">' + evidencia + "</ul></div>" +
          "</div>" +

          '<div class="tarjeta" style="margin-bottom:var(--e3)">' +
            '<div class="tarjeta-cab"><span class="etiqueta">Memorando al comité de crédito</span></div>' +
            '<div class="tarjeta-cuerpo"><p style="font-size:13.5px;line-height:1.65">' +
              esc(d.memorando) + "</p>" +
              '<p style="font-weight:600;margin-top:var(--e3);margin-bottom:0">' +
                esc(d.recomendacion) + "</p>" +
            "</div>" +
          "</div>" +

          '<div class="aviso' + (rechazado ? " aviso-fuerte" : "") + '">' +
            "SEEDLLITE emite una recomendación de crédito dirigida a un intermediario " +
            "financiero vigilado. No constituye una oferta de crédito al productor ni " +
            "asesoría financiera. La decisión final es del comité de crédito." +
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
          '<table class="datos">' +
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
