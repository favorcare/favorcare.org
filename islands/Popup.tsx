import { useRef } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { CloseIcon } from "../components/icons.tsx";

export interface PopupCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface PopupProps {
  /** Label of the element that opens the dialog. */
  trigger: string;
  triggerClass?: string;
  title: string;
  children: ComponentChildren;
  cta?: PopupCta;
}

// Minimal dialog island for the WP Elementor popups (Prayer Hub,
// accreditation announcement, volunteer disclaimer). Native <dialog>
// gives us Esc-to-close, focus containment, and ::backdrop for free.
export default function Popup(
  { trigger, triggerClass, title, children, cta }: PopupProps,
) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        class={triggerClass}
        onClick={() => ref.current?.showModal()}
      >
        {trigger}
      </button>

      <dialog
        ref={ref}
        aria-label={title}
        class="m-auto w-[min(28rem,92vw)] border-0 bg-surface p-0 text-on-surface shadow-lg"
      >
        <div class="relative p-8">
          <button
            type="button"
            aria-label="Close"
            onClick={() => ref.current?.close()}
            class="absolute right-3 top-3 inline-flex h-12 w-12 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"
          >
            <CloseIcon size={20} />
          </button>

          <h2 class="pr-10 text-xl font-semibold">{title}</h2>
          <div class="mt-3 text-base leading-relaxed text-on-surface-variant">
            {children}
          </div>

          {cta && (
            <a
              href={cta.href}
              {...cta.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {}}
              class="mt-6 inline-flex min-h-12 items-center justify-center rounded bg-primary px-6 text-sm font-bold uppercase tracking-wider text-on-primary hover:bg-primary-hover"
            >
              {cta.label}
            </a>
          )}
        </div>
      </dialog>
    </>
  );
}
