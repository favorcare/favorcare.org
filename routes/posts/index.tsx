import { page } from "fresh";
import { Head } from "fresh/runtime";
import { define } from "../../utils.ts";
import { Header } from "../../components/Header.tsx";
import { Footer } from "../../components/Footer.tsx";
import { Container } from "../../components/layout/Container.tsx";
import { PostCard } from "../../components/PostCard.tsx";
import { listPosts } from "../../components/posts.ts";

// Post archive — the canonical WP archive lives at /posts (staging's
// /news-updates is a 404): intro + tag filters + title/excerpt cards.
// Filtering is server-rendered via ?tag= (the tag chips are links).
const INTRO =
  "Stories of hope, care, and changed lives. Every story here is a life touched — through education, relief, and everyday compassion. This is the work of Favor Care, the community arm of Favor Church.";

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
      <section class="bg-primary py-20 text-center">
        <Container>
          <h1 class="mx-auto max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl">
            News &amp; Updates
          </h1>
          <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80">
            {INTRO}
          </p>
        </Container>
      </section>

      <section class="bg-surface py-16">
        <Container class="max-w-4xl">
          <nav aria-label="Filter by tag" class="flex flex-wrap gap-3">
            {data.tags.map((t) => (
              <a
                key={t}
                href={t === "All"
                  ? "/posts"
                  : `/posts?tag=${encodeURIComponent(t)}`}
                class={t === data.active
                  ? "border border-primary bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-on-primary"
                  : "border border-outline-variant bg-surface px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-on-surface hover:bg-secondary-container"}
              >
                {t}
              </a>
            ))}
          </nav>
          <div class="mt-10 flex flex-col gap-5">
            {data.posts.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </Container>
      </section>
    </main>
    <Footer />
  </>
));
