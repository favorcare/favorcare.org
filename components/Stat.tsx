import { cx } from "./cx.ts";

export interface StatProps {
  value: string;
  label: string;
  /** Render on a dark band (Stats section) vs. light surface. */
  tone?: "on-dark" | "default";
  class?: string;
}

// A single impact metric: big gold number + label. label-sm below a display value.
export function Stat(
  { value, label, tone = "on-dark", class: extra }: StatProps,
) {
  return (
    <div class={cx("text-center", extra)}>
      <div class="text-3xl font-bold text-primary md:text-4xl">{value}</div>
      <div
        class={cx(
          "mt-1 text-sm",
          tone === "on-dark" ? "text-surface/70" : "text-on-surface-variant",
        )}
      >
        {label}
      </div>
    </div>
  );
}

export default Stat;
