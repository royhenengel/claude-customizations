# Claude Customizations

Personal Claude Code customizations - skills, agents, hooks, and plugins that extend Claude's capabilities for specific workflows and preferences.

## Structure

```
claude-customizations/
├── skills/           # 87 skills (auto-activate based on context)
├── agents/           # 133 subagent definitions (specialized workers via Task tool)
├── rules/            # Always-loaded governance (auto-loaded via ~/.claude/rules/)
├── hooks/            # Event-driven behaviors
├── mcp/              # MCP server configurations
├── docs/             # Reference catalogs and setup guides
├── scripts/          # Utility scripts
├── planning/         # Project planning, state, and specifications
│   ├── OVERVIEW.md   # Project vision, scope, and governance
│   ├── STATE.md      # Current project state and progress
│   ├── BACKLOG.md    # Improvements and technical debt
│   ├── solutions/    # Reusable problem-solution pairs (/compound)
│   └── specs/        # Feature specifications
└── archive/          # Archived/deprecated items
```

## How It Works

This repo is symlinked to `~/.claude/`. Changes here are immediately available in Claude Code.

Key directories map directly:
- `~/.claude/skills/` - Skills auto-activate based on context
- `~/.claude/agents/` - Agents available via Task tool
- `~/.claude/rules/` - Auto-loaded every session (Anthropic's native mechanism)

## Core Workflow

The **my-workflow** skill provides a unified development workflow:

| Command  | Purpose                                                     |
| -------- | ----------------------------------------------------------- |
| `/start` | Initialize project context, detect brownfield vs greenfield |
| `/plan`  | Create spec-driven plans with research and task breakdown   |
| `/build` | Execute plans with deviation rules and scope control        |

## Adding New Items

**Skills**: Create `skills/{Group}/{name}/SKILL.md` with proper frontmatter. Place in the appropriate functional group directory.

**Agents**: Create `agents/my-agent.md` with frontmatter including model/description.

## Guidelines

For project vision and governance, see [planning/OVERVIEW.md](planning/OVERVIEW.md).

## Version Control

This repo is symlinked to `~/.claude/`, so changes are immediately live. Use branches for experimental changes.
