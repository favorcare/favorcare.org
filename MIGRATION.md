# WordPress → Deno Fresh Migration Plan (favorcare.org)

> **For agentic workers:** Execute phase-by-phase; each phase ends at a
> verifiable gate. Steps use checkbox (`- [ ]`) tracking.

**Goal:** Replace the WordPress + Elementor Pro + WooCommerce site at
favorcare.org with the existing Deno Fresh 2 repo, as a **visual clone** of the
current design, with a **native donation checkout**, hosted on **Cloudflare
Workers** (retargeted from Deno Deploy — see Phase 8), media on **Cloudflare
R2**.

**Architecture:** Fresh routes/components (already scaffolded on
`feat/site-pages`) are re-skinned to Elementor-extracted tokens; content comes
from the WP DB dump (not DOM scraping); legacy media URLs keep working via a
same-path Cloudflare→R2 route; donations run through server-side PayMongo
session creation + signature-verified webhooks persisted to durable storage.

**Tech stack:** Deno Fresh 2, Preact, Tailwind v4, Cloudflare R2 + DNS, Deno
Deploy, PayMongo API, Resend (email), Mailchimp API, Playwright (clone
verification).

**Feasibility verdict: YES** — 7 core pages, 3 posts, 8 donation products. The
two real cost centers are (a) the full visual restyle of ~30 existing components
(the branch was built to the _new_ DESIGN.md brand, and the chosen fidelity is
Elementor-clone), and (b) the native checkout with webhooks/ledger. Adversarial
review (3 subagents) found 7 blockers, all addressed below.

**Live-site facts (verified 2026-10-11):** WordPress 6.8, Elementor ~3.29 + Pro
~3.28, WooCommerce 10.7 (+ Name-Your-Price), hello-elementor child theme, Yoast
SEO, MonsterInsights GA4 (G-H1S6TMK8YD, G-Z0PQZP14DB), Mailchimp-for-WP, The
Events Calendar (`/events/`), dynamic-visibility-for-elementor, Cloudflare
fronting, self-hosted DM Sans. 15 pages / 3 posts / 8 donation products.
Donations external via PayMongo page, Zeffy (US), Global Development Group
J1158N (AU), bank details, plus a Woo Name-Your-Price flow.

## Global constraints

- Visual fidelity = per-page screenshot parity with live WP at 360/768/1280;
  clone visuals, **not** Elementor's markup semantics (axe pass required).
- AGENTS.md rules apply: `deno task check` gate, DESIGN.md-first token changes,
  no auto-git.
- Donor PII never in logs/analytics; hosted PayMongo pages only (no card fields
  in our UI).
- WP box is production until cutover — everything on it is read-only until the
  final delta.

---

## Phase 0 — Land `feat/site-pages`

**Branch state at planning time:** 4 committed asset-only commits (48 images
under `static/images/pages/…`) = entire committed delta vs `main`. All page code
(6 routes, 7 components, ContactForm island, content/nav updates) was
uncommitted; no upstream.

- [x] Localize the 2 news covers hotlinked from favorcare.org
      (`components/posts.ts`) into `static/` — they'd break the day WP dies.
- [x] Run `deno task check` + `deno task dev`, click through all routes + posts.
- [x] Update stale DEVELOPMENT.md (old slugs; note mailto-only contact form as a
      **cutover blocker**).
- [x] Commit in logical chunks (components → routes → content), push, PR,
      **merge**. _(Done 2026-10-11 — PR #1 merged; also fixed a missing
      `ABOUT.banner` that broke typecheck.)_
- [x] Note: current gold/navy styling gets fully restyled in Phase 5 — merging
      now is structure-first, correct, but expect the churn.

**Gate:** check passes, pages render, no `favorcare.org` URLs left in markup.
_(Passed 2026-10-11: all routes 200 on dev server, zero WP hotlinks.)_

## Phase 1 — WordPress inventory & extraction (SSH)

- [x] Recon: `wp --info` (fallback: mysqldump + local wp-cli if absent);
      `wp plugin list` — **specifically check for WooCommerce Subscriptions /
      recurring plugins and pending Action Scheduler jobs** (changes Phase 6
      scope); `wp theme list` (child theme!).
- [x] Inventory posts: pages, posts, `product`, `elementor_library`
      (header/footer/popups live here with `elementor_conditions` meta),
      `elementor_font`; decide The Events Calendar's `/events/` (missing from
      sitemap). _(Census complete 2026-10-11: 82 posts of interest, 63
      elementor-edited, 55 published — see `migration/component-map.md`.
      `/events/` decision still open.)_
