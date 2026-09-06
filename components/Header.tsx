import { Navbar } from "./Navbar.tsx";
import MobileNav from "../islands/MobileNav.tsx";

// Sticky site header, styled after favorcare.org: a solid gold (primary) bar
// with the black two-line wordmark logo, centered nav (underline-on-hover),
// and a black DONATE button whose hover/focus tooltip shows the PCNC + DSWD
// accreditation marks. Small screens use the burger (MobileNav island).
export function Header() {
  return (
    <header class="sticky top-0 z-50 bg-primary">
      <div class="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
        <a href="/" class="flex items-center" aria-label="Favor Care home">
          <img src="/logo-black.svg" alt="Favor Care" class="h-10 w-auto" />
        </a>

        <Navbar />

        <div class="flex items-center gap-2">
          <DonateCta />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

// Black DONATE call-to-action — high contrast against the gold bar — with a
// hover/focus tooltip of the PCNC + DSWD accreditation logos. The tooltip is
// hover/focus-driven and only activates at `md`+ (touch has no hover; the
// burger menu has its own gold Donate button).
function DonateCta() {
  return (
    <div class="group relative">
      <a
        href="#donate"
        class="inline-flex min-h-11 items-center justify-center rounded bg-on-primary px-5 font-bold uppercase text-white transition-colors hover:bg-on-primary/90"
      >
        Donate
      </a>

      <div
        role="tooltip"
        class="pointer-events-none absolute right-0 top-full z-50 mt-2 w-max max-w-[90vw] translate-y-1 opacity-0 transition duration-150 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100"
      >
        <div class="rounded-lg border border-outline-variant/40 bg-surface p-3 shadow-md">
          <p class="mb-2 text-xs font-semibold text-on-surface-variant">
            Accredited by:
          </p>
          <div class="flex items-center gap-3">
            <img
              src="/images/orgs/PCNC.png"
              alt="Philippine Council for NGO Certification"
              class="h-9 w-auto"
            />
            <img
              src="/images/orgs/DSWD.png"
              alt="Department of Social Welfare and Development"
              class="h-9 w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
