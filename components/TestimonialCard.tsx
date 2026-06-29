import { Card } from "./Card.tsx";

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  /** Avatar image; omit for an initials placeholder. */
  src?: string;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// A quote card: large gold quotation mark, body, and an attributed footer.
export function TestimonialCard(
  { quote, name, role, src }: Testimonial,
) {
  return (
    <Card>
      <span
        class="block text-4xl leading-none text-primary"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <blockquote class="mt-2 flex-1 leading-relaxed text-on-surface">
        {quote}
      </blockquote>
      <figcaption class="mt-6 flex items-center gap-3">
        {src
          ? (
            <img
              src={src}
              alt={name}
              class="h-10 w-10 rounded-full object-cover"
            />
          )
          : (
            <span
              aria-hidden="true"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-sm font-semibold text-on-primary-container"
            >
              {initials(name)}
            </span>
          )}
        <span>
          <span class="block text-sm font-semibold text-on-surface">
            {name}
          </span>
          {role && (
            <span class="block text-xs text-on-surface-variant">{role}</span>
          )}
        </span>
      </figcaption>
    </Card>
  );
}

export default TestimonialCard;
