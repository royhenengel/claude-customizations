# Workflow: Add New Feature

## When to Use

Adding a new feature to an existing living requirements structure.

## Steps

### 1. Verify Structure Exists

```bash
[ -f features/CLAUDE.md ] && echo "Root exists" || echo "ERROR: Run setup first"
```

If no root exists, suggest running setup workflow first.

### 2. Get Feature Details

Ask user:
```
New feature details:

1. Feature name (kebab-case, e.g., "user-management")
2. Purpose (1-2 sentences)
3. Key requirements (can add more later)

Optional:
4. Any sub-features? (e.g., "oauth" under "authentication")
```

### 3. Create Feature Directory

```bash
mkdir -p features/{feature-name}
```

For sub-features:
```bash
mkdir -p features/{parent}/{subfeature}
```

### 4. Generate CLAUDE.md

Use appropriate template:
- `templates/feature-claude.md` for top-level features
- `templates/subfeature-claude.md` for nested features

Customize with:
- Feature name
- Purpose from user
- Initial requirements (as unchecked items)
- Appropriate parent reference

Write to `features/{feature-name}/CLAUDE.md`.

### 5. Update Feature Map

Read `features/CLAUDE.md` and add new feature to the Feature Map table:

```markdown
| Feature | Status | Last Updated | Notes |
|---------|--------|--------------|-------|
| existing | Implemented | 2024-01-10 | ... |
| new-feature | Planned | 2024-01-15 | [description] |
```

### 6. Confirm Creation

```
Created: features/{feature-name}/CLAUDE.md

Status: Planned
Requirements: {count} items

The feature is now tracked in features/CLAUDE.md.
Claude will see these requirements when working on related code.

Next: Add implementation files and update requirements as you build.
```

## Example

User: "Add a notifications feature with email and push sub-features"

Creates:
```
features/
├── CLAUDE.md                  # Updated feature map
└── notifications/
    ├── CLAUDE.md              # Notifications requirements
    ├── email/
    │   └── CLAUDE.md          # Email sub-feature
    └── push/
        └── CLAUDE.md          # Push sub-feature
```
