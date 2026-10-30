// CDN-aware asset URLs.
//
// Local dev: NEXT_PUBLIC_ASSET_BASE_URL is unset, so asset("/images/x.jpg")
// resolves to the file in public/images/ served by the dev server
// (populated via `pnpm assets:pull`).
//
// Production: the committed .env.production sets the base to the R2 CDN.
// It is a build-time NEXT_PUBLIC_* variable, inlined on server and client
// alike — so the module-scope asset() calls in content.ts just work. The
// access must stay a literal `process.env.NEXT_PUBLIC_…` for inlining.

const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "";

/**
 * Map a repo-relative asset path (leading slash, e.g. "/images/posts/x.jpg")
 * to its canonical URL: local `public/` in dev, the CDN base in production.
 */
export function asset(path: string): string {
  return ASSET_BASE + path;
}
