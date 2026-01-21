# My-Workflow Complete Test Scenario

## Purpose

This document defines a **greenfield project test scenario** to validate all aspects of the my-workflow skill: `/start`, `/plan`, `/build`, `/stop`, and `/brainstorm`.

## Test Project: "TaskPulse"

A minimal CLI task tracker with time tracking - small enough to complete in one session, complex enough to exercise all workflow features.

---

## Phase 1: /start (Initialization)

### Test Actions

1. Create empty directory: `~/test-projects/taskpulse/`
2. Navigate to directory
3. Run `/start`

### Expected Behavior

| Step | Expected Outcome | Verify |
|------|-----------------|--------|
| Directory detection | Recognizes greenfield (no existing code) | No CODEBASE.md created |
| Structure creation | Creates `planning/` with all required files | `ls planning/` shows OVERVIEW.md, CLAUDE.md, STATE.md, BACKLOG.md |
| Hook installation | Creates `.claude/hooks.json` with state-update hook | File exists with correct content |
| OVERVIEW.md guidance | Asks ONE question at a time about project vision | Questions are sequential, not batched |
| State update | STATE.md shows `Stage: starting → planning` | Check STATE.md content |

### OVERVIEW.md Test Responses

When prompted, provide these answers:

1. **What problem does this solve?**
   "I forget what I'm working on and lose track of time spent on tasks"

2. **Who is the target user?**
   "Solo developers and freelancers who bill by the hour"

3. **What's the core experience?**
   "Start a task, work on it, stop it - automatically track time"

4. **What's out of scope?**
   "No GUI, no cloud sync, no team features - CLI only, local storage"

### Success Criteria

- [ ] `planning/` directory exists with all 4 core files
- [ ] `.claude/hooks.json` installed
- [ ] OVERVIEW.md populated via guided questions
- [ ] STATE.md shows correct stage
- [ ] No CODEBASE.md (greenfield detection worked)

---

## Phase 2: /brainstorm (Optional - Test Standalone)

### Test Actions

1. Say: "I'm not sure how to structure the time tracking - should it be event-based or polling?"
2. Run `/brainstorm`

### Expected Behavior

| Step | Expected Outcome | Verify |
|------|-----------------|--------|
| One-question pattern | Asks ONE clarifying question, waits for answer | Not batched questions |
| Approach proposals | Presents 2-3 distinct approaches with tradeoffs | Clear differentiation |
| Incremental design | Refines based on answers, converges to recommendation | Design evolves |
| Output | Creates/updates SPEC.md and RESEARCH.md | Files reflect discussion |

### Test Responses

1. **Q: What's your preference between simplicity and accuracy?**
   "Accuracy - I need to bill clients precisely"

2. **Q: Do you need retroactive time adjustments?**
   "Yes, sometimes I forget to start the timer"

### Success Criteria

- [ ] Questions asked one at a time
- [ ] 2-3 approaches presented with clear tradeoffs
- [ ] Design converged to recommendation
- [ ] SPEC.md updated with time tracking requirements
- [ ] RESEARCH.md documents decision rationale

---

## Phase 3: /plan (Feature Planning)

### Test Actions

1. Say: "Let's plan the core feature: start/stop task tracking with time persistence"
2. Run `/plan`

### Expected Behavior

| Step | Expected Outcome | Verify |
|------|-----------------|--------|
| Backlog check | Checks BACKLOG.md for related items | Mentions backlog (even if empty) |
| Feature directory | Creates `planning/specs/task-tracking/` | Directory exists |
| SPEC.md creation | Requirements with `[NEEDS CLARIFICATION]` markers if any | Check for markers |
| RESEARCH.md | Documents tech decisions (storage format, CLI framework) | Alternatives considered |
| PLAN.md | Executable tasks with types, dependencies, verification | Task table + detailed tasks |
| CLAUDE.md | Cascading context file in feature directory | References parent docs |

### Deliberate Clarification Test

When SPEC.md is created, it should ask about:
- "Should completed tasks be archived or deleted?"
- "What time precision? Seconds or minutes?"

Provide answers:
- "Archive completed tasks to a separate file"
- "Minute precision is fine"

### Expected PLAN.md Structure

