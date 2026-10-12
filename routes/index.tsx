import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Container } from "../components/layout/Container.tsx";
import { VideoEmbed } from "../components/VideoEmbed.tsx";
import { MapEmbed } from "../components/MapEmbed.tsx";
import Carousel from "../islands/Carousel.tsx";
import ContactForm from "../islands/ContactForm.tsx";
import { CAROUSEL, HOME } from "../components/content.ts";

// Homepage cloned from the WP `favor-care-homepage` page (post 6002,
// staging = canonical). Copy verbatim; geometry (type sizes, two-column
// rows, card radii) follows the measured WP layout at 360/768/1280 —
// the exact px values below are those measurements, kept inline until
// they're folded into DESIGN.md display tokens.
//
// WP hides several widgets at every breakpoint; they are not cloned:
// the Prayer Hub kicker, the hero subhead, the "See Event" button, the
// TESTIMONY lorem carousel, and About's second paragraph.
export default define.page(function Home() {
  return (
    <>
      <Head>
        <title>
          Favor Care — Giving hope for a better future to those in need
        </title>
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {
          /* Hero: photo on black with a yellow-to-black gradient overlay;
            left-aligned display headline. */
        }
        <section class="relative flex items-center bg-black bg-cover bg-center py-20 md:py-28 lg:h-[540px] lg:py-0">
          <div
            class="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HOME.hero.image})` }}
            aria-hidden="true"
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-black to-yellow opacity-[0.54]"
            aria-hidden="true"
          />
          <Container class="relative">
            <h1 class="max-w-[570px] text-[38px] font-semibold leading-[0.95] tracking-[-2.3px] text-white md:text-[56px] lg:text-[70px] lg:leading-[57px]">
              {HOME.hero.headline}
            </h1>
          </Container>
        </section>

        {
          /* Care Updates: rounded yellow card with heading, copy, and the
            campaign video header image (image hidden below tablet, as on
            WP). */
        }
        <section class="mx-auto w-full max-w-[1140px] px-2.5 py-16 md:px-10 md:py-20 lg:px-0 lg:pt-[30px] lg:pb-10">
          <div class="rounded-[30px] bg-yellow px-5 py-5 md:px-[50px]">
            <h2 class="text-[28px] font-bold leading-tight text-black md:text-[39px] lg:text-[56px]">
              <span class="md:hidden lg:inline">
                {HOME.careUpdates.heading}
              </span>
              <span class="hidden md:inline lg:hidden">Care Updates</span>
            </h2>
            <p class="mt-4 text-[14px] leading-relaxed text-black md:text-[15px] lg:text-base">
              {HOME.careUpdates.body}
            </p>
            <img
              src={HOME.careUpdates.image}
              alt={HOME.careUpdates.imageAlt}
              class="mt-6 hidden aspect-video w-full object-cover md:block"
            />
          </div>
        </section>

        {
          /* About + Care Updates video: two columns on md+ (video left,
            about right); stacked about-first on mobile, as on WP. */
        }
        <section class="mx-auto grid w-full max-w-[1140px] items-center gap-10 px-5 pb-16 md:grid-cols-2 md:px-10 md:pb-20 lg:gap-[88px] lg:px-0">
          <div class="md:order-2">
            <p class="text-[12px] font-bold uppercase tracking-wider text-yellow md:text-[14px]">
              {HOME.about.eyebrow}
            </p>
            <h2 class="mt-3 text-[28px] font-semibold leading-tight tracking-tight text-primary md:text-[39px] lg:text-[56px]">
              {HOME.about.title}
            </h2>
            <p class="mt-5 text-[14px] leading-relaxed text-primary/80 md:text-[15px] lg:text-lg">
              {HOME.about.body}
            </p>
            <div class="mt-7">
              <a
                href={HOME.about.cta.href}
                class="inline-flex min-h-12 items-center justify-center rounded-full bg-yellow px-6 text-[14px] font-bold text-black transition-opacity hover:opacity-90 md:text-lg"
              >
                {HOME.about.cta.label}
              </a>
            </div>
          </div>
          <div class="md:order-1">
            <VideoEmbed
              id={HOME.careUpdates.video.id}
              title={HOME.careUpdates.video.title}
            />
          </div>
        </section>

        {/* What we do: centered heading + the six-program media carousel. */}
        <section class="mx-auto w-full max-w-[1140px] px-5 py-16 text-center md:px-10 md:py-20 lg:px-0">
          <p class="text-[12px] font-bold uppercase tracking-wider text-yellow md:text-[14px]">
            {HOME.whatWeDo.eyebrow}
          </p>
          <h2 class="mx-auto mt-3 max-w-[784px] text-[28px] font-semibold leading-tight tracking-tight text-primary md:text-[39px] lg:text-[56px]">
            {HOME.whatWeDo.title}
          </h2>
          <p class="mx-auto mt-5 max-w-[784px] text-[14px] leading-relaxed text-primary/80 md:text-[15px] lg:text-lg">
            {HOME.whatWeDo.body}
          </p>
          <div class="mt-10 md:mt-14">
            <Carousel slides={CAROUSEL} label="What we do programs" />
          </div>
        </section>

        {
          /* Stories of changed lives: heading, story copy, video. WP shows
            the intro line only in the tablet variant. */
        }
        <section class="mx-auto w-full max-w-[1140px] px-2.5 py-16 pb-24 md:pb-28 lg:px-0 lg:pb-32">
          <h2 class="text-center text-[28px] font-semibold leading-tight tracking-tight text-primary md:text-[39px] lg:text-[56px]">
            {HOME.stories.title}
          </h2>
          <p class="mx-auto mt-5 hidden max-w-[798px] text-center text-[15px] leading-relaxed text-primary/80 md:block lg:hidden">
            {HOME.stories.intro}
          </p>
          <p class="mx-auto mt-5 max-w-[798px] text-center text-[14px] leading-relaxed text-primary/80 md:hidden md:text-[15px] lg:block lg:text-lg">
            {HOME.stories.body}
          </p>
          <div class="mt-10">
            <VideoEmbed
              id={HOME.stories.video.id}
              title={HOME.stories.video.title}
            />
          </div>
        </section>

        {/* Take Action: black band with centered CTA. */}
        <section class="bg-black px-5 py-14 text-center md:py-16 lg:py-20">
          <h2 class="text-[28px] font-semibold leading-tight tracking-tight text-white md:text-[39px] lg:text-[56px]">
            {HOME.takeAction.title}
          </h2>
          <p class="mx-auto mt-5 max-w-[675px] text-[14px] leading-relaxed text-white/80 md:text-[15px] lg:text-lg">
            {HOME.takeAction.body}
          </p>
          <div class="mt-7">
            <a
              href={HOME.takeAction.cta.href}
              class="inline-flex min-h-12 items-center justify-center rounded-full bg-yellow px-6 text-[14px] font-bold text-black transition-opacity hover:opacity-90 md:text-lg"
            >
              {HOME.takeAction.cta.label}
            </a>
          </div>
        </section>

        {
          /* Portrait + Get in touch: portrait left (desktop only, as on WP)
            and the contact form in a rounded yellow card right. */
        }
        <section class="mx-auto grid w-full max-w-[1140px] items-center gap-10 px-5 py-16 md:px-10 lg:grid-cols-2 lg:px-0">
          <img
            src={HOME.takeAction.image}
            alt={HOME.takeAction.imageAlt}
            width={719}
            height={1024}
            class="hidden aspect-[719/1024] w-full max-w-[719px] object-cover lg:block"
          />
          <div class="mx-auto w-full max-w-[642px] rounded-[30px] bg-yellow p-6 md:p-[50px]">
            <h2 class="text-[28px] font-semibold leading-tight tracking-tight text-black md:text-[39px] lg:text-[56px]">
              {HOME.contact.title}
            </h2>
            <p class="mt-4 text-[14px] leading-relaxed text-black/80 md:text-[15px] lg:text-lg">
              {HOME.contact.body}
            </p>
            <div class="mt-8 text-black [&_a]:text-black">
              <ContactForm newsletter />
            </div>
          </div>
        </section>

        {/* We'd love to hear from you: black strip with email. */}
        <section class="bg-black px-5 py-12 md:px-10 lg:py-[70px]">
          <div class="mx-auto grid w-full max-w-[1140px] items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 class="text-[38px] font-semibold leading-tight tracking-tight text-white md:text-[39px] lg:text-[48px]">
                {HOME.contact.loveTitle}
              </h2>
              <p class="mt-4 max-w-[633px] text-[14px] leading-relaxed text-white/80 md:text-[15px] lg:text-lg">
                {HOME.contact.loveBody}
              </p>
            </div>
            <a
              href="mailto:info@favorcare.org"
              class="justify-self-center text-lg font-semibold text-white underline hover:text-yellow"
            >
              info@favorcare.org
            </a>
          </div>
        </section>

        {
          /* Map: full-bleed Google Maps embed (favor Church, EDSA
            Shangri-La). */
        }
        <MapEmbed src={HOME.contact.map.src} title={HOME.contact.map.title} />
      </main>
      <Footer />
    </>
  );
});
