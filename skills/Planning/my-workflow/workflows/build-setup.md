# Build Phase: Setup

**Phase**: Setup (Steps 1-4)
**When**: Stage is `ready`/`planning`, OR stage is `building` with no tasks checked.
**Next phase**: build-execute.md (after task list created and STATE.md updated)

Read the feature STATE.md for current context before proceeding.

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

Size Limits: Functions < 50 lines, files < 200 lines, components < 80 lines.

## Step 1: Check Prerequisites

```bash
ls planning/STATE.md 2>/dev/null || echo "No STATE.md - run /start first"
ls planning/specs/*/PLAN.md 2>/dev/null || echo "No PLAN.md - run /plan first"
```

If no plan exists, suggest running `/plan` first.

## Step 2: Identify Plan to Execute

**Context detection:**

```bash
# Detect environment
if [ -f .git ]; then echo "WORKTREE"; else echo "MAIN"; fi
```

**In a worktree**: Auto-detect feature from branch name (`git branch --show-current`). Read `planning/specs/{feature}/STATE.md` and `planning/specs/{feature}/PLAN.md`. Skip feature selection.

**On main**: Read project STATE.md (`planning/STATE.md`) Feature Registry, show available features.

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

**Blocked features**: Cannot be selected. Show reason.
**Single ready feature**: Auto-select, confirm with user.

## Step 3: Load Plan as Execution Prompt

Read the PLAN.md completely. It IS the execution prompt.

Extract:

- Objective
- Context files (read all @references)
- Tasks with verification criteria
- Success criteria

## Step 4: Create Task List and Update State Files

**Check for resume:**

Read feature STATE.md. If `**Stage**` is already `building` and some tasks in `## Progress` are checked (`[x]` or `[~]`):

This is a **resume**. Do NOT reset progress.

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 Resuming: {feature-name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Progress: {completed}/{total} tasks
Last working on: {last in-progress or next unchecked task}
```

- Create task list from feature STATE.md Progress (preserving checked/unchecked status)
- Set the next unchecked task to `in_progress`
- Do NOT overwrite feature STATE.md progress or stage
- Do NOT update project STATE.md registry (already `active`)
- Skip to build-execute.md

**If NOT a resume** (stage is `planning` or `ready`, or no tasks are checked):

**Create task list from PLAN.md** via TodoWrite for visible progress tracking.

```text
TodoWrite([
  { content: "Task 1: {description}", status: "pending", activeForm: "{present continuous}" },
  { content: "Task 2: {description}", status: "pending", activeForm: "{present continuous}" },
  ...
])
```

**Update feature STATE.md** (`planning/specs/{feature}/STATE.md`):

- Set `**Stage**` to `building`
- Copy task list from PLAN.md to `## Progress` section
- Update `**Last Updated**` timestamp
- Set Current State Next Steps to "Executing Task 1"

**Update project STATE.md** (`planning/STATE.md`) Feature Registry:

- Set feature status to `active`

**Update feature CLAUDE.md** status to "Implementation in progress."

**Key**: Copy task names directly from PLAN.md Task Summary table. PLAN.md stays static (the prompt), feature STATE.md tracks completion.

---

**Setup complete.** Transition to build-execute.md to begin task execution.
