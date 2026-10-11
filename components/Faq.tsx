import { Section } from "./layout/Section.tsx";
import { Container } from "./layout/Container.tsx";
import { SectionHeading } from "./layout/SectionHeading.tsx";
import type { FaqItem } from "./content.ts";

export interface FaqProps {
  id?: string;
  title: string;
  items: FaqItem[];
}

// Accordion built on native <details>/<summary> — keyboard- and
// screen-reader-accessible with zero client JS.
export function Faq({ id, title, items }: FaqProps) {
  return (
    <Section id={id}>
      <Container class="py-20">
        <SectionHeading title={title} />
        <div class="mt-10 space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              class="rounded-lg border border-surface-container-high bg-surface"
            >
              <summary class="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold text-on-surface [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  class="text-primary transition-transform duration-200 open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p class="px-6 pb-4 text-base leading-relaxed text-on-surface-variant">
                {item.a}
                {item.link && (
                  <>
                    {" "}
                    <a
                      href={item.link.href}
                      class="font-semibold text-primary hover:underline"
                    >
                      {item.link.label}
                    </a>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Faq;
