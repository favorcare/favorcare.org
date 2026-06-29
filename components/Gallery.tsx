import type { ComponentChildren } from "preact";
import { cx } from "./cx.ts";
import Lightbox from "../islands/Lightbox.tsx";

export interface GalleryItem {
  /** Omit to render a placeholder tile (no photos uploaded yet). */
  src?: string;
  alt: string;
  caption?: string;
}

export interface GalleryProps {
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  /** Enable click-to-enlarge (renders the Lightbox island). Default true. */
  lightbox?: boolean;
  class?: string;
}

const COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

function Placeholder({ alt }: { alt: string }) {
  return (
    <div class="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-surface-container-low to-surface-container text-on-surface-variant">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="m21 16-5-5L5 19" />
      </svg>
      <span class="px-4 text-center text-xs">{alt}</span>
    </div>
  );
}

function Tile({
  item,
  children,
}: {
  item: GalleryItem;
  children: ComponentChildren;
}) {
  return (
    <figure class="group relative aspect-4/3 overflow-hidden rounded-lg bg-surface-container-low">
      {children}
      {item.caption && (
        <figcaption class="absolute inset-x-0 bottom-0 bg-linear-to-t from-on-surface/70 to-transparent p-3 text-sm text-surface">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

// Responsive photo grid with hover zoom + optional lightbox. Tiles without a
// `src` render a tasteful placeholder until real photos are supplied.
export function Gallery(
  { items, columns = 3, lightbox = true, class: extra }: GalleryProps,
) {
  return (
    <>
      <div class={cx("grid gap-4", COLS[columns], extra)}>
        {items.map((item) => {
          const media = item.src
            ? (
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )
            : <Placeholder alt={item.alt} />;

          if (lightbox) {
            return (
              <button
                key={item.alt}
                type="button"
                data-lightbox
                data-src={item.src ?? ""}
                data-alt={item.alt}
                class="block w-full cursor-pointer text-left"
              >
                <Tile item={item}>{media}</Tile>
              </button>
            );
          }
          return (
            <div key={item.alt}>
              <Tile item={item}>{media}</Tile>
            </div>
          );
        })}
      </div>
      {lightbox && <Lightbox />}
    </>
  );
}

export default Gallery;
