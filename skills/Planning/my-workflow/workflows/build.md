# Workflow: /build

## Purpose

Execute the plan with subagent delegation, deviation rules, and development discipline (TDD + Clean Architecture).

## When to Use

- After `/plan` has created a PLAN.md
- Plan has been reviewed and approved
- Ready to implement

## Entry Point

User invokes `/build` or asks to execute/implement the plan.

## Development Discipline

**These principles apply to ALL task execution during build.**

### Test-Driven Development (TDD)

The Iron Law: **NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST**

For each task involving code changes:

1. **RED** - Write failing test first (one behavior per test)
2. **Verify RED** - Watch test fail (MANDATORY - never skip)
3. **GREEN** - Write minimal code to pass
4. **Verify GREEN** - Confirm test passes
5. **REFACTOR** - Clean up (only after green)

Task Execution Order: Execute test tasks BEFORE their corresponding implementation tasks.

Common Rationalizations (All Wrong):

| Excuse                 | Reality                                    |
| ---------------------- | ------------------------------------------ |
| "Too simple to test"   | Simple code breaks. Test takes 30 seconds. |
| "I'll test after"      | Tests passing immediately prove nothing.   |
| "TDD will slow me down"| TDD is faster than debugging.              |

### Clean Architecture

Library-First Approach: Always search for existing solutions before writing custom code.

- Check npm/package managers for existing libraries
- Consider third-party APIs for common functionality
- Write custom code only for domain-specific logic

Naming Conventions:

| Avoid                                  | Prefer                                 |
| -------------------------------------- | -------------------------------------- |
| `utils`, `helpers`, `common`, `shared` | `OrderCalculator`, `UserAuthenticator` |

Separation of Concerns:

- Do NOT mix business logic with UI components
- Keep database queries out of controllers
- Maintain clear boundaries between contexts

Size Limits:

- Functions < 50 lines
- Files < 200 lines
- Components < 80 lines

## Steps

### 1. Check Prerequisites

```bash
ls planning/STATE.md 2>/dev/null || echo "No STATE.md - run /start first"
ls planning/specs/*/PLAN.md 2>/dev/null || echo "No PLAN.md - run /plan first"
```

If no plan exists, suggest running `/plan` first.

### 2. Identify Plan to Execute

Read `planning/STATE.md` Feature Registry to understand available features.

**If a paused feature exists**, offer to resume:

```text
Found paused feature: {feature-name} (Task {n}/{m})

Options:
1. Resume {feature-name} (continue where you left off)
2. Choose a different feature
```

**If multiple ready features exist**, show Feature Registry:

```text
Found features:

| # | Feature | Status | Tasks | Dependencies |
|---|---------|--------|-------|--------------|
| 1 | user-auth | ready | 5 | - |
| 2 | api-routes | ready | 3 | - |
| 3 | dashboard | blocked | 4 | user-auth |

Note: Feature 3 is blocked (depends on user-auth).

Which feature would you like to build?
- Enter number
- "continue" to resume paused feature (if any)
- "first" to build first available (non-blocked)
```

**Blocked features**: Cannot be selected. Show reason (dependency not complete).

**Single ready feature**: Auto-select it, confirm with user.

### 3. Load Plan as Execution Prompt

Read the PLAN.md completely. It IS the execution prompt.

Extract:

- Objective
- Context files (read all @references)
- Tasks with verification criteria
- Success criteria

### 4. Update STATE.md and Feature CLAUDE.md

**Copy task list from PLAN.md to STATE.md** - this is the single source of truth for progress.

Update `planning/STATE.md`:

```markdown
**Stage**: building
**Last Updated**: {timestamp}

## Active Feature

**Name**: {feature-name}
**Status**: active
**Progress**: 0/{N}

## Feature Registry

| Feature | Status | Progress | Dependencies |
|---------|--------|----------|--------------|
| {feature-name} | active | 0/{N} | - |
| {other features...} | {status} | {progress} | {deps} |

## Current Focus

Executing {feature} PLAN.md - Task 1

## Progress ({feature-name})

- [ ] Task 1: {description from PLAN.md}
- [ ] Task 2: {description from PLAN.md}
- [ ] Task 3: {description from PLAN.md}
...
```

