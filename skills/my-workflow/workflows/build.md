# Workflow: /build

## Purpose

Execute the plan with subagent delegation and deviation rules.

## When to Use

- After `/plan` has created a PLAN.md
- Plan has been reviewed and approved
- Ready to implement

## Entry Point

User invokes `/build` or asks to execute/implement the plan.

## Steps

### 1. Check Prerequisites

```bash
ls planning/STATE.md 2>/dev/null || echo "No STATE.md - run /start first"
ls planning/specs/*/PLAN.md 2>/dev/null || echo "No PLAN.md - run /plan first"
```

If no plan exists, suggest running `/plan` first.

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
| **6. Gap detected** | Prerequisite missing / plan needs modification | Invoke Gap Protocol (see below) |

**Rules 1-3, 5**: No user intervention needed.
**Rule 4**: Requires user decision before proceeding.
**Rule 6**: Preserves context, modifies plan, then returns to original task.

### 6a. Gap Protocol

When Rule 6 triggers (prerequisite missing or plan needs modification), follow this protocol to maintain direction:

#### Step 1: ASSESS

Determine if this is an in-scope fix (Rules 1-5) or a plan-modifying gap:

- **In-scope?** → Apply Rules 1-5, continue
- **Plan-modifying?** → Continue to Step 2

A gap is plan-modifying when:
- A prerequisite is discovered that requires new work before current task can complete
- User requests an addition mid-build that affects the current feature
- A blocker fix reveals additional required changes beyond a quick fix

#### Step 2: PRESERVE

Push context to Gap Stack in STATE.md:

```markdown
## Gap Stack

### Active Gap

**Original Task**: {current task name and number}
**Original Objective**: {what we were trying to achieve}
**Progress Before Gap**: {what's done so far on this task}
**Gap Trigger**: {what was discovered or requested}
**Gap Action**: {what we're doing to address it}
**Inserted At**: {timestamp}

### Gap History

1. {previous gaps this session, if any}
```

#### Step 3: SCOPE

Assess impact on current plan:

- **Different feature?** → Add to BACKLOG.md, pop stack, continue original task
- **New task in current plan?** → Continue to Step 4

#### Step 4: MODIFY

Update PLAN.md:

- Insert new task with marker: `(Added via Gap Protocol)`
- Place it before the blocked task
- Update Task Summary table
- Example: If blocked on Task 3, insert "Task 3a: {gap work} (Added via Gap Protocol)"

#### Step 5: EXECUTE

Complete the gap task. Apply deviation rules recursively (gaps can nest).

#### Step 6: RETURN

After gap task completes, pop context from Gap Stack and display:

```text
═══════════════════════════════════════════════════
GAP RESOLVED - Returning to Original Task
═══════════════════════════════════════════════════

Gap Completed: {description of gap task}
Gap Result: {outcome}

Returning to:
  Task: {original task name}
  Objective: {what we were trying to achieve}
  Progress: {what was done before gap}
  Next Step: {what to do now}

Continuing...
═══════════════════════════════════════════════════
```

Update STATE.md:
- Clear Active Gap section (set to "(None)")
- Add entry to Gap History: `[timestamp] {gap description} - resolved`

### 6b. User Addition Assessment

When user requests an addition mid-build ("also add X", "can you also..."):

**Always show impact before modifying the plan:**

```text
Adding {X} to the current plan would:
- Add ~{N} task(s) to PLAN.md
- Affect: {list affected tasks, if any}

Options:
1. Add to current plan (extends this build)
2. Add to BACKLOG.md (handle in next plan)
3. Create separate plan (parallel feature)

Which would you prefer?
```

Based on user choice:
- **Option 1**: Use Gap Protocol to insert (Step 2-6)
- **Option 2**: Add to BACKLOG.md, continue current task
- **Option 3**: Create new spec directory, continue current task

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
- Run /plan for next feature
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
