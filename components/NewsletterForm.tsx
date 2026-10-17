import { Button } from "./Button.tsx";
import { InputField } from "./InputField.tsx";
import type { NewsletterField } from "./content.ts";

export interface NewsletterFormProps {
  /** Section title (white, 28/36px — the newsletter's own WP dialect). */
  title: string;
  /** Labeled fields, in order (`CONTACT.newsletter.fields`). */
  fields: NewsletterField[];
  /** Submit label (`CONTACT.newsletter.cta`). */
  cta: string;
  /** Form action — a `mailto:` until a newsletter backend lands. */
  action: string;
  class?: string;
}

/**
 * The Carers Newsletter block for a black band: centered title over a
 * 400px column of labeled `InputField`s and a yellow `Button` submit.
 *
 * Deliberate WP deviations (accessibility over fidelity): WP's Mailchimp
 * inputs measure 41px and its SUBSCRIBE pill sets white text on Link
 * Yellow (~1.9:1). Here the inputs are the 48px `InputField` and the pill
 * is the standard yellow `Button` with black text, like every other yellow
 * pill on the site.
 */
export function NewsletterForm(
  { title, fields, cta, action, class: extra }: NewsletterFormProps,
) {
  return (
    <div class={extra}>
      <h2 class="text-center text-[28px] font-bold leading-tight text-white md:text-[36px] lg:leading-none">
        {title}
      </h2>
      <form
        action={action}
        method="post"
        class="mx-auto mt-8 w-full max-w-[400px] space-y-4"
      >
        {fields.map((f) => (
          <label key={f.name} class="block">
            <span class="mb-1 block text-base font-semibold text-white">
              {f.label}
            </span>
            <InputField
              type={f.type}
              name={f.name}
              placeholder={f.placeholder}
              required={f.required}
              class="w-full"
            />
          </label>
        ))}
        <div class="flex justify-center pt-4">
          <Button variant="yellow" type="submit" class="min-w-[149px]">
            {cta}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewsletterForm;
