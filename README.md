# Learn Paths

Three authored learning paths (Next.js mastery, Data structures in practice, Systems thinking) with a short
summary, module count, time and level each. Search by title, category or summary, filter by category, and mark a
path as started. Static demo content kept in the code; the started marks last only for the current page view.

Live: https://learn.bookchaowalit.com (deployed by Vercel CLI; it can lag `main`, see `PRODUCT.md`).

## What it does not do

- No lessons or modules behind the paths, no resource links, prerequisite mapping, custom paths or saved progress.
  No account or sync.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: path filter/toggle logic, MCP route, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (lint, typecheck, tests with a line-coverage gate,
build) and the shared security scan on every push and PR to `main`.

## Code map

- `lib/learn.ts`: the authored paths plus `filterTracks` and `toggleStarted` (used by the page and the MCP route).
- `app/api/mcp/route.ts`: stateless JSON-RPC endpoint with `get_all`, `get_by_id` and `search` over the same paths.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when
  `NEXT_PUBLIC_SENTRY_DSN` is unset.
- `app/more-projects/page.tsx`: shared portfolio link page (copied per repository, not a package).
