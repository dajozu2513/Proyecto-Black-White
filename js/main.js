  // ── INTRO SCREEN ──
  const introScreen = document.getElementById('intro-screen');
  if (sessionStorage.getItem('introSeen')) {
    introScreen.remove();
  } else {
    sessionStorage.setItem('introSeen', '1');
    setTimeout(() => {
      introScreen.classList.add('fade-out');
      setTimeout(() => introScreen.remove(), 1000);
    }, 2000);
  }

  // ── HEADER SCROLL ──
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── PARALLAX ──
  const heroBg = document.getElementById('hero-bg');

  let rafPending = false;
  function updateParallax() {
    heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    rafPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(updateParallax);
    }
  }, { passive: true });
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
    'Void':     { desc: 'El eslabón más honesto que existe, sin ruido ni adornos. Solo la forma en su estado más puro. Existir así de claro es casi un acto de rebeldía.', wa: 'https://wa.me/50660062513?text=Hola%2C%20tengo%20inter%C3%A9s%20en%20la%20cadena%20*Void*.%20Quisiera%20una%20pieza%3A%20' },
    'Star':     { desc: 'Pequeña, constante, imposible de ignorar. Lleva esa misma tensión del universo que no necesita volumen para hacerse sentir.', wa: 'https://wa.me/50660062513?text=Hola%2C%20tengo%20inter%C3%A9s%20en%20la%20cadena%20*Star*.%20Quisiera%20una%20pieza%3A%20' },
    'Monolith': { desc: 'Hay cosas que no piden permiso para existir. Esta cadena es una de ellas. Sólida, sin disculpas, sin necesidad de explicación.', wa: 'https://wa.me/50660062513?text=Hola%2C%20tengo%20inter%C3%A9s%20en%20la%20cadena%20*Monolith*.%20Quisiera%20una%20pieza%3A%20' },
    'Static':   { desc: 'El momento exacto antes de que todo tenga sentido o deje de tenerlo. Esa frecuencia entre el orden y el caos, hecha acero.', wa: 'https://wa.me/50660062513?text=Hola%2C%20tengo%20inter%C3%A9s%20en%20la%20cadena%20*Static*.%20Quisiera%20una%20pieza%3A%20' },
    'Together': { desc: 'Dos hilos que no se buscan, se encuentran. No se necesitan para existir, pero juntos dicen algo que ninguno puede decir solo.', wa: 'https://wa.me/50660062513?text=Hola%2C%20tengo%20inter%C3%A9s%20en%20la%20cadena%20*Together*.%20Quisiera%20una%20pieza%3A%20' },
    'Meridian': { desc: 'La línea que separa lo conocido de lo que aún no tiene nombre. Precisa, inevitable, imposible de ignorar.', wa: 'https://wa.me/50660062513?text=Hola%2C%20tengo%20inter%C3%A9s%20en%20la%20cadena%20*Meridian*.%20Quisiera%20una%20pieza%3A%20' },
    'Heart':    { desc: 'No el corazón que siente. El que resiste. El que sigue latiendo aunque nadie lo vea, aunque nadie lo escuche.', wa: 'https://wa.me/50660062513?text=Hola%2C%20tengo%20inter%C3%A9s%20en%20la%20cadena%20*Heart*.%20Quisiera%20una%20pieza%3A%20' },
    'Echo':     { desc: 'Lo que dijiste ya no está pero su forma permanece. Cada eslabón repite al anterior sin agotarse, sin olvidar.', wa: 'https://wa.me/50660062513?text=Hola%2C%20tengo%20inter%C3%A9s%20en%20la%20cadena%20*Echo*.%20Quisiera%20una%20pieza%3A%20' },
    'Snake':    { desc: 'No rastrea. Fluye. Lleva consigo algo antiguo que todavía no tiene nombre, y probablemente nunca lo necesite.', wa: 'https://wa.me/50660062513?text=Hola%2C%20tengo%20inter%C3%A9s%20en%20la%20cadena%20*Snake*.%20Quisiera%20una%20pieza%3A%20' }
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
