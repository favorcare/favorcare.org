import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { PageHero } from "../components/PageHero.tsx";
import { SectionHeading } from "../components/layout/SectionHeading.tsx";
import { Button } from "../components/Button.tsx";
import { BankCard } from "../components/BankCard.tsx";
import { InputField } from "../components/InputField.tsx";
import { GIVENOW } from "../components/content.ts";

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
export default define.page(function GiveNowPage() {
  return (
    <>
      <Head>
        <title>Give now — Favor Care</title>
        <meta name="description" content={GIVENOW.howToGive.subtitle} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1} class="flex flex-col">
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
          <h1 class="relative text-center text-[34px] font-bold leading-tight text-white md:text-[76px] md:leading-none">
            {GIVENOW.hero.title}
          </h1>
          <Button
            variant="outline-white"
            size="xl"
            shape="rounded-30"
            href={GIVENOW.hero.cta.href}
            class="relative"
          >
            {GIVENOW.hero.cta.label}
          </Button>
        </PageHero>

        {
          /* How to Give + the three PH cards (3px black outline, radius
            30, min-height 225 on md+). */
        }
        <section id="give" class="px-5 py-16 md:py-20">
          <SectionHeading
            title={GIVENOW.howToGive.title}
            align="center"
            size="jumbo"
            leading="tight"
            class="text-[42px]"
          />
          <p class="mt-4 text-center text-base font-bold text-primary">
            {GIVENOW.howToGive.subtitle}
          </p>
          <div class="mx-auto mt-12 flex w-full max-w-[960px] flex-col gap-6 md:min-h-[225px] md:flex-row md:items-stretch md:justify-center">
            <BankCard
              title={GIVENOW.ph.bankTransfer.title}
              class="md:flex-1"
            >
              <p class="text-base text-black">
                {GIVENOW.ph.bankTransfer.accountName}
              </p>
              <p class="text-base text-black">
                {GIVENOW.ph.bankTransfer.accountNumber}
              </p>
              <p class="text-base text-black">{GIVENOW.ph.bankTransfer.bank}</p>
            </BankCard>
            <BankCard title={GIVENOW.ph.checks.title} class="md:flex-1">
              <p class="text-left text-base text-black">
                {GIVENOW.ph.checks.payable.split("\u00a0").map((line, i, a) => (
                  <>
                    {line}
                    {i < a.length - 1 && <br />}
                  </>
                ))}
              </p>
              <p class="text-left text-base text-black">
                {GIVENOW.ph.checks.address}
              </p>
            </BankCard>
            <BankCard
              title={GIVENOW.ph.online.title}
              gap="4"
              class="md:flex-1"
            >
              <p class="text-base text-black">{GIVENOW.ph.online.body}</p>
              <Button
                variant="black"
                size="lg"
                shape="rounded-50"
                href={GIVENOW.ph.online.cta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="md:hidden">
                  {GIVENOW.ph.online.cta.labelMobile}
                </span>
                <span class="hidden md:inline">
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
        <section class="order-first px-2.5 pb-16 pt-2.5 md:order-none md:px-5 md:pt-0 lg:px-0">
          <div class="mx-auto w-full max-w-[833px] rounded-card bg-yellow p-[50px]">
            <SectionHeading
              title={GIVENOW.ph.taxDeductible.title}
              align="left"
              size="56"
              leading="tight"
              class="text-[38px]"
            />
            <p class="mt-4 text-lg leading-relaxed text-primary">
              {GIVENOW.ph.taxDeductible.intro}
            </p>
            <form
              action={`mailto:${GIVENOW.ph.taxDeductible.recipient}`}
              method="post"
              class="mt-8 flex flex-col gap-4"
            >
              {GIVENOW.ph.taxDeductible.fields.map((f) => (
                <label key={f} class="block">
                  <span class="mb-1 block text-base font-semibold text-primary">
                    {f}
                  </span>
                  <InputField
                    size="give-now"
                    type={f === "CONTACT EMAIL" ? "email" : "text"}
                    name={f.toLowerCase().replace(/ /g, "-")}
                    placeholder={f
                      .toLowerCase()
                      .replace(/^\w|\s\w/g, (c) =>
                        c.toUpperCase())}
                    ariaLabel={f}
                  />
                </label>
              ))}
              <button
                type="submit"
                class="mt-2 h-14 w-full rounded-card text-[22px] font-bold text-black transition-opacity hover:opacity-80"
              >
                {GIVENOW.ph.taxDeductible.submit}
              </button>
            </form>
          </div>
        </section>

        {
          /* United States: 32px heading, desktop-only 501(c)(3) copy, two
            black cards (3px border, radius 30) — bank details differ per
            breakpoint on WP, both kept. */
        }
        <section class="px-5 py-16">
          <div class="mx-auto w-full max-w-[960px]">
            <SectionHeading
              title={GIVENOW.us.title}
              size="32"
              align="center"
              leading="tight"
            />
            <p class="mx-auto mt-4 hidden max-w-[780px] text-start text-base leading-relaxed text-primary md:block">
              {GIVENOW.us.body}
              <br />
              {GIVENOW.us.body2}
            </p>
            <div class="mt-8 flex flex-col gap-6 md:flex-row md:items-stretch md:justify-center">
              <BankCard
                tone="dark"
                display="md-only"
                title={GIVENOW.us.bankTransfer.title + "\u200b"}
              >
                <p class="text-base text-light">
                  {GIVENOW.us.bankTransfer.bank}
                </p>
                <p class="text-base text-light">
                  {`Account Name:\u00a0${GIVENOW.us.bankTransfer.accountName}`}
                </p>
                <p class="text-base text-light">
                  {`Account Number:\u00a0${GIVENOW.us.bankTransfer.accountNumber}`}
                </p>
                <p class="text-base text-light">
                  {`SWIFT Code:\u00a0${GIVENOW.us.bankTransfer.swift}`}
                </p>
                <p class="text-base text-light">
                  {`Routing Number:\u00a0${GIVENOW.us.bankTransfer.routing}`}
                </p>
              </BankCard>
              <BankCard
                tone="dark"
                display="mobile-only"
                title={GIVENOW.us.bankTransfer.title + "\u200b"}
              >
                <p class="text-base text-light">
                  {GIVENOW.us.bankTransferMobile.accountName}
                </p>
                <p class="text-base text-light">
                  Account: {GIVENOW.us.bankTransferMobile.accountNumber}
                </p>
                <p class="text-base text-light">
                  ACH Routing Number: {GIVENOW.us.bankTransferMobile.achRouting}
                </p>
                <p class="text-base text-light">
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
        <section class="px-5 py-16">
          <div class="mx-auto w-full max-w-[960px] text-center">
            <SectionHeading
              title={GIVENOW.au.title}
              size="32"
              leading="tight"
            />
            <p class="mt-4 text-left text-base leading-relaxed text-primary md:text-center">
              {GIVENOW.au.body2}
            </p>
            <Button
              variant="outline-black"
              size="lg"
              shape="rounded-30"
              href={GIVENOW.au.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              class="mt-8"
            >
              {GIVENOW.au.cta.label}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
});
