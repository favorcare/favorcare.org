import type { ComponentChildren } from "preact";
import { cx } from "./cx.ts";

export interface ChecklistProps {
  items: ComponentChildren[];
  /** 1 or 2 columns; defaults to responsive 1→2. */
  columns?: 1 | 2;
  class?: string;
}

// A ✓-bulleted list (tertiary green ticks) — used for trust facts and guarantees.
export function Checklist(
  { items, columns = 2, class: extra }: ChecklistProps,
) {
  return (
    <ul
      class={cx(
        "grid gap-3",
        columns === 2 && "sm:grid-cols-2",
        extra,
      )}
    >
      {items.map((item, i) => (
        <li key={i} class="flex items-start gap-2 text-sm text-on-surface">
          <span class="mt-0.5 text-tertiary" aria-hidden="true">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default Checklist;
