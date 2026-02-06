# Workflow: Set Up Features Structure

## When to Use

First-time setup of living requirements in a project.

## Steps

### 1. Check Current State

```bash
ls -la features/ 2>/dev/null || echo "No features/ directory"
ls -la .claude/ 2>/dev/null || echo "No .claude/ directory"
```

### 2. Gather Project Info

Ask user:
```
To set up living requirements, I need:
1. Project name (for the root CLAUDE.md)
2. 2-3 core principles that guide feature decisions
3. Initial features to create (can add more later)

Example principles:
- "Security first"
- "Mobile-first design"
- "Offline-capable"
```

### 3. Create Directory Structure

```bash
mkdir -p features
mkdir -p .claude
```

### 4. Create Root features/CLAUDE.md

Use template from `templates/root-features-claude.md`.

Customize with:
- Project name
- User's principles
- Initial feature map (can be empty or placeholder)
- Any known constraints

Write to `features/CLAUDE.md`.

### 5. Create Initial Feature Directories

For each initial feature:
```bash
mkdir -p features/{feature-name}
```

Use template from `templates/feature-claude.md`.
Write to `features/{feature-name}/CLAUDE.md`.

### 6. Offer Hook Installation

```
Features structure created!

Would you like to install the auto-update hook?
This prompts for requirement updates after code changes.

1. Yes, install hook
2. No, I'll update manually
```

If yes, follow `workflows/install-hook.md`.

## Output

```
features/
├── CLAUDE.md                 # Product requirements
├── authentication/
│   └── CLAUDE.md             # Auth feature
└── billing/
    └── CLAUDE.md             # Billing feature
```

## Success Message

```
Living requirements set up!

Structure:
- features/CLAUDE.md - Product vision and feature map
- features/{feature}/CLAUDE.md - Feature-specific requirements

Next steps:
1. Review and customize the generated files
2. Add requirements to each feature
3. (Optional) Install auto-update hook with `/living-requirements hook`

When you work on code, Claude will see relevant requirements automatically.
After changes, update the docs to keep them in sync.
```
