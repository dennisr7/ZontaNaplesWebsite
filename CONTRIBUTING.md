# Contributing

This is a student project for a class and is **not** the official Zonta Club of Naples website.

## Language

All bug reports, comments, questions, pull requests and code comments should be written in **English**.

## Reporting a bug

1. Search [existing issues](https://github.com/dennisr7/ZontaNaplesWebsite/issues) first.
2. Open a new issue using the **Bug report** template.
3. Include: what you did, what you expected, what happened, the endpoint or page involved, and your environment (OS, Node.js version, browser).
4. Never post secrets (`.env` values, Stripe keys, JWTs) or other people's personal data.

## Comments, questions and suggestions

Use the **Comment / question / suggestion** issue template. Comments on code can also be left on pull requests or as inline GitHub comments.

## Security issues

Do not open a public issue for vulnerabilities. Use GitHub's "Report a vulnerability" option under the repository's **Security** tab, or contact the maintainers through their GitHub profiles.

## Making changes

```bash
git checkout -b your-feature-name
# make changes
cd backend && npm run lint && npm test
cd ../frontend && npm run lint && npm run build
git commit -am "Describe the change"
git push origin your-feature-name
```

Then open a pull request with a descriptive title. CI (lint, tests, build, `npm audit`, CodeQL) must pass.

### Requirements for acceptable contributions

- **Coding standard:** ESLint is the style and static-analysis standard (`backend/eslint.config.js`, `frontend/eslint.config.js`). Use ES modules, `async/await`, and follow the existing file layout (routes → controllers → models).
- **Tests:** any new or changed functionality (a new endpoint, validation rule or middleware) should include an automated test in `backend/src/tests/*.test.js` (Node's built-in `node:test` runner, run with `npm test`).
- **Documentation:** update `docs/` (and `CHANGELOG.md`) when you change an endpoint, request or response, or environment variable.
- **Security:** never commit secrets; protect admin routes with the `protect` middleware.
- **Licensing:** contributions are accepted under the project's GPL-3.0 license.
- **Review:** at least one maintainer must review a pull request before it is merged.
