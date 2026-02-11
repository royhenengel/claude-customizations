---
description: Execute a PLAN.md file with intelligent segmentation
arguments:
  - name: plan_path
    description: Path to PLAN.md file (e.g., .planning/stages/07-sidebar-reorganization/07-01-PLAN.md)
    required: true
---

Execute the plan at {{plan_path}} using **intelligent segmentation** for optimal quality.

## Process

### 1. Verify plan exists and is unexecuted

```bash
cat {{plan_path}}
ls $(dirname {{plan_path}})/$(basename {{plan_path}} -PLAN.md)-SUMMARY.md 2>/dev/null
```

- If SUMMARY exists: "Plan already executed. Re-run? (yes / no)"
- If plan doesn't exist: Error and exit

### 2. Parse plan and determine execution strategy

Extract sections: `<objective>`, `<execution_context>`, `<context>`, `<tasks>`, `<verification>`, `<success_criteria>`

Analyze checkpoint structure:
```bash
grep "type=\"checkpoint" {{plan_path}}
```

**Strategy A: Fully Autonomous (no checkpoints)**
- Spawn single subagent to execute entire plan
- Subagent reads plan, executes all tasks, creates SUMMARY, commits
- Main context: Orchestration only (~5% usage)

**Strategy B: Segmented Execution (verify-only checkpoints)**
- Parse into segments separated by checkpoints
- If all checkpoints are `checkpoint:human-verify`: segment execution enabled
- Subagents execute autonomous segments, main handles checkpoints

**Strategy C: Decision-Dependent (has decision/action checkpoints)**
- Has `checkpoint:decision` or `checkpoint:human-action` checkpoints
- Following tasks depend on checkpoint outcomes
- Must execute sequentially in main context

### 3. Execute based on strategy

**3A: Fully Autonomous Execution**

Spawn Task tool (subagent_type="general-purpose"):

```
Execute plan at {{plan_path}}

This is a fully autonomous plan (no checkpoints).

- Read the plan for full objective, context, and tasks
- Execute ALL tasks sequentially
- Follow all deviation rules
- Create SUMMARY.md in same directory as PLAN.md
- Update ROADMAP.md plan count
- Commit with format: feat({stage}-{plan}): [summary]
- Report: tasks completed, files modified, commit hash
```

Wait for completion → Done

**3B: Segmented Execution (verify-only checkpoints)**

For each segment (autonomous block between checkpoints):

IF segment is autonomous:
  Spawn subagent:
  ```
  Execute tasks [X-Y] from {{plan_path}}
  Read plan for context and deviation rules.
  DO NOT create SUMMARY or commit.
  Report: tasks done, files modified, deviations
  ```
  Wait for subagent completion
  Capture results

ELSE IF task is checkpoint:
  Execute in main context:
  - Load checkpoint task details
  - Present checkpoint to user (action/verify/decision)
  - Wait for user response
  - Continue to next segment

After all segments complete:
- Aggregate results from all segments
- Create SUMMARY.md with aggregated data
- Update ROADMAP.md
- Commit all changes
- Done

**3C: Decision-Dependent Execution**

Execute in main context:

Read execution context from plan `<execution_context>` section
Read domain context from plan `<context>` section

For each task in `<tasks>`:
  IF type="auto": execute in main, track deviations
  IF type="checkpoint:*": execute in main, wait for user

After all tasks:
- Create SUMMARY.md
- Update ROADMAP.md
- Commit
- Done

### 4. Summary and completion

- Verify SUMMARY.md created
- Verify commit successful
- Present completion message with next steps

## Deviation Rules

During execution, discoveries may require deviation from the plan:

1. **Auto-fix bugs**: If you discover a bug while implementing, fix it. Log in deviations.

2. **Auto-add critical**: If something critical is missing (validation, error handling, security), add it. Log in deviations.

3. **Auto-fix blockers**: If the plan has an error that blocks progress, fix the approach. Log in deviations.

4. **Ask architectural**: If the discovery requires architectural changes or affects other components significantly, STOP and ask.

5. **Log enhancements**: If you see opportunities for improvement that aren't critical, note them in deviations for future consideration. Don't implement.

**Documentation format:**
```markdown
## Deviations

### [Task X]: [Brief title]
**Type**: bug-fix | critical-add | blocker-fix | enhancement-noted
**What**: [What was discovered]
**Action**: [What was done or noted]
**Impact**: [How this affects the plan/codebase]
```

## SUMMARY.md Template

```markdown
# Summary: [Plan Name]

**Plan**: {{plan_path}}
**Executed**: [timestamp]
**Status**: Complete | Partial | Blocked

## Objective
[From plan]

## Completed Tasks
- [x] Task 1: [outcome]
- [x] Task 2: [outcome]
- [ ] Task 3: [blocked - reason]

## Files Modified
- `path/to/file.ts` - [what changed]
- `path/to/new.ts` - [created - purpose]

## Deviations
[Any deviations from plan, using format above]

## Verification Results
- [x] Check 1: passed
- [x] Check 2: passed

## Next Steps
- [What should happen next]

## Commit
`abc1234` - feat(stage-plan): [message]
```

## Critical Rules

- **Read execution_context first**: Always load files from `<execution_context>` section before executing
- **Minimal context loading**: Only read files explicitly mentioned in `<execution_context>` and `<context>` sections
- **All deviations tracked**: Apply deviation rules, document everything in Summary
- **Checkpoints are blocking**: Never skip user interaction for checkpoint tasks
- **Verification is mandatory**: Don't mark complete without running verification checks

## Context Efficiency Target

- Execution context: ~5-7k tokens
- Domain context: ~10-15k tokens
- Total overhead: <30% context, reserving 70%+ for workspace and implementation
