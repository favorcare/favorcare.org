// Favor Care posts — cloned verbatim from the WP `posts` on staging
// (posts 7812 five-arms, 7637 antipolo, 7765 tondo; staging = canonical).
// Each post is a full Elementor article: photo hero with a two-line title,
// then an alternating flow of pull-quotes / paragraph runs / photo
// galleries / gray CTA cards (WP's `articleContentAdBreak`: #f5f5f5,
// radius 12, centered, yellow pill buttons). Geometry follows the
// measured WP layout at 360/768/1280; the block model below mirrors the
// source container order (Quote / Text N / Images / Ad Break N / About).
// Tag fixes vs the earlier content clone: tondo = Kalayaan Community
// Ministries, antipolo = Rapha International (they were swapped), and
// tondo's title was wrong.

import { asset } from "../utils/assets.ts";

export type ArticleCtaPart =
  | { kind: "text"; text: string }
  | { kind: "button"; label: string; href: string };

export type ArticleBlock =
  | {
    /** Pull-quote; WP renders selected ones in the article yellow #F2B705. */
    type: "quote";
    text: string;
    yellow?: boolean;
  }
  | { type: "heading"; text: string }
  | { type: "text"; paragraphs: string[] }
  | { type: "gallery"; images: string[] }
  | { type: "cta"; heading: string; parts: ArticleCtaPart[] };

export interface Post {
  slug: string;
  /** WP post_title — the archive card + <title> text. */
  title: string;
  /** The article hero renders the title as two measured lines. */
  heroLines: [string, string];
  description: string;
  /** ISO date (YYYY-MM-DD) — sort order only; WP shows no dates. */
  date: string;
  tag: string;
  /** Hero photo = archive card cover (WP reuses the same image). */
  hero: string;
  heroAlt: string;
  blocks: ArticleBlock[];
}

