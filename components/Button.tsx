import type { ComponentChildren } from "preact";
import { cx } from "./cx.ts";

export type ButtonVariant =
  | "yellow"
  | "black"
  | "white"
  | "outline-white"
  | "outline-black"
  | "outline-primary"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg" | "xl" | "header" | "form";

export type ButtonShape = "pill" | "rounded-30" | "rounded-50";

// The site's pill-button system, extracted verbatim from the WP-clone
// pages. Variants carry color + hover behavior; sizes carry the label and
// padding dialects measured per page; shape carries the corner language
// (pills on content pages, 30/50px rounds on the give-now jumbo CTAs).
// Sizes `lg`/`xl` omit `min-h-12` — their height comes from padding, as
// measured on WP.
const VARIANTS: Record<ButtonVariant, string> = {
  yellow: "bg-yellow text-black transition-opacity hover:opacity-90",
  black: "bg-black text-white transition-opacity hover:opacity-90",
  white: "bg-white text-black transition-opacity hover:opacity-90",
  "outline-white":
    "border-[3px] border-white text-white transition-colors hover:bg-white hover:text-black",
  "outline-black":
    "border-[3px] border-black bg-white text-black transition-colors hover:bg-black hover:text-white",
  // The home contact form's SEND: hairline primary outline that fills on hover.
  "outline-primary":
    "border border-primary bg-transparent text-primary transition-all hover:bg-primary hover:text-on-primary",
  // Paints nothing, so it sits on the give-now yellow card; fades on hover.
  ghost: "bg-transparent text-black transition-opacity hover:opacity-80",
};

const SIZES: Record<ButtonSize, string> = {
  // Homepage dialect: 14px mobile labels, height from min-h-12.
  sm: "min-h-12 px-6 text-[14px] md:text-lg",
  // Subpage dialect: 15px mobile labels with py-4.
  md: "min-h-12 px-6 py-4 text-[15px] md:text-lg",
  // Give-now jumbo: px-8, no min-height (padding-driven).
  lg: "px-8 py-3 text-[22px] leading-none",
  // Give-now hero ghost CTA: same as lg with wider padding.
  xl: "px-10 py-3 text-[22px] leading-none",
  // Header DONATE / mobile DONATE.
  header: "min-h-12 px-6 text-base lg:text-lg",
  // Form submits (contact SEND): 20px label at every width.
  form: "min-h-12 px-6 text-xl",
};

const SHAPES: Record<ButtonShape, string> = {
  pill: "rounded-full",
  "rounded-30": "rounded-card",
  "rounded-50": "rounded-jumbo",
};

/** Class string for a Button's look — reused by non-Button controls that
 *  must match the pill system (e.g. Popup's trigger on get-involved). */
export function buttonClasses(
  { variant = "yellow", size = "md", shape = "pill" }: {
    variant?: ButtonVariant;
    size?: ButtonSize;
    shape?: ButtonShape;
  } = {},
  extra?: string,
) {
  return cx(
    "inline-flex items-center justify-center font-bold",
    VARIANTS[variant],
    SIZES[size],
    SHAPES[shape],
    extra,
  );
}

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  href?: string;
  /** Passed through when the button is a link (e.g. target="_blank"). */
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  tabIndex?: number;
  /** Buttons only (form submits) — e.g. the storybook's demo signup form. */
  disabled?: boolean;
  class?: string;
  children?: ComponentChildren;
}

export function Button(
  {
    variant = "yellow",
    size = "md",
    shape = "pill",
    href,
    target,
    rel,
    type = "button",
    tabIndex,
    disabled,
    class: extra,
    children,
  }: ButtonProps,
) {
  const className = buttonClasses({ variant, size, shape }, extra);
  if (href !== undefined) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        tabIndex={tabIndex}
        class={className}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      tabIndex={tabIndex}
      disabled={disabled}
      class={className}
    >
      {children}
    </button>
  );
}

export default Button;
