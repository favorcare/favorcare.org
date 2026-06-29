import type { ComponentChildren } from "preact";
import { cx } from "../cx.ts";

export type SectionTone =
  | "default"
  | "dim"
  | "dark"
  | "primary"
  | "hero";

// Background presets — the recurring section surfaces across the site.
const TONES: Record<SectionTone, string> = {
  default: "",
  dim: "bg-surface-dim",
  dark: "bg-on-surface text-surface",
  primary: "bg-primary",
  hero:
    "relative overflow-hidden bg-linear-to-b from-primary-container/40 to-surface",
};

export interface SectionProps {
  /** Anchor id; when set, adds scroll-mt so the sticky header doesn't cover it. */
  id?: string;
  tone?: SectionTone;
  class?: string;
  children?: ComponentChildren;
}

export function Section(
  { id, tone = "default", class: extra, children }: SectionProps,
) {
  return (
    <section
      id={id}
      class={cx(TONES[tone], id && "scroll-mt-20", extra)}
    >
      {children}
    </section>
  );
}

export default Section;
