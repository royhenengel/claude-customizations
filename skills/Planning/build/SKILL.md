---
name: build
description: Execute plan with subagent delegation and deviation rules
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Task, TodoWrite, AskUserQuestion
---

# /build - Execute Implementation Plan

## Phase Detection

1. Read the feature STATE.md to determine current build phase
2. Based on the phase, read ONLY the relevant workflow file using the Read tool

## Phase Routing

| Condition | Phase File | When |
|-----------|-----------|------|
| Stage is ready/planning, OR stage is building with no tasks checked | build-setup.md | Starting or restarting a build |
| Stage is building with tasks in progress | build-execute.md | Actively executing tasks |
| Stage is building with all tasks checked | build-complete.md | All tasks done, finalizing |

Phase files are at: skills/Planning/my-workflow/workflows/

## Instructions

Read the appropriate phase file and follow it exactly.

CRITICAL: Do NOT read all three phase files. Read only the one matching the current phase.

After completing a phase, re-check STATE.md and transition to the next phase if needed:
- Setup -> Execute (after task list created)
- Execute -> Complete (after all tasks checked)
- Complete -> Done (after SUMMARY.md and finalization)
