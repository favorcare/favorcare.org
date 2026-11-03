import { cx } from "../../cx.ts";
import { PlusIcon } from "../../icons.tsx";
import type { CfacFaqItem } from "./content.ts";

export interface CfacFaqProps {
  items: CfacFaqItem[];
  /** Indexes open on first render (the sample opens the first). */
  defaultOpen?: number[];
  className?: string;
}

/**
 * The CFAC FAQ, cloned from cfac-landing-page's donate-section accordion:
 * separate 16px-round white cards with a hairline border, a gold-tint
 * hover, and rich answers (paragraphs, lead-ins, bullet lists). Native
 * `<details>` keeps it keyboard-accessible with zero client JS — unlike the
 * site `Faq` (flat hairline rows, plain-string answers). Answer text is
 * 16px (the sample's 14px is below the DESIGN.md floor).
 */
export function CfacFaq({
  items,
  defaultOpen = [0],
  className: extra,
}: CfacFaqProps) {
  return (
    <div className={cx("space-y-3", extra)}>
      {items.map((item, i) => (
        <details
          key={item.q}
          open={defaultOpen.includes(i)}
          className="group overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface"
        >
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-semibold text-primary transition-colors hover:bg-yellow/10 [&::-webkit-details-marker]:hidden">
            {item.q}
            <PlusIcon
              size={14}
              className="shrink-0 transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <div className="space-y-3 px-5 pb-5 pt-2 text-base leading-relaxed text-on-surface">
            {item.a.map((block, j) =>
              "list" in block ? (
                <ul key={j} className="ml-2 list-inside list-disc space-y-1">
                  {block.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ) : (
                <p
                  key={block.p}
                  className={block.strong ? "font-semibold" : undefined}
                >
                  {block.p}
                </p>
              ),
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

export default CfacFaq;
