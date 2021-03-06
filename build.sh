#!/bin/bash

CURRENT_DIR=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )
cd "$CURRENT_DIR"

yarn build
cd dist

git init
git remote add origin git@github.com:altbdoor/reddit-preview.git

git add .
timestamp=$(date '+%Y-%m-%dT%H:%M:%S%z')
git commit -m "[build] updated gh-pages on $timestamp"

git branch -m gh-pages
git push --force origin gh-pages
