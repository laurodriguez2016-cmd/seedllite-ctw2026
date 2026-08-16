/* ==========================================================================
   70-nuevo-caso.js — radicar una solicitud de credito
   Frente 🅰 APP · ruta #nuevo

   POR QUE EXISTE
   La app mostraba nueve expedientes ya evaluados y no habia forma de entrar uno
   nuevo. Eso la dejaba como un visor, no como un producto: un analista que la ve
   pregunta de inmediato "¿y como entra el caso?".

   LO QUE ESTA PANTALLA NO FINGE
   El certificado de tradicion y libertad NO trae coordenadas. Trae la matricula
   inmobiliaria, los linderos EN PROSA ("por el norte con predio de Fulano") y la
   cabida. Georreferenciar eso exige el catastro del IGAC, que no tiene API
   publica abierta.

   Asi que esta pantalla hace lo que SI se puede hacer hoy y lo dice:

     1. La matricula da el CIRCULO REGISTRAL en sus tres primeros digitos, y de
        ahi sale el municipio. Eso es real y acota el mapa.
     2. El lindero se dibuja o se pega en coordenadas. Es el unico camino que hoy
        produce una geometria.
     3. El certificado se lee para extraer matricula, cabida y linderos, y se
        declara explicitamente que la geometria sigue faltando.

   Fingir una integracion con el IGAC habria sido facil y habria sido mentir
   sobre la unica cosa que este proyecto vende: que toda cifra se puede rastrear.
   ========================================================================== */

