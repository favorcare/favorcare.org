import type { ComponentChildren } from "preact";
import { cx } from "../cx.ts";

export interface ContainerProps {
  /** Extra classes (e.g. `"py-20"` for section-specific vertical rhythm). */
  class?: string;
  children?: ComponentChildren;
}

// The site's centered content frame: 1280px max-width (max-w-7xl) + 24px gutters.
// Used by every section so horizontal padding stays consistent.
export function Container({ class: extra, children }: ContainerProps) {
  return <div class={cx("mx-auto max-w-7xl px-6", extra)}>{children}</div>;
}

export default Container;
