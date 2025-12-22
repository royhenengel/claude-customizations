# Claude Code Preferences & Decisions

This document tracks preferences, rules, and decisions for Claude Code customization.

---

## Skills, Agents & MCP Servers

### When to Use Which

| Use Case | Best Tool | Why |
|----------|-----------|-----|
| Reusable prompts/templates | **Skill** | Simple, shares conversation context |
| Domain knowledge/standards | **Skill** | Instructions loaded when relevant |
| Quick behavior enhancements | **Skill** | No subprocess overhead |
| Multi-step autonomous tasks | **Agent** | Runs independently, returns results |
| Parallel execution | **Agent** | Multiple agents can run simultaneously |
| Complex exploration/research | **Agent** | Isolated context, thorough investigation |
| External API integration | **MCP Server** | Direct tool access to external services |
| Real-time data from services | **MCP Server** | Live connection to databases, APIs, apps |
| Actions in external systems | **MCP Server** | Create, update, delete in connected services |

### Tool Selection Guide

```
Need to extend Claude's knowledge/behavior?
├── Static instructions or templates? → Skill
├── Autonomous multi-step work? → Agent
└── Connect to external service/API? → MCP Server

Need to interact with external system?
├── Read/write data? → MCP Server
├── One-time API call? → Skill (with fetch) or MCP Server
└── Complex workflow automation? → MCP Server + Agent
```

### Overlap Analysis (Last checked: 2024-12-22)

**Skills — No conflicts found.**

Checked pairs:
- `skill-assistant` vs `skill-creator` — **Complementary**, not conflicting. One finds/installs skills, the other guides creation.

**Agents — 1 installed (code-reviewer from obra/superpowers).**

**MCP Servers — No conflicts found.**
- `notion` — Notion workspace integration (search, read, create, update pages/databases)
- `n8n-mcp` — n8n workflow automation (create, manage, execute workflows)

### Bundled Items

Some skills/agents contain sub-items in nested folders:

| Bundle | Contains |
|--------|----------|
| `skills/document-skills/` | `docx/`, `pdf/`, `pptx/`, `xlsx/` |

Each sub-folder has its own `SKILL.md` with type-specific instructions.

### Installation Rules

Applies to skills, agents, and MCP servers:

1. **Avoid duplicates** — Before installing, check if a similar one exists
2. **Clean install preferred** — When updating, delete the old directory first:
   ```bash
   rm -rf skills/my-skill && cp -R /source/my-skill skills/
   rm -rf agents/my-agent && cp -R /source/my-agent agents/
   ```
3. **Naming convention** — Use kebab-case for directories (e.g., `my-skill-name`, `my-agent-name`)
4. **Check for overlap** — If two items do similar things, keep only one or ensure they handle distinct use cases
5. **MCP server config** — Store in `.mcp.json` (project-level, gitignored for API keys) or `~/.claude.json` (user-level)

### Priority & Conflicts

When multiple skills/agents could handle a request:
- Skills: Both loaded into context (may cause unpredictable behavior if conflicting)
- Agents: User/Claude chooses which to invoke

**Resolution**: Remove duplicates or ensure clear separation of concerns

### Scaling Considerations

**Skills:**
| Concern | Impact | Notes |
|---------|--------|-------|
| Context bloat | Medium | More skills loaded = more tokens per request |
| Conflicts | Medium | Similar skills may give contradictory instructions |
| Noise | Low | Wrong skill may activate for your request |
| Maintenance | Low | More to update when things change |

*Skills only load when relevant — unused ones don't cost much.*

**Agents:**
| Concern | Impact | Notes |
|---------|--------|-------|
| Minimal overhead | Very Low | Only run when explicitly called |

*Install freely — agents are just available options until invoked.*

**MCP Servers:**
| Concern | Impact | Notes |
|---------|--------|-------|
| Startup time | Low-Medium | Each server initializes when Claude Code starts |
| Resource usage | Medium | Running processes/connections during session |
| API costs | Varies | Some services charge per call |
| Credential management | Medium | More API keys to secure/rotate |
| Rate limits | Varies | External APIs may throttle |

*Be selective with MCP servers — each one is an active dependency.*

### MCP Server Types

| Type | How it works | Example |
|------|--------------|---------|
| **stdio** | Local process spawned when Claude Code starts, killed on exit | `n8n-mcp` |
| **http** | Remote server, connection made on demand, no local process | `notion` |

MCP servers are **not always running** — they start with Claude Code sessions and can be enabled/disabled per project.

---

## Directory Structure

```
~/.claude/
├── skills/     → symlink to this project's skills/
├── agents/     → symlink to this project's agents/
└── ...

/Users/royengel/Projects/Claude Code/claude-customizations/
├── skills/           # All installed skills
├── agents/           # Custom agents
├── commands/         # Slash commands (symlinked to ~/.claude/commands)
├── mcp/              # MCP server docs/configs
├── CLAUDE.md         # Auto-loaded by Claude Code
├── PREFERENCES.md    # This file (referenced by CLAUDE.md)
└── .mcp.json         # MCP server config (gitignored)
```