export const POSTS: Post[] = [
  {
    slug: "five-arms-of-favor-care",
    title: "The Five Arms of Favor Care: How CARES Serves Communities",
    heroLines: [
      "The Five Arms of Care:",
      "How Favor Care Serves Whole Communities",
    ],
    description:
      "Meet CARES: the five arms of Favor Care serving communities through medical outreach, education, disaster relief, and second chances. Give or volunteer today.",
    date: "2026-10-08",
    tag: "Medical Missions",
    hero: asset("/images/posts/five-arms-hero.jpg"),
    heroAlt: "Hands holding a paper-cutout family",
    blocks: [
      {
        type: "quote",
        text:
          "Care begins with seeing a need — and choosing to do something about it.",
        yellow: false,
      },
      {
        type: "text",
        paragraphs: [
          "For Favor Care, that choice takes many shapes. It can mean bringing a doctor to a community that has none. Walking with someone preparing to leave prison. Showing up fast when disaster hits. Opening a classroom door for a child. Or building something a community will use for years.",
          "Five efforts. One purpose. Together they form CARES: Community Engagement, Assistance to Persons Deprived of Liberty, Relief and Response, Education, and Special Projects.",
          "These are the five arms of Favor Care — the framework for how it serves communities in ways that are practical, meaningful, and built to last.",
        ],
      },
      {
        type: "cta",
        heading: "More Than a Single Outreach",
        parts: [
          {
            kind: "text",
            text: "Every arm of CARES is already at work in real communities.",
          },
          { kind: "button", label: "EXPLORE WHAT WE DO", href: "/what-we-do" },
        ],
      },
      {
        type: "text",
        paragraphs: [
          "Favor Care starts from a simple belief: care should respond to the whole person, not just the need in front of them.",
          "A medical outreach can hand a patient medicine and attention. But real care asks more. Why is this person sick? What else do they need? How do we keep serving this community after today?",
          "That is the holistic approach Favor Care is building. As Pastor Belle shared, the goal is to move toward care that is comprehensive — care that meets needs fully, not one at a time.",
          "You can see that vision in all five arms.",
        ],
      },
      {
        type: "quote",
        text: "Community Engagement — Showing Up With Intention",
        yellow: false,
      },
      {
        type: "gallery",
        images: [
          asset("/images/posts/five-arms/9.png"),
          asset("/images/posts/five-arms/8.png"),
          asset("/images/posts/five-arms/5.png"),
        ],
      },
      {
        type: "text",
        paragraphs: [
          "Community Engagement is about presence: building real relationships with the people Favor Care serves.",
          "Through outreach and community programs, Favor Care comes to understand needs firsthand — and responds in practical ways. Medical outreach is one example, with healthcare professionals and volunteers serving families while connecting with them directly.",
          "But the work doesn’t end when the outreach does. The goal is a lasting relationship, and a clearer sense of how Favor Care can keep contributing to a community’s well-being.",
          "Showing up matters. Showing up with intention matters more.",
        ],
      },
      {
        type: "quote",
        text:
          "Assistance to Persons Deprived of Liberty — Care Without Conditions",
        yellow: false,
      },
      {
        type: "gallery",
        images: [
          asset("/images/posts/five-arms/21.png"),
          asset("/images/posts/five-arms/17.png"),
          asset("/images/posts/five-arms/22.png"),
        ],
      },
      {
        type: "text",
        paragraphs: [
          "Some people are easy to overlook. Favor Care chooses not to.",
          "Its work with Persons Deprived of Liberty (PDLs) extends care and dignity to people regardless of their past. That includes programs inside correctional facilities — and support for the harder chapter that comes after: coming home.",
          "Favor Care is exploring ways to help people reintegrate and rebuild. Because care shouldn’t stop the moment an immediate need is met. It should ask what happens next.",
          "Through restoration and second chances, Favor Care hopes to help people move forward — and take a meaningful place in their communities again.",
        ],
      },
      {
        type: "quote",
        text: "Relief and Response — When Waiting Isn't an Option",
        yellow: false,
      },
      {
        type: "gallery",
        images: [
          asset("/images/posts/five-arms/14.png"),
          asset("/images/posts/five-arms/25.png"),
          asset("/images/posts/five-arms/12.png"),
        ],
      },
      {
        type: "text",
        paragraphs: [
          "When disaster strikes, communities can’t afford to wait.",
          "Favor Care’s Relief and Response arm delivers timely help to people hit by disasters and emergencies — from relief goods to on-the-ground support, moving resources and people where they’re needed most.",
          "But good response takes more than good intentions. It takes preparation. Favor Care is strengthening the systems, volunteers, and infrastructure that make fast, sustainable help possible — including plans for a dedicated warehouse of pre-packed relief goods, so aid can move the moment crisis hits.",
        ],
      },
      {
        type: "quote",
        text: "Education — Opening Doors That Stay Open",
        yellow: false,
      },
      {
        type: "gallery",
        images: [
          asset("/images/posts/five-arms/6.png"),
          asset("/images/posts/five-arms/7.png"),
          asset("/images/posts/five-arms/11.png"),
        ],
      },
      {
        type: "text",
        paragraphs: [
          "Favor Care believes a classroom can change a life.",
          "Through its Education arm, it creates opportunities for children and communities with little access to learning. One of those is Redemptio Christian School in Barangay San Juan, Taytay, Rizal — where preschoolers living along the floodway receive free books, uniforms, and materials. Their families’ health is cared for too, through a community medical clinic. Because a child who is healthy and supported is a child truly ready to learn.",
          "The aim isn’t only to help today. It’s to open doors that stay open — giving children the knowledge, skills, and confidence to build better futures, for themselves and the people around them.",
          "Because when one child gets the chance to learn, everyone around them grows too.",
        ],
      },
      {
        type: "cta",
        heading: "Give a child a place to learn.",
        parts: [
          {
            kind: "text",
            text:
              "Redemptio Christian School serves 185 students today. With more classrooms, it can reach over 500 children who would otherwise have no access to education.",
          },
          { kind: "button", label: "DONATE NOW", href: "/givenow" },
        ],
      },
      {
        type: "quote",
        text: "Special Projects — Meeting the Needs No Program Predicted",
        yellow: false,
      },
      {
        type: "gallery",
        images: [
          asset("/images/posts/five-arms/16.png"),
          asset("/images/posts/five-arms/20.png"),
          asset("/images/posts/five-arms/19.png"),
        ],
      },
      {
        type: "text",
        paragraphs: [
          "Not every need fits neatly into a program.",
          "Special Projects gives Favor Care room to respond to the specific and the long-term — community development, construction and infrastructure, and other efforts built to create lasting value. It’s also where Favor Care works with partners who bring resources and expertise that stretch what’s possible.",
          "Instead of treating every community the same, Special Projects asks a better question: What does this community actually need — and what can we build together to meet it?",
        ],
      },
      { type: "quote", text: "Built on Partnership", yellow: false },
      {
        type: "gallery",
        images: [
          asset("/images/posts/five-arms/27.png"),
          asset("/images/posts/five-arms/28.png"),
          asset("/images/posts/five-arms/29.png"),
        ],
      },
      {
        type: "text",
        paragraphs: [
          "Favor Care knows this work can’t be done alone.",
          "Volunteers, donors, professionals, organizations, community partners — each one makes the work possible. Partnership isn’t just a way to gather resources. It’s a way to combine strengths, skills, and perspectives into something bigger.",
          "As Favor Care grows, stronger partnerships — and meaningful ways for volunteers to use their skills — will be key to lasting impact. The goal isn’t only people who support the work. It’s people who become part of it.",
        ],
      },
      { type: "quote", text: "From Service to Lasting Impact", yellow: false },
      {
        type: "text",
        paragraphs: [
          "CARES gives the work a structure. But behind every arm are people.",
          "A patient who finally sees a doctor. A family standing again after disaster. A child with a school to walk to. A person preparing to come home. A community with something that will serve it for years.",
          "These are the stories behind the numbers. And as Favor Care grows, it’s learning to tell both — because numbers show reach, but stories show meaning.",
        ],
      },
      { type: "quote", text: "Looking Ahead", yellow: false },
      {
        type: "text",
        paragraphs: [
          "The vision isn’t simply more programs. It’s the capacity to care better — more sustainably, more completely.",
          "That means strengthening the five arms, deepening partnerships, growing its volunteers, investing in real infrastructure, and staying ready to meet needs as they change.",
          "At the center of it all is one simple principle: people matter.",
          "Five arms. Many forms. One purpose — to care today, and build for tomorrow.",
          "There are many ways to care. Favor Care brings them together through CARES.",
        ],
      },
      {
        type: "cta",
        heading: "Be part of the work.",
        parts: [
          {
            kind: "text",
            text:
              "Care is something we can all contribute to. Give, volunteer your time and skills, or partner with Favor Care to help expand its reach.",
          },
          { kind: "button", label: "GET INVOLVED", href: "/get-involved" },
          { kind: "button", label: "DONATE", href: "/givenow" },
        ],
      },
    ],
  },
  {
    slug: "every-child-matters-bringing-health-and-care-to-antipolo",
    title: "Every Child Matters: Bringing Health and Care to Antipolo",
    heroLines: ["Every Child Matters:", "Bringing Health and Care to Antipolo"],
    description:
      "Favor Care partnered with Rapha International Christian Ministries for a clinic day bringing health checks, dental care, and compassion to the children in their care.",
    date: "2026-07-07",
    tag: "Rapha International Christian Ministries",
    hero: asset("/images/posts/antipolo-hero.jpg"),
    heroAlt: "Children at the Rapha International clinic day in Antipolo",
    blocks: [
      {
        type: "quote",
        text: "Healthcare is more than treating illness.",
        yellow: false,
      },
      {
        type: "quote",
        text:
          "It is about caring for people, building relationships, and ensuring that communities have access to the support they need.",
        yellow: false,
      },
      {
        type: "text",
        paragraphs: [
          "The spirit of collaboration was on full display during Favor Care’s visit to Rapha International Christian Ministries. The clinic day had a clear and heartfelt purpose: to check on the health and well-being of the children under Rapha’s care, ensuring they were thriving, catching any concerns early, and providing the support they needed to stay healthy.",
          "The work began long before the first child arrived. Volunteers gathered early to prepare the venue, set up the registration and consultation areas, organize medical supplies, and ensure everything was ready to welcome the children. What might have looked like simple preparation became meaningful acts of service that laid the groundwork for the day ahead.",
          "As the children arrived, volunteers greeted them warmly and guided them through each step of the clinic. Some assisted with registration, while others recorded vital signs such as height, weight, and blood pressure. Medical professionals then conducted consultations and basic health assessments, carefully evaluating each child’s overall condition and offering recommendations whenever follow-up care was needed.",
        ],
      },
      {
        type: "cta",
        heading: "Be the Reason a Child Feels Seen.",
        parts: [
          {
            kind: "text",
            text: "Your time and presence can transform a child’s day.",
          },
          {
            kind: "text",
            text:
              "Join Favor Care as a volunteer and become part of a mission that brings health, hope, and compassion to children and communities in need.",
          },
          { kind: "button", label: "VOLUNTEER WITH US", href: "/get-involved" },
        ],
      },
      {
        type: "gallery",
        images: [
          asset("/images/posts/antipolo/carousel-1.jpg"),
          asset("/images/posts/antipolo/carousel-2.jpg"),
          asset("/images/posts/antipolo/carousel-3.jpg"),
        ],
      },
      {
        type: "text",
        paragraphs: [
          "A key part of the clinic was the dental check-up, where children received oral health assessments and learned the importance of caring for their teeth. For those who needed treatment, medications were provided to address common health concerns. Every consultation completed, every vital sign recorded, and every medicine distributed reflected a shared commitment to caring for the whole child: not only their physical health, but also their sense of being valued and loved.",
          "Beyond the medical services, the clinic day created opportunities for connection. Volunteers spent time with the children, sharing smiles, conversations, and encouragement throughout the day. These simple moments helped build a warm and welcoming environment where the children felt comfortable and cared for.",
          "The initiative also highlighted the importance of preventive healthcare, especially for children. Regular health monitoring allows potential concerns to be identified early and addressed before they become more serious. By bringing healthcare services directly to the community, Favor Care and Rapha International Christian Ministries helped make these essential services more accessible to the children they serve.",
        ],
      },
      { type: "gallery", images: [asset("/images/posts/antipolo/team.jpg")] },
      {
        type: "text",
        paragraphs: [
          "More than a one-day event, the clinic reflected the power of partnership in action. It showed how organizations can come together, combine their strengths, and create lasting impact in the lives of others. Through shared resources, compassionate service, and a common mission to serve, Favor Care and Rapha International Christian Ministries continue to make a difference one child, one family, and one community at a time.",
          "As the day came to an end and the clinic stations were packed away, the impact remained. What took place at Rapha was more than a series of medical check-ups. It was a tangible expression of care, compassion, and hope. Through every helping hand, every act of service, and every smile shared, the children were reminded that they are seen, valued, and deeply loved.",
        ],
      },
      {
        type: "cta",
        heading: "Turn Compassion Into Action.",
        parts: [
          {
            kind: "text",
            text:
              "A single gift can mean a healthier, happier future for a child.",
          },
          {
            kind: "text",
            text:
              "Support Favor Care’s outreach and help ensure no child goes without the care they deserve.",
          },
          { kind: "button", label: "GIVE TODAY", href: "/givenow" },
        ],
      },
      { type: "heading", text: "About Favor Care" },
      {
        type: "text",
        paragraphs: [
          "Favor Care is a compassion-driven organization committed to caring for the whole person, supporting the health, well-being, and dignity of children, families, and communities in need. Through medical outreaches, clinic days, and partnerships with mission-aligned organizations, Favor Care brings essential services directly to the people who need them most. Guided by a heart for service, Favor Care works to ensure that every individual is seen, valued, and deeply loved.",
        ],
      },
    ],
  },
  {
    slug: "seen-valued-and-cared-for-our-medical-outreach-in-tondo-manila",
    title: "Seen, Valued, and Cared For: Our Medical Outreach in Tondo, Manila",
    heroLines: [
      "Seen, Valued, and Cared For:",
      "Our Medical Outreach in Tondo, Manila",
    ],
    description:
      "Favor Care partnered with Kalayaan Community Ministries for a free medical outreach in Tondo, serving 200+ residents with check-ups, dental care, and prayer.",
    date: "2026-06-10",
    tag: "Kalayaan Community Ministries",
    hero: asset("/images/posts/tondo-hero.png"),
    heroAlt: "Volunteers serving residents at the Tondo medical outreach",
    blocks: [
      {
        type: "quote",
        text:
          "It's true what they say — you never really know how blessed you are until you come face-to-face with the reality of others.",
        yellow: false,
      },
      {
        type: "text",
        paragraphs: [
          "Think about how your mornings usually go. You wake up in a comfortable bed. You get to decide whether to sit down to a full breakfast or skip it for a quick coffee and pastry on the way to school or work. It’s mundane. Routine. The kind of everyday we’ve grown so used to that we hardly notice it.",
          "But for a small community in Tondo, Manila, one of the many families who live in and around the area’s dumpsites, the everyday looks very different. Their mornings are streets lined with the neighborhood’s trash, the rumble of trucks unloading the day’s collection, and the heavy smell that hovers over all of it. To them, this is simply normal. Especially for the children, born into such circumstances.",
          "And yet, in the heart of this underserved community, there is a haven.",
        ],
      },
      {
        type: "gallery",
        images: [
          asset("/images/posts/tondo/untitled-23-2.jpg"),
          asset("/images/posts/tondo/A6400714.jpg"),
        ],
      },
      {
        type: "text",
        paragraphs: [
          "It’s called Kalayaan Community Ministries. Founded by Ron and Joanna Domingo, KCM has served the recycling community of the Tondo dumpsite and the families around it for years. We partnered with them for the free medical outreach. It’s open not only to the members of their organization, but to every resident in the area.",
          "Kristine, a KCM staff member and a licensed nurse, told us that while their local church runs its own medical drives, they still lack the resources to provide more medicine and dental care for the people they serve. From the very start of our planning, the KCM team gave us nothing but excitement and support.",
        ],
      },
      {
        type: "gallery",
        images: [
          asset("/images/posts/tondo/A6400746-1.jpg"),
          asset("/images/posts/tondo/untitled-7-2-1.jpg"),
          asset("/images/posts/tondo/A6400609.jpg"),
          asset("/images/posts/tondo/FIBS2.jpg"),
        ],
      },
      {
        type: "text",
        paragraphs: [
          "We have to say it: they have a lovely community. Their area was even large enough for us to bring in more than 40 volunteers, both medical and non-medical. Our team set up stations for pharmacy, nurse check-ups, doctor consultations, and dental care. And because our goal is to help not just each patient’s physical needs, we stationed our prayer team at the very end of the triage. We know the residents are used to this life, but the daily fight for survival and decent healthcare is hard. While we can’t dramatically change their circumstances, we can offer comfort through prayer.",
        ],
      },
      {
        type: "quote",
        text:
          "By the end of the day, we were able to serve more than 200 patients.",
        yellow: true,
      },
      {
        type: "text",
        paragraphs: [
          "It warmed our hearts to learn that some parents had taken time off work to bring their children, because this would be the first dental check-up of their lives. We offered fluoride treatments, basic cleaning, and even extractions. With just two dentists on hand, the team still managed to care for more than 30 kids. That kind of dedication can only come from a genuine love for the work and a real desire to help.",
        ],
      },
      {
        type: "cta",
        heading: "Be the Hands That Reach Tondo.",
        parts: [
          {
            kind: "text",
            text: "Your skills and your presence can change a family’s day.",
          },
          {
            kind: "text",
            text:
              "Join Favor Care as a volunteer and help bring health, hope, and compassion to the communities that need it most.",
          },
          { kind: "button", label: "VOLUNTEER WITH US", href: "/get-involved" },
        ],
      },
      {
        type: "text",
        paragraphs: [
          "From the first patient to the last one of the day, outreaches like this always leave a bittersweet feeling. We are grateful to have the resources, the team, and the capacity to help communities like this one. But it’s just as heartbreaking to hear how often residents skip routine check-ups simply because scraping together the money for a clinic visit is so difficult. Many don’t know how or even have the awareness needed to apply for medical assistance. They line up at health centers from the crack of dawn until late afternoon just to be seen. And most often, only once an illness has already taken hold.",
          "For most of us, a clinic visit is a box to tick for work. A hospital stay means recovery. Medicine means getting better, faster. But for them, these are simply expenses they can’t afford.",
          "It’s frustrating to witness their situation, but it’s also humbling to see how openly they welcome the help offered to them. We never once felt shut out. There was no hostility. These were simply people hoping to find out whether they qualified for the care we came to give. And it was often the smallest things — a smile, a hand to guide them to the venue — that made their faces light up, as they realized this was open to anyone who needed it.",
        ],
      },
      {
        type: "gallery",
        images: [asset("/images/posts/tondo/untitled-5-21.jpg")],
      },
      {
        type: "text",
        paragraphs: [
          "We saw the elderly. We saw the mothers who brought their children. We saw the bright, hopeful smiles of little ones who still have their whole lives ahead of them. That is why we hope to return to this area again and again, and do even more than we did this time. We can dream bigger, because the people of Tondo deserve it.",
          "Help us make that dream a reality.",
        ],
      },
      {
        type: "cta",
        heading: "How You Can Help",
        parts: [
          {
            kind: "text",
            text: "If you are a licensed medical professional, we need you.",
          },
          {
            kind: "text",
            text:
              "We want to bring more help and more medicine to more communities. Help us make that happen.",
          },
          {
            kind: "text",
            text:
              "Favor Care is also a PCNC-certified NGO. You can partner with us through your company’s CSR program and request a certificate for your annual tax deduction.",
          },
          {
            kind: "button",
            label: "SIGN UP TO VOLUNTEER",
            href: "/signup",
          },
          { kind: "button", label: "GIVE TODAY", href: "/givenow" },
        ],
      },
      { type: "heading", text: "About Favor Care" },
      {
        type: "text",
        paragraphs: [
          "Favor Care is a compassion-driven organization committed to caring for the whole person, supporting the health, well-being, and dignity of children, families, and communities in need. Through medical outreaches, clinic days, and partnerships with mission-aligned organizations, Favor Care brings essential services directly to the people who need them most. Guided by a heart for service, Favor Care works to ensure that every individual is seen, valued, and deeply loved.",
        ],
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
