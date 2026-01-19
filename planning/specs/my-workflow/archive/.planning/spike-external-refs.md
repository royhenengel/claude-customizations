# Spike: External Skill References Audit

**Date**: 2026-01-17
**Tasks**: T016-T018

## Summary

Scanned source skills for external references. Found references to skills that are NOT installed.

## External References Found

### By Namespace

| Namespace | References | Installed |
|-----------|------------|-----------|
| `superpowers:*` | 7 | NO |
| `elements-of-style:*` | 2 | NO |
| `customize-agent:*` | 2 | Unknown (Anthropic official) |

### By Source File

**`skills/brainstorming/SKILL.md`**
- `elements-of-style:writing-clearly-and-concisely`
- `superpowers:using-git-worktrees`
- `superpowers:writing-plans`

**`commands/cek-brainstorm.md`** (same references as brainstorming skill)
- `elements-of-style:writing-clearly-and-concisely`
- `superpowers:using-git-worktrees`
- `superpowers:writing-plans`

**`commands/cek-test-skill.md`**
- `superpowers:test-driven-development`

**`commands/cek-create-skill.md`**
- `superpowers:Test-Driven Development`
- `superpowers:testing-skills-with-subagents`
- `customize-agent:apply-anthropic-skill-best-practices`
- `customize-agent:prompt-engineering`

### Internal References (OK to keep)

These reference files within the same skill - no action needed:

- `skills/taches-create-plans/references/*` - internal docs
- `skills/living-requirements/workflows/*` - internal workflows
- `skills/living-requirements/templates/*` - internal templates
- `skills/living-requirements/references/*` - internal docs

## Decisions

| Reference | Decision | Rationale |
|-----------|----------|-----------|
| `superpowers:*` | REMOVE | Not installed, not critical for workflows |
| `elements-of-style:*` | REMOVE | Not installed, writing style is optional enhancement |
| `customize-agent:*` | REMOVE | Anthropic-specific, not relevant for my-workflow |
| Internal `references/` | KEEP | Self-contained within skills |
| Internal `workflows/` | KEEP | Self-contained within skills |
| Internal `templates/` | KEEP | Self-contained within skills |

## Impact on Workflows

### /start workflow
- Source: `skills/living-requirements/`
- External refs: NONE
- **Safe to copy**

### /brainstorm workflow
- Source: `skills/brainstorming/`
- External refs: 3 (superpowers + elements-of-style)
- **Action**: Remove these references when copying

### /design workflow
- Source: CEK commands + taches-create-plans
- External refs: In CEK commands only
- **Action**: Use taches pattern, skip CEK commands

### /build workflow
- Source: GSD subagent pattern + taches deviation rules
- External refs: NONE in core patterns
- **Safe to implement**

### /stop workflow
- Source: Existing stop.md + taches handoff
- External refs: NONE
- **Safe to implement**

## Conclusion

The external references are NOT critical to the workflows. They're enhancement references (writing style, git worktrees) that can be safely removed when adapting content for `skills/my-workflow/workflows/`.

**Recommendation**: Proceed with workflow creation, removing external skill references as encountered.
