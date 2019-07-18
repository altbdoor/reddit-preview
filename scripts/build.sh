#!/bin/bash

CURRENT_DIR=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )
cd "$CURRENT_DIR"

cd ..
yarn build
cd build

git init
git remote add origin git@github.com:altbdoor/ng-reddit-rss.git

git add .
timestamp=$(date '+%Y-%m-%dT%H:%M:%S%z')
git commit -m "[build] updated gh-pages on $timestamp"

git branch -m gh-pages
git push --force origin gh-pages
