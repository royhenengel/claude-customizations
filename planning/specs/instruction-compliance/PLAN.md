# Instruction Compliance Fix - Implementation Plan

## Objective

Reduce instruction noise, add structural enforcement, and improve instruction design to fix systemic non-compliance with user-defined rules. Six documented incidents show Claude loading rules but not following them.

## Context

@planning/specs/instruction-compliance/SPEC.md
@planning/specs/instruction-compliance/RESEARCH.md
@rules/ai-chat-prefs.md
@rules/technical-consistency.md
@rules/behavioral-rules.md
@rules/coding-standards.md
@rules/memory-boundaries.md
@rules/model-selection.md
@rules/security-checklist.md
@rules/formatting-rules.md
@skills/Planning/my-workflow/workflows/build.md
@skills/build/SKILL.md

## Task Summary

| # | Task | Type | Dependencies | Blocking |
|---|------|------|--------------|----------|
| 1 | Audit and prune rules files | auto | - | - |
| 2 | Review pruned rules | checkpoint:human-verify | Task 1 | yes |
| 3 | Split build.md into phase files | auto | - | - |
| 4 | Update build SKILL.md with phase routing | auto | Task 3 | - |
| 5 | Apply instruction design improvements | auto | Tasks 1, 3 | - |
| 6 | Create build completion guard hook | auto | - | - |
| 7 | End-to-end verification | checkpoint:human-verify | Tasks 1-6 | yes |

## Tasks

### Task 1: Audit and prune rules files

**Type**: auto
**Files**: `rules/ai-chat-prefs.md`, `rules/technical-consistency.md`, `rules/behavioral-rules.md`, `rules/coding-standards.md`, `rules/memory-boundaries.md`, `rules/model-selection.md`, `rules/security-checklist.md`, `rules/formatting-rules.md`
**Dependencies**: None

**Context**: Rules files total 628 lines, always loaded via `~/.claude/rules/`. Many rules duplicate Claude's default behavior or overlap with CLAUDE.md. Every line competes for attention with critical overrides. Research shows 30%+ attention degradation for middle content in long prompts.

**Action**:

For each rules file, apply this test to every rule/section:
1. **Default behavior test**: Would Claude do this without the instruction? If yes, remove it.
2. **Duplicate test**: Is this also stated in CLAUDE.md or another rules file? If yes, keep only the most specific version.
3. **Compression test**: Can this be said in fewer lines without losing meaning? If yes, compress.

Specific pruning targets identified during research:

**ai-chat-prefs.md** (154 lines → target ~90 lines):
- Section 1 (Purpose/Scope): Remove. Meta-rule about rules. Claude doesn't need this.
- Section 8 (Modes): Remove. Not actively used; no modes are defined.
- Section 9 (Conflict Resolution): Compress to 2 lines. Simple priority rule.
- Section 10 (Governance): Remove. Process overhead, not behavioral.
- Section 11 (Maintenance): Compress to 1 line.
- Section 7 (Accountability subsection): Overlaps with behavioral-rules.md "Verification Before Recommendation". Keep the more specific version in behavioral-rules.md, remove here.
- Horizontal rules (`---`): Remove all (saves 7 lines, reduces visual noise).

**technical-consistency.md** (130 lines → target ~80 lines):
- Design Philosophy (lines 6-11): Remove. Duplicates CLAUDE.md "Core Principles" section.
- Consistency Principle + When Evaluating Options + Decision Framework + Meaningful Value (lines 14-44): Compress from 30 lines to ~10. The concept is "follow existing patterns unless there's a compelling reason not to."
- Quality Standards (lines 109-122): Remove. Duplicates CLAUDE.md "Quality Standards" section.
- Performance Tips (lines 95-107): Keep but note overlap with CLAUDE.md.

**coding-standards.md** (61 lines → target ~45 lines):
- Size Limits table: Already stated in build.md and SKILL.md. Add cross-reference, keep one-line reminder.
- Quality Checklist: Compress. Several items are default behavior ("No console.log", "No magic numbers").

**memory-boundaries.md** (99 lines → target ~85 lines):
- MEMORY.md vs /compound comparison table: Useful but verbose. Compress.
- Decision tree: Keep as-is (high value).

