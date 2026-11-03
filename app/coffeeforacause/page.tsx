import type { Metadata } from "next";
import { CfacHero } from "../../components/campaigns/cfac/Hero.tsx";
import { CfacIntro } from "../../components/campaigns/cfac/Intro.tsx";
import { CfacStories } from "../../components/campaigns/cfac/Stories.tsx";
import { CfacHowItWorks } from "../../components/campaigns/cfac/HowItWorks.tsx";
import { CfacGive } from "../../components/campaigns/cfac/Give.tsx";
import { CfacPillars } from "../../components/campaigns/cfac/Pillars.tsx";
import { CfacArticles } from "../../components/campaigns/cfac/Articles.tsx";
import { CfacContact } from "../../components/campaigns/cfac/Contact.tsx";
import { CFAC } from "../../components/campaigns/cfac/content.ts";

export const metadata: Metadata = {
  title: `${CFAC.name} — Favor Care`,
  description: CFAC.hero.lead,
};

// The Coffee for a Cause landing page — the campaign team's design
// (favorcare/cfac-landing-page) section for section. Every section is a
// campaign component (components/campaigns/cfac/), all copy lives in
// content.ts, and the look comes from the layout's `.cfac` scope.
export default function CfaCausePage() {
  return (
    <>
      <CfacHero />
      <CfacIntro />
      <CfacStories />
      <CfacHowItWorks />
      <CfacGive />
      <CfacPillars />
      <CfacArticles />
      <CfacContact />
    </>
  );
}
