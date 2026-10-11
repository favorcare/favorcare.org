import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Button } from "../components/Button.tsx";
import { Container } from "../components/layout/Container.tsx";
import { WHAT_WE_DO } from "../components/content.ts";

// What-we-do page cloned from the WP page (post 1835): hero + six program
// blocks (label / summary / body, verbatim) + Donate + Take Action.
// Text-only page — no images in the source tree.
export default define.page(function WhatWeDoPage() {
  return (
    <>
      <Head>
        <title>What we do — Favor Care</title>
        <meta name="description" content={WHAT_WE_DO.hero.subtitle} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section class="bg-primary py-20 text-center md:py-28">
          <Container>
            <h1 class="mx-auto max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
              {WHAT_WE_DO.hero.title}
            </h1>
            <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80">
              {WHAT_WE_DO.hero.subtitle}
            </p>
          </Container>
        </section>

        {/* Program blocks */}
        {WHAT_WE_DO.programs.map((p, i) => (
          <section
            class={i % 2 === 0
              ? "bg-surface py-16"
              : "bg-secondary-container py-16"}
          >
            <Container class="max-w-4xl">
              <h2 class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                {p.label}
              </h2>
              <p class="mt-3 text-xl font-medium leading-snug tracking-tight md:text-2xl">
                {p.summary}
              </p>
              <p class="mt-5 text-base leading-relaxed text-on-surface-variant">
                {p.body}
              </p>
            </Container>
          </section>
        ))}

        {/* Donate */}
        <section class="bg-primary py-20 text-center">
          <Container class="max-w-3xl">
            <h2 class="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              {WHAT_WE_DO.donate.title}
            </h2>
            <p class="mt-5 text-base leading-relaxed text-white/80">
              {WHAT_WE_DO.donate.body}
            </p>
            <div class="mt-7">
              <Button variant="inverted" href={WHAT_WE_DO.donate.cta.href}>
                {WHAT_WE_DO.donate.cta.label}
              </Button>
            </div>
          </Container>
        </section>

        {/* Take action */}
        <section class="bg-surface py-20 text-center">
          <Container class="max-w-3xl">
            <h2 class="text-3xl font-semibold tracking-tight md:text-5xl">
              {WHAT_WE_DO.takeAction.title}
            </h2>
            <p class="mt-5 text-base leading-relaxed text-on-surface-variant">
              {WHAT_WE_DO.takeAction.body}
            </p>
            <div class="mt-7">
              <Button variant="secondary" href={WHAT_WE_DO.takeAction.cta.href}>
                {WHAT_WE_DO.takeAction.cta.label}
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
});
