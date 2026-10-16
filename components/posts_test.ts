// Unit tests for the posts content module — the listing logic the /posts
// archive and article routes render from.
import { assert, assertEquals } from "@std/assert";
import { getPost, listPosts, POSTS } from "./posts.ts";

Deno.test("listPosts sorts newest first", () => {
  const dates = listPosts().map((p) => p.date);
  assertEquals(dates, [...dates].sort((a, b) => b.localeCompare(a)));
});

Deno.test("getPost resolves known slugs and misses cleanly", () => {
  assertEquals(getPost("five-arms-of-favor-care")?.date, "2026-10-08");
  assertEquals(getPost("does-not-exist"), undefined);
});

Deno.test("every post carries the fields the archive and article render", () => {
  for (const post of POSTS) {
    assertEquals(post.heroLines.length, 2);
    assert(post.title.length > 0, `missing title: ${post.slug}`);
    assert(post.description.length > 0, `missing description: ${post.slug}`);
    assert(post.tag.length > 0, `missing tag: ${post.slug}`);
    assert(post.hero.length > 0, `missing hero: ${post.slug}`);
    assert(post.blocks.length > 0, `missing blocks: ${post.slug}`);
  }
});
