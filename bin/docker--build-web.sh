#!/usr/bin/env bash
set -euo pipefail

IMAGE=expo42-web
CTR=expo42-web-build
OUT_DIR=${1:-web-build}

echo "🔨  Building Docker image…"
docker build --progress=plain -t "$IMAGE" -f build.Dockerfile \
	. 

echo "📦  Creating build container…"
# clean up any previous run
docker rm -f "$CTR" >/dev/null 2>&1 || true
docker create --name "$CTR" "$IMAGE" >/dev/null

echo "📤  Copying build artefacts to host → ./${OUT_DIR}"
rm -rf "${OUT_DIR}"
docker cp "$CTR":/export/web-build "./${OUT_DIR}"

echo "🧹  Cleaning up"
docker rm -f "$CTR" >/dev/null

echo "✅  Done – static site is in ./${OUT_DIR}"
