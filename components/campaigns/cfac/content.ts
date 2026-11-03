// Coffee for a Cause (CFAC) — the fundraising campaign's content module.
//
// Everything user-facing on /coffeeforacause lives here, the same way
// content.ts carries the site's copy: the campaign components take data via
// props, and copy edits never touch markup.
//
// SOURCE — the campaign team's design, favorcare/cfac-landing-page
// (src-templates/landing-page.html + thanks-page.html and the section data
// in src/components/sections/*.js; live on the WP staging site at
// /coffeeforacause). Strings are lifted verbatim from the rendered
// templates — per BRAND.md, nothing here is invented.
//
// The palette mirrored in CFAC_COLORS lives in app/coffeeforacause/theme.css
// (see DESIGN.md, "Sub-brand themes"); content_test.ts holds the AA gate.

import { asset } from "../../../utils/assets.ts";
import { NAV, type NavLink } from "../../navigation.ts";

/** A labelled link — every CFAC button and nav entry. */
export interface CfacCta {
  label: string;
  href: string;
}

/** One run of a headline; `accent` runs render in campaign gold. */
export interface CfacTitleRun {
  text: string;
  accent?: boolean;
}

/** A paragraph that may be set in the emphasized (semibold ink) weight. */
export interface CfacParagraph {
  text: string;
  strong?: boolean;
}

/** A photo with its alt text (alt "" = decorative). */
export interface CfacPhoto {
  src: string;
  alt: string;
}

/** Rich FAQ answer blocks: plain or lead-in paragraphs, and bullet lists. */
export type CfacAnswerBlock =
  { p: string; strong?: boolean } | { list: string[] };

/** One accordion row in the donate section. */
export interface CfacFaqItem {
  q: string;
  a: CfacAnswerBlock[];
}

/** A community story: title, copy, and its photo strip. */
export interface CfacStory {
  title: string;
  paragraphs: string[];
  photos: CfacPhoto[];
}

/** An alternating image/text row in the "pillars" section. */
export interface CfacPillar {
  title: string;
  paragraphs: string[];
  image: CfacPhoto;
  /** Which side the photo sits on at lg+ (stacks below on mobile). */
  imageSide: "left" | "right";
}

/** Icon keys for the How It Works steps (mapped in icons.tsx). */
export type CfacStepIcon = "see" | "feel" | "act";

/** One How It Works card. */
export interface CfacStep {
  icon: CfacStepIcon;
  title: string;
  body: string;
}

const photo = (name: string) =>
  asset(`/images/campaigns/cfac/photos/${name}.jpg`);

/** Photo strip helper: alt text names the community + frame number. */
const strip = (community: string, names: string[]): CfacPhoto[] =>
  names.map((n, i) => ({
    src: photo(n),
    alt: `${community} — photo ${i + 1} of ${names.length}`,
  }));

