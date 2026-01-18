---
description: Plan work with spec-driven approach and optional brainstorm
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion, EnterPlanMode, ExitPlanMode, TodoWrite, WebSearch, WebFetch
---

# /plan - Create Implementation Plan

Create requirements and executable plans for features.

## Step 1: Check Prerequisites

```bash
ls planning/STATE.md 2>/dev/null || echo "No STATE.md - run /start first"
ls planning/CLAUDE.md 2>/dev/null || echo "No project context"
```

If no `planning/` structure exists:

```text
No project structure found. Run /start first to initialize.
```

## Step 2: Show Backlog and Understand What to Plan

Check for existing backlog:

```bash
cat planning/BACKLOG.md 2>/dev/null || echo "No backlog yet"
```

**If BACKLOG.md has items**, show them:

```text
Current backlog:

Quick Wins:
- [ ] {item 1}

Features:
- [ ] {item 2}

What would you like to plan?

1. Pick from backlog (specify item)
2. Add something new
3. Continue from existing spec
```

**If BACKLOG.md is empty**:

```text
What would you like to plan?

1. A specific feature (describe it)
2. Continue from existing spec
3. Fix/improve something in the codebase
```

## Step 3: Offer Brainstorm (If Needed)

If requirements seem unclear:

```text
Your requirements seem a bit open-ended. Would you like to clarify first?

1. Yes - let's brainstorm to clarify scope
2. No - I know what I want, let's plan
```

If yes: Run /brainstorm, then return here.

## Step 4: Create Feature Directory

```bash
mkdir -p planning/specs/{feature-name}
```

Use kebab-case for feature names.

## Step 5: Create SPEC.md

Gather requirements and create `planning/specs/{feature}/SPEC.md`:

```markdown
# {Feature Name} Specification

## Goal

{What this feature does and why}

## User Stories

- As a {user type}, I want {goal} so that {benefit}

## Requirements

### Functional

- [ ] {Requirement 1}
- [ ] {Requirement 2}

### Non-Functional

- [ ] {Performance, security, or other constraint}

## Constraints

- {Technical constraints}
- {Scope boundaries}

## Success Criteria

- [ ] {Measurable outcome 1}
- [ ] {Measurable outcome 2}
```

**Important**: Resolve any unclear requirements before proceeding.

## Step 6: Create RESEARCH.md

Document approach decisions in `planning/specs/{feature}/RESEARCH.md`:

```markdown
# {Feature Name} Research

## Approach

{Chosen approach and why}

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| A | ... | ... | SELECTED |
| B | ... | ... | Rejected |

## Dependencies

- {External dependencies if any}
```

## Step 7: Create PLAN.md

Create executable plan in `planning/specs/{feature}/PLAN.md`. Keep it atomic (2-3 tasks max).

```markdown
# {Feature Name} Implementation Plan

## Objective

{What and why}

## Context

@planning/specs/{feature}/SPEC.md
@planning/specs/{feature}/RESEARCH.md

## Task Summary

| # | Task | Type | Blocking |
|---|------|------|----------|
| 1 | {name} | auto | - |
| 2 | {name} | checkpoint:human-verify | yes |

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
**Action**: {What to do}
**Verify**: {Manual verification steps}
**Done**: {Human confirms completion}

## Verification

- [ ] {Overall verification}

## Success Criteria

{From spec}
```

**Task Types**:

| Type | Description |
|------|-------------|
| `auto` | Claude executes autonomously |
| `checkpoint:human-verify` | Requires human to verify |
| `checkpoint:decision` | Requires human decision |
| `checkpoint:human-action` | Requires human action |

## Step 8: Update STATE.md

Update `planning/STATE.md`:
- Stage: planning
- Current Focus: {feature-name} - ready for build
- Add to Progress section

## Step 9: Show Results

```text
Plan complete!

Created:
- planning/specs/{feature}/SPEC.md (requirements)
- planning/specs/{feature}/RESEARCH.md (decisions)
- planning/specs/{feature}/PLAN.md ({N} tasks)

Ready to build? Run /build to execute the plan.
```
