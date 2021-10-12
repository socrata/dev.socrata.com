#!/bin/bash
set -ex

BUILD_TAG="${BUILD_TAG:-"$(uuidgen)"}"
IMAGE_NAME="dev-socrata-build:$(echo "${BUILD_TAG}" | tr ' ' '-')"
DOCKERFILE="build/Dockerfile"

docker build \
  --tag "${IMAGE_NAME}" \
  --file "${DOCKERFILE}" \
  . 1>&2

echo "${IMAGE_NAME}"