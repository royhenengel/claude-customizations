# Multi-Feature State Research & Decisions

## Problem Analysis

### Current STATE.md Architecture

The current `planning/STATE.md` is a monolithic file that serves two fundamentally different purposes:

1. **Project-level concerns**: Feature Registry, project decisions, project notes
2. **Feature-level concerns**: Active Feature, Progress (task checklist), Current State (What's Working/Not Working/Next Steps), Gap Stack

When multiple worktrees modify this single file, merge conflicts are inevitable because:

- Worktree A updates "Progress (feature-a)" section
- Worktree B updates "Progress (feature-b)" section
- Both modify "Feature Registry" status columns
- Both modify "Current State" section
- Git cannot auto-merge these because they're in the same file

### Temporary Hacks Currently in Place

Two temporary workarounds exist, marked with comments:

1. **SKILL.md lines 101-105**: "TEMPORARY OVERRIDE: Parallel work mode active" - disables the single-active-feature constraint
2. **start.md lines 38-39**: "TEMPORARY: Skip active feature notification" - bypasses the feature selection prompt

These need proper solutions, not workarounds.

### Workflow Gaps Identified

**start.md**:
- Does not detect whether it's running in a worktree or on main
- Feature Registry check assumes single STATE.md
- Resume behavior reads from project STATE.md, not feature state

**plan.md**:
- Step 1 checks for "active or paused" features and offers to pause current - not relevant in multi-worktree mode
- Step 9 updates a single STATE.md with both Feature Registry AND feature progress
- No concept of feature-scoped state files

**build.md**:
- Step 4 copies task list to shared STATE.md
- Step 5 updates shared STATE.md Progress section during execution
- Steps 10-11 update shared STATE.md on completion
- Step 9 has 3 quality review agents (code, security, architecture) but no documentation review
- Step 13 has PR creation but no PR-specific review agents
- No doc-enforcer integration anywhere

**git-worktrees SKILL.md**:
- References STATE.md updates but doesn't specify which STATE.md
- No mention of feature-scoped state

**/fix skill** (`skills/Code-Quality/fix/SKILL.md`):
- 10-step investigation → fix → verify workflow
- Zero interaction with STATE.md - no state reads or writes
- No worktree awareness (doesn't detect if on main or in worktree)
- Step 10 (Finalize) has commit/PR/worktree cleanup but no state updates
- No doc-enforcer or PR review agents
- Scenario B (fix substantial enough for a worktree) is common - fix state must be tracked for session handoff

## Codebase Analysis

### Available Review Agents for Build Integration

**Doc-enforcer** (`agents/docs-enforcer.md`):
- Sonnet model, read/write/edit/glob/grep tools
- Audit mode (default): report findings without modifying
- Fix mode: report + fix after confirmation
- Checks: placement rules, required sections, template compliance, catalog staleness

**Existing Build Step 9 Reviewers** (code quality, security, architecture):
- Already well-structured as parallel agents
- Run after all tasks complete, before SUMMARY.md

**PR Review Agents** (available but not integrated):
- `code-reviewer.md` - general code review
- `cek-code-quality-reviewer.md` - clean code principles
- `cek-contracts-reviewer.md` - API/data model review
- `cek-test-coverage-reviewer.md` - test coverage quality
- `cek-historical-context-reviewer.md` - past patterns review

### Worktree Detection

Git provides reliable worktree detection:

```bash
# .git is a file in worktrees, a directory in main
if [ -f .git ]; then echo "worktree"; else echo "main"; fi
```

Convention-based detection (more workflow-friendly):

```bash
# Derive feature name from branch, check for feature spec
branch=$(git branch --show-current)
if [ -d "planning/specs/$branch/STATE.md" ]; then
  echo "Feature worktree with state"
fi
```

## Architectural Decision: Two-Level State

### Design

**Project STATE.md** (`planning/STATE.md`) - lives on main, tracks project-level reality:

```markdown
# Project State

**Last Updated**: {timestamp}

## Feature Registry

| Feature | Type | Status | Branch | Worktree |
|---------|------|--------|--------|----------|
| auth | feature | active | auth | .worktrees/auth |
| login-crash | fix | active | login-crash | .worktrees/login-crash |
| api | feature | complete | - | - |

## Decisions

- (project-level decisions only)

## Notes

- (project-level notes only)
```

**Feature STATE.md** (`planning/specs/{feature}/STATE.md`) - lives in worktree, tracks feature-level reality:

```markdown
# {Feature} State

**Stage**: building
**Last Updated**: {timestamp}

## Progress

- [x] Task 1: {description}
- [ ] Task 2: {description}

## Current State

### What's Working
...

### What's Not Working
...

### Next Steps
...

## Gap Stack

### Active Gap
(None)

### Gap History
(None this session)

## Decisions

- (feature-specific decisions)

## Notes

- (feature-specific notes)
```

### Merge Strategy

When feature merges to main:
1. Feature STATE.md archives with the spec (already in `planning/specs/{feature}/`)
2. Main's Feature Registry gets a one-line status update: `status → complete`
3. Zero conflict because worktree only touches its feature files

### Fix State (Lightweight Variant)

Fixes that get their own worktree need state tracking but don't require the full planning cycle (no SPEC.md, RESEARCH.md, or PLAN.md). The fix STATE.md maps to /fix's own investigation steps:

```markdown
# {Fix Name} State

**Type**: fix
**Stage**: investigating | proposed | implementing | verifying
**Last Updated**: {timestamp}

## Issue

{From /fix Step 1 - what's broken}

## Root Cause

{From /fix Step 5 - why it's broken}

## Proposed Fix

{From /fix Step 6 - what we're doing about it}

## Current State

### What's Working
...

### What's Not Working
...

### Next Steps
...
```

This is lighter than a feature STATE.md (no Gap Stack, no Progress checklist) but sufficient for handoff.

### Context-Aware Workflow Behavior

Each workflow command detects context and routes accordingly:

| Context | How Detected | STATE.md Used |
|---------|-------------|---------------|
| Main branch | `.git` is a directory | `planning/STATE.md` (project) |
| Feature worktree | `.git` is a file + branch has matching spec | `planning/specs/{feature}/STATE.md` |
| Fix worktree | `.git` is a file + branch has matching spec with type=fix | `planning/specs/{fix}/STATE.md` |

### What Goes Where

| Concern | Project STATE.md | Feature STATE.md |
|---------|-----------------|-----------------|
| Feature Registry | Yes | No |
| Project-level decisions | Yes | No |
| Project-level notes | Yes | No |
| Stage (planning/building) | No | Yes |
| Task progress | No | Yes |
| Current State (Working/Not) | No | Yes |
| Gap Stack | No | Yes |
| Feature decisions | No | Yes |
| Feature notes | No | Yes |

## Key Decisions

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | Two-level state (project + feature) | Eliminates merge conflicts structurally by separating concerns into different files |
| D2 | Feature STATE.md lives in `planning/specs/{feature}/` | Co-located with other feature artifacts (SPEC, PLAN, RESEARCH), archives naturally |
| D3 | Worktree detection via `.git` file check | Simple, reliable, no false positives |
| D4 | Branch name = feature name convention | Already established by git-worktrees skill, enables automatic feature detection |
| D5 | Doc-enforcer runs as Step 9a (after quality review) | Documentation issues should be caught before SUMMARY.md creation |
| D6 | PR reviewers run during Step 13 (finalization) | PR review happens at PR creation time, natural integration point |
| D7 | Project STATE.md simplified to registry-only | Feature-specific content moved to feature STATE.md, main stays clean |
| D8 | Remove all temporary overrides | Multi-worktree is the permanent default, not a temporary mode |
| D9 | /fix gets state awareness for worktree-based fixes | Scenario B (substantial fixes in worktrees) is common; state must be handoff-quality |
| D10 | Feature Registry gets Type column (feature/fix) | Distinguishes full features from fixes in the registry, clarifies project state at a glance |
| D11 | /fix and /build share completion flow (doc-enforcer + PR reviewers) | Avoid duplication; both workflows end with the same quality gates |
| D12 | Fix STATE.md is lighter than feature STATE.md | Fixes don't need Gap Stack or Progress checklist; /fix has its own 10-step structure |
