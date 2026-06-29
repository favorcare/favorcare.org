import type { ComponentChildren } from "preact";
import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { Eyebrow } from "../Eyebrow.tsx";
import { Button } from "../Button.tsx";

interface Cta {
  label: string;
  href: string;
}

export interface HeroProps {
  eyebrow?: string;
  title: ComponentChildren;
  subtitle?: string;
  primary?: Cta;
  secondary?: Cta;
}

// Homepage hero: brand eyebrow, display headline, lede, and CTA pair.
export function Hero(
  { eyebrow, title, subtitle, primary, secondary }: HeroProps,
) {
  return (
    <Section tone="hero">
      <Container class="py-24 md:py-32">
        {eyebrow && <Eyebrow tone="container">{eyebrow}</Eyebrow>}
        <h1 class="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-on-surface md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant">
            {subtitle}
          </p>
        )}
        {(primary || secondary) && (
          <div class="mt-8 flex flex-wrap gap-4">
            {primary && <Button href={primary.href}>{primary.label}</Button>}
            {secondary && (
              <Button variant="secondary" href={secondary.href}>
                {secondary.label}
              </Button>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}

export default Hero;
