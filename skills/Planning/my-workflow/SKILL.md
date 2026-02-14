---
name: my-workflow
version: 1.0.0
description: Personal workflow system - principles and stage awareness for solo development. Provides core principles (scope control, deviation rules, Living Current State) and stage-aware behavior for /start, /plan, /build commands.
triggers:
  - planning/ directory exists
  - STATE.md mentions workflow stages
  - User mentions start/plan/build workflow
---

# My Workflow

A personalized workflow system with 3 commands (`/start`, `/plan`, `/build`) that provide clear entry points for project stages.

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

**Solution:** Current State in PROGRESS.md is maintained continuously. Session can end cleanly at any time without manual handoff creation.

**Practical rule:** If context is filling, mention it to the user. State is already captured in PROGRESS.md.

### 3. Deviation Rules

During execution, handle discoveries automatically:

| Rule | Trigger | Action |
|------|---------|--------|
| **1. Auto-fix bugs** | Broken behavior found | Fix immediately, document in PROGRESS.md |
| **2. Auto-add critical** | Security/correctness gap | Add immediately, document |
| **3. Auto-fix blockers** | Can't proceed | Fix immediately, document |
| **4. Ask about architectural** | Major structural change | Stop and ask user |
| **5. Log enhancements** | Nice-to-have idea | Append to BACKLOG.md, continue |
| **6. Gap detected** | Prerequisite missing / plan needs modification | Invoke Gap Protocol |

**No user intervention needed for Rules 1-3, 5.** Rule 4 (architectural) requires user decision. Rule 6 preserves context before handling plan-modifying gaps.

**Result:** Flow never breaks. Bugs get fixed. Scope stays controlled. Complete transparency.

### 4. Living Current State

Feature PROGRESS.md (`planning/specs/{feature}/PROGRESS.md`) maintains a `## Current State` section that is updated continuously during work. This enables clean session transitions without manual handoff creation.

The Current State captures:

- **What's Working**: Verified functionality
- **What's Not**: Known issues or blockers
- **Next Steps**: Clear actions for resuming

Session can end at any time; state is already captured. Feature PROGRESS.md is the handoff document.

### 5. Stage Awareness

Read STATE.md to understand current stage. Adapt behavior accordingly:

| Stage | Behavior |
|-------|----------|
| **starting** | Focus on setup, project structure, context gathering |
| **planning** | Focus on specification, ask clarifying questions |
| **building** | Focus on execution, follow the plan, apply deviation rules |

### 6. Multi-Feature Management (Worktree-First)

Multiple features run **simultaneously in separate worktrees**. Each worktree owns its feature lifecycle independently. Starting new work does not affect features in other worktrees.

**Two-Level State Architecture:**

- **Project STATE.md** (`planning/STATE.md`): Feature Registry, project decisions, project notes. Shared across all worktrees via main branch.
- **Feature PROGRESS.md** (`planning/specs/{feature}/PROGRESS.md`): Progress, Current State, Gap Stack, feature decisions/notes. Owned by one worktree, never modified by others.

On merge, feature PROGRESS.md archives with the spec. Project STATE.md registry gets a status update.

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
| **paused** | Started, then suspended (via switching features) |
| **blocked** | Depends on another feature that isn't complete |
| **complete** | All tasks verified |

**Feature Registry** (tracked in project STATE.md):

```markdown
## Feature Registry

| Feature   | Type    | Status  | Branch        | Worktree              |
|-----------|---------|---------|---------------|-----------------------|
| user-auth | feature | active  | user-auth     | .worktrees/user-auth  |
| dashboard | feature | blocked | -             | -                     |
| bug-fix-1 | fix     | active  | bug-fix-1     | .worktrees/bug-fix-1  |
```

**Parallel Work Rules:**

- Starting a new feature: proceed directly, do not modify other features' status
- Each worktree is self-contained; no cross-worktree state changes
- Worktrees only modify their own feature PROGRESS.md, never project STATE.md during execution
- Project STATE.md registry is updated only at lifecycle transitions (ready, active, complete)
- Blocked features still cannot start until dependencies complete

### 7. Proposal Validation

Before proposing structural or architectural changes (especially during `/plan`):

1. **Pick a scenario** — Use one the user described
2. **Walk through it** — Step-by-step with the proposed solution
3. **Trace data flow** — Where does each piece come from? Where does it go?
4. **Only present if it works** — Don't propose solutions that fail simulation

**Why:** Solutions that "sound reasonable" often break when simulated. Solve this before presenting, not after.

### 8. Always-Active Rules

Technical standards (coding-standards, security-checklist, model-selection, technical-consistency, behavioral-rules) are in `~/.claude/rules/` and auto-loaded every session via Anthropic's native mechanism. No @references needed.

---

## Stage Awareness

The workflow uses a **two-level state architecture**:

