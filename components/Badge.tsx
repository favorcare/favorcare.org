import type { ComponentChildren } from "preact";
import { cx } from "./cx.ts";

export type BadgeVariant = "primary" | "secondary" | "neutral";

// Chip colors per DESIGN.md v2 badge variants (square).
const VARIANTS: Record<BadgeVariant, string> = {
  primary: "bg-primary-container text-on-primary-container",
  secondary: "bg-secondary-container text-on-secondary-container",
  neutral: "bg-surface-container text-on-surface-variant",
};

export interface BadgeProps {
  variant?: BadgeVariant;
  class?: string;
  children?: ComponentChildren;
}

// A compact square chip label — tag, status, program category. label-sm type.
export function Badge(
  { variant = "primary", class: extra, children }: BadgeProps,
) {
  return (
    <span
      class={cx(
        "inline-flex items-center rounded px-3 py-1 text-xs font-medium",
        VARIANTS[variant],
        extra,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
