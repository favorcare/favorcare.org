// Favor Care homepage content — real copy + numbers from the 2026 Favor Care
// Master Deck (Corporate Partnership & Fundraising). The single source of
// truth for what the page says; sections are pure structure and receive this
// via props.

import { asset } from "../utils/assets.ts";

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
  /** Optional photo rendered edge-to-edge above the card copy. */
  image?: string;
  imageAlt?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
}

export interface ProgramDetailItem {
  title: string;
  /** One-line summary rendered as the card's semibold lead. */
  summary: string;
  paragraphs: string[];
  /** Optional sub-head between the paragraph groups (used by Education). */
  subHeading?: string;
  subParagraphs?: string[];
  /** Optional 3-up photo strip under the summary. */
  images?: string[];
}

export interface FaqItem {
  q: string;
  a: string;
  /** Optional inline link rendered after the answer. */
  link?: { label: string; href: string };
}

export interface GiveMethodCta {
  label: string;
  href: string;
  /** External portal — opens in a new tab. */
  external?: boolean;
}

export interface GiveMethod {
  title: string;
  lines?: string[];
  cta?: GiveMethodCta;
}

export interface GiveRegion {
  name: string;
  intro?: string;
  methods: GiveMethod[];
}

// Homepage — cloned from the WP `favor-care-homepage` page (post 6002,
// staging = canonical). Copy is verbatim; layout follows the measured WP
// geometry. Widgets WP hides at every breakpoint (Prayer Hub kicker, hero
// subhead, "See Event" button, TESTIMONY lorem carousel, About's second
// paragraph) are deliberately absent.
export const HOME = {
  hero: {
    headline: "Giving hope for a better future to those in need.",
    image: asset("/images/pages/home/hero-bg.jpg"),
  },
  careUpdates: {
    heading: "Care Updates:",
    body:
      "Favor Care is currently seeking Corporate Sponsorship to raise ₱50 million to expand the school — purchasing an additional lot of land, and for the construction of school facilities that will allow us to expand into Grades 1-3 and eventually 4-6, significantly increasing school intake and providing education to children who would otherwise have no access to it. Currently, the school has 185 students. With the added classrooms, Redemptio Christian School can provide free education to over 500 students.",
    image: asset("/images/pages/home/care-updates-yt-header.png"),
    imageAlt: "Care Updates video header",
    video: { id: "zPlPPJDo-ew", title: "Redemptio Christian School expansion" },
  },
  about: {
    eyebrow: "ABOUT US",
    title: "Building hope and transforming lives",
    body:
      "Through our dedicated efforts in education, societal integration, disaster relief, and community development, we empower individuals and communities to overcome adversity.",
    cta: { label: "LEARN MORE", href: "/who-we-are" },
  },
  whatWeDo: {
    eyebrow: "WHAT WE DO",
    title: "We address the needs that are right in front of us.",
    body:
      "Favor Care serves different communities through innovative projects and partnerships. By focusing on these critical areas, we strive to make a meaningful impact and inspire hope for a better future for them.",
  },
  stories: {
    title: "Stories of changed lives",
    // WP shows this intro only in the tablet (768px) variant.
    intro:
      "From empowering individuals with education and skills to fostering inclusive communities and providing vital relief during crises, our efforts have made a tangible impact.",
    body:
      "The story of people touched through Favor Care. Be it a bar of soap or a can of sardines they receive, or medical attention for a skin problem, a newly rebuilt house gutted down by fire or a prayer for blessing, God moves in their heart. And they are never the same again.",
    video: { id: "ujLV_UJCscc", title: "Stories of changed lives" },
  },
  takeAction: {
    title: "Take Action",
    body:
      "Join us in our mission to address homelessness, hunger, poverty, and education. Together, we can create lasting impact and hope for a better future.",
    cta: { label: "GET INVOLVED", href: "/get-involved" },
    image: asset("/images/pages/home/take-action-portrait.jpg"),
    imageAlt: "A Favor Care outreach beneficiary smiling",
  },
  contact: {
    title: "Get in touch with us",
    body:
      "Reach out to Favor Care and discover how you can contribute to building a better tomorrow.",
    loveTitle: "We'd love to hear from you!",
    loveBody:
      "Reach out to us for more information about our projects, to get involved, or to offer support. Together, we can make a difference.",
    map: {
      src:
        "https://maps.google.com/maps?q=favor%20Church%2C%20edsa%20Shangrila&t=m&z=16&output=embed&iwloc=near",
      title: "Favor Church at EDSA Shangri-La on Google Maps",
    },
  },
};

