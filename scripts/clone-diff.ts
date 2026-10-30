// Clone-parity harness: screenshots + text parity between the vinext app and
// the canonical WordPress site (staging.favorcare.org).
//
//   pnpm clone:reference             # capture WP reference screenshots
//   pnpm clone:diff                       # capture + compare w/ reference
//   node scripts/clone-diff.ts compare --against <dir>
//                                         # pixel-diff current/ vs a saved
//                                         # baseline (e.g. app-baseline/)
//   pnpm clone:diff -- --pages home  # single page
//
// Output (default ../migration-files/clone-diff — outside the repo):
//   reference/<page>-<width>.png|.txt     one-time WP captures
//   current/<page>-<width>.png|.txt       app captures per run
//   report.html / report.md               side-by-sides + text-parity report
//
// Screenshots are full-page at 360/768/1280 with animations disabled and
// fonts loaded. Text parity compares normalized, DEDUPED body text —
// Elementor duplicates content per breakpoint, so duplicates are dropped.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const WP_BASE = "https://staging.favorcare.org";
const baseFlag = process.argv.indexOf("--base");
const APP_BASE =
  baseFlag !== -1 ? process.argv[baseFlag + 1] : "http://127.0.0.1:5173";
const WIDTHS = [360, 768, 1280];

interface Pair {
  page: string;
  wp: string | null; // null = not on WP (app-only)
  app: string | null; // null = route not built yet
  /** "chrome" = also hide header/footer/nav on both sides. Used for
   * privacy-policy: WP serves that page a stale header template while
   * the clone standardizes on the site-wide chrome (documented quirk). */
  mask?: "chrome";
}

const PAIRS: Pair[] = [
  { page: "home", wp: "/", app: "/" },
  { page: "about", wp: "/about", app: "/who-we-are" },
  { page: "what-we-do", wp: "/what-we-do", app: "/what-we-do" },
  { page: "get-involved", wp: "/get-involved", app: "/get-involved" },
  { page: "contact", wp: "/contact", app: "/contact" },
  { page: "givenow", wp: "/givenow", app: "/givenow" },
  { page: "news-updates", wp: "/posts", app: "/posts" },
  {
    page: "post-tondo",
    wp: "/posts/seen-valued-and-cared-for-our-medical-outreach-in-tondo-manila",
    app: "/posts/seen-valued-and-cared-for-our-medical-outreach-in-tondo-manila",
  },
  {
    page: "post-antipolo",
    wp: "/posts/every-child-matters-bringing-health-and-care-to-antipolo",
    app: "/posts/every-child-matters-bringing-health-and-care-to-antipolo",
  },
  {
    page: "post-five-arms",
    wp: "/posts/five-arms-of-favor-care",
    app: "/posts/five-arms-of-favor-care",
  },
  {
    page: "privacy-policy",
    wp: "/privacy-policy",
    app: "/privacy-policy",
    mask: "chrome",
  },
];

const args = process.argv.slice(2);
const mode =
  args[0] === "reference"
    ? "reference"
    : args[0] === "compare"
      ? "compare"
      : "diff";
const outFlag = args.findIndex((a: string) => a === "--out");
const OUT =
  outFlag !== -1 ? args[outFlag + 1] : "../migration-files/clone-diff";
const againstFlag = args.findIndex((a: string) => a === "--against");
const AGAINST = againstFlag !== -1 ? args[againstFlag + 1] : null;
const pagesFlag = args.findIndex((a: string) => a === "--pages");
const only = pagesFlag !== -1 ? args[pagesFlag + 1].split(",") : null;

async function capture(url: string, dir: string, name: string, chrome = true) {
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
          // lands in innerText); the app's <dialog>s are display:none when
          // closed. Mask the WP popups so text parity compares page
          // content, not hidden dialogs.
          `.dialog-widget{display:none!important}` +
          (chrome
            ? ""
            : `header,footer,nav,[role=banner]{display:none!important}`),
      });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `${dir}/${name}-${width}.png`,
        fullPage: true,
      });
      const text = await page.evaluate(() => document.body?.innerText ?? "");
      const normalized = dedupe(
        text
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean),
      );
      await writeFile(`${dir}/${name}-${width}.txt`, normalized.join("\n"));
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
  const setA = new Set(a),
    setB = new Set(b);
  const missing = a.filter((l) => !setB.has(l)); // on WP, not in the app
  const extra = b.filter((l) => !setA.has(l)); // in the app, not on WP
  return { missing, extra };
}

await mkdir(`${OUT}/reference`, { recursive: true });
await mkdir(`${OUT}/current`, { recursive: true });

const pairs = PAIRS.filter((p) => !only || only.includes(p.page));

