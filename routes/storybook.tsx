import type { ComponentChildren } from "preact";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";

// Primitives
import { cx } from "../components/cx.ts";
import { Button } from "../components/Button.tsx";
import { Eyebrow } from "../components/Eyebrow.tsx";
import { SectionHeading } from "../components/layout/SectionHeading.tsx";
import { InputField } from "../components/InputField.tsx";
import { TextareaField } from "../components/TextareaField.tsx";

// Page structure
import { PageHero } from "../components/PageHero.tsx";
import { CtaBand } from "../components/CtaBand.tsx";
import { BankCard } from "../components/BankCard.tsx";
import { Faq } from "../components/Faq.tsx";
import { MapEmbed, mapEmbedSrc } from "../components/MapEmbed.tsx";
import { VideoEmbed } from "../components/VideoEmbed.tsx";
import { PostCard } from "../components/PostCard.tsx";

// Icons + real content (specimens render with real copy, never lorem)
import {
  BrandIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  MailIcon,
  MenuIcon,
  PlusIcon,
} from "../components/icons.tsx";
import {
  ABOUT,
  CAROUSEL,
  CONTACT,
  GIVENOW,
  HOME,
  POPUPS,
  WHAT_WE_DO,
} from "../components/content.ts";
import { listPosts } from "../components/posts.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import Popup from "../islands/Popup.tsx";
import Carousel from "../islands/Carousel.tsx";
import Slideshow from "../islands/Slideshow.tsx";
import ContactForm from "../islands/ContactForm.tsx";

// The living component catalog. Every component the real pages are built
// from has a specimen here; COMPONENTS.md is the written reference and
// this page is its executable counterpart. When you add a component,
// add its specimen in the same change.

function Group(
  { id, title, intro, children }: {
    id: string;
    title: string;
    intro?: string;
    children: ComponentChildren;
  },
) {
  return (
    <section id={id} class="scroll-mt-24">
      <div class="border-b border-primary/15 pb-3">
        <h2 class="text-[25px] font-bold leading-none text-primary md:text-[30px]">
          {title}
        </h2>
        {intro && <p class="mt-1 text-sm text-on-surface-variant">{intro}</p>}
      </div>
      <div class="mt-6 space-y-6">{children}</div>
    </section>
  );
}

function Specimen(
  { label, dark, children }: {
    label: string;
    dark?: boolean;
    children: ComponentChildren;
  },
) {
  return (
    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
        {label}
      </p>
      <div
        class={cx(
          "rounded-[10px] border border-primary/15 p-5",
          dark ? "bg-black" : "bg-white",
        )}
      >
        {children}
      </div>
    </div>
  );
}

const BUTTON_MATRIX = [
  { variant: "yellow", label: "yellow" },
  { variant: "black", label: "black" },
  { variant: "white", label: "white" },
  { variant: "outline-white", label: "outline-white" },
  { variant: "outline-black", label: "outline-black" },
] as const;

