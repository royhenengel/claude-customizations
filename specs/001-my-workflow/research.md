# Research Findings: My Workflow System

**Feature**: 001-my-workflow
**Date**: 2026-01-09
**Status**: Complete

## Technical Context

**Language/Version**: Markdown-based skills and commands (Claude Code native format)
**Primary Dependencies**: Claude Code CLI, ~/.claude/ directory structure
**Storage**: Filesystem-based (symlinked from claude-customizations to ~/.claude/)
**Testing**: Manual verification via Claude Code invocation
**Target Platform**: macOS (Claude Code CLI)
**Project Type**: Skills/commands configuration project

## Pattern Analysis Summary

### 1. GSD (Get-Shit-Done) Pattern

**Key Concepts**:
- Context engineering with PROJECT.md, ROADMAP.md, STATE.md files
- Subagent execution with fresh 200k-token contexts per task
- XML-structured task format with verify/done sections
- Atomic git commits per task

**Applicable to My Workflow**:
- Fresh context principle prevents quality degradation
- XML task format provides clear structure
- Atomic commits enable bisect debugging

**Decision**: Cherry-pick fresh context approach and atomic commits, skip full file structure complexity.

### 2. CEK (Context Engineering Kit) Pattern

**Key Concepts**:
- Numbered stages: 00-setup, 01-specify, 02-plan, 03-tasks, 04-implement, 05-document
- Specification-driven development
- Multiple specialized agents (business-analyst, researcher, code-explorer, software-architect, tech-lead, developer, tech-writer)
- Quality gates and checklists at each stage

**Applicable to My Workflow**:
- Stage-based workflow provides clear progression
- Spec-driven approach ensures requirements are clear before coding
- Agent delegation pattern for parallel exploration

**Decision**: Use simplified stages (start → plan → do) that combine CEK concepts without full ceremony.

### 3. Taches Pattern

**Key Concepts**:
- "Plans are prompts" - PLAN.md IS the execution prompt, not documentation
- Scope control (quality degrades at ~40-50% context)
- Deviation rules: auto-fix bugs/blockers, ask about architectural changes, log enhancements
- Pure XML structure (no markdown headings in skill body)
- Router pattern for complex skills
- Domain expertise loading from ~/.claude/skills/expertise/

**Applicable to My Workflow**:
- Plans as prompts simplifies execution
- Deviation rules handle real-world discoveries
- Router pattern enables flexible skill organization
- Context awareness prevents quality degradation

**Decision**: Adopt plans as prompts, deviation rules, and XML structure principles.

### 4. Living Requirements / Cascading Context Pattern

**Key Concepts**:
- CLAUDE.md hierarchy cascades context automatically (native Claude Code behavior)
- Requirements evolve with implementation (mark [x], update implementation notes)
- PostToolUse hook prompts for doc updates after code changes
- Single source of truth in repo (not Confluence/Notion)

**Applicable to My Workflow**:
- features/CLAUDE.md pattern already exists in this repo
- PostToolUse hook enables auto-update prompts
- Natural context inheritance without configuration

**Decision**: Use cascading CLAUDE.md pattern for `/start` project setup.

## Existing Codebase Assets

### Skills Directory (109 items)
- **CEK skills**: cek-kaizen, cek-prompt-engineering, cek-software-architecture, cek-subagent-driven-development, cek-test-driven-development
- **Taches skills**: taches-create-hooks, taches-create-subagents, taches-create-agent-skills, taches-create-slash-commands, taches-create-plans, taches-create-meta-prompts, taches-expertise, taches-debug-like-expert
- **Living requirements**: living-requirements skill with templates and workflows

### Commands Directory (71 items)
- **CEK commands**: cek-00-setup through cek-05-document, plus many utilities
- **Other**: Various utility commands (commit, review-pr, create-skill, etc.)

### Current Structure
```
~/.claude/ (symlinks to claude-customizations/)
├── skills/         → 109 items (need curation)
├── commands/       → 71 items (need curation)
├── agents/         → 142 items
├── CLAUDE.md       → Empty (opportunity for project-wide context)
└── features/       → Living requirements structure exists
```

## Key Files Referenced

| File | Purpose | Relevance |
|------|---------|-----------|
| [living-requirements/SKILL.md](../../skills/living-requirements/SKILL.md) | Cascading context implementation | Core pattern for `/start` |
| [taches-create-plans/SKILL.md](../../skills/taches-create-plans/SKILL.md) | Plans as prompts, scope control | Core pattern for `/design` |
| [taches-create-agent-skills/SKILL.md](../../skills/taches-create-agent-skills/SKILL.md) | Skill structure best practices | Template for custom commands |
| [cek-01-specify.md](../../commands/cek-01-specify.md) | Spec-driven development | Pattern for requirements clarity |
| [features/CLAUDE.md](../../features/CLAUDE.md) | Product requirements example | Template for cascading context |
| [specs/constitution.md](../constitution.md) | Project governance | Non-negotiable rules |

## Constitution Check

