# Multi-Feature State Implementation Plan

## Objective

Redesign STATE.md into a two-level architecture (project-level + feature-level) that eliminates merge conflicts in multi-worktree development. Audit and update all workflow flows (/start, /plan, /build, /fix) for worktree-first behavior. Add doc-enforcer and PR reviewers to build and fix completion. Make /fix state-aware for worktree-based fixes.

## Context

@planning/specs/multi-feature-state/SPEC.md
@planning/specs/multi-feature-state/RESEARCH.md
@skills/Planning/my-workflow/SKILL.md
@skills/Planning/my-workflow/workflows/start.md
@skills/Planning/my-workflow/workflows/plan.md
@skills/Planning/my-workflow/workflows/build.md
@skills/Git/git-worktrees/SKILL.md
@skills/Code-Quality/fix/SKILL.md

## Task Summary

| # | Task | Type | Dependencies | Blocking |
|---|------|------|--------------|----------|
| 1 | Create feature STATE.md template | auto | - | - |
| 2 | Redesign project STATE.md template (with Type column) | auto | Task 1 | - |
| 3 | Update SKILL.md - remove temporary overrides, document two-level state | auto | Tasks 1-2 | - |
| 4 | Update start.md - context-aware worktree/main behavior | auto | Task 3 | - |
| 5 | Update plan.md - create feature STATE.md, context-aware registry updates | auto | Task 3 | - |
| 6 | Update build.md - use feature STATE.md for all execution tracking | auto | Task 3 | - |
| 7 | Add doc-enforcer to build completion flow | auto | Task 6 | - |
| 8 | Add PR reviewers to build finalization | auto | Task 6 | - |
| 9 | Update feature CLAUDE.md template and git-worktrees SKILL.md | auto | Tasks 1-2 | - |
| 10 | Update /fix skill - add state awareness and worktree detection | auto | Tasks 1-3 | - |
| 11 | Standardize completion flow - shared doc-enforcer + PR reviewers for /fix and /build | auto | Tasks 7-8, 10 | - |
| 12 | Migrate current STATE.md to new format | auto | Tasks 1-11 | - |
| 13 | Review: verify all workflows are consistent | checkpoint:human-verify | Task 12 | yes |

## Tasks

### Task 1: Create Feature STATE.md Template

**Type**: auto
**Files**: `skills/Planning/my-workflow/templates/feature-state-template.md`
**Dependencies**: None

**Context**: Feature STATE.md is the new per-feature state file that lives in `planning/specs/{feature}/STATE.md`. It contains everything needed for a session to orient itself on a specific feature: stage, progress, current state, gap stack, and feature-specific decisions/notes.

**Action**:
Create template at `skills/Planning/my-workflow/templates/feature-state-template.md`:

```markdown
# {Feature Name} State

**Stage**: {planning|building}
**Last Updated**: {timestamp}

## Progress

{Task checklist copied from PLAN.md when /build starts}

- [ ] Task 1: {description}
- [ ] Task 2: {description}

## Current State

**Last Updated**: {timestamp}

### What's Working

(Nothing verified yet)

### What's Not Working

(No issues identified)

### Next Steps

1. (Determined during /plan or /build)

### Open Questions

(None)

## Gap Stack

<!-- Tracks context when handling plan-modifying gaps during /build -->
<!-- Empty when no gaps active. Supports nested gaps (LIFO). -->

### Active Gap

(None)

### Gap History

(None this session)

## Decisions

(None yet)

## Notes

(None yet)
```

**Verify**: Template file exists at the specified path
**Done**: Template is complete with all sections that were previously in the feature-specific parts of STATE.md

---

### Task 2: Redesign Project STATE.md Template

**Type**: auto
**Files**: `skills/Planning/my-workflow/workflows/start.md` (the STATE.md template inside it)
**Dependencies**: Task 1

