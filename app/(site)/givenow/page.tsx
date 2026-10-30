import type { Metadata } from "next";
import { Header } from "../../../components/Header.tsx";
import { Footer } from "../../../components/Footer.tsx";
import { PageHero } from "../../../components/PageHero.tsx";
import { SectionHeading } from "../../../components/layout/SectionHeading.tsx";
import { Button } from "../../../components/Button.tsx";
import { BankCard } from "../../../components/BankCard.tsx";
import { TaxDeductibleForm } from "../../../components/TaxDeductibleForm.tsx";
import { GIVENOW } from "../../../components/content.ts";

export const metadata: Metadata = {
  title: "Give now — Favor Care",
  description: GIVENOW.howToGive.subtitle,
};

// Give-now page cloned from the WP page (post 7122, staging = canonical)
// + its giving templates. Copy verbatim; geometry follows the measured WP
// layout at 360/768/1280 — px values below are those measurements, kept
// inline until they're folded into DESIGN.md display tokens.
//
// WP quirks mirrored: on mobile the Tax-Deductible card renders ABOVE the
// hero (only desktop-set block without hide flags), the US bank details
// differ per breakpoint (Chase desktop / Bank of America mobile — content
// rot flagged for sign-off), the 501(c)(3) paragraph is desktop-only, and
// the PH Give Online button reads "Open Portal" desktop / "Credit /
// Debit" mobile. The tax form submits via mailto until Phase 6/7 gives it
// a backend (no file upload yet — PROOF OF DONATION noted in the body).
export default function GiveNowPage() {
  return (
    <>
            <Header />
      <main id="main-content" tabIndex={-1} className="flex flex-col">
        {
          /* Hero: photo with a flat 50% black overlay (no gradient on
            this page), 76px title, ghost-white GIVE NOW pill → #give. */
        }
        <PageHero
          image={GIVENOW.hero.image}
          overlay="flat"
          geometry="bare"
          framed={false}
          sectionClass="justify-center gap-8 px-5 py-[70px] lg:h-[540px] lg:py-0"
        >
          <h1 className="relative text-center text-[34px] font-bold leading-tight text-white md:text-[76px] md:leading-none">
            {GIVENOW.hero.title}
          </h1>
          <Button
            variant="outline-white"
            size="xl"
            shape="rounded-30"
            href={GIVENOW.hero.cta.href}
            className="relative"
            track="give_hero_click"
          >
            {GIVENOW.hero.cta.label}
          </Button>
        </PageHero>

        {
          /* How to Give + the three PH cards (3px black outline, radius
            30, min-height 225 on md+). */
        }
        <section id="give" className="px-5 py-16 md:py-20">
          <SectionHeading
            title={GIVENOW.howToGive.title}
            align="center"
            size="jumbo"
            leading="tight"
            className="text-[42px]"
          />
          <p className="mt-4 text-center text-base font-bold text-primary">
            {GIVENOW.howToGive.subtitle}
          </p>
          <div className="mx-auto mt-12 flex w-full max-w-[960px] flex-col gap-6 md:min-h-[225px] md:flex-row md:items-stretch md:justify-center">
            <BankCard
              title={GIVENOW.ph.bankTransfer.title}
              className="md:flex-1"
            >
              <p className="text-base text-black">
                {GIVENOW.ph.bankTransfer.accountName}
              </p>
              <p className="text-base text-black">
                {GIVENOW.ph.bankTransfer.accountNumber}
              </p>
              <p className="text-base text-black">{GIVENOW.ph.bankTransfer.bank}</p>
            </BankCard>
            <BankCard title={GIVENOW.ph.checks.title} className="md:flex-1">
              <p className="text-left text-base text-black">
                {GIVENOW.ph.checks.payable.split("\u00a0").map((line, i, a) => (
                  <>
                    {line}
                    {i < a.length - 1 && <br />}
                  </>
                ))}
              </p>
              <p className="text-left text-base text-black">
                {GIVENOW.ph.checks.address}
              </p>
            </BankCard>
            <BankCard
              title={GIVENOW.ph.online.title}
              gap="4"
              className="md:flex-1"
            >
              <p className="text-base text-black">{GIVENOW.ph.online.body}</p>
              <Button
                variant="black"
                size="lg"
                shape="rounded-50"
                href={GIVENOW.ph.online.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                track="give_online_click"
                trackProps={{ region: "ph" }}
              >
                <span className="md:hidden">
                  {GIVENOW.ph.online.cta.labelMobile}
                </span>
                <span className="hidden md:inline">
                  {GIVENOW.ph.online.cta.label}
                </span>
              </Button>
            </BankCard>
          </div>
        </section>

        {
          /* Tax-Deductible Giving: the yellow card (radius 30, pad 50,
            56px left-aligned heading). WP renders it above the hero on
            mobile — mirrored with order-first. */
        }
        <section className="order-first px-2.5 pb-16 pt-2.5 md:order-none md:px-5 md:pt-0 lg:px-0">
          <TaxDeductibleForm {...GIVENOW.ph.taxDeductible} />
        </section>

        {
          /* United States: 32px heading, desktop-only 501(c)(3) copy, two
            black cards (3px border, radius 30) — bank details differ per
            breakpoint on WP, both kept. */
        }
        <section className="px-5 py-16">
          <div className="mx-auto w-full max-w-[960px]">
            <SectionHeading
              title={GIVENOW.us.title}
              size="32"
              align="center"
              leading="tight"
            />
            <p className="mx-auto mt-4 hidden max-w-[780px] text-start text-base leading-relaxed text-primary md:block">
              {GIVENOW.us.body}
              <br />
              {GIVENOW.us.body2}
            </p>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-stretch md:justify-center">
              <BankCard
                tone="dark"
                display="md-only"
                title={GIVENOW.us.bankTransfer.title + "\u200b"}
              >
                <p className="text-base text-light">
                  {GIVENOW.us.bankTransfer.bank}
                </p>
                <p className="text-base text-light">
                  {`Account Name:\u00a0${GIVENOW.us.bankTransfer.accountName}`}
                </p>
                <p className="text-base text-light">
                  {`Account Number:\u00a0${GIVENOW.us.bankTransfer.accountNumber}`}
                </p>
                <p className="text-base text-light">
                  {`SWIFT Code:\u00a0${GIVENOW.us.bankTransfer.swift}`}
                </p>
                <p className="text-base text-light">
                  {`Routing Number:\u00a0${GIVENOW.us.bankTransfer.routing}`}
                </p>
              </BankCard>
              <BankCard
                tone="dark"
                display="mobile-only"
                title={GIVENOW.us.bankTransfer.title + "\u200b"}
              >
                <p className="text-base text-light">
                  {GIVENOW.us.bankTransferMobile.accountName}
                </p>
                <p className="text-base text-light">
                  Account: {GIVENOW.us.bankTransferMobile.accountNumber}
                </p>
                <p className="text-base text-light">
                  ACH Routing Number: {GIVENOW.us.bankTransferMobile.achRouting}
                </p>
                <p className="text-base text-light">
                  {GIVENOW.us.bankTransferMobile.bank}
                </p>
              </BankCard>
              <BankCard
                tone="dark"
                gap="4"
                title={GIVENOW.ph.online.title}
              >
                <Button
                  variant="white"
                  size="lg"
                  shape="rounded-50"
                  href={GIVENOW.us.creditDebit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  track="give_online_click"
                  trackProps={{ region: "us" }}
                >
                  {GIVENOW.us.creditDebit.label}
                </Button>
              </BankCard>
            </div>
          </div>
        </section>

        {
          /* Australia: GDG J1158N copy + the white pill with a 3px black
            border. */
        }
        <section className="px-5 py-16">
          <div className="mx-auto w-full max-w-[960px] text-center">
            <SectionHeading
              title={GIVENOW.au.title}
              size="32"
              leading="tight"
            />
            <p className="mt-4 text-left text-base leading-relaxed text-primary md:text-center">
              {GIVENOW.au.body2}
            </p>
            <Button
              variant="outline-black"
              size="lg"
              shape="rounded-30"
              href={GIVENOW.au.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8"
              track="give_online_click"
              trackProps={{ region: "au" }}
            >
              {GIVENOW.au.cta.label}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
