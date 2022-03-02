#!/bin/bash
set -ex

# Install surge
npm i -g surge

# Build the site
bundle exec rake jekyll

# Deploy
surge --project ./public --domain https://dev.socrata.com
