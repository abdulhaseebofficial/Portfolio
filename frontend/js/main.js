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