**model-selection.md, security-checklist.md, formatting-rules.md, behavioral-rules.md**: Already compact. Minimal changes.

After pruning, produce a summary: original lines, new lines, percentage reduction per file.

**Verify**: `wc -l rules/*.md` shows total ≤440 lines
**Done**: Total rules volume reduced ≥30%, no critical override removed, pruning summary produced

---

### Task 2: Review pruned rules

**Type**: checkpoint:human-verify
**Blocking**: yes
**Files**: All files from Task 1
**Dependencies**: Task 1

**Context**: Rules pruning risks removing instructions that prevent subtle issues. Human review ensures nothing important was cut.

**Action**: Present the pruning summary showing what was removed/compressed per file. Highlight any edge cases where removal was uncertain.
**Verify**: User reviews and confirms pruned content is acceptable
**Done**: User approves the pruned rules files

---

### Task 3: Split build.md into phase files

**Type**: auto
**Files**: `skills/Planning/my-workflow/workflows/build.md` (source), `skills/Planning/my-workflow/workflows/build-setup.md` (new), `skills/Planning/my-workflow/workflows/build-execute.md` (new), `skills/Planning/my-workflow/workflows/build-complete.md` (new)
**Dependencies**: None

**Context**: build.md is 1,008 lines loaded entirely via @ expansion every time /build is invoked. Most of this content is irrelevant to the current build phase. Splitting into phases means only ~300-350 lines load at a time.

**Action**:

Split build.md into 3 phase files based on natural workflow boundaries:

**build-setup.md** (Steps 1-4: ~120 lines):
- Check prerequisites
- Identify plan to execute
- Load plan as execution prompt
- Create task list and update state files
- Include the resume detection logic
- Include "Development Discipline" section (TDD, Clean Architecture) since it's needed for task creation

**build-execute.md** (Steps 5-7: ~350 lines):
- Execute tasks (subagent pattern, task announcement, completion tracking)
- Deviation rules (all 6 rules with examples and decision flow)
- Gap Protocol (6a)
- User Addition Assessment (6b)
- Context health monitoring (Step 7)
- Include "Subagent Execution Pattern" and "Integration Flow" diagrams

**build-complete.md** (Steps 8-13: ~350 lines):
- Verify completion (Step 8)
- Pre-completion security check (Step 8a)
- Quality review with 3 agents (Step 9)
- Documentation review (Step 9a)
- Create SUMMARY.md (Step 10)
- Update state files (Step 11)
- Completion message (Step 12)
- Finalize changes - commit, PR, merge (Step 13)
- PR Review (Step 13a)

Each phase file MUST be self-contained:
- Include its own header explaining purpose and when it applies
- Reference PROGRESS.md for context continuity
- Include "Development Discipline" reminders where relevant (setup and execute phases)
- Include deviation rules in the execute phase (most likely to need them)

Keep original build.md as-is for reference during transition. Rename to `build-monolith.md` (archived).

**Verify**: Each phase file is ≤400 lines. Combined content covers all original steps 1-13. No steps missing.
**Done**: 3 phase files created, each self-contained and ≤400 lines

---

### Task 4: Update build SKILL.md with phase routing

**Type**: auto
**Files**: `skills/build/SKILL.md`
**Dependencies**: Task 3

**Context**: The current build SKILL.md uses `@skills/Planning/my-workflow/workflows/build.md` which eagerly loads all 1,008 lines. The new approach uses the Read tool to load only the relevant phase.

**Action**:

Replace the current SKILL.md content with phase-routing instructions:

```markdown
---
name: build
description: Execute plan with subagent delegation and deviation rules
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Task, TodoWrite, AskUserQuestion
---

# /build - Execute Implementation Plan

## Phase Detection

1. Read the feature PROGRESS.md to determine current build phase
2. Based on the phase, read ONLY the relevant workflow file using the Read tool

## Phase Routing

| Condition | Phase File | When |
|-----------|-----------|------|
| Stage is ready/planning, OR stage is building with no tasks checked | build-setup.md | Starting or restarting a build |
| Stage is building with tasks in progress | build-execute.md | Actively executing tasks |
| Stage is building with all tasks checked | build-complete.md | All tasks done, finalizing |

Phase files are at: skills/Planning/my-workflow/workflows/

## Instructions

Read the appropriate phase file and follow it exactly.

CRITICAL: Do NOT read all three phase files. Read only the one matching the current phase.

After completing a phase, re-check PROGRESS.md and transition to the next phase if needed:
- Setup → Execute (after task list created)
- Execute → Complete (after all tasks checked)
- Complete → Done (after SUMMARY.md and finalization)
```

