# My-Workflow Test Checklist

Quick reference for running the TaskPulse test scenario.

## Setup

```bash
mkdir -p ~/test-projects/taskpulse
cd ~/test-projects/taskpulse
```

---

## 1. /start

```
/start
```

**Answer these questions (one at a time):**
- Problem: "I forget what I'm working on and lose track of time spent on tasks"
- User: "Solo developers and freelancers who bill by the hour"
- Experience: "Start a task, work on it, stop it - automatically track time"
- Out of scope: "No GUI, no cloud sync, no team features - CLI only, local storage"

**Verify:**
- [ ] `planning/` created with OVERVIEW.md, CLAUDE.md, STATE.md, BACKLOG.md
- [ ] `.claude/hooks.json` installed
- [ ] No CODEBASE.md (greenfield)
- [ ] Questions asked ONE at a time
- [ ] STATE.md shows `Stage: planning`

---

## 2. /brainstorm (Optional)

```
/brainstorm
```

Say: "I'm not sure how to structure the time tracking"

**Answer questions:**
- "Accuracy - I need to bill clients precisely"
- "Yes, sometimes I forget to start the timer"

**Verify:**
- [ ] Questions one at a time
- [ ] 2-3 approaches presented
- [ ] SPEC.md or RESEARCH.md updated

---

## 3. /plan

```
/plan
```

Say: "Plan the core feature: start/stop task tracking with time persistence"

**Answer clarifications:**
- "Archive completed tasks to a separate file"
- "Minute precision is fine"

**Verify:**
- [ ] `planning/specs/task-tracking/` created
- [ ] CLAUDE.md, SPEC.md, RESEARCH.md, PLAN.md all exist
- [ ] PLAN.md has task table with types + dependencies
- [ ] Test tasks appear (TDD)
- [ ] At least one `checkpoint:human-verify` task

---

## 4. /build

```
/build
```

### Normal Execution
- [ ] Loads PLAN.md
- [ ] Executes tasks via subagents
- [ ] TDD: Shows RED test first
- [ ] STATE.md updates during execution
- [ ] Pauses at checkpoints

### Deviation Tests (trigger during build)

| Say This | Expected Rule |
|----------|--------------|
| *(wait for bug in generated code)* | Rule 1: Auto-fix |
| "Is the task data sanitized?" | Rule 2: Auto-add validation |
| *(missing dependency error)* | Rule 3: Auto-fix |
| "Let's use SQLite instead of JSON" | Rule 4: STOPS, asks |
| "Add color output later" | Rule 5: Adds to BACKLOG |
| *(design reveals missing config)* | Rule 6: Gap Protocol |

**Gap Protocol check (Rule 6):**
- [ ] STATE.md Gap Stack populated
- [ ] PLAN.md marked "Added via Gap Protocol"
- [ ] Returns to original task after gap

**Verify:**
- [ ] Rules 1-3 handled automatically
- [ ] Rule 4 stopped and asked
- [ ] Rule 5 in BACKLOG.md
- [ ] SUMMARY.md created when done

---

## 5. /stop (mid-build)

```
/stop
```

**Verify HANDOFF.md has:**
- [ ] Current state (working/not working)
- [ ] Decisions with rationale
- [ ] Completed tasks listed
- [ ] Remaining tasks listed
- [ ] Clear next steps
- [ ] Files changed

---

## 6. Resume (NEW SESSION)

```bash
cd ~/test-projects/taskpulse
```

```
/start
```

**Verify:**
- [ ] Detects HANDOFF.md
- [ ] Offers to resume (not fresh start)
- [ ] Shows correct progress state

```
/build
```

**Verify:**
- [ ] Continues from where stopped
- [ ] Doesn't redo completed tasks

---

## Results Summary

| Phase | Pass/Fail | Notes |
|-------|-----------|-------|
| /start | | |
| /brainstorm | | |
| /plan | | |
| /build (normal) | | |
| /build (rules 1-3) | | |
| /build (rule 4) | | |
| /build (rule 5) | | |
| /build (rule 6) | | |
| /stop | | |
| Resume | | |

**Overall**: [ ] PASS / [ ] FAIL

**Issues Found:**
1.
2.
3.
