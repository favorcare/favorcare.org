// Analytics vendor configuration — the three public identifiers behind
// components/Analytics.tsx (GA4, Mixpanel, Cloudflare Web Analytics).
//
// Mirrors utils/assets.ts: Deno reads the OS environment in dev and
// `deno task start`; workerd has neither OS env nor a Deno global, so
// server.js stashes the Workers `env` bindings on globalThis before the
// Fresh server's module graph evaluates (import-order, same as the asset
// base). The keys are public identifiers, not secrets — production values
// live in wrangler.jsonc "vars", local ones in .env (see .env.example and
// DEVELOPMENT.md "Analytics"). An unset key means that vendor's snippet
// never renders — dormant, never broken.

export interface AnalyticsConfig {
  ga4MeasurementId?: string;
  mixpanelToken?: string;
  cloudflareAnalyticsToken?: string;
}

interface AnalyticsEnvGlobal {
  Deno?: { env?: { get(name: string): string | undefined } };
  __GA4_MEASUREMENT_ID__?: string;
  __MIXPANEL_TOKEN__?: string;
  __CLOUDFLARE_ANALYTICS_TOKEN__?: string;
}

const g = globalThis as AnalyticsEnvGlobal;

/** Pure: keep the first non-empty trimmed value per vendor. */
export function resolveAnalyticsConfig(
  ga4: string | undefined,
  mixpanel: string | undefined,
  cloudflare: string | undefined,
): AnalyticsConfig {
  const config: AnalyticsConfig = {};
  const ga4Id = ga4?.trim();
  const mixpanelToken = mixpanel?.trim();
  const cloudflareToken = cloudflare?.trim();
  if (ga4Id) config.ga4MeasurementId = ga4Id;
  if (mixpanelToken) config.mixpanelToken = mixpanelToken;
  if (cloudflareToken) config.cloudflareAnalyticsToken = cloudflareToken;
  return config;
}

/** Read the three vendor keys from dev OS env or the workerd globals. */
export function getAnalyticsConfig(): AnalyticsConfig {
  const env = g.Deno?.env;
  return resolveAnalyticsConfig(
    env?.get("GA4_MEASUREMENT_ID") ?? g.__GA4_MEASUREMENT_ID__,
    env?.get("MIXPANEL_TOKEN") ?? g.__MIXPANEL_TOKEN__,
    env?.get("CLOUDFLARE_ANALYTICS_TOKEN") ??
      g.__CLOUDFLARE_ANALYTICS_TOKEN__,
  );
}
