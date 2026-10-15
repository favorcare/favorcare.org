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
   exceptions (each documented in its own file): the ContactForm SEND dialects,
   the posts ad-break pill, and the give-now tax-card submit (transparent
   WP-measured pill with `hover:opacity-80` — Button's variants all paint a
   color and hover at 90), all WP-measured one-offs.
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

| Component                    | File                        | Props                                                                                                                                                                                                                                                                                                                   | Used by                                                                      |
| ---------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PageHero`                   | `components/PageHero.tsx`   | `image`, `imageClass?` (bg-position), `overlay?` (gradient/flat/none), `overlayClass?` (gradient opacity), `geometry?` (standard/bare), `framePad?` (page/home — the homepage hero measures `home`), `framed?`, `sectionClass?`, `frameClass?`, `children` — the photo-hero shell; h1/subtitle scales stay in the route | homepage, who-we-are, what-we-do, get-involved, givenow, posts, posts/[slug] |
| `CtaBand`                    | `components/CtaBand.tsx`    | `title`, `body`, `cta: Cta`, `class` — black closing band with yellow pill                                                                                                                                                                                                                                              | homepage                                                                     |
| `BankCard`                   | `components/BankCard.tsx`   | `title`, `children`, `tone?` (light/dark), `gap?` (2/4), `display?` (flex/md-only/mobile-only), `class` — give-now detail cards                                                                                                                                                                                         | givenow                                                                      |
| `Faq`                        | `components/Faq.tsx`        | `items: FaqItem[]`, `class` — bordered-rows accordion, native `<details>`                                                                                                                                                                                                                                               | contact                                                                      |
| `MapEmbed` + `mapEmbedSrc()` | `components/MapEmbed.tsx`   | `src`, `title`, `class` — maps iframe + no-API-key URL builder                                                                                                                                                                                                                                                          | homepage, contact                                                            |
| `VideoEmbed`                 | `components/VideoEmbed.tsx` | `id`, `title`, `class` — lazy YouTube iframe                                                                                                                                                                                                                                                                            | homepage                                                                     |

### Actions

| Component | File                    | Props                                                                                                                                                                                                                                                                                                                                                                                                    | Used by                                                                                                                    |
| --------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Button`  | `components/Button.tsx` | `variant?` (yellow/black/white/outline-white/outline-black), `size?` (sm 14px · md 15px+py-4 · lg px-8/22px · xl px-10/22px · header), `shape?` (pill/rounded-30/rounded-50), `href?` (renders `<a>`), `target/rel/type/tabIndex/disabled?`, `class`. Also exports `buttonClasses()` — the class string for non-Button controls that must match the pill system (e.g. `Popup`'s trigger on get-involved) | Header DONATE, homepage CTAs, what-we-do cards, get-involved cards, who-we-are CTA, givenow CTAs, MobileNav, signup submit |

### Icons — `components/icons.tsx`

The single seam for every glyph. Stroke UI icons from **lucide** (`CloseIcon`,
`MenuIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `PlusIcon`, `MailIcon` —
sizes in px, stroke semantics preserved) and filled brand glyphs from
**simple-icons** (`BrandIcon` with `name="facebook" | "instagram" | "youtube"`).
Nothing else imports an icon package.

### Content data

| Module          | File                       | Holds                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `content.ts`    | `components/content.ts`    | all page copy: `HOME`, `CAROUSEL`, `ABOUT`, `WHAT_WE_DO`, `CONTACT`, `GIVENOW`, `POPUPS` (prayer-hub, volunteer disclaimer + guidelines, accreditation — live WP ids in the source comment), `GET_INVOLVED`, `SIGNUP` (the /signup volunteer application: page copy, form options, privacy notice, and the Google formResponse entry-id map), `PRIVACY`, `SOCIAL_LINKS` + shared types (`Cta`, `PopupCta`, `PopupBlock`, `FaqItem`, `CarouselSlide`, `SocialLink`) |
| `posts.ts`      | `components/posts.ts`      | the `POSTS` archive + `getPost`/`listPosts`                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `navigation.ts` | `components/navigation.ts` | `NAV` + `UTILITY_LINKS`                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `PostCard`      | `components/PostCard.tsx`  | the posts-archive card (`post: Post`)                                                                                                                                                                                                                                                                                                                                                                                                                              |

### Chrome

| Component | File                    | Notes                                                                                     |
| --------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| `Header`  | `components/Header.tsx` | yellow bar: logo, `Navbar`, DONATE pill, `MobileNav`                                      |
| `Footer`  | `components/Footer.tsx` | black column: logo, `SOCIAL_LINKS` icon row, blurb, accreditation `Popup`, dynamic © year |
| `Navbar`  | `components/Navbar.tsx` | desktop nav (hidden below md)                                                             |

### Forms

| Component             | File                                 | Props                                                                                                                                                                                                                                                                                                                                                  | Notes                                                                                                                                         |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `InputField`          | `components/InputField.tsx`          | `type/name/value/placeholder/required/ariaLabel/size?/class`                                                                                                                                                                                                                                                                                           | gold focus ring; `size="md"` (default) is the 48px bordered input, `size="give-now"` the 59px borderless white input measured on the tax card |
| `TextareaField`       | `components/TextareaField.tsx`       | `name/placeholder/required/ariaLabel/rows/class`                                                                                                                                                                                                                                                                                                       | multiline sibling                                                                                                                             |
| `ChoiceGroup`         | `components/ChoiceGroup.tsx`         | `legend/name/options`, `mode?` (radio/checkbox), `required?` (radios only — native HTML can't express "at least one checkbox"; checkbox groups validate server-side), `other?` (`{name, value?}` — trailing "Other" option with a free-text input, Google's `other_option_response` pattern), `selected?`, `columns?` (sm+ multi-column grid), `class` | 48px touch rows, accent-primary controls; the signup form family                                                                              |
| `VolunteerSignupForm` | `components/VolunteerSignupForm.tsx` | `values?/serveAreas?` (re-render after a failed POST), `error?`, `demo?` (storybook: disables submit), `class` — the 14-question `/signup` application; server-rendered, POSTs to its route whose handler forwards to the volunteers' Google Form (`SIGNUP.entries` holds the entry-id map)                                                            | signup                                                                                                                                        |

### Islands (hydrated)

| Island        | File                      | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MobileNav`   | `islands/MobileNav.tsx`   | burger dropdown under the header (uses `Button`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `Popup`       | `islands/Popup.tsx`       | native `<dialog>` modal for the WP Elementor popups, four shapes: click `trigger` (footer accreditation, get-involved SERVE — styled via `buttonClasses()`), `auto` (opens after a delay — with a `sessionKey` once per session, as the site-wide accreditation popup in `routes/_app.tsx`; without one on every visit, as the /signup gate), `chain` (nested dialog — volunteer disclaimer → full guidelines; content as JSON `blocks`), and body `blocks`/`cta.closesPopup` (the /signup commitment gate renders the guidelines doc and closes without navigating) |
| `Carousel`    | `islands/Carousel.tsx`    | homepage program media carousel (arrows/dots over scroll-snap)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Slideshow`   | `islands/Slideshow.tsx`   | what-we-do program photo slideshow                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `ContactForm` | `islands/ContactForm.tsx` | mailto-composing form, `page="home" \| "contact"` variants — its two SEND buttons are documented WP-measured one-offs                                                                                                                                                                                                                                                                                                                                                                                                                                                |

## Known gaps (deliberate follow-ups)

- **Forms consolidation** — four form systems coexist (ContactForm ×2, contact
  newsletter block, givenow tax form). All mailto-based until the
  PayMongo/backend phases. The volunteer signup (`routes/signup.tsx`) is the
  exception: it is the first server-handled form, forwarding to the volunteers'
  Google Form so responses stay in their existing Google Sheet — when a real
  form backend lands, it should absorb that hop too.
- **Gallery / team-grid** — single-page patterns (who-we-are 2×2 grid, posts
  article galleries) remain route-local; extract if a second consumer appears.
