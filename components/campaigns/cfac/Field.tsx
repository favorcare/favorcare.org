import { cx } from "../../cx.ts";

/** The sample's input skin: warm fill, hairline border, gold focus ring. */
const INPUT =
  "w-full min-h-12 rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-base text-on-surface placeholder:text-outline focus:border-yellow focus:outline-none focus:ring-2 focus:ring-yellow/40 md:rounded-2xl md:px-6 md:py-4";

export interface CfacFieldProps {
  name: string;
  /** Visible label (the contact form's uppercase labels, the certificate
   *  form's sentence-case ones). Omit to label via `placeholder` +
   *  `ariaLabel` only, as the donor-info inputs do. */
  label?: string;
  /** Uppercase tracking-wider labels (contact form) vs plain (certificate). */
  labelStyle?: "caps" | "plain";
  ariaLabel?: string;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  required?: boolean;
  /** Renders a `<textarea>` with this many rows instead of an `<input>`. */
  rows?: number;
  inputMode?: "decimal" | "text";
  className?: string;
}

/**
 * A labelled CFAC form field — input or textarea in the campaign's skin
 * (cloned from cfac-landing-page's donate/contact forms; 48px minimum
 * height per DESIGN.md, 16px text). Required fields mark the label with a
 * red asterisk, as the sample does.
 */
export function CfacField({
  name,
  label,
  labelStyle = "plain",
  ariaLabel,
  type = "text",
  placeholder,
  required,
  rows,
  inputMode,
  className: extra,
}: CfacFieldProps) {
  const id = `cfac-${name}`;
  return (
    <div className={extra}>
      {label && (
        <label
          htmlFor={id}
          className={cx(
            "mb-2 block text-sm text-on-surface-variant",
            labelStyle === "caps"
              ? "font-semibold uppercase tracking-wider"
              : "font-medium",
          )}
        >
          {label}
          {required && labelStyle === "caps" && (
            <span className="text-error"> *</span>
          )}
        </label>
      )}
      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          aria-label={label ? undefined : ariaLabel}
          className={cx(INPUT, "resize-none")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          required={required}
          aria-label={label ? undefined : ariaLabel}
          className={INPUT}
        />
      )}
    </div>
  );
}

export default CfacField;
