import { defineConfig, loadEnv } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

// The Cloudflare plugin is only loaded for deploys (`deno task deploy` sets
// CF=1 — wrangler then orchestrates the vite build into a Worker bundle).
// Plain `deno task dev` / `build` / `start` stay on the standard Fresh flow.
const deploying = Deno.env.get("CF") === "1";

// Vite loads .env into import.meta.env, but not into the OS environment
// that Deno.env reads (utils/analytics.ts). Bridge the file's keys into the
// process env for local dev — real env vars always win. Best effort: if
// setting env fails (permissions), the app still boots, just unconfigured.
try {
  for (
    const [key, value] of Object.entries(
      loadEnv("development", Deno.cwd(), ""),
    )
  ) {
    if (value !== "" && Deno.env.get(key) === undefined) {
      Deno.env.set(key, value);
    }
  }
} catch {
  // .env bridging is a dev convenience, never a requirement.
}

export default defineConfig({
  plugins: deploying
    ? [fresh(), tailwindcss(), cloudflare()]
    : [fresh(), tailwindcss()],
});
