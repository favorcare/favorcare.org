// Favor Care posts — real copy lifted from favorcare.org (WordPress source).
// Single source of truth for the /posts listing and each /posts/<slug> page,
// mirroring the data-vs-presentation split used by content.ts / navigation.ts.

import { asset } from "../utils/assets.ts";

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
  /** ISO date (YYYY-MM-DD) — also used for sort order + <time datetime>. */
  date: string;
  tag: string;
  /** Local static asset path; null when the source post has no cover. */
  cover: string | null;
  coverAlt: string;
  body: PostBlock[];
}

export const POSTS: Post[] = [
  {
    slug: "five-arms-of-favor-care",
    title: "The Five Arms of Favor Care: How CARES Serves Communities",
    description:
      "Meet CARES: the five arms of Favor Care serving communities through medical outreach, education, disaster relief, and second chances. Give or volunteer today.",
    date: "2026-10-08",
    tag: "Medical Missions",
    cover: null,
    coverAlt: "",
    body: [
      {
        type: "paragraph",
        text:
          "For Favor Care, that choice takes many shapes. It can mean bringing a doctor to a community that has none. Walking with someone preparing to leave prison. Showing up fast when disaster hits. Opening a classroom door for a child. Or building something a community will use for years.",
      },
      {
        type: "paragraph",
        text:
          "Five efforts. One purpose. Together they form CARES : C ommunity Engagement, A ssistance to Persons Deprived of Liberty, R elief and Response, E ducation, and S pecial Projects.",
      },
      {
        type: "paragraph",
        text:
          "These are the five arms of Favor Care — the framework for how it serves communities in ways that are practical, meaningful, and built to last.",
      },
      {
        type: "paragraph",
        text: "Every arm of CARES is already at work in real communities.",
      },
      {
        type: "paragraph",
        text:
          "Favor Care starts from a simple belief: care should respond to the whole person, not just the need in front of them.",
      },
      {
        type: "paragraph",
        text:
          "A medical outreach can hand a patient medicine and attention. But real care asks more. Why is this person sick? What else do they need? How do we keep serving this community after today?",
      },
      {
        type: "paragraph",
        text:
          "That is the holistic approach Favor Care is building. As Pastor Belle shared, the goal is to move toward care that is comprehensive — care that meets needs fully, not one at a time.",
      },
      {
        type: "paragraph",
        text: "You can see that vision in all five arms.",
      },
      {
        type: "paragraph",
        text:
          "Community Engagement is about presence: building real relationships with the people Favor Care serves.",
      },
      {
        type: "paragraph",
        text:
          "Through outreach and community programs, Favor Care comes to understand needs firsthand — and responds in practical ways. Medical outreach is one example, with healthcare professionals and volunteers serving families while connecting with them directly.",
      },
      {
        type: "paragraph",
        text:
          "But the work doesn't end when the outreach does. The goal is a lasting relationship, and a clearer sense of how Favor Care can keep contributing to a community's well-being.",
      },
      {
        type: "paragraph",
        text: "Showing up matters. Showing up with intention matters more.",
      },
      {
        type: "paragraph",
        text: "Some people are easy to overlook. Favor Care chooses not to.",
      },
      {
        type: "paragraph",
        text:
          "Its work with Persons Deprived of Liberty (PDLs) extends care and dignity to people regardless of their past. That includes programs inside correctional facilities — and support for the harder chapter that comes after: coming home.",
      },
      {
        type: "paragraph",
        text:
          "Favor Care is exploring ways to help people reintegrate and rebuild. Because care shouldn't stop the moment an immediate need is met. It should ask what happens next.",
      },
      {
        type: "paragraph",
        text:
          "Through restoration and second chances, Favor Care hopes to help people move forward — and take a meaningful place in their communities again.",
      },
      {
        type: "paragraph",
        text: "When disaster strikes, communities can't afford to wait.",
      },
      {
        type: "paragraph",
        text:
          "Favor Care's Relief and Response arm delivers timely help to people hit by disasters and emergencies — from relief goods to on-the-ground support, moving resources and people where they're needed most.",
      },
      {
        type: "paragraph",
        text:
          "But good response takes more than good intentions. It takes preparation. Favor Care is strengthening the systems, volunteers, and infrastructure that make fast, sustainable help possible — including plans for a dedicated warehouse of pre-packed relief goods, so aid can move the moment crisis hits.",
      },
      {
        type: "paragraph",
        text: "Favor Care believes a classroom can change a life.",
      },
      {
        type: "paragraph",
        text:
          "Through its Education arm, it creates opportunities for children and communities with little access to learning. One of those is Redemptio Christian School in Barangay San Juan, Taytay, Rizal — where preschoolers living along the floodway receive free books, uniforms, and materials. Their families' health is cared for too, through a community medical clinic. Because a child who is healthy and supported is a child truly ready to learn.",
      },
      {
        type: "paragraph",
        text:
          "The aim isn't only to help today. It's to open doors that stay open — giving children the knowledge, skills, and confidence to build better futures, for themselves and the people around them.",
      },
      {
        type: "paragraph",
        text:
          "Because when one child gets the chance to learn, everyone around them grows too.",
      },
      {
        type: "paragraph",
        text:
          "Redemptio Christian School serves 185 students today. With more classrooms, it can reach over 500 children who would otherwise have no access to education.",
      },
      {
        type: "paragraph",
        text: "Not every need fits neatly into a program.",
      },
      {
        type: "paragraph",
        text:
          "Special Projects gives Favor Care room to respond to the specific and the long-term — community development, construction and infrastructure, and other efforts built to create lasting value. It's also where Favor Care works with partners who bring resources and expertise that stretch what's possible.",
      },
      {
        type: "paragraph",
        text:
          "Instead of treating every community the same, Special Projects asks a better question: What does this community actually need — and what can we build together to meet it?",
      },
      {
        type: "paragraph",
        text: "Favor Care knows this work can't be done alone.",
      },
      {
        type: "paragraph",
        text:
          "Volunteers, donors, professionals, organizations, community partners — each one makes the work possible. Partnership isn't just a way to gather resources. It's a way to combine strengths, skills, and perspectives into something bigger.",
      },
      {
        type: "paragraph",
        text:
          "As Favor Care grows, stronger partnerships — and meaningful ways for volunteers to use their skills — will be key to lasting impact. The goal isn't only people who support the work. It's people who become part of it.",
      },
      {
        type: "paragraph",
        text:
          "CARES gives the work a structure. But behind every arm are people.",
      },
      {
        type: "paragraph",
        text:
          "A patient who finally sees a doctor. A family standing again after disaster. A child with a school to walk to. A person preparing to come home. A community with something that will serve it for years.",
      },
      {
        type: "paragraph",
        text:
          "These are the stories behind the numbers. And as Favor Care grows, it's learning to tell both — because numbers show reach, but stories show meaning.",
      },
      {
        type: "paragraph",
        text:
          "The vision isn't simply more programs. It's the capacity to care better — more sustainably, more completely.",
      },
      {
        type: "paragraph",
        text:
          "That means strengthening the five arms, deepening partnerships, growing its volunteers, investing in real infrastructure, and staying ready to meet needs as they change.",
      },
      {
        type: "paragraph",
        text: "At the center of it all is one simple principle: people matter.",
      },
      {
        type: "paragraph",
        text:
          "Five arms. Many forms. One purpose — to care today, and build for tomorrow.",
      },
      {
        type: "paragraph",
        text:
          "There are many ways to care. Favor Care brings them together through CARES.",
      },
      {
        type: "paragraph",
        text:
          "Care is something we can all contribute to. Give, volunteer your time and skills, or partner with Favor Care to help expand its reach.",
      },
    ],
  },

  {
    slug: "every-child-matters-bringing-health-and-care-to-antipolo",
    title: "Every Child Matters: Bringing Health and Care to Antipolo",
    description:
      "Favor Care partnered with Rapha International Christian Ministries for a clinic day bringing health checks, dental care, and compassion to the children in their care.",
    date: "2026-07-07",
    tag: "Kalayaan Community Ministries",
    cover: asset("/images/posts/antipolo-team.jpg"),
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
        cta: { label: "Become a volunteer", href: "/get-involved" },
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
        cta: { label: "Donate now", href: "/givenow" },
        ctaVariant: "primary",
      },
    ],
  },
  {
    slug: "seen-valued-and-cared-for-our-medical-outreach-in-tondo-manila",
    title: "Free Medical Outreach in Tondo, Manila",
    description:
      "Favor Care partnered with Kalayaan Community Ministries for a free medical outreach in Tondo, serving 200+ residents with check-ups, dental care, and prayer.",
    date: "2026-06-10",
    tag: "Rapha International Christian Ministries",
    cover: asset("/images/posts/tondo-outreach.png"),
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
        cta: { label: "Become a volunteer", href: "/get-involved" },
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
        cta: { label: "Become a volunteer", href: "/get-involved" },
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
