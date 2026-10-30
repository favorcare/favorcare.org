// Unit tests for the frame/gutter class helpers every route lays out with.
import { test } from "vitest";
import { deepStrictEqual, ok } from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { frame, gutter } from "./Container.tsx";

test("gutter defaults to the page dialect", () => {
  deepStrictEqual(gutter(), "px-5 md:px-2.5 lg:px-0");
  deepStrictEqual(gutter("page"), gutter());
  deepStrictEqual(gutter("home"), "px-5 md:px-10 lg:px-0");
});

test("frame carries the 1140px measure, plus gutters only when asked", () => {
  deepStrictEqual(frame(), "mx-auto w-full max-w-[1140px]");
  deepStrictEqual(frame("page"), `mx-auto w-full max-w-[1140px] ${gutter()}`);
  deepStrictEqual(
    frame("home"),
    `mx-auto w-full max-w-[1140px] ${gutter("home")}`,
  );
});

test("frame has no trailing space — compose it with cx(), not `+`", () => {
  // `frame() + "grid"` silently yields `max-w-[1140px]grid`, dropping both
  // classes. Routes must use cx(frame(), "grid …").
  for (const pad of [undefined, "page", "home"] as const) {
    const cls = frame(pad);
    ok(!cls.endsWith(" "), `frame(${pad}) ends with a space`);
  }
});

test("no page or component concatenates frame() with +", async () => {
  const offenders: string[] = [];
  for (const dir of ["app", "components", "islands"]) {
    for (const rel of await readdir(dir, { recursive: true })) {
      if (!rel.endsWith(".tsx")) continue;
      const path = `${dir}/${rel}`;
      const src = await readFile(path, "utf8");
      if (/frame\([^)]*\)\s*\+/.test(src)) offenders.push(path);
    }
  }
  deepStrictEqual(offenders, [], "use cx(frame(), …) instead");
});
