---
name: a11y
description: Apply the accessibility gate — use before or after changing
  markup, forms, buttons, colors, or type, and when asked about
  accessibility, contrast, focus, or touch targets.
---

# Accessibility gate

The floor is codified in DESIGN.md and partly machine-checked — `deno task
check` + `deno task test` catch drift, but only a human-visible pass catches
the rest.

## 1. The non-negotiables

- **Touch targets ≥ 48px** — `min-h-12` on interactive controls; sizes
  without it (`Button` `lg`/`xl`) get height from padding by design.
- **Body text ≥ 16px with ≥ 1.5 line-height** — the measured WP dialects
  allow 14–15px only for button labels, never paragraphs.
- **Link Yellow is an accent/surface color** — never body text on white
  (fails contrast); `text-link` on light grounds only for links, with a
  darker hover.
- **Colors come from DESIGN.md tokens** — the measured pairs live in
  `components/tokens.ts` (`CONTRAST_PAIRS`, `contrastRatio()`; WCAG-checked
  by `tokens_test.ts`). New color pairings need a ratio check (≥ 4.5:1 body,
  ≥ 3:1 large text) and a DESIGN.md update first.

## 2. Markup habits

- One `<h1>` per page (`PageTitle`); section headings through
  `SectionHeading`, never skipped levels for visual sizing.
- **Forms** — every control labeled via `FormField`; inputs carry
  `ariaLabel` when the visible label and accessible name diverge
  (e.g. `InputField` with the WP "FIRST NAME*" placeholder split).
- **Icons are decorative by default** — `aria-hidden="true"` via
  `components/icons.tsx`; interactive icon-only controls get an
  `aria-label`.
- **Landmarks** — `<main id="main-content" tabIndex={-1}>`, the skip link in
  `routes/_app.tsx`, `aria-label` on navs.

## 3. Verify

Keyboard pass on `deno task dev`: tab through the changed page — visible
focus everywhere, skip link first, dialogs trap and close (Popup uses native
`<dialog>`). Then the gates: `deno task check` + `deno task test`.
