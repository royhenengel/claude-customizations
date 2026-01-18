---
name: my-workflow
version: 1.0.0
description: Personal workflow system - principles and stage awareness for solo development. Provides core principles (scope control, deviation rules, handoff protocol) and stage-aware behavior for /start, /design, /build, /stop commands.
triggers:
  - planning/ directory exists
  - STATE.md mentions workflow stages
  - User mentions start/design/build/stop workflow
---

# My Workflow

A personalized workflow system with 4 commands (`/start`, `/design`, `/build`, `/stop`) that provide clear entry points for project stages.

## Table of Contents

1. [Core Principles](#core-principles)
2. [Stage Awareness](#stage-awareness)
3. [Workflows](#workflows)
4. [Quick Reference](#quick-reference)

---

## Core Principles

These principles are always active when this skill loads.

### 1. Scope Control

Quality degrades at ~40-50% context - not 80%.

**The quality degradation curve:**

- 0-30% context: Peak quality (comprehensive, thorough)
- 30-50% context: Good quality (engaged, manageable)
- 50-70% context: Degrading quality (efficiency mode, compression)
- 70%+ context: Poor quality (rushed work, shortcuts)

**Critical insight:** Claude enters "completion mode" at ~40-50% when it sees context mounting. By 80%, quality has already crashed.

**Solution:** Recommend handoff before hitting limits. Better to pause with a clean handoff than push through with degraded output.

**Practical rule:** If you notice context filling, suggest `/stop` to create HANDOFF.md before quality degrades.

### 2. Deviation Rules

During execution, handle discoveries automatically:

| Rule | Trigger | Action |
|------|---------|--------|
| **1. Auto-fix bugs** | Broken behavior found | Fix immediately, document in STATE.md |
| **2. Auto-add critical** | Security/correctness gap | Add immediately, document |
| **3. Auto-fix blockers** | Can't proceed | Fix immediately, document |
| **4. Ask about architectural** | Major structural change | Stop and ask user |
| **5. Log enhancements** | Nice-to-have idea | Append to BACKLOG.md, continue |

**No user intervention needed for Rules 1-3, 5.** Only Rule 4 (architectural) requires user decision.

**Result:** Flow never breaks. Bugs get fixed. Scope stays controlled. Complete transparency.

### 3. Handoff Protocol

Before context fills or when pausing, create comprehensive handoff with:

- **Current state**: What's working, what's not
- **Decisions made**: And why
- **Progress**: What's done, what's left
- **Next steps**: Clear actions for resuming
- **Open questions**: Uncertainties that need resolution

Store in `planning/HANDOFF.md`. This enables clean session transitions.

### 4. Stage Awareness

Read STATE.md to understand current stage. Adapt behavior accordingly:

| Stage | Behavior |
|-------|----------|
| **starting** | Focus on setup, project structure, context gathering |
| **designing** | Focus on specification, ask clarifying questions |
| **building** | Focus on execution, follow the plan, apply deviation rules |
| **stopping** | Focus on handoff, ensure all context is captured |

---

## Stage Awareness

The workflow tracks state in `planning/STATE.md`. Always read this file to understand where the project is.

### STATE.md Structure

```markdown
# Project State

**Stage**: [starting|designing|building|stopping]
**Last Updated**: [timestamp]

## Current Focus
[What we're working on now]

## Progress
- [x] Completed items
- [ ] Pending items

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
       → Transitions to designing after OVERVIEW.md complete

/design → stage: designing
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
| `brainstorm.md` | (via /design) | Explore unclear ideas |
| `design.md` | `/design` | Plan work with spec-driven approach |
| `build.md` | `/build` | Execute plan with deviation rules |
| `stop.md` | `/stop` | Pause with comprehensive handoff |

---

## Quick Reference

### Commands

| Command | When to Use | Output |
|---------|-------------|--------|
| `/start` | Beginning a new project | `planning/OVERVIEW.md`, `STATE.md` |
| `/design` | Ready to plan work | `planning/ROADMAP.md`, specs |
| `/build` | Plan approved, ready to execute | Code changes, STATE.md updates |
| `/stop` | Pausing work or context filling | `planning/HANDOFF.md` |

### Project Structure

```
planning/
├── OVERVIEW.md      # Project vision (created by /start)
├── STATE.md         # Living state (updated continuously)
├── BACKLOG.md       # Persistent improvements backlog
├── ROADMAP.md       # Phases/tasks (created by /design)
├── HANDOFF.md       # Session handoff (created by /stop)
└── codebase/        # Brownfield analysis (if applicable)
```

### Deviation Quick Check

When you encounter something unexpected during `/build`:

1. **Bug?** → Fix it, note in STATE.md
2. **Security gap?** → Fix it, note in STATE.md
3. **Blocker?** → Fix it, note in STATE.md
4. **Architecture change?** → STOP. Ask user.
5. **Enhancement idea?** → Add to BACKLOG.md, continue

### Context Health

Monitor context usage. When approaching 50%:

1. Complete current atomic task
2. Commit work
3. Suggest `/stop` to user
4. Create clean HANDOFF.md
5. Resume fresh next session
