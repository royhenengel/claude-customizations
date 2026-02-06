---
description: Review code changes with comprehensive checklist
arguments:
  - name: target
    description: PR number, branch name, commit range, or file path (default: staged changes)
    required: false
---

Review code changes systematically with a comprehensive checklist.

## Process

### 1. Determine review scope

**If {{target}} provided:**
- PR number (e.g., `123`): `gh pr diff 123`
- Branch name: `git diff main...{{target}}`
- Commit range (e.g., `abc..def`): `git diff {{target}}`
- File path: `git diff HEAD -- {{target}}`

**If no target:**
- Staged changes: `git diff --cached`
- If nothing staged: `git diff`

### 2. Gather context

```bash
git diff [target] --stat
git diff [target]
```

If PR, also fetch:
```bash
gh pr view [number] --json title,body,author,labels
```

### 3. Review checklist

#### Correctness
- [ ] Logic is correct and handles edge cases
- [ ] No obvious bugs or errors
- [ ] Error handling is appropriate
- [ ] Null/undefined checks where needed

#### Security
- [ ] No hardcoded secrets or credentials
- [ ] Input validation present
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Authentication/authorization correct

#### Performance
- [ ] No N+1 queries
- [ ] No unnecessary loops or iterations
- [ ] Appropriate data structures used
- [ ] No memory leaks

#### Code Quality
- [ ] Clear naming (variables, functions, classes)
- [ ] Functions are focused (single responsibility)
- [ ] No excessive complexity
- [ ] DRY - no unnecessary duplication
- [ ] Consistent style with codebase

#### Testing
- [ ] Tests cover new functionality
- [ ] Edge cases tested
- [ ] Tests are meaningful (not just coverage)
- [ ] No flaky test patterns

#### Documentation
- [ ] Public APIs documented
- [ ] Complex logic explained
- [ ] README updated if needed
- [ ] Breaking changes noted

#### Architecture
- [ ] Follows existing patterns
- [ ] Dependencies appropriate
- [ ] No circular dependencies
- [ ] Separation of concerns maintained

### 4. Generate review

## Output Format

```markdown
# Code Review: [target description]

## Summary
[1-2 sentence overview of what the changes do]

## Checklist Results

### ✅ Passing
- Correctness: Logic appears sound
- Security: No obvious vulnerabilities
- [etc.]

### ⚠️ Warnings
- **Performance**: Consider memoizing expensive calculation in `useData` hook
- **Testing**: Missing test for error case in `fetchUser`

### ❌ Issues
- **Security**: API key exposed in config.ts line 42
- **Bug**: Off-by-one error in pagination logic

## Detailed Findings

### Issue 1: [Title]
**File**: `path/to/file.ts:42`
**Severity**: High | Medium | Low
**Category**: Security | Bug | Performance | Style

**Problem**:
[Description of the issue]

**Suggestion**:
```typescript
// Suggested fix
```

### Issue 2: [Title]
[...]

## Suggestions (Non-blocking)
- Consider extracting [X] into a shared utility
- This pattern could be simplified with [Y]

## Verdict
- ✅ **Approve**: Ready to merge
- ⚠️ **Request Changes**: Issues need addressing
- 💬 **Comment**: Suggestions only, can merge as-is
```

### 5. Interactive mode

After presenting review, ask:
```
Actions:
1. Apply suggested fixes automatically
2. Add comments to PR (if PR review)
3. Generate commit with fixes
4. Done
```

## Severity Guide

**High**: Must fix before merge
- Security vulnerabilities
- Data loss potential
- Breaking functionality
- Production crashes

**Medium**: Should fix, but not blocking
- Performance issues
- Missing error handling
- Incomplete tests

**Low**: Nice to fix, optional
- Style inconsistencies
- Minor optimizations
- Documentation gaps