```
## Task Summary
| # | Task | Type | Dependencies | Blocking |
| 1 | Create data models | auto | - | - |
| 2 | Implement storage layer | auto | 1 | - |
| 3 | Build CLI commands | auto | 2 | - |
| 4 | Write tests | auto | 1 | - |  <-- TDD: tests before/parallel to impl
| 5 | Integration test | checkpoint:human-verify | 3,4 | yes |
| 6 | Update documentation | auto | 5 | - |
```

### Success Criteria

- [ ] Feature directory created with all 4 files (CLAUDE.md, SPEC.md, RESEARCH.md, PLAN.md)
- [ ] SPEC.md has clear requirements (clarifications resolved)
- [ ] RESEARCH.md shows considered alternatives
- [ ] PLAN.md has task table + detailed tasks
- [ ] Tasks have correct types (auto, checkpoint:human-verify)
- [ ] Dependencies are logical
- [ ] TDD pattern evident (tests alongside/before implementation)

---

## Phase 4: /build (Execution)

### Test Actions

1. Run `/build`
2. Let it execute tasks
3. Introduce deliberate scenarios (see below)

### Scenario A: Normal Execution

| Step | Expected Outcome | Verify |
|------|-----------------|--------|
| PLAN.md loading | Reads and parses task list | Mentions loading plan |
| Task delegation | Each task runs in subagent | Fresh context per task |
| TDD enforcement | Test tasks execute, RED verified before GREEN | Test failure shown first |
| Progress updates | STATE.md updated as tasks complete | Check STATE.md timestamps |
| Checkpoint handling | Pauses at `checkpoint:human-verify` for approval | Waits for user |

### Scenario B: Deviation Rule Tests

**Trigger each rule during execution:**

| Rule | How to Trigger | Expected Response |
|------|----------------|-------------------|
| Rule 1 (Bug) | Introduce typo in generated code that breaks tests | Fixes immediately, notes in STATE.md |
| Rule 2 (Security) | Ask: "Wait, is the task data sanitized?" | Adds validation without asking |
| Rule 3 (Blocker) | Missing dependency in package.json | Fixes immediately |
| Rule 4 (Major change) | Say: "Actually, let's use SQLite instead of JSON" | STOPS, asks for approval |
| Rule 5 (Nice-to-have) | Say: "It would be cool to add color output" | Adds to BACKLOG.md, continues |
| Rule 6 (Gap) | Design reveals need for config file not in plan | Gap Protocol activates |

### Scenario C: Gap Protocol Test

When Rule 6 triggers:

1. **PRESERVE**: Check STATE.md Gap Stack has current context
2. **SCOPE**: Watch for assessment output
3. **MODIFY**: PLAN.md updated with new task marked "Added via Gap Protocol"
4. **EXECUTE**: Gap task completes
5. **RETURN**: Stack popped, reminder shown, original task resumes

### Scenario D: Context Monitoring

If session runs long:

| Threshold | Expected Behavior |
|-----------|-------------------|
| 25% remaining | Mentions context health |
| 15% remaining | Offers `/stop` |
| 10% remaining | Auto-initiates handoff |

### Scenario E: Checkpoint Types

| Checkpoint | How to Test | Expected |
|------------|-------------|----------|
| `human-verify` | Reach task 5 | Pauses, shows output, asks approval |
| `human-action` | Add deploy task | Pauses, gives instructions, waits |
| `decision` | Add task with 2 options | Presents choices, waits for selection |

### Success Criteria

- [ ] All auto tasks complete successfully
- [ ] Subagent pattern used (fresh context per task)
- [ ] TDD RED→GREEN→REFACTOR observed
- [ ] STATE.md updated continuously
- [ ] Rule 1-3 handled automatically without asking
- [ ] Rule 4 stopped and asked
- [ ] Rule 5 added to BACKLOG.md
- [ ] Rule 6 Gap Protocol executed correctly
- [ ] Checkpoints paused correctly
- [ ] SUMMARY.md created on completion

---

## Phase 5: /stop (Handoff)

### Test Actions

1. During `/build` (or after), run `/stop`
2. Verify HANDOFF.md content
3. Start new session to test resume

### Expected HANDOFF.md Content

