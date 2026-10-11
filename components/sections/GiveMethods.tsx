import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import { Card } from "../Card.tsx";
import { Button } from "../Button.tsx";
import type { GiveRegion } from "../content.ts";

export interface GiveMethodsProps {
  id?: string;
  title: string;
  subtitle?: string;
  regions: GiveRegion[];
}

// "How to Give" — one block per country/region, each with method cards.
// The first line of a method renders emphasized (bank names, account names).
export function GiveMethods(
  { id, title, subtitle, regions }: GiveMethodsProps,
) {
  return (
    <Section id={id}>
      <Container class="py-20">
        <SectionHeading title={title} subtitle={subtitle} align="center" />
        <div class="mt-12 space-y-16">
          {regions.map((region) => (
            <div key={region.name}>
              <h3 class="text-2xl font-semibold tracking-tight text-on-surface">
                {region.name}
              </h3>
              {region.intro && (
                <p class="mt-3 max-w-2xl text-base leading-relaxed text-on-surface-variant">
                  {region.intro}
                </p>
              )}
              <div class="mt-6 grid gap-6 md:grid-cols-3">
                {region.methods.map((method) => (
                  <Card key={method.title}>
                    <h4 class="font-semibold text-on-surface">
                      {method.title}
                    </h4>
                    {method.lines?.map((line, i) => (
                      <p
                        key={i}
                        class={i === 0
                          ? "mt-3 text-base font-medium text-on-surface"
                          : "mt-1 text-base leading-relaxed text-on-surface-variant"}
                      >
                        {line}
                      </p>
                    ))}
                    {method.cta && (
                      <div class="mt-4">
                        <Button
                          href={method.cta.href}
                          {...(method.cta.external && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                        >
                          {method.cta.label}
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default GiveMethods;
