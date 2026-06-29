import type { ComponentChildren } from "preact";
import { cx } from "./cx.ts";

export interface CardProps {
  /** Render as a link wrapper (`href`) or a plain `<article>`/`<div>`. */
  href?: string;
  /** Lift on hover — apply to interactive cards. */
  interactive?: boolean;
  /** Accent border on hover (used by "ways to help" cards). */
  accent?: boolean;
  class?: string;
  children?: ComponentChildren;
}

// Base surface card per DESIGN.md: rounded-lg, hairline border, level-2 shadow,
// optional hover lift. Specialized cards (ProgramCard, FeatureCard) build on this.
const BASE =
  "flex flex-col rounded-lg border border-surface-container-high bg-surface p-6 shadow-sm transition-all";

export function Card(
  { href, interactive, accent, class: extra, children }: CardProps,
) {
  const className = cx(
    BASE,
    interactive && "hover:-translate-y-0.5 hover:shadow-md",
    interactive && accent && "hover:border-primary",
    extra,
  );

  if (href !== undefined) {
    return <a href={href} class={className}>{children}</a>;
  }
  return <article class={className}>{children}</article>;
}

export default Card;
