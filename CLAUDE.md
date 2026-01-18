# Claude Customizations

Personal Claude Code customizations - skills, commands, agents, hooks, and plugins.

## Project Definition & Governance

@planning/OVERVIEW.md

## Planning Context

@planning/CLAUDE.md

## Structure

- `skills/` - Self-contained SKILL.md files (auto-activate based on context)
- `commands/` - Slash command definitions (explicit invocation)
- `agents/` - Subagent definitions (specialized workers)
- `hooks/` - Event-driven behaviors
- `mcp/` - MCP server configurations
- `planning/` - Project planning, state, and specifications
- `docs/` - Project documentation
- `archive/` - Archived/deprecated items

## Symlink Setup

This repository is symlinked to `~/.claude/` for automatic availability:
- Skills auto-load when their triggers match
- Commands are available via `/command-name`
- Agents are available via Task tool
