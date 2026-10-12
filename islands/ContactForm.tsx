import type { JSX } from "preact";
import { InputField } from "../components/InputField.tsx";
import { TextareaField } from "../components/TextareaField.tsx";
import { CONTACT } from "../components/content.ts";

// Contact form island, cloned from the WP form. Two page variants:
//  - home: two-column from sm, "LEAVE US A MESSAGE!" label, outlined
//    SEND pill (matches the home page's yellow-card form).
//  - contact: single-column 684px form with WP's exact labels and
//    placeholders (FIRST NAME / LAST NAME / EMAIL / PHONE / MESSAGE),
//    40px fields with black hairline borders, black SEND pill. WP's
//    phone field carries the placeholder "Email" — a source quirk kept.
// No form backend yet, so submit composes a mailto: to Favor Care's
// inbox carrying the typed fields.
//
// Both SEND buttons are WP-measured one-offs (fixed 50px / outlined
// dialects) and deliberately bypass components/Button.tsx until the
// forms are consolidated onto a real backend.
export default function ContactForm(
  { page = "home", newsletter = false }: {
    page?: "home" | "contact";
    newsletter?: boolean;
  },
) {
  const onSubmit = (event: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const subject = `Website contact — ${field("first-name")} ${
      field("last-name")
    }`.trim();
    const body = [
      `Name: ${field("first-name")} ${field("last-name")}`.trim(),
      `Email: ${field("email")}`,
      `Phone: ${field("phone")}`,
      field("newsletter") === "on" ? "Subscribed to the newsletter" : "",
      "",
      field("message"),
    ].join("\n");
    globalThis.location.href = `mailto:${CONTACT.form.recipient}?subject=${
      encodeURIComponent(subject)
    }&body=${encodeURIComponent(body)}`;
  };

  const labelClass = "mb-1 block text-sm font-semibold text-black";

  if (page === "contact") {
    const fieldClass =
      "h-10 w-full rounded-[4px] border border-black bg-white px-3 text-base text-on-surface outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30";
    return (
      <form onSubmit={onSubmit} class="mx-auto w-full max-w-[684px]">
        <label class="block">
          <span class={labelClass}>
            <span class="md:hidden">FIRST NAME*</span>
            <span class="hidden md:inline">FIRST NAME</span>
          </span>
          <input
            type="text"
            name="first-name"
            placeholder="First Name*"
            required
            aria-label="First name"
            class={fieldClass}
          />
        </label>
        <label class="mt-[18px] block">
          <span class={labelClass}>
            <span class="md:hidden">LAST NAME*</span>
            <span class="hidden md:inline">LAST NAME</span>
          </span>
          <input
            type="text"
            name="last-name"
            placeholder="Last Name*"
            required
            aria-label="Last name"
            class={fieldClass}
          />
        </label>
        <label class="mt-[18px] block">
          <span class={labelClass}>
            <span class="md:hidden">EMAIL*</span>
            <span class="hidden md:inline">EMAIL</span>
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            required
            aria-label="Email"
            class={fieldClass}
          />
        </label>
        <label class="mt-[18px] block">
          <span class={labelClass}>PHONE</span>
          <input
            type="tel"
            name="phone"
            placeholder="Email"
            aria-label="Phone"
            class={fieldClass}
          />
        </label>
        <label class="mt-[18px] block">
          <span class={labelClass}>
            <span class="md:hidden">MESSAGE*</span>
            <span class="hidden md:inline">MESSAGE</span>
          </span>
          <textarea
            name="message"
            placeholder="Message*"
            required
            aria-label="Message"
            rows={3}
            class={`${fieldClass} h-24 resize-none py-2`}
          />
        </label>
        <div class="mt-6 flex justify-center">
          <button
            type="submit"
            class="inline-flex h-[50px] items-center justify-center rounded-full bg-black px-6 text-lg font-bold text-white transition-opacity hover:opacity-90"
          >
            SEND
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} class="grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class={labelClass}>FIRST NAME</span>
        <InputField
          name="first-name"
          placeholder="FIRST NAME"
          required
          ariaLabel="First name"
          class="w-full"
        />
      </label>
      <label class="block">
        <span class={labelClass}>LAST NAME</span>
        <InputField
          name="last-name"
          placeholder="LAST NAME"
          required
          ariaLabel="Last name"
          class="w-full"
        />
      </label>
      <label class="block">
        <span class={labelClass}>EMAIL</span>
        <InputField
          type="email"
          name="email"
          placeholder="EMAIL"
          required
          ariaLabel="Email"
          class="w-full"
        />
      </label>
      <label class="block">
        <span class={labelClass}>PHONE</span>
        <InputField
          type="tel"
          name="phone"
          placeholder="PHONE"
          ariaLabel="Phone"
          class="w-full"
        />
      </label>
      {newsletter && (
        <div class="sm:col-span-2">
          <label class="flex min-h-12 items-center gap-3 text-sm font-semibold text-black">
            <input
              type="checkbox"
              name="newsletter"
              class="h-5 w-5 accent-[#191718]"
            />
            <span class="lg:hidden">
              SUBSCRIBE TO OUR WEEKLY EMAIL NEWSLETTER!
            </span>
            <span class="hidden lg:inline">
              SUBSCRIBE TO OUR MONTHLY EMAIL NEWSLETTER!
            </span>
          </label>
        </div>
      )}
      <div class="sm:col-span-2">
        <label class="block">
          <span class={labelClass}>LEAVE US A MESSAGE!</span>
          <TextareaField
            name="message"
            placeholder="LEAVE US A MESSAGE!"
            required
            ariaLabel="Message"
            rows={6}
            class="w-full"
          />
        </label>
      </div>
      <div class="sm:col-span-2">
        <button
          type="submit"
          class="inline-flex min-h-12 items-center justify-center rounded-full border border-primary bg-transparent px-6 text-xl font-bold text-primary transition-all hover:bg-primary hover:text-on-primary"
        >
          SEND
        </button>
      </div>
    </form>
  );
}
