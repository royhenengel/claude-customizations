# Automate Stop Specification

## Goal

Eliminate manual /stop invocation by maintaining a living "Current State" section in STATE.md that persists across sessions. This removes friction from session endings while preserving full handoff context.

## User Stories

- As a user, I want session state to be captured automatically so I never need to remember to run /stop
- As a user resuming work, I want to see exactly where I left off without needing a separate HANDOFF.md file
- As a user, I want the current state to persist until it actually changes (not expire at session boundaries)

## Requirements

### Functional

- [ ] Add `## Current State` section to STATE.md template
- [ ] Update STATE.md during normal workflow operations (task completion, decisions, issues found)
- [ ] Remove need for separate HANDOFF.md file
- [ ] Update /start to read Current State from STATE.md instead of HANDOFF.md
- [ ] Update /build to maintain Current State as work progresses
- [ ] Deprecate /stop command (keep for manual override if desired)

### Non-Functional

- [ ] No additional hooks required for basic functionality
- [ ] State updates happen inline with existing workflow operations (no extra overhead)

## Constraints

- Current State data is project-scoped, not session-scoped
- Data persists until it changes, not until session ends
- Must remain human-readable in STATE.md
- claude-mem handles session-specific observations (not in STATE.md)

## Success Criteria

- [ ] No manual /stop needed - session ends naturally with state preserved
- [ ] STATE.md always reflects current project state
- [ ] /start works by reading STATE.md directly (no HANDOFF.md parsing)
- [ ] Handoff context is useful for resuming work
