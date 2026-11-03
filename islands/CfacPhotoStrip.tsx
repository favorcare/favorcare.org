"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../components/icons.tsx";

export interface CfacPhotoStripPhoto {
  src: string;
  alt: string;
}

export interface CfacPhotoStripProps {
  photos: CfacPhotoStripPhoto[];
  /** Accessible name for the carousel region. */
  label: string;
}

/**
 * The CFAC community photo strip, cloned from cfac-landing-page's
 * multi-item carousel: 1 / 2 / 3 rounded photos per view (144→192px tall),
 * white round chevrons over the edges, and gold pill dots (the active one
 * stretches). CSS scroll-snap does the swiping, so it scrolls with JS off;
 * the island only drives arrows and dots. Unlike the shared `Carousel`
 * (captioned cards), photos carry their own alt text.
 */
export default function CfacPhotoStrip({ photos, label }: CfacPhotoStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const step = () => {
    const track = trackRef.current;
    const cards = track?.querySelectorAll<HTMLElement>("[data-slide]");
    if (!track || !cards || cards.length < 2) return null;
    return { track, size: cards[1].offsetLeft - cards[0].offsetLeft || 1 };
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const s = step();
      if (s) setActive(Math.round(s.track.scrollLeft / s.size));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const s = step();
    if (!s) return;
    const next = Math.min(Math.max(0, i), photos.length - 1);
    s.track.scrollTo({ left: next * s.size, behavior: "smooth" });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 py-2 [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              data-slide
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${photos.length}`}
              className="w-[calc(100%-1.5rem)] min-w-[280px] shrink-0 snap-center sm:w-[calc(50%-0.375rem)] md:w-[calc(33.333%-0.875rem)]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-36 w-full rounded-xl object-cover shadow-lg md:h-48"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => goTo(active - 1)}
          className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-colors hover:bg-white"
        >
          <ChevronLeftIcon size={20} />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => goTo(active + 1)}
          className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-colors hover:bg-white"
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>

      <div className="mt-4 flex justify-center">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className="flex h-6 items-center px-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${
                i === active
                  ? "w-6 bg-yellow"
                  : "w-1.5 bg-yellow/30 hover:bg-yellow/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
