# Migration inventory — WP URL → Fresh route

Legend for **Decision**: `clone` (rebuild in Fresh), `301` (redirect), `410`
(gone), `open` (needs a call). Sources: staging WP recon + live crawl, both
2026-10-11. Staging install is canonical for content; live URLs feed the
redirect map.

## Pages

| Live URL (indexed)                                   | Staging content         | Fresh route        | Decision                                                                                     |
| ---------------------------------------------------- | ----------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| `/`                                                  | home                    | `/`                | clone                                                                                        |
| `/about`                                             | about                   | `/who-we-are`      | clone + 301                                                                                  |
| `/what-we-do`                                        | what-we-do (6 programs) | `/what-we-do`      | clone                                                                                        |
| `/get-involved`                                      | get-involved            | `/get-involved`    | clone                                                                                        |
| `/contact`                                           | contact                 | `/contact`         | clone                                                                                        |
| `/news-updates`                                      | post archive            | `/news-updates`    | clone                                                                                        |
| `/givenow`                                           | donation hub            | `/givenow`         | clone (Phase 6 checkout)                                                                     |
| `/privacy-policy`                                    | privacy                 | —                  | clone (Phase 7; route TBD)                                                                   |
| `/coffeeforacause`                                   | P60k campaign page      | `/coffeeforacause` | clone (rebuilt as the CFAC campaign sub-brand; copy is fresh from the team, not the WP page) |
| `/bne`                                               | Brisbane location page  | —                  | open                                                                                         |
| `/shop`, `/shop-woocommerce`, `/cart`, `/my-account` | WooCommerce             | —                  | 301 → `/givenow`                                                                             |
| `/tickets-checkout`, `/tickets-order`                | event ticketing         | —                  | 301 → `/givenow`                                                                             |
| `/donate`, `/give` (live 302s)                       | —                       | —                  | 301 → `/givenow`                                                                             |
| `/pampanga-2024` (dead link on live)                 | draft, never published  | —                  | no redirect; don't carry the link                                                            |

## Posts (staging slugs are canonical; live slugs redirect)

| Staging slug (canonical)                                         | Date       | Live slug (redirect source)                                  |
| ---------------------------------------------------------------- | ---------- | ------------------------------------------------------------ |
| `five-arms-of-favor-care`                                        | 2026-10-08 | `the-five-arms-of-care`                                      |
| `seen-valued-and-cared-for-our-medical-outreach-in-tondo-manila` | 2026-07-06 | `free-medical-outreach-in-tondo-manila`                      |
| `every-child-matters-bringing-health-and-care-to-antipolo`       | 2026-06-09 | `every-child-matters-bringing-health-and-care-to-antipolo-2` |

Drafts (not migrated): `Sample Nap`, `Pampanga 2024`.

## Donation products (WooCommerce Name-Your-Price)

Live `/give/*`: `favor-care`, `donation`, `coffee-for-a-cause`,
`community-medical-clinics`, `redemptio`, `general-2`, `care-packs` (8th product
TBD from dump). Decision: map each to `/givenow?fund=<slug>` designation in the
Phase 6 checkout; `/give/<slug>` 301s there. NYP min/suggested amounts live in
`wgyd_postmeta`.

## Archives & taxonomy

| URL class                                         | Decision              |
| ------------------------------------------------- | --------------------- |
| `/posts/tag/<tag>` (2 tags)                       | 301 → `/news-updates` |
| `/posts/category/<cat>`                           | 301 → `/news-updates` |
| `/posts/author/admin-aeriel`                      | 410                   |
| `/product-category/*` (3)                         | 410                   |
| `/news-updates/page/2/` (if any)                  | 301 → `/news-updates` |
| `?add-to-cart=*`                                  | 301 → `/givenow`      |
| `/events/` (The Events Calendar — verify on dump) | open                  |

## Redirect sources beyond the sitemap

The WP `redirection` plugin stores an existing redirect map in
`wgyd_redirection_*` — extract during Phase 4 and merge into the Fresh redirect
middleware (Phase 7). Trailing slashes normalize; case is lowercase everywhere.