if (mode === "compare") {
  if (!AGAINST) {
    console.error("compare needs --against <baseline dir>");
    process.exit(64);
  }
  // Pixel-diff each current/<page>-<width>.png against the baseline's, in
  // a browser canvas (no image dependencies). A pixel differs when any
  // channel is off by more than TOLERANCE; antialiasing noise stays under it.
  const TOLERANCE = 24;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const lines = ["page, width, size(base→cur), differing px %"];
  for (const p of pairs) {
    for (const width of WIDTHS) {
      const name = `${p.page}-${width}.png`;
      const [a, b] = await Promise.all([
        readFile(`${AGAINST}/${name}`),
        readFile(`${OUT}/current/${name}`),
      ]).catch(() => [null, null]);
      if (!a || !b) {
        lines.push(`${p.page}, ${width}, missing capture`);
        continue;
      }
      const r = await page.evaluate(
        async ([x, y, tol]: [string, string, number]) => {
          const load = (src: string) =>
            new Promise<HTMLImageElement>((res, rej) => {
              const img = new Image();
              img.onload = () => res(img);
              img.onerror = rej;
              img.src = src;
            });
          const [ia, ib] = await Promise.all([load(x), load(y)]);
          const w = Math.max(ia.width, ib.width);
          const h = Math.max(ia.height, ib.height);
          const px = (img: HTMLImageElement) => {
            const c = document.createElement("canvas");
            c.width = w;
            c.height = h;
            const ctx = c.getContext("2d")!;
            ctx.drawImage(img, 0, 0);
            return ctx.getImageData(0, 0, w, h).data;
          };
          const da = px(ia),
            db = px(ib);
          let diff = 0;
          for (let i = 0; i < da.length; i += 4) {
            if (
              Math.abs(da[i] - db[i]) > tol ||
              Math.abs(da[i + 1] - db[i + 1]) > tol ||
              Math.abs(da[i + 2] - db[i + 2]) > tol
            )
              diff++;
          }
          return {
            sizes: `${ia.width}x${ia.height}→${ib.width}x${ib.height}`,
            pct: (diff / (w * h)) * 100,
          };
        },
        [
          `data:image/png;base64,${a.toString("base64")}`,
          `data:image/png;base64,${b.toString("base64")}`,
          TOLERANCE,
        ] as [string, string, number],
      );
      lines.push(`${p.page}, ${width}, ${r.sizes}, ${r.pct.toFixed(3)}%`);
    }
  }
  await browser.close();
  console.log(lines.join("\n"));
  process.exit(0);
}

if (mode === "reference") {
  for (const p of pairs) {
    if (!p.wp) continue;
    console.log(`reference: ${p.page} (${p.wp})`);
    await capture(WP_BASE + p.wp, `${OUT}/reference`, p.page, !p.mask);
  }
  console.log(`done -> ${OUT}/reference`);
  process.exit(0);
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
  if (!p.app) {
    report.push(
      `## ${p.page}\n\n- App route not built yet (reference captured only).\n`,
    );
    continue;
  }
  console.log(`diff: ${p.page}`);
  await capture(APP_BASE + p.app, `${OUT}/current`, p.page, !p.mask);

  report.push(`## ${p.page}\n`);
  report.push(`- WP \`${p.wp}\` vs app \`${p.app}\`\n`);
  html.push(
    `<h2>${p.page}</h2><p><code>${p.wp}</code> vs <code>${p.app}</code></p>`,
  );
  let hasRef = false;
  for (const width of WIDTHS) {
    const refTxt = `${OUT}/reference/${p.page}-${width}.txt`;
    const curTxt = `${OUT}/current/${p.page}-${width}.txt`;
    try {
      const [a, b] = await Promise.all([
        readFile(refTxt, "utf8"),
        readFile(curTxt, "utf8"),
      ]);
      hasRef = true;
      const { missing, extra } = diffLines(a.split("\n"), b.split("\n"));
      report.push(
        `### ${width}px — ${missing.length} missing / ${extra.length} extra text lines\n`,
      );
      if (missing.length) {
        report.push(
          `missing (WP only, first 10): ${missing
            .slice(0, 10)
            .map((l) => `\n  - ${l.slice(0, 90)}`)
            .join("")}\n`,
        );
      }
      if (extra.length) {
        report.push(
          `extra (app only, first 10): ${extra
            .slice(0, 10)
            .map((l) => `\n  + ${l.slice(0, 90)}`)
            .join("")}\n`,
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

await writeFile(`${OUT}/report.md`, report.join("\n"));
await writeFile(`${OUT}/report.html`, html.join("\n") + "</body></html>");
console.log(`report -> ${OUT}/report.{md,html}`);
