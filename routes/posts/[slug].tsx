import { HttpError, page } from "fresh";
import { Head } from "fresh/runtime";
import { define } from "../../utils.ts";
import { Header } from "../../components/Header.tsx";
import { Footer } from "../../components/Footer.tsx";
import { Button } from "../../components/Button.tsx";
import { Badge } from "../../components/Badge.tsx";
import { Container } from "../../components/layout/Container.tsx";
import { Section } from "../../components/layout/Section.tsx";
import { DonateCTA } from "../../components/sections/DonateCTA.tsx";
import { PostBody } from "../../components/PostBody.tsx";
import { formatDate, getPost, type Post } from "../../components/posts.ts";

export const handler = define.handlers({
  GET(ctx) {
    const post = getPost(ctx.params.slug);
    if (!post) throw new HttpError(404, "Post not found");
    return page({ post });
  },
});

export default define.page<typeof handler>(({ data }) => {
  const post: Post = data.post;
  return (
    <>
      <Head>
        <title>{post.title} — Favor Care</title>
        <meta name="description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.cover} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <Section class="pt-12 md:pt-16">
          <Container>
            <a
              href="/posts"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
            >
              <span aria-hidden="true">←</span> All posts
            </a>
            <div class="mt-6 max-w-3xl">
              <Badge>{post.category}</Badge>
              <h1 class="mt-4 text-4xl font-bold tracking-tight text-on-surface md:text-5xl">
                {post.title}
              </h1>
              <div class="mt-5 flex flex-wrap items-center gap-2 text-sm text-on-surface-variant">
                <span class="font-medium text-on-surface">{post.author}</span>
                <span aria-hidden="true">·</span>
                <time datetime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
            <div class="mt-8 overflow-hidden rounded-xl border border-surface-container-high bg-surface-container">
              <img
                src={post.cover}
                alt={post.coverAlt}
                class="aspect-16/9 w-full object-cover"
              />
            </div>
          </Container>
        </Section>

        {/* Body */}
        <Section class="pb-20">
          <Container>
            <article class="mx-auto max-w-2xl">
              <PostBody blocks={post.body} />
            </article>
            <div class="mx-auto mt-12 max-w-2xl">
              <Button variant="secondary" href="/posts">
                ← Back to all posts
              </Button>
            </div>
          </Container>
        </Section>

        <DonateCTA
          title="Your gift, in their hands within days."
          body="Every option is secure, multi-currency, and tax-receipted. Give once, become a monthly Carer, or sponsor a child."
          cta={{ label: "Donate now", href: "/#donate" }}
        />
      </main>
      <Footer />
    </>
  );
});
