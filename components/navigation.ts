// Shared site navigation data — the single source for header + footer links.
// 5-item primary nav per ideas/proposed.svg information architecture.

export interface NavLink {
  label: string;
  href: string;
}

export const NAV: NavLink[] = [
  { label: "Our Mission", href: "#mission" },
  { label: "What We Do", href: "#programs" },
  { label: "Stories & Impact", href: "#impact" },
  { label: "Get Involved", href: "#involved" },
  { label: "Donate", href: "#donate" },
];

// Utility / footer pages from the sitemap — placeholder routes for now.
export const UTILITY_LINKS: NavLink[] = [
  "Contact Us",
  "Newsletter",
  "FAQ",
  "Careers",
  "Press / Media Kit",
  "Privacy Policy",
  "Terms & Conditions",
  "Accessibility Statement",
  "Donation Policy",
].map((label) => ({ label, href: "#" }));
