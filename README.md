# Favor Care

![Favor Care logo](static/favicon.png)

The official website for **Favor Care** — a faith-driven Philippine nonprofit
bringing education, health, and hope to families in need. This is a fresh
rebuild of [favorcare.org](https://favorcare.org), which previously ran on
WordPress + Elementor.

Built with **Deno · Fresh · Tailwind CSS v4 · Preact**.

## Quick start

1. **Install Deno** — see the
   [official guide](https://docs.deno.com/runtime/getting_started/installation/).
2. Install dependencies and one-time git hygiene (commit-message template +
   commit-msg hook; the project uses `nodeModulesDir: manual`):

   ```sh
   deno task setup
   ```

3. Start the dev server:

   ```sh
   deno task dev
   ```

4. Open the URL printed in the terminal (typically <http://localhost:5173>).

## Scripts

| Command                     | Description                                                                    |
| --------------------------- | ------------------------------------------------------------------------------ |
| `deno task setup`           | One-time setup: deps, commit template, commit-msg hook.                        |
| `deno task dev`             | Start the Vite dev server with hot reload.                                     |
| `deno task build`           | Production build into `_fresh/`.                                               |
| `deno task start`           | Serve the production build (`deno serve -A _fresh/server.js`).                 |
| `deno task deploy`          | Build, then deploy to Cloudflare Workers (see [DEPLOYMENT.md](DEPLOYMENT.md)). |
| `deno task deploy:dry-run`  | Build and validate the Worker bundle without deploying.                        |
| `deno task check`           | Run `deno fmt --check`, `deno lint`, and `deno check`.                         |
| `deno task test`            | Run the unit tests (`deno test -A`).                                           |
| `deno task assets:pull`     | Bootstrap/parity check: pull `static/images/` from R2 (rclone).                |
| `deno task assets:push`     | Manual publish to R2 (normally done by CI on merge to main).                   |
| `deno task clone:reference` | Screenshot the WordPress reference (needs Playwright chromium).                |
| `deno task clone:diff`      | Visual-diff the Fresh pages against the reference screenshots.                 |
| `deno task update`          | Run the Fresh updater.                                                         |

## Project structure

```
routes/         File-system routes (pages); _app.tsx is the root layout
components/     Reusable Preact server components
islands/        Client-side interactive components (hydrated)
static/         Static assets served as-is (logos, favicon, images/ — tracked in git; CI mirrors to R2)
assets/         Global styles — the Tailwind v4 theme lives in styles.css
scripts/        One-off tooling: setup, R2 asset sync, WP clone-diff
migration/      WordPress → Fresh migration notes and runbooks
ideas/          IA reference (proposed.svg) and the retired v1 design
utils.ts        define.page / handlers / middleware helpers + the shared State
vite.config.ts  Build config — Fresh + Tailwind plugins; Cloudflare joins when CF=1
wrangler.jsonc  Cloudflare Workers config
main.ts         Fresh app entry — registers static files + file routes
```

## Documentation

- **[GETTING-STARTED.md](GETTING-STARTED.md)** — new to code, or working through
  an AI agent? Start here: machine setup to first pull request.
- **[DEVELOPMENT.md](DEVELOPMENT.md)** — local setup, architecture, and
  conventions.
- **[COMPONENTS.md](COMPONENTS.md)** — the component catalog and page-building
  rules. Reuse before you build.
- **[DESIGN.md](DESIGN.md)** — the design system (colors, type, components).
  Source of truth for styling tokens.
- **[BRAND.md](BRAND.md)** — brand voice and content style. How we write.
- **[DEPLOYMENT.md](DEPLOYMENT.md)** — Cloudflare Workers deployment, previews,
  secrets, rollback.
- **[MIGRATION.md](MIGRATION.md)** — the WordPress → Fresh migration plan, phase
  by phase.
- **[AGENTS.md](AGENTS.md)** — guidance for AI coding agents (Claude Code
  v2.1.277+ reads it directly).

## Contributing

New to code, or working through an AI agent?
**[GETTING-STARTED.md](GETTING-STARTED.md)** walks the whole loop on this repo —
machine setup, your first agent edit, your first pull request.

1. **Branch, never `main`.** Work on a short-lived branch — `feat/…`, `fix/…`,
   `docs/…` — and open a PR. A merge to `main` deploys, so nothing is ever
   pushed to `main` directly.
2. **Check before you push.** Run `deno task check` and `deno task test`; CI
   runs both on every PR (`.github/workflows/check.yml`).
3. **Conventional commits.** `deno task setup` installs the commit template and
   the commit-msg hook that enforce the format.
4. **Docs travel with code.** Token changes update DESIGN.md first; component
   changes update COMPONENTS.md and `/storybook` in the same PR.

See [DEVELOPMENT.md](DEVELOPMENT.md) for the full workflow, and
[AGENTS.md](AGENTS.md) for AI-coding-agent conventions (including: no AI
attribution trailers in commits or PRs).

## Impostor Syndrome Disclaimer

**We want your help. No, really.**

There may be a little voice inside your head that is telling you that you're not
ready to be an open source contributor; that your skills aren't nearly good
enough to contribute. What could you possibly offer a project like this one?

We assure you - the little voice in your head is wrong. If you can write code at
all, you can contribute code to open source. Contributing to open source
projects is a fantastic way to advance one's coding skills. Writing perfect code
isn't the measure of a good developer (that would disqualify all of us!); it's
trying to create something, making mistakes, and learning from those mistakes.
That's how we all improve, and we are happy to help others learn.

Being an open source contributor doesn't just mean writing code, either. You can
help out by writing documentation, tests, or even giving feedback about the
project (and yes - that includes giving feedback about the contribution
process). Some of these contributions may be the most valuable to the project as
a whole, because you're coming to the project with fresh eyes, so you can see
the errors and assumptions that seasoned contributors have glossed over.

**Remember:**

- No contribution is too small
- Everyone started somewhere
- Questions are welcome
- Mistakes are learning opportunities
- Your perspective is valuable

(Impostor syndrome disclaimer adapted from
[Adrienne Friend](https://github.com/adriennefriend/imposter-syndrome-disclaimer))

## License

MIT — see [LICENSE.md](LICENSE.md). Copyright © 2026 Favor Care contributors.