- **Project STATE.md** (`planning/STATE.md`): Read this to see all features and their status.
- **Feature PROGRESS.md** (`planning/specs/{feature}/PROGRESS.md`): Read this to understand a specific feature's progress and current state.

**Context Detection**: Detect which level to use based on environment:

```bash
# In a worktree? Use feature PROGRESS.md
if [ -f .git ]; then
  FEATURE=$(git branch --show-current)
  # Read planning/specs/$FEATURE/PROGRESS.md
else
  # On main branch. Read planning/STATE.md
fi
```

### Project STATE.md Structure

```markdown
# Project State

**Last Updated**: [timestamp]

## Feature Registry

| Feature | Type | Status | Branch | Worktree |
|---------|------|--------|--------|----------|
| {name} | {feature/fix} | {status} | {branch} | {worktree-path} |

## Decisions

- [Decision]: [Rationale]

## Notes

- [Discovery or deviation notes]
```

### Feature PROGRESS.md Structure

```markdown
# {Feature Name} State

**Stage**: [planning|building]
**Last Updated**: [timestamp]

## Progress

- [x] Task 1: {description}
- [~] Task 2: {description} (partial progress note)
- [ ] Task 3: {description}

Markers: [x] completed, [ ] pending, [~] in progress (with note)

## Current State

### What's Working
### What's Not Working
### Next Steps
### Open Questions

## Gap Stack
### Active Gap
### Gap History

## Decisions
## Notes
```

### Stage Transitions

```
/start → Project STATE.md created (Feature Registry)

/plan  → Feature PROGRESS.md created (stage: planning)
       → Project registry updated (status: ready)

/build → Feature PROGRESS.md updated (stage: building)
       → Project registry updated (status: active)
       → Feature Current State updated continuously

merge  → Feature PROGRESS.md archives with spec
       → Project registry updated (status: complete)
```

---

## Workflows

Workflow definitions are in `workflows/` subdirectory:

| File | Command | Purpose |
|------|---------|---------|
| `start.md` | `/start` | Begin project with context setup |
| `plan.md` | `/plan` | Plan work with spec-driven approach (includes inline clarification) |
| `build.md` | `/build` | Execute plan with deviation rules |

---

## Quick Reference

### Commands

| Command | When to Use | Output |
|---------|-------------|--------|
| `/start` | Beginning a new project | `planning/OVERVIEW.md`, `STATE.md` |
| `/plan` | Ready to plan work | `planning/ROADMAP.md`, specs |
| `/build` | Plan approved, ready to execute | Code changes, PROGRESS.md updates |

### Project Structure

```text
planning/
├── CLAUDE.md        # Planning context (cascading)
├── OVERVIEW.md      # Project vision (created by /start)
├── STATE.md         # Project state: Feature Registry, decisions, notes
├── BACKLOG.md       # Persistent improvements backlog
├── CODEBASE.md      # Brownfield analysis (if applicable)
└── specs/
    └── {feature}/
        ├── CLAUDE.md       # Feature context (cascading)
        ├── SPEC.md         # Requirements
        ├── RESEARCH.md     # Decisions
        ├── PLAN.md         # Executable plan (detailed tasks)
        ├── PROGRESS.md     # Feature progress: progress, current state, gap stack
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

1. **Bug?** (code logic error) → Fix it, note in PROGRESS.md
2. **Security gap?** → Fix it, note in PROGRESS.md
3. **Blocker?** (environment/setup issue) → Fix it, note in PROGRESS.md
4. **Architecture change?** → STOP. Ask user.
5. **Enhancement idea?** → Add to BACKLOG.md, continue
6. **Gap?** (plan ordering issue) → Invoke Gap Protocol

### Gap Protocol (Rule 6)

When a plan-modifying gap is detected:

1. **PRESERVE**: Push current task context to Gap Stack in feature PROGRESS.md
2. **SCOPE**: Assess impact - new task? different feature?
3. **MODIFY**: Update PLAN.md if needed (mark "Added via Gap Protocol")
4. **EXECUTE**: Complete the gap task
5. **RETURN**: Pop stack, show reminder, resume original task

For user-initiated additions ("also add X"), always show impact assessment before modifying the plan.

### Context Health

Monitor context usage. PROGRESS.md Current State is maintained continuously, so session can end cleanly at any time.

When approaching 50%:

1. Complete current atomic task
2. Commit work
3. Mention context is filling
4. Continue or end session (state already captured)

---

## Relationship with Built-in Plan Mode

My-Workflow and Claude Code's built-in Plan Mode are **complementary, not conflicting**.

| Aspect | My-Workflow | Built-in Plan Mode |
|--------|-------------|-------------------|
| **Scope** | Full project management | Single structured task |
| **Artifacts** | In project (`planning/`) | In `~/.claude/plans/` |
| **Session scope** | Multi-session with Living Current State | Usually single session |
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
