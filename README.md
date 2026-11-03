# Zonta Club of Naples Website

> **Disclaimer:** This is **not** the official Zonta Club of Naples website. It is a student project built for a university class. It is not affiliated with, endorsed by, or operated by Zonta International or the Zonta Club of Naples.

**Group members:** Dennis Ray, Brian Velazquez, Esmir Ramirez, Joshua Martin, Suhaib Farah

📖 **Documentation site (GitHub Pages):** https://dennisr7.github.io/ZontaNaplesWebsite/

## What this software is

A full-stack web application for a Zonta-style service club:

| Part | Stack | Directory |
|------|-------|-----------|
| Frontend (public site and admin dashboard) | React 19, Vite, Tailwind CSS | `frontend/` |
| Backend (REST API) | Node.js, Express 5, MongoDB (Mongoose) | `backend/` |
| Integrations | Stripe (payments), Cloudinary (uploads), Nodemailer (email) | `backend/src/` |

Features: membership applications and dues payment, scholarship listings and applications, events with RSVPs, donations, a merchandise shop, a contact form, and an admin dashboard.

## Documentation

- [Getting started](docs/getting-started.md): install, configure, run
- [API reference](docs/api-reference.md): every HTTP endpoint, with inputs and outputs
- [Configuration reference](docs/configuration.md): environment variables, file uploads, emails, scheduled jobs
- [Contributing](CONTRIBUTING.md): how to report bugs and make comments (in English)

## Quick start

Requires Node.js 18+, a MongoDB database, and (for full functionality) Stripe, Cloudinary and SMTP credentials.

```bash
git clone https://github.com/dennisr7/ZontaNaplesWebsite.git
cd ZontaNaplesWebsite

# Backend: http://localhost:3000
cd backend
npm install
cp .env.example .env     # then fill in the values
node server.js

# Frontend: http://localhost:5173 (in a second terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend scripts: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`.

## Reporting bugs and comments

Please open a [GitHub issue](https://github.com/dennisr7/ZontaNaplesWebsite/issues/new/choose). Issues, pull requests and code comments are accepted **in English**. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE).
