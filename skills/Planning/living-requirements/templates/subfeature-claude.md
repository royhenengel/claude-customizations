# Template: features/{feature}/{subfeature}/CLAUDE.md

Simplified template for nested sub-features:

---

```markdown
# [Subfeature Name]

**Status**: Planned | In Progress | Implemented
**Updated**: YYYY-MM-DD
**Parent**: [../CLAUDE.md](../CLAUDE.md)

## Purpose

[1-2 sentences - what this specific sub-feature handles]

## Requirements

- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [x] [Completed]

## Implementation

- **Files**: `src/auth/oauth/google.ts`, `src/auth/oauth/github.ts`
- **Patterns**: OAuth 2.0 PKCE, provider abstraction layer

## Notes

[Any specific implementation details or deviations]

---

*Inherits: [../../CLAUDE.md](../../CLAUDE.md) > [../CLAUDE.md](../CLAUDE.md)*
```
