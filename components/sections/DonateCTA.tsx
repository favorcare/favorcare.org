import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { Button } from "../Button.tsx";

interface Cta {
  label: string;
  href: string;
}

export interface DonateCTAProps {
  id?: string;
  title: string;
  body?: string;
  cta?: Cta;
}

// Full-bleed gold donation call-to-action (uses the inverted button variant).
export function DonateCTA(
  { id = "donate", title, body, cta }: DonateCTAProps,
) {
  return (
    <Section id={id} tone="primary">
      <Container class="py-20 text-center">
        <h2 class="text-3xl font-bold tracking-tight text-on-primary md:text-4xl">
          {title}
        </h2>
        {body && <p class="mx-auto mt-4 max-w-xl text-on-primary/80">{body}</p>}
        {cta && (
          <div class="mt-8 flex justify-center">
            <Button variant="inverted" href={cta.href}>{cta.label}</Button>
          </div>
        )}
      </Container>
    </Section>
  );
}

export default DonateCTA;
