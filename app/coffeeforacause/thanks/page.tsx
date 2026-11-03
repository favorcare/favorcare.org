import type { Metadata } from "next";
import { CfacButton } from "../../../components/campaigns/cfac/CfacButton.tsx";
import { ArrowLeftIcon, CheckIcon } from "../../../components/icons.tsx";
import TrackView from "../../../islands/TrackView.tsx";
import {
  CFAC,
  CFAC_EVENTS,
} from "../../../components/campaigns/cfac/content.ts";

export const metadata: Metadata = {
  title: `Thank you — ${CFAC.name}`,
  robots: { index: false, follow: false },
  description: CFAC.thanks.lead,
};

// The CFAC post-donation landing (cloned from cfac-landing-page's
// thanks-page.html): PayMongo redirects donors here after checkout. Gold
// check badge, thank-you copy, and Return to Site. TrackView fires
// cfac_donate_success once on mount so vendors can count completed gifts
// with UTM attribution (no donor PII in event props — MIGRATION.md rule).
//
// noindex: a transactional destination, not content.
export default function CfacThanksPage() {
  const { thanks } = CFAC;
  return (
    <>
      <TrackView event={CFAC_EVENTS.success} props={{ fund: "cfac" }} />

      <section className="flex flex-1 items-center justify-center px-4 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow text-primary">
              <CheckIcon size={48} />
            </div>
          </div>
          <h1 className="mb-6 text-3xl font-bold text-primary md:text-4xl">
            {thanks.title}
          </h1>
          <p className="mb-4 text-lg text-on-surface-variant">{thanks.lead}</p>
          <p className="mb-12 text-base leading-relaxed text-on-surface-variant">
            {thanks.body}
          </p>
          <CfacButton variant="dark" href={thanks.cta.href} className="gap-2">
            <ArrowLeftIcon size={20} />
            {thanks.cta.label}
          </CfacButton>
        </div>
      </section>
    </>
  );
}
