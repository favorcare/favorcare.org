---
version: "2.0 (WordPress base)"
name: Favor Care
description: >-
  Design system transcribed from the live WordPress/Elementor site (canonical
  staging install, kit #66) so the Fresh rebuild is a 1:1 visual clone.
  Extracted 2026-10-11 from the DB dump (`_elementor_page_settings`) and the
  compiled kit CSS (`post-66.css`); see MIGRATION.md Phase 3. The previous
  gold/purple system is archived at ideas/design-v1.md.
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
  light: "#fbf9ed"
  error: "#cf2e2e"
  on-error: "#ffffff"
  error-container: "#f9dedc"
  on-error-container: "#410e0b"
typography:
  font: Inter (Google Fonts, weights 300–700; Inter Tight available for display)
  hero:
    fontSize: 7.5rem
    fontWeight: "600"
    lineHeight: 0.9
    letterSpacing: -6.8px
    mobile: 3.44rem / ls -3px / lh 0.9
  section-title:
    fontSize: 5rem
    fontWeight: "600"
    lineHeight: 0.9
    letterSpacing: -3.8px
    mobile: 3.125rem / ls -3px
  group-title:
    fontSize: 3.125rem
    fontWeight: "600"
    lineHeight: 0.9
    letterSpacing: -2px
    mobile: 2.2rem / ls -2px
  subtitle:
    fontSize: 1.875rem
    fontWeight: "500"
    lineHeight: 1.3
    letterSpacing: -2.8px
  subtitle-quiet:
    fontSize: 1.875rem
    fontWeight: normal
    lineHeight: 1.3
    letterSpacing: -1.8px
  hero-subtitle:
    fontSize: 1.375rem
    fontWeight: normal
    lineHeight: 1.3
    letterSpacing: -0.5px
  point:
    fontSize: 1.25rem
    fontWeight: "600"
    letterSpacing: -0.5px
  body-lg:
    fontSize: 1.125rem
    lineHeight: 1.5
    letterSpacing: -0.3px
  body-md:
    fontSize: 1rem
    lineHeight: 1.5
    letterSpacing: -0.3px
  button-label:
    fontSize: 1.375rem
    fontWeight: "700"
    mobile: 1.125rem
  label-md:
    fontSize: 14px
    fontWeight: "600"
  label-sm:
    fontSize: 12px
    fontWeight: "500"
  h-tags: h2 2em Inter · h3 2rem/300 · h4 2rem · h5/h6 1em/bold
rounded:
  sm: 0rem
  DEFAULT: 0rem
  md: 0rem
  lg: 0rem
  xl: 0rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  container-max: 1140px
elevation:
  sm: 0 1px 2px rgba(0, 0, 0, 0.06)
  md: 0 4px 12px rgba(0, 0, 0, 0.08)
  lg: 0 16px 40px rgba(0, 0, 0, 0.12)
  card: 0 1px 3px rgba(25, 23, 24, 0.08)
layout:
  contentContainerMaxWidth: 1140px
  breakpoints: 768 / 1025 (Elementor); Tailwind 768 / 1024 accepted
  gridColumns: 12
components:
  button:
    backgroundColor: transparent
    textColor: "#000000"
    border: none
    rounded: 0
    label: "{typography.button-label}"
    hover:
      backgroundColor: "#000000"
      textColor: "#ffffff"
  button-solid:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: 0
  card:
    backgroundColor: "{colors.surface}"
    rounded: 0
    padding: "{spacing.md}"
    boxShadow: "{elevation.card}"
    border: 1px solid "{colors.surface-container-high}"
  input-field:
    backgroundColor: "{colors.surface}"
    border: 1px solid "{colors.outline-variant}"
    rounded: 0
  badge:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
    rounded: 0
  link:
    color: "{colors.link}"
    hover: "{colors.link-hover}"
---

## Overview

This system is a **transcription, not an invention**: every value comes from the
WordPress site Favor Care actually ships (Elementor kit #66 on the canonical
staging install). The look is editorial and stark — near-black and warm beige
dominate, terracotta accents, dark-red links that flash yellow on hover, very
large tightly-tracked Inter headlines (letter-spacing down to −6.8px), light
weights at large sizes, and **square corners everywhere**.

## Colors

Eight source colors from the kit, confirmed against the compiled CSS
(`--e-global-color-*`): primary `#191718` (near-black), secondary `#E6DCD0`
(beige), text `#2D2D2D`, accent `#C85553` (terracotta), black `#000000`, white
`#FFFFFF`, Link Yellow `#FFB428`, Light `#FBF9ED` (cream).

Roles: **primary** carries the header bar, footer, dark sections and solid CTAs
(on-primary is white). **Secondary/beige** and the cream ramp
(`surface-container-*`) carry light section backgrounds. **Tertiary
(terracotta)** is the accent for highlights and hover moments. Links are dark
red `#C8221F`, hovering to Link Yellow `#FFB428`. The kit also sets a black
`body_background`; page templates override it — pages are white.

Note: `tertiary-container`/`on-tertiary-container` are derived tints (the kit
has no terracotta container pair).

## Typography

Inter only, loaded from Google Fonts (weights 300–700; Inter Tight is referenced
by some WP pages and stays available). The canonical scale is the ten named
styles the WP designers used — HERO Text (7.5rem/600/−6.8px), Section Title
(5rem), Group Title (3.125rem), Sub-title (1.875rem), Hero Subtitle (1.375rem),
Point (1.25rem), Body Main / Body Text 18px (1–1.125rem, lh 1.5). Signature
rules: display sizes use **negative letter-spacing** and line-heights of
0.9–1.3; h3 is weight 300 at 2rem; body keeps ≥1.5 line-height for
accessibility.

## Layout

Content column max **1140px** (Elementor default; page cloning moves components
from `max-w-7xl` to `max-w-6xl`). Breakpoints 768/1025 — Tailwind's 768/1024 is
accepted (1px difference). 12-column mental model, 24px gutters, 8px base unit.

## Elevation & Depth

Flat. One card shadow (`0 1px 3px rgba(25,23,24,0.08)`) and the neutral sm/md/lg
trio for overlays. No glows.

## Shapes

**Fully square** (user decision, matching WP): buttons, cards, images, badges,
inputs — radius 0. `rounded-full` remains defined only for avatars, the progress
meter, and overlay close controls.

## Components

Buttons: transparent with black text, hover fills black with white text (the WP
default), label 1.375rem/700 (1.125rem mobile); solid variant = primary bg +
white text; all square, min-height 48px. Links: `#C8221F` → `#FFB428` hover.
Cards: white, 1px beige border, card shadow, square. Inputs: white,
outline-variant border, square. Badges: cream bg, dark text, square.

## Do's and Don'ts

**Do**

- Do keep display type tightly tracked (negative letter-spacing) — it is the
  brand's typographic signature.
- Do pair near-black with beige/cream for section rhythm; terracotta sparingly.
- Do use Link Yellow `#FFB428` for link hovers and accents on dark backgrounds.
- Do keep body text ≥ 16px with ≥ 1.5 line-height (accessibility floor carried
  over from v1).

**Don't**

- Don't use Link Yellow `#FFB428` for body text on white — it fails contrast; it
  is a hover/accent-on-dark color only.
- Don't round corners on components; the system is square (`rounded-full` is
  reserved for avatars, the progress meter, and overlay close buttons).
- Don't use the v1 gold/purple/green palette or glow shadows — those are retired
  with `ideas/design-v1.md`.
- Don't add shadows beyond the defined set; depth is minimal by design.
