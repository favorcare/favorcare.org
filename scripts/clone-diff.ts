// Clone-parity harness: screenshots + text parity between the Fresh app and
// the canonical WordPress site (staging.favorcare.org).
//
//   deno task clone:reference             # capture WP reference screenshots
//   deno task clone:diff                  # capture Fresh + compare w/ reference
//   deno task clone:diff -- --pages home  # single page
//
// Output (default ../migration-files/clone-diff — outside the repo):
//   reference/<page>-<width>.png|.txt     one-time WP captures
//   current/<page>-<width>.png|.txt       Fresh captures per run
//   report.html / report.md               side-by-sides + text-parity report
//
// Screenshots are full-page at 360/768/1280 with animations disabled and
// fonts loaded. Text parity compares normalized, DEDUPED body text —
// Elementor duplicates content per breakpoint, so duplicates are dropped.

import { chromium } from "playwright";

const WP_BASE = "https://staging.favorcare.org";
const FRESH_BASE = "http://127.0.0.1:5173";
const WIDTHS = [360, 768, 1280];

interface Pair {
  page: string;
  wp: string | null; // null = not on WP (Fresh-only)
  fresh: string | null; // null = route not built yet
}

const PAIRS: Pair[] = [
  { page: "home", wp: "/", fresh: "/" },
  { page: "about", wp: "/about", fresh: "/who-we-are" },
  { page: "what-we-do", wp: "/what-we-do", fresh: "/what-we-do" },
  { page: "get-involved", wp: "/get-involved", fresh: "/get-involved" },
  { page: "contact", wp: "/contact", fresh: "/contact" },
  { page: "givenow", wp: "/givenow", fresh: "/givenow" },
  { page: "news-updates", wp: "/posts", fresh: "/posts" },
  {
    page: "post-tondo",
    wp: "/posts/seen-valued-and-cared-for-our-medical-outreach-in-tondo-manila",
    fresh:
      "/posts/seen-valued-and-cared-for-our-medical-outreach-in-tondo-manila",
  },
  {
    page: "post-antipolo",
    wp: "/posts/every-child-matters-bringing-health-and-care-to-antipolo",
    fresh: "/posts/every-child-matters-bringing-health-and-care-to-antipolo",
  },
  {
    page: "post-five-arms",
    wp: "/posts/five-arms-of-favor-care",
    fresh: "/posts/five-arms-of-favor-care",
  },
  { page: "privacy-policy", wp: "/privacy-policy", fresh: "/privacy-policy" },
];

const args = Deno.args;
const mode = args[0] === "reference" ? "reference" : "diff";
const outFlag = args.findIndex((a) => a === "--out");
const OUT = outFlag !== -1
  ? args[outFlag + 1]
  : "../migration-files/clone-diff";
const pagesFlag = args.findIndex((a) => a === "--pages");
const only = pagesFlag !== -1 ? args[pagesFlag + 1].split(",") : null;

async function capture(url: string, dir: string, name: string) {
  const browser = await chromium.launch();
  try {
    for (const width of WIDTHS) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      } catch {
        // networkidle can time out on long-polling WP pages; content is usually ready
      }
      await page.addStyleTag({
        content:
          `*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}` +
          // WP renders unopened Elementor popups into the DOM (their text
          // lands in innerText); Fresh <dialog>s are display:none when
          // closed. Mask the WP popups so text parity compares page
          // content, not hidden dialogs.
          `.dialog-widget{display:none!important}`,
      });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `${dir}/${name}-${width}.png`,
        fullPage: true,
      });
      const text = await page.evaluate(() => document.body?.innerText ?? "");
      const normalized = dedupe(
        text.split("\n").map((l) => l.trim()).filter(Boolean),
      );
      await Deno.writeTextFile(
        `${dir}/${name}-${width}.txt`,
        normalized.join("\n"),
      );
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

