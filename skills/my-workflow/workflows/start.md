# Workflow: /start

## Purpose

Initialize a new project with the unified `planning/` structure, including a project definition (OVERVIEW.md).

## When to Use

- Starting a new project from scratch
- Resuming work (will read Current State from STATE.md)

## Steps

### 1. Check Current State

Say:
```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Scanning project...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

```bash
ls -la planning/ 2>/dev/null || echo "No planning/ directory"
ls planning/STATE.md 2>/dev/null && echo "STATE exists - checking for resume context"
```

**Check if Current State has content** by examining STATE.md:

- Read the "Current State" section
- Check if "What's Working" has values other than "(Nothing verified yet)"
- Check if "What's Not Working" has values other than "(No issues identified)"

**If Current State has content**: Read it first, check for Feature Registry, then offer options:

**If Feature Registry exists in STATE.md** (multi-feature session):

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Project state loaded
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Feature Registry:
| Feature | Status | Progress |
|---------|--------|----------|
| {feature-1} | paused | {n}/{m} |
| {feature-2} | ready | 0/{m} |
| {feature-3} | blocked | 0/{m} |

Last session ended while building: {paused feature name} (Task {n}/{m})

Current State:
- What's Working: {summary}
- What's Not Working: {summary}
- Next Steps: {first item}

What would you like to do?
1. Resume {paused feature} (continue where you left off)
2. Switch to {ready feature} (keep {paused feature} paused)
```

**If single feature or no registry** (simple session):

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Project state loaded
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current State:
- What's Working: {summary}
- What's Not Working: {summary}
- Next Steps: {first item}

Ready to continue?
```

**If STATE.md exists but Current State is empty/defaults**: Project is in progress but no session context. Ask user what they want to do.

**If new project (no planning/)**: Say and proceed:

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 Setting up new project
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

## Current State

**Last Updated**: {timestamp}

### What's Working

(Nothing verified yet)

### What's Not Working

(No issues identified)

### Next Steps

1. (Determined during /plan or /build)

### Open Questions

(None)
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

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Codebase detected, analyzing...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Run `/map-codebase` workflow to analyze and store findings in `planning/CODEBASE.md`.

**If no source files → This is greenfield.** Skip codebase analysis.

### 6. Show Created Structure

Display what was created:

**For greenfield projects:**
```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 Planning Workspace Ready
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 Planning Workspace Ready
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Let's define this project
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Enter plan mode** and guide the user through creating the project overview. Ask questions one at a time (prefer multiple choice when possible).

**Greenfield questions** (ask in this order):

1. **Project name**: What is this called?

2. **Vision and goals** (holistic, not one-dimensional):

   ```text
   Tell me about this project:
   - What problem are you solving?
   - What's the goal or desired outcome?
   - Why does this matter to you or your users?
   ```

3. **Target users**: Who is this for? (Can be yourself, a team, customers, etc.)

4. **Desired experience**: Describe how someone would use this. Walk me through a typical session.

5. **Success criteria**: How do we know this project succeeded?

**Note on scope**: Don't ask about scope boundaries during /start. Scope emerges during /brainstorm and /plan.

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

## Desired Experience

{How someone uses this. A typical session or workflow.}

## Scope

<!-- Scope details emerge during /brainstorm and /plan. Start with high-level intent. -->

- {High-level capability or boundary, if known}

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
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Project initialized
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Next steps:
- Plan a feature  - Run /plan to plan your first feature (includes clarification if needed)
- Build           - Run /build to execute an implementation plan

The workflow system will help you maintain focus and track progress. Current State is maintained automatically.
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

When Current State has content in STATE.md:

1. Read STATE.md completely, focusing on Current State section
2. Summarize: "Last session context: {summary from What's Working/What's Not Working}"
3. Show: Current state, decisions made, next steps from STATE.md
4. Continue where left off

## Error Handling

**planning/ already exists with STATE.md:**

This is normal for resuming work. Read Current State and continue.

**Hook installation fails:**

- Warn user but continue
- Suggest manual hook installation later
