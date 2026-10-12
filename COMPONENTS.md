# COMPONENTS.md — the component catalog

The canonical list of every reusable component on the site, with its props and
where it's used. **Read this file before creating or updating any page** — the
whole point of the component system is that a visual change is a one-file edit,
and that only works if pages are built from these parts instead of hand-rolled
markup.

- Design tokens (colors, type, radii) live in [DESIGN.md](DESIGN.md) and
  `assets/styles.css` — don't hardcode hex or px scales in components.
- The living, rendered version of this catalog is **`/storybook`** — every
  component below has a specimen there, rendered with real content.
- Copy and page data live in `components/content.ts` (and `components/posts.ts`
  for articles) — components take data via props.

## Rules for building pages

1. **Reuse before you build.** Scan the list below; if a pattern exists, use it.
   New UI that duplicates a component's job is a bug.
2. **No inline SVGs.** All icons come from `components/icons.tsx` — that is the
   only file allowed to import `lucide-preact` / `simple-icons`.
3. **No hand-rolled pill links.** CTAs use `Button`. The only sanctioned
   exceptions (each documented in its own file): the ContactForm SEND dialects
   and the posts ad-break pill, both WP-measured one-offs.
4. **No bespoke hero shells or section headings.** `PageHero` and
   `SectionHeading` carry them; per-page title scales stay in the route.
5. **Editing once:** to change how all pills/heads/heroes look, edit the
   component — never sweep the routes.

### Adding a new component (checklist)

1. Build it in `components/` (server) or `islands/` (hydrated), props over
   hardcoded content.
2. Adopt it everywhere the pattern occurs — don't leave inline copies.
3. Add a specimen to `routes/storybook.tsx` with real content.
4. Add it to the table below.
5. `deno task check` + dev-server eyeball of every affected route.

## Components

### Layout

| Component               | File                                   | Props                                                                                                                                                                                                                                      | Used by            |
| ----------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `Container` / `frame()` | `components/layout/Container.tsx`      | `pad?: "page" \| "home"`, `class` — the 1140px frame; `frame(pad)` returns the class string for section-level frames                                                                                                                       | all routes         |
| `SectionHeading`        | `components/layout/SectionHeading.tsx` | `title`, `tone?` (primary/white/black), `weight?` (bold/semibold), `align?` (left/center/left-center-md — omit to inherit), `size?` (section 28/39/56 · card 25/30/36 · jumbo 76 · 56 · 32), `leading?` (none/tight), `tracking?`, `class` | all content routes |
| `Eyebrow`               | `components/Eyebrow.tsx`               | `class` — the gold 12/14px uppercase label                                                                                                                                                                                                 | homepage           |

### Page structure

| Component                    | File                        | Props                                                                                                                                                                                                                                                      | Used by                                                            |
| ---------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `PageHero`                   | `components/PageHero.tsx`   | `image`, `imageClass?` (bg-position), `overlay?` (gradient/flat/none), `overlayClass?` (gradient opacity), `geometry?` (standard/bare), `framed?`, `sectionClass?`, `frameClass?`, `children` — the photo-hero shell; h1/subtitle scales stay in the route | who-we-are, what-we-do, get-involved, givenow, posts, posts/[slug] |
| `CtaBand`                    | `components/CtaBand.tsx`    | `title`, `body`, `cta: Cta`, `class` — black closing band with yellow pill                                                                                                                                                                                 | homepage                                                           |
| `BankCard`                   | `components/BankCard.tsx`   | `title`, `children`, `tone?` (light/dark), `gap?` (2/4), `display?` (flex/md-only/mobile-only), `class` — give-now detail cards                                                                                                                            | givenow                                                            |
| `Faq`                        | `components/Faq.tsx`        | `items: FaqItem[]`, `class` — bordered-rows accordion, native `<details>`                                                                                                                                                                                  | contact                                                            |
| `MapEmbed` + `mapEmbedSrc()` | `components/MapEmbed.tsx`   | `src`, `title`, `class` — maps iframe + no-API-key URL builder                                                                                                                                                                                             | homepage, contact                                                  |
| `VideoEmbed`                 | `components/VideoEmbed.tsx` | `id`, `title`, `class` — lazy YouTube iframe                                                                                                                                                                                                               | homepage                                                           |

