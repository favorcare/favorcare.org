// Join class strings, dropping falsy values. Keeps conditional Tailwind tidy:
// `cx("p-4", isActive && "bg-primary", extra)`.
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
