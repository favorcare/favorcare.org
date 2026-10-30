import type { Metadata } from "next";
import type { ReactNode } from "react";

// Primitives
import { cx } from "../../../components/cx.ts";
import { Button } from "../../../components/Button.tsx";
import { Eyebrow } from "../../../components/Eyebrow.tsx";
import { SectionHeading } from "../../../components/layout/SectionHeading.tsx";
import { Container, frame } from "../../../components/layout/Container.tsx";
import { InputField } from "../../../components/InputField.tsx";
import { TextareaField } from "../../../components/TextareaField.tsx";
import { FormField } from "../../../components/FormField.tsx";
import { TaxDeductibleForm } from "../../../components/TaxDeductibleForm.tsx";
import { ChoiceGroup } from "../../../components/ChoiceGroup.tsx";
import { VolunteerSignupForm } from "../../../components/VolunteerSignupForm.tsx";
import { NewsletterForm } from "../../../components/NewsletterForm.tsx";
import { ContactForm } from "../../../components/ContactForm.tsx";
import MailtoForm from "../../../islands/MailtoForm.tsx";

// Page structure
import { PageHero } from "../../../components/PageHero.tsx";
import { HeroLead, PageTitle } from "../../../components/PageTitle.tsx";
import { CtaBand } from "../../../components/CtaBand.tsx";
import { BankCard } from "../../../components/BankCard.tsx";
import { Faq } from "../../../components/Faq.tsx";
import { MapEmbed, mapEmbedSrc } from "../../../components/MapEmbed.tsx";
import { VideoEmbed } from "../../../components/VideoEmbed.tsx";
import { PostCard } from "../../../components/PostCard.tsx";
import { Gallery } from "../../../components/Gallery.tsx";
import { TeamGrid } from "../../../components/TeamGrid.tsx";

// Icons + real content (specimens render with real copy, never lorem)
import {
  BrandIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CoffeeIcon,
  MailIcon,
  MenuIcon,
  PlusIcon,
} from "../../../components/icons.tsx";
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
} from "../../../components/content.ts";
import { CFAC_COLORS, CFAC_CONTRAST_PAIRS } from "../../../components/cfac.ts";
import { CfacFooter } from "../../../components/cfac/Footer.tsx";
import { CfacHeader } from "../../../components/cfac/Header.tsx";
import { listPosts } from "../../../components/posts.ts";
import {
  COLOR_GROUPS,
  CONTRAST_PAIRS,
  contrastRatio,
  RADII,
} from "../../../components/tokens.ts";
import { asset } from "../../../utils/assets.ts";
import { Header } from "../../../components/Header.tsx";
import { Footer } from "../../../components/Footer.tsx";
import { AccreditationPopup } from "../../../components/AccreditationPopup.tsx";
import { AccreditedTooltip } from "../../../components/AccreditedTooltip.tsx";
import { Analytics } from "../../../components/Analytics.tsx";
import Tracking from "../../../islands/Tracking.tsx";
import TrackView from "../../../islands/TrackView.tsx";
import Popup from "../../../islands/Popup.tsx";
import SignupForm from "../../../islands/SignupForm.tsx";
import Carousel from "../../../islands/Carousel.tsx";
import Slideshow from "../../../islands/Slideshow.tsx";

export const metadata: Metadata = {
  title: "Component library — Favor Care",
  robots: { index: false, follow: false },
};

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
  { id: "cfac", label: "CFAC theme" },
  { id: "analytics", label: "Analytics" },
] as const;

