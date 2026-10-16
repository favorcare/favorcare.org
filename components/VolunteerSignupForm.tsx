import type { PopupBlock } from "./content.ts";
import { SIGNUP } from "./content.ts";
import { Button } from "./Button.tsx";
import { ChoiceGroup } from "./ChoiceGroup.tsx";
import { InputField } from "./InputField.tsx";
import { cx } from "./cx.ts";

export interface VolunteerSignupFormProps {
  /** Previously entered values, for re-renders after a failed POST. */
  values?: Record<string, string>;
  serveAreas?: string[];
  error?: string;
  /** Storybook specimen: disables submit so a click can't reach the live
   *  formResponse endpoint. */
  demo?: boolean;
  class?: string;
}

// The Data Privacy Notice blocks (verbatim from the Google form). p keeps
// its \n line breaks — the notice's postal address is real lines.
function NoticeBlocks({ blocks }: { blocks: PopupBlock[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.type === "h"
          ? (
            <h4 key={i} class="mt-3 font-bold text-on-surface first:mt-0">
              {b.text}
            </h4>
          )
          : b.type === "ul"
          ? (
            <ul key={i} class="mt-2 list-disc space-y-1 pl-5">
              {b.items?.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          )
          : <p key={i} class="mt-2 whitespace-pre-line first:mt-0">{b.text}</p>
      )}
    </>
  );
}

function TextField(
  { label, name, type = "text", required, value, ariaLabel }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    value?: string;
    ariaLabel?: string;
  },
) {
  return (
    <label class="block">
      <span class="mb-1 block text-base font-semibold leading-snug text-on-surface">
        {label}
        {required && <span class="ml-1 text-error" aria-hidden="true">*</span>}
      </span>
      <InputField
        type={type}
        name={name}
        value={value}
        required={required}
        ariaLabel={ariaLabel ?? label}
        class="w-full"
      />
    </label>
  );
}

// The volunteer application form (all 14 questions of the "Favor Care:
// Sign Up to Serve" Google form, verbatim). Server-rendered — no client
// JS: native required/type validation, POST to this route, whose handler
// forwards the mapped fields to the Google form's response endpoint
// (entry ids in SIGNUP.entries). Field names are the handler's keys.
export function VolunteerSignupForm(
  { values, serveAreas, error, demo, class: extra }: VolunteerSignupFormProps,
) {
  const v = values ?? {};
  const o = SIGNUP.options;
  return (
    <form method="post" action="/signup" class={cx("min-w-0", extra)}>
      {error && (
        <p
          role="alert"
          class="mb-6 rounded border border-error/40 bg-error-container px-4 py-3 text-sm leading-relaxed text-on-error-container"
        >
          {error}
        </p>
      )}

      <p class="text-sm leading-relaxed text-on-surface-variant">
        Fields marked with <span class="text-error" aria-hidden="true">*</span>
        {" "}
        are required.
      </p>

      <div class="mt-6 grid gap-6">
        <div class="grid gap-6 sm:grid-cols-2">
          <TextField
            label="First Name"
            name="first-name"
            required
            value={v["first-name"]}
          />
          <TextField
            label="Last Name"
            name="last-name"
            required
            value={v["last-name"]}
          />
        </div>

        <ChoiceGroup
          legend="Gender"
          name="gender"
          options={o.gender}
          required
          selected={v["gender"] ? [v["gender"]] : undefined}
        />

        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          required
          value={v["dob"]}
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          required
          value={v["email"]}
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          required
          value={v["phone"]}
        />

        <ChoiceGroup
          legend="How long have you been attending Favor Church?"
          name="attendance"
          options={o.attendance}
          required
          selected={v["attendance"] ? [v["attendance"]] : undefined}
        />

        <TextField
          label="Facebook / Instagram"
          name="social"
          required
          value={v["social"]}
          ariaLabel="Facebook or Instagram handle"
        />

        <ChoiceGroup
          legend="How did you know about Favor Care?"
          name="hear-about"
          options={o.hearAbout}
          required
          selected={v["hear-about"] ? [v["hear-about"]] : undefined}
          other={{
            name: "hear-about-other",
            value: v["hear-about-other"],
          }}
        />

        <ChoiceGroup
          legend="Which areas would you want to serve?"
          name="serve-areas"
          options={o.serveAreas}
          mode="checkbox"
          required
          selected={serveAreas}
          columns
        />

        <ChoiceGroup
          legend="Would you like to be kept updated on Favor Care?"
          name="updates"
          options={o.yesNo}
          required
          selected={v["updates"] ? [v["updates"]] : undefined}
        />

        <TextField
          label="Are you part of a Connect Group? If yes, who is your Connect Leader? If no, are you willing to be part of a Connect Group?"
          name="connect-group"
          required
          value={v["connect-group"]}
        />

        <ChoiceGroup
          legend="Are you done with favor DNA?"
          name="dna"
          options={o.yesNo}
          required
          selected={v["dna"] ? [v["dna"]] : undefined}
        />

        <div>
          <label class="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              value="Agree"
              required
              checked={v["consent"] === "Agree"}
              class="mt-1 h-5 w-5 shrink-0 accent-primary"
            />
            <span class="text-sm italic leading-relaxed text-on-surface-variant">
              {SIGNUP.privacyNotice.consentSentence}
              <span class="ml-1 text-error not-italic" aria-hidden="true">
                *
              </span>
            </span>
          </label>
          <details class="mt-3 rounded border border-outline-variant bg-surface-dim px-4 py-3">
            <summary class="min-h-8 cursor-pointer text-sm font-bold uppercase tracking-wider text-primary">
              {SIGNUP.privacyNotice.summary}
            </summary>
            <div class="mt-2 text-sm leading-relaxed text-on-surface-variant">
              <NoticeBlocks blocks={SIGNUP.privacyNotice.blocks} />
            </div>
          </details>
        </div>

        <div class="mt-2 flex justify-center">
          <Button variant="yellow" size="md" type="submit" disabled={demo}>
            SUBMIT
          </Button>
        </div>
      </div>
    </form>
  );
}

export default VolunteerSignupForm;
