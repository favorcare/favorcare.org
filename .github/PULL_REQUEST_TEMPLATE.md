## What & why

<!-- One or two sentences: what changed and why. -->

## Screenshots

<!-- For visual changes: before/after from the dev server or /storybook.
     Delete this section if there is nothing visual. -->

## Checklist

- [ ] Reused existing components (`Button`, `PageHero`, `SectionHeading`,
      `icons.tsx`, …) — no hand-rolled pills, headings, hero shells, or inline
      SVGs
- [ ] Component added or changed → `COMPONENTS.md` catalog entry **and**
      `/storybook` specimen updated in this same change
- [ ] Token change → `DESIGN.md` updated first, then mirrored in
      `assets/styles.css`
- [ ] User-facing copy follows `BRAND.md` (reality → hope → ask arc; no
      invented people, quotes, or stats)
- [ ] New/changed pure logic (handler helpers, validation, islands math,
      content helpers) ships with tests in this change
- [ ] `deno task check` passes
- [ ] `deno task test` passes
- [ ] Branch is `feat/…` / `fix/…` / `chore/…` / `docs/…`; a human reviews and
      merges — never push or merge `main` directly (`main` deploys)
- [ ] Commits carry **no** `Co-Authored-By` / "Generated with …" AI trailers
