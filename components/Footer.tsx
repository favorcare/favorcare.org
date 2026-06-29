import { FooterLinkList } from "./FooterLinkList.tsx";
import { NAV, UTILITY_LINKS } from "./navigation.ts";

// Site footer: brand blurb + accreditation badges + link columns + legal line.
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

          <FooterLinkList title="Explore" links={NAV} />
          <FooterLinkList title="Organization" links={UTILITY_LINKS} />
        </div>

        <div class="mt-12 border-t border-surface/10 pt-6 text-sm text-surface/60">
          © 2026 Favor Care. A SEC-registered Philippine foundation.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
