import { cx } from "./cx.ts";

export interface ProgressBarProps {
  /** Percent filled, 0–100. */
  value: number;
  raised?: string;
  goal?: string;
  class?: string;
}

// Campaign progress: raised/goal labels + a gold fill bar on a neutral track.
export function ProgressBar(
  { value, raised, goal, class: extra }: ProgressBarProps,
) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div class={extra}>
      {(raised || goal) && (
        <div class="flex items-end justify-between text-sm font-semibold text-on-surface">
          {raised && <span>{raised}</span>}
          {goal && <span>{goal}</span>}
        </div>
      )}
      <div
        class={cx(
          "mt-2 h-3 overflow-hidden rounded-full bg-surface-container",
          !raised && !goal && "mt-0",
        )}
      >
        <div
          class="h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
