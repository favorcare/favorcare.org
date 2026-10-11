import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { Button } from "../Button.tsx";
import type { Cta } from "../content.ts";

export interface TakeActionProps {
  id?: string;
  title: string;
  body: string;
  cta: Cta;
}

// Closing band shared by inner pages: heading + copy + gold CTA on a dim
// surface (mirrors the source site's "Take Action" blocks).
export function TakeAction({ id, title, body, cta }: TakeActionProps) {
  return (
    <Section id={id} tone="dim">
      <Container class="py-20 text-center">
        <h2 class="text-3xl font-semibold tracking-tight text-on-surface md:text-4xl">
          {title}
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-on-surface-variant">
          {body}
        </p>
        <div class="mt-8 flex justify-center">
          <Button href={cta.href}>{cta.label}</Button>
        </div>
      </Container>
    </Section>
  );
}

export default TakeAction;
