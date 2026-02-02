# My Workflow Skill

Personal workflow system for solo development with Claude Code.

## Quick Start

```bash
/start              # Initialize project with planning/ structure + OVERVIEW.md
/plan               # Plan a feature (includes clarification option for unclear ideas)
/build              # Execute plan with subagent delegation
/stop               # Create handoff and pause cleanly
```

## Core Principles

1. **Scope Control**: Quality degrades at ~40-50% context, not 80%. Keep plans atomic (2-3 tasks max).
2. **Deviation Rules**: Auto-fix bugs/blockers, ask on architecture, log enhancements.
3. **Handoff Protocol**: Create HANDOFF.md when stopping, delete on resume.
4. **Stage Awareness**: starting → planning → building → stopping

## Directory Structure

After `/start`:

```text
planning/
├── OVERVIEW.md         # Project definition (vision, scope)
├── CLAUDE.md           # Planning context (references OVERVIEW)
├── STATE.md            # Living state tracker (auto-updated by hook)
├── BACKLOG.md          # Persistent backlog (Quick Wins, Features, Tech Debt)
├── HANDOFF.md          # Session handoff (created by /stop)
└── specs/
    └── {feature}/
        ├── SPEC.md     # Requirements
        ├── RESEARCH.md # Decisions
        ├── PLAN.md     # Executable plan
        └── SUMMARY.md  # Outcomes (after /build)
```

## Command Details

### /start

Initializes project structure, creates OVERVIEW.md (project definition), and installs auto-update hook.

**Creates**: `planning/OVERVIEW.md`, `planning/CLAUDE.md`, `planning/STATE.md`, `planning/BACKLOG.md`, `.claude/hooks.json`

**New project**: Invokes brainstorm patterns to help craft the project definition.

**Resume behavior**: If HANDOFF.md exists, reads it first and offers to continue.

### /plan

Plans work with spec-driven approach.

**Includes inline clarification** option for unclear requirements (Purpose → Scope → Constraints → Success → Approaches).

**Creates**: `planning/specs/{feature}/SPEC.md`, `RESEARCH.md`, `PLAN.md`

**Spec format**: User stories, requirements with `[NEEDS CLARIFICATION]` markers, validation before planning.

**Plan format**: Plans are prompts with rich task types:

| Type | Description |
|------|-------------|
| `auto` | Claude executes autonomously |
| `checkpoint:human-verify` | Human reviews before continuing |
| `checkpoint:decision` | Human chooses from options |
| `checkpoint:human-action` | Human performs action |

### /build

Executes plan with subagent delegation.

**Pattern**: Each task runs in fresh subagent context (full 200k capacity).

**Deviation rules**:
| Rule | Trigger | Action |
|------|---------|--------|
| Auto-fix bugs | Broken behavior | Fix immediately |
| Auto-add critical | Security gap | Add immediately |
| Auto-fix blockers | Can't proceed | Fix immediately |
| Ask architectural | Major change | STOP and ask |
| Log enhancements | Nice-to-have | Add to BACKLOG.md, continue |

**Context monitoring**: Offers `/stop` at 15% remaining, auto-triggers at 10%.

### /stop

Creates handoff and pauses cleanly.

**Creates**: `planning/HANDOFF.md` with full context for next session.

**Updates**: `STATE.md` to stopping stage.

**Resume**: HANDOFF.md is deleted when user continues via `/start`.

## Creating New Commands

To add a new workflow command:

### 1. Create the Workflow

Create `skills/my-workflow/workflows/{command}.md`:

```markdown
# Workflow: /{command}

## Purpose

{What this command does}

## When to Use

- {Trigger condition 1}
- {Trigger condition 2}

## Steps

### 1. Check Prerequisites

{What must exist before this runs}

### 2. Main Action

{Core workflow logic}

### 3. Update STATE.md

{How to update project state}

### 4. Transition

{What comes next, success message}

## Output Structure

{Files created/modified}

## Integration Flow

{Diagram showing workflow}
```

### 2. Create the Command Wrapper

Create `~/.claude/commands/{command}.md`:

```markdown
---
description: {One-line description}
---

{Brief explanation}

## What This Does

1. {Step 1}
2. {Step 2}

## Usage

\`\`\`
/{command}
/{command} [args]
\`\`\`

## Invocation

Load the my-workflow skill and execute the workflow:

\`\`\`
@skills/my-workflow/SKILL.md
@skills/my-workflow/workflows/{command}.md

Execute the /{command} workflow as documented.
\`\`\`
```

### 3. Test the Command

1. Run the command in a test project
2. Verify it integrates with existing workflows
3. Check STATE.md updates correctly

## Incorporating Reference Patterns

The workflow is built from patterns in these skills:

- **living-requirements**: Cascading CLAUDE.md context
- **taches-create-plans**: Plans-as-prompts, spec-driven approach
- **brainstorming**: One-question-at-a-time dialogue (now integrated into /plan)
- **GSD subagents**: Task tool delegation for fresh context

To incorporate additional patterns:

1. Read the source skill in `~/.claude/skills/`
2. Extract the specific pattern you need
3. Adapt to fit the `planning/` structure
4. Update relevant workflow file

## Troubleshooting

### Commands not found

Verify symlinks:
```bash
ls -la ~/.claude/commands/start.md
ls -la ~/.claude/skills/my-workflow/
```

### Hook not updating STATE.md

Check `.claude/hooks.json` exists in project root.

Verify hook config:
```bash
cat .claude/hooks.json
```

### Context filling too fast

- Break plans into smaller chunks (2-3 tasks max)
- Use `/stop` proactively at 25% remaining
- Each task in `/build` uses fresh subagent context

### HANDOFF.md not being read

Ensure running `/start` (not just opening project).

`/start` specifically checks for HANDOFF.md and offers resume.
