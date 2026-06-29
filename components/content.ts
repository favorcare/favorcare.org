// Favor Care homepage content — real copy + numbers from ideas/proposed.svg
// (TEMPLATE A · Homepage). The single source of truth for what the page says;
// sections are pure structure and receive this via props.

export interface Cta {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ProgramItem {
  title: string;
  name?: string;
  body: string;
}

export interface WayItem {
  title: string;
  body: string;
}

export const HERO = {
  eyebrow: "Favor Care · Philippines",
  title: "Giving hope for a better future to those in need.",
  subtitle:
    "A faith-driven Philippine nonprofit bringing education, health, and hope to families in need — for 8 years.",
  primary: { label: "Donate now", href: "#donate" },
  secondary: { label: "See our work", href: "#programs" },
} satisfies {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: Cta;
  secondary: Cta;
};

export const STATS: StatItem[] = [
  { value: "185", label: "Students at Redemptio" },
  { value: "1,000+", label: "CIW care packs / yr" },
  { value: "12", label: "Communities served" },
  { value: "8 yrs", label: "Of faithful service" },
];

export const MISSION = {
  title: "Our mission",
  body:
    "Favor Care exists to bring hope and dignity to families in need. From a Christian school on the Taytay floodway to care packs inside the Correctional Institution for Women, we turn compassion into measurable change — one child, one family, one community at a time.",
  cta: { label: "Read our story →", href: "#impact" },
} satisfies { title: string; body: string; cta: Cta };

export const CAMPAIGN = {
  eyebrow: "Featured campaign",
  title: "Build a school that can hold 500 kids.",
  body:
    "A ₱50M corporate sponsorship campaign to expand Redemptio Christian School.",
  raised: "₱16M raised",
  goal: "32% of ₱50M goal",
  percent: 32,
  cta: { label: "Sponsor →", href: "#donate" },
} satisfies {
  eyebrow: string;
  title: string;
  body: string;
  raised: string;
  goal: string;
  percent: number;
  cta: Cta;
};

export const PROGRAMS: ProgramItem[] = [
  {
    title: "Education",
    name: "Redemptio Christian School",
    body: "Free Christian education for kids on the Taytay floodway.",
  },
  {
    title: "Prison Ministry",
    name: "CIW · Care packs · Worship",
    body: "Worship and care packs for the women at CIW.",
  },
  {
    title: "Community Health",
    name: "Medical clinics · Wellness drives",
    body: "Free medical clinics for underserved communities.",
  },
  {
    title: "Disaster Relief",
    name: "Typhoon & emergency response",
    body: "Rapid response to typhoons and emergencies.",
  },
];

export const IMPACT = {
  eyebrow: "Stories & impact",
  title: "Real lives. Measurable change.",
  body:
    "“Before Redemptio, I never thought I’d learn to read.” Stories like Maria’s are why we do this — and proof that your support reaches real people.",
  cta: { label: "Read more stories →", href: "#impact" },
  trustTitle: "Why trust Favor Care with your gift?",
  trustFacts: [
    "SEC-registered foundation",
    "Audited annual financials",
    "90%+ of every gift goes direct to programs",
    "Tax-deductible receipts (PH, US, AU)",
  ],
} satisfies {
  eyebrow: string;
  title: string;
  body: string;
  cta: Cta;
  trustTitle: string;
  trustFacts: string[];
};

export const WAYS_TO_HELP: WayItem[] = [
  { title: "Volunteer", body: "Tutor, mentor, or serve at a clinic." },
  {
    title: "Fundraise For Us",
    body: "Run your own campaign or birthday drive.",
  },
  { title: "Corporate Partners", body: "Sponsor a classroom or a new wing." },
  { title: "Prayer Hub", body: "Submit a request and pray with us." },
  { title: "In-Kind Donations", body: "Drop off care-pack goods at HQ." },
];

export const DONATE_CTA = {
  title: "Your gift, in their hands within days.",
  body:
    "Every option is secure, multi-currency, and tax-receipted. Give once, become a monthly Carer, or sponsor a child.",
  cta: { label: "Donate now", href: "#donate" },
} satisfies { title: string; body: string; cta: Cta };

export const NEWSLETTER = {
  title: "Join the Carers newsletter",
  body: "Monthly stories, prayer points, and ways to act. Unsubscribe anytime.",
} satisfies { title: string; body: string };
