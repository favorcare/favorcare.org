import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { Eyebrow } from "../Eyebrow.tsx";
import { Button } from "../Button.tsx";
import { ProgressBar } from "../ProgressBar.tsx";

interface Cta {
  label: string;
  href: string;
}

export interface CampaignProps {
  eyebrow?: string;
  title: string;
  body: string;
  raised?: string;
  goal?: string;
  percent?: number;
  cta?: Cta;
}

// Featured fundraising campaign card with a progress bar.
export function Campaign(
  { eyebrow, title, body, raised, goal, percent = 0, cta }: CampaignProps,
) {
  return (
    <Section tone="dim">
      <Container class="py-16">
        <div class="rounded-xl border border-surface-container-high bg-surface p-8 shadow-md md:p-12">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h3 class="mt-3 text-2xl font-semibold text-on-surface md:text-3xl">
            {title}
          </h3>
          <p class="mt-2 text-on-surface-variant">{body}</p>
          <div class="mt-6">
            <ProgressBar value={percent} raised={raised} goal={goal} />
          </div>
          {cta && (
            <div class="mt-8">
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

export default Campaign;
