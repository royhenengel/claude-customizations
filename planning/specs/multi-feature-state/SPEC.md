# Multi-Feature State Specification

## Goal

Redesign the workflow state management system so that STATE.md accurately reflects reality in every environment (main branch and each worktree). Eliminate merge conflicts caused by multiple worktrees modifying shared state. Audit and update all workflow flows (/start, /plan, /build, /fix) for multi-worktree-first development.

## User Stories

- As a developer, I want STATE.md in my worktree to reflect my feature's exact state so that any new session can pick up seamlessly
- As a developer, I want STATE.md on main to reflect the project-level reality so I can see what's in flight and what's merged
- As a developer, I want merging a completed feature to never create STATE.md conflicts
- As a developer, I want every workflow step (/start, /plan, /build, /fix) to work correctly in a worktree context
- As a developer, I want doc-enforcer and PR reviewers to run automatically at the end of /build and /fix
- As a developer, I want /fix to track state so I can resume a fix across sessions
- As a developer, I want the Feature Registry to distinguish between features and fixes

## Requirements

### Functional

- [ ] Feature-scoped state: each feature gets `planning/specs/{feature}/STATE.md` for detailed feature state
- [ ] Project-level state: main's `planning/STATE.md` contains only feature registry, decisions, and project-wide info
- [ ] Worktrees only modify their feature's state file, never main's STATE.md
- [ ] On merge: feature STATE.md archives with the spec, main's registry gets a status update
- [ ] All workflow commands (/start, /plan, /build, /fix) are context-aware (detect worktree vs main)
- [ ] /build completion flow includes doc-enforcer agent and PR reviewer agents
- [ ] /fix creates lightweight state (fix STATE.md) for worktree-based fixes
- [ ] /fix completion flow includes doc-enforcer and PR reviewers (shared with /build)
- [ ] Feature Registry includes Type column (feature vs fix) for distinguishability
- [ ] Workflow audit: every step in /start, /plan, /build, /fix reviewed and updated for multi-worktree reality
- [ ] Feature STATE.md is handoff-quality: accurate enough for a fresh session to orient and continue

### Non-Functional

- [ ] All development uses worktrees going forward (worktree-first is the default)
- [ ] Single-worktree usage works naturally (it's just "one worktree active")
- [ ] No manual STATE.md surgery required during normal workflow

## Constraints

- Must work with existing git worktree setup (.worktrees/ directory)
- Must preserve existing planning/specs/ structure for feature artifacts
- Workflow skills must remain portable (no hardcoded paths)
- Changes affect live workflow (symlinked to ~/.claude/) - careful rollout needed

## Success Criteria

- [ ] STATE.md in main accurately reflects project-level reality (registry, what's merged, what's in flight)
- [ ] STATE.md in each worktree accurately reflects that feature's progress (current task, what's working, next steps)
- [ ] Merging a completed feature into main creates zero STATE.md conflicts
- [ ] Every workflow flow (/start, /plan, /build, /fix) reviewed and updated for multi-worktree reality
- [ ] Doc-enforcer and PR reviewers run as part of /build and /fix completion
- [ ] /fix tracks state in worktree environments for session handoff
- [ ] A new session in any worktree can orient itself from state files alone

## Open Questions

(None - all clarified during planning.)
