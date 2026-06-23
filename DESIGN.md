---
version: alpha
name: Favor Care
description: >-
  A faith-driven nonprofit design system centered on warmth, accessibility, and hopeful action. The brand combines a
  vibrant golden accent with deep, grounded neutrals to communicate both urgency and compassion in service delivery.
logo:
  src: https://favorcare.org/wp-content/uploads/2022/12/cropped-cropped-FAVOR-CARE-LOGO-BLACK-1-180x180.png
colors:
  surface: "#ffffff"
  surface-dim: "#f5f5f5"
  surface-bright: "#fafafa"
  surface-container-lowest: "#eeeeee"
  surface-container-low: "#e9e6ed"
  surface-container: "#e0dce4"
  surface-container-high: "#d4cfd7"
  surface-container-highest: "#cfc8d0"
  on-surface: "#171717"
  on-surface-variant: "#515151"
  inverse-surface: "#2b2b2b"
  inverse-on-surface: "#f5f5f5"
  outline: "#767676"
  outline-variant: "#abb8c3"
  surface-tint: "#ffb428"
  primary: "#ffb428"
  on-primary: "#000000"
  primary-container: "#ffd966"
  on-primary-container: "#4d3200"
  inverse-primary: "#ff9500"
  secondary: "#720eec"
  on-secondary: "#fcfbfe"
  secondary-container: "#eae6f5"
  on-secondary-container: "#2d0a5c"
  tertiary: "#00d084"
  on-tertiary: "#ffffff"
  tertiary-container: "#7bdcb5"
  on-tertiary-container: "#003d28"
  error: "#cf2e2e"
  on-error: "#ffffff"
  error-container: "#f9dedc"
  on-error-container: "#410e0b"
  primary-fixed: "#ffd966"
  primary-fixed-dim: "#ffb428"
  on-primary-fixed: "#2d1f00"
  on-primary-fixed-variant: "#6b4c00"
  secondary-fixed: "#eae6f5"
  secondary-fixed-dim: "#cfc8d8"
  on-secondary-fixed: "#1a0033"
  on-secondary-fixed-variant: "#4d2a7f"
  tertiary-fixed: "#7bdcb5"
  tertiary-fixed-dim: "#5bc9a0"
  on-tertiary-fixed: "#001f15"
  on-tertiary-fixed-variant: "#004d37"
  background: "#ffffff"
  on-background: "#171717"
  surface-variant: "#e9e6ed"
typography:
  display:
    fontFamily: Inter
    fontSize: 70px
    fontWeight: "700"
    lineHeight: 78px
    letterSpacing: "-0.04em"
  headline-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: "600"
    lineHeight: 48px
    letterSpacing: "-0.02em"
  headline-md:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: "600"
    lineHeight: 36px
    letterSpacing: "-0.01em"
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "600"
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  container-max: 1280px
elevation:
  sm: 0 1px 2px rgba(0, 0, 0, 0.06)
  md: 0 4px 12px rgba(0, 0, 0, 0.08)
  lg: 0 16px 40px rgba(0, 0, 0, 0.12)
