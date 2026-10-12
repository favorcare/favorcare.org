import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { SectionHeading } from "../components/layout/SectionHeading.tsx";
import { Faq } from "../components/Faq.tsx";
import { MapEmbed, mapEmbedSrc } from "../components/MapEmbed.tsx";
import ContactForm from "../islands/ContactForm.tsx";
import { CONTACT } from "../components/content.ts";

// Contact page cloned from the WP page (post 1845, staging = canonical).
// Copy is verbatim; geometry follows the measured WP layout at
// 360/768/1280 — px values below are those measurements, kept inline
// until they're folded into DESIGN.md display tokens.
//
// WP quirks mirrored: the page has no photo hero (white with a black
// heading); the we'd-love email renders at a 1px font size on WP
// (effectively invisible but present in text) — kept at 1px; the
// newsletter block's Mailchimp form shows three labeled fields with a
// yellow SUBSCRIBE pill (no backend yet — it composes a mailto:).
export default define.page(function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact us — Favor Care</title>
        <meta name="description" content={CONTACT.love.body} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Heading + contact form (single column, WP's 684px frame). */}
        <section class="px-5 pb-20 pt-[50px] md:px-2.5 md:pt-20 lg:px-0">
          <div class="mx-auto w-full max-w-[1140px]">
            <h1 class="text-center text-[38px] font-bold leading-none text-primary md:text-[59px] lg:text-[70px]">
              {CONTACT.heroTitle}
            </h1>
            <div class="mt-10 md:mt-[70px]">
              <ContactForm page="contact" />
            </div>
          </div>
        </section>

        {
          /* FAQ: centered heading, 51px accordion rows with 16px bold
            titles, all collapsed (answers excluded from innerText, as on
            WP). */
        }
        <section class="px-5 pb-20 md:px-2.5 lg:px-0">
          <div class="mx-auto w-full max-w-[750px]">
            <SectionHeading
              title="Frequently Asked Questions"
              align="center"
              weight="bold"
              leading="tight"
              class="lg:leading-none"
            />
            <Faq items={CONTACT.faqs} class="mt-6 md:mt-[46px]" />
          </div>
        </section>

        {
          /* Carers Newsletter — anchor target for /get-involved's
            SUBSCRIBE. Black band with the Mailchimp form: three labeled
            fields (400px) and a yellow SUBSCRIBE pill. */
        }
        <section
          id="newsletter"
          class="bg-black px-5 pb-5 pt-20 md:px-2.5 lg:px-0"
        >
          <div class="mx-auto w-full max-w-[1140px]">
            {
              /* Newsletter title is its own WP dialect (28 / 36px) — not
                the section scale. */
            }
            <h2 class="text-center text-[28px] font-bold leading-tight text-white md:text-[36px] lg:leading-none">
              {CONTACT.newsletter.title}
            </h2>
            <form
              action={`mailto:${CONTACT.form.recipient}`}
              method="post"
              class="mx-auto mt-8 w-full max-w-[400px]"
            >
              <label class="block">
                <span class="mb-1 block text-base font-semibold text-white">
                  FIRST NAME
                </span>
                <input
                  type="text"
                  name="first-name"
                  placeholder="First Name*"
                  aria-label="First name"
                  class="h-[41px] w-full rounded-[4px] border border-white bg-white px-3 text-base text-on-surface"
                />
              </label>
              <label class="mt-4 block">
                <span class="mb-1 block text-base font-semibold text-white">
                  LAST NAME
                </span>
                <input
                  type="text"
                  name="last-name"
                  placeholder="Last Name*"
                  aria-label="Last name"
                  class="h-[41px] w-full rounded-[4px] border border-white bg-white px-3 text-base text-on-surface"
                />
              </label>
              <label class="mt-4 block">
                <span class="mb-1 block text-base font-semibold text-white">
                  EMAIL ADDRESS
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  aria-label="Email address"
                  class="h-[41px] w-full rounded-[4px] border border-white bg-white px-3 text-base text-on-surface"
                />
              </label>
              <div class="mt-8 flex justify-center">
                <input
                  type="submit"
                  value="SUBSCRIBE"
                  class="inline-flex h-[61px] w-[149px] cursor-pointer items-center justify-center rounded-full bg-yellow text-lg font-bold text-white transition-opacity hover:opacity-90"
                />
              </div>
            </form>
          </div>
        </section>

        {
          /* We'd love to hear from you + map, both on black. WP renders
            the email address at a 1px font size — invisible, but present
            in text. */
        }
        <section class="bg-black px-5 py-[60px] md:px-2.5 lg:px-0">
          <div class="mx-auto w-full max-w-[1140px]">
            <h2 class="text-left text-[38px] font-bold leading-tight text-white md:text-[36px] lg:text-[48px] lg:font-medium lg:leading-none">
              {CONTACT.love.title}
            </h2>
            <p class="mt-4 max-w-[633px] text-left text-sm leading-relaxed text-white md:text-[15px] lg:text-lg lg:leading-relaxed">
              {CONTACT.love.body}
            </p>
            <p class="text-[1px] font-bold text-white" aria-hidden="true">
              {CONTACT.love.email}
            </p>
          </div>
        </section>
        <section class="bg-black px-2.5 pb-2.5 md:px-2.5">
          <MapEmbed
            src={mapEmbedSrc(CONTACT.mapQuery)}
            title="Favor Care office location"
            class="h-[400px] w-full border-0"
          />
        </section>
      </main>
      <Footer />
    </>
  );
});
