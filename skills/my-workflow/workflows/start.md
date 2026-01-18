# Workflow: /start

## Purpose

Initialize a new project with the unified `planning/` structure, including a project definition (OVERVIEW.md).

## When to Use

- Starting a new project from scratch
- Resuming after a `/stop` handoff (will read HANDOFF.md first)

## Steps

### 1. Check Current State

```bash
ls -la planning/ 2>/dev/null || echo "No planning/ directory"
ls planning/HANDOFF.md 2>/dev/null && echo "HANDOFF exists - resuming"
ls planning/STATE.md 2>/dev/null && echo "STATE exists - project in progress"
```

**If HANDOFF.md exists**: Read it first, summarize context, then offer options:

```text
Found HANDOFF.md from previous session.

Last session ended with: {summary from handoff}

What would you like to do?
1. Resume where you left off
2. Start fresh (will archive planning/ to planning.bak/)
```

**If STATE.md exists but no HANDOFF**: Project is in progress. Ask user what they want to do.

**If new project (no planning/)**: Offer brainstorm or direct setup:

```text
Starting a new project. How would you like to proceed?

1. Brainstorm first - explore the idea before defining (recommended if unclear)
2. Define directly - I know what I'm building
```

If option 1: Run `/brainstorm` workflow to explore the idea, then return here to create OVERVIEW.md from the clarified vision.

If option 2: Continue to step 2.

### 2. Create Directory Structure

```bash
mkdir -p planning/specs
```

### 3. Create OVERVIEW.md (Project Definition)

A project cannot exist without a definition of what it is. OVERVIEW.md captures the project vision.

**For new projects**, invoke the brainstorm skill/agent to help craft the project definition:

```text
Let's define your project. I'll ask a few questions to understand what you're building.
```

Use the brainstorm workflow patterns (one question at a time, multiple choice when possible) to gather:

- **Project name**: What is this called?
- **Problem statement**: What problem does this solve?
- **Target users**: Who is this for?
- **Core value**: What's the main benefit?
- **Scope boundaries**: What's explicitly NOT included?

After gathering input, create:

```markdown
# {Project Name}

## Vision

{One paragraph describing what this project is and why it exists}

## Problem Statement

{What problem does this solve? Who has this problem?}

## Target Users

{Who is this for?}

## Core Value Proposition

{What's the main benefit? Why would someone use this?}

## Scope

### In Scope

- {Feature/capability 1}
- {Feature/capability 2}

### Out of Scope

- {Explicitly excluded 1}
- {Explicitly excluded 2}

## Success Criteria

- {How do we know this project succeeded?}

## Principles

- {Guiding principle 1}
- {Guiding principle 2}
```

Write to `planning/OVERVIEW.md`.

### 4. Create planning/CLAUDE.md

This provides cascading context for all planning work. References OVERVIEW.md.

```markdown
# {Project Name} - Planning Context

## Project Definition

@planning/OVERVIEW.md

## Current Focus

See STATE.md for current stage and focus.

## Structure

- `OVERVIEW.md` - Project vision and scope
- `STATE.md` - Living state tracker (auto-updated)
- `BACKLOG.md` - Persistent backlog of improvements
- `HANDOFF.md` - Session handoff (created by /stop)
- `specs/` - Feature specifications and plans
```

Write to `planning/CLAUDE.md`.

### 5. Create planning/STATE.md

```markdown
# Project State

**Stage**: starting
**Last Updated**: {timestamp}

## Current Focus

Project initialized, ready for planning

## Progress

- [x] planning/ structure created
- [x] OVERVIEW.md defined
- [x] CLAUDE.md initialized
- [ ] Ready for /plan

## Decisions

(None yet)

## Notes

(None yet)
```

Write to `planning/STATE.md`.

### 5.5 Create planning/BACKLOG.md

A persistent backlog for capturing improvements discovered during work.

```markdown
# Backlog

## Quick Wins

## Features

## Technical Debt
```

Write to `planning/BACKLOG.md`.

### 6. Install Auto-Update Hook

Create or update `.claude/hooks.json` to auto-update STATE.md after code changes.