export default define.page(function StorybookPage() {
  const post = listPosts()[0];
  return (
    <>
      <Head>
        <title>Component library — Favor Care</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Header />
      <header class="bg-black px-5 py-10 text-center">
        <h1 class="text-[38px] font-bold leading-none text-white md:text-[56px] lg:text-[70px]">
          Component Library
        </h1>
        <p class="mx-auto mt-4 max-w-[630px] text-sm text-white/80 md:text-[15px] lg:text-lg">
          The living catalog behind COMPONENTS.md — every shared component the
          pages are built from, rendered with real content.
        </p>
      </header>

      <main class="mx-auto w-full max-w-[1140px] px-5 pb-24 pt-10 md:px-2.5 lg:px-0">
        <div class="space-y-16">
          <Group
            id="tokens"
            title="Design tokens"
            intro="Defined in assets/styles.css @theme and documented in DESIGN.md."
          >
            <Specimen label="Colors (surfaces & actions)">
              <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  ["primary", "bg-primary"],
                  ["yellow", "bg-yellow"],
                  ["article-yellow", "bg-article-yellow"],
                  ["black", "bg-black"],
                  ["surface-dim", "bg-surface-dim"],
                  ["surface-container", "bg-surface-container"],
                  ["link", "bg-link"],
                  ["tertiary", "bg-tertiary"],
                  ["light", "bg-light"],
                  ["archive-ink", "bg-archive-ink"],
                  ["archive-muted", "bg-archive-muted"],
                  ["adbreak", "bg-adbreak"],
                ].map(([name, cls]) => (
                  <div key={name} class="flex items-center gap-3">
                    <span
                      class={cx(
                        "h-10 w-10 rounded-[10px] border border-primary/15",
                        cls,
                      )}
                    />
                    <code class="text-sm text-on-surface">{name}</code>
                  </div>
                ))}
              </div>
            </Specimen>
            <Specimen label="Type scales (as measured on WP)">
              <div class="space-y-4">
                <p class="text-[38px] font-bold leading-none text-primary md:text-[56px] lg:text-[70px]">
                  Hero 38/56/70
                </p>
                <p class="text-[28px] font-bold leading-none text-primary md:text-[39px] lg:text-[56px]">
                  Section 28/39/56
                </p>
                <p class="text-[25px] font-bold leading-none text-primary md:text-[30px] lg:text-[36px]">
                  Card 25/30/36
                </p>
                <p class="text-lg leading-relaxed text-primary">
                  Body lg — 18px, 1.5 line-height (the accessibility floor).
                </p>
              </div>
            </Specimen>
          </Group>

          <Group id="layout" title="Layout" intro="components/layout/">
            <Specimen label='Container — pad="page" (10px gutters at 768) vs pad="home" (40px)'>
              <div class="space-y-3">
                <div class="mx-auto w-full max-w-[1140px] border-2 border-dashed border-primary/30 px-5 py-3 text-center text-sm md:px-2.5 lg:px-0">
                  frame("page")
                </div>
                <div class="mx-auto w-full max-w-[1140px] border-2 border-dashed border-primary/30 px-5 py-3 text-center text-sm md:px-10 lg:px-0">
                  frame("home")
                </div>
              </div>
            </Specimen>
            <Specimen label="SectionHeading — tone / weight / size / align">
              <div class="space-y-6">
                <SectionHeading title={ABOUT.valuesTitle} align="center" />
                <SectionHeading
                  title={HOME.about.title}
                  weight="semibold"
                />
                <SectionHeading
                  title={GIVENOW.us.title}
                  size="32"
                  leading="tight"
                  align="center"
                />
              </div>
            </Specimen>
            <Specimen label="Eyebrow">
              <Eyebrow>{HOME.about.eyebrow}</Eyebrow>
            </Specimen>
          </Group>

          <Group id="actions" title="Actions" intro="components/Button.tsx">
            <Specimen label="Button — variant × size (shape pill)">
              <div class="flex flex-wrap items-center gap-4">
                {BUTTON_MATRIX.map((v) => (
                  <Button
                    key={v.variant}
                    variant={v.variant}
                    href="#actions"
                    class={cx(
                      v.variant === "white" || v.variant === "outline-white"
                        ? "bg-surface-container"
                        : "",
                    )}
                  >
                    {v.label}
                  </Button>
                ))}
              </div>
            </Specimen>
            <Specimen label="Button — sizes sm / md / header">
              <div class="flex flex-wrap items-center gap-4">
                <Button variant="yellow" size="sm" href="#actions">sm</Button>
                <Button variant="yellow" size="md" href="#actions">md</Button>
                <Button variant="black" size="header" href="#actions">
                  header
                </Button>
              </div>
            </Specimen>
            <Specimen label="Button — jumbo dialect (lg / xl × rounded-30 / rounded-50)">
              <div class="flex flex-wrap items-center gap-4">
                <Button
                  variant="black"
                  size="lg"
                  shape="rounded-50"
                  href="#actions"
                >
                  lg · rounded-50
                </Button>
                <Button
                  variant="outline-white"
                  size="xl"
                  shape="rounded-30"
                  href="#actions"
                >
                  xl · rounded-30
                </Button>
                <Button
                  variant="outline-black"
                  size="lg"
                  shape="rounded-30"
                  href="#actions"
                >
                  lg · rounded-30
                </Button>
              </div>
            </Specimen>
          </Group>

          <Group
            id="icons"
            title="Icons"
            intro="components/icons.tsx — the only place that imports lucide-preact / simple-icons."
          >
            <Specimen label="UI glyphs (lucide, stroke)">
              <div class="flex items-center gap-8 text-primary">
                <CloseIcon size={24} />
                <MenuIcon size={24} />
                <ChevronLeftIcon size={30} />
                <ChevronRightIcon size={30} />
                <PlusIcon size={14} />
                <MailIcon size={22} />
              </div>
            </Specimen>
            <Specimen label="Brand glyphs (simple-icons, fill)" dark>
              <div class="flex items-center gap-8 text-white">
                <BrandIcon name="facebook" size={22} />
                <BrandIcon name="instagram" size={22} />
                <BrandIcon name="youtube" size={22} />
                <BrandIcon name="facebook" size={32} />
                <BrandIcon name="instagram" size={32} />
              </div>
            </Specimen>
          </Group>

          <Group id="page-structure" title="Page structure">
            <Specimen label="PageHero — gradient overlay shell (real about-page hero)">
              <PageHero
                image={ABOUT.hero.image}
                imageClass="bg-[position:50%_0]"
              >
                <h1 class="text-center text-[38px] font-bold leading-none text-white md:text-[56px] lg:text-[70px]">
                  {ABOUT.hero.title}
                </h1>
              </PageHero>
            </Specimen>
            <Specimen label="CtaBand">
              <CtaBand
                title={HOME.takeAction.title}
                body={HOME.takeAction.body}
                cta={HOME.takeAction.cta}
              />
            </Specimen>
            <Specimen label="BankCard — light (PH) / dark (US)">
              <div class="grid gap-6 md:grid-cols-2">
                <BankCard title={GIVENOW.ph.bankTransfer.title}>
                  <p class="text-base text-black">
                    {GIVENOW.ph.bankTransfer.accountName}
                  </p>
                  <p class="text-base text-black">
                    {GIVENOW.ph.bankTransfer.accountNumber}
                  </p>
                </BankCard>
                <BankCard tone="dark" title={GIVENOW.us.bankTransfer.title}>
                  <p class="text-base text-light">
                    {GIVENOW.us.bankTransfer.bank}
                  </p>
                  <p class="text-base text-light">
                    {`Account Number:\u00a0${GIVENOW.us.bankTransfer.accountNumber}`}
                  </p>
                </BankCard>
              </div>
            </Specimen>
          </Group>

          <Group id="content" title="Content">
            <Specimen label="Faq (native details/summary)">
              <div class="mx-auto w-full max-w-[750px]">
                <Faq items={CONTACT.faqs} />
              </div>
            </Specimen>
            <Specimen label="PostCard">
              {post && (
                <div class="mx-auto max-w-[540px]">
                  <PostCard post={post} />
                </div>
              )}
            </Specimen>
            <Specimen label="VideoEmbed (lazy YouTube)">
              <div class="mx-auto max-w-[540px]">
                <VideoEmbed
                  id={HOME.careUpdates.video.id}
                  title={HOME.careUpdates.video.title}
                />
              </div>
            </Specimen>
            <Specimen label="MapEmbed">
              <MapEmbed
                src={mapEmbedSrc("favor Church, edsa shangrila")}
                title="Favor Care office location"
              />
            </Specimen>
          </Group>

          <Group id="islands" title="Islands (hydrated)">
            <Specimen label="Carousel — homepage program carousel">
              <Carousel slides={CAROUSEL} label="What we do programs" />
            </Specimen>
            <Specimen label="Slideshow — what-we-do program photos">
              <Slideshow
                images={WHAT_WE_DO.programs[0].slides}
                label="Education photos"
              />
            </Specimen>
            <Specimen label="ContactForm — home variant">
              <div class="rounded-card bg-yellow p-6 text-black [&_a]:text-black">
                <ContactForm newsletter />
              </div>
            </Specimen>
            <Specimen label="Popup — native dialog (Prayer Hub; WP trigger is hidden at every breakpoint, storybook-only)">
              <Popup
                trigger="Open the Prayer Hub popup"
                triggerClass="font-bold text-primary underline"
                title={POPUPS.prayerHub.title}
                cta={POPUPS.prayerHub.cta}
              >
                {POPUPS.prayerHub.body}
              </Popup>
            </Specimen>
            <Specimen label="Popup — chained dialogs (volunteer disclaimer → guidelines, as on get-involved)">
              <Popup
                trigger="Open the volunteer disclaimer"
                triggerClass="font-bold text-primary underline"
                title={POPUPS.volunteer.title}
                cta={POPUPS.volunteer.cta}
                chain={{
                  title: POPUPS.volunteerGuidelines.title,
                  blocks: POPUPS.volunteerGuidelines.blocks,
                  cta: POPUPS.volunteerGuidelines.cta,
                }}
              >
                {POPUPS.volunteer.body}
              </Popup>
            </Specimen>
            <Specimen label="Popup — auto-open once per session (accreditation; fires 1.5s after load, as mounted site-wide in _app at 3s)">
              <Popup
                auto={{
                  delayMs: 1500,
                  sessionKey: "storybook-accreditation-auto",
                }}
                title={POPUPS.accreditation.title}
                cta={POPUPS.accreditation.cta}
              >
                {POPUPS.accreditation.body}
              </Popup>
            </Specimen>
          </Group>

          <Group
            id="forms"
            title="Forms"
            intro="InputField / TextareaField power the ContactForm island (whose two WP-measured SEND dialects are intentionally bespoke)."
          >
            <Specimen label="InputField / TextareaField">
              <div class="mx-auto grid max-w-[540px] gap-4">
                <InputField
                  name="sb-name"
                  placeholder="FIRST NAME"
                  ariaLabel="First name"
                />
                <TextareaField
                  name="sb-message"
                  placeholder="LEAVE US A MESSAGE!"
                  ariaLabel="Message"
                />
                <div class="rounded-card bg-yellow p-5">
                  <InputField
                    size="give-now"
                    name="sb-givenow"
                    placeholder="PROOF OF DONATION"
                    ariaLabel="Proof of donation"
                  />
                </div>
              </div>
            </Specimen>
          </Group>

          <Group
            id="chrome"
            title="Chrome &amp; islands"
            intro="Header, Footer, Navbar and MobileNav render on this page — inspect them live. Popup, Carousel, Slideshow and ContactForm have specimens above."
          >
            <p class="text-sm text-on-surface-variant">
              No specimens in this group — the chrome above and the islands in
              the previous group are the reference.
            </p>
          </Group>
        </div>
      </main>
      <Footer />
    </>
  );
});
