import MailtoForm from "../islands/MailtoForm.tsx";
import { Button } from "./Button.tsx";
import { FormField } from "./FormField.tsx";
import { InputField } from "./InputField.tsx";
import { SectionHeading } from "./layout/SectionHeading.tsx";

/** The input a give-now form label (e.g. "CONTACT EMAIL") maps to. */
export interface TaxField {
  /** Kebab-case input name: `contact-email`. */
  name: string;
  /** Title-cased placeholder: `Contact Email`. */
  placeholder: string;
  type: "text" | "email";
}

/**
 * Derive a field's input name, placeholder, and type from its WP label.
 * Only "CONTACT EMAIL" is an email input; the rest are text (WP has no
 * file upload for PROOF OF DONATION yet).
 */
export function taxField(label: string): TaxField {
  return {
    name: label.toLowerCase().replace(/ /g, "-"),
    placeholder: label
      .toLowerCase()
      .replace(/^\w|\s\w/g, (c) => c.toUpperCase()),
    type: label === "CONTACT EMAIL" ? "email" : "text",
  };
}

export interface TaxDeductibleFormProps {
  title: string;
  intro: string;
  /** Field labels in order (`GIVENOW.ph.taxDeductible.fields`). */
  fields: string[];
  /** Submit label. */
  submit: string;
  /** Inbox for the request, via `MailtoForm` (finance@favorcare.org). */
  recipient: string;
  /** Email subject prefix; the contact name is appended. */
  subject: string;
}

/**
 * The give-now Tax-Deductible Giving card: yellow, radius 30, 50px padding,
 * left-aligned 56px heading, then one 59px borderless `InputField` per
 * label and a ghost `Button` submit. Submits through `MailtoForm`; each
 * label prefixes its line in the email body (no file upload yet, so PROOF
 * OF DONATION is typed text). Place it in a section — the route owns the
 * outer spacing (and the mobile order-first quirk).
 */
export function TaxDeductibleForm({
  title,
  intro,
  fields,
  submit,
  recipient,
  subject,
}: TaxDeductibleFormProps) {
  return (
    <div className="mx-auto w-full max-w-[833px] rounded-card bg-yellow p-[50px]">
      <SectionHeading
        title={title}
        align="left"
        size="56"
        leading="tight"
        className="text-[38px]"
      />
      <p className="mt-4 text-lg leading-relaxed text-primary">{intro}</p>
      <MailtoForm
        recipient={recipient}
        trackEvent="tax_proof_submit"
        subject={{ prefix: subject, nameFields: ["contact-name"] }}
        labels={Object.fromEntries(fields.map((f) => [taxField(f).name, f]))}
        className="mt-8 flex flex-col gap-4"
      >
        {fields.map((label) => {
          const f = taxField(label);
          return (
            <FormField key={label} label={label} tone="primary" size="base">
              <InputField
                size="give-now"
                type={f.type}
                name={f.name}
                placeholder={f.placeholder}
                ariaLabel={label}
              />
            </FormField>
          );
        })}
        <Button
          type="submit"
          variant="ghost"
          size="lg"
          shape="rounded-30"
          className="mt-2 h-14 w-full"
        >
          {submit}
        </Button>
      </MailtoForm>
    </div>
  );
}

export default TaxDeductibleForm;
