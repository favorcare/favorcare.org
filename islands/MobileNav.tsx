import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { CloseIcon, MenuIcon } from "../components/icons.tsx";
import { NAV, type NavLink } from "../components/navigation.ts";

export interface MobileNavProps {
  links?: NavLink[];
}

// Hamburger menu for small screens (the desktop Navbar is hidden below `md`).
// Toggles a full-width dropdown pinned under the yellow header bar. The
// dropdown markup stays in the DOM with visibility toggling — WP does the
// same, so its link text shows up for text-parity and search engines alike.
export default function MobileNav({ links = NAV }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div class="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        class="inline-flex h-12 w-12 items-center justify-center rounded text-black transition-colors hover:bg-black/10"
      >
        {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      <div
        aria-hidden={!open}
        class={`absolute inset-x-0 top-full overflow-hidden border-b border-outline-variant/40 bg-surface shadow-md transition-all ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          class="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4"
          aria-label="Mobile"
        >
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              class="rounded px-2 py-3 text-base font-semibold text-on-surface transition-colors hover:bg-surface-container-low hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button
            href="/givenow"
            variant="donate"
            class="mt-2 w-full"
            tabIndex={open ? 0 : -1}
          >
            DONATE
          </Button>
        </nav>
      </div>
    </div>
  );
}
