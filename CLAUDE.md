# Claude Customizations Project

This project manages Claude Code extensions: skills, agents, and MCP servers.

## Required Reading

**Always read `PREFERENCES.md` at the start of each conversation** — it contains:
- Tool selection rules (when to use skills vs agents vs MCP servers)
- Installed skills, agents, and MCP servers
- Overlap analysis and conflict resolution
- Installation rules and naming conventions

## Directory Structure

```
skills/    → Installed skills (symlinked to ~/.claude/skills)
agents/    → Custom agents (symlinked to ~/.claude/agents)
mcp/       → MCP server documentation/configs
```

## Quick Reference

| Need | Tool |
|------|------|
| Prompts, templates, domain knowledge | Skill |
| Multi-step autonomous tasks | Agent |
| External API/service integration | MCP Server |
