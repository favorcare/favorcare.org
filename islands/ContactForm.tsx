import type { JSX } from "preact";
import { Button } from "../components/Button.tsx";
import { InputField } from "../components/InputField.tsx";
import { TextareaField } from "../components/TextareaField.tsx";
import { CONTACT } from "../components/content.ts";

// Contact form island — labels match the WP form (FIRST NAME / LAST NAME /
// EMAIL / PHONE / newsletter checkbox / LEAVE US A MESSAGE! / SEND). The
// site has no form backend yet, so submit composes a mailto: to Favor
// Care's inbox carrying the typed fields.
export default function ContactForm() {
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

  return (
    <form onSubmit={onSubmit} class="grid gap-4 sm:grid-cols-2">
      <InputField
        name="first-name"
        placeholder="FIRST NAME"
        required
        ariaLabel="First name"
      />
      <InputField
        name="last-name"
        placeholder="LAST NAME"
        required
        ariaLabel="Last name"
      />
      <InputField
        type="email"
        name="email"
        placeholder="EMAIL"
        required
        ariaLabel="Email"
      />
      <InputField
        type="tel"
        name="phone"
        placeholder="PHONE"
        ariaLabel="Phone"
      />
      <div class="sm:col-span-2">
        <label class="flex min-h-12 items-center gap-3 text-sm font-semibold text-on-surface">
          <input
            type="checkbox"
            name="newsletter"
            class="h-5 w-5 accent-[#191718]"
          />
          SUBSCRIBE TO OUR MONTHLY EMAIL NEWSLETTER!
        </label>
      </div>
      <div class="sm:col-span-2">
        <TextareaField
          name="message"
          placeholder="LEAVE US A MESSAGE!"
          required
          ariaLabel="Message"
          rows={6}
          class="w-full"
        />
      </div>
      <div class="sm:col-span-2">
        <Button type="submit">SEND</Button>
      </div>
    </form>
  );
}
