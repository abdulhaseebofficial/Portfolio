module.exports = async function contactHandler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, subject = '', message } = request.body || {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return response.status(400).json({
      error: 'Name, email, and message are required.'
    });
  }

  // Connect an email provider or database here before production use.
  console.log(`[contact] ${new Date().toISOString()} | ${name} | ${email} | ${subject}`);
  return response.status(202).json({ message: 'Message received successfully.' });
};
