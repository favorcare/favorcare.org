"use client";

import { useState, type ReactNode } from "react";
import { CloseIcon, MenuIcon } from "../components/icons.tsx";
import type { NavLink } from "../components/navigation.ts";

export interface CfacMobileNavProps {
  links: NavLink[];
  /** Server-rendered lockup shown at the top of the open menu. */
  children?: ReactNode;
}

/**
 * The CFAC header's burger menu (below `xl`, as in cfac-landing-page): a
 * toggle that expands a gold panel under the bar with the co-brand lockup
 * (`children`) and the site links. The panel stays in the DOM and only
 * collapses, so links remain in the markup for no-JS and crawlers.
 */
export default function CfacMobileNav({ links, children }: CfacMobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="cfac-mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="inline-flex h-12 w-12 items-center justify-center rounded text-primary transition-colors hover:bg-primary/10"
      >
        {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      <div
        id="cfac-mobile-menu"
        aria-hidden={!open}
        className={`absolute inset-x-0 top-full overflow-hidden border-b border-primary/10 bg-yellow shadow-md transition-all ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="space-y-1 py-4" aria-label="Mobile">
          <div className="flex justify-center border-b border-primary/10 px-4 pb-4">
            {children}
          </div>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="block px-5 py-3 text-lg font-semibold tracking-tight text-primary hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
