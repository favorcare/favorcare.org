# Development

Everything you need to run, build, and extend favorcare.org locally.

## Prerequisites

- **Deno** — install from
  <https://docs.deno.com/runtime/getting_started/installation/>. This project
  runs on Fresh 2 + Vite, which use the Deno runtime.

## Getting started

```sh
deno task setup  # deps + git hygiene (commit template, commit-msg hook)
deno task dev    # start the dev server
```

Open the URL printed in the terminal (typically <http://localhost:5173>).

## Common tasks

| Task                   | Command           |
| ---------------------- | ----------------- |
| One-time setup         | `deno task setup` |
| Develop                | `deno task dev`   |
| Type / format / lint   | `deno task check` |
| Unit tests             | `deno task test`  |
| Format code            | `deno fmt`        |
| Lint                   | `deno lint`       |
| Production build       | `deno task build` |
| Serve production build | `deno task start` |

`deno task check` runs `deno fmt --check && deno lint && deno check` — run it,
plus `deno task test`, before considering any work done.

## Architecture

This is a [**Fresh 2**](https://fresh.deno.dev/) app (Deno runtime + Vite +
Preact).

- **File-system routing** — files in `routes/` become pages. `routes/index.tsx`
  is the home page; `routes/_app.tsx` is the root layout that wraps every page
  with `<html>`/`<head>`/`<body>`.
- **`define.*` helpers** — `define.page`, `define.handlers`, and
  `define.middleware` (from [`utils.ts`](utils.ts)) provide typed routing.
- **Islands** — components in `islands/` are hydrated on the client. Everything
  else is server-rendered with zero client JS by default. Put interactivity
  (forms with state, animated counters, etc.) in islands.
- **State** — `utils.ts` defines the `State` type shared across middleware,
  layouts, and routes via `ctx.state`.

## Styling (Tailwind v4)

Tailwind v4 is configured entirely in CSS — **there is no
`tailwind.config.js`**.

- The Vite plugin is registered in [`vite.config.ts`](vite.config.ts)
  (`@tailwindcss/vite`).
- Design tokens live in the `@theme` block of
  [`assets/styles.css`](assets/styles.css), transcribed from
  [**DESIGN.md**](DESIGN.md). They generate utilities like `bg-primary`,
  `text-on-surface`, and `rounded-full`.
- **Inter** is loaded via a Google Fonts `<link>` in `routes/_app.tsx`.

To change a color or radius, update the token in **DESIGN.md** first, then
mirror it in `assets/styles.css`.

### Adding a page

Create a file under `routes/`, e.g. `routes/what-we-do/index.tsx`:

```tsx
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";

export default define.page(function WhatWeDo() {
  return (
    <>
      <Head>
        <title>What We Do — Favor Care</title>
      </Head>
      <Header />
      <main>{/* … */}</main>
      <Footer />
    </>
  );
});
```

### Adding a component / island

- **First read [COMPONENTS.md](COMPONENTS.md)** — the component catalog and the
  page-building rules. Reuse before you build.
- **Server component** → `components/Foo.tsx` (imported by routes; no client
  JS).
- **Interactive component** → `islands/Foo.tsx` (hydrated on the client; can use
  `@preact/signals` for state).
- New components get a `/storybook` specimen and a COMPONENTS.md entry in the
  same change.

## Testing

`deno task test` runs `deno test -A`. Tests live next to the code as `*_test.ts`
(see [`routes/signup_test.ts`](routes/signup_test.ts)).

- **Pure logic gets tests** — handler helpers, validation, islands math, content
  helpers. New or changed logic ships with passing tests in the same change.
- **Server-rendered markup doesn't** — that's covered by `deno task check` and a
  visual pass on `/storybook`.

## Copy & content

User-facing copy follows [**BRAND.md**](BRAND.md) — raw, authentic, hopeful;
reality → hope → ask; never invent people, quotes, or stats. Canonical strings
live in [`components/content.ts`](components/content.ts) and
[`components/posts.ts`](components/posts.ts).

## Assets (images)

`static/images/` is tracked in git and served in production from Cloudflare R2
(see [MIGRATION.md](MIGRATION.md), Phase 2):

- **Local dev** images resolve from `static/images/` as-is — the tracked files
  ship with the clone, no rclone or R2 setup needed.
- **Adding images**: drop them in `static/images/` and commit. Merging to main
  triggers the sync-assets workflow, which publishes the tree to R2
  (`.github/workflows/sync-assets.yml`). The local `deno task assets:push`
  remains for manual/hotfix publishes (requires [rclone](https://rclone.io/) and
  the `favorcare-media` remote — one-time setup documented in
  `scripts/assets.ts`).
- In markup, always reference images through `asset()` from
  [`utils/assets.ts`](utils/assets.ts) — it returns the local path in dev and
  prefixes `ASSET_BASE_URL` (the R2 custom domain) in production. Root-level
  files (`/logo-*.svg`, favicon) are not part of this scheme.

## Analytics & UTM tracking

Three free vendors, all key-driven and independently optional — an unset key
means that vendor's snippet never renders, and `components/Analytics.tsx`
returns null (no island, no scripts) when all three are unset:

| Key                          | Vendor                   | Where to get it                                             |
| ---------------------------- | ------------------------ | ----------------------------------------------------------- |
| `GA4_MEASUREMENT_ID`         | Google Analytics 4       | GA Admin → Data streams → Web → Measurement ID (`G-…`)      |
| `MIXPANEL_TOKEN`             | Mixpanel                 | Project → Settings → Project Settings → Project Token       |
| `CLOUDFLARE_ANALYTICS_TOKEN` | Cloudflare Web Analytics | dash.cloudflare.com → Web Analytics → your site → the token |

The keys are public identifiers, not secrets. Where they live:

- **Local dev** — copy `.env.example` to `.env` and fill in what you have;
  `deno task dev` bridges the file into the process env via
  [`vite.config.ts`](vite.config.ts) (real env vars always win).
- **Production (Workers)** — fill the values in `wrangler.jsonc` `"vars"`
  (committed, like `ASSET_BASE_URL`; dashboard-added vars are wiped on every
  deploy). `server.js` stashes them on `globalThis` for
  [`utils/analytics.ts`](utils/analytics.ts) — the same pattern as the asset
  base.

### UTM attribution

A landing whose URL carries `utm_*` params writes two touches to localStorage
(pure logic in [`utils/utm.ts`](utils/utm.ts), tested): `fc_utm_first` once per
browser, `fc_utm_last` refreshed on every campaign landing. Every custom event
carries both as `first_utm_*` / `last_utm_*` props, so conversions report the
campaign that produced them even when they happen on a page the campaign didn't
land on. In GA4, register those keys as custom dimensions to break reports down
by them; Mixpanel shows event properties out of the box.

### Events

| Event               | Fires when                                                        | Source                  |
| ------------------- | ----------------------------------------------------------------- | ----------------------- |
| page_view           | every page (automatic in all three vendors)                       | snippets                |
| `donate_click`      | header DONATE pill (`location: "header"`)                         | `Button track` prop     |
| `cta_band_click`    | black closing-band CTA (`CtaBand`)                                | `Button track` prop     |
| `give_hero_click`   | give-now hero GIVE NOW                                            | `Button track` prop     |
| `give_online_click` | give-now portal buttons (`region`: ph / us / au)                  | `Button track` prop     |
| `contact_submit`    | ContactForm submits (home card + contact page)                    | `MailtoForm trackEvent` |
| `newsletter_submit` | NewsletterForm submits                                            | `MailtoForm trackEvent` |
| `tax_proof_submit`  | TaxDeductibleForm submits                                         | `MailtoForm trackEvent` |
| `volunteer_submit`  | /signup submit click (best effort — the form POSTs to the server) | `Button track` prop     |

To instrument anything else: `<Button track="name">`, any element with
`data-track="name"` (plus optional `data-track-props` JSON), or
`track("name", { … })` from an island / `favorcareTrack(…)` in the console — all
three fan out to every configured vendor with UTM attribution merged in.

### Verifying

Set the keys in `.env`, `deno task dev`, then: GA4 → Admin → DebugView, Mixpanel
→ Live view, Cloudflare → Web Analytics. Click a tracked CTA or run
`favorcareTrack("demo")` in the console. With no keys set, view-source shows no
analytics markup at all.

**Privacy** — the privacy policy already discloses Google Analytics; keep PII
out of event props (MIGRATION.md rule: no donor PII in analytics).

### Search Console & Bing Webmaster Tools — operator runbook

Free, no code, and the demand-side complement to GA4: the queries people
actually type to find favorcare.org, per-page impressions/clicks, and indexing
status. GA4 sees what visitors did; Search Console sees how they got here.
Verification is DNS-only — the human runs every step below (it is all dashboard
work; nothing touches a server):

1. **Google Search Console** — <https://search.google.com/search-console> →
   **Add property** → choose **Domain** (not URL-prefix) → enter
   `favorcare.org`.
2. Google shows a TXT record — copy the full `google-site-verification=…`
   string.
3. **Cloudflare dashboard** — favorcare.org → **DNS → Records → Add record**:
   Type `TXT`, Name `@`, Content the copied string, TTL auto.
4. Back in Search Console → **Verify** (Cloudflare propagates in minutes).
5. Submit the sitemap: Search Console → **Sitemaps** →
   `https://favorcare.org/sitemap.xml`. **Gap:** no `sitemap.xml` / `robots.txt`
   exists yet (deliberate follow-up) — until one lands, use the **URL
   Inspection** tool to request indexing for key pages by hand.
6. **Bing Webmaster Tools** — <https://www.bing.com/webmasters> → **Import from
   Google Search Console** — one click reuses the same verification.

Gotchas:

- **Domain property over URL-prefix** — URL-prefix verifies one exact scheme +
  host and wants an HTML file at a precise path (i.e. a route); the DNS TXT
  covers `https`, `http`, and every subdomain at once.
- **Keep the TXT record** — re-verification later (domain moves, team changes)
  may need it again.
- `/storybook` already sends `noindex, nofollow` and Search Console respects it
  — keep it out of any future sitemap.
- Google re-crawls on its own schedule (days, not minutes); "Request indexing"
  only nudges a single URL.

## Deployment

Production runs on **Cloudflare Workers** and deploys automatically on every
push to `main` — a merge to `main` is a deploy. The full flow (previews,
secrets, manual deploys, rollback) is in [**DEPLOYMENT.md**](DEPLOYMENT.md).

## AI agents

- **Skills** — `.agents/skills/` (the cross-harness home; `.claude/skills/`
  holds per-skill symlinks for Claude Code) ships repo-level skills:
  `plan-change`, `new-component`, `new-page`, `new-post` (anatomy and how to add
  one in [Repo skills](#repo-skills) below).
- **Docs lookup** — `.mcp.json` provides the project-scope `context7` MCP server
  (live Fresh/Deno/Tailwind/Cloudflare docs). Claude Code picks it up
  automatically; recent OpenCode versions read the same file, otherwise add the
  same server under the `mcp` key of `opencode.json`.
- **Commit hygiene** — `deno task setup` wires the `.gitmessage` template and
  the `.githooks/commit-msg` hook (conventional subjects, no AI attribution
  trailers). Both are local to each clone.
- **CI** — every PR runs `deno task check` + `deno task test`
  (`.github/workflows/check.yml`); deploys stay on Cloudflare Workers Builds.

### Repo skills

Each skill is a `SKILL.md` under `.agents/skills/<name>/` with `name` +
`description` frontmatter. That directory is the cross-harness home: OpenCode
and ZCode read `.agents/skills/` natively; Claude Code requires
`.claude/skills/`, so each skill also gets a symlink there (Claude Code's
documented pattern — a `<skill-name>` entry in `.claude/skills/` may be a
symlink to a directory elsewhere). `.opencode/skill` symlinks the whole tree for
older OpenCode versions. On Windows without symlink support, ZCode and OpenCode
still see `.agents/skills/` — only Claude Code loses the pointers.

The `description` is the trigger: harnesses match it against the task at hand.
Phrase it as "do X — use when Y" and keep it in sync with the body under it.

To add one:

1. Create `.agents/skills/<name>/SKILL.md` (kebab-case name, frontmatter first).
2. `ln -s ../../.agents/skills/<name> .claude/skills/<name>` so Claude Code
   discovers it too.
3. Mention the new skill in [AGENTS.md](AGENTS.md) (intro and "Where things
   live") and in the Skills bullet above.

## Current state & roadmap

All five primary-nav pages plus utility pages exist (this replaces the earlier
"homepage only" status):

| Route           | Page                                                |
| --------------- | --------------------------------------------------- |
| `/`             | Homepage                                            |
| `/who-we-are`   | Who we are (mission, vision, team, finances)        |
| `/what-we-do`   | What we do (6 programs)                             |
| `/news-updates` | Stories & impact (post listing; `/posts` 308s here) |
| `/get-involved` | Get involved (volunteer, newsletter, give)          |
| `/givenow`      | Donate hub (PH/US/AU giving methods)                |
| `/contact`      | Contact us (form, FAQ, newsletter)                  |
| `/posts/<slug>` | Individual news posts                               |
| `/storybook`    | Component library                                   |

The broader program — migrating favorcare.org off WordPress/Elementor onto this
stack as a visual clone, with a native donation checkout, R2 media, and a
Cloudflare Workers cutover — is planned phase-by-phase in
[**MIGRATION.md**](MIGRATION.md). The IA reference remains
[ideas/proposed.svg](ideas/proposed.svg).

**Known gaps that gate production cutover** (see the migration plan):

- **Contact form is mailto-only** (`islands/ContactForm.tsx`) and the newsletter
  section defaults to a `mailto:` action — no server handlers exist yet. A real
  form backend is required before DNS cutover.
- Utility/footer links for Careers, Press, Privacy, Terms, Accessibility, and
  Donation Policy are `"#"` placeholders in `components/navigation.ts`.
- ~~A `privacy-policy` route still needs to be built~~ shipped in PR #32
  (`routes/privacy-policy.tsx`).
