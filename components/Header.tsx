import { Button } from "./Button.tsx";

// Primary navigation — sitemap's 5 items, anchored to on-page sections.
const NAV = [
  { label: "Our Mission", href: "#mission" },
  { label: "What We Do", href: "#programs" },
  { label: "Stories & Impact", href: "#impact" },
  { label: "Get Involved", href: "#involved" },
  { label: "Donate", href: "#donate" },
];

export function Header() {
  return (
    <header class="sticky top-0 z-50 border-b border-outline-variant/40 bg-surface/90 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <a href="/" class="flex items-center" aria-label="Favor Care home">
          <img src="/logo-black.svg" alt="Favor Care" class="h-8" />
        </a>

        <nav class="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              class="text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#involved"
            class="text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
          >
            Prayer Hub
          </a>
        </nav>

        <Button href="#donate" class="px-5">Donate</Button>
      </div>
    </header>
  );
}

export default Header;
