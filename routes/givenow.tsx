import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Hero } from "../components/sections/Hero.tsx";
import { GiveMethods } from "../components/sections/GiveMethods.tsx";
import { Section } from "../components/layout/Section.tsx";
import { Container } from "../components/layout/Container.tsx";
import { GIVENOW } from "../components/content.ts";

export default define.page(function GiveNowPage() {
  return (
    <>
      <Head>
        <title>Give now — Favor Care</title>
        <meta
          name="description"
          content="Partner with Favor Care by giving — bank transfer, checks, or online via GCash, Maya, and card. Tax-deductible through PCNC."
        />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero {...GIVENOW.hero} />
        <GiveMethods
          id="give"
          title={GIVENOW.howToGive.title}
          subtitle={GIVENOW.howToGive.subtitle}
          regions={GIVENOW.regions}
        />
        <Section tone="dim">
          <Container class="py-16">
            <div class="max-w-3xl">
              <h2 class="text-2xl font-semibold tracking-tight text-on-surface">
                {GIVENOW.tax.title}
              </h2>
              <p class="mt-3 text-base leading-relaxed text-on-surface-variant">
                {GIVENOW.tax.body}
              </p>
              <p class="mt-2 text-sm text-on-surface-variant">
                {GIVENOW.tax.footnote}
              </p>
              <a
                href={GIVENOW.tax.certRequest.href}
                class="mt-4 inline-flex min-h-12 items-center font-semibold text-primary hover:underline"
              >
                {GIVENOW.tax.certRequest.label}
              </a>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
});