layout:
  containerMaxWidth: 1280px
  gridColumns: 12
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 16px 24px
    height: 48px
    fontWeight: "700"
  button-primary-hover:
    backgroundColor: "#ff9500"
    textColor: "{colors.on-primary}"
    boxShadow: 0 4px 12px rgba(255, 180, 40, 0.25)
  button-primary-active:
    backgroundColor: "#e6a000"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.DEFAULT}"
    padding: 18px 22px
    height: 48px
    border: 2px solid {colors.primary}
  button-secondary-hover:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
  button-donate:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.DEFAULT}"
    padding: 12px 20px
    height: 44px
    fontWeight: "700"
    border: none
  button-donate-hover:
    backgroundColor: "#ff9500"
    boxShadow: 0 3px 8px rgba(0, 0, 0, 0.15)
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.DEFAULT}"
    padding: "{spacing.md}"
    boxShadow: "{elevation.sm}"
    border: 1px solid {colors.surface-container-high}
  card-hover:
    backgroundColor: "{colors.surface-bright}"
    boxShadow: "{elevation.md}"
    transform: translateY(-2px)
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.DEFAULT}"
    padding: 8px 16px
    border: 1px solid {colors.outline-variant}
    height: 40px
  input-field-focus:
    borderColor: "{colors.primary}"
    boxShadow: 0 0 0 3px rgba(255, 180, 40, 0.1)
  modal-overlay:
    backgroundColor: rgba(0, 0, 0, 0.5)
    backdropFilter: blur(4px)
  modal-content:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    boxShadow: "{elevation.lg}"
    border: 1px solid {colors.surface-container-high}
  badge-primary:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  badge-secondary:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  list-item:
    backgroundColor: transparent
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
    textColor: "{colors.on-surface}"
  list-item-hover:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.primary}"
  divider:
    backgroundColor: "{colors.outline-variant}"
    height: 1px
    margin: "{spacing.md} 0"
---

## Overview

