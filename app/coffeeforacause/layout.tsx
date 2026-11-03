import type { ReactNode } from "react";
import "./theme.css";
import { CfacHeader } from "../../components/campaigns/cfac/Header.tsx";
import { CfacFooter } from "../../components/campaigns/cfac/Footer.tsx";

// Coffee for a Cause campaign layout. Wraps every route under
// /coffeeforacause in the `.cfac` theme scope (./theme.css — the campaign's
// token remaps, see DESIGN.md "Sub-brand themes") plus the campaign chrome
// from components/campaigns/cfac/. Any future CFAC page inherits both.
export default function CfacLayout({ children }: { children: ReactNode }) {
  return (
    <div className="cfac flex min-h-screen flex-col bg-surface text-on-surface">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>
      <CfacHeader />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        {children}
      </main>
      <CfacFooter />
    </div>
  );
}
