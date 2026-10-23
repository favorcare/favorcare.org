import MailtoForm from "../islands/MailtoForm.tsx";
import { Button } from "./Button.tsx";
import { FormField } from "./FormField.tsx";
import { InputField } from "./InputField.tsx";
import { TextareaField } from "./TextareaField.tsx";
import { CONTACT } from "./content.ts";

export interface ContactFormProps {
  /** `home` is the yellow-card form; `contact` is the contact page's. */
  page?: "home" | "contact";
  /** Home variant only: adds the newsletter opt-in checkbox. */
  newsletter?: boolean;
}

/**
 * The contact form, cloned from the WP form, on `MailtoForm` (submit
 * composes an email to Favor Care's inbox carrying the typed fields).
 *  - `home`: two columns from sm, "LEAVE US A MESSAGE!" label, outlined
 *    SEND pill (the home page's yellow-card form); `newsletter` adds the
 *    opt-in checkbox.
 *  - `contact`: single-column 684px form with WP's exact labels and
 *    placeholders (FIRST NAME / LAST NAME / EMAIL / PHONE / MESSAGE) and a
 *    black SEND pill. WP's phone field carries the placeholder "Email" — a
 *    source quirk kept. Accessibility over fidelity: fields are the 48px
 *    `InputField` (WP measures 40px).
 */
export function ContactForm(
  { page = "home", newsletter = false }: ContactFormProps,
) {
  const mail = {
    recipient: CONTACT.form.recipient,
    subject: {
      prefix: CONTACT.form.subjectPrefix,
      nameFields: ["first-name", "last-name"],
    },
    labels: CONTACT.form.labels,
    noteField: "message",
  };

  if (page === "contact") {
    return (
      <MailtoForm
        {...mail}
        trackEvent="contact_submit"
        class="mx-auto flex w-full max-w-[684px] flex-col gap-[18px]"
      >
        <FormField label="FIRST NAME" labelMobile="FIRST NAME*">
          <InputField
            name="first-name"
            placeholder="First Name*"
            required
            ariaLabel="First name"
            class="w-full"
          />
        </FormField>
        <FormField label="LAST NAME" labelMobile="LAST NAME*">
          <InputField
            name="last-name"
            placeholder="Last Name*"
            required
            ariaLabel="Last name"
            class="w-full"
          />
        </FormField>
        <FormField label="EMAIL" labelMobile="EMAIL*">
          <InputField
            type="email"
            name="email"
            placeholder="Email*"
            required
            ariaLabel="Email"
            class="w-full"
          />
        </FormField>
        <FormField label="PHONE">
          <InputField
            type="tel"
            name="phone"
            placeholder="Email"
            ariaLabel="Phone"
            class="w-full"
          />
        </FormField>
        <FormField label="MESSAGE" labelMobile="MESSAGE*">
          <TextareaField
            name="message"
            placeholder="Message*"
            required
            ariaLabel="Message"
            rows={3}
            class="h-24 w-full resize-none"
          />
        </FormField>
        <div class="mt-1.5 flex justify-center">
          <Button type="submit" variant="black" size="form">SEND</Button>
        </div>
      </MailtoForm>
    );
  }

  return (
    <MailtoForm
      {...mail}
      trackEvent="contact_submit"
      class="grid gap-4 sm:grid-cols-2"
    >
      <FormField label="FIRST NAME">
        <InputField
          name="first-name"
          placeholder="FIRST NAME"
          required
          ariaLabel="First name"
          class="w-full"
        />
      </FormField>
      <FormField label="LAST NAME">
        <InputField
          name="last-name"
          placeholder="LAST NAME"
          required
          ariaLabel="Last name"
          class="w-full"
        />
      </FormField>
      <FormField label="EMAIL">
        <InputField
          type="email"
          name="email"
          placeholder="EMAIL"
          required
          ariaLabel="Email"
          class="w-full"
        />
      </FormField>
      <FormField label="PHONE">
        <InputField
          type="tel"
          name="phone"
          placeholder="PHONE"
          ariaLabel="Phone"
          class="w-full"
        />
      </FormField>
      {newsletter && (
        <div class="sm:col-span-2">
          <label class="flex min-h-12 items-center gap-3 text-sm font-semibold text-black">
            <input
              type="checkbox"
              name="newsletter"
              class="h-5 w-5 accent-primary"
            />
            <span class="lg:hidden">
              SUBSCRIBE TO OUR WEEKLY EMAIL NEWSLETTER!
            </span>
            <span class="hidden lg:inline">
              SUBSCRIBE TO OUR MONTHLY EMAIL NEWSLETTER!
            </span>
          </label>
        </div>
      )}
      <FormField label="LEAVE US A MESSAGE!" class="sm:col-span-2">
        <TextareaField
          name="message"
          placeholder="LEAVE US A MESSAGE!"
          required
          ariaLabel="Message"
          rows={6}
          class="w-full"
        />
      </FormField>
      <div class="sm:col-span-2">
        <Button type="submit" variant="outline-primary" size="form">
          SEND
        </Button>
      </div>
    </MailtoForm>
  );
}

export default ContactForm;
