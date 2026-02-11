# Living Requirements

**Living product documentation that evolves with your code.**

Based on Pete's ["The Death of the PRD"](https://www.zerotopete.com/p/the-death-of-the-prd-why-markdown) approach - markdown files with cascading context that update automatically as you build.

## The Problem

Traditional PRDs become outdated the moment development starts. By the time you've built the feature, the spec is fiction. Teams waste time maintaining two sources of truth that inevitably diverge.

## The Solution

Requirements live in your repo as `CLAUDE.md` files organized by feature. Claude Code automatically reads these files (cascading from specific to general), so it always has context. After code changes, a hook prompts you to update the docs. Your requirements evolve with your implementation.

```
features/
├── CLAUDE.md                     # Product vision, principles, feature map
├── authentication/
│   ├── CLAUDE.md                 # Auth requirements
│   └── oauth/
│       └── CLAUDE.md             # OAuth sub-feature
└── billing/
    └── CLAUDE.md                 # Billing requirements
```

## How Cascading Context Works

Claude Code natively reads `CLAUDE.md` files from the current directory and all parent directories. When working on `features/authentication/oauth/`:

1. Reads `features/authentication/oauth/CLAUDE.md` (OAuth specifics)
2. Reads `features/authentication/CLAUDE.md` (auth requirements)
3. Reads `features/CLAUDE.md` (product vision)
4. Reads root `CLAUDE.md` (project instructions)

**No configuration needed.** This is built into Claude Code.

## Quick Start

### 1. Set Up Structure

```
"Set up living requirements for my project"
```

Creates `features/CLAUDE.md` with your product vision and initial feature directories.

### 2. Add Features

```
"Add a notifications feature with email and push sub-features"
```

Creates `features/notifications/CLAUDE.md` and nested sub-feature files.

### 3. Install Auto-Update Hook (Optional)

```
"Install the requirements update hook"
```

Adds a PostToolUse hook that prompts for doc updates after code changes.

## File Templates

### features/CLAUDE.md (Product Root)

```markdown
# MyApp - Product Requirements

## Vision
[What this product does and why]

## Principles
- **Security first**: All auth flows secure by default
- **Progressive disclosure**: Simple by default, powerful when needed

## Feature Map
| Feature | Status | Updated |
|---------|--------|---------|
| authentication | Implemented | 2024-01-15 |
| billing | In Progress | 2024-01-20 |

## Constraints
- Must support iOS 15+ and Android 10+
- API response time < 200ms p95

## Out of Scope (v1)
- Multi-tenant support
- White-labeling
```

### features/{feature}/CLAUDE.md

```markdown
# Authentication Requirements

**Status**: Implemented
**Updated**: 2024-01-15

## Purpose
Secure user authentication with multiple provider options.

## Requirements
- [x] Email/password login
- [x] OAuth (Google, GitHub)
- [ ] MFA with authenticator apps

## Implementation Notes
- **Files**: src/auth/login.ts, src/auth/oauth.ts
- **Patterns**: OAuth 2.0 PKCE, JWT with refresh rotation
- **Dependencies**: @auth0/auth0-react

## Deviations
- Switched from email OTP to authenticator app (delivery issues)

---
*Inherits: [../CLAUDE.md](../CLAUDE.md)*
```

## Auto-Update Hook

The PostToolUse hook fires after Write/Edit operations:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "A code file was modified. Check if features/*/CLAUDE.md files need updating...",
            "timeout": 30000
          }
        ]
      }
    ]
  }
}
```

**What it does:**
1. Analyzes the code change
2. Maps file path to feature (src/auth/* → features/authentication/)
3. Suggests which CLAUDE.md files may need updates
4. You approve or skip

**What it doesn't do:**
- Auto-edit your docs (you stay in control)
- Trigger on features/ edits (prevents loops)

Install location: `.claude/hooks.json` (project) or `~/.claude/hooks.json` (global)

## When to Update Docs

| Code Change | Requirement Update |
|-------------|-------------------|
| New file implementing requirement | Mark `[x]`, add to Implementation Notes |
| Completed functionality | Mark requirement `[x]` |
| New capability added | Add to Implementation Notes |
| Refactored/moved files | Update file paths |
| Changed patterns/dependencies | Update Architecture section |

**Don't update for:** Minor bug fixes, style changes, test-only changes.

## Directory Structure

```
skills/living-requirements/
├── SKILL.md                     # Main skill definition
├── README.md                    # This file
├── templates/
│   ├── root-features-claude.md  # Product-level template
│   ├── feature-claude.md        # Feature template
│   └── subfeature-claude.md     # Nested feature template
├── references/
│   ├── cascading-context.md     # How CLAUDE.md hierarchy works
│   └── update-patterns.md       # When/how to update docs
└── workflows/
    ├── setup-features.md        # Initialize features/ structure
    ├── add-feature.md           # Add new feature
    └── install-hook.md          # Install auto-update hook
