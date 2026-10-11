import type { Post } from "./posts.ts";
import { asset } from "../utils/assets.ts";

// Post card for the /posts archive — matches the WP archive cards:
// title + excerpt (+ cover when the source post has one). No date,
// author, or reading time (the source shows none).
export function PostCard({ post }: { post: Post }) {
  return (
    <a
      href={`/posts/${post.slug}`}
      class="group flex gap-6 border border-surface-container-high bg-surface p-5 transition-colors hover:bg-surface-bright md:p-6"
    >
      {post.cover && (
        <div class="hidden w-48 shrink-0 overflow-hidden sm:block">
          <img
            src={asset(post.cover)}
            alt={post.coverAlt}
            loading="lazy"
            class="aspect-3/2 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div class="flex flex-1 flex-col">
        <h3 class="text-lg font-semibold leading-snug tracking-tight text-on-surface md:text-xl">
          {post.title}
        </h3>
        <p class="mt-2 text-base leading-relaxed text-on-surface-variant">
          {post.description}
        </p>
      </div>
    </a>
  );
}

export default PostCard;
