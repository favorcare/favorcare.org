import type { Metadata } from "next";
import { PageHero } from "../../components/PageHero.tsx";
import { SectionHeading } from "../../components/layout/SectionHeading.tsx";
import { Eyebrow } from "../../components/Eyebrow.tsx";
import { Button } from "../../components/Button.tsx";
import { Faq } from "../../components/Faq.tsx";
import { frame, gutter } from "../../components/layout/Container.tsx";
import { cx } from "../../components/cx.ts";
import { CFAC, CFAC_EVENTS, cfacDonateProps } from "../../components/cfac.ts";
import { asset } from "../../utils/assets.ts";

export const metadata: Metadata = {
  title: `${CFAC.name} — Favor Care`,
  description: CFAC.hero.lead,
};

// The Coffee for a Cause landing page. Composed from the shared catalog —
// the CFAC look comes entirely from the `.cfac` theme scope in the layout
// (see assets/styles.css), not from any markup here.
//
// SKELETON: all copy lives in components/cfac.ts and is team-supplied TBD
// (BRAND.md: never invent people, quotes, or numbers). The hero photo is a
// stand-in from the org's own library (give-now hero) until the campaign
// ships real art — TODO(brand kit): replace CFAC hero image.
export default function CfaCausePage() {
  return (
    <>
      
      {
        /* Hero: photo + the black→yellow wash (in scope: roast→caramel),
          bare geometry like the give-now hero, centered title + pill. */
      }
      <PageHero
        image={asset("/images/pages/give-now/hero.jpg")}
        overlay="gradient"
        geometry="bare"
        framed={false}
        sectionClass="justify-center gap-6 px-5 py-[70px] lg:h-[540px] lg:py-0"
      >
        <Eyebrow className="relative">{CFAC.provenance}</Eyebrow>
        <h1 className="relative text-center text-[38px] font-bold leading-tight text-white md:text-[70px] md:leading-none">
          {CFAC.hero.title}
        </h1>
        <p className="relative mx-auto max-w-[560px] text-center text-base leading-relaxed text-white lg:text-lg">
          {CFAC.hero.lead}
        </p>
        <Button
          variant="yellow"
          size="lg"
          shape="rounded-50"
          href={CFAC.hero.cta.href}
          className="relative"
          track={CFAC_EVENTS.donate}
          trackProps={cfacDonateProps("hero")}
        >
          {CFAC.hero.cta.label}
        </Button>
      </PageHero>

      {
        /* The idea: reality → hope, the BRAND.md arc's first two beats. */
      }
      <section className={cx(frame("page"), "py-16 md:py-20")}>
        <div className="max-w-[780px]">
          <Eyebrow>{CFAC.story.eyebrow}</Eyebrow>
          <SectionHeading
            title={CFAC.story.title}
            size="section"
            leading="tight"
            className="mt-3"
          />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {CFAC.story.beats.map((b) => (
              <div
                key={b.label}
                className="rounded-card bg-surface-container-lowest p-6"
              >
                <Eyebrow className="text-link">{b.label}</Eyebrow>
                <p className="mt-3 text-base leading-relaxed text-on-surface">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {
        /* What your cup funds: cream band, three cards. Facts TBD from
          the team — cards carry no invented numbers. */
      }
      <section
        className={cx(gutter("page"), "bg-surface-container-low py-16 md:py-20")}
      >
        <div className={cx(frame("page"), "text-center")}>
          <Eyebrow>{CFAC.impact.eyebrow}</Eyebrow>
          <SectionHeading
            title={CFAC.impact.title}
            size="section"
            leading="tight"
            className="mt-3"
          />
          <p className="mx-auto mt-4 max-w-[675px] text-base leading-relaxed text-on-surface-variant">
            {CFAC.impact.subtitle}
          </p>
          <div className="mt-10 grid gap-6 text-left md:grid-cols-2 lg:grid-cols-3">
            {CFAC.impact.cards.map((c) => (
              <div key={c.title} className="rounded-card bg-surface p-6">
                <SectionHeading
                  title={c.title}
                  size="card"
                  leading="tight"
                />
                <p className="mt-3 text-base leading-relaxed text-on-surface">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {
        /* Good to know: the bordered-rows accordion from the catalog. */
      }
      <section className={cx(frame("page"), "py-16 md:py-20")}>
        <div className="max-w-[780px]">
          <Eyebrow>{CFAC.faq.eyebrow}</Eyebrow>
          <SectionHeading
            title={CFAC.faq.title}
            size="section"
            leading="tight"
            className="mt-3"
          />
          <Faq items={CFAC.faq.items} className="mt-8" />
        </div>
      </section>

      {
        /* The ask: closing band composed directly (CtaBand hardcodes its
          own track event; this page needs fund: "cfac" on the click). */
      }
      <section className="bg-black px-5 py-14 text-center md:py-16 lg:py-20">
        <h2 className="text-[28px] font-semibold leading-tight tracking-tight text-white md:text-[39px] lg:text-[56px]">
          {CFAC.closing.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[675px] text-[14px] leading-relaxed text-white/80 md:text-[15px] lg:text-lg">
          {CFAC.closing.body}
        </p>
        <div className="mt-7">
          <Button
            variant="yellow"
            size="sm"
            href={CFAC.closing.cta.href}
            track={CFAC_EVENTS.donate}
            trackProps={cfacDonateProps("closing")}
          >
            {CFAC.closing.cta.label}
          </Button>
        </div>
      </section>
    </>
  );
}
