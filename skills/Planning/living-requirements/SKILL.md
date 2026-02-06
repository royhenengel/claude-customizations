---
name: living-requirements
description: Manage living product requirements that evolve with code. Use when setting up features/ directory structure, creating new feature requirements, or understanding cascading context. Based on Pete's "Death of the PRD" approach.
---

<objective>
Enable living product requirements using Claude Code's native CLAUDE.md hierarchy.
Requirements in `features/` cascade context from root to feature to sub-feature.
A PostToolUse hook prompts for doc updates after code changes.
</objective>

<core_principles>

<principle name="requirements_are_living">
Requirements are not static specs that become outdated.
They START as intent/design BEFORE implementation.
They UPDATE to reflect reality AFTER implementation.
They TRACK what was built vs. what was planned.
They SERVE as onboarding for future Claude sessions.
</principle>

<principle name="cascading_context">
Claude Code automatically reads CLAUDE.md files from current directory + all parents to root.
This enables natural context inheritance:
- `features/CLAUDE.md` - Product-level requirements & principles
- `features/auth/CLAUDE.md` - Auth requirements (inherits product context)
- `features/auth/oauth/CLAUDE.md` - OAuth requirements (inherits auth + product)

When working on `features/auth/oauth/`, Claude sees ALL THREE files automatically.
</principle>

<principle name="docs_evolve_with_code">
After code changes, relevant `features/*/CLAUDE.md` files should update:
- Mark completed requirements with [x]
- Update Implementation Notes with file paths and patterns
- Document deviations from original plan
- Update status and last-updated date

The PostToolUse hook prompts for these updates automatically.
</principle>

<principle name="single_source_of_truth">
These files ARE the requirements. Not Confluence. Not Notion. Not a PRD somewhere.
They live with the code. They evolve with the code. They can't become stale.
If you revert code, you revert the docs too.
</principle>

</core_principles>

<quick_reference>

| Need | Command |
|------|---------|
| Set up features/ structure | "set up living requirements" or `/living-requirements setup` |
| Add a new feature | "add auth feature" or `/living-requirements add auth` |
| Install auto-update hook | "install requirements hook" or `/living-requirements hook` |
| Update docs after changes | Hook prompts automatically, or manually review |

</quick_reference>

<intake>
Based on user request, route to appropriate workflow:

| Request | Workflow |
|---------|----------|
| "setup", "initialize", "create features" | `workflows/setup-features.md` |
| "add feature", "new feature", "create X" | `workflows/add-feature.md` |
| "install hook", "auto-update", "hook" | `workflows/install-hook.md` |
| "how does cascading work", "explain" | Read `references/cascading-context.md` and explain |
| "when to update", "update rules" | Read `references/update-patterns.md` and explain |

If request unclear, ask:
```
What would you like to do?
1. Set up features/ structure (first time)
2. Add a new feature
3. Install auto-update hook
4. Understand how it works
```
</intake>

<directory_structure>
When set up, a project looks like:

```
project/
├── features/
│   ├── CLAUDE.md                 # Product requirements (root)
│   ├── authentication/
│   │   ├── CLAUDE.md             # Auth requirements
│   │   └── oauth/
│   │       └── CLAUDE.md         # OAuth sub-feature
│   └── billing/
│       └── CLAUDE.md             # Billing requirements
├── src/                          # Source code
└── .claude/
    └── hooks.json                # Auto-update hook (optional)
```

**Naming**: Use kebab-case for feature directories (e.g., `user-management`, `payment-processing`).
</directory_structure>

<templates_index>
| Template | Purpose |
|----------|---------|
| `templates/root-features-claude.md` | Product-level `features/CLAUDE.md` |
| `templates/feature-claude.md` | Feature-level `features/{feature}/CLAUDE.md` |
| `templates/subfeature-claude.md` | Nested feature (simplified) |
</templates_index>

<references_index>
| Reference | Content |
|-----------|---------|
| `references/cascading-context.md` | How Claude reads CLAUDE.md hierarchy |
| `references/update-patterns.md` | When and how to update requirements |
</references_index>

<workflows_index>
| Workflow | Purpose |
|----------|---------|
| `workflows/setup-features.md` | Initialize features/ structure |
| `workflows/add-feature.md` | Add a new feature with template |
| `workflows/install-hook.md` | Install PostToolUse auto-update hook |
</workflows_index>

<success_criteria>
This skill succeeds when:
- User has `features/` directory with root CLAUDE.md
- Features have individual CLAUDE.md files with requirements
- (Optional) Hook installed to prompt for updates after code changes
- Requirements stay in sync with implementation over time
</success_criteria>
