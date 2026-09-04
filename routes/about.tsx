import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Section } from "../components/layout/Section.tsx";
import { Container } from "../components/layout/Container.tsx";
import { SectionHeading } from "../components/layout/SectionHeading.tsx";
import { Eyebrow } from "../components/Eyebrow.tsx";
import { Button } from "../components/Button.tsx";
import { Gallery } from "../components/Gallery.tsx";

const CORE_VALUES = [
  "Generosity",
  "Compassion",
  "Courtesy and Respect",
  "Volunteerism",
  "Integrity",
  "Commitment",
  "Partnership",
  "Empowerment",
  "Inclusivity",
  "Faith-based",
];

const TEAM = [
  {
    name: "Chris Aiton",
    role: "Executive Director",
    src: "/images/about/team/chris-aiton.jpg",
  },
  {
    name: "Belle Guiron",
    role: "Volunteer Coordinator",
    src: "/images/about/team/belle-guiron.jpeg",
  },
  {
    name: "Carmelyn De Guzman",
    role: "Project Coordinator",
    src: "/images/about/team/carmelyn-de-guzman.jpg",
  },
  {
    name: "Chap De Guzman",
    role: "Project Coordinator",
    src: "/images/about/team/chap-de-guzman.jpg",
  },
  {
    name: "Marilou Santero",
    role: "CIW Coordinator",
    src: "/images/about/team/marilou-santero.jpeg",
  },
];

const GALLERY_ITEMS = [
  {
    src: "/images/about/gallery/volunteer-huddle.jpeg",
    alt: "Favor Care volunteer huddle at Shangri-La",
  },
  {
    src: "/images/about/gallery/community-event.jpg",
    alt: "Favor Care community event",
  },
  {
    src: "/images/about/gallery/dental-mission.jpg",
    alt: "Dental mission outreach",
  },
  {
    src: "/images/about/gallery/aetas-outreach.jpg",
    alt: "Outreach to the Aetas in the mountains",
  },
];

export default define.page(function About() {
  return (
    <>
      <Head>
        <title>About Us — Favor Care</title>
        <meta
          name="description"
          content="Favor Care is a faith-based humanitarian organization committed to help improve the lives of communities through compassion ministries."
        />
      </Head>
      <Header />
      <main>
        {/* Hero */}
        <Section tone="hero">
          <Container class="py-24 md:py-32">
            <Eyebrow tone="container">Who we are</Eyebrow>
            <h1 class="mt-4 text-4xl font-bold tracking-tight text-on-surface md:text-6xl">
              About us
            </h1>
            <p class="mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant">
              Explore our journey and join us in making a difference.
            </p>
          </Container>
        </Section>

        {/* About intro */}
        <Section>
          <Container class="py-20">
            <div class="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 class="text-3xl font-semibold tracking-tight text-on-surface md:text-4xl">
                  Favor Care is a faith-based humanitarian organization
                  committed to help improve the lives of communities through
                  compassion ministries.
                </h2>
              </div>
              <div class="overflow-hidden rounded-lg">
                <img
                  src="/images/about/hero/kids-hero.png"
                  alt="Children served by Favor Care programs"
                  class="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Mission & Vision */}
        <Section tone="dim">
          <Container class="py-20">
            <div class="grid gap-12 md:grid-cols-2">
              <div>
                <SectionHeading
                  title="Mission"
                  subtitle="To develop and fund projects for the marginalized that address needs of homelessness, hunger, poverty, and education in the Philippines."
                />
              </div>
              <div>
                <SectionHeading
                  title="Vision"
                  subtitle="To create a better future by giving hope and opportunities to those who are trapped by poverty and circumstances beyond their control."
                />
              </div>
            </div>
            <div class="mt-12 overflow-hidden rounded-lg">
              <img
                src="/images/about/hero/vision.jpg"
                alt="Favor Care volunteers serving the community"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Container>
        </Section>

        {/* Core Values */}
        <Section>
          <Container class="py-20">
            <SectionHeading
              title="Core Values"
              subtitle="The principles that guide everything we do."
            />
            <div class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {CORE_VALUES.map((value) => (
                <div
                  key={value}
                  class="flex items-center justify-center rounded-lg border border-surface-container-high bg-surface p-4 text-center text-sm font-semibold text-on-surface transition-colors hover:border-primary hover:text-primary"
                >
                  {value}
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Photo Gallery */}
        <Section tone="dim">
          <Container class="py-20">
            <SectionHeading
              title="Our work in action"
              subtitle="Moments from the field — community outreach, medical missions, and volunteer gatherings."
            />
            <div class="mt-10">
              <Gallery items={GALLERY_ITEMS} columns={4} lightbox={false} />
            </div>
          </Container>
        </Section>

        {/* Team */}
        <Section>
          <Container class="py-20">
            <SectionHeading
              align="center"
              title="Meet our team members"
              subtitle="Together, we strive to make a lasting impact driven by compassion, dedication, and a commitment to positive social change."
            />
            <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {TEAM.map((member) => (
                <div key={member.name} class="text-center">
                  <div class="mx-auto h-40 w-40 overflow-hidden rounded-full bg-surface-container-low">
                    <img
                      src={member.src}
                      alt={member.name}
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 class="mt-4 text-lg font-semibold text-on-surface">
                    {member.name}
                  </h3>
                  <p class="text-sm text-on-surface-variant">{member.role}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Take Action CTA */}
        <Section tone="dim">
          <Container class="py-20">
            <div class="grid items-center gap-12 md:grid-cols-2">
              <div>
                <SectionHeading
                  eyebrow="Take action"
                  title="Join us in our mission to address homelessness, hunger, poverty, and education."
                  subtitle="Together, we can create lasting impact and hope for a better future."
                />
                <div class="mt-8">
                  <Button href="/get-involved">Get involved</Button>
                </div>
              </div>
              <div class="overflow-hidden rounded-lg">
                <img
                  src="/images/about/hero/take-action.jpg"
                  alt="Favor Care community outreach"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
});