/** The campaign: chrome, every section's copy, and the donate seam. */
export const CFAC = {
  name: "Coffee for a Cause",
  path: "/coffeeforacause",
  /** Co-branded lockup: Favor Care × CFAC, dark (on gold) and white
   *  (on photo/dark) variants. */
  logos: {
    favorCare: {
      black: asset("/logo-black.svg"),
      white: asset("/logo-white.svg"),
    },
    cfac: {
      black: asset("/images/campaigns/cfac/logos/cfac-logo-black.svg"),
      white: asset("/images/campaigns/cfac/logos/cfac-logo-white.svg"),
    },
  },
  /** The sample's five site links (the site NAV minus News & Updates). */
  nav: NAV.slice(0, 5) satisfies NavLink[],
  /** Header DONATE pill — jumps to the on-page donate form. */
  donate: { label: "DONATE", href: "#donate" } satisfies CfacCta,

  hero: {
    image: photo("jpm-01"),
    title: [
      { text: "Turn Small Acts of " },
      { text: "Giving", accent: true },
      { text: " Into " },
      { text: "Big Dreams", accent: true },
    ] satisfies CfacTitleRun[],
    lead: "Your donation supports education programs for children in urban poor communities. From school supplies to learning support.",
    primary: {
      label: "Help a Child Learn Today",
      href: "#donate",
    } satisfies CfacCta,
    secondary: {
      label: "Be Part of the Favor Care Community",
      href: "/get-involved",
    } satisfies CfacCta,
  },

  intro: {
    video: { id: "Wv8_i_3FFYs", title: "Coffee for a Cause Video" },
    title: "One Cup. One Future.",
    paragraphs: [
      {
        text: "You enjoy your daily caffeine fix—but what if that same ₱200 could help change a child's future?",
      },
      { text: "Join the Coffee for a Cause challenge.", strong: true },
      {
        text: "Give the cost of one cup each month and help support our learning centers.",
      },
      {
        text: "Our goal: Raise ₱2,000,000 to build a brighter future for the children of Redemptio Christian School and Pangarap Ville.",
      },
      {
        text: "Because what you give today can shape a child's tomorrow.",
        strong: true,
      },
    ] satisfies CfacParagraph[],
  },

  stories: {
    title: "Communities We Help",
    subtitle:
      "Real impact in the places that need it most. Our roots run deep in the Philippine highlands.",
    items: [
      {
        title: "The Redemption Story: Building a Bridge to the Future",
        paragraphs: [
          "For families in urban poor communities, the dream of education is too often overshadowed by the daily struggle to survive.",
          "As a result, thousands of children are forced out of school, not by choice, but by circumstance.",
          "They are not choosing to stay home; they are being priced out of their own future.",
        ],
        photos: strip("Redemptio Christian School", [
          "jpm-01",
          "jpm-13",
          "jpm-14",
          "jpm-31",
          "jpm-35",
          "jpm-38",
          "jpm-42",
          "jpm-43",
        ]),
      },
      {
        title: "Pangarap Ville: A Community That Chooses Hope",
        paragraphs: [
          "In Pangarap Ville, a small urban poor community in Rizal, the dream of education often takes a backseat to the realities of daily survival.",
          "For many parents, it's not a question of valuing education. It's a question of what they can afford today.",
          "They are not choosing to fall behind. They are being left behind by circumstances beyond their control.",
        ],
        photos: strip("Pangarap Ville", [
          "dsc01399",
          "dsc01429",
          "dsc01461",
          "dsc01849",
          "dsc01887",
          "dsc01888",
          "dsc01955",
          "dsc02002",
        ]),
      },
    ] satisfies CfacStory[],
  },

  howItWorks: {
    title: "From Coffee to Care: Make Every Sip Count",
    subtitle:
      "Small choices, big impact—see the need, feel the difference, and take action.",
    steps: [
      {
        icon: "see",
        title: "See the Need",
        body: "A simple cup can change a story. Meet the communities and children your support reaches.",
      },
      {
        icon: "feel",
        title: "Feel the Impact",
        body: "Your everyday choice becomes someone else's opportunity.",
      },
      {
        icon: "act",
        title: "Take Action",
        body: "Turn your coffee into care. Choose your amount, multiply your giving.",
      },
    ] satisfies CfacStep[],
    cta: { label: "Donate Now", href: "#donate" } satisfies CfacCta,
  },

  give: {
    title: "Give in a Way That Works for You",
    subtitle:
      "For many children, staying in school is a daily struggle—not a given.",
    tax: {
      title: "Tax-Deductible Giving",
      body: "Favor Care is accredited by the Philippine Council for NGO Certification (PCNC). Donations may qualify as tax deductible.",
      footnote:
        "*Excludes employed individuals and self-employed individuals who have opted for the 8% gross income tax rate.",
    },
    faqs: [
      {
        q: "Why does a Tax Deduction Certificate matter?",
        a: [
          {
            p: "Giving to Favor Care allows your business to make a real difference while possibly enjoying tax benefits.",
          },
          {
            p: "As a PCNC-accredited nonprofit, qualified donations to Favor Care may be eligible for tax deduction, subject to BIR rules and proper documentation.",
          },
          {
            p: "A tax deduction certificate can help your company:",
            strong: true,
          },
          {
            list: [
              "document qualified donations",
              "support possible tax deduction claims",
              "give in a more strategic and meaningful way",
            ],
          },
        ],
      },
      {
        q: "Why Coffee For a Cause?",
        a: [
          {
            p: "Coffee for a Cause is a simple way for businesses to support education and community care through Favor Care.",
          },
          {
            p: "More than sponsoring coffee, you are helping provide hope, opportunity, and practical support to children and families in need.",
          },
          {
            p: "Through Redemptio Christian School and Pangarapville, your giving helps provide education, school supplies, uniforms, and ongoing care for underserved communities.",
          },
          {
            p: "Partner with Favor Care through Coffee for a Cause and turn everyday giving into lasting impact.",
          },
        ],
      },
      {
        q: "What are the communities we serve?",
        a: [
          {
            p: "Redemptio Christian School in Barangay San Juan provides free education, books, uniforms, and learning materials for children in need. Favor Care also supports students and their families through community medical care.",
          },
          {
            p: "Pangarap Ville is another community close to Favor Care's heart. What began as typhoon relief grew into ongoing support for families and children through consistent care, education, and community involvement.",
          },
          {
            p: "These communities are not defined by hardship alone. They are full of potential and children with dreams worth protecting.",
          },
        ],
      },
      {
        q: "How does my organization qualify for a Tax Deduction Certificate?",
        a: [
          {
            p: "For a minimum donation of ₱500, you will receive a Certificate of Donation — a small token that represents a big impact on the education of children in urban poor communities supported by Favor Care.",
          },
        ],
      },
    ] satisfies CfacFaqItem[],
    form: {
      title: "Make your contribution",
      amountsTitle: "Choose Contribution",
      /** Preset amounts in whole pesos (the sample's chip row). */
      amounts: [200, 500, 1000, 2500, 5000, 10000],
      customPlaceholder: "Enter custom amount",
      donor: {
        title: "Your Information (Optional)",
        hint: "Share your details to receive updates on your donation impact.",
        name: "Your Name",
        email: "Email Address",
      },
      certificate: {
        toggle: "Request for Certificate of Donation",
        hint: "Available for donations of ₱500 or above.",
        /** Minimum gift (pesos) that unlocks the certificate. */
        minimum: 500,
        title: "Certificate Details",
        required: "Required fields for certificate issuance.",
        fields: [
          {
            name: "companyName",
            label: "Complete Registered Company Name *",
            placeholder: "As reflected in SEC/BIR registration",
            type: "text",
          },
          {
            name: "tin",
            label: "Tax Identification Number (TIN) *",
            placeholder: "000-000-000-000",
            type: "text",
          },
          {
            name: "businessAddress",
            label: "Registered Business Address *",
            placeholder: "As reflected in BIR Form 2303",
            type: "text",
          },
          {
            name: "contactNumber",
            label: "Contact Number *",
            placeholder: "+63 917 123 4567",
            type: "tel",
          },
        ],
        message: {
          label: "Message",
          placeholder: "Any additional notes or special instructions...",
        },
      },
      submit: "Donate Now",
      privacy: {
        before: "Your data is protected under our ",
        link: { label: "Privacy Policy", href: "/privacy-policy" },
        after: ".",
      },
    },
  },

  pillars: [
    {
      title: 'Removing the "Cost of Entry"',
      paragraphs: [
        "We understand that a child cannot learn on an empty stomach or without a pencil.",
        "Your support allows Redemptio School to provide a truly zero-cost education, covering the resources families can't afford so that 'poverty' is no longer a reason for a child to be out of school.",
      ],
      image: { src: photo("jpm-14"), alt: 'Removing the "Cost of Entry"' },
      imageSide: "right",
    },
    {
      title: "A Sanctuary for Quality Learning",
      paragraphs: [
        "We don't just want kids in seats; we want them to thrive. We are constantly developing projects to improve our facilities and curriculum.",
        "We aim to integrate digital literacy and creative arts so that our students are just as competent and competitive as those from private institutions.",
      ],
      image: { src: photo("jpm-15"), alt: "A Sanctuary for Quality Learning" },
      imageSide: "left",
    },
    {
      title: "Expanding Our Walls",
      paragraphs: [
        "The demand is growing faster than we can meet.",
        "We are raising funds to create more classrooms and provide the learning tools needed for the many children waiting to learn.",
      ],
      image: { src: photo("jpm-16"), alt: "Expanding Our Walls" },
      imageSide: "right",
    },
    {
      title: "Empowering Through Mentorship",
      paragraphs: [
        "A school is only as strong as its mentors.",
        "We are actively seeking and training volunteers who can pour their time and expertise into these children, proving to them that their community believes in their potential.",
      ],
      image: { src: photo("jpm-17"), alt: "Empowering Through Mentorship" },
      imageSide: "left",
    },
    {
      title: "Breaking the Cycle",
      paragraphs: [
        "By providing free, high-quality education to the most vulnerable, we are equipping a generation to become the breadwinners and leaders of tomorrow, effectively ending the cycle of poverty for their entire family line.",
      ],
      image: { src: photo("jpm-18"), alt: "Breaking the Cycle" },
      imageSide: "right",
    },
  ] satisfies CfacPillar[],

  articles: { title: "Insights & Stories", count: 3 },

  contact: {
    title: "Get in Touch",
    paragraphs: [
      "Have questions about our programs or how you can volunteer?",
      "We'd love to hear from you.",
    ],
    email: { label: "Email", value: "info@favorcare.org" },
    address: {
      label: "Address",
      value:
        "Level 6 East Wing, Mall, Shangri-La Plaza, EDSA, Shaw Blvd., Mandaluyong, Philippines, 1552",
      href: "https://www.google.com/maps/search/?api=1&query=Level+6+East+Wing+Mall+Shangri-La+Plaza+EDSA+Shaw+Blvd+Mandaluyong+Philippines+1552",
    },
    form: {
      subjectPrefix: "Coffee for a Cause contact",
      fields: {
        firstName: { label: "First Name", placeholder: "Jane" },
        lastName: { label: "Last Name", placeholder: "Doe" },
        email: { label: "Email Address", placeholder: "jane@example.com" },
        mobile: { label: "Mobile Number", placeholder: "+63 917 123 4567" },
        social: {
          label: "Facebook / IG Link",
          placeholder: "https://facebook.com/yourprofile",
        },
        message: { label: "Message", placeholder: "How can we assist you?" },
      },
      submit: "Send Message",
    },
  },

  footer: {
    image: photo("jpm-28"),
    donate: { label: "DONATE NOW", href: "#donate" } satisfies CfacCta,
    privacy: { label: "Privacy Policy", href: "/privacy-policy" },
    org: { label: "Favor Care Foundation, Inc", href: "/" },
    accredited: "Accredited by:",
    badges: [
      { src: asset("/images/orgs/PCNC.png"), alt: "PCNC Accredited" },
      { src: asset("/images/orgs/DSWD.png"), alt: "DSWD Accredited" },
    ] satisfies CfacPhoto[],
  },

  thanks: {
    title: "Thank You!",
    lead: "Your generosity makes a difference.",
    body: "Thanks to your support, we can continue providing education to children in urban poor communities. Every cup of coffee helps build a brighter future.",
    cta: { label: "Return to Site", href: "/" } satisfies CfacCta,
  },
};

