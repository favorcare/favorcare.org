import type { ReactNode } from "react";
import { cx } from "./cx.ts";

export interface BankCardProps {
  title: string;
  /** Card body: account lines, buttons — plain dark- or light-mode text. */
  children: ReactNode;
  /** `light` = 3px near-black outline on white (PH cards);
   *  `dark` = solid black with white text (US cards). */
  tone?: "light" | "dark";
  /** Row gap inside the card — WP measures 2 for bank blocks, 4 when a
   *  button sits under the title. */
  gap?: "2" | "4";
  /** Responsive visibility: the US bank details differ per breakpoint on
   *  WP, so the page renders a desktop-only and a mobile-only card. */
  display?: "flex" | "md-only" | "mobile-only";
  /** Layout additions (`md:flex-1` in the PH row). */
  className?: string;
}

// Bank/giving detail card from the give-now page: radius 30, 3px border,
// centered stack. Extracted from the three PH cards and the US card pair
// (which WP ships twice with different bank details per breakpoint).
export function BankCard(
  {
    title,
    children,
    tone = "light",
    gap = "2",
    display = "flex",
    className: extra,
  }: BankCardProps,
) {
  return (
    <div
      className={cx(
        display === "md-only" && "hidden",
        display !== "md-only" && "flex",
        display === "md-only" && "md:flex",
        display === "mobile-only" && "md:hidden",
        "flex-col items-center justify-center rounded-card border-[3px] p-6 text-center",
        gap === "4" ? "gap-4" : "gap-2",
        tone === "dark" ? "border-black bg-black" : "border-primary",
        extra,
      )}
    >
      <h3
        className={cx(
          "text-[32px] font-bold leading-tight",
          tone === "dark" ? "text-white" : "text-primary",
        )}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

export default BankCard;
