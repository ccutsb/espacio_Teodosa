document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
  
    const menuBtn = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    let navOverlay = null;
    
    const createOverlay = () => {
      if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
      }
      return navOverlay;
    };
    
    const openMenu = () => {
      if (window.innerWidth < 720) {
        menuBtn.setAttribute('aria-expanded', 'true');
        mainNav.style.display = 'block';
        const overlay = createOverlay();
        overlay.style.display = 'block';
        requestAnimationFrame(() => {
          overlay.classList.add('active');
        });
        document.body.style.overflow = 'hidden';
      }
    };
    
    const closeMenu = () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      if (navOverlay) {
        navOverlay.classList.remove('active');
        setTimeout(() => {
          navOverlay.style.display = 'none';
        }, 300);
      }
      mainNav.style.display = 'none';
      document.body.style.overflow = '';
    };
    
    if (menuBtn && mainNav) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        if (expanded) {
          closeMenu();
        } else {
          openMenu();
        }
      });
      
      mainNav.addEventListener('click', (e) => {
        e.stopPropagation();
      });
      
      document.addEventListener('click', (e) => {
        if (window.innerWidth < 720 && 
            navOverlay && 
            navOverlay.classList.contains('active') &&
            !mainNav.contains(e.target) && 
            !menuBtn.contains(e.target) &&
            e.target === navOverlay) {
          closeMenu();
        }
      });
      
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 720) {
          closeMenu();
        }
      });
    }
  
    document.querySelectorAll('.accordion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.accordion-btn').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          b.nextElementSibling.style.display = 'none';
        });
        if (!expanded) {
          btn.setAttribute('aria-expanded', 'true');
          btn.nextElementSibling.style.display = 'block';
        } else {
          btn.setAttribute('aria-expanded', 'false');
          btn.nextElementSibling.style.display = 'none';
        }
      });
    });
  
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        feedback.textContent = 'Enviando...';
        const data = new FormData(form);
        try {
          const formAction = form.getAttribute('data-action') || form.action;
          const res = await fetch(formAction, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
          });
          if (res.ok) {
            feedback.textContent = 'Solicitud enviada. Te contactamos pronto.';
            form.reset();
          } else {
            feedback.textContent = 'No se pudo enviar. Intenta por teléfono o WhatsApp.';
          }
        } catch (err) {
          feedback.textContent = 'Error de conexión. Revisa tu conexión e intenta de nuevo.';
        }
      });
    }
  
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 720 && menuBtn && mainNav) {
          menuBtn.setAttribute('aria-expanded', 'false');
          mainNav.style.display = 'none';
          if (navOverlay) {
            navOverlay.style.display = 'none';
          }
          document.body.style.overflow = '';
        }
      });
    });
  
    // Lightbox para imágenes
    let currentLightboxOverlay = null;
    let currentEscHandler = null;
    
    const closeLightbox = () => {
      if (currentLightboxOverlay && document.body.contains(currentLightboxOverlay)) {
        // Remover el overlay
        document.body.removeChild(currentLightboxOverlay);
        // Restaurar el scroll SIEMPRE
        document.body.style.overflow = '';
        // También restaurar en html por si acaso
        document.documentElement.style.overflow = '';
        // Remover el event listener
        if (currentEscHandler) {
          document.removeEventListener('keydown', currentEscHandler);
          currentEscHandler = null;
        }
        currentLightboxOverlay = null;
      }
    };
    
    const openLightbox = (src, alt) => {
      // Cerrar cualquier lightbox abierto previamente
      closeLightbox();
      
      const overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Vista ampliada de imagen');
      
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt || 'Imagen de la galería';
      img.className = 'lightbox-img';
      
      // Estilos inline para asegurar visibilidad
      img.style.display = 'block';
      img.style.opacity = '1';
      img.style.visibility = 'visible';
      img.style.position = 'relative';
      img.style.zIndex = '10001';
      
      img.onload = () => {
        // Asegurar que la imagen esté visible después de cargar
        img.style.display = 'block';
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        // Forzar repaint
        void img.offsetHeight;
      };
      
      img.onerror = () => {
        overlay.innerHTML = '<p style="color: var(--brand-1); font-size: 1.2rem; text-align: center; padding: 2rem;">Error al cargar la imagen</p>';
      };
      
      overlay.appendChild(img);
      
      // Forzar que el overlay muestre la imagen
      overlay.style.display = 'flex';
      overlay.style.visibility = 'visible';
      
      // Función para cerrar
      const handleClose = (e) => {
        // Cerrar si se hace click en el overlay (fondo) o en la imagen
        if (e.target === overlay || e.target === img) {
          e.preventDefault();
          e.stopPropagation();
          closeLightbox();
        }
      };
      
      overlay.addEventListener('click', handleClose);
      
      // Handler para tecla Escape
      currentEscHandler = (ev) => {
        if (ev.key === 'Escape' && document.body.contains(overlay)) {
          ev.preventDefault();
          ev.stopPropagation();
          closeLightbox();
        }
      };
      
      document.addEventListener('keydown', currentEscHandler);
      
      // Guardar referencia
      currentLightboxOverlay = overlay;
      
      // Agregar al DOM
      document.body.appendChild(overlay);
      
      // Bloquear scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Forzar reflow y asegurar que la imagen se muestre
      requestAnimationFrame(() => {
        void overlay.offsetHeight;
        img.style.display = 'block';
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        overlay.style.display = 'flex';
        overlay.style.visibility = 'visible';
        
        // En mobile, centrar la imagen verticalmente
        if (window.innerWidth < 720) {
          // Esperar a que la imagen se cargue completamente
          if (img.complete) {
            centerImageInOverlay();
          } else {
            img.addEventListener('load', centerImageInOverlay, { once: true });
          }
        }
      });
      
      // Función para centrar la imagen en el overlay
      const centerImageInOverlay = () => {
        requestAnimationFrame(() => {
          const overlayHeight = overlay.offsetHeight;
          const imgHeight = img.offsetHeight;
          if (imgHeight < overlayHeight) {
            // Si la imagen es más pequeña que el overlay, centrarla
            overlay.scrollTop = 0;
          } else {
            // Si la imagen es más grande, centrarla
            overlay.scrollTop = (imgHeight - overlayHeight) / 2;
          }
        });
      };
    };

    // Carrusel de galería
    const carousel = document.querySelector('.gallery-carousel');
    if (carousel) {
      const track = carousel.querySelector('.carousel-track');
      const items = Array.from(carousel.querySelectorAll('.gallery-item'));
      const prevBtn = carousel.querySelector('.carousel-btn-prev');
      const nextBtn = carousel.querySelector('.carousel-btn-next');
      const indicatorsContainer = carousel.querySelector('.carousel-indicators');
      
      let currentIndex = 0;
      let itemsPerView = 1;
      let touchStartX = 0;
      let touchEndX = 0;
      let isTransitioning = false;

      // Calcular items por vista según el tamaño de pantalla
      const updateItemsPerView = () => {
        const width = window.innerWidth;
        if (width >= 1100) {
          itemsPerView = 3;
        } else if (width >= 720) {
          itemsPerView = 2;
        } else {
          itemsPerView = 1;
        }
        updateCarousel();
      };

      // Crear indicadores
      const createIndicators = () => {
        indicatorsContainer.innerHTML = '';
        const totalSlides = Math.ceil(items.length / itemsPerView);
        for (let i = 0; i < totalSlides; i++) {
          const indicator = document.createElement('button');
          indicator.className = 'carousel-indicator';
          indicator.setAttribute('role', 'tab');
          indicator.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
          indicator.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
          indicator.addEventListener('click', () => goToSlide(i));
          indicatorsContainer.appendChild(indicator);
        }
        updateIndicators();
      };

      // Actualizar indicadores
      const updateIndicators = () => {
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        const activeIndicator = Math.floor(currentIndex / itemsPerView);
        indicators.forEach((ind, i) => {
          if (i === activeIndicator) {
            ind.classList.add('active');
            ind.setAttribute('aria-selected', 'true');
          } else {
            ind.classList.remove('active');
            ind.setAttribute('aria-selected', 'false');
          }
        });
      };

      // Actualizar posición del carrusel
      const updateCarousel = () => {
        if (isTransitioning) return;
        const totalSlides = Math.ceil(items.length / itemsPerView);
        currentIndex = Math.min(currentIndex, totalSlides - 1);
        const translateX = -(currentIndex * (100 / itemsPerView));
        track.style.transform = `translateX(${translateX}%)`;
        updateButtons();
        updateIndicators();
      };

      // Actualizar estado de los botones
      const updateButtons = () => {
        const totalSlides = Math.ceil(items.length / itemsPerView);
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalSlides - 1;
      };

      // Ir a una slide específica
      const goToSlide = (index) => {
        if (isTransitioning) return;
        const totalSlides = Math.ceil(items.length / itemsPerView);
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        updateCarousel();
      };

      // Slide siguiente
      const nextSlide = () => {
        if (isTransitioning) return;
        const totalSlides = Math.ceil(items.length / itemsPerView);
        if (currentIndex < totalSlides - 1) {
          currentIndex++;
          updateCarousel();
        }
      };

      // Slide anterior
      const prevSlide = () => {
        if (isTransitioning) return;
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      };

      // Event listeners para botones
      prevBtn.addEventListener('click', prevSlide);
      nextBtn.addEventListener('click', nextSlide);

      // Navegación por teclado
      carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        } else if (e.key === 'ArrowRight') {
        e.preventDefault();
          nextSlide();
        }
      });

      // Soporte touch/swipe
      track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
      }, { passive: true });

      const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      };

      // Prevenir transición durante el swipe
      track.addEventListener('transitionstart', () => {
        isTransitioning = true;
      });

      track.addEventListener('transitionend', () => {
        isTransitioning = false;
      });

      // Click en imágenes para abrir lightbox
      // Solo abrir lightbox si no se está haciendo click en los botones
      items.forEach(item => {
        item.addEventListener('click', (e) => {
          // No abrir lightbox si se hace click en los botones del carrusel
          if (e.target.closest('.carousel-btn')) {
            return;
          }
          e.preventDefault();
          const src = item.getAttribute('href');
          const alt = item.querySelector('img')?.alt || '';
          openLightbox(src, alt);
        });
      });
      
      // Asegurar que los botones tengan prioridad sobre el click de la imagen
      [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      });

      // Inicializar
      updateItemsPerView();
      createIndicators();
      updateButtons();

      // Actualizar en resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
          const oldItemsPerView = itemsPerView;
          updateItemsPerView();
          if (oldItemsPerView !== itemsPerView) {
            createIndicators();
        }
      }, 250);
    });

      // Hacer el carrusel enfocable para navegación por teclado
      carousel.setAttribute('tabindex', '0');
    }
  });
  