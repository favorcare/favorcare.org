import type { ReactNode } from "react";
import { cx } from "../../cx.ts";

export type CfacButtonVariant = "gold" | "dark" | "outline-white";

export type CfacButtonSize = "cta" | "pill" | "block";

// The campaign's own button language, cloned from cfac-landing-page — it
// deliberately differs from the site's pill system (components/Button.tsx):
// soft 8px corners + drop shadow on content CTAs, a 30px round on the nav
// DONATE, and full-width 16px-round form submits. Colors resolve through
// the `.cfac` scope (yellow = campaign gold, primary = fg-dark).
const VARIANTS: Record<CfacButtonVariant, string> = {
  gold: "bg-yellow text-primary shadow-lg transition-opacity hover:opacity-90",
  dark: "bg-primary text-on-primary transition-opacity hover:opacity-90",
  "outline-white":
    "border-2 border-white text-white transition-colors hover:bg-white hover:text-primary",
};

const SIZES: Record<CfacButtonSize, string> = {
  // Hero / How It Works / footer CTAs: px-8 py-4, 16px bold.
  cta: "min-h-12 rounded-lg px-8 py-4 text-base",
  // Header DONATE: 30px round, 16→18px.
  pill: "min-h-12 rounded-[30px] px-4 text-base lg:px-6 lg:text-lg",
  // Form submits: full width, taller from md, 16→20px.
  block:
    "min-h-12 w-full gap-3 rounded-2xl py-4 text-base shadow-lg md:py-6 md:text-xl",
};

export interface CfacButtonProps {
  variant?: CfacButtonVariant;
  size?: CfacButtonSize;
  /** Renders an `<a>` when set; otherwise a `<button>`. */
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  tabIndex?: number;
  /** Analytics event name (islands/Tracking.tsx delegates `[data-track]`). */
  track?: string;
  /** String props for the `track` event (JSON in `data-track-props`). */
  trackProps?: Record<string, string>;
  className?: string;
  children?: ReactNode;
}

/**
 * A Coffee for a Cause button or link. `variant` picks gold / dark /
 * outline-white; `size` picks the content CTA (`cta`), nav pill (`pill`) or
 * full-width form submit (`block`). Disabled submits fall back to the
 * sample's muted grey. Tracking attributes match the site `Button`.
 */
export function CfacButton({
  variant = "gold",
  size = "cta",
  href,
  target,
  rel,
  type = "button",
  disabled,
  tabIndex,
  track,
  trackProps,
  className: extra,
  children,
}: CfacButtonProps) {
  const className = cx(
    "inline-flex items-center justify-center text-center font-bold",
    disabled
      ? "cursor-not-allowed bg-surface-container-highest/40 text-on-surface-variant"
      : VARIANTS[variant],
    SIZES[size],
    extra,
  );
  const trackAttrs = track
    ? {
        "data-track": track,
        "data-track-props": trackProps && JSON.stringify(trackProps),
      }
    : {};
  if (href !== undefined) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        tabIndex={tabIndex}
        className={className}
        {...trackAttrs}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      disabled={disabled}
      tabIndex={tabIndex}
      className={className}
      {...trackAttrs}
    >
      {children}
    </button>
  );
}

export default CfacButton;
