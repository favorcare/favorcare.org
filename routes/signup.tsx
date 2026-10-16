import { page } from "fresh";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { PageHero } from "../components/PageHero.tsx";
import { Button } from "../components/Button.tsx";
import Popup from "../islands/Popup.tsx";
import { VolunteerSignupForm } from "../components/VolunteerSignupForm.tsx";
import { POPUPS, SIGNUP } from "../components/content.ts";

// Volunteer signup — the on-site "Favor Care: Sign Up to Serve" form,
// replacing the Google Form handoff. GET renders the page with the
// volunteer-commitment gate popup; POST validates and forwards the mapped
// fields to the live form's response endpoint (entry-id map in
// SIGNUP.entries) so responses keep landing in the volunteers' Google
// Sheet with their existing notifications. Nothing is stored or logged on
// our side — the submission is proxied in memory only. If the Google form
// is ever rebuilt, re-scrape the entry ids into SIGNUP.

const FORM_ID = "1FAIpQLScraE9-h5uh7rIzk6IdnpX072IDU60N_QQ-klpqhpPd4GiPZg";
const FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

const REQUIRED = [
  "first-name",
  "last-name",
  "gender",
  "dob",
  "email",
  "phone",
  "attendance",
  "social",
  "hear-about",
  "updates",
  "connect-group",
  "dna",
  "consent",
];

interface SignupPageData {
  ok?: boolean;
  error?: string;
  values?: Record<string, string>;
  serveAreas?: string[];
}

function collectValues(form: FormData): {
  values: Record<string, string>;
  serveAreas: string[];
} {
  const values: Record<string, string> = {};
  for (const name of REQUIRED) {
    const v = form.get(name);
    if (typeof v === "string") values[name] = v;
  }
  const other = form.get("hear-about-other");
  if (typeof other === "string") values["hear-about-other"] = other;
  return { values, serveAreas: form.getAll("serve-areas").map(String) };
}

function buildForwardBody(form: FormData): URLSearchParams {
  const e = SIGNUP.entries;
  const s = (name: string) => String(form.get(name) ?? "").trim();
  const body = new URLSearchParams();
  body.append(`entry.${e.firstName}`, s("first-name"));
  body.append(`entry.${e.lastName}`, s("last-name"));
  body.append(`entry.${e.gender}`, s("gender"));
  // The date input gives ISO YYYY-MM-DD — verified against formResponse:
  // Google stores exactly this (its MM/DD/YYYY display is client-side).
  body.append(`entry.${e.dob}`, s("dob"));
  body.append(`entry.${e.email}`, s("email"));
  body.append(`entry.${e.phone}`, s("phone"));
  body.append(`entry.${e.attendance}`, s("attendance"));
  body.append(`entry.${e.social}`, s("social"));
  const hearAbout = s("hear-about");
  if (hearAbout === "__other_option__") {
    // Google's other-option convention: the marker value plus a
    // companion free-text entry.
    body.append(`entry.${e.hearAbout}`, "__other_option__");
    body.append(
      `entry.${e.hearAbout}.other_option_response`,
      s("hear-about-other"),
    );
  } else {
    body.append(`entry.${e.hearAbout}`, hearAbout);
  }
  for (const area of form.getAll("serve-areas")) {
    body.append(`entry.${e.serveAreas}`, String(area));
  }
  body.append(`entry.${e.updates}`, s("updates"));
  body.append(`entry.${e.connectGroup}`, s("connect-group"));
  body.append(`entry.${e.dna}`, s("dna"));
  body.append(`entry.${e.consent}`, s("consent"));
  return body;
}

export const handler = define.handlers({
  GET(ctx) {
    const ok = ctx.url.searchParams.get("ok") === "1";
    return page<SignupPageData>({ ok });
  },
  async POST(ctx) {
    const form = await ctx.req.formData();
    const { values, serveAreas } = collectValues(form);

    const incomplete = REQUIRED.some((name) => !values[name]?.trim());
    if (incomplete || serveAreas.length === 0) {
      return page<SignupPageData>({
        error: SIGNUP.requiredError,
        values,
        serveAreas,
      });
    }
    const email = values["email"] ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return page<SignupPageData>({
        error: "Please enter a valid email address.",
        values,
        serveAreas,
      });
    }

    try {
      const res = await fetch(FORM_URL, {
        method: "POST",
        body: buildForwardBody(form),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        redirect: "follow",
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`formResponse responded ${res.status}`);
    } catch {
      return page<SignupPageData>({
        error: SIGNUP.deliveryError,
        values,
        serveAreas,
      });
    }

    // Post/redirect/get — a refresh must not resubmit.
    return new Response(null, {
      status: 303,
      headers: { Location: "/signup?ok=1" },
    });
  },
});

export default define.page<typeof handler>(function SignupPage({ data }) {
  return (
    <>
      <Head>
        <title>Sign up to volunteer — Favor Care</title>
        <meta name="description" content={SIGNUP.hero.subtitle} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageHero image={SIGNUP.hero.image}>
          <h1 class="text-center text-[38px] font-semibold leading-none text-white md:text-[56px] md:font-bold lg:text-[70px]">
            {SIGNUP.hero.title}
          </h1>
          <p class="mx-auto mt-4 max-w-[280px] text-center text-sm leading-relaxed text-white md:max-w-[560px] md:text-[15px] md:leading-[26px] lg:max-w-[784px] lg:text-lg lg:leading-relaxed">
            {SIGNUP.hero.subtitle}
          </p>
        </PageHero>

        {
          /* The commitment gate: auto-opens over the form on every visit —
            the guidelines must be agreed before serving. The trigger
            beside the form reopens them. */
        }
        <Popup
          auto={{ delayMs: 400 }}
          title={POPUPS.volunteerGuidelines.title}
          blocks={POPUPS.volunteerGuidelines.blocks}
          cta={SIGNUP.gateCta}
        />

        <section class="px-5 pb-20 pt-10 md:px-2.5 lg:px-0">
          <div class="mx-auto w-full max-w-[750px]">
            {data.ok
              ? (
                <div class="rounded-card bg-yellow p-8 text-center md:p-12">
                  <h2 class="text-[25px] font-bold leading-tight text-black md:text-[30px]">
                    {SIGNUP.success.title}
                  </h2>
                  <p class="mx-auto mt-3 max-w-[480px] text-base leading-relaxed text-black">
                    {SIGNUP.success.body}
                  </p>
                  <Button
                    variant="black"
                    href={SIGNUP.success.back.href}
                    class="mt-8"
                  >
                    {SIGNUP.success.back.label}
                  </Button>
                </div>
              )
              : (
                <>
                  <div class="flex justify-center">
                    <Popup
                      trigger={SIGNUP.reviewTrigger}
                      triggerClass="min-h-12 text-sm font-bold uppercase tracking-wider text-primary underline"
                      title={POPUPS.volunteerGuidelines.title}
                      blocks={POPUPS.volunteerGuidelines.blocks}
                      cta={SIGNUP.gateCta}
                    />
                  </div>
                  <VolunteerSignupForm
                    class="mt-8"
                    values={data.values}
                    serveAreas={data.serveAreas}
                    error={data.error}
                  />
                </>
              )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
});
