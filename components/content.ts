// Favor Care homepage content — real copy + numbers from the 2026 Favor Care
// Master Deck (Corporate Partnership & Fundraising). The single source of
// truth for what the page says; sections are pure structure and receive this
// via props.

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
  eyebrow: "Favor Care Foundation · DSWD & PCNC Accredited",
  title: "Care that travels the last mile",
  subtitle:
    "A faith-based humanitarian foundation delivering healthcare, education, disaster relief, and community development across Metro Manila and surrounding provinces.",
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
  { value: "2 yrs", label: "Of field operations" },
  { value: "₱35.7M", label: "Donations received, 2025" },
  { value: "₱9.39M", label: "Invested in programs, 2025 (audited)" },
  { value: "3,500", label: "Beneficiaries of our flagship clinic program" },
];

export const MISSION = {
  title: "Our mission",
  body:
    "Favor Care Foundation is a faith-based humanitarian organization delivering healthcare, education, disaster relief, and community development to families across Metro Manila and surrounding provinces. From a mobile medical clinic serving 3,500 patients a year to care packages inside the Correctional Institution for Women, we turn compassion into audited, measurable impact — one program, one family, one community at a time.",
  cta: { label: "Read our story →", href: "#impact" },
} satisfies { title: string; body: string; cta: Cta };

export const CAMPAIGN = {
  eyebrow: "Flagship initiative",
  title: "A mobile clinic reaching 3,500 patients a year.",
  body:
    "Our Community Medical & Dental Outreach program is a funded, 12-month mobile clinic initiative bringing free consultations, dental care, and health education to Metro Manila's poor and marginalized communities — ₱2M total project capital. Full sponsorship or partial co-funding welcome.",
  cta: { label: "Partner with us →", href: "#donate" },
} satisfies {
  eyebrow: string;
  title: string;
  body: string;
  cta: Cta;
};

export const PROGRAMS: ProgramItem[] = [
  {
    title: "Healthcare",
    name: "Medical & Dental Outreach",
    body:
      "Free mobile clinics bringing consultations, dental care, and health education to underserved communities — our flagship program.",
  },
  {
    title: "Education",
    name: "Scholarship & Support",
    body:
      "School supplies, facility improvements, and holistic support for students facing financial barriers to quality education.",
  },
  {
    title: "Reintegration",
    name: "Assistance to PDL",
    body:
      "Values education, counseling, healthcare, and livelihood preparation for women at the Correctional Institution for Women, Mandaluyong.",
  },
  {
    title: "Resilience",
    name: "Relief & Special Projects",
    body:
      "Disaster relief and capacity-building grants that help partner communities and organizations become self-sustaining.",
  },
];

export const IMPACT = {
  eyebrow: "Stories & impact",
  title: "Real lives. Measurable change.",
  body:
    "“Favor Care's medical team demonstrated excellence in patient care, proper coordination with school staff, and strong attention to child safeguarding — serving approximately 350 beneficiaries with free consultations, screening, and medicines.” — Robert Nichols, Executive Director, Redemptio Christian School, Taytay, Rizal",
  cta: { label: "Read more stories →", href: "#impact" },
  trustTitle: "Why trust Favor Care with your gift?",
  trustFacts: [
    "SEC-registered non-stock, non-profit foundation since May 2022",
    "DSWD licensed to operate through March 2027",
    "PCNC accredited — donations qualify for tax deduction",
    "BIR tax-exempt under NIRC Sec. 30(E), valid through May 2027",
    "Independently audited by Quinsay and Co., CPAs",
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
  {
    title: "Volunteer",
    body: "Join us on clinic days — medical, dental, and community roles.",
  },
  {
    title: "Fundraise For Us",
    body: "Run your own campaign or birthday drive for a program you love.",
  },
  {
    title: "Corporate Partners",
    body:
      "Sponsor a mobile clinic from ₱167,000, or become a Founding Partner at ₱1,000,000+.",
  },
  { title: "Prayer Hub", body: "Submit a request and pray with us." },
  {
    title: "In-Kind Donations",
    body:
      "Give medical & dental supplies, transport, logistics, or professional services.",
  },
];

export const DONATE_CTA = {
  title: "Your gift, in their hands within days.",
  body:
    "Every gift is secure, tax-deductible, and independently audited. Fund a full mobile clinic for ₱167,000, give monthly as a Carer, or join our Founding Partners.",
  cta: { label: "Donate now", href: "#donate" },
} satisfies { title: string; body: string; cta: Cta };

export const NEWSLETTER = {
  title: "Join the Carers newsletter",
  body: "Monthly stories, prayer points, and ways to act. Unsubscribe anytime.",
} satisfies { title: string; body: string };
