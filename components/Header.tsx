import { asset } from "../utils/assets.ts";
import { Navbar } from "./Navbar.tsx";
import { Button } from "./Button.tsx";
import { AccreditedTooltip } from "./AccreditedTooltip.tsx";
import MobileNav from "../islands/MobileNav.tsx";

// Yellow header bar (WP template `new-header`, post 1243): full-color logo
// left, white capitalized nav center, black DONATE pill right (desktop
// hover shows the WP "Accredited by:" card). Static — WP
// does not pin the header. Small screens use the burger (MobileNav island).
export function Header() {
  return (
    <header className="relative bg-yellow py-2.5 lg:py-[10px]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 md:px-10">
        <a href="/" className="flex items-center" aria-label="Favor Care home">
          <img
            src={asset("/images/logo-color.png")}
            alt="Favor Care"
            className="h-[50px] w-auto lg:h-[60px]"
          />
        </a>

        <Navbar />

        <div className="flex items-center gap-2">
          <AccreditedTooltip>
            <Button
              variant="black"
              size="header"
              href="/givenow"
              track="donate_click"
              trackProps={{ location: "header" }}
            >
              DONATE
            </Button>
          </AccreditedTooltip>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
