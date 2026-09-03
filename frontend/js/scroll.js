/* ─── BACK TO TOP ─── */
const bt = document.getElementById('backTop');
window.addEventListener('scroll', () => bt.classList.toggle('show', window.scrollY > 400), {passive:true});
bt.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

/* ─── INTERSECTION OBSERVER ─── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('visible');
      if(e.target.classList.contains('skill-card')){
        const fill = e.target.querySelector('.skill-fill');
        if(fill) fill.style.width = fill.style.getPropertyValue('--w') || fill.style['--w'];
      }
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-up, .skill-card').forEach(el => io.observe(el));

/* ─── ACTIVE NAV ─── */
const sections = ['hero','about','skills','projects','youtube','contact'];
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if(el && el.getBoundingClientRect().top <= 120) cur = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#'+cur);
  });
}, {passive:true});

/* ─── SKILL BARS ─── */
document.querySelectorAll('.skill-card').forEach(card => {
  const fill = card.querySelector('.skill-fill');
  if(!fill) return;
  card.addEventListener('mouseenter', () => {
    if(!card.classList.contains('visible')){
      fill.style.width = fill.style.getPropertyValue('--w') || '0%';
    }
  });
});
