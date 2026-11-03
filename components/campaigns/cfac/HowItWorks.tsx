import type { ComponentType } from "react";
import {
  EyeIcon,
  HandHeartIcon,
  HeartIcon,
  type IconProps,
} from "../../icons.tsx";
import { CfacButton } from "./CfacButton.tsx";
import { CfacSectionIntro } from "./SectionIntro.tsx";
import { CFAC_FRAME, CFAC_SECTION } from "./layout.ts";
import {
  CFAC,
  CFAC_EVENTS,
  cfacDonateProps,
  type CfacStepIcon,
} from "./content.ts";

const STEP_ICONS: Record<CfacStepIcon, ComponentType<IconProps>> = {
  see: EyeIcon,
  feel: HeartIcon,
  act: HandHeartIcon,
};

/**
 * CFAC "From Coffee to Care", cloned from cfac-landing-page's How It Works:
 * section intro, three centered steps (a 64px warm-grey disc with a gold
 * glyph, 20px title, brown body), and the gold Donate Now CTA.
 */
export function CfacHowItWorks() {
  const { howItWorks } = CFAC;
  return (
    <section id="how-it-works" className={CFAC_SECTION}>
      <div className={CFAC_FRAME}>
        <CfacSectionIntro
          title={howItWorks.title}
          subtitle={howItWorks.subtitle}
          className="mb-12"
        />
        <ol className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {howItWorks.steps.map((step) => {
            const Icon = STEP_ICONS[step.icon];
            return (
              <li key={step.title} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-low">
                  <Icon size={28} className="text-yellow" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-primary">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
        <div className="mt-12 text-center">
          <CfacButton
            href={howItWorks.cta.href}
            track={CFAC_EVENTS.donate}
            trackProps={cfacDonateProps("how-it-works")}
          >
            {howItWorks.cta.label}
          </CfacButton>
        </div>
      </div>
    </section>
  );
}

export default CfacHowItWorks;