function Group({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="border-b border-primary/15 pb-3">
        <h2 className="text-[25px] font-bold leading-none text-primary md:text-[30px]">
          {title}
        </h2>
        {intro && (
          <p className="mt-1 text-sm text-on-surface-variant">{intro}</p>
        )}
      </div>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}

function Specimen({
  label,
  dark,
  children,
}: {
  label: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
        {label}
      </p>
      <div
        className={cx(
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

// Literal class table for the CFAC swatches — Tailwind can't see dynamic
// `bg-${token}` names, same reason Gallery maps literal grid-cols tables.
const CFAC_SWATCH: Record<string, string> = {
  black: "bg-black",
  primary: "bg-primary",
  yellow: "bg-yellow",
  surface: "bg-surface",
  "surface-container": "bg-surface-container",
  "on-surface": "bg-on-surface",
  link: "bg-link",
};

export default function StorybookPage() {
  const post = listPosts()[0];
  // A real multi-photo gallery from the newest post that has one.
  const galleryImages =
    post.blocks
      .flatMap((b) => (b.type === "gallery" ? [b.images] : []))
      .find((images) => images.length > 1) ?? [];
  return (
    <>
      <Header />
      <header className="bg-black px-5 py-10">
        <PageTitle>Component Library</PageTitle>
        <HeroLead measureClass="max-w-[630px]">
          The living catalog behind COMPONENTS.md, BRAND.md and DESIGN.md —
          brand voice, tokens, and every shared component the pages are built
          from, rendered with real content.
        </HeroLead>
      </header>

      <nav
        aria-label="Storybook sections"
        className="sticky top-0 z-20 border-b border-primary/15 bg-white/95 backdrop-blur"
      >
        <ul className={cx(frame("page"), "flex gap-1 overflow-x-auto")}>
          {SECTIONS.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className="inline-flex min-h-12 items-center px-3 text-sm font-semibold text-primary hover:text-link"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className={cx(frame("page"), "pb-24 pt-10")}>
        <div className="space-y-16">
          <Group
            id="brand"
            title="Brand"
            intro="Voice and content style from BRAND.md — read it before writing any user-facing copy. Real people, quotes and numbers come only from content.ts and posts.ts."
          >
            <Specimen label="Identity">
              <dl className="grid gap-4 md:grid-cols-3">
                {BRAND.identity.map((i) => (
                  <div key={i.term}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      {i.term}
                    </dt>
                    <dd className="mt-1 text-lg font-bold leading-snug text-primary">
                      {i.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Specimen>
            <Specimen label="Storytelling approach">
              <ol className="grid gap-4 md:grid-cols-2">
                {BRAND.storytelling.map((s, n) => (
                  <li key={s.title} className="text-base leading-relaxed">
                    <span className="font-bold text-primary">
                      {n + 1}. {s.title}
                    </span>{" "}
                    <span className="text-on-surface">— {s.body}</span>
                  </li>
                ))}
              </ol>
            </Specimen>
            <Specimen label="Engagement arc — every story: reality → hope → ask">
              <ol className="grid gap-3 md:grid-cols-3">
                {BRAND.arc.map((a, n) => (
                  <li
                    key={a.beat}
                    className={cx(
                      "rounded-card p-5",
                      n === 2 ? "bg-yellow text-black" : "bg-surface-container",
                    )}
                  >
                    <p className="text-lg font-bold leading-snug text-primary">
                      “{a.beat}”
                    </p>
                    <p className="mt-1 text-base leading-relaxed text-on-surface">
                      {a.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Specimen>
            <Specimen label="Caption & CTA style (BRAND.md examples — illustrative, not real stories)">
              <div className="grid gap-6 md:grid-cols-2">
                <ul className="space-y-2">
                  {BRAND.captionExamples.map((c) => (
                    <li key={c} className="text-base italic leading-relaxed">
                      “{c}”
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {BRAND.ctaExamples.map((c) => (
                    <li
                      key={c}
                      className="text-base font-bold leading-relaxed text-primary"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Specimen>
            <Specimen label="Rules for writing">
              <ul className="list-disc space-y-1 pl-5 text-base leading-relaxed">
                {BRAND.rules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Specimen>
            <Specimen label="Logo on its three grounds (header yellow, footer black, white)">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex h-32 items-center justify-center rounded-card bg-yellow p-6">
                  <img
                    src={asset("/images/logo-color.png")}
                    alt="Favor Care logo, full color"
                    className="max-h-16 w-auto"
                  />
                </div>
                <div className="flex h-32 items-center justify-center rounded-card bg-black p-6">
                  <img
                    src={asset("/logo-white.svg")}
                    alt="Favor Care logo, white"
                    className="max-h-16 w-auto"
                  />
                </div>
                <div className="flex h-32 items-center justify-center rounded-card border border-primary/15 bg-white p-6">
                  <img
                    src={asset("/logo-black.svg")}
                    alt="Favor Care logo, black"
                    className="max-h-16 w-auto"
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
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {g.tokens.map((t) => (
                    <div key={t.name} className="flex items-center gap-3">
                      <span
                        className={cx(
                          "h-10 w-10 shrink-0 rounded-[10px] border border-primary/15",
                          t.cls,
                        )}
                      />
                      <span className="min-w-0">
                        <code className="block truncate text-sm text-on-surface">
                          {t.name}
                        </code>
                        <code className="block text-xs text-on-surface-variant">
                          {t.hex}
                        </code>
                      </span>
                    </div>
                  ))}
                </div>
              </Specimen>
            ))}
            <Specimen label="Contrast — DESIGN.md's Do's and Don'ts, measured (AA body text needs 4.5:1)">
              <div className="grid gap-3 md:grid-cols-2">
                {CONTRAST_PAIRS.map((p) => {
                  const ratio = contrastRatio(p.fg, p.bg);
                  return (
                    <div
                      key={p.label}
                      className="flex items-stretch overflow-hidden rounded-[10px] border border-primary/15"
                    >
                      <span
                        className={cx(
                          "flex w-28 shrink-0 items-center justify-center text-lg font-bold",
                          p.cls,
                        )}
                      >
                        Aa
                      </span>
                      <span className="flex flex-1 flex-col justify-center px-4 py-2">
                        <span className="text-sm text-on-surface">
                          {p.label}
                        </span>
                        <span
                          className={cx(
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
              <div className="flex flex-wrap gap-6">
                {RADII.map((r) => (
                  <div
                    key={r.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <span className={cx("h-32 w-44 bg-yellow", r.cls)} />
                    <code className="text-sm text-on-surface">
                      {r.name} · {r.value}
                    </code>
                  </div>
                ))}
              </div>
            </Specimen>
            <Specimen label="Type scales (as measured on WP)">
              <div className="space-y-4">
                <p className="text-[38px] font-bold leading-none text-primary md:text-[56px] lg:text-[70px]">
                  Hero 38/56/70
                </p>
                <p className="text-[28px] font-bold leading-none text-primary md:text-[39px] lg:text-[56px]">
                  Section 28/39/56
                </p>
                <p className="text-[25px] font-bold leading-none text-primary md:text-[30px] lg:text-[36px]">
                  Card 25/30/36
                </p>
                <p className="text-lg leading-relaxed text-primary">
                  Body lg — 18px, 1.5 line-height (the accessibility floor).
                </p>
              </div>
            </Specimen>
          </Group>

          <Group id="layout" title="Layout" intro="components/layout/">
            <Specimen label='Container — pad="page" (10px gutters at 768) vs pad="home" (40px)'>
              <div className="space-y-3">
                <Container
                  pad="page"
                  className="border-2 border-dashed border-primary/30 py-3 text-center text-sm"
                >
                  pad="page"
                </Container>
                <Container
                  pad="home"
                  className="border-2 border-dashed border-primary/30 py-3 text-center text-sm"
                >
                  pad="home"
                </Container>
              </div>
            </Specimen>
            <Specimen label="SectionHeading — tone / weight / size / align">
              <div className="space-y-6">
                <SectionHeading title={ABOUT.valuesTitle} align="center" />
                <SectionHeading title={HOME.about.title} weight="semibold" />
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
              <div className="flex flex-wrap items-center gap-4">
                {BUTTON_MATRIX.map((v) => (
                  <Button
                    key={v.variant}
                    variant={v.variant}
                    href="#actions"
                    className={cx(
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
            <Specimen label="Button — transparent variants on the yellow card (outline-primary = home SEND, ghost = give-now SUBMIT; both at size form / lg)">
              <div className="flex flex-wrap items-center gap-4 rounded-card bg-yellow p-6">
                <Button variant="outline-primary" size="form" href="#actions">
                  outline-primary
                </Button>
                <Button variant="black" size="form" href="#actions">
                  black · form
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  shape="rounded-30"
                  href="#actions"
                >
                  ghost
                </Button>
              </div>
            </Specimen>
            <Specimen label="Button — sizes sm / md / header">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="yellow" size="sm" href="#actions">
                  sm
                </Button>
                <Button variant="yellow" size="md" href="#actions">
                  md
                </Button>
                <Button variant="black" size="header" href="#actions">
                  header
                </Button>
              </div>
            </Specimen>
            <Specimen label="Button — jumbo dialect (lg / xl × rounded-30 / rounded-50)">
              <div className="flex flex-wrap items-center gap-4">
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
              <div className="flex items-center gap-8 text-primary">
                <CloseIcon size={24} />
                <MenuIcon size={24} />
                <ChevronLeftIcon size={30} />
                <ChevronRightIcon size={30} />
                <PlusIcon size={14} />
                <MailIcon size={22} />
                <CoffeeIcon size={24} />
              </div>
            </Specimen>
            <Specimen label="Brand glyphs (simple-icons, fill)" dark>
              <div className="flex items-center gap-8 text-white">
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
              <div className="space-y-8">
                <div className="rounded-card bg-primary p-6">
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
              <div className="grid gap-6 md:grid-cols-2">
                <BankCard title={GIVENOW.ph.bankTransfer.title}>
                  <p className="text-base text-black">
                    {GIVENOW.ph.bankTransfer.accountName}
                  </p>
                  <p className="text-base text-black">
                    {GIVENOW.ph.bankTransfer.accountNumber}
                  </p>
                </BankCard>
                <BankCard tone="dark" title={GIVENOW.us.bankTransfer.title}>
                  <p className="text-base text-light">
                    {GIVENOW.us.bankTransfer.bank}
                  </p>
                  <p className="text-base text-light">
                    {`Account Number:\u00a0${GIVENOW.us.bankTransfer.accountNumber}`}
                  </p>
                </BankCard>
              </div>
            </Specimen>
          </Group>

          <Group id="content" title="Content">
            <Specimen label="Faq (native details/summary)">
              <div className="mx-auto w-full max-w-[750px]">
                <Faq items={CONTACT.faqs} />
              </div>
            </Specimen>
            <Specimen label="PostCard">
              {post && (
                <div className="mx-auto max-w-[540px]">
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
              <div className="mx-auto max-w-[540px]">
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
            <Specimen label="SignupForm — the /signup application wired to its Server Action with useActionState (demo: submit disabled so clicks can't reach the live formResponse)">
              <SignupForm
                demo
                copy={{
                  options: SIGNUP.options,
                  privacyNotice: SIGNUP.privacyNotice,
                }}
              />
            </Specimen>
            <Specimen label="Carousel — homepage program carousel">
              <Carousel slides={CAROUSEL} label="What we do programs" />
            </Specimen>
            <Specimen label="Slideshow — what-we-do program photos">
              <Slideshow
                images={WHAT_WE_DO.programs[0].slides}
                label="Education photos"
              />
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
            <Specimen label="AccreditedTooltip — hover the pill (desktop lg+ only; wraps the Header DONATE)">
              <div className="pb-28">
                <AccreditedTooltip>
                  <Button variant="black" size="header" href="/givenow">
                    DONATE
                  </Button>
                </AccreditedTooltip>
              </div>
            </Specimen>
            <Specimen label="AccreditationPopup — WP 7281 layout on the Popup accreditation variant, auto-open once per session (fires 1.5s after load here; site-wide in the (site) layout at 3s)">
              <AccreditationPopup
                auto={{
                  delayMs: 1500,
                  sessionKey: "storybook-accreditation-auto",
                }}
              />
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
            intro="FormField wraps InputField / TextareaField in ContactForm, NewsletterForm and TaxDeductibleForm, which all submit through the MailtoForm island (components/mailto.ts composes the email); ChoiceGroup + VolunteerSignupForm build the /signup volunteer application."
          >
            <Specimen label="InputField / TextareaField">
              <div className="mx-auto grid max-w-[540px] gap-4">
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
                <div className="rounded-card bg-yellow p-5">
                  <InputField
                    size="give-now"
                    name="sb-givenow"
                    placeholder="PROOF OF DONATION"
                    ariaLabel="Proof of donation"
                  />
                </div>
              </div>
            </Specimen>
            <Specimen label="FormField — tone (black / white / primary) × size (sm / base) and the mobile label split (resize across md)">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-card bg-yellow p-4">
                  <FormField
                    label="FIRST NAME"
                    labelMobile="FIRST NAME*"
                    tone="black"
                  >
                    <InputField
                      name="sb-ff-black"
                      placeholder="First Name*"
                      ariaLabel="First name"
                      className="w-full"
                    />
                  </FormField>
                </div>
                <div className="rounded-card bg-black p-4">
                  <FormField label="EMAIL ADDRESS" tone="white" size="base">
                    <InputField
                      name="sb-ff-white"
                      placeholder="Email*"
                      ariaLabel="Email address"
                      className="w-full"
                    />
                  </FormField>
                </div>
                <div className="rounded-card bg-yellow p-4">
                  <FormField label="CONTACT NAME" tone="primary" size="base">
                    <InputField
                      name="sb-ff-primary"
                      placeholder="Contact Name"
                      ariaLabel="Contact name"
                      className="w-full"
                    />
                  </FormField>
                </div>
              </div>
            </Specimen>
            <Specimen label="ChoiceGroup — radio / checkbox columns / other-with-text">
              <div className="mx-auto grid max-w-[750px] gap-8">
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
                recipient={CONTACT.form.recipient}
                subject={CONTACT.newsletter.subject}
              />
            </Specimen>
            <Specimen label="MailtoForm — the bare submit seam under every form here: labeled fields in, mailto: out (subject = prefix + name inputs; action= stays as the no-JS fallback)">
              <MailtoForm
                recipient={CONTACT.form.recipient}
                subject={{
                  prefix: CONTACT.form.subjectPrefix,
                  nameFields: ["first-name"],
                }}
                labels={{ "first-name": "Name", email: "Email" }}
                className="mx-auto flex max-w-[400px] flex-col gap-4"
              >
                <FormField label="FIRST NAME">
                  <InputField
                    name="first-name"
                    placeholder="FIRST NAME"
                    ariaLabel="First name"
                    className="w-full"
                  />
                </FormField>
                <FormField label="EMAIL">
                  <InputField
                    type="email"
                    name="email"
                    placeholder="EMAIL"
                    ariaLabel="Email"
                    className="w-full"
                  />
                </FormField>
                <Button type="submit" variant="black" size="form">
                  SEND
                </Button>
              </MailtoForm>
            </Specimen>
            <Specimen label="ContactForm — home variant (MailtoForm: SEND opens an email to the inbox with the typed fields)">
              <div className="rounded-card bg-yellow p-6 text-black [&_a]:text-black">
                <ContactForm newsletter />
              </div>
            </Specimen>
            <Specimen label="ContactForm — contact-page variant (48px fields, WP labels and the mobile * split, black SEND)">
              <ContactForm page="contact" />
            </Specimen>
            <Specimen label="TaxDeductibleForm — the give-now tax card (59px borderless fields, ghost SUBMIT; emails finance@)">
              <TaxDeductibleForm {...GIVENOW.ph.taxDeductible} />
            </Specimen>
            <Specimen label="VolunteerSignupForm — the /signup application (demo: submit disabled so clicks can't reach the live formResponse)">
              <VolunteerSignupForm
                demo
                copy={{
                  options: SIGNUP.options,
                  privacyNotice: SIGNUP.privacyNotice,
                }}
              />
            </Specimen>
          </Group>

          <Group
            id="chrome"
            title="Chrome &amp; islands"
            intro="Header (with Navbar on desktop and MobileNav below md) and Footer render on this page — inspect them live, and resize below 768px for MobileNav. Popup, Carousel and Slideshow have specimens above; MailtoForm is the submit seam under every form specimen."
          >
            <p className="text-sm text-on-surface-variant">
              No specimens in this group — the chrome above and the islands in
              the previous group are the reference.
            </p>
          </Group>

          {/* The Coffee for a Cause sub-brand: everything renders inside
              a live `.cfac` scope, so these specimens show exactly what
              /coffeeforacause sees. */}
          <Group
            id="cfac"
            title="CFAC theme"
            intro="The Coffee for a Cause sub-brand (routes/coffeeforacause/): a scoped token override in assets/styles.css re-skins the shared catalog inside any .cfac wrapper — no component edits, no hardcoded hex. PLACEHOLDER palette pending the brand kit; DESIGN.md 'Sub-brand themes' documents the mechanism, cfac_test.ts gates the contrast."
          >
            <div className="cfac space-y-6">
              <Specimen label="Scoped palette (CFAC_COLORS — utilities resolve through the scope, hexes from the override block)">
                <ul className="flex flex-wrap gap-5">
                  {CFAC_COLORS.map((c) => (
                    <li key={c.token} className="flex items-center gap-3">
                      <span
                        className={cx(
                          "inline-block h-12 w-12 rounded-full border border-primary/15",
                          CFAC_SWATCH[c.token],
                        )}
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-snug">
                        <span className="block font-bold text-primary">
                          {c.token}
                        </span>
                        <span className="text-on-surface-variant">{c.hex}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Specimen>
              <Specimen label="Contrast (measured on the scoped pairs — the test enforces every one at AA)">
                <ul className="grid gap-2 md:grid-cols-2">
                  {CFAC_CONTRAST_PAIRS.map((p) => (
                    <li
                      key={p.label}
                      className="flex items-center justify-between gap-3 rounded-card bg-surface-container-lowest px-4 py-2 text-sm"
                    >
                      <span className="text-on-surface">{p.label}</span>
                      <span className="font-bold text-primary">
                        {contrastRatio(p.fg, p.bg).toFixed(2)}:1
                      </span>
                    </li>
                  ))}
                </ul>
              </Specimen>
              <Specimen label="Buttons — the shared catalog, re-skinned by the scope">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="yellow" size="md">
                    DONATE
                  </Button>
                  <Button variant="black" size="md">
                    Back to the campaign
                  </Button>
                  <Button variant="outline-black" size="md">
                    favorcare.org
                  </Button>
                </div>
              </Specimen>
              <Specimen label="Type & labels in scope (Eyebrow, SectionHeading, links)">
                <div className="space-y-3">
                  <Eyebrow>A fundraising campaign of Favor Care</Eyebrow>
                  <SectionHeading
                    title="One cup can change a story."
                    size="card"
                  />
                  <p className="text-base">
                    <a href="#cfac">A roast-toned link</a> hovers to caramel,
                    like the site's red→yellow pair.
                  </p>
                </div>
              </Specimen>
              <Specimen label="Campaign chrome — CfacHeader / CfacFooter render inside the scope exactly as on /coffeeforacause">
                <div className="overflow-hidden rounded-[10px]">
                  <CfacHeader />
                  <div className="bg-surface p-5 text-sm text-on-surface-variant">
                    …page content…
                  </div>
                  <CfacFooter />
                </div>
              </Specimen>
              <Specimen label="TrackView — fires a named event once on mount (the thanks-page conversion seam; renders nothing)">
                <div className="flex items-center gap-4">
                  <TrackView
                    event="storybook_demo_view"
                    props={{ source: "storybook" }}
                  />
                  <p className="max-w-[520px] text-sm text-on-surface-variant">
                    This specimen mounted <code>storybook_demo_view</code> on
                    page load — watch for it in Mixpanel Live view / GA4
                    DebugView when keys are set. On /coffeeforacause/thanks it
                    fires <code>cfac_donate_success</code>.
                  </p>
                </div>
              </Specimen>
            </div>
          </Group>

          <Group
            id="analytics"
            title="Analytics"
            intro="components/Analytics.tsx + islands/Tracking.tsx — invisible chrome, mounted site-wide in app/layout.tsx. GA4, Mixpanel and Cloudflare Web Analytics snippets render only when their keys are set (.env.production / .env.local — see DEVELOPMENT.md, section Analytics & UTM tracking)."
          >
            <Specimen label="Analytics + Tracking — this page mounts both, so tracking behaves here exactly as on a real page (Analytics renders nothing visible; with keys set its snippets + island are in the DOM)">
              <div className="flex flex-wrap items-center gap-6">
                <Analytics />
                <Tracking />
                <Button
                  variant="yellow"
                  size="md"
                  href="#analytics"
                  track="storybook_demo_click"
                  trackProps={{ source: "storybook" }}
                >
                  Track a demo click
                </Button>
                <p className="max-w-[480px] text-sm text-on-surface-variant">
                  Clicking fires <code>storybook_demo_click</code> with
                  first/last-touch UTM props. Watch it in Mixpanel Live view /
                  GA4 DebugView when keys are set, or call{" "}
                  <code>{'favorcareTrack("demo", { note: "hi" })'}</code> in the
                  console.
                </p>
              </div>
            </Specimen>
          </Group>
        </div>
      </main>
      <Footer />
    </>
  );
}
