import type { Metadata } from "next";
import { Header } from "../../../components/Header.tsx";
import { Footer } from "../../../components/Footer.tsx";
import { PageHero } from "../../../components/PageHero.tsx";
import { SectionHeading } from "../../../components/layout/SectionHeading.tsx";
import { Button } from "../../../components/Button.tsx";
import { HeroLead, PageTitle } from "../../../components/PageTitle.tsx";
import { cx } from "../../../components/cx.ts";
import { Gallery } from "../../../components/Gallery.tsx";
import { TeamGrid } from "../../../components/TeamGrid.tsx";
import { frame, gutter } from "../../../components/layout/Container.tsx";
import { ABOUT } from "../../../components/content.ts";

export const metadata: Metadata = {
  title: "About us — Favor Care",
  description: ABOUT.hero.body,
};

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
export default function WhoWeArePage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero: the same photo at every breakpoint with the black→yellow
            gradient overlay; WP positions it 50% 0 on mobile/tablet and
            0 -68px on desktop. */}
        <PageHero
          image={ABOUT.hero.image}
          imageClass="bg-[position:50%_0] lg:bg-[position:0_-68px]"
        >
          <PageTitle>{ABOUT.hero.title}</PageTitle>
          <HeroLead measureClass="max-w-[260px] md:max-w-[460px] lg:max-w-[630px]">
            {ABOUT.hero.body}
          </HeroLead>
        </PageHero>

        {/* Mission: photo left / text right on md+ (WP splits the row
            50/50 with a 30px gap); stacked photo-first below md with the
            copy left-aligned. */}
        <section className={cx(gutter(), "pt-5 md:pt-20")}>
          <div
            className={cx(frame(), "grid gap-6 md:grid-cols-2 md:gap-[30px]")}
          >
            <img
              src={ABOUT.mission.image}
              alt="Children of a community served by Favor Care"
              className="h-[230px] w-full object-cover md:h-[225px] lg:h-[350px]"
              loading="lazy"
            />
            <div className="md:flex md:flex-col md:justify-center">
              <SectionHeading
                title={ABOUT.mission.label}
                align="left-center-md"
              />
              <p className="mt-4 text-left text-sm leading-relaxed text-primary md:mt-4 md:text-center md:text-[15px] md:leading-[26px] lg:text-lg lg:leading-relaxed">
                {ABOUT.mission.body}
              </p>
            </div>
          </div>
        </section>

        {/* Vision: mirrored row (text left / photo right) that fades
            white→yellow over its bottom quarter on md+, giving the page
            its yellow band into the gallery. Stacked photo-first below md. */}
        <section
          className={cx(
            gutter(),
            "pt-5 md:bg-linear-to-b md:from-white md:from-76% md:to-yellow md:pt-20 md:pb-[130px]",
          )}
        >
          <div
            className={cx(frame(), "grid gap-6 md:grid-cols-2 md:gap-[30px]")}
          >
            <img
              src={ABOUT.vision.image}
              alt="A Favor Care outreach moment"
              className="h-[230px] w-full object-cover md:order-2 md:h-[225px] lg:h-[350px]"
              loading="lazy"
            />
            <div className="md:order-1 md:flex md:flex-col md:justify-center">
              {/* WP keeps the desktop Vision label's 56px box but hides
                  it with visibility:hidden (innerText drops it); mirror
                  that so the column rhythm matches. */}
              <SectionHeading
                title={ABOUT.vision.label}
                align="left-center-md"
                className="lg:invisible"
              />
              <p className="mt-4 text-left text-sm leading-relaxed text-primary md:mt-4 md:text-center md:text-[15px] md:leading-[26px] lg:text-lg lg:leading-relaxed">
                {ABOUT.vision.body}
              </p>
            </div>
          </div>
        </section>

        {/* Core values: single centered column of value lines; below md
            the section fades white→yellow to meet the yellow gallery
            strip. */}
        <section
          className={cx(
            gutter(),
            "bg-linear-to-b from-white to-yellow py-[25px] md:bg-none md:py-[30px]",
          )}
        >
          <div className={frame()}>
            <SectionHeading title={ABOUT.valuesTitle} align="left-center-md" />
            <div className="mt-6 space-y-4 text-center text-primary">
              {ABOUT.values.map((v) => (
                <p className="text-[20px] leading-5 md:leading-6 lg:text-[28px] lg:leading-9">
                  {v}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery: 2×2 rounded-photo grid (30px radius). The mobile
            strip sits on yellow; md+ is plain white. WP's mobile gallery
            reorders the photos (huddle, volunteers, aetas, dental). */}
        <Gallery
          variant="tiles"
          images={ABOUT.gallery}
          mobileOrder={[2, 4, 1, 3]}
        />

        {/* Team: heading + five members. WP lays each member out as a
            portrait with the name/role beside it (two per row) from md up,
            and stacked portrait-over-caption below md. */}
        <section
          className={cx(
            gutter(),
            "py-[25px] md:bg-linear-to-b md:from-yellow md:to-white md:to-15% md:py-0 md:pt-20 md:pb-[30px] lg:pb-[50px]",
          )}
        >
          <div className={frame()}>
            <SectionHeading title={ABOUT.team.title} align="center" />
            <p className="mx-auto mt-4 max-w-[638px] text-center text-sm leading-relaxed text-primary md:text-[15px] md:leading-[26px] lg:text-lg lg:leading-relaxed">
              {ABOUT.team.subtitle}
            </p>
            <TeamGrid members={ABOUT.team.members} />
          </div>
        </section>

        {/* Take action: WP centers the copy and button but leaves the
            heading left-aligned — quirk kept. */}
        <section className={cx(gutter(), "py-[50px] md:py-0 md:pt-20")}>
          <div className={frame()}>
            <SectionHeading title={ABOUT.takeAction.title} align="left" />
            <p className="mx-auto mt-4 max-w-[695px] text-center text-sm leading-relaxed text-primary md:text-[15px] md:leading-[26px] lg:text-lg lg:leading-relaxed">
              {ABOUT.takeAction.body}
            </p>
            <div className="mt-8 flex justify-center md:pt-[30px] md:pb-20">
              <Button variant="yellow" href={ABOUT.takeAction.cta.href}>
                {ABOUT.takeAction.cta.label}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
