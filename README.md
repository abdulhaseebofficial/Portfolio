<div align="center">
  <img src="frontend/assets/icons/logo.svg" width="112" alt="Abdul Haseeb logo">

  # Abdul Haseeb — Portfolio

  **Data & Business Analytics professional turning scattered data into clear business decisions.**

  [![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-1B4FD8?style=for-the-badge&logo=vercel&logoColor=white)](https://abdulhaseebkashmiri.vercel.app)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdulhaseebkashmiri/)
  [![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@abdulhaseebkashmiriofficial)

  ![Vercel](https://img.shields.io/badge/deployed_on-Vercel-000?logo=vercel)
  ![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
  ![License](https://img.shields.io/badge/license-MIT-5B82FF)
</div>

## Overview

A responsive portfolio for presenting analytics expertise, professional experience,
selected projects, and contact information. It includes light/dark themes, animated
sections, mobile navigation, and a serverless contact API.

## Highlights

- Responsive, accessible interface for desktop and mobile
- Dark mode with saved user preference
- Animated skill indicators and scroll interactions
- Analytics project showcase with technology tags
- Contact form backed by a validated API endpoint
- SEO and social-sharing metadata
- Automatic production deployments through Vercel

## Technology

| Area | Tools |
| --- | --- |
| Frontend | HTML5, CSS3, vanilla JavaScript |
| Local backend | Node.js HTTP server |
| Production API | Vercel Serverless Functions |
| Hosting | Vercel |
| Version control | Git and GitHub |

## Project structure

```text
portfolio/
├── api/                 # Vercel serverless functions
├── backend/             # Local Node.js server and API
├── frontend/
│   ├── assets/          # Brand assets and images
│   ├── css/             # Component stylesheets
│   ├── js/              # Browser interactions
│   ├── sections/        # Reusable HTML sections
│   └── index.html       # Main page
├── vercel.json          # Production deployment config
└── README.md
```

## Local development

Node.js 18 or newer is required. This project has no third-party runtime dependencies.

```powershell
git clone https://github.com/abdulhaseebofficial/portfolio.git
cd portfolio/backend
npm start
```

Open [http://localhost:3000](http://localhost:3000). For automatic server restarts,
run `npm run dev`.

## API

### `GET /api/health`

Checks the local Node.js server status.

### `POST /api/contact`

Accepts `name`, `email`, `subject`, and `message` as JSON. `name`, `email`, and
`message` are required. Connect the handler to an email provider or database before
using it for production email delivery.

## Deployment

The repository is connected to Vercel. Every push to `main` triggers a production
deployment. The `frontend/` directory is published as the website, while `api/`
contains its serverless endpoint.

## License

Released under the [MIT License](LICENSE).

---

<div align="center">
  Built by <a href="https://github.com/abdulhaseebofficial">Abdul Haseeb</a>
</div>
