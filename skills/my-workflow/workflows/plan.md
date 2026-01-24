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

### 1. Check Prerequisites and Active Features

```bash
ls planning/STATE.md 2>/dev/null || echo "No STATE.md - run /start first"
ls planning/CLAUDE.md 2>/dev/null || echo "No project context"
```

If no `planning/` structure exists, suggest running `/start` first.

**Check for active features** by reading STATE.md Feature Registry:

If another feature has status `active` or `paused`:

```text
You have an active feature: {feature-name} ({status}, {progress})

Planning options:
1. Pause current feature and plan new one
2. Add to BACKLOG.md (plan later)
3. Quick draft (SPEC.md only, continue current work)

Which would you prefer?
```

- **Option 1**: Update Feature Registry (current → paused), then proceed with planning
- **Option 2**: Add brief description to BACKLOG.md under Features, return to current work
- **Option 3**: Create only `planning/specs/{feature}/SPEC.md` with status `drafted`, add to Feature Registry, return to current work

If no active features (or user chooses Option 1), continue to Step 2.

### 2. Show Backlog and Understand What to Plan

First, check if there's an existing backlog:

```bash
cat planning/BACKLOG.md 2>/dev/null || echo "No backlog yet"
```

**If BACKLOG.md has items**, show them first:

```text
Current backlog:

Quick Wins:
- [ ] {item 1}
- [ ] {item 2}

Features:
  Ready to Plan:
  - [ ] {item 3}
  - [ ] {item 4} (depends: {other-feature})

  Drafted:
  - [ ] {item 5} - has SPEC.md, needs PLAN.md

  Ideas:
  - [ ] {item 6} - needs refinement

Technical Debt:
- [ ] {item 7}

What would you like to plan?

1. Pick from backlog (specify item)
2. Add something new
3. Continue from existing spec
```

**Dependency notation**: Use `(depends: feature-name)` to indicate a feature that must complete first. Multiple dependencies: `(depends: feature-a, feature-b)`.

**Feature status in BACKLOG.md**:
- **Ready to Plan**: Has clear requirements, can create PLAN.md
- **Drafted**: Has SPEC.md but no PLAN.md yet
- **Ideas**: Needs refinement before planning

**If BACKLOG.md is empty or doesn't exist**:

```text
What would you like to plan?

1. A specific feature (describe it)
2. Continue from existing spec
3. Fix/improve something in the codebase
```

When picking from backlog, remove the item from BACKLOG.md after creating the spec.

### 3. Offer Brainstorm (If Needed)

