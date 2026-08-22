 /**
  * ============================================
  *   JAVASCRIPT INICIO
  * ============================================
  */
 
 // header shrink on scroll
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, {passive:true});

  // hamburger / mobile drawer
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuScrim = document.getElementById('menuScrim');

  function closeMenu(){
    burgerBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    menuScrim.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded','false');
    document.body.classList.remove('menu-locked');
  }
  function toggleMenu(){
    const isOpen = mobileMenu.classList.toggle('open');
    burgerBtn.classList.toggle('open', isOpen);
    menuScrim.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-locked', isOpen);
  }
  burgerBtn.addEventListener('click', toggleMenu);
  menuScrim.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth >= 860) closeMenu(); });

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal, .bp-frame');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.18, rootMargin:'0px 0px -60px 0px'});
  revealEls.forEach(el => io.observe(el));

  // count-up stats
  const statEls = document.querySelectorAll('.stat-num');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now){
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, {threshold:0.6});
  statEls.forEach(el => countIO.observe(el));

  // smooth-scroll offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 78;
      window.scrollTo({top:y, behavior:'smooth'});
    });
  });


   /**
  * ============================================
  *   JAVASCRIPT SERVICIOS
  * ============================================
  */