export const HERO = {
  eyebrow: "Favor Care Foundation · DSWD & PCNC Accredited",
  title: "Giving hope for a better future to those in need.",
  subtitle:
    "A faith-based humanitarian foundation delivering healthcare, education, disaster relief, and community development across Metro Manila and surrounding provinces.",
  primary: { label: "Donate now", href: "/givenow" },
  secondary: { label: "See our work", href: "#programs" },
  image: asset("/images/pages/home/hero.jpg"),
} satisfies {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: Cta;
  secondary: Cta;
  image: string;
};

export interface CarouselSlide {
  src: string;
  alt?: string;
  caption: string;
  href?: string;
}

// Homepage "What We Do" media carousel — slide order and photos match the
// canonical (staging) WP carousel; each slide links to its program page
// section. The photos are decorative backgrounds; captions carry the names.
export const CAROUSEL: CarouselSlide[] = [
  {
    src: asset("/images/pages/home/whatwedo-education.jpg"),
    alt: "Education program",
    caption: "Education",
    href: "/what-we-do",
  },
  {
    src: asset("/images/pages/home/whatwedo-societal-reintegration.jpg"),
    alt: "Societal reintegration program",
    caption: "Societal Reintegration",
    href: "/what-we-do",
  },
  {
    src: asset("/images/pages/home/whatwedo-disaster-relief.jpeg"),
    alt: "Disaster relief program",
    caption: "Disaster Relief",
    href: "/what-we-do",
  },
  {
    src: asset("/images/pages/home/whatwedo-community-development.jpg"),
    alt: "Community development program",
    caption: "Community Development",
    href: "/what-we-do",
  },
  {
    src: asset("/images/pages/home/whatwedo-trainings.jpg"),
    alt: "Trainings program",
    caption: "Trainings",
    href: "/what-we-do",
  },
  {
    src: asset("/images/pages/home/whatwedo-partnership-resourcing.jpg"),
    alt: "Partnership resourcing program",
    caption: "Partnership Resourcing",
    href: "/what-we-do",
  },
];

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
  cta: { label: "Partner with us →", href: "/givenow" },
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

export const TRUST_FACTS: string[] = [
  "SEC-registered non-stock, non-profit foundation since May 2022",
  "DSWD licensed to operate through March 2027",
  "PCNC accredited — donations qualify for tax deduction",
  "BIR tax-exempt under NIRC Sec. 30(E), valid through May 2027",
  "Independently audited by Quinsay and Co., CPAs",
];

export const IMPACT = {
  eyebrow: "Stories & impact",
  title: "Real lives. Measurable change.",
  body:
    "“Favor Care's medical team demonstrated excellence in patient care, proper coordination with school staff, and strong attention to child safeguarding — serving approximately 350 beneficiaries with free consultations, screening, and medicines.” — Robert Nichols, Executive Director, Redemptio Christian School, Taytay, Rizal",
  cta: { label: "Read more stories →", href: "/news-updates" },
  trustTitle: "Why trust Favor Care with your gift?",
  trustFacts: TRUST_FACTS,
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
    body:
      "Serve at Favor-CIW Sunday services, the community medical clinic, and other programs.",
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
  cta: { label: "Donate now", href: "/givenow" },
} satisfies { title: string; body: string; cta: Cta };

