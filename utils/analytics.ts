// Analytics vendor configuration — the three public identifiers behind
// components/Analytics.tsx (GA4, Mixpanel, Cloudflare Web Analytics).
//
// The keys are public identifiers, not secrets, so they are build-time
// NEXT_PUBLIC_* variables: production values live in the committed
// .env.production, local ones in .env.local (see .env.example and
// DEVELOPMENT.md "Analytics"). They are inlined at build, so each read must
// stay a literal `process.env.NEXT_PUBLIC_…` access. An unset key means that
// vendor's snippet never renders — dormant, never broken.

export interface AnalyticsConfig {
  ga4MeasurementId?: string;
  mixpanelToken?: string;
  cloudflareAnalyticsToken?: string;
}

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

/** Read the three vendor keys from the build-time NEXT_PUBLIC_* env. */
export function getAnalyticsConfig(): AnalyticsConfig {
  return resolveAnalyticsConfig(
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN,
  );
}
