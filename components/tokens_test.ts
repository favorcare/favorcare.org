// Unit tests for the storybook token data: it must mirror the @theme block
// in app/globals.css, and the contrast math must match WCAG.
import { test } from "vitest";
import { deepStrictEqual, ok } from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  COLOR_GROUPS,
  CONTRAST_PAIRS,
  contrastRatio,
  relativeLuminance,
} from "./tokens.ts";

async function themeColors(): Promise<Map<string, string>> {
  const css = await readFile("app/globals.css", "utf8");
  const theme = css.slice(css.indexOf("@theme"), css.indexOf("@layer"));
  return new Map(
    [...theme.matchAll(/--color-([a-z-]+):\s*(#[0-9a-fA-F]{6})/g)].map((
      [, name, hex],
    ) => [name, hex.toLowerCase()]),
  );
}

function almostEqual(actual: number, expected: number, tolerance = 1e-7) {
  ok(
    Math.abs(actual - expected) <= tolerance,
    `${actual} is not within ${tolerance} of ${expected}`,
  );
}

test("COLOR_GROUPS lists every @theme color with its exact hex", async () => {
  const theme = await themeColors();
  const listed = new Map(
    COLOR_GROUPS.flatMap((g) => g.tokens).map((t) => [t.name, t.hex]),
  );
  deepStrictEqual(
    [...listed.keys()].sort(),
    [...theme.keys()].sort(),
    "storybook tokens and styles.css @theme disagree on which colors exist",
  );
  for (const [name, hex] of theme) {
    deepStrictEqual(listed.get(name), hex, `hex drift for --color-${name}`);
  }
});

test("each swatch class is bg-<token name>", () => {
  for (const t of COLOR_GROUPS.flatMap((g) => g.tokens)) {
    deepStrictEqual(t.cls, `bg-${t.name}`);
  }
});

test("relativeLuminance spans 0 (black) to 1 (white)", () => {
  deepStrictEqual(relativeLuminance("#000000"), 0);
  almostEqual(relativeLuminance("#ffffff"), 1);
});

test("contrastRatio matches WCAG reference values", () => {
  almostEqual(contrastRatio("#000000", "#ffffff"), 21);
  almostEqual(contrastRatio("#ffffff", "#000000"), 21);
  almostEqual(contrastRatio("#777777", "#ffffff"), 4.48, 0.01);
  deepStrictEqual(contrastRatio("#ffb428", "#ffb428"), 1);
});

test("contrast specimen intents agree with the 4.5:1 AA bar", () => {
  for (const p of CONTRAST_PAIRS) {
    const passes = contrastRatio(p.fg, p.bg) >= 4.5;
    ok(
      passes === (p.intent === "do"),
      `${p.label}: ${contrastRatio(p.fg, p.bg).toFixed(2)}:1`,
    );
  }
});
