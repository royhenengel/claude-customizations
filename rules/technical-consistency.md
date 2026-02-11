# Technical Consistency

**Domain:** Technical decisions - tool selection, MCP servers, installation patterns, and performance optimization.

## Design Philosophy

Every customization is a self-contained, reusable unit with a single clear responsibility. No cross-dependencies unless explicitly documented.

Documentation is the source of truth. Every skill needs complete SKILL.md frontmatter, every agent needs a descriptive .md file.

YAGNI applies. Prefer editing existing skills over creating new ones. Each skill should do one thing well.

## Consistency Principle

Consistency reduces cognitive load and maintenance burden. When adding new components, existing patterns are the default starting point.

Technical consistency is a **consideration**, not a hard constraint. The goal is informed decision-making, not uniformity for its own sake.

## When Evaluating Options

1. **Identify the existing pattern** (if one exists)
2. **Surface consistency as a factor** in the comparison
3. **Evaluate if alternatives bring additional value** that justifies deviation
4. **Document the decision** with rationale

## Decision Framework

| Scenario | Action |
|----------|--------|
| Existing pattern works well, no compelling alternative | Follow the pattern |
| Alternative offers meaningful value | Evaluate trade-off, document decision |
| No existing pattern | Establish one thoughtfully |

## What Counts as "Meaningful Value"

Deviation may be justified when an alternative provides:

- Significantly better performance or reliability
- Critical features not available in the consistent option
- Substantially higher community adoption or support
- Better long-term maintenance outlook
- Security or compliance advantages

Minor differences (syntax preferences, slight convenience) typically don't justify inconsistency.

## Hard Rules

These are non-negotiable constraints:

| Rule               | Requirement                                                                      |
|--------------------|----------------------------------------------------------------------------------|
| MCP server startup | All MCP servers MUST be `"disabled": true` unless explicitly specified otherwise |
| MCP server loading | Use code-executor for lazy loading via ToolSearch                                |

## MCP Server Selection Criteria

| Priority | Criterion | Rationale |
|----------|-----------|-----------|
| 1 | npm package available | Consistency with existing servers |
| 2 | Active maintenance | Security, bug fixes |
| 3 | Community adoption (stars) | Validation, support |
| 4 | No API keys required | Simpler setup |
| 5 | Feature completeness | Capability |

## Tool Selection Guide

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

## Installation Rules

Applies to skills, agents, and MCP servers:

1. **Avoid duplicates** - Before installing, check if a similar one exists
2. **Clean install preferred** - When updating, delete the old directory first
3. **Naming convention** - Use kebab-case for directories (e.g., `my-skill-name`)
4. **Check for overlap** - If two items do similar things, keep only one or ensure distinct use cases
5. **MCP server config** - Store in `.mcp.json` (project-level) or `~/.claude.json` (user-level)

## Scaling Considerations

- **Skills** only load when relevant. Unused ones don't cost much. Install freely.
- **Agents** are just available options until invoked. Install freely.
- **MCP Servers** are active dependencies. Be selective.

## Performance Tips

For multi-step data operations across MCP servers (querying, filtering, aggregating), prefer using **code-executor's `execute_code` tool** instead of calling MCP tools directly. This reduces token usage by ~98% by:

- Loading tool schemas on-demand instead of all upfront
- Filtering/transforming data in JavaScript before returning to context
- Using native loops instead of chained tool calls

Example use cases:

- Query 100 Notion resources, filter to 5 videos -> use code-executor
- Search filesystem then cross-reference with memory -> use code-executor
- Single tool call with small response -> call MCP tool directly

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

## Documentation

When deviating from an established pattern, document in RESEARCH.md:

- What pattern exists
- Why the alternative was chosen
- What value it provides
