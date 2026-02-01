---
name: git-worktrees
description: Creates isolated git worktrees for feature development. Use before /build to work on separate branches without switching workspaces.
triggers:
  - starting feature work
  - need isolation from main branch
  - before executing implementation plans
  - parallel development
---

# Git Worktrees

Creates isolated workspaces sharing the same repository, allowing work on multiple branches simultaneously.

**Core principle:** Systematic directory selection + safety verification = reliable isolation.

**Announce at start:** "Setting up isolated workspace using git worktrees."

## Directory Selection Process

Follow this priority order:

### 1. Check Existing Directories

```bash
ls -d .worktrees 2>/dev/null     # Preferred (hidden)
ls -d worktrees 2>/dev/null      # Alternative
```

**If found:** Use that directory. If both exist, `.worktrees` wins.

### 2. Check CLAUDE.md

```bash
grep -i "worktree.*director" CLAUDE.md 2>/dev/null
```

**If preference specified:** Use it without asking.

### 3. Ask User

If no directory exists and no CLAUDE.md preference:

```
No worktree directory found. Where should I create worktrees?

1. .worktrees/ (project-local, hidden)
2. ~/worktrees/<project-name>/ (global location)
```

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

### 5. Report Location

```
Worktree ready at <full-path>
Tests passing (<N> tests, 0 failures)
Ready to implement <feature-name>
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

**Use before:**
- `/build` - when feature needs isolation from main branch
- Starting any feature that may take multiple sessions

**Use after:**
- `/plan` - when plan is approved and ready for implementation

**Cleanup:**
When feature is complete and merged:
```bash
git worktree remove <path>
git branch -d <branch-name>
```

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
*Original source: [ref/superpowers/using-git-worktrees.md](ref/superpowers/using-git-worktrees.md)*
