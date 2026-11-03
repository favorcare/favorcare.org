// Unit tests for the CFAC sub-brand: the scoped theme must keep every
// text/background pair at AA (4.5:1), CTAs must be on-page anchors, site
// routes or real https links (never invented URLs), donate clicks must
// always attribute fund: "cfac", and the amount chips must format as pesos.
import { test } from "vitest";
import { equal, ok } from "node:assert/strict";
import {
  CFAC,
  CFAC_CONTRAST_PAIRS,
  CFAC_EVENTS,
  cfacDonateProps,
  formatPeso,
} from "./content.ts";
import { contrastRatio } from "../../tokens.ts";

test("every CFAC text/background pair clears the 4.5:1 AA bar", () => {
  ok(CFAC_CONTRAST_PAIRS.length > 0, "contrast pairs went missing");
  for (const p of CFAC_CONTRAST_PAIRS) {
    const ratio = contrastRatio(p.fg, p.bg);
    ok(
      ratio >= 4.5,
      `${p.label} fails AA: ${ratio.toFixed(2)}:1 (fg ${p.fg} on bg ${p.bg})`,
    );
  }
});

test("CFAC CTAs are anchors, site routes, or https links — never invented URLs", () => {
  const hrefs = [
    CFAC.donate.href,
    CFAC.hero.primary.href,
    CFAC.hero.secondary.href,
    CFAC.howItWorks.cta.href,
    CFAC.footer.donate.href,
    CFAC.thanks.cta.href,
    ...CFAC.nav.map((l) => l.href),
  ];
  for (const href of hrefs) {
    ok(
      href.startsWith("#") ||
        href.startsWith("/") ||
        href.startsWith("https://"),
      `CTA href must be "#…", "/…" or https:// — got: ${href}`,
    );
  }
});

test("donate clicks always carry fund: cfac", () => {
  const header = cfacDonateProps("header");
  ok(header.fund === "cfac");
  ok(header.location === "header");
  ok(CFAC_EVENTS.donate === "donate_click");
  ok(CFAC_EVENTS.success === "cfac_donate_success");
});

test("amount chips format as grouped pesos", () => {
  equal(formatPeso(200), "₱200");
  equal(formatPeso(1000), "₱1,000");
  equal(formatPeso(10000), "₱10,000");
  equal(
    CFAC.give.form.amounts.map(formatPeso).join(" "),
    "₱200 ₱500 ₱1,000 ₱2,500 ₱5,000 ₱10,000",
  );
});

test("the certificate minimum is one of the preset amounts", () => {
  ok(CFAC.give.form.amounts.includes(CFAC.give.form.certificate.minimum));
});
