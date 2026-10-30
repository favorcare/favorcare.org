import type { ReactNode } from "react";
import { CfacHeader } from "../../components/cfac/Header.tsx";
import { CfacFooter } from "../../components/cfac/Footer.tsx";

// Coffee for a Cause campaign layout. Wraps every route under
// /coffeeforacause in the `.cfac` theme scope (app/globals.css — the
// sub-brand token overrides that re-skin the shared catalog beneath this
// wrapper) plus the campaign chrome. Any future CFAC page inherits the
// theme and chrome for free.
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
