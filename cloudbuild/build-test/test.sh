#!/usr/bin/env sh
set -euxo pipefail

nix-shell --pure --command "$(cat <<NIXCMD
  export PGHOST=127.0.0.1
  export PGDATABASE=postgres
  export PGUSER=673673622326@cloudbuild
  cd /workspace
  yarn install --frozen-lockfile
  yarn lint && yarn build && yarn test
NIXCMD
)"
