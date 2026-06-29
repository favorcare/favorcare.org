import { Card } from "./Card.tsx";

export interface ProgramCardProps {
  title: string;
  /** Sub-label, e.g. the program's formal name ("Redemptio Christian School"). */
  name?: string;
  body: string;
  href?: string;
  linkLabel?: string;
  class?: string;
}

// Programs-grid card: gold title, formal name, body, and an "Explore →" link.
export function ProgramCard(
  {
    title,
    name,
    body,
    href = "#impact",
    linkLabel = "Explore →",
    class: extra,
  }: ProgramCardProps,
) {
  return (
    <Card interactive class={extra}>
      <h3 class="text-lg font-semibold text-primary">{title}</h3>
      {name && <p class="mt-1 text-sm font-medium text-on-surface">{name}</p>}
      <p class="mt-3 flex-1 text-sm leading-relaxed text-on-surface-variant">
        {body}
      </p>
      <a
        href={href}
        class="mt-4 text-sm font-semibold text-on-surface transition-colors hover:text-primary"
      >
        {linkLabel}
      </a>
    </Card>
  );
}

export default ProgramCard;
