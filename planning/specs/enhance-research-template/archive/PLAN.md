# Enhance RESEARCH.md Template Implementation Plan

## Objective

Update the RESEARCH.md template in plan.md to guide deeper analysis, external learning, and structured decision-making.

## Context

@planning/specs/enhance-research-template/SPEC.md
@planning/specs/enhance-research-template/RESEARCH.md
@skills/my-workflow/workflows/plan.md

## Task Summary

| # | Task | Type | Dependencies | Blocking |
|---|------|------|--------------|----------|
| 1 | Update RESEARCH.md template in plan.md | auto | - | - |
| 2 | Verify template structure | checkpoint:human-verify | Task 1 | yes |

## Tasks

### Task 1: Update RESEARCH.md template in plan.md

**Type**: auto
**Files**: skills/my-workflow/workflows/plan.md
**Dependencies**: None

**Context**: The current template (lines 253-293) needs replacement with the enhanced version designed in conversation.

**Action**:
Replace the RESEARCH.md template section with:
1. Problem Analysis (Problem Domain, Current State)
2. Information Gathered (Codebase Analysis, External Research with Ecosystem Overview and Option Comparison)
3. External Inspirations (Sources Reviewed, Patterns & Approaches, Problems & Solutions, Insights to Apply)
4. Tradeoff Analysis (table + Risks)
5. Architectural Implications (System Boundaries, Dependencies, Integration Points)
6. Approach
7. Alternatives Considered
8. Open Questions
9. Sources

**Verify**: Read updated plan.md, confirm template structure
**Done**: Template contains all new sections with placeholder guidance

---

### Task 2: Verify template structure

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 1

**Context**: User should review the updated template to ensure it matches expectations from our discussion.

**Action**: Present updated template for review
**Verify**: User confirms template is correct
**Done**: User approves

## Verification

- [ ] plan.md contains updated RESEARCH.md template
- [ ] All discussed sections present (Problem Analysis, External Inspirations, Tradeoff Analysis, Architectural Implications, Sources)
- [ ] Template is comprehensive but not overwhelming

## Success Criteria

- Updated template guides thorough research
- Backwards compatible with existing RESEARCH.md files
