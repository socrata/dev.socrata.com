#!/bin/bash
set -ex

# Run tests
bundle exec rake test

# Get surge for staging
npm i -g surge

# Stage
bundle exec rake stage
