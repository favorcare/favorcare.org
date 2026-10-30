import { cx } from "./cx.ts";
import { PlusIcon } from "./icons.tsx";
import type { FaqItem } from "./content.ts";

export interface FaqProps {
  items: FaqItem[];
  /** Wrapper additions (the contact page sets the top border). */
  className?: string;
}

// FAQ accordion cloned from the WP contact page: full-width rows divided
// by 15% hairlines, 51px minimum summary height, 16px bold questions,
// and a plus glyph that rotates 45° on open. Native <details> keeps it
// keyboard- and screen-reader-accessible with zero client JS; answers
// stay collapsed (out of innerText), as on WP.
export function Faq({ items, className: extra }: FaqProps) {
  return (
    <div className={cx("border-t border-primary/15", extra)}>
      {items.map((item) => (
        <details key={item.q} className="group border-b border-primary/15">
          <summary className="flex min-h-[51px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-bold text-primary [&::-webkit-details-marker]:hidden">
            {item.q}
            <PlusIcon
              size={14}
              className="shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <p className="pb-4 text-base leading-relaxed text-on-surface">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

export default Faq;
