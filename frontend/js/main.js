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
const featuredProjectRepos = [
  'https://github.com/abdulhaseebofficial/hostelwallet',
  'https://github.com/abdulhaseebofficial/cv-analyzer-pro',
  'https://github.com/abdulhaseebofficial/query-assistant'
];

document.querySelectorAll('.project-card').forEach((card, index) => {
  const repo = featuredProjectRepos[index];
  if (!repo) return;

  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  card.querySelectorAll('a').forEach(link => {
    link.href = repo;
    link.target = '_blank';
    link.rel = 'noopener';
  });

  card.addEventListener('click', event => {
    if (!event.target.closest('a')) window.open(repo, '_blank', 'noopener');
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter') window.open(repo, '_blank', 'noopener');
  });
});
