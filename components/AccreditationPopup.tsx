import Popup from "../islands/Popup.tsx";
import type { PopupProps } from "../islands/Popup.tsx";
import { POPUPS } from "./content.ts";
import { asset } from "../utils/assets.ts";

/**
 * The WP accreditation popup (elementor 7281) — title, PCNC + DSWD logos,
 * body, and the DONATE band — on the `Popup` island's `"accreditation"`
 * variant. Mounted twice: auto-opened site-wide by `app/(site)/layout.tsx`
 * (`auto`) and behind the footer's "Accredited by:" link (`trigger`).
 *
 * Measured dialect (post-7281.css): logos sit in a 2-column grid 34% of
 * the 550px column wide, bottom-aligned (WP pulls them up 40px, but its DSWD
 * image carries 16:9 padding — 24px matches the rendered gap); the body is
 * Prompt 300, 16px/22px (14px on mobile), inset 15% each side.
 */
export function AccreditationPopup({
  trigger,
  triggerClass,
  auto,
}: Pick<PopupProps, "trigger" | "triggerClass" | "auto">) {
  return (
    <Popup
      variant="accreditation"
      trigger={trigger}
      triggerClass={triggerClass}
      auto={auto}
      title={POPUPS.accreditation.title}
      cta={POPUPS.accreditation.cta}
    >
      <div className="-mt-6 mx-auto grid w-1/2 grid-cols-2 items-end justify-items-center md:w-[34%]">
        <img
          src={asset("/images/orgs/PCNC.png")}
          alt="Philippine Council for NGO Certification"
          width={600}
          height={224}
          className="h-auto w-[88%]"
        />
        <img
          src={asset("/images/orgs/DSWD.png")}
          alt="Department of Social Welfare and Development"
          width={294}
          height={328}
          className="h-auto w-[45%]"
        />
      </div>
      <p className="px-[15%] font-prompt text-sm font-light leading-[22px] md:text-base">
        {POPUPS.accreditation.body}
      </p>
    </Popup>
  );
}
