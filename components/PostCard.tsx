import type { Post } from "./posts.ts";

// Post card for the /posts archive — cloned from the WP loop item:
// linked title above a wide cropped photo and the excerpt. No date,
// author, or reading time (the source shows none); the whole card is
// plain — no border or background, matching WP.
export function PostCard({ post }: { post: Post }) {
  return (
    <article class="flex flex-col">
      <h3 class="text-[26px] font-bold leading-[26px] text-primary">
        <a href={`/posts/${post.slug}`} class="hover:underline">
          {post.title}
        </a>
      </h3>
      <img
        src={post.hero}
        alt={post.heroAlt}
        loading="lazy"
        class="mt-[18px] aspect-15/8 w-full object-cover"
      />
      <p class="mt-3 text-base leading-6 text-primary">
        {post.description}
      </p>
    </article>
  );
}

export default PostCard;
