import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Hero } from "../components/sections/Hero.tsx";
import { GetInvolved } from "../components/sections/GetInvolved.tsx";
import { DonateCTA } from "../components/sections/DonateCTA.tsx";
import { Newsletter } from "../components/sections/Newsletter.tsx";
import {
  DONATE_CTA,
  GET_INVOLVED,
  NEWSLETTER,
  WAYS_TO_HELP,
} from "../components/content.ts";

export default define.page(function GetInvolvedPage() {
  return (
    <>
      <Head>
        <title>Get involved — Favor Care</title>
        <meta name="description" content={GET_INVOLVED.hero.subtitle} />
      </Head>
      <Header />
      <main>
        <Hero {...GET_INVOLVED.hero} />
        <GetInvolved
          id="ways"
          title={GET_INVOLVED.ways.title}
          subtitle={GET_INVOLVED.ways.subtitle}
          items={WAYS_TO_HELP}
        />
        <DonateCTA {...DONATE_CTA} />
        <Newsletter {...NEWSLETTER} />
      </main>
      <Footer />
    </>
  );
});
