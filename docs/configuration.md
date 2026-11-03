---
layout: default
title: Configuration
---

# Configuration reference

*Unofficial class project, not the official Zonta Club of Naples website.*

## Backend environment variables (`backend/.env`)

| Variable | Purpose |
|----------|---------|
| `PORT` | HTTP port (default `3000`) |
| `NODE_ENV` | `development` adds request logging and stack traces in error responses; `production` disables both |
| `FRONTEND_URL` | Used to build Stripe success/cancel redirect URLs |
| `DB_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify admin tokens |
| `JWT_EXPIRE` | Token lifetime (e.g. `7d`), also returned by login as `expiresIn` |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM` | SMTP settings |
| `ADMIN_EMAIL` | Recipient of admin notification emails |
| `STRIPE_SECRET_KEY` | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | File storage |

## Frontend environment variables (`frontend/.env`)

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Base URL of the backend (default `http://localhost:3000`) |

## File uploads

All uploads are `multipart/form-data`, max 5 MB per file, stored in Cloudinary.

| Endpoint | Field name(s) | Allowed types | Limit |
|----------|---------------|---------------|-------|
| `POST /api/scholarship/apply` | `documents` | PDF, DOC, DOCX | 2 files |
| `POST/PUT /api/events` | `image` | JPG, PNG, WEBP | 1 file |
| `POST/PUT /api/products/admin` | `image` | JPG, PNG, WEBP | 1 file |
| `POST/PUT /api/scholarship-listings/admin` | `image` (required on create), `attachment` (optional) | image: JPG/PNG/WEBP; attachment: PDF/DOC/DOCX | 1 each |

## Emails sent by the software (output)

Membership application (applicant + admin), membership approval (with payment link), membership renewal reminder, scholarship application (applicant + admin), event RSVP confirmation, event reminder, contact-form notification, and a contact confirmation to the sender.

## Scheduled jobs (time zone `America/New_York`)

| Time | Job |
|------|-----|
| 08:00 daily | Send reminders for events happening in the next 24 hours |
| 09:00 daily | Check membership renewals and send reminders |

## Process behavior

Handles `SIGTERM`/`SIGINT` with a graceful shutdown (forced exit after 10 s). Uncaught exceptions and unhandled rejections terminate the process with exit code 1.
