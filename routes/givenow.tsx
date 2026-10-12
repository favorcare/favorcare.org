import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
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
        <section class="relative flex flex-col items-center justify-center gap-8 px-5 py-[70px] lg:h-[540px] lg:py-0">
          <div
            class="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${GIVENOW.hero.image})` }}
            aria-hidden="true"
          />
          <div class="absolute inset-0 bg-black/50" aria-hidden="true" />
          <h1 class="relative text-center text-[34px] font-bold leading-tight text-white md:text-[76px] md:leading-none">
            {GIVENOW.hero.title}
          </h1>
          <a
            href={GIVENOW.hero.cta.href}
            class="relative rounded-[30px] border-[3px] border-white px-10 py-3 text-[22px] font-bold leading-none text-white transition-colors hover:bg-white hover:text-black"
          >
            {GIVENOW.hero.cta.label}
          </a>
        </section>

        {
          /* How to Give + the three PH cards (3px black outline, radius
            30, min-height 225 on md+). */
        }
        <section id="give" class="px-5 py-16 md:py-20">
          <h2 class="text-center text-[42px] font-bold leading-tight text-primary md:text-[76px] md:leading-none">
            {GIVENOW.howToGive.title}
          </h2>
          <p class="mt-4 text-center text-base font-bold text-primary">
            {GIVENOW.howToGive.subtitle}
          </p>
          <div class="mx-auto mt-12 flex w-full max-w-[960px] flex-col gap-6 md:min-h-[225px] md:flex-row md:items-stretch md:justify-center">
            <div class="flex flex-col items-center justify-center gap-2 rounded-[30px] border-[3px] border-primary p-6 text-center md:flex-1">
              <h3 class="text-[32px] font-bold leading-tight text-primary">
                {GIVENOW.ph.bankTransfer.title}
              </h3>
              <p class="text-base text-black">
                {GIVENOW.ph.bankTransfer.accountName}
              </p>
              <p class="text-base text-black">
                {GIVENOW.ph.bankTransfer.accountNumber}
              </p>
              <p class="text-base text-black">{GIVENOW.ph.bankTransfer.bank}</p>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 rounded-[30px] border-[3px] border-primary p-6 text-center md:flex-1">
              <h3 class="text-[32px] font-bold leading-tight text-primary">
                {GIVENOW.ph.checks.title}
              </h3>
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
            </div>
            <div class="flex flex-col items-center justify-center gap-4 rounded-[30px] border-[3px] border-primary p-6 text-center md:flex-1">
              <h3 class="text-[32px] font-bold leading-tight text-primary">
                {GIVENOW.ph.online.title}
              </h3>
              <p class="text-base text-black">{GIVENOW.ph.online.body}</p>
              <a
                href={GIVENOW.ph.online.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-[50px] bg-black px-8 py-3 text-[22px] font-bold leading-none text-white transition-opacity hover:opacity-90"
              >
                <span class="md:hidden">
                  {GIVENOW.ph.online.cta.labelMobile}
                </span>
                <span class="hidden md:inline">
                  {GIVENOW.ph.online.cta.label}
                </span>
              </a>
            </div>
          </div>
        </section>

        {
          /* Tax-Deductible Giving: the yellow card (radius 30, pad 50,
            56px left-aligned heading). WP renders it above the hero on
            mobile — mirrored with order-first. */
        }
        <section class="order-first px-2.5 pb-16 pt-2.5 md:order-none md:px-5 md:pt-0 lg:px-0">
          <div class="mx-auto w-full max-w-[833px] rounded-[30px] bg-yellow p-[50px]">
            <h2 class="text-left text-[38px] font-bold leading-tight text-primary md:text-[56px] md:leading-none">
              {GIVENOW.ph.taxDeductible.title}
            </h2>
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
                  <input
                    type={f === "CONTACT EMAIL" ? "email" : "text"}
                    name={f.toLowerCase().replace(/ /g, "-")}
                    placeholder={f
                      .toLowerCase()
                      .replace(/^\w|\s\w/g, (c) =>
                        c.toUpperCase())}
                    aria-label={f}
                    class="h-[59px] w-full rounded-[5px] bg-white px-4 text-lg text-on-surface"
                  />
                </label>
              ))}
              <button
                type="submit"
                class="mt-2 h-14 w-full rounded-[30px] text-[22px] font-bold text-black transition-opacity hover:opacity-80"
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
            <h2 class="text-center text-[32px] font-bold leading-tight text-primary">
              {GIVENOW.us.title}
            </h2>
            <p class="mx-auto mt-4 hidden max-w-[780px] text-start text-base leading-relaxed text-primary md:block">
              {GIVENOW.us.body}
              <br />
              {GIVENOW.us.body2}
            </p>
            <div class="mt-8 flex flex-col gap-6 md:flex-row md:items-stretch md:justify-center">
              <div class="hidden flex-col items-center justify-center gap-2 rounded-[30px] border-[3px] border-black bg-black p-6 text-center md:flex">
                <h3 class="text-[32px] font-bold leading-tight text-white">
                  {GIVENOW.us.bankTransfer.title + "\u200b"}
                </h3>
                <p class="text-base text-[#fbf9ed]">
                  {GIVENOW.us.bankTransfer.bank}
                </p>
                <p class="text-base text-[#fbf9ed]">
                  {`Account Name:\u00a0${GIVENOW.us.bankTransfer.accountName}`}
                </p>
                <p class="text-base text-[#fbf9ed]">
                  {`Account Number:\u00a0${GIVENOW.us.bankTransfer.accountNumber}`}
                </p>
                <p class="text-base text-[#fbf9ed]">
                  {`SWIFT Code:\u00a0${GIVENOW.us.bankTransfer.swift}`}
                </p>
                <p class="text-base text-[#fbf9ed]">
                  {`Routing Number:\u00a0${GIVENOW.us.bankTransfer.routing}`}
                </p>
              </div>
              <div class="flex flex-col items-center justify-center gap-2 rounded-[30px] border-[3px] border-black bg-black p-6 text-center md:hidden">
                <h3 class="text-[32px] font-bold leading-tight text-white">
                  {GIVENOW.us.bankTransfer.title + "\u200b"}
                </h3>
                <p class="text-base text-[#fbf9ed]">
                  {GIVENOW.us.bankTransferMobile.accountName}
                </p>
                <p class="text-base text-[#fbf9ed]">
                  Account: {GIVENOW.us.bankTransferMobile.accountNumber}
                </p>
                <p class="text-base text-[#fbf9ed]">
                  ACH Routing Number: {GIVENOW.us.bankTransferMobile.achRouting}
                </p>
                <p class="text-base text-[#fbf9ed]">
                  {GIVENOW.us.bankTransferMobile.bank}
                </p>
              </div>
              <div class="flex flex-col items-center justify-center gap-4 rounded-[30px] border-[3px] border-black bg-black p-6 text-center">
                <h3 class="text-[32px] font-bold leading-tight text-white">
                  {GIVENOW.ph.online.title}
                </h3>
                <a
                  href={GIVENOW.us.creditDebit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-[50px] bg-white px-8 py-3 text-[22px] font-bold leading-none text-black transition-opacity hover:opacity-90"
                >
                  {GIVENOW.us.creditDebit.label}
                </a>
              </div>
            </div>
          </div>
        </section>

        {
          /* Australia: GDG J1158N copy + the white pill with a 3px black
            border. */
        }
        <section class="px-5 py-16">
          <div class="mx-auto w-full max-w-[960px] text-center">
            <h2 class="text-[32px] font-bold leading-tight text-primary">
              {GIVENOW.au.title}
            </h2>
            <p class="mt-4 text-left text-base leading-relaxed text-primary md:text-center">
              {GIVENOW.au.body2}
            </p>
            <a
              href={GIVENOW.au.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              class="mt-8 inline-block rounded-[30px] border-[3px] border-black bg-white px-8 py-3 text-[22px] font-bold leading-none text-black transition-colors hover:bg-black hover:text-white"
            >
              {GIVENOW.au.cta.label}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
});
