# Workflow: /start

## Purpose

Initialize a new project with the unified `planning/` structure, including a project definition (OVERVIEW.md).

## When to Use

- Starting a new project from scratch
- Resuming after a `/stop` handoff (will read HANDOFF.md first)

## Steps

### 1. Check Current State

Say: `Welcome, checking the current state.`

```bash
ls -la planning/ 2>/dev/null || echo "No planning/ directory"
ls planning/HANDOFF.md 2>/dev/null && echo "HANDOFF exists - resuming"
ls planning/STATE.md 2>/dev/null && echo "STATE exists - project in progress"
```

**If HANDOFF.md exists**: Read it first, check for Feature Registry, then offer options:

**If Feature Registry exists in HANDOFF.md** (multi-feature session):

```text
Found HANDOFF.md from previous session.

Feature Registry:
| Feature | Status | Progress |
|---------|--------|----------|
| {feature-1} | paused | {n}/{m} |
| {feature-2} | ready | 0/{m} |
| {feature-3} | blocked | 0/{m} |

Last session ended while building: {paused feature name} (Task {n}/{m})

What would you like to do?
1. Resume {paused feature} (continue where you left off)
2. Switch to {ready feature} (keep {paused feature} paused)
3. Start fresh (will archive planning/ to planning.bak/)
```

**If single feature or no registry** (legacy/simple session):

```text
Found HANDOFF.md from previous session.

Last session ended with: {summary from handoff}

What would you like to do?
1. Resume where you left off
2. Start fresh (will archive planning/ to planning.bak/)
```

**If STATE.md exists but no HANDOFF**: Project is in progress. Ask user what they want to do.

**If new project (no planning/)**: Say and proceed:

```text
I see this is a new project, I'm going to set it up.
```

Continue to step 2.

### 2. Create Directory Structure

```bash
mkdir -p planning/specs
```

### 3. Create Initial Files

Create the following files silently (don't ask questions yet):

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
**Last Updated**: {timestamp}

## Active Feature

**Name**: None
**Status**: -
**Progress**: -

## Feature Registry

| Feature | Status | Progress | Dependencies |
|---------|--------|----------|--------------|
| (none yet) | - | - | - |

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

## Gap Stack

<!-- Tracks context when handling plan-modifying gaps during /build -->
<!-- Empty when no gaps active. Supports nested gaps (LIFO). -->

### Active Gap

(None)

### Gap History

(None this session)
```

**planning/BACKLOG.md:**
```markdown
# Backlog

## Quick Wins

## Features

### Ready to Plan

### Drafted

### Ideas

## Technical Debt
```

### 4. Install Auto-Update Hook

Check existing hooks:
```bash
cat .claude/hooks.json 2>/dev/null || echo "No hooks configured"
```

Hook configuration:
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

### 5. Brownfield Detection and Codebase Analysis

Detect brownfield automatically by checking for existing code:

```bash
# Check for existing source code (not just config files)
find . -maxdepth 3 -type f \( -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.go" -o -name "*.rs" -o -name "*.java" -o -name "*.swift" -o -name "*.rb" -o -name "*.php" -o -name "*.cs" \) 2>/dev/null | head -5
```

**If source files exist → This is brownfield. Run codebase analysis:**

```
Detected existing codebase. Mapping structure...
```

Run `/map-codebase` workflow to analyze and store findings in `planning/CODEBASE.md`.

**If no source files → This is greenfield.** Skip codebase analysis.

### 6. Show Created Structure

Display what was created:

**For greenfield projects:**
```text
Project structure created:

planning/
├── CLAUDE.md    (planning context)
├── STATE.md     (stage: starting)
├── BACKLOG.md   (improvements backlog)
└── specs/       (ready for feature specs)

.claude/
└── hooks.json   (auto-update hook)
```

**For brownfield projects:**
```text
Project structure created:

planning/
├── CLAUDE.md    (planning context)
├── STATE.md     (stage: starting)
├── BACKLOG.md   (improvements backlog)
├── CODEBASE.md  (codebase analysis)
└── specs/       (ready for feature specs)

.claude/
└── hooks.json   (auto-update hook)

Codebase summary:
{Brief summary from CODEBASE.md - key directories, tech stack, patterns}
```

### 7. Guide Overview Creation

Say:
```text
Now let's start by outlining the overview for this project.
```

**Enter plan mode** and guide the user through creating the project overview. Ask questions one at a time (prefer multiple choice when possible) to gather:

- **Project name**: What is this called?
- **Problem statement**: What problem does this solve?
- **Target users**: Who is this for?
- **Core value**: What's the main benefit?
- **Scope boundaries**: What's explicitly NOT included?
- **Success criteria**: How do we know this project succeeded?

### 8. Create OVERVIEW.md

After gathering input, create `planning/OVERVIEW.md`:

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

Update `planning/STATE.md` progress:
- Mark `OVERVIEW.md defined` as complete
- Mark `Ready for /plan` as complete

### 9. Show Next Steps

After OVERVIEW.md is created, display:

```text
Project initialized!

Next steps:
- Brainstorm      - Run /brainstorm to explore and clarify ideas
- Plan a feature  - Run /plan when ready to plan your first feature
- Build           - Run /build to execute an implementation plan
- End session     - Run /stop to create a handoff document

The workflow system will help you maintain focus, track progress, and create clean handoffs between sessions.
```

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
