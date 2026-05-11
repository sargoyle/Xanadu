# Xanadu

Xanadu: Muses of Inspiration is a tabletop card game supported by a local-first development and companion app.

The source of truth lives in:

- `docs/masterplan.md`
- `docs/tasks.md`

## Current Foundation

This repository is intentionally dependency-free for the initial foundation so it can run in the current workspace without installing packages.

Available commands:

```bash
node scripts/validate-data.mjs
node tests/run-tests.mjs
node scripts/dev-server.mjs
```

When the dev server is running, open `http://127.0.0.1:4184`.

## Project Structure

- `data/seed.json`: initial canonical content seed.
- `db/schema.sql`: SQLite-ready schema.
- `public/`: browser app shell.
- `scripts/`: local tooling for dev server, validation, lint, and formatting checks.
- `src/domain/`: domain logic for validation, scoring, manifests, and setup rules.
- `tests/`: Node test runner coverage.
