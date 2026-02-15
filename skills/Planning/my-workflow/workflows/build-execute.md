# Build Phase: Execute

**Phase**: Execute (Steps 5-7)
**When**: Stage is `building` with tasks in progress (some checked, some unchecked).
**Next phase**: build-complete.md (after all tasks checked)

Read the feature STATE.md for current context before proceeding.

## Development Discipline Reminder

- **TDD**: Write failing test first, verify it fails, write minimal code to pass. Test tasks execute BEFORE implementation tasks.
- **Library-First**: Search for existing solutions before writing custom code.
- **Clean Architecture**: Separate concerns, use domain-specific names (not utils/helpers). Functions < 50 lines, files < 200 lines.

## Step 5: Execute Tasks

**Execution mode** (default: subagent):

| Mode | When |
|------|------|
| **Subagent** (default) | Most tasks. Cost-efficient, clear ownership. |
| **Agent Teams** (optional) | Peer debate needed, cross-layer coordination. Set `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. |

CRITICAL: Each task MUST run in a subagent. The orchestrator MUST NOT edit non-planning files directly.

Common Rationalizations for Direct Execution (All Wrong):

| Excuse | Reality |
|--------|---------|
| "Too simple for a subagent" | Simple tasks still benefit from fresh context and clear ownership. |
| "I can do this faster directly" | Speed is not the goal. Consistency and traceability are. |
| "It's just one file change" | Scope is irrelevant. The pattern is: task -> subagent -> result. |
| "The subagent will just do what I'd do" | Then delegate it. If the result is the same, the cost is trivial. |

For each task in PLAN.md:

**Select agent using invocation rules** (@skills/Planning/my-workflow/docs/agent-invocation-rules.md):

1. **Check trigger**: Does the task match a trigger-based selection?
   - Complex feature planning -> cek-software-architect
   - Code review -> code-reviewer
   - Security assessment -> security-auditor
   - Tests failing -> debugger
   - Bug investigation -> cek-bug-hunter
   - Technical research -> cek-researcher
   - API design -> api-designer
   - Performance issues -> performance-engineer

2. **Check language/framework**: Route to language-specific agent (typescript-pro, python-pro, golang-pro, react-specialist, etc.)

3. **Fallback**: fullstack-developer

**Announce subagent launch:**

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 TASK {N}/{TOTAL}: {Task Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Agent: {selected_agent} (reason: {trigger match | language: X | default})
Launching subagent...
```

Note: Extend lines to match text length. Lines must never be shorter than the text.

**Launch Task tool with selected subagent:**

```
Execute Task {N} from the plan:

Objective: {task objective}
Files: {files to modify}
Action: {what to do}
Verify: {verification steps}
Done when: {completion criteria}

Context:
{Paste relevant context from PLAN.md @references}

Development Discipline:
- Follow TDD: Write failing test first, verify it fails, write minimal code to pass
- Library-first: Search for existing solutions before writing custom code
- Clean Architecture: Separate concerns, use domain-specific names (not utils/helpers)
- Size limits: Functions < 50 lines, files < 200 lines

Apply deviation rules during execution:
1. Auto-fix bugs - fix immediately, note in response
2. Auto-add critical - security/correctness gaps, fix immediately
3. Auto-fix blockers - can't proceed, fix immediately
4. Ask about architectural - STOP and report back for decision
5. Log enhancements - add to BACKLOG.md, continue with task
```

