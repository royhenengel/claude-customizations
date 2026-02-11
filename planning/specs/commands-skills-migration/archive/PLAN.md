# Commands & Skills Migration Implementation Plan

## Objective

Migrate from dual commands/ + skills/ structure to skills-only, resolving conflicts and standardizing frontmatter. Consolidate CEK commands into a single skill.

## Context

@planning/specs/commands-skills-migration/SPEC.md
@planning/specs/commands-skills-migration/RESEARCH.md

## Task Summary

| # | Task | Type | Dependencies | Blocking |
|---|------|------|--------------|----------|
| 1 | Resolve 4 naming conflicts | auto | - | - |
| 2 | Verify conflict resolution | checkpoint:human-verify | 1 | yes |
| 3 | Consolidate CEK commands into single skill | auto | 2 | - |
| 4 | Verify CEK consolidation | checkpoint:human-verify | 3 | yes |
| 5 | Categorize remaining commands for migration | auto | 4 | - |
| 6 | Review migration plan | checkpoint:human-verify | 5 | yes |
| 7 | Migrate commands batch 1 (notion-*, git-*, core workflow) | auto | 6 | - |
| 8 | Migrate commands batch 2 (remaining commands) | auto | 7 | - |
| 9 | Archive original commands/ directory | auto | 8 | - |
| 10 | Update CLAUDE.md and documentation | auto | 9 | - |
| 11 | Final verification | checkpoint:human-verify | 10 | yes |

## Tasks

### Task 1: Resolve 4 Naming Conflicts

**Type**: auto
**Files**:
- DELETE: `commands/notion-knowledge-capture.md`
- DELETE: `commands/notion-meeting-intelligence.md`
- DELETE: `commands/notion-research-docs.md`
- DELETE: `commands/notion-spec-to-implementation.md`
**Dependencies**: None

**Context**: All 4 conflicting commands are thin wrappers that invoke the corresponding skill. The skills have richer content. Deleting the commands eliminates the conflict while preserving functionality.

**Action**:
1. Move 4 conflicting commands to `archive/commands/` (preserve history)
2. Verify each skill still works via `/skill-name` invocation

**Verify**: `ls commands/notion-*.md` returns empty
**Done**: No naming conflicts between commands/ and skills/

---

### Task 2: Verify Conflict Resolution

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 1

**Context**: Ensure the 4 notion-* commands can still be invoked and work correctly.

**Action**: Test each command manually
**Verify**:
- [ ] `/notion-knowledge-capture` works
- [ ] `/notion-meeting-intelligence` works
- [ ] `/notion-research-docs` works
- [ ] `/notion-spec-to-implementation` works
**Done**: Human confirms all 4 commands work

---

### Task 3: Consolidate CEK Commands into Single Skill

**Type**: auto
**Files**:
- CREATE: `skills/cek/SKILL.md`
- CREATE: `skills/cek/references/*.md` (one per workflow step)
- MOVE: `commands/cek-*.md` → `archive/commands/`
**Dependencies**: Task 2

**Context**: 40+ cek-* commands form a cohesive Context Engineering Kit workflow. Consolidating reduces directory count and aligns with skill best practices (SKILL.md + references/).

**Action**:
1. Create `skills/cek/` directory structure:
   ```
   skills/cek/
   ├── SKILL.md           (main entry, workflow overview)
   └── references/
       ├── setup.md       (from cek-00-setup)
       ├── specify.md     (from cek-01-specify)
       ├── plan.md        (from cek-02-plan)
       ├── tasks.md       (from cek-03-tasks)
       ├── implement.md   (from cek-04-implement)
       ├── document.md    (from cek-05-document)
       ├── analysis/      (kaizen methods)
       │   ├── analyse.md
       │   ├── analyse-problem.md
       │   ├── cause-and-effect.md
       │   ├── why.md
       │   ├── root-cause-tracing.md
       │   └── plan-do-check-act.md
       ├── review/        (review methods)
       │   ├── critique.md
       │   ├── review-pr.md
       │   ├── review-local-changes.md
       │   └── attach-review-to-pr.md
       ├── testing/       (testing methods)
       │   ├── test-skill.md
       │   ├── test-prompt.md
       │   ├── fix-tests.md
       │   └── write-tests.md
       └── utilities/     (misc)
           ├── brainstorm.md
           ├── create-ideas.md
           ├── commit.md
           ├── create-pr.md
           ├── create-hook.md
           ├── create-skill.md
           ├── create-command.md
           ├── analyze-issue.md
           ├── memorize.md
           └── reflect.md
   ```

