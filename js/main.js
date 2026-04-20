  // ── INTRO SCREEN ──
  const introScreen = document.getElementById('intro-screen');
  setTimeout(() => {
    introScreen.classList.add('fade-out');
    setTimeout(() => introScreen.remove(), 1000);
  }, 2000);

  // ── HEADER SCROLL ──
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── PARALLAX ──
  const heroBg = document.getElementById('hero-bg');
  const sepBg  = document.getElementById('separator-bg');
  const sepWrap = document.getElementById('separator-bg-wrap');

  function updateParallax() {
    const sy = window.scrollY;
    // Hero parallax
    heroBg.style.transform = `translateY(${sy * 0.35}px)`;
    // Separator parallax
    const sepTop = sepWrap.getBoundingClientRect().top + sy;
    const sepOff = sy - sepTop;
    if (Math.abs(sepOff) < 1000) {
      sepBg.style.transform = `translateY(${sepOff * 0.3}px)`;
    }
  }
  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();

  // ── FADE-IN ON SCROLL ──
  const fadeEls = document.querySelectorAll('.observe-fade');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => io.observe(el));

  // ── TITLE REVEAL ON SCROLL ──
  const revealEls = document.querySelectorAll('.observe-reveal');
  const ioReveal = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        ioReveal.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  revealEls.forEach(el => ioReveal.observe(el));

  // ── CAROUSEL ──
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  const counter = document.getElementById('counter');
  let current = 0;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    counter.textContent = (current + 1) + ' / ' + slides.length;
    const nameEl = slides[current].querySelector('.slide-name');
    nameEl.classList.remove('slide-name-animate');
    void nameEl.offsetWidth;
    nameEl.classList.add('slide-name-animate');
  }

  document.getElementById('prev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('next').addEventListener('click', () => goTo(current + 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.index)));

  // Touch swipe
  let tx = 0;
  const track = document.getElementById('carousel-track');
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
  }, { passive: true });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // ── PRODUCT MODAL ──
  const PRODUCTS = {
    'Void':     { desc: 'El vacío no es ausencia. Es el espacio donde todo comienza. Esta cadena existe antes que las palabras.', wa: 'https://wa.me/50660062513?text=Hola%2C%20me%20interesa%20el%20dise%C3%B1o%20%2AVoid%2A.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F' },
    'Star':     { desc: 'Cada estrella es una cicatriz del universo. Esta lleva esa misma tensión — pequeña, constante, imposible de ignorar.', wa: 'https://wa.me/50660062513?text=Hola%2C%20me%20interesa%20el%20dise%C3%B1o%20%2AStar%2A.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F' },
    'Monolith': { desc: 'Sólido. Sin disculpas. Hay cosas que no necesitan explicación, solo presencia.', wa: 'https://wa.me/50660062513?text=Hola%2C%20me%20interesa%20el%20dise%C3%B1o%20%2AMonolith%2A.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F' },
    'Static':   { desc: 'El ruido entre frecuencias. Ese momento justo antes de que todo tenga sentido — o de que deje de tenerlo.', wa: 'https://wa.me/50660062513?text=Hola%2C%20me%20interesa%20el%20dise%C3%B1o%20%2AStatic%2A.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F' },
    'Together': { desc: 'Dos mitades que no se buscan, se encuentran. Este brazalete no une, recuerda que ya estabas unido.', wa: 'https://wa.me/50660062513?text=Hola%2C%20me%20interesa%20el%20dise%C3%B1o%20%2ATogether%2A.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F' },
    'Meridian': { desc: 'La línea que divide el día de la noche, lo conocido de lo desconocido. Úsalo en el límite.', wa: 'https://wa.me/50660062513?text=Hola%2C%20me%20interesa%20el%20dise%C3%B1o%20%2AMeridian%2A.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F' },
    'Heart':    { desc: 'No el corazón que siente. El que resiste. El que sigue aunque nadie lo vea latir.', wa: 'https://wa.me/50660062513?text=Hola%2C%20me%20interesa%20el%20dise%C3%B1o%20%2AHeart%2A.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F' },
    'Echo':     { desc: 'Lo que dijiste ya no está, pero su forma permanece. Cada eslabón repite al anterior, sin agotarse.', wa: 'https://wa.me/50660062513?text=Hola%2C%20me%20interesa%20el%20dise%C3%B1o%20%2AEcho%2A.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F' },
    'Snake':    { desc: 'No rastrea, fluye. Se adapta sin perder su forma. Lleva consigo algo antiguo que todavía no tiene nombre.', wa: 'https://wa.me/50660062513?text=Hola%2C%20me%20interesa%20el%20dise%C3%B1o%20%2ASnake%2A.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F' }
  };

  const modal     = document.getElementById('productModal');
  const modalImg  = document.getElementById('modalImg');
  const modalName = document.getElementById('modalName');
  const modalDesc = document.getElementById('modalDesc');
  const modalBtn  = document.getElementById('modalBtn');

  function openModal(name, imgSrc) {
    const p = PRODUCTS[name];
    if (!p) return;
    modalImg.src          = imgSrc;
    modalImg.alt          = name;
    modalName.textContent = name;
    modalDesc.textContent = p.desc;
    modalBtn.href         = p.wa;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  document.querySelectorAll('.slide-img-wrap, .slide-name').forEach(el => {
    el.addEventListener('click', () => {
      const slide = el.closest('.slide');
      const name  = slide.querySelector('.slide-name').textContent.trim();
      const img   = slide.querySelector('img').src;
      openModal(name, img);
    });
  });
