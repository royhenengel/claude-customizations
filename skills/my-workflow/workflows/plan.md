# Workflow: /plan

## Purpose

Plan work with spec-driven approach. Creates requirements and executable plans.

## When to Use

- After `/start` has initialized the project
- When you have a feature or task to plan
- When moving from "starting" to "planning" stage

## Entry Point

User invokes `/plan` or asks to plan work.

## Steps

### 1. Check Prerequisites

```bash
ls planning/STATE.md 2>/dev/null || echo "No STATE.md - run /start first"
ls planning/CLAUDE.md 2>/dev/null || echo "No project context"
```

If no `planning/` structure exists, suggest running `/start` first.

### 2. Understand What to Plan

Ask the user:

```text
What would you like to plan?

1. A specific feature (describe it)
2. Continue from existing spec
3. Fix/improve something in the codebase
```

### 3. Offer Brainstorm (If Needed)

If requirements seem unclear or exploratory, offer (but don't require) brainstorm:

```text
Your requirements seem a bit open-ended. Would you like to clarify first?

1. Yes - let's brainstorm to clarify scope
2. No - I know what I want, let's plan
```

**If yes**: Run `workflows/brainstorm.md`, then return here with spec.md created.

**If no**: Continue to step 4.

**Note**: Brainstorm is optional. Not everything needs clarification.

### 4. Create Feature Directory

```bash
mkdir -p planning/specs/{feature-name}
```

Use kebab-case for feature names (e.g., `user-authentication`, `api-integration`).

### 5. Create spec.md (If Not From Brainstorm)

If brainstorm was skipped, gather requirements directly:

```markdown
# {Feature Name} Specification

## Goal

{What this feature does and why}

## User Stories

- As a {user type}, I want {goal} so that {benefit}
- As a {user type}, I want {goal} so that {benefit}

## Requirements

### Functional

- [ ] {Requirement 1}
- [ ] {Requirement 2}
- [ ] [NEEDS CLARIFICATION: {unclear requirement - what specifically?}]

### Non-Functional

- [ ] {Performance, security, or other constraint}

## Constraints

- {Technical constraints}
- {Scope boundaries - what's NOT included}

## Success Criteria

- [ ] {Measurable outcome 1}
- [ ] {Measurable outcome 2}

## Open Questions

- [NEEDS CLARIFICATION: {Question that must be answered before implementation}]
```

Write to `planning/specs/{feature}/SPEC.md`.

**Validation before proceeding**: Ensure NO `[NEEDS CLARIFICATION]` markers remain. If any exist, resolve them with the user before creating PLAN.md.

### 6. Create research.md (Decisions)

Document approach decisions:

```markdown
# {Feature Name} Research

## Approach

{Chosen approach and why}

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| A | ... | ... | SELECTED |
| B | ... | ... | Rejected: reason |

## Dependencies

- {External dependencies if any}

## Open Questions

- {Any unresolved questions}
```

Write to `planning/specs/{feature}/RESEARCH.md`.

### 7. Create PLAN.md (Plans Are Prompts)

The plan IS the execution prompt. Keep it atomic (2-3 tasks max).

```markdown
# {Feature Name} Implementation Plan

## Objective

{What and why - copied from spec}

## Context

@planning/specs/{feature}/SPEC.md
@planning/specs/{feature}/RESEARCH.md
{@other relevant files}

## Task Summary

| # | Task | Type | Blocking |
|---|------|------|----------|
| 1 | {name} | auto | - |
| 2 | {name} | checkpoint:human-verify | yes |
| 3 | {name} | checkpoint:decision | yes |

## Tasks

### Task 1: {Description}

**Type**: auto
**Files**: {files to touch}
**Action**: {What to do}
**Verify**: {How to verify it worked}
**Done**: {Completion criteria}

---

### Task 2: {Description}

**Type**: checkpoint:human-verify
**Blocking**: yes
**Files**: {files to touch}
**Action**: {What to do}
**Verify**: {Manual verification steps for human}
**Done**: {Human confirms completion}

---

### Task 3: {Description}

**Type**: checkpoint:decision
**Blocking**: yes
**Question**: {Decision that needs to be made}
**Options**:
| Option | Pros | Cons |
|--------|------|------|
| A: {name} | {pros} | {cons} |
| B: {name} | {pros} | {cons} |
**Default**: {recommended option and why}
**Action**: {What to do after decision}
**Done**: {Decision recorded, action taken}

## Verification

- [ ] {Overall verification 1}
- [ ] {Overall verification 2}

## Success Criteria

{Measurable outcomes from spec}
```

**Task Types**:

| Type | Description | Blocking |
|------|-------------|----------|
| `auto` | Claude executes autonomously | No |
| `checkpoint:human-verify` | Requires human to verify before continuing | Configurable |
| `checkpoint:decision` | Requires human decision with options | Configurable |
| `checkpoint:human-action` | Requires human to perform action (e.g., deploy, test manually) | Yes |

Write to `planning/specs/{feature}/PLAN.md`.

### 8. Update STATE.md

```markdown
# Project State

**Stage**: planning
**Last Updated**: {timestamp}

## Current Focus

{Feature name} - planning complete, ready for build

## Progress

- [x] planning/ structure created
- [x] {Feature} spec created
- [x] {Feature} plan created
- [ ] {Feature} implementation

## Decisions

- {Feature}: {approach chosen}
```

### 9. Transition to Building

After plan is created:

```text
Plan complete!

Created:
- planning/specs/{feature}/SPEC.md (requirements)
- planning/specs/{feature}/RESEARCH.md (decisions)
- planning/specs/{feature}/PLAN.md (executable plan with {N} tasks)

Ready to build? Run /build to execute the plan.
```

## Output Structure

```text
planning/
├── OVERVIEW.md
├── CLAUDE.md
├── STATE.md              # Stage: planning
└── specs/
    └── {feature}/
        ├── SPEC.md       # Requirements
        ├── RESEARCH.md   # Decisions
        └── PLAN.md       # Executable plan
```

## Plan Principles

### Plans Are Prompts

PLAN.md is not documentation that becomes a prompt - it IS the prompt.

Contains:
- Objective (what and why)
- Context (@file references)
- Task Summary (quick overview table)
- Tasks with rich types (auto, checkpoint:human-verify, checkpoint:decision, checkpoint:human-action)
- Verification (overall checks)
- Success criteria (measurable)

### Task Types

| Type | When to Use | Blocking |
|------|-------------|----------|
| `auto` | Claude can complete without human input | No |
| `checkpoint:human-verify` | Human needs to review/approve output | Configurable |
| `checkpoint:decision` | Human must choose between options | Configurable |
| `checkpoint:human-action` | Human must do something (deploy, test, etc.) | Always |

### Checkpoints

- **Blocking**: Execution stops until human responds
- **Non-blocking**: Logged for review, execution continues
- **Decision gates**: Present options with pros/cons, wait for choice

### Scope Control (2-3 Tasks Max)

Quality degrades at ~40-50% context, not 80%.

Split complex work into multiple small plans:
- `{feature}/01-PLAN.md` - First chunk (2-3 tasks)
- `{feature}/02-PLAN.md` - Second chunk (2-3 tasks)

Better to have 5 small high-quality plans than 1 large degraded plan.

### YAGNI Ruthlessly

Remove unnecessary features. If it's not in the spec, it's not in the plan.

## Integration Flow

```text
/plan invoked
    |
    v
Check prerequisites (planning/ exists?)
    |
    v
"What to plan?" + "Clarify first?" (optional)
    |
    +-- Brainstorm --> brainstorm.md --> SPEC.md created
    |
    +-- Direct --> Gather requirements --> SPEC.md
    |
    v
Create RESEARCH.md (decisions)
    |
    v
Create PLAN.md (2-3 tasks)
    |
    v
Update STATE.md (stage: planning)
    |
    v
"Ready to /build?"
```
