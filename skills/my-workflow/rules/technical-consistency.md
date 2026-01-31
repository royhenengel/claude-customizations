# Technical Consistency

## Principle

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

## Documentation

When deviating from an established pattern, document in RESEARCH.md:

- What pattern exists
- Why the alternative was chosen
- What value it provides
