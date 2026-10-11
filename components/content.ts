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

// Homepage v2 — cloned from the WP `favor-care-homepage` page (post 6002).
// Copy is verbatim from the source (reference text + widget trees); images
// point at WP media until the R2 URL flip (MIGRATION.md Phase 2).
export const HOME = {
  hero: {
    kicker: "JOIN THE PRAYER HUB",
    headline: "Giving hope for a better future to those in need.",
  },
  careUpdates: {
    label: "Care Updates:",
    body:
      "Favor Care is currently seeking Corporate Sponsorship to raise ₱50 million to expand the school — purchasing an additional lot of land, and for the construction of school facilities that will allow us to expand into Grades 1-3 and eventually 4-6, significantly increasing school intake and providing education to children who would otherwise have no access to it. Currently, the school has 185 students. With the added classrooms, Redemptio Christian School can provide free education to over 500 students.",
    cta: { label: "See Event", href: "/pampanga-2024" },
  },
  about: {
    eyebrow: "ABOUT US",
    title: "Building hope and transforming lives",
    body:
      "Through our dedicated efforts in education, societal integration, disaster relief, and community development, we empower individuals and communities to overcome adversity.",
    body2:
      "Favor Care is a faith-based humanitarian organization committed to help improve the lives of communities through compassion ministries.",
    cta: { label: "LEARN MORE", href: "/who-we-are" },
  },
  whatWeDo: {
    eyebrow: "WHAT WE DO",
    title: "We address the needs that are right in front of us.",
    body:
      "Favor Care serves different communities through innovative projects and partnerships. By focusing on these critical areas, we strive to make a meaningful impact and inspire hope for a better future for them.",
    // Order matches the rendered page.
    programs: [
      "Community Development",
      "Trainings",
      "Partnership Resourcing",
      "Education",
      "Societal Reintegration",
      "Disaster Relief",
    ],
  },
  stories: {
    title: "Stories of changed lives",
    intro:
      "From empowering individuals with education and skills to fostering inclusive communities and providing vital relief during crises, our efforts have made a tangible impact.",
    body:
      "The story of people touched through Favor Care. Be it a bar of soap or a can of sardines they receive, or medical attention for a skin problem, a newly rebuilt house gutted down by fire or a prayer for blessing, God moves in their heart. And they are never the same again.",
    image:
      "https://staging.favorcare.org/wp-content/uploads/2024/05/DSCF0091-scaled-e1714462620229-1024x682.jpg",
    imageAlt: "A Favor Care community outreach",
  },
  takeAction: {
    title: "Take Action",
    body:
      "Join us in our mission to address homelessness, hunger, poverty, and education. Together, we can create lasting impact and hope for a better future.",
    cta: { label: "GET INVOLVED", href: "/get-involved" },
  },
  contact: {
    title: "Get in touch with us",
    body:
      "Reach out to Favor Care and discover how you can contribute to building a better tomorrow.",
    loveTitle: "We'd love to hear from you!",
    loveBody:
      "Reach out to us for more information about our projects, to get involved, or to offer support. Together, we can make a difference.",
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
  caption: string;
}

// Homepage program carousel — order follows WHAT_WE_DO.programs. The photos
// are decorative; the visible captions carry the program names.
export const CAROUSEL: CarouselSlide[] = [
  {
    src: asset("/images/pages/home/carousel-education.jpg"),
    caption: "Education",
  },
  {
    src: asset("/images/pages/home/carousel-reintegration.jpg"),
    caption: "Societal Reintegration",
  },
  {
    src: asset("/images/pages/home/carousel-disaster-relief.jpeg"),
    caption: "Disaster Relief",
  },
  {
    src: asset("/images/pages/home/carousel-community-development.jpg"),
    caption: "Community Development",
  },
  {
    src: asset("/images/pages/home/carousel-trainings.jpg"),
    caption: "Training",
  },
  {
    src: asset("/images/pages/home/carousel-partnership-resources.jpg"),
    caption: "Partnership Resourcing",
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
    image: "https://staging.favorcare.org/wp-content/uploads/2024/07/kids2.png",
  },
  mission: {
    label: "Mission",
    body:
      "To develop and fund projects for the marginalized that address needs of homelessness, hunger, poverty, and education in the Philippines.",
    image:
      "https://staging.favorcare.org/wp-content/uploads/2025/09/FVR06030-scaled-e1757008150302.jpg",
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
      src:
        "https://staging.favorcare.org/wp-content/uploads/2024/06/FCX09979-scaled.jpg",
      alt: "Favor Care volunteers gathered on outreach",
    },
    {
      src:
        "https://staging.favorcare.org/wp-content/uploads/2024/05/Dental-Mission-11-scaled.jpg",
      alt: "Dental mission outreach",
    },
    {
      src:
        "https://staging.favorcare.org/wp-content/uploads/2024/06/Favor-Care-volunteer-huddle-at-Shang-1-scaled.jpeg",
      alt: "Volunteer huddle at Shangri-La Plaza",
    },
    {
      src:
        "https://staging.favorcare.org/wp-content/uploads/2024/06/Outreach-to-the-Aetas-in-the-Mountains-9-scaled.jpg",
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
        photo:
          "https://staging.favorcare.org/wp-content/uploads/2024/07/photo_6307445248871217844_y-e1718641395357.jpg",
        photoAlt: "Chris Aiton, Executive Director",
      },
      {
        name: "Belle Guiron",
        role: "Volunteer Coordinator",
        photo:
          "https://staging.favorcare.org/wp-content/uploads/2024/07/belle_guiron.jpeg",
        photoAlt: "Belle Guiron, Volunteer Coordinator",
      },
      {
        name: "Carmelyn De Guzman",
        role: "Project Coordinator",
        photo:
          "https://staging.favorcare.org/wp-content/uploads/2024/07/LYN-DE-GUZMAN-e1720597744595.jpg",
        photoAlt: "Carmelyn De Guzman, Project Coordinator",
      },
      {
        name: "Chap De Guzman",
        role: "Project Coordinator",
        photo:
          "https://staging.favorcare.org/wp-content/uploads/2024/07/Chap-1.jpg",
        photoAlt: "Chap De Guzman, Project Coordinator",
      },
      {
        name: "Marilou Santero",
        role: "CIW Coordinator",
        photo:
          "https://staging.favorcare.org/wp-content/uploads/2024/07/Mama-Malou-e1721119151756.jpeg",
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
  hero: {
    eyebrow: "Contact us",
    title: "We’d love to hear from you!",
    subtitle:
      "Reach out to us for more information about our projects, to get involved, or to offer support. Together, we can make a difference.",
  },
  details: {
    email: "info@favorcare.org",
    address: "Level 6, East Wing, Shangri-La Plaza, Mandaluyong City",
    hours: "Tuesday to Friday, 10am to 5pm",
  },
  form: { recipient: "info@favorcare.org" },
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
      a: "You may sign up to receive our regular newsletter Favor Carers to know more about our projects, activities and advocacies.",
      link: { label: "Carers Newsletter", href: "#carers" },
    },
  ] satisfies FaqItem[],
} satisfies {
  hero: { eyebrow: string; title: string; subtitle: string };
  details: { email: string; address: string; hours: string };
  form: { recipient: string };
  faqs: FaqItem[];
};

