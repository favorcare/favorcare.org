import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Button } from "../components/Button.tsx";
import { Section } from "../components/layout/Section.tsx";
import { Container } from "../components/layout/Container.tsx";
import ContactForm from "../islands/ContactForm.tsx";
import { HOME } from "../components/content.ts";

// Homepage cloned from the WP `favor-care-homepage` page (post 6002):
// hero → care updates banner → about → what we do (6 areas) → stories →
// take action → contact block. Copy verbatim; structure per the widget
// tree with desktop (canonical) variants only.
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
        {/* Hero: dark, kicker + display headline (text-hero token scale). */}
        <section class="bg-primary py-24 text-center md:py-36">
          <Container>
            <p class="text-xs font-semibold uppercase tracking-wider text-white/70">
              {HOME.hero.kicker}
            </p>
            <h1 class="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[7.5rem]">
              {HOME.hero.headline}
            </h1>
          </Container>
        </section>

        {/* Care updates banner (campaign copy). */}
        <section class="bg-yellow py-10">
          <Container class="max-w-5xl">
            <p class="text-sm font-bold uppercase tracking-wider text-primary">
              {HOME.careUpdates.label}
            </p>
            <p class="mt-2 text-base leading-relaxed text-primary">
              {HOME.careUpdates.body}
            </p>
            <div class="mt-4">
              <Button
                variant="donate"
                href={HOME.careUpdates.cta.href}
              >
                {HOME.careUpdates.cta.label}
              </Button>
            </div>
          </Container>
        </section>

        {/* About. */}
        <section class="bg-surface py-20">
          <Container class="max-w-5xl text-center">
            <p class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              {HOME.about.eyebrow}
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              {HOME.about.title}
            </h2>
            <p class="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-on-surface-variant">
              {HOME.about.body}
            </p>
            <p class="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-on-surface-variant">
              {HOME.about.body2}
            </p>
            <div class="mt-7">
              <Button variant="secondary" href={HOME.about.cta.href}>
                {HOME.about.cta.label}
              </Button>
            </div>
          </Container>
        </section>

        {/* What we do: title + six areas. */}
        <section class="bg-secondary-container py-20">
          <Container class="max-w-5xl text-center">
            <p class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              {HOME.whatWeDo.eyebrow}
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              {HOME.whatWeDo.title}
            </h2>
            <p class="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-on-surface-variant">
              {HOME.whatWeDo.body}
            </p>
            <ul class="mt-10 flex flex-wrap justify-center gap-4">
              {HOME.whatWeDo.programs.map((p) => (
                <li class="border border-outline-variant bg-surface px-6 py-4 text-sm font-semibold uppercase tracking-wider">
                  {p}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Stories of changed lives. */}
        <section class="bg-surface py-20">
          <Container class="grid items-center gap-10 md:grid-cols-2">
            <img
              src={HOME.stories.image}
              alt={HOME.stories.imageAlt}
              class="w-full object-cover"
              loading="lazy"
            />
            <div>
              <h2 class="text-3xl font-semibold tracking-tight md:text-5xl">
                {HOME.stories.title}
              </h2>
              <p class="mt-5 text-base leading-relaxed text-on-surface-variant">
                {HOME.stories.intro}
              </p>
              <p class="mt-3 text-base leading-relaxed text-on-surface-variant">
                {HOME.stories.body}
              </p>
            </div>
          </Container>
        </section>

        {/* Take action. */}
        <section class="bg-primary py-20 text-center">
          <Container class="max-w-3xl">
            <h2 class="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              {HOME.takeAction.title}
            </h2>
            <p class="mt-5 text-base leading-relaxed text-white/80">
              {HOME.takeAction.body}
            </p>
            <div class="mt-7">
              <Button variant="inverted" href={HOME.takeAction.cta.href}>
                {HOME.takeAction.cta.label}
              </Button>
            </div>
          </Container>
        </section>

        {/* Contact block: form + "we'd love to hear from you". */}
        <section class="bg-secondary-container py-20">
          <Container class="max-w-5xl">
            <div class="text-center">
              <h2 class="text-3xl font-semibold tracking-tight md:text-5xl">
                {HOME.contact.title}
              </h2>
              <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant">
                {HOME.contact.body}
              </p>
            </div>
            <div class="mx-auto mt-10 max-w-2xl">
              <ContactForm />
            </div>
            <div class="mx-auto mt-14 max-w-2xl text-center">
              <h3 class="text-xl font-semibold">
                {HOME.contact.loveTitle}
              </h3>
              <p class="mt-3 text-base leading-relaxed text-on-surface-variant">
                {HOME.contact.loveBody}
              </p>
              <a
                href="mailto:info@favorcare.org"
                class="mt-2 inline-block text-base font-semibold text-link hover:text-link-hover"
              >
                info@favorcare.org
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
});
