---
name: new-post
description: Publish a news article or story the repo way — real copy and
  photos from the stakeholder, one Post entry in components/posts.ts, images
  mirrored under static/images/posts/. Use when adding or editing a news
  story, update, or article (anything on /posts).
---

# New post (article)

## 1. Get real content — never invent it

Posts are real stories about real people. [BRAND.md](../../../BRAND.md) governs
the voice (raw, authentic, hopeful). The words, quotes, names, and photos come
from the stakeholder's draft — never fabricated, never AI-invented people or
stats. If a fact is missing, ask; don't fill gaps.

## 2. Mirror the photos

- Stakeholder images go under `static/images/posts/<slug>/` (hero can live at
  `static/images/posts/<slug>-hero.jpg` — see existing posts). Files are tracked
  in git; CI mirrors them to the R2 bucket on merge.
- Reference every image through `asset()` from `utils/assets.ts` — dev serves it
  locally, prod serves the CDN. Never hotlink favorcare.org (the WordPress box
  dies at cutover), and never wrap an absolute `https://` URL in `asset()`.
- Alt text describes the photo for someone who can't see it.

## 3. Add the `Post` entry in `components/posts.ts`

One entry in the `POSTS` array (newest first is handled by date sort —
`listPosts()` sorts by `date` descending):

- `slug` — URL slug, kebab-case; the post lives at `/posts/<slug>`.
- `title`, `heroLines` — the archive card title and the two-line hero.
- `description` — card/tagline text (also the meta description).
- `date` — ISO `YYYY-MM-DD`, sort order only; the page shows no date.
- `tag` — one of the tags already in use (e.g. `Medical Missions`); the
  archive's filter tabs build themselves from the tags in use
  (`routes/posts/index.tsx`), so a genuinely new tag appears automatically —
  confirm that's intended.
- `hero` / `heroAlt` — `asset(...)` path + alt text.
- `blocks` — the article body, in order, using the `ArticleBlock` model
  documented at the top of the file: `quote` (with `yellow` for the WP accent
  quotes), `heading`, `text` (paragraph runs), `gallery` (image list), `cta`
  (gray ad-break card with text/button parts).

## 4. Verify

`deno task check`; then `deno task dev` → `/posts` (new card appears, tag tab
filters correctly) and `/posts/<slug>` (hero renders both lines, galleries load,
no console errors). Copy edits touch no logic, so no new tests are needed — but
run `deno task test` before the PR anyway.
