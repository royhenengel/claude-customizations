#!/bin/bash
# Build Completion Guard Hook
# Fires on UserPromptSubmit to remind about build steps 8-13
# when all tasks are complete but build isn't finalized.

# Only relevant in worktrees with a feature PROGRESS.md
if [ ! -f .git ]; then exit 0; fi

BRANCH=$(git branch --show-current 2>/dev/null)
if [ -z "$BRANCH" ]; then exit 0; fi

STATE_FILE="planning/specs/${BRANCH}/PROGRESS.md"
if [ ! -f "$STATE_FILE" ]; then exit 0; fi

# Check if stage is "building"
STAGE=$(grep '^\*\*Stage\*\*:' "$STATE_FILE" | head -1 | sed 's/.*: *//')
if [ "$STAGE" != "building" ]; then exit 0; fi

# Check if all tasks are complete (no unchecked tasks remain)
UNCHECKED=$(grep -c '^\- \[ \]' "$STATE_FILE" 2>/dev/null)
[ -z "$UNCHECKED" ] && UNCHECKED=0
PARTIAL=$(grep -c '^\- \[\~\]' "$STATE_FILE" 2>/dev/null)
[ -z "$PARTIAL" ] && PARTIAL=0
PENDING=$((UNCHECKED + PARTIAL))

if [ "$PENDING" -gt 0 ]; then exit 0; fi

# Verify at least one completed task exists (avoid false positive on empty task lists)
COMPLETED=$(grep -c '^\- \[x\]' "$STATE_FILE" 2>/dev/null)
[ -z "$COMPLETED" ] && COMPLETED=0
if [ "$COMPLETED" -eq 0 ]; then exit 0; fi

# All tasks complete but stage is still building -> remind about completion steps
echo "REMINDER: All build tasks are complete but the build is not finalized."
echo "Steps 8-13 MUST be executed: Verification, Security Check, Quality Review, SUMMARY.md, State Update, Finalize."
echo "Read the build-complete.md phase file and follow it."
