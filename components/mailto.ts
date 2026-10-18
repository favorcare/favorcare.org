// Pure helpers behind `islands/MailtoForm.tsx`: turn a submitted form into
// a `mailto:` href. Kept DOM-free (only `FormData`) so the composed subject
// and body are unit-tested. Swapping mailto for a real backend means
// replacing the island's submit — these helpers and every form's markup stay.

/** One labeled line of the email body. */
export interface MailtoField {
  label: string;
  value: string;
}

/**
 * The email subject: a literal string, or a `prefix` followed by the
 * submitter's name (`nameFields` are form input names, joined with a
 * space), e.g. "Website contact — Maria Cruz".
 */
export type MailtoSubject = string | { prefix: string; nameFields: string[] };

/** Everything `composeMailto` needs to build the href. */
export interface MailtoMessage {
  recipient: string;
  subject: string;
  /** Rendered as `LABEL: value` lines; blank values are skipped. */
  fields: MailtoField[];
  /** Free text (e.g. a message) set after a blank line below the fields. */
  note?: string;
}

/**
 * Compose a `mailto:` href: `LABEL: value` body lines (blank values
 * skipped), then the optional `note` after a blank line. Subject and body
 * are `encodeURIComponent`'d.
 */
export function composeMailto(
  { recipient, subject, fields, note }: MailtoMessage,
): string {
  const lines = fields
    .filter((f) => f.value.trim() !== "")
    .map((f) => `${f.label}: ${f.value}`);
  const text = note?.trim();
  if (text) lines.push(...(lines.length ? [""] : []), text);
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${
    encodeURIComponent(lines.join("\n"))
  }`;
}

function read(data: FormData, name: string): string {
  return String(data.get(name) ?? "").trim();
}

/**
 * Read `labels` (input name to body label, in body order) out of
 * `data`, trimming values. A key of `a+b` joins inputs `a` and `b` with a
 * space under one label (`"first-name+last-name": "Name"`). A checked
 * checkbox (`"on"`) reads as "Yes". Blank fields are kept; `composeMailto`
 * skips them.
 */
export function formFields(
  data: FormData,
  labels: Record<string, string>,
): MailtoField[] {
  return Object.entries(labels).map(([names, label]) => {
    const value = names.split("+").map((n) => read(data, n)).filter(Boolean)
      .join(" ");
    return { label, value: value === "on" ? "Yes" : value };
  });
}

/**
 * Resolve a `MailtoSubject` against the submitted `data`. With a
 * name-based subject, a blank name leaves just the prefix.
 */
export function composeSubject(
  subject: MailtoSubject,
  data: FormData,
): string {
  if (typeof subject === "string") return subject;
  const name = subject.nameFields.map((n) => read(data, n)).filter(Boolean)
    .join(" ");
  return name ? `${subject.prefix} — ${name}` : subject.prefix;
}
