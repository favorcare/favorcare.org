import { useEffect, useRef, useState } from "preact/hooks";
import { ChevronLeftIcon, ChevronRightIcon } from "../components/icons.tsx";

export interface CarouselSlide {
  src: string;
  alt?: string;
  caption: string;
  href?: string;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  /** Accessible name for the carousel region. */
  label: string;
}

// Media carousel cloned from the WP Elementor `media-carousel` widget
// (homepage "What We Do"): horizontally scrolling photo cards with a black
// caption overlay (hover-revealed — WP keeps it at opacity 0), white chevron
// arrows and pagination dots. CSS scroll-snap provides the swipe/trackpad
// behavior; the island JS only drives the arrows and dots.
//
// The photo is a decorative background, so alt text lives on the caption
// link rather than an <img>.
export default function Carousel({ slides, label }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = track.querySelectorAll<HTMLElement>("[data-slide]");
      if (cards.length < 2) return;
      const step = cards[1].offsetLeft - cards[0].offsetLeft || 1;
      setActive(Math.round(track.scrollLeft / step));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const go = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-slide]");
    if (cards.length < 2) return;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    const next = Math.min(
      Math.max(0, Math.round(track.scrollLeft / step) + dir),
      cards.length - 1,
    );
    track.scrollTo({ left: next * step, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-slide]");
    if (cards.length < 2) return;
    track.scrollTo({
      left: i * (cards[1].offsetLeft - cards[0].offsetLeft),
      behavior: "smooth",
    });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div class="relative">
        <div
          ref={trackRef}
          class="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-10 [scrollbar-width:none] md:gap-[10px] lg:gap-[18px] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => (
            <a
              key={slide.caption}
              href={slide.href ?? "#"}
              data-slide
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${slide.caption}`}
              class="group relative block h-[318px] w-[257px] shrink-0 snap-start overflow-hidden rounded-[30px] bg-primary bg-cover bg-center md:h-[245px] md:w-[222px] lg:h-[470px] lg:w-[368px]"
              style={{ backgroundImage: `url(${slide.src})` }}
            >
              <span class="absolute inset-0 flex items-center justify-center bg-black p-5 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:text-[26px] lg:text-[36px]">
                {slide.caption}
              </span>
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          class="absolute -left-2.5 top-[38%] flex h-12 w-12 items-center justify-center text-white md:-left-3 lg:-left-[57px]"
        >
          <ChevronLeftIcon size={30} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          class="absolute -right-2.5 top-[38%] flex h-12 w-12 items-center justify-center text-white md:-right-3 lg:-right-[57px]"
        >
          <ChevronRightIcon size={30} />
        </button>
      </div>

      <div class="flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.caption}
            type="button"
            aria-label={`Go to slide ${i + 1}: ${slide.caption}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            class={`h-2 w-2 rounded-full transition-colors ${
              i === active ? "bg-primary" : "bg-primary/30 hover:bg-primary/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
