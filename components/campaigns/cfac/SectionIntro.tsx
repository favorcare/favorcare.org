import { cx } from "../../cx.ts";

export interface CfacSectionIntroProps {
  title: string;
  subtitle?: string;
  /** `h2` for section titles (default); `h3` inside a section. */
  as?: "h2" | "h3";
  className?: string;
}

/**
 * The centered title + lead pair that opens most CFAC sections (cloned from
 * cfac-landing-page: 30→36px bold ink title, 18px brown subtitle). Use it
 * instead of hand-rolling the heading stack per section.
 */
export function CfacSectionIntro({
  title,
  subtitle,
  as: Tag = "h2",
  className: extra,
}: CfacSectionIntroProps) {
  return (
    <div className={cx("text-center", extra)}>
      <Tag
        className={cx(
          "font-bold text-primary",
          Tag === "h2" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-on-surface-variant">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default CfacSectionIntro;