export const NEWSLETTER = {
  title: "Join the Carers newsletter",
  body: "Monthly stories, prayer points, and ways to act. Unsubscribe anytime.",
} satisfies { title: string; body: string };

export const ABOUT = {
  // Cloned from the WP `about` page (post 1831): hero, mission/vision,
  // core values, 4-photo gallery, team of five, take action. No
  // accountability or banner sections on the canonical (staging) page.
  hero: {
    eyebrow: "About us",
    title: "Explore our journey and join us in making a difference.",
    subtitle:
      "Favor Care is a faith-based humanitarian organization committed to help improve the lives of communities through compassion ministries.",
    image: asset("/images/pages/who-we-are/hero-kids.png"),
  },
  mission: {
    label: "Mission",
    body:
      "To develop and fund projects for the marginalized that address needs of homelessness, hunger, poverty, and education in the Philippines.",
    image: asset("/images/pages/who-we-are/mission.jpg"),
  },
  vision: {
    label: "Vision",
    body:
      "To create a better future by giving hope and opportunities to those who are trapped by poverty and circumstances beyond their control.",
  },
  valuesTitle: "Core Values",
  values: [
    "Generosity",
    "Compassion",
    "Courtesy and Respect",
    "Volunteerism",
    "Integrity",
    "Commitment",
    "Partnership",
    "Empowerment",
    "Inclusivity",
    "Faith-based",
  ],
  // Canonical 4 images (the tree repeats them per breakpoint).
  gallery: [
    {
      src: asset("/images/pages/who-we-are/gallery-volunteers.jpg"),
      alt: "Favor Care volunteers gathered on outreach",
    },
    {
      src: asset("/images/pages/who-we-are/gallery-dental-mission.jpg"),
      alt: "Dental mission outreach",
    },
    {
      src: asset("/images/pages/who-we-are/gallery-huddle.jpg"),
      alt: "Volunteer huddle at Shangri-La Plaza",
    },
    {
      src: asset("/images/pages/who-we-are/gallery-aetas-outreach.jpg"),
      alt: "Outreach to the Aetas community",
    },
  ],
  team: {
    title: "Meet our team members",
    subtitle:
      "Together, we strive to make a lasting impact driven by compassion, dedication, and a commitment to positive social change.",
    members: [
      {
        name: "Chris Aiton",
        role: "Executive Director",
        photo: asset("/images/pages/who-we-are/team-chris.jpg"),
        photoAlt: "Chris Aiton, Executive Director",
      },
      {
        name: "Belle Guiron",
        role: "Volunteer Coordinator",
        photo: asset("/images/pages/who-we-are/team-belle.jpeg"),
        photoAlt: "Belle Guiron, Volunteer Coordinator",
      },
      {
        name: "Carmelyn De Guzman",
        role: "Project Coordinator",
        photo: asset("/images/pages/who-we-are/team-carmelyn.jpg"),
        photoAlt: "Carmelyn De Guzman, Project Coordinator",
      },
      {
        name: "Chap De Guzman",
        role: "Project Coordinator",
        photo: asset("/images/pages/who-we-are/team-chap.jpg"),
        photoAlt: "Chap De Guzman, Project Coordinator",
      },
      {
        name: "Marilou Santero",
        role: "CIW Coordinator",
        photo: asset("/images/pages/who-we-are/team-marilou.jpeg"),
        photoAlt: "Marilou Santero, CIW Coordinator",
      },
    ],
  },
  takeAction: {
    title: "Take Action",
    body:
      "Join us in our mission to address homelessness, hunger, poverty, and education. Together, we can create lasting impact and hope for a better future.",
    cta: { label: "Get involved", href: "/get-involved" },
  },
} satisfies {
  hero: { eyebrow: string; title: string; subtitle: string; image: string };
  mission: { label: string; body: string; image: string };
  vision: { label: string; body: string };
  valuesTitle: string;
  values: string[];
  gallery: { src: string; alt: string }[];
  team: {
    title: string;
    subtitle: string;
    members: { name: string; role: string; photo: string; photoAlt: string }[];
  };
  takeAction: { title: string; body: string; cta: Cta };
};

