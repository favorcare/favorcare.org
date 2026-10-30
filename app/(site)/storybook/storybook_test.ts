// Catalog drift guard: every shared component must have a /storybook
// specimen and a COMPONENTS.md entry, the storybook jump-nav must match
// its groups, and the BRAND copy rendered there must still be BRAND.md's.
import { test } from "vitest";
import { deepStrictEqual, ok } from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { BRAND } from "../../../components/content.ts";

const STORY_PATH = "app/(site)/storybook/page.tsx";

// Rendered inside Header rather than as their own specimens.
const CHROME_ONLY = new Set(["Navbar", "MobileNav"]);

async function componentExports(): Promise<string[]> {
  const names: string[] = [];
  for (const dir of [
    "components",
    "components/layout",
    "components/cfac",
    "islands",
  ]) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith(".tsx")) continue;
      const src = await readFile(`${dir}/${entry.name}`, "utf8");
      for (const [, name] of src.matchAll(
        /^export (?:default )?function ([A-Z]\w*)/gm,
      ))
        names.push(name);
    }
  }
  return names.sort();
}

test("every exported component has a /storybook specimen", async () => {
  const story = await readFile(STORY_PATH, "utf8");
  const missing = (await componentExports()).filter(
    (name) =>
      !CHROME_ONLY.has(name) && !new RegExp(`<${name}[\\s/>]`).test(story),
  );
  deepStrictEqual(
    missing,
    [],
    "add a specimen to app/(site)/storybook/page.tsx",
  );
});

test("every exported component is listed in COMPONENTS.md", async () => {
  const catalog = await readFile("COMPONENTS.md", "utf8");
  const missing = (await componentExports()).filter(
    (name) => !catalog.includes(`\`${name}\``),
  );
  deepStrictEqual(missing, [], "add a row to COMPONENTS.md");
});

test("storybook jump-nav matches its groups", async () => {
  const story = await readFile(STORY_PATH, "utf8");
  const nav = story.slice(story.indexOf("const SECTIONS"));
  const navIds = [
    ...nav.slice(0, nav.indexOf("] as const")).matchAll(/id: "([^"]+)"/g),
  ].map((m) => m[1]);
  const groupIds = [...story.matchAll(/<Group\s+id="([^"]+)"/g)].map(
    (m) => m[1],
  );
  deepStrictEqual(navIds, groupIds);
});

test("BRAND copy is verbatim from BRAND.md", async () => {
  const md = (await readFile("BRAND.md", "utf8"))
    .replace(/\*\*|_/g, "")
    .replace(/\s+/g, " ");
  const strings = [
    ...BRAND.identity.flatMap((i) => [i.term, i.value]),
    ...BRAND.storytelling.flatMap((s) => [s.title, s.body]),
    ...BRAND.arc.flatMap((a) => [a.beat, a.body]),
    ...BRAND.captionExamples,
    ...BRAND.ctaExamples,
    ...BRAND.rules,
  ];
  for (const s of strings) ok(md.includes(s), `not in BRAND.md: ${s}`);
});
