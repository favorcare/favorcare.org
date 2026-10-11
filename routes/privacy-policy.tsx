import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Container } from "../components/layout/Container.tsx";
import { PRIVACY } from "../components/content.ts";

// Privacy policy — cloned verbatim from the WP page: one dark hero + a
// single prose column (12 sections, 30 paragraphs).
export default define.page(function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Favor Care</title>
        <meta
          name="description"
          content="How Favor Care collects, uses, and protects your personal information."
        />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section class="bg-primary py-16 text-center md:py-20">
          <Container>
            <h1 class="text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl">
              {PRIVACY.title}
            </h1>
          </Container>
        </section>

        <section class="bg-surface py-16">
          <Container class="max-w-3xl">
            <div class="space-y-5">
              {PRIVACY.blocks.map((b, i) =>
                "h" in b
                  ? (
                    <h2
                      key={i}
                      class="pt-6 text-xl font-semibold tracking-tight md:text-2xl"
                    >
                      {b.h}
                    </h2>
                  )
                  : (
                    <p
                      key={i}
                      class="text-base leading-relaxed text-on-surface-variant"
                    >
                      {b.p}
                    </p>
                  )
              )}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
});
