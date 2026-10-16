import { useEffect, useRef } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { CloseIcon } from "../components/icons.tsx";
import type { PopupBlock, PopupCta } from "../components/content.ts";

export type { PopupBlock, PopupCta };

/** Secondary dialog opened by a `cta` with `opensChain` (WP nested
 *  popups: the volunteer disclaimer opens the full guidelines doc).
 *  Plain data only — it has to cross the island boundary. */
export interface PopupChain {
  title: string;
  blocks: PopupBlock[];
  cta?: PopupCta;
}

export interface PopupProps {
  /** Content of the button that opens the dialog. Omit for auto-opened
   *  popups — no trigger is rendered. */
  trigger?: ComponentChildren;
  triggerClass?: string;
  title: string;
  children?: ComponentChildren;
  /** Structured body blocks (same shape as a chained dialog's) — rendered
   *  after `children` (the /signup gate shows the full guidelines doc). */
  blocks?: PopupBlock[];
  cta?: PopupCta;
  /** Auto-open after a delay. With a `sessionKey` it opens once per
   *  browser session (the WP `page_load_delay` trigger — accreditation,
   *  3s, site-wide in routes/_app.tsx); without one it opens on every
   *  visit (the /signup commitment gate). */
  auto?: { delayMs?: number; sessionKey?: string };
  chain?: PopupChain;
}

function Blocks({ blocks }: { blocks: PopupBlock[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.type === "h"
          ? (
            <h3 key={i} class="mt-4 font-semibold text-on-surface first:mt-0">
              {b.text}
            </h3>
          )
          : b.type === "ul"
          ? (
            <ul key={i} class="mt-2 list-disc space-y-1 pl-5">
              {b.items?.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          )
          : <p key={i} class="mt-2 first:mt-0">{b.text}</p>
      )}
    </>
  );
}

// Dialog island for the WP Elementor popups. Native <dialog> gives
// Esc-to-close, focus containment, and ::backdrop for free. Covers all
// three WP popup shapes: click trigger (footer accreditation, get-involved
// SERVE), auto-open with a once-per-session guard, and chained dialogs.
export default function Popup(
  { trigger, triggerClass, title, children, blocks, cta, auto, chain }:
    PopupProps,
) {
  const ref = useRef<HTMLDialogElement>(null);
  const chainRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!auto) return;
    let seen = false;
    if (auto.sessionKey !== undefined) {
      try {
        seen = sessionStorage.getItem(auto.sessionKey) !== null;
      } catch {
        // Storage can throw (private mode) — fall through and show once.
      }
    }
    if (seen) return;
    const t = setTimeout(() => {
      ref.current?.showModal();
      if (auto.sessionKey !== undefined) {
        try {
          sessionStorage.setItem(auto.sessionKey, "1");
        } catch {
          // Ignore — worst case the popup shows again on the next visit.
        }
      }
    }, auto.delayMs ?? 3000);
    return () => clearTimeout(t);
  }, [auto]);

  const dialogClass =
    "m-auto max-h-[80vh] w-[min(28rem,92vw)] overflow-y-auto border-0 bg-surface p-0 text-on-surface shadow-lg";
  const ctaClass =
    "mt-6 inline-flex min-h-12 items-center justify-center rounded bg-primary px-6 text-sm font-bold uppercase tracking-wider text-on-primary hover:bg-primary-hover";

  const ctaNode = (
    cta?: PopupCta,
    onOpenChain?: () => void,
    onClose?: () => void,
  ) => {
    if (!cta) return null;
    if (cta.closesPopup && onClose) {
      return (
        <button type="button" onClick={onClose} class={ctaClass}>
          {cta.label}
        </button>
      );
    }
    if (cta.opensChain && onOpenChain) {
      return (
        <button type="button" onClick={onOpenChain} class={ctaClass}>
          {cta.label}
        </button>
      );
    }
    if (!cta.href) return null;
    return (
      <a
        href={cta.href}
        {...cta.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {}}
        class={ctaClass}
      >
        {cta.label}
      </a>
    );
  };

  const closeBtn = (onClick: () => void) => (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      class="absolute right-3 top-3 inline-flex h-12 w-12 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"
    >
      <CloseIcon size={20} />
    </button>
  );

  const openChain = () => {
    ref.current?.close();
    chainRef.current?.showModal();
  };

  return (
    <>
      {trigger !== undefined && (
        <button
          type="button"
          class={triggerClass}
          onClick={() => ref.current?.showModal()}
        >
          {trigger}
        </button>
      )}

      <dialog
        ref={ref}
        aria-label={title}
        class={`${dialogClass}${auto ? " popup-fade" : ""}`}
      >
        <div class="relative p-8">
          {closeBtn(() => ref.current?.close())}

          <h2 class="pr-10 text-xl font-semibold">{title}</h2>
          <div class="mt-3 text-base leading-relaxed text-on-surface-variant">
            {children}
            {blocks && <Blocks blocks={blocks} />}
            {ctaNode(cta, openChain, () => ref.current?.close())}
          </div>
        </div>
      </dialog>

      {chain && (
        <dialog ref={chainRef} aria-label={chain.title} class={dialogClass}>
          <div class="relative p-8">
            {closeBtn(() =>
              chainRef.current?.close()
            )}

            <h2 class="pr-10 text-xl font-semibold">{chain.title}</h2>
            <div class="mt-3 text-base leading-relaxed text-on-surface-variant">
              <Blocks blocks={chain.blocks} />
              {ctaNode(chain.cta, undefined, () =>
                chainRef.current?.close())}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
