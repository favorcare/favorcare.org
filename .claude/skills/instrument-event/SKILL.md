---
name: instrument-event
description: Track a CTA, form, or custom analytics event — use when asked to
  add tracking, measure clicks or conversions, wire analytics, or answer how
  UTM attribution works.
---

# Instrument an analytics event

The seam lives in `components/Analytics.tsx` + `islands/Tracking.tsx`
(DEVELOPMENT.md "Analytics & UTM tracking" is the reference). Pageviews are
automatic in all three vendors; custom events go through one of three
seams — all fan out to every configured vendor with first/last-touch UTM
attribution merged in (`first_utm_*` / `last_utm_*`).

## 1. Pick the seam

- **A `Button`** → add `track="event_name"` (and `trackProps={{ key: "value"
  }}` for context). It renders `data-track` / `data-track-props`; no island
  needed.
- **Any other server-rendered element** → `data-track="event_name"` plus
  optional `data-track-props` (JSON). The delegated click listener in
  `islands/Tracking.tsx` picks it up.
- **Inside an island** (form submits, non-click moments) →
  `import { track } from "./Tracking.tsx"` and call
  `track("event_name", { … })`. `window.favorcareTrack(…)` is the console
  equivalent for debugging.

## 2. Name it

`snake_case`, verb-first, stable forever — events are a public API once
dashboards exist. Live inventory: `donate_click`, `cta_band_click`,
`give_hero_click`, `give_online_click` (`region: ph/us/au`),
`contact_submit`, `newsletter_submit`, `tax_proof_submit`,
`volunteer_submit`.

## 3. Register it (same change)

Add the row to the **Events table** in `DEVELOPMENT.md` ("Events") — event,
when it fires, which seam. Call-site props win over attribution on key
collisions; never put PII in props (MIGRATION.md rule: no donor PII in
analytics).

## 4. Verify

With keys in `.env` (see `.env.example`): `deno task dev`, GA4 DebugView /
Mixpanel Live view, click the thing or run `favorcareTrack("demo")` in the
console. With no keys the site renders zero analytics markup — the seam is
dormant, not broken.
