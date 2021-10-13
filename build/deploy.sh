#!/bin/bash
set -ex

# Install surge
npm i -g surge

# Build the site
bundle exec rake jekyll

# Deploy
# Surge will use the domain name specified in the CNAME file automatically
surge --project ./public
