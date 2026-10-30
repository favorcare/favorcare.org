import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "../components/Analytics.tsx";
import "./globals.css";

export const metadata: Metadata = {
  title: "Favor Care",
  description:
    "Favor Care is a faith-driven Philippine nonprofit bringing education, health, and hope to families in need. Giving hope for a better future to those in need.",
  icons: { icon: { url: "/favicon.png", type: "image/png" } },
};

// Root shell: fonts, skip link, and the vendor analytics loaders. The
// accreditation popup lives in app/(site)/layout.tsx so the CFAC campaign
// funnel (app/coffeeforacause) stays free of it.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Inter+Tight:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
        >
          Skip to content
        </a>
        {children}
        {
          /* Vendor analytics (GA4 / Mixpanel / CF Web Analytics) + the
            Tracking island — renders nothing unless keys are set (see
            DEVELOPMENT.md "Analytics & UTM tracking"). */
        }
        <Analytics />
      </body>
    </html>
  );
}
