# Salomé Market

Tienda estática editorial hecha con HTML, CSS y TypeScript, compilada con Vite. Incluye portada de tres productos, colección con tarjeta editorial, botones cápsula con interacción al pasar el cursor, fichas de producto en un diálogo, búsqueda combinada con categorías y pedidos por WhatsApp. No tiene carrito, pagos ni administración.

## Abrir localmente

Desde esta carpeta, con Node.js y npm instalados:

```sh
npm ci
npm run dev
```

Abre la dirección que indique Vite, normalmente `http://localhost:5173`. No abras `index.html` con doble clic: el navegador necesita el servidor de desarrollo para transformar TypeScript.

## Producción

```sh
npm run build
npm run preview
```

La compilación verifica TypeScript y genera el JavaScript y CSS del navegador en `dist/`. La vista previa normalmente está en `http://localhost:4173`. Publica el contenido de `dist/` en la raíz de un alojamiento estático.

## Archivos

- `index.html`: documento, metadatos y entrada de TypeScript.
- `src/main.ts`: composición de las secciones, búsqueda, categorías, navegación móvil y enlaces de WhatsApp.
- `src/style.css`: composición editorial, tarjetas y diseño adaptable a escritorio y móvil.
- `src/styles/actions.css`: botones cápsula, estados de foco e interacción y alternativa con movimiento reducido.
- `src/data/products.ts`: los 14 productos originales y los tres productos añadidos el 17 de noviembre de 2026.
- `public/images/`: 14 imágenes recuperadas y tres fotos nuevas proporcionadas por el usuario, conservando las rutas `/images/`.
- `image-recovery.json`: procedencia y resolución de cada imagen recuperada.

La búsqueda ignora tildes y mayúsculas y se combina con la categoría seleccionada. Cada pedido incluye el nombre exacto del producto. El contacto se configura en `whatsappNumber` dentro de `src/main.ts`; no se imprime en la página.

## Imágenes heredadas

Las imágenes incluyen piezas publicitarias con textos impresos. `frames` en `src/main.ts` define encuadres SVG con recorte explícito para mostrar los productos sin los teléfonos de esas piezas. Se mantienen los nombres y asociaciones del catálogo anterior.

Se encontraron estas inconsistencias previas entre las asociaciones del catálogo y el contenido real de los archivos. No se cambiaron productos, precios ni rutas durante el rediseño:

| Producto del catálogo | Archivo asociado | Contenido de la imagen |
| --- | --- | --- |
| Cargador Aibimy 67W AM-321 | `cargador-45k.webp` | Parlante MY272BTS |
| Power bank MagSafe 20.000 mAh | `powerbank.webp` | Cargador AM-322 |
| Audífonos Bluetooth AM-104 | `audifonos-am104.webp` | Cargador AM-328 |
| Parlante Aibimy MY264BT | `parlante-145k.webp` | Cargador AM-321 |
| Parlante Aibimy MY272BTS | `parlante-165k.webp` | Parlante MY292BTS |
| Parlante Aibimy MY292BTS | `parlante-430k.webp` | Power bank |

Estas seis asociaciones necesitan revisión del material de catálogo. No hay fotos identificables del AM-104 ni del MY264BT entre los recursos disponibles.

## Recuperación del proyecto

La carpeta se reconstruyó a partir del historial de este proyecto después de su eliminación. Se recuperaron cinco imágenes originales completas: `parlante-165k.webp`, `valentino.webp`, `reloj-curren.webp`, `airpods-pro3.webp` y `bharara-rose.webp`. Las otras nueve proceden de las miniaturas de una hoja de contacto archivada; conservan el contenido disponible, pero tienen menor resolución. Para recuperar la nitidez original, reemplázalas por los archivos de mayor calidad con los mismos nombres en `public/images/`. `assets/` conserva una copia del material recuperado.

No se inventaron fotografías para sustituir las que faltaban. Las seis asociaciones inconsistentes de la tabla anterior ya existían en el proyecto y necesitan corregirse con material confirmado del catálogo.

## Referencias visuales

Composición editorial adaptada a la identidad de Salomé Market, con interacción de botones inspirada en [Nixtio](https://nixtio.com/). El CSS de los componentes es propio y no incorpora dependencias de interfaz adicionales.

## Nuevos productos · 17 de noviembre de 2026

- Reloj Curren azul con correa café: $120.000 COP, en Accesorios. La imagen no identifica el número de modelo.
- Parlante Aibimy MY266BTS: $120.000 COP, en Audio. Luces RGB, IPX6 y conexión TWS indicados en la imagen suministrada.

Las tres fotos se guardan en WebP con sus dimensiones originales y se muestran completas. Los tres productos tienen ficha y enlace de pedido por WhatsApp. El catálogo contiene 17 productos.

- Smartwatch Aibimy Watch 002: $135.000 COP, en Tecnología. Pantalla AMOLED, notificaciones inteligentes y modos deportivos indicados en la foto suministrada.

## Publicar en GitHub Pages

1. En Settings → Pages → Build and deployment → Source, seleccionar **GitHub Actions**.
2. Fusionar la rama `codex/catalogo-curren-my266bts` con `main`.
3. Esperar a que el workflow **Publicar Salomé Market** termine correctamente en Actions.
4. Abrir https://miguelangel213.github.io/Salome-Market/.

El workflow ejecuta `npm ci` y `npm run build:pages`, verifica TypeScript y publica `dist/`. Los pull requests solo compilan; la publicación se ejecuta desde `main`. Las fotos usan la base de Vite para funcionar dentro de `/Salome-Market/`.

Para comprobar esa ruta localmente: `npm run build:pages` seguido de `npm run preview -- --base=/Salome-Market/`, y abrir http://127.0.0.1:4173/Salome-Market/.
