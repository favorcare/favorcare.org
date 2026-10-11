// CDN-aware asset URLs.
//
// Local dev: ASSET_BASE_URL is unset, so asset("/images/x.jpg") resolves to
// the file in static/images/ served by the dev server (populated via
// `deno task assets:pull`).
//
// Production: the Deno Deploy project sets ASSET_BASE_URL to the Cloudflare
// R2 custom domain (e.g. https://assets.favorcare.org) and the same path
// resolves against the bucket — images are gitignored and never deployed
// with the app (see MIGRATION.md, Phase 2).
//
// The `typeof Deno` guard keeps this module safe to import from islands,
// which are bundled for the browser where the Deno global doesn't exist.
const ASSET_BASE = typeof Deno !== "undefined"
  ? Deno.env.get("ASSET_BASE_URL") ?? ""
  : "";

/**
 * Map a repo-relative asset path (leading slash, e.g. "/images/posts/x.jpg")
 * to its canonical URL: local `static/` in dev, the CDN base in production.
 */
export function asset(path: string): string {
  return ASSET_BASE + path;
}
