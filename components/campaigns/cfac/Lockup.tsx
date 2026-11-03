import { cx } from "../../cx.ts";
import { CFAC } from "./content.ts";

export interface CfacLockupProps {
  /** `dark` logos sit on gold (header); `light` on photo/dark (footer). */
  tone?: "dark" | "light";
  /** `nav` = header bar sizes; `footer` = the larger footer lockup;
   *  `stacked` = the mobile-menu column. */
  size?: "nav" | "footer" | "stacked";
  /** Hide the × and CFAC mark below `sm` (the header does, to fit). */
  compact?: boolean;
  className?: string;
}

const SIZE = {
  nav: { fc: "h-5 md:h-6 lg:h-7", cfac: "h-3 md:h-3.5", x: "text-sm" },
  footer: { fc: "h-12", cfac: "h-6", x: "text-2xl" },
  stacked: { fc: "h-8", cfac: "h-5", x: "text-xl" },
} as const;

/**
 * The Favor Care × Coffee for a Cause co-brand lockup (cloned from
 * cfac-landing-page's navbar/footer): Favor Care wordmark, a muted ×, and
 * the CFAC logo. Renders images only — wrap it in a link where needed.
 */
export function CfacLockup({
  tone = "dark",
  size = "nav",
  compact = false,
  className: extra,
}: CfacLockupProps) {
  const s = SIZE[size];
  const logos = tone === "dark" ? "black" : "white";
  const hideSmall = compact ? "hidden sm:inline" : "";
  return (
    <span
      className={cx(
        "flex items-center",
        size === "stacked" ? "flex-col gap-2" : "gap-1.5 md:gap-2",
        size === "footer" && "flex-col gap-2 sm:flex-row sm:gap-4",
        extra,
      )}
    >
      <img
        src={CFAC.logos.favorCare[logos]}
        alt="Favor Care"
        className={cx("w-auto", s.fc)}
      />
      <span
        aria-hidden="true"
        className={cx(
          s.x,
          tone === "dark" ? "text-primary/40" : "text-white/40",
          hideSmall,
        )}
      >
        ×
      </span>
      <img
        src={CFAC.logos.cfac[logos]}
        alt={CFAC.name}
        className={cx("w-auto", s.cfac, hideSmall)}
      />
    </span>
  );
}

export default CfacLockup;
