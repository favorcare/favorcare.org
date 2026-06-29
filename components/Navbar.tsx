import { cx } from "./cx.ts";
import { NAV, type NavLink } from "./navigation.ts";

export interface NavbarProps {
  links?: NavLink[];
  class?: string;
}

// Desktop primary navigation. Hidden below `md` — see MobileNav island for small screens.
export function Navbar({ links = NAV, class: extra }: NavbarProps) {
  return (
    <nav
      class={cx("hidden items-center gap-8 md:flex", extra)}
      aria-label="Primary"
    >
      {links.map((item) => (
        <a
          key={item.href}
          href={item.href}
          class="text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navbar;
