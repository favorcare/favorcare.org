// Cloudflare Workers entrypoint. `deno task build` (Vite + the
// @cloudflare/vite-plugin) emits the Fresh server to _fresh/, and wrangler
// serves it from here — see wrangler.jsonc ("main": "./server.js") and
// DEVELOPMENT.md "Deployment".
//
// Plain-text dashboard variables (ASSET_BASE_URL) only reach workerd code
// through the `env` binding on fetch() — there is no OS environment and no
// Deno global to read them from. Stash the asset base on globalThis, then
// import the Fresh server DYNAMICALLY: its module graph (incl. the
// module-scope asset() calls in components/content.ts) evaluates on the
// first request, after the global is in place. The import is cached for
// subsequent requests and the value never changes within a deployment, so
// the ordering is safe.
export default {
  async fetch(request, env) {
    globalThis.__ASSET_BASE_URL__ = env?.ASSET_BASE_URL ?? "";
    const { default: server } = await import("./_fresh/server.js");
    return server.fetch(request);
  },
};
