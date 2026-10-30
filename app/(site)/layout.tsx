import type { ReactNode } from "react";
import { AccreditationPopup } from "../../components/AccreditationPopup.tsx";

// Layout for favorcare.org proper (everything except the CFAC campaign).
// WP accreditation popup (elementor 7281): auto-opens 3s after page load,
// once per browser session. The campaign sub-brand is a focused donation
// funnel with its own chrome, and this popup's CTA leaks donors to
// /givenow — so it lives here, outside app/coffeeforacause.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <AccreditationPopup
        auto={{
          delayMs: 3000,
          sessionKey: "favorcare-accreditation-popup",
        }}
      />
    </>
  );
}
