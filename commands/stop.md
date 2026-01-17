---
description: Create handoff document and pause work cleanly
---

Create a handoff document capturing current state for future continuation.

## What This Does

1. Gathers current state (git, STATE.md, todos)
2. Creates comprehensive HANDOFF.md
3. Updates STATE.md to stopping stage
4. Provides resume instructions

## When to Use

- End of work session
- Need to switch contexts
- Context getting full (auto-triggered at 10%)
- Before any potentially disruptive action

## Usage

```
/stop
```

## Context Triggers

| Context Level | Action |
|---------------|--------|
| 25% remaining | Mention context getting full |
| 15% remaining | Pause, offer /stop |
| 10% remaining | Auto-create handoff |

## Invocation

Load the my-workflow skill and execute the stop workflow:

```
@skills/my-workflow/SKILL.md
@skills/my-workflow/workflows/stop.md

Execute the /stop workflow as documented.
```

## Fallback (No Planning Structure)

If no `planning/` exists, create minimal handoff:

```bash
mkdir -p planning
# Write HANDOFF.md with just git state and notes
```
