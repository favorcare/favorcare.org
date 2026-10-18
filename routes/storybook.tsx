import type { ComponentChildren } from "preact";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";

// Primitives
import { cx } from "../components/cx.ts";
import { Button } from "../components/Button.tsx";
import { Eyebrow } from "../components/Eyebrow.tsx";
import { SectionHeading } from "../components/layout/SectionHeading.tsx";
import { Container, frame } from "../components/layout/Container.tsx";
import { InputField } from "../components/InputField.tsx";
import { TextareaField } from "../components/TextareaField.tsx";
import { ChoiceGroup } from "../components/ChoiceGroup.tsx";
import { VolunteerSignupForm } from "../components/VolunteerSignupForm.tsx";
import { NewsletterForm } from "../components/NewsletterForm.tsx";

// Page structure
import { PageHero } from "../components/PageHero.tsx";
import { HeroLead, PageTitle } from "../components/PageTitle.tsx";
import { CtaBand } from "../components/CtaBand.tsx";
import { BankCard } from "../components/BankCard.tsx";
import { Faq } from "../components/Faq.tsx";
import { MapEmbed, mapEmbedSrc } from "../components/MapEmbed.tsx";
import { VideoEmbed } from "../components/VideoEmbed.tsx";
import { PostCard } from "../components/PostCard.tsx";
import { Gallery } from "../components/Gallery.tsx";
import { TeamGrid } from "../components/TeamGrid.tsx";

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
  BRAND,
  CAROUSEL,
  CONTACT,
  GET_INVOLVED,
  GIVENOW,
  HOME,
  POPUPS,
  SIGNUP,
  WHAT_WE_DO,
} from "../components/content.ts";
import { listPosts } from "../components/posts.ts";
import {
  COLOR_GROUPS,
  CONTRAST_PAIRS,
  contrastRatio,
  RADII,
} from "../components/tokens.ts";
import { asset } from "../utils/assets.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import Popup from "../islands/Popup.tsx";
import Carousel from "../islands/Carousel.tsx";
import Slideshow from "../islands/Slideshow.tsx";
import ContactForm from "../islands/ContactForm.tsx";

// The living component catalog and brand reference. Every component the
// real pages are built from has a specimen here; COMPONENTS.md is the
// written reference and this page is its executable counterpart, with
// BRAND.md (voice) and DESIGN.md (tokens) rendered up front. When you add
// a component, add its specimen in the same change — storybook_test.ts
// fails otherwise.

