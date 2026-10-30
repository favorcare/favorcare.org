import { rmSync } from "node:fs";
import { defineConfig, loadEnv } from "vite";
import type { Plugin } from "vite";
import vinext from "vinext";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

// public/images is tracked for contributor clones, but production markup
// references every image through the R2 CDN base (NEXT_PUBLIC_ASSET_BASE_URL
// — see utils/assets.ts). When that base is set, drop the repo copies from
// the Workers Static Assets bundle so deploys stay slim (otherwise ~70 MB of
// never-served files upload on every deploy).
function stripCdnImages(): Plugin {
  const CLIENT_DIRS = [
    ".cloudflare/output/v0/workers/default/assets/images",
    "dist/client/images",
  ];
  return {
    name: "favorcare:strip-cdn-images",
    apply: "build",
    enforce: "post",
    closeBundle: {
      order: "post",
      sequential: true,
      handler() {
        const env = loadEnv("production", process.cwd(), "NEXT_PUBLIC_");
        if (!(
          process.env.NEXT_PUBLIC_ASSET_BASE_URL ??
          env.NEXT_PUBLIC_ASSET_BASE_URL
        ))
          return;
        for (const dir of CLIENT_DIRS)
          rmSync(dir, { recursive: true, force: true });
      },
    },
  };
}

// vinext registers @vitejs/plugin-rsc itself when it finds an app/ directory
// — never add rsc() here (it fails with "Duplicate @vitejs/plugin-rsc").
export default defineConfig({
  plugins: [
    vinext(),
    tailwindcss(),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
    stripCdnImages(),
  ],
});
