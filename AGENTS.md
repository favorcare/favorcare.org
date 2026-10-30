# AGENTS.md

Guidance for AI coding agents working in this repo. Claude Code (v2.1.277+)
reads this file directly — no `CLAUDE.md` needed. Repo-level agent skills
(`plan-change`, `new-component`, `new-page`, `new-post`) live in
`.agents/skills/` — the cross-harness home OpenCode and ZCode read natively;
`.claude/skills/` holds per-skill symlinks so Claude Code sees them too.

## What this is

The website for **Favor Care**, a faith-driven Philippine nonprofit. A fresh
rebuild of favorcare.org (formerly WordPress + Elementor), built with **vinext
(Cloudflare's Vite reimplementation of the Next.js App Router) + React 19 +
Tailwind CSS v4**, on Node 24 + pnpm, deployed to Cloudflare Workers.

## Commands

```sh
pnpm setup          # one-time: deps + commit template + commit-msg hook
pnpm dev            # dev server (URL printed in terminal, typically http://localhost:5173)
pnpm build          # production build -> .cloudflare/output/ (Workers bundle + static assets)
pnpm preview        # serve the production build locally in workerd
pnpm check          # prettier --check + oxlint + tsc --noEmit  (run before claiming done)
pnpm test           # unit tests (vitest run) — run before claiming done
pnpm deploy:preview # Worker Preview for the branch (human step — see DEPLOYMENT.md)
```

## Sources of truth — do not invent

- **[COMPONENTS.md](COMPONENTS.md)** — the component catalog. **Always read it
  before creating or updating any page**: reuse the existing components
  (`Button`, `PageHero`, `SectionHeading`, `icons.tsx`, …) instead of
  hand-rolling pills, headings, hero shells, or inline SVGs, so a visual change
  stays a one-file edit. New UI must be extracted into a component, given a
  `/storybook` specimen (`app/(site)/storybook/page.tsx`), and added to the
  catalog in the same change.
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
`app/globals.css`. When a component changes, update **COMPONENTS.md** and its
`/storybook` specimen in the same change.

## Conventions

- **No automatic git commands.** Do not run `git add`, `git commit`, `git push`,
  or other state-changing git commands unless explicitly asked. Read-only
  inspection (`git status`, `git diff`, `git log`) is fine.
- **Feature branches only — never land on main yourself.** Every change is made
  on a branch other than `main` (`feat/…`, `fix/…`, `docs/…`, …): create the
  branch first, then stage and commit the work there. Never stage, commit, or
  push anything directly on `main`, and never merge a PR — not even small docs
  changes, and not because a plan said "commit"; plan approval covers the
  change's content, not the merge. `main` deploys, so the only way work reaches
  it is a branch pushed and opened as a PR for the user to review and merge.
- **Never SSH into the WordPress box (or any server the user operates).** The
  human runs every server-side command themselves; provide annotated,
  copy-pasteable command blocks with per-command explanations and a never-run
  list instead. Reading output the user pastes back is the only server
  interaction. See `migration/runbooks/` for the established format.
- **App Router file conventions.** `app/` → pages: `app/layout.tsx` is the root
  layout, `app/(site)/…/page.tsx` are the site pages (the `(site)` group layout
  owns the accreditation popup), `app/coffeeforacause/` is the campaign
  sub-brand outside that group. Per-page `<title>`/meta go through
  `export const metadata` / `generateMetadata` — there is no `<Head>`. Redirects
  live in `next.config.ts`; 404s use `notFound()` + `app/not-found.tsx`.
- **React, not Preact.** Import from `react`; use `className` (also as the
  component prop name), `htmlFor`, camelCase SVG attributes.
- **Server Components by default; `"use client"` = island.** Only files in
  `islands/` start with `"use client"` and ship client JS. Keep everything else
  server-rendered unless interactivity is required. Islands take serializable
  props (plus server-rendered `children`).
- **Forms: Server Actions.** `/signup` posts through a `"use server"` action
  (`app/(site)/signup/actions.ts`) behind the `SignupForm` island
  (`useActionState`); it must keep working with JS disabled.
- **Tailwind v4, CSS config — no `tailwind.config.js`.** Tokens live in the
  `@theme` block of `app/globals.css` and produce utilities like `bg-primary`,
  `text-on-surface`, `rounded-full`. Prefer canonical v4 class names (e.g.
  `bg-linear-to-b`, not `bg-gradient-to-b`; `aspect-4/3`, not `aspect-[4/3]`).
- **Env is build-time.** Public config is `NEXT_PUBLIC_*` (inlined at build;
  read as a literal `process.env.NEXT_PUBLIC_X`). Production values are in the
  committed `.env.production`; local overrides in `.env.local` (see
  `.env.example`).
- **Inter** is loaded via Google Fonts `<link>` in `app/layout.tsx`.
- **Accessibility / DESIGN.md rules:** touch targets ≥ 48px (`min-h-12`), body
  text ≥ 16px with ≥ 1.5 line-height. Link Yellow (`yellow`) is an
  accent/surface color — never body text on white (fails contrast).
- **Docstrings on exports.** Every exported component/function/type gets a brief
  JSDoc block: what it renders or returns, the props that matter, and — when
  values were cloned from the WP pages — the measured dialect (see
  `components/Button.tsx` for the house style).

## Workflow

- **Plan before code.** Non-trivial changes start with a short written plan the
  user approves (scope, files touched, verification). Approval covers the
  change's content — not the merge, and not unrelated edits.
- **Commit format.** Conventional commits: `type(scope): imperative summary` —
  type is one of `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`; scope
  is the area (`signup`, `deploy`, `tokens`, …). The body explains the why and
  ends with a verification line, e.g.
  `Verified: pnpm check clean; pnpm test 57 passed.` The `.gitmessage` template
  and the `commit-msg` hook installed by `pnpm setup` enforce this locally.
- **No AI attribution trailers.** Never add `Co-Authored-By: …` or "Generated
  with …" trailers to commits or PRs. Commits are attributed to the human author
  only.

## Tooling

Agents work with what's already installed and **ask before installing anything**
— propose the exact command, then wait for the user to run or approve it. Never
install silently.

| Tool                | Needed for                           | Note                                                                                  |
| ------------------- | ------------------------------------ | ------------------------------------------------------------------------------------- |
| `node` (≥ 22.12)    | everything                           | Required; Node 24 recommended (`brew install node@24`).                               |
| `pnpm`              | everything                           | `corepack enable pnpm` — the version is pinned by `packageManager` in `package.json`. |
| `gh`                | branches → PRs                       | PRs are the only way work lands; check with `command -v gh`.                          |
| `cf`                | deploys                              | A project dev-dependency (`pnpm deploy` / `deploy:preview`); never `cf auth login`.   |
| `rclone`            | `assets:pull/push`                   | One-time R2 setup; walkthrough in `scripts/assets.ts` header.                         |
| Playwright browsers | `scripts/clone-diff.ts` visual diffs | `pnpm exec playwright install chromium` if the task needs it.                         |

- **Missing tool?** Say so, give the copy-pasteable install command (prefer
  `brew install …` on macOS), and wait for approval.
- **MCP:** `.mcp.json` ships the project-scope `context7` server — use it for
  live docs instead of guessing APIs. Library IDs: `/cloudflare/vinext`,
  `/vercel/next.js`, `/facebook/react`, `/tailwindlabs/tailwindcss`.
- **User-level skills/plugins** (superpowers, impeccable, motion, handoff, …)
  live outside this repo. If a task would benefit from one, propose the install
  command and wait — don't set them up unprompted.

## Testing

- `pnpm test` runs `vitest run`. It must pass before claiming done.
- Tests live next to the code as `*_test.ts` (e.g. `components/signup_test.ts`).
- **What needs tests:** pure logic — action/handler helpers, validation, islands
  math, content helpers. New or changed logic ships with passing tests in the
  same change.
- **What doesn't:** server-rendered components and page markup. Those are
  covered by `pnpm check` plus a visual pass on `/storybook`.

## Where things live

```
app/          Pages (App Router). layout.tsx = root layout; (site)/ = favorcare.org
              pages + accreditation popup; coffeeforacause/ = campaign sub-brand.
components/   Reusable server components — see COMPONENTS.md for the catalog.
components/layout/  Container/frame + SectionHeading.
components/icons.tsx  The only icon seam (lucide + simple-icons).
islands/      Client-hydrated components ("use client").
public/       Assets served as-is — logos, favicon, and the tracked
              public/images/ tree (CI mirrors it to the R2 media bucket;
              prod serves the bucket via NEXT_PUBLIC_ASSET_BASE_URL —
              utils/assets.ts).
app/globals.css   Tailwind v4 @theme tokens + base layer.
next.config.ts      Redirects.
cloudflare.config.ts  Worker config (name, compat date, assets).
vite.config.ts      vinext + Tailwind + Cloudflare plugins.
.env.production     Committed public build-time config (NEXT_PUBLIC_*).
.agents/skills/  Repo-level agent skills (real home); .claude/skills/ and
                .opencode/skill symlink in for Claude Code / older OpenCode.
.githooks/    commit-msg enforcement — activate with `pnpm setup`.
MIGRATION.md  The WP→vinext program board: phases, gates, open decisions.
migration/    Pipeline working area — its contract is migration/CONTEXT.md.
docs/         Untracked local scratch (agent plans, fieldnotes); never in git.
```

## Gotchas

- Never register `rsc()` (`@vitejs/plugin-rsc`) in `vite.config.ts` — vinext
  does it; a second one fails with "Duplicate @vitejs/plugin-rsc".
- `NEXT_PUBLIC_*` is **build-time**: change `.env.production`, then rebuild.
  Read it as a literal `process.env.NEXT_PUBLIC_X` or it won't be inlined. An
  empty value in the shell doesn't override `.env.production`.
- Worker types land in `.cloudflare/types` (generated by dev/build; included in
  `tsconfig.json`).
- A page file may only export `default`, `metadata`/`generateMetadata`,
  `generateStaticParams` — put helpers in `components/` or `utils/`.
- The dev server port is printed in the terminal — don't assume one. Test
  hydration against `pnpm preview`, not `pnpm dev`.
- Previews are `vinext-cloudflare previews deploy` (`pnpm deploy:preview`).
  Never `deploy --preview`/`--env …` for a preview: it only picks a Vite mode
  and still overwrites Production.
- `pnpm preview` serves local images only if built without the CDN base: move
  `.env.production` aside for the QA build (the default build strips
  `public/images` from the bundle).

## Before claiming work is done

1. `pnpm check` passes (prettier + oxlint + typecheck).
2. `pnpm test` passes (new/changed logic ships with tests).
3. `pnpm build` succeeds and `pnpm dev` starts cleanly and the page renders with
   no leftover demo content and no console errors.
4. State any scope you deliberately left for later (see DEVELOPMENT.md roadmap).
