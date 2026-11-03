# Changelog

All notable changes are documented here. The project follows [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-11-03

### Added
- Documentation site (GitHub Pages), API reference, configuration reference and getting-started guide.
- `CONTRIBUTING.md`, `SECURITY.md`, issue templates (English bug reports and comments).
- Automated backend test suite (`npm test`), ESLint for backend and frontend, GitHub Actions CI, CodeQL, Dependabot.
- `.env.example` files.

### Security
- Scholarship review endpoints (`GET/PUT /api/scholarship`, `GET /api/scholarship/:id`) now require admin authentication. Previously applicant data was readable without logging in.
- The auth middleware now answers `401` when no `Authorization: Bearer` header is sent (previously the request hung).
- `GET /api/scholarship-listings/admin/stats` is no longer shadowed by `/:identifier`.

### Fixed
- `GET /api/scholarship/download-form` referenced undefined `path`, `fs` and `__dirname`.

### Removed
- Dead `backend/src/app.js` and the bundled `stripe.exe` binary (install the Stripe CLI separately).
- The unused `dependencies` npm package from both `package.json` files.
