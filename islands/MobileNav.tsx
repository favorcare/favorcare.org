import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { NAV, type NavLink } from "../components/navigation.ts";

export interface MobileNavProps {
  links?: NavLink[];
}

// Hamburger menu for small screens (the desktop Navbar is hidden below `md`).
// Toggles a full-width dropdown pinned under the sticky header bar.
export default function MobileNav({ links = NAV }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div class="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        class="inline-flex h-12 w-12 items-center justify-center rounded text-on-surface transition-colors hover:bg-surface-container-low"
      >
        {open
          ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          )
          : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
      </button>

      {open && (
        <div class="absolute inset-x-0 top-16 border-b border-outline-variant/40 bg-surface shadow-md">
          <nav
            class="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4"
            aria-label="Mobile"
          >
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                class="rounded px-2 py-3 text-base font-semibold text-on-surface transition-colors hover:bg-surface-container-low hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              href="#donate"
              variant="donate"
              class="mt-2 w-full"
            >
              Donate
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
