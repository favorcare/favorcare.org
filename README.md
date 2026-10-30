# Favor Care

![Favor Care logo](public/favicon.png)

The official website for **Favor Care** — a faith-driven Philippine nonprofit
bringing education, health, and hope to families in need. This is a fresh
rebuild of [favorcare.org](https://favorcare.org), which previously ran on
WordPress + Elementor.

Built with **vinext (Next.js App Router on Vite) · React 19 · Tailwind CSS v4**,
on Node + pnpm.

## Quick start

1. **Install Node ≥ 22.12 (24 recommended) and pnpm** — `brew install node@24`,
   then `corepack enable pnpm`.
2. Install dependencies and one-time git hygiene (commit-message template +
   commit-msg hook; the project uses `nodeModulesDir: manual`):

   ```sh
   pnpm setup
   ```

3. Start the dev server:

   ```sh
   pnpm dev
   ```

4. Open the URL printed in the terminal (typically <http://localhost:5173>).

## Scripts

| Command                | Description                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| `pnpm setup`           | One-time setup: deps, commit template, commit-msg hook.                        |
| `pnpm dev`             | Start the Vite dev server with hot reload.                                     |
| `pnpm build`           | Production build into `.cloudflare/output/`.                                   |
| `pnpm preview`         | Serve the production build locally in workerd.                                 |
| `pnpm deploy`          | Build, then deploy to Cloudflare Workers (see [DEPLOYMENT.md](DEPLOYMENT.md)). |
| `pnpm deploy:preview`  | Upload a Worker Preview for the current branch (Production untouched).         |
| `pnpm check`           | Run `prettier --check`, `oxlint`, and `tsc --noEmit`.                          |
| `pnpm test`            | Run the unit tests (`vitest run`).                                             |
| `pnpm assets:pull`     | Bootstrap/parity check: pull `public/images/` from R2 (rclone).                |
| `pnpm assets:push`     | Manual publish to R2 (normally done by CI on merge to main).                   |
| `pnpm clone:reference` | Screenshot the WordPress reference (needs Playwright chromium).                |
| `pnpm clone:diff`      | Visual-diff the site pages against the reference screenshots.                  |

## Project structure

```
app/            Pages (App Router): layout.tsx root, (site)/ pages, coffeeforacause/; globals.css = Tailwind v4 theme
components/     Reusable server components
islands/        Client-side interactive components ("use client", hydrated)
public/         Static assets served as-is (logos, favicon, images/ — tracked in git; CI mirrors to R2)
scripts/        One-off tooling: setup, R2 asset sync, WP clone-diff
migration/      WordPress → vinext migration notes and runbooks
ideas/          IA reference (proposed.svg) and the retired v1 design
utils/          Env-driven helpers (asset URLs, analytics, UTM)
vite.config.ts  Build config — vinext + Tailwind + Cloudflare plugins
cloudflare.config.ts  Cloudflare Workers config
next.config.ts  Redirects
.env.production Public build-time config (NEXT_PUBLIC_*)
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
- **[MIGRATION.md](MIGRATION.md)** — the WordPress → vinext migration plan,
  phase by phase.
- **[AGENTS.md](AGENTS.md)** — guidance for AI coding agents (Claude Code
  v2.1.277+ reads it directly).

## Contributing

New to code, or working through an AI agent?
**[GETTING-STARTED.md](GETTING-STARTED.md)** walks the whole loop on this repo —
machine setup, your first agent edit, your first pull request.

1. **Branch, never `main`.** Work on a short-lived branch — `feat/…`, `fix/…`,
   `docs/…` — and open a PR. A merge to `main` deploys, so nothing is ever
   pushed to `main` directly.
2. **Check before you push.** Run `pnpm check` and `pnpm test`; CI runs both on
   every PR (`.github/workflows/check.yml`).
3. **Conventional commits.** `pnpm setup` installs the commit template and the
   commit-msg hook that enforce the format.
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
