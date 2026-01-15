# Overview: My Workflow System

**Feature**: 001-my-workflow
**Date**: 2026-01-10

## What

A personalized workflow system with 4 commands (`/start`, `/design`, `/build`, `/stop`) that provide clear entry points for project stages, backed by a skill (`my-workflow`) that holds principles and workflow logic.

## Why

- Consolidate scattered patterns (taches, CEK, GSD, living-requirements) into one cohesive system
- Provide clear stage transitions with explicit commands
- Maintain principles (scope control, deviation rules) across all stages
- Enable context handoffs before hitting limits

## Success Criteria

- Can start a project with `/start` including proper context setup
- Can plan work with spec-driven approach via `/design`
- Can execute with deviation rules via `/build`
- Can pause with handoff context via `/stop`
- Skill principles active whenever `.planning/` exists
- Unused skills/commands moved to reference folder

## Design Principle

Use BOTH skills (principles Claude internalizes) AND commands (explicit entry points). Skills provide the "how to think" - commands provide the "when to act".

## Content Strategy: Curate and Copy

Rather than writing new skill content from scratch, the workflow content is built by:

1. **Review** - For each command (start, design, build, stop), review how existing patterns handle it (taches, CEK, living-requirements, GSD)
2. **Select** - User chooses which implementation resonates
3. **Copy** - Selected content is copied into `skills/my-workflow/`, including any dependencies
4. **Adapt** - Verbatim or adapted case-by-case based on fit
5. **Archive** - Source skills move to `~/.claude/reference/` for future reference

**Result:** The `my-workflow` skill may have more than 4 workflows if chosen implementations have dependencies. That's fine - you get a complete, working system.

## Architecture

```text
skills/
└── my-workflow/
    ├── SKILL.md              # Core principles (always loaded)
    │   - Scope control (stay within 50% context)
    │   - Deviation rules (auto-fix vs ask)
    │   - Handoff protocol
    │   - Stage awareness
    │
    └── workflows/
        ├── start.md          # Start workflow steps
        ├── brainstorm.md     # Idea exploration (optional, invoked by /design)
        ├── design.md         # Design workflow steps
        ├── build.md          # Build workflow steps
        └── stop.md           # Stop workflow steps

commands/
├── start.md                  # Thin wrapper: loads skill, runs workflows/start.md
├── design.md                 # Thin wrapper: loads skill, runs workflows/design.md
├── build.md                  # Thin wrapper: loads skill, runs workflows/build.md
└── stop.md                   # Thin wrapper: loads skill, runs workflows/stop.md

hooks/
└── state-update.md           # PostToolUse hook for STATE.md updates

~/.claude/reference/
├── skills/                   # Curated reference skills
└── commands/                 # Curated reference commands

.planning/                    # Per-project (created by /start)
├── OVERVIEW.md               # Project vision
├── STATE.md                  # Living state (updated by hook)
├── ROADMAP.md                # Phases (created during /design)
├── HANDOFF.md                # Detailed handoff (created by /stop)
└── codebase/                 # Brownfield analysis (7 docs from /map-codebase)
```

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Hybrid architecture | Skill + Commands | Skill holds principles (always active), commands are entry points |
| Curate and copy | Select from existing | Proven content as baseline, no cross-references, can evolve |
| Thin command wrappers | ~15 lines each | Avoids duplication, skill owns all logic |
| Skill auto-activation | Triggers on `.planning/` | Principles available when relevant |
| Manual curation | No /curate command | Simple file moves at build start |

## Skill Specification

### skills/my-workflow/SKILL.md

```yaml
---
name: my-workflow
version: 1.0.0
description: Personal workflow system - principles and stage awareness
triggers:
  - .planning/ directory exists
  - STATE.md mentions workflow stages
  - User mentions start/design/build/stop workflow
---
```

**Core Principles** (always active when skill loads):

1. **Scope Control**: Quality degrades at ~40-50% context. Recommend handoff before hitting limits.

2. **Deviation Rules**:
   - Auto-fix: Bugs, blockers, minor issues
   - Ask user: Architectural changes, scope expansion
   - Log for later: Enhancement ideas, "nice to haves"

3. **Stage Awareness**: Read STATE.md to understand current stage. Behavior adapts:
   - "designing" → Focus on specification, ask clarifying questions
   - "building" → Focus on execution, follow the plan
   - "reviewing" → Focus on quality, suggest improvements

4. **Handoff Protocol**: Before context fills, create comprehensive handoff with:
   - Current state
   - Decisions made and why
   - Next steps
   - Open questions

## Command Specifications

Commands are thin wrappers (~10-15 lines each) that:
1. Load the my-workflow skill
2. Invoke the appropriate workflow
3. Pass any arguments

### /start

```markdown
---
description: Start a new project with proper context setup
---

Begin a new project using the my-workflow system.

<workflow>
Load the my-workflow skill and execute workflows/start.md.

If this is a brownfield project (existing code detected), offer to run /map-codebase first.

Create .planning/ directory with OVERVIEW.md and STATE.md.
Install the state-update hook for ongoing state tracking.
</workflow>
```

### /design

```markdown
---
description: Plan work using spec-driven approach
---

Plan and design the current work.

<workflow>
Load the my-workflow skill and execute workflows/design.md.

If requirements are unclear or this is a new idea, offer to run workflows/brainstorm.md first.

Apply specification-driven approach to clarify what, why, and acceptance criteria.
Create or update ROADMAP.md.
</workflow>
```

### /build

```markdown
---
description: Execute plan with deviation rules
---

Execute the current plan.

<workflow>
Load the my-workflow skill and execute workflows/build.md.

Find next unexecuted task in ROADMAP.md.
Execute with deviation rules (auto-fix bugs, ask about architectural changes).
Commit atomically per task.
</workflow>
```

### /stop

```markdown
---
description: Pause work with comprehensive handoff
---

Pause work and create handoff for future sessions.

<workflow>
Load the my-workflow skill and execute workflows/stop.md.

Create HANDOFF.md with current state, decisions, progress, and next steps.
Ensure all changes committed.
</workflow>
```

## Workflow Notes

**Brainstorm workflow**: Fills the gap between "I have an idea" and "I have clear requirements". Explores through dialogue (one question at a time), proposes 2-3 approaches with trade-offs, outputs to `docs/plans/<date>-<topic>-design.md`. The `/design` command offers brainstorming first if requirements aren't clear.

**Plan structure determination**: Brainstorming identifies the appropriate plan structure based on idea scope:
- **Simple**: A few tasks (no phases needed, just a task list)
- **Feature**: Single feature with clear scope (standard feature spec)
- **Multi-feature**: Multiple features requiring a phased roadmap

## Trade-offs

| Aspect | Strength | Weakness |
|--------|----------|----------|
| Hybrid approach | Clear separation of concerns | More files than minimal approach |
| Skill auto-activation | Principles always available | May load when not needed |
| Thin wrappers | No duplication | Requires understanding skill/command distinction |
| Curate and copy | Proven baseline | Initial review effort |
