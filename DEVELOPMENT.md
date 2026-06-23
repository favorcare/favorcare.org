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

- **Server component** → `components/Foo.tsx` (imported by routes; no client
  JS).
- **Interactive component** → `islands/Foo.tsx` (hydrated on the client; can use
  `@preact/signals` for state).

## Deployment

`deno task build` outputs a server bundle to `_fresh/`. Serve it with
`deno task start`, or deploy to any Deno-capable host such as
[Deno Deploy](https://deno.com/deploy). See the
[Fresh deployment docs](https://fresh.deno.dev/docs/concepts/deploying) for
details.

## Forward roadmap

The full site is defined in [**favorcare-sitemap.svg**](favorcare-sitemap.svg).
Today only the homepage (`TEMPLATE A`) exists. Planned routes, in priority
order:

**Primary nav pages**

- **Our Mission** (`/our-mission`) — Our Story, Vision & Values, Leadership &
  Team, Accountability, Where We Work.
- **What We Do** (`/what-we-do`) — Education, Prison Ministry, Community Health,
  Disaster Relief, Community Development.
- **Stories & Impact** (`/stories`) — Stories Hub, Featured Stories, Impact
  Numbers, News & Updates, Annual Report.
- **Get Involved** (`/get-involved`) — Volunteer, Corporate Partners, Fundraise
  For Us, Prayer Hub, In-Kind Donations.
- **Donate** (`/donate`) — One-time Gift, Monthly Giving (Become a Carer),
  Sponsor a Child, Give in Kind, Legacy & Major Gifts.

**Utility / footer pages**

Contact Us, Newsletter Sign-up, FAQ, Careers, Press / Media Kit, Privacy Policy,
Terms & Conditions, Accessibility Statement, Donation Policy, Search Results,
404, Thank-you (post-donation), Donor Account.

**Enhancements** noted as out of scope for the first cut: full-bleed video hero,
animated count-up stat islands, real donation & newsletter backends, search, and
a language/region toggle.