Favor Care's design system embodies **Compassionate Minimalism**—a philosophy
that strips away visual noise to center human connection and actionable hope.
The brand serves faith-driven communities and donors seeking transparent,
impactful giving; the interface evokes warmth through a signature golden accent
(#ffb428) paired with deep, trustworthy neutrals (charcoal #171717, soft
lavender #e9e6ed). Every interaction is designed to feel both urgent and
welcoming, reflecting the organization's dual mission: immediate care delivery
and long-term community transformation.

The voice is direct, humble, and outcome-focused. Favor Care speaks in concrete
terms—not "support our vision" but "join 2,400 children in school this year."
Tone avoids sentimentality; instead, it grounds hope in measurable action.
Example: "We've served 15,000 families. Your gift feeds one child for a month."
The typography system (Inter for clarity, Favorvetica for brand moments)
reinforces this balance: professional enough for donors, warm enough for
families.

## Colors

The color palette is built on **trust-first hierarchy**. Primary (#ffb428) is
the call-to-action gold—warm, optimistic, and impossible to miss on buttons,
links, and accent moments. It appears sparingly to maintain impact; overuse
dilutes urgency. On-primary text is always pure black (#000000) for maximum
contrast (WCAG AAA at 18.5:1 ratio) and legibility in high-stakes donation
flows.

Secondary (#720eec, a deep purple) supports brand moments and secondary CTAs,
creating visual rhythm without competing for attention. Tertiary (#00d084, a
healing green) signals positive outcomes, success states, and growth—used in
progress indicators and confirmation messages. The surface stack (white #ffffff
through lavender #cfc8d0) provides breathing room; on-surface text (#171717)
maintains readability

## Typography

Inter is the system typeface—geometric, neutral, and highly legible at small
sizes (12px label-sm through 70px display). The type scale follows a 1.4x
multiplier, creating clear visual hierarchy without jarring jumps. Display
(70px, 700 weight, -0.04em tracking) anchors hero sections and major
announcements; headline-lg (40px, 600 weight) breaks content into scannable
sections; body-md (16px, 400 weight, 24px line-height) is the default reading
size, set to 1.5 line-height for accessibility. Label-md (14px, 600 weight,
0.02em tracking) appears on buttons and form labels, with tighter letter-spacing
to signal interaction. On small labels over busy backgrounds (e.g., badges over
image overlays), apply text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) to preserve
legibility. Favorvetica (custom brand

## Layout

The layout system uses a 12-column grid with a 1280px max-width container,
centered with auto margins. Gutter spacing is 24px (md token) between columns;
section separation uses lg spacing (40px) to create breathing room between
content blocks. The page rhythm follows a 8px base unit: all padding, margins,
and gaps are multiples of 8px (4px, 12px, 24px, 40px, 64px). Hero sections span
full-width with a 40px horizontal gutter on mobile, 64px on desktop. Card grids
use 24px gap between items; on mobile (< 768px), cards stack single-column with
12px margin-bottom. Input fields and form groups use 12px vertical spacing;
button groups use 8px horizontal spacing. The container-max-width of 1280px
ensures readability on ultra-wide displays while maintaining focus on content.

## Elevation & Depth

Depth is conveyed through a three-tier shadow system and subtle transforms.
Level 1 (Base/Surface): no shadow; flat, grounded appearance for primary content
areas. Level 2 (Standard Card): box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), used
on cards, modals, and lifted containers; this creates gentle separation without
drama. Level 3 (Elevated/Hover): box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12),
applied on hover states and modal overlays to signal interactivity. Buttons
receive a micro-lift on hover: transform: translateY(-2px) paired with the Level
2 shadow, creating tactile feedback. Modals use

## Shapes

The shape philosophy is **Approachable Precision**—rounded corners signal warmth
and accessibility, while measured radii prevent a childish or overly soft
appearance. Buttons use full radius (9999px / border-radius: 50vh) to feel
inviting and clickable; this is the most rounded element in the system. Cards
and modals use lg radius (1rem / 16px) for a modern, professional look. Input
fields and smaller components use DEFAULT radius (0.5rem / 8px) for subtle
softness. Dividers and minimal UI elements use sm radius (0.25rem / 4px) or no
radius at all. The rationale: full-radius buttons stand out

## Components

### Action Elements

Buttons are the primary interaction pattern. **Button-primary** (bg: #ffb428,
text: #000000, padding: 16px 24px, height: 48px, border-radius: 9999px) is the
dominant CTA—used for "Donate," "Join," and high-priority actions. On hover,
shift to #ff9500 and apply box-shadow: 0 4px 12px rgba(255, 180, 40, 0.25) to
signal interactivity. On active, darken to #e6a000 with no shadow.
Button-secondary uses a transparent background with a 2px solid primary border;
on hover, fill with primary-container (#ffd966) and shift text to
on-primary-container (#4d3200). All buttons use Inter 600 weight, label-md size
(14px), with 0.02em letter-spacing. Buttons must have a minimum 48px height for
touch targets; use padding to achieve this rather than line-height alone.

### Containers & Sur

## Do's and Don'ts

**Do**

- Do use primary gold (#ffb428) exclusively for high-priority CTAs—donate
  buttons, "Join" links, and urgent calls-to-action. Overuse dilutes impact.
- Do maintain 24px gutter spacing between major content sections; this breathing
  room is essential to the brand's calm, trustworthy feel.
- Do apply Inter 600 weight to all interactive elements (buttons, links, form
  labels) to signal clickability without relying on color alone.
- Do test all color combinations against WCAG AA contrast minimums; primary +
  on-primary achieves AAA (18.5:1), a benchmark for accessible design.
- Do use the full-radius button style (border-radius: 9999px) exclusively for
  primary actions; reserve lg-radius (16px) for cards and containers.

**Don't**

- Don't use secondary purple (#720eec) or tertiary green (#00d084) as primary
  CTAs; these are supporting accents and will confuse users about action
  priority.
- Don't apply shadows exceeding 40px blur radius; the system uses a maximum of 0
  16px 40px rgba(0, 0, 0, 0.12) to maintain a light, accessible interface.
- Don't mix border-radius values arbitrarily—use the defined scale (sm, DEFAULT,
  md, lg, xl, full) to maintain visual consistency and reduce cognitive load.
- Don't set body text smaller than 16px or line-height below 1.5; this is the
  minimum for accessibility and readability, especially for older donors and
  mobile users.
- Don't use Favorvetica (brand serif) below 28px or in body copy; it's reserved
  for hero moments and accreditation badges to preserve legibility and brand
  distinctiveness.
