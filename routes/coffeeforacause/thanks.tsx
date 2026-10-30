import { Head } from "fresh/runtime";
import { define } from "../../utils.ts";
import { PageTitle } from "../../components/PageTitle.tsx";
import { Eyebrow } from "../../components/Eyebrow.tsx";
import { Button } from "../../components/Button.tsx";
import { frame } from "../../components/layout/Container.tsx";
import { cx } from "../../components/cx.ts";
import TrackView from "../../islands/TrackView.tsx";
import { CFAC, CFAC_EVENTS } from "../../components/cfac.ts";

// The CFAC post-donation landing: the payment provider redirects donors
// here after checkout. Centered thank-you (no hero photo), what-happens-next
// steps, and the conversion event — TrackView fires cfac_donate_success
// once on mount so vendors can count completed gifts with UTM attribution
// (no donor PII in event props — MIGRATION.md rule).
//
// noindex: a transactional destination, not content — search has no
// business sending anyone here.
export default define.page(function CfacThanksPage() {
  return (
    <>
      <Head>
        <title>Thank you — {CFAC.name}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={CFAC.thanks.body} />
      </Head>
      <TrackView event={CFAC_EVENTS.success} props={{ fund: "cfac" }} />

      <section
        className={cx(
          frame("page"),
          "flex flex-1 flex-col items-center py-20 text-center md:py-24",
        )}
      >
        <Eyebrow>{CFAC.provenance}</Eyebrow>
        <PageTitle tone="primary" className="mt-4">
          {CFAC.thanks.title}
        </PageTitle>
        <p className="mx-auto mt-5 max-w-[620px] text-base leading-relaxed text-on-surface lg:text-lg">
          {CFAC.thanks.body}
        </p>

        <ul className="mx-auto mt-10 flex max-w-[620px] flex-col gap-4 text-left">
          {CFAC.thanks.next.map((step) => (
            <li className="flex items-start gap-3 rounded-card bg-surface-container-lowest p-5">
              <span
                className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-on-primary"
                aria-hidden="true"
              >
                ✓
              </span>
              <span className="text-base leading-relaxed text-on-surface">
                {step}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-4 md:flex-row">
          <Button variant="black" size="md" href="/coffeeforacause">
            Back to the campaign
          </Button>
          <Button variant="outline-black" size="md" href="/">
            favorcare.org
          </Button>
        </div>
      </section>
    </>
  );
});
