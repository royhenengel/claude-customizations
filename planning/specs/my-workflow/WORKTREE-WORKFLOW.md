# Worktree Workflow Design

**Date**: 2026-02-06
**Status**: Decided

## Problem

Working with git worktrees in VS Code creates confusion about which directory (and branch) Claude is operating in. The VS Code sidebar, file tabs, and terminal are tied to the workspace folder. Claude can `cd` to a different directory, but the editor doesn't reflect this, creating a mismatch between what the user sees and where changes actually go.

## Decision Journey

### Attempt 1: Worktree creation in /build

Originally, `/build` (Step 2a) created the worktree when starting implementation. Planning happened on main, building happened in the worktree.

**Problem**: Planning artifacts (SPEC.md, PLAN.md) were created on main but belonged to the feature. When the worktree was created later, these files had to be reconciled between branches.

### Attempt 2: Worktree creation in /plan (Step 3a)

Moved worktree creation to `/plan` so all feature artifacts (spec, research, plan) lived in the feature branch from the start.

**Problem discovered during commands-skills-migration**: After creating the worktree, Claude did `cd` to the worktree directory. File operations went to the right place, but the VS Code sidebar still showed the main directory. The user couldn't see what was happening or verify the state of files in the feature branch.

### Attempt 3: cd + prompt user to open new window

Added `cd` to the worktree after creation, with a note telling the user they could optionally open the worktree in a new VS Code window.

**Problem**: "Optionally" meant the user would continue in a misleading environment. The sidebar showed main, Claude operated on the feature branch. Not acceptable.

### Attempt 4: Plan in main, open new window for /build

Reverted to planning in main window, then prompting user to open the worktree in a new VS Code window for `/build`.

**Problem**: This was functionally identical to Attempt 1. The user pointed out that going back to "open a new window for build" was the same broken flow. It also meant `/plan` in the main window would create the worktree and then... end. Just two commands (`git worktree add` + `code -n`) wrapped in a skill invocation.

### Attempt 5: Open new window immediately, re-invoke /plan there

Create worktree at the start of `/plan`, auto-open VS Code window, user re-invokes `/plan` in the new window.

**Problem**: User has to re-type `/plan`. But the new window already knows everything (STATE.md has the active feature, the directory IS the feature). So `/plan` can auto-detect and resume.

**Refinement**: The user pointed out that brainstorm IS part of `/plan`. There's no meaningful pre-worktree step. And the new window already has all context, so no feature name argument is needed.

### Final Design: Decouple worktree creation from /plan and /build

**Insight**: Worktree creation is not a planning or building step. It's workspace setup. Coupling it to either skill adds complexity to both.

## Final Design

| Step | Where | What happens |
|------|-------|-------------|
| User picks feature | Main window | "Let's work on X" |
| Worktree created | Main window | `git worktree add` + `code -n` opens new window |
| `/plan` | New window | Full planning (brainstorm, spec, research, plan) |
| `/build` | New window | Execute plan |
| Done | New window | PR, merge, cleanup |

**Key principles:**
- `/plan` and `/build` are directory-agnostic. They work wherever they're invoked.
- Worktree creation is conversational, not embedded in a skill.
- One VS Code window = one feature. Sidebar, terminal, git status all match.
- Zero re-invocation friction: `/plan` reads STATE.md, detects active feature automatically.

## Changes Required

- **plan.md**: Remove Step 3a (worktree creation)
- **build.md**: Remove Step 2a (worktree verification/creation)
- **git-worktrees skill**: Add `code -n` auto-open, default to project-local `.worktrees/`
- Worktrees stored in `.worktrees/` inside the project (gitignored), not `~/worktrees/`

## Rejected Alternatives

- **Multi-root workspace**: Adding worktree as second root in same VS Code window. Creates search pollution, git status confusion, terminal ambiguity.
- **Stash-based workflow**: Regular branches with `git stash`. Fragile, loses IDE state, requires process restarts.
- **Planning on main, code on branch**: Puts speculative plans on main before implementation is verified.
