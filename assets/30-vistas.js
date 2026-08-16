/* ==========================================================================
   30-vistas.js — las cinco pantallas de SEEDLLITE
   Frente APP · sin dependencias

   Cada vista recibe los datos ya cargados desde window.SEEDLLITE_DATOS. Todos
   los campos del MOTOR se tratan como opcionales: una ausencia debe producir
   un estado legible, nunca "undefined" ni una excepción silenciosa.
   ========================================================================== */

(function (global) {
  "use strict";

  var S = global.SEEDLLITE = global.SEEDLLITE || {};

  /* --- utilidades ------------------------------------------------------- */

  var pesos = new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", maximumFractionDigits: 0
  });

  function esNumero(valor) {
    return typeof valor === "number" && isFinite(valor);
  }

  function arreglo(valor) {
    return Array.isArray(valor) ? valor : [];
  }

  function cop(valor) {
    return esNumero(valor) ? pesos.format(valor).replace(/\s/g, "") : "Sin dato";
  }

  function decimal(valor, decimales) {
    if (!esNumero(valor)) return "Sin dato";
    return valor.toLocaleString("es-CO", {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales
    });
  }

  function entero(valor) {
    return esNumero(valor) ? Math.round(valor).toLocaleString("es-CO") : "Sin dato";
  }

  function porcentaje(valor, decimales) {
    return esNumero(valor) ? decimal(valor, decimales || 0) + "%" : "Sin dato";
  }

  function texto(valor, reserva) {
    if (valor == null || valor === "") return reserva || "Sin dato";
    return String(valor);
  }

  function esc(valor) {
    return String(valor == null ? "" : valor).replace(/[&<>\"]/g, function (caracter) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[caracter];
    });
  }

  function limitar(valor, minimo, maximo) {
    return Math.max(minimo, Math.min(maximo, valor));
  }

  function prediosDe(datos) {
    return arreglo(datos && datos.predios && datos.predios.predios);
  }

  function serieDe(datos, id) {
    var series = datos && datos.series && datos.series.series;
    return series && series[id] ? series[id] : null;
  }

  var GLIFO = { favorable: "✓", alerta: "!", critico: "●" };

  var TEXTO_DECISION = {
    aprobar: "Aprobar",
    aprobar_con_ajuste: "Aprobar con ajuste",
    rechazar: "Rechazar"
  };

  function marcaRiesgo(dictamen) {
    if (!dictamen) return '<span class="marca-riesgo">Sin decisión</span>';
    var decision = TEXTO_DECISION[dictamen.decision] || texto(dictamen.decision, "Sin decisión");
    var banda = texto(dictamen.banda_riesgo, "sin-banda").toLowerCase();
    return '<span class="marca-riesgo riesgo-' + esc(banda) + '">' + esc(decision) + "</span>";
  }

  function modeloVisible(datos) {
    var modelo = texto(datos && datos.dictamenes && datos.dictamenes.modelo, "claude-opus-5");
    if (/sonnet/i.test(modelo)) return "claude-opus-5";
    if (/ninguno|placeholder/i.test(modelo)) return "modelo de IA pendiente";
    return modelo;
  }

  function rotuloOrigen(serie, datos) {
    var origen = texto(serie && serie.origen, "").toLowerCase();
    var nota = texto(datos && datos.series && datos.series.nota_datos, "").toLowerCase();
    if (/calibrada|construida|construido/.test(origen)) {
      return '<span class="origen origen-construido">Serie construida · caso rotulado</span>';
    }
    if (/copernicus|real/.test(origen)) {
      return '<span class="origen">Serie real · Copernicus Sentinel-2</span>';
    }
    if (/calibrada|construida|construido/.test(nota)) {
      return '<span class="origen origen-construido">Serie construida · caso rotulado</span>';
    }
    return '<span class="origen">Serie real · Copernicus Sentinel-2</span>';
  }

  function fila(etiqueta, valor) {
    return "<tr><th>" + esc(etiqueta) + "</th><td>" + valor + "</td></tr>";
  }

  function estadoVacio(mensaje) {
    return '<div class="vacio">' + esc(mensaje) + "</div>";
  }

  /* --- panel lateral de predios ---------------------------------------- */

  function listaPredios(datos, seleccionado) {
    var predios = prediosDe(datos);
    if (!predios.length) return estadoVacio("No hay predios cargados.");

    return predios.map(function (predio) {
      var dictamen = S.estado.dictamen(predio.id);
      var ubicacion = [predio.municipio, predio.departamento].filter(Boolean).join(", ");
      return '<button class="predio-item" data-predio="' + esc(predio.id) + '" ' +
             'aria-current="' + (predio.id === seleccionado) + '">' +
               '<span class="fila">' +
                 '<span class="nombre">' + esc(texto(predio.productor, "Productor sin nombre")) + "</span>" +
                 (dictamen && esNumero(dictamen.puntaje)
                   ? '<span class="mono cifra">' + entero(dictamen.puntaje) + "</span>" : "") +
               "</span>" +
               '<span class="fila">' +
                 '<span class="meta">' + esc(texto(predio.cultivo, "Cultivo sin dato")) +
                   (ubicacion ? " · " + esc(ubicacion) : "") + "</span>" +
                 '<span class="meta cifra">' +
                   (esNumero(predio.area_declarada_ha) ? decimal(predio.area_declarada_ha, 1) + " ha" : "Área sin dato") +
                 "</span>" +
               "</span>" +
             "</button>";
    }).join("");
  }

  /* ======================================================================
     PANTALLA 1 — Mapa
     ====================================================================== */

  function mapa(host, datos, estado) {
    var predios = prediosDe(datos);
    host.innerHTML =
      '<div class="cabecera-pantalla">' +
        '<div><span class="etiqueta">Originación agropecuaria</span>' +
        '<h1>Predios en evaluación</h1>' +
        '<p>Seleccione una unidad productiva para revisar su historial satelital.</p></div>' +
      "</div>" +
      '<div class="rejilla">' +
        '<section class="tarjeta">' +
          '<div class="tarjeta-cab"><span class="etiqueta">Cartera en evaluación</span></div>' +
          '<div id="lista">' + listaPredios(datos, estado.predioId) + "</div>" +
        "</section>" +
        '<section class="tarjeta">' +
          '<div class="tarjeta-cab"><h2>Ubicación de los predios</h2>' +
            '<span class="etiqueta empujar">Colombia</span></div>' +
          '<div class="tarjeta-cuerpo mapa-host"><svg id="svg-mapa"></svg></div>' +
        "</section>" +
      "</div>";

    S.mapa.render(
      host.querySelector("#svg-mapa"),
      predios,
      datos && datos.dictamenes && datos.dictamenes.dictamenes,
      estado.predioId,
      function (id) { location.hash = "#ficha/" + id; }
    );

    host.querySelectorAll("[data-predio]").forEach(function (boton) {
      boton.addEventListener("click", function () {
        location.hash = "#ficha/" + boton.getAttribute("data-predio");
      });
    });
  }

  /* ======================================================================
     PANTALLA 2 — Ficha, serie NDVI e imágenes
     ====================================================================== */

  function comparacionSatelital(predio) {
    var imagenes = arreglo(predio && predio.imagenes_satelitales);
    if (!imagenes.length) return estadoVacio("No hay cortes satelitales asociados a este predio.");

    return '<div class="comparacion-imagenes">' + imagenes.map(function (imagen, indice) {
      var anio = texto(imagen && imagen.anio, "Año sin dato");
      var ruta = texto(imagen && imagen.ruta, "");
      var rutaEsperada = "assets/satelite/" + texto(predio && predio.id, "") + "-" + anio + ".jpg";
      var rutaCargable = ruta === rutaEsperada ? ruta : "";
      var momento = indice === 0 ? "Corte inicial" : (indice === imagenes.length - 1 ? "Corte reciente" : "Corte intermedio");
      return '<figure class="imagen-satelital">' +
        (rutaCargable ? '<img hidden src="' + esc(rutaCargable) + '" alt="Vista satelital del predio en ' + esc(anio) + '">' : "") +
        '<div class="imagen-fallback" role="img" aria-label="Captura satelital pendiente para ' + esc(anio) + '">' +
          '<span class="imagen-reticula" aria-hidden="true"></span>' +
          '<strong>' + esc(anio) + "</strong>" +
          '<span>Captura pendiente</span>' +
        "</div>" +
        '<figcaption><span>' + esc(momento) + '</span><strong class="cifra">' + esc(anio) + "</strong></figcaption>" +
      "</figure>";
    }).join("") + "</div>";
  }

  function activarImagenes(host) {
    host.querySelectorAll(".imagen-satelital img").forEach(function (imagen) {
      var figura = imagen.closest(".imagen-satelital");
      var fallback = figura && figura.querySelector(".imagen-fallback");

      function cargada() {
        if (imagen.naturalWidth <= 1 || imagen.naturalHeight <= 1) return ausente();
        imagen.hidden = false;
        if (fallback) fallback.hidden = true;
        figura.classList.add("imagen-cargada");
      }

      function ausente() {
        imagen.hidden = true;
        if (fallback) fallback.hidden = false;
        figura.classList.remove("imagen-cargada");
      }

      imagen.addEventListener("load", cargada);
      imagen.addEventListener("error", ausente);
      if (imagen.complete) {
        if (imagen.naturalWidth > 1 && imagen.naturalHeight > 1) cargada(); else ausente();
      }
    });
  }

  function ficha(host, datos, estado) {
    var predio = S.estado.predio(estado.predioId);
    if (!predio) return mapa(host, datos, estado);

    var serie = serieDe(datos, predio.id);
    var puntos = arreglo(serie && serie.puntos);
    var desvio = esNumero(predio.area_declarada_ha) && predio.area_declarada_ha !== 0 &&
      esNumero(predio.area_detectada_ha)
      ? (predio.area_detectada_ha - predio.area_declarada_ha) / predio.area_declarada_ha * 100
      : null;
    var ubicacion = [predio.vereda ? "Vereda " + predio.vereda : "", predio.municipio, predio.departamento]
      .filter(Boolean).join(", ");
    var cultivo = texto(predio.cultivo, "Sin dato") +
      (predio.variedad ? " (" + texto(predio.variedad) + ")" : "");
    var origen = rotuloOrigen(serie, datos);

    host.innerHTML =
      '<div class="migas"><a href="#mapa">← Mapa</a><span>/</span><span>' +
        esc(texto(predio.municipio, "Predio")) + "</span></div>" +
      '<div class="cabecera-pantalla cabecera-ficha">' +
        '<div><span class="etiqueta">Expediente del solicitante</span>' +
        '<h1>' + esc(texto(predio.productor, "Productor sin nombre")) + "</h1>" +
        '<p>' + esc(ubicacion || "Ubicación sin dato") + "</p></div>" + origen +
      "</div>" +
      '<div class="rejilla">' +
        '<div class="columna-tarjetas">' +
          '<section class="tarjeta">' +
            '<div class="tarjeta-cab"><span class="etiqueta">Solicitud de crédito</span></div>' +
            '<div class="tarjeta-cuerpo"><table class="datos">' +
              fila("Tipo de productor", esc(texto(predio.tipo_productor))) +
              fila("Tipo de cultivo", esc(texto(predio.tipo_cultivo))) +
              fila("Cultivo", esc(cultivo)) +
              fila("Años en el predio", esNumero(predio.anos_en_el_predio) ? entero(predio.anos_en_el_predio) : "Sin dato") +
              fila("Crédito previo", predio.credito_previo === true ? "Sí" : (predio.credito_previo === false ? "No" : "Sin dato")) +
              fila("Activos declarados", esNumero(predio.activos_declarados_smmlv)
                ? entero(predio.activos_declarados_smmlv) + " SMMLV" : "Sin dato") +
              fila("Monto solicitado", '<span class="cifra">' + cop(predio.monto_solicitado_cop) + "</span>") +
              fila("Destino", esc(texto(predio.destino))) +
            "</table></div>" +
          "</section>" +
          '<section class="tarjeta">' +
            '<div class="tarjeta-cab"><span class="etiqueta">Verificación del área</span></div>' +
            '<div class="tarjeta-cuerpo"><table class="datos">' +
              fila("Área declarada", esNumero(predio.area_declarada_ha) ? decimal(predio.area_declarada_ha, 2) + " ha" : "Sin dato") +
              fila("Área con cultivo activo", esNumero(predio.area_detectada_ha) ? decimal(predio.area_detectada_ha, 2) + " ha" : "Sin dato") +
              fila("Desvío", '<span class="cifra ' +
                (esNumero(desvio) && Math.abs(desvio) > 5 ? "texto-critico" : "texto-favorable") + '">' +
                (esNumero(desvio) && desvio > 0 ? "+" : "") + porcentaje(desvio, 1) + "</span>") +
            "</table></div>" +
          "</section>" +
          '<button class="boton boton-primario boton-ancho" data-ir="#analisis/' + esc(predio.id) + '">' +
            "Evaluar con SEEDLLITE</button>" +
        "</div>" +
        '<div class="columna-tarjetas">' +
          '<section class="tarjeta">' +
            '<div class="tarjeta-cab"><h2>Historial productivo satelital</h2>' +
              '<span class="etiqueta empujar cifra">' +
                esc(texto(serie && serie.desde, "Inicio sin dato")) + " → " +
                esc(texto(serie && serie.hasta, "Fin sin dato")) + " · " +
                entero(puntos.length) + " observaciones</span></div>" +
            '<div class="tarjeta-cuerpo"><div id="host-grafica"></div></div>' +
          "</section>" +
          '<section class="tarjeta">' +
            '<div class="tarjeta-cab"><span class="etiqueta">Indicadores calculados</span></div>' +
            '<div class="tarjeta-cuerpo"><table class="datos datos-dos-columnas">' +
              fila("Ciclos en toda la serie", entero(serie && serie.ciclos_detectados)) +
              fila("Ciclos en los últimos 24 meses", '<span class="' +
                (serie && serie.ciclos_ultimos_24m === 0 ? "texto-critico" : "texto-favorable") + '">' +
                entero(serie && serie.ciclos_ultimos_24m) + "</span>") +
              fila("Amplitud histórica", decimal(serie && serie.amplitud_historica, 3)) +
              fila("Amplitud reciente", decimal(serie && serie.amplitud_reciente_24m, 3)) +
              fila("Pérdida de amplitud", porcentaje(serie && serie.perdida_amplitud_pct, 1)) +
              fila("NDVI pico promedio", decimal(serie && serie.ndvi_pico_promedio, 2)) +
              fila("Rendimiento estimado", esNumero(serie && serie.rendimiento_estimado_t_ha)
                ? decimal(serie.rendimiento_estimado_t_ha, 2) + " t/ha" : "Sin dato") +
              fila("Rendimiento municipal (EVA)", esNumero(serie && serie.rendimiento_municipal_eva_t_ha)
                ? decimal(serie.rendimiento_municipal_eva_t_ha, 2) + " t/ha" : "Sin dato") +
            "</table>" +
            '<p class="nota-fuente">Fuente de referencia: ' + esc(texto(serie && serie.fuente_referencia)) + "</p></div>" +
          "</section>" +
          '<section class="tarjeta">' +
            '<div class="tarjeta-cab"><h2>Secuencia satelital</h2><span class="etiqueta empujar">Antes / después</span></div>' +
            '<div class="tarjeta-cuerpo">' + comparacionSatelital(predio) + "</div>" +
          "</section>" +
          '<div class="aviso">' + esc(texto(datos && datos.series && datos.series.nota_datos,
            "La fuente y el método de la serie no están disponibles.")) + "</div>" +
        "</div>" +
      "</div>";

    var hostGrafica = host.querySelector("#host-grafica");
    hostGrafica.appendChild(S.grafica.ndvi({
      serie: serie || {},
      eventos: arreglo(datos && datos.series && datos.series.eventos_climaticos)
    }));
    hostGrafica.appendChild(S.grafica.leyenda());
    activarImagenes(host);
  }

  /* ======================================================================
     PANTALLA 3 — Análisis y evidencia de forma
     ====================================================================== */

  function comparacionAmplitud(serie) {
    var historica = serie && serie.amplitud_historica;
    var reciente = serie && serie.amplitud_reciente_24m;
    if (!esNumero(historica) || !esNumero(reciente) || historica <= 0) {
      return estadoVacio("No hay amplitudes suficientes para comparar.");
    }
    var proporcion = limitar(reciente / historica * 100, 0, 100);
    var perdida = serie.perdida_amplitud_pct;
    return '<div class="amplitud-comparacion" aria-label="Comparación de amplitud histórica y reciente">' +
      '<div class="amplitud-fila"><div><span>Histórica</span><strong class="cifra">' + decimal(historica, 3) +
      '</strong></div><div class="amplitud-riel"><span style="--avance:100%"></span></div></div>' +
      '<div class="amplitud-fila amplitud-reciente"><div><span>Últimos 24 meses</span><strong class="cifra">' +
      decimal(reciente, 3) + '</strong></div><div class="amplitud-riel"><span style="--avance:' +
      proporcion.toFixed(1) + '%"></span></div></div>' +
      '<p class="amplitud-conclusion"><strong class="cifra">' + porcentaje(perdida, 1) +
      '</strong> de pérdida frente a su propio ritmo histórico.</p>' +
    "</div>";
  }

  function pasosAnalisis(serie, datos) {
    var puntos = arreglo(serie && serie.puntos);
    var total = esNumero(serie && serie.cobertura_meses_totales)
      ? serie.cobertura_meses_totales : puntos.length;
    var medidos = serie && serie.cobertura_meses_medidos;
    var interpolados = esNumero(total) && esNumero(medidos) ? Math.max(0, total - medidos) : null;
    return [
      "Leyendo " + entero(total) + " observaciones Sentinel-2 del polígono…",
      esNumero(medidos)
        ? "Separando " + entero(medidos) + " meses medidos de " + entero(interpolados) + " meses interpolados…"
        : "Separando observaciones medidas de meses interpolados por nubosidad…",
      esNumero(serie && serie.ciclos_detectados)
        ? "Detectando " + entero(serie.ciclos_detectados) + " ciclos en la forma completa de la serie…"
        : "Detectando ciclos productivos en la forma de la serie…",
      esNumero(serie && serie.rendimiento_estimado_t_ha) && esNumero(serie && serie.rendimiento_municipal_eva_t_ha)
        ? "Comparando " + decimal(serie.rendimiento_estimado_t_ha, 2) + " t/ha estimadas contra " +
          decimal(serie.rendimiento_municipal_eva_t_ha, 2) + " t/ha del municipio (EVA)…"
        : "Comparando el rendimiento estimado contra la referencia municipal EVA…",
      esNumero(serie && serie.perdida_amplitud_pct)
        ? "Midiendo una pérdida de amplitud de " + porcentaje(serie.perdida_amplitud_pct, 1) + " en los últimos 24 meses…"
        : "Midiendo la amplitud reciente contra el patrón histórico…",
      "Reproduciendo el memorando generado por " + modeloVisible(datos) + "…"
    ];
  }

  function metricasAnalisis(serie) {
    var medidos = serie && serie.cobertura_meses_medidos;
    var total = serie && serie.cobertura_meses_totales;
    return '<div class="metricas-analisis">' +
      '<div><span class="etiqueta">Ciclos · total / 24 m</span><strong class="cifra">' +
        entero(serie && serie.ciclos_detectados) + " / " + entero(serie && serie.ciclos_ultimos_24m) + "</strong></div>" +
      '<div><span class="etiqueta">NDVI pico · nivel</span><strong class="cifra">' +
        decimal(serie && serie.ndvi_pico_promedio, 2) + "</strong></div>" +
      '<div><span class="etiqueta">Cobertura medida</span><strong class="cifra">' +
        entero(medidos) + " / " + entero(total) + " meses</strong></div>" +
      '<div><span class="etiqueta">Caída en El Niño</span><strong class="cifra">' +
        porcentaje(serie && serie.caida_enso_pct, 1) + "</strong></div>" +
      '<div class="metrica-ancha"><span class="etiqueta">Rendimiento · predio / municipio EVA</span><strong class="cifra">' +
        (esNumero(serie && serie.rendimiento_estimado_t_ha)
          ? decimal(serie.rendimiento_estimado_t_ha, 2) + " t/ha" : "Sin dato") + " / " +
        (esNumero(serie && serie.rendimiento_municipal_eva_t_ha)
          ? decimal(serie.rendimiento_municipal_eva_t_ha, 2) + " t/ha" : "Sin dato") + "</strong></div>" +
    "</div>";
  }

  function analisis(host, datos, estado) {
    var predio = S.estado.predio(estado.predioId);
    if (!predio) return mapa(host, datos, estado);

    var serie = serieDe(datos, predio.id);
    var dictamen = S.estado.dictamen(predio.id);
    var placeholder = Boolean(datos && datos.dictamenes && datos.dictamenes.es_placeholder);
    var pasos = pasosAnalisis(serie, datos);

    host.innerHTML =
      '<div class="migas"><a href="#ficha/' + esc(predio.id) + '">← Ficha</a>' +
        "<span>/</span><span>Análisis</span></div>" +
      '<div class="cabecera-pantalla cabecera-analisis">' +
        '<div><span class="etiqueta">Lectura de la forma productiva</span>' +
        '<h1>Evaluando ' + esc(texto(predio.productor, "el predio")) + "</h1>" +
        '<p>El nivel muestra cuánto verde hay. La amplitud revela si el cultivo conserva su patrón.</p></div>' +
        '<span class="estado-cache ' + (placeholder ? "estado-placeholder" : "") + '">' +
          (placeholder ? "Maqueta · salida pendiente" : "Salida real cacheada") + " · " + esc(modeloVisible(datos)) + "</span>" +
      "</div>" +
      '<div class="analisis-grid">' +
        '<section class="tarjeta analisis-evidencia">' +
          '<div class="tarjeta-cab"><h2>La señal que importa</h2>' + rotuloOrigen(serie, datos) + "</div>" +
          '<div class="tarjeta-cuerpo">' +
            '<div class="tesis-forma"><span class="tesis-indice">01</span><p>Un predio abandonado puede seguir verde por el rastrojo. Lo que desaparece es el <strong>patrón</strong>: la serie pierde amplitud y ciclos.</p></div>' +
            '<h3 class="titulo-comparacion">Amplitud histórica frente a los últimos 24 meses</h3>' +
            comparacionAmplitud(serie) +
            metricasAnalisis(serie) +
            '<p class="nota-metodo">Los meses interpolados por nubosidad se muestran en la gráfica, pero quedan fuera de estos agregados.</p>' +
          "</div>" +
        "</section>" +
        '<section class="tarjeta analisis-proceso">' +
          '<div class="tarjeta-cab"><h2>Proceso de evaluación</h2>' +
            '<span class="etiqueta empujar">Reproducción local</span></div>' +
          '<div class="tarjeta-cuerpo">' +
            '<ol id="pasos" class="pasos-analisis">' + pasos.map(function (paso, indice) {
              return '<li><span class="paso-marca cifra">' + (indice + 1) + '</span><span>' + esc(paso) + "</span></li>";
            }).join("") + "</ol>" +
            '<div class="memorando-cache">' +
              '<div class="memorando-rotulo"><span>Memorando al comité</span><strong>Cacheado · no es una llamada en vivo</strong></div>' +
              '<div id="memorando" class="mono memorando-texto" aria-live="polite">Preparando reproducción de la salida guardada…</div>' +
            "</div>" +
            '<div id="pie" class="analisis-pie"></div>' +
          "</div>" +
        "</section>" +
      "</div>";

    animarAnalisis(host, pasos, dictamen, predio, placeholder);
  }

  function animarAnalisis(host, pasos, dictamen, predio, placeholder) {
    var elementos = Array.prototype.slice.call(host.querySelectorAll("#pasos li"));
    var reducir = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var indice = 0;

    function mostrarSalida() {
      if (!host.isConnected) return;
      elementos.forEach(function (elemento) { elemento.className = "paso-completo"; });
      escribirMemorando(host, dictamen, predio, placeholder, reducir);
    }

    if (reducir) return mostrarSalida();

    function siguiente() {
      if (!host.isConnected) return;
      if (indice > 0) elementos[indice - 1].className = "paso-completo";
      if (indice >= pasos.length) return mostrarSalida();
      elementos[indice].className = "paso-activo";
      indice += 1;
      global.setTimeout(siguiente, 720);
    }

    siguiente();
  }

  function escribirMemorando(host, dictamen, predio, placeholder, sinMovimiento) {
    var destino = host.querySelector("#memorando");
    if (!destino) return;
    if (!dictamen || typeof dictamen.memorando !== "string" || !dictamen.memorando.trim()) {
      destino.innerHTML = '<span class="vacio-en-linea">Sin memorando disponible para este predio.</span>';
      if (dictamen) {
        host.querySelector("#pie").innerHTML =
          '<button class="boton boton-primario" data-ir="#dictamen/' + esc(predio.id) + '">Ver dictamen disponible</button>' +
          "<p>La salida no incluye memorando, pero conserva los datos de decisión disponibles.</p>";
      }
      return;
    }

    var contenido = dictamen.memorando;
    var posicion = 0;
    var duracionObjetivo = Math.max(3600, Math.min(6000, contenido.length * 5));
    var intervaloBase = 18;
    var ciclosObjetivo = Math.max(1, Math.floor(duracionObjetivo / intervaloBase));
    var salto = Math.max(1, Math.ceil(contenido.length / ciclosObjetivo));
    var ciclosReales = Math.max(1, Math.ceil(contenido.length / salto));
    var intervalo = Math.max(12, Math.round(duracionObjetivo / ciclosReales));

    function completar() {
      if (!host.isConnected) return;
      destino.textContent = contenido;
      var pie = host.querySelector("#pie");
      pie.innerHTML =
        '<button class="boton boton-primario" data-ir="#dictamen/' + esc(predio.id) + '">Ver dictamen completo</button>' +
        '<p>' + (placeholder
          ? "El motor todavía no ha reemplazado el texto de maqueta."
          : "Salida real generada previamente y guardada en el paquete local de datos.") + "</p>";
    }

    if (sinMovimiento) return completar();

    destino.textContent = "";
    (function teclear() {
      if (!host.isConnected) return;
      if (posicion <= contenido.length) {
        destino.textContent = contenido.slice(0, posicion);
        posicion += salto;
        global.setTimeout(teclear, intervalo);
        return;
      }
      completar();
    })();
  }

  /* ======================================================================
     PANTALLA 4 — Dictamen de crédito
     ====================================================================== */

  function razonAjuste(dictamen) {
    var evidencia = arreglo(dictamen && dictamen.evidencia);
    var candidatas = evidencia.filter(function (item) {
      return item && (item.tipo === "alerta" || item.tipo === "critico");
    });
    var precisa = candidatas.filter(function (item) {
      return /área|monto|capacidad|cultiv|ciclo|amplitud|rendimiento|abandono|destino/i.test(texto(item.texto, ""));
    })[0];
    var elegida = precisa || candidatas[0];
    return elegida && elegida.texto
      ? elegida.texto
      : "El ajuste corresponde a la capacidad productiva verificada por el análisis satelital.";
  }

  function ejesDictamen(dictamen) {
    var ejes = arreglo(dictamen && dictamen.ejes);
    if (!ejes.length) return estadoVacio("Los ejes de evaluación no están disponibles.");
    return ejes.map(function (eje) {
      var avance = esNumero(eje && eje.puntaje) && esNumero(eje && eje.peso) && eje.peso > 0
        ? limitar(eje.puntaje / eje.peso * 100, 0, 100) : 0;
      return '<div class="eje">' +
        '<div class="eje-fila"><span class="eje-nombre">' + esc(texto(eje && eje.eje)) +
        '<small>Peso ' + entero(eje && eje.peso) + '</small></span><span class="eje-cifra">' +
        entero(eje && eje.puntaje) + " / " + entero(eje && eje.peso) + "</span></div>" +
        '<div class="eje-riel"><div class="eje-barra" style="--avance:' + avance.toFixed(1) + '%"></div></div></div>';
    }).join("");
  }

  function evidenciaDictamen(dictamen) {
    var evidencia = arreglo(dictamen && dictamen.evidencia);
    if (!evidencia.length) return estadoVacio("No hay evidencia disponible para este dictamen.");
    return '<ul class="evidencia">' + evidencia.map(function (item) {
      var tipo = texto(item && item.tipo, "sin-tipo");
      return '<li class="ev-' + esc(tipo) + '"><span class="glifo" aria-hidden="true">' +
        (GLIFO[tipo] || "·") + '</span><span><strong>' +
        (tipo === "favorable" ? "Favorable" : (tipo === "alerta" ? "Alerta" : (tipo === "critico" ? "Crítico" : "Evidencia"))) +
        "</strong>" + esc(texto(item && item.texto)) + "</span></li>";
    }).join("") + "</ul>";
  }

  function dictamen(host, datos, estado) {
    var predio = S.estado.predio(estado.predioId);
    if (!predio) return mapa(host, datos, estado);
    var dictamen = S.estado.dictamen(predio.id);
    if (!dictamen) {
      host.innerHTML = '<div class="migas"><a href="#ficha/' + esc(predio.id) + '">← Ficha</a></div>' +
        '<section class="tarjeta">' + estadoVacio("Aún no hay dictamen para este predio.") + "</section>";
      return;
    }

    var solicitado = predio.monto_solicitado_cop;
    var sugerido = dictamen.monto_sugerido_cop;
    var recorte = esNumero(solicitado) && esNumero(sugerido) ? Math.max(0, solicitado - sugerido) : null;
    var tieneRecorte = esNumero(recorte) && recorte > 0;
    var banda = texto(dictamen.banda_riesgo, "sin-banda").toLowerCase();
    var decision = TEXTO_DECISION[dictamen.decision] || texto(dictamen.decision, "Sin decisión");
    var fag = dictamen.cobertura_fag_pct;
    var fagDetalle = esNumero(fag) && fag > 0
      ? '<strong class="cifra">' + porcentaje(fag, 0) +
        "</strong> del saldo garantizado al intermediario ante incumplimiento. El productor recibe el 100% del monto aprobado."
      : "No aplica para esta decisión.";
    var garantia = esNumero(fag) && fag > 0
      ? "FAG; no requiere hipoteca del predio."
      : "No aplica.";

    host.innerHTML =
      '<div class="migas"><a href="#mapa">← Mapa</a><span>/</span>' +
        '<a href="#ficha/' + esc(predio.id) + '">Ficha</a><span>/</span><span>Dictamen</span></div>' +
      '<div class="cabecera-pantalla cabecera-dictamen">' +
        '<div><span class="etiqueta">Memorando de decisión crediticia</span>' +
        '<h1>' + esc(texto(predio.productor, "Productor sin nombre")) + "</h1>" +
        '<p>' + esc(texto(predio.cultivo)) + " · " + esc(texto(predio.municipio)) +
          (predio.departamento ? ", " + esc(predio.departamento) : "") + "</p></div>" +
        '<div class="decision-principal riesgo-texto-' + esc(banda) + '"><span>Decisión</span><strong>' +
          esc(decision) + "</strong></div>" +
      "</div>" +
      '<div class="dictamen-grid banda-' + esc(banda) + '">' +
        '<aside class="columna-tarjetas dictamen-resumen">' +
          '<section class="tarjeta">' +
            '<div class="tarjeta-cab"><span class="etiqueta">Puntaje SEEDLLITE</span></div>' +
            '<div class="tarjeta-cuerpo">' +
              '<div class="puntaje"><strong class="cifra">' + entero(dictamen.puntaje) +
                '</strong><span>/ 1000</span></div>' +
              '<div class="puntaje-banda">Riesgo ' + esc(texto(dictamen.banda_riesgo)) + "</div>" +
              '<div class="marca-dictamen">' + marcaRiesgo(dictamen) + "</div>" +
              '<div class="ejes-lista">' + ejesDictamen(dictamen) + "</div>" +
            "</div>" +
          "</section>" +
        "</aside>" +
        '<div class="columna-tarjetas dictamen-detalle">' +
          '<section class="tarjeta tarjeta-montos">' +
            '<div class="tarjeta-cab"><h2>Estructura recomendada</h2>' +
              '<span class="etiqueta empujar">FINAGRO · FAG</span></div>' +
            '<div class="tarjeta-cuerpo">' +
              '<div class="montos-comparacion">' +
                '<div><span>Solicitado</span><strong class="cifra">' + cop(solicitado) + "</strong></div>" +
                '<span class="montos-flecha" aria-hidden="true">→</span>' +
                '<div class="monto-sugerido"><span>Sugerido</span><strong class="cifra">' + cop(sugerido) + "</strong></div>" +
              "</div>" +
              (tieneRecorte ? '<div class="recorte-monto"><span class="etiqueta">Ajuste satelital</span>' +
                '<strong class="cifra">−' + cop(recorte) + '</strong><p><b>Razón:</b> ' +
                esc(razonAjuste(dictamen)) + "</p></div>" : "") +
              '<table class="datos datos-financiacion">' +
                fila("Línea FINAGRO", esc(texto(dictamen.linea_finagro, "No aplica"))) +
                fila("Cobertura FAG", fagDetalle) +
                fila("Garantía", esc(garantia)) +
                fila("Plazo", esNumero(dictamen.plazo_meses) && dictamen.plazo_meses > 0
                  ? entero(dictamen.plazo_meses) + " meses" : "No aplica") +
                fila("Condición de desembolso", esc(texto(dictamen.desembolso, "No aplica"))) +
              "</table>" +
            "</div>" +
          "</section>" +
          '<section class="tarjeta">' +
            '<div class="tarjeta-cab"><h2>Evidencia que sustenta la decisión</h2>' +
              '<span class="etiqueta empujar">Favorable · alerta · crítico</span></div>' +
            '<div class="tarjeta-cuerpo">' + evidenciaDictamen(dictamen) + "</div>" +
          "</section>" +
          '<section class="tarjeta memorando-completo">' +
            '<div class="tarjeta-cab"><h2>Memorando al comité de crédito</h2>' +
              '<span class="etiqueta empujar">' + esc(modeloVisible(datos)) + " · salida cacheada</span></div>" +
            '<div class="tarjeta-cuerpo"><p>' + esc(texto(dictamen.memorando,
              "No hay memorando disponible.")) + '</p><p class="recomendacion">' +
              esc(texto(dictamen.recomendacion, "Sin recomendación adicional.")) + "</p></div>" +
          "</section>" +
          '<section class="descargo-legal" aria-label="Descargo legal">' +
            '<strong>Descargo legal</strong><p>SEEDLLITE emite una recomendación dirigida a un intermediario financiero vigilado. No constituye oferta de crédito, promesa de desembolso ni asesoría financiera al productor. La decisión de otorgamiento corresponde exclusivamente al intermediario, conforme a su reglamento de crédito, al SARC y al Manual de Servicios de FINAGRO.</p>' +
          "</section>" +
        "</div>" +
      "</div>";
  }

  /* ======================================================================
     PANTALLA 5 — Cartera
     ====================================================================== */

  function cartera(host, datos) {
    var filas = prediosDe(datos).map(function (predio) {
      var dictamen = S.estado.dictamen(predio.id);
      var serie = serieDe(datos, predio.id);
      if (!dictamen) return "";
      return "<tr>" +
        "<td>" + esc(texto(predio.productor, "Productor sin nombre")) +
          '<div class="meta tabla-meta">' + esc([predio.municipio, predio.departamento].filter(Boolean).join(", ")) + "</div></td>" +
        "<td>" + esc(texto(predio.cultivo)) + "</td>" +
        '<td class="num mono">' + decimal(predio.area_detectada_ha, 2) + "</td>" +
        '<td class="num mono">' + entero(serie && serie.ciclos_ultimos_24m) + "</td>" +
        '<td class="num mono celda-puntaje">' + entero(dictamen.puntaje) + "</td>" +
        '<td class="num mono">' + cop(dictamen.monto_sugerido_cop) + "</td>" +
        "<td>" + marcaRiesgo(dictamen) + "</td>" +
        "</tr>";
    }).join("");

    host.innerHTML =
      '<div class="migas"><a href="#mapa">← Mapa</a><span>/</span><span>Cartera</span></div>' +
      '<div class="cabecera-pantalla"><div><span class="etiqueta">Vista de analista</span>' +
        '<h1>Cartera evaluada</h1><p>Comparación de capacidad productiva, puntaje y monto recomendado.</p></div></div>' +
      '<section class="tarjeta"><div class="tarjeta-cuerpo tabla-scroll">' +
        '<table class="datos tabla-cartera"><thead><tr><th>Productor</th><th>Cultivo</th><th>Ha activas</th>' +
        "<th>Ciclos 24 m</th><th>Puntaje</th><th>Monto sugerido</th><th>Decisión</th></tr></thead>" +
        "<tbody>" + (filas || '<tr><td colspan="7">No hay dictámenes disponibles.</td></tr>') + "</tbody></table>" +
      "</div></section>";
  }

  S.vistas = {
    mapa: mapa,
    ficha: ficha,
    analisis: analisis,
    dictamen: dictamen,
    cartera: cartera
  };
})(window);
