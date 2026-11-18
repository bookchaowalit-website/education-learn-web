# Learn Paths — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `learn`) on 2026-10-23.

## What it is

A client-side demo of a learning-path index over three hard-coded paths: Next.js mastery, Data structures in
practice and Systems thinking.

## Who it is for

A portfolio visitor who wants to see a calm, editorial list UI with search, a category filter and a start toggle.

## What works today

1. Search title, category or summary (case-insensitive) and filter by All, Frontend, Data or Systems.
2. Open a page per path (`/paths/<id>`) with its scope and previous/next links, and mark it "in progress"
   there. The mark is kept in memory on that page and is gone after a reload; the page says so.
3. `/api/mcp` answers JSON-RPC with `get_all`, `get_by_id` and `search` over the same paths, echoes the request id,
   and returns JSON-RPC errors for unknown tools, unknown methods and bad JSON.
4. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No prerequisite mapping, custom learning paths, resource links or progress tracking (claimed by the card; flagged
  in the 2026-10 review). The module counts and times are descriptive copy: there are no modules to open.
- No account, storage or sync. No analytics (the unused Vercel Analytics packages were removed on 2026-11-19).

## Live URL and deploy state

- Live: https://learn.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-learn-frontend` is deployed only by CLI. The last production deploy is
  2026-10-08 (CLI, commit ed0dd54): the CVE patch deploy did not run because the Vercel free-plan daily deploy limit
  was hit on 2026-10-23. Its Git link names the old repository (`bookchaowalit/bookchaowalit-learn-frontend`), so a
  push to `main` does not deploy: the CVE patch and the L2 commits stay undeployed until the coordinator redeploys
  or the owner reconnects Vercel Git to this repository (owner action D9). Until then the live `/api/mcp` still
  answers id 0 and "Tool called: <name>" for any tool.
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `education-learn-web`, org `personal-yu0`).

## Boundaries

- Browser-only apart from the stateless `/api/mcp` route.

## Reader shell move (2026-11-19)

The site moved onto the shared Reader shell (READER.md, files copied from `content-techblog-web`). Fixed from the
2026-11-11 UX review: contrast, 10–11px labels, sub-44px tabs and buttons, the search field without a focus ring,
the first path below the fold on phones, Avenir/Trebuchet fonts (now Geist only; Geist Mono no longer loaded), and
the "Start path" / "Keep going" copy (now "Mark as in progress" on each path page, with a note that it is not
saved). The empty state has a "Clear search and filter" button. `metadataBase` now points at
https://learn.bookchaowalit.com, the sitemap is generated, and `/more-projects` redirects (308) to
https://bookchaowalit.com/.
