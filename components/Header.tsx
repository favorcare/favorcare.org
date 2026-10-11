import { Navbar } from "./Navbar.tsx";
import MobileNav from "../islands/MobileNav.tsx";

// Sticky black header bar (WP template `new-header`, post 1243): white
// two-line logo left, small uppercase nav center, yellow DONATE pill right.
// Small screens use the burger (MobileNav island).
export function Header() {
  return (
    <header class="sticky top-0 z-50 bg-black py-[10px]">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
        <a href="/" class="flex items-center" aria-label="Favor Care home">
          <img src="/logo-white.svg" alt="Favor Care" class="h-10 w-auto" />
        </a>

        <Navbar />

        <div class="flex items-center gap-2">
          <a
            href="/givenow"
            class="inline-flex min-h-12 items-center justify-center rounded-full bg-yellow px-6 text-sm font-bold uppercase tracking-wider text-primary transition-opacity hover:opacity-90"
          >
            Donate
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