```markdown
# Handoff: TaskPulse

## Current State
**Status**: Working / Not Working
**Stage**: building (task 4 of 6 complete)

## What's Working
- Data models created and tested
- Storage layer functional
- ...

## What's Not Working
- CLI commands incomplete
- ...

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| JSON storage | Simpler than SQLite for MVP |
| Click for CLI | Better than argparse for subcommands |

## Progress
### Completed
- [x] Task 1: Data models
- [x] Task 2: Storage layer
- [x] Task 3: Tests for models
- [x] Task 4: Tests for storage

### Remaining
- [ ] Task 5: CLI commands
- [ ] Task 6: Integration test

## Next Steps
1. Resume `/build` - will continue from task 5
2. Implement CLI commands (start, stop, status, list)
3. Run integration test

## Open Questions
- Should `list` show archived tasks by default?

## Files Changed
- `src/models.py` (created)
- `src/storage.py` (created)
- `tests/test_models.py` (created)
- `tests/test_storage.py` (created)
```

### Success Criteria

- [ ] HANDOFF.md is comprehensive
- [ ] Current state accurate (working/not working)
- [ ] Decisions documented with rationale
- [ ] Progress shows completed vs remaining
- [ ] Next steps are resumable instructions
- [ ] Files changed listed

---

## Phase 6: Resume Test (/start with HANDOFF.md)

### Test Actions

1. Start NEW Claude session
2. Navigate to `~/test-projects/taskpulse/`
3. Run `/start`

### Expected Behavior

| Step | Expected Outcome | Verify |
|------|-----------------|--------|
| HANDOFF detection | Recognizes HANDOFF.md exists | Mentions resuming |
| Context loading | Reads HANDOFF.md, STATE.md | Shows current state |
| Resume offer | Offers to continue where left off | Doesn't restart from scratch |
| State restoration | Correct stage and progress shown | Matches handoff |

### Success Criteria

- [ ] HANDOFF.md detected
- [ ] Resume offered (not fresh start)
- [ ] Context correctly restored
- [ ] Can continue `/build` from where stopped

---

## Complete Test Checklist

### /start
- [ ] Greenfield detection (no CODEBASE.md)
- [ ] Directory structure creation
- [ ] Hook installation
- [ ] One-question-at-a-time OVERVIEW.md
- [ ] STATE.md initialization

### /brainstorm
- [ ] One-question pattern
- [ ] 2-3 approaches with tradeoffs
- [ ] Incremental refinement
- [ ] SPEC.md + RESEARCH.md output

### /plan
- [ ] Backlog check
- [ ] Feature directory creation
- [ ] SPEC.md with clarification markers
- [ ] RESEARCH.md with alternatives
- [ ] PLAN.md with task table + details
- [ ] TDD task ordering
- [ ] Correct task types

### /build
- [ ] PLAN.md loading
- [ ] Subagent task delegation
- [ ] TDD enforcement (RED first)
- [ ] STATE.md continuous updates
- [ ] Rule 1-3: Auto-fix without asking
- [ ] Rule 4: Stop and ask
- [ ] Rule 5: Add to backlog
- [ ] Rule 6: Gap Protocol
- [ ] Checkpoint pausing
- [ ] Context monitoring
- [ ] SUMMARY.md generation

### /stop
- [ ] Comprehensive HANDOFF.md
- [ ] Accurate state capture
- [ ] Resumable next steps

### Resume
- [ ] HANDOFF.md detection
- [ ] Context restoration
- [ ] Seamless continuation

---

## Running the Test

### Prerequisites

```bash
# Create test directory
mkdir -p ~/test-projects/taskpulse
cd ~/test-projects/taskpulse

# Ensure my-workflow skill is active
# (Should auto-activate when running /start)
```

### Execution Order

1. `/start` → Complete OVERVIEW.md
2. `/brainstorm` → Clarify time tracking approach (optional)
3. `/plan` → Plan task-tracking feature
4. `/build` → Execute with deliberate scenarios
5. `/stop` → Create handoff mid-way
6. NEW SESSION → `/start` → Verify resume
7. `/build` → Complete remaining tasks

### Time Estimate

Full test execution: 30-60 minutes depending on depth of scenario testing.

---

## Notes

- This scenario tests a **real, functional project** - not mock interactions
- The project (TaskPulse) is intentionally small but exercises all workflow features
- Deliberate triggers for deviation rules require manual intervention during test
- Context monitoring tests may require extended sessions

## Reporting Issues

If any test fails, document:
1. Which step/command failed
2. Expected vs actual behavior
3. STATE.md and relevant file contents
4. Error messages if any
