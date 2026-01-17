# My Workflow Requirements

**Status**: Implemented
**Last Updated**: 2026-01-17

## Purpose

Personal workflow system for solo development with Claude Code. Provides structured commands (/start, /design, /build, /stop) that implement patterns from taches, CEK, GSD, and living-requirements skills. Solves context degradation by using atomic plans and subagent delegation.

## User Stories

- As a solo developer, I want to curate my skill library so I only see active skills in Claude Code
- As a solo developer, I want to understand the patterns in existing skills so I can use them effectively
- As a solo developer, I want workflow commands that handle my work patterns so I don't need to remember which skill to use
- As a solo developer, I want to extend the workflow over time without breaking existing commands

## Requirements

### Functional

- [x] /start creates `planning/` structure with CLAUDE.md, STATE.md
- [x] /start installs auto-update hook for STATE.md
- [x] /start offers resume when HANDOFF.md exists
- [x] /design offers brainstorming for unclear requirements
- [x] /design creates spec.md, research.md, PLAN.md in `planning/specs/{feature}/`
- [x] /build executes tasks via subagent delegation (fresh context per task)
- [x] /build applies deviation rules (auto-fix bugs/blockers, ask on architecture)
- [x] /build monitors context and offers /stop at 15% remaining
- [x] /stop creates HANDOFF.md with comprehensive context
- [x] /stop auto-triggers at 10% context remaining

### Non-Functional

- [x] **Simplicity**: Commands are thin wrappers that invoke skill workflows
- [x] **Extensibility**: Templates exist for adding new commands/workflows
- [x] **Documentation**: README.md covers usage and troubleshooting

## Architecture Notes

- Pattern: Skill-first architecture (commands invoke skill workflows)
- State: `planning/STATE.md` tracks stage and progress
- Structure: Unified `planning/` directory for all planning artifacts

Key decisions:
- `planning/` (visible) instead of `.planning/` (hidden)
- Plans-as-prompts (PLAN.md IS the execution prompt)
- Subagent per task for fresh 200k context
- HANDOFF.md only (no auto-commit on stop)

## Implementation Notes

### Files

- `skills/my-workflow/SKILL.md` - Core skill with principles and triggers
- `skills/my-workflow/workflows/*.md` - 5 workflow definitions
- `skills/my-workflow/templates/*.md` - Command and workflow templates
- `skills/my-workflow/hooks/state-update-hook.json` - Hook reference
- `skills/my-workflow/README.md` - Usage and extension documentation
- `commands/start.md`, `design.md`, `build.md`, `stop.md` - Command wrappers

### Dependencies

- No external skill dependencies (superpowers/elements-of-style references removed)

### Patterns Used

- Cascading CLAUDE.md context (from living-requirements)
- Plans-as-prompts (from taches-create-plans)
- Deviation rules (from CEK/taches)
- Subagent execution (from GSD)
- One-question-at-a-time dialogue (from brainstorming)

## Deviations from Plan

- External skill references (superpowers, elements-of-style) removed - not installed, not critical
- Scope control threshold adjusted to 40-50% (not 80%) based on research

## Open Questions

- None currently

## Related Features

- [living-requirements](../living-requirements/) - Cascading context pattern
- [brainstorming](../brainstorming/) - Dialogue exploration pattern

---

*Inherits context from: [../CLAUDE.md](../CLAUDE.md)*
