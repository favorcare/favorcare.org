// Pure helpers for the /signup volunteer application: the required-field
// list, form-value collection, validation, and the Google Form entry-id
// mapping. Kept out of the page and the server action so they unit-test
// without the network (see signup_test.ts).
import { SIGNUP } from "./content.ts";

const FORM_ID = "1FAIpQLScraE9-h5uh7rIzk6IdnpX072IDU60N_QQ-klpqhpPd4GiPZg";
const FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

export const REQUIRED = [
  "first-name",
  "last-name",
  "gender",
  "dob",
  "email",
  "phone",
  "attendance",
  "social",
  "hear-about",
  "updates",
  "connect-group",
  "dna",
  "consent",
];

/** What the signup form re-renders with after a failed submit. */
export interface SignupState {
  error?: string;
  values?: Record<string, string>;
  serveAreas?: string[];
}

export function collectValues(form: FormData): {
  values: Record<string, string>;
  serveAreas: string[];
} {
  const values: Record<string, string> = {};
  for (const name of REQUIRED) {
    const v = form.get(name);
    if (typeof v === "string") values[name] = v;
  }
  const other = form.get("hear-about-other");
  if (typeof other === "string") values["hear-about-other"] = other;
  return { values, serveAreas: form.getAll("serve-areas").map(String) };
}

export function buildForwardBody(form: FormData): URLSearchParams {
  const e = SIGNUP.entries;
  const s = (name: string) => String(form.get(name) ?? "").trim();
  const body = new URLSearchParams();
  body.append(`entry.${e.firstName}`, s("first-name"));
  body.append(`entry.${e.lastName}`, s("last-name"));
  body.append(`entry.${e.gender}`, s("gender"));
  // The date input gives ISO YYYY-MM-DD — verified against formResponse:
  // Google stores exactly this (its MM/DD/YYYY display is client-side).
  body.append(`entry.${e.dob}`, s("dob"));
  body.append(`entry.${e.email}`, s("email"));
  body.append(`entry.${e.phone}`, s("phone"));
  body.append(`entry.${e.attendance}`, s("attendance"));
  body.append(`entry.${e.social}`, s("social"));
  const hearAbout = s("hear-about");
  if (hearAbout === "__other_option__") {
    // Google's other-option convention: the marker value plus a
    // companion free-text entry.
    body.append(`entry.${e.hearAbout}`, "__other_option__");
    body.append(
      `entry.${e.hearAbout}.other_option_response`,
      s("hear-about-other"),
    );
  } else {
    body.append(`entry.${e.hearAbout}`, hearAbout);
  }
  for (const area of form.getAll("serve-areas")) {
    body.append(`entry.${e.serveAreas}`, String(area));
  }
  body.append(`entry.${e.updates}`, s("updates"));
  body.append(`entry.${e.connectGroup}`, s("connect-group"));
  body.append(`entry.${e.dna}`, s("dna"));
  body.append(`entry.${e.consent}`, s("consent"));
  return body;
}

/**
 * Validate a submission. Returns the error message to show, or null when the
 * form is complete and the email looks valid.
 */
export function validateSignup(
  values: Record<string, string>,
  serveAreas: string[],
): string | null {
  const incomplete = REQUIRED.some((name) => !values[name]?.trim());
  if (incomplete || serveAreas.length === 0) return SIGNUP.requiredError;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values["email"] ?? "")) {
    return "Please enter a valid email address.";
  }
  return null;
}

/**
 * Validate and forward a submission to the Google Form. Returns null on
 * success, or the state to re-render the form with. `fetchImpl` is injected
 * so tests never touch the network.
 */
export async function processSignup(
  form: FormData,
  fetchImpl: typeof fetch = fetch,
): Promise<SignupState | null> {
  const { values, serveAreas } = collectValues(form);
  const error = validateSignup(values, serveAreas);
  if (error) return { error, values, serveAreas };
  try {
    const res = await fetchImpl(FORM_URL, {
      method: "POST",
      body: buildForwardBody(form),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`formResponse responded ${res.status}`);
  } catch {
    return { error: SIGNUP.deliveryError, values, serveAreas };
  }
  return null;
}