- [x] `wp db export` full dump (archive) + targeted extracts of `wp_postmeta`
      (`_elementor_data`, `_nyp` name-your-price meta, Yoast title/metadesc),
      `wp_options` (Elementor kit, MC4WP config), users table. _(241M dump, 134
      tables, extracted to JSON by `migration/scripts/extract-elementor.ts` —
      kit tokens, per-page trees, census, yoast, nyp, snippets, redirects.)_
- [x] Expanded file sync (not just uploads): all of
      `wp-content/uploads/elementor/` (incl. `css/post-*.css` — the compiled
      per-page CSS is the clone's crown jewel), mu-plugins, child theme,
      `.htaccess`/nginx rules; export Cloudflare zone rules. _(uploads 1.5G
      pulled; `google-fonts/` dirs arrived EMPTY — canonical staging loads
      Inter/Inter Tight from Google Fonts, no self-hosted fonts. CF zone rules
      export still pending — dashboard task.)_
- [ ] No "freeze" fiction — weekly idempotent deltas: rclone sync +
      `post_modified > last-sync` DB delta; final delta at cutover with
      `migration/inventory.md` diff. _(Mechanism documented in the runbook;
      delta re-runs only needed if content changes before cutover.)_
- [x] Deliverable: `migration/inventory.md` — every WP URL → Fresh route →
      decision (clone/redirect/410). _(Skeleton pre-filled 2026-10-11 from
      recon + live crawl; dump pending.)_

**Recon findings (2026-10-11 — box is cPanel `staging.favorcare.org`, WP at
`~/public_html`, prefix `wgyd_`, runbook in
`migration/runbooks/phase1-extraction.md`):**

- **The staging install is the canonical content source** (decided): newer than
  live — "Five Arms" republished 2026-10-08, posts re-slugged/cleaned, live's
  `-2` duplicate gone, `/pampanga-2024` explained (draft). Live URLs still feed
  the redirect map.
- **No Subscriptions / recurring plugins** → Phase 6 scope locked as planned.
  `wc-paymongo-payment-gateway` active (PayMongo confirmed as the gateway).
- No child theme — `hello-elementor` only; customizations live in the Elementor
  kit + `code-snippets`.
- Phase 4 review queue: `code-snippets` (custom PHP in `wgyd_snippets`),
  `redirection` (existing redirect map in `wgyd_redirection_*`), `post-smtp`
  (mail config), `yaymail` + `woo-checkout-field-editor-pro` + NYP meta.
- Uploads ≈ 1.5G. Elementor 3.35.5 / Pro 3.35.1 (newer than live's 3.29 —
  validate the parser against the dump schema, not the live crawl).
- Data lands in an operator-managed dir **outside this repo**; dumps/secrets
  never enter git.

**Gate:** dump + files restorable locally; inventory.md covers all Yoast-sitemap
URLs + `/events/`. _(Passed 2026-10-11: 241M dump parsed end-to-end by
`migration/scripts/extract-elementor.ts` — kit tokens, 63 elementor trees,
census, NYP pricing, snippets, redirects all extracted. `/events/` decision
remains open in `migration/inventory.md`.)_

## Phase 2 — R2 asset pipeline

- [ ] Public R2 bucket + custom domain `assets.favorcare.media`; `rclone copy`
      **preserving `/wp-content/uploads/YYYY/MM/file` paths**.
- [ ] Legacy URLs: Cloudflare route on `favorcare.org/wp-content/uploads/*`
      serving R2 **same-path, zero redirects** (Worker or R2-binding rule) —
      _not_ a Fresh 301 (no per-request function invocations, no redirect hop).
- [ ] New markup references final canonical URLs directly;
      `Cache-Control: immutable` + CF cache rule.
- [x] Re-runnable rclone wrapper for deltas. _(Landed 2026-10-11:
      `scripts/assets.ts` + `deno task assets:pull|assets:push` — plain `copy`,
      no `--delete`.)_

**Asset-serving architecture (added 2026-10-11):**

- **One bucket, two prefixes**: `images/**` (this repo's assets, synced via
  `deno task assets:push`) and `wp-content/uploads/**` (legacy WP media).
- **Dev = local, prod = CDN**: every image path in markup goes through `asset()`
  from `utils/assets.ts` — returns the local `static/images/...` path when
  `ASSET_BASE_URL` is unset (dev), prefixes `https://assets.favorcare.media`
  when set on the Cloudflare Workers project (prod). Landed 2026-10-11 (all 22
  literals wrapped).
- **`static/images/` is gitignored** — new images are published with
  `assets:push`, never via git. Gitignored assets cannot be CI-synced (CI only
  sees git), so publishing is a local push; that is the accepted trade-off for
  slim deploys.
- **No-404 sequencing for untracking**: populate the bucket → set
  `ASSET_BASE_URL` on the Deploy project → verify prod serves images from R2 →
  only then `git rm -r --cached static/images`. Until that point,
  already-tracked images keep deploying; the transitional escape hatch for new
  images is `git add -f`.
- **R2 over Cloudinary**: R2 preserves exact legacy URL paths (Cloudinary's
  transform-URL format cannot), has zero egress, and shares the Cloudflare
  account with DNS. If Cloudinary's on-the-fly transforms are ever wanted, the
  base-URL helper makes the swap a one-line change.

**Gate:** every media URL from inventory resolves from R2; re-run is a no-op.

## Phase 3 — Design tokens & chrome extraction

- [x] **Fonts first** _(done 2026-10-11 — corrected: canonical staging loads
      **Inter + Inter Tight from Google Fonts**, not self-hosted DM Sans; the
      `<link>` in `routes/_app.tsx` now carries Inter 300–700 + Inter Tight)._
- [x] Extract Elementor global kit (colors, type scale, container widths,
      breakpoints) from DB + `post-*.css` → rewrite **DESIGN.md v2** (archive v1
      under `ideas/`), mirror into `assets/styles.css` `@theme`. Budget
      honestly: this invalidates the token set of ~30 existing components.
      _(Done 2026-10-11: DESIGN.md v2 + @theme v2 landed — token names kept,
      values swapped to the WP palette, fully square, link pair added,
      display-scale text utilities added; broken pairs fixed in Header
      DonateCta, Button pills/glow, Badge, storybook.)_
- [x] Parse `elementor_library` + `elementor_conditions` to identify
      header/footer/popup templates; build widget→component map
      (`migration/component-map.md`) incl. Font Awesome/eicons, Swiper
      carousels, motion-fx/sticky usage. _(Census + map done via
      extract-elementor.ts; conditions meta was empty — template roles read from
      slugs.)_
- [x] Update `storybook.tsx` fixtures to new tokens. _(shadow-glow→card,
      inverted-chip demo square; remaining fixtures render against v2 tokens
      automatically.)_

**Gate:** DESIGN.md v2 merged; chrome components compile against new tokens.
_(Passed 2026-10-11: check green, dev probe 200s with `--color-primary:#191718`
and `--radius-lg:0rem` in rendered CSS. Chrome STRUCTURE rebuild from the dump
templates is Phase 5 work.)_

## Phase 4 — Content extraction

- [ ] Deno script parsing `_elementor_data` → intermediate JSON, with:
      per-breakpoint duplication recorded (canonical-variant policy per
      section), dynamic-visibility conditions captured, shortcodes/dynamic tags
      resolved against DB. Cross-check against **normalized rendered DOM**
      (deduped) — neither source alone is trustworthy.
- [ ] Curate into `components/content.ts`; posts move to `content/posts/` files
      loaded by `posts.ts` — **strip fabricated metadata** (posts.ts invents
      author "Aeriel Cruz"/dates absent on live).
- [ ] Split the merged Tondo/Antipolo post using DB rows; covers → R2.
- [ ] Extract NYP donation meta (min/suggested amounts per fund), MC4WP
      newsletter config, Elementor form fields + email targets (incl.
      Certificate-of-Donation popup).
- [ ] **Content-rot sign-off list:** lorem ipsum on /about, /get-involved,
      "TESTIMONY 1/2/3", conflicting US bank blocks (Chase vs BofA) →
      stakeholders decide copy fixes before clone pages ship.

**Gate:** every page's content sourced & signed off; no lorem cloned silently.

## Phase 5 — Page-by-page visual clone

- [ ] Chrome first: Header/Footer/MobileNav/popups (Prayer Hub + Zoom link,
      accreditation, Cert-of-Donation) as islands/dialogs.
  - Popup status (live WP re-census 2026-10-14, `feat/popup-parity`):
    accreditation (7281) auto-opens 3s after load, once per session, site-wide —
    mounted in `routes/_app.tsx`; the get-involved SERVE buttons open the
    volunteer disclaimer (7730) chained to the full guidelines doc (7737);
    Prayer Hub (1424)'s only trigger is hidden at every WP breakpoint —
    storybook-only; Cert-of-Donation (7660, tax-deductible form) stays a Phase 4
    item (mailto substitute).
- [ ] Order: home → about → what-we-do → get-involved → contact → givenow →
      news-updates + `posts/[slug]` → privacy-policy.
- [ ] Verification harness (Playwright): animations disabled via CSS injection,
      carousels pinned, `document.fonts.ready` + networkidle, carousels/forms
      masked, numeric pixel tolerance, normalized text-parity diff (deduped on
      live side), + **axe accessibility pass per page**.
- [ ] Reconcile: live is Elementor 3.29.x/Pro 3.28.x — validate parser against
      actual dump schema.

**Gate:** per-page screenshot parity within tolerance at 3 breakpoints.

## Phase 6 — Native donation checkout

- [ ] Fund/designation picker (from NYP meta) + amount input (integer centavos,
      method minimums, sane cap) → Fresh server route creates **PayMongo Payment
      Link/Intent** (hosted page = SAQ-A PCI scope).
- [ ] Webhook: `Paymongo-Signature` HMAC-SHA256 verification + timestamp
      tolerance, idempotent (dedupe by payment id), **persist every donation
      durably** (Turso/Postgres — or Google Sheet the office already uses)
      _before_ cutover; export ledger before any rollback (PayMongo dashboard
      must not become the only ledger).
- [ ] GA4 `purchase` events server-side via Measurement Protocol from verified
      webhook (MonsterInsights ecommerce dies with WP; both properties or
      consolidate).
- [ ] **Monthly "Carer" giving decision:** live /givenow has no recurring;
      PayMongo can't do GCash/Maya recurring → point Carers at a
      recurring-enabled Zeffy form or cut from launch.
- [ ] US/AU stay external (Zeffy/GDG); Cert-of-Donation form → email to office,
      manual BIR 2303, no PII in logs.
- [ ] Sandbox end-to-end on `staging.favorcare.org` (webhook can't hit prod
      pre-cutover).

**Gate:** sandbox donation → webhook → ledger row → receipt email, all green.

## Phase 7 — Forms, SEO, infra glue

- [ ] Contact form: Fresh POST + honeypot + Turnstile + Resend; add SPF/DKIM
      (`send.favorcare.org`) **while MX may live on the WP box** — verify
      deliverability pre-cutover; confirm other vhosts/email on that box.
- [ ] Newsletter: Mailchimp API server route reusing existing MC4WP audience.
- [ ] GA4 tags in `_app.tsx`; per-page meta from Yoast export; sitemap.xml +
      robots.txt routes (canonical new URLs only;
      `sitemap_index.xml`→`/sitemap.xml`); Search Console re-verify via DNS TXT.
- [ ] Redirect classes: `/about`→`/who-we-are`;
      `/give/<fund>`→`/givenow?fund=<fund>`;
      shop/cart/checkout/tickets/my-account→`/givenow`;
      tags/categories→`/news-updates` (301); author/product archives +
      `?add-to-cart=` → 410; trailing-slash normalization; `/posts/*` unchanged;
      fix the dead `/pampanga-2024` inbound link.

**Gate:** crawl of old URL set returns only 301/410 as mapped; no mailto forms.

## Phase 8 — Deploy & cutover

> **Platform retargeted 2026-10-11:** Deno Deploy → **Cloudflare Workers** (Deno
> acquired by Cloudflare — Deploy shuts down ~2027-04; official path is Workers,
> and Fresh 2 has a first-class adapter. celld.dev was evaluated and rejected:
> self-hosted VMs + own load balancer. Landed in `feat/cf-workers-deploy`:
> `server.js` worker entry, `wrangler.jsonc`, conditional `cloudflare()` vite
> plugin, `deno task deploy` two-stage build).

- [ ] Workers project from `main` early (days before): import repo in the CF
      dashboard (or `deno task deploy`), secrets via dashboard /
      `wrangler secret put` (ASSET_BASE_URL, later PAYMONGO/RESEND/MAILCHIMP).
- [x] ~~Certificate sequence~~ **Deleted** — Workers custom domains are
      same-account with automatic SSL (no gray/orange-cloud dance).
- [ ] Attach `staging.favorcare.media` to the Worker (re-point from wherever it
      deploys today); verify, then remove the old deployment.
- [ ] Pre-cutover: final WP delta + media sync + inventory diff; stakeholder
      review on staging URL.
- [ ] Cutover in low-traffic window; monitor 404s/GA realtime; **30-day rollback
      = DNS back to WP box** (untouched); decommission WP after window (archive
      dump + ledger).

**Gate:** cutover checklist executed; rollback rehearsed.

---

## Open decisions

1. Monthly Carer giving: Zeffy recurring vs cut from launch (Phase 6).
2. `/events/` (The Events Calendar): keep as cloned page, drop with 301, or
   rebuild feed (Phase 1).
3. Donation ledger store: Turso/Postgres vs Google Sheet (Phase 6).
4. Content-rot copy fixes owner (Phase 4 sign-off list).
5. Post-migration editing is git-based — no WP admin for staff; accepted
   trade-off, but confirm non-dev staff never need to publish news posts
   autonomously.

## Execution note

Phase 0 is safe to start immediately. Phases 1–2 unlock 3–5; Phase 6 can proceed
in parallel with 5 once Phase 1's subscriptions check is done. Each phase gets
its own detailed task breakdown at execution time.
