import { cx } from "./cx.ts";
import { frame } from "./layout/Container.tsx";

/** One photo in a `Gallery`. Article galleries pass `alt: ""` (decorative). */
export interface GalleryImage {
  src: string;
  alt: string;
}

export type GalleryVariant = "tiles" | "article";

// Tailwind only generates classes it can read as whole strings in source, so
// the order and column utilities are literal lookup tables — never built
// from a number with a template string. `Gallery_test.ts` checks that every
// value below appears verbatim in this file.
export const MOBILE_ORDER: Record<number, string> = {
  1: "order-1",
  2: "order-2",
  3: "order-3",
  4: "order-4",
};

export const DESKTOP_ORDER: Record<number, string> = {
  1: "md:order-1",
  2: "md:order-2",
  3: "md:order-3",
  4: "md:order-4",
};

export const COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

/**
 * Column class for an article gallery of `count` images: one column per
 * image up to four, and three for anything larger (WP's `articleContent`
 * grids are 1–4 wide, with a 3-up default).
 */
export function galleryCols(count: number): string {
  return COLUMNS[count] ?? COLUMNS[3];
}

/**
 * The `[mobile, md]` order classes for the tile at `index` (0-based). Below md
 * the tile sits at `mobileOrder[index]`; from md up it keeps its source
 * position, so the DOM order is the desktop order. Both are "" with no
 * `mobileOrder` or when either position is outside the 1–4 tables.
 */
export function tileOrder(
  index: number,
  mobileOrder?: number[],
): [mobile: string, md: string] {
  const mobile = mobileOrder && MOBILE_ORDER[mobileOrder[index]];
  const desktop = DESKTOP_ORDER[index + 1];
  return mobile && desktop ? [mobile, desktop] : ["", ""];
}

export interface GalleryProps {
  images: GalleryImage[];
  /** `tiles`: the who-we-are 2×2 rounded grid. `article`: natural-aspect
   *  photos in a post body, columns by count. */
  variant: GalleryVariant;
  /** `tiles` only: each image's position (1-based) below md, e.g. WP's
   *  `[2, 4, 1, 3]` — huddle, volunteers, aetas, dental. Omit to keep the
   *  source order at every breakpoint. */
  mobileOrder?: number[];
}

/**
 * A photo gallery in one of the two WP-measured dialects.
 *
 * `tiles` renders its own full-bleed section: a 2×2 grid of 3:2 photos with
 * `rounded-card` corners and 4/11/10px gaps at 360/768/1280, on a yellow strip
 * with 10px gutters below md and plain white from md up. `article` renders
 * only the grid (`gap-4`, natural aspect ratio) for the post body column.
 */
export function Gallery({ images, variant, mobileOrder }: GalleryProps) {
  if (variant === "article") {
    return (
      <div className={cx("grid gap-4", galleryCols(images.length))}>
        {images.map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="w-full object-cover"
          />
        ))}
      </div>
    );
  }
  return (
    <section className="bg-yellow px-2.5 pb-[30px] md:bg-transparent lg:px-0">
      <div
        className={cx(
          frame(),
          "grid grid-cols-2 gap-1 md:gap-[11px] lg:gap-2.5",
        )}
      >
        {images.map((img, i) => {
          const [mobile, md] = tileOrder(i, mobileOrder);
          return (
            <img
              src={img.src}
              alt={img.alt}
              className={cx(
                mobile,
                "aspect-3/2 w-full rounded-card object-cover",
                md,
              )}
              loading="lazy"
            />
          );
        })}
      </div>
    </section>
  );
}

export default Gallery;