export const WHAT_WE_DO = {
  // Cloned from the WP `what-we-do` page (post 1835): hero + six program
  // blocks (label / summary / body, copy verbatim) + Donate + Take Action.
  // No images on this page. Two Education extras ("Give the gift of
  // Education", Legacy Offering 2022 / 2023 feeding paragraphs) are hidden
  // on desktop in WP — skipped per the canonical-variant policy.
  hero: {
    title: "What we do",
    subtitle:
      "Through sustainable community development projects, we aim to create resilient communities, addressing social, economic, and environmental challenges.",
  },
  programs: [
    {
      label: "Education:",
      summary:
        "We offer quality education for kids in economically deprived communities.",
      body:
        "Redemptio Christian School caters to preschoolers along the floodway in Barangay San Juan, Taytay, Rizal. We give free books, uniforms and other educational materials. Their physical health, together with the rest of their family, is also taken care of through our community medical clinic.",
    },
    {
      label: "Societal Reintegration:",
      summary:
        "We help inmates prepare for their release from their prison term.",
      body:
        "\u201cWhat\u2019s in store for me when I\u2019m out?\u201d is a question that haunts those who are awaiting release from prison. Around a thousand Persons Deprived of Liberty (PDL), commonly known as inmates, at the Correctional Institution for Women in Mandaluyong City are part of Favor Church-CIW and each Sunday, they attend services held at the maximum, medium and minimum camps. This serves as a venue for them to start a vibrant journey with God. They can experience real freedom and a new perspective that allows them to look beyond their present circumstances to the exciting life that awaits them outside. Their physical and emotional needs are also looked after through our community medical clinic and livelihood trainings to prepare them in their journey back to society.",
    },
    {
      label: "Disaster Relief:",
      summary:
        "We provide quick response and prompt assistance to disaster victims to help mitigate the devastating impact of such calamities.",
      body:
        "Early this year, a fire hit a community in Taytay, Rizal, damaging the homes of 47 families, including three students from Redemptio Christian School. The next day, Favor Care distributed food packs and sleeping implements to all the victim families. We also helped rebuild the homes of the preschoolers, with one of them, from the ground up. We also provided sewing machines to another family, whose livelihood was lost to the fire.",
    },
    {
      label: "Community Development:",
      summary:
        "We initiate programs and activities to help improve the quality of life of less-resourced communities.",
      body:
        "Health is wealth. No more is this true than in financially-challenged places where medical attention is not a priority nor an option. Our community medical clinic helped treat the lingering skin problems of the women in CIW, along with their other health concerns. \u201cMasaya Maging Magulang,\u201d a positive parenting seminar for the parents and guardians of students from Redemptio Christian School, served as a safe space for them to share their challenges of disciplining their children amidst their unfortunate circumstances. All these and other projects in the pipeline are aimed at ministering to the people\u2019s basic needs and giving them a taste of the abundant life God has promised even for the here and now.",
    },
    {
      label: "Training:",
      summary:
        "We offer training programs to empower communities to respond to the needs within their context; as well as build capacity among our volunteers, enabling them to efficiently respond to emergency situations.",
      body:
        "Favor Care organizes training as part of our capacity-building and to equip our volunteers to efficiently respond to the needs around us. Seminars, such as parenting, for instance, also address needs in the communities we are reaching. Also part of this are the conferences we organize for pastors and church leaders, to make them more effective in the task of Kingdom building.",
    },
    {
      label: "Partnership Resourcing:",
      summary:
        "We partner with other organizations for optimal resource sharing, which results in wider reach and greater impact in the communities.",
      body:
        "One organization cannot accomplish the task alone. This is why networking is very important. As much as Favor Care is blessed through the generosity of others, we are helping other like-minded organizations in terms of funding support, manpower resources and expertise so they too can accomplish their mandate.",
    },
  ],
  donate: {
    title: "Donate",
    body:
      "Your generosity can change lives. Every contribution helps create a brighter future.",
    cta: { label: "GIVE", href: "/givenow" },
  },
  takeAction: {
    title: "Take Action",
    body:
      "Join us in creating opportunities. Together, we can transform lives.",
    cta: { label: "GET INVOLVED", href: "/get-involved" },
  },
} satisfies {
  hero: { title: string; subtitle: string };
  programs: { label: string; summary: string; body: string }[];
  donate: { title: string; body: string; cta: Cta };
  takeAction: { title: string; body: string; cta: Cta };
};