```

## Benefits

- **No stale docs**: Requirements update as you build
- **Atomic changes**: Revert code = revert docs
- **Context always available**: Claude sees relevant requirements automatically
- **Single source of truth**: No Confluence/Notion sync needed
- **Onboarding built-in**: New sessions start with full context

## Tips

### Keep Files Concise
Each CLAUDE.md consumes context tokens. Focus on:
- Current state (not history)
- What helps implementation
- Remove obsolete info

### Don't Over-Nest
2-3 levels is usually enough:
- `features/CLAUDE.md` (product)
- `features/auth/CLAUDE.md` (feature)
- `features/auth/oauth/CLAUDE.md` (sub-feature, if complex)

### Use Relative Links
Reference parent context explicitly:
```markdown
*Inherits: [../CLAUDE.md](../CLAUDE.md)*
```

## FAQ

### How is this different from taches-create-plans?

| Aspect | **living-requirements** | **taches-create-plans** |
|--------|------------------------|------------------------|
| **Purpose** | Product requirements (what to build) | Execution plans (how to build it) |
| **Audience** | Product thinking | Implementation thinking |
| **Lifecycle** | Lives forever, evolves with product | Temporary, deleted after execution |
| **Location** | `features/` | `.planning/` |
| **Updates** | After every code change | Only during active development phase |

**taches-create-plans** breaks work into phases, tasks, and prompts that Claude executes (BRIEF.md → ROADMAP.md → PLAN.md → SUMMARY.md). Once the feature ships, planning artifacts are done.

**living-requirements** describes what features exist, their requirements, and implementation status. Claude reads these to understand the product when working on ANY task. They evolve with the product forever.

**They work together:**
1. **living-requirements**: Define what "authentication" feature should do
2. **taches-create-plans**: Plan HOW to build it (phases, tasks)
3. Execute plan: Build the feature
4. **living-requirements**: Update requirements to reflect what was built

### How is this different from Plan Mode?

| Aspect | **Plan Mode** (built-in) | **taches-create-plans** (skill) |
|--------|--------------------------|--------------------------------|
| **Scope** | Single task/feature | Multi-phase projects |
| **Output** | One plan file, then execute | Hierarchy: Brief → Roadmap → Phase Plans → Summaries |
| **Duration** | One conversation | Spans multiple sessions |
| **Context** | Current session only | Handoffs preserve context across sessions |
| **Complexity** | "Add dark mode" | "Build entire auth system over 2 weeks" |

**Plan Mode** is quick planning for immediate execution - explore, design, approve, execute in one session.

**taches-create-plans** is project management for multi-session work with roadmaps, handoffs, summaries, deviation rules, and milestone tracking.

| Situation | Use |
|-----------|-----|
| "Add a logout button" | Plan mode |
| "Refactor the API layer" | Plan mode |
| "Build a social network" | taches-create-plans |
| Will finish today | Plan mode |
| Will take multiple sessions | taches-create-plans |

### What about taches-create-hooks?

**taches-create-hooks** is a meta-skill that teaches how to create hooks. It's a reference/guide.

**living-requirements** uses hooks (via `workflows/install-hook.md`) for auto-update prompts, while **taches-create-hooks** teaches how hooks work in general.

## Credits

Based on ["The Death of the PRD: Why Markdown Files Are the Future of Product Requirements"](https://www.zerotopete.com/p/the-death-of-the-prd-why-markdown) by Pete (Zero to Pete).
