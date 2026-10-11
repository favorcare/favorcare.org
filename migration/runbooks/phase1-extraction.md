# Phase 1 runbook — WordPress inventory & extraction

Annotated, safety-first runbook for pulling the database dump and files out of
the WordPress box. Every command here either **reads** the server or **creates a
new file**. Nothing writes to the database, deletes anything, or reconfigures
WordPress.

## The box

| Fact             | Value                                                                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Host             | `staging.favorcare.org` (cPanel, user `stagingfavorcare`)                                                                                                                                                                                                                                                          |
| WordPress root   | `/home/stagingfavorcare/public_html`                                                                                                                                                                                                                                                                               |
| wp-cli           | 2.12.0 via cPanel WP Toolkit (works; ignore the harmless `session.gc_divisor` PHP warning)                                                                                                                                                                                                                         |
| Table prefix     | `wgyd_`                                                                                                                                                                                                                                                                                                            |
| Theme            | `hello-elementor` (no child theme)                                                                                                                                                                                                                                                                                 |
| Canonical status | **This staging install is the canonical content source** (decided 2026-10-11): its content is fresher than live favorcare.org — e.g. "Five Arms" republished 2026-10-08, posts re-slugged, the live `-2` duplicate suffix gone. Live URLs (crawled 2026-10-11, see `../inventory.md`) still feed the redirect map. |
| Do not touch     | `/home/stagingfavorcare/oldfilesbackup/` (stale copy), `~/wordpress-backups/`, `~/database_migrate/`                                                                                                                                                                                                               |

## Never-run list (on the server)

`wp db import` · `wp db reset` · `wp search-replace` without `--dry-run` ·
`wp post delete/update` · `wp plugin install/delete/update` · `wp core update` ·
`rm -rf` · editing `wp-config.php` · any `rsync` with `--delete` or with a local
directory as the source.

## Steps

### 1. Recon (read-only)

```sh
ssh staging.favorcare.org
cd ~/public_html          # WordPress root (wp-config.php lives here)

wp option get siteurl     # confirmed: http://staging.favorcare.org
wp plugin list --status=active
wp theme list
wp post list --post_type=post --fields=post_title,post_name,post_status,post_date
wp post list --post_type=page --fields=ID,post_title,post_name,post_status > ~/pages.txt
wp db prefix              # wgyd_
du -sh wp-content/uploads # ~1.5G
```

Findings (2026-10-11) are recorded in [`../../MIGRATION.md`](../../MIGRATION.md)
Phase 1 — headline: **no Subscriptions/recurring plugins** (Phase 6 scope
locked), PayMongo gateway confirmed active, `code-snippets` / `redirection` /
`post-smtp` queued for review during Phase 4.

### 2. Database export (creates one new file on the server)

```sh
wp db export /home/stagingfavorcare/favorcare-staging-$(date +%F).sql
ls -lh ~/favorcare-staging-*.sql
wp option get mc4wp --format=json > ~/mc4wp-secrets.json   # ⚠️ Mailchimp API key inside
```

`wp db export` walks every table and writes SQL INSERTs to a new file; the
database it reads is never modified. The dump contains password hashes, salts,
donor emails, and order history — treat it as a secret.

### 3. Download to the operator data dir

The dump and files land in an **operator-managed directory outside this repo**
(a sibling of the repo working tree — never inside it; this repo is public).
Substitute your path below.

```sh
# locally, from the data dir:
scp staging.favorcare.org:/home/stagingfavorcare/favorcare-staging-YYYY-MM-DD.sql db/
scp staging.favorcare.org:/home/stagingfavorcare/pages.txt db/
scp staging.favorcare.org:/home/stagingfavorcare/mc4wp-secrets.json db/

rsync -av staging.favorcare.org:/home/stagingfavorcare/public_html/wp-content/uploads/ uploads/
# uploads/ includes the clone crown jewels: elementor/css/post-*.css and
# elementor/google-fonts/ (self-hosted DM Sans).

rsync -av staging.favorcare.org:/home/stagingfavorcare/public_html/wp-content/themes/ themes/
rsync -av staging.favorcare.org:/home/stagingfavorcare/public_html/wp-content/mu-plugins/ muplugins/ || echo "no mu-plugins"
```

`rsync -av remote → local` is a pure copy toward you. We never use `--delete`;
the trailing slash on the source means "the contents of".

### 4. Verify, then clean the server copies

```sh
grep -c 'CREATE TABLE' db/favorcare-staging-YYYY-MM-DD.sql   # expect a few dozen tables
ssh staging.favorcare.org 'rm ~/favorcare-staging-*.sql ~/mc4wp-secrets.json'
```

Only the two files we created in step 2 are removed — after the local copy is
verified.

### 5. Delta re-runs

No content freeze: re-running the export + `rsync` (no `--delete`) any time
picks up only what changed. Final delta happens at cutover (Phase 8), diffed
against `../inventory.md`.
