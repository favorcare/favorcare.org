// One-time local setup: dependencies + git hygiene.
//
//   deno task setup
//
// What it does:
//   1. `deno install` — populate node_modules (nodeModulesDir: manual).
//   2. git config core.hooksPath .githooks — enables the commit-msg hook
//      (conventional subjects, 72-char limit, no AI attribution trailers).
//   3. git config commit.template <repo>/.gitmessage — shows the commit
//      checklist in the editor.
//
// Both git settings are LOCAL to this clone (never committed), and the
// script is safe to re-run at any time.
//
// `deno install` is spawned via Deno.execPath() — the same binary that is
// running this task — so machines with several Deno installs on PATH don't
// end up installing with an older one.

const toplevel = await (async () => {
  const probe = new Deno.Command("git", {
    args: ["rev-parse", "--show-toplevel"],
  });
  const out = await probe.output();
  if (!out.success) {
    console.error("setup: not inside a git repository");
    Deno.exit(1);
  }
  return new TextDecoder().decode(out.stdout).trim();
})();

async function run(cmd: string, args: string[]): Promise<void> {
  const command = new Deno.Command(cmd, { args, cwd: toplevel });
  const status = await command.spawn().status;
  if (!status.success) {
    throw new Error(`setup: ${cmd} ${args.join(" ")} failed (${status.code})`);
  }
}

await run(Deno.execPath(), ["install"]);
await run("git", ["config", "core.hooksPath", ".githooks"]);
await run("git", ["config", "commit.template", `${toplevel}/.gitmessage`]);

console.log("Setup complete:");
console.log("  • node_modules ready (deno install)");
console.log("  • commit-msg hook active: .githooks/commit-msg");
console.log(`  • commit template: ${toplevel}/.gitmessage`);
console.log("Start developing with: deno task dev");
