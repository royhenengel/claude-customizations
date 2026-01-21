# Backlog

Persistent record of improvements, ideas, and technical debt discovered during work.

## Quick Wins

- [x] Populate root CLAUDE.md with project context

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
  - **Current**: CLAUDE.md = auto-loaded essentials, claude-code-prefs.md = detailed reference
  - **Question**: Is this separation clear? Should some content move between them?
  - **Deferred**: Works for now, revisit if confusion arises

## Technical Debt

- [x] Consolidate duplicate template files (planning/specs/templates/ vs skills/my-workflow/templates/)
  - **Resolution**: Moved legacy templates to planning/archive/legacy-templates/. The skills/my-workflow/templates/ is now the single source of truth.
- [x] Review and update README.md to reflect new planning/ structure
  - **Resolution**: Updated README.md with current structure, my-workflow commands, and planning/ directory documentation.
