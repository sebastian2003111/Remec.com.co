/* ==========================================================================
   REMEC S.A.S. — JAVASCRIPT UNIFICADO
   Generado a partir de la fusion de los <script> de las 9 paginas
   (index, servicios, filo, AP, arquimidex, artplasma, clientes, galeria,
   contacto). Se cargan los mismos elementos (header, menu hamburguesa,
   scroll-reveal) desde un unico archivo. Las funciones exclusivas de una
   sola pagina (contador de estadisticas y lightbox de galeria) se
   auto-protegen comprobando si sus elementos existen en el DOM, asi que
   el mismo archivo se puede enlazar desde las 9 paginas sin romper nada.

   Estructura:
     1. HEADER — encoger al hacer scroll               (todas las paginas)
     2. MENU HAMBURGUESA / DRAWER MOVIL                 (todas las paginas)
     3. SCROLL REVEAL (animacion de aparicion)          (todas las paginas)
     4. CONTADOR DE ESTADISTICAS (count-up)             (solo index.html)
     5. SCROLL SUAVE CON OFFSET PARA ANCLAS "#..."      (solo index.html)
     6. LIGHTBOX DE GALERIA                             (solo galeria.html)
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. HEADER — encoger al hacer scroll
     ------------------------------------------------------------------------ */
  const header = document.getElementById("siteHeader");
  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        header.classList.toggle("scrolled", window.scrollY > 40);
      },
      { passive: true },
    );
  }

  /* ------------------------------------------------------------------------
     2. MENU HAMBURGUESA / DRAWER MOVIL
     ------------------------------------------------------------------------ */
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuScrim = document.getElementById("menuScrim");

  if (burgerBtn && mobileMenu && menuScrim) {
    function closeMenu() {
      burgerBtn.classList.remove("open");
      mobileMenu.classList.remove("open");
      menuScrim.classList.remove("open");
      burgerBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-locked");
    }
    function toggleMenu() {
      const isOpen = mobileMenu.classList.toggle("open");
      burgerBtn.classList.toggle("open", isOpen);
      menuScrim.classList.toggle("open", isOpen);
      burgerBtn.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-locked", isOpen);
    }
    burgerBtn.addEventListener("click", toggleMenu);
    menuScrim.addEventListener("click", closeMenu);
    mobileMenu
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 860) closeMenu();
    });
  }

  /* ------------------------------------------------------------------------
     3. SCROLL REVEAL (animacion de aparicion)
     NOTA: en el index.html original el umbral (threshold) era 0.18 y en el
     resto de paginas 0.15. Se conserva esa diferencia exacta detectando la
     clase "pg-index" en <body> para no alterar el comportamiento visual de
     ninguna pagina.
     ------------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll(".reveal, .bp-frame");
  if (revealEls.length) {
    const revealThreshold = document.body.classList.contains("pg-index")
      ? 0.18
      : 0.15;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: revealThreshold, rootMargin: "0px 0px -60px 0px" },
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------------------
     4. CONTADOR DE ESTADISTICAS (count-up) — solo existe en index.html
     Se auto-protege: si no hay elementos ".stat-num" en la pagina, no hace
     nada.
     ------------------------------------------------------------------------ */
  const statEls = document.querySelectorAll(".stat-num");
  if (statEls.length) {
    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || "";
          const duration = 1400;
          const start = performance.now();
          function tick(now) {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          countIO.unobserve(el);
        });
      },
      { threshold: 0.6 },
    );
    statEls.forEach((el) => countIO.observe(el));
  }

  /* ------------------------------------------------------------------------
     5. SCROLL SUAVE CON OFFSET PARA ANCLAS "#..." — originalmente solo en
     index.html. Se deja activa en todas las paginas: es inofensiva donde no
     hay anclas coincidentes (si el id no existe en el DOM, el codigo no hace
     nada y el enlace se comporta igual que antes).
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 78;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  /* ------------------------------------------------------------------------
     6. LIGHTBOX DE GALERIA — solo existe en galeria.html
     Se auto-protege: si no existen los elementos del lightbox, no hace nada.
     ------------------------------------------------------------------------ */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll(".g-item img").forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("open");
        document.body.classList.add("menu-locked");
      });
    });
    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.classList.remove("menu-locked");
    }
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }
})();
