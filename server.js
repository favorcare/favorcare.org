// Cloudflare Workers entrypoint. `deno task build` (Vite + the
// @cloudflare/vite-plugin) emits the Fresh server to _fresh/, and wrangler
// serves it from here — see wrangler.jsonc ("main": "./server.js") and
// DEVELOPMENT.md "Deployment".
//
// Plain-text dashboard variables (ASSET_BASE_URL and the analytics
// identifiers — see utils/analytics.ts) only reach workerd code through
// the `env` binding on fetch() — there is no OS environment and no Deno
// global to read them from. Stash them on globalThis, then import the
// Fresh server DYNAMICALLY: its module graph (incl. the module-scope
// asset() calls in components/content.ts) evaluates on the first request,
// after the globals are in place. The import is cached for subsequent
// requests and the values never change within a deployment, so the
// ordering is safe.
export default {
  async fetch(request, env) {
    globalThis.__ASSET_BASE_URL__ = env?.ASSET_BASE_URL ?? "";
    globalThis.__GA4_MEASUREMENT_ID__ = env?.GA4_MEASUREMENT_ID ?? "";
    globalThis.__MIXPANEL_TOKEN__ = env?.MIXPANEL_TOKEN ?? "";
    globalThis.__CLOUDFLARE_ANALYTICS_TOKEN__ =
      env?.CLOUDFLARE_ANALYTICS_TOKEN ?? "";
    const { default: server } = await import("./_fresh/server.js");
    return server.fetch(request);
  },
};
