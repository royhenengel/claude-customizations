# My Workflow System Specification

## Goal

Create a personalized workflow system with 4 commands (`/start`, `/plan`, `/build`, `/stop`) that consolidate scattered patterns (taches, CEK, GSD, living-requirements) into one cohesive system. The system provides clear stage transitions, maintains principles (scope control, deviation rules) across all stages, and enables context handoffs before hitting limits.

## User Stories

- As a developer with too many installed skills, I want to organize them into "active" and "reference" categories, so that my Claude Code only loads the skills I actually use while keeping the others available for learning.

- As someone building a custom workflow, I want to understand the key patterns from GSD, CEK, taches, and cascading context, so that I can cherry-pick the best ideas without adopting entire systems.

- As a solo developer, I want to create a small set of commands that handle my actual work patterns, so that I have ONE way to do things instead of choosing between 50 similar commands.

- As my needs evolve, I want to easily add new commands or modify existing ones, so that my workflow grows with me instead of becoming stale.

## Requirements

### Functional

- [x] System MUST provide a curation workflow to categorize installed skills as active, reference, or remove
- [x] System MUST create a `~/.claude/reference/` directory structure for archived skills
- [x] Research documentation MUST include pattern analysis comparing GSD, CEK, taches, and cascading context
- [x] System MUST create custom commands with direct verbs (`/start`, `/plan`, `/build`, `/stop`)
- [x] Core workflow commands MUST integrate the best patterns:
  - Context engineering and handoffs (GSD)
  - Specification-driven development (CEK)
  - Atomic execution with deviation handling (taches)
  - Living requirements with cascading context
- [x] System MUST support restoring skills from reference back to active
- [x] All custom commands MUST follow the skill-first design principle
- [x] System MUST NOT require understanding all underlying systems - the workflow abstracts complexity

### Non-Functional

- [x] Active skills list reduced by at least 50% after curation
- [x] Can complete typical project using only workflow commands
- [x] Can find answers in reference materials within 2 minutes
- [x] Adding a new command takes less than 10 minutes

## Constraints

- Single user only - no team features or multi-user considerations
- The claude-customizations repository must be symlinked to ~/.claude/
- Prefer fewer, better commands over many specialized ones
- Commands use direct verbs to avoid conflicts with existing commands

## Success Criteria

- [x] After curation, active skills list reduced by at least 50%
- [x] Can complete a typical project (start → plan → build → stop) using only workflow commands
- [x] When forgetting how something works, can find the answer in reference materials within 2 minutes
- [x] Custom commands feel like ONE coherent system, not a patchwork of borrowed parts
- [x] Adding a new command to workflow takes less than 10 minutes

## Open Questions

None - all questions resolved during implementation.

---

## Validation Checklist

Before creating PLAN.md, verify:

- [x] No `[NEEDS CLARIFICATION]` markers remain
- [x] All requirements are testable (can verify pass/fail)
- [x] Success criteria are measurable
- [x] Scope boundaries are clear (what's NOT included)
- [x] No implementation details in requirements (WHAT not HOW)
