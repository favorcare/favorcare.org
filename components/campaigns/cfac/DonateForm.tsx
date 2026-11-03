import { CfacButton } from "./CfacButton.tsx";
import { CfacField } from "./Field.tsx";
import { CFAC, formatPeso } from "./content.ts";

/**
 * The CFAC "Make your contribution" card, cloned from cfac-landing-page:
 * gold title band, the preset amount chips + custom amount, optional donor
 * info, the Certificate of Donation toggle (revealing the company/TIN
 * fields), the submit, and a privacy footer.
 *
 * Pure server markup — no island. Chips are radio inputs styled through
 * `has-[:checked]`, and the certificate fields reveal via the checkbox
 * with `group-has-*`, so selection works with JS off.
 *
 * TODO(cfac-donations): not wired yet. The follow-up PR posts this form to
 * a `"use server"` action that calls cfac-donations `POST /initiate` with
 * SECRET_HANDSHAKE_KEY kept server-side, then redirects to PayMongo. Until
 * then the submit renders in the sample's disabled state.
 */
export function CfacDonateForm() {
  const { form } = CFAC.give;
  return (
    <div className="overflow-hidden rounded-3xl bg-surface shadow-2xl">
      <div className="bg-yellow p-6 text-center md:p-12">
        <h3 className="text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
          {form.title}
        </h3>
      </div>

      <form
        className="group/donate space-y-6 p-6 md:space-y-8 md:p-12"
        aria-label={form.title}
      >
        <fieldset>
          <legend className="mb-4 text-lg font-bold text-primary md:mb-6 md:text-xl">
            {form.amountsTitle}
          </legend>
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {form.amounts.map((amount) => (
              <label
                key={amount}
                className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 border-outline-variant/40 p-3 text-base font-bold text-primary transition-all hover:border-yellow/50 has-[:checked]:border-yellow has-[:checked]:bg-yellow has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary md:rounded-2xl md:p-4"
              >
                <input
                  type="radio"
                  name="amount"
                  value={amount}
                  className="sr-only"
                />
                {formatPeso(amount)}
              </label>
            ))}
          </div>
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-base font-bold text-primary md:left-6 md:text-lg"
            >
              ₱
            </span>
            <CfacField
              name="customAmount"
              ariaLabel="Custom amount in pesos"
              placeholder={form.customPlaceholder}
              inputMode="decimal"
              className="[&_input]:pl-10 md:[&_input]:pl-12"
            />
          </div>
        </fieldset>

        <fieldset className="space-y-3 md:space-y-4">
          <legend className="text-lg font-semibold text-primary">
            {form.donor.title}
          </legend>
          <p className="text-base text-on-surface-variant">{form.donor.hint}</p>
          <CfacField
            name="donorName"
            ariaLabel={form.donor.name}
            placeholder={form.donor.name}
          />
          <CfacField
            name="donorEmail"
            type="email"
            ariaLabel={form.donor.email}
            placeholder={form.donor.email}
          />
        </fieldset>

        <label className="flex min-h-12 cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="requestCertificate"
            className="mt-1 h-5 w-5 shrink-0 accent-yellow"
          />
          <span>
            <span className="block text-base font-medium text-primary">
              {form.certificate.toggle}
            </span>
            <span className="mt-1 block text-sm text-on-surface-variant">
              {form.certificate.hint}
            </span>
          </span>
        </label>

        <fieldset className="hidden space-y-3 group-has-[[name=requestCertificate]:checked]/donate:block md:space-y-4">
          <legend className="text-lg font-semibold text-primary">
            {form.certificate.title}
          </legend>
          <p className="text-base text-on-surface-variant">
            {form.certificate.required}
          </p>
          {form.certificate.fields.map((f) => (
            <CfacField
              key={f.name}
              name={f.name}
              label={f.label}
              placeholder={f.placeholder}
              type={f.type as "text" | "tel"}
            />
          ))}
          <CfacField
            name="message"
            label={form.certificate.message.label}
            placeholder={form.certificate.message.placeholder}
            rows={3}
          />
        </fieldset>

        <CfacButton type="submit" size="block" disabled>
          {form.submit}
        </CfacButton>
      </form>

      <div className="border-t border-outline-variant/20 bg-surface-container px-6 py-4 text-center md:px-12 md:py-6">
        <p className="text-sm text-on-surface-variant">
          {form.privacy.before}
          <a href={form.privacy.link.href} className="underline">
            {form.privacy.link.label}
          </a>
          {form.privacy.after}
        </p>
      </div>
    </div>
  );
}

export default CfacDonateForm;
