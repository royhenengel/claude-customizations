# Backlog

Persistent record of improvements, ideas, and technical debt discovered during work.

## Quick Wins

- [x] Populate root CLAUDE.md with project context
- [x] Wire TDD and Clean Architecture into My-Workflow (similar to CEK)
  - **Resolution**: Added Development Discipline as Core Principle #1 in SKILL.md
  - **Changes made**:
    - Added TDD (Iron Law, RED-GREEN-REFACTOR cycle) to SKILL.md and build.md
    - Added Clean Architecture (library-first, naming conventions, size limits) to both files
    - Added Step 9 Quality Review (3 parallel agents) to build.md
    - Added Development Discipline Quick Check to SKILL.md
    - Updated subagent prompt in Step 5 with TDD/Clean Architecture reminders
  - **Decision**: TDD and Clean Architecture are now explicitly wired into /build, not relying on skill composition

## Improvements

- [x] Revisit workflow task granularity (see 001-my-workflow migration)
  - **Resolution**: Decided to adopt GSD/CEK "everything documented" style instead of "plans as prompts" philosophy.
  - **Changes made**:
    - Removed 2-3 task cap from plan.md workflow
    - Enhanced task template with Context, Dependencies, detailed Action sections
    - Added optional artifacts (data-model.md, contract.md, design-options.md)
    - Updated SKILL.md with new project structure
  - **Decision**: Document everything needed for implementation. Plans should be comprehensive enough that any developer (or Claude session) can execute without ambiguity.
- [ ] Create /curate command for skill organization (deferred - manual process for now)
- [ ] Add skill dependency validation
- [ ] Create skill testing framework
- [ ] Skill versioning and changelog automation
- [ ] Skill health check command
- [ ] Commit every code change and use git history as context for fixes (avoid retrying failed solutions)
- [ ] Audit agents
- [ ] Audit skills vs agents distinction
  - **Question**: Should some skills be agents instead? (e.g., diagrams-builder)
  - **Criteria to evaluate**: Is it always-on context vs on-demand invocation?
  - **Examples to review**: diagrams-builder, notion-* skills, debugging-practices
- [ ] Improve the diagram builder.
- [ ] Document strategic decisions and rules automatically.
      For example No title truncating, Numbered List for Suggestions etc
- [ ] Double check and compare the Ralph Wiggum while loop impl with my workflow
- [ ] Add lightweight mode to My-Workflow
  - **Context**: Some tasks don't need full workflow overhead (spec, research, plan files)
  - **Idea**: Auto-detect simple tasks and use TodoWrite + direct execution instead
  - **Triggers to consider**: Single file change, quick fix, less than 3 steps
  - **Deferred**: Decided to stick with full workflow for now; add lightweight mode later if needed
- [ ] Consolidate CLAUDE.md and claude-code-prefs.md relationship
  - **Current**: CLAUDE.md = auto-loaded essentials, claude-code-prefs.md = detailed reference in docs/
  - **Status**: Deferred - the separation works, but claude-code-prefs.md is orphaned (not referenced from CLAUDE.md)
  - **Analysis** (2026-01-21):
    - claude-code-prefs.md has useful content: tool selection guide, session management, context preservation strategies
    - Some content is stale (predates my-workflow, references PREFERENCES.md which doesn't exist)
    - Context preservation now handled by /stop and HANDOFF.md
  - **Options when revisiting**:
    1. Archive it (my-workflow supersedes most content)
    2. Keep but link from CLAUDE.md and update stale references
    3. Extract still-valuable content (tool selection guide) to dedicated doc

## Technical Debt

- [x] Consolidate duplicate template files (planning/specs/templates/ vs skills/my-workflow/templates/)
  - **Resolution**: Moved legacy templates to planning/archive/legacy-templates/. The skills/my-workflow/templates/ is now the single source of truth.
- [x] Review and update README.md to reflect new planning/ structure
  - **Resolution**: Updated README.md with current structure, my-workflow commands, and planning/ directory documentation.
