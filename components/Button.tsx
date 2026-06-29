import type { ComponentChildren } from "preact";

type Variant = "primary" | "secondary" | "donate" | "inverted";

// Button styles per DESIGN.md:
//  - primary  = full-radius gold CTA (hero, section CTAs)
//  - secondary = outlined gold (supporting actions)
//  - donate   = compact gold (header bar; button-donate, h-44)
//  - inverted = dark on gold ( DonateCTA section)
const variantClasses: Record<Variant, string> = {
  primary:
    "min-h-12 px-6 rounded-full font-bold text-on-primary bg-primary hover:bg-primary-hover active:bg-primary-active hover:shadow-glow",
  secondary:
    "min-h-12 px-6 rounded font-semibold border-2 border-primary text-primary hover:bg-primary-container hover:text-on-primary-container hover:border-primary-container",
  donate:
    "min-h-11 px-5 rounded font-bold text-on-primary bg-primary hover:bg-primary-hover active:bg-primary-active",
  inverted:
    "min-h-12 px-6 rounded-full font-bold text-primary bg-on-primary hover:bg-on-primary/90",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 transition-all";

export interface ButtonProps {
  variant?: Variant;
  href?: string;
  type?: "button" | "submit" | "reset";
  class?: string;
  children?: ComponentChildren;
}

export function Button(
  { variant = "primary", href, type = "button", class: extra, children }:
    ButtonProps,
) {
  const className = `${baseClasses} ${variantClasses[variant]} ${extra ?? ""}`;
  if (href !== undefined) {
    return <a href={href} class={className}>{children}</a>;
  }
  return <button type={type} class={className}>{children}</button>;
}

export default Button;
