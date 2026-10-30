// Parse the WordPress SQL dump and extract everything the migration needs:
// Elementor kit tokens, per-page widget trees, a widget census, Yoast meta,
// Name-Your-Price fund pricing, template conditions, snippets, redirects.
//
//   node migration/scripts/extract-elementor.ts <dump.sql> <outdir>
//
// <outdir> must live OUTSIDE this repo (it holds content + code snippets —
// never commit it). Reads the dump only; writes only into <outdir>.
//
// Format notes:
// - mysqldump INSERT lines can be tens of MB (one line, many tuples), so we
//   scan line-by-line with a quote-aware tuple splitter — never regex the
//   whole line.
// - wgyd_posts has 23 columns (verified against the dump's CREATE TABLE),
//   wgyd_postmeta and wgyd_options have 4 each. First row arity is checked.
// - Elementor page layouts (_elementor_data) are JSON strings; the global
//   kit's settings (_elementor_page_settings) are PHP-serialize() strings —
//   both are decoded here.

import { createReadStream } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
// Named imports: this file declares its own `process()` row router below.
import { argv, exit } from "node:process";

const [dumpPath, outDir] = argv.slice(2);
if (!dumpPath || !outDir) {
  console.error(
    "usage: node migration/scripts/extract-elementor.ts <dump.sql> <outdir>",
  );
  exit(64);
}

await mkdir(outDir, { recursive: true });
await mkdir(`${outDir}/pages`, { recursive: true });

// ---------- SQL value decoding ----------

const ESCAPES: Record<string, string> = {
  "0": "\0",
  n: "\n",
  r: "\r",
  Z: "\x1a",
  "'": "'",
  '"': '"',
  "\\": "\\",
};

/** Split one `INSERT INTO ... VALUES (...)` payload into rows of fields. */
function parseTuples(payload: string): string[][] {
  const rows: string[][] = [];
  let i = 0;
  const n = payload.length;
  while (i < n) {
    // Row start: skip anything that isn't "(" (newlines, commas, ";").
    while (i < n && payload[i] !== "(") i++;
    if (i >= n) break;
    i++; // past "("
    const row: string[] = [];
    let field = "";
    let inString = false;
    while (i < n) {
      const c = payload[i];
      if (inString) {
        if (c === "\\") {
          const next = payload[i + 1] ?? "";
          field += ESCAPES[next] ?? next;
          i += 2;
          continue;
        }
        if (c === "'") {
          inString = false;
          i++;
          continue;
        }
        // Bulk-append the run up to the next quote/backslash — keeps this
        // fast and allocation-light on multi-MB _elementor_data values.
        let j = i + 1;
        while (j < n && payload[j] !== "'" && payload[j] !== "\\") j++;
        field += payload.slice(i, j);
        i = j;
        continue;
      }
      if (c === "'") {
        inString = true;
        i++;
        continue;
      }
      if (c === ",") {
        row.push(field);
        field = "";
        i++;
        continue;
      }
      if (c === ")") {
        row.push(field);
        rows.push(row);
        i++;
        break;
      }
      // Bulk-append the unquoted run (numbers, NULL) up to the next
      // delimiter; trim any wrapping whitespace.
      let j = i + 1;
      while (
        j < n &&
        payload[j] !== "'" &&
        payload[j] !== "," &&
        payload[j] !== ")"
      )
        j++;
      field += payload.slice(i, j).trim();
      i = j;
    }
  }
  return rows;
}

function convert(field: string): string | number | null {
  if (field === "NULL") return null;
  if (/^-?\d+$/.test(field) && field.length < 16) return Number(field);
  return field;
}

// ---------- PHP unserialize() (subset used by Elementor kits) ----------

