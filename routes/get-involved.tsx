import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Hero } from "../components/sections/Hero.tsx";
import { GetInvolved } from "../components/sections/GetInvolved.tsx";
import { DonateCTA } from "../components/sections/DonateCTA.tsx";
import { Newsletter } from "../components/sections/Newsletter.tsx";
import Popup from "../islands/Popup.tsx";
import {
  DONATE_CTA,
  GET_INVOLVED,
  NEWSLETTER,
  POPUPS,
  WAYS_TO_HELP,
} from "../components/content.ts";

export default define.page(function GetInvolvedPage() {
  return (
    <>
      <Head>
        <title>Get involved — Favor Care</title>
        <meta name="description" content={GET_INVOLVED.hero.subtitle} />
      </Head>
      <Header />
      <main id="main-content" tabindex="-1">
        <Hero {...GET_INVOLVED.hero} />
        <GetInvolved
          id="ways"
          title={GET_INVOLVED.ways.title}
          subtitle={GET_INVOLVED.ways.subtitle}
          items={WAYS_TO_HELP}
        />

        {
          /* Popup triggers (WP elementor popups): Prayer Hub + the volunteer
            commitment disclaimer shown before signup. Temporary placement —
            the full get-involved clone re-homes these into the cards. */
        }
        <div class="flex flex-wrap items-center justify-center gap-4 pb-16">
          <Popup
            trigger="Prayer Hub — Thursdays 7:00pm"
            triggerClass="inline-flex min-h-12 items-center justify-center rounded border border-primary px-6 text-sm font-semibold text-primary hover:bg-primary-container hover:text-on-primary-container"
            title={POPUPS.prayerHub.title}
            cta={POPUPS.prayerHub.cta}
          >
            <p class="font-semibold text-on-surface">
              {POPUPS.prayerHub.kicker}
            </p>
            <p class="mt-2">{POPUPS.prayerHub.body}</p>
          </Popup>
          <Popup
            trigger="Volunteer commitment"
            triggerClass="inline-flex min-h-12 items-center justify-center rounded border border-primary px-6 text-sm font-semibold text-primary hover:bg-primary-container hover:text-on-primary-container"
            title={POPUPS.volunteer.title}
            cta={POPUPS.volunteer.cta}
          >
            {POPUPS.volunteer.body}
          </Popup>
        </div>

        <DonateCTA {...DONATE_CTA} />
        <Newsletter {...NEWSLETTER} />
      </main>
      <Footer />
    </>
  );
});
