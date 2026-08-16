# Landing pública y despliegue

`vercel.json` es JSON estricto y no admite comentarios, así que la documentación del
despliegue vive aquí.

## Qué se despliega

Sitio **estático, sin build y sin instalación de dependencias**. Vercel sirve el repositorio
tal como está: la landing en la raíz del dominio y la aplicación completa bajo `/app/`.

| URL | Sirve |
|---|---|
| `/` | `landing/index.html` |
| `/app` y `/app/` | `index.html` de la raíz, es decir la app |
| `/app/assets/*` | `assets/*` |
| `/app/data/*` | `data/*` |
| cualquier otra ruta | el archivo real del repositorio |

La app carga `data/datos.js` y `assets/*.js` con **rutas relativas**, por eso se sirve desde
un directorio y no reescrita a la raíz: estando en `/app/`, el navegador resuelve
`assets/90-app.js` como `/app/assets/90-app.js`, y la ruta lo manda al archivo real. Las dos
formas quedan cubiertas, con barra final y sin ella, para no depender de cómo normalice
Vercel la URL.

### Por qué `routes` y no `rewrites`

Es la única parte no obvia de la configuración. Vercel evalúa el **sistema de archivos antes
que las reescrituras**: como en la raíz del repositorio existe un `index.html` real, que es
la app, una regla `rewrites` para `/` nunca llegaría a dispararse y el dominio abriría la
app en lugar de la landing. Las `routes` clásicas se evalúan **antes** del sistema de
archivos, y el marcador `{ "handle": "filesystem" }` decide en qué punto entra este. Por eso
el archivo usa `routes`, y por eso no puede usar a la vez `rewrites`, `redirects`, `headers`
ni `cleanUrls`: Vercel prohíbe mezclar las dos gramáticas. Las cabeceras van dentro de la
primera ruta con `"continue": true`.

## Estructura de carpetas que espera

```
seedllite-motor/            raíz del repositorio y del despliegue
├── vercel.json             esta configuración
├── index.html              la APP (no se toca, se sirve bajo /app/)
├── assets/                 app.css y los 4 scripts numerados de la app
├── data/                   datos.js, predios.json, series_ndvi.json, dictamenes.json
└── landing/
    ├── index.html          la landing pública, autocontenida
    └── LEEME.md            este archivo
```

## Comando exacto para desplegar

Desde la **raíz del repositorio**, no desde `landing/`:

```bash
npx vercel@latest login        # solo la primera vez
npx vercel@latest link         # solo la primera vez, crea .vercel/
npx vercel@latest --prod       # despliega a producción
```

Si se conecta por GitHub en lugar de la CLI, en la importación hay que dejar:
Framework Preset **Other**, Build Command **vacío**, Output Directory **vacío**,
Install Command **vacío**. El `vercel.json` ya fija `framework`, `buildCommand` e
`installCommand` en `null`, de modo que no se dispara ningún build.

## Comprobaciones antes de entregar

1. `/` muestra la landing y no el mapa de la app.
2. `/app/` abre la app con sus estilos, sus datos y su mapa. Si sale sin estilos, la
   reescritura de `assets` no está aplicando.
3. El botón "Abrir la aplicación" de la landing apunta a `/app/`. Bajo `file://` esa ruta
   no existe: para revisar en local se abre `index.html` de la raíz con doble clic, que es
   como funciona la app fuera del despliegue.
4. `.env` está en `.gitignore`, así que no se sube ni por CLI ni por integración de GitHub.
   Vale la pena confirmarlo en el listado de archivos del despliegue.

## Landing

`landing/index.html` no enlaza `assets/app.css` a propósito: lleva su CSS embebido y ningún
recurso externo, ni fuentes, ni scripts, ni peticiones de red. Así se puede desplegar sola,
abrir con doble clic y sobrevivir a cualquier cambio en la app.
