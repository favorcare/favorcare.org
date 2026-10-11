# Elementor → Tailwind translation guide

How `_elementor_data` widget `settings` become Tailwind classes during page
cloning (Phase 5). Keeps every page conversion consistent. Source JSONs live in
`<migration-files>/extracted/pages/<id>-<slug>.json`.

## Canonical-variant policy

Elementor stores responsive overrides as sibling settings keys: `padding` is
desktop, `padding_tablet` / `padding_mobile` override at ≤1024px / ≤767px.
Translate **desktop = base classes**, then `md:` for tablet values, `lg:` not
needed (desktop is base), and `mobile overrides = base` when only a mobile value
exists. When the SAME widget is duplicated per breakpoint (hidden via
`_mobile_hidden` etc.), take the desktop variant only.

## Spacing / sizing

| Elementor setting                                      | Tailwind                              |
| ------------------------------------------------------ | ------------------------------------- |
| `padding {top,right,bbottom,left}` px, `isLinked:true` | `p-[Npx]`                             |
| unlinked paddings                                      | `pt-[Npx] pr-[Npx] pb-[Npx] pl-[Npx]` |
| `padding_tablet` / `_mobile`                           | `md:p-[Npx]` / `p-[Npx]` (base swap)  |
| `margin`, `gap`                                        | same pattern (`m-*`, `gap-[Npx]`)     |
| `custom_height {size,unit}`                            | `min-h-[Npx]` (or `h-` when fixed)    |
| `structure` "20"/"30" (columns)                        | `grid grid-cols-2` / `grid-cols-3`    |
| container `direction`                                  | `flex flex-row` / `flex-col`          |
| `content_position`                                     | `items-center` / `items-start`…       |
| `align`                                                | `justify-*` on the container          |
| inline image `width {size,unit:'%'}`                   | `w-[N%]`                              |

## Typography

Use the v2 display utilities first (`text-hero`, `text-section-title`,
`text-group-title`, `text-subtitle`, `text-hero-subtitle` — they carry the kit's
line-heights and letter-spacings). Only fall back to raw values when a widget
genuinely deviates:

| Elementor                                          | Tailwind                          |
| -------------------------------------------------- | --------------------------------- |
| `typography_font_size {px}`                        | `text-[Npx]`                      |
| `typography_font_weight`                           | `font-[300..700]` / `font-light`… |
| `typography_line_height`                           | `leading-[0.9]` / `leading-tight` |
| `typography_letter_spacing` (px, usually negative) | `tracking-[-2.3px]`               |
| `typography_text_transform`                        | `uppercase` / `none`              |
| `align` (text)                                     | `text-center` etc.                |

## Color

Kit colors map to v2 tokens — never hardcode hex:

| Elementor global           | Token utility                                          |
| -------------------------- | ------------------------------------------------------ |
| `primary` `#191718`        | `primary` / `bg-primary`                               |
| `secondary` `#E6DCD0`      | `secondary`                                            |
| `text` `#2D2D2D`           | `on-surface`                                           |
| `accent` `#C85553`         | `tertiary`                                             |
| custom Black/White         | `black` / `white`                                      |
| Link Yellow `#FFB428`      | `link-hover` / `yellow`                                |
| Light `#FBF9ED`            | `secondary-container`                                  |
| raw `background_color` hex | token if it matches, else `bg-[#hex]` + flag in the PR |

## Backgrounds / images / effects

- `background_background: "classic"` + `background_image {url}` →
  `bg-[url(...)]` via inline style (use `asset()` when the image is local; WP
  URLs stay absolute until Phase 2 rewrites them).
- `background_size: cover`, `position` → `bg-cover bg-center`.
- `sticky: "top"` → `sticky top-0` (+ `z-index` → `z-[N]`).
- Motion-fx / entrance animations: **ignore** — clone the settled state.
- Swiper carousels (slides/media-carousel/image-carousel): first slide static
  for the parity harness; real carousel island after parity passes.

## Widgets with special handling

- `heading` → section heading with the mapped type utility.
- `text-editor` (`settings.editor` HTML) → curated strings in `content.ts`; keep
  only real tags (p/strong/em/a/ul).
- `html` → copy the snippet into the page component; review each (24 total).
- `form` → form island (contact exists; cert-of-donation + prayer-hub to build).
- `google_maps` → iframe embed with the same coords/zoom.
- `icon-box` / `icon` (Font Awesome classes) → inline SVG equivalent
  (lucide/preact icons or the actual FA path).
- `wc-add-to-cart` / Woo widgets → not cloned (redirects; Phase 6).

## Definition of done per page

1. Structure mirrors the widget tree section-by-section (canonical variants).
2. Text parity: `deno task clone:diff` missing/extra counts ≈ 0 (or every
   remaining diff listed + explained in the PR).
3. Visual: side-by-side composites in `report.html` reviewed by a human.
4. `deno task check` green; axe pass on the final version.
