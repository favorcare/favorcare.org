import { cx } from "../../cx.ts";
import { VideoEmbed } from "../../VideoEmbed.tsx";
import { CFAC_FRAME, CFAC_SECTION } from "./layout.ts";
import { CFAC } from "./content.ts";

/**
 * CFAC intro ("One Cup. One Future."), cloned from cfac-landing-page: the
 * campaign film in a 24px-round shadowed frame beside the challenge copy,
 * stacked below `lg`. Emphasized paragraphs (`strong`) set in semibold ink.
 * Reuses the shared lazy `VideoEmbed`.
 */
export function CfacIntro() {
  const { intro } = CFAC;
  return (
    <section id="what-we-do" className={CFAC_SECTION}>
      <div className={cx("grid grid-cols-1 gap-8 lg:grid-cols-2", CFAC_FRAME)}>
        <div className="aspect-video w-full overflow-hidden rounded-3xl shadow-xl">
          <VideoEmbed
            id={intro.video.id}
            title={intro.video.title}
            className="h-full w-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            {intro.title}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-on-surface-variant md:text-lg">
            {intro.paragraphs.map((p) => (
              <p
                key={p.text}
                className={p.strong ? "font-semibold text-primary" : undefined}
              >
                {p.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CfacIntro;
