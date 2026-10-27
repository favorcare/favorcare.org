import { SOCIAL_LINKS } from "../content.ts";
import { BrandIcon, CoffeeIcon, MailIcon } from "../icons.tsx";
import { CFAC } from "../cfac.ts";

// CFAC campaign footer: slim centered column on the darkest-roast band
// (bg-black → the scoped roast) — wordmark, campaign blurb, the org's
// social row (legitimacy signal donors look for), a way back to the main
// site, and the © line. Deliberately lighter than the site Footer (no
// accreditation popups — those live on favorcare.org pages).
export function CfacFooter() {
  return (
    <footer class="bg-black pb-[25px] pt-[25px] text-white">
      <div class="mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 text-center">
        <span class="flex items-center gap-2.5">
          <CoffeeIcon size={26} class="text-yellow" />
          <span class="text-lg font-bold leading-none">
            {CFAC.name}
          </span>
        </span>

        <p class="max-w-xl text-sm leading-relaxed text-white/80">
          {CFAC.footer.blurb}
        </p>

        <ul class="flex items-center gap-5" aria-label="Social media and email">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex h-12 w-12 items-center justify-center text-white transition-opacity hover:opacity-70"
              >
                {s.icon === "mail"
                  ? <MailIcon size={22} />
                  : <BrandIcon name={s.icon} size={22} />}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/"
          class="text-sm font-semibold text-white/80 underline hover:text-yellow"
        >
          favorcare.org
        </a>

        <p class="text-sm text-white/60">
          © {new Date().getFullYear()} Favor Care. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default CfacFooter;
