import type { ComponentChildren, JSX } from "preact";
import {
  composeMailto,
  composeSubject,
  formFields,
  type MailtoSubject,
} from "../components/mailto.ts";

export interface MailtoFormProps {
  /** Inbox the email is addressed to (`CONTACT.form.recipient`). */
  recipient: string;
  /** Literal subject, or a prefix plus name inputs (see `MailtoSubject`). */
  subject: MailtoSubject;
  /** Input name to email-body label, in body order (see `formFields`). */
  labels: Record<string, string>;
  /** Name of the free-text input set apart below the labeled lines. */
  noteField?: string;
  class?: string;
  /** Server-rendered fields and submit button. */
  children: ComponentChildren;
}

/**
 * The one hydrated submit seam for every site form. On submit it composes a
 * `mailto:` from the typed fields (see `components/mailto.ts`) and opens it;
 * `action="mailto:…"` stays as the no-JS fallback. The fields are
 * server-rendered children, so only this wrapper ships JS. When a real form
 * backend lands, replace `onSubmit` here and every form follows.
 */
export default function MailtoForm(
  { recipient, subject, labels, noteField, class: extra, children }:
    MailtoFormProps,
) {
  const onSubmit = (event: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    event.preventDefault();
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
      class={extra}
    >
      {children}
    </form>
  );
}
