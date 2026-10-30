// Design-token data for the /storybook brand reference. The values mirror
// the `@theme` block in app/globals.css (itself transcribed from
// DESIGN.md); tokens_test.ts fails if the two drift. Every `cls` is a
// literal class string so Tailwind's source scan generates it.

/** One color token: its `@theme` name, swatch class, and hex value. */
export interface ColorToken {
  name: string;
  cls: string;
  hex: string;
}

/** A role-grouped run of color tokens, as DESIGN.md's Colors section reads. */
export interface ColorGroup {
  title: string;
  tokens: ColorToken[];
}

/** Every `--color-*` token in `@theme`, grouped by role. */
export const COLOR_GROUPS: ColorGroup[] = [
  {
    title: "Primary — near-black (bars, bands, footer, solid CTAs)",
    tokens: [
      { name: "primary", cls: "bg-primary", hex: "#191718" },
      { name: "on-primary", cls: "bg-on-primary", hex: "#ffffff" },
      {
        name: "primary-container",
        cls: "bg-primary-container",
        hex: "#2d2d2d",
      },
      {
        name: "on-primary-container",
        cls: "bg-on-primary-container",
        hex: "#e6dcd0",
      },
      { name: "primary-hover", cls: "bg-primary-hover", hex: "#000000" },
      { name: "primary-active", cls: "bg-primary-active", hex: "#2d2d2d" },
    ],
  },
  {
    title: "Yellow & links — the brand's most visible color",
    tokens: [
      { name: "yellow", cls: "bg-yellow", hex: "#ffb428" },
      { name: "article-yellow", cls: "bg-article-yellow", hex: "#f2b705" },
      { name: "link", cls: "bg-link", hex: "#c8221f" },
      { name: "link-hover", cls: "bg-link-hover", hex: "#ffb428" },
    ],
  },
  {
    title: "Secondary & tertiary — beige and terracotta accents",
    tokens: [
      { name: "secondary", cls: "bg-secondary", hex: "#e6dcd0" },
      { name: "on-secondary", cls: "bg-on-secondary", hex: "#191718" },
      {
        name: "secondary-container",
        cls: "bg-secondary-container",
        hex: "#fbf9ed",
      },
      {
        name: "on-secondary-container",
        cls: "bg-on-secondary-container",
        hex: "#2d2d2d",
      },
      { name: "tertiary", cls: "bg-tertiary", hex: "#c85553" },
      { name: "on-tertiary", cls: "bg-on-tertiary", hex: "#ffffff" },
      {
        name: "tertiary-container",
        cls: "bg-tertiary-container",
        hex: "#f1dedd",
      },
      {
        name: "on-tertiary-container",
        cls: "bg-on-tertiary-container",
        hex: "#6b2c2a",
      },
    ],
  },
  {
    title: "Surfaces — white pages and the cream ramp",
    tokens: [
      { name: "surface", cls: "bg-surface", hex: "#ffffff" },
      { name: "surface-dim", cls: "bg-surface-dim", hex: "#fbf9ed" },
      { name: "surface-bright", cls: "bg-surface-bright", hex: "#ffffff" },
      {
        name: "surface-container-lowest",
        cls: "bg-surface-container-lowest",
        hex: "#faf7ee",
      },
      {
        name: "surface-container-low",
        cls: "bg-surface-container-low",
        hex: "#f5f1e6",
      },
      {
        name: "surface-container",
        cls: "bg-surface-container",
        hex: "#efe9db",
      },
      {
        name: "surface-container-high",
        cls: "bg-surface-container-high",
        hex: "#e6dcd0",
      },
      {
        name: "surface-container-highest",
        cls: "bg-surface-container-highest",
        hex: "#dcd2bf",
      },
      { name: "background", cls: "bg-background", hex: "#ffffff" },
      { name: "light", cls: "bg-light", hex: "#fbf9ed" },
    ],
  },
  {
    title: "Text & outlines",
    tokens: [
      { name: "on-surface", cls: "bg-on-surface", hex: "#2d2d2d" },
      {
        name: "on-surface-variant",
        cls: "bg-on-surface-variant",
        hex: "#55524c",
      },
      { name: "on-background", cls: "bg-on-background", hex: "#2d2d2d" },
      { name: "outline", cls: "bg-outline", hex: "#6b675f" },
      { name: "outline-variant", cls: "bg-outline-variant", hex: "#c9c2b4" },
    ],
  },
  {
    title: "Error",
    tokens: [
      { name: "error", cls: "bg-error", hex: "#cf2e2e" },
      { name: "on-error", cls: "bg-on-error", hex: "#ffffff" },
      { name: "error-container", cls: "bg-error-container", hex: "#f9dedc" },
      {
        name: "on-error-container",
        cls: "bg-on-error-container",
        hex: "#410e0b",
      },
    ],
  },
  {
    title: "WP-measured one-offs (posts system, accreditation popup)",
    tokens: [
      { name: "archive-ink", cls: "bg-archive-ink", hex: "#0c0d0e" },
      { name: "archive-muted", cls: "bg-archive-muted", hex: "#69727d" },
      { name: "adbreak", cls: "bg-adbreak", hex: "#f5f5f5" },
      { name: "popup", cls: "bg-popup", hex: "#f3f3f3" },
      {
        name: "popup-cta-border",
        cls: "bg-popup-cta-border",
        hex: "#9aa8ba",
      },
    ],
  },
];

