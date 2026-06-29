import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Hero } from "../components/sections/Hero.tsx";
import { Stats } from "../components/sections/Stats.tsx";
import { Mission } from "../components/sections/Mission.tsx";
import { Campaign } from "../components/sections/Campaign.tsx";
import { Programs } from "../components/sections/Programs.tsx";
import { Impact } from "../components/sections/Impact.tsx";
import { GetInvolved } from "../components/sections/GetInvolved.tsx";
import { DonateCTA } from "../components/sections/DonateCTA.tsx";
import { Newsletter } from "../components/sections/Newsletter.tsx";
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
        <Hero {...HERO} />
        <Stats items={STATS} />
        <Mission {...MISSION} />
        <Campaign {...CAMPAIGN} />
        <Programs
          title="What we do"
          subtitle="Our programs, organized by pillar of impact."
          items={PROGRAMS}
        />
        <Impact {...IMPACT} />
        <GetInvolved
          title="Get involved"
          subtitle="There’s a place for you here. Every gift of time, skill, or prayer matters."
          items={WAYS_TO_HELP}
        />
        <DonateCTA {...DONATE_CTA} />
        <Newsletter {...NEWSLETTER} />
      </main>
      <Footer />
    </>
  );
});
