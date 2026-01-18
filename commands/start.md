---
description: Initialize project with planning structure and state tracking
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion, EnterPlanMode, ExitPlanMode, TodoWrite
---

# /start - Initialize Project

**Say this first:** "Welcome, checking the current state."

Then execute these steps in order:

## Step 1: Check Current State

Run:
```bash
ls -la planning/ 2>/dev/null || echo "No planning/ directory"
ls planning/HANDOFF.md 2>/dev/null && echo "HANDOFF exists - resuming"
ls planning/STATE.md 2>/dev/null && echo "STATE exists - project in progress"
```

**If HANDOFF.md exists:** Read it, summarize context, offer options (resume or start fresh).

**If STATE.md exists but no HANDOFF:** Project in progress - ask what they want to do.

**If no planning/ directory:** Say "I see this is a new project, I'm going to set it up." and continue.

## Step 2: Create Directory Structure

```bash
mkdir -p planning/specs
```

## Step 3: Create Initial Files

Create these files:

**planning/CLAUDE.md:**
```markdown
# Project - Planning Context

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

**planning/STATE.md:**
```markdown
# Project State

**Stage**: starting
**Last Updated**: {current timestamp}

## Current Focus

Defining project overview

## Progress

- [x] planning/ structure created
- [ ] OVERVIEW.md defined
- [ ] Ready for /plan

## Decisions

(None yet)

## Notes

(None yet)
```

**planning/BACKLOG.md:**
```markdown
# Backlog

## Quick Wins

## Features

## Technical Debt
```

## Step 4: Install Auto-Update Hook

Check and create `.claude/hooks.json` with PostToolUse hook that monitors Write|Edit operations to update STATE.md automatically.

## Step 5: Brownfield Detection

```bash
find . -maxdepth 3 -type f \( -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.go" -o -name "*.rs" -o -name "*.java" \) 2>/dev/null | head -5
```

If source files exist → brownfield, analyze codebase. If no source files → greenfield, skip.

## Step 6: Show Created Structure

Display:
```
Project structure created:

planning/
├── CLAUDE.md    (planning context)
├── STATE.md     (stage: starting)
├── BACKLOG.md   (improvements backlog)
└── specs/       (ready for feature specs)

.claude/
└── hooks.json   (auto-update hook)
```

## Step 7: Guide Overview Creation

Say: "Now let's start by outlining the overview for this project."

**Enter plan mode** and ask questions ONE AT A TIME to gather:
- Project name
- Problem statement
- Target users
- Core value
- Scope boundaries
- Success criteria

## Step 8: Create OVERVIEW.md

After gathering input, create `planning/OVERVIEW.md` with Vision, Problem Statement, Target Users, Core Value, Scope (In/Out), Success Criteria, and Principles.

Update STATE.md to mark OVERVIEW.md as complete.

## Step 9: Show Next Steps

```
Project initialized!

Next steps:
- Brainstorm      - Run /brainstorm to explore and clarify ideas
- Plan a feature  - Run /plan when ready to plan your first feature
- Build           - Run /build to execute an implementation plan
- End session     - Run /stop to create a handoff document

The workflow system will help you maintain focus, track progress, and create clean handoffs between sessions.
```
