# Favor Care

The website for **Favor Care** — a faith-driven Philippine nonprofit bringing
education, health, and hope to families in need. This is a fresh rebuild of
[favorcare.org](https://favorcare.org), which previously ran on WordPress +
Elementor.

Built with **Deno · Fresh · Tailwind CSS v4 · Preact**.

## Quick start

1. **Install Deno** — see the
   [official guide](https://docs.deno.com/runtime/getting_started/installation/).
2. Install dependencies (the project uses `nodeModulesDir: manual`):

   ```sh
   deno install
   ```

3. Start the dev server:

   ```sh
   deno task dev
   ```

4. Open the URL printed in the terminal (typically <http://localhost:8000>).

## Scripts

| Command            | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| `deno task dev`    | Start the Vite dev server with hot reload.                     |
| `deno task build`  | Production build into `_fresh/`.                               |
| `deno task start`  | Serve the production build (`deno serve -A _fresh/server.js`). |
| `deno task check`  | Run `deno fmt --check`, `deno lint`, and `deno check`.         |
| `deno task update` | Run the Fresh updater.                                         |

## Project structure

```
routes/      File-system routes (pages)
components/  Reusable Preact server components
islands/     Client-side interactive components (hydrated)
static/      Static assets served as-is (logos, images)
assets/      Global styles — the Tailwind v4 theme lives in styles.css
main.ts      Fresh app entry — registers static files + file routes
```

## Documentation

- **[DEVELOPMENT.md](DEVELOPMENT.md)** — local setup, architecture, and
  conventions.
- **[DESIGN.md](DESIGN.md)** — the design system (colors, type, components).
  Source of truth for styling tokens.
- **[favorcare-sitemap.svg](favorcare-sitemap.svg)** — the full information
  architecture and page templates. Source of truth for site structure and
  content.
- **[AGENTS.md](AGENTS.md)** — guidance for AI coding agents (`CLAUDE.md` is a
  symlink to this).

## License

MIT — see [LICENSE.md](LICENSE.md). Copyright © 2026 Favor Care contributors.
