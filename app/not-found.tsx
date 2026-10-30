import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Button } from "../components/Button.tsx";
import { cx } from "../components/cx.ts";
import { frame, gutter } from "../components/layout/Container.tsx";

// 404 — rendered for unknown URLs and for notFound() (e.g. an unknown
// /posts/<slug>), inside the site chrome.
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className={cx(gutter(), "py-24 text-center")}>
          <div className={frame()}>
            <h1 className="text-[32px] font-semibold leading-tight text-primary md:text-[50px]">
              Page not found
            </h1>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
              We couldn&apos;t find the page you were looking for.
            </p>
            <Button href="/" className="mt-8">
              Back to home
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
