import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import Slideshow from "../islands/Slideshow.tsx";
import { WHAT_WE_DO } from "../components/content.ts";

// What-we-do page cloned from the WP page (post 1835, staging = canonical).
// Copy is verbatim; geometry follows the measured WP layout at 360/768/1280
// — px values below are those measurements, inline until they're folded
// into DESIGN.md display tokens. WP's content frame is 1140px with 20px
// gutters at 360, 10px at 768, none at 1280.
//
// WP hides at every breakpoint and they are not cloned: the Education
// video + "Give the gift of Education" Legacy Offering block. On mobile,
// WP hides the five non-Education summaries with visibility:hidden while
// keeping their space (innerText drops them) — mirrored with `invisible`.
// WP's 10px hero subtitle on mobile is raised to 14px for legibility.
export default define.page(function WhatWeDoPage() {
  return (
    <>
      <Head>
        <title>What we do — Favor Care</title>
        <meta name="description" content={WHAT_WE_DO.hero.subtitle} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {
          /* Hero: kids3.png photo (50% 50% at every breakpoint) with the
            black→yellow gradient overlay at WP's 0.5 opacity. */
        }
        <section class="relative flex flex-col items-center gap-4 py-[35px] pb-10 md:py-25 lg:pb-45">
          <div
            class="absolute inset-0 bg-cover bg-[position:50%_50%]"
            style={{ backgroundImage: `url(${WHAT_WE_DO.hero.image})` }}
            aria-hidden="true"
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-black to-yellow opacity-50"
            aria-hidden="true"
          />
          <div class="relative mx-auto w-full max-w-[1140px] px-5 md:px-2.5 lg:px-0">
            <h1 class="text-center text-[38px] font-bold leading-none text-white md:text-[56px] lg:text-[70px]">
              {WHAT_WE_DO.hero.title}
            </h1>
            <p class="mx-auto mt-4 max-w-[260px] text-center text-sm leading-relaxed text-white md:max-w-[560px] md:text-[15px] md:leading-[26px] lg:max-w-[784px] lg:text-lg lg:leading-relaxed">
              {WHAT_WE_DO.hero.subtitle}
            </p>
          </div>
        </section>

        {
          /* Program rows: alternating text/slides split (50/30/50) with
            the slideshow vertically paired against the copy; stacked
            slideshow-first below md. */
        }
        {WHAT_WE_DO.programs.map((p, i) => (
          <section class="px-5 pt-5 first:pt-9 md:px-2.5 md:pt-20 lg:px-0">
            <div class="mx-auto grid w-full max-w-[1140px] items-center gap-6 md:grid-cols-2 md:gap-[30px]">
              <div class={i % 2 === 0 ? "md:order-2" : "md:order-1"}>
                <Slideshow images={p.slides} label={`${p.label} photos`} />
              </div>
              <div class={i % 2 === 0 ? "md:order-1" : "md:order-2"}>
                {
                  /* WP paints only Education's label + summary; the five
                    other programs keep the boxes but hide them with
                    visibility:hidden at every breakpoint (innerText drops
                    them) — mirrored with `invisible`. */
                }
                <h2
                  class={`text-left text-[28px] font-bold leading-none text-primary md:text-[39px] lg:text-[56px] ${
                    i > 0 ? "invisible" : ""
                  }`}
                >
                  {p.label}
                </h2>
                <p
                  class={`mt-1 text-left text-[18px] leading-relaxed text-primary md:mt-2 md:text-[20px] lg:text-[36px] lg:leading-[44px] ${
                    i > 0 ? "invisible" : ""
                  }`}
                >
                  {p.summary}
                </p>
                <p class="mt-4 text-left text-sm leading-relaxed text-primary md:text-[15px] md:leading-[26px] lg:text-lg">
                  {p.body}
                </p>
              </div>
            </div>
          </section>
        ))}

        {
          /* Donate + Take Action: WP's paired rounded cards — yellow with
            a black GIVE pill, black with a white GET INVOLVED pill. */
        }
        <section class="px-5 py-20 md:px-2.5 lg:px-0">
          <div class="mx-auto grid w-full max-w-[1140px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-0 lg:gap-10">
            <div class="flex flex-col items-center gap-4 rounded-[30px] bg-yellow px-6 py-6 md:py-25">
              <h2 class="text-center text-[25px] font-bold leading-none text-black md:text-[30px] lg:text-[36px]">
                {WHAT_WE_DO.donate.title}
              </h2>
              <p class="text-center text-sm leading-relaxed text-black md:text-[15px] md:leading-[26px] lg:text-lg">
                {WHAT_WE_DO.donate.body}
              </p>
              <a
                href={WHAT_WE_DO.donate.cta.href}
                class="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-black px-6 py-4 text-[15px] font-bold text-white transition-opacity hover:opacity-90 md:text-lg"
              >
                {WHAT_WE_DO.donate.cta.label}
              </a>
            </div>
            <div class="flex flex-col items-center gap-4 rounded-[30px] bg-black px-6 py-6 md:py-25">
              <h2 class="text-center text-[25px] font-bold leading-none text-white md:text-[30px] lg:text-[36px]">
                {WHAT_WE_DO.takeAction.title}
              </h2>
              <p class="text-center text-sm leading-relaxed text-white md:text-[15px] md:leading-[26px] lg:text-lg">
                {WHAT_WE_DO.takeAction.body}
              </p>
              <a
                href={WHAT_WE_DO.takeAction.cta.href}
                class="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-4 text-[15px] font-bold text-black transition-opacity hover:opacity-90 md:text-lg"
              >
                {WHAT_WE_DO.takeAction.cta.label}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
});