/** Format a whole-peso amount as the chip label (e.g. 1000 → "₱1,000"). */
export function formatPeso(amount: number): string {
  return `₱${amount.toLocaleString("en-PH")}`;
}

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
 * The CFAC palette as rendered — one entry per headline token the `.cfac`
 * scope overrides (app/coffeeforacause/theme.css). The storybook's CFAC
 * group renders these swatches inside the live scope.
 */
export const CFAC_COLORS: { name: string; token: string; hex: string }[] = [
  { name: "Gold (nav bar, CTAs)", token: "yellow", hex: "#ffb428" },
  { name: "Dark (ink, pills, bands)", token: "primary", hex: "#1b1c1c" },
  { name: "White (page)", token: "surface", hex: "#ffffff" },
  { name: "Warm grey (bands)", token: "surface-container-low", hex: "#f6f3f1" },
  { name: "Input fill", token: "surface-container-lowest", hex: "#f8f3f0" },
  {
    name: "Brown (secondary copy)",
    token: "on-surface-variant",
    hex: "#50453e",
  },
  { name: "Border", token: "outline-variant", hex: "#d4c3be" },
];

/** Text/background pairs the CFAC theme must keep at AA (4.5:1) or better. */
export const CFAC_CONTRAST_PAIRS: {
  label: string;
  fg: string;
  bg: string;
}[] = [
  { label: "ink on the page", fg: "#1b1c1c", bg: "#ffffff" },
  { label: "ink on the warm-grey band", fg: "#1b1c1c", bg: "#f6f3f1" },
  { label: "brown copy on the page", fg: "#50453e", bg: "#ffffff" },
  { label: "brown copy on the warm-grey band", fg: "#50453e", bg: "#f6f3f1" },
  { label: "dark label on gold", fg: "#1b1c1c", bg: "#ffb428" },
  { label: "white label on dark", fg: "#ffffff", bg: "#1b1c1c" },
  { label: "gold accent on the hero wash", fg: "#ffb428", bg: "#1b1c1c" },
  { label: "muted fine print on the page", fg: "#6b7280", bg: "#ffffff" },
];
