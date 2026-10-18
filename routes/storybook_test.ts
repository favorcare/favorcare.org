// Catalog drift guard: every shared component must have a /storybook
// specimen and a COMPONENTS.md entry, the storybook jump-nav must match
// its groups, and the BRAND copy rendered there must still be BRAND.md's.
import { assert, assertEquals } from "@std/assert";
import { BRAND } from "../components/content.ts";

// Rendered inside Header rather than as their own specimens.
const CHROME_ONLY = new Set(["Navbar", "MobileNav"]);

async function componentExports(): Promise<string[]> {
  const names: string[] = [];
  for (const dir of ["components", "components/layout", "islands"]) {
    for await (const entry of Deno.readDir(dir)) {
      if (!entry.isFile || !entry.name.endsWith(".tsx")) continue;
      const src = await Deno.readTextFile(`${dir}/${entry.name}`);
      for (
        const [, name] of src.matchAll(
          /^export (?:default )?function ([A-Z]\w*)/gm,
        )
      ) names.push(name);
    }
  }
  return names.sort();
}

Deno.test("every exported component has a /storybook specimen", async () => {
  const story = await Deno.readTextFile("routes/storybook.tsx");
  const missing = (await componentExports()).filter((name) =>
    !CHROME_ONLY.has(name) && !new RegExp(`<${name}[\\s/>]`).test(story)
  );
  assertEquals(missing, [], "add a specimen to routes/storybook.tsx");
});

Deno.test("every exported component is listed in COMPONENTS.md", async () => {
  const catalog = await Deno.readTextFile("COMPONENTS.md");
  const missing = (await componentExports()).filter((name) =>
    !catalog.includes(`\`${name}\``)
  );
  assertEquals(missing, [], "add a row to COMPONENTS.md");
});

Deno.test("storybook jump-nav matches its groups", async () => {
  const story = await Deno.readTextFile("routes/storybook.tsx");
  const nav = story.slice(story.indexOf("const SECTIONS"));
  const navIds = [
    ...nav.slice(0, nav.indexOf("] as const")).matchAll(/id: "([^"]+)"/g),
  ].map((m) => m[1]);
  const groupIds = [...story.matchAll(/<Group\s+id="([^"]+)"/g)].map((m) =>
    m[1]
  );
  assertEquals(navIds, groupIds);
});

Deno.test("BRAND copy is verbatim from BRAND.md", async () => {
  const md = (await Deno.readTextFile("BRAND.md"))
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
  for (const s of strings) assert(md.includes(s), `not in BRAND.md: ${s}`);
});
