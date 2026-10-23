import { assert, assertEquals } from "@std/assert";
import {
  FIRST_TOUCH_KEY,
  isEmptyUtm,
  LAST_TOUCH_KEY,
  parseUtms,
  readUtm,
  recordUtms,
  utmProps,
  type UtmStore,
} from "./utm.ts";

/** Map-backed UtmStore with the raw data exposed for assertions. */
function memStore(initial: Record<string, string> = {}): UtmStore {
  const data = new Map(Object.entries(initial));
  return {
    get: (key) => data.get(key) ?? null,
    set: (key, value) => void data.set(key, value),
  };
}

Deno.test("parseUtms reads the five params, trims, drops empties", () => {
  assertEquals(
    parseUtms(
      "?utm_source=newsletter&utm_medium=email&utm_campaign=easter&utm_term=&utm_content=%20hero%20",
    ),
    {
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "easter",
      utm_content: "hero",
    },
  );
});

Deno.test("parseUtms ignores non-UTM params and bare paths", () => {
  assertEquals(parseUtms("?page=2&q=give"), {});
  assertEquals(parseUtms("/get-involved"), {});
});

Deno.test("recordUtms writes first + last on a fresh browser", () => {
  const store = memStore();
  const writes = recordUtms(
    store,
    "?utm_source=fb&utm_medium=social&utm_campaign=easter",
    1000,
  );
  assertEquals(writes.map((w) => w.key), [FIRST_TOUCH_KEY, LAST_TOUCH_KEY]);
  for (const { key, value } of writes) store.set(key, value);
  assertEquals(readUtm(store, FIRST_TOUCH_KEY), {
    source: "fb",
    medium: "social",
    campaign: "easter",
    ts: 1000,
  });
});

Deno.test("recordUtms never overwrites first touch", () => {
  const store = memStore({
    [FIRST_TOUCH_KEY]: JSON.stringify({
      source: "fb",
      medium: "social",
      ts: 1000,
    }),
  });
  const writes = recordUtms(
    store,
    "?utm_source=newsletter&utm_medium=email&utm_campaign=easter",
    2000,
  );
  assertEquals(writes.map((w) => w.key), [LAST_TOUCH_KEY]);
  assertEquals(readUtm(store, FIRST_TOUCH_KEY), {
    source: "fb",
    medium: "social",
    ts: 1000,
  });
});

Deno.test("recordUtms refreshes last touch on every UTM landing", () => {
  const store = memStore({
    [LAST_TOUCH_KEY]: JSON.stringify({
      source: "fb",
      medium: "social",
      ts: 1000,
    }),
  });
  for (
    const { key, value } of recordUtms(
      store,
      "?utm_source=fb&utm_medium=social",
      3000,
    )
  ) {
    store.set(key, value);
  }
  assertEquals(readUtm(store, LAST_TOUCH_KEY)?.ts, 3000);
});

Deno.test("recordUtms is a no-op without UTMs (plain navigation)", () => {
  const store = memStore();
  assertEquals(recordUtms(store, "/givenow?page=2"), []);
  assertEquals(readUtm(store, FIRST_TOUCH_KEY), null);
  assertEquals(readUtm(store, LAST_TOUCH_KEY), null);
});

Deno.test("readUtm tolerates corrupt storage", () => {
  const store = memStore({ [LAST_TOUCH_KEY]: "not json" });
  assertEquals(readUtm(store, LAST_TOUCH_KEY), null);
  assertEquals(readUtm(store, "missing"), null);
});

Deno.test("utmProps flattens with the prefix and skips gaps", () => {
  assertEquals(
    utmProps({ source: "fb", campaign: "easter", ts: 1 }, "first"),
    { first_utm_source: "fb", first_utm_campaign: "easter" },
  );
  assertEquals(utmProps(null, "last"), {});
});

Deno.test("isEmptyUtm", () => {
  assert(isEmptyUtm({ ts: 1 }));
  assert(!isEmptyUtm({ source: "fb", ts: 1 }));
});
