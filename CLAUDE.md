# Global Claude Code Instructions

These instructions apply to ALL conversations across ALL projects.

## Required Reading

**Always read `/Users/royengel/Projects/Claude Code/claude-customizations/PREFERENCES.md` at the start of each conversation** — it contains:
- Tool selection rules (when to use skills vs agents vs MCP servers)
- Installed skills, agents, and MCP servers
- Overlap analysis and conflict resolution
- Installation rules and naming conventions

## Quick Reference

| Need | Tool |
|------|------|
| Prompts, templates, domain knowledge | Skill |
| Multi-step autonomous tasks | Agent |
| External API/service integration | MCP Server |

## Global Resources

All symlinked to `~/.claude/` and available everywhere:

```
~/.claude/
├── CLAUDE.md     → This file (global instructions)
├── skills/       → 100 installed skills
├── agents/       → 142 installed agents
├── commands/     → 71 slash commands
└── .mcp.json     → MCP server config (10 servers)
```

Source: `/Users/royengel/Projects/Claude Code/claude-customizations/`

## Management

To add/modify skills, agents, commands, or MCP servers:
1. Work in `/Users/royengel/Projects/Claude Code/claude-customizations/`
2. Changes automatically apply globally via symlinks
3. Commit to git for version control
