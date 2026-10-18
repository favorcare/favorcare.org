// Unit tests for the give-now tax form's field derivation (name,
// placeholder, input type from the WP label) against the real content.
import { assertEquals } from "@std/assert";
import { GIVENOW } from "./content.ts";
import { taxField } from "./TaxDeductibleForm.tsx";

Deno.test("taxField derives name, placeholder, and type from the label", () => {
  assertEquals(taxField("CONTACT NAME"), {
    name: "contact-name",
    placeholder: "Contact Name",
    type: "text",
  });
  assertEquals(taxField("CONTACT EMAIL"), {
    name: "contact-email",
    placeholder: "Contact Email",
    type: "email",
  });
  assertEquals(taxField("BIR FORM 2303").name, "bir-form-2303");
});

Deno.test("every tax field yields a unique input name; the subject's name field exists", () => {
  const names = GIVENOW.ph.taxDeductible.fields.map((f) => taxField(f).name);
  assertEquals(new Set(names).size, names.length);
  assertEquals(names.includes("contact-name"), true);
});
