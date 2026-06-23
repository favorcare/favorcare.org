const QUICK_LINKS = [
  { label: "Our Mission", href: "#mission" },
  { label: "What We Do", href: "#programs" },
  { label: "Stories & Impact", href: "#impact" },
  { label: "Get Involved", href: "#involved" },
  { label: "Donate", href: "#donate" },
];

// Utility & footer pages from the sitemap — placeholder routes for now.
const UTILITY_LINKS = [
  "Contact Us",
  "Newsletter",
  "FAQ",
  "Careers",
  "Press / Media Kit",
  "Privacy Policy",
  "Terms & Conditions",
  "Accessibility Statement",
  "Donation Policy",
];

export function Footer() {
  return (
    <footer class="bg-on-surface text-surface">
      <div class="mx-auto max-w-7xl px-6 py-16">
        <div class="grid gap-12 md:grid-cols-4">
          <div class="md:col-span-2">
            <img src="/logo-white.svg" alt="Favor Care" class="h-10" />
            <p class="mt-4 max-w-sm text-sm leading-relaxed text-surface/70">
              Giving hope for a better future to those in need. A faith-driven
              Philippine nonprofit bringing education, health, and hope to
              families and communities.
            </p>
            <div class="mt-6 flex items-center gap-4">
              <img
                src="/images/orgs/PCNC.png"
                alt="PCNC accredited"
                class="h-12 w-auto"
              />
              <img
                src="/images/orgs/DSWD.png"
                alt="DSWD registered"
                class="h-12 w-auto"
              />
            </div>
          </div>

          <div>
            <h3 class="text-xs font-semibold uppercase tracking-wider text-surface/60">
              Explore
            </h3>
            <ul class="mt-4 space-y-2 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    class="text-surface/80 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 class="text-xs font-semibold uppercase tracking-wider text-surface/60">
              Organization
            </h3>
            <ul class="mt-4 space-y-2 text-sm">
              {UTILITY_LINKS.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    class="text-surface/80 transition-colors hover:text-primary"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div class="mt-12 border-t border-surface/10 pt-6 text-sm text-surface/60">
          © 2026 Favor Care. A SEC-registered Philippine foundation.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
