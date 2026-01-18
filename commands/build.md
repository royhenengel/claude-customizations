---
description: Execute plan with subagent delegation and deviation rules
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Task, TodoWrite, AskUserQuestion
---

# /build - Execute Implementation Plan

Execute a PLAN.md using subagent delegation for fresh context per task.

## Step 1: Check Prerequisites

Look for a plan file:

```bash
ls planning/specs/*/PLAN.md 2>/dev/null | head -5
```

If no PLAN.md exists:

```text
No implementation plan found.

Run /plan first to create one, or specify a feature:
/build [feature-name]
```

## Step 2: Load the Plan

Read the PLAN.md file and extract:
- Feature name
- Task list with acceptance criteria
- Dependencies between tasks

Update `planning/STATE.md`:
- Stage: building
- Current Focus: {feature-name}

## Step 3: Execute Tasks

For each task in the plan:

1. Mark task as in_progress in TodoWrite
2. Launch developer subagent via Task tool with the task details
3. Wait for completion
4. Verify acceptance criteria met
5. Mark task as completed
6. Update STATE.md progress

## Deviation Rules

Apply these rules during execution:

| Rule | Trigger | Action |
|------|---------|--------|
| Auto-fix bugs | Broken behavior | Fix immediately |
| Auto-add critical | Security/correctness gap | Add immediately |
| Auto-fix blockers | Can't proceed | Fix immediately |
| Ask architectural | Major structural change | STOP and ask user |
| Log enhancements | Nice-to-have idea | Log to BACKLOG.md, continue |

## Step 4: Monitor Context

If context is getting low (you notice performance degrading):
- At ~25% remaining: Mention it
- At ~15% remaining: Offer /stop
- At ~10% remaining: Auto-create handoff

## Step 5: Create Summary

When all tasks complete, create `planning/specs/{feature}/SUMMARY.md`:

```markdown
# Implementation Summary: {Feature Name}

**Completed**: {timestamp}

## Changes Made

{List of files created/modified}

## Tests

{Test results if applicable}

## Notes

{Any implementation notes}
```

## Step 6: Update State and Show Results

Update `planning/STATE.md`:
- Mark feature as complete in Progress
- Update Current Focus

Show:

```text
Build complete!

Feature: {feature-name}
Tasks completed: {count}
Files changed: {count}

Summary: planning/specs/{feature}/SUMMARY.md

Next steps:
- Test the implementation
- Run /plan for the next feature
- Run /stop to end session
```
