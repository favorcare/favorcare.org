import { cx } from "./cx.ts";

export interface TextareaFieldProps {
  name?: string;
  placeholder?: string;
  required?: boolean;
  ariaLabel?: string;
  rows?: number;
  class?: string;
}

// Multiline sibling of InputField — same border + gold focus ring.
export function TextareaField(
  {
    name,
    placeholder,
    required,
    ariaLabel,
    rows = 5,
    class: extra,
  }: TextareaFieldProps,
) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      aria-label={ariaLabel}
      rows={rows}
      class={cx(
        "rounded border border-outline-variant bg-surface px-4 py-3",
        "text-base text-on-surface outline-none transition-colors",
        "focus:border-primary focus:ring-2 focus:ring-primary/30",
        extra,
      )}
    />
  );
}

export default TextareaField;
