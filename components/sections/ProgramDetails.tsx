import type { ComponentChildren } from "preact";
import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import { Card } from "../Card.tsx";
import type { ProgramDetailItem } from "../content.ts";

export interface ProgramDetailsProps {
  id?: string;
  /** Optional section intro; omit to render the card grid alone. */
  title?: ComponentChildren;
  subtitle?: ComponentChildren;
  items: ProgramDetailItem[];
}

// Long-form program areas: one card per area — title, semibold one-line
// summary, then detail paragraphs (with an optional mid-card sub-head).
export function ProgramDetails(
  { id, title, subtitle, items }: ProgramDetailsProps,
) {
  return (
    <Section id={id}>
      <Container class="py-20">
        {title !== undefined && (
          <SectionHeading title={title} subtitle={subtitle} />
        )}
        <div
          class={title !== undefined
            ? "mt-10 grid gap-6 sm:grid-cols-2"
            : "grid gap-6 sm:grid-cols-2"}
        >
          {items.map((program) => (
            <Card key={program.title}>
              <h3 class="text-xl font-semibold text-on-surface">
                {program.title}
              </h3>
              <p class="mt-2 font-medium text-on-surface">{program.summary}</p>
              {program.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  class="mt-3 text-base leading-relaxed text-on-surface-variant"
                >
                  {paragraph}
                </p>
              ))}
              {program.subHeading && (
                <h4 class="mt-4 font-semibold text-on-surface">
                  {program.subHeading}
                </h4>
              )}
              {program.subParagraphs?.map((paragraph, i) => (
                <p
                  key={i}
                  class="mt-2 text-base leading-relaxed text-on-surface-variant"
                >
                  {paragraph}
                </p>
              ))}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default ProgramDetails;
