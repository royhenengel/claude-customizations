# Auto-Trigger /fix Implementation Summary

**Completed**: 2026-02-01
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
- [~] Task 5: Test with issue language - Pending restart verification
- [~] Task 6: Test with tool errors - Pending restart verification
- [~] Task 7: Test exclusions - Pending restart verification

## Deviations

| Rule | What Happened | Resolution |
|------|---------------|------------|
| None | Implementation matched plan | - |

## Verification

- [ ] UserPromptSubmit hook triggers on issue language (requires restart)
- [ ] PostToolUse hook triggers on tool errors (requires restart)
- [ ] Exclusion patterns prevent false positives (requires restart)
- [ ] /fix process starts with context when confirmed (requires restart)
- [ ] No interruption during active /build (by design: checks STATE.md stage)

**Note**: Hooks require Claude Code restart to activate. Testing deferred to fresh session.

## Files Changed

| File | Change |
|------|--------|
| `hooks/scripts/detect-issue.js` | New - shared detection logic |
| `hooks/scripts/user-issue-hook.js` | New - UserPromptSubmit wrapper |
| `hooks/scripts/issue-detector-tool-hook.js` | New - PostToolUse wrapper |
| `hooks/issue-detector-user.json` | New - UserPromptSubmit config |
| `hooks/issue-detector-tool.json` | New - PostToolUse config |
| `.claude/hooks.json` | Updated - registered both hooks |

## Next Steps

1. Restart Claude Code to load new hooks
2. Test Task 5: Send "This function is broken" - expect /fix prompt
3. Test Task 6: Run `ls /nonexistent` - expect /fix prompt after error
4. Test Task 7: Send "What causes memory leaks?" - expect NO prompt
5. After verification passes, mark tasks complete and update this summary
