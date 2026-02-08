# Template: features/CLAUDE.md (Product Root)

Copy and customize for `features/CLAUDE.md`:

---

```markdown
# [Project Name] - Product Requirements

## Vision

[One paragraph describing what this product does and why it exists. This is the north star that guides all feature decisions.]

## Principles

Design principles that apply to ALL features:

- **[Principle 1]**: [e.g., "Security first - all auth flows secure by default"]
- **[Principle 2]**: [e.g., "Progressive disclosure - simple by default, powerful when needed"]
- **[Principle 3]**: [e.g., "Offline-capable - core features work without network"]

## Feature Map

| Feature | Status | Last Updated | Notes |
|---------|--------|--------------|-------|
| [authentication](./authentication/) | Implemented | YYYY-MM-DD | OAuth + MFA |
| [billing](./billing/) | In Progress | YYYY-MM-DD | Stripe integration |
| [notifications](./notifications/) | Planned | YYYY-MM-DD | Email + push |

## Technical Constraints

Constraints that affect implementation decisions:

- [e.g., "Must support iOS 15+ and Android 10+"]
- [e.g., "API response time < 200ms p95"]
- [e.g., "All data encrypted at rest"]

## Out of Scope (v1)

Explicitly NOT building in this version:

- [Feature X - planned for v2]
- [Feature Y - evaluating need]

---

*This file provides context to all features. Claude reads it automatically when working in any features/ subdirectory.*
```
