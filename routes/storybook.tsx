import type { ComponentChildren } from "preact";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";

// Primitives
import { Button } from "../components/Button.tsx";
import { Badge } from "../components/Badge.tsx";
import { Eyebrow } from "../components/Eyebrow.tsx";
import { cx } from "../components/cx.ts";
import { Container } from "../components/layout/Container.tsx";
import { Section } from "../components/layout/Section.tsx";
import { SectionHeading } from "../components/layout/SectionHeading.tsx";
import { Stat } from "../components/Stat.tsx";
import { Checklist } from "../components/Checklist.tsx";
import { Card } from "../components/Card.tsx";
import { ProgramCard } from "../components/ProgramCard.tsx";
import { FeatureCard } from "../components/FeatureCard.tsx";
import { ProgressBar } from "../components/ProgressBar.tsx";
import { InputField } from "../components/InputField.tsx";

// Navigation + chrome
import { Navbar } from "../components/Navbar.tsx";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { FooterLinkList } from "../components/FooterLinkList.tsx";
import { NAV, UTILITY_LINKS } from "../components/navigation.ts";

// Media
import { Gallery } from "../components/Gallery.tsx";
import { TestimonialCard } from "../components/TestimonialCard.tsx";
import { TestimonialGrid } from "../components/TestimonialGrid.tsx";

// Page sections
import { Hero } from "../components/sections/Hero.tsx";
import { Stats } from "../components/sections/Stats.tsx";
import { Mission } from "../components/sections/Mission.tsx";
import { Campaign } from "../components/sections/Campaign.tsx";
import { Programs } from "../components/sections/Programs.tsx";
import { Impact } from "../components/sections/Impact.tsx";
import { GetInvolved } from "../components/sections/GetInvolved.tsx";
import { DonateCTA } from "../components/sections/DonateCTA.tsx";
import { Newsletter } from "../components/sections/Newsletter.tsx";

// Real homepage content (sections render with actual copy)
import {
  CAMPAIGN,
  DONATE_CTA,
  HERO,
  IMPACT,
  MISSION,
  NEWSLETTER,
  PROGRAMS,
  STATS,
  WAYS_TO_HELP,
} from "../components/content.ts";

// --- Sample data for components not on the homepage --------------------------

const SAMPLE_GALLERY = [
  { alt: "Students at Redemptio", caption: "First day of classes" },
  { alt: "CIW care packs", caption: "Packing day" },
  { alt: "Medical mission", caption: "Quezon Province clinic" },
  { alt: "Typhoon response", caption: "Relief distribution" },
  { alt: "Community feeding", caption: "Saturday program" },
  { alt: "Graduation", caption: "Class of 2025" },
];

const SAMPLE_TESTIMONIALS = [
  {
    quote:
      "Before Redemptio, I never thought I’d learn to read. Now I help my little sister with her homework.",
    name: "Maria",
    role: "Student, Redemptio",
  },
  {
    quote: "The care pack reminded me I wasn’t forgotten.",
    name: "Ate Rosa",
    role: "CIW recipient",
  },
  {
    quote: "We sponsored a classroom and watched it fill with kids in a month.",
    name: "The Dela Cruz Family",
    role: "Corporate partners",
  },
];

// --- Catalog chrome ----------------------------------------------------------

