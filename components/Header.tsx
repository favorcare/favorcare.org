import { Button } from "./Button.tsx";
import { Navbar } from "./Navbar.tsx";
import MobileNav from "../islands/MobileNav.tsx";

// Sticky site header: logo + primary nav + Donate CTA + mobile menu.
export function Header() {
  return (
    <header class="sticky top-0 z-50 border-b border-outline-variant/40 bg-surface/90 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <a href="/" class="flex items-center" aria-label="Favor Care home">
          <img src="/logo-black.svg" alt="Favor Care" class="h-8" />
        </a>

        <Navbar />

        <div class="flex items-center gap-1">
          <Button href="#donate" variant="donate">Donate</Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
