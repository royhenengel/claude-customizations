# Claude Customizations

## Vision

A personal repository of Claude Code customizations - skills, commands, agents, hooks, and plugins - that extend Claude's capabilities for my specific workflows and preferences.

## Problem Statement

Claude Code is powerful out-of-the-box, but I work on diverse projects with specific patterns. Without customizations, I repeatedly explain the same preferences, workflows, and domain knowledge. This repository consolidates those customizations into reusable, version-controlled units.

## Target Users

Myself (solo developer). No team or multi-user considerations.

## Core Value Proposition

One place to manage all Claude Code customizations, with clear organization, version control, and easy activation/deactivation of specific skills.

## Scope

### In Scope

- Skills (SKILL.md files that auto-activate based on context)
- Commands (slash commands for explicit invocation)
- Agents (specialized subagent definitions)
- Hooks (event-driven behaviors)
- Plugins (MCP servers and integrations)
- Reference materials (archived skills for learning)

### Out of Scope

- Team collaboration features
- Skill marketplace/distribution
- Automated testing of skills

## Success Criteria

- Can add a new skill in under 10 minutes
- Skills auto-activate when relevant context is detected
- Can easily enable/disable skills without breaking others
- Reference skills remain accessible for learning

---

## Core Principles

### I. Skill-First Design

Every Claude customization MUST be a self-contained, reusable unit:

- Skills are standalone with clear SKILL.md frontmatter
- Agents are independent workers with defined purposes
- No cross-dependencies between skills unless explicitly documented
- Each skill/agent MUST have a single, clear responsibility

**Rationale**: Self-contained units are easier to test, share, and maintain. They can be version-controlled independently and shared with the community.

### II. Context Awareness

All skills and agents MUST respect Claude Code's context hierarchy:

- Skills auto-activate based on context (Claude decides)
- Agents receive explicit invocation or delegation
- CLAUDE.md files cascade context from root to feature
- Skills inherit conversation context; agents get their own window

**Rationale**: Proper context management prevents conflicts and ensures predictable behavior across different project structures.

### III. Documentation-Driven

Documentation is the source of truth, not an afterthought:

- Every skill MUST have a complete SKILL.md with frontmatter
- Every agent MUST have a descriptive .md file
- Changes to behavior MUST be reflected in documentation first
- README files MUST accurately describe current capabilities

**Rationale**: Claude Code relies on documentation to understand and invoke skills. Poor documentation means poor AI assistance.

### IV. Version Control Discipline

All changes MUST follow version control best practices:

- Use branches for experimental changes
- Use PRs for review before merging to main
- Tag releases for stable versions
- Commit messages MUST be descriptive and follow conventions

**Rationale**: This repo is symlinked to ~/.claude/, so changes are immediately live. Disciplined version control prevents breaking your Claude Code setup.

### V. Simplicity Over Complexity

Start simple and add complexity only when justified:

- YAGNI (You Aren't Gonna Need It) applies
- Prefer editing existing skills over creating new ones
- Avoid over-engineering skill logic
- Each skill should do one thing well

**Rationale**: Complex skills are harder to maintain and more likely to conflict with other customizations.

---

## Quality Standards

### Skill Requirements

- Valid SKILL.md frontmatter (name, description, triggers)
- Clear invocation patterns documented
- No hardcoded paths (use relative or environment variables)
- Tested with at least one real-world scenario

### Agent Requirements

- Defined purpose and scope
- Specified model preference if needed (haiku/opus)
- Clear input/output expectations
- Error handling documented

### Code Quality

- No secrets or credentials in files
- No user-specific paths hardcoded
- Follow existing patterns in the codebase
- Keep files under 500 lines where possible

---

## Development Workflow

### Adding New Skills

1. Create directory: `skills/my-skill/`
2. Write SKILL.md with proper frontmatter
3. Test locally before committing
4. Create PR for review (if collaborating)
5. Update README if adding significant functionality

### Adding New Agents

1. Create file: `agents/my-agent.md`
2. Include frontmatter with model/description
3. Test with Task tool invocation
4. Document usage patterns

### Modifying Existing

1. Read current implementation fully
2. Make minimal changes needed
3. Update documentation to match
4. Test affected workflows

---

## Governance

This document establishes the non-negotiable rules for this repository:

1. **Document Supremacy**: This OVERVIEW.md supersedes conflicting guidance elsewhere
2. **Amendment Process**: Changes require updating this file with version bump
3. **Compliance**: All PRs should verify alignment with these principles
4. **Exceptions**: Must be documented with rationale in the relevant file

For runtime development guidance, refer to:

- [README.md](../README.md) - Project overview and structure
- [planning/CLAUDE.md](CLAUDE.md) - Planning context

**Version**: 1.0.0 | **Ratified**: 2025-01-09 | **Last Amended**: 2026-01-18 | **Migrated from**: specs/constitution.md
