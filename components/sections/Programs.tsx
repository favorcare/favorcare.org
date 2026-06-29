import type { ComponentChildren } from "preact";
import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import { ProgramCard } from "../ProgramCard.tsx";
import type { ProgramItem } from "../content.ts";

export interface ProgramsProps {
  id?: string;
  title: ComponentChildren;
  subtitle?: ComponentChildren;
  items: ProgramItem[];
}

// "What we do" — 4-column grid of program pillars.
export function Programs(
  { id = "programs", title, subtitle, items }: ProgramsProps,
) {
  return (
    <Section id={id}>
      <Container class="py-20">
        <SectionHeading title={title} subtitle={subtitle} />
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => <ProgramCard key={p.title} {...p} />)}
        </div>
      </Container>
    </Section>
  );
}

export default Programs;
