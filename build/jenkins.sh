#!/bin/bash
set -ex

# Build image with necessary deps
DOCKER_IMAGE_ID=`build/build-docker-workspace.sh`

# Run tests in image and stage the domain
docker run --rm ${DOCKER_IMAGE_ID} "build/test-and-stage.sh"
