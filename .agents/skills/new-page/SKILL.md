---
name: new-page
description:
  Create a new route/page following the App Router patterns — real IA content,
  layout components, metadata, and the component obligations. Use when adding
  any page under app/.
---

# New page

## 1. Get the content from the IA, not from your head

`ideas/proposed.svg` holds the page tree, the template (TEMPLATE A = homepage),
and the real copy sources: impact numbers, programs, people. Real numbers live
in `components/content.ts` and `components/posts.ts`; voice rules are in
`BRAND.md`. Never invent stats, quotes, or people.

## 2. Create the route

File-system routing: `app/(site)/<slug>/page.tsx` (campaign pages live under
`app/coffeeforacause/`), built on the shared layout (the `(site)` group layout
adds the accreditation popup). Page files export only `default`, `metadata` (or
`generateMetadata`), and `generateStaticParams`:

```tsx
import type { Metadata } from "next";
import { Header } from "../../../components/Header.tsx";
import { Footer } from "../../../components/Footer.tsx";

export const metadata: Metadata = {
  title: "Slug — Favor Care",
  description: "…",
};

export default function SlugPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* page content */}
      </main>
      <Footer />
    </>
  );
}
```

- Compose from the catalog first (`COMPONENTS.md`). If UI is missing, follow the
  `new-component` flow — component + `/storybook` specimen + catalog entry in
  the same change.
- Nav and footer links go through `components/navigation.ts`. Unbuilt
  destinations stay `"#"` placeholders — never invented URLs.

## 3. Verify

`pnpm check` and `pnpm test`; `pnpm dev` → open the new route and check the
title/meta, rendering, and console. For WP-visual-parity pages, also run
`pnpm clone:diff`.
