#!/bin/bash
set -ex

# Run tests
bundle exec rake test

# Get netlify-cli
npm i -g netlify-cli

# Stage
netlify deploy --dir=public --message $BUILD_TAG
