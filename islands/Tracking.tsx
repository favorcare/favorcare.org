// Client-side analytics behavior — the one island behind every tracked
// event: vendor bootstraps (GA4 gtag config, the official Mixpanel snippet,
// injected here as script elements so inline JS stays out of the SSR
// markup), UTM capture on landing (utils/utm.ts), a single delegated click
// listener for `[data-track]` elements, and the `track()` fan-out to every
// configured vendor. Mounted once by <Analytics> at the end of the body in
// routes/_app.tsx.
//
// `track()` is import-safe from any island (guards on the vendor globals)
// and is exposed as `window.favorcareTrack` for console debugging:
//   favorcareTrack("demo", { note: "hello" })

import { useEffect } from "preact/hooks";
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
  /** Mixpanel project token — injects the official lib bootstrap. */
  mixpanelToken?: string;
}

interface GtagFn {
  (command: "event", name: string, params?: Record<string, unknown>): void;
  (...args: unknown[]): void;
}

interface MixpanelFn {
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

/** The official Mixpanel bootstrap (queueing stub + lib loader). */
function bootstrapMixpanel(token: string): string {
  return `(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"people"===a&&(d+=".people");for(var c=0;c<b._i.length;c++)d+=" "+b._i[c][0];return d};g("mixpanel","time");g(a,"init");g(a,"track");g(a,"register");g(a,"register_once");g(a,"alias");g(a,"name_tag");g(a,"set_config");g(a,"people.set");g(a,"people.set_once");g(a,"people.increment");g(a,"people.append");g(a,"people.union");b._i.push([e,f,c])};b.__SV=1;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
mixpanel.init('${token}');`;
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

    // Vendor bootstraps — official inline snippets, token inlined from this
    // repo's own config (never user input).
    if (ga4Id) bootstrapGtag(ga4Id);
    if (mixpanelToken && !document.querySelector("script[data-fc-mp]")) {
      const script = document.createElement("script");
      script.setAttribute("data-fc-mp", "true");
      script.textContent = bootstrapMixpanel(mixpanelToken);
      document.head.appendChild(script);
    }

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
