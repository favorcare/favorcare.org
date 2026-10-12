import { page } from "fresh";
import { Head } from "fresh/runtime";
import { define } from "../../utils.ts";
import { Header } from "../../components/Header.tsx";
import { Footer } from "../../components/Footer.tsx";
import { PageHero } from "../../components/PageHero.tsx";
import { PostCard } from "../../components/PostCard.tsx";
import { listPosts } from "../../components/posts.ts";
import { asset } from "../../utils/assets.ts";

// Post archive — the canonical WP archive lives at /posts (staging's
// /news-updates is a 404). Cloned from the WP page (post 7721, staging =
// canonical): photo hero (desktop-only — WP hides it below 1024px with
// the whole section collapsed), text-tab tag filters ("All" leftmost,
// active tab near-black, inactive gray), and 2-column title/photo/excerpt
// cards. Filtering is server-rendered via ?tag= (the tabs are links).
const INTRO =
  "Stories of hope, care, and changed lives. Every story here is a life touched — through education, relief, and everyday compassion. This is the work of Favor Care, the community arm of Favor Church.";

const HERO_IMAGE = asset("/images/posts/archive-hero.jpg");

export const handler = define.handlers({
  GET(ctx) {
    const tag = ctx.url.searchParams.get("tag");
    const all = listPosts();
    const tags = ["All", ...new Set(all.map((p) => p.tag))];
    const posts = tag && tag !== "All" ? all.filter((p) => p.tag === tag) : all;
    return page({ posts, tags, active: tag ?? "All" });
  },
});

export default define.page<typeof handler>(({ data }) => (
  <>
    <Head>
      <title>Favor Care: News &amp; Updates</title>
      <meta name="description" content={INTRO} />
    </Head>
    <Header />
    <main id="main-content" tabIndex={-1}>
      {
        /* Hero: WP shows the photo hero only from desktop up — below that
            the section collapses entirely and the cards lead the page. */
      }
      <PageHero
        image={HERO_IMAGE}
        geometry="bare"
        sectionClass="hidden lg:block"
        frameClass="flex flex-col items-center gap-4 py-25 lg:pb-45"
      >
        <h1 class="text-center text-[70px] font-bold leading-none text-white">
          News &amp; Updates
        </h1>
        <p class="mx-auto mt-4 max-w-[798px] text-center text-lg leading-relaxed text-white">
          {INTRO}
        </p>
      </PageHero>

      <section class="px-5 pt-[70px] md:px-2.5 lg:px-0 lg:pt-[46px]">
        <div class="mx-auto w-full max-w-[1140px]">
          {
            /* Tag filters: plain text tabs (no pills) — active near-black,
                inactive gray; stacked and centered below md. */
          }
          <nav
            aria-label="Filter by tag"
            class="flex flex-col items-center gap-1 text-center md:flex-row md:items-start md:gap-5 md:text-left"
          >
            {data.tags.map((t) => (
              <a
                key={t}
                href={t === "All"
                  ? "/posts"
                  : `/posts?tag=${encodeURIComponent(t)}`}
                class={`py-1.5 text-[18px] leading-none md:text-[22px] ${
                  t === data.active
                    ? "font-semibold text-[#0c0d0e]"
                    : "text-[#69727d] hover:text-[#0c0d0e]"
                }`}
              >
                {t}
              </a>
            ))}
          </nav>

          <div class="mt-8 grid grid-cols-1 gap-[30px] md:grid-cols-2 md:gap-x-[30px] lg:mt-[70px]">
            {data.posts.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
));
