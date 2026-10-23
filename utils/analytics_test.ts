import { assert, assertEquals } from "@std/assert";
import { getAnalyticsConfig, resolveAnalyticsConfig } from "./analytics.ts";

Deno.test("resolveAnalyticsConfig keeps set keys, trims, drops empties", () => {
  assertEquals(resolveAnalyticsConfig(" G-ABC123 ", "  ", undefined), {
    ga4MeasurementId: "G-ABC123",
  });
  assertEquals(resolveAnalyticsConfig(undefined, "mp-token", ""), {
    mixpanelToken: "mp-token",
  });
  assertEquals(resolveAnalyticsConfig(undefined, undefined, "cf-token"), {
    cloudflareAnalyticsToken: "cf-token",
  });
});

Deno.test("resolveAnalyticsConfig with nothing set is empty", () => {
  assertEquals(resolveAnalyticsConfig(undefined, undefined, undefined), {});
});

Deno.test("getAnalyticsConfig returns a config object (dev: usually empty)", () => {
  const config = getAnalyticsConfig();
  assertEquals(typeof config, "object");
  for (
    const key of [
      "ga4MeasurementId",
      "mixpanelToken",
      "cloudflareAnalyticsToken",
    ] as const
  ) {
    if (config[key] !== undefined) assert(config[key]!.length > 0);
  }
});
