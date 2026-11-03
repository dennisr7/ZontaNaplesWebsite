---
layout: default
title: Getting started
---

# Getting started

*Unofficial class project, not the official Zonta Club of Naples website.*

## Prerequisites

- Node.js 18 or newer and npm
- A MongoDB database (local or Atlas)
- For full functionality: a Stripe account (test mode is fine), a Cloudinary account, and an SMTP account

## Install and run

```bash
git clone https://github.com/dennisr7/ZontaNaplesWebsite.git
cd ZontaNaplesWebsite
```

### Backend (port 3000)

```bash
cd backend
npm install
cp .env.example .env    # fill in values; see Configuration
node server.js
```

Check it: `curl http://localhost:3000/health` returns `{"status":"OK","timestamp":"..."}`.

### Frontend (port 5173)

```bash
cd frontend
npm install
cp .env.example .env    # VITE_API_URL=http://localhost:3000
npm run dev
```

The backend only accepts browser requests (CORS with credentials) from `http://localhost:5173`.

### Stripe webhooks (local)

```bash
stripe listen \
  --forward-to localhost:3000/api/donations/webhook \
  --forward-to localhost:3000/api/products/webhook \
  --forward-to localhost:3000/api/membership-payments/webhook
```

Copy the printed signing secret into `STRIPE_WEBHOOK_SECRET`.

### Create an admin user

Set `ADMIN_EMAIL` in `backend/.env`, then run `node src/utils/createAdmin.js` from `backend/`. The script creates the admin user for that email (it prompts before updating an existing one). Use the account to sign in at the frontend login page.

## Project layout

```
backend/
  server.js            Express app, CORS, webhooks, routes, error handling
  src/routes/          URL → controller mapping
  src/controllers/     Request handlers
  src/models/          Mongoose schemas
  src/middleware/      JWT auth (protect), file upload (multer + Cloudinary)
  src/utils/           Email service and templates, cron scheduler
frontend/
  src/pages/           Public pages; src/pages/admin/ for the dashboard
  src/components/      Reusable UI
  src/utils/apiService.js, src/config/api.js   API client
```

## Frontend routes

Public pages include Home, Who We Are, Impact, Zonta Centennial, Membership, Scholarships (and FGCU / STEM / YWPA application forms), Events, Shop and checkout, Donate, FAQ and Contact. A login page gives access to the admin dashboard (members, scholarships, scholarship listings, events, products, orders, donations).

## Next

See the [API reference](api-reference) and [Configuration](configuration).
