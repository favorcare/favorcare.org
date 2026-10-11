# Component map — Elementor widgets → Fresh components

Generated from `census.json` (2026-10-11 dump). Widget counts are **upper
bounds**: Elementor duplicates widgets for per-breakpoint visibility, so expect
~1.5–2× the real unique-block count per page.

## Kit (the design system — `extracted/kit.json`)

| Token              | Value                                                                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Colors             | primary `#191718` · secondary `#E6DCD0` · text `#2D2D2D` · accent `#C85553` · custom: Black `#000000`, White `#FFFFFF`, Link Yellow `#FFB428`, Light `#FBF9ED`               |
| Fonts              | **Inter everywhere** (Google Fonts; + Inter Tight in page usage)                                                                                                             |
| Primary headline   | Inter bold 70px / lh 57 / ls −2.3                                                                                                                                            |
| Secondary headline | Inter normal 4vw / lh 1.3 / ls −1                                                                                                                                            |
| Body               | Inter normal / lh 1.5 / ls −0.3                                                                                                                                              |
| Also in kit        | h1–h6 + body + button + form-label typography, button colors/border/padding, link normal/hover colors, `viewport_md`/`viewport_lg` breakpoints, 10 custom typography entries |

DESIGN.md v2 + `assets/styles.css` @theme must be generated from these (Phase
3).

## Page effort (published entities, widget upper bounds)

| Entity                                                                                                                     | Widgets      | Text chars            | Notes                                |
| -------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------------- | ------------------------------------ |
| what-we-do (page)                                                                                                          | 104          | 290                   | heaviest; repeated program blocks    |
| home = `favor-care-homepage`                                                                                               | 104          | 2 666                 | carousels/slides dominate            |
| about (page)                                                                                                               | 102          | 804                   | gallery + team + accountability      |
| coffeeforacause-2 (page)                                                                                                   | 64           | 3 811                 | campaign page                        |
| get-involved (page)                                                                                                        | 48           | 0                     | cards + popups                       |
| givenow (page)                                                                                                             | 43           | 1 512                 | + regional giving library templates  |
| contact (page)                                                                                                             | 33           | 390                   | form + faq + map                     |
| 3 news posts                                                                                                               | 58 / 31 / 23 | 5 899 / 4 949 / 3 924 | long-form text                       |
| privacy-policy                                                                                                             | 2            | 7 127                 | mostly one text-editor               |
| Chrome: `new-header` 9, `main-footer` 8                                                                                    |              |                       |                                      |
| Popups: prayer-hub 4, volunteer-disclaimer 3, accreditation (in popup set)                                                 |              |                       |                                      |
| Regional giving templates: `new-php-giving` 89, `checkout-giving`, `usd-giving-cc`, `new-aud-giving`, `usd/aud-giving-bne` |              |                       | PH/US/AU blocks embedded in /givenow |

Build order (MIGRATION.md Phase 5): chrome → home → about → what-we-do →
get-involved → contact → givenow → news + posts → privacy-policy. Old/unused
variants (`home_page_20240927` 99, `coffeeforacause-old`, `favor-care-home-2`,
`favorcare-give`, `mnl-favorcare`, `favor-care-mnl`, `beneficiary-page`) are
**not** cloned — reference only.

## Widget → component mapping

| Elementor widget                                                | Upper bound | Fresh component                                                     | Status      |
| --------------------------------------------------------------- | ----------- | ------------------------------------------------------------------- | ----------- |
| heading                                                         | 494         | typography primitives / `SectionHeading`                            | restyle     |
| text-editor                                                     | 220         | curated strings in `content.ts` + prose wrapper                     | new (small) |
| button                                                          | 133         | `Button.tsx`                                                        | restyle     |
| image                                                           | 92          | `asset()` `<img>` pattern                                           | exists      |
| html                                                            | 24          | one curated JSX block per instance — review each                    | manual      |
| slides / media-carousel / image-carousel / testimonial-carousel | 46          | one `Carousel` island (config-driven)                               | new         |
| video                                                           | 18          | `VideoEmbed` (lazy iframe)                                          | new         |
| icon-box                                                        | 14          | `FeatureCard.tsx`                                                   | restyle     |
| form                                                            | 14          | form islands: contact (exists), certificate-of-donation, prayer-hub | partial     |
| image-gallery / gallery                                         | 13          | `Gallery` grid                                                      | new         |
| google_maps                                                     | 9           | iframe embed component                                              | new (tiny)  |
| toggle                                                          | 7           | `Faq.tsx` details pattern                                           | exists      |
| icon                                                            | 7           | inline SVG utility                                                  | new (tiny)  |
| nav-menu                                                        | 3           | `Navbar.tsx`                                                        | restyle     |
| theme-site-logo                                                 | 4           | logo component                                                      | exists      |
| call-to-action                                                  | 4           | `TakeAction`/`DonateCta`                                            | exists      |
| tabs                                                            | 1           | island only if the usage demands it                                 | defer       |
| wc-add-to-cart / cart / checkout / my-account                   | 13          | dropped (redirects); native checkout = Phase 6                      | —           |
| tec_events_* (~22) + 2 event loop templates                     |             | **decision needed: /events/**                                       | open        |
| loop-grid / taxonomy-filter                                     | 2           | news listing (server-rendered; filters later)                       | exists      |
| shortcode                                                       | 4           | resolve manually (likely giving embeds)                             | manual      |
| theme-post-* (title/excerpt/featured/content)                   | 4           | `routes/posts/[slug].tsx`                                           | exists      |

## Extraction notes

- `elementor_conditions` meta came back empty — template roles identified by
  slug/name instead (header/footer/popups are self-evident). Refine if display
  conditions ever matter.
- `nyp.json`: only 2 funds use Name-Your-Price (care-packs min ₱1, redemptio
  suggested ₱70 000); other 6 `/give/*` products price elsewhere (Woo product
  prices / checkout fields) — Phase 6 detail.
- `snippets.json` (27 rows) + `redirection.json` (11 rows) extracted for Phase
  4/7 review.
