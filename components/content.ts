// Favor Care homepage content — real copy + numbers from the 2026 Favor Care
// Master Deck (Corporate Partnership & Fundraising). The single source of
// truth for what the page says; sections are pure structure and receive this
// via props.

import { asset } from "../utils/assets.ts";

export interface Cta {
  label: string;
  href: string;
}

/** One who-we-are team member: portrait plus name and role caption. */
export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
}

export interface FaqItem {
  q: string;
  a: string;
  /** Optional inline link rendered after the answer. */
  link?: { label: string; href: string };
}

/** One labeled field of the contact page's Carers Newsletter form. */
export interface NewsletterField {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "email";
  required?: boolean;
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
    body: "Favor Care is currently seeking Corporate Sponsorship to raise ₱50 million to expand the school — purchasing an additional lot of land, and for the construction of school facilities that will allow us to expand into Grades 1-3 and eventually 4-6, significantly increasing school intake and providing education to children who would otherwise have no access to it. Currently, the school has 185 students. With the added classrooms, Redemptio Christian School can provide free education to over 500 students.",
    image: asset("/images/pages/home/care-updates-yt-header.png"),
    imageAlt: "Care Updates video header",
    video: { id: "zPlPPJDo-ew", title: "Redemptio Christian School expansion" },
  },
  about: {
    eyebrow: "ABOUT US",
    title: "Building hope and transforming lives",
    body: "Through our dedicated efforts in education, societal integration, disaster relief, and community development, we empower individuals and communities to overcome adversity.",
    cta: { label: "LEARN MORE", href: "/who-we-are" },
  },
  whatWeDo: {
    eyebrow: "WHAT WE DO",
    title: "We address the needs that are right in front of us.",
    body: "Favor Care serves different communities through innovative projects and partnerships. By focusing on these critical areas, we strive to make a meaningful impact and inspire hope for a better future for them.",
  },
  stories: {
    title: "Stories of changed lives",
    // WP shows this intro only in the tablet (768px) variant.
    intro:
      "From empowering individuals with education and skills to fostering inclusive communities and providing vital relief during crises, our efforts have made a tangible impact.",
    body: "The story of people touched through Favor Care. Be it a bar of soap or a can of sardines they receive, or medical attention for a skin problem, a newly rebuilt house gutted down by fire or a prayer for blessing, God moves in their heart. And they are never the same again.",
    video: { id: "ujLV_UJCscc", title: "Stories of changed lives" },
  },
  takeAction: {
    title: "Take Action",
    body: "Join us in our mission to address homelessness, hunger, poverty, and education. Together, we can create lasting impact and hope for a better future.",
    cta: { label: "GET INVOLVED", href: "/get-involved" },
    image: asset("/images/pages/home/take-action-portrait.jpg"),
    imageAlt: "A Favor Care outreach beneficiary smiling",
  },
  contact: {
    title: "Get in touch with us",
    body: "Reach out to Favor Care and discover how you can contribute to building a better tomorrow.",
    loveTitle: "We'd love to hear from you!",
    loveBody:
      "Reach out to us for more information about our projects, to get involved, or to offer support. Together, we can make a difference.",
    map: {
      src: "https://maps.google.com/maps?q=favor%20Church%2C%20edsa%20Shangrila&t=m&z=16&output=embed&iwloc=near",
      title: "Favor Church at EDSA Shangri-La on Google Maps",
    },
  },
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

export const ABOUT = {
  // Cloned from the WP `about` page (post 1831, staging = canonical):
  // photo hero, mission/vision split rows, core values, 2×2 gallery,
  // five-person team, take action. Copy verbatim; geometry follows the
  // measured WP layout at 360/768/1280.
  // WP hides at every breakpoint (not cloned): the hero subhead "Explore
  // our journey…", the Financial Accountability section (a dead Figma
  // embed), and the three get-involved call-to-action cards.
  hero: {
    title: "About us",
    body: "Favor Care is a faith-based humanitarian organization committed to help improve the lives of communities through compassion ministries.",
    image: asset("/images/pages/who-we-are/hero-bg.jpg"),
  },
  mission: {
    label: "Mission",
    body: "To develop and fund projects for the marginalized that address needs of homelessness, hunger, poverty, and education in the Philippines.",
    image: asset("/images/pages/who-we-are/mission.png"),
  },
  vision: {
    label: "Vision",
    body: "To create a better future by giving hope and opportunities to those who are trapped by poverty and circumstances beyond their control.",
    image: asset("/images/pages/who-we-are/vision.jpg"),
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
  // Canonical 4 images in the desktop/tablet order; the mobile variant of
  // the WP gallery reorders them (huddle, volunteers, aetas, dental),
  // which the route passes to `Gallery` as `mobileOrder={[2, 4, 1, 3]}`.
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
    body: "Join us in our mission to address homelessness, hunger, poverty, and education. Together, we can create lasting impact and hope for a better future.",
    cta: { label: "GET INVOLVED", href: "/get-involved" },
  },
} satisfies {
  hero: { title: string; body: string; image: string };
  mission: { label: string; body: string; image: string };
  vision: { label: string; body: string; image: string };
  valuesTitle: string;
  values: string[];
  gallery: { src: string; alt: string }[];
  team: {
    title: string;
    subtitle: string;
    members: TeamMember[];
  };
  takeAction: { title: string; body: string; cta: Cta };
};

