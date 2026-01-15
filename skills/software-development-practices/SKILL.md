---
name: software-development-practices
description: Comprehensive software development methodology combining Clean Architecture, Test-Driven Development (TDD), and subagent-driven execution. Use when implementing features, fixing bugs, designing architecture, or executing plans with agents.
---

# Software Development Practices

## Table of Contents

1. [Overview](#overview)
2. [Architecture & Design](#architecture--design)
3. [Test-Driven Development](#test-driven-development)
4. [Subagent-Driven Execution](#subagent-driven-execution)
5. [Quick Reference](#quick-reference)

---

## Overview

Three pillars of quality software development:
1. **Architecture** - Clean Architecture and DDD principles
2. **TDD** - Write test first, watch fail, minimal code to pass
3. **Execution** - Fresh subagent per task with review gates

**Core principles:**
- Library-first: Search for existing solutions before writing custom code
- Test-first: No production code without a failing test
- Fresh context: One subagent per task, review between tasks

---

## Architecture & Design

Based on Clean Architecture and Domain-Driven Design.

### General Principles

- **Early return pattern**: Use early returns over nested conditions
- **Avoid duplication**: Create reusable functions and modules
- **Keep it small**: Functions < 50 lines, files < 200 lines, components < 80 lines
- **Arrow functions**: Prefer over function declarations when possible

### Library-First Approach

**ALWAYS search for existing solutions before writing custom code:**
- Check npm/package managers for existing libraries
- Evaluate existing services/SaaS solutions
- Consider third-party APIs for common functionality

**When custom code IS justified:**
- Specific business logic unique to the domain
- Performance-critical paths with special requirements
- When external dependencies would be overkill
- Security-sensitive code requiring full control

### Clean Architecture & DDD

- Follow domain-driven design and ubiquitous language
- Separate domain entities from infrastructure concerns
- Keep business logic independent of frameworks
- Define use cases clearly and keep them isolated

### Naming Conventions

| Avoid | Prefer |
|-------|--------|
| `utils`, `helpers`, `common`, `shared` | `OrderCalculator`, `UserAuthenticator`, `InvoiceGenerator` |
| `utils.js` with 50 unrelated functions | Domain-specific modules with clear purpose |
| `helpers/misc.js` as dumping ground | Bounded context naming patterns |

### Separation of Concerns

- Do NOT mix business logic with UI components
- Keep database queries out of controllers
- Maintain clear boundaries between contexts

### Anti-Patterns to Avoid

**NIH (Not Invented Here) Syndrome:**
- Don't build custom auth when Auth0/Supabase exists
- Don't write custom state management instead of Redux/Zustand
- Don't create custom form validation instead of established libraries

**Remember:** Every line of custom code is a liability that needs maintenance, testing, and documentation.

---

## Test-Driven Development

Write the test first. Watch it fail. Write minimal code to pass.

**Core principle:** If you didn't watch the test fail, you don't know if it tests the right thing.

### The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Write code before the test? Delete it. Start over. No exceptions.

### When to Use TDD

**Always:**
- New features
- Bug fixes
- Refactoring
- Behavior changes

**Exceptions (ask your human partner):**
- Throwaway prototypes
- Generated code
- Configuration files

### Red-Green-Refactor Cycle

#### RED - Write Failing Test

Write one minimal test showing what should happen.

```typescript
// Good: Clear name, tests real behavior, one thing
test('retries failed operations 3 times', async () => {
  let attempts = 0;
  const operation = () => {
    attempts++;
    if (attempts < 3) throw new Error('fail');
    return 'success';
  };

  const result = await retryOperation(operation);

  expect(result).toBe('success');
  expect(attempts).toBe(3);
});
```

**Requirements:**
- One behavior per test
- Clear, descriptive name
- Real code (no mocks unless unavoidable)

#### Verify RED - Watch It Fail

**MANDATORY. Never skip.**

```bash
npm test path/to/test.test.ts
```

Confirm:
- Test fails (not errors)
- Failure message is expected
- Fails because feature missing (not typos)

#### GREEN - Minimal Code

Write simplest code to pass the test. Nothing more.

```typescript
// Good: Just enough to pass
async function retryOperation<T>(fn: () => Promise<T>): Promise<T> {
  for (let i = 0; i < 3; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === 2) throw e;
    }
  }
  throw new Error('unreachable');
}
```

Don't add features, refactor other code, or "improve" beyond the test.

#### Verify GREEN - Watch It Pass

**MANDATORY.**

```bash
npm test path/to/test.test.ts
```

Confirm:
- Test passes
- Other tests still pass
- Output pristine (no errors, warnings)

#### REFACTOR - Clean Up

After green only:
- Remove duplication
- Improve names
- Extract helpers

Keep tests green. Don't add behavior.

### Common Rationalizations (All Wrong)

| Excuse | Reality |
|--------|---------|
| "Too simple to test" | Simple code breaks. Test takes 30 seconds. |
| "I'll test after" | Tests passing immediately prove nothing. |
| "Already manually tested" | Ad-hoc ≠ systematic. No record, can't re-run. |
| "TDD will slow me down" | TDD faster than debugging. |
| "Keep as reference" | You'll adapt it. That's testing after. Delete means delete. |

### Testing Anti-Patterns

**Never test mock behavior:**
```typescript
// BAD: Testing that the mock exists
expect(screen.getByTestId('sidebar-mock')).toBeInTheDocument();

// GOOD: Test real component behavior
expect(screen.getByRole('navigation')).toBeInTheDocument();
```

**Never add test-only methods to production classes:**
```typescript
// BAD: destroy() only used in tests
class Session {
  async destroy() { /* cleanup */ }
}

// GOOD: Test utilities handle cleanup
export async function cleanupSession(session: Session) { /* cleanup */ }
```

**Never mock without understanding dependencies:**
- Ask: "What side effects does the real method have?"
- Ask: "Does this test depend on any of those side effects?"
- Mock at the lowest level necessary

### Verification Checklist

Before marking work complete:
- [ ] Every new function/method has a test
- [ ] Watched each test fail before implementing
- [ ] Each test failed for expected reason
- [ ] Wrote minimal code to pass each test
- [ ] All tests pass
- [ ] Output pristine (no errors, warnings)
- [ ] Tests use real code (mocks only if unavoidable)
- [ ] Edge cases and errors covered

---

## Subagent-Driven Execution

Create and execute plans by dispatching fresh subagent per task, with review after each.

**Core principle:** Fresh subagent per task + review between tasks = high quality, fast iteration.

### When to Use

**Sequential Execution:**
- Tasks are tightly coupled
- Tasks must be executed in order
- Each task depends on previous results

**Parallel Execution:**
- Tasks are independent (different files, subsystems)
- Overall review can happen after batch completes
- 3+ independent issues to investigate

### Sequential Execution Process

1. **Load Plan** - Read plan file, create TodoWrite with all tasks

2. **Execute Task with Subagent:**
```
Task tool (general-purpose):
  description: "Implement Task N: [task name]"
  prompt: |
    You are implementing Task N from [plan-file].
    1. Implement exactly what the task specifies
    2. Write tests (following TDD)
    3. Verify implementation works
    4. Commit your work
    5. Report back: What you implemented, tested, test results, files changed
```

3. **Review Subagent's Work** - Dispatch code-reviewer subagent

4. **Apply Review Feedback:**
   - Fix Critical issues immediately
   - Fix Important issues before next task
   - Note Minor issues

5. **Mark Complete, Next Task** - Update TodoWrite, repeat

6. **Final Review** - Reviews entire implementation after all tasks

### Parallel Execution Process

1. **Identify Independent Domains** - Group by what's broken
2. **Create Focused Agent Tasks** - Specific scope, clear goal, constraints
3. **Dispatch in Parallel:**
```typescript
Task("Fix agent-tool-abort.test.ts failures")
Task("Fix batch-completion-behavior.test.ts failures")
Task("Fix tool-approval-race-conditions.test.ts failures")
// All three run concurrently
```
4. **Review and Integrate** - Verify no conflicts, run full test suite

### Agent Prompt Structure

Good prompts are:
1. **Focused** - One clear problem domain
2. **Self-contained** - All context needed
3. **Specific about output** - What should agent return?

```markdown
Fix the 3 failing tests in src/agents/agent-tool-abort.test.ts:
1. "should abort tool with partial output" - expects 'interrupted at'
2. "should handle mixed completed/aborted tools" - wrong state
3. "should track pendingToolCount" - expects 3 results, gets 0

These are timing issues. Your task:
1. Read the test file, understand what each test verifies
2. Identify root cause - timing or actual bugs?
3. Fix by replacing arbitrary timeouts with event-based waiting

Do NOT just increase timeouts - find the real issue.
Return: Summary of what you found and what you fixed.
```

### Common Mistakes

| Mistake | Better |
|---------|--------|
| "Fix all the tests" (too broad) | "Fix agent-tool-abort.test.ts" |
| "Fix the race condition" (no context) | Paste error messages and test names |
| No constraints | "Do NOT change production code" |
| "Fix it" (vague output) | "Return summary of root cause and changes" |

### When NOT to Use Parallel

- **Related failures** - Fixing one might fix others
- **Need full context** - Requires seeing entire system
- **Exploratory debugging** - Don't know what's broken yet
- **Shared state** - Agents would interfere

### Red Flags

**Never:**
- Skip code review between tasks
- Proceed with unfixed Critical issues
- Dispatch multiple implementation subagents in parallel (conflicts)
- Implement without reading plan task

**If subagent fails:**
- Dispatch fix subagent with specific instructions
- Don't try to fix manually (context pollution)

---

## Quick Reference

### Architecture Checklist

- [ ] Searched for existing library/service first
- [ ] No generic names (utils, helpers, common)
- [ ] Business logic separate from UI
- [ ] Database queries out of controllers
- [ ] Functions < 50 lines, files < 200 lines

### TDD Checklist

- [ ] Test written first
- [ ] Watched test fail
- [ ] Minimal code to pass
- [ ] All tests green
- [ ] Output pristine

### Subagent Checklist

- [ ] Fresh subagent per task
- [ ] Code review after each task
- [ ] Critical issues fixed before proceeding
- [ ] Final review after all tasks

### Red Flags Summary

| Domain | Red Flag |
|--------|----------|
| Architecture | Writing custom auth, state management, validation |
| Architecture | "utils.js" with 50 unrelated functions |
| TDD | Code before test, test passes immediately |
| TDD | "I'll test after", "too simple to test" |
| Subagent | Skipping review, proceeding with critical issues |
| Subagent | Parallel agents on related failures |

### Mindset

**Software development is about:**
- Using proven solutions (library-first)
- Proving code works (test-first)
- Quality gates (review between tasks)

**Not about:**
- Reinventing the wheel
- "Testing later"
- Rushing through tasks
