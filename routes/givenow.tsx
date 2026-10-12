import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Button } from "../components/Button.tsx";
import { Container } from "../components/layout/Container.tsx";
import { GIVENOW } from "../components/content.ts";

// Give-now page cloned from the WP page (post 7122) + its giving
// templates: hero -> #give (PH: bank transfer / checks / online PayMongo /
// tax-deductible form) -> US (Chase bank + Zeffy) -> AU (GDG J1158N).
// The tax form submits via mailto until Phase 6/7 gives it a backend
// (no file upload yet — PROOF OF DONATION noted in the mail body).
export default define.page(function GiveNowPage() {
  return (
    <>
      <Head>
        <title>Give now — Favor Care</title>
        <meta name="description" content={GIVENOW.howToGive.subtitle} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section class="bg-primary py-24 text-center md:py-32">
          <Container>
            <h1 class="mx-auto max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
              {GIVENOW.hero.title}
            </h1>
            <div class="mt-8">
              <Button variant="inverted" href={GIVENOW.hero.cta.href}>
                {GIVENOW.hero.cta.label}
              </Button>
            </div>
          </Container>
        </section>

        {/* How to give — Philippines */}
        <section id="give" class="bg-surface py-20">
          <Container class="max-w-5xl">
            <h2 class="text-center text-3xl font-semibold tracking-tight md:text-5xl">
              {GIVENOW.howToGive.title}
            </h2>
            <p class="mt-4 text-center text-base leading-relaxed text-on-surface-variant">
              {GIVENOW.howToGive.subtitle}
            </p>

            <div class="mt-12 grid gap-8 md:grid-cols-3">
              <div class="border border-outline-variant bg-secondary-container p-6">
                <h3 class="text-lg font-semibold">
                  {GIVENOW.ph.bankTransfer.title}
                </h3>
                <dl class="mt-4 space-y-1 text-base">
                  <dt class="sr-only">Account name</dt>
                  <dd>{GIVENOW.ph.bankTransfer.accountName}</dd>
                  <dt class="sr-only">Account number</dt>
                  <dd class="text-xl font-semibold tracking-wider">
                    {GIVENOW.ph.bankTransfer.accountNumber}
                  </dd>
                  <dt class="sr-only">Bank</dt>
                  <dd>{GIVENOW.ph.bankTransfer.bank}</dd>
                </dl>
              </div>

              <div class="border border-outline-variant bg-secondary-container p-6">
                <h3 class="text-lg font-semibold">{GIVENOW.ph.checks.title}</h3>
                <p class="mt-4 text-base text-on-surface-variant">
                  {GIVENOW.ph.checks.payable}
                </p>
                <p class="mt-1 text-base font-semibold">
                  {GIVENOW.ph.checks.address}
                </p>
              </div>

              <div class="flex flex-col border border-outline-variant bg-secondary-container p-6">
                <h3 class="text-lg font-semibold">
                  {GIVENOW.ph.online.title}
                </h3>
                <p class="mt-4 flex-1 text-base leading-relaxed text-on-surface-variant">
                  {GIVENOW.ph.online.body}
                </p>
                <div class="mt-5">
                  <Button
                    variant="donate"
                    href={GIVENOW.ph.online.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {GIVENOW.ph.online.cta.label}
                  </Button>
                </div>
              </div>
            </div>

            {/* Tax-deductible giving */}
            <div class="mt-12 border border-outline-variant p-6 md:p-8">
              <h3 class="text-lg font-semibold">
                {GIVENOW.ph.taxDeductible.title}
              </h3>
              <p class="mt-3 text-base leading-relaxed text-on-surface-variant">
                {GIVENOW.ph.taxDeductible.intro}
              </p>
              <form
                action={`mailto:${GIVENOW.ph.taxDeductible.recipient}`}
                method="post"
                class="mt-6 grid gap-4 sm:grid-cols-2"
              >
                {GIVENOW.ph.taxDeductible.fields.map((f) => (
                  <input
                    key={f}
                    type={f === "CONTACT EMAIL" ? "email" : "text"}
                    name={f.toLowerCase().replace(/ /g, "-")}
                    placeholder={f}
                    aria-label={f}
                    class="min-h-12 border border-outline-variant bg-surface px-4 text-base text-on-surface placeholder:text-on-surface-variant"
                  />
                ))}
                <div class="sm:col-span-2">
                  <Button type="submit" variant="donate">
                    {GIVENOW.ph.taxDeductible.submit}
                  </Button>
                </div>
              </form>
            </div>
          </Container>
        </section>

        {/* United States */}
        <section class="bg-secondary-container py-20">
          <Container class="max-w-5xl">
            <h2 class="text-3xl font-semibold tracking-tight md:text-4xl">
              {GIVENOW.us.title}
            </h2>
            <p class="mt-4 max-w-3xl text-base leading-relaxed text-on-surface-variant">
              {GIVENOW.us.body}
            </p>
            <div class="mt-8 grid gap-8 md:grid-cols-2">
              <div class="border border-outline-variant bg-surface p-6">
                <h3 class="text-lg font-semibold">
                  {GIVENOW.us.bankTransfer.title}
                </h3>
                <dl class="mt-4 space-y-1 text-base">
                  <dd>{GIVENOW.us.bankTransfer.bank}</dd>
                  <dd>Account Name: {GIVENOW.us.bankTransfer.accountName}</dd>
                  <dd>
                    Account Number: {GIVENOW.us.bankTransfer.accountNumber}
                  </dd>
                  <dd>SWIFT Code: {GIVENOW.us.bankTransfer.swift}</dd>
                  <dd>
                    Routing Number: {GIVENOW.us.bankTransfer.routing}
                  </dd>
                </dl>
              </div>
              <div class="flex flex-col items-start justify-center border border-outline-variant bg-surface p-6">
                <Button
                  variant="donate"
                  href={GIVENOW.us.creditDebit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {GIVENOW.us.creditDebit.label}
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Australia */}
        <section class="bg-surface py-20">
          <Container class="max-w-5xl text-center">
            <h2 class="text-3xl font-semibold tracking-tight md:text-4xl">
              {GIVENOW.au.title}
            </h2>
            <p class="mt-4 text-base font-semibold">{GIVENOW.au.body}</p>
            <p class="mx-auto mt-2 max-w-2xl text-base leading-relaxed text-on-surface-variant">
              {GIVENOW.au.body2}
            </p>
            <div class="mt-7">
              <Button
                variant="donate"
                href={GIVENOW.au.cta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {GIVENOW.au.cta.label}
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
});