If requirements seem unclear or exploratory, offer (but don't require) brainstorm:

```text
Your requirements seem a bit open-ended. Would you like to clarify first?

1. Yes - let's brainstorm to clarify scope
2. No - I know what I want, let's plan
```

**If yes**: Run `workflows/brainstorm.md`, then return here with spec.md created.

**If no**: Continue to step 4.

**Role distinction**: /brainstorm creates requirements (SPEC.md) through dialogue, /plan creates implementation tasks (PLAN.md). If requirements are clear, proceed directly. If unclear, brainstorm prevents wasted implementation.

### 4. Create Feature Directory

```bash
mkdir -p planning/specs/{feature-name}
```

Use kebab-case for feature names (e.g., `user-authentication`, `api-integration`).

### 5. Create Feature CLAUDE.md (Cascading Context)

Create the feature-level context file that provides cascading context when working in this directory:

```markdown
# {Feature Name} Context

## Specification

@SPEC.md

## Research & Decisions

@RESEARCH.md

## Implementation Plan

@PLAN.md

## Status

Planning in progress.
```

Write to `planning/specs/{feature}/CLAUDE.md`.

This file will be automatically updated as the feature progresses (e.g., "Implementation in progress", "Complete - pending testing").

### 6. Create SPEC.md (If Not From Brainstorm)

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

### 7. Create RESEARCH.md (Research & Decisions)

Document research findings and approach decisions:

```markdown
# {Feature Name} Research

## Information Gathered

### Codebase Analysis

- {Existing patterns discovered}
- {Related code that will be affected}
- {Conventions to follow}

### External Research

- {Library/API documentation findings}
- {Best practices discovered}
- {Constraints identified}

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

### 8. Create PLAN.md (Detailed Documentation)

Create a comprehensive implementation plan with as many tasks as needed for clarity.

```markdown
# {Feature Name} Implementation Plan

## Objective

{What and why - copied from spec}

## Context

@planning/specs/{feature}/SPEC.md
@planning/specs/{feature}/RESEARCH.md
{@other relevant files}

## Task Summary

| # | Task | Type | Dependencies | Blocking |
|---|------|------|--------------|----------|
| 1 | {name} | auto | - | - |
| 2 | Write tests for {component} | auto | Task 1 | - |
| 3 | Implement {component} | auto | Task 2 | - |
| 4 | {name} | checkpoint:decision | Tasks 1-3 | yes |

## Tasks

### Task 1: {Description}

**Type**: auto
**Files**: {exact paths to create/modify}
**Dependencies**: None

**Context**: {Why this task exists, what problem it solves}

**Action**:
{Detailed implementation steps:
- Technology choices and why
- Edge cases to handle
- Pitfalls to avoid
- Code patterns to follow from existing codebase}

**Verify**: {Executable command or test}
**Done**: {Measurable acceptance criteria}

---

### Task 2: {Description}

**Type**: checkpoint:human-verify
**Blocking**: yes
**Files**: {exact paths}
**Dependencies**: Task 1

**Context**: {Why human verification is needed}

**Action**: {What to do}
**Verify**: {Manual verification steps for human}
**Done**: {Human confirms completion}

---

### Task 3: {Description}

**Type**: checkpoint:decision
**Blocking**: yes
**Dependencies**: Tasks 1-2

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

### 9. Update STATE.md and Feature CLAUDE.md

Update `planning/STATE.md`:

```markdown
# Project State

**Stage**: planning
**Last Updated**: {timestamp}

## Active Feature

**Name**: {feature-name}
**Status**: ready
**Progress**: 0/{N}

## Feature Registry

| Feature | Status | Progress | Dependencies |
|---------|--------|----------|--------------|
| {feature-name} | ready | 0/{N} | {deps or -} |
| {other features...} | ... | ... | ... |

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

**Feature Registry updates**:
- Add new feature with status `ready` and task count from PLAN.md
- If feature has dependencies, record them in the Dependencies column
- Remove from BACKLOG.md if it was picked from there

Update `planning/specs/{feature}/CLAUDE.md` status:

```markdown
## Status

Planning complete. Ready for /build.
```

### 10. Transition to Building

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
├── BACKLOG.md            # Persistent improvements backlog
└── specs/
    └── {feature}/
        ├── CLAUDE.md     # Feature context (cascading)
        ├── SPEC.md       # Requirements
        ├── RESEARCH.md   # Decisions
        └── PLAN.md       # Executable plan
```

## Plan Principles

### TDD Task Ordering

Follow the Red-Green-Refactor cycle from the software-development-practices skill:

1. **RED** - Write failing test for one behavior
2. **Verify RED** - Run test, confirm it fails for the right reason
3. **GREEN** - Write minimal code to pass
4. **Verify GREEN** - Run test, confirm it passes
5. **REFACTOR** - Clean up while staying green
6. **Repeat** - Next behavior

Tasks should be structured per-behavior, not batched:

```text
Task 1: Set up module structure
Task 2: Write test for user creation (RED)
Task 3: Implement user creation to pass test (GREEN)
Task 4: Write test for user validation (RED)
Task 5: Implement user validation to pass test (GREEN)
Task 6: Refactor and verify all tests pass
```

Key: Each test must be seen failing before implementation. A test that passes immediately proves nothing.

### Comprehensive Documentation (GSD/CEK Style)

Document everything needed for implementation. PLAN.md should contain enough detail that any developer (or Claude session) can execute it without ambiguity.

Contains:

- Objective (what and why)
- Context (@file references)
- Task Summary (overview table with dependencies)
- Tasks with full context (why, how, edge cases, pitfalls)
- Verification (overall checks)
- Success criteria (measurable)

### Task Detail Level

Each task should include:

- **Context**: Why this task exists
- **Action**: Detailed steps including technology choices, edge cases, pitfalls
- **Files**: Exact paths to create/modify
- **Dependencies**: Which tasks must complete first
- **Verify**: Executable command or test
- **Done**: Measurable acceptance criteria

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

### Context Health Awareness

Quality degrades at ~40-50% context, not 80%.

For large features, use numbered plan files:

- `{feature}/01-PLAN.md` - First phase
- `{feature}/02-PLAN.md` - Second phase

Create a HANDOFF.md between phases if context is filling.

### Optional Artifacts

For complex features, create additional documentation:

| Artifact | When to Create | Purpose |
|----------|----------------|---------|
| `data-model.md` | Features with entities/relationships | Document schema, validation rules |
| `contract.md` | Features with APIs | Document endpoints, request/response |
| `design-options.md` | Major architectural decisions | Compare 2-3 approaches with trade-offs |

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
    v
Create feature directory + CLAUDE.md (cascading context)
    |
    +-- Brainstorm --> brainstorm.md --> SPEC.md created
    |
    +-- Direct --> Gather requirements --> SPEC.md
    |
    v
Create RESEARCH.md (decisions)
    |
    v
Create PLAN.md (detailed tasks)
    |
    v
Update STATE.md + feature CLAUDE.md (stage: planning)
    |
    v
"Ready to /build?"
```
