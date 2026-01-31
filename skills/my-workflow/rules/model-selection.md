# Model Selection Guide

## Quick Reference

| Model | Use For | Cost |
|-------|---------|------|
| Haiku 4.5 | Lightweight tasks, workers, pair programming | Lowest |
| Sonnet 4.5 | Default development, orchestration | Medium |
| Opus 4.5 | Deep reasoning, architecture, research | Highest |

## Haiku 4.5

"90% of Sonnet capability at 1/3 cost"

Use for:
- Simple code reviews
- Documentation updates
- Test writing (after design is clear)
- Formatting and linting
- Worker agents in multi-agent systems

## Sonnet 4.5

Default choice for most development.

Use for:
- Feature implementation
- Bug fixing
- Refactoring
- API design
- Multi-file changes

## Opus 4.5

Reserve for high-stakes decisions.

Use for:
- Architecture decisions
- Complex debugging
- Research tasks
- When Sonnet struggles
- Planning large features

## Subagent Model Selection

```yaml
# In agent definition
model: haiku  # For simple workers
model: sonnet # For complex tasks (default)
model: opus   # For deep reasoning
```

Default to haiku for Task tool calls unless task requires deep reasoning.
