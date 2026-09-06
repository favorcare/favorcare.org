import { Head } from "fresh/runtime";
import { define } from "../../utils.ts";
import { Header } from "../../components/Header.tsx";
import { Footer } from "../../components/Footer.tsx";
import { Container } from "../../components/layout/Container.tsx";
import { Section } from "../../components/layout/Section.tsx";
import { SectionHeading } from "../../components/layout/SectionHeading.tsx";
import { PostCard } from "../../components/PostCard.tsx";
import { listPosts } from "../../components/posts.ts";

export default define.page(function PostsIndex() {
  const posts = listPosts();
  return (
    <>
      <Head>
        <title>Posts — Favor Care</title>
        <meta
          name="description"
          content="Stories and updates from Favor Care's outreaches, clinic days, and community work across the Philippines."
        />
      </Head>
      <Header />
      <main>
        <Section class="pb-20 pt-16 md:pt-20">
          <Container>
            <SectionHeading
              eyebrow="Stories & impact"
              title="Latest from Favor Care"
              subtitle="On-the-ground stories from our outreaches, clinic days, and partnerships — where compassion becomes measurable change."
            />
            <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => <PostCard key={post.slug} post={post} />)}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
});
