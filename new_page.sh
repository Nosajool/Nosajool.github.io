#!/bin/bash


title=$1
date=`date -j "+%Y-%m-%d"`
page_title="_posts/${date}-${title}.md"

touch $post_title

echo "Created $post_title."
