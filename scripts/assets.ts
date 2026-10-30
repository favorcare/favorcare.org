// Sync public/images/ with the Cloudflare R2 media bucket.
//
//   pnpm assets:pull   # R2 -> public/images (bucket-parity check)
//   pnpm assets:push   # public/images -> R2 (manual publish)
//
// public/images/ is tracked in git: clones get images for free, and merges
// to main are published automatically by .github/workflows/sync-assets.yml.
// These tasks remain for bootstrapping a bucket and manual/hotfix pushes.
//
// Prerequisites (one-time — full walkthrough in
// migration/runbooks/phase2-r2-assets.md):
//
//   brew install rclone
//   rclone config create r2 s3 \
//     provider=Cloudflare \
//     endpoint=https://<ACCOUNT_ID>.r2.cloudflarestorage.com \
//     access_key_id=<R2_TOKEN_ACCESS_KEY> \
//     secret_access_key=<R2_TOKEN_SECRET>
//
// The `favorcare-media` bucket holds two path prefixes: `images/**` (this
// site's assets, referenced through utils/assets.ts) and
// `wp-content/uploads/**` (legacy WordPress media, path-preserved so old
// URLs keep resolving). With S3 remotes the first path segment is the
// BUCKET name — hence `r2:favorcare-media/images`.
//
// Both directions are plain `rclone copy` — no --delete — so neither the
// bucket nor the local tree can lose files through this script.

import { spawn } from "node:child_process";

const BUCKET = process.env.R2_BUCKET ?? "r2:favorcare-media/images";
const LOCAL_DIR = "public/images";

const command = process.argv[2];
if (command !== "pull" && command !== "push") {
  console.error(
    `usage: pnpm assets:pull | pnpm assets:push\n` +
      `  pull  ${BUCKET} -> ${LOCAL_DIR} (set up local dev)\n` +
      `  push  ${LOCAL_DIR} -> ${BUCKET} (publish new images)`,
  );
  process.exit(64);
}

const [src, dst] =
  command === "pull" ? [BUCKET, LOCAL_DIR] : [LOCAL_DIR, BUCKET];

const code = await new Promise<number>((resolve) => {
  const rclone = spawn("rclone", ["copy", "-P", src, dst], {
    stdio: ["ignore", "inherit", "inherit"],
  });
  rclone.on("error", () => resolve(127));
  rclone.on("close", (c) => resolve(c ?? 1));
});

if (code !== 0) {
  console.error(
    `\nrclone exited ${code}. Is rclone installed and the ` +
      `"favorcare-media" remote configured? See the header of this file.`,
  );
  process.exit(code);
}
