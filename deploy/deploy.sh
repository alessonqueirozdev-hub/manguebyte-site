#!/bin/sh
# Builds the site and puts it on the server.
#
#   DEPLOY_HOST=user@server DEPLOY_PATH=/var/www/manguebyte.org ./deploy/deploy.sh
#
# Each deploy is unpacked into a folder named after the time, and the link
# `current`, which the web server serves, is moved to it in one step, so a
# reader never sees half a site. The last three versions are kept; to go
# back, point `current` at an earlier one.

set -eu

: "${DEPLOY_HOST:?Set DEPLOY_HOST to the server, as user@host}"
: "${DEPLOY_PATH:?Set DEPLOY_PATH to the folder that holds the site}"

cd "$(dirname "$0")/.."
node build.mjs

stamp=$(date +%Y%m%d-%H%M%S)
tar -C dist -czf - . | ssh "$DEPLOY_HOST" "
  set -eu
  mkdir -p '$DEPLOY_PATH'
  cd '$DEPLOY_PATH'
  mkdir '$stamp'
  tar -C '$stamp' -xzf -
  ln -sfn '$stamp' current.new
  mv -T current.new current
  ls -1d 20[0-9][0-9][0-9][0-9][0-9][0-9]-*/ | sort | head -n -3 | xargs -r rm -rf
"

echo "Deployed $stamp to $DEPLOY_HOST:$DEPLOY_PATH/current"
