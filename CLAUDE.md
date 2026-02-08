# Claude Customizations

Personal Claude Code customizations - skills, commands, agents, hooks, and plugins that extend Claude's capabilities for specific workflows and preferences.

## Structure

- `skills/` - 33 active SKILL.md files (auto-activate based on context)
- `commands/` - 72 slash command definitions (explicit invocation via `/command-name`)
- `agents/` - 132 subagent definitions (specialized workers via Task tool)
- `hooks/` - Event-driven behaviors
- `mcp/` - MCP server configurations
- `planning/` - Project planning, state, and specifications
- `archive/` - Archived/deprecated items

This repository is symlinked to `~/.claude/` for automatic availability.

## Core Principles

When working in this repository, follow these principles:

1. **Skill-First Design**: Every customization is a self-contained, reusable unit with a single clear responsibility. No cross-dependencies unless explicitly documented.

2. **Documentation-Driven**: Documentation is the source of truth. Every skill needs complete SKILL.md frontmatter, every agent needs a descriptive .md file.

3. **Simplicity Over Complexity**: YAGNI applies. Prefer editing existing skills over creating new ones. Each skill should do one thing well.

4. **Version Control Discipline**: This repo is symlinked to ~/.claude/, so changes are immediately live. Use branches for experimental changes.

## Quality Standards

### Skills

- Valid SKILL.md frontmatter (name, description, triggers)
- Clear invocation patterns documented
- No hardcoded paths
- Tested with at least one real-world scenario

### Agents

- Defined purpose and scope
- Specified model preference if needed (haiku/opus)
- Clear input/output expectations

### Code Quality

- No secrets or credentials in files
- Follow existing patterns in the codebase
- Keep files under 500 lines where possible

## Development Workflow

**Adding Skills**: Create `skills/my-skill/SKILL.md` with proper frontmatter, test locally, then commit.

**Adding Agents**: Create `agents/my-agent.md` with frontmatter including model/description.

**Adding Commands**: Create `commands/my-command.md` following existing patterns.

## Behavioral Rules

### Uncertainty Protocol

When performing bulk operations or making decisions that affect multiple items:

- STOP and flag uncertain items BEFORE making any changes
- Never assume based on surface-level patterns (keywords, names, etc.)
- Present uncertain items to user for clarification first
- Act only after receiving explicit confirmation
- If more than 20% of items are uncertain, question whether the approach itself is correct

This applies universally: code changes, file organization, data categorization, refactoring, or any batch operation.

### Performance Tips

For multi-step data operations across MCP servers (querying, filtering, aggregating), prefer using **code-executor's `execute_code` tool** instead of calling MCP tools directly. This reduces token usage by ~98% by:

- Loading tool schemas on-demand instead of all upfront
- Filtering/transforming data in JavaScript before returning to context
- Using native loops instead of chained tool calls

Example use cases:

- Query 100 Notion resources, filter to 5 videos → use code-executor
- Search filesystem then cross-reference with memory → use code-executor
- Single tool call with small response → call MCP tool directly

## Planning

For detailed project planning, specifications, and current state:

- [planning/OVERVIEW.md](planning/OVERVIEW.md) - Project vision, scope, and governance
- [planning/STATE.md](planning/STATE.md) - Current project state and progress
- [planning/BACKLOG.md](planning/BACKLOG.md) - Improvements and technical debt
