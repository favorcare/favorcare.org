# AGENTS.md

Guidance for AI coding agents working in this repo. (`CLAUDE.md` is a symlink to
this file so Claude Code picks it up automatically.)

## What this is

The website for **Favor Care**, a faith-driven Philippine nonprofit. A fresh
rebuild of favorcare.org (formerly WordPress + Elementor), built with **Deno +
Fresh 2 + Tailwind CSS v4 + Preact**.

## Commands

```sh
deno install     # populate node_modules (nodeModulesDir: manual)
deno task dev    # dev server (URL printed in terminal, ~http://localhost:8000)
deno task build  # production build -> _fresh/
deno task start  # serve the production build
deno task check  # fmt --check + lint + deno check  (run before claiming done)
```

## Sources of truth — do not invent

- **[DESIGN.md](DESIGN.md)** — design system. All colors, type, radii, and
  component styles. **Reuse tokens, don't hardcode hex.**
- **[ideas/proposed.svg](ideas/proposed.svg)** — information architecture. The
  5-item nav, page tree, page templates (TEMPLATE A = homepage), real impact
  numbers, programs, and the brand voice. **Reuse real content, don't invent
  copy or stats.**

When a token changes, update **DESIGN.md** first, then mirror it in
`assets/styles.css`.

## Conventions

- **Fresh 2 file-system routing.** `routes/` → pages; `routes/_app.tsx` is the
  root layout. Use `define.page` / `define.handlers` / `define.middleware` from
  `utils.ts` (typed via the shared `State`).
- **Preact, not React.** Import hooks/components from `preact`; signals from
  `@preact/signals`.
- **Server-rendered by default.** Only components in `islands/` ship client JS.
  Keep the page server-rendered unless interactivity is required.
- **Tailwind v4, CSS config — no `tailwind.config.js`.** Tokens live in the
  `@theme` block of `assets/styles.css` and produce utilities like `bg-primary`,
  `text-on-surface`, `rounded-full`. Prefer canonical v4 class names (e.g.
  `bg-linear-to-b`, not `bg-gradient-to-b`; `aspect-4/3`, not `aspect-[4/3]`).
- **Inter** is loaded via Google Fonts `<link>` in `routes/_app.tsx`.
- **Accessibility / DESIGN.md rules:** touch targets ≥ 48px (`min-h-12`), body
  text ≥ 16px with ≥ 1.5 line-height. Gold (`primary`) is reserved for
  high-priority CTAs.

## Where things live

```
routes/       Pages (file-system routing). _app.tsx = root layout.
components/   Reusable server components (Button, Header, Footer, …).
islands/      Client-hydrated interactive components.
static/       Assets served as-is — logos, /images/orgs/{PCNC,DSWD}.png.
assets/styles.css   Tailwind v4 @theme tokens + base layer.
main.ts       Fresh app entry (static files + fsRoutes).
```

## Gotchas

- `nodeModulesDir: manual` means you must run `deno install` before dev/build.
- The dev server port is printed in the terminal — don't assume 8000.
- Use `<Head>` from `fresh/runtime` for per-page `<title>`/meta.
- Fresh 2 excludes `_fresh/` (build output) from lint/format via `deno.json`.

## Before claiming work is done

1. `deno task check` passes (fmt + lint + typecheck).
2. `deno task dev` starts cleanly and the page renders with no leftover Fresh
   demo content and no console errors.
3. State any scope you deliberately left for later (see DEVELOPMENT.md roadmap).
