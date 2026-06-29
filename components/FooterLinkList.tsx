import { Eyebrow } from "./Eyebrow.tsx";
import type { NavLink } from "./navigation.ts";

export interface FooterLinkListProps {
  title: string;
  links: NavLink[];
}

// A titled link column for the footer (inverse eyebrow header, muted links).
export function FooterLinkList({ title, links }: FooterLinkListProps) {
  return (
    <div>
      <Eyebrow tone="inverse" size="xs">{title}</Eyebrow>
      <ul class="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              class="text-surface/80 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterLinkList;