**Context**: The project STATE.md template in start.md currently includes both project-level and feature-level concerns. It needs to be slimmed down to only project-level content: Feature Registry, project decisions, and project notes. All feature-specific sections (Active Feature, Progress, Current State, Gap Stack) move to the feature STATE.md.

**Action**:
Update the STATE.md template within start.md (Step 3) to the new project-level-only format:

```markdown
# Project State

**Last Updated**: {timestamp}

## Feature Registry

| Feature | Type | Status | Branch | Worktree |
|---------|------|--------|--------|----------|
| (none yet) | - | - | - | - |

## Decisions

(None yet)

## Notes

(None yet)
```

Key changes from current template:
- Remove: `**Stage**` field (stage is per-feature now)
- Remove: `## Active Feature` section entirely
- Remove: `## Current Focus` section
- Remove: `## Progress` section (moved to feature STATE.md)
- Remove: `## Gap Stack` section (moved to feature STATE.md)
- Remove: `## Current State` section (moved to feature STATE.md)
- Add: `Type`, `Branch`, and `Worktree` columns to Feature Registry (Type distinguishes feature vs fix)
- Keep: Feature Registry, Decisions, Notes (project-level only)

**Verify**: Read the updated start.md and confirm the STATE.md template only contains project-level content
**Done**: Project STATE.md template has no feature-specific sections

---

### Task 3: Update SKILL.md - Remove Temporary Overrides, Document Two-Level State

**Type**: auto
**Files**: `skills/Planning/my-workflow/SKILL.md`
**Dependencies**: Tasks 1-2

**Context**: SKILL.md has temporary overrides (lines 101-105) and documents a single-STATE.md architecture. It needs to be updated to document the two-level state as the permanent default and remove all temporary comments.

**Action**:

1. **Section 6 (Multi-Feature Management)**:
   - Remove the 5-line temporary override comment block (lines 101-105)
   - Rewrite the section to describe multi-worktree as the standard mode
   - Keep feature lifecycle states (drafted → ready → active → complete)
   - Update Feature Registry example to include Branch/Worktree columns
   - Update Parallel Work Rules to reference two-level state

2. **Stage Awareness section**:
   - Update STATE.md Structure to show both project STATE.md and feature STATE.md
   - Document which file is used in which context
   - Add context detection description

3. **Living Current State (Section 4)**:
   - Update to reference feature STATE.md as the location for Current State
   - Clarify that feature STATE.md is the handoff document, not project STATE.md

4. **Project Structure (Quick Reference)**:
   - Add `STATE.md` to the feature spec directory listing

**Verify**: No "TEMPORARY" comments remain in SKILL.md. Two-level state is documented.
**Done**: SKILL.md describes multi-worktree with two-level state as the standard architecture

---

### Task 4: Update start.md - Context-Aware Worktree/Main Behavior

**Type**: auto
**Files**: `skills/Planning/my-workflow/workflows/start.md`
**Dependencies**: Task 3

**Context**: start.md needs to detect whether it's running on main or in a feature worktree and behave accordingly. The temporary "skip notification" hack needs to be replaced with proper context-aware logic.

**Action**:

1. **Step 1 (Check Current State)**: Add context detection at the top:

   ```bash
   # Detect if we're in a worktree or on main
   if [ -f .git ]; then echo "WORKTREE"; else echo "MAIN"; fi
   ```

2. **Main branch behavior** (replace the "Feature Registry exists" block):
   - Read `planning/STATE.md` Feature Registry
   - Show features in flight (active in worktrees)
   - Show backlog items ready to plan
   - Offer: pick from backlog or describe new → create worktree → /plan
   - Remove the temporary skip comment (lines 38-39)

3. **Worktree behavior** (new - replace "single feature or no registry" block):
   - Derive feature name from branch: `git branch --show-current`
   - Read `planning/specs/{feature}/STATE.md` for feature state
   - If feature STATE.md exists with content: show Current State, offer to resume
   - If no feature STATE.md: this is a new feature, suggest /plan