export const CONTACT = {
  // Cloned from the WP  page (post 1845): form (no newsletter
  // checkbox here — that variant is the home page form), 5 FAQs (verbatim,
  // rendered desktop order), Carers Newsletter block (the #newsletter
  // anchor target), we'd-love block + map.
  heroTitle: "Contact us",
  faqs: [
    {
      q: "Where does Favor Care operate?",
      a: "As a humanitarian organization, Favor Care desires to respond to every need brought about by disasters, as well as issues such as poverty, homelessness, injustice and other social ills. But as a new organization, we are currently actively working in a community in San Juan, Taytay, Rizal where Redemptio Christian School is located and at the Correctional Institution for Women in Mandaluyong City.",
    },
    {
      q: "Where does Favor Care get its funding?",
      a: "Favor Care thrives through the generosity and kindness of individuals and organizations, both here and abroad. As they come to understand what Favor Care does, the Lord touches their heart to give a donation toward this worthy cause.",
    },
    {
      q: "Do you accept in-kind donations?",
      a: "Both case and in-kind donations are important. But Favor Care has an ongoing need for care packs that we distribute to CIW inmates each month. Items such as shampoo, bath soap, toothpaste and detergent, or medicines for our regular community medical clinics may be dropped off at the Favor Care office, 6/F East Wing, Shangri-La Plaza, Mandaluyong City. The office is open from Tuesday to Friday, 10am to 5pm.",
    },
    {
      q: "How do I volunteer to Favor Care?",
      a: "There are many opportunities to serve with Favor Care. Each Sunday, you can help during our worship services at Favor-CIW. Or the community medical clinics, various activities for the kids at Redemptio Christian School and even relief services at the height of a disaster. Just visit the Favor Care website to get information on the requirements or to sign up. Our staff will contact you for interview and onboarding.",
    },
    {
      q: "Where can I get updates on the work of Favor Care?",
      a: "You may sign up at Carers Newsletter to receive our regular newsletter Favor Carers to know more about our projects, activities and advocacies.",
    },
  ],
  newsletter: {
    title: "Sign up for our Carers Newsletter!",
    placeholder: "EMAIL ADDRESS",
    cta: "SUBSCRIBE",
  },
  love: {
    title: "We’d love to hear from you!",
    body:
      "Reach out to us for more information about our projects, to get involved, or to offer support. Together, we can make a difference.",
    email: "info@favorcare.org",
  },
  // Google Maps embed query from the WP widget address field.
  mapQuery: "Favor Church, EDSA Shangri-La, Mandaluyong City",
  form: { recipient: "info@favorcare.org" },
} satisfies {
  heroTitle: string;
  faqs: { q: string; a: string }[];
  newsletter: { title: string; placeholder: string; cta: string };
  love: { title: string; body: string; email: string };
  mapQuery: string;
  form: { recipient: string };
};

