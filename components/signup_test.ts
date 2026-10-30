// Unit tests for the volunteer-signup forwarding helpers — the pure parts
// of the signup Server Action that map our form names onto the live Google Form's
// entry ids. These tests do not hit the network.
import { test } from "vitest";
import { deepStrictEqual, ok } from "node:assert/strict";
import { SIGNUP } from "./content.ts";
import {
  buildForwardBody,
  collectValues,
  processSignup,
  REQUIRED,
  validateSignup,
} from "./signup.ts";

function form(entries: Record<string, string | string[]>): FormData {
  const fd = new FormData();
  for (const [name, value] of Object.entries(entries)) {
    if (Array.isArray(value)) {
      for (const v of value) fd.append(name, v);
    } else {
      fd.set(name, value);
    }
  }
  return fd;
}

test("collectValues gathers required fields and serve areas", () => {
  const { values, serveAreas } = collectValues(form({
    "first-name": "Maria",
    "email": "maria@example.com",
    "consent": "yes",
    "serve-areas": ["medical", "education"],
  }));
  deepStrictEqual(values["first-name"], "Maria");
  deepStrictEqual(values["email"], "maria@example.com");
  deepStrictEqual(values["consent"], "yes");
  deepStrictEqual(serveAreas, ["medical", "education"]);
});

test("collectValues keeps the free-text 'how did you hear' answer", () => {
  const { values } = collectValues(form({
    "hear-about": "__other_option__",
    "hear-about-other": "A church friend",
  }));
  deepStrictEqual(values["hear-about-other"], "A church friend");
});

test("buildForwardBody maps fields to the Google entry ids", () => {
  const body = buildForwardBody(form({
    "first-name": "Maria",
    "dob": "2001-03-04",
    "email": "maria@example.com",
  }));
  deepStrictEqual(body.get(`entry.${SIGNUP.entries.firstName}`), "Maria");
  deepStrictEqual(body.get(`entry.${SIGNUP.entries.email}`), "maria@example.com");
  // The date input gives ISO YYYY-MM-DD — verified against formResponse:
  // Google stores exactly this.
  deepStrictEqual(body.get(`entry.${SIGNUP.entries.dob}`), "2001-03-04");
});

test("buildForwardBody appends each serve area under one entry id", () => {
  const body = buildForwardBody(form({ "serve-areas": ["medical", "relief"] }));
  deepStrictEqual(
    body.getAll(`entry.${SIGNUP.entries.serveAreas}`),
    ["medical", "relief"],
  );
});

test("buildForwardBody handles Google's other-option convention", () => {
  const body = buildForwardBody(form({
    "hear-about": "__other_option__",
    "hear-about-other": "A church friend",
  }));
  deepStrictEqual(
    body.get(`entry.${SIGNUP.entries.hearAbout}`),
    "__other_option__",
  );
  deepStrictEqual(
    body.get(`entry.${SIGNUP.entries.hearAbout}.other_option_response`),
    "A church friend",
  );
});

function completeValues(): Record<string, string> {
  return Object.fromEntries(REQUIRED.map((name) => [name, "x"])) as Record<
    string,
    string
  >;
}

function completeForm(email = "maria@example.com"): FormData {
  const fd = form({ ...completeValues(), email });
  fd.append("serve-areas", "medical");
  return fd;
}

test("validateSignup rejects missing required fields and empty serve areas", () => {
  const values = { ...completeValues(), email: "maria@example.com" };
  deepStrictEqual(validateSignup(values, ["medical"]), null);
  deepStrictEqual(validateSignup(values, []), SIGNUP.requiredError);
  deepStrictEqual(
    validateSignup({ ...values, dob: "  " }, ["medical"]),
    SIGNUP.requiredError,
  );
  deepStrictEqual(validateSignup({}, ["medical"]), SIGNUP.requiredError);
});

test("validateSignup rejects a malformed email", () => {
  const values = { ...completeValues(), email: "not-an-email" };
  deepStrictEqual(
    validateSignup(values, ["medical"]),
    "Please enter a valid email address.",
  );
});

test("processSignup returns the error and keeps values when incomplete", async () => {
  let called = false;
  const fetchImpl = (() => {
    called = true;
    return Promise.resolve(new Response(null, { status: 200 }));
  }) as typeof fetch;
  const state = await processSignup(form({ "first-name": "Maria" }), fetchImpl);
  deepStrictEqual(state?.error, SIGNUP.requiredError);
  deepStrictEqual(state?.values?.["first-name"], "Maria");
  ok(!called, "must not forward an incomplete submission");
});

test("processSignup forwards a valid submission and returns null", async () => {
  let sent: { url: string; body: URLSearchParams } | undefined;
  const fetchImpl = ((url: string, init: RequestInit) => {
    sent = { url, body: init.body as URLSearchParams };
    return Promise.resolve(new Response(null, { status: 200 }));
  }) as unknown as typeof fetch;
  deepStrictEqual(await processSignup(completeForm(), fetchImpl), null);
  ok(sent?.url.includes("docs.google.com/forms"));
  deepStrictEqual(
    sent?.body.get(`entry.${SIGNUP.entries.email}`),
    "maria@example.com",
  );
});

test("processSignup reports a delivery error when the forward fails", async () => {
  const rejects = (() => Promise.reject(new Error("offline"))) as typeof fetch;
  const bad = (() =>
    Promise.resolve(new Response(null, { status: 500 }))) as typeof fetch;
  for (const fetchImpl of [rejects, bad]) {
    const state = await processSignup(completeForm(), fetchImpl);
    deepStrictEqual(state?.error, SIGNUP.deliveryError);
    deepStrictEqual(state?.values?.["email"], "maria@example.com");
  }
});