function phpUnserialize(src: string): unknown {
  let pos = 0;

  function parseValue(): unknown {
    const type = src[pos];
    const colon = src.indexOf(":", pos + 2);
    const len = Number(src.slice(pos + 2, colon));
    switch (type) {
      case "s": {
        const start = colon + 2; // skip ':"'
        const str = src.slice(start, start + len);
        pos = start + len + 2; // skip '";'
        return str;
      }
      case "i":
      case "d":
      case "b": {
        // Scalars are `t:value;` — the colon is the very next char.
        const c = src.indexOf(":", pos + 1);
        const end = src.indexOf(";", c);
        const raw = src.slice(c + 1, end);
        pos = end + 1;
        if (type === "b") return raw === "1";
        if (type === "d") return raw === "NAN" ? NaN : Number(raw);
        return Number(raw);
      }
      case "N": {
        pos = pos + 2;
        return null;
      }
      case "a": {
        pos = colon + 2; // skip past ':' and '{'
        const out: Record<string, unknown> = {};
        for (let k = 0; k < len; k++) {
          const key = String(parseValue());
          out[key] = parseValue();
        }
        pos++; // skip '}'
        return out;
      }
      default:
        throw new Error(`unhandled php-serialize type ${type} at ${pos}`);
    }
  }

  return parseValue();
}

// ---------- Elementor tree walking ----------

interface El {
  id: string;
  elType: string;
  widgetType?: string;
  settings?: Record<string, unknown>;
  elements?: El[];
}

function walk(el: El, fn: (el: El, depth: number) => void, depth = 0) {
  fn(el, depth);
  for (const child of el.elements ?? []) walk(child, fn, depth + 1);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
}

// ---------- Pass over the dump ----------

const POSTS_COLS = 23;
const wantedPostTypes = new Set([
  "page",
  "post",
  "product",
  "elementor_library",
]);
const metaKeys = new Set([
  "_elementor_data",
  "_elementor_page_settings",
  "_elementor_version",
  "elementor_conditions",
  "elementor_library_type",
  "_wp_page_template",
  "_yoast_wpseo_title",
  "_yoast_wpseo_metadesc",
  "_suggested_price",
  "_min_price",
  "_maximum_price",
]);

interface WpPost {
  ID: number;
  post_title: string;
  post_name: string;
  post_status: string;
  post_type: string;
  post_date: string;
  post_modified: string;
  post_parent: number;
  menu_order: string | number;
}
const posts = new Map<number, WpPost>();
const metaByPost = new Map<number, Record<string, unknown>>();
const elementorOptions: Record<string, unknown> = {};
const snippets: unknown[][] = [];
const redirects: unknown[][] = [];
const otherMetaStats = { rows: 0, revisionsSkipped: 0 };

const file = createReadStream(dumpPath);
const decoder = new TextDecoder();
let buf = "";

// mysqldump wraps extended INSERTs across lines — statements end with ";".
let pending: { table: string; payload: string } | null = null;

const routed: Record<string, number> = {};

function process(table: string, payloadRaw: string) {
  const payload = payloadRaw.replace(/;\s*$/, "");
  const rows = parseTuples(payload);
  routed[table] = (routed[table] ?? 0) + rows.length;
  if (table === "posts") {
    for (const r of rows) {
      if (r.length !== POSTS_COLS) {
        throw new Error(`posts row arity ${r.length}, expected ${POSTS_COLS}`);
      }
      const postType = String(r[20]);
      if (postType === "revision") {
        otherMetaStats.revisionsSkipped++;
        continue;
      }
      if (!wantedPostTypes.has(postType)) continue;
      posts.set(Number(r[0]), {
        ID: Number(r[0]),
        post_title: String(r[5]),
        post_name: String(r[11]),
        post_status: String(r[7]),
        post_type: postType,
        post_date: String(r[2]),
        post_modified: String(r[14]),
        post_parent: Number(r[17]),
        menu_order: r[19],
      });
    }
  } else if (table === "postmeta") {
    otherMetaStats.rows += rows.length;
    for (const r of rows) {
      const key = String(r[2]);
      if (!metaKeys.has(key)) continue;
      const postId = Number(r[1]);
      const bucket = metaByPost.get(postId) ?? {};
      bucket[key] = r[3];
      metaByPost.set(postId, bucket);
    }
  } else if (table === "options") {
    for (const r of rows) {
      const name = String(r[1]);
      if (
        name === "elementor_active_kit" ||
        /breakpoint|container_width/.test(name)
      ) {
        elementorOptions[name] = r[2];
      }
    }
  } else if (table === "snippets") {
    snippets.push(rows.map((r) => r.map(convert)));
  } else if (table === "redirection") {
    for (const r of rows) redirects.push(r.map(convert));
  }
}

