#!/bin/bash
set -ex

# Install netlify
npm i -g netlify-cli

# Build the site
bundle exec rake jekyll

# Deploy
netlify deploy --prod --dir=public --message $BUILD_TAG
