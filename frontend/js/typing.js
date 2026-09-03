/* ─── TYPING EFFECT ─── */
const texts = [
  'Data & Business Analytics Professional',
  'Power BI · Python · SQL Expert',
  'Turning Data Into Business Decisions',
  'Remote-Ready · Available Globally'
];
let tIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');
function type(){
  const cur = texts[tIdx];
  if(!deleting){
    typedEl.textContent = cur.slice(0, ++cIdx);
    if(cIdx === cur.length){ deleting = true; setTimeout(type, 2000); return; }
  } else {
    typedEl.textContent = cur.slice(0, --cIdx);
    if(cIdx === 0){ deleting = false; tIdx = (tIdx+1) % texts.length; }
  }
  setTimeout(type, deleting ? 40 : 75);
}
setTimeout(type, 800);

