import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Button } from "../components/Button.tsx";
import { Container } from "../components/layout/Container.tsx";
import { ABOUT } from "../components/content.ts";

// Who-we-are page cloned from the WP `about` page (post 1831): hero →
// mission/vision → core values → 4-photo gallery → team → take action.
// Copy + images verbatim from the source tree (desktop variants).
export default define.page(function WhoWeArePage() {
  return (
    <>
      <Head>
        <title>About us — Favor Care</title>
        <meta name="description" content={ABOUT.hero.subtitle} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section class="bg-primary py-20 text-center md:py-28">
          <Container>
            <p class="text-xs font-semibold uppercase tracking-wider text-white/70">
              {ABOUT.hero.eyebrow}
            </p>
            <h1 class="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
              {ABOUT.hero.title}
            </h1>
            <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80">
              {ABOUT.hero.subtitle}
            </p>
            <img
              src={ABOUT.hero.image}
              alt=""
              class="mx-auto mt-10 w-full max-w-3xl object-cover"
            />
          </Container>
        </section>

        {/* Mission / Vision */}
        <section class="bg-surface py-20">
          <Container class="max-w-6xl">
            <div class="grid items-center gap-10 md:grid-cols-2">
              <div class="border border-outline-variant bg-secondary-container p-8">
                <h2 class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  {ABOUT.mission.label}
                </h2>
                <p class="mt-3 text-xl font-medium leading-snug tracking-tight">
                  {ABOUT.mission.body}
                </p>
              </div>
              <img
                src={ABOUT.mission.image}
                alt=""
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="mt-10 border border-outline-variant bg-secondary-container p-8 md:max-w-3xl">
              <h2 class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                {ABOUT.vision.label}
              </h2>
              <p class="mt-3 text-xl font-medium leading-snug tracking-tight">
                {ABOUT.vision.body}
              </p>
            </div>
          </Container>
        </section>

        {/* Core values */}
        <section class="bg-secondary-container py-20">
          <Container class="max-w-5xl text-center">
            <h2 class="text-3xl font-semibold tracking-tight md:text-5xl">
              {ABOUT.valuesTitle}
            </h2>
            <ul class="mt-10 flex flex-wrap justify-center gap-3">
              {ABOUT.values.map((v) => (
                <li class="border border-outline-variant bg-surface px-5 py-3 text-sm font-semibold uppercase tracking-wider">
                  {v}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Gallery */}
        <section class="bg-surface py-20">
          <Container class="max-w-6xl">
            <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {ABOUT.gallery.map((g) => (
                <img
                  key={g.src}
                  src={g.src}
                  alt={g.alt}
                  class="aspect-square w-full object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </Container>
        </section>

        {/* Team */}
        <section class="bg-secondary-container py-20">
          <Container class="max-w-6xl text-center">
            <h2 class="text-3xl font-semibold tracking-tight md:text-5xl">
              {ABOUT.team.title}
            </h2>
            <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant">
              {ABOUT.team.subtitle}
            </p>
            <ul class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {ABOUT.team.members.map((m) => (
                <li class="text-center">
                  <img
                    src={m.photo}
                    alt={m.photoAlt}
                    class="mx-auto aspect-square w-full max-w-[220px] object-cover"
                    loading="lazy"
                  />
                  <h3 class="mt-4 text-base font-semibold">{m.name}</h3>
                  <p class="mt-1 text-sm text-on-surface-variant">{m.role}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Take action */}
        <section class="bg-primary py-20 text-center">
          <Container class="max-w-3xl">
            <h2 class="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              {ABOUT.takeAction.title}
            </h2>
            <p class="mt-5 text-base leading-relaxed text-white/80">
              {ABOUT.takeAction.body}
            </p>
            <div class="mt-7">
              <Button variant="inverted" href={ABOUT.takeAction.cta.href}>
                {ABOUT.takeAction.cta.label}
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
});