4. **New project behavior**: Keep as-is (no change needed for greenfield)

5. **Remove**: The "If Feature Registry exists in STATE.md (multi-feature session)" temporary block entirely. Replace with the main branch behavior above.

**Verify**: start.md has no "TEMPORARY" comments. Both main and worktree paths are clearly defined.
**Done**: start.md detects context and routes to appropriate behavior for main vs worktree

---

### Task 5: Update plan.md - Create Feature STATE.md, Context-Aware Registry Updates

**Type**: auto
**Files**: `skills/Planning/my-workflow/workflows/plan.md`
**Dependencies**: Task 3

**Context**: plan.md needs to create a feature STATE.md when planning a feature, and its "check for active features" logic needs updating for multi-worktree reality.

**Action**:

1. **Step 1 (Check Prerequisites and Active Features)**:
   - Remove the "If another feature has status active or paused" block (lines 28-51). In multi-worktree mode, active features in other worktrees are not a concern.
   - Replace with: Check if `planning/STATE.md` exists (project initialized). If in a worktree, check if feature spec directory already exists.

2. **Step 5 (Create Feature CLAUDE.md)**:
   - Add `@STATE.md` reference to the feature CLAUDE.md template (so cascading context includes feature state)

3. **New Step (between current 8 and 9): Create Feature STATE.md**:
   - Use the feature STATE.md template (from Task 1)
   - Set Stage to `planning`
   - Set Progress to the task list from PLAN.md (all unchecked)
   - Write to `planning/specs/{feature}/STATE.md`

4. **Step 9 (Update STATE.md and Feature CLAUDE.md)**:
   - Update `planning/STATE.md` Feature Registry only: add new row with status `ready`, branch name, worktree path
   - Do NOT update project STATE.md with feature progress, current focus, or progress checklist (those are in feature STATE.md now)
   - Update feature STATE.md: set status to `ready`
   - Remove all the feature-specific updates from the project STATE.md update block

5. **Output Structure**: Add STATE.md to the feature spec directory listing

**Verify**: plan.md creates feature STATE.md. Project STATE.md only gets a registry update.
**Done**: Planning creates two-level state correctly

---

### Task 6: Update build.md - Use Feature STATE.md for All Execution Tracking

**Type**: auto
**Files**: `skills/Planning/my-workflow/workflows/build.md`
**Dependencies**: Task 3

**Context**: build.md currently reads and writes to a single shared STATE.md. It needs to use feature STATE.md for all execution tracking and only touch project STATE.md for registry updates.

**Action**:

1. **Step 2 (Identify Plan to Execute)**:
   - In worktree: auto-detect feature from branch name, read feature STATE.md
   - On main: read project STATE.md Feature Registry, show available features (this is the existing behavior, mostly unchanged)

2. **Step 4 (Create Task List and Update STATE.md)**:
   - Copy task list to feature STATE.md `## Progress` section (not project STATE.md)
   - Update feature STATE.md stage to `building`
   - Update project STATE.md Feature Registry: status → `active`
   - Remove all the feature-specific content from the project STATE.md update template

