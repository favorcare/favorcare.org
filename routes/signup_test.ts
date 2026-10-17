// Unit tests for the volunteer-signup forwarding helpers — the pure parts
// of the POST handler that map our form names onto the live Google Form's
// entry ids. These tests do not hit the network.
import { assertEquals } from "@std/assert";
import { SIGNUP } from "../components/content.ts";
import { buildForwardBody, collectValues } from "./signup.tsx";

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

Deno.test("collectValues gathers required fields and serve areas", () => {
  const { values, serveAreas } = collectValues(form({
    "first-name": "Maria",
    "email": "maria@example.com",
    "consent": "yes",
    "serve-areas": ["medical", "education"],
  }));
  assertEquals(values["first-name"], "Maria");
  assertEquals(values["email"], "maria@example.com");
  assertEquals(values["consent"], "yes");
  assertEquals(serveAreas, ["medical", "education"]);
});

Deno.test("collectValues keeps the free-text 'how did you hear' answer", () => {
  const { values } = collectValues(form({
    "hear-about": "__other_option__",
    "hear-about-other": "A church friend",
  }));
  assertEquals(values["hear-about-other"], "A church friend");
});

Deno.test("buildForwardBody maps fields to the Google entry ids", () => {
  const body = buildForwardBody(form({
    "first-name": "Maria",
    "dob": "2001-03-04",
    "email": "maria@example.com",
  }));
  assertEquals(body.get(`entry.${SIGNUP.entries.firstName}`), "Maria");
  assertEquals(body.get(`entry.${SIGNUP.entries.email}`), "maria@example.com");
  // The date input gives ISO YYYY-MM-DD — verified against formResponse:
  // Google stores exactly this.
  assertEquals(body.get(`entry.${SIGNUP.entries.dob}`), "2001-03-04");
});

Deno.test("buildForwardBody appends each serve area under one entry id", () => {
  const body = buildForwardBody(form({ "serve-areas": ["medical", "relief"] }));
  assertEquals(
    body.getAll(`entry.${SIGNUP.entries.serveAreas}`),
    ["medical", "relief"],
  );
});

Deno.test("buildForwardBody handles Google's other-option convention", () => {
  const body = buildForwardBody(form({
    "hear-about": "__other_option__",
    "hear-about-other": "A church friend",
  }));
  assertEquals(
    body.get(`entry.${SIGNUP.entries.hearAbout}`),
    "__other_option__",
  );
  assertEquals(
    body.get(`entry.${SIGNUP.entries.hearAbout}.other_option_response`),
    "A church friend",
  );
});
