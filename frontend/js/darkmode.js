/* ─── THEME ─── */
const root = document.documentElement;
const btn = document.getElementById('themeToggle');
let dark = localStorage.getItem('theme') === 'dark';
function applyTheme(){
  if(dark){ root.classList.add('dark'); btn.textContent='☀️'; }
  else{ root.classList.remove('dark'); btn.textContent='🌙'; }
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
applyTheme();
btn.addEventListener('click', () => { dark = !dark; applyTheme(); });

