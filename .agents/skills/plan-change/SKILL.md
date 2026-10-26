---
name: plan-change
description: Plan any non-trivial change before writing code — read the
  sources of truth, write a scoped plan, get user approval, then implement on
  a feat/ branch and open a PR. Use for new pages, components, islands,
  routes, migration steps, or multi-file refactors.
---

# Plan a change

This site is a visual clone of favorcare.org guarded by sources of truth. The
plan step exists so agents don't invent components, tokens, or content that
already exist.

## 1. Read the sources of truth

- `AGENTS.md` — commands, conventions, workflow gates.
- `COMPONENTS.md` — the component catalog. Required for any page or component
  work; reuse before building.
- `DESIGN.md` — design tokens (colors, type, radii, spacing). Never hardcode.
- `BRAND.md` — voice and copy rules for any user-facing text.
- `ideas/proposed.svg` — information architecture: page tree, templates, and
  the real impact numbers, programs, and people. Never invent copy or stats.
- `MIGRATION.md` — where the WordPress migration stands, if the task touches
  it.
- `DEVELOPMENT.md` — architecture, styling, assets, deployment.

## 2. Explore the code

Find what exists first: `routes/`, `components/`, `components/navigation.ts`,
`islands/`, `components/content.ts`, `components/posts.ts`. Grep for the
pattern before proposing anything new.

## 3. Write the plan

Short and reviewable:

- **Goal** — what changes for the site, in one or two sentences.
- **Files** — each file created or modified and what happens in it.
- **Out of scope** — adjacent work deliberately left alone.
- **Verification** — how it will be proven: `deno task check`, `deno task
  test`, which route or section to eyeball on the dev server.

Get the user's approval before writing code. Approval covers the change's
content — not the merge, and not unrelated edits.

## 4. Implement

- Work on a `feat/…` branch. Never commit to `main`; never merge a PR.
- Small, conventional commits: `type(scope): summary`, body ending with a
  `Verified: …` line. No AI attribution trailers — the commit-msg hook
  installed by `deno task setup` enforces this.
- Keep obligations in the same change: new UI → shared component +
  `/storybook` specimen + COMPONENTS.md entry; new logic → tests.

## 5. Verify and hand off

1. `deno task check` — fmt, lint, typecheck.
2. `deno task test` — unit tests.
3. `deno task dev` — the affected page renders cleanly, no console errors.
4. Push the branch and open a PR with `gh` for the user to review and merge.
