import type { ComponentChildren } from "preact";
import { cx } from "./cx.ts";

export type FormFieldTone = "black" | "white" | "primary";
export type FormFieldSize = "sm" | "base";

const TONES: Record<FormFieldTone, string> = {
  black: "text-black",
  white: "text-white",
  primary: "text-primary",
};

const SIZES: Record<FormFieldSize, string> = {
  sm: "text-sm",
  base: "text-base",
};

export interface FormFieldProps {
  /** Label text, as WP prints it (usually uppercase). */
  label: string;
  /** Replaces `label` below md (WP marks required fields "FIRST NAME*" on
   *  mobile only). */
  labelMobile?: string;
  /** Label color: `black` on white/yellow, `white` on black, `primary`
   *  on the give-now yellow card. */
  tone?: FormFieldTone;
  /** Label size: `sm` 14px (contact forms) or `base` 16px. */
  size?: FormFieldSize;
  class?: string;
  /** The control: an `InputField`, `TextareaField`, ... */
  children: ComponentChildren;
}

/**
 * The labeled-control wrapper every form uses: a bold label above its
 * control, wrapped in a `<label>` so a click on the text focuses the input.
 * Spacing between fields comes from the parent form (gap), or `class`.
 */
export function FormField(
  {
    label,
    labelMobile,
    tone = "black",
    size = "sm",
    class: extra,
    children,
  }: FormFieldProps,
) {
  return (
    <label class={cx("block", extra)}>
      <span class={cx("mb-1 block font-semibold", SIZES[size], TONES[tone])}>
        {labelMobile
          ? (
            <>
              <span class="md:hidden">{labelMobile}</span>
              <span class="hidden md:inline">{label}</span>
            </>
          )
          : label}
      </span>
      {children}
    </label>
  );
}

export default FormField;
