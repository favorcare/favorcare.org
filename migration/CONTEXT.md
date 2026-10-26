# migration/CONTEXT.md — the WP→Fresh pipeline working area

Contract for everything under `migration/`. The program itself — phases, gates,
open decisions, current status — lives one level up in
[`../MIGRATION.md`](../MIGRATION.md); this folder holds the working files each
phase reads and writes.

## Inputs

Working (this run — Phases 4–8 remain):

- `~/projects/github.com/favorcare/migration-files/extracted/` — JSON extracted
  from the WP dump by `scripts/extract-elementor.ts`: `kit.json` (design
  tokens), `pages/` (per-page Elementor trees), `census.json`,
  `conditions.json`, `nyp.json`, `yoast.json`, `snippets.json`,
  `redirection.json`. **Operator-managed, outside this repo** — dumps and
  secrets never enter git (`.gitignore` keeps `migration/data/` as a tripwire).
- [`../MIGRATION.md`](../MIGRATION.md) — which phase is current, its remaining
  boxes, and its gate.

Reference (every run):

- [`runbooks/phase1-extraction.md`](runbooks/phase1-extraction.md) and
  [`runbooks/phase2-r2-assets.md`](runbooks/phase2-r2-assets.md) —
  server/dashboard procedures the **human** executes. Never SSH into the WP box
  yourself; reading output the user pastes back is the only server interaction.
- [`elementor-to-tailwind.md`](elementor-to-tailwind.md) — the translation rules
  that keep every Phase 5 page conversion consistent (canonical-variant policy,
  settings→class tables).
- [`scripts/extract-elementor.ts`](scripts/extract-elementor.ts) — the dump
  parser; re-runnable, read-only over the dump.

## Process

One phase at a time, per the MIGRATION.md board: read the phase's boxes, do the
work (here or in the codebase), then record outcomes back in MIGRATION.md as
dated checkbox notes. New decisions belong in MIGRATION.md's "Open decisions"
list — not buried in working files.

## Outputs

- [`inventory.md`](inventory.md) — every WP URL → Fresh route → decision (clone
  / 301 / 410 / open). **Run state**: edit as decisions land; the Phase 8
  cutover diff runs against it.
- [`component-map.md`](component-map.md) — census-derived widget→component map
  and page-effort bounds. **Run state**: facts from the last extraction, not
  rules.
- Runbook findings — recorded into the matching MIGRATION.md phase notes, not
  into new files.

## Check

A phase is done when its **gate** in MIGRATION.md passes (each phase names its
own). Repo-wide, `deno task check` and `deno task test` must be green;
visual-parity work (Phase 5 on) also answers to `deno task clone:diff`.

## File roles

| File                           | Role                     | Edit when                       |
| ------------------------------ | ------------------------ | ------------------------------- |
| `CONTEXT.md`                   | this contract            | the process itself changes      |
| `inventory.md`                 | run state (decisions)    | a URL decision lands            |
| `component-map.md`             | run state (census facts) | a re-extraction changes counts  |
| `elementor-to-tailwind.md`     | reference (clone rules)  | Phase 5 translation policy does |
| `runbooks/*.md`                | reference (procedures)   | the box/bucket setup changes    |
| `scripts/extract-elementor.ts` | tooling                  | extraction needs new output     |
