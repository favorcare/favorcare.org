import { cx } from "./cx.ts";
import { Button } from "./Button.tsx";
import type { Cta } from "./content.ts";

export interface CtaBandProps {
  title: string;
  body: string;
  cta: Cta;
  /** Section overrides (the who-we-are variant indents its frame). */
  className?: string;
}

// The closing "take action" band: full-bleed black, centered semibold
// heading, body copy, yellow pill. Extracted from the homepage; the
// quirky per-page variants (who-we-are's left heading, what-we-do's
// paired cards) compose `Button` + `SectionHeading` directly instead.
export function CtaBand({ title, body, cta, className: extra }: CtaBandProps) {
  return (
    <section
      className={cx("bg-black px-5 py-14 text-center md:py-16 lg:py-20", extra)}
    >
      <h2 className="text-[28px] font-semibold leading-tight tracking-tight text-white md:text-[39px] lg:text-[56px]">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-[675px] text-[14px] leading-relaxed text-white/80 md:text-[15px] lg:text-lg">
        {body}
      </p>
      <div className="mt-7">
        <Button
          variant="yellow"
          size="sm"
          href={cta.href}
          track="cta_band_click"
        >
          {cta.label}
        </Button>
      </div>
    </section>
  );
}

export default CtaBand;
