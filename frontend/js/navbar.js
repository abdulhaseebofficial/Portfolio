/* ─── MOBILE MENU ─── */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
const cls = document.getElementById('mobileClose');
ham.addEventListener('click', () => mob.classList.add('open'));
cls.addEventListener('click', () => mob.classList.remove('open'));
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => mob.classList.remove('open')));

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, {passive:true});

