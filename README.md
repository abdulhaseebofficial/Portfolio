# Abdul Haseeb Portfolio

- `frontend/` contains all HTML, CSS, browser JavaScript, sections, and assets.
- `backend/` contains the Node.js server and API endpoints.
- `api/` contains the serverless contact endpoint used by Vercel.

## Run locally

Node.js 18 or newer is required.

```powershell
cd backend
npm start
```

Then open `http://localhost:3000`. API health check: `GET /api/health`.

The contact endpoint validates and accepts messages. Connect an email provider or
database in `backend/server.js` before production deployment.

## Deploy to Vercel

The root `vercel.json` publishes `frontend/` and Vercel automatically serves the
serverless function at `POST /api/contact`.
