import MailtoForm from "../islands/MailtoForm.tsx";
import { Button } from "./Button.tsx";
import { FormField } from "./FormField.tsx";
import { InputField } from "./InputField.tsx";
import type { NewsletterField } from "./content.ts";

export interface NewsletterFormProps {
  /** Section title (white, 28/36px — the newsletter's own WP dialect). */
  title: string;
  /** Labeled fields, in order (`CONTACT.newsletter.fields`). */
  fields: NewsletterField[];
  /** Submit label (`CONTACT.newsletter.cta`). */
  cta: string;
  /** Inbox the signup email goes to, via `MailtoForm`, until a newsletter
   *  backend lands. */
  recipient: string;
  /** Email subject prefix; the submitter's name is appended
   *  (`CONTACT.newsletter.subject`). */
  subject: string;
  className?: string;
}

/**
 * The Carers Newsletter block for a black band: centered title over a
 * 400px column of labeled `InputField`s and a yellow `Button` submit,
 * submitted through `MailtoForm`.
 *
 * Deliberate WP deviations (accessibility over fidelity): WP's Mailchimp
 * inputs measure 41px and its SUBSCRIBE pill sets white text on Link
 * Yellow (~1.9:1). Here the inputs are the 48px `InputField` and the pill
 * is the standard yellow `Button` with black text, like every other yellow
 * pill on the site.
 */
export function NewsletterForm({
  title,
  fields,
  cta,
  recipient,
  subject,
  className: extra,
}: NewsletterFormProps) {
  return (
    <div className={extra}>
      <h2 className="text-center text-[28px] font-bold leading-tight text-white md:text-[36px] lg:leading-none">
        {title}
      </h2>
      <MailtoForm
        recipient={recipient}
        trackEvent="newsletter_submit"
        subject={{
          prefix: subject,
          nameFields: fields
            .filter((f) => f.type === "text")
            .map((f) => f.name),
        }}
        labels={Object.fromEntries(fields.map((f) => [f.name, f.label]))}
        className="mx-auto mt-8 w-full max-w-[400px] space-y-4"
      >
        {fields.map((f) => (
          <FormField key={f.name} label={f.label} tone="white" size="base">
            <InputField
              type={f.type}
              name={f.name}
              placeholder={f.placeholder}
              required={f.required}
              className="w-full"
            />
          </FormField>
        ))}
        <div className="flex justify-center pt-4">
          <Button variant="yellow" type="submit" className="min-w-[149px]">
            {cta}
          </Button>
        </div>
      </MailtoForm>
    </div>
  );
}

export default NewsletterForm;
