import type { Metadata } from "next";
import { Header } from "../../../components/Header.tsx";
import { Footer } from "../../../components/Footer.tsx";
import { PageHero } from "../../../components/PageHero.tsx";
import { HeroLead, PageTitle } from "../../../components/PageTitle.tsx";
import { cx } from "../../../components/cx.ts";
import { gutter } from "../../../components/layout/Container.tsx";
import { Button } from "../../../components/Button.tsx";
import Popup from "../../../islands/Popup.tsx";
import SignupForm from "../../../islands/SignupForm.tsx";
import { POPUPS, SIGNUP } from "../../../components/content.ts";

// Volunteer signup — the on-site "Favor Care: Sign Up to Serve" form,
// replacing the Google Form handoff. The page renders the volunteer-
// commitment gate popup plus the SignupForm island, whose Server Action
// (./actions.ts) validates and forwards to the volunteers' Google Form.
// If the Google form is ever rebuilt, re-scrape the entry ids into SIGNUP.

export const metadata: Metadata = {
  title: "Sign up to volunteer — Favor Care",
  description: SIGNUP.hero.subtitle,
};

export default async function SignupPage(
  { searchParams }: { searchParams: Promise<{ ok?: string | string[] }> },
) {
  const ok = (await searchParams).ok === "1";
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageHero image={SIGNUP.hero.image}>
          <PageTitle weight="semibold-md-bold">{SIGNUP.hero.title}</PageTitle>
          <HeroLead>{SIGNUP.hero.subtitle}</HeroLead>
        </PageHero>

        {
          /* The commitment gate: auto-opens over the form on every visit —
            the guidelines must be agreed before serving. The trigger
            beside the form reopens them. */
        }
        <Popup
          auto={{ delayMs: 400 }}
          title={POPUPS.volunteerGuidelines.title}
          blocks={POPUPS.volunteerGuidelines.blocks}
          cta={SIGNUP.gateCta}
        />

        <section className={cx(gutter(), "pb-20 pt-10")}>
          <div className="mx-auto w-full max-w-[750px]">
            {ok
              ? (
                <div className="rounded-card bg-yellow p-8 text-center md:p-12">
                  <h2 className="text-[25px] font-bold leading-tight text-black md:text-[30px]">
                    {SIGNUP.success.title}
                  </h2>
                  <p className="mx-auto mt-3 max-w-[480px] text-base leading-relaxed text-black">
                    {SIGNUP.success.body}
                  </p>
                  <Button
                    variant="black"
                    href={SIGNUP.success.back.href}
                    className="mt-8"
                  >
                    {SIGNUP.success.back.label}
                  </Button>
                </div>
              )
              : (
                <>
                  <div className="flex justify-center">
                    <Popup
                      trigger={SIGNUP.reviewTrigger}
                      triggerClass="min-h-12 text-sm font-bold uppercase tracking-wider text-primary underline"
                      title={POPUPS.volunteerGuidelines.title}
                      blocks={POPUPS.volunteerGuidelines.blocks}
                      cta={SIGNUP.gateCta}
                    />
                  </div>
                  <SignupForm
                    copy={{
                      options: SIGNUP.options,
                      privacyNotice: SIGNUP.privacyNotice,
                    }}
                  />
                </>
              )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
