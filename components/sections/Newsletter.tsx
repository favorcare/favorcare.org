import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { Button } from "../Button.tsx";
import { InputField } from "../InputField.tsx";

export interface NewsletterProps {
  title: string;
  body?: string;
  /** Form action; defaults to a mailto fallback. */
  action?: string;
  buttonLabel?: string;
}

// Newsletter signup — email input + subscribe button.
export function Newsletter(
  {
    title,
    body,
    action = "mailto:hello@favorcare.org",
    buttonLabel = "Subscribe",
  }: NewsletterProps,
) {
  return (
    <Section tone="dim">
      <Container class="py-16">
        <div class="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 class="text-2xl font-semibold text-on-surface">{title}</h2>
          {body && <p class="mt-2 text-on-surface-variant">{body}</p>}
          <form
            class="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            action={action}
            method="post"
            enctype="text/plain"
          >
            <InputField
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              ariaLabel="Email address"
            />
            <Button type="submit">{buttonLabel}</Button>
          </form>
        </div>
      </Container>
    </Section>
  );
}

export default Newsletter;
