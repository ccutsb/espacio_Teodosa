document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const menuBtn = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  let overlay = null;

  const closeMenu = () => {
    if (!menuBtn || !mainNav) return;
    menuBtn.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("open");
    if (overlay && overlay.parentNode) {
      overlay.remove();
      overlay = null;
    }
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    if (!menuBtn || !mainNav) return;
    menuBtn.setAttribute("aria-expanded", "true");
    mainNav.classList.add("open");
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    overlay.addEventListener("click", closeMenu);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
  };

  if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu();
      else openMenu();
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 720) closeMenu();
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 720) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  const submitBtn = document.getElementById("submit-btn");

  const setFeedback = (message, status) => {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.dataset.status = status;
  };

  if (form && feedback && submitBtn) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const action = form.getAttribute("data-action");
      const payload = new FormData(form);

      setFeedback("Enviando solicitud...", "loading");
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
      form.setAttribute("aria-busy", "true");

      try {
        const response = await fetch(action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: payload
        });

        if (response.ok) {
          setFeedback("Solicitud enviada. Te contactamos pronto.", "success");
          form.reset();
        } else {
          setFeedback("No pudimos enviar el formulario. Intenta por WhatsApp o llamada.", "error");
        }
      } catch (error) {
        setFeedback("Error de red. Revisa tu conexion e intenta nuevamente.", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar solicitud";
        form.removeAttribute("aria-busy");
      }
    });
  }

  const galleryButtons = Array.from(document.querySelectorAll("[data-lightbox]"));
  const galleryTrack = document.querySelector(".gallery-track");
  const galleryPrev = document.querySelector(".gallery-nav-prev");
  const galleryNext = document.querySelector(".gallery-nav-next");
  const galleryDots = document.querySelector(".gallery-dots");

  let activeLightbox = null;
  let activeLightboxIndex = 0;

  const galleryItems = galleryButtons
    .map((button) => ({
      src: button.getAttribute("data-lightbox"),
      alt: button.getAttribute("data-alt") || "Imagen de galeria"
    }))
    .filter((item) => item.src);

  const isMobileGallery = () => window.innerWidth < 720;

  const updateGalleryArrows = () => {
    if (!galleryTrack || !galleryPrev || !galleryNext || !isMobileGallery()) return;
    const maxScroll = galleryTrack.scrollWidth - galleryTrack.clientWidth;
    const current = Math.round(galleryTrack.scrollLeft);
    galleryPrev.disabled = current <= 4;
    galleryNext.disabled = current >= maxScroll - 4;
  };

  const updateGalleryDots = () => {
    if (!galleryTrack || !galleryDots || !isMobileGallery()) return;
    const slide = Math.round(galleryTrack.scrollLeft / Math.max(1, galleryTrack.clientWidth));
    galleryDots.querySelectorAll(".gallery-dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === slide);
    });
  };

  const goToGallerySlide = (index) => {
    if (!galleryTrack || !isMobileGallery()) return;
    const bounded = Math.max(0, Math.min(index, galleryItems.length - 1));
    galleryTrack.scrollTo({ left: bounded * galleryTrack.clientWidth, behavior: "smooth" });
  };

  const initGalleryMobileUI = () => {
    if (!galleryTrack || !galleryPrev || !galleryNext || !galleryDots) return;

    if (!isMobileGallery()) {
      galleryDots.innerHTML = "";
      return;
    }

    if (!galleryDots.children.length) {
      galleryDots.innerHTML = "";
      galleryItems.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.className = "gallery-dot";
        if (index === 0) dot.classList.add("active");
        galleryDots.appendChild(dot);
      });
    }

    updateGalleryArrows();
    updateGalleryDots();
  };

  const closeLightbox = () => {
    if (!activeLightbox) return;
    activeLightbox.remove();
    activeLightbox = null;
    document.body.style.overflow = "";
  };

  const updateLightboxImage = () => {
    if (!activeLightbox || !galleryItems.length) return;
    const img = activeLightbox.querySelector("img");
    const counter = activeLightbox.querySelector(".lightbox-counter");
    const prevBtn = activeLightbox.querySelector(".lightbox-nav-prev");
    const nextBtn = activeLightbox.querySelector(".lightbox-nav-next");
    const data = galleryItems[activeLightboxIndex];

    img.src = data.src;
    img.alt = data.alt;
    if (counter) counter.textContent = `${activeLightboxIndex + 1} / ${galleryItems.length}`;
    if (prevBtn) prevBtn.disabled = activeLightboxIndex === 0;
    if (nextBtn) nextBtn.disabled = activeLightboxIndex === galleryItems.length - 1;
  };

  const moveLightbox = (step) => {
    if (!activeLightbox) return;
    activeLightboxIndex = Math.max(0, Math.min(activeLightboxIndex + step, galleryItems.length - 1));
    updateLightboxImage();
  };

  const openLightbox = (index) => {
    if (!galleryItems.length) return;

    closeLightbox();
    activeLightboxIndex = index;

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");

    const closeBtn = document.createElement("button");
    closeBtn.className = "lightbox-close";
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Cerrar imagen");
    closeBtn.textContent = "×";

    const prevBtn = document.createElement("button");
    prevBtn.className = "lightbox-nav lightbox-nav-prev";
    prevBtn.type = "button";
    prevBtn.setAttribute("aria-label", "Imagen anterior");
    prevBtn.textContent = "‹";

    const nextBtn = document.createElement("button");
    nextBtn.className = "lightbox-nav lightbox-nav-next";
    nextBtn.type = "button";
    nextBtn.setAttribute("aria-label", "Imagen siguiente");
    nextBtn.textContent = "›";

    const img = document.createElement("img");

    const counter = document.createElement("p");
    counter.className = "lightbox-counter";

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", () => moveLightbox(-1));
    nextBtn.addEventListener("click", () => moveLightbox(1));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    lightbox.append(closeBtn, prevBtn, nextBtn, img, counter);
    document.body.appendChild(lightbox);
    document.body.style.overflow = "hidden";
    activeLightbox = lightbox;
    updateLightboxImage();
    closeBtn.focus();
  };

  galleryButtons.forEach((button, index) => {
    button.addEventListener("click", () => openLightbox(index));
  });

  if (galleryTrack && galleryPrev && galleryNext) {
    galleryPrev.addEventListener("click", () => {
      const current = Math.round(galleryTrack.scrollLeft / Math.max(1, galleryTrack.clientWidth));
      goToGallerySlide(current - 1);
    });

    galleryNext.addEventListener("click", () => {
      const current = Math.round(galleryTrack.scrollLeft / Math.max(1, galleryTrack.clientWidth));
      goToGallerySlide(current + 1);
    });

    galleryTrack.addEventListener("scroll", () => {
      updateGalleryArrows();
      updateGalleryDots();
    });

    window.addEventListener("resize", initGalleryMobileUI);
    initGalleryMobileUI();
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if (!activeLightbox) return;
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  });
});
