#!/bin/bash
set -ex

BUILD_TAG="${BUILD_TAG:-"$(uuidgen)"}"
IMAGE_NAME="dev-socrata-build:$(echo "${BUILD_TAG}" | tr ' ' '-')"
DOCKERFILE="build/Dockerfile"

docker build \
  --build-arg BUILD_NUMBER=$BUILD_NUMBER \
  --build-arg SURGE_LOGIN=$SURGE_LOGIN \
  --build-arg SURGE_TOKEN=$SURGE_TOKEN \
  --tag "${IMAGE_NAME}" \
  --file "${DOCKERFILE}" \
  . 1>&2

echo "${IMAGE_NAME}"
