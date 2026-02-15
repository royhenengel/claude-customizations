# Instruction Compliance Fix State

**Type**: fix
**Stage**: complete
**Last Updated**: 2026-02-15

## Issue

Claude acknowledges rules are loaded but still doesn't follow them. Six incidents documented across subagent bypass, skipped build steps, biased analysis, and formatting rule violations.

See [RESEARCH.md](RESEARCH.md) for full investigation, root cause analysis, and proposed fix.

## Progress

- [x] Task 1: Audit and prune rules files
- [x] Task 2: Review pruned rules (checkpoint)
- [x] Task 3: Split build.md into phase files
- [x] Task 4: Update build SKILL.md with phase routing
- [x] Task 5: Apply instruction design improvements
- [x] Task 6: Create build completion guard hook
- [x] Task 7: End-to-end verification (checkpoint)

## Current State

### What's Working

- Rules pruned from 628 to 457 lines with 5 user-approved additions
- Build workflow split into 3 phase files (173, 271, 276 lines)
- SKILL.md routes to correct phase via Read tool
- CRITICAL markers on 5 key rules
- Rationalizations tables in execute and complete phases
- Build completion guard hook operational

### What's Not Working

- Nothing outstanding

### Next Steps

1. Create PR, merge to main
2. Test /start, /plan, /build in live use

## Decisions

- Phase routing via Read tool instead of @ expansion (avoids loading all phases)
- 3 phase split for build.md: setup (Steps 1-4), execute (Steps 5-7), complete (Steps 8-13)
- Single hook (build completion guard) rather than 3 hooks (avoids over-hooking noise)
- Layer 1 and Layer 3 combined during editing (no double-pass on same files)

## Notes

- Original build.md will be archived as build-monolith.md for reference
- Hook design learned from auto-trigger-fix incident: narrow triggers, fast execution
