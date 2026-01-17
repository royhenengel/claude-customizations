---
description: Initialize project with planning structure and state tracking
---

Initialize a project for workflow-driven development.

## What This Does

1. Checks for existing HANDOFF.md (offers resume)
2. Creates `planning/` directory structure
3. Sets up CLAUDE.md with project context
4. Creates STATE.md with initial state
5. Installs auto-update hook for STATE.md

## Usage

```
/start
/start [project-name]
```

## Invocation

Load the my-workflow skill and execute the start workflow:

```
@skills/my-workflow/SKILL.md
@skills/my-workflow/workflows/start.md

Execute the /start workflow as documented.
```
