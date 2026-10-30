import { defineConfig } from "vite";
import vinext from "vinext";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

// vinext registers @vitejs/plugin-rsc itself when it finds an app/ directory
// — never add rsc() here (it fails with "Duplicate @vitejs/plugin-rsc").
export default defineConfig({
  plugins: [
    vinext(),
    tailwindcss(),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
