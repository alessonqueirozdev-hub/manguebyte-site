#!/usr/bin/env bash
# Cloud setup for manguebyte-site on Claude Code on the web (Ubuntu 24.04, run as root).
# Idempotent: run it as often as you like. It installs only what this
# repository needs, fetches dependencies and leaves the tests running.
#
#   bash scripts/cloud-setup.sh           # set up and build the tests
#   bash scripts/cloud-setup.sh --test    # ... and run the full check

set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
RUN_TESTS=0
[ "${1:-}" = "--test" ] && RUN_TESTS=1

apt_install() {
  local missing=()
  for p in "$@"; do dpkg -s "$p" >/dev/null 2>&1 || missing+=("$p"); done
  if [ "${#missing[@]}" -gt 0 ]; then
    apt-get update -qq
    DEBIAN_FRONTEND=noninteractive apt-get install -y -qq "${missing[@]}"
  fi
}

rust_ready() {
  command -v rustup >/dev/null 2>&1 || { echo "rustup is missing" >&2; exit 1; }
  rustup toolchain install stable --profile minimal --component rustfmt,clippy >/dev/null
  rustup default stable >/dev/null
}

command -v node >/dev/null 2>&1 || { echo "node is missing" >&2; exit 1; }
if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; fi
node build.mjs
if [ "$RUN_TESTS" = 1 ]; then
  echo "Built into dist/. Preview: node serve.mjs"
fi
echo "Site ready."
