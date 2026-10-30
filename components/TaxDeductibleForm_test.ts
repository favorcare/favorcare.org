// Unit tests for the give-now tax form's field derivation (name,
// placeholder, input type from the WP label) against the real content.
import { test } from "vitest";
import { deepStrictEqual } from "node:assert/strict";
import { GIVENOW } from "./content.ts";
import { taxField } from "./TaxDeductibleForm.tsx";

test("taxField derives name, placeholder, and type from the label", () => {
  deepStrictEqual(taxField("CONTACT NAME"), {
    name: "contact-name",
    placeholder: "Contact Name",
    type: "text",
  });
  deepStrictEqual(taxField("CONTACT EMAIL"), {
    name: "contact-email",
    placeholder: "Contact Email",
    type: "email",
  });
  deepStrictEqual(taxField("BIR FORM 2303").name, "bir-form-2303");
});

test("every tax field yields a unique input name; the subject's name field exists", () => {
  const names = GIVENOW.ph.taxDeductible.fields.map((f) => taxField(f).name);
  deepStrictEqual(new Set(names).size, names.length);
  deepStrictEqual(names.includes("contact-name"), true);
});
