import { test } from "vitest";
import { deepStrictEqual, ok } from "node:assert/strict";
import { getAnalyticsConfig, resolveAnalyticsConfig } from "./analytics.ts";

test("resolveAnalyticsConfig keeps set keys, trims, drops empties", () => {
  deepStrictEqual(resolveAnalyticsConfig(" G-ABC123 ", "  ", undefined), {
    ga4MeasurementId: "G-ABC123",
  });
  deepStrictEqual(resolveAnalyticsConfig(undefined, "mp-token", ""), {
    mixpanelToken: "mp-token",
  });
  deepStrictEqual(resolveAnalyticsConfig(undefined, undefined, "cf-token"), {
    cloudflareAnalyticsToken: "cf-token",
  });
});

test("resolveAnalyticsConfig with nothing set is empty", () => {
  deepStrictEqual(resolveAnalyticsConfig(undefined, undefined, undefined), {});
});

test("getAnalyticsConfig returns a config object (dev: usually empty)", () => {
  const config = getAnalyticsConfig();
  deepStrictEqual(typeof config, "object");
  for (
    const key of [
      "ga4MeasurementId",
      "mixpanelToken",
      "cloudflareAnalyticsToken",
    ] as const
  ) {
    if (config[key] !== undefined) ok(config[key]!.length > 0);
  }
});
