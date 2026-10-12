// CDN-aware asset URLs.
//
// Local dev: ASSET_BASE_URL is unset, so asset("/images/x.jpg") resolves to
// the file in static/images/ served by the dev server (populated via
// `deno task assets:pull`).
//
// Production (Cloudflare Workers): the ASSET_BASE_URL plain-text variable
// set in the dashboard arrives on the worker's `env` binding — workerd has
// no OS environment and no Deno global, so server.js stashes it on
// `globalThis.__ASSET_BASE_URL__` before dynamically importing the Fresh
// server. Because content.ts calls asset() at module scope, that
// import-order (global first, Fresh modules on first request) is what
// makes the base visible to every asset() call.
//
// The optional chaining keeps this module safe to import from islands,
// which are bundled for the browser where neither global exists.

interface AssetEnvGlobal {
  Deno?: { env?: { get(name: string): string | undefined } };
  __ASSET_BASE_URL__?: string;
}

const g = globalThis as AssetEnvGlobal;

const ASSET_BASE = g.Deno?.env?.get("ASSET_BASE_URL") ??
  g.__ASSET_BASE_URL__ ?? "";

/**
 * Map a repo-relative asset path (leading slash, e.g. "/images/posts/x.jpg")
 * to its canonical URL: local `static/` in dev, the CDN base in production.
 */
export function asset(path: string): string {
  return ASSET_BASE + path;
}
