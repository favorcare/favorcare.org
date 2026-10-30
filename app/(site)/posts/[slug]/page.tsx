import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "../../../../components/Header.tsx";
import { Footer } from "../../../../components/Footer.tsx";
import { PageHero } from "../../../../components/PageHero.tsx";
import { cx } from "../../../../components/cx.ts";
import { Gallery } from "../../../../components/Gallery.tsx";
import { gutter } from "../../../../components/layout/Container.tsx";
import type { ArticleBlock, Post } from "../../../../components/posts.ts";
import { getPost, listPosts } from "../../../../components/posts.ts";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} — Favor Care`,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      images: [post.hero],
    },
  };
}

// Single post — cloned from the WP articles (staging = canonical): photo
// hero with the two-line 50px title (32px mobile), then the article flow
// in WP's own system (the `articleContent` custom CSS): 30px pull-quotes
// (one per post in the article yellow #F2B705), 16px/24px body at a
// 1120px measure, natural-aspect gallery grids (2/3/4 columns or
// full-width, per the source), gray `articleContentAdBreak` CTA cards
// (#f5f5f5, radius 12, centered, yellow pill buttons), and the About
// Favor Care footer block on the two outreach posts. Copy is verbatim.
export default async function PostPage({ params }: { params: Params }) {
  const found = getPost((await params).slug);
  if (!found) notFound();
  const post: Post = found;
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero: the post's cover photo with the two-line title. */}
        <PageHero
          image={post.hero}
          overlay="none"
          geometry="bare"
          framed={false}
          sectionClass="justify-center gap-1 py-[225px] lg:h-[633px] lg:py-0"
        >
          <h1 className="relative px-5 text-center text-[32px] font-semibold leading-tight text-white lg:text-[50px]">
            {post.heroLines[0]}
            <br />
            {post.heroLines[1]}
          </h1>
        </PageHero>

        <article className={cx(gutter(), "pb-24 pt-[100px]")}>
          <div className="mx-auto w-full max-w-[1120px] space-y-6">
            {post.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "quote":
      return (
        <h2
          className={`text-[22px] font-semibold leading-tight text-primary md:text-[30px] ${
            block.yellow ? "text-article-yellow" : ""
          }`}
        >
          {block.text}
        </h2>
      );
    case "heading":
      return (
        <h2 className="text-[22px] font-semibold leading-tight text-primary md:text-[30px]">
          {block.text}
        </h2>
      );
    case "text":
      return (
        <>
          {block.paragraphs.map((p) => (
            <p className="text-base leading-6 text-primary">{p}</p>
          ))}
        </>
      );
    case "gallery":
      return (
        <Gallery
          variant="article"
          images={block.images.map((src) => ({ src, alt: "" }))}
        />
      );
    case "cta":
      return (
        <div className="space-y-4 rounded-xl bg-adbreak px-5 py-[30px] text-center">
          <h2 className="text-[32px] font-bold leading-tight text-article-yellow">
            {block.heading}
          </h2>
          {block.parts.map((part, i) =>
            part.kind === "text" ? (
              <p className="text-base leading-6 text-primary" key={i}>
                {part.text}
              </p>
            ) : (
              <div key={i}>
                {/* Article-system pill (WP `articleContentAdBreak`) —
                      its own geometry, outside the site Button dialects. */}
                <a
                  href={part.href}
                  className="inline-block rounded-card bg-article-yellow px-[50px] py-[15px] text-lg font-bold leading-none text-black transition-opacity hover:opacity-90 lg:text-[22px]"
                >
                  {part.label}
                </a>
              </div>
            ),
          )}
        </div>
      );
  }
}
