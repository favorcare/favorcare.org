// Coffee for a Cause (CFAC) — the fundraising campaign's content module.
//
// Everything user-facing on /coffeeforacause lives here, the same way
// content.ts carries the site's copy: components take data via props, and
// copy edits never touch markup.
//
// SOURCES — the team's published campaign material in Favor Care's
// TeamBrain workspace (`79fee960-a3a4-424d-994a-bdbf39becd85`):
//   • "Social Campaign Brief" (tagline, big idea, proposition & promise,
//     the five programs, ₱2M goal, Dec 6 hero film)
//   • the "Where your cup goes" carousel task page (slide copy, CTAs,
//     program one-liners, brand art)
// Phrases below are lifted or lightly compressed from those documents —
// per BRAND.md, nothing is invented. Every remaining "TBD — …" string is a
// placeholder the team must replace before launch; grep for "TBD".
//
// The palette values mirrored here live in the `.cfac` scope block of
// assets/styles.css (see DESIGN.md, "Sub-brand themes") — sampled from the
// campaign deck's art; cfac_test.ts holds the AA-contrast gate.

export interface CfacCta {
  label: string;
  href: string;
}

/** The campaign: name, chrome copy, and the donate seam. */
export const CFAC = {
  name: "Coffee for a Cause",
  /** The eyebrow over the hero — provenance line. */
  provenance: "A fundraising campaign of Favor Care",
  /** The campaign tagline (brief §01). */
  tagline: "Every cup carries hope.",
  /** The movement's rallying phrase (brief §01). */
  rally: "Sip with purpose.",
  hero: {
    title: "Coffee for a Cause",
    lead: "Every cup carries hope — turn a daily habit into daily impact.",
    cta: { label: "GIVE TODAY", href: "#" } satisfies CfacCta,
  },
  story: {
    eyebrow: "THE IDEA",
    title: "Small cup. Big change.",
    beats: [
      {
        label: "THE REALITY",
        body:
          "Most giving asks you to add something new to your life — a donation, a pledge, a sacrifice. Coffee for a Cause asks for nothing new at all. It takes the cup you were already going to drink and lets it carry hope to someone who has none.",
      },
      {
        label: "THE HOPE",
        body:
          "Generosity stops being an occasion and becomes a habit. By pouring meaning into the most ordinary, daily ritual there is, your ordinary cup becomes someone’s extraordinary tomorrow.",
      },
    ],
  },
  impact: {
    eyebrow: "WHAT YOUR CUP FUNDS",
    title: "The five programs in motion",
    subtitle:
      "One number the whole campaign moves: ₱2M raised. Here is the proof — programs happening, not promises made.",
    goal: "₱2M",
    cards: [
      {
        title: "Disaster Relief",
        body: "Help bring relief to families affected by disasters.",
      },
      {
        title: "Education",
        body: "Help support students at Redeemer Christian School.",
      },
      {
        title: "Societal Reintegration",
        body: "Help women at the Correctional Institution for Women.",
      },
      {
        title: "Community Development",
        body: "A little shot. A big opportunity.",
      },
      {
        title: "Training & Partnership Resourcing",
        body: "Better blends. Brighter futures.",
      },
    ],
  },
  faq: {
    eyebrow: "GOOD TO KNOW",
    title: "Questions, answered",
    items: [
      {
        q: "When and where is Coffee for a Cause?",
        a: "TBD — date, time, and venue from the team. The campaign’s hero film launches December 6.",
      },
      {
        q: "Where does my donation go?",
        a: "To the five Favor Care programs in motion — disaster relief, education, societal reintegration, community development, and training & partnership resourcing — with everything accounted for openly.",
      },
      {
        q: "Is my donation tax-deductible?",
        a: "TBD — confirm with the team before reusing the site-wide tax wording.",
      },
      {
        q: "Can I give without attending?",
        a: "Yes — the Give Today button takes you straight to the campaign’s secure giving page.",
      },
    ],
  },
  closing: {
    title: "What you spend in a moment can matter for a lifetime.",
    body: "Skip the sip. Refill hope — give a cup’s worth today.",
    cta: { label: "GIVE TODAY", href: "#" } satisfies CfacCta,
  },
  thanks: {
    title: "Thank you for pouring hope.",
    body:
      "TBD — one warm sentence confirming the gift and what it sets in motion.",
    next: [
      "TBD — what happens next, step 1 (e.g. receipt/email confirmation).",
      "TBD — when and how the donor sees impact (story, photo, report).",
    ],
  },
  footer: {
    blurb:
      "Coffee for a Cause is a fundraising campaign of Favor Care, the community arm of Favor Church. Every cup carries hope.",
  },
  // The external payment link (PayMongo or similar) the DONATE buttons open;
  // the provider redirects back to /coffeeforacause/thanks. "#" is the
  // repo's placeholder convention until the team pastes the real URL —
  // never invent one.
  donate: { label: "GIVE TODAY", href: "#" } satisfies CfacCta,
};

/** Analytics event names fired from CFAC pages (see DEVELOPMENT.md, Events). */
export const CFAC_EVENTS = {
  /** Every CFAC donate click — always carries `fund: "cfac"`. */
  donate: "donate_click",
  /** Fired once on the /coffeeforacause/thanks mount (post-donation landing). */
  success: "cfac_donate_success",
} as const;

/** Standard track props for CFAC donate clicks. */
export function cfacDonateProps(location: string): Record<string, string> {
  return { fund: "cfac", location };
}

/**
 * The CFAC palette as rendered — one entry per token the `.cfac` scope
 * overrides (assets/styles.css). Hexes are sampled from the campaign deck's
 * art (see the scope block comment); the storybook's CFAC group renders
 * these swatches inside the live scope, and cfac_test.ts gates the
 * contrast pairs.
 */
export const CFAC_COLORS: { name: string; token: string; hex: string }[] = [
  { name: "Deep forest (bands, pill text)", token: "black", hex: "#0e1f15" },
  { name: "Forest green (primary)", token: "primary", hex: "#14291b" },
  { name: "Marigold (accent)", token: "yellow", hex: "#f7a708" },
  { name: "Warm cream (surface)", token: "surface", hex: "#fbf4e4" },
  { name: "Cream ramp", token: "surface-container", hex: "#f1e5c6" },
  { name: "Green ink (on-surface)", token: "on-surface", hex: "#1c2a20" },
  { name: "Forest link", token: "link", hex: "#2f6b44" },
];

/** Text/background pairs the CFAC theme must keep at AA (4.5:1) or better. */
export const CFAC_CONTRAST_PAIRS: {
  label: string;
  fg: string;
  bg: string;
}[] = [
  { label: "body copy on the page", fg: "#1c2a20", bg: "#fbf4e4" },
  { label: "headings on the page", fg: "#14291b", bg: "#fbf4e4" },
  { label: "button label on forest green", fg: "#fcf8ec", bg: "#14291b" },
  { label: "pill label on marigold", fg: "#0e1f15", bg: "#f7a708" },
  { label: "links on the page", fg: "#2f6b44", bg: "#fbf4e4" },
  { label: "secondary copy on the page", fg: "#5a6b5e", bg: "#fbf4e4" },
  { label: "band copy on deep forest", fg: "#ffffff", bg: "#0e1f15" },
  { label: "eyebrow on forest green", fg: "#f7a708", bg: "#14291b" },
];
