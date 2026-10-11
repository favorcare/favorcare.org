// Shared site navigation data — the single source for header + footer links.
// 5-item primary nav per ideas/proposed.svg information architecture.

export interface NavLink {
  label: string;
  href: string;
}

export const NAV: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Stories & Impact", href: "/news-updates" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Donate", href: "/givenow" },
];

// Utility / footer pages from the sitemap — remaining routes are placeholders.
export const UTILITY_LINKS: NavLink[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "Newsletter", href: "/contact" },
  { label: "FAQ", href: "/contact" },
  { label: "Careers", href: "#" },
  { label: "Press / Media Kit", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Accessibility Statement", href: "#" },
  { label: "Donation Policy", href: "#" },
];
