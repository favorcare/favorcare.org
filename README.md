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
- **[AGENTS.md](AGENTS.md)** — guidance for AI coding agents (`CLAUDE.md` is a
  symlink to this).

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
