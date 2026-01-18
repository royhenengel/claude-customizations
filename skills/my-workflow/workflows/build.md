# Workflow: /build

## Purpose

Execute the plan with subagent delegation and deviation rules.

## When to Use

- After `/design` has created a PLAN.md
- Plan has been reviewed and approved
- Ready to implement

## Entry Point

User invokes `/build` or asks to execute/implement the plan.

## Steps

### 1. Check Prerequisites

```bash
ls planning/STATE.md 2>/dev/null || echo "No STATE.md - run /start first"
ls planning/specs/*/PLAN.md 2>/dev/null || echo "No PLAN.md - run /design first"
```

If no plan exists, suggest running `/design` first.

### 2. Identify Plan to Execute

If multiple plans exist:
```
Found plans:
1. planning/specs/user-auth/PLAN.md
2. planning/specs/api-routes/PLAN.md

Which plan should I execute?
```

### 3. Load Plan as Execution Prompt

Read the PLAN.md completely. It IS the execution prompt.

Extract:
- Objective
- Context files (read all @references)
- Tasks with verification criteria
- Success criteria

### 4. Update STATE.md

```markdown
**Stage**: building
**Last Updated**: {timestamp}

## Current Focus

Executing {feature} PLAN.md

## Progress

- [x] {Feature} designed
- [ ] Task 1: {description}
- [ ] Task 2: {description}
- [ ] {Feature} complete
```

### 5. Execute Tasks via Subagent

For each task in PLAN.md:

**Launch Task tool with developer subagent:**

```
Execute Task {N} from the plan:

Objective: {task objective}
Files: {files to modify}
Action: {what to do}
Verify: {verification steps}
Done when: {completion criteria}

Context:
{Paste relevant context from PLAN.md @references}

Apply deviation rules during execution:
1. Auto-fix bugs - fix immediately, note in response
2. Auto-add critical - security/correctness gaps, fix immediately
3. Auto-fix blockers - can't proceed, fix immediately
4. Ask about architectural - STOP and report back for decision
5. Log enhancements - add to BACKLOG.md, continue with task
```

**After each task completes:**
- Update STATE.md progress
- Verify task completion criteria
- Note any deviations

### 6. Apply Deviation Rules

During execution, handle discoveries automatically:

| Rule | Trigger | Action |
|------|---------|--------|
| **1. Auto-fix bugs** | Broken behavior found | Fix immediately, note in STATE.md |
| **2. Auto-add critical** | Security/correctness gap | Add immediately, note in STATE.md |
| **3. Auto-fix blockers** | Can't proceed | Fix immediately, note in STATE.md |
| **4. Ask architectural** | Major structural change | STOP. Ask user for decision. |
| **5. Log enhancements** | Nice-to-have idea | Append to BACKLOG.md under appropriate category, continue |

**Rules 1-3, 5**: No user intervention needed.
**Rule 4 only**: Requires user decision before proceeding.

### 7. Monitor Context Health

Watch for context filling:

| Context Level | Action |
|---------------|--------|
| **50%** | Note that context is growing |
| **25% remaining** | Mention context getting full |
| **15% remaining** | Pause, offer `/stop` handoff |
| **10% remaining** | Auto-create handoff, stop |

```
Context is at ~{X}% remaining.

Options:
1. Continue (tasks {remaining} left)
2. Stop now and create handoff (/stop)

I recommend {recommendation based on remaining work}.
```

### 8. Verify Completion

After all tasks complete:

- Run verification steps from PLAN.md
- Check success criteria
- Confirm all tests pass (if applicable)

### 9. Create SUMMARY.md

Document what was built:

```markdown
# {Feature} Implementation Summary

**Completed**: {timestamp}
**Plan**: planning/specs/{feature}/PLAN.md

## What Was Built

{Description of implemented feature}

## Tasks Completed

- [x] Task 1: {description} - {outcome}
- [x] Task 2: {description} - {outcome}

## Deviations

| Rule | What Happened | Resolution |
|------|---------------|------------|
| {rule} | {discovery} | {action taken} |

## Verification

- [x] {Verification 1} - PASSED
- [x] {Verification 2} - PASSED

## Files Changed

- `path/to/file.ts` - {what changed}
- `path/to/other.ts` - {what changed}

## Next Steps

- {Any follow-up work identified}
- {Enhancements logged for later}
```

Write to `planning/specs/{feature}/SUMMARY.md`.

### 10. Update STATE.md

```markdown
**Stage**: building (or stopping if done)
**Last Updated**: {timestamp}

## Current Focus

{Feature} implementation complete

## Progress

- [x] {Feature} designed
- [x] {Feature} implemented
- [x] {Feature} verified

## Decisions

- {Any decisions made during build}

## Notes

- {Any discoveries during build}
- See BACKLOG.md for logged enhancements
```

### 11. Completion Message

```
Build complete!

Implemented: {feature name}
Tasks: {N} completed
Deviations: {N} (see SUMMARY.md)

Created:
- planning/specs/{feature}/SUMMARY.md

Next steps:
- Review the changes
- Run /stop if done for now
- Run /design for next feature
```

## Subagent Execution Pattern

Each task runs in fresh subagent context:

```
Main conversation (orchestration)
    |
    +-- Task 1 --> [developer subagent] --> result
    |                   (fresh 200k context)
    |
    +-- Task 2 --> [developer subagent] --> result
    |                   (fresh 200k context)
    |
    +-- Task 3 --> [developer subagent] --> result
                        (fresh 200k context)
```

Benefits:
- Each task has full context capacity
- No degradation from accumulated work
- Clean verification per task

## Integration Flow

```
/build invoked
    |
    v
Check prerequisites (PLAN.md exists?)
    |
    v
Load PLAN.md as execution prompt
    |
    v
Update STATE.md (stage: building)
    |
    v
For each task:
    +-- Launch subagent
    +-- Apply deviation rules
    +-- Update progress in STATE.md
    +-- Check context health
    |
    v
Verify completion (success criteria)
    |
    v
Create SUMMARY.md
    |
    v
"Build complete! What's next?"
```
