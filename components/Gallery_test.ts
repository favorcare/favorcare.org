// Unit tests for the Gallery pure helpers — the column and order class
// lookups that Tailwind must be able to read as literal strings.
import { test } from "vitest";
import { deepStrictEqual, ok } from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  COLUMNS,
  DESKTOP_ORDER,
  galleryCols,
  MOBILE_ORDER,
  tileOrder,
} from "./Gallery.tsx";

test("galleryCols maps 1-4 images to their column count", () => {
  deepStrictEqual(galleryCols(1), "grid-cols-1");
  deepStrictEqual(galleryCols(2), "grid-cols-2");
  deepStrictEqual(galleryCols(3), "grid-cols-3");
  deepStrictEqual(galleryCols(4), "grid-cols-4");
});

test("galleryCols falls back to 3 columns outside 1-4", () => {
  deepStrictEqual(galleryCols(0), "grid-cols-3");
  deepStrictEqual(galleryCols(5), "grid-cols-3");
  deepStrictEqual(galleryCols(9), "grid-cols-3");
});

test("tileOrder applies the WP mobile reorder [2,4,1,3]", () => {
  const order = [2, 4, 1, 3];
  deepStrictEqual(tileOrder(0, order), ["order-2", "md:order-1"]);
  deepStrictEqual(tileOrder(1, order), ["order-4", "md:order-2"]);
  deepStrictEqual(tileOrder(2, order), ["order-1", "md:order-3"]);
  deepStrictEqual(tileOrder(3, order), ["order-3", "md:order-4"]);
});

test("tileOrder is empty without a usable mobileOrder", () => {
  const none = ["", ""];
  deepStrictEqual(tileOrder(0), none);
  deepStrictEqual(tileOrder(0, []), none);
  deepStrictEqual(tileOrder(0, [9]), none, "mobile position outside 1-4");
  deepStrictEqual(tileOrder(4, [1, 2, 3, 4, 1]), none, "beyond the 2x2 grid");
});

test("class tables hold literal strings that appear in Gallery.tsx", async () => {
  const src = await readFile(
    new URL("./Gallery.tsx", import.meta.url),
    "utf8",
  );
  for (
    const [table, pattern] of [
      [MOBILE_ORDER, /^order-\d$/],
      [DESKTOP_ORDER, /^md:order-\d$/],
      [COLUMNS, /^grid-cols-\d$/],
    ] as const
  ) {
    for (const [n, cls] of Object.entries(table)) {
      ok(pattern.test(cls), `unexpected class shape: ${cls}`);
      ok(cls.endsWith(`-${n}`), `${cls} filed under ${n}`);
      ok(src.includes(`"${cls}"`), `${cls} must appear as a literal`);
    }
  }
});
