// Shared site navigation data — the single source for header + footer links.
// Mirrors the WP "default-navigation" menu (labels 1:1 from staging; hrefs
// point at the Fresh routes — WP slugs like /about redirect later, Phase 7).

export interface NavLink {
  label: string;
  href: string;
}

export const NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact Us", href: "/contact" },
  { label: "News & Updates", href: "/posts" },
];

// Utility / footer pages from the sitemap — remaining routes are placeholders.
export const UTILITY_LINKS: NavLink[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "Newsletter", href: "/contact#newsletter" },
  { label: "FAQ", href: "/contact" },
  { label: "Careers", href: "#" },
  { label: "Press / Media Kit", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Accessibility Statement", href: "#" },
  { label: "Donation Policy", href: "#" },
];
