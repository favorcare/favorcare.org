// Cloudflare Workers entrypoint. `deno task build` (Vite + the
// @cloudflare/vite-plugin) emits the Fresh server to _fresh/, and wrangler
// serves it from here — see wrangler.jsonc ("main": "./server.js") and
// DEVELOPMENT.md "Deployment".
import server from "./_fresh/server.js";

export default {
  fetch: server.fetch,
};
