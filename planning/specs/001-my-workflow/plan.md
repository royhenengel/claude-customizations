# My Workflow System Implementation Plan

## Objective

Create a personalized workflow system with 4 commands (`/start`, `/plan`, `/build`, `/stop`) backed by a `my-workflow` skill that holds principles and workflow logic.

## Context

@planning/specs/001-my-workflow/SPEC.md
@planning/specs/001-my-workflow/RESEARCH.md

## Task Summary

| # | Task | Type | Status |
|---|------|------|--------|
| 1 | Manual Curation | checkpoint:human-action | done |
| 2 | Create skill structure | auto | done |
| 3 | Create workflows | auto | done |
| 4 | Create command wrappers | auto | done |
| 5 | Verification | checkpoint:human-verify | done |
| 6 | Add Gap Protocol | auto | done |

## Tasks

### Task 1: Manual Curation

**Type**: checkpoint:human-action
**Status**: done
**Action**: Clear workspace of unused skills/commands
**Instructions**:
1. Create `~/.claude/reference/skills/` and `~/.claude/reference/commands/`
2. Review skills with user, move unused to reference
3. Review commands with user, move unused to reference
4. Verify symlinks work after moves
**Done**: Active skills/commands curated, reference materials accessible

---

### Task 2: Create Skill Structure

**Type**: auto
**Status**: done
**Files**: `skills/my-workflow/`
**Action**: Create the my-workflow skill skeleton
**Verify**: Skill loads when .planning/ exists
**Done**: 
- Created `skills/my-workflow/SKILL.md` with frontmatter and core principles
- Created `skills/my-workflow/workflows/` directory

---

### Task 3: Create Workflows

**Type**: auto
**Status**: done
**Files**: `skills/my-workflow/workflows/*.md`
**Action**: Create all 5 workflows by reviewing existing patterns and adapting
**Verify**: Each workflow has clear steps and integrates selected patterns
**Done**:
- `workflows/start.md` - Project initialization with brownfield detection
- `workflows/brainstorm.md` - Idea exploration (optional)
- `workflows/plan.md` - Spec-driven planning with plans-as-prompts
- `workflows/build.md` - Execution with deviation rules
- `workflows/stop.md` - Handoff creation

---

### Task 4: Create Command Wrappers

**Type**: auto
**Status**: done
**Files**: `commands/*.md`
**Action**: Create thin command wrappers (~15 lines each)
**Verify**: Commands invoke skill workflows correctly
**Done**:
- `commands/start.md` → `workflows/start.md`
- `commands/plan.md` → `workflows/plan.md`
- `commands/build.md` → `workflows/build.md`
- `commands/stop.md` → `workflows/stop.md`

---

### Task 5: Verification

**Type**: checkpoint:human-verify
**Status**: done
**Action**: Test full workflow on real project
**Verify**: /start → /plan → /build → /stop flow works
**Done**: Workflow tested and functional

---

### Task 6: Add Gap Protocol

**Type**: auto
**Status**: done
**Action**: Add Rule 6 (Gap detected) to deviation rules with formal protocol for handling plan-modifying gaps

**Files**:

- `skills/my-workflow/SKILL.md` - Added Rule 6 to deviation rules table, added Gap Protocol quick reference
- `skills/my-workflow/workflows/build.md` - Added full Gap Protocol (6a) and User Addition Assessment (6b)
- `skills/my-workflow/workflows/start.md` - Added Gap Stack section to STATE.md template

**Verify**: Gap Stack section in STATE.md template, Gap Protocol steps in build.md

**Done**:

- Gap Protocol with 6 steps: ASSESS, PRESERVE, SCOPE, MODIFY, EXECUTE, RETURN
- Gap Stack in STATE.md tracks context during plan-modifying gaps
- User additions always get impact assessment before modifying plan
- Return-to-task banner ensures original objective is not forgotten

## Verification

- [x] Skill loads when .planning/ directory exists
- [x] Commands invoke correct workflows
- [x] STATE.md updates work
- [x] HANDOFF.md creation works
- [x] Documentation complete (README.md, templates)

## Success Criteria

- [x] Active skills list reduced by at least 50% after curation
- [x] Can complete a typical project using only workflow commands
- [x] Custom commands feel like ONE coherent system
- [x] Adding a new command takes less than 10 minutes (templates provided)
