import { Badge } from "./Badge.tsx";
import { formatDate, type Post } from "./posts.ts";

// Surface + hairline border match the shared <Card>; built as its own <a> so
// the hotlinked cover can bleed full-width and round with the card edges.
const BASE =
  "group flex flex-col overflow-hidden rounded-lg border border-surface-container-high bg-surface shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md";

// Image-led card for the /posts grid: cover, category, title, excerpt, meta.
export function PostCard({ post }: { post: Post }) {
  return (
    <a href={`/posts/${post.slug}`} class={BASE}>
      <div class="aspect-3/2 overflow-hidden bg-surface-container">
        <img
          src={post.cover}
          alt={post.coverAlt}
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div class="flex flex-1 flex-col gap-3 p-6">
        <Badge>{post.category}</Badge>
        <h3 class="text-xl font-semibold tracking-tight text-on-surface">
          {post.title}
        </h3>
        <p class="line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
          {post.description}
        </p>
        <div class="mt-auto flex items-center gap-2 pt-4 text-xs font-medium uppercase tracking-wide text-on-surface-variant">
          <time datetime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </a>
  );
}

export default PostCard;
