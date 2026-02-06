---
name: map-codebase
description: Analyze existing codebase structure and patterns
---

Map an existing codebase to understand its structure, conventions, and patterns.

## What This Does

1. Detects project type (language, framework)
2. Maps directory structure and entry points
3. Analyzes dependencies and tech stack
4. Identifies patterns and conventions
5. Creates `planning/CODEBASE.md` with findings

## Usage

```
/map-codebase
```

## When to Use

- Joining an existing project
- Before planning changes to unfamiliar code
- Automatically run by `/start` for brownfield projects

## Invocation

Load the my-workflow skill and execute the map-codebase workflow:

```
@skills/Planning/my-workflow/SKILL.md
@skills/Planning/my-workflow/workflows/map-codebase.md

Execute the /map-codebase workflow as documented.
```
