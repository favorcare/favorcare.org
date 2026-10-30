// Unit tests for the mailto composition helpers behind MailtoForm. The
// first group proves the pre-consolidation ContactForm subject and body are
// reproducible through composeMailto/formFields/composeSubject.
import { test } from "vitest";
import { deepStrictEqual } from "node:assert/strict";
import { CONTACT } from "./content.ts";
import {
  composeMailto,
  composeSubject,
  formFields,
  type MailtoSubject,
} from "./mailto.ts";

function form(entries: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [name, value] of Object.entries(entries)) fd.set(name, value);
  return fd;
}

function parse(href: string) {
  const url = new URL(href);
  return {
    to: url.pathname,
    subject: url.searchParams.get("subject"),
    body: url.searchParams.get("body"),
  };
}

// The old islands/ContactForm.tsx logic, kept as the reference. One
// normalization: the old body left a stray empty line where the unchecked
// newsletter flag would be (two blank lines before the message); it is
// dropped here and in composeMailto.
function legacy(data: FormData) {
  const field = (name: string) => String(data.get(name) ?? "").trim();
  const subject = `Website contact — ${field("first-name")} ${field(
    "last-name",
  )}`.trim();
  const body = [
    `Name: ${field("first-name")} ${field("last-name")}`.trim(),
    `Email: ${field("email")}`,
    `Phone: ${field("phone")}`,
    field("newsletter") === "on" ? "Subscribed to the newsletter" : null,
    "",
    field("message"),
  ]
    .filter((line) => line !== null)
    .join("\n");
  return { subject, body };
}

// What the ContactForm's MailtoForm does on submit.
function contactHref(data: FormData): string {
  return composeMailto({
    recipient: CONTACT.form.recipient,
    subject: composeSubject(
      {
        prefix: CONTACT.form.subjectPrefix,
        nameFields: ["first-name", "last-name"],
      },
      data,
    ),
    fields: formFields(data, CONTACT.form.labels, ["newsletter"]),
    note: String(data.get("message") ?? ""),
  });
}

const typed = {
  "first-name": "  Maria ",
  "last-name": "Cruz",
  email: "maria@example.com",
  phone: "0917 123 4567",
  message: "How can I help?\nSee you Sunday.",
};

test("composeSubject reproduces 'Website contact — First Last'", () => {
  const data = form(typed);
  deepStrictEqual(
    composeSubject(
      {
        prefix: CONTACT.form.subjectPrefix,
        nameFields: ["first-name", "last-name"],
      },
      data,
    ),
    legacy(data).subject,
  );
  deepStrictEqual(legacy(data).subject, "Website contact — Maria Cruz");
});

test("composeMailto reproduces the legacy ContactForm body", () => {
  const data = form(typed);
  const { to, subject, body } = parse(contactHref(data));
  deepStrictEqual(to, CONTACT.form.recipient);
  deepStrictEqual(subject, legacy(data).subject);
  deepStrictEqual(body, legacy(data).body);
});

test("the opted-in newsletter line reads as a labeled Yes", () => {
  const data = form({ ...typed, newsletter: "on" });
  deepStrictEqual(
    parse(contactHref(data)).body,
    [
      "Name: Maria Cruz",
      "Email: maria@example.com",
      "Phone: 0917 123 4567",
      "Subscribed to the newsletter: Yes",
      "",
      "How can I help?",
      "See you Sunday.",
    ].join("\n"),
  );
});

test("only declared checkboxes map 'on' to Yes", () => {
  const data = form({ phone: "on", newsletter: "on" });
  deepStrictEqual(
    formFields(data, { phone: "Phone", newsletter: "Opt-in" }, ["newsletter"]),
    [
      { label: "Phone", value: "on" },
      { label: "Opt-in", value: "Yes" },
    ],
  );
});

test("composeMailto skips blank values (an empty phone drops out)", () => {
  const data = form({ ...typed, phone: "  " });
  deepStrictEqual(
    parse(contactHref(data)).body,
    [
      "Name: Maria Cruz",
      "Email: maria@example.com",
      "",
      "How can I help?",
      "See you Sunday.",
    ].join("\n"),
  );
});

test("composeMailto percent-encodes the subject and body", () => {
  const href = composeMailto({
    recipient: "info@favorcare.org",
    subject: "Hi & bye — ok?",
    fields: [{ label: "Name", value: "A&B=C" }],
  });
  deepStrictEqual(
    href,
    "mailto:info@favorcare.org?subject=Hi%20%26%20bye%20%E2%80%94%20ok%3F&body=Name%3A%20A%26B%3DC",
  );
});

test("composeMailto omits the blank line when there are no fields", () => {
  const { body } = parse(
    composeMailto({
      recipient: "a@b.co",
      subject: "s",
      fields: [{ label: "Name", value: "" }],
      note: "just a note",
    }),
  );
  deepStrictEqual(body, "just a note");
});

test("formFields keeps label order, trims, and joins a+b keys", () => {
  const data = form({ b: " two ", a: "one", c: "x", d: "y" });
  deepStrictEqual(
    formFields(data, { "c+d": "Joined", b: "B", a: "A", missing: "Gone" }),
    [
      { label: "Joined", value: "x y" },
      { label: "B", value: "two" },
      { label: "A", value: "one" },
      { label: "Gone", value: "" },
    ],
  );
});

test("composeSubject handles literal, named, and nameless subjects", () => {
  const subject: MailtoSubject = { prefix: "Sign up", nameFields: ["n"] };
  deepStrictEqual(composeSubject("Plain", form({})), "Plain");
  deepStrictEqual(
    composeSubject(subject, form({ n: " Ana " })),
    "Sign up — Ana",
  );
  deepStrictEqual(composeSubject(subject, form({ n: " " })), "Sign up");
});