2. Write SKILL.md with:
   - Clear description of CEK methodology
   - Workflow overview (numbered steps)
   - Reference to each sub-file for details
   - Aliases section mapping old names to new structure

3. Move original cek-* commands to archive/commands/

**Verify**: `ls skills/cek/SKILL.md` exists, `ls commands/cek-*.md` returns empty
**Done**: CEK consolidated into single skill with references

---

### Task 4: Verify CEK Consolidation

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 3

**Context**: Ensure CEK functionality is preserved and discoverable.

**Action**: Test key CEK workflows
**Verify**:
- [ ] `/cek` shows overview and options
- [ ] Core workflow steps are accessible
- [ ] At least one analysis method works
- [ ] At least one review method works
**Done**: Human confirms CEK skill works

---

### Task 5: Categorize Remaining Commands for Migration

**Type**: auto
**Files**: Create `planning/specs/commands-skills-migration/MIGRATION-PLAN.md`
**Dependencies**: Task 4

**Context**: Remaining commands (~30 after CEK removal) need categorization to determine migration approach.

**Action**:
1. List all remaining commands (excluding notion-*, cek-*)
2. Categorize into groups:
   - **Simple migration**: Single-file commands → single SKILL.md
   - **Consolidation candidates**: Related commands that could share a skill
   - **Archive candidates**: Unused or redundant commands
3. Document in MIGRATION-PLAN.md with rationale

**Verify**: MIGRATION-PLAN.md exists with categorized list
**Done**: All remaining commands have migration plan

---

### Task 6: Review Migration Plan

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 5

**Context**: User reviews and approves migration approach for remaining commands.

**Action**: Present MIGRATION-PLAN.md for approval
**Verify**: User approves or modifies plan
**Done**: Migration plan approved

---

### Task 7: Migrate Commands Batch 1

**Type**: auto
**Files**: Skills to create, commands to archive
**Dependencies**: Task 6

**Context**: Migrate priority commands first (core workflow, git-related).

**Action**:
1. For each command in batch 1:
   - Create `skills/{name}/SKILL.md` with proper frontmatter
   - Copy content, updating format as needed
   - Move original to `archive/commands/`
2. Batch 1 includes:
   - commit, pr, review, test, debug, fix
   - build, plan, start, status
   - Any other core workflow commands

**Verify**: All batch 1 commands work via `/name`
**Done**: Batch 1 migrated

---

### Task 8: Migrate Commands Batch 2

**Type**: auto
**Files**: Remaining skills to create
**Dependencies**: Task 7

**Context**: Migrate remaining commands.

**Action**:
1. For each remaining command:
   - Create `skills/{name}/SKILL.md`
   - Move original to `archive/commands/`
2. Batch 2 includes all remaining commands not in batch 1

**Verify**: All commands work via `/name`
**Done**: All commands migrated

---

### Task 9: Archive Original commands/ Directory

**Type**: auto
**Files**:
- MOVE: `commands/` → `archive/commands-pre-migration/`
- UPDATE: `CLAUDE.md` to remove commands/ references
**Dependencies**: Task 8

**Context**: Preserve original commands for reference/rollback.

**Action**:
1. Rename `commands/` to `archive/commands-pre-migration/`
2. Update root CLAUDE.md structure section

**Verify**: `ls commands/` returns "not found", archive exists
**Done**: commands/ directory archived

---

### Task 10: Update CLAUDE.md and Documentation

**Type**: auto
**Files**:
- UPDATE: `CLAUDE.md`
- UPDATE: `planning/OVERVIEW.md` (if needed)
**Dependencies**: Task 9

**Context**: Documentation must reflect new structure.

**Action**:
1. Update CLAUDE.md:
   - Remove commands/ from structure
   - Update skills count
   - Note migration in changelog section
2. Update any docs that reference commands/

**Verify**: Documentation accurate
**Done**: All docs updated

---

### Task 11: Final Verification

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 10

**Context**: Comprehensive verification of migration.

**Action**: Full system check
**Verify**:
- [ ] No commands/ directory (only archive)
- [ ] All previous `/command` invocations work
- [ ] Skills properly organized
- [ ] Documentation accurate
- [ ] No broken references
**Done**: Migration complete and verified

## Verification

- [ ] All 76 original commands are either migrated to skills/ or archived
- [ ] Zero naming conflicts
- [ ] All `/command` invocations work
- [ ] CEK consolidated into single skill
- [ ] Documentation updated

## Success Criteria

- Single source of truth: skills/ directory
- All commands invocable via `/name`
- CEK consolidated from 40+ files to 1 skill with references
- Clean archive of original commands/
