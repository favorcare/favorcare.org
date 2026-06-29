import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { Stat } from "../Stat.tsx";
import type { StatItem } from "../content.ts";

export interface StatsProps {
  items: StatItem[];
}

// Dark impact band of key metrics.
export function Stats({ items }: StatsProps) {
  return (
    <Section tone="dark">
      <Container class="py-12">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((s) => (
            <Stat
              key={s.label}
              value={s.value}
              label={s.label}
              tone="on-dark"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Stats;
