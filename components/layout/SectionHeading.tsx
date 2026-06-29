import type { ComponentChildren } from "preact";
import { cx } from "../cx.ts";
import { Eyebrow, type EyebrowTone } from "../Eyebrow.tsx";

export interface SectionHeadingProps {
  /** Optional uppercase label above the title. */
  eyebrow?: ComponentChildren;
  eyebrowTone?: EyebrowTone;
  title: ComponentChildren;
  subtitle?: ComponentChildren;
  align?: "left" | "center";
  class?: string;
}

// The repeating section intro: eyebrow + title + subtitle.
// Default left-aligned in a 2xl measure; center for symmetric sections.
export function SectionHeading(
  {
    eyebrow,
    eyebrowTone,
    title,
    subtitle,
    align = "left",
    class: extra,
  }: SectionHeadingProps,
) {
  return (
    <div
      class={cx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        extra,
      )}
    >
      {eyebrow !== undefined && (
        <Eyebrow tone={eyebrowTone} class="block">{eyebrow}</Eyebrow>
      )}
      <h2
        class={cx(
          "text-3xl font-semibold tracking-tight text-on-surface md:text-4xl",
          eyebrow !== undefined && "mt-3",
        )}
      >
        {title}
      </h2>
      {subtitle !== undefined && (
        <p class="mt-4 text-lg leading-relaxed text-on-surface-variant">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
