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

Functions <50 lines, files 200 (soft)/400 max, nesting <4 levels, parameters <5.

## Data Integrity

When generating summary statistics, counts, or aggregates from source data (tables, lists, arrays):
- Verify totals programmatically against source data before committing
- Never rely on manual counting for datasets over 10 items
- If a summary section exists alongside source data, both must reconcile

## Quality Checklist

Before completion:

- [ ] Names are descriptive (not i, j, x, temp)
- [ ] No hardcoded paths
- [ ] Immutable patterns used
- [ ] No secrets or credentials in files (see security-checklist.md)
- [ ] Follows existing codebase patterns (see technical-consistency.md)
- [ ] Aggregate statistics verified against source data