function handleLine(line: string) {
  if (pending) {
    pending.payload += "\n" + line;
    if (line.endsWith(";")) {
      process(pending.table, pending.payload);
      pending = null;
    }
    return;
  }
  // Statements look like `INSERT INTO `tbl` VALUES` with the tuples on the
  // SAME line, or starting on the following lines (one row per line).
  const m = line.match(/^INSERT INTO `(wgyd_[a-z_]+)` VALUES\b[\s]?(.*)$/);
  if (!m) return;
  const [, table, payloadRaw] = m;
  const payload = payloadRaw.trimStart();
  const short = table.replace("wgyd_", "");
  if (
    !["posts", "postmeta", "options", "snippets", "redirection_items"].includes(
      short,
    )
  ) {
    return;
  }
  const name = short === "redirection_items" ? "redirection" : short;
  if (line.trimEnd().endsWith(";")) {
    process(name, payload);
  } else {
    pending = { table: name, payload };
  }
}

for await (const chunk of file) {
  buf += decoder.decode(chunk, { stream: true });
  let nl: number;
  while ((nl = buf.indexOf("\n")) !== -1) {
    handleLine(buf.slice(0, nl).replace(/\r$/, ""));
    buf = buf.slice(nl + 1);
  }
}
if (buf.trim()) handleLine(buf.trimEnd());

// ---------- Decode + emit ----------

const write = (name: string, data: unknown) =>
  writeFile(`${outDir}/${name}`, JSON.stringify(data, null, 2));

// Kit tokens.
const kitId = Number(elementorOptions["elementor_active_kit"] ?? 66);
const kitSettingsRaw = metaByPost.get(kitId)?.["_elementor_page_settings"];
if (typeof kitSettingsRaw !== "string") {
  throw new Error(
    `no _elementor_page_settings for kit ${kitId} — parser captured ` +
      `${metaByPost.size} posts, options: ${Object.keys(elementorOptions).join(
        ", ",
      )}`,
  );
}
const kit = phpUnserialize(kitSettingsRaw) as Record<string, unknown>;
await write("kit.json", {
  id: kitId,
  options: elementorOptions,
  settings: kit,
});

// Per-post elementor trees, census, yoast, nyp.
interface CensusEntry {
  id: number;
  slug: string;
  type: string;
  status: string;
  title: string;
  sections: number;
  containers: number;
  columns: number;
  widgets: number;
  widgetCounts: Record<string, number>;
  maxDepth: number;
  textChars: number;
  responsiveKeys: number;
}
const census: CensusEntry[] = [];
const yoast: Record<string, unknown> = {};
const nyp: Record<string, unknown> = {};
const conditions: Record<string, unknown> = {};

