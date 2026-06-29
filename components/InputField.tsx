import { cx } from "./cx.ts";

export interface InputFieldProps {
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  ariaLabel?: string;
  class?: string;
}

// Text input per DESIGN.md input-field: 48px tall, hairline border, gold focus ring.
export function InputField(
  {
    type = "text",
    name,
    value,
    placeholder,
    required,
    ariaLabel,
    class: extra,
  }: InputFieldProps,
) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      required={required}
      aria-label={ariaLabel}
      class={cx(
        "h-12 flex-1 rounded border border-outline-variant bg-surface px-4",
        "text-on-surface outline-none transition-colors",
        "focus:border-primary focus:ring-2 focus:ring-primary/30",
        extra,
      )}
    />
  );
}

export default InputField;
