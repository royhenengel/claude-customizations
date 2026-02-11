# My Workflow System Research

## Approach

**Hybrid Architecture**: A skill (`my-workflow`) containing core principles and workflow definitions, plus thin command wrappers that invoke the skill's workflows.

- Skills provide the "how to think" - principles Claude internalizes (scope control, deviation rules, handoff protocol)
- Commands provide the "when to act" - explicit entry points users invoke
- Skill auto-activates when `.planning/` directory exists

**Content Strategy**: Curate and Copy - review existing implementations, select preferred approach, copy content including dependencies, adapt as needed. Source skills moved to `~/.claude/reference/`.

## Alternatives Considered

### Architecture Approach

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Commands-only | Simple, pragmatic | No persistent principles | Rejected |
| Skill-only | Always active | No clear entry points | Rejected |
| Hybrid (skill + commands) | Clear separation of concerns | More files | **SELECTED** |

### Curation Approach

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Delete unused skills | Clean, simple | Lose learning material | Rejected |
| Move to reference/ folder | Keep for learning, declutter | More structure | **SELECTED** |
| Tag/filter system | No file movement | Doesn't reduce cognitive load | Rejected |

### Command Naming

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| `/my-workflow *` prefix | Clear namespace | Longer to type | Rejected |
| `/my *` prefix | Short, personal | May conflict | Rejected |
| Direct verbs | Short, no conflicts | Less namespaced | **SELECTED** |

## Pattern Analysis

### GSD (Get-Shit-Done)

**Key Concepts**:
- Context engineering with PROJECT.md, ROADMAP.md, STATE.md files
- Subagent execution with fresh 200k-token contexts per task
- XML-structured task format with verify/done sections
- Atomic git commits per task

**Adopted**: Fresh context approach, atomic commits

### CEK (Context Engineering Kit)

**Key Concepts**:
- Numbered stages: 00-setup, 01-specify, 02-plan, 03-tasks, 04-implement, 05-document
- Specification-driven development
- Multiple specialized agents
- Quality gates and checklists

**Adopted**: Simplified stages (start → plan → build), spec-driven approach

### Taches

**Key Concepts**:
- "Plans are prompts" - PLAN.md IS the execution prompt
- Scope control (quality degrades at ~40-50% context)
- Deviation rules: auto-fix bugs/blockers, ask about architectural changes
- Router pattern for complex skills

**Adopted**: Plans as prompts, deviation rules, scope control

### Living Requirements / Cascading Context

**Key Concepts**:
- CLAUDE.md hierarchy cascades context automatically
- Requirements evolve with implementation
- PostToolUse hook prompts for doc updates
- Single source of truth in repo

**Adopted**: Cascading CLAUDE.md pattern, PostToolUse hook

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Hybrid architecture | Skill + Commands | Skill holds principles (always active), commands are entry points |
| Curate and copy | Select from existing | Proven content as baseline, no cross-references, can evolve |
| Thin command wrappers | ~15 lines each | Avoids duplication, skill owns all logic |
| Skill auto-activation | Triggers on `.planning/` | Principles available when relevant |
| Manual curation | No /curate command | Simple file moves at build start |
| Unified planning/ directory | Visible, not hidden | Contains ALL planning artifacts |
| State management | STATE.md + HANDOFF.md | Living state + detailed handoff |

## Workflow Pattern Decisions

### /start Workflow

| Pattern | Decision | Source |
|---------|----------|--------|
| Unified planning/ directory | YES | Custom |
| CLAUDE.md in planning/ | YES | Living-requirements |
| STATE.md creation | YES | GSD/Taches |
| PostToolUse hook auto-install | YES | Living-requirements |
| Brownfield detection | YES | Auto-detect existing code |

### /plan Workflow (was /design)

| Pattern | Decision | Source |
|---------|----------|--------|
| Ask about brainstorming first | YES | Custom |
| Spec-driven approach | YES | CEK |
| Plans-as-prompts | YES | Taches |
| 2-3 tasks max per plan | YES | Taches scope control |

### /build Workflow

| Pattern | Decision | Source |
|---------|----------|--------|
| Subagent per task | YES | GSD |
| Deviation rules | YES | Taches |
| Atomic tasks | YES | GSD/Taches |
| Context awareness | YES | Taches |

### /stop Workflow

| Pattern | Decision | Source |
|---------|----------|--------|
| HANDOFF.md creation | YES | GSD/Taches |
| WIP commit | NO | User prefers manual |
| Auto-handoff triggers | YES | Offer at 15%, auto at 10% |
| Delete on resume | YES | Handoff is temporary |

## Dependencies

- Claude Code CLI
- ~/.claude/ directory structure (symlinked from claude-customizations)
- Filesystem-based storage

## Implementation Notes

### Directory Structure

```text
skills/my-workflow/
├── SKILL.md              # Core principles (always loaded)
└── workflows/
    ├── start.md          # Start workflow steps
    ├── brainstorm.md     # Idea exploration (optional)
    ├── plan.md           # Plan workflow steps  
    ├── build.md          # Build workflow steps
    └── stop.md           # Stop workflow steps

commands/
├── start.md              # Thin wrapper → workflows/start.md
├── plan.md               # Thin wrapper → workflows/plan.md
├── build.md              # Thin wrapper → workflows/build.md
└── stop.md               # Thin wrapper → workflows/stop.md
```

### External References Audit

Scanned source skills for external references. Found references to `superpowers:*` and `elements-of-style:*` which are NOT installed.

**Decision**: Remove these references when copying - they're enhancement references (writing style, git worktrees) that aren't critical to the workflows.
