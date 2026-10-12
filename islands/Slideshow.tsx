import { useEffect, useRef, useState } from "preact/hooks";

export interface SlideshowImage {
  src: string;
  alt: string;
}

export interface SlideshowProps {
  images: SlideshowImage[];
  /** Accessible name for the carousel region. */
  label: string;
}

// One-slide-at-a-time photo slideshow cloned from the WP Elementor
// `slides` widget (what-we-do program rows): a full-width photo with white
// chevrons inside the frame and dot pagination below. CSS scroll-snap
// provides the swipe/trackpad behavior; the island JS only drives the
// arrows and dots. Photos are decorative backgrounds (WP ships no alt),
// so the alt text lives on the region label.
export default function Slideshow({ images, label }: SlideshowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const step = track.clientWidth || 1;
      setActive(Math.round(track.scrollLeft / step));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.min(Math.max(0, i), images.length - 1);
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div class="relative">
        <div
          ref={trackRef}
          class="flex h-[300px] w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:h-[323px] lg:h-[400px]"
        >
          {images.map((image, i) => (
            <div
              key={image.src}
              data-slide
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}: ${image.alt}`}
              class="h-full w-full shrink-0 snap-start bg-cover bg-center"
              style={{ backgroundImage: `url(${image.src})` }}
            />
          ))}
        </div>

        {
          /* Pagination overlays the photo's bottom edge (WP positions it
            inside the widget, so it adds no layout height). */
        }
        <div class="absolute inset-x-0 bottom-2 flex justify-center gap-2">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Go to slide ${i + 1}: ${image.alt}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              class={`h-2 w-2 rounded-full transition-colors ${
                i === active ? "bg-white" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => goTo(active - 1)}
          class="absolute left-2.5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => goTo(active + 1)}
          class="absolute right-2.5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
