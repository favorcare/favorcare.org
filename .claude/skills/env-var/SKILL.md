---
name: env-var
description: Add or change an environment variable or config key — use when a
  feature needs a new key, token, ID, or URL, or when asked how config
  reaches dev vs Cloudflare Workers.
---

# Add an environment variable

Config reaches this app differently per environment — workerd has no OS
environment, so keys flow through a globalThis stash (see `utils/assets.ts`
and `utils/analytics.ts` for the established pattern). A key is only "done"
when every place below knows it.

## 1. Classify it first

- **Public identifier** (analytics IDs, CDN base URLs — things that ship in
  HTML anyway) → commit the value in `wrangler.jsonc` `"vars"`.
- **Secret** (API keys like future `PAYMONGO_`/`RESEND_`/`MAILCHIMP_*`) →
  `wrangler secret put` / dashboard only — **never** in the repo. Note that
  every `wrangler deploy` syncs plain-text vars to `wrangler.jsonc`, so
  dashboard-added plain vars get wiped; that's why public ones are
  committed.

## 2. Touch every place

1. **`.env.example`** — the key with a comment on where to get its value.
2. **Local `.env`** — git-ignored; `vite.config.ts` bridges it into the
   process env for `deno task dev` (real env vars always win).
3. **`wrangler.jsonc` `"vars"`** — public keys only, empty-string default.
4. **`server.js`** — stash it: `globalThis.__THE_KEY__ = env?.THE_KEY ?? ""`
   (same import-order safety as the asset base).
5. **Reader in `utils/`** — the fallback chain
   `Deno.env.get("THE_KEY") ?? globalThis.__THE_KEY__`, kept behind a pure
   resolver function with tests (`utils/analytics.ts` +
   `utils/analytics_test.ts` is the template).

## 3. Document + verify

If it's operator-facing, add it to the relevant DEVELOPMENT.md table. Verify
the dormant path too: with the key unset the feature must render nothing /
no-op — never throw.
