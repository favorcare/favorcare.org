import type { Metadata } from "next";
import { Header } from "../../../components/Header.tsx";
import { Footer } from "../../../components/Footer.tsx";
import { SectionHeading } from "../../../components/layout/SectionHeading.tsx";
import { Faq } from "../../../components/Faq.tsx";
import { MapEmbed, mapEmbedSrc } from "../../../components/MapEmbed.tsx";
import { ContactForm } from "../../../components/ContactForm.tsx";
import { CONTACT } from "../../../components/content.ts";
import { NewsletterForm } from "../../../components/NewsletterForm.tsx";
import { PageTitle } from "../../../components/PageTitle.tsx";
import { cx } from "../../../components/cx.ts";
import { frame, gutter } from "../../../components/layout/Container.tsx";

export const metadata: Metadata = {
  title: "Contact us — Favor Care",
  description: CONTACT.love.body,
};

// Contact page cloned from the WP page (post 1845, staging = canonical).
// Copy is verbatim; geometry follows the measured WP layout at
// 360/768/1280 — px values below are those measurements, kept inline
// until they're folded into DESIGN.md display tokens.
//
// WP quirks mirrored: the page has no photo hero (white with a black
// heading); the we'd-love email renders at a 1px font size on WP
// (effectively invisible but present in text) — kept at 1px; the
// newsletter block's Mailchimp form shows three labeled fields with a
// yellow SUBSCRIBE pill (no backend yet — it composes a mailto:). The
// newsletter's 41px inputs and white-on-yellow pill are deliberately not
// cloned (contrast + touch targets) — see NewsletterForm.
export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Heading + contact form (single column, WP's 684px frame). */}
        <section className={cx(gutter(), "pb-20 pt-[50px] md:pt-20")}>
          <div className={frame()}>
            <PageTitle tone="primary" size="contact">
              {CONTACT.heroTitle}
            </PageTitle>
            <div className="mt-10 md:mt-[70px]">
              <ContactForm page="contact" />
            </div>
          </div>
        </section>

        {/* FAQ: centered heading, 51px accordion rows with 16px bold
            titles, all collapsed (answers excluded from innerText, as on
            WP). */}
        <section className={cx(gutter(), "pb-20")}>
          <div className="mx-auto w-full max-w-[750px]">
            <SectionHeading
              title="Frequently Asked Questions"
              align="center"
              weight="bold"
              leading="tight"
              className="lg:leading-none"
            />
            <Faq items={CONTACT.faqs} className="mt-6 md:mt-[46px]" />
          </div>
        </section>

        {/* Carers Newsletter — anchor target for /get-involved's
            SUBSCRIBE. Black band with the NewsletterForm: three labeled
            fields (400px) and a yellow SUBSCRIBE pill. */}
        <section
          id="newsletter"
          className={cx(gutter(), "bg-black pb-5 pt-20")}
        >
          <div className={frame()}>
            <NewsletterForm
              title={CONTACT.newsletter.title}
              fields={CONTACT.newsletter.fields}
              cta={CONTACT.newsletter.cta}
              recipient={CONTACT.form.recipient}
              subject={CONTACT.newsletter.subject}
            />
          </div>
        </section>

        {/* We'd love to hear from you + map, both on black. WP renders
            the email address at a 1px font size — invisible, but present
            in text. */}
        <section className={cx(gutter(), "bg-black py-[60px]")}>
          <div className={frame()}>
            <h2 className="text-left text-[38px] font-bold leading-tight text-white md:text-[36px] lg:text-[48px] lg:font-medium lg:leading-none">
              {CONTACT.love.title}
            </h2>
            <p className="mt-4 max-w-[633px] text-left text-sm leading-relaxed text-white md:text-[15px] lg:text-lg lg:leading-relaxed">
              {CONTACT.love.body}
            </p>
            <p className="text-[1px] font-bold text-white" aria-hidden="true">
              {CONTACT.love.email}
            </p>
          </div>
        </section>
        <section className="bg-black px-2.5 pb-2.5 md:px-2.5">
          <MapEmbed
            src={mapEmbedSrc(CONTACT.mapQuery)}
            title="Favor Care office location"
            className="h-[400px] w-full border-0"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