**Pitfalls to avoid**:
- Do NOT use @ references to phase files (that would eagerly load them all)
- The routing logic must be in the SKILL.md itself, not in a separate file
- Include the phase file paths explicitly so Claude doesn't guess

**Verify**: SKILL.md contains routing logic without @ references to phase files. Skill loads cleanly.
**Done**: SKILL.md routes to correct phase based on PROGRESS.md stage

---

### Task 5: Apply instruction design improvements

**Type**: auto
**Files**: `rules/behavioral-rules.md`, `rules/coding-standards.md`, phase files from Task 3, `skills/Planning/my-workflow/SKILL.md`
**Dependencies**: Tasks 1, 3

**Context**: Root cause RC3 identified that instructions use descriptive language ("each task runs in...") instead of prescriptive ("each task MUST run in..."). Critical rules are visually indistinguishable from nice-to-haves. The TDD rationalizations table in build.md is the only example of anti-rationalization defense.

**Action**:

**1. Prescriptive language at critical decision points:**

Identify the top 10 rules that have been violated in documented incidents. Convert each from descriptive to prescriptive:

| Before | After |
|--------|-------|
| "Each task runs in a subagent" | "Each task MUST run in a subagent. The orchestrator MUST NOT edit non-planning files directly." |
| "After all tasks complete, verify completion" | "CRITICAL: Steps 8-13 MUST execute after all tasks complete. Skipping any step is a compliance failure." |
| "Run verification steps from PLAN.md" | "You MUST run ALL verification steps. Do NOT skip verification because the tasks 'looked clean'." |

**2. Rationalizations tables:**

Add to build-execute.md (subagent delegation):

```markdown
Common Rationalizations for Direct Execution (All Wrong):

| Excuse | Reality |
|--------|---------|
| "Too simple for a subagent" | Simple tasks still benefit from fresh context and clear ownership. |
| "I can do this faster directly" | Speed is not the goal. Consistency and traceability are. |
| "It's just one file change" | Scope is irrelevant. The pattern is: task → subagent → result. |
| "The subagent will just do what I'd do" | Then delegate it. If the result is the same, the cost is trivial. |
```

Add to build-complete.md (completion steps):

```markdown
Common Rationalizations for Skipping Completion (All Wrong):

| Excuse | Reality |
|--------|---------|
| "The code works, we're done" | Working code is step 8. Steps 9-13 still remain. |
| "No security issues in this change" | You don't know that without running the check. |
| "Quality review isn't needed for small changes" | Small changes introduce bugs too. Run the review. |
| "SUMMARY.md is just documentation" | SUMMARY.md is the audit trail. Without it, work is undocumented. |
| "I'll create the PR later" | Later never comes. Finalize now. |
```

**3. CRITICAL markers:**

Add `CRITICAL:` prefix to the following rules (the ones that failed in documented incidents):
- Subagent delegation requirement (build-execute.md)
- Build completion steps 8-13 requirement (build-complete.md)
- Verification before recommendation (behavioral-rules.md)
- Formatting rules application (formatting-rules.md)

**Verify**: Rationalizations tables present in build-execute.md and build-complete.md. CRITICAL: markers on key rules. Prescriptive language at decision points.
**Done**: Top 10 violated rules use prescriptive language, 2 rationalizations tables added, CRITICAL markers on 4+ rules

---

### Task 6: Create build completion guard hook

**Type**: auto
**Files**: `scripts/hooks/build-completion-guard.sh` (new), `.claude/hooks.json` (modify or create)
**Dependencies**: None

**Context**: The most common failure pattern is skipping build steps 8-13 after tasks complete. A UserPromptSubmit hook can detect completion-related user messages while the build is still in progress and inject a reminder.

**Action**:

Create a shell script that:
1. Reads the feature PROGRESS.md (detect worktree, derive feature name from branch)
2. Checks if stage is "building"
3. Checks if all tasks in Progress are checked (`[x]`)
4. If both conditions met, outputs a reminder about steps 8-13

