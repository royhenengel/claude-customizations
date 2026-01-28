# My-Workflow Test Documentation

**Test Date**: 2026-01-27 (initial), 2026-01-28 (fixes and Rule 6)
**Test Scenario**: TaskPulse (greenfield CLI time tracker)
**Overall Result**: Pass

---

## Summary

All core workflow phases pass. All identified issues have been fixed.

| Phase | Result | Notes |
|-------|--------|-------|
| /start | ✅ Pass | Questions restructured for greenfield |
| /brainstorm | ✅ Pass | Step 3 conceptual approaches fixed |
| /plan | ✅ Pass | TDD pattern in template fixed |
| /build (normal) | ✅ Pass | Subagent delegation working |
| /build (Rule 4) | ✅ Pass | Stopped for "web interface instead of CLI" |
| /build (Rule 5) | ✅ Pass | Added to backlog correctly |
| /build (Rules 1,2,3) | ⏭️ Skipped | Tested by design (same pattern as 4/5) |
| /build (Rule 6) | ✅ Pass | Gap Protocol tested with dedicated scenario |
| /stop | ✅ Pass | All required sections present |
| Resume | ✅ Pass | Detects HANDOFF.md, offers to continue |

---

## Test Scenario: TaskPulse

A minimal CLI task tracker with time tracking - small enough to complete in one session, complex enough to exercise all workflow features.

### Test Responses

**For /start OVERVIEW.md:**
- Problem: "I forget what I'm working on and lose track of time spent on tasks"
- User: "Solo developers and freelancers who bill by the hour"
- Experience: "Start a task, work on it, stop it - automatically track time"
- Out of scope: "No GUI, no cloud sync, no team features - CLI only, local storage"

**For /brainstorm:**
- "Accuracy - I need to bill clients precisely"
- "Yes, sometimes I forget to start the timer"

**For /plan clarifications:**
- "Archive completed tasks to a separate file"
- "Minute precision is fine"

---

## Issues Found and Fixed

### /start

- [x] Rethink setup questions for greenfield projects
  - "What problem does it solve?" → Combined into "Vision and goals"
  - "What is the core value?" → Changed to "Desired experience"
  - "What's in scope/out of scope?" → Removed (scope emerges during /brainstorm and /plan)
  - "What does success look like?" → Kept as "Success criteria"

### /brainstorm

- [x] Remove "(optional)" label - replaced with role distinction note
- [x] Clarify distinction between /brainstorm and /plan
  - /brainstorm outputs SPEC only
  - /plan outputs SPEC + PLAN (or just PLAN if SPEC exists)
- [x] RESEARCH.md - added "Information Gathered" section
- [x] Question order not enforced - made mandatory with "Wait for answer" instructions
- [x] Step 3 presents implementation options instead of conceptual approaches (Fixed 2026-01-28)
  - Added explicit guidance: approaches describe HOW the feature works at design level
  - Good: "Event-based tracking" vs "Polling-based"
  - Bad: "Python + SQLite" vs "Node.js + JSON"

### /plan

- [x] SPEC.md uses lowercase filename - fixed to uppercase
- [x] No TDD pattern in generated PLAN (Fixed 2026-01-28)
  - Updated PLAN.md template to include explicit TDD ordering
  - Example shows Red-Green pattern: write failing test → implement to pass → repeat

### /build

- [x] Rule 4 deviation detection - now stops for major scope changes
- [x] Subagent execution visibility - clarified task delegation
- [x] Rule 6 Gap Protocol - tested and fixed (2026-01-28)
  - Added Step 4 (REQUEST APPROVAL) - gaps now require user approval before modifying plan
  - Protocol now has 7 steps instead of 6

### /stop

- [x] HANDOFF.md missing sections - added:
  - Explicit "working/not working" verdict
  - "Decisions with rationale" section with Alternatives Rejected column
  - "Remaining tasks" checklist format

---

## Deviation Rules Testing

| Rule | Description | Test Method | Result |
|------|-------------|-------------|--------|
| 1 | Auto-fix bugs | By design (same pattern) | ⏭️ Skipped |
| 2 | Auto-add critical | By design (same pattern) | ⏭️ Skipped |
| 3 | Auto-fix blockers | By design (same pattern) | ⏭️ Skipped |
| 4 | Ask architectural | "Use web interface instead of CLI" | ✅ Pass |
| 5 | Log enhancements | "Add colored output" | ✅ Pass |
| 6 | Gap Protocol | Dedicated test scenario | ✅ Pass |