**Key**: Copy task names directly from PLAN.md Task Summary table. PLAN.md stays static (the prompt), STATE.md tracks completion.

Update `planning/specs/{feature}/CLAUDE.md` status:

```markdown
## Status

Implementation in progress.
```

### 5. Execute Tasks

**Execution mode** (default: subagent):

| Mode | When | How to Enable |
|------|------|---------------|
| **Subagent** (default) | Most tasks, cost-efficient, clear ownership | No action needed |
| **Agent Teams** (optional) | Peer debate needed, cross-layer coordination, subagent results insufficient | Set `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in settings.json env, then request team creation |

See @skills/Planning/my-workflow/docs/multi-agent-orchestration.md for detailed comparison and open concerns.

For each task in PLAN.md:

**Task Execution Order (TDD)**: If the plan has separate test and implementation tasks, execute test tasks BEFORE their corresponding implementation tasks.

**Select agent using invocation rules** (@skills/Planning/my-workflow/docs/agent-invocation-rules.md):

1. **Check trigger**: Does the task match a trigger-based selection?
   - Complex feature planning → cek-software-architect
   - Code review needed → code-reviewer
   - Security assessment → security-auditor
   - Tests failing → debugger
   - Bug investigation → cek-bug-hunter
   - Technical research → cek-researcher
   - API design → api-designer
   - Performance issues → performance-engineer

2. **Check language/framework**: For implementation tasks, route to language-specific agent:
   - TypeScript → typescript-pro
   - Python → python-pro
   - Go → golang-pro
   - React → react-specialist
   - (See agent-invocation-rules.md for full list)

3. **Fallback**: Use fullstack-developer for general implementation tasks

**Announce subagent launch visibly:**

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TASK {N}/{TOTAL}: {Task Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Agent: {selected_agent} (reason: {trigger match | language: X | default})
Launching subagent...
```

Note: Extend lines to match text length if task name is long. Lines must never be shorter than the text.

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

