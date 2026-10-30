import { cx } from "./cx.ts";

export type InputFieldSize = "md" | "give-now";

const SIZES: Record<InputFieldSize, string> = {
  // The default per DESIGN.md input-field: 48px tall, hairline border.
  md:
    "h-12 rounded border border-outline-variant bg-surface text-base focus:border-primary",
  // The give-now tax card's measured input: 59px, 5px radius, borderless
  // white on the yellow card (WP measures no border there).
  "give-now": "h-[59px] w-full rounded-[5px] border-0 bg-white text-lg",
};

export interface InputFieldProps {
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  ariaLabel?: string;
  size?: InputFieldSize;
  className?: string;
}

// Text input: gold focus ring throughout; size picks the measured dialect.
export function InputField(
  {
    type = "text",
    name,
    value,
    placeholder,
    required,
    ariaLabel,
    size = "md",
    className: extra,
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
      className={cx(
        "flex-1 px-4 text-on-surface outline-none transition-colors",
        "focus:ring-2 focus:ring-primary/30",
        SIZES[size],
        extra,
      )}
    />
  );
}

export default InputField;
