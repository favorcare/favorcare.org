import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Button } from "../components/Button.tsx";
import { Container } from "../components/layout/Container.tsx";
import { Faq } from "../components/Faq.tsx";
import ContactForm from "../islands/ContactForm.tsx";
import { CONTACT } from "../components/content.ts";

// Contact page cloned from the WP page (post 1845): form (no newsletter
// checkbox — that's the home variant), FAQs, Carers Newsletter block
// (the #newsletter anchor target from get-involved's SUBSCRIBE), the
// we'd-love block, and the map embed.
export default define.page(function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact us — Favor Care</title>
        <meta name="description" content={CONTACT.love.body} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero + form */}
        <section class="bg-primary py-20 md:py-28">
          <Container class="max-w-3xl">
            <h1 class="text-center text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
              {CONTACT.heroTitle}
            </h1>
            <div class="mt-10">
              <ContactForm />
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section class="bg-surface py-20">
          <Container class="max-w-3xl">
            <Faq title="Frequently Asked Questions" items={CONTACT.faqs} />
          </Container>
        </section>

        {/* Carers Newsletter — anchor target for /get-involved SUBSCRIBE. */}
        <section id="newsletter" class="bg-secondary-container py-20">
          <Container class="max-w-2xl text-center">
            <h2 class="text-3xl font-semibold tracking-tight md:text-4xl">
              {CONTACT.newsletter.title}
            </h2>
            <form
              action={`mailto:${CONTACT.form.recipient}`}
              method="post"
              class="mx-auto mt-6 flex max-w-md gap-3"
            >
              <input
                type="email"
                name="newsletter-email"
                required
                placeholder={CONTACT.newsletter.placeholder}
                aria-label="Email address"
                class="min-h-12 flex-1 border border-outline-variant bg-surface px-4 text-base text-on-surface placeholder:text-on-surface-variant"
              />
              <Button type="submit" variant="donate">
                {CONTACT.newsletter.cta}
              </Button>
            </form>
          </Container>
        </section>

        {/* We'd love to hear from you + map */}
        <section class="bg-surface py-20">
          <Container class="max-w-4xl text-center">
            <h2 class="text-3xl font-semibold tracking-tight md:text-5xl">
              {CONTACT.love.title}
            </h2>
            <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-on-surface-variant">
              {CONTACT.love.body}
            </p>
            <a
              href={`mailto:${CONTACT.love.email}`}
              class="mt-3 inline-block text-base font-semibold text-link hover:text-link-hover"
            >
              {CONTACT.love.email}
            </a>
            <iframe
              title="Favor Care office location"
              src={`https://www.google.com/maps?q=${
                encodeURIComponent(CONTACT.mapQuery)
              }&output=embed`}
              class="mt-10 h-80 w-full border-0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
});
