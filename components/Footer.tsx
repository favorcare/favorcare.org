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
              Care that travels the last mile. A faith-based Philippine
              foundation delivering healthcare, education, disaster relief, and
              community development across Metro Manila and surrounding
              provinces.
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
            <div class="mt-6 space-y-1 text-sm text-surface/70">
              <p>
                Level 6 East Wing, Shangri-La Plaza, EDSA cor. Shaw Blvd.,
                Mandaluyong City
              </p>
              <p>
                <a
                  href="mailto:corsec@favorcare.org"
                  class="hover:text-surface"
                >
                  corsec@favorcare.org
                </a>{" "}
                · 0920 959 7997
              </p>
            </div>
          </div>

          <FooterLinkList title="Explore" links={NAV} />
          <FooterLinkList title="Organization" links={UTILITY_LINKS} />
        </div>

        <div class="mt-12 border-t border-surface/10 pt-6 text-sm text-surface/60">
          © 2026 Favor Care Foundation Inc. · SEC Reg. No. 2022050051506-39 ·
          DSWD &amp; PCNC Accredited
        </div>
      </div>
    </footer>
  );
}

export default Footer;