The hook fires on UserPromptSubmit, which means it runs before Claude processes the user's message. It can inject context via stdout.

**Hook script** (`scripts/hooks/build-completion-guard.sh`):

```bash
#!/bin/bash
# Build Completion Guard Hook
# Fires on UserPromptSubmit to remind about build steps 8-13

# Only relevant in worktrees with a feature PROGRESS.md
if [ ! -f .git ]; then exit 0; fi

BRANCH=$(git branch --show-current 2>/dev/null)
STATE_FILE="planning/specs/${BRANCH}/PROGRESS.md"

if [ ! -f "$STATE_FILE" ]; then exit 0; fi

# Check if stage is "building"
STAGE=$(grep '^\*\*Stage\*\*:' "$STATE_FILE" | head -1 | sed 's/.*: *//')
if [ "$STAGE" != "building" ]; then exit 0; fi

# Check if all tasks are complete (no unchecked tasks remain)
UNCHECKED=$(grep -c '^\- \[ \]' "$STATE_FILE" 2>/dev/null || echo "0")
PARTIAL=$(grep -c '^\- \[\~\]' "$STATE_FILE" 2>/dev/null || echo "0")
PENDING=$((UNCHECKED + PARTIAL))

if [ "$PENDING" -gt 0 ]; then exit 0; fi

# All tasks complete but stage is still building → remind about completion steps
echo "REMINDER: All build tasks are complete but the build is not finalized."
echo "Steps 8-13 MUST be executed: Verification, Security Check, Quality Review, SUMMARY.md, State Update, Finalize."
echo "Read the build-complete.md phase file and follow it."
```

**hooks.json configuration**:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash scripts/hooks/build-completion-guard.sh"
          }
        ]
      }
    ]
  }
}
```

**Pitfalls**:
- The hook must be fast (< 1 second). No network calls, no heavy processing.
- The PROGRESS.md parsing must be robust (grep for exact patterns).
- The hook must NOT fire when not in a worktree or when no feature PROGRESS.md exists.
- Merge with any existing hooks.json content (don't overwrite).

**Verify**: Hook script is executable. `bash scripts/hooks/build-completion-guard.sh` exits cleanly in non-build contexts. In a simulated build-complete context, it outputs the reminder.
**Done**: Hook script created, hooks.json configured, tested in both build and non-build contexts

---

### Task 7: End-to-end verification

**Type**: checkpoint:human-verify
**Blocking**: yes
**Files**: All modified files
**Dependencies**: Tasks 1-6

**Context**: Changes span rules files, workflow files, skill routing, and hooks. End-to-end verification ensures nothing broke.

**Action**:

Structural verification (automated):
1. `wc -l rules/*.md` - total ≤440 lines
2. `wc -l skills/Planning/my-workflow/workflows/build-*.md` - each ≤400 lines
3. Verify build SKILL.md contains no @ references to phase files
4. Verify hook script is executable and exits 0 in non-build context
5. Verify rationalizations tables exist in build-execute.md and build-complete.md
6. Verify CRITICAL: markers present in key locations

Functional verification (manual):
1. Invoke `/start` - should show project dashboard as before
2. Invoke `/plan` in a worktree - should create planning documents as before
3. Invoke `/build` in a worktree - should detect phase and load correct phase file
4. Verify hook fires when all tasks complete in a build context

Present results to user for final sign-off.

**Verify**: All structural checks pass, functional checks documented
**Done**: User confirms all workflows function correctly

## Verification

- [ ] Total rules file volume ≤440 lines (≥30% reduction from 628)
- [ ] build.md split into 3 phase files, each ≤400 lines
- [ ] Build SKILL.md routes via Read tool, no eager @ loading of phases
- [ ] Hook fires on build completion, silent in all other contexts
- [ ] Rationalizations tables for subagent delegation and build completion
- [ ] CRITICAL: markers on top violated rules
- [ ] /start, /plan, /build produce correct behavior

## Success Criteria

- Rules files reduced from 628 to ≤440 lines (≥30% reduction)
- Build workflow loads ≤400 lines per invocation instead of 1,008
- At least 1 enforcement hook operational
- All 6 documented incident patterns addressed by at least one fix layer
