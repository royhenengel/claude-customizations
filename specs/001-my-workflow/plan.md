# Roadmap: My Workflow System

**Feature**: 001-my-workflow
**Branch**: `feature/001-my-workflow`
**Date**: 2026-01-10
**Design**: [design.md](design.md)

## Technical Context

- **Language/Version**: Markdown-based Claude Code skills and commands
- **Dependencies**: Claude Code CLI, ~/.claude/ directory structure
- **Storage**: Filesystem-based (symlinked from claude-customizations to ~/.claude/)
- **Testing**: Manual verification via Claude Code invocation
- **Platform**: macOS (Claude Code CLI)

## Phase 0: Manual Curation

**Goal**: Clear workspace of unused skills/commands

**Task 0.1**: Create reference directory structure

- Create `~/.claude/reference/skills/`
- Create `~/.claude/reference/commands/`

**Task 0.2**: Move unused skills to reference

- Review skills with user
- Move to `~/.claude/reference/skills/`

**Task 0.3**: Move unused commands to reference

- Review commands with user
- Move to `~/.claude/reference/commands/`

**Task 0.4**: Review installed plugins

- Review `~/.claude/plugins/` with user
- Remove unused plugins
- Document active plugins and their purpose

**Verification**: Remaining skills/commands/plugins work, reference folder populated

---

## Phase 1: Skill Foundation (Curate and Copy)

**Goal**: Create my-workflow skill with workflows

For each workflow, review existing implementations and select content.

**Task 1.1**: Create `skills/my-workflow/SKILL.md`

- Review taches/CEK/GSD principles
- User selects preferred approach
- Copy and adapt selected content
- Add triggers: .planning/ directory exists

**Task 1.2**: Create `workflows/start.md`

- Present how taches, CEK, living-requirements, GSD handle project start
- User selects preferred implementation
- Copy content + any dependencies
- Adapt as needed

**Task 1.3**: Create `workflows/brainstorm.md`

- Copy from existing `brainstorming` skill
- Adapt to output to `docs/plans/<date>-<topic>-design.md`
- Determine appropriate plan structure based on idea scope:
  - Simple: A few tasks (no phases needed)
  - Feature: Single feature with clear scope
  - Multi-feature: Multiple features requiring phased roadmap
- Audit all external skill references in copied content
- Install any missing referenced skills

**Task 1.4**: Create `workflows/design.md`

- Present how taches, CEK handle spec-driven planning
- User selects preferred implementation
- Copy content + any dependencies
- Adapt as needed
- Update to offer brainstorm workflow if requirements are unclear

**Task 1.5**: Create `workflows/build.md`

- Present how taches, GSD handle execution with deviation rules
- User selects preferred implementation
- Copy content + any dependencies
- Adapt as needed

**Task 1.6**: Create `workflows/stop.md`

- Present how taches, GSD handle handoffs
- User selects preferred implementation
- Copy content + any dependencies
- Adapt as needed

**Task 1.7**: Audit and install all external skill references

- Review all copied workflows for external skill references (e.g., `superpowers:*`, `elements-of-style:*`)
- Install any missing referenced skills
- Verify all references resolve correctly

**Verification**: Skill loads when .planning/ exists, principles are active, all external references work

---

## Phase 2: Commands

**Goal**: Create thin command wrappers

**Task 2.1**: Create `commands/start.md`

- Thin wrapper that loads skill and invokes workflows/start.md
- ~15 lines

**Task 2.2**: Create `commands/design.md`

- Thin wrapper that loads skill and invokes workflows/design.md
- ~15 lines

**Task 2.3**: Create `commands/build.md`

- Thin wrapper that loads skill and invokes workflows/build.md
- ~15 lines

**Task 2.4**: Verify or create `commands/stop.md`

- Check if existing stop.md suffices or needs wrapper
- ~15 lines if new

**Verification**: Run `/start` → `/design` → `/build` → `/stop` flow

---

## Phase 3: Supporting Infrastructure

**Goal**: Add automation hooks

**Task 3.1**: Create `hooks/state-update.md`

- PostToolUse hook for STATE.md updates
- Triggers on Write/Edit to code files
- ~40 lines

**Verification**: STATE.md updates automatically after code changes

---

## Phase 4: Testing & Polish

**Goal**: Validate complete workflow

**Task 4.1**: Full workflow test

- Test: /start → /design → /build → /stop on test project
- Verify STATE.md updates, HANDOFF.md creation

**Task 4.2**: Update documentation

- Update root CLAUDE.md with new command documentation
- Add cross-references between commands

---

## Files to Create

| File | Purpose | Source |
| ---- | ------- | ------ |
| `skills/my-workflow/SKILL.md` | Core principles | Selected from taches/CEK/GSD |
| `skills/my-workflow/workflows/start.md` | Start workflow | Selected from patterns |
| `skills/my-workflow/workflows/brainstorm.md` | Idea exploration | Existing brainstorming skill |
| `skills/my-workflow/workflows/design.md` | Design workflow | Selected from patterns |
| `skills/my-workflow/workflows/build.md` | Build workflow | Selected from patterns |
| `skills/my-workflow/workflows/stop.md` | Stop workflow | Selected from patterns |
| `commands/start.md` | Thin wrapper | New (~15 lines) |
| `commands/design.md` | Thin wrapper | New (~15 lines) |
| `commands/build.md` | Thin wrapper | New (~15 lines) |
| `hooks/state-update.md` | PostToolUse hook | New (~40 lines) |

## Files to Verify

| File | Reason |
| ---- | ------ |
| `commands/stop.md` | May already exist with HANDOFF.md creation |

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| Skill may auto-activate unnecessarily | Use specific triggers (.planning/ directory) |
| Moving skills may break symlinks | Test with single skill first, verify symlinks |
| Command/skill loading order | Test that commands properly invoke skill workflows |
| Copied content has broken references | Audit external refs, install missing skills |