export const WHAT_WE_DO = {
  // Cloned from the WP `what-we-do` page (post 1835, staging = canonical):
  // photo hero, six program rows (label / summary / body verbatim, each
  // with a 3-photo slideshow), then the Donate + Take Action card pair.
  // Two Education extras ("Give the gift of Education", Legacy Offering
  // 2022/2023 feeding paragraphs) are hidden at every breakpoint on WP —
  // not cloned. WP paints only Education's label + summary: the other
  // five programs keep those boxes but hide them with visibility:hidden
  // at every breakpoint (mirrored in the route with `invisible`).
  hero: {
    title: "What we do",
    subtitle:
      "Through sustainable community development projects, we aim to create resilient communities, addressing social, economic, and environmental challenges.",
    image: asset("/images/pages/what-we-do/hero-kids.png"),
  },
  programs: [
    {
      label: "Education:",
      summary:
        "We offer quality education for kids in economically deprived communities.",
      body: "Redemptio Christian School caters to preschoolers along the floodway in Barangay San Juan, Taytay, Rizal. We give free books, uniforms and other educational materials. Their physical health, together with the rest of their family, is also taken care of through our community medical clinic.",
      slides: [
        {
          src: asset("/images/pages/what-we-do/education-1.jpg"),
          alt: "Education program",
        },
        {
          src: asset("/images/pages/what-we-do/education-2.jpg"),
          alt: "Education program",
        },
        {
          src: asset("/images/pages/what-we-do/education-3.jpg"),
          alt: "Education program",
        },
      ],
    },
    {
      label: "Societal Reintegration:",
      summary:
        "We help inmates prepare for their release from their prison term.",
      body: "\u201cWhat\u2019s in store for me when I\u2019m out?\u201d is a question that haunts those who are awaiting release from prison. Around a thousand Persons Deprived of Liberty (PDL), commonly known as inmates, at the Correctional Institution for Women in Mandaluyong City are part of Favor Church-CIW and each Sunday, they attend services held at the maximum, medium and minimum camps. This serves as a venue for them to start a vibrant journey with God. They can experience real freedom and a new perspective that allows them to look beyond their present circumstances to the exciting life that awaits them outside. Their physical and emotional needs are also looked after through our community medical clinic and livelihood trainings to prepare them in their journey back to society.",
      slides: [
        {
          src: asset("/images/pages/what-we-do/reintegration-1.jpg"),
          alt: "Societal reintegration program",
        },
        {
          src: asset("/images/pages/what-we-do/reintegration-2.jpg"),
          alt: "Societal reintegration program",
        },
        {
          src: asset("/images/pages/what-we-do/reintegration-3.jpg"),
          alt: "Societal reintegration program",
        },
      ],
    },
    {
      label: "Disaster Relief:",
      summary:
        "We provide quick response and prompt assistance to disaster victims to help mitigate the devastating impact of such calamities.",
      body: "Early this year, a fire hit a community in Taytay, Rizal, damaging the homes of 47 families, including three students from Redemptio Christian School. The next day, Favor Care distributed food packs and sleeping implements to all the victim families. We also helped rebuild the homes of the preschoolers, with one of them, from the ground up. We also provided sewing machines to another family, whose livelihood was lost to the fire.",
      slides: [
        {
          src: asset("/images/pages/what-we-do/disaster-relief-1.jpg"),
          alt: "Disaster relief program",
        },
        {
          src: asset("/images/pages/what-we-do/disaster-relief-2.jpg"),
          alt: "Disaster relief program",
        },
        {
          src: asset("/images/pages/what-we-do/disaster-relief-3.jpg"),
          alt: "Disaster relief program",
        },
      ],
    },
    {
      label: "Community Development:",
      summary:
        "We initiate programs and activities to help improve the quality of life of less-resourced communities.",
      body: "Health is wealth. No more is this true than in financially-challenged places where medical attention is not a priority nor an option. Our community medical clinic helped treat the lingering skin problems of the women in CIW, along with their other health concerns. \u201cMasaya Maging Magulang,\u201d a positive parenting seminar for the parents and guardians of students from Redemptio Christian School, served as a safe space for them to share their challenges of disciplining their children amidst their unfortunate circumstances. All these and other projects in the pipeline are aimed at ministering to the people\u2019s basic needs and giving them a taste of the abundant life God has promised even for the here and now.",
      slides: [
        {
          src: asset("/images/pages/what-we-do/community-development-1.jpg"),
          alt: "Community development program",
        },
        {
          src: asset("/images/pages/what-we-do/community-development-2.jpg"),
          alt: "Community development program",
        },
        {
          src: asset("/images/pages/what-we-do/community-development-3.jpg"),
          alt: "Community development program",
        },
      ],
    },
    {
      label: "Training:",
      summary:
        "We offer training programs to empower communities to respond to the needs within their context; as well as build capacity among our volunteers, enabling them to efficiently respond to emergency situations.",
      body: "Favor Care organizes training as part of our capacity-building and to equip our volunteers to efficiently respond to the needs around us. Seminars, such as parenting, for instance, also address needs in the communities we are reaching. Also part of this are the conferences we organize for pastors and church leaders, to make them more effective in the task of Kingdom building.",
      slides: [
        {
          src: asset("/images/pages/what-we-do/training-1.png"),
          alt: "Training program",
        },
        {
          src: asset("/images/pages/what-we-do/training-2.jpg"),
          alt: "Training program",
        },
        {
          src: asset("/images/pages/what-we-do/training-3.png"),
          alt: "Training program",
        },
      ],
    },
    {
      label: "Partnership Resourcing:",
      summary:
        "We partner with other organizations for optimal resource sharing, which results in wider reach and greater impact in the communities.",
      body: "One organization cannot accomplish the task alone. This is why networking is very important. As much as Favor Care is blessed through the generosity of others, we are helping other like-minded organizations in terms of funding support, manpower resources and expertise so they too can accomplish their mandate.",
      slides: [
        {
          src: asset("/images/pages/what-we-do/partnership-resourcing-1.jpeg"),
          alt: "Partnership resourcing program",
        },
        {
          src: asset("/images/pages/what-we-do/partnership-resourcing-2.png"),
          alt: "Partnership resourcing program",
        },
        {
          src: asset("/images/pages/what-we-do/partnership-resourcing-3.jpg"),
          alt: "Partnership resourcing program",
        },
      ],
    },
  ],
  donate: {
    title: "Donate",
    body: "Your generosity can change lives. Every contribution helps create a brighter future.",
    cta: { label: "GIVE", href: "/givenow" },
  },
  takeAction: {
    title: "Take Action",
    body: "Join us in creating opportunities. Together, we can transform lives.",
    cta: { label: "GET INVOLVED", href: "/get-involved" },
  },
} satisfies {
  hero: { title: string; subtitle: string; image: string };
  programs: {
    label: string;
    summary: string;
    body: string;
    slides: { src: string; alt: string }[];
  }[];
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
    // The WP Mailchimp form's three labeled fields, verbatim.
    fields: [
      {
        name: "first-name",
        label: "FIRST NAME",
        placeholder: "First Name*",
        type: "text",
      },
      {
        name: "last-name",
        label: "LAST NAME",
        placeholder: "Last Name*",
        type: "text",
      },
      {
        name: "email",
        label: "EMAIL ADDRESS",
        placeholder: "Email*",
        type: "email",
        required: true,
      },
    ],
    cta: "SUBSCRIBE",
    // Email subject prefix for signups (followed by "— First Last").
    subject: "Carers Newsletter signup",
  },
  love: {
    // WP uses a straight apostrophe on this page (home uses curly).
    title: "We'd love to hear from you!",
    body: "Reach out to us for more information about our projects, to get involved, or to offer support. Together, we can make a difference.",
    email: "info@favorcare.org",
  },
  // Google Maps embed query from the WP widget address field.
  mapQuery: "Favor Church, EDSA Shangri-La, Mandaluyong City",
  // mailto composition for the contact forms (see components/mailto.ts):
  // the subject reads "<subjectPrefix> — First Last"; `labels` maps input
  // names to email-body labels in body order ("a+b" joins two inputs).
  form: {
    recipient: "info@favorcare.org",
    subjectPrefix: "Website contact",
    labels: {
      "first-name+last-name": "Name",
      email: "Email",
      phone: "Phone",
      newsletter: "Subscribed to the newsletter",
    },
  },
} satisfies {
  heroTitle: string;
  faqs: { q: string; a: string }[];
  newsletter: {
    title: string;
    fields: NewsletterField[];
    cta: string;
    subject: string;
  };
  love: { title: string; body: string; email: string };
  mapQuery: string;
  form: {
    recipient: string;
    subjectPrefix: string;
    labels: Record<string, string>;
  };
};