// Jump-nav targets, in page order (each matches a Group id below).
const SECTIONS = [
  { id: "brand", label: "Brand" },
  { id: "tokens", label: "Tokens" },
  { id: "layout", label: "Layout" },
  { id: "actions", label: "Actions" },
  { id: "icons", label: "Icons" },
  { id: "page-structure", label: "Page structure" },
  { id: "content", label: "Content" },
  { id: "islands", label: "Islands" },
  { id: "forms", label: "Forms" },
  { id: "chrome", label: "Chrome" },
] as const;

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
  // A real multi-photo gallery from the newest post that has one.
  const galleryImages = post.blocks.flatMap((b) =>
    b.type === "gallery" ? [b.images] : []
  ).find((images) =>
    images.length > 1
  ) ?? [];
  return (
    <>
      <Head>
        <title>Component library — Favor Care</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Header />
      <header class="bg-black px-5 py-10">
        <PageTitle>Component Library</PageTitle>
        <HeroLead measureClass="max-w-[630px]">
          The living catalog behind COMPONENTS.md, BRAND.md and DESIGN.md —
          brand voice, tokens, and every shared component the pages are built
          from, rendered with real content.
        </HeroLead>
      </header>

      <nav
        aria-label="Storybook sections"
        class="sticky top-0 z-20 border-b border-primary/15 bg-white/95 backdrop-blur"
      >
        <ul class={cx(frame("page"), "flex gap-1 overflow-x-auto")}>
          {SECTIONS.map((s) => (
            <li key={s.id} class="shrink-0">
              <a
                href={`#${s.id}`}
                class="inline-flex min-h-12 items-center px-3 text-sm font-semibold text-primary hover:text-link"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main class={cx(frame("page"), "pb-24 pt-10")}>
        <div class="space-y-16">
          <Group
            id="brand"
            title="Brand"
            intro="Voice and content style from BRAND.md — read it before writing any user-facing copy. Real people, quotes and numbers come only from content.ts and posts.ts."
          >
            <Specimen label="Identity">
              <dl class="grid gap-4 md:grid-cols-3">
                {BRAND.identity.map((i) => (
                  <div key={i.term}>
                    <dt class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      {i.term}
                    </dt>
                    <dd class="mt-1 text-lg font-bold leading-snug text-primary">
                      {i.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Specimen>
            <Specimen label="Storytelling approach">
              <ol class="grid gap-4 md:grid-cols-2">
                {BRAND.storytelling.map((s, n) => (
                  <li key={s.title} class="text-base leading-relaxed">
                    <span class="font-bold text-primary">
                      {n + 1}. {s.title}
                    </span>{" "}
                    <span class="text-on-surface">— {s.body}</span>
                  </li>
                ))}
              </ol>
            </Specimen>
            <Specimen label="Engagement arc — every story: reality → hope → ask">
              <ol class="grid gap-3 md:grid-cols-3">
                {BRAND.arc.map((a, n) => (
                  <li
                    key={a.beat}
                    class={cx(
                      "rounded-card p-5",
                      n === 2 ? "bg-yellow text-black" : "bg-surface-container",
                    )}
                  >
                    <p class="text-lg font-bold leading-snug text-primary">
                      “{a.beat}”
                    </p>
                    <p class="mt-1 text-base leading-relaxed text-on-surface">
                      {a.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Specimen>
            <Specimen label="Caption & CTA style (BRAND.md examples — illustrative, not real stories)">
              <div class="grid gap-6 md:grid-cols-2">
                <ul class="space-y-2">
                  {BRAND.captionExamples.map((c) => (
                    <li key={c} class="text-base italic leading-relaxed">
                      “{c}”
                    </li>
                  ))}
                </ul>
                <ul class="space-y-2">
                  {BRAND.ctaExamples.map((c) => (
                    <li
                      key={c}
                      class="text-base font-bold leading-relaxed text-primary"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Specimen>
            <Specimen label="Rules for writing">
              <ul class="list-disc space-y-1 pl-5 text-base leading-relaxed">
                {BRAND.rules.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </Specimen>
            <Specimen label="Logo on its three grounds (header yellow, footer black, white)">
              <div class="grid gap-4 md:grid-cols-3">
                <div class="flex h-32 items-center justify-center rounded-card bg-yellow p-6">
                  <img
                    src={asset("/images/logo-color.png")}
                    alt="Favor Care logo, full color"
                    class="max-h-16 w-auto"
                  />
                </div>
                <div class="flex h-32 items-center justify-center rounded-card bg-black p-6">
                  <img
                    src={asset("/logo-white.svg")}
                    alt="Favor Care logo, white"
                    class="max-h-16 w-auto"
                  />
                </div>
                <div class="flex h-32 items-center justify-center rounded-card border border-primary/15 bg-white p-6">
                  <img
                    src={asset("/logo-black.svg")}
                    alt="Favor Care logo, black"
                    class="max-h-16 w-auto"
                  />
                </div>
              </div>
            </Specimen>
          </Group>

          <Group
            id="tokens"
            title="Design tokens"
            intro="Defined in assets/styles.css @theme and documented in DESIGN.md — use these, never hardcoded hex. tokens_test.ts keeps this list in sync with @theme."
          >
            {COLOR_GROUPS.map((g) => (
              <Specimen key={g.title} label={g.title}>
                <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {g.tokens.map((t) => (
                    <div key={t.name} class="flex items-center gap-3">
                      <span
                        class={cx(
                          "h-10 w-10 shrink-0 rounded-[10px] border border-primary/15",
                          t.cls,
                        )}
                      />
                      <span class="min-w-0">
                        <code class="block truncate text-sm text-on-surface">
                          {t.name}
                        </code>
                        <code class="block text-xs text-on-surface-variant">
                          {t.hex}
                        </code>
                      </span>
                    </div>
                  ))}
                </div>
              </Specimen>
            ))}
            <Specimen label="Contrast — DESIGN.md's Do's and Don'ts, measured (AA body text needs 4.5:1)">
              <div class="grid gap-3 md:grid-cols-2">
                {CONTRAST_PAIRS.map((p) => {
                  const ratio = contrastRatio(p.fg, p.bg);
                  return (
                    <div
                      key={p.label}
                      class="flex items-stretch overflow-hidden rounded-[10px] border border-primary/15"
                    >
                      <span
                        class={cx(
                          "flex w-28 shrink-0 items-center justify-center text-lg font-bold",
                          p.cls,
                        )}
                      >
                        Aa
                      </span>
                      <span class="flex flex-1 flex-col justify-center px-4 py-2">
                        <span class="text-sm text-on-surface">{p.label}</span>
                        <span
                          class={cx(
                            "text-sm font-bold",
                            p.intent === "do" ? "text-primary" : "text-error",
                          )}
                        >
                          {ratio.toFixed(2)}:1 —{" "}
                          {p.intent === "do" ? "Do" : "Don't"}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </Specimen>
            <Specimen label="Radii — square system, plus the measured rounds">
              <div class="flex flex-wrap gap-6">
                {RADII.map((r) => (
                  <div key={r.name} class="flex flex-col items-center gap-2">
                    <span class={cx("h-32 w-44 bg-yellow", r.cls)} />
                    <code class="text-sm text-on-surface">
                      {r.name} · {r.value}
                    </code>
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
                <Container
                  pad="page"
                  class="border-2 border-dashed border-primary/30 py-3 text-center text-sm"
                >
                  pad="page"
                </Container>
                <Container
                  pad="home"
                  class="border-2 border-dashed border-primary/30 py-3 text-center text-sm"
                >
                  pad="home"
                </Container>
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
            <Specimen label="PageHero + PageTitle + HeroLead — gradient overlay shell (real about-page hero)">
              <PageHero
                image={ABOUT.hero.image}
                imageClass="bg-[position:50%_0]"
              >
                <PageTitle>{ABOUT.hero.title}</PageTitle>
                <HeroLead measureClass="max-w-[260px] md:max-w-[460px] lg:max-w-[630px]">
                  {ABOUT.hero.body}
                </HeroLead>
              </PageHero>
            </Specimen>
            <Specimen label='PageTitle — weight="semibold-md-bold" (get-involved, signup) / tone="primary" size="contact" (contact)'>
              <div class="space-y-8">
                <div class="rounded-card bg-primary p-6">
                  <PageTitle weight="semibold-md-bold">
                    {GET_INVOLVED.hero.title}
                  </PageTitle>
                  <HeroLead>{GET_INVOLVED.hero.subtitle}</HeroLead>
                </div>
                <PageTitle tone="primary" size="contact">
                  {CONTACT.heroTitle}
                </PageTitle>
              </div>
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
            <Specimen label='Gallery variant="tiles" — who-we-are 2×2 (mobileOrder [2,4,1,3] applies below md)'>
              <Gallery
                variant="tiles"
                images={ABOUT.gallery}
                mobileOrder={[2, 4, 1, 3]}
              />
            </Specimen>
            <Specimen label='Gallery variant="article" — post photos, columns by count (real post gallery)'>
              <Gallery
                variant="article"
                images={galleryImages.map((src) => ({ src, alt: "" }))}
              />
            </Specimen>
            <Specimen label="TeamGrid — who-we-are team (real members)">
              <TeamGrid members={ABOUT.team.members} />
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
            <Specimen label="Popup — auto-open every visit + closesPopup CTA (the /signup commitment gate: the guidelines must be agreed before the form; the trigger here stands in for the auto-open)">
              <Popup
                trigger="Open the volunteer commitment gate"
                triggerClass="font-bold text-primary underline"
                title={POPUPS.volunteerGuidelines.title}
                blocks={POPUPS.volunteerGuidelines.blocks}
                cta={SIGNUP.gateCta}
              />
            </Specimen>
          </Group>

          <Group
            id="forms"
            title="Forms"
            intro="InputField / TextareaField power the ContactForm island (whose two WP-measured SEND dialects are intentionally bespoke) and the NewsletterForm; ChoiceGroup + VolunteerSignupForm build the /signup volunteer application."
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
            <Specimen label="ChoiceGroup — radio / checkbox columns / other-with-text">
              <div class="mx-auto grid max-w-[750px] gap-8">
                <ChoiceGroup
                  legend="Gender"
                  name="sb-gender"
                  options={SIGNUP.options.gender}
                  required
                />
                <ChoiceGroup
                  legend="Which areas would you want to serve?"
                  name="sb-areas"
                  options={SIGNUP.options.serveAreas}
                  mode="checkbox"
                  required
                  columns
                />
                <ChoiceGroup
                  legend="How did you know about Favor Care?"
                  name="sb-hear"
                  options={SIGNUP.options.hearAbout}
                  required
                  other={{ name: "sb-hear-other" }}
                />
              </div>
            </Specimen>
            <Specimen
              label="NewsletterForm — the contact page's Carers Newsletter (48px inputs and black-on-yellow submit: deliberate a11y fixes over WP)"
              dark
            >
              <NewsletterForm
                title={CONTACT.newsletter.title}
                fields={CONTACT.newsletter.fields}
                cta={CONTACT.newsletter.cta}
                action={`mailto:${CONTACT.form.recipient}`}
              />
            </Specimen>
            <Specimen label="VolunteerSignupForm — the /signup application (demo: submit disabled so clicks can't reach the live formResponse)">
              <VolunteerSignupForm demo />
            </Specimen>
          </Group>

          <Group
            id="chrome"
            title="Chrome &amp; islands"
            intro="Header (with Navbar on desktop and MobileNav below md) and Footer render on this page — inspect them live, and resize below 768px for MobileNav. Popup, Carousel, Slideshow and ContactForm have specimens above."
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