**Check existing hooks:**
```bash
cat .claude/hooks.json 2>/dev/null || echo "No hooks configured"
```

**Hook configuration:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "A code file was modified. Check if planning/STATE.md needs updating.\n\nChange: $ARGUMENTS\n\nRules:\n1. SKIP if file is in planning/ (avoid loops)\n2. Update Progress if a task was completed\n3. Add to Notes if something unexpected was discovered\n4. Update Current Focus if work shifted\n\nRespond with:\n- updates_needed: true/false\n- changes: [list of STATE.md updates]\n- systemMessage: one-line summary",
            "timeout": 15000
          }
        ]
      }
    ]
  }
}
```

Write to `.claude/hooks.json` (merge if exists).

### 7. Brownfield Detection and Codebase Analysis

**Detect brownfield automatically** by checking for existing code:

```bash
# Check for existing source code (not just config files)
find . -maxdepth 3 -type f \( -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.go" -o -name "*.rs" -o -name "*.java" -o -name "*.swift" -o -name "*.rb" -o -name "*.php" -o -name "*.cs" \) 2>/dev/null | head -5
```

**If source files exist → This is brownfield. Run codebase analysis automatically:**

```
Detected existing codebase. Mapping structure...
```

Run `/map-codebase` workflow to analyze:
- Key directories and their purposes
- Entry points and architecture patterns
- Dependencies and package managers
- Testing patterns and coverage
- Build/deploy configuration

Store findings in `planning/CODEBASE.md`.

**If no source files → This is greenfield.** Skip codebase analysis and proceed to step 8.

The codebase map becomes part of the project context, referenced in CLAUDE.md.

### 8. Transition to Planning

After setup is complete:

**For greenfield projects:**
```
Project initialized!

Created:
- planning/OVERVIEW.md (project definition)
- planning/CLAUDE.md (planning context)
- planning/STATE.md (stage: starting)
- planning/BACKLOG.md (improvements backlog)
- planning/specs/ (ready for feature specs)
- .claude/hooks.json (auto-update hook)

Next steps:
1. Run /plan to plan your first feature
2. Run /brainstorm if you need to clarify an idea first

Current stage: starting → Will transition to planning after /plan
```

**For brownfield projects:**
```
Project initialized with codebase analysis!

Created:
- planning/OVERVIEW.md (project definition)
- planning/CLAUDE.md (planning context)
- planning/STATE.md (stage: starting)
- planning/BACKLOG.md (improvements backlog)
- planning/CODEBASE.md (codebase map)
- planning/specs/ (ready for feature specs)
- .claude/hooks.json (auto-update hook)

Codebase summary:
{Brief summary from CODEBASE.md - key directories, tech stack, patterns}

Next steps:
1. Run /plan to plan your first feature
2. Run /brainstorm if you need to clarify an idea first

Current stage: starting → Will transition to planning after /plan
```

Update STATE.md stage to `planning` when user runs `/plan`.

## Output Structure

```text
planning/
├── OVERVIEW.md         # Project definition (vision, scope)
├── CLAUDE.md           # Planning context (references OVERVIEW)
├── STATE.md            # Stage: starting
├── BACKLOG.md          # Persistent backlog of improvements
├── CODEBASE.md         # Codebase map (brownfield only)
└── specs/              # Empty, ready for /plan

.claude/
└── hooks.json          # Auto-update hook installed
```

## Resume Behavior

When HANDOFF.md exists:

1. Read HANDOFF.md completely
2. Summarize: "Last session ended with: {summary}"
3. Show: Current state, decisions made, next steps from handoff
4. Ask: "Ready to continue from here, or do you want to start fresh?"

If continuing:
- Delete HANDOFF.md (it's temporary)
- Update STATE.md with resumed focus
- Pick up where left off

## Error Handling

**planning/ already exists with STATE.md:**
```
A project is already in progress (stage: {stage}).

Options:
1. Continue where you left off
2. Start fresh (will archive existing planning/ to planning.bak/)
```

**Hook installation fails:**
- Warn user but continue
- Suggest manual hook installation later