export const GIVENOW = {
  // Cloned from the WP `givenow` page (post 7122, staging = canonical) +
  // its giving templates. Links verbatim: PH online -> PayMongo portal,
  // US -> Zeffy (501c3), AU -> Global Development Group project J1158N.
  // WP quirks kept: on mobile the Tax-Deductible card renders ABOVE the
  // hero (it is the only desktop-set block without hide flags), the US
  // bank details differ per breakpoint (Chase on desktop, Bank of
  // America on mobile — flagged as content rot for stakeholder sign-off),
  // and the PH Give Online button reads "Open Portal" on desktop but
  // "Credit / Debit" on mobile.
  hero: {
    title: "Partner with Us by Giving",
    cta: { label: "GIVE NOW", href: "#give" },
    image: asset("/images/pages/give-now/hero.jpg"),
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
      // WP breaks this after the colon and uses an nbsp after "office,".
      payable: "Make checks payable to:\u00a0Favor Care Foundation Inc.",
      address:
        "Mail or drop it at the Favor Care office,\u00a0Level 6, East Wing, Shangril-La Plaza EDSA, Mandaluyong City",
    },
    online: {
      title: "Give Online",
      body: "Give easily through Maya, GrabPay, GCash via QRPH, or Online Banking.",
      cta: {
        label: "Open Portal",
        labelMobile: "Credit / Debit",
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
      // Email subject prefix (followed by "— <contact name>").
      subject: "Tax-deductible giving",
    },
  },
  us: {
    title: "United States (USD)",
    // WP renders this as two lines (a <br> after "Inc.,") with an nbsp
    // before the company name.
    body: "If you’re giving from the United States, you can send your donation through\u00a0Favor Foundation USA Inc.,",
    body2:
      "our registered 501(c)(3) nonprofit organization. All contributions made through Favor Foundation USA Inc. are tax-deductible to the extent permitted by law.",
    bankTransfer: {
      title: "Bank Transfer",
      bank: "JP Morgan Chase Bank",
      accountName: "Favor Foundation USA Inc.",
      accountNumber: "699 709 021",
      swift: "CHASSUS33",
      routing: "02100002",
    },
    // WP's mobile variant shows a different institution entirely.
    bankTransferMobile: {
      accountName: "Favor Foundation USA Inc.",
      accountNumber: "3251 3784 7345",
      achRouting: "121000358",
      bank: "Bank of America",
    },
    creditDebit: {
      label: "Credit / Debit",
      href: "https://www.zeffy.com/en-US/donation-form/bbd839f7-8d34-428c-891c-3b16fa35a374",
    },
  },
  au: {
    title: "Australia (AUD)",
    body: "Donate through Global Development Group",
    body2:
      "Click the\u00a0J1158N\u00a0(FAVOR FOUNDATION COMMUNITY DEVELOPMENT) under Credit Card Tab to Donate.",
    cta: {
      label: "Donate through Global Development Group",
      href: "https://globaldevelopmentgroup.org/Donate?projectNum=J1158N&projectName=Favor%20Foundation",
    },
  },
} satisfies {
  hero: { title: string; cta: Cta; image: string };
  howToGive: { title: string; subtitle: string };
  ph: {
    bankTransfer: {
      title: string;
      accountName: string;
      accountNumber: string;
      bank: string;
    };
    checks: { title: string; payable: string; address: string };
    online: {
      title: string;
      body: string;
      cta: { label: string; labelMobile: string; href: string };
    };
    taxDeductible: {
      title: string;
      intro: string;
      fields: string[];
      submit: string;
      recipient: string;
      subject: string;
    };
  };
  us: {
    title: string;
    body: string;
    body2: string;
    bankTransfer: {
      title: string;
      bank: string;
      accountName: string;
      accountNumber: string;
      swift: string;
      routing: string;
    };
    bankTransferMobile: {
      accountName: string;
      accountNumber: string;
      achRouting: string;
      bank: string;
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

/** Popup CTA — either a link, or a chain-opener for WP's nested popups. */
export type PopupCta = {
  label: string;
  href?: string;
  external?: boolean;
  /** Close this dialog and open the chained one instead of navigating. */
  opensChain?: boolean;
  /** Close this dialog without navigating (the /signup guidelines gate). */
  closesPopup?: boolean;
};

/** JSON-serializable body block for chained popup dialogs (island props
 *  must be plain data, so the guidelines doc travels as blocks). */
export type PopupBlock = {
  type: "p" | "h" | "ul";
  text?: string;
  items?: string[];
};

// Site-wide popups cloned from the WP elementor_library templates (live
// ids as of 2026-10-14: 1424-prayer-hub, 7281-accreditation,
// 7730-volunteer-disclaimer, 7737-volunteer-guidelines; 7660 is /givenow's
// tax-deductible form popup — Phase 4, mailto substitute). Copy is
// verbatim from the source, including its quirks.
//
// Accreditation (7281) auto-opens 3s after page load, once per browser
// session, on every WP page — mounted site-wide in routes/_app.tsx.
// Prayer Hub's only trigger ("JOIN THE PRAYER HUB") is hidden at every
// breakpoint on WP — storybook specimen only, no page trigger.
export const POPUPS = {
  prayerHub: {
    title: "PRAYER HUB",
    kicker: "Join us every Thursday, 7:00-7:15pm on Zoom",
    body: "The Prayer Hub is our regularly weekly 15-minute corporate prayer time to intercede for our programs and activities. We also take time for urgent calls to pray for those affected by disasters, both here and elsewhere in the world.",
    cta: {
      label: "PRAY WITH US",
      href: "https://us02web.zoom.us/j/9566304454",
      external: true,
    },
  },
  // Volunteer disclaimer (7730): the get-involved SERVE buttons open this;
  // its Review Guidelines button chains into the full guidelines doc.
  volunteer: {
    title: "Volunteer Commitment & Lifestyle Guidelines",
    body: "Before signing up to serve, please take the time to review our Volunteer Commitment and Lifestyle Guidelines to see how you are aligned to our values.",
    cta: { label: "REVIEW GUIDELINES", opensChain: true } satisfies PopupCta,
  },
  // The full guidelines doc (7737), verbatim including its structure; its
  // agree CTA links the on-site signup (/signup), which reopens these
  // guidelines as its gate popup before the form.
  volunteerGuidelines: {
    title: "Volunteer Commitment",
    blocks: [
      {
        type: "p",
        text: "At Favor Care, volunteering is more than simply filling a spot on a roster—it’s about contributing to something meaningful and helping create a positive environment for everyone involved. Each time we serve, we represent the values of this community both on and off the platform.",
      },
      {
        type: "p",
        text: "These Volunteer Commitment Guidelines are designed to help us build a safe, respectful, and supportive environment where people feel welcome, valued, and encouraged.",
      },
      {
        type: "p",
        text: "Please take a moment to read through these guidelines carefully. They are an important part of how we stay aligned, work well together, and serve effectively as a team.",
      },
      { type: "h", text: "Boundaries" },
      {
        type: "p",
        text: "To ensure a safe, respectful, and comfortable environment for everyone in our community, we observe the following boundaries and guidelines:",
      },
      {
        type: "ul",
        items: [
          "Please refrain from discussing personal financial matters within teams, including asking for or borrowing money.",
          "Respect the privacy of all members of the community—especially individuals who may be in public-facing roles—by avoiding requests for personal information, taking photos without permission, or approaching them in ways that may feel intrusive. These guidelines help us maintain a culture of professionalism, trust, and mutual respect within our teams.",
        ],
      },
      { type: "h", text: "Lifestyle Guidelines" },
      {
        type: "p",
        text: "Volunteering is a meaningful responsibility that reflects the values and culture of our community. We ask all volunteers to approach serving with integrity, humility, and a desire to positively influence those around them.",
      },
      {
        type: "p",
        text: "We recognize that everyone is on a personal journey of growth, and no one is expected to be perfect. At the same time, volunteering requires a level of personal responsibility and alignment with the standards we uphold as a community.",
      },
      {
        type: "p",
        text: "Because of this, individuals who are currently navigating significant personal challenges such as:",
      },
      {
        type: "ul",
        items: [
          "struggling with addictions (including but not limited to alcohol, smoking, drugs, pornography, or gambling),",
          "engaging in sex outside of marriage,",
          "living with someone they are not married to, or",
          "actively pursuing an LGBTQIA+ lifestyle or lifestyle choices that may conflict with the values and environment we aim to cultivate",
        ],
      },
      {
        type: "p",
        text: "may be encouraged to take time to focus on personal growth before stepping into a volunteer role.",
      },
      {
        type: "p",
        text: "Our heart is always to support people in their journey. If someone desires guidance, support, or accountability, our team is committed to walking alongside them and helping them move forward in a healthy and positive direction.",
      },
    ] satisfies PopupBlock[],
    cta: {
      label: "I AGREE, SIGN UP AS A VOLUNTEER",
      href: "/signup",
    } satisfies PopupCta,
  },
  accreditation: {
    title: "We’re officially PCNC and DSWD Accredited!",
    body: "Our accreditation affirms our commitment to transparency, integrity, and impact. Thank you for partnering with us as we serve communities with excellence.",
    cta: { label: "DONATE", href: "/givenow" } satisfies PopupCta,
  },
};

export const GET_INVOLVED = {
  // Cloned from the WP `get-involved` page (post 1840, staging = canonical):
  // photo hero, then three photo+card rows (black cards with side-only
  // radii, white pill buttons) separated by two full-width bands — the
  // first shows a photo from md up, the second is blank on WP (its
  // background never applies) and is cloned as an empty spacer.
  // Links verbatim: newsletter -> contact#newsletter (WP links per-
  // breakpoint anchors), volunteer -> the SERVE button opens the
  // volunteer-disclaimer popup (its guidelines agree-CTA links the live
  // Google Form signup — kept here as the signup destination), donate ->
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
      body: "Learn more about the latest on Favor Care when you sign up to receive our regular newsletter Favor Carers.",
      cta: { label: "SUBSCRIBE", href: "/contact#newsletter" },
      image: asset("/images/pages/get-involved/newsletter-aetas.jpg"),
    },
    {
      title: "Volunteer",
      body: "Sign up as a Favor Care volunteer for our Sunday services at Favor-CIW, community medical clinic and other programs and activities.",
      cta: {
        label: "SERVE",
        // Opens POPUPS.volunteer (the disclaimer) via the Popup island on
        // the page — the WP button is an elementor popup trigger, not a
        // link. Href kept as the on-site signup page the guidelines
        // agree-CTA points at.
        href: "/signup",
      },
      image: asset("/images/pages/get-involved/volunteer-repacking-rice.jpeg"),
    },
    {
      title: "Donate",
      body: "Your donation makes a world of difference. Every donation brings hope and creates opportunities for a better future.",
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
    cta: { label: string; href: string };
    image: string;
  }[];
  bandPhoto: string;
};

// /signup — the on-site volunteer application replacing the live Google
// Form ("Favor Care: Sign Up to Serve", scraped 2026-10-16). Copy and
// options are verbatim from the form, quirks included (lowercase "favor
// DNA", the italic consent sentence). `entries` maps each field to the
// form's formResponse entry id (read off FB_PUBLIC_LOAD_DATA_) —
// routes/signup.tsx forwards submissions there so responses keep landing
// in the volunteers' Google Sheet. Re-scrape if the form is ever rebuilt.
export const SIGNUP = {
  hero: {
    title: "Sign Up to Serve",
    subtitle:
      "We appreciate your desire to join Favor Care in serving those who are marginalized and under-resourced. We are excited to have you on board soon!",
    image: asset("/images/pages/get-involved/volunteer-repacking-rice.jpeg"),
  },
  reviewTrigger: "REVIEW THE VOLUNTEER COMMITMENT",
  gateCta: { label: "I AGREE, CONTINUE TO THE FORM" } satisfies PopupCta,
  success: {
    title: "Thank you for signing up to serve!",
    body: "We have received your volunteer application. Our team will be in touch with you soon — keep an eye on your inbox.",
    back: {
      label: "BACK TO GET INVOLVED",
      href: "/get-involved",
    } satisfies Cta,
  },
  requiredError:
    "Please fill in all required fields — the ones marked with an asterisk (*).",
  deliveryError:
    "Something went wrong sending your application. Please try again in a moment — if it keeps failing, email us directly.",
  options: {
    gender: ["Male", "Female"],
    attendance: [
      "Less than 3 months",
      "More than 3 months",
      "I've only attended online",
      "I'm not attending Favor Church",
    ],
    hearAbout: ["Social Media", "Website", "Friends/Colleagues"],
    serveAreas: [
      "Counseling",
      "Marketing",
      "Medical Doctors",
      "Nurses",
      "Pharmacists",
      "Fundraising Team",
      "Photographer",
      "Photo Editor",
      "Videographer",
      "Video Editor",
      "Project Management",
      "UI/UX Designer",
      "Software Developer",
      "Web Analytics",
      "Data Analytics",
      "Social Media Manager",
      "Copywriter",
      "Volunteer Care",
      "Digital Marketing",
      "Legal",
      "Logistics",
    ],
    yesNo: ["Yes", "No"],
  },
  privacyNotice: {
    summary: "Read the Data Privacy Notice",
    consentSentence:
      "By ticking AGREE, the participant acknowledges that he/she has read the Data Privacy Notice and consents that his/her personal data, including but not limited to their name, gender, telephone/mobile number and email address/es, as submitted by the participant shall be collected and processed by FAVOR CARE through attendance sheets, feedback forms, survey forms, photos, video/audio recordings, and other data collection and monitoring & evaluation tools for documentation purposes. This is in adherence to the Philippines Data Privacy Act of 2012, and Favor Care Data Privacy Policy.",
    // Verbatim from the form's notice section; \n line breaks in the
    // address are real lines (rendered with pre-line).
    blocks: [
      { type: "h", text: "Personal Information" },
      {
        type: "p",
        text: "We collect the personal information from you when you manually or electronically submit the following, but not limited to:",
      },
      {
        type: "ul",
        items: [
          "Full name",
          "Gender",
          "Email address",
          "Birthday",
          "Contact details (Mobile/Phone Number, Social Media Details)",
        ],
      },
      { type: "h", text: "Use" },
      {
        type: "p",
        text: "All information we collect shall be kept private and confidential by Favor Care Foundation, Inc. and shall be used solely for legal purposes as mandated by the Data Privacy Act and other relevant laws. Information that are matters of public interest, however, may be disclosed to the public subject to applicable laws, rules, and regulations. Pictures and videos taken during any official activity of Favor Church (such as sunday services, connect groups, family nights, presence nights, conferences, camps) may also be used in Favor Church’s social media and other promotional or publicity materials.",
      },
      { type: "h", text: "Protection Measures" },
      {
        type: "p",
        text: "Only authorized Favor Care personnel has access to these personal information, the exchange of which will be facilitated through email and hard copy. Storage shall be within a period as may be authorized by law. Physical records shall be disposed through shredding, while digital files shall be anonymized.",
      },
      { type: "h", text: "Contact us" },
      {
        type: "p",
        text: "You have the right to ask for a copy of any personal information we hold about you, as well as ask for correction. For data privacy concerns and/or feedback regarding this privacy notice, please fill out the Data Access, Alteration, and/or Complaint Form and file with the Data Protection Officer three (3) printed copies of the form enclosed in a sealed and labeled envelope (whether Access, Alteration, and/or Complaint). Kindly address it to:",
      },
      {
        type: "p",
        text: "Data Protection Officer\nFavor Care Inc.\nLevel 6 East Wing\nShangri-la Plaza\nEDSA, Mandaluyong City",
      },
      {
        type: "p",
        text: "Or you may send in portable document format (PDF) a copy of the form to dpo@favor.church.",
      },
      {
        type: "p",
        text: "Rest assured that Favor Care implements strict security controls to protect your personal information.",
      },
    ] satisfies PopupBlock[],
  },
  entries: {
    firstName: 165027535,
    lastName: 1837053616,
    gender: 1243779738,
    dob: 1397916356,
    email: 1782074696,
    phone: 1432549407,
    attendance: 1521051085,
    social: 1820962277,
    hearAbout: 722728129,
    serveAreas: 749935751,
    updates: 994780963,
    connectGroup: 536100418,
    dna: 818176156,
    consent: 787666323,
  },
} satisfies {
  hero: { title: string; subtitle: string; image: string };
  reviewTrigger: string;
  gateCta: PopupCta;
  success: { title: string; body: string; back: Cta };
  requiredError: string;
  deliveryError: string;
  options: {
    gender: string[];
    attendance: string[];
    hearAbout: string[];
    serveAreas: string[];
    yesNo: string[];
  };
  privacyNotice: {
    summary: string;
    consentSentence: string;
    blocks: PopupBlock[];
  };
  entries: Record<
    | "firstName"
    | "lastName"
    | "gender"
    | "dob"
    | "email"
    | "phone"
    | "attendance"
    | "social"
    | "hearAbout"
    | "serveAreas"
    | "updates"
    | "connectGroup"
    | "dna"
    | "consent",
    number
  >;
};

export const PRIVACY = {
  // Cloned verbatim from the WP privacy-policy page (reference text).
  // WP’s section headings carry a trailing zero-width space — kept.
  title: "Privacy Policy",
  blocks: [
    {
      p: "This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from favorcare.org (the “site”). Favor Legacy Foundation (“Favor Care”, “our foundation”, “we”) respects your right to privacy and confidentiality and gives utmost value to the security and confidentiality of your personal data and information. As a non-profit foundation in the Philippines, we are committed to following the general principles and rules of data privacy protection in the Philippines in compliance with Republic Act No. 10173 or the Data Privacy Act of 2012.",
    },
    { h: "What personal data we collect and why we collect it\u200b" },
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
    { h: "Media and Uploads\u200b" },
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
    { h: "Embedded Content\u200b" },
    {
      p: "Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.",
    },
    {
      p: "These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.",
    },
    { h: "Security Policy\u200b" },
    {
      p: "The Favor Legacy Foundation online donation system uses an advanced encryption technology provided by Secure Sockets Layer (SSL), a recognized authentication and encryption software, which means that the site encrypts all of your personal information and card details so that it is unreadable to anyone outside of the transaction process.",
    },
    { h: "Third-party Payment Gateway\u200b" },
    {
      p: "Credit card and e-wallet payments made through the Favor Church site are processed through a secure third-party payment gateway provided by Paymongo. You may view Paymongo’s privacy policy for information on what personal data is collected and retained through your transaction.",
    },
    { h: "Data Access\u200b" },
    {
      p: "We recognize the sensitive and confidential nature of the personal data under the custody of the company and ensure that only authorized Favor Care staff shall be allowed to access such personal data, for the purposes stated in the sections above.",
    },
    { h: "Access and Correction\u200b" },
    {
      p: "You have the right to ask for a copy of any personal information we hold about you, as well as to ask for it to be corrected if you think it is wrong. To do so, please contact our Data Protection Officer, Eucel Maximo, through the following email address: info@favorcare.org.",
    },
    { h: "Governing Law" },
    {
      p: "Disputes relating to the use of the websites’ data collection activities and the interpretation of these Terms and Conditions are subject to the laws of the Republic of the Philippines, and any dispute shall be brought before the courts of Mandaluyong City, Philippines, where Favor Legacy Foundation is officially registered and located.",
    },
    { h: "What Rights Do I Have Over My Data?\u200b" },
    {
      p: "If you have made a purchase through this site, or have left comments or messages, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.",
    },
    { h: "Our Rights\u200b" },
    {
      p: "We reserve the right to modify this privacy policy at any time. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.",
    },
  ],
} satisfies { title: string; blocks: ({ h: string } | { p: string })[] };

// --- Footer / site chrome ----------------------------------------------------

export interface SocialLink {
  label: string;
  href: string;
  /** Key into `components/icons.tsx` (`BrandIcon` names, or "mail"). */
  icon: "facebook" | "instagram" | "youtube" | "mail";
}

/** Social + email links shown in the footer icon row. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://facebook.com/favorcare.ph",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/favor.care.ph",
    icon: "instagram",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@FavorCarePH",
    icon: "youtube",
  },
  {
    label: "Email",
    href: "mailto:info@favorcare.org",
    icon: "mail",
  },
];

// Brand voice — transcribed verbatim from BRAND.md for the /storybook
// brand group (markdown emphasis stripped). BRAND.md stays the source of
// truth; storybook_test.ts fails if a string here stops matching it.
export const BRAND = {
  identity: [
    { term: "Tone", value: "raw, authentic, hopeful" },
    { term: "Style", value: "straight to the point — less fluff, more story" },
    {
      term: "Core message",
      value: "Every story matters. Every act of compassion makes an impact.",
    },
  ],
  storytelling: [
    {
      title: "Raw & honest",
      body: "show the real struggles without sugarcoating.",
    },
    {
      title: "Hope-focused",
      body: "always balance the hardship with a message of dignity and hope.",
    },
    {
      title: "Straight to the point",
      body: "keep captions and videos short, powerful, and action-driven.",
    },
    {
      title: "Impact-oriented",
      body: "highlight not just the need, but the change happening because of generosity.",
    },
  ],
  arc: [
    { beat: "Here's the reality", body: "the raw moment." },
    { beat: "Here's the hope", body: "how lives are changing." },
    {
      beat: "Here's how you can help",
      body: "one clear call to action: donate, partner, volunteer.",
    },
  ],
  captionExamples: [
    "This is Maria. Today, she received her first medical check-up in years.",
    "Your giving makes this possible. Join us in reaching more lives.",
  ],
  ctaExamples: [
    "Help us reach more children like Ana.",
    "Together, we can give hope where it's needed most.",
  ],
  rules: [
    "Never invent people, quotes, or numbers.",
    "Keep the arc: reality → hope → ask.",
    "Short beats smooth.",
  ],
} satisfies {
  identity: { term: string; value: string }[];
  storytelling: { title: string; body: string }[];
  arc: { beat: string; body: string }[];
  captionExamples: string[];
  ctaExamples: string[];
  rules: string[];
};
