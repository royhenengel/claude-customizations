#!/bin/bash
# Context Compaction Guard Hook
# Fires on UserPromptSubmit after context compaction to remind
# Claude to re-read the active workflow skill before proceeding.

# Read user message from stdin
INPUT=$(cat)

# Check if this is a context compaction resume
if ! echo "$INPUT" | grep -q "continued from a previous conversation"; then
  exit 0
fi

# Only relevant in worktrees with a feature branch
if [ ! -f .git ]; then exit 0; fi

BRANCH=$(git branch --show-current 2>/dev/null)
if [ -z "$BRANCH" ]; then exit 0; fi

STATE_FILE="planning/specs/${BRANCH}/PROGRESS.md"
if [ ! -f "$STATE_FILE" ]; then exit 0; fi

# Check if there's an active stage (building, planning, ready)
STAGE=$(grep '^\*\*Stage\*\*:' "$STATE_FILE" | head -1 | sed 's/.*: *//')
if [ -z "$STAGE" ] || [ "$STAGE" = "complete" ] || [ "$STAGE" = "abandoned" ]; then
  exit 0
fi

echo "CONTEXT COMPACTION DETECTED: You are resuming after context loss."
echo "CRITICAL: Do NOT rely on the summary alone. Before taking any action:"
echo "1. Read the active skill/workflow for the current stage (${STAGE})"
echo "2. Read PROGRESS.md to confirm current state"
echo "3. Then proceed with the task"
