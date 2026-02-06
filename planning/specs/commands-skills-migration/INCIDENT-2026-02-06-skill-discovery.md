# Incident Report: Skills Not Discoverable After Migration

**Date**: 2026-02-06
**Severity**: High (all grouped skills invisible as slash commands)
**Status**: Resolved with symlink workaround

## Summary

After merging commands-skills-migration (PR #2), 67 of 69 skills were not showing as slash commands. Claude Code only discovers skills at depth 2 (`skills/{name}/SKILL.md`). The migration organized skills into group directories at depth 3 (`skills/{Group}/{name}/SKILL.md`), making them invisible.

## What Happened

1. Migration organized 91 skills into 17 group directories
2. PR #2 merged to main
3. User reported slash commands not displaying
4. Only 2 skills at depth 2 (`cek`, `notebooklm`) were discoverable
5. 67 skills at depth 3 were invisible to Claude Code

## Additional Issue: Broken Symlink

`~/.claude/commands` symlink pointed to `commands/` directory which was deleted during migration (archived to `archive/commands/`). Symlink removed.

## Root Cause

Claude Code scans `skills/` at fixed depth 2 only. No configuration exists to change this. The group directory structure added a nesting level that pushed all skills beyond discovery depth.

This was a known limitation. GitHub issue [#18192](https://github.com/anthropics/claude-code/issues/18192) tracks recursive skill discovery. A fix was promised in v2.1.10 (Jan 16, 2026) but confirmed broken by multiple users (Jan 21-24, 2026). Issue remains open.

Colon prefixes in `name` field were tested during development and confirmed unsupported (documented in SUMMARY.md deviations table).

## Resolution

Created 66 symlinks at depth 2 pointing to group subdirectories:

```
skills/fix -> skills/Code-Quality/fix
skills/commit -> skills/Git/commit
skills/notion-search -> skills/Notion/notion-search
(etc.)
```

This preserves group directory organization while making all skills discoverable at depth 2.

## When to Remove Symlinks

When Claude Code ships working recursive skill discovery (GitHub #18192), the symlinks can be removed. Check the issue status periodically.

## Lessons Learned

1. The migration should have verified skill discovery after reorganization, not just file structure
2. Live testing was deferred to post-merge (noted in SUMMARY.md verification section) which delayed catching this
3. The depth constraint should have been researched before choosing grouped directory structure
