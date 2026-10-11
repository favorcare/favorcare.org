#!/usr/bin/env bash
# Cloudflare Workers Builds — build-stage script.
#
# The dashboard runs this as the Build command, then the Deploy command
# (`CF=1 npx wrangler deploy`) bundles the Worker. Two stages are required
# (see deno.json "deploy"): a plain Fresh build first — it emits
# _fresh/server.js, which the worker entry (server.js) imports — then the
# wrangler/vite Cloudflare build wraps it.
#
# Sets up Deno when the build image doesn't provide it.
set -euo pipefail

if ! command -v deno >/dev/null 2>&1; then
  echo ":: installing deno"
  curl -fsSL https://deno.land/install.sh | sh -s -- -y
  export DENO_INSTALL="$HOME/.deno"
  export PATH="$DENO_INSTALL/bin:$PATH"
fi

echo ":: deno $(deno --version | head -1)"

# nodeModulesDir is "manual" — populate node_modules (vite, tailwind,
# @cloudflare/vite-plugin, wrangler, …) before building.
deno install

# Stage 1: standard Fresh build -> _fresh/server.js + _fresh/client/**
deno task build

echo ":: build stage complete"
