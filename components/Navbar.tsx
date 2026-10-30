import { cx } from "./cx.ts";
import { NAV, type NavLink } from "./navigation.ts";

export interface NavbarProps {
  links?: NavLink[];
  className?: string;
}

// Desktop primary navigation on the yellow header bar: white capitalized
// links that invert to a black pill on hover (WP "default-navigation").
// Hidden below `md` — see MobileNav island for small screens.
export function Navbar({ links = NAV, className: extra }: NavbarProps) {
  return (
    <nav
      className={cx("hidden items-center gap-7 md:flex", extra)}
      aria-label="Primary"
    >
      {links.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="rounded px-2 py-2 text-base font-semibold capitalize text-white transition-colors hover:bg-black hover:text-white"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navbar;
