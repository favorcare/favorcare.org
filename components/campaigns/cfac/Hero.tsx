import { cx } from "../../cx.ts";
import { CfacButton } from "./CfacButton.tsx";
import { CFAC_FRAME } from "./layout.ts";
import { CFAC, CFAC_EVENTS, cfacDonateProps } from "./content.ts";

/**
 * CFAC hero, cloned from cfac-landing-page: full-bleed campaign photo under
 * a 70/60/70% black wash, centered white headline with the gold accent
 * runs ("Giving", "Big Dreams"), lead line, and two CTAs — gold "Help a
 * Child Learn Today" (to the donate form) and an outline-white link to Get
 * Involved. Content comes from `CFAC.hero`.
 */
export function CfacHero() {
  const { hero } = CFAC;
  return (
    <section id="home" className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={hero.image}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/70" />
      </div>

      <div className={cx("relative text-center", CFAC_FRAME)}>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          {hero.title.map((run) =>
            run.accent ? (
              <span key={run.text} className="text-yellow">
                {run.text}
              </span>
            ) : (
              run.text
            ),
          )}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-white/90 md:text-xl">
          {hero.lead}
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <CfacButton
            href={hero.primary.href}
            track={CFAC_EVENTS.donate}
            trackProps={cfacDonateProps("hero")}
          >
            {hero.primary.label}
          </CfacButton>
          <CfacButton variant="outline-white" href={hero.secondary.href}>
            {hero.secondary.label}
          </CfacButton>
        </div>
      </div>
    </section>
  );
}

export default CfacHero;
