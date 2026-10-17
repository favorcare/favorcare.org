// Unit tests for the frame/gutter class helpers every route lays out with.
import { assert, assertEquals } from "@std/assert";
import { frame, gutter } from "./Container.tsx";

Deno.test("gutter defaults to the page dialect", () => {
  assertEquals(gutter(), "px-5 md:px-2.5 lg:px-0");
  assertEquals(gutter("page"), gutter());
  assertEquals(gutter("home"), "px-5 md:px-10 lg:px-0");
});

Deno.test("frame carries the 1140px measure, plus gutters only when asked", () => {
  assertEquals(frame(), "mx-auto w-full max-w-[1140px]");
  assertEquals(frame("page"), `mx-auto w-full max-w-[1140px] ${gutter()}`);
  assertEquals(
    frame("home"),
    `mx-auto w-full max-w-[1140px] ${gutter("home")}`,
  );
});

Deno.test("frame has no trailing space — compose it with cx(), not `+`", () => {
  // `frame() + "grid"` silently yields `max-w-[1140px]grid`, dropping both
  // classes. Routes must use cx(frame(), "grid …").
  for (const pad of [undefined, "page", "home"] as const) {
    const cls = frame(pad);
    assert(!cls.endsWith(" "), `frame(${pad}) ends with a space`);
  }
});

Deno.test("no route or component concatenates frame() with +", async () => {
  const offenders: string[] = [];
  for (const dir of ["routes", "routes/posts", "components", "islands"]) {
    for await (const entry of Deno.readDir(dir)) {
      if (!entry.isFile || !entry.name.endsWith(".tsx")) continue;
      const path = `${dir}/${entry.name}`;
      const src = await Deno.readTextFile(path);
      if (/frame\([^)]*\)\s*\+/.test(src)) offenders.push(path);
    }
  }
  assertEquals(offenders, [], "use cx(frame(), …) instead");
});
