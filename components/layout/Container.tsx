import type { ComponentChildren } from "preact";
import { cx } from "../cx.ts";

export type ContainerPad = "page" | "home";

// The WP content frame: 1140px, centered, full-width below. Gutters were
// measured per page family — subpages keep 10px at 768 (Elementor's
// default), the homepage uses 40px.
const GUTTERS: Record<ContainerPad, string> = {
  page: "px-5 md:px-2.5 lg:px-0",
  home: "px-5 md:px-10 lg:px-0",
};

/** Frame + gutter classes for elements that are not a plain `<div>`
 *  (e.g. `<section class={frame("page") + " py-16"}>`). */
export function frame(pad?: ContainerPad): string {
  return cx("mx-auto w-full max-w-[1140px]", pad && GUTTERS[pad]);
}

export interface ContainerProps {
  /** Gutter dialect; omit for sections that carry their own padding. */
  pad?: ContainerPad;
  /** Extra classes (e.g. `"py-20"` for section-specific vertical rhythm). */
  class?: string;
  children?: ComponentChildren;
}

export function Container({ pad, class: extra, children }: ContainerProps) {
  return <div class={cx(frame(pad), extra)}>{children}</div>;
}

export default Container;
