---
name: new-page
description: Create a new route/page following the Fresh 2 patterns — real IA
  content, layout components, Head, and the component obligations. Use when
  adding any page under routes/.
---

# New page

## 1. Get the content from the IA, not from your head

`ideas/proposed.svg` holds the page tree, the template (TEMPLATE A =
homepage), and the real copy sources: impact numbers, programs, people.
Real numbers live in `components/content.ts` and `components/posts.ts`;
voice rules are in `BRAND.md`. Never invent stats, quotes, or people.

## 2. Create the route

File-system routing: `routes/<slug>/index.tsx` (or `routes/<slug>.tsx`),
built on the shared layout:

```tsx
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";

export default define.page(function Slug() {
  return (
    <>
      <Head>
        <title>Slug — Favor Care</title>
      </Head>
      <Header />
      <main>{/* page content */}</main>
      <Footer />
    </>
  );
});
```

- Compose from the catalog first (`COMPONENTS.md`). If UI is missing, follow
  the `new-component` flow — component + `/storybook` specimen + catalog
  entry in the same change.
- Nav and footer links go through `components/navigation.ts`. Unbuilt
  destinations stay `"#"` placeholders — never invented URLs.

## 3. Verify

`deno task check`; `deno task dev` → open the new route and check the
title/meta, rendering, and console. For WP-visual-parity pages, also run
`deno task clone:diff`.
