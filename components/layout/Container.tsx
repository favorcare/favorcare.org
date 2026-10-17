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

/** Gutter classes alone, for full-bleed sections whose background spans
 *  the viewport while an inner `frame()` holds the 1140px measure
 *  (e.g. `<section class={cx(gutter(), "bg-black py-20")}>`). Defaults to
 *  the `page` dialect (20px at 360, 10px at 768, none at 1280). */
export function gutter(pad: ContainerPad = "page"): string {
  return GUTTERS[pad];
}

/** Frame + gutter classes for elements that are not a plain `<div>`
 *  (e.g. `<section class={cx(frame("page"), "py-16")}>`). No trailing
 *  space — always compose with `cx()`, never `+`. */
export function frame(pad?: ContainerPad): string {
  return cx("mx-auto w-full max-w-[1140px]", pad && gutter(pad));
}

export interface ContainerProps {
  /** Gutter dialect; omit for sections that carry their own padding. */
  pad?: ContainerPad;
  /** Extra classes (e.g. `"py-20"` for section-specific vertical rhythm). */
  class?: string;
  children?: ComponentChildren;
}

/** The 1140px content frame as a `<div>`; `pad` adds the measured gutters. */
export function Container({ pad, class: extra, children }: ContainerProps) {
  return <div class={cx(frame(pad), extra)}>{children}</div>;
}

export default Container;
