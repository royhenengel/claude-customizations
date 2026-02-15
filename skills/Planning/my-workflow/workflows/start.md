# Workflow: /start

## Purpose

Initialize a new project with the unified `planning/` structure, including a project definition (OVERVIEW.md).

## When to Use

- Starting a new project from scratch
- On main: see features in flight, pick from backlog or describe new, create worktree
- In a worktree: resume feature work (reads feature PROGRESS.md) or start planning a new feature

## Steps

> **Timestamp Rule**: Whenever modifying STATE.md or PROGRESS.md in any step below, always update its `**Last Updated**` field to the current date.

### 1. Check Current State

Say:
```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Scanning project...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

```bash
ls -la planning/ 2>/dev/null || echo "No planning/ directory"
# Detect environment
if [ -f .git ]; then echo "WORKTREE"; else echo "MAIN"; fi
```

**If new project (no planning/)**: Say and proceed to Step 2:

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 Setting up new project
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**If in a worktree** (`.git` is a file, not a directory):

Derive feature name from branch:
```bash
git branch --show-current
```

Read `planning/specs/{feature}/PROGRESS.md` for feature state.

- **If feature PROGRESS.md exists with content**: Show Current State and offer to resume:

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Feature state loaded: {feature-name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Stage: {stage from feature PROGRESS.md}

Current State:

- What's Working: {summary}
- What's Not Working: {summary}
- Next Steps: {first item}

Ready to continue? Run `/build` to resume execution.

- **If no feature PROGRESS.md**: This is a new feature in a fresh worktree. Suggest `/plan`:

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 New feature workspace: {feature-name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

No feature state found. Run `/plan` to start planning this feature.

**If on main branch** (`.git` is a directory):

Read `planning/STATE.md` Feature Registry.

Discover active worktrees:
```bash
# Get list of active worktrees (exclude main)
git worktree list --porcelain | grep "^worktree" | grep -v "$(git rev-parse --show-toplevel)$"
```

For each active worktree, read its feature PROGRESS.md (`planning/specs/{feature}/PROGRESS.md`) to get live status (stage, progress).

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Project Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Features in flight:
{Show active features from worktree discovery with stage and progress}

Completed: {count} features

Read `planning/BACKLOG.md` and show actionable items:

From backlog:

- {backlog item 1}
- {backlog item 2}
- {backlog item 3}

What would you like to do?

1. **Plan a feature** (pick from backlog or describe something new)
2. **Fix an issue** (describe the problem)
3. **Switch to existing worktree** (resume in-flight work)

**Option 1 - Plan a feature:**

After user picks from backlog or describes new work:

1. Derive a kebab-case worktree name from the selection
2. Register the feature in `planning/STATE.md` Feature Registry (status: `drafted`, type: `feature`, branch and worktree path)
3. Create worktree using `/git-worktrees` with that name (auto-opens VS Code, launches Claude, submits `/plan`)

Do NOT ask additional questions. Proceed directly to registration and worktree creation.

**Option 2 - Fix an issue:**

After user describes the problem:

1. Assess complexity: does this need isolation (multiple files, risky changes) or is it a quick fix?
2. **Substantial fix**: derive a kebab-case worktree name (e.g., `fix-login-crash`), create worktree, instruct user to run `/fix` in the new window
3. **Quick fix**: instruct user to run `/fix` on main

**Option 3 - Switch to existing worktree:**

List active worktrees with their current status:

```text
Active worktrees:
1. user-auth (building, 3/5 tasks) → .worktrees/user-auth
2. api-routes (planning) → .worktrees/api-routes

Open which worktree?
```

Open selected worktree in VS Code with Claude panel:
```bash
"/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" --new-window "{worktree-path}" && sleep 2 && osascript -e 'tell application "System Events" to key code 53 using {command down, shift down}'
```

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

Use the project state template: @skills/Planning/my-workflow/templates/project-state-template.md

Copy the template content and set `**Last Updated**` to today's date.

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

### 9. Show Next Steps and First Feature Setup

After OVERVIEW.md is created, display:

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Project initialized
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

{Show created structure from Step 6}

The workflow system will help you maintain focus and track progress.

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 What would you like to build first?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Options:

1. **Describe your first feature** → derive worktree name → create worktree via `/git-worktrees` → instruct `/plan` in new window
2. **I'll explore on my own first** → end session (user can run `/start` later to see dashboard)
3. **Fix an issue first** → assess complexity → create fix worktree or run `/fix` on main

This transitions into the same flow as the main branch dashboard (Scenario C, Step 1).

## Output Structure

```text
planning/
├── OVERVIEW.md         # Project definition (vision, scope)
├── CLAUDE.md           # Planning context (references OVERVIEW)
├── STATE.md            # Feature Registry
├── BACKLOG.md          # Persistent backlog of improvements
├── CODEBASE.md         # Codebase map (brownfield only)
└── specs/              # Empty, ready for /plan

.claude/
└── hooks.json          # Auto-update hook installed
```

## Resume Behavior

**In a worktree**: Read `planning/specs/{feature}/PROGRESS.md` completely. Summarize Current State and offer to resume.

**On main**: Read `planning/STATE.md` Feature Registry. Show features in flight and backlog items.

## Error Handling

**planning/ already exists with STATE.md:**

This is normal for resuming work. Read Current State and continue.

**Hook installation fails:**

- Warn user but continue
- Suggest manual hook installation later
