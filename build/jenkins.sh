#!/bin/bash
set -ex

# Build image with necessary deps
DOCKER_IMAGE_ID=`build/build-docker-workspace.sh`

# Run tests in image
docker run --rm ${DOCKER_IMAGE_ID} "bundle exec rake test"
