// Unit tests for the CFAC sub-brand: the scoped theme must keep every
// text/background pair at AA (4.5:1) even as placeholder hexes get swapped
// for the real brand kit, the donate seam must never carry an invented
// URL, and donate clicks must always attribute fund: "cfac".
import { assert } from "@std/assert";
import {
  CFAC,
  CFAC_CONTRAST_PAIRS,
  CFAC_EVENTS,
  cfacDonateProps,
} from "./cfac.ts";
import { contrastRatio } from "./tokens.ts";

Deno.test("every CFAC text/background pair clears the 4.5:1 AA bar", () => {
  assert(CFAC_CONTRAST_PAIRS.length > 0, "contrast pairs went missing");
  for (const p of CFAC_CONTRAST_PAIRS) {
    const ratio = contrastRatio(p.fg, p.bg);
    assert(
      ratio >= 4.5,
      `${p.label} fails AA: ${ratio.toFixed(2)}:1 (fg ${p.fg} on bg ${p.bg})`,
    );
  }
});

Deno.test("CFAC CTAs are placeholders or real https links — never invented URLs", () => {
  const hrefs = [
    CFAC.donate.href,
    CFAC.hero.cta.href,
    CFAC.closing.cta.href,
  ];
  for (const href of hrefs) {
    assert(
      href === "#" || href.startsWith("https://"),
      `CTA href must be "#" or https:// — got: ${href}`,
    );
  }
});

Deno.test("donate clicks always carry fund: cfac", () => {
  const header = cfacDonateProps("header");
  assert(header.fund === "cfac");
  assert(header.location === "header");
  assert(CFAC_EVENTS.donate === "donate_click");
  assert(CFAC_EVENTS.success === "cfac_donate_success");
});
