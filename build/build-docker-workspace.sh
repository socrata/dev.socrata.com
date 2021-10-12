#!/bin/bash

BUILD_TAG="${BUILD_TAG:-"$(uuidgen)"}"
IMAGE_NAME="dev-socrata-build:$(echo "${BUILD_TAG}" | tr ' ' '-')"
DOCKERFILE="build/Dockerfile"

echo "Building worker image '${IMAGE_NAME}'" >&2

echo "PWD: $(pwd)"

docker build \
  --tag "${IMAGE_NAME}" \
  --file "${DOCKERFILE}" \
  . 1>&2

echo "${IMAGE_NAME}"