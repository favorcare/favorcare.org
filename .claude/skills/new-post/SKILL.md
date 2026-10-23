---
name: new-post
description: Add a news/post entry to the site — use when publishing an
  article, news update, or editing the posts archive.
---

# Add a post

Posts are data, not files: the archive (`routes/news-updates.tsx` via
`PostCard`) and the article page (`routes/posts/[slug].tsx`) both render
from the `POSTS` array in `components/posts.ts`.

## 1. Write the entry

Append a `Post` to `POSTS` (newest first — `listPosts()` sorts by `date`):

- `slug` — URL segment, kebab-case, matches the WP slug when migrating.
- `title` — WP post_title; also the archive card text.
- `heroLines` — the article hero renders the title as two measured lines
  `[line1, line2]`.
- `description` — archive card summary.
- `date` — ISO `YYYY-MM-DD` (sort order only; WP shows no dates).
- `tag` — archive filter label.
- `hero` / `heroAlt` — hero photo path + alt; the hero doubles as the
  archive card cover. Reference images through `asset()` paths
  (`/images/…`, tracked in `static/images/`).
- `blocks` — ordered `ArticleBlock`s: `quote`, `heading`, `text`
  (`paragraphs: string[]`), `gallery` (`images: string[]`), `cta`
  (`parts` compose text + mailto links).

## 2. Content rules (BRAND.md is the source of truth)

Real people, quotes, and numbers come only from `content.ts`/`posts.ts`
history or verified sources — never invent them. Voice: reality → hope →
ask; plain sentences, no jargon.

## 3. Verify

`deno task check` + `deno task test` (`posts_test.ts` covers the helpers),
then eyeball the archive card on `/news-updates` and the article at
`/posts/<slug>` under `deno task dev` — hero lines break correctly, gallery
order matches the WP column count.
