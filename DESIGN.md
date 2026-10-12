---
version: "2.1 (WordPress base, as-built)"
name: Favor Care
description: >-
  Design tokens for the Fresh rebuild, transcribed from the live
  WordPress/Elementor site and corrected against what the WP-clone pages
  actually render (kit #66 globals + per-page measured geometry). Extracted
  from the DB dump, the compiled kit CSS (post-66.css), and the per-page
  visual passes (360/768/1280 measurements). The component layer built on
  these tokens is documented in COMPONENTS.md; the retired gold/purple
  system lives at ideas/design-v1.md.
logo:
  src: /logo-black.svg
colors:
  background: "#ffffff"
  on-background: "#2d2d2d"
  surface: "#ffffff"
  surface-dim: "#fbf9ed"
  surface-bright: "#ffffff"
  surface-container-lowest: "#faf7ee"
  surface-container-low: "#f5f1e6"
  surface-container: "#efe9db"
  surface-container-high: "#e6dcd0"
  surface-container-highest: "#dcd2bf"
  on-surface: "#2d2d2d"
  on-surface-variant: "#55524c"
  outline: "#6b675f"
  outline-variant: "#c9c2b4"
  primary: "#191718"
  on-primary: "#ffffff"
  primary-container: "#2d2d2d"
  on-primary-container: "#e6dcd0"
  primary-hover: "#000000"
  primary-active: "#2d2d2d"
  secondary: "#e6dcd0"
  on-secondary: "#191718"
  secondary-container: "#fbf9ed"
  on-secondary-container: "#2d2d2d"
  tertiary: "#c85553"
  on-tertiary: "#ffffff"
  tertiary-container: "#f1dedd"
  on-tertiary-container: "#6b2c2a"
  link: "#c8221f"
  link-hover: "#ffb428"
  yellow: "#ffb428"
  article-yellow: "#f2b705"
  light: "#fbf9ed"
  error: "#cf2e2e"
  on-error: "#ffffff"
  error-container: "#f9dedc"
  on-error-container: "#410e0b"
typography:
  font: Inter (Google Fonts, weights 300–700; Inter Tight available for display)
  # The page scales actually shipped by the WP-clone pages (measured at
  # 360/768/1280), not the kit's named display styles.
  hero-title: 38px / 56px (768) / 70px (1280) · bold or semibold per page
  section-title: 28px / 39px (768) / 56px (1280) · bold (subpages) or semibold + tracking-tight (homepage)
  card-title: 25px / 30px (768) / 36px (1280) · bold
  give-now-jumbo: 34–42px mobile / 76px (768+) · bold
  card-body: 14px / 15px (768) / 18px (1280) · leading-relaxed
  newsletter-title: 28px / 36px (768) · bold (contact page dialect)
  body: 16px · line-height 1.5 (accessibility floor)
  label: 12px / 14px (768) · bold · uppercase · tracking-wider (the gold eyebrow)
rounded:
  card: 30px
  button: full pill
  jumbo-button: 30px or 50px (give-now dialects)
  gallery-media: 30px
  overlay-close: full
  note: kit globals say 0 — the page templates override with the radii above
spacing:
  unit: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  container-max: 1140px
  gutters-mobile: 20px (360)
  gutters-768: 10px subpages / 40px homepage
  gutters-1280: 0
elevation:
  sm: 0 1px 2px rgba(0, 0, 0, 0.06)
  md: 0 4px 12px rgba(0, 0, 0, 0.08)
  lg: 0 16px 40px rgba(0, 0, 0, 0.12)
  card: 0 1px 3px rgba(25, 23, 24, 0.08)
layout:
  contentContainerMaxWidth: 1140px
  headerContainerMaxWidth: 1200px
  breakpoints: 768 / 1025 (Elementor); Tailwind 768 / 1024 accepted
  gridColumns: 12
---

## Overview

A **transcription, not an invention**: every value comes from the WordPress site
Favor Care ships (Elementor kit #66 on the canonical staging install) as its
pages actually render — the kit's global settings say one thing (square corners,
7.5rem display type), the page templates ship another (pills, 30px cards,
38/56/70 titles). This file records the latter, because that is what the clone
matches. The look is warm and direct — a yellow header bar, near-black text and
bands, white pages with cream tints, big bold Inter headings, and fully-rounded
pill buttons.

**Components are documented separately in [COMPONENTS.md](COMPONENTS.md)** —
props, variants, and usage for every reusable component. This file is tokens
only. When a token changes, update this file first, then mirror it in
`assets/styles.css` (`@theme`).

## Colors

Eight source colors from the kit, confirmed against the compiled CSS
(`--e-global-color-*`): primary `#191718` (near-black), secondary `#E6DCD0`
(beige), text `#2D2D2D`, accent `#C85553` (terracotta), black `#000000`, white
`#FFFFFF`, Link Yellow `#FFB428`, Light `#FBF9ED` (cream).

Roles: **yellow** (`#FFB428`) carries the header bar, section eyebrows, card
fills (Care Updates, Get-in-touch, Tax-Deductible), and the yellow pill buttons
on black — it is the brand's most visible color. **primary** (near-black)
carries text, black bands, the footer, and black pill buttons. The cream ramp
(`surface-container-*`) carries light section backgrounds. Links are dark red
`#C8221F` hovering to yellow. The posts article system has **its own yellow**
`#F2B705` (`article-yellow`) for pull-quotes and ad-break CTA cards — do not mix
the two up.

## Typography

Inter only, loaded from Google Fonts (weights 300–700; Inter Tight stays
available). Titles use the measured page scales (see frontmatter): heroes
38/56/70, section titles 28/39/56, card titles 25/30/36, the give-now jumbo 76px
from md. Body text keeps ≥16px with ≥1.5 line-height (accessibility floor); card
body runs 14/15/18 as measured. The gold eyebrow label is 12/14px bold uppercase
with wide tracking.

## Layout

Content frame **1140px**; the header bar uses 1200px. Gutters: 20px at 360; at
768 the subpages keep Elementor's 10px while the homepage measures 40px
(`Container pad="page"` vs `pad="home"`); none at 1280. Breakpoints 768/1025 —
Tailwind's 768/1024 is accepted (1px difference).

## Elevation & Depth

Flat. One card shadow (`0 1px 3px rgba(25,23,24,0.08)`) and the neutral sm/md/lg
trio for overlays/modals. No glows.

## Shapes

**Pills and 30px rounds.** Buttons are full pills (`rounded-full`) except the
give-now jumbo CTAs (30px / 50px rounds). Cards, photo tiles, gallery media, and
the yellow content cards round at **30px**. Overlay close controls stay
full-round. The kit's square-corner global is overridden by every page template
and is not part of this system.

## Do's and Don'ts

**Do**

- Do build pages from the components in COMPONENTS.md — a visual change should
  be a one-file edit.
- Do use Link Yellow `#FFB428` for eyebrows, card fills, and pills on black; use
  `article-yellow` only inside the posts article system.
- Do keep body text ≥ 16px with ≥ 1.5 line-height.
- Do keep touch targets ≥ 48px (`min-h-12` on buttons and icon links).

**Don't**

- Don't hardcode hex values in components — use the Tailwind tokens from
  `assets/styles.css` (`bg-yellow`, `text-article-yellow`, …).
- Don't hand-roll inline SVGs, pill links, hero shells, or section headings —
  `components/icons.tsx`, `Button`, `PageHero`, and `SectionHeading` exist for
  those (see COMPONENTS.md).
- Don't use Link Yellow for body text on white — it fails contrast; it is a
  surface/accent-on-dark color.
- Don't use the v1 gold/purple/green palette or glow shadows — retired with
  `ideas/design-v1.md`.
