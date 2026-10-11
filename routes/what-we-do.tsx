import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Hero } from "../components/sections/Hero.tsx";
import { ProgramDetails } from "../components/sections/ProgramDetails.tsx";
import { DonateCTA } from "../components/sections/DonateCTA.tsx";
import { TakeAction } from "../components/sections/TakeAction.tsx";
import { WHAT_WE_DO } from "../components/content.ts";

export default define.page(function WhatWeDoPage() {
  return (
    <>
      <Head>
        <title>What we do — Favor Care</title>
        <meta name="description" content={WHAT_WE_DO.hero.subtitle} />
      </Head>
      <Header />
      <main id="main-content" tabindex="-1">
        <Hero {...WHAT_WE_DO.hero} />
        <ProgramDetails items={WHAT_WE_DO.programs} />
        <DonateCTA {...WHAT_WE_DO.donate} />
        <TakeAction {...WHAT_WE_DO.takeAction} />
      </main>
      <Footer />
    </>
  );
});
