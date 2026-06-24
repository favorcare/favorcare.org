import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Button } from "../components/Button.tsx";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";

// All copy + numbers below come from ideas/proposed.svg (TEMPLATE A · Homepage).

const STATS = [
  { value: "185", label: "Students at Redemptio" },
  { value: "1,000+", label: "CIW care packs / yr" },
  { value: "12", label: "Communities served" },
  { value: "8 yrs", label: "Of faithful service" },
];

const PROGRAMS = [
  {
    title: "Education",
    name: "Redemptio Christian School",
    body: "Free Christian education for kids on the Taytay floodway.",
  },
  {
    title: "Prison Ministry",
    name: "CIW · Care packs · Worship",
    body: "Worship and care packs for the women at CIW.",
  },
  {
    title: "Community Health",
    name: "Medical clinics · Wellness drives",
    body: "Free medical clinics for underserved communities.",
  },
  {
    title: "Disaster Relief",
    name: "Typhoon & emergency response",
    body: "Rapid response to typhoons and emergencies.",
  },
];

const WAYS_TO_HELP = [
  { title: "Volunteer", body: "Tutor, mentor, or serve at a clinic." },
  {
    title: "Fundraise For Us",
    body: "Run your own campaign or birthday drive.",
  },
  { title: "Corporate Partners", body: "Sponsor a classroom or a new wing." },
  { title: "Prayer Hub", body: "Submit a request and pray with us." },
  { title: "In-Kind Donations", body: "Drop off care-pack goods at HQ." },
];

const TRUST_FACTS = [
  "SEC-registered foundation",
  "Audited annual financials",
  "90%+ of every gift goes direct to programs",
  "Tax-deductible receipts (PH, US, AU)",
];

function Hero() {
  return (
    <section class="relative overflow-hidden bg-linear-to-b from-primary-container/40 to-surface">
      <div class="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <p class="text-sm font-semibold uppercase tracking-wider text-on-primary-container">
          Favor Care · Philippines
        </p>
        <h1 class="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-on-surface md:text-6xl">
          Giving hope for a better future to those in need.
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant">
          A faith-driven Philippine nonprofit bringing education, health, and
          hope to families in need — for 8 years.
        </p>
        <div class="mt-8 flex flex-wrap gap-4">
          <Button href="#donate">Donate now</Button>
          <Button variant="secondary" href="#programs">See our work</Button>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section class="bg-on-surface text-surface">
      <div class="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} class="text-center">
            <div class="text-3xl font-bold text-primary md:text-4xl">
              {s.value}
            </div>
            <div class="mt-1 text-sm text-surface/70">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" class="scroll-mt-20">
      <div class="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <h2 class="text-3xl font-semibold tracking-tight text-on-surface md:text-4xl">
            Our mission
          </h2>
          <p class="mt-6 text-lg leading-relaxed text-on-surface-variant">
            Favor Care exists to bring hope and dignity to families in need.
            From a Christian school on the Taytay floodway to care packs inside
            the Correctional Institution for Women, we turn compassion into
            measurable change — one child, one family, one community at a time.
          </p>
          <div class="mt-8">
            <Button variant="secondary" href="#impact">Read our story →</Button>
          </div>
        </div>
        <div
          class="aspect-4/3 rounded-lg bg-surface-container-low"
          aria-label="A child or family we serve — photo coming soon"
        />
      </div>
    </section>
  );
}

