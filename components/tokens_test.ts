// Unit tests for the storybook token data: it must mirror the @theme block
// in assets/styles.css, and the contrast math must match WCAG.
import { assert, assertAlmostEquals, assertEquals } from "@std/assert";
import {
  COLOR_GROUPS,
  CONTRAST_PAIRS,
  contrastRatio,
  relativeLuminance,
} from "./tokens.ts";

async function themeColors(): Promise<Map<string, string>> {
  const css = await Deno.readTextFile("assets/styles.css");
  const theme = css.slice(css.indexOf("@theme"), css.indexOf("@layer"));
  return new Map(
    [...theme.matchAll(/--color-([a-z-]+):\s*(#[0-9a-fA-F]{6})/g)].map((
      [, name, hex],
    ) => [name, hex.toLowerCase()]),
  );
}

Deno.test("COLOR_GROUPS lists every @theme color with its exact hex", async () => {
  const theme = await themeColors();
  const listed = new Map(
    COLOR_GROUPS.flatMap((g) => g.tokens).map((t) => [t.name, t.hex]),
  );
  assertEquals(
    [...listed.keys()].sort(),
    [...theme.keys()].sort(),
    "storybook tokens and styles.css @theme disagree on which colors exist",
  );
  for (const [name, hex] of theme) {
    assertEquals(listed.get(name), hex, `hex drift for --color-${name}`);
  }
});

Deno.test("each swatch class is bg-<token name>", () => {
  for (const t of COLOR_GROUPS.flatMap((g) => g.tokens)) {
    assertEquals(t.cls, `bg-${t.name}`);
  }
});

Deno.test("relativeLuminance spans 0 (black) to 1 (white)", () => {
  assertEquals(relativeLuminance("#000000"), 0);
  assertAlmostEquals(relativeLuminance("#ffffff"), 1);
});

Deno.test("contrastRatio matches WCAG reference values", () => {
  assertAlmostEquals(contrastRatio("#000000", "#ffffff"), 21);
  assertAlmostEquals(contrastRatio("#ffffff", "#000000"), 21);
  assertAlmostEquals(contrastRatio("#777777", "#ffffff"), 4.48, 0.01);
  assertEquals(contrastRatio("#ffb428", "#ffb428"), 1);
});

Deno.test("contrast specimen intents agree with the 4.5:1 AA bar", () => {
  for (const p of CONTRAST_PAIRS) {
    const passes = contrastRatio(p.fg, p.bg) >= 4.5;
    assert(
      passes === (p.intent === "do"),
      `${p.label}: ${contrastRatio(p.fg, p.bg).toFixed(2)}:1`,
    );
  }
});