(function (global) {
  "use strict";

  var S = global.SEEDLLITE = global.SEEDLLITE || {};

  /* ---------------------------------------------------------------------
     Circulos registrales. Los tres primeros digitos de la matricula
     inmobiliaria identifican la Oficina de Registro de Instrumentos Publicos,
     y cada oficina cubre un conjunto conocido de municipios.

     Se incluyen los circulos de los departamentos del demo mas los de mayor
     movimiento agropecuario. Un circulo cubre varios municipios: se devuelve la
     cabecera, que es donde cae el centro del mapa, y el usuario ajusta.
     --------------------------------------------------------------------- */
  var CIRCULOS = {
    "200": { m: "Pitalito",      d: "Huila",   lat: 1.8534,  lon: -76.0521 },
    "201": { m: "Neiva",         d: "Huila",   lat: 2.9273,  lon: -75.2819 },
    "202": { m: "Garzón",        d: "Huila",   lat: 2.1959,  lon: -75.6276 },
    "203": { m: "La Plata",      d: "Huila",   lat: 2.3906,  lon: -75.8917 },
    "350": { m: "El Espinal",    d: "Tolima",  lat: 4.1533,  lon: -74.8836 },
    "355": { m: "Ibagué",        d: "Tolima",  lat: 4.4389,  lon: -75.2322 },
    "360": { m: "Guamo",         d: "Tolima",  lat: 4.0303,  lon: -74.9700 },
    "365": { m: "Purificación",  d: "Tolima",  lat: 3.8578,  lon: -74.9316 },
    "070": { m: "Tunja",         d: "Boyacá",  lat: 5.5353,  lon: -73.3678 },
    "072": { m: "Ventaquemada",  d: "Boyacá",  lat: 5.3672,  lon: -73.5218 },
    "074": { m: "Duitama",       d: "Boyacá",  lat: 5.8245,  lon: -73.0342 },
    "076": { m: "Sogamoso",      d: "Boyacá",  lat: 5.7145,  lon: -72.9339 },
    "236": { m: "Granada",       d: "Meta",    lat: 3.5421,  lon: -73.7059 },
    "230": { m: "Villavicencio", d: "Meta",    lat: 4.1420,  lon: -73.6266 },
    "234": { m: "Acacías",       d: "Meta",    lat: 3.9878,  lon: -73.7639 },
    "150": { m: "Montería",      d: "Córdoba", lat: 8.7479,  lon: -75.8814 },
    "190": { m: "Popayán",       d: "Cauca",   lat: 2.4448,  lon: -76.6147 },
    "170": { m: "Manizales",     d: "Caldas",  lat: 5.0689,  lon: -75.5174 }
  };

  /* Transitorio: el suelo queda desnudo entre siembras y el ciclo se ve.
     Perenne: la planta permanece y la cosecha no deja huella espectral.
     De esto depende cual causal de rechazo aplica, asi que no es decorativo. */
  var CULTIVOS = {
    "Arroz":     "transitorio", "Papa":    "transitorio", "Maíz":  "transitorio",
    "Hortalizas":"transitorio", "Fríjol":  "transitorio", "Yuca":  "transitorio",
    "Café":      "perenne",     "Cacao":   "perenne",     "Caña":  "perenne",
    "Plátano":   "perenne",     "Aguacate":"perenne",     "Cítricos": "perenne"
  };

  var estado = { lat: null, lon: null, origen: null, matricula: null, cert: null };

  /* --- Matricula: 3 digitos de circulo, guion, consecutivo -------------- */
  function leerMatricula(txt) {
    var m = String(txt || "").match(/(\d{3})\s*[-–]\s*(\d{1,8})/);
    if (!m) { return null; }
    var c = CIRCULOS[m[1]];
    return { circulo: m[1], consecutivo: m[2], oficina: c || null,
             texto: m[1] + "-" + m[2] };
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* --- Lo que se puede sacar de un certificado de tradicion ------------- */
  function leerCertificado(texto) {
    var out = { matricula: null, cabida: null, linderos: [], municipio: null };

    var mm = leerMatricula(texto);
    if (mm) { out.matricula = mm; }

    /* Cabida: "AREA: 4 HAS 2000 MTS2" o "CABIDA: 4,2 HECTAREAS" */
    var ca = texto.match(/(?:cabida|[áa]rea)\s*[:\s]\s*([\d.,]+)\s*(?:has?|hect[áa]reas?)/i);
    if (ca) { out.cabida = parseFloat(ca[1].replace(".", "").replace(",", ".")); }

    /* Linderos en prosa. Es lo unico que el documento dice del contorno, y no
       basta para georreferenciar: nombra vecinos, no coordenadas. */
    var re = /por\s+el\s+(norte|sur|oriente|occidente|este|oeste)[^.;]{5,160}/gi, m;
    while ((m = re.exec(texto)) !== null && out.linderos.length < 6) {
      out.linderos.push(m[0].replace(/\s+/g, " ").trim());
    }

    var mu = texto.match(/municipio\s+de\s+([A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,30})/);
    if (mu) { out.municipio = mu[1].trim(); }
    return out;
  }

  function ubicar(lat, lon, origen, etiqueta) {
    estado.lat = lat; estado.lon = lon; estado.origen = origen;
    var caja = document.getElementById("nc-ubic");
    if (!caja) { return; }
    caja.innerHTML =
      '<div class="nc-coord"><b>' + lat.toFixed(4) + "°, " + lon.toFixed(4) + "°</b>" +
      '<span class="nc-origen">' + esc(etiqueta) + "</span></div>";
    validar();
  }

  function validar() {
    var f = document.getElementById("nc-form");
    if (!f) { return; }
    var listo = f.productor.value.trim() && f.cultivo.value &&
                parseFloat(f.area.value) > 0 && parseFloat(f.monto.value) > 0 &&
                estado.lat != null;
    var b = document.getElementById("nc-enviar");
    b.disabled = !listo;
    b.textContent = listo ? "Radicar y evaluar" : "Completa los campos obligatorios";
  }

  /* --- El expediente que produce la pantalla ---------------------------- */
  function armarExpediente() {
    var f = document.getElementById("nc-form");
    var cultivo = f.cultivo.value;
    var id = (f.productor.value.trim().split(/\s+/)[0] || "predio").toLowerCase()
             .normalize("NFD").replace(/[̀-ͯ]/g, "")
             .replace(/[^a-z]/g, "") + "-" + cultivo.toLowerCase()
             .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]/g, "");
    return {
      id: id,
      productor: f.productor.value.trim(),
      tipo_productor: "pequeño",
      vereda: f.vereda.value.trim() || "por definir",
      municipio: f.municipio.value.trim() || "por definir",
      departamento: f.departamento.value.trim() || "por definir",
      coordenadas: { lat: +estado.lat.toFixed(4), lon: +estado.lon.toFixed(4) },
      cultivo: cultivo,
      tipo_cultivo: CULTIVOS[cultivo] || "transitorio",
      variedad: f.variedad.value.trim() || "no declarada",
      area_declarada_ha: parseFloat(f.area.value),
      area_detectada_ha: null,
      monto_solicitado_cop: Math.round(parseFloat(f.monto.value)),
      destino: f.destino.value.trim(),
      activos_declarados_smmlv: parseInt(f.activos.value || "0", 10),
      anos_en_el_predio: parseInt(f.anios.value || "0", 10),
      credito_previo: f.previo.value === "si",
      matricula_inmobiliaria: estado.matricula ? estado.matricula.texto : null,
      origen_coordenadas: estado.origen
    };
  }

  function mostrarResultado() {
    var exp = armarExpediente();
    var host = document.getElementById("nc-salida");
    host.innerHTML =
      '<div class="nc-ok">' +
        "<h3>Expediente radicado</h3>" +
        "<p>El caso queda listo para entrar al pipeline. SEEDLLITE no evalúa en " +
        "el navegador: la serie se descarga de Copernicus y el dictamen lo emite " +
        "el modelo, y las dos cosas ocurren del lado del motor.</p>" +
        '<div class="nc-paso"><span>1</span>Añadir a <code>data/predios.json</code></div>' +
        '<pre class="nc-json">' + esc(JSON.stringify(exp, null, 2)) + "</pre>" +
        '<div class="nc-paso"><span>2</span>Correr el pipeline</div>' +
        '<pre class="nc-cmd">python3 scripts/ingesta_sentinel.py ' + esc(exp.id) + "\n" +
        "python3 scripts/medir_area.py " + esc(exp.id) + " --escribir\n" +
        "python3 scripts/calcular_incertidumbre.py --escribir\n" +
        "python3 scripts/capturar_predio.py " + esc(exp.id) + "\n" +
        "python3 scripts/generar_dictamen.py " + esc(exp.id) + "\n" +
        "python3 scripts/empaquetar_datos.py</pre>" +
        '<p class="nc-tiempo">Tiempo del pipeline: unos tres minutos. La descarga ' +
        "de los 108 meses tarda unos segundos; medir el área son 16 peticiones más.</p>" +
      "</div>";
    host.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* --- La vista --------------------------------------------------------- */
  function pintar(host) {
    var opciones = Object.keys(CULTIVOS).map(function (c) {
      return '<option value="' + c + '">' + c + " · " + CULTIVOS[c] + "</option>";
    }).join("");

    host.innerHTML =
      '<div class="migas"><a href="#mapa">← Mapa</a><span>/</span><span>Radicar solicitud</span></div>' +
      '<form id="nc-form" class="nc" autocomplete="off">' +

        '<section class="tarjeta nc-col">' +
          '<div class="tarjeta-cab">1 · Solicitante y crédito</div>' +
          '<div class="tarjeta-cuerpo nc-campos">' +
            campo("productor", "Nombre del solicitante", "text", "", true) +
            dos(campo("vereda", "Vereda", "text", "", false),
                campo("municipio", "Municipio", "text", "", false)) +
            campo("departamento", "Departamento", "text", "", false) +
            dos(campo("activos", "Activos declarados (SMMLV)", "number", "", false),
                campo("anios", "Años en el predio", "number", "", false)) +
            '<label class="nc-campo"><span>Cultivo <i>*</i></span>' +
              '<select name="cultivo" required><option value="">Seleccionar…</option>' +
              opciones + "</select>" +
              '<small>El tipo —transitorio o perenne— decide qué causal de rechazo aplica.</small>' +
            "</label>" +
            dos(campo("variedad", "Variedad", "text", "", false),
                campo("area", "Área declarada (ha)", "number", "", true, "0.1")) +
            campo("monto", "Monto solicitado (COP)", "number", "", true) +
            '<label class="nc-campo"><span>Destino del crédito <i>*</i></span>' +
              '<textarea name="destino" rows="2" required ' +
              'placeholder="Compra de semilla certificada y fertilizante"></textarea>' +
              '<small>Debe ser elegible según la Resolución 08 de 2023 de la CNCA.</small>' +
            "</label>" +
            '<label class="nc-campo"><span>¿Tuvo crédito formal antes?</span>' +
              '<select name="previo"><option value="no">No, primer crédito formal</option>' +
              '<option value="si">Sí</option></select></label>' +
          "</div>" +
        "</section>" +

        '<section class="tarjeta nc-col">' +
          '<div class="tarjeta-cab">2 · Dónde queda el lote</div>' +
          '<div class="tarjeta-cuerpo">' +
            '<div class="nc-pestanas" role="tablist">' +
              '<button type="button" class="nc-pes activa" data-pes="mapa">Señalar en el mapa</button>' +
              '<button type="button" class="nc-pes" data-pes="coord">Coordenadas</button>' +
              '<button type="button" class="nc-pes" data-pes="mat">Matrícula o certificado</button>' +
            "</div>" +

            '<div class="nc-panel" data-panel="mapa">' +
              '<p class="nc-ayuda">Haz clic sobre el lote. El polígono se arma como un ' +
              'cuadrado del área declarada centrado en ese punto, que es lo mismo que hace ' +
              'el pipeline hoy.</p>' +
              '<div id="nc-mapa" class="nc-mapa"></div>' +
            "</div>" +

            '<div class="nc-panel oculto" data-panel="coord">' +
              '<p class="nc-ayuda">Pega las coordenadas del centro del lote en grados ' +
              'decimales. En Colombia la latitud es positiva y la longitud negativa.</p>' +
              dos(campo("lat", "Latitud", "number", "3.5421", false, "0.0001"),
                  campo("lon", "Longitud", "number", "-73.7059", false, "0.0001")) +
              '<button type="button" class="boton" id="nc-usar-coord">Usar estas coordenadas</button>' +
            "</div>" +

            '<div class="nc-panel oculto" data-panel="mat">' +
              '<p class="nc-ayuda"><b>Lo que el certificado sí resuelve y lo que no.</b> ' +
              'El certificado de tradición y libertad trae la matrícula, la cabida y los ' +
              'linderos en prosa: <i>«por el norte con predio de…»</i>. No trae coordenadas. ' +
              'Los tres primeros dígitos de la matrícula identifican el círculo registral, ' +
              'y de ahí sale el municipio, que acota el mapa. La geometría exacta exige el ' +
              'catastro del IGAC, que no tiene API pública abierta: hasta entonces el ' +
              'lindero se señala en el mapa.</p>' +
              campo("matricula", "Matrícula inmobiliaria", "text", "236-12345", false) +
              '<button type="button" class="boton" id="nc-usar-mat">Ubicar por matrícula</button>' +
              '<label class="nc-campo nc-archivo"><span>O adjunta el certificado (PDF o texto)</span>' +
                '<input type="file" name="cert" accept=".pdf,.txt,.text"></label>' +
              '<div id="nc-cert"></div>' +
            "</div>" +

            '<div id="nc-ubic" class="nc-ubic"><span class="nc-sin">Sin ubicación todavía</span></div>' +
          "</div>" +
        "</section>" +

        '<div class="nc-pie">' +
          '<button type="submit" id="nc-enviar" class="boton boton-primario" disabled>' +
          "Completa los campos obligatorios</button>" +
          '<p class="nc-nota">SEEDLLITE emite una recomendación dirigida a un intermediario ' +
          "financiero vigilado. No constituye oferta de crédito ni asesoría financiera.</p>" +
        "</div>" +
        '<div id="nc-salida"></div>' +
      "</form>";

    conectar(host);
  }

  function campo(nombre, rotulo, tipo, valor, req, paso) {
    return '<label class="nc-campo"><span>' + rotulo + (req ? " <i>*</i>" : "") + "</span>" +
           '<input type="' + tipo + '" name="' + nombre + '" value="' + esc(valor) + '"' +
           (paso ? ' step="' + paso + '"' : "") + (req ? " required" : "") + "></label>";
  }
  function dos(a, b) { return '<div class="nc-dos">' + a + b + "</div>"; }

  function conectar(host) {
    var f = host.querySelector("#nc-form");

    host.querySelectorAll(".nc-pes").forEach(function (b) {
      b.addEventListener("click", function () {
        host.querySelectorAll(".nc-pes").forEach(function (x) { x.classList.remove("activa"); });
        b.classList.add("activa");
        host.querySelectorAll(".nc-panel").forEach(function (p) {
          p.classList.toggle("oculto", p.dataset.panel !== b.dataset.pes);
        });
      });
    });

    /* Mapa: se reusa el del frente APP si esta disponible; si no, un plano
       sencillo de Colombia con clic. No se duplica la proyeccion. */
    var cont = host.querySelector("#nc-mapa");
    if (cont) { montarMapa(cont); }

    var bc = host.querySelector("#nc-usar-coord");
    if (bc) {
      bc.addEventListener("click", function () {
        var la = parseFloat(f.lat.value), lo = parseFloat(f.lon.value);
        if (isNaN(la) || isNaN(lo) || la < -5 || la > 14 || lo < -82 || lo > -66) {
          alert("Esas coordenadas caen fuera de Colombia. La latitud va de -5 a 14 y la longitud de -82 a -66.");
          return;
        }
        ubicar(la, lo, "coordenadas", "Coordenadas escritas a mano");
      });
    }

    var bm = host.querySelector("#nc-usar-mat");
    if (bm) {
      bm.addEventListener("click", function () {
        var mm = leerMatricula(f.matricula.value);
        var caja = host.querySelector("#nc-cert");
        if (!mm) {
          caja.innerHTML = '<p class="nc-mal">No se reconoce el formato. Una matrícula ' +
            "se escribe como <code>236-12345</code>: tres dígitos de círculo, guion y consecutivo.</p>";
          return;
        }
        estado.matricula = mm;
        if (!mm.oficina) {
          caja.innerHTML = '<p class="nc-mal">Círculo <b>' + esc(mm.circulo) + "</b> no está en " +
            "la tabla de esta demostración. Señala el lote en el mapa.</p>";
          return;
        }
        f.municipio.value = mm.oficina.m;
        f.departamento.value = mm.oficina.d;
        ubicar(mm.oficina.lat, mm.oficina.lon, "matricula",
               "Cabecera de " + mm.oficina.m + " — ajusta en el mapa");
        caja.innerHTML = '<p class="nc-bien">Círculo <b>' + esc(mm.circulo) + "</b> · " +
          esc(mm.oficina.m) + ", " + esc(mm.oficina.d) + ". <b>El mapa quedó en la cabecera " +
          "municipal, no en el lote.</b> Señálalo para tener la geometría.</p>";
      });
    }

    var fi = f.querySelector('input[name="cert"]');
    if (fi) {
      fi.addEventListener("change", function () {
        var arch = fi.files && fi.files[0];
        if (!arch) { return; }
        var caja = host.querySelector("#nc-cert");
        if (/\.pdf$/i.test(arch.name)) {
          caja.innerHTML = '<p class="nc-mal">El PDF no se puede leer en el navegador sin ' +
            "librerías, y este demo no carga ninguna para poder abrirse con doble clic. " +
            "Copia la matrícula del certificado en el campo de arriba, o exporta el " +
            "documento como texto.</p>";
          return;
        }
        var lector = new FileReader();
        lector.onload = function () {
          var d = leerCertificado(String(lector.result || ""));
          estado.cert = d;
          var partes = [];
          if (d.matricula) {
            estado.matricula = d.matricula;
            partes.push("Matrícula <b>" + esc(d.matricula.texto) + "</b>");
            if (d.matricula.oficina) {
              f.municipio.value = d.matricula.oficina.m;
              f.departamento.value = d.matricula.oficina.d;
              partes.push("círculo de " + esc(d.matricula.oficina.m));
              ubicar(d.matricula.oficina.lat, d.matricula.oficina.lon, "certificado",
                     "Cabecera de " + d.matricula.oficina.m + " — ajusta en el mapa");
            }
          }
          if (d.cabida) {
            f.area.value = d.cabida;
            partes.push("cabida <b>" + d.cabida + " ha</b>");
          }
          var html = partes.length
            ? '<p class="nc-bien">Del certificado: ' + partes.join(" · ") + ".</p>"
            : '<p class="nc-mal">No se reconoció matrícula ni cabida en ese archivo.</p>';
          if (d.linderos.length) {
            html += '<div class="nc-linderos"><b>Linderos que declara el documento</b>' +
              "<ul><li>" + d.linderos.map(esc).join("</li><li>") + "</li></ul>" +
              "<p>Nombran vecinos, no coordenadas. Por eso el lindero se señala en el mapa: " +
              "georreferenciar una descripción en prosa exige el catastro del IGAC.</p></div>";
          }
          caja.innerHTML = html;
          validar();
        };
        lector.readAsText(arch);
      });
    }

    f.addEventListener("input", validar);
    f.addEventListener("change", validar);
    f.addEventListener("submit", function (e) { e.preventDefault(); mostrarResultado(); });
    validar();
  }

  /* Mapa de seleccion. Proyeccion equirectangular, la misma idea que 10-mapa.js
     pero autonoma: esta pantalla no debe romperse si aquel cambia. */
  function montarMapa(cont) {
    var CAJA = { lat0: -4.3, lat1: 12.6, lon0: -79.1, lon1: -66.8 };
    var W = 460, H = 620;
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "nc-svg");

    var fondo = document.createElementNS(ns, "rect");
    fondo.setAttribute("width", W); fondo.setAttribute("height", H);
    fondo.setAttribute("fill", "var(--superficie-2)");
    svg.appendChild(fondo);

    /* Silueta de Colombia. Va simplificada a proposito: reconocerla basta para
       ubicarse, y traer cartografia de verdad exigiria una peticion externa que
       rompe el requisito de abrir con doble clic. */
    var CONTORNO = [
      [-77.4,8.6],[-76.9,8.0],[-76.1,9.3],[-75.6,9.4],[-75.3,10.8],[-74.8,11.1],
      [-74.2,11.3],[-73.4,11.3],[-72.4,11.8],[-71.3,12.4],[-71.1,12.0],[-71.9,11.4],
      [-72.5,11.1],[-72.9,10.4],[-72.7,9.4],[-73.4,9.2],[-72.9,8.6],[-72.4,8.0],
      [-72.4,7.4],[-71.1,7.0],[-70.1,6.9],[-69.4,6.1],[-67.9,6.2],[-67.5,5.3],
      [-67.9,4.2],[-67.3,3.4],[-67.9,2.8],[-67.1,2.4],[-66.9,1.2],[-67.3,1.9],
      [-68.2,1.7],[-69.8,1.1],[-69.8,0.6],[-70.1,-0.2],[-70.7,-0.5],[-70.0,-2.7],
      [-70.9,-4.2],[-71.5,-4.5],[-72.9,-2.4],[-73.2,-2.6],[-74.8,-0.2],[-75.3,0.1],
      [-76.4,0.4],[-77.4,0.4],[-78.6,1.3],[-78.9,2.2],[-77.9,3.5],[-77.3,4.1],
      [-77.5,5.6],[-77.4,6.3],[-77.9,7.2],[-77.2,7.9],[-77.4,8.6]
    ];
    var d = CONTORNO.map(function (p, i) {
      var x = (p[0] - CAJA.lon0) / (CAJA.lon1 - CAJA.lon0) * W;
      var y = (1 - (p[1] - CAJA.lat0) / (CAJA.lat1 - CAJA.lat0)) * H;
      return (i ? "L" : "M") + x.toFixed(1) + "," + y.toFixed(1);
    }).join(" ") + " Z";
    var pais = document.createElementNS(ns, "path");
    pais.setAttribute("d", d);
    pais.setAttribute("fill", "var(--superficie)");
    pais.setAttribute("stroke", "var(--borde-fuerte)");
    pais.setAttribute("stroke-width", "1");
    svg.appendChild(pais);

    /* Retícula de un grado: da escala sin necesidad de cartografía. */
    for (var la = -4; la <= 12; la += 2) {
      var y = (1 - (la - CAJA.lat0) / (CAJA.lat1 - CAJA.lat0)) * H;
      var l = document.createElementNS(ns, "line");
      l.setAttribute("x1", 0); l.setAttribute("x2", W);
      l.setAttribute("y1", y); l.setAttribute("y2", y);
      l.setAttribute("stroke", "var(--borde)"); l.setAttribute("stroke-width", ".5");
      svg.appendChild(l);
    }
    for (var lo = -79; lo <= -67; lo += 2) {
      var x = (lo - CAJA.lon0) / (CAJA.lon1 - CAJA.lon0) * W;
      var v = document.createElementNS(ns, "line");
      v.setAttribute("y1", 0); v.setAttribute("y2", H);
      v.setAttribute("x1", x); v.setAttribute("x2", x);
      v.setAttribute("stroke", "var(--borde)"); v.setAttribute("stroke-width", ".5");
      svg.appendChild(v);
    }

    /* Los nueve predios ya evaluados, como referencia de escala. */
    var datos = global.SEEDLLITE_DATOS;
    if (datos && datos.predios) {
      datos.predios.predios.forEach(function (p) {
        var c = document.createElementNS(ns, "circle");
        c.setAttribute("cx", (p.coordenadas.lon - CAJA.lon0) / (CAJA.lon1 - CAJA.lon0) * W);
        c.setAttribute("cy", (1 - (p.coordenadas.lat - CAJA.lat0) / (CAJA.lat1 - CAJA.lat0)) * H);
        c.setAttribute("r", 3);
        c.setAttribute("fill", "var(--borde-fuerte)");
        svg.appendChild(c);
      });
    }

    var marca = document.createElementNS(ns, "g");
    marca.setAttribute("class", "nc-marca");
    marca.style.display = "none";
    var cr = document.createElementNS(ns, "circle");
    cr.setAttribute("r", 7); cr.setAttribute("fill", "none");
    cr.setAttribute("stroke", "var(--acento)"); cr.setAttribute("stroke-width", "2");
    var pt = document.createElementNS(ns, "circle");
    pt.setAttribute("r", 2); pt.setAttribute("fill", "var(--acento)");
    marca.appendChild(cr); marca.appendChild(pt);
    svg.appendChild(marca);

    svg.addEventListener("click", function (ev) {
      var r = svg.getBoundingClientRect();
      var px = (ev.clientX - r.left) / r.width * W;
      var py = (ev.clientY - r.top) / r.height * H;
      var lon = CAJA.lon0 + px / W * (CAJA.lon1 - CAJA.lon0);
      var lat = CAJA.lat0 + (1 - py / H) * (CAJA.lat1 - CAJA.lat0);
      marca.style.display = "";
      cr.setAttribute("cx", px); cr.setAttribute("cy", py);
      pt.setAttribute("cx", px); pt.setAttribute("cy", py);
      ubicar(lat, lon, "mapa", "Señalado en el mapa");
    });

    cont.appendChild(svg);
  }

  /* --- Enganche a la navegacion ---------------------------------------- */
  function quizas() {
    if ((location.hash || "") !== "#nuevo") { return; }
    var host = document.getElementById("vista");
    if (!host || host.querySelector("#nc-form")) { return; }
    pintar(host);
    if (S.tooltips && S.tooltips.enganchar) { S.tooltips.enganchar(host); }
  }

  /* El router de 90-app.js no conoce la ruta #nuevo, asi que cae a #mapa y
     ademas limpia el contenedor en cada navegacion. En vez de tocar su archivo
     —que es del frente APP— se observa el contenedor: cuando queda vacio y el
     hash es #nuevo, esta pantalla se vuelve a pintar. Funciona sin importar el
     orden en que corran los dos scripts, que es lo que rompia la primera
     version: yo pintaba en DOMContentLoaded y el arranque de la app borraba
     justo despues. */
  function observar() {
    var host = document.getElementById("vista");
    if (!host) { return; }
    quizas();
    if ("MutationObserver" in window) {
      new MutationObserver(function () { quizas(); })
        .observe(host, { childList: true });
    }
  }

  window.addEventListener("hashchange", function () { setTimeout(quizas, 30); });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observar);
  } else { observar(); }

  S.nuevoCaso = { leerMatricula: leerMatricula, leerCertificado: leerCertificado,
                  circulos: CIRCULOS };
})(window);
