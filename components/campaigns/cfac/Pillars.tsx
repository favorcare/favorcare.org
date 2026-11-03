import { cx } from "../../cx.ts";
import { CFAC_FRAME, CFAC_SECTION } from "./layout.ts";
import { CFAC } from "./content.ts";

/**
 * CFAC pillars, cloned from cfac-landing-page's Communities section: five
 * rows of title + copy beside a 16:9 rounded, shadowed photo, alternating
 * sides from `lg` (`imageSide`), stacked text-first on mobile.
 */
export function CfacPillars() {
  return (
    <section id="communities" className={CFAC_SECTION}>
      <div className={cx("space-y-16", CFAC_FRAME)}>
        {CFAC.pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2"
          >
            <div className={pillar.imageSide === "left" ? "lg:order-2" : ""}>
              <h3 className="mb-6 text-2xl font-bold text-primary md:text-3xl">
                {pillar.title}
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-on-surface-variant md:text-lg">
                {pillar.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div className={pillar.imageSide === "left" ? "lg:order-1" : ""}>
              <div className="aspect-video overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={pillar.image.src}
                  alt={pillar.image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CfacPillars;
