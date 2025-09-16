#!/bin/bash

# This script will find every changed file and commit it individually.

# Use git status --porcelain to get a list of files that are easy to parse.
git status --porcelain | while read -r line; do
  # Extract the status and the filename.
  status=$(echo "$line" | awk '{print $1}')
  file=$(echo "$line" | awk '{print $2}')

  # Determine the commit message based on the file's status.
  commit_message=""
  case "$status" in
    "M")
      commit_message="style: Update ${file}"
      ;;
    "A")
      commit_message="feat: Add ${file}"
      ;;
    "??")
      commit_message="feat: Add untracked file ${file}"
      ;;
    "D")
      commit_message="fix: Remove ${file}"
      ;;
    *)
      # Skip any other statuses to be safe
      continue
      ;;
  esac

  # Stage the individual file.
  echo "Staging -> ${file}"
  git add "$file"

  # Commit the individual file.
  echo "Committing -> ${commit_message}"
  git commit -m "$commit_message"

  echo "-----------------------------------"
done

echo "All files have been committed individually."