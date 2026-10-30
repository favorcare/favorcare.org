// UTM attribution — pure logic, no DOM.
//
// Campaign links carry utm_source/medium/campaign/term/content. On such a
// landing, `recordUtms()` returns two localStorage writes:
//
// - `fc_utm_first` — first touch, written once per browser, never overwritten
// - `fc_utm_last`  — last touch, refreshed on every UTM landing
//
// `track()` (islands/Tracking.tsx) flattens both into every custom event
// (first_utm_source, last_utm_campaign, …) so conversions report the
// campaign that produced them even when the convert happens on a page the
// campaign didn't land on. Storage is injected (`UtmStore`) so tests run
// without a DOM.

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

/** One recorded touch; `ts` is `Date.now()` at capture. */
export interface UtmTouch {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  ts: number;
}

/** localStorage keys for the first/last touch (see module docstring). */
export const FIRST_TOUCH_KEY = "fc_utm_first";
export const LAST_TOUCH_KEY = "fc_utm_last";

/** Minimal localStorage surface so tests can run without a DOM. */
export interface UtmStore {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

/** Parse the UTM params from a querystring (leading `?` optional).
 * Trims values; empty or absent params are dropped. */
export function parseUtms(search: string): Partial<Record<UtmKey, string>> {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search,
  );
  const out: Partial<Record<UtmKey, string>> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) out[key] = value;
  }
  return out;
}

/** True when a touch carries no attribution at all. */
export function isEmptyUtm(touch: UtmTouch): boolean {
  return (
    !touch.source &&
    !touch.medium &&
    !touch.campaign &&
    !touch.term &&
    !touch.content
  );
}

/**
 * Record a landing. Returns the storage writes to make — first touch only
 * when absent, last touch refreshed on every UTM landing — or `[]` when the
 * URL carries no UTMs (ordinary navigation must never touch storage).
 */
export function recordUtms(
  store: UtmStore,
  search: string,
  now = Date.now(),
): Array<{ key: string; value: string }> {
  const utms = parseUtms(search);
  const touch: UtmTouch = {
    source: utms.utm_source,
    medium: utms.utm_medium,
    campaign: utms.utm_campaign,
    term: utms.utm_term,
    content: utms.utm_content,
    ts: now,
  };
  if (isEmptyUtm(touch)) return [];
  const writes = [{ key: LAST_TOUCH_KEY, value: JSON.stringify(touch) }];
  if (!store.get(FIRST_TOUCH_KEY)) {
    writes.unshift({ key: FIRST_TOUCH_KEY, value: JSON.stringify(touch) });
  }
  return writes;
}

/** Read a stored touch; `null` when absent or corrupt. */
export function readUtm(store: UtmStore, key: string): UtmTouch | null {
  const raw = store.get(key);
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as UtmTouch;
    return typeof value === "object" &&
      value !== null &&
      typeof value.ts === "number"
      ? value
      : null;
  } catch {
    return null;
  }
}

/** Flatten a touch into event props (`first_utm_source`, …), or `{}`. */
export function utmProps(
  touch: UtmTouch | null,
  prefix: "first" | "last",
): Record<string, string> {
  if (!touch) return {};
  const props: Record<string, string> = {};
  const fields = [
    ["source", touch.source],
    ["medium", touch.medium],
    ["campaign", touch.campaign],
    ["term", touch.term],
    ["content", touch.content],
  ] as const;
  for (const [name, value] of fields) {
    if (value) props[`${prefix}_utm_${name}`] = value;
  }
  return props;
}