export const GIVENOW = {
  // Cloned from the WP  page (post 7122) + its giving templates.
  // Links verbatim: PH online -> PayMongo portal, US -> Zeffy (501c3),
  // AU -> Global Development Group project J1158N.
  hero: {
    title: "Partner with Us by Giving",
    cta: { label: "GIVE NOW", href: "#give" },
  },
  howToGive: {
    title: "How to Give",
    subtitle:
      "Select your currency or location and your preferred way of giving.",
  },
  ph: {
    bankTransfer: {
      title: "Bank Transfer",
      accountName: "Favor Care Foundation Inc.",
      accountNumber: "0019 7000 3318",
      bank: "Unionbank",
    },
    checks: {
      title: "Checks",
      payable: "Make checks payable to:",
      address:
        "Mail or drop it at the Favor Care office, Level 6, East Wing, Shangril-La Plaza EDSA, Mandaluyong City",
    },
    online: {
      title: "Give Online",
      body:
        "Give easily through Maya, GrabPay, GCash via QRPH, or Online Banking.",
      cta: {
        label: "Open Portal",
        href: "https://paymongo.page/l/favorcaregive",
      },
    },
    taxDeductible: {
      title: "Tax‑Deductible Giving",
      intro:
        "For tax deductible giving, fill out this form or send an email to finance@favorcare.org with the details of your donation.",
      fields: [
        "CONTACT NAME",
        "CONTACT EMAIL",
        "BUSINESS NAME",
        "BUSINESS ADDRESS",
        "BUSINESS TIN",
        "BIR FORM 2303",
        "PROOF OF DONATION",
      ],
      submit: "SUBMIT",
      recipient: "finance@favorcare.org",
    },
  },
  us: {
    title: "United States (USD)",
    body:
      "If you’re giving from the United States, you can send your donation through Favor Foundation USA Inc., our registered 501(c)(3) nonprofit organization. All contributions made through Favor Foundation USA Inc. are tax-deductible to the extent permitted by law.",
    bankTransfer: {
      title: "Bank Transfer",
      bank: "JP Morgan Chase Bank",
      accountName: "Favor Foundation USA Inc.",
      accountNumber: "699 709 021",
      swift: "CHASSUS33",
      routing: "02100002",
    },
    creditDebit: {
      label: "Credit / Debit",
      href:
        "https://www.zeffy.com/en-US/donation-form/bbd839f7-8d34-428c-891c-3b16fa35a374",
    },
  },
  au: {
    title: "Australia (AUD)",
    body: "Donate through Global Development Group",
    body2:
      "Click the J1158N (FAVOR FOUNDATION COMMUNITY DEVELOPMENT) under Credit Card Tab to Donate.",
    cta: {
      label: "Donate through Global Development Group",
      href:
        "https://globaldevelopmentgroup.org/Donate?projectNum=J1158N&projectName=Favor%20Foundation",
    },
  },
} satisfies {
  hero: { title: string; cta: Cta };
  howToGive: { title: string; subtitle: string };
  ph: {
    bankTransfer: {
      title: string;
      accountName: string;
      accountNumber: string;
      bank: string;
    };
    checks: { title: string; payable: string; address: string };
    online: { title: string; body: string; cta: Cta };
    taxDeductible: {
      title: string;
      intro: string;
      fields: string[];
      submit: string;
      recipient: string;
    };
  };
  us: {
    title: string;
    body: string;
    bankTransfer: {
      title: string;
      bank: string;
      accountName: string;
      accountNumber: string;
      swift: string;
      routing: string;
    };
    creditDebit: { label: string; href: string };
  };
  au: {
    title: string;
    body: string;
    body2: string;
    cta: Cta;
  };
};

