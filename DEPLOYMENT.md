# Deployment

How favorcare.org ships: **Cloudflare Workers**, built with vinext. The Worker
is `favorcare-org` (config in [`cloudflare.config.ts`](cloudflare.config.ts)),
deployed with the `cf` CLI through `vinext-cloudflare deploy`.

## How it builds

- `pnpm build` runs `vite build`: vinext + the Cloudflare Vite plugin emit the
  Worker bundle and the static assets into `.cloudflare/output/` (git-ignored).
- `pnpm deploy` = `vinext-cloudflare deploy`: validates, builds every Vite
  environment, and uploads that output with `cf`. `pnpm deploy:preview` does the
  same in Vite mode `preview` for a preview URL.
- Public config is **build-time**: `.env.production` (and `.env.preview`, which
  must mirror it) holds
  `NEXT_PUBLIC_ASSET_BASE_URL=https://assets.favorcare.media` and the analytics
  IDs. Change a value, rebuild, redeploy.
- When the asset base is set, the build strips `public/images/` from the Static
  Assets bundle (production serves images from R2) — see `stripCdnImages` in
  [`vite.config.ts`](vite.config.ts).
- This is why `main` is never pushed to directly: **a merge to `main` is a
  deploy.**

## Human steps (agents never run these)

Authentication is the human's: `cf auth login` locally, or
`CLOUDFLARE_API_TOKEN` (the **Edit Cloudflare Workers** template) +
`CLOUDFLARE_ACCOUNT_ID` in CI. Keep `accountId` out of `cloudflare.config.ts`.

### One-time: switch the production pipeline (vinext cutover)

1. `pnpm deploy:preview` from a clean checkout of the cutover branch → open the
   preview URL and smoke test every route (home, who-we-are, what-we-do,
   get-involved, contact, givenow, posts + a post, signup, coffeeforacause,
   privacy-policy) and the `/signup` form.
2. In the Cloudflare dashboard (Workers → `favorcare-org` → Settings → Builds),
   change the commands: **Build** `pnpm install --frozen-lockfile`, **Deploy**
   `pnpm deploy`. Check that Workers Builds' injected credentials work for `cf`.
   **Fallback if they don't:** add a GitHub Action that runs `pnpm deploy` with
   repo secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` on push to
   `main`, and disconnect the Workers Builds trigger.
3. Merge the PR → confirm the production deploy and re-check the routes above.
4. Remove the old `vars` (`ASSET_BASE_URL`, analytics IDs) — they now live in
   `.env.production`, not on the Worker.

### Rollback

Workers keeps prior versions: Cloudflare dashboard → Workers → `favorcare-org` →
Deployments → **Rollback** to the previous version (instant, no rebuild). The
pre-vinext Fresh code is the commit before the vinext merge on `main` if a
rebuild is ever needed.

## Local production check

```sh
pnpm build
pnpm preview     # serves the build in workerd
```

For local images instead of the CDN, build with `.env.production` moved aside
(the default build points images at R2).

## Secrets

Public identifiers are committed (see above). Real secrets (later `PAYMONGO_*`,
`RESEND_*`, `MAILCHIMP_*`) go in the Cloudflare dashboard or via `cf` secrets —
never in git.

## Assets (R2)

Post images live in git under `public/images/` and are served in production from
Cloudflare R2 at `assets.favorcare.media`. Merging image changes to main
triggers the sync-assets workflow, which mirrors the tree to the bucket; the
local `pnpm assets:pull` / `assets:push` scripts remain for bootstrapping and
manual parity fixes (rclone — see
[`migration/runbooks/phase2-r2-assets.md`](migration/runbooks/phase2-r2-assets.md)).

## Cutover (WordPress → this site)

- The WordPress box stays untouched through the 30-day rollback window — DNS
  points back to it to roll back.
- The full cutover plan (staging subdomain, pre-cutover WP delta, low-traffic
  window, 404/GA monitoring) is [MIGRATION.md](MIGRATION.md) Phase 8.

## Reference

- [vinext on Cloudflare Workers](https://github.com/cloudflare/vinext/blob/main/docs/deploying/cloudflare.mdx)