### Actions

| Component | File                    | Props                                                                                                                                                                                                                                      | Used by                                                                                                     |
| --------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `Button`  | `components/Button.tsx` | `variant?` (yellow/black/white/outline-white/outline-black), `size?` (sm 14px · md 15px+py-4 · lg px-8/22px · xl px-10/22px · header), `shape?` (pill/rounded-30/rounded-50), `href?` (renders `<a>`), `target/rel/type/tabIndex`, `class` | Header DONATE, homepage CTAs, what-we-do cards, get-involved cards, who-we-are CTA, givenow CTAs, MobileNav |

### Icons — `components/icons.tsx`

The single seam for every glyph. Stroke UI icons from **lucide** (`CloseIcon`,
`MenuIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `PlusIcon`, `MailIcon` —
sizes in px, stroke semantics preserved) and filled brand glyphs from
**simple-icons** (`BrandIcon` with `name="facebook" | "instagram" | "youtube"`).
Nothing else imports an icon package.

### Content data

| Module          | File                       | Holds                                                                                                                                                                                                |
| --------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content.ts`    | `components/content.ts`    | all page copy: `HOME`, `CAROUSEL`, `ABOUT`, `WHAT_WE_DO`, `CONTACT`, `GIVENOW`, `POPUPS`, `GET_INVOLVED`, `PRIVACY`, `SOCIAL_LINKS` + shared types (`Cta`, `FaqItem`, `CarouselSlide`, `SocialLink`) |
| `posts.ts`      | `components/posts.ts`      | the `POSTS` archive + `getPost`/`listPosts`                                                                                                                                                          |
| `navigation.ts` | `components/navigation.ts` | `NAV` + `UTILITY_LINKS`                                                                                                                                                                              |
| `PostCard`      | `components/PostCard.tsx`  | the posts-archive card (`post: Post`)                                                                                                                                                                |

### Chrome

| Component | File                    | Notes                                                                                     |
| --------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| `Header`  | `components/Header.tsx` | yellow bar: logo, `Navbar`, DONATE pill, `MobileNav`                                      |
| `Footer`  | `components/Footer.tsx` | black column: logo, `SOCIAL_LINKS` icon row, blurb, accreditation `Popup`, dynamic © year |
| `Navbar`  | `components/Navbar.tsx` | desktop nav (hidden below md)                                                             |

### Forms

| Component       | File                           | Props                                                  | Notes                       |
| --------------- | ------------------------------ | ------------------------------------------------------ | --------------------------- |
| `InputField`    | `components/InputField.tsx`    | `type/name/value/placeholder/required/ariaLabel/class` | 48px input, gold focus ring |
| `TextareaField` | `components/TextareaField.tsx` | `name/placeholder/required/ariaLabel/rows/class`       | multiline sibling           |

### Islands (hydrated)

| Island        | File                      | What it does                                                                                                          |
| ------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `MobileNav`   | `islands/MobileNav.tsx`   | burger dropdown under the header (uses `Button`)                                                                      |
| `Popup`       | `islands/Popup.tsx`       | native `<dialog>` modal for the WP Elementor popups (accreditation, Prayer Hub)                                       |
| `Carousel`    | `islands/Carousel.tsx`    | homepage program media carousel (arrows/dots over scroll-snap)                                                        |
| `Slideshow`   | `islands/Slideshow.tsx`   | what-we-do program photo slideshow                                                                                    |
| `ContactForm` | `islands/ContactForm.tsx` | mailto-composing form, `page="home" \| "contact"` variants — its two SEND buttons are documented WP-measured one-offs |

## Known gaps (deliberate follow-ups)

- **Forms consolidation** — four form systems coexist (ContactForm ×2, contact
  newsletter block, givenow tax form). All mailto-based until the
  PayMongo/backend phases.
- **Gallery / team-grid** — single-page patterns (who-we-are 2×2 grid, posts
  article galleries) remain route-local; extract if a second consumer appears.
