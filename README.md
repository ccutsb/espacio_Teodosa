# Espacio Teodosa

Sitio web oficial de **Espacio Teodosa**, sala de ensayo y grabación ubicada en Santiago de Chile.  
El sitio presenta los servicios, equipamiento, normas de uso y facilita el contacto y las reservas mediante WhatsApp y formulario web.

---

## Características

- Diseño responsive (mobile, tablet y desktop)
- Navegación clara con menú adaptativo
- Integración directa con WhatsApp para contacto y reservas
- Galería de imágenes con lightbox y carrusel en dispositivos móviles
- Formulario de contacto con validación y envío mediante AJAX
- Mapa interactivo integrado con Google Maps
- Estética oscura con animaciones y transiciones suaves
- Normas de uso claramente visibles
- Optimización de rendimiento y accesibilidad

---

## Estructura del Proyecto

```
espacioTeodosa/
├── index.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── scripts.js
└── assets/
    ├── fonts/
    └── img/
```

---

## Tecnologías Utilizadas

- HTML5
- CSS3 (uso de variables personalizadas)
- JavaScript (sin frameworks)
- Fuentes personalizadas (Zuum Rough)
- Google Maps
- Formspree (gestión de formularios sin backend)

---

## Configuración

### Formulario de Contacto

El formulario utiliza **Formspree** para el envío de mensajes sin backend.

El endpoint de Formspree se define en el atributo `data-action` del formulario y es consumido mediante JavaScript al momento del envío, permitiendo:

- Validación previa de campos
- Envío asincrónico (AJAX)
- Feedback visual al usuario

---

## Despliegue (Deployment)

El sitio está preparado para ser desplegado utilizando **GitHub Pages**, lo que permite:

- Hosting gratuito
- Acceso público desde cualquier parte de internet
- HTTPS automático
- Posibilidad de configurar un **dominio personalizado**

---

## Optimización

### Rendimiento

- Lazy loading de imágenes
- Preload de fuentes críticas
- Dimensiones explícitas en imágenes para evitar layout shift
- Animaciones optimizadas para GPU
- Reducción de reflow y repaint
- JavaScript liviano sin dependencias externas

### Accesibilidad

- Navegación mediante teclado
- Uso de atributos ARIA
- Contraste adecuado de colores
- Textos alternativos en imágenes
- Títulos descriptivos en iframes

---

## Navegación del Sitio

- **Inicio:** Servicios, equipamiento y galería
- **Sobre:** Información del espacio
- **Contacto:** Formulario de contacto y ubicación

---

## Responsive Design

Optimizado para:

- **Móviles:** < 600px
- **Tablets:** 600px – 1023px
- **Desktop:** ≥ 1024px

---

## Navegadores Soportados

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

---

## Autor

Desarrollado por **Cristian Cortés**  
Proyecto web informativo realizado para Espacio Teodosa.

---

## Licencia

Este proyecto se distribuye bajo la licencia **MIT**.

Se permite el uso, copia, modificación y distribución del código, siempre que se incluya el aviso de copyright y la licencia original.