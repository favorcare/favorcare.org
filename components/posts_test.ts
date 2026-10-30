// Unit tests for the posts content module — the listing logic the /posts
// archive and article routes render from.
import { test } from "vitest";
import { deepStrictEqual, ok } from "node:assert/strict";
import { getPost, listPosts, POSTS } from "./posts.ts";

test("listPosts sorts newest first", () => {
  const dates = listPosts().map((p) => p.date);
  deepStrictEqual(dates, [...dates].sort((a, b) => b.localeCompare(a)));
});

test("getPost resolves known slugs and misses cleanly", () => {
  deepStrictEqual(getPost("five-arms-of-favor-care")?.date, "2026-10-08");
  deepStrictEqual(getPost("does-not-exist"), undefined);
});

test("every post carries the fields the archive and article render", () => {
  for (const post of POSTS) {
    deepStrictEqual(post.heroLines.length, 2);
    ok(post.title.length > 0, `missing title: ${post.slug}`);
    ok(post.description.length > 0, `missing description: ${post.slug}`);
    ok(post.tag.length > 0, `missing tag: ${post.slug}`);
    ok(post.hero.length > 0, `missing hero: ${post.slug}`);
    ok(post.blocks.length > 0, `missing blocks: ${post.slug}`);
  }
});