// Site-wide popups cloned from the WP elementor_library templates
// (1424-prayer-hub-popup, 7283-accreditation, 7426-volunteer-disclaimer).
// Copy is verbatim from the source, including its quirks.
export const POPUPS = {
  prayerHub: {
    title: "PRAYER HUB",
    kicker: "Join us every Thursday, 7:00-7:15pm on Zoom",
    body:
      "The Prayer Hub is our regularly weekly 15-minute corporate prayer time to intercede for our programs and activities. We also take time for urgent calls to pray for those affected by disasters, both here and elsewhere in the world.",
    cta: {
      label: "PRAY WITH US",
      href: "https://us02web.zoom.us/j/9566304454",
      external: true,
    },
  },
  volunteer: {
    title: "Volunteer Commitment",
    body:
      "Before submitting the form, please take the time to review our Volunteer Commitment and Lifestyle Guidelines to see how you are aligned to our values.",
    cta: {
      label: "REVIEW GUIDELINES",
      // /commitment page not yet rebuilt — points at the WP original for now.
      href: "https://staging.favorcare.org/commitment",
      external: true,
    },
  },
  accreditation: {
    title: "We’re officially PCNC and DSWD Accredited!",
    body:
      "Our accreditation affirms our commitment to transparency, integrity, and impact. Thank you for partnering with us as we serve communities with excellence.",
    cta: { label: "DONATE", href: "/givenow" },
  },
};

export const GET_INVOLVED = {
  // Cloned from the WP `get-involved` page (post 1840, staging = canonical):
  // photo hero, then three photo+card rows (black cards with side-only
  // radii, white pill buttons) separated by two full-width bands — the
  // first shows a photo from md up, the second is blank on WP (its
  // background never applies) and is cloned as an empty spacer.
  // Links verbatim: newsletter -> contact#newsletter (WP links per-
  // breakpoint anchors), volunteer -> the fluro.io signup form, donate ->
  // /give → /givenow. The hero's second subhead and the lorem testimonial
  // carousels are hidden at every breakpoint on WP — not cloned. WP's
  // mobile hero title reads "Get involved" (lowercase w) — kept.
  hero: {
    title: "Get Involved",
    titleMobile: "Get involved",
    subtitle:
      "Join us in caring for the poor and less privileged! There are several ways for you to be involved. Your partnership will go a long way.",
    image: asset("/images/pages/get-involved/hero.jpg"),
  },
  cards: [
    {
      title: "Carers Newsletter",
      body:
        "Learn more about the latest on Favor Care when you sign up to receive our regular newsletter Favor Carers.",
      cta: { label: "SUBSCRIBE", href: "/contact#newsletter" },
      image: asset("/images/pages/get-involved/newsletter-aetas.jpg"),
    },
    {
      title: "Volunteer",
      body:
        "Sign up as a Favor Care volunteer for our Sunday services at Favor-CIW, community medical clinic and other programs and activities.",
      cta: {
        label: "SERVE",
        href: "https://share.fluro.io/form/6359f65f3e1dcf00252046d6",
        external: true,
      },
      image: asset("/images/pages/get-involved/volunteer-repacking-rice.jpeg"),
    },
    {
      title: "Donate",
      body:
        "Your donation makes a world of difference. Every donation brings hope and creates opportunities for a better future.",
      cta: { label: "GIVE", href: "/givenow" },
      image: asset("/images/pages/get-involved/donate.jpg"),
    },
  ],
  bandPhoto: asset("/images/pages/get-involved/band-1.jpg"),
} satisfies {
  hero: { title: string; titleMobile: string; subtitle: string; image: string };
  cards: {
    title: string;
    body: string;
    cta: { label: string; href: string; external?: boolean };
    image: string;
  }[];
  bandPhoto: string;
};

