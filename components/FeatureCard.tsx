import { cx } from "./cx.ts";
import { Card } from "./Card.tsx";

export interface FeatureCardProps {
  title: string;
  body: string;
  href?: string;
  class?: string;
}

// Linked "way to help" card: title shifts to gold on hover of the whole card.
export function FeatureCard(
  { title, body, href = "#donate", class: extra }: FeatureCardProps,
) {
  return (
    <Card href={href} interactive accent class={cx("group", extra)}>
      <h3 class="text-lg font-semibold text-on-surface group-hover:text-primary">
        {title}
      </h3>
      <p class="mt-2 text-sm leading-relaxed text-on-surface-variant">{body}</p>
    </Card>
  );
}

export default FeatureCard;
