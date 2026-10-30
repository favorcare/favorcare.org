"use client";

// Client-side analytics behavior — the one island behind every tracked
// event: vendor bootstraps (GA4 gtag config, the Mixpanel lib loader —
// injected here as script elements so inline JS stays out of the SSR
// markup), UTM capture on landing (utils/utm.ts), a single delegated click
// listener for `[data-track]` elements, and the `track()` fan-out to every
// configured vendor. Mounted once by <Analytics> at the end of the body in
// routes/_app.tsx.
//
// `track()` is import-safe from any island (guards on the vendor globals)
// and is exposed as `window.favorcareTrack` for console debugging:
//   favorcareTrack("demo", { note: "hello" })

import { useEffect } from "react";
import {
  FIRST_TOUCH_KEY,
  LAST_TOUCH_KEY,
  readUtm,
  recordUtms,
  utmProps,
  type UtmStore,
} from "../utils/utm.ts";

export interface TrackingProps {
  /** GA4 measurement ID — injects the official gtag config bootstrap. */
  ga4Id?: string;
  /** Mixpanel project token — loads the lib and inits with it. */
  mixpanelToken?: string;
}

interface GtagFn {
  (command: "event", name: string, params?: Record<string, unknown>): void;
  (...args: unknown[]): void;
}

interface MixpanelFn {
  init(
    token: string,
    config?: Record<string, unknown>,
  ): void;
  track(eventName: string, props?: Record<string, unknown>): void;
}

interface TrackingWindow {
  gtag?: GtagFn;
  mixpanel?: MixpanelFn;
  favorcareTrack?: typeof track;
  __FC_TRACKING__?: boolean;
}

/** GA4's inline bootstrap (the lib itself is server-rendered as an
 * external async tag in components/Analytics.tsx). */
function bootstrapGtag(id: string): void {
  if (document.querySelector("script[data-fc-gtag]")) return;
  const script = document.createElement("script");
  script.setAttribute("data-fc-gtag", "true");
  script.textContent =
    `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`;
  document.head.appendChild(script);
}

/**
 * Install the Mixpanel lib: early `track` calls queue in a stub (same
 * semantics as Mixpanel's own bootstrap snippet, without the minified
 * string); the real lib replaces the stub on load, then we init with the
 * token — `track_pageview` on, since all three vendors do pageviews — and
 * flush the queue.
 */
function bootstrapMixpanel(token: string): void {
  const w = globalThis as TrackingWindow;
  if (w.mixpanel) return; // already stubbed or the real lib
  const queue: Array<[string, Record<string, unknown> | undefined]> = [];
  // `__SV` is the snippet/lib version handshake — without it the lib logs
  // a misleading "Version mismatch" warning on load.
  const stub: MixpanelFn & { __SV: number } = {
    __SV: 1.2,
    init: () => {},
    track: (name, props) => void queue.push([name, props]),
  };
  w.mixpanel = stub;
  const lib = document.createElement("script");
  lib.async = true;
  lib.src = "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
  lib.onload = () => {
    const mp = (globalThis as { mixpanel?: MixpanelFn }).mixpanel;
    if (!mp || mp === stub || typeof mp.init !== "function") return;
    mp.init(token, { track_pageview: true });
    for (const [name, props] of queue) mp.track(name, props);
    queue.length = 0;
  };
  document.head.appendChild(lib);
}

/** The browser's localStorage as a UtmStore. */
function browserStore(): UtmStore {
  return {
    get: (key) => globalThis.localStorage?.getItem(key),
    set: (key, value) => globalThis.localStorage?.setItem(key, value),
  };
}

/** First/last-touch UTM props from storage, flattened for events. */
function attributionProps(): Record<string, string> {
  const store = browserStore();
  return {
    ...utmProps(readUtm(store, FIRST_TOUCH_KEY), "first"),
    ...utmProps(readUtm(store, LAST_TOUCH_KEY), "last"),
  };
}

/**
 * Fire a custom event to every configured vendor, first/last-touch UTM
 * attribution merged in (call-site props win on collision). A no-op when no
 * vendor snippet is on the page — safe to call unconditionally.
 */
export function track(
  event: string,
  props: Record<string, unknown> = {},
): void {
  const w = globalThis as TrackingWindow;
  const payload = { ...attributionProps(), ...props };
  w.gtag?.("event", event, payload);
  w.mixpanel?.track(event, payload);
}

export default function Tracking({ ga4Id, mixpanelToken }: TrackingProps) {
  useEffect(() => {
    const w = globalThis as TrackingWindow;
    // Singleton for the page's lifetime — a second mount (e.g. the
    // storybook specimen plus the layout) must not double-track. The
    // listeners and injected bootstraps are deliberately never removed.
    if (w.__FC_TRACKING__) return;
    w.__FC_TRACKING__ = true;
    w.favorcareTrack = track;

    // Vendor bootstraps — tokens inlined from this repo's own config
    // (never user input); gtag's config is a tiny inline script, Mixpanel
    // loads its lib directly.
    if (ga4Id) bootstrapGtag(ga4Id);
    if (mixpanelToken) bootstrapMixpanel(mixpanelToken);

    // Record a campaign landing: first touch once, last touch refreshed.
    const store = browserStore();
    for (
      const { key, value } of recordUtms(store, globalThis.location.search)
    ) {
      store.set(key, value);
    }

    // One delegated listener drives every `[data-track]` element, so
    // server-rendered CTAs stay measurable without shipping an island each.
    document.addEventListener("click", (event) => {
      const el = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-track]")
        : null;
      const name = el?.dataset.track;
      if (!el || !name) return;
      let props: Record<string, unknown> = {};
      const raw = el.dataset.trackProps;
      if (raw) {
        try {
          props = JSON.parse(raw) as Record<string, unknown>;
        } catch {
          // Malformed JSON must never break a click.
        }
      }
      track(name, props);
    });
  }, [ga4Id, mixpanelToken]);
  return null;
}
