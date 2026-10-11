import { HttpError, page } from "fresh";
import { Head } from "fresh/runtime";
import { define } from "../../utils.ts";
import { Header } from "../../components/Header.tsx";
import { Footer } from "../../components/Footer.tsx";
import { Button } from "../../components/Button.tsx";
import { Container } from "../../components/layout/Container.tsx";
import { Section } from "../../components/layout/Section.tsx";
import { PostBody } from "../../components/PostBody.tsx";
import { getPost, type Post } from "../../components/posts.ts";
import { asset } from "../../utils/assets.ts";

export const handler = define.handlers({
  GET(ctx) {
    const post = getPost(ctx.params.slug);
    if (!post) throw new HttpError(404, "Post not found");
    return page({ post });
  },
});

// Post page — matches the WP single-post layout: back link, tag, title,
// optional cover, body. No author/date/reading-time (the source shows none).
export default define.page<typeof handler>(({ data }) => {
  const post: Post = data.post;
  const cover = post.cover ? asset(post.cover) : null;
  return (
    <>
      <Head>
        <title>{post.title} — Favor Care</title>
        <meta name="description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        {cover && <meta property="og:image" content={cover} />}
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <Section class="bg-primary pt-12 pb-16 text-white md:pt-16">
          <Container>
            <a
              href="/posts"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors hover:text-yellow"
            >
              <span aria-hidden="true">←</span> All posts
            </a>
            <div class="mt-6 max-w-3xl">
              <p class="text-xs font-semibold uppercase tracking-wider text-white/70">
                {post.tag}
              </p>
              <h1 class="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight md:text-5xl">
                {post.title}
              </h1>
            </div>
          </Container>
        </Section>

        {/* Body */}
        <Section class="py-16">
          <Container>
            {cover && (
              <img
                src={cover}
                alt={post.coverAlt}
                class="mx-auto aspect-16/9 w-full max-w-4xl object-cover"
              />
            )}
            <article class="mx-auto mt-10 max-w-2xl">
              <PostBody blocks={post.body} />
            </article>
            <div class="mx-auto mt-12 max-w-2xl">
              <Button variant="secondary" href="/posts">
                ← Back to all posts
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
});
