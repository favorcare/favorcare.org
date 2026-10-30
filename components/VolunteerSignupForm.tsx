import type { PopupBlock } from "./content.ts";
import type { SIGNUP } from "./content.ts";
import { Button } from "./Button.tsx";
import { ChoiceGroup } from "./ChoiceGroup.tsx";
import { InputField } from "./InputField.tsx";
import { cx } from "./cx.ts";

/** The slice of `SIGNUP` the form renders. Passed in as a prop so the
 *  /signup island ships just this copy, not all of content.ts. */
export interface VolunteerSignupCopy {
  options: typeof SIGNUP.options;
  privacyNotice: typeof SIGNUP.privacyNotice;
}

export interface VolunteerSignupFormProps {
  copy: VolunteerSignupCopy;
  /** The form's action: a Server Action (islands/SignupForm.tsx wires it
   *  with useActionState). Omit in the storybook specimen. */
  action?: (formData: FormData) => void;
  /** Previously entered values, for re-renders after a failed submit. */
  values?: Record<string, string>;
  serveAreas?: string[];
  error?: string;
  /** Storybook specimen: disables submit so a click can't reach the live
   *  formResponse endpoint. */
  demo?: boolean;
  className?: string;
}

// The Data Privacy Notice blocks (verbatim from the Google form). p keeps
// its \n line breaks — the notice's postal address is real lines.
function NoticeBlocks({ blocks }: { blocks: PopupBlock[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.type === "h" ? (
          <h4 key={i} className="mt-3 font-bold text-on-surface first:mt-0">
            {b.text}
          </h4>
        ) : b.type === "ul" ? (
          <ul key={i} className="mt-2 list-disc space-y-1 pl-5">
            {b.items?.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={i} className="mt-2 whitespace-pre-line first:mt-0">
            {b.text}
          </p>
        ),
      )}
    </>
  );
}

function TextField({
  label,
  name,
  type = "text",
  required,
  value,
  ariaLabel,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value?: string;
  ariaLabel?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-base font-semibold leading-snug text-on-surface">
        {label}
        {required && (
          <span className="ml-1 text-error" aria-hidden="true">
            *
          </span>
        )}
      </span>
      <InputField
        type={type}
        name={name}
        value={value}
        required={required}
        ariaLabel={ariaLabel ?? label}
        className="w-full"
      />
    </label>
  );
}

// The volunteer application form (all 14 questions of the "Favor Care:
// Sign Up to Serve" Google form, verbatim). Rendered by the SignupForm
// island: native required/type validation, submitted through a Server
// Action (app/(site)/signup/actions.ts) that forwards the mapped fields to
// the Google form's response endpoint (entry ids in SIGNUP.entries). It
// works without JS too — React posts the form back to the page. Field
// names are the action's keys.
export function VolunteerSignupForm({
  copy,
  action,
  values,
  serveAreas,
  error,
  demo,
  className: extra,
}: VolunteerSignupFormProps) {
  const v = values ?? {};
  const o = copy.options;
  return (
    <form action={action} className={cx("min-w-0", extra)}>
      {error && (
        <p
          role="alert"
          className="mb-6 rounded border border-error/40 bg-error-container px-4 py-3 text-sm leading-relaxed text-on-error-container"
        >
          {error}
        </p>
      )}

      <p className="text-sm leading-relaxed text-on-surface-variant">
        Fields marked with{" "}
        <span className="text-error" aria-hidden="true">
          *
        </span>{" "}
        are required.
      </p>

      <div className="mt-6 grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
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
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              value="Agree"
              required
              defaultChecked={v["consent"] === "Agree"}
              className="mt-1 h-5 w-5 shrink-0 accent-primary"
            />
            <span className="text-sm italic leading-relaxed text-on-surface-variant">
              {copy.privacyNotice.consentSentence}
              <span className="ml-1 text-error not-italic" aria-hidden="true">
                *
              </span>
            </span>
          </label>
          <details className="mt-3 rounded border border-outline-variant bg-surface-dim px-4 py-3">
            <summary className="min-h-8 cursor-pointer text-sm font-bold uppercase tracking-wider text-primary">
              {copy.privacyNotice.summary}
            </summary>
            <div className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              <NoticeBlocks blocks={copy.privacyNotice.blocks} />
            </div>
          </details>
        </div>

        <div className="mt-2 flex justify-center">
          <Button
            variant="yellow"
            size="md"
            type="submit"
            disabled={demo}
            track="volunteer_submit"
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </form>
  );
}

export default VolunteerSignupForm;
