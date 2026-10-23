import { define } from "../utils.ts";
import Popup from "../islands/Popup.tsx";
import { Analytics } from "../components/Analytics.tsx";
import { POPUPS } from "../components/content.ts";

export default define.page(function App({ Component }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Favor Care</title>
        <meta
          name="description"
          content="Favor Care is a faith-driven Philippine nonprofit bringing education, health, and hope to families in need. Giving hope for a better future to those in need."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
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
      <body class="bg-surface text-on-surface font-sans antialiased">
        <a
          href="#main-content"
          class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
        >
          Skip to content
        </a>
        <Component />
        {
          /* WP accreditation popup (elementor 7281): auto-opens 3s after
            page load, once per browser session, on every page. */
        }
        <Popup
          auto={{ delayMs: 3000, sessionKey: "favorcare-accreditation-popup" }}
          title={POPUPS.accreditation.title}
          cta={POPUPS.accreditation.cta}
        >
          {POPUPS.accreditation.body}
        </Popup>
        {
          /* Vendor analytics (GA4 / Mixpanel / CF Web Analytics) + the
            Tracking island — renders nothing unless keys are set (see
            DEVELOPMENT.md "Analytics & UTM tracking"). */
        }
        <Analytics />
      </body>
    </html>
  );
});