3. **Step 5 (Execute Tasks) - After each task**:
   - Update feature STATE.md Progress section (check off task)
   - Update feature STATE.md Current State section (What's Working, Next Steps)
   - Do NOT touch project STATE.md during task execution

4. **Step 6a (Gap Protocol)**:
   - Gap Stack is in feature STATE.md (not project STATE.md)
   - Update all Gap Protocol references to use feature STATE.md

5. **Steps 10-11 (SUMMARY.md and STATE.md update on completion)**:
   - Update feature STATE.md: stage → complete, all tasks checked
   - Update project STATE.md Feature Registry: status → `complete`, clear worktree column
   - Feature STATE.md stays in `planning/specs/{feature}/` (archives with spec)

6. **Step 13 (Finalize Changes)**:
   - On merge: feature spec directory (including STATE.md) moves to archive
   - Project STATE.md registry updated

**Verify**: All STATE.md references in build.md correctly point to either feature or project level.
**Done**: build.md uses two-level state throughout the entire execution cycle

---

### Task 7: Add Doc-Enforcer to Build Completion Flow

**Type**: auto
**Files**: `skills/Planning/my-workflow/workflows/build.md`
**Dependencies**: Task 6

**Context**: The doc-enforcer agent exists but is not integrated into any workflow. It should run after the quality review (Step 9) to catch documentation issues before the feature is finalized.

**Action**:

Add Step 9a after the existing Step 9 (Quality Review):

```markdown
### 9a. Documentation Review

Launch doc-enforcer agent in audit mode to verify documentation compliance.

**Announce:**

\```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DOCUMENTATION REVIEW: Compliance Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Launching docs-enforcer agent...
\```

**Agent - Documentation (docs-enforcer):**

\```text
Audit documentation for the {feature} implementation.

Focus:
- New/modified markdown files follow documentation type system
- Required sections present per templates
- Feature spec directory complete (CLAUDE.md, SPEC.md, RESEARCH.md, PLAN.md, STATE.md)
- No misplaced files

Files changed: {list from implementation}

Provide audit results with severity levels.
\```

**After review:**
- Critical issues: must fix before proceeding
- Warnings: fix or acknowledge
- Info: note for later

Present findings alongside code quality results.
```

**Verify**: Step 9a exists in build.md, references docs-enforcer agent
**Done**: Doc-enforcer runs automatically at build completion

---

### Task 8: Add PR Reviewers to Build Finalization

**Type**: auto
**Files**: `skills/Planning/my-workflow/workflows/build.md`
**Dependencies**: Task 6

**Context**: Step 13 creates a PR but doesn't run any review agents on the PR itself. Adding PR-specific review agents catches issues from the full-diff perspective (vs per-task reviews).

**Action**:

Expand Step 13 to include PR review after PR creation but before merge:

```markdown
### 13a. PR Review

After PR is created, launch review agents on the full PR diff.

**Announce:**

\```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PR REVIEW: Full Diff Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Launching PR reviewers in parallel...
\```

Launch in parallel:

**Agent 1 - Code Review (code-reviewer):**
Review the full PR diff for overall code quality, consistency, and potential issues missed in per-task reviews.

**Agent 2 - Test Coverage (cek-test-coverage-reviewer):**
Review test coverage for new/modified code. Flag untested paths.

**Agent 3 - Contracts (cek-contracts-reviewer):**
Review changes to public APIs, data models, and type definitions for breaking changes.

Present consolidated PR review findings. Critical issues must be addressed before merge.
```

**Verify**: Step 13a exists in build.md with 3 parallel PR review agents
**Done**: PR reviewers run automatically before merge

---

### Task 9: Update Feature CLAUDE.md Template and Git-Worktrees SKILL.md

**Type**: auto
**Files**:
- `skills/Planning/my-workflow/workflows/plan.md` (feature CLAUDE.md template in Step 5)
- `skills/Git/git-worktrees/SKILL.md`
**Dependencies**: Tasks 1-2

**Context**: The feature CLAUDE.md template needs to reference STATE.md for cascading context. The git-worktrees skill should reference the new state architecture.

**Action**:

1. **plan.md Step 5 (Feature CLAUDE.md template)**:
   - Add `@STATE.md` to the cascading context references:
   ```markdown
   ## Feature State

   @STATE.md
   ```

2. **git-worktrees SKILL.md**:
   - Update "Integration with My-Workflow" section to mention two-level state
   - Note that feature STATE.md is created during /plan and used by /build
   - Add to cleanup: feature STATE.md archives with spec on merge

**Verify**: Feature CLAUDE.md template includes STATE.md reference. git-worktrees mentions two-level state.
**Done**: Supporting files updated for new architecture

---

### Task 10: Update /fix Skill - Add State Awareness and Worktree Detection

**Type**: auto
**Files**: `skills/Code-Quality/fix/SKILL.md`
**Dependencies**: Tasks 1-3

**Context**: The /fix skill has zero state interaction. For worktree-based fixes (Scenario B - substantial fixes that need isolation), /fix must create and maintain a lightweight state file for session handoff.

**Action**:

1. **Add worktree detection** (after Step 1, before Step 2):
   - Detect if running in a worktree via `.git` file check
   - If in worktree, derive fix name from branch name
   - Create `planning/specs/{fix-name}/` directory if it doesn't exist

2. **Add fix STATE.md creation** (after Step 1, when in worktree):
   - Create lightweight `planning/specs/{fix-name}/STATE.md`:
   ```markdown
   # {Fix Name} State

   **Type**: fix
   **Stage**: investigating
   **Last Updated**: {timestamp}

   ## Issue

   {From Step 1 - problem description}

   ## Root Cause

   (Pending - determined in Step 5)

   ## Proposed Fix

   (Pending - determined in Step 6)

   ## Current State

   ### What's Working
   (Nothing verified yet)

   ### What's Not Working
   {The reported issue}

   ### Next Steps
   1. Complete investigation (Steps 2-5)
   ```

3. **Add state updates throughout /fix steps**:
   - After Step 5 (Root Cause): Update "Root Cause" section, stage → `proposed`
   - After Step 6 (Propose Fix): Update "Proposed Fix" section
   - After Step 7 (Implement): stage → `implementing`, update Current State
   - After Step 8 (Regression): stage → `verifying`, update What's Working

4. **Add registry entry**:
   - When fix STATE.md is created, also update project STATE.md Feature Registry:
     `| {fix-name} | fix | active | {branch} | {worktree-path} |`

5. **Quick fix on main** (no worktree):
   - Skip state creation entirely - no STATE.md, no registry entry
   - /fix runs its normal 10-step process and commits directly

**Verify**: /fix creates state in worktree context, skips state for quick fixes on main
**Done**: /fix is state-aware with lightweight fix STATE.md for worktree-based fixes

---

### Task 11: Standardize Completion Flow - Shared Doc-Enforcer + PR Reviewers

**Type**: auto
**Files**:

- `skills/Code-Quality/fix/SKILL.md` (Step 10)
- `skills/Planning/my-workflow/workflows/build.md` (reference)

**Dependencies**: Tasks 7-8, 10

**Context**: /fix Step 10 (Finalize Changes) and /build Step 13 (Finalize Changes) do the same thing: commit, PR, merge, worktree cleanup. Both should include doc-enforcer and PR reviewers. Rather than duplicating, /fix should reference the shared completion pattern.

**Action**:

1. **Update /fix Step 10 (Finalize Changes)** to include:
   - Doc-enforcer audit (same as /build Step 9a)
   - PR reviewers (same as /build Step 13a)
   - State cleanup: update fix STATE.md stage → `complete`, update project registry

2. **Add a Step 9a to /fix** (between Regression Checklist and Finalize):
   ```markdown
   ## Step 9a: Documentation & Quality Review

   If in a worktree with state tracking:

   **Doc-enforcer** (audit mode):
   - Verify fix documentation (STATE.md complete, no misplaced files)

   **PR Reviewers** (after PR creation):
   - code-reviewer: full diff quality
   - cek-test-coverage-reviewer: test coverage for fix
   - cek-contracts-reviewer: API/type changes
   ```

3. **On merge completion**:
   - Update project STATE.md registry: fix status → `complete`
   - Feature spec directory archives naturally

**Verify**: /fix has doc-enforcer + PR reviewers in its completion flow. Pattern matches /build's.
**Done**: Both /fix and /build share the same quality gates at completion

---

### Task 12: Migrate Current STATE.md to New Format

**Type**: auto
**Files**: `planning/STATE.md`
**Dependencies**: Tasks 1-11

**Context**: The current STATE.md has the old monolithic format with all 10 features complete. Since all features are complete and this is a fresh feature, migration is straightforward: slim the project STATE.md to registry-only format (with Type column), and create a feature STATE.md for this feature.

**Action**:

1. **Rewrite `planning/STATE.md`** to project-level-only format:
   - Keep Feature Registry (all 10 complete features + this new one)
   - Add Type, Branch, and Worktree columns
   - Move Decisions section content to project-level (these are historical, keep them)
   - Move Notes section content to project-level
   - Remove: Stage, Active Feature, Current Focus, Progress, Gap Stack, Current State sections

2. **Create `planning/specs/multi-feature-state/STATE.md`** for this feature:
   - Stage: planning (will become building when /build starts)
   - Progress: task list from this PLAN.md
   - Current State: populated with planning context

**Verify**: Project STATE.md has no feature-specific sections. Feature STATE.md has full handoff-quality state.
**Done**: Both state files exist with correct content

---

### Task 13: Review - Verify All Workflows Are Consistent

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 12

**Context**: All workflow files have been updated. Human needs to review the changes for consistency before declaring the feature complete.

**Action**:
Review the following files for consistency:

1. `skills/Planning/my-workflow/SKILL.md` - two-level state documented, no temporary overrides
2. `skills/Planning/my-workflow/workflows/start.md` - context-aware main/worktree behavior
3. `skills/Planning/my-workflow/workflows/plan.md` - creates feature STATE.md, registry-only project updates
4. `skills/Planning/my-workflow/workflows/build.md` - uses feature STATE.md, doc-enforcer + PR reviewers
5. `skills/Code-Quality/fix/SKILL.md` - state-aware, shared completion flow
6. `skills/Git/git-worktrees/SKILL.md` - references new architecture
7. `planning/STATE.md` - project-level only (with Type column)
8. `planning/specs/multi-feature-state/STATE.md` - feature-level state

**Verify**: Walk through mental simulations:

- /start → /plan → /build in a worktree (feature flow)
- /fix in a worktree (fix flow with state)
- /fix on main (quick fix without state)

**Done**: Human confirms all workflows are consistent and ready

## Verification

- [ ] No "TEMPORARY" or override comments remain in any workflow file
- [ ] Project STATE.md contains only: Feature Registry (with Type column), Decisions, Notes
- [ ] Feature STATE.md contains: Stage, Progress, Current State, Gap Stack, Decisions, Notes
- [ ] Fix STATE.md contains: Type=fix, Stage, Issue, Root Cause, Proposed Fix, Current State
- [ ] start.md detects worktree vs main and routes correctly
- [ ] plan.md creates feature STATE.md and only updates project registry
- [ ] build.md reads/writes feature STATE.md for all execution tracking
- [ ] /fix creates state in worktree context, skips state for quick fixes on main
- [ ] Doc-enforcer runs at build completion (Step 9a) and fix completion (Step 9a)
- [ ] PR reviewers run before merge in both /build (Step 13a) and /fix (Step 9a)
- [ ] Feature CLAUDE.md template references STATE.md
- [ ] Feature Registry Type column distinguishes features from fixes
- [ ] Merging a feature or fix creates zero STATE.md conflicts (different files modified)

## Success Criteria

- STATE.md in main accurately reflects project-level reality (registry with types, what's merged, what's in flight)
- STATE.md in each worktree accurately reflects that feature/fix's progress
- Merging a completed feature or fix creates zero STATE.md conflicts
- Every workflow flow (/start, /plan, /build, /fix) reviewed and updated for multi-worktree reality
- Doc-enforcer and PR reviewers integrated into both /build and /fix completion
- /fix tracks state for worktree-based fixes, enabling session handoff
- A new session in any worktree can orient itself from state files alone
