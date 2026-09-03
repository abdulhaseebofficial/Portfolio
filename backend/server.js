const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = Number(process.env.PORT) || 3000;
const FRONTEND_DIR = path.resolve(__dirname, '..', 'frontend');
const contentTypes = {
  '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8'
};

function sendJson(response, status, payload) {
  response.writeHead(status, { 'Content-Type': contentTypes['.json'] });
  response.end(JSON.stringify(payload));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', chunk => {
      body += chunk;
      if (body.length > 100_000) request.destroy();
    });
    request.on('end', () => {
      try { resolve(JSON.parse(body)); } catch { reject(new Error('Invalid JSON')); }
    });
    request.on('error', reject);
  });
}

async function handleContact(request, response) {
  try {
    const { name, email, subject = '', message } = await readJson(request);
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return sendJson(response, 400, { error: 'Name, email, and message are required.' });
    }
    // Connect an email provider or database here before production deployment.
    console.log(`[contact] ${new Date().toISOString()} | ${name} | ${email} | ${subject}`);
    return sendJson(response, 202, { message: 'Message received successfully.' });
  } catch {
    return sendJson(response, 400, { error: 'Invalid request body.' });
  }
}

function serveFrontend(request, response) {
  const urlPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const requestedPath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const filePath = path.resolve(FRONTEND_DIR, requestedPath);
  if (!filePath.startsWith(`${FRONTEND_DIR}${path.sep}`)) {
    return sendJson(response, 403, { error: 'Forbidden.' });
  }
  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) return sendJson(response, 404, { error: 'Not found.' });
    response.writeHead(200, { 'Content-Type': contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(response);
  });
}

http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/api/health') return sendJson(response, 200, { status: 'ok' });
  if (request.method === 'POST' && request.url === '/api/contact') return handleContact(request, response);
  if (request.method === 'GET' || request.method === 'HEAD') return serveFrontend(request, response);
  return sendJson(response, 405, { error: 'Method not allowed.' });
}).listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}`));
