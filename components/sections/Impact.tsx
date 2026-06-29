import type { ComponentChildren } from "preact";
import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import { Eyebrow } from "../Eyebrow.tsx";
import { Button } from "../Button.tsx";
import { Checklist } from "../Checklist.tsx";

interface Cta {
  label: string;
  href: string;
}

export interface ImpactProps {
  id?: string;
  eyebrow?: string;
  title: string;
  body: string;
  cta?: Cta;
  imageAlt?: string;
  trustTitle?: string;
  trustFacts?: ComponentChildren[];
}

// Story lede + photo, plus a trust-facts panel.
export function Impact(
  {
    id = "impact",
    eyebrow,
    title,
    body,
    cta,
    imageAlt,
    trustTitle,
    trustFacts,
  }: ImpactProps,
) {
  return (
    <Section id={id} tone="dim">
      <Container class="py-20">
        <div class="grid items-center gap-12 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow={eyebrow} title={title} subtitle={body} />
            {cta && (
              <div class="mt-6">
                <Button variant="secondary" href={cta.href}>{cta.label}</Button>
              </div>
            )}
          </div>
          <div
            role="img"
            aria-label={imageAlt ??
              "Maria, a student at Redemptio — photo coming soon"}
            class="aspect-4/3 rounded-lg bg-surface-container"
          />
        </div>

        {trustFacts && trustFacts.length > 0 && (
          <div class="mt-12 rounded-lg border border-surface-container-high bg-surface p-6 md:p-8">
            {trustTitle && (
              <Eyebrow tone="muted" size="sm">{trustTitle}</Eyebrow>
            )}
            <Checklist class="mt-4" items={trustFacts} />
          </div>
        )}
      </Container>
    </Section>
  );
}

export default Impact;
