import type { ReactNode } from "react";
import { asset } from "../utils/assets.ts";

/**
 * Wraps `children` (the header DONATE pill) with the WP "Accredited by:"
 * hover card — PCNC + DSWD logos under a caption. Pure CSS (group-hover /
 * group-focus-within), so it ships no JS; desktop only (`lg`+, WP gates
 * it at > 1024px).
 *
 * Measured dialect (the `.donate-pcnc-tooltip` snippet in WP's <head>):
 * white card, 8px radius, 14/20px padding, 10px gap, shadow
 * 0 4px 15px rgba(0,0,0,.15), bottom -110px, an 8px white arrow on top;
 * fades in and rises 10px over 0.3s. Caption 12px semibold (WP `#555`;
 * `on-surface-variant` is the nearest token); logos 40px tall, 15px apart.
 */
export function AccreditedTooltip({ children }: { children: ReactNode }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none invisible absolute -bottom-[110px] left-1/2 z-50 hidden w-max -translate-x-1/2 translate-y-2.5 flex-col items-center gap-2.5 rounded-[8px] bg-white px-5 py-3.5 opacity-0 shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-all duration-300 before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-white before:content-[''] group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none lg:flex">
        <span className="text-xs font-semibold text-on-surface-variant">
          Accredited by:
        </span>
        <span className="flex items-center gap-[15px]">
          <img
            src={asset("/images/orgs/pcnc-wp.png")}
            alt="Philippine Council for NGO Certification"
            className="h-10 w-auto"
          />
          <img
            src={asset("/images/orgs/dswd-wp.png")}
            alt="Department of Social Welfare and Development"
            className="h-10 w-auto"
          />
        </span>
      </span>
    </span>
  );
}
