# Global Claude Code Instructions

These instructions apply to ALL conversations across ALL projects.

## Required Reading

**Always read `~/.claude/claude-code-preferences.md` at the start of each conversation** — it contains:
- Tool selection rules (when to use skills vs agents vs MCP servers)
- Installed skills, agents, and MCP servers
- Overlap analysis and conflict resolution
- Installation rules and naming conventions

## Notion Context (Load via Subagent)

Before answering the first real question, use a **subagent** to read and summarize these Notion pages as context:
- [AI Chat Prefs](https://www.notion.so/AI-Chat-Prefs-2c74df894a6980b6ab64f322b96aa753?pvs=21)
- [Notion Workspace Prefs](https://www.notion.so/royengel/Notion-Workspace-Prefs-2d64df894a69819f924ae85ddfc18076)

Rules:
- This conversation MUST follow AI Chat Prefs
- If conflicts arise, treat those Notion pages as correct
- Document new rules to the relevant Notion page
- Use subagents for tasks to preserve context
- Be token efficient

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

## New Repository Setup

When creating a new GitHub repository for `royhenengel`, always configure the Notion sync webhook:

```bash
gh api /repos/royhenengel/REPO_NAME/hooks -X POST \
  -f url="https://royhen.app.n8n.cloud/webhook/github-to-notion" \
  -f content_type="json" \
  -F events[]="push"
```

This enables automatic sync of `docs/*.md` files to Notion. Skip if the repo won't have documentation.

## Uncertainty Protocol

When performing bulk operations or making decisions that affect multiple items:
- STOP and flag uncertain items BEFORE making any changes
- Never assume based on surface-level patterns (keywords, names, etc.)
- Present uncertain items to user for clarification first
- Act only after receiving explicit confirmation
- If more than 20% of items are uncertain, question whether the approach itself is correct

This applies universally: code changes, file organization, data categorization, refactoring, or any batch operation.
