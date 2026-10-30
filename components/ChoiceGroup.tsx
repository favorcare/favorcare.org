import type { ReactNode } from "react";
import { cx } from "./cx.ts";

export interface ChoiceGroupProps {
  legend: string;
  /** Shared input name — servers read all values via formData.getAll(). */
  name: string;
  options: string[];
  mode?: "radio" | "checkbox";
  /** Radios only: marks the group required (native HTML can't express
   *  "at least one checkbox" — checkbox groups validate server-side). */
  required?: boolean;
  /** Optional trailing "Other" option with a free-text input (Google's
   *  other_option_response pattern — the radio rides in the same group
   *  and typing into the input selects it via the shared label). */
  other?: { name: string; value?: string };
  /** Currently selected values, for re-renders after a failed POST. */
  selected?: string[];
  /** Grid the options into columns from sm (the 21-item serve-areas
   *  list) instead of a single stack. */
  columns?: boolean;
  className?: string;
}

// Radio/checkbox group for the signup form family: 48px touch rows,
// accent-primary controls, required questions marked with a red asterisk.
export function ChoiceGroup(
  {
    legend,
    name,
    options,
    mode = "radio",
    required,
    other,
    selected,
    columns,
    className: extra,
  }: ChoiceGroupProps,
) {
  const type = mode === "checkbox" ? "checkbox" : "radio";
  const row = (
    value: string,
    checked: boolean,
    content: ReactNode,
    key: string,
  ) => (
    <label key={key} className="flex min-h-12 cursor-pointer items-center gap-3">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        required={required && mode === "radio" ? true : undefined}
        className="h-5 w-5 shrink-0 accent-primary"
      />
      <span className="text-base leading-snug text-on-surface">{content}</span>
    </label>
  );

  return (
    <fieldset className={cx("min-w-0", extra)}>
      <legend className="mb-2 text-base font-semibold leading-snug text-on-surface">
        {legend}
        {required && <span className="ml-1 text-error" aria-hidden="true">*</span>}
      </legend>
      <div
        className={cx(
          columns
            ? "grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid gap-y-1",
        )}
      >
        {options.map((option) =>
          row(option, selected?.includes(option) ?? false, option, option)
        )}
        {other && (
          <label className="flex min-h-12 cursor-pointer flex-wrap items-center gap-x-3 gap-y-1">
            <input
              type={type}
              name={name}
              value="__other_option__"
              checked={selected?.includes("__other_option__") ?? false}
              className="h-5 w-5 shrink-0 accent-primary"
            />
            <span className="text-base leading-snug text-on-surface">Other:</span>
            <input
              type="text"
              name={other.name}
              value={other.value}
              placeholder="Please specify"
              aria-label={`${legend} — other`}
              className="h-10 min-w-[12rem] flex-1 rounded border border-outline-variant bg-surface px-3 text-base text-on-surface outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </label>
        )}
      </div>
    </fieldset>
  );
}

export default ChoiceGroup;
