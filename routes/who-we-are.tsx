import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Hero } from "../components/sections/Hero.tsx";
import { Team } from "../components/sections/Team.tsx";
import { TakeAction } from "../components/sections/TakeAction.tsx";
import { Section } from "../components/layout/Section.tsx";
import { Container } from "../components/layout/Container.tsx";
import { SectionHeading } from "../components/layout/SectionHeading.tsx";
import { Card } from "../components/Card.tsx";
import { Badge } from "../components/Badge.tsx";
import { Checklist } from "../components/Checklist.tsx";
import { ABOUT, TRUST_FACTS } from "../components/content.ts";

export default define.page(function WhoWeArePage() {
  return (
    <>
      <Head>
        <title>Who we are — Favor Care</title>
        <meta name="description" content={ABOUT.hero.subtitle} />
      </Head>
      <Header />
      <main>
        <Hero {...ABOUT.hero} />

        <Section>
          <Container class="pb-4 pt-8">
            <img
              src={ABOUT.banner.src}
              alt={ABOUT.banner.alt}
              class="w-full rounded-lg border border-surface-container-high"
            />
          </Container>
        </Section>

        <Section>
          <Container class="py-16">
            <div class="grid gap-6 md:grid-cols-2">
              <Card>
                <h2 class="text-2xl font-semibold text-on-surface">Mission</h2>
                <p class="mt-3 text-base leading-relaxed text-on-surface-variant">
                  {ABOUT.mission}
                </p>
              </Card>
              <Card>
                <h2 class="text-2xl font-semibold text-on-surface">Vision</h2>
                <p class="mt-3 text-base leading-relaxed text-on-surface-variant">
                  {ABOUT.vision}
                </p>
              </Card>
            </div>
          </Container>
        </Section>

        <Section>
          <Container class="py-16">
            <SectionHeading title="Core Values" />
            <div class="mt-8 flex flex-wrap gap-3">
              {ABOUT.values.map((value) => <Badge key={value}>{value}</Badge>)}
            </div>
          </Container>
        </Section>

        <Team {...ABOUT.team} />

        <Section>
          <Container class="py-20">
            <SectionHeading title={ABOUT.accountability.title} />
            <div class="mt-8">
              <Checklist items={TRUST_FACTS} />
            </div>
          </Container>
        </Section>

        <TakeAction {...ABOUT.takeAction} />
      </main>
      <Footer />
    </>
  );
});