for (const [id, post] of posts) {
  const m = metaByPost.get(id) ?? {};
  const title = `${post.post_title} (${post.post_type}/${post.post_status})`;

  if (typeof m["_elementor_data"] === "string" && m["_elementor_data"] !== "") {
    let tree: El[] = [];
    try {
      tree = JSON.parse(m["_elementor_data"]);
    } catch (e) {
      console.error(
        `JSON parse failed for post ${id}: ${
          e instanceof Error ? e.message : e
        }`,
      );
    }
    await writeFile(
      `${outDir}/pages/${id}-${post.post_name || "noslug"}.json`,
      JSON.stringify(
        { post, meta: { ...m, _elementor_data: undefined }, tree },
        null,
        2,
      ),
    );

    const widgetCounts: Record<string, number> = {};
    let sections = 0,
      containers = 0,
      columns = 0,
      widgets = 0,
      maxDepth = 0,
      textChars = 0;
    const responsiveVariants = new Set<string>();
    for (const root of tree) {
      walk(root, (el, depth) => {
        maxDepth = Math.max(maxDepth, depth);
        if (el.elType === "section") sections++;
        else if (el.elType === "container") containers++;
        else if (el.elType === "column") columns++;
        else if (el.elType === "widget") {
          widgets++;
          const wt = el.widgetType ?? "?";
          widgetCounts[wt] = (widgetCounts[wt] ?? 0) + 1;
          const s = el.settings ?? {};
          const editor = s.editor as string | undefined;
          if (editor) textChars += stripTags(editor).trim().length;
          for (const k of Object.keys(s)) {
            if (/_tablet$|_mobile$/.test(k)) responsiveVariants.add(k);
          }
        }
      });
    }
    census.push({
      id,
      slug: post.post_name,
      type: post.post_type,
      status: post.post_status,
      title,
      sections,
      containers,
      columns,
      widgets,
      widgetCounts,
      maxDepth,
      textChars,
      responsiveKeys: responsiveVariants.size,
    });
  }

  if (m["_yoast_wpseo_title"] || m["_yoast_wpseo_metadesc"]) {
    yoast[String(post.post_name || id)] = {
      title: m["_yoast_wpseo_title"] ?? null,
      metadesc: m["_yoast_wpseo_metadesc"] ?? null,
    };
  }
  if (m["_suggested_price"] || m["_min_price"]) {
    nyp[String(post.post_name || id)] = {
      title: post.post_title,
      suggested: m["_suggested_price"] ?? null,
      min: m["_min_price"] ?? null,
      max: m["_maximum_price"] ?? null,
    };
  }
  if (m["elementor_conditions"]) {
    conditions[`${id}-${post.post_name}`] = {
      title: post.post_title,
      library_type: m["elementor_library_type"] ?? null,
      conditions: m["elementor_conditions"],
    };
  }
}

await write("census.json", census);
await write("yoast.json", yoast);
await write("nyp.json", nyp);
await write("conditions.json", conditions);
await write("snippets.json", snippets.flat());
await write("redirection.json", redirects);

// ---------- Console summary ----------

const live = census.filter((c) => c.status === "publish");
console.log(
  `posts of interest: ${posts.size} (revisions skipped: ${otherMetaStats.revisionsSkipped})`,
);
console.log(
  `elementor-edited entities: ${census.length} (${live.length} published)`,
);
console.log(`\nPublished, by widget count:`);
for (const c of [...live].sort((a, b) => b.widgets - a.widgets)) {
  console.log(
    `  ${String(c.widgets).padStart(3)} widgets, ${String(c.sections).padStart(
      2,
    )} sections, ${String(c.textChars).padStart(
      5,
    )} chars — ${c.slug} [${c.type}]`,
  );
}
console.log(`\nAll distinct widget types across published entities:`);
const totals: Record<string, number> = {};
for (const c of live) {
  for (const [k, v] of Object.entries(c.widgetCounts)) {
    totals[k] = (totals[k] ?? 0) + v;
  }
}
for (const [k, v] of Object.entries(totals).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(v).padStart(3)}  ${k}`);
}
console.log(
  `\nKit typography keys: ${Object.keys(
    (kit.system_typography ?? {}) as object,
  ).join(", ")}`,
);
console.log(
  `snippets rows: ${snippets.flat().length}, redirects: ${redirects.length}`,
);
