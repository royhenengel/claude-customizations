# Auto-Trigger /fix Implementation Summary

**Completed**: 2026-02-02
**Plan**: planning/specs/auto-trigger-fix/PLAN.md

## What Was Built

Automatic issue detection system using dual hooks:
- **UserPromptSubmit hook**: Analyzes user messages for issue language (bug, error, broken, etc.)
- **PostToolUse hook**: Detects errors in Bash tool output (non-zero exit, stack traces, build failures)

Both hooks prompt "This looks like an issue. Run /fix?" and invoke the /fix skill if confirmed.

## Tasks Completed

- [x] Task 1: Create detection script - `hooks/scripts/detect-issue.js` with pattern matching
- [x] Task 2: Create UserPromptSubmit hook - `hooks/issue-detector-user.json` + `hooks/scripts/user-issue-hook.js`
- [x] Task 3: Create PostToolUse hook - `hooks/issue-detector-tool.json` + `hooks/scripts/issue-detector-tool-hook.js`
- [x] Task 4: Wire hooks into hooks.json - Both hooks registered in `.claude/hooks.json`
- [x] Task 5: Test with issue language - Verified in worktree
- [x] Task 6: Test with tool errors - Verified in worktree
- [x] Task 7: Test exclusions - Verified in worktree

## Deviations

| Rule | What Happened | Resolution |
|------|---------------|------------|
| None | Implementation matched plan | - |

## Verification

- [x] UserPromptSubmit hook triggers on issue language
- [x] PostToolUse hook triggers on tool errors
- [x] Exclusion patterns prevent false positives
- [x] /fix process starts with context when confirmed
- [x] No interruption during active /build (by design: checks STATE.md stage)

**Verified**: 2026-02-02 in dedicated git worktree. Worktree removed after successful merge.

## Files Changed

| File | Change |
|------|--------|
| `hooks/scripts/detect-issue.js` | New - shared detection logic |
| `hooks/scripts/user-issue-hook.js` | New - UserPromptSubmit wrapper |
| `hooks/scripts/issue-detector-tool-hook.js` | New - PostToolUse wrapper |
| `hooks/issue-detector-user.json` | New - UserPromptSubmit config |
| `hooks/issue-detector-tool.json` | New - PostToolUse config |
| `.claude/hooks.json` | Updated - registered both hooks |
