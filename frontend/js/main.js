/* ─── CONTACT FORM ─── */
async function handleSubmit(e){
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('fname').value,
        email: document.getElementById('femail').value,
        subject: document.getElementById('fsubject').value,
        message: document.getElementById('fmessage').value
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Unable to send message.');
    success.textContent = 'Message received! I will reply within 24 hours.';
    success.style.display = 'block';
    btn.textContent = 'Sent!';
    e.target.reset();
  } catch (error) {
    success.textContent = error.message;
    success.style.display = 'block';
    btn.textContent = 'Try Again';
  } finally {
    btn.disabled = false;
  }
}

/* ─── FEATURED PROJECT LINKS ─── */
const featuredProjects = [
  { repo: 'https://github.com/abdulhaseebofficial/hostelwallet', live: 'https://hostelwallet.vercel.app' },
  { repo: 'https://github.com/abdulhaseebofficial/cv-analyzer-pro', live: 'https://cv-analyzer-pro-sigma.vercel.app' },
  { repo: 'https://github.com/abdulhaseebofficial/query-assistant', live: 'https://sql-assistant-ai.vercel.app' }
];

document.querySelectorAll('.project-card').forEach((card, index) => {
  const project = featuredProjects[index];
  if (!project) return;

  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  const titleLink = card.querySelector('.project-title a');
  const liveLink = card.querySelector('.project-link.primary');
  const repoLink = card.querySelector('.project-link.secondary');
  if (titleLink) titleLink.href = project.repo;
  if (liveLink) liveLink.href = project.live;
  if (repoLink) repoLink.href = project.repo;
  [titleLink, liveLink, repoLink].filter(Boolean).forEach(link => {
    link.target = '_blank';
    link.rel = 'noopener';
  });

  card.addEventListener('click', event => {
    if (!event.target.closest('a')) window.open(project.repo, '_blank', 'noopener');
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter') window.open(project.repo, '_blank', 'noopener');
  });
});
