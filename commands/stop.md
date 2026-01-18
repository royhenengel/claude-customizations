---
description: Create handoff document and pause work cleanly
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, TodoWrite
---

# /stop - Create Handoff and Pause

Create a handoff document capturing current state for future continuation.

## Step 1: Gather Current State

Run these commands to collect state:

```bash
git status --short 2>/dev/null || echo "Not a git repo"
git log --oneline -5 2>/dev/null || echo "No commits"
git diff --stat 2>/dev/null || echo "No changes"
```

Read `planning/STATE.md` if it exists.

## Step 2: Create HANDOFF.md

Create `planning/HANDOFF.md`:

```markdown
# Session Handoff

**Created**: {timestamp}
**Branch**: {current branch}

## Context Summary

{What was being worked on}

## Current State

### Git Status

{Output from git status}

### Recent Commits

{Last 5 commits}

### Uncommitted Changes

{Summary of any uncommitted work}

## Progress This Session

{What was accomplished}

## Next Steps

{What should be done next}

## Open Questions

{Any unresolved questions or decisions}

## Notes

{Any other context needed for resumption}
```

## Step 3: Update STATE.md

If `planning/STATE.md` exists, update:
- Stage: stopping
- Last Updated: {timestamp}
- Add note about handoff creation

## Step 4: Show Resume Instructions

```text
Handoff created!

To resume later:
1. Run /start
2. It will detect HANDOFF.md and offer to continue

Files updated:
- planning/HANDOFF.md (new)
- planning/STATE.md (updated)

Safe to close this session.
```

## Fallback (No Planning Structure)

If no `planning/` directory exists:

```bash
mkdir -p planning
```

Then create a minimal HANDOFF.md with just git state and session notes.
