import type { ComponentChildren } from "preact";
import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import { FeatureCard } from "../FeatureCard.tsx";
import type { WayItem } from "../content.ts";

export interface GetInvolvedProps {
  id?: string;
  title: ComponentChildren;
  subtitle?: ComponentChildren;
  items: WayItem[];
}

// "Get involved" — linked ways-to-help cards.
export function GetInvolved(
  { id = "involved", title, subtitle, items }: GetInvolvedProps,
) {
  return (
    <Section id={id}>
      <Container class="py-20">
        <SectionHeading title={title} subtitle={subtitle} />
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((w) => <FeatureCard key={w.title} {...w} />)}
        </div>
      </Container>
    </Section>
  );
}

export default GetInvolved;
