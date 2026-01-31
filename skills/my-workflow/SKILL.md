---
name: my-workflow
version: 1.0.0
description: Personal workflow system - principles and stage awareness for solo development. Provides core principles (scope control, deviation rules, handoff protocol) and stage-aware behavior for /start, /plan, /build, /stop commands.
triggers:
  - planning/ directory exists
  - STATE.md mentions workflow stages
  - User mentions start/plan/build/stop workflow
---

# My Workflow

A personalized workflow system with 4 commands (`/start`, `/plan`, `/build`, `/stop`) that provide clear entry points for project stages.

## Table of Contents

1. [Core Principles](#core-principles)
2. [Stage Awareness](#stage-awareness)
3. [Workflows](#workflows)
4. [Quick Reference](#quick-reference)

---

## Core Principles

These principles are always active when this skill loads.

### 1. Development Discipline

**Test-Driven Development (TDD)**: No production code without a failing test first.

- RED → Verify RED → GREEN → Verify GREEN → REFACTOR
- Execute test tasks BEFORE implementation tasks
- Watch tests fail before implementing (mandatory)

**Clean Architecture**: Library-first, domain-driven design.

- Search for existing solutions before writing custom code
- Avoid `utils`, `helpers`, `common` - use domain-specific names
- Separate concerns: business logic ≠ UI ≠ data access
- Size limits: functions < 50 lines, files < 200 lines

### 2. Scope Control

Quality degrades at ~40-50% context - not 80%.

**The quality degradation curve:**

- 0-30% context: Peak quality (comprehensive, thorough)
- 30-50% context: Good quality (engaged, manageable)
- 50-70% context: Degrading quality (efficiency mode, compression)
- 70%+ context: Poor quality (rushed work, shortcuts)

**Critical insight:** Claude enters "completion mode" at ~40-50% when it sees context mounting. By 80%, quality has already crashed.

**Solution:** Recommend handoff before hitting limits. Better to pause with a clean handoff than push through with degraded output.

**Practical rule:** If you notice context filling, suggest `/stop` to create HANDOFF.md before quality degrades.

### 3. Deviation Rules

During execution, handle discoveries automatically:

| Rule | Trigger | Action |
|------|---------|--------|
| **1. Auto-fix bugs** | Broken behavior found | Fix immediately, document in STATE.md |
| **2. Auto-add critical** | Security/correctness gap | Add immediately, document |
| **3. Auto-fix blockers** | Can't proceed | Fix immediately, document |
| **4. Ask about architectural** | Major structural change | Stop and ask user |
| **5. Log enhancements** | Nice-to-have idea | Append to BACKLOG.md, continue |
| **6. Gap detected** | Prerequisite missing / plan needs modification | Invoke Gap Protocol |

**No user intervention needed for Rules 1-3, 5.** Rule 4 (architectural) requires user decision. Rule 6 preserves context before handling plan-modifying gaps.

**Result:** Flow never breaks. Bugs get fixed. Scope stays controlled. Complete transparency.

### 4. Handoff Protocol

Before context fills or when pausing, create comprehensive handoff with:

- **Current state**: What's working, what's not
- **Decisions made**: And why
- **Progress**: What's done, what's left
- **Next steps**: Clear actions for resuming
- **Open questions**: Uncertainties that need resolution

Store in `planning/HANDOFF.md`. This enables clean session transitions.

### 5. Stage Awareness

Read STATE.md to understand current stage. Adapt behavior accordingly:

| Stage | Behavior |
|-------|----------|
| **starting** | Focus on setup, project structure, context gathering |
| **planning** | Focus on specification, ask clarifying questions |
| **building** | Focus on execution, follow the plan, apply deviation rules |
| **stopping** | Focus on handoff, ensure all context is captured |

### 6. Multi-Feature Management

At any moment, only **ONE feature can be actively building**. Multiple features can be planned or paused, but execution focus remains singular.

**Feature Lifecycle States:**

```text
[drafted] → [ready] → [active] → [complete]
                ↓         ↓
            [blocked]  [paused]
```

| State | Description |
|-------|-------------|
| **drafted** | SPEC.md exists but no PLAN.md yet |
| **ready** | PLAN.md approved, waiting to build |
| **active** | Currently executing (`/build` in progress) |
| **paused** | Started, then suspended (via `/stop` or switching) |
| **blocked** | Depends on another feature that isn't complete |
| **complete** | All tasks verified |

**Feature Registry** (tracked in STATE.md):

```markdown
## Feature Registry

| Feature | Status | Progress | Dependencies |
|---------|--------|----------|--------------|
| user-auth | active | 3/5 | - |
| dashboard | blocked | 0/4 | user-auth |
| api-rate | ready | 0/3 | - |
```

**Switching Rules:**

- `/plan` while building: Offer to pause current feature or queue new one
- `/build` with multiple ready: Show registry, filter blocked, offer selection
- Blocked features cannot be selected until dependencies complete

### 7. Always-Active Rules

These rules apply during all workflow stages:

@rules/security-checklist.md
@rules/coding-standards.md
@rules/model-selection.md

---

## Stage Awareness

The workflow tracks state in `planning/STATE.md`. Always read this file to understand where the project is.

### STATE.md Structure

```markdown
# Project State

**Stage**: [starting|planning|building|stopping]
**Last Updated**: [timestamp]

## Active Feature

**Name**: [feature name or "None"]
**Status**: [drafted|ready|active|paused|blocked|complete]
**Progress**: [n/m tasks or "-"]

## Feature Registry

| Feature | Status | Progress | Dependencies |
|---------|--------|----------|--------------|
| {name} | {state} | {n/m} | {deps or -} |

## Current Focus

[What we're working on now]

## Progress ({feature-name})

Task progress for the active feature. Copied from PLAN.md when `/build` starts.

- [x] Task 1: {description}
- [x] Task 2: {description}
- [~] Task 3: {description} (partial progress note)
- [ ] Task 4: {description}
- [ ] Task 5: {description}

Markers:
- `[x]` = completed
- `[ ]` = pending
- `[~]` = in progress (with note)

## Decisions

- [Decision]: [Rationale]

## Blockers

- [Any blocking issues]

## Notes

- [Discovery or deviation notes from execution]
```

### Stage Transitions

```
/start → STATE.md created with stage: starting
       → Transitions to planning after OVERVIEW.md complete

/plan → stage: planning
      → Transitions to building after plan approved

/build → stage: building
       → Stays in building until plan complete or /stop called

/stop → stage: stopping
      → Creates HANDOFF.md
      → Next session starts fresh with handoff context
```

---

## Workflows

Workflow definitions are in `workflows/` subdirectory:

| File | Command | Purpose |
|------|---------|---------|
| `start.md` | `/start` | Begin project with context setup |
| `brainstorm.md` | (via /plan) | Explore unclear ideas |
| `plan.md` | `/plan` | Plan work with spec-driven approach |
| `build.md` | `/build` | Execute plan with deviation rules |
| `stop.md` | `/stop` | Pause with comprehensive handoff |

---

## Quick Reference

### Commands

| Command | When to Use | Output |
|---------|-------------|--------|
| `/start` | Beginning a new project | `planning/OVERVIEW.md`, `STATE.md` |
| `/plan` | Ready to plan work | `planning/ROADMAP.md`, specs |
| `/build` | Plan approved, ready to execute | Code changes, STATE.md updates |
| `/stop` | Pausing work or context filling | `planning/HANDOFF.md` |

### Project Structure

```text
planning/
├── CLAUDE.md        # Planning context (cascading)
├── OVERVIEW.md      # Project vision (created by /start)
├── STATE.md         # Living state (updated continuously)
├── BACKLOG.md       # Persistent improvements backlog
├── HANDOFF.md       # Session handoff (created by /stop)
├── CODEBASE.md      # Brownfield analysis (if applicable)
└── specs/
    └── {feature}/
        ├── CLAUDE.md       # Feature context (cascading)
        ├── SPEC.md         # Requirements
        ├── RESEARCH.md     # Decisions
        ├── PLAN.md         # Executable plan (detailed tasks)
        ├── data-model.md   # (optional) Entity schemas
        ├── contract.md     # (optional) API specifications
        ├── design-options.md # (optional) Architectural alternatives
        └── SUMMARY.md      # Implementation summary (after /build)
```

### Development Discipline Quick Check

Before writing code during `/build`:

1. **Test first?** → Write failing test, watch it fail
2. **Library exists?** → Search before writing custom code
3. **Good name?** → No utils/helpers/common - use domain names
4. **Separated concerns?** → Business logic ≠ UI ≠ data access
5. **Size OK?** → Functions < 50 lines, files < 200 lines

### Deviation Quick Check

When you encounter something unexpected during `/build`:

1. **Bug?** → Fix it, note in STATE.md
2. **Security gap?** → Fix it, note in STATE.md
3. **Blocker?** → Fix it, note in STATE.md
4. **Architecture change?** → STOP. Ask user.
5. **Enhancement idea?** → Add to BACKLOG.md, continue
6. **Prerequisite missing / plan needs change?** → Invoke Gap Protocol

### Gap Protocol (Rule 6)

When a plan-modifying gap is detected:

1. **PRESERVE**: Push current task context to Gap Stack in STATE.md
2. **SCOPE**: Assess impact - new task? different feature?
3. **MODIFY**: Update PLAN.md if needed (mark "Added via Gap Protocol")
4. **EXECUTE**: Complete the gap task
5. **RETURN**: Pop stack, show reminder, resume original task

For user-initiated additions ("also add X"), always show impact assessment before modifying the plan.

### Context Health

Monitor context usage. When approaching 50%:

1. Complete current atomic task
2. Commit work
3. Suggest `/stop` to user
4. Create clean HANDOFF.md
5. Resume fresh next session

---

## Relationship with Built-in Plan Mode

My-Workflow and Claude Code's built-in Plan Mode are **complementary, not conflicting**.

| Aspect | My-Workflow | Built-in Plan Mode |
|--------|-------------|-------------------|
| **Scope** | Full project management | Single structured task |
| **Artifacts** | In project (`planning/`) | In `~/.claude/plans/` |
| **Session scope** | Multi-session with handoffs | Usually single session |
| **When to use** | Complex features, ongoing work | Quick structured tasks, one-off planning |

**Use My-Workflow** when:

- Work spans multiple sessions
- You need persistent artifacts in the project
- Full deviation rules and gap protocol matter
- You want comprehensive documentation

**Use Built-in Plan Mode** when:

- Quick structured task that fits in one session
- You want Claude to plan before executing
- You don't need persistent project artifacts
- Simpler alternative for smaller tasks

Both can coexist. You might use Plan Mode for a quick refactoring task while using My-Workflow for a larger feature.