export const PRIVACY = {
  // Cloned verbatim from the WP privacy-policy page (reference text).
  title: "Privacy Policy",
  blocks: [
    {
      p: "This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from favorcare.org (the “site”). Favor Legacy Foundation (“Favor Care”, “our foundation”, “we”) respects your right to privacy and confidentiality and gives utmost value to the security and confidentiality of your personal data and information. As a non-profit foundation in the Philippines, we are committed to following the general principles and rules of data privacy protection in the Philippines in compliance with Republic Act No. 10173 or the Data Privacy Act of 2012.",
    },
    { h: "What personal data we collect and why we collect it" },
    {
      p: "Favor Legacy Foundation may collect user data through favorcare.org (“our website”, “the site”). Favorcare.org accepts payments online through various payment gateways including credit card and e-wallet instruments.",
    },
    {
      p: "We collect the following personal information when you transact using this platform:",
    },
    { p: "Name" },
    {
      p: "Contact Information (Phone/Mobile Number, Mailing Address, email address)",
    },
    { p: "Additional information requested by form" },
    {
      p: "The collected personal information on this platform is utilized solely for documentation and processing purposes so we can properly acknowledge the receipt of your payment, downloads, or other merchandise.",
    },
    {
      p: "We will use your Personal Data for as long as necessary to satisfy the purposes for which your Personal Data was collected or to comply with applicable legal requirements.",
    },
    { h: "Comments and Messages" },
    {
      p: "Comments on the site are turned off by default, but may be allowed on certain occasions. When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection. Visitors may also send messages to Favor Care through forms. Data is collected through this form in the same manner. Visitors who email us or use any of the contact forms on our website will have their email address, IP address, and any data provided in the contact form or body of the email stored indefinitely in a database. Use of these forms implies your acceptance that Favor Care will see the data collected.",
    },
    { h: "Media and Uploads" },
    {
      p: "If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.",
    },
    {
      p: "Certain transactions performed through the site may ask you to upload media showing your proof of payment. These may contain sensitive information regarding your transaction. As such, we download and store this media in a separate location off-site.",
    },
    { h: "Analytics" },
    {
      p: "We use Google Analytics for tracking visitors and aggregating information about the traffic to our websites. You may view the Google Analytics Privacy Policy for more information.",
    },
    {
      p: "When you visit our website, a record of your visit is logged and the following data is supplied by your browser:",
    },
    { p: "The date, time and length of your visit to the website" },
    { p: "Your IP address and/or domain name" },
    { p: "Your operating system (type of browser and platform)" },
    { p: "The pages you visited during your session" },
    { h: "Cookies" },
    {
      p: "If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.",
    },
    {
      p: "If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.",
    },
    {
      p: "When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.",
    },
    { h: "Embedded Content" },
    {
      p: "Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.",
    },
    {
      p: "These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.",
    },
    { h: "Security Policy" },
    {
      p: "The Favor Legacy Foundation online donation system uses an advanced encryption technology provided by Secure Sockets Layer (SSL), a recognized authentication and encryption software, which means that the site encrypts all of your personal information and card details so that it is unreadable to anyone outside of the transaction process.",
    },
    { h: "Third-party Payment Gateway" },
    {
      p: "Credit card and e-wallet payments made through the Favor Church site are processed through a secure third-party payment gateway provided by Paymongo. You may view Paymongo’s privacy policy for information on what personal data is collected and retained through your transaction.",
    },
    { h: "Data Access" },
    {
      p: "We recognize the sensitive and confidential nature of the personal data under the custody of the company and ensure that only authorized Favor Care staff shall be allowed to access such personal data, for the purposes stated in the sections above.",
    },
    { h: "Access and Correction" },
    {
      p: "You have the right to ask for a copy of any personal information we hold about you, as well as to ask for it to be corrected if you think it is wrong. To do so, please contact our Data Protection Officer, Eucel Maximo, through the following email address: info@favorcare.org.",
    },
    { h: "Governing Law" },
    {
      p: "Disputes relating to the use of the websites’ data collection activities and the interpretation of these Terms and Conditions are subject to the laws of the Republic of the Philippines, and any dispute shall be brought before the courts of Mandaluyong City, Philippines, where Favor Legacy Foundation is officially registered and located.",
    },
    { h: "What Rights Do I Have Over My Data?" },
    {
      p: "If you have made a purchase through this site, or have left comments or messages, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.",
    },
    { h: "Our Rights" },
    {
      p: "We reserve the right to modify this privacy policy at any time. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.",
    },
  ],
} satisfies { title: string; blocks: ({ h: string } | { p: string })[] };
