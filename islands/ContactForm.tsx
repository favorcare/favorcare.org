import type { JSX } from "preact";
import { Button } from "../components/Button.tsx";
import { InputField } from "../components/InputField.tsx";
import { TextareaField } from "../components/TextareaField.tsx";
import { CONTACT } from "../components/content.ts";

// Contact form island — the site has no form backend yet, so submit
// composes a mailto: to Favor Care's inbox carrying the typed fields.
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
        placeholder="First Name"
        required
        ariaLabel="First name"
      />
      <InputField
        name="last-name"
        placeholder="Last Name"
        required
        ariaLabel="Last name"
      />
      <InputField
        type="email"
        name="email"
        placeholder="Email"
        required
        ariaLabel="Email"
      />
      <InputField
        type="tel"
        name="phone"
        placeholder="Phone"
        ariaLabel="Phone"
      />
      <div class="sm:col-span-2">
        <TextareaField
          name="message"
          placeholder="Message"
          required
          ariaLabel="Message"
          rows={6}
          class="w-full"
        />
      </div>
      <div class="sm:col-span-2">
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
}
