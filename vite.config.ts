import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

// The Cloudflare plugin is only loaded for deploys (`deno task deploy` sets
// CF=1 — wrangler then orchestrates the vite build into a Worker bundle).
// Plain `deno task dev` / `build` / `start` stay on the standard Fresh flow.
const deploying = Deno.env.get("CF") === "1";

export default defineConfig({
  plugins: deploying
    ? [fresh(), tailwindcss(), cloudflare()]
    : [fresh(), tailwindcss()],
});
