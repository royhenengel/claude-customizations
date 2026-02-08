# When and How to Update Requirements

## Trigger: Code Changes

After modifying code files, check if requirements docs need updates.

### What Triggers Updates

| Code Change | Requirement Update |
|-------------|-------------------|
| New file implementing a requirement | Mark requirement `[x]`, add to Implementation Notes |
| Edit that completes functionality | Mark requirement `[x]` |
| New capability added | Add to Implementation Notes, possibly new requirement |
| Refactored/moved files | Update file paths in Implementation Notes |
| Changed patterns/dependencies | Update Architecture/Dependencies sections |
| Bug fix for documented issue | Note in Deviations if significant |

### What Doesn't Trigger Updates

| Code Change | Why No Update |
|-------------|---------------|
| Minor bug fixes | Unless fixing documented requirement |
| Code style changes | Doesn't affect requirements |
| Test file changes | Unless requirements include test coverage |
| Build/config changes | Unless documented as constraint |

## How to Update

### 1. Mark Completed Requirements

Before:
```markdown
- [ ] User can log in with email/password
- [ ] User can reset password via email
```

After implementing login:
```markdown
- [x] User can log in with email/password
- [ ] User can reset password via email
```

### 2. Update Implementation Notes

Add file paths and patterns used:
```markdown
## Implementation Notes

### Files
- `src/auth/login.ts` - Login flow
- `src/auth/password.ts` - Password validation
- `src/components/LoginForm.tsx` - UI

### Patterns Used
- Form validation with Zod schemas
- React Hook Form for state management
```

### 3. Document Deviations

If implementation differs from original plan:
```markdown
## Deviations from Plan

- Originally planned email OTP, switched to authenticator app (delivery issues)
- Added rate limiting (not in original requirements, security improvement)
```

### 4. Update Status and Date

```markdown
**Status**: In Progress → Implemented
**Last Updated**: 2024-01-15
```

### 5. Update Feature Map (Root)

In `features/CLAUDE.md`:
```markdown
| Feature | Status | Last Updated |
|---------|--------|--------------|
| authentication | Implemented | 2024-01-15 |
```

## Automation with Hooks

The PostToolUse hook prompts for updates after Write/Edit operations:

1. Hook fires after code change
2. LLM analyzes what changed
3. Returns suggestion: which CLAUDE.md files may need updates
4. Claude proposes specific changes
5. You approve or modify

### Hook Doesn't Auto-Edit

The hook **suggests** updates, it doesn't make them automatically.
This keeps you in control of documentation quality.

## Manual Review Checklist

When committing, quick check:

- [ ] Any requirements completed? Mark `[x]`
- [ ] New files created? Add to Implementation Notes
- [ ] Patterns/dependencies changed? Update docs
- [ ] Implementation differs from plan? Document deviation
- [ ] Feature status changed? Update status + feature map
