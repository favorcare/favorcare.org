"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
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
  trigger?: ReactNode;
  triggerClass?: string;
  title: string;
  children?: ReactNode;
  /** Structured body blocks (same shape as a chained dialog's) — rendered
   *  after `children` (the /signup gate shows the full guidelines doc). */
  blocks?: PopupBlock[];
  cta?: PopupCta;
  /** Auto-open after a delay. With a `sessionKey` it opens once per
   *  browser session (the WP `page_load_delay` trigger — accreditation,
   *  3s, site-wide in app/(site)/layout.tsx); without one it opens on every
   *  visit (the /signup commitment gate). */
  auto?: { delayMs?: number; sessionKey?: string };
  chain?: PopupChain;
  /** `"accreditation"` renders the WP 7281 layout (see
   *  `AccreditationPopup`): a 650px `#F3F3F3` card (325px on mobile), a
   *  black square close, a centred 40/36/20px bold capitalised title, the
   *  server-rendered `children` (logos + Prompt body), and the CTA as a
   *  yellow square button on a black band. Default: the plain white card. */
  variant?: "default" | "accreditation";
}

function Blocks({ blocks }: { blocks: PopupBlock[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.type === "h" ? (
          <h3 key={i} className="mt-4 font-semibold text-on-surface first:mt-0">
            {b.text}
          </h3>
        ) : b.type === "ul" ? (
          <ul key={i} className="mt-2 list-disc space-y-1 pl-5">
            {b.items?.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={i} className="mt-2 first:mt-0">
            {b.text}
          </p>
        ),
      )}
    </>
  );
}

// Dialog island for the WP Elementor popups. Native <dialog> gives
// Esc-to-close, focus containment, and ::backdrop for free. Covers all
// three WP popup shapes: click trigger (footer accreditation, get-involved
// SERVE), auto-open with a once-per-session guard, and chained dialogs.
export default function Popup({
  trigger,
  triggerClass,
  title,
  children,
  blocks,
  cta,
  auto,
  chain,
  variant = "default",
}: PopupProps) {
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
    // Depend on the primitives: an `auto` object literal is new every render.
  }, [auto?.delayMs, auto?.sessionKey]);

  const dialogClass =
    "m-auto max-h-[80vh] w-[min(28rem,92vw)] overflow-y-auto border-0 bg-surface p-0 text-on-surface shadow-lg";
  const accreditation = variant === "accreditation";
  // WP 7281, measured: dialog 650px (325px <768), #F3F3F3, shadow
  // 2px 8px 23px 3px rgba(0,0,0,.1), overlay rgba(32,32,32,.53).
  const accreditationDialogClass =
    "popup-accreditation m-auto max-h-[90vh] w-[min(325px,92vw)] overflow-y-auto border-0 bg-popup p-0 text-black shadow-[2px_8px_23px_3px_rgba(0,0,0,0.1)] md:w-[min(650px,92vw)]";
  // WP button 53b621da: 16px bold uppercase +1px tracking, square, 1px
  // #9AA8BA border, 18/22/16 padding; hover drops the fill to yellow text.
  const accreditationCtaClass =
    "inline-flex min-h-12 items-center justify-center border border-popup-cta-border bg-yellow px-[22px] pb-4 pt-[18px] text-base font-bold uppercase leading-none tracking-[1px] text-black hover:border-yellow hover:bg-transparent hover:text-yellow";
  const ctaClass = accreditation
    ? accreditationCtaClass
    : "mt-6 inline-flex min-h-12 items-center justify-center rounded bg-primary px-6 text-sm font-bold uppercase tracking-wider text-on-primary hover:bg-primary-hover";

  const ctaNode = (
    cta?: PopupCta,
    onOpenChain?: () => void,
    onClose?: () => void,
  ) => {
    if (!cta) return null;
    if (cta.closesPopup && onClose) {
      return (
        <button type="button" onClick={onClose} className={ctaClass}>
          {cta.label}
        </button>
      );
    }
    if (cta.opensChain && onOpenChain) {
      return (
        <button type="button" onClick={onOpenChain} className={ctaClass}>
          {cta.label}
        </button>
      );
    }
    if (!cta.href) return null;
    return (
      <a
        href={cta.href}
        {...(cta.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={ctaClass}
      >
        {cta.label}
      </a>
    );
  };

  // WP icon 3aff6280: stacked square, black fill, white 14px glyph (12px
  // on mobile), yellow on hover. 48px instead of WP's 46px (touch floor).
  const accreditationCloseBtn = (onClick: () => void) => (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className="relative z-10 -mb-[15px] inline-flex h-12 w-12 items-center justify-center self-end bg-black text-white hover:bg-yellow hover:text-black md:-mb-[35px]"
    >
      <CloseIcon size={18} strokeWidth={1.25} />
    </button>
  );

  const closeBtn = (onClick: () => void) => (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className="absolute right-3 top-3 inline-flex h-12 w-12 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"
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
          className={triggerClass}
          onClick={() => ref.current?.showModal()}
        >
          {trigger}
        </button>
      )}

      <dialog
        ref={ref}
        aria-label={title}
        className={`${accreditation ? accreditationDialogClass : dialogClass}${auto ? " popup-fade" : ""}`}
      >
        {accreditation ? (
          <div className="flex min-h-[45vh] flex-col justify-between gap-[30px]">
            {accreditationCloseBtn(() => ref.current?.close())}
            <div className="mx-auto flex w-full max-w-[550px] flex-col gap-[35px] text-center">
              <h2 className="mx-auto max-w-[233px] text-xl font-bold capitalize leading-[1.1] tracking-[-0.5px] md:max-w-none md:text-4xl md:tracking-normal lg:text-[40px]">
                {title}
              </h2>
              {children}
            </div>
            {cta && (
              <div className="flex min-h-[12vh] items-center justify-center bg-black py-[50px] md:py-[38px] lg:py-0">
                {ctaNode(cta, openChain, () => ref.current?.close())}
              </div>
            )}
          </div>
        ) : (
          <div className="relative p-8">
            {closeBtn(() => ref.current?.close())}

            <h2 className="pr-10 text-xl font-semibold">{title}</h2>
            <div className="mt-3 text-base leading-relaxed text-on-surface-variant">
              {children}
              {blocks && <Blocks blocks={blocks} />}
              {ctaNode(cta, openChain, () => ref.current?.close())}
            </div>
          </div>
        )}
      </dialog>

      {chain && (
        <dialog ref={chainRef} aria-label={chain.title} className={dialogClass}>
          <div className="relative p-8">
            {closeBtn(() => chainRef.current?.close())}

            <h2 className="pr-10 text-xl font-semibold">{chain.title}</h2>
            <div className="mt-3 text-base leading-relaxed text-on-surface-variant">
              <Blocks blocks={chain.blocks} />
              {ctaNode(chain.cta, undefined, () => chainRef.current?.close())}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
