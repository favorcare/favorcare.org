import type { ReactNode } from "react";
import { cx } from "./cx.ts";
import { frame } from "./layout/Container.tsx";
import type { ContainerPad } from "./layout/Container.tsx";

export interface PageHeroProps {
  /** Background photo (cover). */
  image: string;
  /** Background-position overrides (e.g. `"lg:bg-[position:0_-68px]"`);
   *  defaults to `bg-center`. Replaces the default, never stacks. */
  imageClass?: string;
  /** `gradient` = the black→yellow wash (default); `flat` = 50% black;
   *  `none` = photo only (post covers). */
  overlay?: "gradient" | "flat" | "none";
  /** Gradient opacity override (e.g. `"opacity-50"`). Replaces the
   *  default 0.54, never stacks. */
  overlayClass?: string;
  /** `standard` = the subpage paddings/gap; `bare` = no gap or padding,
   *  for the heroes that position themselves (give-now, posts, homepage). */
  geometry?: "standard" | "bare";
  /** Gutter dialect for the frame (`page` by default; the homepage hero
   *  measures `home`). */
  framePad?: ContainerPad;
  /** false to render children directly in the section — the give-now and
   *  post heroes have no 1140px frame of their own. */
  framed?: boolean;
  /** Section overrides: extra geometry, `hidden lg:block` (archive). */
  sectionClass?: string;
  /** Frame overrides (the posts archive centers via its frame). */
  frameClass?: string;
  /** Title + subtitle — usually `PageTitle` + `HeroLead`; the homepage,
   *  give-now and posts heroes keep their own measured markup. */
  children: ReactNode;
}

// The photo-hero shell, extracted verbatim from the WP-clone pages
// (homepage, who-we-are, what-we-do, get-involved, posts): full-bleed
// photo, overlay wash, and optionally the 1140px frame. The shell is
// shared here; the subpage title and subtitle live in PageTitle.tsx, and
// the homepage/give-now/posts title dialects stay in their routes.
export function PageHero({
  image,
  imageClass,
  overlay = "gradient",
  overlayClass,
  geometry = "standard",
  framePad = "page",
  framed = true,
  sectionClass,
  frameClass,
  children,
}: PageHeroProps) {
  const body = framed ? (
    <div className={cx(frame(framePad), "relative", frameClass)}>
      {children}
    </div>
  ) : (
    children
  );
  return (
    <section
      className={cx(
        "relative flex flex-col items-center",
        geometry === "standard" && "gap-4 py-[35px] pb-10 md:py-25 lg:pb-45",
        sectionClass,
      )}
    >
      <div
        className={cx("absolute inset-0 bg-cover", imageClass ?? "bg-center")}
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      {overlay !== "none" && (
        <div
          className={cx(
            "absolute inset-0",
            overlay === "flat"
              ? "bg-black/50"
              : cx(
                  "bg-linear-to-t from-black to-yellow",
                  overlayClass ?? "opacity-[0.54]",
                ),
          )}
          aria-hidden="true"
        />
      )}
      {body}
    </section>
  );
}

export default PageHero;
