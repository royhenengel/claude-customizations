---
description: Execute plan with subagent delegation and deviation rules
---

Execute a PLAN.md using subagent delegation for fresh context per task.

## What This Does

1. Checks prerequisites (PLAN.md exists)
2. Loads plan as execution prompt
3. Executes each task via developer subagent
4. Applies deviation rules automatically
5. Monitors context health (offers /stop at 15%)
6. Creates SUMMARY.md when complete

## Usage

```
/build
/build [feature-name]
```

## Deviation Rules

| Rule | Trigger | Action |
|------|---------|--------|
| Auto-fix bugs | Broken behavior | Fix immediately |
| Auto-add critical | Security/correctness gap | Add immediately |
| Auto-fix blockers | Can't proceed | Fix immediately |
| Ask architectural | Major structural change | STOP and ask |
| Log enhancements | Nice-to-have idea | Log, continue |

## Invocation

Load the my-workflow skill and execute the build workflow:

```
@skills/my-workflow/SKILL.md
@skills/my-workflow/workflows/build.md

Execute the /build workflow as documented.
```
