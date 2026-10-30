// One-time local setup: dependencies + git hygiene.
//
//   pnpm setup
//
// What it does:
//   1. `pnpm install` — populate node_modules.
//   2. git config core.hooksPath .githooks — enables the commit-msg hook
//      (conventional subjects, 72-char limit, no AI attribution trailers).
//   3. git config commit.template <repo>/.gitmessage — shows the commit
//      checklist in the editor.
//
// Both git settings are LOCAL to this clone (never committed), and the
// script is safe to re-run at any time.

import { execFileSync } from "node:child_process";

function run(cmd: string, args: string[], cwd?: string): string {
  return execFileSync(cmd, args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  }).trim();
}

let toplevel: string;
try {
  toplevel = run("git", ["rev-parse", "--show-toplevel"]);
} catch {
  console.error("setup: not inside a git repository");
  process.exit(1);
}

execFileSync("pnpm", ["install"], { cwd: toplevel, stdio: "inherit" });
run("git", ["config", "core.hooksPath", ".githooks"], toplevel);
run("git", ["config", "commit.template", `${toplevel}/.gitmessage`], toplevel);

console.log("Setup complete:");
console.log("  • node_modules ready (pnpm install)");
console.log("  • commit-msg hook active: .githooks/commit-msg");
console.log(`  • commit template: ${toplevel}/.gitmessage`);
console.log("Start developing with: pnpm dev");
