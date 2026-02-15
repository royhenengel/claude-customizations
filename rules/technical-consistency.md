# Technical Consistency

**Domain:** Technical decisions - tool selection, MCP servers, installation patterns, and performance optimization.

## Consistency Principle

Follow existing patterns unless a compelling reason exists to deviate. Prefer editing existing skills over creating new ones. Consistency is a consideration, not a hard constraint. Deviation is justified by meaningful improvements in performance, reliability, security, community support, or critical missing features. Minor differences (syntax preferences, slight convenience) do not justify inconsistency.

When deviating: identify the existing pattern, evaluate the trade-off, and document the rationale.

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

Skills and agents load on-demand. Install freely. MCP servers are active dependencies. Be selective.

## Performance Tips

For multi-step data operations across MCP servers, prefer **code-executor's `execute_code` tool** over direct MCP tool calls. Reduces token usage by ~98% by loading schemas on-demand, filtering data in JavaScript, and using native loops instead of chained calls. Use direct MCP calls only for single operations with small responses.

## Documentation

When deviating from an established pattern, document the existing pattern, why the alternative was chosen, and what value it provides.
