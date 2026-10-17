---
name: new-component
description: Create or extract UI the repo way — reuse first, shared server
  component or client island, a /storybook specimen, and a COMPONENTS.md
  catalog entry, all in the same change. Use whenever a page needs new UI.
---

# New component

## 1. Reuse before building

Search `COMPONENTS.md` and `components/` for an existing match — `Button`,
`PageHero`, `SectionHeading`, `Eyebrow`, `CtaBand`, `Faq`, `InputField`,
`icons.tsx`, … — including variant props that might already cover the new
case. A visual change should stay a one-file edit.

## 2. Pick the kind

- **Server component** → `components/<Name>.tsx` (default; zero client JS).
- **Interactive** → `islands/<Name>.tsx` (hydrated; state via
  `@preact/signals`). Only when the page truly needs interactivity.

## 3. Build to the tokens

- Colors, type sizes, radii, and spacing come from `DESIGN.md` tokens via
  Tailwind utilities (`bg-primary`, `text-on-surface`, `rounded-full`) —
  never hardcoded hex.
- Canonical Tailwind v4 class names (`bg-linear-to-b`, not
  `bg-gradient-to-b`; `aspect-4/3`, not `aspect-[4/3]`).
- Accessibility floor: touch targets ≥ 48px (`min-h-12`), body text ≥ 16px
  with ≥ 1.5 line-height, Link Yellow never as body text on white.
- Icons only through `components/icons.tsx` (lucide + simple-icons) — no
  inline SVGs anywhere else.
- Give exported components JSDoc: what it renders, the props that matter,
  and the measured WP dialect if the values were cloned from a page (see
  `components/Button.tsx` for the house style).

## 4. Register it (same change, not later)

- **Specimen** — render the component with its real props in
  `routes/storybook.tsx` so `/storybook` shows it.
- **Catalog** — add or extend its `COMPONENTS.md` entry (props, usage,
  variant notes).

## 5. Verify

`deno task check`, then eyeball the specimen on `/storybook` with
`deno task dev`. If the component backs a page, check that page too.
