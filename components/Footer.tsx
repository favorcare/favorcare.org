import { asset } from "../utils/assets.ts";
import Popup from "../islands/Popup.tsx";
import { POPUPS } from "./content.ts";

// Footer cloned from the WP `main-footer` template (post 45): black,
// single centered column — white logo, social icons, blurb, address,
// accreditation logos, copyright.
const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/favorcare.ph",
    path:
      "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93H7.9V12H10V9.8c0-2.1 1.25-3.26 3.16-3.26.92 0 1.88.16 1.88.16v2.07h-1.06c-1.04 0-1.36.65-1.36 1.31V12h2.32l-.37 2.87H12.6v6.93c4.56-.93 8-4.96 8-9.8Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/favor.care.ph",
    path:
      "M12 2.2c2.7 0 3 .01 4.06.06 1.05.05 1.63.22 2.01.37.5.2.87.43 1.25.81.38.38.62.75.81 1.25.15.38.32.96.37 2.01.05 1.06.06 1.36.06 4.06s-.01 3-.06 4.06c-.05 1.05-.22 1.63-.37 2.01-.2.5-.43.87-.81 1.25-.38.38-.75.62-1.25.81-.38.15-.96.32-2.01.37-1.06.05-1.36.06-4.06.06s-3-.01-4.06-.06c-1.05-.05-1.63-.22-2.01-.37-.5-.2-.87-.43-1.25-.81-.38-.38-.62-.75-.81-1.25-.15-.38-.32-.96-.37-2.01C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.06c.05-1.05.22-1.63.37-2.01.2-.5.43-.87.81-1.25.38-.38.75-.62 1.25-.81.38-.15.96-.32 2.01-.37C7.76 2.21 8.06 2.2 12 2.2Zm0 5.3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 7.42a2.92 2.92 0 1 1 0-5.84 2.92 2.92 0 0 1 0 5.84Zm5.74-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@FavorCarePH",
    path:
      "M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81ZM10 15.13V8.87L15.25 12 10 15.13Z",
  },
  {
    label: "Email",
    href: "mailto:info@favorcare.org",
    path:
      "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-8 4.76-8-4.76V6l8 4.75L20 6v2.24Z",
  },
];

export function Footer() {
  return (
    <footer class="bg-black pb-[25px] pt-[25px] text-white">
      <div class="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <img src="/logo-white.svg" alt="Favor Care" class="h-12 w-auto" />

        <ul class="flex items-center gap-5" aria-label="Social media">
          {SOCIALS.map((s) => (
            <li>
              <a
                href={s.href}
                aria-label={s.label}
                class="inline-flex h-12 w-12 items-center justify-center text-white transition-opacity hover:opacity-70"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={s.path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <p class="max-w-xl text-sm leading-relaxed text-white/80">
          Favor Care, the community arm of Favor Church, is a humanitarian
          organization dedicated to reach out to communities to build hope and
          transform people’s lives.
        </p>

        <p class="max-w-xl text-sm leading-relaxed text-white/80">
          Level 6 East Wing, Mall, Shangri-La Plaza, EDSA, Shaw Blvd.,
          Mandaluyong, 1552 Metro Manila, Philippines
        </p>

        <div class="flex flex-col items-center gap-3">
          <p class="text-xs font-semibold uppercase tracking-wider text-white/80">
            Accredited by:
          </p>
          <Popup
            trigger="View our accreditation"
            triggerClass="text-xs font-semibold uppercase tracking-wider underline text-white/80 hover:text-yellow"
            title={POPUPS.accreditation.title}
            cta={POPUPS.accreditation.cta}
          >
            {POPUPS.accreditation.body}
          </Popup>
          <div class="flex items-center gap-6">
            <img
              src={asset("/images/orgs/pcnc-wp.png")}
              alt="Philippine Council for NGO Certification"
              class="h-12 w-auto"
            />
            <img
              src={asset("/images/orgs/dswd-wp.png")}
              alt="Department of Social Welfare and Development"
              class="h-14 w-auto"
            />
          </div>
        </div>

        <p class="text-sm text-white/60">© 2025 All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