**After each task completes, announce completion:**

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TASK {N}/{TOTAL} COMPLETE: {Task Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Result: {brief summary}
```

Note: Extend lines to match text length if task name is long. Lines must never be shorter than the text.

**Then update tracking:**

1. **Update STATE.md Progress section**:
   - Change `- [ ] Task N:` to `- [x] Task N:`
   - Update `Progress: {n}/{m}` counter in Active Feature section
   - Update Feature Registry table progress column
   - Update `Current Focus` to next task

2. Verify task completion criteria
3. Verify TDD was followed (tests written and passing)
4. Note any deviations in STATE.md Notes section

5. **Update STATE.md Current State section**:
   - Add verified functionality to "What's Working" (e.g., "Task N: {description} - verified")
   - Update "Next Steps" with the next task to execute
   - Update "Last Updated" timestamp

**If task is partially complete** (e.g., interrupted by gap or context limit):

- Use `- [~] Task N: {description} (progress note)` marker
- Add note explaining what's done and what remains

### 6. Apply Deviation Rules

During execution, handle discoveries automatically:

| Rule | Trigger | Action |
|------|---------|--------|
| **1. Auto-fix bugs** | Code logic error (wrong output, failed test, crash) | Fix immediately, note in STATE.md |
| **2. Auto-add critical** | Security/correctness gap | Add immediately, note in STATE.md |
| **3. Auto-fix blockers** | Environment/setup issue (missing dep, bad import path, config) | Fix immediately, note in STATE.md |
| **4. Ask architectural** | Major structural change (see below) | STOP. Ask user for decision. |
| **5. Log enhancements** | Nice-to-have idea | Append to BACKLOG.md under appropriate category, continue |
| **6. Gap detected** | Plan ordering issue (need functionality not yet built) | Invoke Gap Protocol (see below) |

**Rules 1-3, 5**: No user intervention needed.
**Rule 4**: Requires user decision before proceeding.
**Rule 6**: Preserves context, modifies plan, then returns to original task.

### Deviation Examples

**Rule 1 (Bug) - Code is wrong:**

- Function returns incorrect value (logic error)
- Test fails because implementation doesn't match spec
- Null pointer exception from missing check
- Race condition causing intermittent failures

**Rule 3 (Blocker) - Environment is wrong:**

- `npm install` fails - dependency not in package.json
- Import path points to moved/renamed file
- Environment variable not set
- Database connection refused
- Circular dependency blocking module load

**Rule 6 (Gap) - Plan is wrong:**

- Task 5 needs UserService, but Task 3 (create UserService) isn't complete
- Test requires mock that wasn't created in earlier task
- Integration depends on API endpoint not yet implemented

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

Rule 4 applies when ANY of these occur. Do NOT proceed without explicit user approval:

**Technology Changes:**

- Switching data storage (JSON → SQLite, file → database, etc.)
- Changing frameworks or major libraries
- Adding new infrastructure dependencies

**Scope Violations:**

- Implementation contradicts OVERVIEW.md constraints
- Building something listed as "Out of Scope"
- Changing interface type (CLI → GUI, REST → GraphQL, etc.)

**Architecture Changes:**

- Changing the fundamental structure of the system
- Adding new architectural layers not in the plan
- Significantly altering data flow patterns

**Before ANY implementation, verify:**

1. Read `planning/OVERVIEW.md` - check Scope section and Vision
2. Read `planning/specs/{feature}/SPEC.md` - check Constraints section
3. Confirm implementation matches declared interface type (CLI, web, API, etc.)
4. Confirm technology choices match plan

**Rule 4 Stop Message:**

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Architectural Decision Required
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Proposed change: {what you're about to do}
Conflicts with: {OVERVIEW.md constraint or PLAN.md specification}

This requires your approval before proceeding.

Options:

1. Approve change (update OVERVIEW.md/PLAN.md to match)
2. Reject change (continue with original spec)
3. Discuss alternatives

Which would you prefer?

**Do NOT rationalize around Rule 4.** If uncertain whether something triggers Rule 4, it triggers Rule 4.

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

**Update STATE.md Current State section**:

- Add the gap/issue to "What's Not Working" (e.g., "Gap: {description} - blocks Task N")
- Update "Last Updated" timestamp

#### Step 3: SCOPE

Assess impact on current plan:

- **Different feature?** → Add to BACKLOG.md, pop stack, continue original task
- **New task in current plan?** → Continue to Step 4

#### Step 4: REQUEST APPROVAL

**Do NOT modify the plan without user approval.** Present the gap and options:

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gap Detected
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Gap discovered: {description of what's missing}
Impact: Blocks Task {N} until resolved

Proposed solution:

- Add Task {N}a: {gap task description}
- Then continue with Task {N}

Options:

1. Add task to current plan (recommended)
2. Add to BACKLOG.md (defer and continue without it)
3. Stop and reassess the plan

Which would you prefer?

**If user approves (Option 1)**: Continue to Step 5
**If user defers (Option 2)**: Add to BACKLOG.md, clear Gap Stack, continue original task (may fail)
**If user stops (Option 3)**: Clear Gap Stack, pause build, await further direction

#### Step 5: MODIFY

Update PLAN.md:

- Insert new task with marker: `(Added via Gap Protocol)`
- Place it before the blocked task
- Update Task Summary table
- Example: If blocked on Task 3, insert "Task 3a: {gap work} (Added via Gap Protocol)"

#### Step 6: EXECUTE

Complete the gap task. Apply deviation rules recursively (gaps can nest).

#### Step 7: RETURN

After gap task completes, pop context from Gap Stack and display:

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gap Resolved
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Gap Completed: {description of gap task}
Gap Result: {outcome}

Returning to:
- Task: {original task name}
- Objective: {what we were trying to achieve}
- Progress: {what was done before gap}
- Next Step: {what to do now}

Continuing...

Update STATE.md:

- Clear Active Gap section (set to "(None)")
- Add entry to Gap History: `[timestamp] {gap description} - resolved`
- Remove resolved gap from "What's Not Working" in Current State section

### 6b. User Addition Assessment

When user requests an addition mid-build ("also add X", "can you also..."):

**First, assess if this is same-feature or cross-feature:**

- **Same feature**: Enhancement to current feature (e.g., "also add validation" while building auth)
- **Cross-feature**: Different concern entirely (e.g., "also build the dashboard" while building auth)

**Always show impact before modifying the plan:**

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
User Addition
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

You requested: {X}

Assessment: {Same feature / Cross-feature}

Adding this would:

- Add ~{N} task(s)
- Affect: {list affected tasks, if any}

Options:

1. Add to current plan (extends this build)
2. Add to BACKLOG.md (handle in next plan)
3. Create separate plan (new feature in Feature Registry)

Which would you prefer?

**Cross-feature additions**: Present all 3 options without recommendation. Let user decide based on context. If they choose Option 1, warn that mixing features can complicate the build.

Based on user choice:

- **Option 1**: Use Gap Protocol to insert (Step 2-6). For cross-feature, update Feature Registry to note this feature was merged.
- **Option 2**: Add to BACKLOG.md under appropriate section, continue current task
- **Option 3**: Create new `planning/specs/{feature}/` directory with SPEC.md (status: drafted), add to Feature Registry, continue current task

### 7. Monitor Context Health

Watch for context filling. Current State in STATE.md is maintained continuously, so session can end cleanly at any time.

| Context Level | Action |
|---------------|--------|
| **50%** | Note that context is growing |
| **25% remaining** | Mention context getting full |
| **15% remaining** | Pause, confirm whether to continue |
| **10% remaining** | Complete current task, then end session |

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Context Health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Context is at ~{X}% remaining.

Options:

1. Continue (tasks {remaining} left)
2. End session (Current State already captured in STATE.md)

I recommend {recommendation based on remaining work}.

### 8. Verify Completion

After all tasks complete:

- Run verification steps from PLAN.md
- Check success criteria
- Confirm all tests pass

### 8a. Pre-Completion Security Check

Before finalizing the build, verify against the security checklist:

1. **Review all changed files** for:
   - Hardcoded credentials (API keys, passwords, tokens)
   - Unvalidated input (user input, API responses, file content)
   - Injection vulnerabilities (SQL, shell, XSS)

2. **If security issue found**:
   - Fix before proceeding
   - Note in STATE.md under Notes
   - If architectural (requires new auth system, etc.) → Rule 4 stop

3. **Checklist verification**:
   - [ ] No hardcoded credentials
   - [ ] Input validation at boundaries
   - [ ] Injection prevention (parameterized queries, escaped commands)
   - [ ] XSS mitigation (escaped user content)
   - [ ] Secure error handling (errors logged, not exposed)

Reference: @rules/security-checklist.md

### 9. Quality Review (Multi-Perspective)

Launch 3 specialized review agents in parallel, each focusing on their domain expertise.

**Announce review phase:**

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUALITY REVIEW: Multi-Perspective Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Launching 3 specialized reviewers in parallel...
```

**Agent 1 - Code Quality (cek-code-quality-reviewer):**

```text
Review the implementation for {feature}.

Focus areas (your specialty):
- Clean Code principles and DRY
- SOLID principles adherence
- Naming conventions (no utils/helpers/common)
- Code size limits (functions < 50 lines, files < 200 lines)
- Readability and maintainability

Files changed: {list from implementation}

Provide:
- Binary pass/fail for each checklist item
- Quality score (0-100)
- Issues with file:line citations
- Severity classification (Critical/Important/Minor)
```

**Agent 2 - Security (cek-security-auditor):**

```text
Review the implementation for {feature}.

Focus areas (your specialty):
- Security vulnerabilities (OWASP Top 10)
- Input validation and sanitization
- Authentication/authorization gaps
- Injection risks (SQL, XSS, command)
- Sensitive data exposure
- Hardcoded credentials or secrets

Files changed: {list from implementation}

Provide:
- Binary pass/fail for security checks
- Attack scenarios with file:line evidence
- Severity classification (Critical/High/Medium/Low)
- Remediation recommendations
```

**Agent 3 - Architecture (architect-reviewer):**

```text
Review the implementation for {feature}.

Focus areas (your specialty):
- Clean Architecture alignment (separation of concerns)
- Design pattern appropriateness
- Scalability considerations
- Technical debt introduction
- Integration patterns and coupling
- Project conventions compliance

Files changed: {list from implementation}

Provide:
- Architecture alignment assessment
- Technical debt items with severity
- Pattern violations with file:line citations
- Recommendations for improvement
```

**After all reviews complete:**

1. **Consolidate findings by severity:**
   - **Critical**: Must fix before completion (security vulnerabilities, major bugs)
   - **Important**: Should fix, may impact maintainability
   - **Minor**: Nice to fix, low impact

2. **Present consolidated review to user:**

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REVIEW COMPLETE: {feature}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary:
- Code Quality: {score}/100 | {pass/fail count}
- Security: {pass/fail count} | {critical/high/medium/low counts}
- Architecture: {alignment assessment} | {tech debt items}

Critical Issues ({count}):
{list with file:line and reviewer source}

Important Issues ({count}):
{list with file:line and reviewer source}

Minor Issues ({count}):
{list with file:line and reviewer source}

Options:
1. Fix all critical issues now
2. Fix critical + important issues now
3. Fix all issues now
4. Add non-critical to BACKLOG.md and proceed
5. Proceed as-is (not recommended if critical issues exist)

Which would you prefer?
```

3. **If fixing**, launch appropriate developer subagent to address issues
4. **Re-run affected reviews** after fixes to verify resolution

### 10. Create SUMMARY.md

**REQUIRED** - This step cannot be skipped. SUMMARY.md must exist before declaring a feature complete. Even if verification/testing is skipped, documentation is mandatory.

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

### 11. Update STATE.md and Feature CLAUDE.md

Update `planning/STATE.md`:

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

Update `planning/specs/{feature}/CLAUDE.md` status:

```markdown
## Status

Implementation complete. See SUMMARY.md for details.
```

### 12. Completion Message

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Build Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Implemented: {feature name}
Tasks: {N} completed
Deviations: {N} (see [SUMMARY.md](planning/specs/{feature}/SUMMARY.md))

Created:

- [planning/specs/{feature}/SUMMARY.md](planning/specs/{feature}/SUMMARY.md)

Next steps:

- Review the changes
- Run `/plan` for next feature

### 13. Finalize Changes

When user says "complete", "mark as complete", or similar:

1. **Commit and push**:
   - Stage all changes
   - Create conventional commit with summary
   - Push to remote

2. **If on feature branch** (worktree or otherwise):
   - Create PR with summary of changes
   - Wait for approval
   - Once approved: merge PR and delete branch

3. **If using worktree**:
   - After merge, remove worktree: `git worktree remove {path}`

This applies to both features (`/build` completion) and fixes (`/fix` completion).

## Subagent Execution Pattern

Each task runs in fresh subagent context:

```
Main conversation (orchestration)
    |
    +-- Task 1 --> [selected subagent] --> result
    |                   (fresh 200k context)
    |
    +-- Task 2 --> [selected subagent] --> result
    |                   (fresh 200k context)
    |
    +-- Task 3 --> [selected subagent] --> result
                        (fresh 200k context)
```

Benefits:

- Each task has full context capacity
- No degradation from accumulated work
- Clean verification per task
- Specialized agents for specific task types

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
    +-- Select agent (trigger → language → fullstack-developer)
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
