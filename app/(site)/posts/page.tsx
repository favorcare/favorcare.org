import type { Metadata } from "next";
import { Header } from "../../../components/Header.tsx";
import { Footer } from "../../../components/Footer.tsx";
import { PageHero } from "../../../components/PageHero.tsx";
import { PostCard } from "../../../components/PostCard.tsx";
import { listPosts } from "../../../components/posts.ts";
import { cx } from "../../../components/cx.ts";
import { frame, gutter } from "../../../components/layout/Container.tsx";
import { asset } from "../../../utils/assets.ts";

// Post archive — the canonical WP archive lives at /posts (staging's
// /news-updates is a 404). Cloned from the WP page (post 7721, staging =
// canonical): photo hero (desktop-only — WP hides it below 1024px with
// the whole section collapsed), text-tab tag filters ("All" leftmost,
// active tab near-black, inactive gray), and 2-column title/photo/excerpt
// cards. Filtering is server-rendered via ?tag= (the tabs are links).
const INTRO =
  "Stories of hope, care, and changed lives. Every story here is a life touched — through education, relief, and everyday compassion. This is the work of Favor Care, the community arm of Favor Church.";

const HERO_IMAGE = asset("/images/posts/archive-hero.jpg");

export const metadata: Metadata = {
  title: "Favor Care: News & Updates",
  description: INTRO,
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string | string[] }>;
}) {
  const { tag: rawTag } = await searchParams;
  const tag = Array.isArray(rawTag) ? rawTag[0] : rawTag;
  const all = listPosts();
  const tags = ["All", ...new Set(all.map((p) => p.tag))];
  const posts = tag && tag !== "All" ? all.filter((p) => p.tag === tag) : all;
  const data = { posts, tags, active: tag ?? "All" };
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero: WP shows the photo hero only from desktop up — below that
            the section collapses entirely and the cards lead the page. */}
        <PageHero
          image={HERO_IMAGE}
          geometry="bare"
          sectionClass="hidden lg:block"
          frameClass="flex flex-col items-center gap-4 py-25 lg:pb-45"
        >
          <h1 className="text-center text-[70px] font-bold leading-none text-white">
            News &amp; Updates
          </h1>
          <p className="mx-auto mt-4 max-w-[798px] text-center text-lg leading-relaxed text-white">
            {INTRO}
          </p>
        </PageHero>

        <section className={cx(gutter(), "pt-[70px] lg:pt-[46px]")}>
          <div className={frame()}>
            {/* Tag filters: plain text tabs (no pills) — active near-black,
                inactive gray; stacked and centered below md. */}
            <nav
              aria-label="Filter by tag"
              className="flex flex-col items-center gap-1 text-center md:flex-row md:items-start md:gap-5 md:text-left"
            >
              {data.tags.map((t) => (
                <a
                  key={t}
                  href={
                    t === "All"
                      ? "/posts"
                      : `/posts?tag=${encodeURIComponent(t)}`
                  }
                  className={`py-1.5 text-[18px] leading-none md:text-[22px] ${
                    t === data.active
                      ? "font-semibold text-archive-ink"
                      : "text-archive-muted hover:text-archive-ink"
                  }`}
                >
                  {t}
                </a>
              ))}
            </nav>

            <div className="mt-8 grid grid-cols-1 gap-[30px] md:grid-cols-2 md:gap-x-[30px] lg:mt-[70px]">
              {data.posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
