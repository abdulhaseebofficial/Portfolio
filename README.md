# Abdul Haseeb Portfolio

- `frontend/` contains all HTML, CSS, browser JavaScript, sections, and assets.
- `backend/` contains the Node.js server and API endpoints.

## Run locally

Node.js 18 or newer is required.

```powershell
cd backend
npm start
```

Then open `http://localhost:3000`. API health check: `GET /api/health`.

The contact endpoint validates and accepts messages. Connect an email provider or
database in `backend/server.js` before production deployment.
