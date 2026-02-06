# Template: features/{feature}/CLAUDE.md

Copy and customize for each feature:

---

```markdown
# [Feature Name] Requirements

**Status**: Planned | In Progress | Implemented | Deprecated
**Last Updated**: YYYY-MM-DD

## Purpose

[2-3 sentences explaining what this feature does and why users need it. Reference user problems it solves.]

## User Stories

- As a [user type], I want to [action] so that [benefit]
- As a [user type], I want to [action] so that [benefit]

## Requirements

### Functional

- [ ] [Requirement 1 - specific, testable]
- [ ] [Requirement 2]
- [x] [Completed requirement - marked after implementation]

### Non-Functional

- [ ] **Performance**: [e.g., "Login < 500ms on 3G"]
- [ ] **Security**: [e.g., "Passwords hashed with bcrypt, min 12 rounds"]
- [ ] **Accessibility**: [e.g., "WCAG 2.1 AA compliant"]

## Architecture Notes

[Brief notes on how this feature is structured, key decisions made]

- Pattern: [e.g., "Repository pattern for data access"]
- State: [e.g., "Redux slice for auth state"]
- API: [e.g., "REST endpoints under /api/auth/*"]

## Implementation Notes

<!-- This section auto-updates as code changes -->

### Files

- `src/auth/login.ts` - Login flow
- `src/auth/oauth.ts` - OAuth providers
- `src/components/LoginForm.tsx` - UI component

### Dependencies

- `@auth0/auth0-react` - OAuth library
- `bcrypt` - Password hashing

### Patterns Used

- OAuth 2.0 with PKCE flow
- JWT tokens with refresh rotation
- Rate limiting: 100 req/min per IP

## Deviations from Plan

[Document any differences between original requirements and actual implementation]

- [e.g., "Switched from email OTP to authenticator app due to delivery issues"]

## Open Questions

- [Question 1 - needs product decision]
- [Question 2 - needs technical investigation]

## Related Features

- [Link to related feature] - [relationship]

---

*Inherits context from: [../CLAUDE.md](../CLAUDE.md)*
```