function Campaign() {
  return (
    <section class="bg-surface-dim">
      <div class="mx-auto max-w-7xl px-6 py-16">
        <div class="rounded-xl border border-surface-container-high bg-surface p-8 shadow-md md:p-12">
          <p class="text-sm font-semibold uppercase tracking-wider text-primary">
            Featured campaign
          </p>
          <h3 class="mt-3 text-2xl font-semibold text-on-surface md:text-3xl">
            Build a school that can hold 500 kids.
          </h3>
          <p class="mt-2 text-on-surface-variant">
            A ₱50M corporate sponsorship campaign to expand Redemptio Christian
            School.
          </p>

          <div class="mt-6">
            <div class="flex items-end justify-between text-sm font-semibold text-on-surface">
              <span>₱16M raised</span>
              <span>32% of ₱50M goal</span>
            </div>
            <div class="mt-2 h-3 overflow-hidden rounded-full bg-surface-container">
              <div
                class="h-full rounded-full bg-primary"
                style={{ width: "32%" }}
              />
            </div>
          </div>

          <div class="mt-8">
            <Button href="#donate">Sponsor →</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" class="scroll-mt-20">
      <div class="mx-auto max-w-7xl px-6 py-20">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold tracking-tight text-on-surface md:text-4xl">
            What we do
          </h2>
          <p class="mt-4 text-lg text-on-surface-variant">
            Our programs, organized by pillar of impact.
          </p>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((p) => (
            <article
              key={p.title}
              class="flex flex-col rounded-lg border border-surface-container-high bg-surface p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 class="text-lg font-semibold text-primary">{p.title}</h3>
              <p class="mt-1 text-sm font-medium text-on-surface">{p.name}</p>
              <p class="mt-3 flex-1 text-sm leading-relaxed text-on-surface-variant">
                {p.body}
              </p>
              <a
                href="#impact"
                class="mt-4 text-sm font-semibold text-on-surface transition-colors hover:text-primary"
              >
                Explore →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section id="impact" class="scroll-mt-20 bg-surface-dim">
      <div class="mx-auto max-w-7xl px-6 py-20">
        <div class="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p class="text-sm font-semibold uppercase tracking-wider text-primary">
              Stories &amp; impact
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-tight text-on-surface md:text-4xl">
              Real lives. Measurable change.
            </h2>
            <p class="mt-4 text-lg leading-relaxed text-on-surface-variant">
              “Before Redemptio, I never thought I’d learn to read.” Stories
              like Maria’s are why we do this — and proof that your support
              reaches real people.
            </p>
            <div class="mt-6">
              <Button variant="secondary" href="#impact">
                Read more stories →
              </Button>
            </div>
          </div>
          <div
            class="aspect-4/3 rounded-lg bg-surface-container"
            aria-label="Maria, a student at Redemptio — photo coming soon"
          />
        </div>

        <div class="mt-12 rounded-lg border border-surface-container-high bg-surface p-6 md:p-8">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
            Why trust Favor Care with your gift?
          </h3>
          <ul class="mt-4 grid gap-3 sm:grid-cols-2">
            {TRUST_FACTS.map((fact) => (
              <li
                key={fact}
                class="flex items-start gap-2 text-sm text-on-surface"
              >
                <span class="mt-0.5 text-tertiary" aria-hidden="true">✓</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function GetInvolved() {
  return (
    <section id="involved" class="scroll-mt-20">
      <div class="mx-auto max-w-7xl px-6 py-20">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold tracking-tight text-on-surface md:text-4xl">
            Get involved
          </h2>
          <p class="mt-4 text-lg text-on-surface-variant">
            There’s a place for you here. Every gift of time, skill, or prayer
            matters.
          </p>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WAYS_TO_HELP.map((w) => (
            <a
              key={w.title}
              href="#donate"
              class="group rounded-lg border border-surface-container-high bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            >
              <h3 class="text-lg font-semibold text-on-surface group-hover:text-primary">
                {w.title}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-on-surface-variant">
                {w.body}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function DonateCTA() {
  return (
    <section id="donate" class="scroll-mt-20 bg-primary">
      <div class="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 class="text-3xl font-bold tracking-tight text-on-primary md:text-4xl">
          Your gift, in their hands within days.
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-on-primary/80">
          Every option is secure, multi-currency, and tax-receipted. Give once,
          become a monthly Carer, or sponsor a child.
        </p>
        <div class="mt-8 flex justify-center">
          <Button
            href="#donate"
            class="bg-on-primary text-primary hover:bg-on-primary/90"
          >
            Donate now
          </Button>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section class="bg-surface-dim">
      <div class="mx-auto max-w-7xl px-6 py-16">
        <div class="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 class="text-2xl font-semibold text-on-surface">
            Join the Carers newsletter
          </h2>
          <p class="mt-2 text-on-surface-variant">
            Monthly stories, prayer points, and ways to act. Unsubscribe
            anytime.
          </p>
          <form
            class="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            action="mailto:hello@favorcare.org"
            method="post"
            enctype="text/plain"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              aria-label="Email address"
              class="h-12 flex-1 rounded border border-outline-variant bg-surface px-4 text-on-surface outline-none focus:border-primary"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default define.page(function Home() {
  return (
    <>
      <Head>
        <title>
          Favor Care — Giving hope for a better future to those in need
        </title>
      </Head>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Mission />
        <Campaign />
        <Programs />
        <Impact />
        <GetInvolved />
        <DonateCTA />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
});
