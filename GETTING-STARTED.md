# Getting started — no code experience required

Favor Care is built by volunteers. Some write TypeScript by hand; others
describe what they want in a sentence and let an AI agent write it. This guide
is for the second group — and for anyone who has never contributed to a website
before.

**Vibe coding** means exactly that: you describe the change, an **agent** (a
program that reads, edits, and tests code for you — this repo standardizes on
[OpenCode](https://opencode.ai)) makes it, and you verify it in your browser.
You stay the editor; the agent is the hands.

## What you'll end up with

1. A machine that can run OpenCode and talk to GitHub (one-time, ~1–2 hours).
2. This repo running on your own machine at a `localhost` address.
3. The agent editing the homepage while you watch — then you undo it safely.
4. A real, small improvement on a branch and **your first pull request**.

Merging to `main` deploys the site, so all work happens on branches — the guide
ends with you doing exactly that, safely.

## Part 0 — One-time machine setup

Do this once per machine. The full, verbatim walkthrough — including the fancy
terminal and SSH keys — lives in the
[**vibe coding setup series**](https://napjose.ph/writing/vibe-coding-machine)
([macOS track](https://napjose.ph/writing/vibe-coding-setup-macos) ·
[Windows track](https://napjose.ph/writing/vibe-coding-setup-windows-wsl)); it
is one screen per step, written for non-developers. The short version:

| # | What                                                                                                                                             | Check that it worked                         |
| - | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| 1 | Terminal + shell setup, git, and an SSH key added to your GitHub account (series, posts 1–2)                                                     | `ssh -T git@github.com` replies "Hi \<you>!" |
| 2 | [OpenCode](https://opencode.ai/docs) — `curl -fsSL https://opencode.ai/install \| bash`                                                          | `opencode --version` prints                  |
| 3 | [OpenCode Console](https://opencode.ai/console) account — free; copy your API key (the walkthrough uses the **free** GLM 5.3 Flash model, so $0) | You have a key pasted somewhere safe         |
| 4 | [Deno](https://docs.deno.com/runtime/getting_started/installation/) — the runtime this site runs on                                              | `deno --version` prints                      |

> Sources: [OpenCode docs](https://opencode.ai/docs),
> [Console models / free tier](https://opencode.ai/v2/docs/console/models/),
> [Deno install](https://docs.deno.com/runtime/getting_started/installation/) ·
> checked 2026-10-24. Machine-setup steps: clean-VM verification stamps tracked
> in the series
> [verification log](https://github.com/napjoseph/napjose.ph/blob/main/content/posts/_verification/vibe-series-log.md).

## Part 1 — Run favorcare.org on your machine

```sh
mkdir -p ~/projects/github.com/favorcare
cd ~/projects/github.com/favorcare
git clone git@github.com:favorcare/favorcare.org.git
cd favorcare.org
deno task setup   # dependencies + git hygiene (commit template + hook)
deno task dev     # starts the dev server
```

Open the URL the terminal prints — Vite's default is <http://localhost:5173>.
You're looking at the real site, running on your machine. `deno task setup` also
wires the commit-message hook that keeps this repo's history tidy (conventional
subjects, no AI-attribution trailers) — it has your back later.

> **When this goes wrong: `deno: command not found`** — the terminal predates
> the Deno install. Open a new terminal window and retry.
>
> **When this goes wrong: `git@github.com: Permission denied (publickey)`** —
> your SSH key isn't set up yet; that's series post 2, step 8.

> Verified 2026-10-24 on macOS 26 (existing machine, not a clean VM): clone →
> `deno task setup` → `deno task dev` → HTTP 200 on `localhost:5173`.

## Part 2 — Watch the agent change the site (practice — then we undo it)

From inside the `favorcare.org` folder:

```sh
opencode
```

A full interface takes over the terminal. Three commands, typed at its input
line:

1. `/connect` — choose **opencode**, paste the Console API key from Part 0.
2. `/models` — pick **GLM 5.3 Flash (Free)** (search `glm`). If it has retired,
   any model with **Free** in its name works for this.
3. That's it — **skip `/init`**: this repo already ships an `AGENTS.md`, and
   OpenCode reads it (plus the repo's skills) automatically.

Now the moment this guide exists for. At the input line:

```text
In components/content.ts, find the HOME.hero.headline string and change
its text to "Hello from YOUR NAME — this edit was made by an AI agent."
Change nothing else.
```

The agent will show you a **permission prompt** — exactly what it intends to
edit — and wait for your yes. Approve it, then refresh <http://localhost:5173>:
the homepage headline is yours. You just ran the whole loop that builds this
site.

Now put it back: `/undo` in OpenCode, or `git restore .` in another terminal.
Real headline copy is brand-governed ([BRAND.md](BRAND.md)) — which is why this
one was practice, not a contribution. The undo reflex is the safety net for
everything in Part 3.

> Source: [opencode.ai/docs](https://opencode.ai/docs) · checked 2026-10-24

## Part 3 — Your first real contribution

1. **Pick something small.** Typos and unclear sentences in the docs are real
   contributions; so is copy that follows [BRAND.md](BRAND.md) better. Unsure?
   Open an [issue](https://github.com/favorcare/favorcare.org/issues) and ask
   first — that's normal here.
2. **Branch, never `main`** (merging to `main` deploys the site):

   ```sh
   git switch -c docs/fix-setup-typo
   ```

3. **Tell the agent precisely** — one file, one change:
   `In DEVELOPMENT.md, the sentence … says X; change it to Y. Change nothing else.`
4. **Run the repo's bar:**

   ```sh
   deno task check && deno task test
   ```

5. **Commit and push.** The commit hook enforces the format (conventional
   subject, 72 chars, no AI-attribution trailers):

   ```sh
   git add -A
   git commit -m "docs: clarify the dev-server port in DEVELOPMENT.md"
   git push -u origin docs/fix-setup-typo
   ```

6. **Open the pull request** — GitHub prints a link after the push; click it,
   describe the change in a sentence or two, submit. CI runs `deno task check`
   and `deno task test` on every PR, a maintainer reviews, and merge = deploy.

> **When this goes wrong: `deno task check` fails** — usually formatting. Run
> `deno fmt`, then re-run check. The agent can do this too: "run deno fmt and
> fix any check failures."
>
> **When this goes wrong: CI is red on your PR** — read the log; nine times out
> of ten it's the same two commands from step 4 fixing it locally.

## Where to go next

- [DEVELOPMENT.md](DEVELOPMENT.md) — architecture, styling, tests.
- [COMPONENTS.md](COMPONENTS.md) — reuse before you build.
- [DESIGN.md](DESIGN.md) and [BRAND.md](BRAND.md) — how the site looks and
  sounds.
- [AGENTS.md](AGENTS.md) — the standing instructions your agent already read.
- `/storybook` on your local dev server — the component catalog, live.

Stuck at any step? Open an
[issue](https://github.com/favorcare/favorcare.org/issues) with the step number
and the exact error text — error messages are clues, and yours makes this guide
better.