---

## Session Management

### Resuming Conversations

| Command | Purpose |
|---------|---------|
| `claude --continue` | Resume most recent conversation in current directory |
| `claude --resume` | Interactive picker for all sessions |
| `claude --resume <name>` | Resume specific named session |

### Best Practice

Always name important sessions with `/rename <name>` for easy retrieval later.

---

## Skills vs Agents

| Aspect | Skills | Agents |
|--------|--------|--------|
| What they are | Markdown prompts/instructions | Subprocesses via Task tool |
| Location | `skills/` directory | Built-in or `agents/` directory |
| Invocation | `/skill-name` or auto-matched | Task tool with `subagent_type` |
| Context | Shares main conversation | Isolated subprocess |
| Use case | Reusable prompts, domain knowledge | Multi-step autonomous tasks |

---

## Installed MCP Servers

| Server | Purpose | Capabilities |
|--------|---------|--------------|
| `notion` | Notion workspace | Search, fetch, create/update pages & databases, manage comments |
| `n8n-mcp` | Workflow automation | Create/manage n8n workflows, search nodes, deploy templates, execute workflows |

### MCP Server Selection

| Need | Server |
|------|--------|
| Note-taking, documentation, databases | `notion` |
| Workflow automation, integrations | `n8n-mcp` |
| Both systems connected | Use n8n workflow with Notion nodes |

---

## Skill & Agent Resources

| Resource | Description |
|----------|-------------|
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | Curated skills collection (installed) |
| [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | Curated list with community skills |
| [obra/superpowers](https://github.com/obra/superpowers) | 14 skills + 1 agent: TDD, debugging, git workflows, code review (installed) |
| [K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills) | 125+ scientific skills: drug discovery, bioinformatics, ML |
| [anthropics/skills](https://github.com/anthropics/skills) | Official Anthropic skills repository |
| [BehiSecc/awesome-claude-skills](https://github.com/BehiSecc/awesome-claude-skills) | Curated list with 50+ skills |
| [zxkane/aws-skills](https://github.com/zxkane/aws-skills) | AWS skills: CDK, serverless, cost ops (installed) |
| [michalparkola/tapestry-skills](https://github.com/michalparkola/tapestry-skills-for-claude-code) | YouTube transcripts, article extraction (installed) |

---

## Installed Skills

Source: [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills), [alonw0/web-asset-generator](https://github.com/alonw0/web-asset-generator)

### By Category

**Development**
- artifacts-builder
- changelog-generator
- mcp-builder
- skill-creator
- webapp-testing

**Documents**
- document-skills (docx, pdf, pptx, xlsx)

**Business**
- brand-guidelines
- competitive-ads-extractor
- domain-name-brainstormer
- internal-comms
- lead-research-assistant

**Writing**
- content-research-writer
- meeting-insights-analyzer

**Creative**
- canvas-design
- image-enhancer
- slack-gif-creator
- theme-factory
- video-downloader
- web-asset-generator

**Productivity**
- file-organizer
- invoice-organizer
- raffle-winner-picker

**Meta**
- skill-assistant
- skill-share
- template-skill
- using-superpowers
- writing-skills

**Workflow (from obra/superpowers)**
- brainstorming
- dispatching-parallel-agents
- executing-plans
- writing-plans

**Development Practices (from obra/superpowers)**
- test-driven-development
- systematic-debugging
- verification-before-completion
- subagent-driven-development

**Code Review (from obra/superpowers)**
- requesting-code-review
- receiving-code-review

**Git (from obra/superpowers)**
- using-git-worktrees
- finishing-a-development-branch

**AWS (from zxkane/aws-skills)**
- aws-agentic-ai
- aws-cdk-development
- aws-cost-operations
- aws-serverless-eda

**Media**
- youtube-transcript

**Learning**
- ship-learn-next

**Move/Blockchain**
- move-code-quality-skill

**Git Automation**
- git-pushing

---

## Changelog

| Date | Change |
|------|--------|
| 2024-12-22 | Initial document created |
| 2024-12-22 | Installed 23 skills from awesome-claude-skills |
| 2024-12-22 | Set up symlinks for ~/.claude/skills and ~/.claude/agents |
| 2024-12-22 | Unified skills & agents management with decision criteria |
| 2024-12-22 | Added MCP servers to tool selection framework (notion, n8n-mcp) |
| 2024-12-22 | Added scaling considerations and MCP server types (stdio vs http) |
| 2024-12-22 | Added skill resources section; installed web-asset-generator |
| 2024-12-22 | Installed obra/superpowers (14 skills + code-reviewer agent) |
| 2024-12-22 | Installed commands: /brainstorm, /write-plan, /execute-plan |
| 2024-12-22 | Installed youtube-transcript and aws-skills (4 AWS skills) |
| 2024-12-22 | Fixed obra/superpowers installation; added ship-learn-next, move-code-quality-skill, git-pushing |
