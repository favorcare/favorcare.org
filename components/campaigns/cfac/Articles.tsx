import { cx } from "../../cx.ts";
import { listPosts, type Post } from "../../posts.ts";
import { CfacSectionIntro } from "./SectionIntro.tsx";
import { CFAC_FRAME, CFAC_SECTION } from "./layout.ts";
import { CFAC } from "./content.ts";

const DATE = new Intl.DateTimeFormat("en-PH", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/**
 * A CFAC article card, cloned from cfac-landing-page's "Insights & Stories"
 * grid: white 16px-round card, 16:9 cover, gold tag pill + date, two-line
 * title, three-line excerpt. Takes a site `Post` (components/posts.ts).
 */
export function CfacArticleCard({ post }: { post: Post }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-surface shadow-md transition-shadow hover:shadow-xl">
      <div className="aspect-video overflow-hidden">
        <img
          src={post.hero}
          alt={post.heroAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-yellow px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {post.tag}
          </span>
          <time
            dateTime={post.date}
            className="text-sm text-on-surface-variant"
          >
            {DATE.format(new Date(post.date))}
          </time>
        </div>
        <h3 className="mb-3 line-clamp-2 text-lg font-bold text-primary">
          <a
            href={`/posts/${post.slug}`}
            className="text-primary hover:underline"
          >
            {post.title}
          </a>
        </h3>
        <p className="line-clamp-3 text-base text-on-surface-variant">
          {post.description}
        </p>
      </div>
    </article>
  );
}

/**
 * CFAC "Insights & Stories": the newest site posts as `CfacArticleCard`s on
 * the warm-grey band. The sample's WP category filter chips are left out —
 * three cards don't need filtering.
 */
export function CfacArticles() {
  const posts = listPosts().slice(0, CFAC.articles.count);
  return (
    <section className={cx("bg-surface-container-low", CFAC_SECTION)}>
      <div className={CFAC_FRAME}>
        <CfacSectionIntro title={CFAC.articles.title} className="mb-12" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <CfacArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CfacArticles;
