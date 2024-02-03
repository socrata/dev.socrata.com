#!/bin/bash
set -ex

BUILD_TAG="${BUILD_TAG:-"$(uuidgen)"}"
IMAGE_NAME="dev-socrata-build:$(echo "${BUILD_TAG}" | tr ' ' '-')"
DOCKERFILE="build/Dockerfile"

docker build \
  --build-arg BUILD_NUMBER=$BUILD_NUMBER \
  --build-arg NETLIFY_AUTH_TOKEN=$NETLIFY_AUTH_TOKEN \
  --tag "${IMAGE_NAME}" \
  --file "${DOCKERFILE}" \
  . 1>&2

echo "${IMAGE_NAME}"
