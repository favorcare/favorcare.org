import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Hero } from "../components/sections/Hero.tsx";
import { Faq } from "../components/Faq.tsx";
import { Newsletter } from "../components/sections/Newsletter.tsx";
import { Section } from "../components/layout/Section.tsx";
import { Container } from "../components/layout/Container.tsx";
import ContactForm from "../islands/ContactForm.tsx";
import { CONTACT, NEWSLETTER } from "../components/content.ts";

export default define.page(function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact us — Favor Care</title>
        <meta name="description" content={CONTACT.hero.subtitle} />
      </Head>
      <Header />
      <main>
        <Hero {...CONTACT.hero} />

        <Section>
          <Container class="py-16">
            <div class="grid gap-12 lg:grid-cols-2">
              <dl class="space-y-8">
                <div>
                  <dt class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Email
                  </dt>
                  <dd class="mt-1">
                    <a
                      href={`mailto:${CONTACT.details.email}`}
                      class="inline-flex min-h-12 items-center text-lg font-semibold text-primary hover:underline"
                    >
                      {CONTACT.details.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Office
                  </dt>
                  <dd class="mt-1 text-lg text-on-surface">
                    {CONTACT.details.address}
                  </dd>
                </div>
                <div>
                  <dt class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Hours
                  </dt>
                  <dd class="mt-1 text-lg text-on-surface">
                    {CONTACT.details.hours}
                  </dd>
                </div>
              </dl>
              <ContactForm />
            </div>
          </Container>
        </Section>

        <Faq title="Frequently Asked Questions" items={CONTACT.faqs} />
        <Newsletter id="carers" {...NEWSLETTER} />
      </main>
      <Footer />
    </>
  );
});
