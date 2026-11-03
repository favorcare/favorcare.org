import CfacMobileNav from "../../../islands/CfacMobileNav.tsx";
import { CfacButton } from "./CfacButton.tsx";
import { CfacLockup } from "./Lockup.tsx";
import { CFAC, CFAC_EVENTS, cfacDonateProps } from "./content.ts";

/**
 * CFAC campaign header, cloned from cfac-landing-page's navbar: a sticky
 * gold bar (56/64/80px), the Favor Care × CFAC lockup linking to the
 * campaign home, the five site links from `xl`, the dark DONATE pill (jumps
 * to the on-page form) and a burger below `xl` (`CfacMobileNav`).
 *
 * Accessibility over fidelity: the sample's links hover to white on gold
 * (≈1.8:1); here they underline instead.
 */
export function CfacHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-yellow">
      <div className="relative px-4 sm:px-6 xl:mx-[70px]">
        <div className="flex h-14 items-center md:h-16 lg:h-20">
          <a
            href={CFAC.path}
            aria-label={`${CFAC.name} home`}
            className="flex shrink-0 items-center"
          >
            <CfacLockup tone="dark" size="nav" compact />
          </a>

          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <nav className="hidden items-center xl:flex" aria-label="Main">
              {CFAC.nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-5 py-3 text-lg font-semibold tracking-tight text-primary underline-offset-8 hover:text-primary hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <CfacButton
              variant="dark"
              size="pill"
              href={CFAC.donate.href}
              track={CFAC_EVENTS.donate}
              trackProps={cfacDonateProps("header")}
            >
              {CFAC.donate.label}
            </CfacButton>

            <CfacMobileNav links={CFAC.nav}>
              <CfacLockup tone="dark" size="stacked" />
            </CfacMobileNav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default CfacHeader;
