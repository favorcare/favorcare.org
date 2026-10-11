import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Button } from "../components/Button.tsx";
import { Container } from "../components/layout/Container.tsx";
import Popup from "../islands/Popup.tsx";
import { GET_INVOLVED, POPUPS } from "../components/content.ts";

// Get-involved page cloned from the WP page (post 1840): hero + three
// cards (Carers Newsletter / Volunteer / Donate) with their real links.
// The volunteer commitment popup sits with the Volunteer card; the Prayer
// Hub popup lives on the home hero kicker (where WP triggers it).
export default define.page(function GetInvolvedPage() {
  return (
    <>
      <Head>
        <title>Get involved — Favor Care</title>
        <meta name="description" content={GET_INVOLVED.hero.subtitle} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section class="bg-primary py-20 text-center md:py-28">
          <Container>
            <h1 class="mx-auto max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
              {GET_INVOLVED.hero.title}
            </h1>
            <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80">
              {GET_INVOLVED.hero.subtitle}
            </p>
            <img
              src={GET_INVOLVED.hero.image}
              alt=""
              class="mx-auto mt-10 w-full max-w-4xl object-cover"
            />
          </Container>
        </section>

        {/* Cards */}
        <section class="bg-surface py-20">
          <Container class="max-w-6xl">
            <div class="grid gap-8 md:grid-cols-3">
              {GET_INVOLVED.cards.map((card) => (
                <div class="flex flex-col border border-outline-variant bg-secondary-container">
                  {card.image && (
                    <img
                      src={card.image}
                      alt=""
                      class="aspect-4/3 w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div class="flex flex-1 flex-col p-6">
                    <h2 class="text-xl font-semibold tracking-tight">
                      {card.title}
                    </h2>
                    <p class="mt-3 flex-1 text-base leading-relaxed text-on-surface-variant">
                      {card.body}
                    </p>
                    <div class="mt-6">
                      <Button
                        variant="donate"
                        href={card.cta.href}
                        {...card.cta.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {}}
                      >
                        {card.cta.label}
                      </Button>
                    </div>
                    {card.title === "Volunteer" && (
                      <Popup
                        trigger="Volunteer commitment"
                        triggerClass="mt-3 self-start text-sm font-semibold text-link underline hover:text-link-hover"
                        title={POPUPS.volunteer.title}
                        cta={POPUPS.volunteer.cta}
                      >
                        {POPUPS.volunteer.body}
                      </Popup>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
});
