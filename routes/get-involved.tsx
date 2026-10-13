import { Fragment } from "preact";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { PageHero } from "../components/PageHero.tsx";
import { SectionHeading } from "../components/layout/SectionHeading.tsx";
import { Button, buttonClasses } from "../components/Button.tsx";
import Popup from "../islands/Popup.tsx";
import { GET_INVOLVED, POPUPS } from "../components/content.ts";

// Get-involved page cloned from the WP page (post 1840, staging =
// canonical). Copy is verbatim; geometry follows the measured WP layout
// at 360/768/1280 — px values below are those measurements, kept inline
// until they're folded into DESIGN.md display tokens.
//
// WP hides at every breakpoint and they are not cloned: the hero's second
// subhead and the lorem testimonial carousels inside the divider bands.
// The second divider band's photo never applies on WP — cloned as the
// same empty spacer. WP's 10px hero subtitle on mobile is raised to 14px
// for legibility; its mobile title reads "Get involved" (lowercase w) —
// kept as measured. The volunteer card's SERVE button opens the WP
// volunteer-disclaimer popup (7730), whose Review Guidelines chains into
// the full guidelines doc (7737) — the newsletter/donate cards keep their
// plain links.
export default define.page(function GetInvolvedPage() {
  return (
    <>
      <Head>
        <title>Get involved — Favor Care</title>
        <meta name="description" content={GET_INVOLVED.hero.subtitle} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {
          /* Hero: the volunteers photo with the black→yellow gradient
            overlay, centered title + subtitle. WP's mobile title reads
            "Get involved" (lowercase w) — kept as measured. */
        }
        <PageHero image={GET_INVOLVED.hero.image}>
          <h1 class="text-center text-[38px] font-semibold leading-none text-white md:text-[56px] md:font-bold lg:text-[70px]">
            <span class="md:hidden">{GET_INVOLVED.hero.titleMobile}</span>
            <span class="hidden md:inline">{GET_INVOLVED.hero.title}</span>
          </h1>
          <p class="mx-auto mt-4 max-w-[280px] text-center text-sm leading-relaxed text-white md:max-w-[560px] md:text-[15px] md:leading-[26px] lg:max-w-[784px] lg:text-lg lg:leading-relaxed">
            {GET_INVOLVED.hero.subtitle}
          </p>
        </PageHero>

        {
          /* Three photo + black-card rows. The cards round only their
            outer side (newsletter/donate cards sit right, volunteer sits
            left), stacked photo-over-card below md with the card inset
            to 300px. */
        }
        {GET_INVOLVED.cards.map((card, i) => (
          <Fragment key={card.title}>
            <section class="px-5 pt-5 md:px-2.5 md:pt-10 lg:px-0">
              <div class="mx-auto grid w-full max-w-[1140px] md:grid-cols-2">
                <img
                  src={card.image}
                  alt=""
                  class={`aspect-3/2 w-full object-cover ${
                    i === 1 ? "md:order-2" : ""
                  }`}
                  loading="lazy"
                />
                <div
                  class={`mx-auto mt-2.5 flex w-[300px] flex-col items-center justify-center gap-5 rounded-r-[30px] bg-black p-6 md:mt-0 md:w-auto md:p-0 md:py-[30px] ${
                    i === 1
                      ? "md:order-1 md:rounded-l-[30px] md:rounded-r-none"
                      : ""
                  }`}
                >
                  <SectionHeading
                    title={card.title}
                    tone="white"
                    weight="semibold"
                    align="center"
                  />
                  <p class="max-w-[80%] text-center text-sm leading-relaxed text-white md:text-[15px] md:leading-[26px] lg:text-lg lg:leading-relaxed">
                    {card.body}
                  </p>
                  {i === 1
                    ? (
                      /* The WP SERVE button is an elementor popup trigger,
                        not a link — the Popup island's own button wears the
                        white pill via buttonClasses. */
                      <Popup
                        trigger={card.cta.label}
                        triggerClass={buttonClasses(
                          { variant: "white", size: "md" },
                          "mt-2",
                        )}
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
                    )
                    : (
                      <Button
                        variant="white"
                        href={card.cta.href}
                        {...card.cta.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {}}
                        class="mt-2"
                      >
                        {card.cta.label}
                      </Button>
                    )}
                </div>
              </div>
            </section>

            {
              /* Divider bands: 200/270/500px tall; the first shows its
                photo from md up, the second is blank on WP (its
                background never applies) — kept as an empty spacer. */
            }
            {i < GET_INVOLVED.cards.length - 1 && (
              <div
                class="relative h-[200px] md:h-[270px] lg:h-[500px]"
                aria-hidden="true"
              >
                {i === 0 && (
                  <div
                    class="absolute inset-0 hidden bg-cover bg-[position:100%_50%] md:block"
                    style={{
                      backgroundImage: `url(${GET_INVOLVED.bandPhoto})`,
                    }}
                  />
                )}
              </div>
            )}
          </Fragment>
        ))}
      </main>
      <Footer />
    </>
  );
});
