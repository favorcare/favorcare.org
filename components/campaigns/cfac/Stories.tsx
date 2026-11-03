import { cx } from "../../cx.ts";
import CfacPhotoStrip from "../../../islands/CfacPhotoStrip.tsx";
import { CfacSectionIntro } from "./SectionIntro.tsx";
import { CFAC_FRAME, CFAC_SECTION } from "./layout.ts";
import { CFAC } from "./content.ts";

/**
 * CFAC "Communities We Help", cloned from cfac-landing-page's About
 * section: a warm-grey band with the section intro, then for each community
 * (Redemptio, Pangarap Ville) a `CfacPhotoStrip` followed by its centered
 * story. Content comes from `CFAC.stories`.
 */
export function CfacStories() {
  const { stories } = CFAC;
  return (
    <section
      id="who-we-are"
      className={cx("bg-surface-container-low", CFAC_SECTION)}
    >
      <div className={CFAC_FRAME}>
        <CfacSectionIntro
          title={stories.title}
          subtitle={stories.subtitle}
          className="mb-12"
        />
        <div className="space-y-16">
          {stories.items.map((story) => (
            <div key={story.title} className="space-y-16">
              <CfacPhotoStrip photos={story.photos} label={story.title} />
              <div className="text-center">
                <h3 className="mb-6 text-2xl font-bold text-primary md:text-3xl">
                  {story.title}
                </h3>
                <div className="mx-auto max-w-4xl space-y-4 text-base leading-relaxed text-on-surface-variant md:text-lg">
                  {story.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CfacStories;
