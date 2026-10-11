# Phase 2 runbook — Cloudflare R2 asset bucket

Everything here runs on **your Mac + the Cloudflare dashboard** — no SSH. The
WordPress media (1.5G) is already downloaded at
`~/projects/github.com/favorcare/migration-files/uploads/`, so uploading is a
local `rclone copy` toward R2.

## Part A — Cloudflare dashboard (~5 min, one-time)

1. **Create the bucket**: dashboard → R2 → _Create bucket_ → name
   `favorcare-media` → location _Automatic_. (Free tier: 10G storage, zero
   egress.)
2. **Create the API token**: R2 → _Manage R2 API Tokens_ → _Create API token_ →
   permission **Object Read & Write**, scope **Apply to specific buckets only →
   favorcare-media**. You get an **Access Key ID** and **Secret Access Key** —
   shown once, store them somewhere safe (they are NOT the rclone config's only
   copy; treat like passwords).
3. **Attach the public domain**: bucket → _Settings_ → _Public Access_ → _Custom
   Domain_ → `assets.favorcare.org`. It must be a hostname in the
   `favorcare.org` zone (it is) — Cloudflare creates the DNS record and serves
   the bucket through its CDN automatically.
4. Note your **Account ID** (dashboard right sidebar, or R2 overview page).

## Part B — local rclone setup (one-time)

```sh
brew install rclone

rclone config create r2 s3 \
  provider=Cloudflare \
  endpoint=https://<ACCOUNT_ID>.r2.cloudflarestorage.com \
  access_key_id=<ACCESS_KEY_ID> \
  secret_access_key=<SECRET_ACCESS_KEY>
```

`rclone config create` writes `~/.config/rclone/rclone.conf` with a remote named
`r2`. With S3 remotes the **first path segment after `:` is the bucket name**,
so paths look like `r2:favorcare-media/images`.

Sanity check (read-only):

```sh
rclone lsd r2:            # lists buckets — should show favorcare-media
```

## Part C — uploads (both are plain `copy`, nothing can be deleted)

```sh
# 1. WordPress media — path-preserving so every legacy URL keeps its shape
#    (bucket gets wp-content/uploads/YYYY/MM/file…, 1.5G, takes a few minutes)
rclone copy -P ~/projects/github.com/favorcare/migration-files/uploads \
  r2:favorcare-media/wp-content/uploads

# 2. This repo's images (same bucket, `images/` prefix — matches
#    scripts/assets.ts)
cd ~/projects/github.com/favorcare/favorcare.org
rclone copy -P static/images r2:favorcare-media/images
```

Re-running either is safe — `rclone copy` only adds/updates changed files, never
deletes (we never use `--delete`).

## Part D — verify

```sh
curl -I https://assets.favorcare.org/wp-content/uploads/2022/10/PCNC.png
# → HTTP/2 200  (content-type: image/png)

curl -I https://assets.favorcare.org/images/posts/antipolo-team.jpg
# → HTTP/2 200
```

If the custom domain was just attached, give the DNS/SSL a minute or two.

## Part E — LATER, deliberately (do NOT do yet)

Once prod is ready to serve from R2 (MIGRATION.md Phase 2, before cutover):

1. Set `ASSET_BASE_URL=https://assets.favorcare.org` on the Deno Deploy project
   — every `asset()` URL flips to the CDN.
2. Verify the deployed site's images still load.
3. Only then untrack local copies: `git rm -r --cached static/images`.

Until step 1 runs, the site is unchanged — local dev keeps using
`static/images/`, and nothing 404s.

## After this

Tell the agent the bucket is live. Page-clone PRs will then reference
`https://assets.favorcare.org/wp-content/uploads/…` URLs directly in cloned
content (works in dev and prod, and stops depending on the WP box staying up).
The legacy same-path Cloudflare route for `favorcare.org/wp-content/*` is
configured at cutover (Phase 8), not now.