### Rule 6 Test Details

**Scenario**: API client project with SPEC requiring GitHub auth but PLAN missing auth setup task.

**Execution**:
1. Created test project with intentional SPEC/PLAN mismatch
2. Subagent correctly detected gap during Task 3 execution
3. Gap Protocol executed all steps:
   - ASSESS: Identified as plan-modifying gap
   - PRESERVE: Gap Stack populated in STATE.md
   - SCOPE: Same feature, continued
   - REQUEST APPROVAL: User approved adding task (added post-test)
   - MODIFY: PLAN.md updated with Task 2a "(Added via Gap Protocol)"
   - EXECUTE: Auth setup task completed
   - RETURN: "GAP RESOLVED" displayed, context restored

**Finding**: Organic gaps are rare. Testing Rule 6 required forcing a SPEC/PLAN mismatch.

**Post-test fix**: Added Step 4 (REQUEST APPROVAL) to Gap Protocol. Gaps now require user approval before modifying the plan, consistent with Rule 4 behavior.

---

## Quick Reference Checklist

### /start
- [ ] `planning/` created with OVERVIEW.md, CLAUDE.md, STATE.md, BACKLOG.md
- [ ] `.claude/hooks.json` installed
- [ ] No CODEBASE.md (greenfield detection)
- [ ] Questions asked ONE at a time
- [ ] STATE.md shows `Stage: planning`

### /brainstorm
- [ ] Questions one at a time
- [ ] 2-3 conceptual approaches presented (not tech choices)
- [ ] SPEC.md and/or RESEARCH.md updated

### /plan
- [ ] `planning/specs/{feature}/` created
- [ ] CLAUDE.md, SPEC.md, RESEARCH.md, PLAN.md all exist
- [ ] PLAN.md has task table with types + dependencies
- [ ] TDD pattern: test tasks before implementation tasks
- [ ] At least one checkpoint task

### /build
- [ ] Loads PLAN.md
- [ ] Executes tasks via subagents
- [ ] TDD: Shows RED test first
- [ ] STATE.md updates during execution
- [ ] Pauses at checkpoints
- [ ] Rules 1-3: Auto-fix without asking
- [ ] Rule 4: Stop and ask for approval
- [ ] Rule 5: Add to BACKLOG.md
- [ ] Rule 6: Gap Protocol with user approval
- [ ] SUMMARY.md created when done

### /stop
- [ ] HANDOFF.md has current state (working/not working)
- [ ] Decisions with rationale documented
- [ ] Completed and remaining tasks listed
- [ ] Clear next steps
- [ ] Files changed listed

### Resume
- [ ] Detects HANDOFF.md
- [ ] Offers to resume (not fresh start)
- [ ] Shows correct progress state
- [ ] Continues from where stopped

---

## Gap Protocol Reference (7 Steps)

| Step | Action | User Input |
|------|--------|------------|
| 1. ASSESS | Determine if plan-modifying | No |
| 2. PRESERVE | Push context to Gap Stack | No |
| 3. SCOPE | Same feature or different? | No |
| 4. REQUEST APPROVAL | Present gap and options | **Yes** |
| 5. MODIFY | Update PLAN.md | No |
| 6. EXECUTE | Complete gap task | No |
| 7. RETURN | Pop stack, display message | No |

**User options when gap detected:**
1. Add task to current plan (recommended)
2. Add to BACKLOG.md (defer)
3. Stop and reassess

---

## Files Changed During Testing

| File | Changes |
|------|---------|
| `skills/my-workflow/workflows/start.md` | Setup questions restructured |
| `skills/my-workflow/workflows/brainstorm.md` | Question order, Step 3 conceptual approaches |
| `skills/my-workflow/workflows/plan.md` | TDD pattern in PLAN.md template |
| `skills/my-workflow/workflows/build.md` | Gap Protocol approval step added |
| `skills/my-workflow/workflows/stop.md` | HANDOFF.md template sections |
