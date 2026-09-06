import type { VNode } from "preact";
import { Button } from "./Button.tsx";
import { type PostBlock } from "./posts.ts";

// Render a post's content blocks. Paragraphs read at body-lg size with ≥1.5
// line-height; callouts are the inline pull-quote CTAs from the source copy,
// surfaced on a primary-accented surface with a button (gold for donate,
// outlined for volunteer — per DESIGN.md's CTA hierarchy).
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div class="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            <p
              key={i}
              class="text-lg leading-relaxed text-on-surface"
            >
              {renderRichText(block.text, block.emphases)}
            </p>
          );
        }

        return (
          <aside
            key={i}
            class="my-10 rounded-lg border-l-4 border-primary bg-surface-dim p-6 sm:p-8"
          >
            <p class="text-xl font-semibold tracking-tight text-on-surface">
              {block.heading}
            </p>
            <p class="mt-3 text-lg leading-relaxed text-on-surface-variant">
              {block.body}
            </p>
            <div class="mt-6">
              <Button
                variant={block.ctaVariant ?? "primary"}
                href={block.cta.href}
              >
                {block.cta.label}
              </Button>
            </div>
          </aside>
        );
      })}
    </div>
  );
}

// Split text on any emphasis phrase and bold the matches. Plain text segments
// are returned as strings, matches as keyed <strong> elements.
function renderRichText(
  text: string,
  emphases?: string[],
): Array<string | VNode> {
  if (!emphases || emphases.length === 0) return [text];
  const escaped = emphases.map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, i) =>
    emphases.includes(part)
      ? <strong key={i} class="font-semibold text-on-surface">{part}</strong>
      : part
  );
}

export default PostBody;