/** The radius tokens the clone actually uses (sm..xl are all 0). */
export const RADII = [
  { name: "rounded-card", cls: "rounded-card", value: "30px" },
  { name: "rounded-jumbo", cls: "rounded-jumbo", value: "50px" },
  { name: "rounded-full", cls: "rounded-full", value: "9999px" },
] as const;

/** A foreground/background pairing shown in the contrast specimen. */
export interface ContrastPair {
  label: string;
  /** Literal text + background classes for the live sample. */
  cls: string;
  fg: string;
  bg: string;
  /** Measured at a normal body size (the 4.5:1 AA bar), not large text. */
  intent: "do" | "dont";
}

/** The pairings DESIGN.md's Do's and Don'ts are about, with real hex. */
export const CONTRAST_PAIRS: ContrastPair[] = [
  {
    label: "on-surface on surface — body copy",
    cls: "bg-surface text-on-surface",
    fg: "#2d2d2d",
    bg: "#ffffff",
    intent: "do",
  },
  {
    label: "primary on white — headings",
    cls: "bg-white text-primary",
    fg: "#191718",
    bg: "#ffffff",
    intent: "do",
  },
  {
    label: "black on yellow — yellow pills and cards",
    cls: "bg-yellow text-black",
    fg: "#000000",
    bg: "#ffb428",
    intent: "do",
  },
  {
    label: "white on primary — black bands",
    cls: "bg-primary text-white",
    fg: "#ffffff",
    bg: "#191718",
    intent: "do",
  },
  {
    label: "light on black — give-now dark cards",
    cls: "bg-black text-light",
    fg: "#fbf9ed",
    bg: "#000000",
    intent: "do",
  },
  {
    label: "link on surface — inline links",
    cls: "bg-surface text-link",
    fg: "#c8221f",
    bg: "#ffffff",
    intent: "do",
  },
  {
    label: "yellow on white — never body text",
    cls: "bg-white text-yellow",
    fg: "#ffb428",
    bg: "#ffffff",
    intent: "dont",
  },
  {
    label: "white on yellow — never on a pill",
    cls: "bg-yellow text-white",
    fg: "#ffffff",
    bg: "#ffb428",
    intent: "dont",
  },
];

/** WCAG 2.x relative luminance of a `#rrggbb` color. */
export function relativeLuminance(hex: string): number {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) throw new Error(`expected #rrggbb, got ${hex}`);
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(m[1].slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two `#rrggbb` colors (1–21). */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x,
  );
  return (hi + 0.05) / (lo + 0.05);
}
