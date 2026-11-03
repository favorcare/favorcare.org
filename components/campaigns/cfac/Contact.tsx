import type { ReactNode } from "react";
import { cx } from "../../cx.ts";
import MailtoForm from "../../../islands/MailtoForm.tsx";
import { CONTACT } from "../../content.ts";
import { ArrowRightIcon, MailIcon, MapPinIcon } from "../../icons.tsx";
import { CfacButton } from "./CfacButton.tsx";
import { CfacField } from "./Field.tsx";
import { CFAC_FRAME, CFAC_SECTION } from "./layout.ts";
import { CFAC } from "./content.ts";

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-surface-container-low p-6 sm:flex-row sm:items-center">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface text-primary sm:self-start">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-sm text-on-surface-variant">{label}</div>
        {children}
      </div>
    </div>
  );
}

/**
 * CFAC "Get in Touch", cloned from cfac-landing-page's contact section:
 * intro + email/address info cards on the left, the white contact-form card
 * on the right. Submits through the site's `MailtoForm` seam (opens an
 * email to the Favor Care inbox) until cfac-donations' `POST /contact`
 * is wired in the follow-up PR.
 */
export function CfacContact() {
  const { contact } = CFAC;
  const f = contact.form.fields;
  return (
    <section id="contact" className={CFAC_SECTION}>
      <div className={cx("grid grid-cols-1 gap-12 lg:grid-cols-2", CFAC_FRAME)}>
        <div>
          <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl">
            {contact.title}
          </h2>
          <div className="mb-12 space-y-4 text-lg text-on-surface-variant">
            {contact.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="space-y-6">
            <InfoRow icon={<MailIcon size={22} />} label={contact.email.label}>
              <a
                href={`mailto:${contact.email.value}`}
                className="break-all font-semibold text-primary"
              >
                {contact.email.value}
              </a>
            </InfoRow>
            <InfoRow
              icon={<MapPinIcon size={22} />}
              label={contact.address.label}
            >
              <a
                href={contact.address.href}
                target="_blank"
                rel="noopener noreferrer"
                className="break-words font-semibold text-primary"
              >
                {contact.address.value}
              </a>
            </InfoRow>
          </div>
        </div>

        <div className="rounded-3xl bg-surface p-8 shadow-2xl md:p-12">
          <MailtoForm
            recipient={CONTACT.form.recipient}
            subject={{
              prefix: contact.form.subjectPrefix,
              nameFields: ["first-name", "last-name"],
            }}
            labels={{
              "first-name+last-name": "Name",
              email: f.email.label,
              mobile: f.mobile.label,
              social: f.social.label,
            }}
            noteField="message"
            trackEvent="contact_submit"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <CfacField
                name="first-name"
                label={f.firstName.label}
                labelStyle="caps"
                placeholder={f.firstName.placeholder}
                required
              />
              <CfacField
                name="last-name"
                label={f.lastName.label}
                labelStyle="caps"
                placeholder={f.lastName.placeholder}
                required
              />
            </div>
            <CfacField
              name="email"
              type="email"
              label={f.email.label}
              labelStyle="caps"
              placeholder={f.email.placeholder}
              required
            />
            <CfacField
              name="mobile"
              type="tel"
              label={f.mobile.label}
              labelStyle="caps"
              placeholder={f.mobile.placeholder}
              required
            />
            <CfacField
              name="social"
              type="url"
              label={f.social.label}
              labelStyle="caps"
              placeholder={f.social.placeholder}
            />
            <CfacField
              name="message"
              label={f.message.label}
              labelStyle="caps"
              placeholder={f.message.placeholder}
              rows={4}
              required
            />
            <CfacButton type="submit" size="block">
              {contact.form.submit}
              <ArrowRightIcon size={20} />
            </CfacButton>
          </MailtoForm>
        </div>
      </div>
    </section>
  );
}

export default CfacContact;
