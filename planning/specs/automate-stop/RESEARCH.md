# Automate Stop Research

## Information Gathered

### Current /stop Behavior Analysis

| Component | Current Location | New Location | Notes |
|-----------|------------------|--------------|-------|
| Stage | HANDOFF.md + STATE.md | STATE.md only | Already exists |
| Feature Registry | HANDOFF.md + STATE.md | STATE.md only | Already exists |
| Resume Point | HANDOFF.md | STATE.md Current State | New section |
| What's Working | HANDOFF.md | STATE.md Current State | New section |
| What's Not Working | HANDOFF.md | STATE.md Current State | New section |
| Decisions Made | HANDOFF.md + STATE.md | STATE.md only | Already exists |
| Remaining Tasks | HANDOFF.md + STATE.md | STATE.md only | Already in Progress |
| Next Steps | HANDOFF.md | STATE.md Current State | New section |
| Open Questions | HANDOFF.md | STATE.md Current State | New section |
| Files Changed | HANDOFF.md | Git history | Not needed in STATE.md |
| Session Summary | HANDOFF.md | claude-mem observations | Not needed in STATE.md |

### Key Insight: Project State vs Session State

The handoff data is project-scoped, not session-scoped:
- "What's Not Working" persists until fixed
- "Next Steps" persist until addressed
- Session boundaries don't invalidate this data

### Files That Need Updates

1. `skills/my-workflow/workflows/start.md` - Remove HANDOFF.md detection, read Current State from STATE.md
2. `skills/my-workflow/workflows/stop.md` - Deprecate or convert to "refresh Current State" utility
3. `skills/my-workflow/workflows/build.md` - Update Current State during task execution
4. `skills/my-workflow/workflows/plan.md` - Initialize Current State when creating plans

## Approach

**Living Current State Pattern**

1. Add `## Current State` section to STATE.md
2. Update this section during normal workflow operations:
   - Task completion → update "What's Working"
   - Issue found → update "What's Not Working"
   - Decision made → already goes to Decisions section
   - Question arises → update "Open Questions"
3. No SessionEnd hook needed - data is always current
4. /start simply reads STATE.md (single source of truth)

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| SessionEnd hook generates HANDOFF.md | Works like today | Extra file, requires hook, data can be stale | Rejected |
| Living handoff in STATE.md | Single source, always current | Requires workflow updates | **SELECTED** |
| claude-mem only (no file) | Simplest | Not human-readable in repo | Rejected |

## Dependencies

- None (uses existing workflow infrastructure)