export const GIVENOW = {
  hero: {
    eyebrow: "Give now",
    title: "Partner with Us by Giving",
    primary: { label: "Give now", href: "#give" },
  },
  howToGive: {
    title: "How to Give",
    subtitle:
      "Select your currency or location and your preferred way of giving.",
  },
  regions: [
    {
      name: "Philippines",
      methods: [
        {
          title: "Bank Transfer",
          lines: [
            "Favor Care Foundation Inc.",
            "0019 7000 3318",
            "Unionbank",
          ],
        },
        {
          title: "Checks",
          lines: [
            "Make checks payable to: Favor Care Foundation Inc.",
            "Mail or drop it at the Favor Care office, Level 6, East Wing, Shangri-La Plaza EDSA, Mandaluyong City.",
          ],
        },
        {
          title: "Give Online",
          lines: [
            "Give easily through Maya, GrabPay, GCash via QRPH, or Online Banking.",
          ],
          cta: {
            label: "Open Portal",
            href: "https://paymongo.page/l/favorcaregive",
            external: true,
          },
        },
      ],
    },
    {
      name: "United States (USD)",
      intro:
        "If you’re giving from the United States, you can send your donation through Favor Foundation USA Inc., our registered 501(c)(3) nonprofit organization. All contributions made through Favor Foundation USA Inc. are tax-deductible to the extent permitted by law.",
      methods: [
        {
          title: "Bank Transfer",
          lines: [
            "JP Morgan Chase Bank",
            "Account Name: Favor Foundation USA Inc.",
            "Account Number: 699 709 021",
            "SWIFT Code: CHASSUS33",
            "Routing Number: 02100002",
          ],
        },
        {
          title: "Give Online",
          cta: {
            label: "Credit / Debit",
            href:
              "https://www.zeffy.com/en-US/donation-form/bbd839f7-8d34-428c-891c-3b16fa35a374",
            external: true,
          },
        },
      ],
    },
    {
      name: "Australia (AUD)",
      methods: [
        {
          title: "Give Online",
          lines: [
            "Click the J1158N (FAVOR FOUNDATION COMMUNITY DEVELOPMENT) under Credit Card Tab to Donate.",
          ],
          cta: {
            label: "Donate through Global Development Group",
            href:
              "https://globaldevelopmentgroup.org/Donate?projectNum=J1158N&projectName=Favor%20Foundation%20Community%20Development&cgn=false&goCc=true",
            external: true,
          },
        },
      ],
    },
  ] satisfies GiveRegion[],
  tax: {
    title: "Tax-Deductible Giving",
    body:
      "Favor Care is accredited by the Philippine Council for NGO Certification (PCNC). Donations may qualify as tax-deductible for corporate or individual taxpayer who itemize deductions* under the regular income tax system.",
    footnote:
      "*Excludes employed individuals and self-employed individuals who have opted for the 8% gross income tax rate.",
    certRequest: {
      label: "Request for Certificate of Donation",
      href:
        "mailto:info@favorcare.org?subject=Request%20for%20Certificate%20of%20Donation",
    },
  },
} satisfies {
  hero: { eyebrow: string; title: string; primary: Cta };
  howToGive: { title: string; subtitle: string };
  regions: GiveRegion[];
  tax: {
    title: string;
    body: string;
    footnote: string;
    certRequest: { label: string; href: string };
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
  hero: {
    eyebrow: "Get involved",
    title: "There are several ways for you to be involved.",
    subtitle:
      "From volunteering and fundraising to spreading awareness and participating in our programs — your support helps us create meaningful impact.",
    primary: { label: "Donate now", href: "/givenow" },
    secondary: { label: "Become a volunteer", href: "#ways" },
  },
  ways: {
    title: "Ways you can help",
    subtitle:
      "Your partnership will go a long way. Every gift of time, skill, or prayer matters.",
  },
} satisfies {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: Cta;
    secondary: Cta;
  };
  ways: { title: string; subtitle: string };
};