const CATEGORIES = [
  { id: "tokens", label: "Design tokens" },
  { id: "layout", label: "Layout" },
  { id: "content", label: "Content" },
  { id: "actions", label: "Actions" },
  { id: "cards", label: "Cards" },
  { id: "data", label: "Data display" },
  { id: "forms", label: "Forms" },
  { id: "navigation", label: "Navigation" },
  { id: "media", label: "Media" },
  { id: "sections", label: "Page sections" },
];

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
      <div class="border-b border-outline-variant/40 pb-3">
        <h2 class="text-2xl font-bold tracking-tight text-on-surface">
          {title}
        </h2>
        {intro && <p class="mt-1 text-sm text-on-surface-variant">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function Specimen(
  { title, description, children, bleed }: {
    title: string;
    description?: string;
    children: ComponentChildren;
    bleed?: boolean;
  },
) {
  return (
    <div class="border-b border-outline-variant/40 py-8 last:border-b-0">
      <div class="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 class="font-mono text-base font-semibold text-on-surface">
          {title}
        </h3>
        {description && (
          <p class="text-sm text-on-surface-variant">{description}</p>
        )}
      </div>
      <div
        class={cx(
          !bleed &&
            "rounded-lg border border-outline-variant/40 bg-surface-dim/50 p-6",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Swatch({ name }: { name: string }) {
  return (
    <div>
      <div
        class="h-16 rounded-md border border-outline-variant/40"
        style={{ backgroundColor: `var(--color-${name})` }}
      />
      <p class="mt-1.5 font-mono text-xs text-on-surface-variant">{name}</p>
    </div>
  );
}

// --- Page --------------------------------------------------------------------

export default define.page(function Storybook() {
  return (
    <>
      <Head>
        <title>Component Library — Favor Care</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div class="min-h-screen bg-surface text-on-surface">
        {/* Top bar */}
        <header class="sticky top-0 z-40 border-b border-outline-variant/40 bg-surface/90 backdrop-blur">
          <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-primary">
                Favor Care
              </p>
              <h1 class="text-lg font-bold tracking-tight">
                Component Library
              </h1>
            </div>
            <a
              href="/"
              class="text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
            >
              ← Back to site
            </a>
          </div>
        </header>

        <div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-[200px_1fr]">
          {/* Sidebar */}
          <aside class="hidden lg:block">
            <nav class="sticky top-24 space-y-1" aria-label="Catalog">
              {CATEGORIES.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  class="block rounded px-3 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"
                >
                  {c.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <main class="min-w-0 space-y-16">
            <Group
              id="tokens"
              title="Design tokens"
              intro="Single source of truth lives in DESIGN.md, mirrored to assets/styles.css."
            >
              <Specimen
                title="Color — primary & actions"
                description="Gold is reserved for high-priority CTAs."
              >
                <div class="grid grid-cols-3 gap-4 sm:grid-cols-6">
                  {[
                    "primary",
                    "primary-hover",
                    "primary-active",
                    "primary-container",
                    "on-primary",
                    "on-primary-container",
                  ].map((n) => <Swatch key={n} name={n} />)}
                </div>
              </Specimen>

              <Specimen title="Color — secondary & tertiary">
                <div class="grid grid-cols-3 gap-4 sm:grid-cols-6">
                  {[
                    "secondary",
                    "secondary-container",
                    "on-secondary-container",
                    "tertiary",
                    "on-tertiary",
                    "error",
                  ].map((n) => <Swatch key={n} name={n} />)}
                </div>
              </Specimen>

              <Specimen title="Color — surfaces & text">
                <div class="grid grid-cols-3 gap-4 sm:grid-cols-6">
                  {[
                    "surface",
                    "surface-bright",
                    "surface-dim",
                    "surface-container-low",
                    "surface-container",
                    "surface-container-high",
                    "on-surface",
                    "on-surface-variant",
                    "outline",
                    "outline-variant",
                  ].map((n) => <Swatch key={n} name={n} />)}
                </div>
              </Specimen>

              <Specimen title="Radius scale">
                <div class="flex flex-wrap items-end gap-6">
                  {[
                    ["sm", "rounded-sm"],
                    ["DEFAULT", "rounded"],
                    ["md", "rounded-md"],
                    ["lg", "rounded-lg"],
                    ["xl", "rounded-xl"],
                    ["full", "rounded-full"],
                  ].map(([name, cls]) => (
                    <div key={name} class="text-center">
                      <div
                        class={cx("h-14 w-14 bg-primary", cls)}
                      />
                      <p class="mt-1.5 font-mono text-xs text-on-surface-variant">
                        {name}
                      </p>
                    </div>
                  ))}
                </div>
              </Specimen>

              <Specimen title="Elevation">
                <div class="flex flex-wrap gap-6">
                  {[
                    ["sm", "shadow-sm"],
                    ["md", "shadow-md"],
                    ["lg", "shadow-lg"],
                    ["glow", "shadow-glow"],
                  ].map(([name, cls]) => (
                    <div key={name} class="text-center">
                      <div
                        class={cx(
                          "h-14 w-24 rounded-lg bg-surface",
                          cls,
                        )}
                      />
                      <p class="mt-1.5 font-mono text-xs text-on-surface-variant">
                        {name}
                      </p>
                    </div>
                  ))}
                </div>
              </Specimen>

              <Specimen title="Type scale" description="Inter, 12–70px.">
                <div class="space-y-3">
                  <p class="text-[70px] leading-[78px] font-bold tracking-[-0.04em]">
                    Display 70
                  </p>
                  <p class="text-[40px] leading-[48px] font-semibold tracking-[-0.02em]">
                    Headline LG 40
                  </p>
                  <p class="text-[28px] leading-[36px] font-semibold tracking-[-0.01em]">
                    Headline MD 28
                  </p>
                  <p class="text-xl font-semibold">Title LG 20</p>
                  <p class="text-lg leading-relaxed">Body LG 18</p>
                  <p class="text-base leading-relaxed">Body MD 16</p>
                  <p class="text-sm font-semibold tracking-wide">Label MD 14</p>
                  <p class="text-xs font-medium tracking-wide">Label SM 12</p>
                </div>
              </Specimen>
            </Group>

            <Group
              id="layout"
              title="Layout"
              intro="The frame every page composes from."
            >
              <Specimen
                title="<Container>"
                description="max-w-7xl · 24px gutters"
              >
                <div class="rounded border border-dashed border-outline-variant">
                  <Container>
                    <div class="rounded bg-primary-container/60 p-4 text-center text-xs font-semibold text-on-primary-container">
                      Container
                    </div>
                  </Container>
                </div>
              </Specimen>

              <Specimen
                title="<Section tone=…>"
                description="5 background presets."
              >
                <div class="space-y-2">
                  <Section tone="default">
                    <div class="p-4 text-sm">default</div>
                  </Section>
                  <Section tone="dim">
                    <div class="p-4 text-sm">dim</div>
                  </Section>
                  <Section tone="dark">
                    <div class="p-4 text-sm">dark</div>
                  </Section>
                  <Section tone="primary">
                    <div class="p-4 text-sm text-on-primary">primary</div>
                  </Section>
                  <Section tone="hero">
                    <div class="p-4 text-sm">hero</div>
                  </Section>
                </div>
              </Specimen>

              <Specimen
                title="<SectionHeading>"
                description="eyebrow + title + subtitle."
              >
                <div class="space-y-8">
                  <SectionHeading
                    eyebrow="Stories & impact"
                    title="Real lives. Measurable change."
                    subtitle="Left-aligned, the default for narrative sections."
                  />
                  <SectionHeading
                    align="center"
                    title="Centered heading"
                    subtitle="For symmetric, centered sections."
                  />
                </div>
              </Specimen>
            </Group>

            <Group id="content" title="Content">
              <Specimen
                title="<Eyebrow>"
                description="Tones: primary · container · muted · inverse."
              >
                <div class="flex flex-wrap items-center gap-6">
                  <Eyebrow>Primary</Eyebrow>
                  <Eyebrow tone="container">Container</Eyebrow>
                  <Eyebrow tone="muted">Muted</Eyebrow>
                  <span class="bg-on-surface px-3 py-2">
                    <Eyebrow tone="inverse">Inverse</Eyebrow>
                  </span>
                </div>
              </Specimen>

              <Specimen
                title="<Badge>"
                description="primary · secondary · neutral."
              >
                <div class="flex flex-wrap items-center gap-3">
                  <Badge>Education</Badge>
                  <Badge variant="secondary">Prayer Hub</Badge>
                  <Badge variant="neutral">Draft</Badge>
                </div>
              </Specimen>

              <Specimen title="<Stat>" description="on-dark vs default.">
                <div class="space-y-6">
                  <div class="rounded-lg bg-on-surface p-6">
                    <div class="grid grid-cols-3 gap-6">
                      <Stat
                        value="185"
                        label="Students at Redemptio"
                        tone="on-dark"
                      />
                      <Stat
                        value="1,000+"
                        label="CIW care packs / yr"
                        tone="on-dark"
                      />
                      <Stat
                        value="12"
                        label="Communities served"
                        tone="on-dark"
                      />
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-6">
                    <Stat
                      value="8 yrs"
                      label="Of faithful service"
                      tone="default"
                    />
                    <Stat value="90%+" label="To programs" tone="default" />
                    <Stat value="₱50M" label="Campaign goal" tone="default" />
                  </div>
                </div>
              </Specimen>

              <Specimen title="<Checklist>">
                <Checklist
                  items={[
                    "SEC-registered foundation",
                    "Audited annual financials",
                    "90%+ of every gift goes direct to programs",
                    "Tax-deductible receipts (PH, US, AU)",
                  ]}
                />
              </Specimen>
            </Group>

            <Group id="actions" title="Actions">
              <Specimen
                title="<Button>"
                description="primary · secondary · donate · inverted."
              >
                <div class="flex flex-wrap items-center gap-4">
                  <Button href="#tokens">Primary</Button>
                  <Button variant="secondary" href="#tokens">Secondary</Button>
                  <Button variant="donate" href="#tokens">Donate</Button>
                  <span class="inline-flex rounded-full bg-primary p-1">
                    <Button variant="inverted" href="#tokens">Inverted</Button>
                  </span>
                </div>
              </Specimen>
              <Specimen title="<Button type=submit>">
                <Button type="submit">Submit form</Button>
              </Specimen>
            </Group>

            <Group id="cards" title="Cards">
              <Specimen title="<Card>" description="base + interactive.">
                <div class="grid gap-6 sm:grid-cols-2">
                  <Card>
                    <h3 class="text-lg font-semibold text-on-surface">
                      Base card
                    </h3>
                    <p class="mt-2 text-sm text-on-surface-variant">
                      A flat surface container with a hairline border.
                    </p>
                  </Card>
                  <Card interactive>
                    <h3 class="text-lg font-semibold text-on-surface">
                      Interactive
                    </h3>
                    <p class="mt-2 text-sm text-on-surface-variant">
                      Lifts on hover.
                    </p>
                  </Card>
                </div>
              </Specimen>

              <Specimen title="<ProgramCard>">
                <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {PROGRAMS.map((p) => <ProgramCard key={p.title} {...p} />)}
                </div>
              </Specimen>

              <Specimen title="<FeatureCard>">
                <div class="grid gap-6 sm:grid-cols-3">
                  <FeatureCard
                    title="Volunteer"
                    body="Tutor, mentor, or serve at a clinic."
                  />
                  <FeatureCard
                    title="Prayer Hub"
                    body="Submit a request and pray with us."
                  />
                  <FeatureCard
                    title="Corporate Partners"
                    body="Sponsor a classroom or a new wing."
                  />
                </div>
              </Specimen>

              <Specimen title="<TestimonialCard>">
                <TestimonialCard
                  {...SAMPLE_TESTIMONIALS[0]}
                />
              </Specimen>
            </Group>

            <Group id="data" title="Data display">
              <Specimen title="<ProgressBar>">
                <div class="max-w-md space-y-6">
                  <ProgressBar
                    value={32}
                    raised="₱16M raised"
                    goal="32% of ₱50M goal"
                  />
                  <ProgressBar
                    value={70}
                    raised="₱35M raised"
                    goal="70% of ₱50M goal"
                  />
                  <ProgressBar value={100} />
                </div>
              </Specimen>
            </Group>

            <Group id="forms" title="Forms">
              <Specimen
                title="<InputField>"
                description="DESIGN.md input-field spec."
              >
                <div class="max-w-md">
                  <InputField
                    type="email"
                    placeholder="your@email.com"
                    ariaLabel="Email address"
                  />
                </div>
              </Specimen>
            </Group>

            <Group
              id="navigation"
              title="Navigation"
              intro="Chrome shared across every page."
            >
              <Specimen
                title="<Navbar>"
                description="Desktop links (hidden below md)."
              >
                <div class="flex h-16 items-center rounded-lg border border-outline-variant/40 bg-surface px-6">
                  <Navbar />
                </div>
              </Specimen>

              <Specimen title="<FooterLinkList>">
                <div class="rounded-lg bg-on-surface p-6">
                  <FooterLinkList title="Explore" links={NAV} />
                </div>
              </Specimen>

              <Specimen
                title="<Header>"
                description="Sticky bar: logo + Navbar + Donate + mobile menu. (Mobile menu toggles below md.)"
                bleed
              >
                <div class="overflow-hidden rounded-lg border border-outline-variant/40">
                  <Header />
                </div>
              </Specimen>

              <Specimen title="<Footer>" bleed>
                <div class="overflow-hidden rounded-lg border border-outline-variant/40">
                  <Footer />
                </div>
              </Specimen>
            </Group>

            <Group id="media" title="Media">
              <Specimen
                title="<Gallery>"
                description="Placeholder tiles (no photos yet). Click to open the lightbox."
              >
                <Gallery items={SAMPLE_GALLERY} columns={3} />
              </Specimen>

              <Specimen title="<TestimonialGrid>">
                <TestimonialGrid items={SAMPLE_TESTIMONIALS} />
              </Specimen>
            </Group>

            <Group
              id="sections"
              title="Page sections"
              intro="The composed homepage sections, each driven by props."
            >
              <Specimen title="<Hero>" bleed>
                <Hero {...HERO} />
              </Specimen>

              <Specimen title="<Stats>" bleed>
                <Stats items={STATS} />
              </Specimen>

              <Specimen title="<Mission>" bleed>
                <Mission {...MISSION} />
              </Specimen>

              <Specimen title="<Campaign>" bleed>
                <Campaign {...CAMPAIGN} />
              </Specimen>

              <Specimen title="<Programs>" bleed>
                <Programs
                  title="What we do"
                  subtitle="Our programs, organized by pillar of impact."
                  items={PROGRAMS}
                />
              </Specimen>

              <Specimen title="<Impact>" bleed>
                <Impact {...IMPACT} />
              </Specimen>

              <Specimen title="<GetInvolved>" bleed>
                <GetInvolved
                  title="Get involved"
                  subtitle="There’s a place for you here. Every gift of time, skill, or prayer matters."
                  items={WAYS_TO_HELP}
                />
              </Specimen>

              <Specimen title="<DonateCTA>" bleed>
                <DonateCTA {...DONATE_CTA} />
              </Specimen>

              <Specimen title="<Newsletter>" bleed>
                <Newsletter {...NEWSLETTER} />
              </Specimen>
            </Group>

            <footer class="border-t border-outline-variant/40 pt-6 text-sm text-on-surface-variant">
              {NAV.length + UTILITY_LINKS.length} nav links · components in{" "}
              <span class="font-mono">components/</span> · catalog at{" "}
              <span class="font-mono">/storybook</span>.
            </footer>
          </main>
        </div>
      </div>
    </>
  );
});
