# Cascading Context in Claude Code

## How It Works

Claude Code automatically reads `CLAUDE.md` files from:
1. The current working directory
2. All parent directories up to the project root

This is **native behavior** - no configuration needed.

## Example

Given this structure:
```
project/
├── CLAUDE.md                     # Project instructions
├── features/
│   ├── CLAUDE.md                 # Product requirements
│   └── authentication/
│       ├── CLAUDE.md             # Auth requirements
│       └── oauth/
│           └── CLAUDE.md         # OAuth requirements
```

When Claude works on a file in `features/authentication/oauth/`:
- Reads `features/authentication/oauth/CLAUDE.md`
- Reads `features/authentication/CLAUDE.md`
- Reads `features/CLAUDE.md`
- Reads `CLAUDE.md` (project root)

**Context flows from general to specific.** Claude sees the full hierarchy.

## Why This Matters

### For Requirements
- Product vision lives at `features/CLAUDE.md`
- Feature details at `features/{feature}/CLAUDE.md`
- Implementation specifics at deeper levels
- All context available when working on any feature

### For Implementation
- When editing `src/auth/oauth.ts`, Claude knows:
  - Project coding standards (root CLAUDE.md)
  - Product principles (features/CLAUDE.md)
  - Auth requirements (features/authentication/CLAUDE.md)
  - OAuth specifics (features/authentication/oauth/CLAUDE.md)

## Best Practices

### Keep Files Focused
Each level should add NEW context, not repeat parent content:
- Root: Project-wide info
- features/: Product vision, feature map
- features/X/: X-specific requirements only

### Use Relative Links
Reference parent context with relative paths:
```markdown
*Inherits: [../CLAUDE.md](../CLAUDE.md)*
```

### Don't Over-Nest
2-3 levels is usually enough:
- `features/CLAUDE.md` (product)
- `features/auth/CLAUDE.md` (feature)
- `features/auth/oauth/CLAUDE.md` (sub-feature, if complex)

Deeper nesting adds context load without proportional benefit.

## Token Considerations

Each CLAUDE.md file consumes context tokens. Keep them:
- **Concise**: Focus on current state, not history
- **Relevant**: Only what helps implementation
- **Updated**: Remove obsolete information

Typical sizes:
- Root features/CLAUDE.md: 200-500 tokens
- Feature CLAUDE.md: 300-800 tokens
- Subfeature CLAUDE.md: 100-300 tokens
