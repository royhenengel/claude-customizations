# Claude Customizations

Personal Claude Code customizations - skills, commands, agents, hooks, and plugins that extend Claude's capabilities for specific workflows and preferences.

## Structure

```
claude-customizations/
├── skills/           # 33 active SKILL.md files (auto-activate based on context)
│   └── my-workflow/  # Core workflow system (/start, /plan, /build, /stop)
├── commands/         # 72 slash command definitions (explicit invocation)
├── agents/           # 142 subagent definitions (specialized workers via Task tool)
├── hooks/            # Event-driven behaviors
├── mcp/              # MCP server configurations
├── planning/         # Project planning, state, and specifications
│   ├── OVERVIEW.md   # Project vision, scope, and governance
│   ├── STATE.md      # Current project state and progress
│   ├── BACKLOG.md    # Improvements and technical debt
│   └── specs/        # Feature specifications (SPEC.md, PLAN.md, RESEARCH.md)
└── archive/          # Archived/deprecated items
```

## How It Works

This repo is symlinked to `~/.claude/`:

- `~/.claude/skills` → `./skills/`
- `~/.claude/commands` → `./commands/`
- `~/.claude/agents` → `./agents/`

Changes here are immediately available in Claude Code.

## Core Workflow

The **my-workflow** skill provides a unified development workflow:

| Command  | Purpose                                                     |
| -------- | ----------------------------------------------------------- |
| `/start` | Initialize project context, detect brownfield vs greenfield |
| `/plan`  | Create spec-driven plans with research and task breakdown   |
| `/build` | Execute plans with deviation rules and scope control        |
| `/stop`  | Create handoff documentation for context continuity         |

## Skills vs Agents vs Commands

| Aspect     | Skills                     | Agents                   | Commands               |
| ---------- | -------------------------- | ------------------------ | ---------------------- |
| Invocation | Automatic (Claude decides) | Task tool delegation     | Explicit `/command`    |
| Context    | Shares conversation        | Own context window       | Shares conversation    |
| Use for    | Instructions, workflows    | Independent workers      | User-triggered actions |
| Model      | Inherits                   | Can specify (haiku/opus) | Inherits               |

## Adding New Items

**Skills**: Create `skills/my-skill/SKILL.md` with proper frontmatter

**Commands**: Create `commands/my-command.md` following existing patterns

**Agents**: Create `agents/my-agent.md` with frontmatter including model/description

## Development Workflow

For detailed guidelines, see [planning/OVERVIEW.md](planning/OVERVIEW.md).

## Version Control

- Use branches for experimental changes
- Create PRs for review before merging
- Tag releases for stable versions
- This repo is symlinked to ~/.claude/, so changes are immediately live
