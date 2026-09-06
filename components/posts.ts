// Favor Care posts — real copy lifted from favorcare.org (WordPress source).
// Single source of truth for the /posts listing and each /posts/<slug> page,
// mirroring the data-vs-presentation split used by content.ts / navigation.ts.

export interface CalloutCta {
  label: string;
  href: string;
}

// A minimal, reusable article-block model. Paragraphs render at reading size;
// callouts are the inline pull-quote CTAs lifted from the source posts.
export type PostBlock =
  | { type: "paragraph"; text: string; emphases?: string[] }
  | {
    type: "callout";
    heading: string;
    body: string;
    cta: CalloutCta;
    /** primary = gold (donate); secondary = outlined (volunteer). */
    ctaVariant?: "primary" | "secondary";
  };

export interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  /** ISO date (YYYY-MM-DD) — also used for sort order + <time datetime>. */
  date: string;
  readingTime: string;
  category: string;
  /** Hotlinked from favorcare.org per the chosen image strategy. */
  cover: string;
  coverAlt: string;
  body: PostBlock[];
}

export const POSTS: Post[] = [
  {
    slug: "every-child-matters-bringing-health-and-care-to-antipolo",
    title: "Every Child Matters: Bringing Health and Care to Antipolo",
    description:
      "Favor Care partnered with Rapha International Christian Ministries for a clinic day bringing health checks, dental care, and compassion to the children in their care.",
    author: "Aeriel Cruz",
    date: "2026-07-07",
    readingTime: "10 min read",
    category: "Community Health",
    cover: "https://favorcare.org/wp-content/uploads/2026/06/team.jpg",
    coverAlt:
      "Favor Care volunteers and team gathered on the Rapha International clinic day.",
    body: [
      {
        type: "paragraph",
        text:
          "The spirit of collaboration was on full display during Favor Care’s visit to Rapha International Christian Ministries. The clinic day had a clear and heartfelt purpose: to check on the health and well-being of the children under Rapha’s care, ensuring they were thriving, catching any concerns early, and providing the support they needed to stay healthy.",
      },
      {
        type: "paragraph",
        text:
          "The work began long before the first child arrived. Volunteers gathered early to prepare the venue, set up the registration and consultation areas, organize medical supplies, and ensure everything was ready to welcome the children. What might have looked like simple preparation became meaningful acts of service that laid the groundwork for the day ahead.",
      },
      {
        type: "paragraph",
        text:
          "As the children arrived, volunteers greeted them warmly and guided them through each step of the clinic. Some assisted with registration, while others recorded vital signs such as height, weight, and blood pressure. Medical professionals then conducted consultations and basic health assessments, carefully evaluating each child’s overall condition and offering recommendations whenever follow-up care was needed.",
      },
      {
        type: "callout",
        heading: "Your time and presence can transform a child’s day.",
        body:
          "Join Favor Care as a volunteer and become part of a mission that brings health, hope, and compassion to children and communities in need.",
        cta: { label: "Become a volunteer", href: "/#involved" },
        ctaVariant: "secondary",
      },
      {
        type: "paragraph",
        text:
          "A key part of the clinic was the dental check-up, where children received oral health assessments and learned the importance of caring for their teeth. For those who needed treatment, medications were provided to address common health concerns. Every consultation completed, every vital sign recorded, and every medicine distributed reflected a shared commitment to caring for the whole child: not only their physical health, but also their sense of being valued and loved.",
      },
      {
        type: "paragraph",
        text:
          "Beyond the medical services, the clinic day created opportunities for connection. Volunteers spent time with the children, sharing smiles, conversations, and encouragement throughout the day. These simple moments helped build a warm and welcoming environment where the children felt comfortable and cared for.",
      },
      {
        type: "paragraph",
        text:
          "The initiative also highlighted the importance of preventive healthcare, especially for children. Regular health monitoring allows potential concerns to be identified early and addressed before they become more serious. By bringing healthcare services directly to the community, Favor Care and Rapha International Christian Ministries helped make these essential services more accessible to the children they serve.",
      },
      {
        type: "paragraph",
        text:
          "More than a one-day event, the clinic reflected the power of partnership in action. It showed how organizations can come together, combine their strengths, and create lasting impact in the lives of others. Through shared resources, compassionate service, and a common mission to serve, Favor Care and Rapha International Christian Ministries continue to make a difference one child, one family, and one community at a time.",
      },
      {
        type: "paragraph",
        text:
          "As the day came to an end and the clinic stations were packed away, the impact remained. What took place at Rapha was more than a series of medical check-ups. It was a tangible expression of care, compassion, and hope. Through every helping hand, every act of service, and every smile shared, the children were reminded that they are seen, valued, and deeply loved.",
      },
      {
        type: "callout",
        heading:
          "A single gift can mean a healthier, happier future for a child.",
        body:
          "Support Favor Care’s outreach and help ensure no child goes without the care they deserve.",
        cta: { label: "Donate now", href: "/#donate" },
        ctaVariant: "primary",
      },
    ],
  },
  {
    slug: "free-medical-outreach-in-tondo-manila",
    title: "Free Medical Outreach in Tondo, Manila",
    description:
      "Favor Care partnered with Kalayaan Community Ministries for a free medical outreach in Tondo, serving 200+ residents with check-ups, dental care, and prayer.",
    author: "Aeriel Cruz",
    date: "2026-06-10",
    readingTime: "10 min read",
    category: "Community Health",
    cover:
      "https://favorcare.org/wp-content/uploads/2026/07/Untitled-design-5.png",
    coverAlt:
      "A scene from Favor Care’s free medical outreach with Kalayaan Community Ministries in Tondo, Manila.",
    body: [
      {
        type: "paragraph",
        text:
          "Think about how your mornings usually go. You wake up in a comfortable bed. You get to decide whether to sit down to a full breakfast or skip it for a quick coffee and pastry on the way to school or work. It’s mundane. Routine. The kind of everyday we’ve grown so used to that we hardly notice it.",
      },
      {
        type: "paragraph",
        text:
          "But for a small community in Tondo, Manila, one of the many families who live in and around the area’s dumpsites, the everyday looks very different. Their mornings are streets lined with the neighborhood’s trash, the rumble of trucks unloading the day’s collection, and the heavy smell that hovers over all of it. To them, this is simply normal. Especially for the children, born into such circumstances.",
      },
      {
        type: "paragraph",
        text:
          "And yet, in the heart of this underserved community, there is a haven.",
      },
      {
        type: "paragraph",
        emphases: ["Kalayaan Community Ministries"],
        text:
          "It’s called Kalayaan Community Ministries. Founded by Ron and Joanna Domingo, KCM has served the recycling community of the Tondo dumpsite and the families around it for years. We partnered with them for the free medical outreach. It’s open not only to the members of their organization, but to every resident in the area.",
      },
      {
        type: "paragraph",
        text:
          "Kristine, a KCM staff member and a licensed nurse, told us that while their local church runs its own medical drives, they still lack the resources to provide more medicine and dental care for the people they serve. From the very start of our planning, the KCM team gave us nothing but excitement and support.",
      },
      {
        type: "paragraph",
        text:
          "We have to say it: they have a lovely community. Their area was even large enough for us to bring in more than 40 volunteers, both medical and non-medical. Our team set up stations for pharmacy, nurse check-ups, doctor consultations, and dental care. And because our goal is to help not just each patient’s physical needs, we stationed our prayer team at the very end of the triage. We know the residents are used to this life, but the daily fight for survival and decent healthcare is hard. While we can’t dramatically change their circumstances, we can offer comfort through prayer.",
      },
      {
        type: "callout",
        heading: "Your skills and your presence can change a family’s day.",
        body:
          "Join Favor Care as a volunteer and help bring health, hope, and compassion to the communities that need it most.",
        cta: { label: "Become a volunteer", href: "/#involved" },
        ctaVariant: "secondary",
      },
      {
        type: "paragraph",
        text:
          "From the first patient to the last one of the day, outreaches like this always leave a bittersweet feeling. We are grateful to have the resources, the team, and the capacity to help communities like this one. But it’s just as heartbreaking to hear how often residents skip routine check-ups simply because scraping together the money for a clinic visit is so difficult. Many don’t know how or even have the awareness needed to apply for medical assistance. They line up at health centers from the crack of dawn until late afternoon just to be seen. And most often, only once an illness has already taken hold.",
      },
      {
        type: "paragraph",
        text:
          "For most of us, a clinic visit is a box to tick for work. A hospital stay means recovery. Medicine means getting better, faster. But for them, these are simply expenses they can’t afford.",
      },
      {
        type: "paragraph",
        text:
          "It’s frustrating to witness their situation, but it’s also humbling to see how openly they welcome the help offered to them. We never once felt shut out. There was no hostility. These were simply people hoping to find out whether they qualified for the care we came to give. And it was often the smallest things — a smile, a hand to guide them to the venue — that made their faces light up, as they realized this was open to anyone who needed it.",
      },
      {
        type: "paragraph",
        text:
          "We saw the elderly. We saw the mothers who brought their children. We saw the bright, hopeful smiles of little ones who still have their whole lives ahead of them. That is why we hope to return to this area again and again, and do even more than we did this time. We can dream bigger, because the people of Tondo deserve it.",
      },
      {
        type: "callout",
        heading: "Help us make that dream a reality.",
        body:
          "If you are a licensed medical professional, we need you. We want to bring more help and more medicine to more communities. Help us make that happen.",
        cta: { label: "Become a volunteer", href: "/#involved" },
        ctaVariant: "secondary",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

// Newest-first ordering for the /posts listing.
export function listPosts(): Post[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

// Format an ISO date as "July 7, 2026" without UTC timezone drift.
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