/** Elementor renders content 2–3x for breakpoints; drop duplicate lines. */
function dedupe(lines: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const l of lines) {
    if (!seen.has(l)) {
      seen.add(l);
      out.push(l);
    }
  }
  return out;
}

function diffLines(a: string[], b: string[]) {
  const setA = new Set(a), setB = new Set(b);
  const missing = a.filter((l) => !setB.has(l)); // on WP, not on Fresh
  const extra = b.filter((l) => !setA.has(l)); // on Fresh, not on WP
  return { missing, extra };
}

await Deno.mkdir(`${OUT}/reference`, { recursive: true });
await Deno.mkdir(`${OUT}/current`, { recursive: true });

const pairs = PAIRS.filter((p) => (!only || only.includes(p.page)));

if (mode === "reference") {
  for (const p of pairs) {
    if (!p.wp) continue;
    console.log(`reference: ${p.page} (${p.wp})`);
    await capture(WP_BASE + p.wp, `${OUT}/reference`, p.page);
  }
  console.log(`done -> ${OUT}/reference`);
  Deno.exit(0);
}

// diff mode
const report: string[] = [
  `# Clone parity report — ${new Date().toISOString()}`,
  "",
];
const html: string[] = [
  "<html><head><meta charset='utf-8'><title>Clone parity</title>",
  "<style>body{font-family:system-ui;margin:24px}img{max-width:49.5%;border:1px solid #ccc;vertical-align:top}h2{border-bottom:2px solid #191718}h3{margin:16px 0 8px}code{background:#f5f1e6}</style>",
  "</head><body><h1>Clone parity report</h1>",
];

for (const p of pairs) {
  if (!p.fresh) {
    report.push(
      `## ${p.page}\n\n- Fresh route not built yet (reference captured only).\n`,
    );
    continue;
  }
  console.log(`diff: ${p.page}`);
  await capture(FRESH_BASE + p.fresh, `${OUT}/current`, p.page);

  report.push(`## ${p.page}\n`);
  report.push(`- WP \`${p.wp}\` vs Fresh \`${p.fresh}\`\n`);
  html.push(
    `<h2>${p.page}</h2><p><code>${p.wp}</code> vs <code>${p.fresh}</code></p>`,
  );
  let hasRef = false;
  for (const width of WIDTHS) {
    const refTxt = `${OUT}/reference/${p.page}-${width}.txt`;
    const curTxt = `${OUT}/current/${p.page}-${width}.txt`;
    try {
      const [a, b] = await Promise.all([
        Deno.readTextFile(refTxt),
        Deno.readTextFile(curTxt),
      ]);
      hasRef = true;
      const { missing, extra } = diffLines(a.split("\n"), b.split("\n"));
      report.push(
        `### ${width}px — ${missing.length} missing / ${extra.length} extra text lines\n`,
      );
      if (missing.length) {
        report.push(
          `missing (WP only, first 10): ${
            missing.slice(0, 10).map((l) => `\n  - ${l.slice(0, 90)}`).join("")
          }\n`,
        );
      }
      if (extra.length) {
        report.push(
          `extra (Fresh only, first 10): ${
            extra.slice(0, 10).map((l) => `\n  + ${l.slice(0, 90)}`).join("")
          }\n`,
        );
      }
      html.push(
        `<h3>${width}px — ${missing.length} missing / ${extra.length} extra</h3>`,
        `<img src="reference/${p.page}-${width}.png"><img src="current/${p.page}-${width}.png">`,
      );
    } catch {
      report.push(
        `### ${width}px — no reference capture (run clone:reference first)\n`,
      );
    }
  }
  if (!hasRef) report.push("_No reference images found at all._\n");
}

await Deno.writeTextFile(`${OUT}/report.md`, report.join("\n"));
await Deno.writeTextFile(
  `${OUT}/report.html`,
  html.join("\n") + "</body></html>",
);
console.log(`report -> ${OUT}/report.{md,html}`);
