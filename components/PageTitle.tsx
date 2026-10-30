import type { ReactNode } from "react";
import { cx } from "./cx.ts";

export type PageTitleTone = "white" | "primary";
export type PageTitleWeight = "bold" | "semibold-md-bold";
export type PageTitleSize = "hero" | "contact";

// The page-title scale measured across the WP-clone subpages:
//  - hero:    38 / 56 / 70 px (who-we-are, what-we-do, get-involved, signup)
//  - contact: 38 / 59 / 70 px (the contact page's hero-less black title)
// Two weight dialects: `bold` everywhere on who-we-are/what-we-do/contact,
// and `semibold-md-bold` (600 at 360, 700 from 768) on get-involved and
// signup. The homepage (570px semibold with -2.3px tracking) and give-now
// (jumbo 76px) titles are their own WP dialects and stay in their routes.
const TONES: Record<PageTitleTone, string> = {
  white: "text-white",
  primary: "text-primary",
};

const WEIGHTS: Record<PageTitleWeight, string> = {
  bold: "font-bold",
  "semibold-md-bold": "font-semibold md:font-bold",
};

const SIZES: Record<PageTitleSize, string> = {
  hero: "text-[38px] md:text-[56px] lg:text-[70px]",
  contact: "text-[38px] md:text-[59px] lg:text-[70px]",
};

export interface PageTitleProps {
  /** `white` over a PageHero photo (default); `primary` on white pages. */
  tone?: PageTitleTone;
  weight?: PageTitleWeight;
  size?: PageTitleSize;
  /** Page-specific additions (margins, measures). */
  className?: string;
  children: ReactNode;
}

/**
 * The page `<h1>`: centered, leading-none, on the measured 38/56/70 scale.
 * Pair it with `HeroLead` inside a `PageHero`.
 */
export function PageTitle({
  tone = "white",
  weight = "bold",
  size = "hero",
  className: extra,
  children,
}: PageTitleProps) {
  return (
    <h1
      className={cx(
        "text-center leading-none",
        SIZES[size],
        WEIGHTS[weight],
        TONES[tone],
        extra,
      )}
    >
      {children}
    </h1>
  );
}

export interface HeroLeadProps {
  /** Max-width ladder at 360/768/1280. Replaces the default (the
   *  get-involved/signup 280/560/784 measure), never stacks — who-we-are
   *  measures 260/460/630, what-we-do 260/560/784. */
  measureClass?: string;
  children: ReactNode;
}

/**
 * The hero subtitle under a `PageTitle`: centered white body copy at
 * 14/15/18px. WP's 10px mobile size is raised to 14px for legibility on
 * every page that uses it.
 */
export function HeroLead({ measureClass, children }: HeroLeadProps) {
  return (
    <p
      className={cx(
        "mx-auto mt-4 text-center text-sm leading-relaxed text-white",
        "md:text-[15px] md:leading-[26px] lg:text-lg lg:leading-relaxed",
        measureClass ?? "max-w-[280px] md:max-w-[560px] lg:max-w-[784px]",
      )}
    >
      {children}
    </p>
  );
}

export default PageTitle;
