# Instruction Compliance Fix State

**Type**: fix
**Stage**: ready
**Last Updated**: 2026-02-12

## Issue

Claude acknowledges rules are loaded but still doesn't follow them. Six incidents documented across subagent bypass, skipped build steps, biased analysis, and formatting rule violations.

See [RESEARCH.md](RESEARCH.md) for full investigation, root cause analysis, and proposed fix.

## Progress

- [ ] Task 1: Audit and prune rules files
- [ ] Task 2: Review pruned rules (checkpoint)
- [ ] Task 3: Split build.md into phase files
- [ ] Task 4: Update build SKILL.md with phase routing
- [ ] Task 5: Apply instruction design improvements
- [ ] Task 6: Create build completion guard hook
- [ ] Task 7: End-to-end verification (checkpoint)

## Current State

### What's Working

- Investigation complete with root cause analysis
- All related incidents cataloged
- SPEC.md, RESEARCH.md, and PLAN.md created
- 7-task implementation plan ready for execution

### What's Not Working

- No changes implemented yet

### Next Steps

1. Begin /build execution

## Decisions

- Phase routing via Read tool instead of @ expansion (avoids loading all phases)
- 3 phase split for build.md: setup (Steps 1-4), execute (Steps 5-7), complete (Steps 8-13)
- Single hook (build completion guard) rather than 3 hooks (avoids over-hooking noise)
- Layer 1 and Layer 3 combined during editing (no double-pass on same files)

## Notes

- Original build.md will be archived as build-monolith.md for reference
- Hook design learned from auto-trigger-fix incident: narrow triggers, fast execution