**After each task completes:**

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TASK {N}/{TOTAL} COMPLETE: {Task Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Result: {brief summary}
```

**Update tracking:**

1. Mark current task completed, set next task to in_progress via TodoWrite
2. Update feature STATE.md Progress: `- [ ] Task N:` -> `- [x] Task N:`
3. Update feature STATE.md Current State: add to "What's Working", update "Next Steps"
4. Verify task completion criteria and TDD compliance
5. Note any deviations in feature STATE.md Notes section

**If task is partially complete** (interrupted by gap or context limit):
- Use `- [~] Task N: {description} (progress note)` marker

## Step 6: Apply Deviation Rules

| Rule | Trigger | Action |
|------|---------|--------|
| **1. Auto-fix bugs** | Code logic error (wrong output, failed test, crash) | Fix immediately, note in feature STATE.md |
| **2. Auto-add critical** | Security/correctness gap | Add immediately, note in feature STATE.md |
| **3. Auto-fix blockers** | Environment/setup issue (missing dep, bad import, config) | Fix immediately, note in feature STATE.md |
| **4. Ask architectural** | Major structural change (see triggers below) | STOP. Ask user for decision. |
| **5. Log enhancements** | Nice-to-have idea | Append to BACKLOG.md, continue |
| **6. Gap detected** | Plan ordering issue (need functionality not yet built) | Invoke Gap Protocol (6a) |

**Rules 1-3, 5**: No user intervention needed.
**Rule 4**: Requires user decision before proceeding.
**Rule 6**: Preserves context, modifies plan, then returns to original task.

**After applying rules 1-3**, if the fix involved a non-trivial root cause: automatically invoke `/compound` with the deviation context. If it fails, log and continue. Skip for trivial fixes.

### Rule Selection Quick Reference

```
Issue encountered during task:
│
├─ Can you START the task at all?
│  └─ NO → Is it missing planned functionality?
│         ├─ YES → Rule 6 (Gap) - invoke Gap Protocol
│         └─ NO → Rule 3 (Blocker) - fix environment/setup
│
└─ YES, task started but something went wrong:
   └─ Is the CODE producing wrong results?
      ├─ YES → Rule 1 (Bug) - fix the code
      └─ NO → Re-evaluate (likely Rule 3 or 6)
```

**Summary**: Bugs are code problems. Blockers are setup problems. Gaps are plan problems.

### Rule 4 Triggers (MUST STOP)

Do NOT proceed without explicit user approval when ANY of these occur:

- **Technology Changes**: Switching storage, changing frameworks, adding infrastructure deps
- **Scope Violations**: Contradicts OVERVIEW.md, building "Out of Scope" items, changing interface type
- **Architecture Changes**: Changing system structure, adding layers not in plan, altering data flow

**Before ANY implementation, verify:** Read OVERVIEW.md (Scope, Vision), SPEC.md (Constraints). Confirm interface type and technology choices match plan.

**Do NOT rationalize around Rule 4.** If uncertain whether something triggers Rule 4, it triggers Rule 4.

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⛔ Architectural Decision Required
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Proposed change: {what}
Conflicts with: {constraint}

Options:
1. Approve change (update OVERVIEW.md/PLAN.md)
2. Reject change (continue with original spec)
3. Discuss alternatives
```

### 6a. Gap Protocol

When Rule 6 triggers (prerequisite missing), follow this protocol:

**1. ASSESS**: In-scope fix (Rules 1-5) or plan-modifying gap?
- Plan-modifying when: prerequisite requires new work, user requests addition mid-build, blocker fix reveals additional required changes

**2. PRESERVE**: Push context to Gap Stack in feature STATE.md:

```markdown
## Gap Stack

### Active Gap
**Original Task**: {current task name and number}
**Progress Before Gap**: {what's done so far}
**Gap Trigger**: {what was discovered}
**Gap Action**: {what we're doing to address it}
```

Update feature STATE.md Current State: add gap to "What's Not Working".

**3. SCOPE**: Different feature? -> BACKLOG.md, pop stack, continue. Same feature? -> Continue.

**4. REQUEST APPROVAL**: Do NOT modify the plan without user approval.

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⛔ Gap Detected
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gap: {description}
Impact: Blocks Task {N}

Proposed: Add Task {N}a: {gap task description}

Options:
1. Add task to current plan (recommended)
2. Defer to BACKLOG.md
3. Stop and reassess
```

**5. MODIFY**: Insert new task in PLAN.md with `(Added via Gap Protocol)` marker.
**6. EXECUTE**: Complete gap task. Deviation rules apply recursively.
**7. RETURN**: Pop context from Gap Stack. Clear Active Gap. Add to Gap History.

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Gap Resolved
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Returning to: Task {N} - {objective}
Progress: {what was done before gap}
Continuing...
```

### 6b. User Addition Assessment

When user requests an addition mid-build ("also add X"):

**Assess**: Same-feature or cross-feature?

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 User Addition
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You requested: {X}
Assessment: {Same feature / Cross-feature}

Adding this would:
- Add ~{N} task(s)
- Affect: {list affected tasks}

Options:
1. Add to current plan (extends this build)
2. Add to BACKLOG.md (handle in next plan)
3. Create separate plan (new feature)
```

**Cross-feature**: Present all 3 options without recommendation.

Based on user choice:
- **Option 1**: Use Gap Protocol to insert. For cross-feature, update Feature Registry.
- **Option 2**: Add to BACKLOG.md, continue current task.
- **Option 3**: Create new `planning/specs/{feature}/` directory, add to Feature Registry, continue.

## Step 7: Monitor Context Health

Feature STATE.md is maintained continuously, so session can end cleanly at any time.

| Context Level | Action |
|---------------|--------|
| **50%** | Note context is growing |
| **25% remaining** | Mention context getting full |
| **15% remaining** | Pause, confirm whether to continue |
| **10% remaining** | Complete current task, then end session |

---

**All tasks complete.** Transition to build-complete.md for verification and finalization.

CRITICAL: Steps 8-13 MUST execute after all tasks complete. Skipping any step is a compliance failure.
