import type { JSX } from "preact";
import { Button } from "../components/Button.tsx";
import { InputField } from "../components/InputField.tsx";
import { TextareaField } from "../components/TextareaField.tsx";
import { CONTACT } from "../components/content.ts";

// Contact form island — labels match the WP form (FIRST NAME / LAST NAME /
// EMAIL / PHONE / LEAVE US A MESSAGE! / SEND), rendered as visible labels
// above each field as on WP. The home-page variant shows the newsletter
// checkbox (WEEKLY below desktop on WP, MONTHLY on desktop); the
// contact-page form does not. No form backend yet, so submit composes a
// mailto: to Favor Care's inbox carrying the typed fields.
export default function ContactForm({ newsletter = false }: {
  newsletter?: boolean;
}) {
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
        <Button type="submit" variant="outline" class="text-xl">SEND</Button>
      </div>
    </form>
  );
}
