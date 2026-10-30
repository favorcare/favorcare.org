import type { Metadata } from "next";
import { Header } from "../../../components/Header.tsx";
import { Footer } from "../../../components/Footer.tsx";
import { PRIVACY } from "../../../components/content.ts";

export const metadata: Metadata = {
  title: "Privacy Policy — Favor Care",
  description:
    "How Favor Care collects, uses, and protects your personal information.",
};

// Privacy policy — cloned verbatim from the WP page (staging = canonical):
// no hero band, just a centered 48px/40px title over white, then a single
// left-aligned prose column (32px/500 section headings, 16px/24 body at a
// 780px measure). WP serves this page a stale header template; the clone
// keeps the standard site chrome (documented quirk — clone-diff masks
// chrome for this page). WP's section headings carry a trailing
// zero-width space — kept in content.
export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="bg-white">
        <section className="px-2.5 pb-24 pt-14 md:px-5 lg:px-0">
          <div className="mx-auto w-full max-w-[780px]">
            <h1 className="text-center text-[48px] font-bold leading-tight text-primary md:text-[40px]">
              {PRIVACY.title}
            </h1>
            <div className="mt-12 space-y-5">
              {PRIVACY.blocks.map((b, i) =>
                "h" in b ? (
                  <h2
                    key={i}
                    className="pt-5 text-[32px] font-medium leading-tight text-primary"
                  >
                    {b.h}
                  </h2>
                ) : (
                  <p key={i} className="text-base leading-6 text-primary">
                    {b.p}
                  </p>
                ),
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
