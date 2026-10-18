// Unit tests for the Gallery pure helpers — the column and order class
// lookups that Tailwind must be able to read as literal strings.
import { assert, assertEquals } from "@std/assert";
import {
  COLUMNS,
  DESKTOP_ORDER,
  galleryCols,
  MOBILE_ORDER,
  tileOrder,
} from "./Gallery.tsx";

Deno.test("galleryCols maps 1-4 images to their column count", () => {
  assertEquals(galleryCols(1), "grid-cols-1");
  assertEquals(galleryCols(2), "grid-cols-2");
  assertEquals(galleryCols(3), "grid-cols-3");
  assertEquals(galleryCols(4), "grid-cols-4");
});

Deno.test("galleryCols falls back to 3 columns outside 1-4", () => {
  assertEquals(galleryCols(0), "grid-cols-3");
  assertEquals(galleryCols(5), "grid-cols-3");
  assertEquals(galleryCols(9), "grid-cols-3");
});

Deno.test("tileOrder applies the WP mobile reorder [2,4,1,3]", () => {
  const order = [2, 4, 1, 3];
  assertEquals(tileOrder(0, order), ["order-2", "md:order-1"]);
  assertEquals(tileOrder(1, order), ["order-4", "md:order-2"]);
  assertEquals(tileOrder(2, order), ["order-1", "md:order-3"]);
  assertEquals(tileOrder(3, order), ["order-3", "md:order-4"]);
});

Deno.test("tileOrder is empty without a usable mobileOrder", () => {
  const none = ["", ""];
  assertEquals(tileOrder(0), none);
  assertEquals(tileOrder(0, []), none);
  assertEquals(tileOrder(0, [9]), none, "mobile position outside 1-4");
  assertEquals(tileOrder(4, [1, 2, 3, 4, 1]), none, "beyond the 2x2 grid");
});

Deno.test("class tables hold literal strings that appear in Gallery.tsx", async () => {
  const src = await Deno.readTextFile(
    new URL("./Gallery.tsx", import.meta.url),
  );
  for (
    const [table, pattern] of [
      [MOBILE_ORDER, /^order-\d$/],
      [DESKTOP_ORDER, /^md:order-\d$/],
      [COLUMNS, /^grid-cols-\d$/],
    ] as const
  ) {
    for (const [n, cls] of Object.entries(table)) {
      assert(pattern.test(cls), `unexpected class shape: ${cls}`);
      assert(cls.endsWith(`-${n}`), `${cls} filed under ${n}`);
      assert(src.includes(`"${cls}"`), `${cls} must appear as a literal`);
    }
  }
});
