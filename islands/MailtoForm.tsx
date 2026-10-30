"use client";

import type { FormEvent, ReactNode } from "react";
import {
  composeMailto,
  composeSubject,
  formFields,
  type MailtoSubject,
} from "../components/mailto.ts";
import { track } from "./Tracking.tsx";

export interface MailtoFormProps {
  /** Inbox the email is addressed to (`CONTACT.form.recipient`). */
  recipient: string;
  /** Literal subject, or a prefix plus name inputs (see `MailtoSubject`). */
  subject: MailtoSubject;
  /** Input name to email-body label, in body order (see `formFields`). */
  labels: Record<string, string>;
  /** Name of the free-text input set apart below the labeled lines. */
  noteField?: string;
  /** Analytics: event name fired on submit (islands/Tracking.tsx), e.g.
   * "newsletter_submit". Omit to leave the form untracked. */
  trackEvent?: string;
  className?: string;
  /** Server-rendered fields and submit button. */
  children: ReactNode;
}

/**
 * The one hydrated submit seam for every site form. On submit it composes a
 * `mailto:` from the typed fields (see `components/mailto.ts`) and opens it;
 * `action="mailto:…"` stays as the no-JS fallback. The fields are
 * server-rendered children, so only this wrapper ships JS. When a real form
 * backend lands, replace `onSubmit` here and every form follows.
 */
export default function MailtoForm(
  { recipient, subject, labels, noteField, trackEvent, className: extra, children }:
    MailtoFormProps,
) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (trackEvent) track(trackEvent);
    const form = event.currentTarget;
    const data = new FormData(form);
    // Only real checkboxes map "on" to "Yes" in the email body.
    const checkboxes = [...form.elements].flatMap((el) =>
      el instanceof HTMLInputElement && el.type === "checkbox" ? [el.name] : []
    );
    const note = noteField ? String(data.get(noteField) ?? "") : undefined;
    globalThis.location.href = composeMailto({
      recipient,
      subject: composeSubject(subject, data),
      fields: formFields(data, labels, checkboxes),
      note,
    });
  };

  return (
    <form
      action={`mailto:${recipient}`}
      method="post"
      onSubmit={onSubmit}
      className={extra}
    >
      {children}
    </form>
  );
}
