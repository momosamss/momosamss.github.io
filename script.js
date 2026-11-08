// ============================================================
//  PORTFOLIO – Mamadou Samassa  |  script.js
// ============================================================

/* ---- Nav scroll effect ---- */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---- Typed text effect ---- */
const roles = [
  'Étudiant BTS CIEL',
  'Administrateur Systèmes & Réseaux',
  'Passionné Cybersécurité',
  'Futur Alternant DevOps',
];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.querySelector('.typed');
function typeLoop() {
  const word = roles[ri];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 50 : 90);
}
typeLoop();

/* ---- Intersection Observer – fade in sections ---- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Trigger progress bars inside this element
      e.target.querySelectorAll('[data-width]').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ---- Count-up stats ---- */
function countUp(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const tick = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    if (start < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(el => {
        countUp(el, parseInt(el.dataset.value), 1600);
      });
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.hero-stats');
if (statsRow) statsObserver.observe(statsRow);

/* ---- Active nav link ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
}, { passive: true });

