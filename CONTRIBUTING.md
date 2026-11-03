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
cd frontend && npm run lint
git commit -am "Describe the change"
git push origin your-feature-name
```

Then open a pull request with a descriptive title. Update the documentation in `docs/` if you change an endpoint, request body, response or environment variable.
