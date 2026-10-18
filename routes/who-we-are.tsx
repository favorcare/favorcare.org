import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { PageHero } from "../components/PageHero.tsx";
import { SectionHeading } from "../components/layout/SectionHeading.tsx";
import { Button } from "../components/Button.tsx";
import { HeroLead, PageTitle } from "../components/PageTitle.tsx";
import { cx } from "../components/cx.ts";
import { frame, gutter } from "../components/layout/Container.tsx";
import { ABOUT } from "../components/content.ts";

// Who-we-are page cloned from the WP `about` page (post 1831, staging =
// canonical). Copy is verbatim; geometry follows the measured WP layout at
// 360/768/1280 — the px values below are those measurements, kept inline
// until they're folded into DESIGN.md display tokens. WP's content frame
// is 1140px with 20px gutters at 360, 10px at 768, none at 1280.
//
// WP hides at every breakpoint and they are not cloned: the hero subhead
// ("Explore our journey…"), the Financial Accountability section (a dead
// Figma embed), and the three get-involved call-to-action cards. WP's
// 10px hero body on mobile is raised to 14px to keep the copy readable;
// everything else matches the measured rendering.
export default define.page(function WhoWeArePage() {
  return (
    <>
      <Head>
        <title>About us — Favor Care</title>
        <meta name="description" content={ABOUT.hero.body} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {
          /* Hero: the same photo at every breakpoint with the black→yellow
            gradient overlay; WP positions it 50% 0 on mobile/tablet and
            0 -68px on desktop. */
        }
        <PageHero
          image={ABOUT.hero.image}
          imageClass="bg-[position:50%_0] lg:bg-[position:0_-68px]"
        >
          <PageTitle>{ABOUT.hero.title}</PageTitle>
          <HeroLead measureClass="max-w-[260px] md:max-w-[460px] lg:max-w-[630px]">
            {ABOUT.hero.body}
          </HeroLead>
        </PageHero>

        {
          /* Mission: photo left / text right on md+ (WP splits the row
            50/50 with a 30px gap); stacked photo-first below md with the
            copy left-aligned. */
        }
        <section class={cx(gutter(), "pt-5 md:pt-20")}>
          <div class={cx(frame(), "grid gap-6 md:grid-cols-2 md:gap-[30px]")}>
            <img
              src={ABOUT.mission.image}
              alt="Children of a community served by Favor Care"
              class="h-[230px] w-full object-cover md:h-[225px] lg:h-[350px]"
              loading="lazy"
            />
            <div class="md:flex md:flex-col md:justify-center">
              <SectionHeading
                title={ABOUT.mission.label}
                align="left-center-md"
              />
              <p class="mt-4 text-left text-sm leading-relaxed text-primary md:mt-4 md:text-center md:text-[15px] md:leading-[26px] lg:text-lg lg:leading-relaxed">
                {ABOUT.mission.body}
              </p>
            </div>
          </div>
        </section>

        {
          /* Vision: mirrored row (text left / photo right) that fades
            white→yellow over its bottom quarter on md+, giving the page
            its yellow band into the gallery. Stacked photo-first below md. */
        }
        <section
          class={cx(
            gutter(),
            "pt-5 md:bg-linear-to-b md:from-white md:from-76% md:to-yellow md:pt-20 md:pb-[130px]",
          )}
        >
          <div class={cx(frame(), "grid gap-6 md:grid-cols-2 md:gap-[30px]")}>
            <img
              src={ABOUT.vision.image}
              alt="A Favor Care outreach moment"
              class="h-[230px] w-full object-cover md:order-2 md:h-[225px] lg:h-[350px]"
              loading="lazy"
            />
            <div class="md:order-1 md:flex md:flex-col md:justify-center">
              {
                /* WP keeps the desktop Vision label's 56px box but hides
                  it with visibility:hidden (innerText drops it); mirror
                  that so the column rhythm matches. */
              }
              <SectionHeading
                title={ABOUT.vision.label}
                align="left-center-md"
                class="lg:invisible"
              />
              <p class="mt-4 text-left text-sm leading-relaxed text-primary md:mt-4 md:text-center md:text-[15px] md:leading-[26px] lg:text-lg lg:leading-relaxed">
                {ABOUT.vision.body}
              </p>
            </div>
          </div>
        </section>

        {
          /* Core values: single centered column of value lines; below md
            the section fades white→yellow to meet the yellow gallery
            strip. */
        }
        <section
          class={cx(
            gutter(),
            "bg-linear-to-b from-white to-yellow py-[25px] md:bg-none md:py-[30px]",
          )}
        >
          <div class={frame()}>
            <SectionHeading title={ABOUT.valuesTitle} align="left-center-md" />
            <div class="mt-6 space-y-4 text-center text-primary">
              {ABOUT.values.map((v) => (
                <p class="text-[20px] leading-5 md:leading-6 lg:text-[28px] lg:leading-9">
                  {v}
                </p>
              ))}
            </div>
          </div>
        </section>

        {
          /* Gallery: 2×2 rounded-photo grid (30px radius). The mobile
            strip sits on yellow; md+ is plain white. WP's mobile gallery
            reorders the photos — applied with order utilities. */
        }
        <section class="bg-yellow px-2.5 pb-[30px] md:bg-transparent lg:px-0">
          <div
            class={cx(
              frame(),
              "grid grid-cols-2 gap-1 md:gap-[11px] lg:gap-2.5",
            )}
          >
            <img
              src={ABOUT.gallery[0].src}
              alt={ABOUT.gallery[0].alt}
              class="order-2 aspect-3/2 w-full rounded-card object-cover md:order-1"
              loading="lazy"
            />
            <img
              src={ABOUT.gallery[1].src}
              alt={ABOUT.gallery[1].alt}
              class="order-4 aspect-3/2 w-full rounded-card object-cover md:order-2"
              loading="lazy"
            />
            <img
              src={ABOUT.gallery[2].src}
              alt={ABOUT.gallery[2].alt}
              class="order-1 aspect-3/2 w-full rounded-card object-cover md:order-3"
              loading="lazy"
            />
            <img
              src={ABOUT.gallery[3].src}
              alt={ABOUT.gallery[3].alt}
              class="order-3 aspect-3/2 w-full rounded-card object-cover md:order-4"
              loading="lazy"
            />
          </div>
        </section>

        {
          /* Team: heading + five members. WP lays each member out as a
            portrait with the name/role beside it (two per row) from md up,
            and stacked portrait-over-caption below md. */
        }
        <section
          class={cx(
            gutter(),
            "py-[25px] md:bg-linear-to-b md:from-yellow md:to-white md:to-15% md:py-0 md:pt-20 md:pb-[30px] lg:pb-[50px]",
          )}
        >
          <div class={frame()}>
            <SectionHeading title={ABOUT.team.title} align="center" />
            <p class="mx-auto mt-4 max-w-[638px] text-center text-sm leading-relaxed text-primary md:text-[15px] md:leading-[26px] lg:text-lg lg:leading-relaxed">
              {ABOUT.team.subtitle}
            </p>
            <ul class="mt-8 flex flex-col items-center gap-6 md:mt-[70px] md:grid md:grid-cols-2 md:gap-x-2.5 md:gap-y-[30px] md:px-[42px] lg:gap-x-7 lg:gap-y-10 lg:px-[46px]">
              {ABOUT.team.members.map((m) => (
                <li class="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
                  <img
                    src={m.photo}
                    alt={m.photoAlt}
                    class="h-[245px] w-[204px] object-cover md:h-[225px] md:w-[166px] lg:h-[282px] lg:w-[233px]"
                    loading="lazy"
                  />
                  <div class="mt-3.5 md:ml-2.5 md:mt-0 md:pt-2.5 lg:ml-6">
                    <h3 class="text-[25px] font-bold leading-none text-primary md:font-medium lg:text-[30px]">
                      {m.name}
                    </h3>
                    <p class="mt-1 text-sm font-normal text-on-surface md:text-base md:font-medium">
                      {m.role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {
          /* Take action: WP centers the copy and button but leaves the
            heading left-aligned — quirk kept. */
        }
        <section class={cx(gutter(), "py-[50px] md:py-0 md:pt-20")}>
          <div class={frame()}>
            <SectionHeading title={ABOUT.takeAction.title} align="left" />
            <p class="mx-auto mt-4 max-w-[695px] text-center text-sm leading-relaxed text-primary md:text-[15px] md:leading-[26px] lg:text-lg lg:leading-relaxed">
              {ABOUT.takeAction.body}
            </p>
            <div class="mt-8 flex justify-center md:pt-[30px] md:pb-20">
              <Button
                variant="yellow"
                href={ABOUT.takeAction.cta.href}
              >
                {ABOUT.takeAction.cta.label}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
});
