# AGENTS.md

Guidance for AI coding agents working in this repo. Claude Code (v2.1.277+)
reads this file directly — no `CLAUDE.md` needed.

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
deno task test   # unit tests (deno test -A) — run before claiming done
```

## Sources of truth — do not invent

- **[COMPONENTS.md](COMPONENTS.md)** — the component catalog. **Always read it
  before creating or updating any page**: reuse the existing components
  (`Button`, `PageHero`, `SectionHeading`, `icons.tsx`, …) instead of
  hand-rolling pills, headings, hero shells, or inline SVGs, so a visual change
  stays a one-file edit. New UI must be extracted into a component, given a
  `/storybook` specimen, and added to the catalog in the same change.
- **[DESIGN.md](DESIGN.md)** — design tokens. All colors, type scales, radii,
  and spacing. **Reuse tokens, don't hardcode hex.**
- **[BRAND.md](BRAND.md)** — brand voice and content style. **Read it before
  writing any user-facing copy** (headlines, captions, CTAs, story text). Real
  numbers come from `components/content.ts` and `components/posts.ts` — never
  invent people, quotes, or stats.
- **[ideas/proposed.svg](ideas/proposed.svg)** — information architecture. The
  5-item nav, page tree, page templates (TEMPLATE A = homepage), real impact
  numbers, and programs. **Reuse real content, don't invent copy or stats.**

When a token changes, update **DESIGN.md** first, then mirror it in
`assets/styles.css`. When a component changes, update **COMPONENTS.md** and its
`/storybook` specimen in the same change.

## Conventions

- **No automatic git commands.** Do not run `git add`, `git commit`, `git push`,
  or other state-changing git commands unless explicitly asked. Read-only
  inspection (`git status`, `git diff`, `git log`) is fine.
- **Feature branches only — never land on main yourself.** All work happens on
  `feat/…` branches, pushed and opened as PRs for the user to review and merge.
  Never push to `main`, never merge a PR, never commit directly on `main` — even
  for small docs changes, and even if a plan said "commit"; plan approval covers
  the change's content, not the merge. `main` deploys.
- **Never SSH into the WordPress box (or any server the user operates).** The
  human runs every server-side command themselves; provide annotated,
  copy-pasteable command blocks with per-command explanations and a never-run
  list instead. Reading output the user pastes back is the only server
  interaction. See `migration/runbooks/` for the established format.
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
  text ≥ 16px with ≥ 1.5 line-height. Link Yellow (`yellow`) is an
  accent/surface color — never body text on white (fails contrast).

## Workflow

- **Plan before code.** Non-trivial changes start with a short written plan the
  user approves (scope, files touched, verification). Approval covers the
  change's content — not the merge, and not unrelated edits.
- **Commit format.** Conventional commits: `type(scope): imperative summary` —
  type is one of `feat`, `fix`, `docs`, `chore`, `refactor`; scope is the area
  (`signup`, `deploy`, `tokens`, …). The body explains the why and ends with a
  verification line, e.g.
  `Verified: deno task check clean; deno task test 10 passed.`
- **No AI attribution trailers.** Never add `Co-Authored-By: …` or "Generated
  with …" trailers to commits or PRs. Commits are attributed to the human author
  only.

## Testing

- `deno task test` runs `deno test -A`. It must pass before claiming done.
- Tests live next to the code as `*_test.ts` (e.g. `routes/signup_test.ts`).
- **What needs tests:** pure logic — handler helpers, validation, islands math,
  content helpers. New or changed logic ships with passing tests in the same
  change.
- **What doesn't:** server-rendered components and page markup. Those are
  covered by `deno task check` plus a visual pass on `/storybook`.

## Where things live

```
routes/       Pages (file-system routing). _app.tsx = root layout.
components/   Reusable server components — see COMPONENTS.md for the catalog.
components/layout/  Container/frame + SectionHeading.
components/icons.tsx  The only icon seam (lucide + simple-icons).
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
2. `deno task test` passes (new/changed logic ships with tests).
3. `deno task dev` starts cleanly and the page renders with no leftover Fresh
   demo content and no console errors.
4. State any scope you deliberately left for later (see DEVELOPMENT.md roadmap).
