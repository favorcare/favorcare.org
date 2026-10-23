---
name: verify
description: Run the completion gate before claiming any work is done — check,
  test, dev, visual pass, storybook. Use when about to say done, commit, open
  a PR, or hand work back to the human.
---

# Verify before "done"

Nothing is done until these pass. Run them yourself; never describe them as
passing without having run them in this session.

## 1. The gates

```sh
deno task check   # fmt --check + lint + typecheck — must be clean
deno task test    # unit tests — must pass
```

- **New or changed logic ships with tests in the same change** — handler
  helpers, validation, pure functions, island math (`*_test.ts` next to the
  code, `@std/assert`). Server-rendered markup is covered by `check` plus a
  visual pass instead.
- **`deno task dev` starts cleanly** — the affected page renders, no console
  errors, no leftover Fresh demo content. The port is printed in the
  terminal; don't assume 8000.
- **Component touched → eyeball `/storybook`** — the specimen renders and
  `storybook_test.ts` (part of `deno task test`) still passes: every exported
  component needs a specimen and a COMPONENTS.md row in the same change.
- **Browser-level proof when behavior is client-side** (islands, hydration,
  clicks, storage): verify in a real browser, not just via `curl` of the SSR
  HTML. Playwright Chromium is the repo's browser (`scripts/clone-diff.ts`
  uses it) — drive the actual interaction and assert the result.

## 2. Then the hygiene

- **Commit format** — conventional `type(scope): summary`, body explaining
  the why, ending with `Verified: deno task check clean; deno task test N
  passed.` (plus any extra proof). No AI attribution trailers — the
  commit-msg hook enforces the format.
- **Branch hygiene** — work lives on a `feat/…` branch; never commit to
  `main`, never merge a PR. Push and open the PR with `gh` for the human.
- **State what's left** — name any scope deliberately deferred (see the
  roadmap in DEVELOPMENT.md) so "done" can't hide loose ends.
