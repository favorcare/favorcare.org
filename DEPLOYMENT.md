# Deployment

How favorcare.org ships: **Cloudflare Workers**, deployed automatically by
Cloudflare Workers Builds on every push to `main`.

## How production deploys

- `main` is connected to Cloudflare via the dashboard (Workers → import from
  GitHub). Every push to `main` runs
  [`scripts/ci-cloudflare-build.sh`](scripts/ci-cloudflare-build.sh) — installs
  Deno, `deno install`, `deno task build` — and then deploys with
  `CF=1 npx wrangler deploy`.
- This is why `main` is never pushed to directly: **a merge to `main` is a
  deploy.**
- **Preview deploys:** every PR branch gets a preview URL (`previews: {}` in
  [`wrangler.jsonc`](wrangler.jsonc)) — review visual changes there before
  merging.

## Configuration

- Worker config lives in [`wrangler.jsonc`](wrangler.jsonc): worker
  `favorcare-org`, entry `server.js`, client assets `./_fresh/client`,
  `vars.ASSET_BASE_URL = https://assets.favorcare.media`.
- The `cloudflare()` Vite plugin only loads under `CF=1`, so local dev, build,
  and start stay on the standard Fresh flow.
- **Secrets** (`ASSET_BASE_URL`; later `PAYMONGO_*`, `RESEND_*`, `MAILCHIMP_*`)
  are set in the Cloudflare dashboard or via `wrangler secret put` — never
  committed to git.

## Manual deploy

```sh
deno task deploy           # build, then wrangler deploy
deno task deploy:dry-run   # build, then a dry run (no deploy)
```

## Assets (R2)

Post images are served from Cloudflare R2 at `assets.favorcare.media`. The
pipeline and one-time setup are in
[`migration/runbooks/phase2-r2-assets.md`](migration/runbooks/phase2-r2-assets.md);
day-to-day it is `deno task assets:pull` / `deno task assets:push`.

## Rollback & cutover

- The WordPress box stays untouched through the 30-day rollback window — DNS
  points back to it to roll back.
- The full cutover plan (staging subdomain, pre-cutover WP delta, low-traffic
  window, 404/GA monitoring) is [MIGRATION.md](MIGRATION.md) Phase 8.

## Reference

- [Fresh on Cloudflare Workers](https://usefresh.dev/docs/deployment/cloudflare-workers)
