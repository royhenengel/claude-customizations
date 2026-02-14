---
name: git-worktrees
description: Creates isolated git worktrees for feature development. Use when user wants to work on a feature in isolation. Creates worktree, opens VS Code window, updates STATE.md.
---

# Git Worktrees

Creates isolated workspaces sharing the same repository, allowing work on multiple branches simultaneously.

**Core principle:** Systematic directory selection + safety verification = reliable isolation.

**Announce at start:** "Setting up isolated workspace using git worktrees."

## Directory Selection Process

Default to project-local `.worktrees/` directory. Follow this priority order:

### 1. Check Existing Directories

```bash
ls -d .worktrees 2>/dev/null     # Preferred (project-local, hidden)
ls -d worktrees 2>/dev/null      # Alternative
```

**If found:** Use that directory. If both exist, `.worktrees` wins.

### 2. Create .worktrees/

If no directory exists, create `.worktrees/` in the project root (project-local is the default).

## Safety Verification

### For Project-Local Directories

**MUST verify directory is ignored before creating worktree:**

```bash
git check-ignore -q .worktrees 2>/dev/null || git check-ignore -q worktrees 2>/dev/null
```

**If NOT ignored:**
1. Add to .gitignore
2. Commit the change
3. Proceed with worktree creation

### For Global Directory

No .gitignore verification needed - outside project.

## Creation Steps

### 1. Detect Project Name

```bash
project=$(basename "$(git rev-parse --show-toplevel)")
```

### 2. Create Worktree

```bash
# Create worktree with new branch
git worktree add "$path" -b "$BRANCH_NAME"
cd "$path"
```

### 3. Run Project Setup

Auto-detect and run appropriate setup:

| Project Type | Detection | Setup Command |
|--------------|-----------|---------------|
| Node.js | package.json | `npm install` |
| Rust | Cargo.toml | `cargo build` |
| Python | requirements.txt | `pip install -r requirements.txt` |
| Python | pyproject.toml | `poetry install` |
| Go | go.mod | `go mod download` |

### 4. Verify Clean Baseline

Run tests to ensure worktree starts clean:

```bash
npm test / cargo test / pytest / go test ./...
```

**If tests fail:** Report failures, ask whether to proceed or investigate.

### 5. Open VS Code Window with Claude

Open a new VS Code window, launch the Claude panel, and auto-submit `/plan`:

```bash
"/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" --new-window "$worktree_path" && sleep 2 && osascript -e '
tell application "System Events"
    key code 53 using {command down, shift down}
    delay 3
    keystroke "/plan"
    delay 0.5
    key code 36
end tell'
```

This opens the worktree in a new VS Code window, opens the Claude Code panel (Cmd+Shift+Esc), types `/plan`, and submits it. Total delay: ~5.5s.

**Prerequisite:** Terminal (or the parent process) must have Accessibility access in System Settings > Privacy & Security > Accessibility for `osascript` keystroke injection to work.

**Fallback:** If the AppleScript fails (permissions, timing), fall back to opening the window without auto-submit and instruct the user to run `/plan` manually.

### 6. Report and Hand Off

```
Worktree ready at <full-path>
VS Code window opened with Claude — /plan submitted.
```

## Quick Reference

| Situation | Action |
|-----------|--------|
| `.worktrees/` exists | Use it (verify ignored) |
| `worktrees/` exists | Use it (verify ignored) |
| Both exist | Use `.worktrees/` |
| Neither exists | Check CLAUDE.md → Ask user |
| Directory not ignored | Add to .gitignore + commit |
| Tests fail during baseline | Report failures + ask |

## Integration with My-Workflow

Worktree creation happens **before** `/plan`. When a user selects a backlog item or describes new work during `/start`, a worktree is created first. The user then switches to the new VS Code window and runs `/plan` and `/build` there.

**Two-Level State:** Each worktree has its own feature PROGRESS.md (`planning/specs/{feature}/PROGRESS.md`) for tracking progress, current state, and gap stack. The project STATE.md (`planning/STATE.md`) on main tracks the Feature Registry only. Worktrees never modify project STATE.md during execution - only at lifecycle transitions (ready, active, complete).

**Cleanup:**
When feature is complete and merged:
```bash
git worktree remove <path>
git branch -d <branch-name>
```
Feature PROGRESS.md archives with the spec directory on merge.

## Red Flags

**Never:**
- Create worktree without verifying it's ignored (project-local)
- Skip baseline test verification
- Proceed with failing tests without asking

**Always:**
- Follow directory priority: existing > CLAUDE.md > ask
- Verify directory is ignored for project-local
- Auto-detect and run project setup
- Verify clean test baseline

---

*Cherry-picked from [obra/superpowers](https://github.com/obra/superpowers) (MIT License)*
*Original source: [references/superpowers/using-git-worktrees.md](references/superpowers/using-git-worktrees.md)*
