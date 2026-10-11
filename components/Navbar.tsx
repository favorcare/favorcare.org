import { cx } from "./cx.ts";
import { NAV, type NavLink } from "./navigation.ts";

export interface NavbarProps {
  links?: NavLink[];
  class?: string;
}

// Desktop primary navigation on the black header bar: small white UPPERCASE
// links with an underline that fades in on hover (WP "default-navigation").
// Hidden below `md` — see MobileNav island for small screens.
export function Navbar({ links = NAV, class: extra }: NavbarProps) {
  return (
    <nav
      class={cx("hidden items-center gap-7 md:flex", extra)}
      aria-label="Primary"
    >
      {links.map((item) => (
        <a
          key={item.href}
          href={item.href}
          class="relative py-2 text-xs font-semibold uppercase tracking-wider text-on-primary transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-current after:opacity-0 after:transition-opacity after:duration-200 hover:after:opacity-100"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navbar;
