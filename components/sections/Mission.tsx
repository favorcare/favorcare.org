import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { Button } from "../Button.tsx";

interface Cta {
  label: string;
  href: string;
}

export interface MissionProps {
  id?: string;
  title: string;
  body: string;
  cta?: Cta;
  imageAlt?: string;
}

// Two-column mission statement with a photo placeholder.
export function Mission(
  { id = "mission", title, body, cta, imageAlt }: MissionProps,
) {
  return (
    <Section id={id}>
      <Container class="py-20">
        <div class="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 class="text-3xl font-semibold tracking-tight text-on-surface md:text-4xl">
              {title}
            </h2>
            <p class="mt-6 text-lg leading-relaxed text-on-surface-variant">
              {body}
            </p>
            {cta && (
              <div class="mt-8">
                <Button variant="secondary" href={cta.href}>{cta.label}</Button>
              </div>
            )}
          </div>
          <div
            role="img"
            aria-label={imageAlt ??
              "A child or family we serve — photo coming soon"}
            class="aspect-4/3 rounded-lg bg-surface-container-low"
          />
        </div>
      </Container>
    </Section>
  );
}

export default Mission;