### Gate Evaluation

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Skill-First Design | PASS | Direct commands (`/start`, `/design`, `/build`, `/stop`), self-contained |
| II. Context Awareness | PASS | Uses native CLAUDE.md hierarchy |
| III. Documentation-Driven | PASS | Skills will have complete SKILL.md |
| IV. Version Control Discipline | PASS | Using feature branch workflow |
| V. Simplicity Over Complexity | PASS | 3 core commands (start, plan, do), not 50 |

### Quality Standards Check

| Standard | Status | Notes |
|----------|--------|-------|
| Valid SKILL.md frontmatter | PASS | Will follow taches pattern |
| Clear invocation patterns | PASS | Direct verbs: /start, /design, /build, /stop |
| No hardcoded paths | PASS | Uses ~/.claude/ convention |
| Tested with real scenario | PENDING | Will test during implementation |

## Alternatives Considered

### Curation Approach

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| A. Delete unused skills | Clean, simple | Lose learning material | REJECTED |
| B. Move to reference/ folder | Keep for learning, declutter active | More structure | SELECTED |
| C. Tag/filter system | No file movement | Doesn't reduce cognitive load | REJECTED |

### Command Structure

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| A. `/my-workflow *` prefix | Clear namespace | Longer to type | REJECTED |
| B. `/my *` prefix | Short, personal | May conflict | REJECTED |
| C. `/workflow *` prefix | Descriptive | Generic, impersonal | REJECTED |
| D. Direct verbs | Short, no conflicts | Less namespaced | SELECTED (`/start`, `/design`, `/build`, `/stop`) |

## Resolved Questions

1. **Curation scope**: Skills + Commands (Option C → revised to B based on user feedback)
   - **Decision**: Handle skills AND commands, not agents
   - **Rationale**: Comprehensive cleanup of the two most cluttered directories

2. **Reference folder location**: `~/.claude/reference/skills/` (Option A)
   - **Decision**: Parallel structure at `~/.claude/reference/`
   - **Rationale**: Clear separation, mirrors existing structure

3. **Pattern analysis depth**: High-level summary (Option A)
   - **Decision**: ~1 page per pattern with key concepts
   - **Rationale**: Quick reference over comprehensive documentation

4. **Context handoff mechanism**: Both STATE.md + HANDOFF.md
   - **Decision**: Living STATE.md (updated frequently via hook) + detailed HANDOFF.md (on `/stop`)
   - **Rationale**: STATE.md stays current for reference; HANDOFF.md captures detailed context for transitions
   - **Location**: `.planning/STATE.md` and `.planning/HANDOFF.md`
   - **Mechanism**: PostToolUse hook prompts for STATE.md updates after significant changes

5. **Hook installation**: Always install (Option A)
   - **Decision**: `/start` command automatically installs PostToolUse hook
   - **Rationale**: Consistent experience, docs stay updated

## Resolved: Command Names

User rejected `/my` prefix. Selected direct commands with renamed verbs to avoid conflicts:

| Command | Purpose | Replaces |
|---------|---------|----------|
| `/start` | Start new project (cascading context, hooks, /map-codebase for brownfield) | `/my start` |
| `/design` | Plan work (spec-driven approach) | `/my plan` |
| `/build` | Execute plan (subagent, deviation rules) | `/my do` |
| `/stop` | Pause with handoff | `/my pause` |

**Curation**: Manual task at build start (move files to `~/.claude/reference/`), not a command.

## Resolved: Architecture Approach

After considering commands-only (pragmatic) vs skill-based approaches, selected **Hybrid Architecture**:

| Component | Purpose | When Active |
|-----------|---------|-------------|
| **Skill** (`my-workflow`) | Principles, workflows, deviation rules | Always loaded when .planning/ exists |
| **Commands** | Entry points, stage transitions | On explicit `/command` invocation |

**Rationale**:
- Skills provide the "how to think" - principles Claude internalizes (scope control, deviation rules, handoff protocol)
- Commands provide the "when to act" - explicit entry points users invoke
- This mirrors how the best patterns work (CEK uses commands for stages, Taches uses skills with workflows)
- Skill auto-activates when `.planning/` directory exists, ensuring principles are always available

**Structure**:
```text
skills/my-workflow/
├── SKILL.md              # Core principles (always loaded)
└── workflows/
    ├── start.md          # Start workflow steps
    ├── brainstorm.md     # Idea exploration (optional, invoked by /design)
    ├── design.md         # Design workflow steps
    ├── build.md          # Build workflow steps
    ├── stop.md           # Stop workflow steps
    └── *.md              # Additional workflows (dependencies from chosen implementations)

commands/
├── start.md              # Thin wrapper → skill workflows/start.md
├── design.md             # Thin wrapper → skill workflows/design.md
├── build.md              # Thin wrapper → skill workflows/build.md
└── stop.md               # Thin wrapper → skill workflows/stop.md
```

## Resolved: Content Strategy

Selected **Curate and Copy** approach for skill content:

1. Review existing implementations (taches, CEK, living-requirements, GSD) for each workflow
2. User selects preferred approach
3. Copy content including dependencies into `skills/my-workflow/`
4. Adapt as needed (remove broken references, fit structure)
5. Source skills move to `~/.claude/reference/`

**Rationale**: Proven content as baseline, user understands what they're getting, self-contained skill (no cross-references), evolution path for future modifications.

## Resolved: Pattern Analysis Approach

Decided against a `/patterns` command that regenerates analysis. Instead:
- Pattern analysis done once during planning phase
- Documented comprehensively in this research.md file
- Reference skills remain accessible in `~/.claude/reference/skills/` for deeper study

**Rationale**: Pattern understanding is a one-time learning activity, not a recurring need. A static comprehensive analysis is more useful than a regenerating command.

## Resolved: Brainstorming Step

Added a `workflows/brainstorm.md` workflow based on the existing `brainstorming` skill. This step was present in a previous workflow attempt ([archive/MY-WORKFLOW.md](../../archive/MY-WORKFLOW.md)) and fills the gap between "I have an idea" and "I have clear requirements".

**Key characteristics**:

- Explores ideas through dialogue (one question at a time)
- Proposes 2-3 approaches with trade-offs
- Determines appropriate plan structure based on idea scope:
  - Simple: A few tasks (no phases needed)
  - Feature: Single feature with clear scope
  - Multi-feature: Multiple features requiring phased roadmap
- Outputs to `docs/plans/<date>-<topic>-design.md`
- Optional - invoked by `/design` when requirements are unclear

**Integration**: The `/design` command offers to run brainstorming first if this is a new idea or requirements aren't clear. This avoids forcing exploration when requirements are already known.

**Source**: Existing `brainstorming` skill will be copied. All external skill references in copied workflows will be audited and missing skills installed.

## T014: Workflow Pattern Decisions

These are the finalized decisions for which patterns each workflow command uses.

### Directory Structure Decision

**Unified `planning/` directory** (visible, not hidden) contains ALL planning artifacts:

```
planning/
├── CLAUDE.md           # Planning context (cascades to all planning work)
├── STATE.md            # Living state tracker (auto-updated by hook)
├── HANDOFF.md          # Session handoff (created by /stop)
└── specs/
    └── {feature}/      # Feature-specific specs, research, plans
```

This replaces the previous split between `.planning/` (ephemeral) and `specs/` (separate).

### /start Workflow Decisions

| Pattern | Decision | Source |
|---------|----------|--------|
| Unified planning/ directory | YES | Custom (replaces .planning/ + specs/) |
| CLAUDE.md in planning/ | YES | Living-requirements (cascading context) |
| STATE.md creation | YES | GSD/Taches (state tracking) |
| PostToolUse hook auto-install | YES | Living-requirements |
| Constitution.md | NO | Too much ceremony for solo dev |

**What /start creates:**

```
planning/
├── CLAUDE.md           # Project planning context
├── STATE.md            # Initial state: stage=starting
└── specs/              # Empty, ready for /design
```

Plus auto-installs PostToolUse hook for STATE.md updates.

### /design Workflow Decisions

| Pattern | Decision | Source |
|---------|----------|--------|
| Ask about brainstorming first | YES | Custom (bridges unclear → clear) |
| Spec-driven approach | YES | CEK (specify before implement) |
| plans-as-prompts | YES | Taches (PLAN.md = execution prompt) |
| Multi-agent exploration | TBD | Depends on complexity |

**What /design creates:**

```
planning/specs/{feature}/
├── spec.md             # Requirements
├── research.md         # Decisions, alternatives
└── PLAN.md             # Executable plan (2-3 tasks)
```

### /build Workflow Decisions

| Pattern | Decision | Source |
|---------|----------|--------|
| Subagent per task | YES | GSD (fresh 200k context) |
| Deviation rules (5) | YES | Taches |
| Atomic tasks | YES | GSD/Taches (2-3 tasks per plan max) |
| Context awareness | YES | Taches (suggest /stop at 50%) |
| SUMMARY.md | YES | Custom (document outcomes) |

**What /build does:**

1. Load PLAN.md as execution prompt
2. Execute each task via subagent (fresh context)
3. Apply deviation rules automatically
4. Update STATE.md after each task
5. Create SUMMARY.md when complete

### /stop Workflow Decisions

| Pattern | Decision | Source |
|---------|----------|--------|
| HANDOFF.md creation | YES | GSD/Taches |
| WIP commit | NO | User prefers manual commits |
| Auto-handoff triggers | YES | Offer at 15%, auto at 10% |
| Delete on resume | YES | Handoff is temporary |

**What /stop creates:**

```
planning/HANDOFF.md     # Full context for next session
```

STATE.md updated to stage=stopping.

---

## Assumptions

- **ASM-001**: The claude-customizations repository remains symlinked to ~/.claude/
- **ASM-002**: Skills in reference/ folder should NOT auto-load in Claude Code
- **ASM-003**: The workflow commands will be simple wrappers that orchestrate existing patterns
- **ASM-004**: User prefers fewer choices with sensible defaults over maximum flexibility
