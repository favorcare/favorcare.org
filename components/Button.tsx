import type { ComponentChildren } from "preact";

type Variant = "primary" | "secondary" | "donate" | "inverted" | "outline";

// Button styles per DESIGN.md v2 (WordPress base — square, flat):
//  - primary  = solid near-black CTA (hero, section CTAs)
//  - secondary = outlined near-black (supporting actions)
//  - donate   = compact solid (header bar)
//  - inverted = white on dark sections (DonateCTA section)
//  - outline  = transparent pill with hairline border (form SEND button)
const variantClasses: Record<Variant, string> = {
  primary:
    "min-h-12 px-6 rounded font-bold text-on-primary bg-primary hover:bg-primary-hover active:bg-primary-active",
  secondary:
    "min-h-12 px-6 rounded font-semibold border-2 border-primary text-primary hover:bg-primary-container hover:text-on-primary-container hover:border-primary-container",
  donate:
    "min-h-12 px-5 rounded font-bold text-on-primary bg-primary hover:bg-primary-hover active:bg-primary-active",
  inverted:
    "min-h-12 px-6 rounded font-bold text-primary bg-on-primary hover:bg-on-primary/90",
  outline:
    "min-h-12 px-6 rounded-full font-bold text-primary border border-primary bg-transparent hover:bg-primary hover:text-on-primary",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 transition-all";

export interface ButtonProps {
  variant?: Variant;
  href?: string;
  /** Passed through when the button is a link (e.g. target="_blank"). */
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  tabIndex?: number;
  class?: string;
  children?: ComponentChildren;
}

export function Button(
  {
    variant = "primary",
    href,
    target,
    rel,
    type = "button",
    tabIndex,
    class: extra,
    children,
  }: ButtonProps,
) {
  const className = `${baseClasses} ${variantClasses[variant]} ${extra ?? ""}`;
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
    <button type={type} tabIndex={tabIndex} class={className}>
      {children}
    </button>
  );
}

export default Button;
