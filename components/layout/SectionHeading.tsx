import type { ReactNode } from "react";
import { cx } from "../cx.ts";

export type HeadingTone = "primary" | "white" | "black";
export type HeadingWeight = "bold" | "semibold";
export type HeadingAlign = "left" | "center" | "left-center-md";
export type HeadingSize = "section" | "card" | "jumbo" | "56" | "32";

// The section-title scale measured across the WP-clone pages:
//  - section: 28 / 39 / 56 px (the dominant scale)
//  - card:    25 / 30 / 36 px (what-we-do + give-now cards)
//  - jumbo:   76 px from md up (give-now page titles; set the mobile size
//             via `className` — pages measure 34 or 42 px)
//  - 56:      56 px from md up (give-now tax card; mobile via `className`)
//  - 32:      flat 32 px (give-now US/AU section titles)
// Two weight dialects exist on WP: `bold` (subpages) and `semibold`
// (homepage + get-involved cards). Omit `align` to inherit the parent's
// text alignment — several pages center via their container.
const TONES: Record<HeadingTone, string> = {
  primary: "text-primary",
  white: "text-white",
  black: "text-black",
};

const WEIGHTS: Record<HeadingWeight, string> = {
  bold: "font-bold",
  semibold: "font-semibold",
};

const ALIGNS: Record<HeadingAlign, string> = {
  left: "text-left",
  center: "text-center",
  "left-center-md": "text-left md:text-center",
};

const SIZES: Record<HeadingSize, string> = {
  section: "text-[28px] md:text-[39px] lg:text-[56px]",
  card: "text-[25px] md:text-[30px] lg:text-[36px]",
  jumbo: "md:text-[76px] md:leading-none",
  "56": "md:text-[56px] md:leading-none",
  "32": "text-[32px]",
};

export interface SectionHeadingProps {
  title: ReactNode;
  tone?: HeadingTone;
  weight?: HeadingWeight;
  /** Text alignment; omit to inherit from the parent. */
  align?: HeadingAlign;
  size?: HeadingSize;
  /** `tight` for the dialects measured with leading-tight. */
  leading?: "none" | "tight";
  /** Adds `tracking-tight` (the homepage semibold dialect). */
  tracking?: boolean;
  /** Page-specific additions: margins, measures, `invisible`, lg tweaks. */
  className?: string;
}

export function SectionHeading(
  {
    title,
    tone = "primary",
    weight = "bold",
    align,
    size = "section",
    leading = "none",
    tracking,
    className: extra,
  }: SectionHeadingProps,
) {
  return (
    <h2
      className={cx(
        leading === "tight" ? "leading-tight" : "leading-none",
        SIZES[size],
        WEIGHTS[weight],
        TONES[tone],
        align && ALIGNS[align],
        tracking && "tracking-tight",
        extra,
      )}
    >
      {title}
    </h2>
  );
}

export default SectionHeading;
