# Development

Everything you need to run, build, and extend favorcare.org locally.

## Prerequisites

- **Deno** — install from
  <https://docs.deno.com/runtime/getting_started/installation/>. This project
  runs on Fresh 2 + Vite, which use the Deno runtime.

## Getting started

```sh
deno install     # populate node_modules (nodeModulesDir: manual)
deno task dev    # start the dev server
```

Open the URL printed in the terminal (typically <http://localhost:8000>).

## Common tasks

| Task                   | Command           |
| ---------------------- | ----------------- |
| Develop                | `deno task dev`   |
| Type / format / lint   | `deno task check` |
| Format code            | `deno fmt`        |
| Lint                   | `deno lint`       |
| Production build       | `deno task build` |
| Serve production build | `deno task start` |

`deno task check` runs `deno fmt --check && deno lint && deno check` — run it
before considering any work done.

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

## Assets (images)

`static/images/` is on its way to being served from Cloudflare R2 rather than
git (see [MIGRATION.md](MIGRATION.md), Phase 2):

- **Local dev** images resolve from `static/images/` as-is. The directory is
  populated on fresh clones with `deno task assets:pull` (requires
  [rclone](https://rclone.io/) and the `favorcare-media` remote — one-time setup
  documented in `scripts/assets.ts`).
- **Adding images**: drop them in `static/images/`, then run
  `deno task assets:push` to publish them to R2. The directory is gitignored, so
  git will not pick them up.
- **Transitional rule** (until Phase 2 flips CDN serving on): images committed
  before this rule are still tracked and still deploy — for any _new_ image that
  must ship before the CDN is live, use `git add -f static/images/…`.
- In markup, always reference images through `asset()` from
  [`utils/assets.ts`](utils/assets.ts) — it returns the local path in dev and
  prefixes `ASSET_BASE_URL` (the R2 custom domain) in production. Root-level
  files (`/logo-*.svg`, favicon) are not part of this scheme.

## Deployment

`deno task build` outputs a server bundle to `_fresh/` (`deno task start` serves
it locally). Production targets **Cloudflare Workers** — Deno Deploy shuts down
in 2027 following the Cloudflare acquisition (see MIGRATION.md):

- `deno task deploy` — builds, then deploys via wrangler (`wrangler.jsonc`,
  worker entry `server.js`; the `cloudflare()` vite plugin loads only under
  `CF=1`, so dev/build/start stay on the standard Fresh flow).
- Easiest: connect the repo in the Cloudflare dashboard (Workers → Create →
  import from GitHub) — builds on push to `main`, preview URLs per PR.
- Secrets (`ASSET_BASE_URL`; later `PAYMONGO_*`/`RESEND_*`/`MAILCHIMP_*`) live
  in the dashboard or via `wrangler secret put`, never in git.
- Reference:
  [Fresh on Cloudflare Workers](https://usefresh.dev/docs/deployment/cloudflare-workers).

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
stack as a visual clone, with a native donation checkout, R2 media, and a Deno
Deploy cutover — is planned phase-by-phase in [**MIGRATION.md**](MIGRATION.md).
The IA reference remains [ideas/proposed.svg](ideas/proposed.svg).

**Known gaps that gate production cutover** (see the migration plan):

- **Contact form is mailto-only** (`islands/ContactForm.tsx`) and the newsletter
  section defaults to a `mailto:` action — no server handlers exist yet. A real
  form backend is required before DNS cutover.
- Utility/footer links for Careers, Press, Privacy, Terms, Accessibility, and
  Donation Policy are `"#"` placeholders in `components/navigation.ts`.
- ~~A `privacy-policy` route still needs to be built~~ shipped in PR #32
  (`routes/privacy-policy.tsx`).
