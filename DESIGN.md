---
title: "Learn — Reader shell"
status: "active"
updated: "2026-11-19"
---

# Learn — design

Since 2026-11-19 Learn runs on the shared **Reader shell** (see [READER.md](READER.md)); the shell files are
copied byte for byte from `content-techblog-web`, the source of truth. The earlier "field notes" look
(cream paper, coral pencil, Avenir/Georgia) was retired with the 2026-11-11 UX review: its muted, coral and
green text fell below 4.5:1, labels were 10–11px, tabs and buttons were under 44px, the search field had no
focus ring, Avenir Next is missing on Android/Windows/Linux, and on a 390px phone the first path sat below
the first screen.

## Pages

- `/`: head (the learning promise), live search, one subject filter (chips with `aria-pressed`), a result
  count, the paths as cards (level and scope, summary, subject), and an empty state with "Clear search and
  filter".
- `/paths/<id>`: back link, subject, title, summary as lede, level and scope, a note that the page is an
  outline with nothing to open yet, a scope table, an in-memory "Mark as in progress" toggle that says it is
  not saved, and previous/next.

## Do's and don'ts

- Do keep scope visible and labelled as an outline ("6 modules · 2h 40m (outline)").
- Don't imply lessons, accounts or saved progress that do not exist.
