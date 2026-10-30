import { asset } from "../utils/assets.ts";
import Popup from "../islands/Popup.tsx";
import { POPUPS, SOCIAL_LINKS } from "./content.ts";
import { BrandIcon, MailIcon } from "./icons.tsx";

// Footer cloned from the WP `main-footer` template (post 45): black,
// single centered column — white logo, social icons, blurb, address,
// accreditation logos, copyright.
export function Footer() {
  return (
    <footer className="bg-black pb-[25px] pt-[25px] text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <img
          src={asset("/logo-white.svg")}
          alt="Favor Care"
          className="h-12 w-auto"
        />

        <ul
          className="flex items-center gap-5"
          aria-label="Social media and email"
        >
          {SOCIAL_LINKS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                aria-label={s.label}
                className="inline-flex h-12 w-12 items-center justify-center text-white transition-opacity hover:opacity-70"
              >
                {s.icon === "mail" ? (
                  <MailIcon size={22} />
                ) : (
                  <BrandIcon name={s.icon} size={22} />
                )}
              </a>
            </li>
          ))}
        </ul>

        <p className="max-w-xl text-sm leading-relaxed text-white/80">
          Favor Care, the community arm of Favor Church, is a humanitarian
          organization dedicated to reach out to communities to build hope and
          transform people’s lives.
        </p>

        <p className="max-w-xl text-sm leading-relaxed text-white/80">
          Level 6 East Wing, Mall, Shangri-La Plaza, EDSA, Shaw Blvd,
          Mandaluyong, 1552 Metro Manila, Philippines
        </p>

        <div className="flex flex-col items-center gap-3">
          <Popup
            trigger="Accredited by:"
            triggerClass="text-xs font-semibold tracking-wider text-white/80 underline hover:text-yellow"
            title={POPUPS.accreditation.title}
            cta={POPUPS.accreditation.cta}
          >
            {POPUPS.accreditation.body}
          </Popup>
          <div className="flex items-center gap-6">
            <img
              src={asset("/images/orgs/pcnc-wp.png")}
              alt="Philippine Council for NGO Certification"
              className="h-12 w-auto"
            />
            <img
              src={asset("/images/orgs/dswd-wp.png")}
              alt="Department of Social Welfare and Development"
              className="h-14 w-auto"
            />
          </div>
        </div>

        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
