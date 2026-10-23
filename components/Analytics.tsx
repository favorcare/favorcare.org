// Vendor analytics loaders — GA4, Mixpanel, and Cloudflare Web Analytics —
// plus the Tracking island, rendered once at the end of the body in
// routes/_app.tsx. Each vendor appears only when its key is set (where the
// keys live per environment: DEVELOPMENT.md "Analytics & UTM tracking"), so
// an unset key simply means that vendor is off — dormant, never broken.
// Pageviews are automatic in all three; custom events go through
// islands/Tracking.tsx.
//
// Only external script tags render server-side; the vendors' official
// inline bootstraps are injected by the Tracking island (script elements
// with textContent), which keeps inline JS out of the SSR markup.

import Tracking from "../islands/Tracking.tsx";
import { getAnalyticsConfig } from "../utils/analytics.ts";

/** Renders nothing when no vendor key is configured. */
export function Analytics() {
  const { ga4MeasurementId, mixpanelToken, cloudflareAnalyticsToken } =
    getAnalyticsConfig();
  if (!ga4MeasurementId && !mixpanelToken && !cloudflareAnalyticsToken) {
    return null;
  }
  return (
    <>
      {ga4MeasurementId && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}
        />
      )}
      {cloudflareAnalyticsToken && (
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: cloudflareAnalyticsToken })}
        />
      )}
      <Tracking ga4Id={ga4MeasurementId} mixpanelToken={mixpanelToken} />
    </>
  );
}

export default Analytics;
