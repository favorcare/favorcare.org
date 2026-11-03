import { SOCIAL_LINKS } from "../../content.ts";
import { BrandIcon, type BrandName } from "../../icons.tsx";
import { CfacButton } from "./CfacButton.tsx";
import { CfacLockup } from "./Lockup.tsx";
import { CFAC_FRAME } from "./layout.ts";
import { CFAC, CFAC_EVENTS, cfacDonateProps } from "./content.ts";

// The sample's footer social row: the site's links plus TikTok (email lives
// in the contact section above, so it is left out here).
const SOCIALS: { label: string; href: string; icon: BrandName }[] = [
  ...SOCIAL_LINKS.flatMap((s) =>
    s.icon === "mail" ? [] : [{ label: s.label, href: s.href, icon: s.icon }],
  ),
  { label: "TikTok", href: "https://tiktok.com/@favorcare.ph", icon: "tiktok" },
];

/**
 * CFAC campaign footer, cloned from cfac-landing-page: a photo-backed band
 * (70% black wash; from `xl` the right half turns solid gold) carrying the
 * white co-brand lockup, social row, site links and DONATE NOW; then a dark
 * legal row — Privacy Policy, © line, PCNC/DSWD accreditation badges.
 */
export function CfacFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-primary text-white">
      <div className="absolute inset-0 flex" aria-hidden="true">
        <div className="relative w-full xl:w-1/2">
          <img
            src={CFAC.footer.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="hidden w-1/2 bg-yellow xl:block" />
      </div>

      <div className={`relative ${CFAC_FRAME}`}>
        <div className="grid grid-cols-1 gap-16 py-16 xl:grid-cols-2">
          <div className="flex flex-col items-center gap-8 sm:items-start">
            <a href={CFAC.path} aria-label={`${CFAC.name} home`}>
              <CfacLockup tone="light" size="footer" />
            </a>
            <ul className="flex gap-3" aria-label="Social media">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
                  >
                    <BrandIcon name={s.icon} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 xl:grid-cols-2">
            <nav
              className="flex flex-col items-center gap-1 xl:items-start"
              aria-label="Footer"
            >
              {CFAC.nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-12 items-center text-base text-white hover:text-white/70 xl:text-primary xl:hover:text-primary/70"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex justify-center xl:justify-start">
              <CfacButton
                variant="dark"
                size="cta"
                href={CFAC.footer.donate.href}
                track={CFAC_EVENTS.donate}
                trackProps={cfacDonateProps("footer")}
                className="w-full rounded-xl xl:w-auto"
              >
                {CFAC.footer.donate.label}
              </CfacButton>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-primary py-6 md:py-8">
        <div
          className={`${CFAC_FRAME} flex flex-col items-center justify-center gap-4 text-center text-sm text-white/70 md:flex-row md:justify-between`}
        >
          <a
            href={CFAC.footer.privacy.href}
            className="inline-flex min-h-12 items-center text-white/70 hover:text-white"
          >
            {CFAC.footer.privacy.label}
          </a>
          <p>
            © {year} -{" "}
            <a
              href={CFAC.footer.org.href}
              className="text-white/70 hover:text-white"
            >
              {CFAC.footer.org.label}
            </a>
            . All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs">{CFAC.footer.accredited}</span>
            <div className="flex items-center gap-3">
              {CFAC.footer.badges.map((b) => (
                <img
                  key={b.alt}
                  src={b.src}
                  alt={b.alt}
                  loading="lazy"
                  className="h-8 w-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CfacFooter;
