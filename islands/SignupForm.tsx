"use client";

import { useActionState } from "react";
import { VolunteerSignupForm } from "../components/VolunteerSignupForm.tsx";
import type { VolunteerSignupCopy } from "../components/VolunteerSignupForm.tsx";
import type { SignupState } from "../components/signup.ts";
import { submitSignup } from "../app/(site)/signup/actions.ts";

/**
 * The /signup application form, wired to the `submitSignup` Server Action
 * with useActionState. Progressive enhancement: with JS disabled the form
 * posts back to the page and the server renders the returned error/values.
 * Props: `copy` — the form's slice of SIGNUP (plain data); `demo` — storybook
 * specimen: disables submit so a click can't reach the live endpoint.
 */
export default function SignupForm(
  { copy, demo }: { copy: VolunteerSignupCopy; demo?: boolean },
) {
  const [state, formAction] = useActionState<SignupState, FormData>(
    submitSignup,
    {},
  );
  return (
    <VolunteerSignupForm
      className="mt-8"
      copy={copy}
      demo={demo}
      action={formAction}
      values={state.values}
      serveAreas={state.serveAreas}
      error={state.error}
    />
  );
}
