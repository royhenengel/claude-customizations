# Coding Standards

**Domain:** Code quality - style conventions, validation patterns, and size limits for all code in this repo.

## Immutability

Prefer immutable patterns. Create new objects instead of mutating.

NEVER:
```javascript
user.name = newName;
```

ALWAYS:
```javascript
const updatedUser = { ...user, name: newName };
```

## Input Validation

Validate at system boundaries using schema libraries.

```typescript
const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().positive().optional(),
});
```

## Size Limits

| Metric | Limit | Rationale |
|--------|-------|-----------|
| File length | 200 lines (soft), 400 max | Readability |
| Function length | 50 lines | Single responsibility |
| Nesting depth | 4 levels | Cognitive load |
| Parameters | 5 per function | Complexity signal |

## Quality Checklist

Before completion:
- [ ] Names are descriptive (not i, j, x, temp)
- [ ] Functions under 50 lines
- [ ] Files under 400 lines
- [ ] Nesting under 4 levels
- [ ] Error handling complete
- [ ] No console.log/debugger statements
- [ ] No magic numbers (use named constants)
- [ ] Immutable patterns used
- [ ] No secrets or credentials in files (see security-checklist.md)
- [ ] Follows existing codebase patterns (see technical-consistency.md)
