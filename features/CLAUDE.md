# Claude Code Customizations - Product Requirements

## Vision

The central hub for managing Claude Code configuration across all projects. Everything here symlinks to `~/.claude/` and applies globally. This repo is where skills, agents, commands, and MCP servers are developed, maintained, and versioned.

## Principles

Design principles that apply to ALL features:

- **Self-documenting**: Config files explain their own purpose and usage. Future Claude sessions understand context without external docs.
- **Incremental adoption**: New features don't break existing workflows. Safe to experiment and roll back.
- **Convention over configuration**: Predictable naming and structure patterns. Reduces decisions, speeds up work.

## Feature Map

| Feature | Status | Last Updated | Notes |
|---------|--------|--------------|-------|
| [my-workflow](my-workflow/CLAUDE.md) | Implemented | 2026-01-17 | /start, /design, /build, /stop commands |

## Technical Constraints

Constraints that affect implementation decisions:

- All paths must work via symlinks from `~/.claude/`
- Changes apply globally to all projects
- Must maintain backwards compatibility with existing workflows
- Git-versioned for rollback capability

## Structure

```
claude-customizations/
├── skills/           → ~/.claude/skills/
├── agents/           → ~/.claude/agents/
├── commands/         → ~/.claude/commands/
├── .mcp.json         → ~/.claude/.mcp.json
├── CLAUDE.md         → ~/.claude/CLAUDE.md
└── features/         # Living requirements (this directory)
    └── CLAUDE.md     # You are here
```

## Out of Scope

Explicitly NOT in this repo:

- Project-specific configurations (those live in project repos)
- Credentials or secrets (use environment variables)
- Large binary assets

---

*This file provides context to all features. Claude reads it automatically when working in any features/ subdirectory.*
