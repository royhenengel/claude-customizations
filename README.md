# Claude Customizations

Version-controlled Claude Code skills and agents.

## Structure

```
claude-customizations/
├── skills/           # Claude Skills (auto-activate based on context)
│   ├── skill-assistant/   # Find, install, create skills & agents
│   └── skill-creator/     # Skill creation guidance with scripts
└── agents/           # Claude Agents (independent workers)
```

## How It Works

This repo is symlinked to `~/.claude/`:
- `~/.claude/skills` → `./skills/`
- `~/.claude/agents` → `./agents/`

Changes here are immediately available in Claude Code.

## Skills vs Agents

| Aspect | Skills | Agents |
|--------|--------|--------|
| Invocation | Automatic (Claude decides) | Explicit or delegated |
| Context | Shares main conversation | Own context window |
| Use for | Instructions, workflows | Independent workers |
| Model | Inherits | Can specify (haiku/opus) |

## Adding New Skills

```bash
mkdir skills/my-skill
# Create skills/my-skill/SKILL.md with frontmatter
```

## Adding New Agents

```bash
# Create agents/my-agent.md with frontmatter
```

## Version Control

All changes are tracked via git:
- Create branches for experimental changes
- Use PRs for review before merging
- Tag releases for stable versions

## Installed Skills

### skill-assistant
Find, install, and create Claude Skills and Agents. Includes:
- 27 pre-built skills from awesome-claude-skills catalog
- Templates for creating new skills and agents
- Auto-generation capabilities

### skill-creator
Comprehensive guide for creating skills with helper scripts:
- `scripts/init_skill.py` - Initialize new skills
- `scripts/package_skill.py` - Package for distribution
- `scripts/quick_validate.py` - Validate skill structure
