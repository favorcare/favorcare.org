import { cx } from "./cx.ts";
import { type Testimonial, TestimonialCard } from "./TestimonialCard.tsx";

export interface TestimonialGridProps {
  items: Testimonial[];
  class?: string;
}

// Responsive grid of TestimonialCards (1 → 2 → 3 columns).
export function TestimonialGrid({ items, class: extra }: TestimonialGridProps) {
  return (
    <div class={cx("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", extra)}>
      {items.map((t) => <TestimonialCard key={t.name} {...t} />)}
    </div>
  );
}

export default TestimonialGrid;
