import type { ComponentChildren } from "preact";

type Variant = "primary" | "secondary";

// Button styles per DESIGN.md: primary = full-radius gold CTA, secondary = outlined.
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary rounded-full font-bold hover:bg-[#ff9500] hover:shadow-[0_4px_12px_rgba(255,180,40,0.25)] active:bg-[#e6a000]",
  secondary:
    "border-2 border-primary text-primary rounded hover:bg-primary-container hover:text-on-primary-container hover:border-primary-container",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 min-h-12 px-6 font-semibold transition-colors";

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
