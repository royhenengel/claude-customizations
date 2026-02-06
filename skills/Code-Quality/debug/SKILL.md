---
name: debug
description: Systematic debugging workflow
arguments:
  - name: issue
    description: Description of the bug or issue (or 'interactive' for guided debugging)
    required: false
---

Systematic approach to finding and fixing bugs.

## Process

### 1. Understand the Problem

**If {{issue}} provided:**
Parse the issue description for:
- Expected behavior
- Actual behavior
- Steps to reproduce
- Error messages

**If interactive or no issue:**
Ask structured questions:
```
Let's debug this systematically.

1. What's the expected behavior?
2. What's actually happening?
3. When did it start? (always/recently/specific action)
4. Any error messages?
5. Can you reproduce it consistently?
```

### 2. Gather Evidence

```bash
# Check for error logs
cat logs/error.log 2>/dev/null | tail -50

# Check git history for recent changes
git log --oneline -10
git diff HEAD~5 --stat

# Check test status
npm test 2>/dev/null || yarn test 2>/dev/null
```

### 3. Form Hypotheses

Based on evidence, form ranked hypotheses:

```markdown
## Hypotheses (ranked by likelihood)

1. **[Most likely]**: [description]
   - Evidence: [why this is likely]
   - Test: [how to verify]

2. **[Second likely]**: [description]
   - Evidence: [why this is possible]
   - Test: [how to verify]

3. **[Less likely]**: [description]
   - Evidence: [some indication]
   - Test: [how to verify]
```

### 4. Test Hypotheses

For each hypothesis (starting with most likely):

1. **Isolate**: Can we reproduce in isolation?
2. **Verify**: Add logging/breakpoints to confirm
3. **Test**: Write a failing test that demonstrates the bug

```bash
# Add strategic logging
# Run specific test
# Check behavior
```

### 5. Find Root Cause

Once hypothesis confirmed:

- **What**: Exactly what code is causing the issue?
- **Why**: Why does this code behave incorrectly?
- **When**: Under what conditions does it fail?
- **Where**: What's the call stack / data flow?

### 6. Fix and Verify

1. **Minimal fix**: Change only what's necessary
2. **Test fix**: Verify the fix works
3. **Regression check**: Ensure nothing else broke
4. **Add test**: Write test that would catch this bug

## Debugging Techniques

### Console/Logging
```typescript
console.log('[DEBUG] Variable state:', { var1, var2 });
console.trace('Call stack at this point');
```

### Binary Search
For "it was working before":
```bash
git bisect start
git bisect bad HEAD
git bisect good [known-good-commit]
# Test each commit git bisect suggests
```

### Rubber Duck
Explain the problem out loud:
1. What should happen?
2. What actually happens?
3. What have I tried?
4. What assumptions am I making?

### Minimal Reproduction
Create smallest possible case that reproduces:
1. Remove unrelated code
2. Hardcode values
3. Isolate the failing path

## Output Format

```markdown
# Debug Report: [Issue Summary]

## Problem
**Expected**: [behavior]
**Actual**: [behavior]
**Reproducible**: Yes/No/Sometimes

## Investigation

### Evidence Gathered
- [finding 1]
- [finding 2]

### Hypotheses Tested
1. ❌ [hypothesis 1] - ruled out because [reason]
2. ✅ [hypothesis 2] - confirmed

## Root Cause
**File**: `path/to/file.ts:42`
**Issue**: [clear explanation]
**Why**: [why this causes the bug]

## Fix

### Changes Made
```diff
- old code
+ new code
```

### Verification
- [x] Bug no longer reproduces
- [x] Existing tests pass
- [x] New test added for this case

## Prevention
[How to prevent similar bugs in future]
```

## Common Bug Patterns

### Race Conditions
- Async operations completing out of order
- State updates during render
- Multiple event handlers

### Null/Undefined
- Missing null checks
- Optional chaining needed
- Default values missing

### State Management
- Stale closures
- Mutating state directly
- Missing dependencies in hooks

### Off-by-One
- Array index bounds
- Loop conditions
- Pagination logic

### Type Coercion
- `==` vs `===`
- Truthy/falsy confusion
- String/number mixing
