import type { ReactNode } from "react";
import { cx } from "./cx.ts";

export interface EyebrowProps {
  className?: string;
  children?: ReactNode;
}

// The small gold uppercase label that marks section beginnings on the
// homepage ("DONATE", "WHAT WE DO") — 12px mobile / 14px from md, per the
// WP measurement.
export function Eyebrow({ className: extra, children }: EyebrowProps) {
  return (
    <span
      className={cx(
        "text-[12px] font-bold uppercase tracking-wider text-yellow md:text-[14px]",
        extra,
      )}
    >
      {children}
    </span>
  );
}

export default Eyebrow;
