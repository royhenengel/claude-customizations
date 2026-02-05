# /fix Command Implementation Plan

## Objective

Create a `/fix` command that enforces a thorough fix workflow: git history search, project conventions, affected area mapping, root cause analysis, verification, and convention-change detection.

## Context

@planning/specs/fix-command/spec.md
@planning/specs/fix-command/research.md

## Task Summary

| # | Task | Type | Blocking |
|---|------|------|----------|
| 1 | Create /fix command file | auto | - |
| 2 | Test with real issue | checkpoint:human-verify | yes |

## Tasks

### Task 1: Create /fix command file

**Type**: auto
**Files**: `commands/fix.md`
**Action**:
- Create command file with YAML frontmatter (description, optional issue argument)
- Implement 8-step process from spec
- Include output format template
- Reference project paths (CLAUDE.md, BACKLOG.md) generically

**Verify**: File exists and follows command file patterns from existing commands

**Done**: `commands/fix.md` created with complete process definition

---

### Task 2: Test with real issue

**Type**: checkpoint:human-verify
**Blocking**: yes
**Action**: User invokes `/fix` on an actual issue to validate the workflow
**Verify**:
- All 8 steps execute in order
- Git history is actually searched
- Output format matches spec
- Convention check works (if applicable)

**Done**: User confirms the fix workflow works as designed

## Verification

- [ ] Command file follows existing command patterns
- [ ] All 8 steps from spec are represented
- [ ] Output format matches spec

## Success Criteria

From spec:
- Thorough investigation before proposing fixes
- Git history consulted for related past work
- Project conventions respected
- Regression checklist provided
- Convention-worthy insights surfaced and added to backlog
