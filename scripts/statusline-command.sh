#!/bin/bash

# Read JSON input
input=$(cat)

# Handle both flat and nested JSON structures
model_raw=$(echo "$input" | jq -r 'if .model | type == "object" then .model.display_name else .model end // "Claude"')
# Shorten model name for display (claude-opus-4-5-20251101 -> Opus 4.5)
model=$(echo "$model_raw" | sed -E 's/^claude-//' | sed -E 's/-[0-9]{8}$//' | sed 's/-/./g' | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
output_style=$(echo "$input" | jq -r 'if .output_style | type == "object" then .output_style.name else (.outputStyle // .output_style) end // "default"')
cwd=$(echo "$input" | jq -r '.workspace.current_dir // .cwd // empty')

# Use current directory as fallback
[ -z "$cwd" ] && cwd="$(pwd)"

# Replace home directory with ~
display_cwd="${cwd/#$HOME/~}"

# Get context usage percentage (handle multiple field names)
context_used=$(echo "$input" | jq -r '.context_window.used_percentage // .contextPercentUsed // empty')
if [ -n "$context_used" ]; then
    context_display=$(printf "%.0f%%" "$context_used")
else
    context_display="--"
fi

# Get git branch
git_info=""
if git -C "$cwd" rev-parse --git-dir > /dev/null 2>&1; then
    branch=$(git -C "$cwd" branch --show-current 2>/dev/null || echo "detached")
    git_info=" on $(printf "\033[34m")${branch}$(printf "\033[0m")"
fi

# Build status line similar to p10k style
# Format: display_cwd [git info] [model | style | ctx:X%]
printf "\033[34m%s\033[0m" "$display_cwd"
printf "%s" "$git_info"
printf " \033[90m[\033[0m"
printf "\033[37m%s\033[0m" "$model"
printf "\033[90m | \033[0m"
printf "\033[38;5;18m%s\033[0m" "$output_style"
printf "\033[90m | \033[0m"
printf "\033[36mctx:%s\033[0m" "$context_display"
printf "\033[90m]\033[0m"
