import type { ComponentChildren } from "preact";
import { cx } from "./cx.ts";

export type EyebrowTone = "primary" | "container" | "muted" | "inverse";

const TONES: Record<EyebrowTone, string> = {
  primary: "text-primary",
  container: "text-on-primary-container",
  muted: "text-on-surface-variant",
  inverse: "text-surface/60",
};

export interface EyebrowProps {
  tone?: EyebrowTone;
  size?: "sm" | "xs";
  class?: string;
  children?: ComponentChildren;
}

// The small uppercase label that marks section beginnings ("Featured campaign",
// "Stories & impact", …) and footer column headers. label-sm/label-sm per DESIGN.md.
export function Eyebrow(
  { tone = "primary", size = "sm", class: extra, children }: EyebrowProps,
) {
  return (
    <span
      class={cx(
        "font-semibold uppercase tracking-wider",
        size === "xs" ? "text-xs" : "text-sm",
        TONES[tone],
        extra,
      )}
    >
      {children}
    </span>
  );
}

export default Eyebrow;
