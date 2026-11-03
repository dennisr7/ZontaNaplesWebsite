# Security Policy

This is a student/class project and **not** the official Zonta Club of Naples website. We still take security reports seriously.

## Supported versions

Only the latest release and the `main` branch receive security fixes.

## Reporting a vulnerability

**Do not open a public issue for security problems.**

Use GitHub's private reporting: go to the repository's **Security** tab → **Report a vulnerability**
(https://github.com/dennisr7/ZontaNaplesWebsite/security/advisories/new). Reports must be written in English.

Please include the affected endpoint or file, steps to reproduce, and the impact.

## What to expect

- Acknowledgement within **14 days** (usually sooner).
- Medium or higher severity vulnerabilities are fixed within **60 days** of being confirmed, and credited in the release notes unless you prefer otherwise.
- Public disclosure happens after a fix is released.

## Secure development practices

- Passwords are hashed with bcrypt; admin API access uses signed, expiring JWTs.
- Secrets are read from environment variables and never committed (`.env` is git-ignored; see `.env.example`).
- Uploads are limited by type and size; payments are handled by Stripe, and webhooks verify Stripe signatures. No card data touches this software.
- CI runs ESLint, the test suite, `npm audit`, and CodeQL static analysis on every push and pull request; Dependabot proposes dependency updates.
- All data is exchanged with the project over HTTPS (GitHub, npm, Stripe, Cloudinary). Deployments must serve the site over HTTPS.
