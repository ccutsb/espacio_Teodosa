# Espacio Teodosa

Sitio web estatico (GitHub Pages) para sala de ensayo y grabacion en Santiago.

## Stack

- HTML + CSS + JavaScript vanilla
- Sin backend
- Formulario con Formspree

## Mejoras implementadas

- Rediseño mobile-first con design tokens en `:root`
- Hero y CTAs optimizados para conversion
- Seccion de tarifas en pricing cards
- Equipamiento agrupado por categorias
- Galeria en grid con lightbox accesible
- Formulario con estados de carga, exito y error
- Metadatos SEO on-page + JSON-LD
- 4 paginas nuevas para programmatic SEO local
- Sitemap y robots actualizados

## Paginas SEO nuevas

- `sala-de-ensayo-santiago-centro.html`
- `sala-de-ensayo-metro-cumming.html`
- `ensayo-y-grabacion-santiago.html`
- `grabacion-para-bandas-santiago.html`

## Como probar local

Desde la raiz del proyecto puedes levantar un server estatico simple:

```bash
python3 -m http.server 8080
```

Luego abre:

- `http://localhost:8080/`

## Checklist de indexacion (dia 1)

1. Abrir Google Search Console y crear propiedad del sitio.
2. Verificar propiedad (recomendado: prefijo URL).
3. Enviar sitemap: `https://ccutsb.github.io/espacio_Teodosa/sitemap.xml`.
4. Solicitar indexacion de:
   - `/`
   - `/contact.html`
   - las 4 paginas SEO nuevas
5. Revisar cobertura e inspeccion de URL durante la primera semana.

## Deploy

Publicacion por GitHub Pages sobre la rama principal del repositorio.
