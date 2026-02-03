# Automate Stop Implementation Plan

## Objective

Eliminate manual /stop by adding a living `## Current State` section to STATE.md that gets updated during normal workflow operations.

## Context

@planning/specs/automate-stop/SPEC.md
@planning/specs/automate-stop/RESEARCH.md
@skills/my-workflow/workflows/start.md
@skills/my-workflow/workflows/stop.md
@skills/my-workflow/workflows/build.md

## Task Summary

| # | Task | Type | Dependencies | Blocking |
|---|------|------|--------------|----------|
| 1 | Add Current State section to STATE.md template in start.md | auto | - | - |
| 2 | Update build.md to maintain Current State during execution | auto | Task 1 | - |
| 3 | Update start.md to read Current State instead of HANDOFF.md | auto | Task 1 | - |
| 4 | Update plan.md to initialize Current State | auto | Task 1 | - |
| 5 | Deprecate stop.md (convert to optional utility) | auto | Tasks 1-4 | - |
| 6 | Update this project's STATE.md with Current State section | auto | Task 1 | - |
| 7 | Verify end-to-end flow | checkpoint:human-verify | Tasks 1-6 | yes |

## Tasks

### Task 1: Add Current State section to STATE.md template in start.md

**Type**: auto
**Files**: `skills/my-workflow/workflows/start.md`
**Dependencies**: None

**Context**: The STATE.md template in start.md needs a new section for living project state.

**Action**:
Add `## Current State` section after `## Gap Stack` in the STATE.md template:

```markdown
## Current State

**Last Updated**: {timestamp}

### What's Working

(Nothing verified yet)

### What's Not Working

(No issues identified)

### Next Steps

1. (Determined during /plan or /build)

### Open Questions

(None)
```

**Verify**: Read start.md and confirm template includes Current State section
**Done**: STATE.md template contains Current State section with all subsections

---

### Task 2: Update build.md to maintain Current State during execution

**Type**: auto
**Files**: `skills/my-workflow/workflows/build.md`
**Dependencies**: Task 1

**Context**: build.md needs to update Current State as work progresses.

**Action**:
1. After each task completion, add instruction to update "What's Working" if task verified something works
2. When issues are discovered (Step 7 gap handling), update "What's Not Working"
3. After completing a task, update "Next Steps" with the next task
4. Update "Last Updated" timestamp when any Current State field changes

Add to Step 6 (Execute Task) completion logic:
```markdown
After task verification passes:
- Update `## Current State > What's Working` with what was verified
- Update `## Current State > Next Steps` with next task
- Update `## Current State > Last Updated` timestamp
```

Add to Step 7 (Gap Handling):
```markdown
When a gap/issue is identified:
- Update `## Current State > What's Not Working` with the issue
```

**Verify**: Read build.md and confirm Current State update instructions exist
**Done**: build.md contains instructions to update Current State during execution

---

### Task 3: Update start.md to read Current State instead of HANDOFF.md

**Type**: auto
**Files**: `skills/my-workflow/workflows/start.md`
**Dependencies**: Task 1

**Context**: start.md currently checks for HANDOFF.md. It should read Current State from STATE.md instead.

**Action**:
1. Remove HANDOFF.md detection logic from Step 1
2. Change "If HANDOFF.md exists" to "If Current State has content"
3. Show Current State summary instead of handoff summary
4. Remove "Delete HANDOFF.md after resuming" instructions
5. Keep archive option but for starting fresh (reset Current State)

Update Step 1 to check STATE.md Current State section instead of HANDOFF.md file.

**Verify**: Read start.md and confirm no HANDOFF.md references in resume logic
**Done**: start.md reads Current State from STATE.md for resume flow

---

### Task 4: Update plan.md to initialize Current State

**Type**: auto
**Files**: `skills/my-workflow/workflows/plan.md`
**Dependencies**: Task 1

**Context**: When a new plan is created, Current State should be initialized with Next Steps.

**Action**:
In Step 9 (Update STATE.md), add:
```markdown
Update `## Current State`:
- Set "Next Steps" to first task from plan
- Clear "What's Working" and "What's Not Working" for new feature
- Update "Last Updated" timestamp
```

**Verify**: Read plan.md and confirm Current State initialization in Step 9
**Done**: plan.md initializes Current State when creating a new plan

---

### Task 5: Deprecate stop.md (convert to optional utility)

**Type**: auto
**Files**: `skills/my-workflow/workflows/stop.md`
**Dependencies**: Tasks 1-4

**Context**: /stop is no longer needed for normal workflow. Convert to optional utility.

**Action**:
1. Add deprecation notice at top of file
2. Change purpose to "Optional utility to refresh Current State on demand"
3. Remove HANDOFF.md creation logic
4. Convert to a "refresh" command that:
   - Reads current state
   - Asks Claude to summarize/update What's Working and What's Not Working
   - Updates Current State section in STATE.md
5. Update When to Use section to indicate this is optional

**Verify**: Read stop.md and confirm it's marked deprecated with new purpose
**Done**: stop.md is converted to optional refresh utility

---

### Task 6: Update this project's STATE.md with Current State section

**Type**: auto
**Files**: `planning/STATE.md`
**Dependencies**: Task 1

**Context**: Apply the new pattern to this project's STATE.md.

**Action**:
Add `## Current State` section to this project's planning/STATE.md with current values.

**Verify**: Read planning/STATE.md and confirm Current State section exists
**Done**: This project's STATE.md has Current State section

---

### Task 7: Verify end-to-end flow

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Tasks 1-6

**Context**: Verify the new flow works by testing resume behavior.

**Action**:
1. End this session naturally (close Claude Code)
2. Start new session in same project
3. Run /start
4. Verify Current State is shown and resume flow works

**Verify**: User confirms /start correctly reads Current State and offers resume
**Done**: User confirms end-to-end flow works

## Verification

- [ ] STATE.md template includes Current State section
- [ ] build.md updates Current State during execution
- [ ] start.md reads Current State (not HANDOFF.md)
- [ ] plan.md initializes Current State
- [ ] stop.md is deprecated/converted
- [ ] This project's STATE.md has Current State section

## Success Criteria

- No manual /stop needed
- STATE.md always reflects current project state
- /start works by reading STATE.md directly
- Handoff context is useful for resuming work
