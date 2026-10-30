"use server";

import { redirect } from "next/navigation";
import { processSignup } from "../../../components/signup.ts";
import type { SignupState } from "../../../components/signup.ts";

// Volunteer signup Server Action. Validates, then forwards the mapped
// fields to the live Google Form's response endpoint (entry-id map in
// SIGNUP.entries) so responses keep landing in the volunteers' Google Sheet
// with their existing notifications. Nothing is stored or logged on our
// side — the submission is proxied in memory only. On failure it returns
// the state the form re-renders with; on success it redirects (303) to
// /signup?ok=1 so a refresh can't resubmit.
export async function submitSignup(
  _prev: SignupState,
  form: FormData,
): Promise<SignupState> {
  const failure = await processSignup(form);
  if (failure) return failure;
  redirect("/signup?ok=1");
}
