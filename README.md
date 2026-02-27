# Espacio Teodosa

Sitio web oficial de Espacio Teodosa, sala de ensayo y grabacion en Santiago de Chile.

Proyecto 100% estatico desplegado en GitHub Pages, sin backend, con enfoque en performance, accesibilidad y SEO tecnico desde el dia 1.

## Produccion

- URL: https://ccutsb.github.io/espacio_Teodosa/
- Hosting: GitHub Pages
- Formulario: Formspree (plan gratuito)

## Stack

- HTML5
- CSS3
- JavaScript (vanilla)
- Sin frameworks pesados
- Sin backend

## Objetivos del rediseño

- Mejorar UX/UI con enfoque mobile-first
- Mantener compatibilidad total con GitHub Pages
- Optimizar carga y estabilidad visual
- Mejorar accesibilidad (teclado, foco, jerarquia semantica)
- Implementar SEO on-page y SEO programatico estatico

## Estructura actual del proyecto

```text
espacio_Teodosa/
├── index.html
├── about.html
├── contact.html
├── sala-de-ensayo-santiago-centro.html
├── sala-de-ensayo-metro-cumming.html
├── ensayo-y-grabacion-santiago.html
├── grabacion-para-bandas-santiago.html
├── css/
│   └── style.css
├── js/
│   └── scripts.js
├── assets/
│   ├── fonts/
│   │   ├── ZuumeRough-Regular.woff2
│   │   └── ZuumeRough-Bold.woff2
│   └── img/
│       ├── salaEnsayo.png
│       ├── salaEnsayo.webp
│       ├── salaEnsayo.avif
│       ├── musico.png
│       ├── musico.webp
│       ├── prohibido.png
│       └── prohibido.webp
├── sitemap.xml
└── robots.txt
```

## Cambios principales implementados

### UX/UI

- Sistema visual con design tokens en `:root` (color, spacing, radios, sombras, tipografia).
- Header mejorado con identidad visual de marca.
- Hero optimizado con CTA principal y secundario.
- Fondos decorativos por pagina:
  - Home y Contacto: imagen de musico.
  - Sobre: imagen "prohibido".
- Seccion de servicios en formato pricing cards.
- Equipamiento agrupado por categorias.
- Galeria:
  - Mobile: carrusel horizontal con controles sutiles e indicadores.
  - Desktop: grilla de 3 imagenes visibles.
  - Lightbox navegable con todas las imagenes cargadas.

### Contacto y reservas

- Formulario con Formspree mantenido.
- Estados de UX para envio: cargando, exito y error.
- Acciones rapidas: WhatsApp y llamada.

### Accesibilidad

- `skip-link` al contenido principal.
- `:focus-visible` consistente.
- Mejoras de navegacion por teclado.
- Ajustes de semantica y jerarquia de encabezados.
- `prefers-reduced-motion` soportado.

### SEO tecnico

- Titles y meta descriptions unicos por pagina.
- OpenGraph y Twitter cards.
- Canonical tags correctos.
- JSON-LD en paginas principales y landings.
- Enlazado interno entre paginas relacionadas.
- `sitemap.xml` y `robots.txt` actualizados.

### SEO programatico estatico

Paginas creadas para intencion de busqueda local:

- `sala-de-ensayo-santiago-centro.html`
- `sala-de-ensayo-metro-cumming.html`
- `ensayo-y-grabacion-santiago.html`
- `grabacion-para-bandas-santiago.html`

## Performance

- Imagenes optimizadas (WebP/AVIF) con fallback.
- `preload` de fuentes criticas.
- `preload` de imagen hero.
- Dimensiones explicitas en imagenes para reducir CLS.
- JS simplificado para interaccion de menu, formulario y galeria.
