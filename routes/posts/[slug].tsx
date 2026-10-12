import { HttpError, page } from "fresh";
import { Head } from "fresh/runtime";
import { define } from "../../utils.ts";
import { Header } from "../../components/Header.tsx";
import { Footer } from "../../components/Footer.tsx";
import type { ArticleBlock, Post } from "../../components/posts.ts";
import { getPost } from "../../components/posts.ts";

export const handler = define.handlers({
  GET(ctx) {
    const post = getPost(ctx.params.slug);
    if (!post) throw new HttpError(404, "Post not found");
    return page({ post });
  },
});

// Single post — cloned from the WP articles (staging = canonical): photo
// hero with the two-line 50px title (32px mobile), then the article flow
// in WP's own system (the `articleContent` custom CSS): 30px pull-quotes
// (one per post in the article yellow #F2B705), 16px/24px body at a
// 1120px measure, natural-aspect gallery grids (2/3/4 columns or
// full-width, per the source), gray `articleContentAdBreak` CTA cards
// (#f5f5f5, radius 12, centered, yellow pill buttons), and the About
// Favor Care footer block on the two outreach posts. Copy is verbatim.
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
        <meta property="og:image" content={post.hero} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero: the post's cover photo with the two-line title. */}
        <section class="relative flex flex-col items-center justify-center gap-1 py-[225px] lg:h-[633px] lg:py-0">
          <div
            class="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${post.hero})` }}
            aria-hidden="true"
          />
          <h1 class="relative px-5 text-center text-[32px] font-semibold leading-tight text-white lg:text-[50px]">
            {post.heroLines[0]}
            <br />
            {post.heroLines[1]}
          </h1>
        </section>

        <article class="px-5 pb-24 pt-[100px] md:px-2.5 lg:px-0">
          <div class="mx-auto w-full max-w-[1120px] space-y-6">
            {post.blocks.map((block, i) => <Block key={i} block={block} />)}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
});

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "quote":
      return (
        <h2
          class={`text-[22px] font-semibold leading-tight text-primary md:text-[30px] ${
            block.yellow ? "text-[#f2b705]" : ""
          }`}
        >
          {block.text}
        </h2>
      );
    case "heading":
      return (
        <h2 class="text-[22px] font-semibold leading-tight text-primary md:text-[30px]">
          {block.text}
        </h2>
      );
    case "text":
      return (
        <>
          {block.paragraphs.map((p) => (
            <p class="text-base leading-6 text-primary">{p}</p>
          ))}
        </>
      );
    case "gallery": {
      // Static class names — Tailwind can't generate dynamic ones.
      const cols = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
      }[block.images.length] ?? "grid-cols-3";
      return (
        <div class={`grid gap-4 ${cols}`}>
          {block.images.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              class="w-full object-cover"
            />
          ))}
        </div>
      );
    }
    case "cta":
      return (
        <div class="space-y-4 rounded-xl bg-[#f5f5f5] px-5 py-[30px] text-center">
          <h2 class="text-[32px] font-bold leading-tight text-[#f2b705]">
            {block.heading}
          </h2>
          {block.parts.map((part, i) =>
            part.kind === "text"
              ? (
                <p class="text-base leading-6 text-primary" key={i}>
                  {part.text}
                </p>
              )
              : (
                <div key={i}>
                  <a
                    href={part.href}
                    class="inline-block rounded-[30px] bg-[#f2b705] px-[50px] py-[15px] text-lg font-bold leading-none text-black transition-opacity hover:opacity-90 lg:text-[22px]"
                  >
                    {part.label}
                  </a>
                </div>
              )
          )}
        </div>
      );
  }
}
