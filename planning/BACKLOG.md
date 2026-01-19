# Backlog

Persistent record of improvements, ideas, and technical debt discovered during work.

## Quick Wins

- [x] Populate root CLAUDE.md with project context

## Improvements

- [ ] Revisit workflow task granularity (see 001-my-workflow migration)
  - **Issue**: Original tasks.md had 60 tasks across 7 phases with dependency tracking, spike references, and per-task verification. New PLAN.md condenses to ~5 high-level tasks.
  - **Observation**: For completed features this is fine (history captured), but during active development the detailed breakdown may be valuable.
  - **Questions**: Is "plans as prompts" philosophy too aggressive? Should there be a separate detailed task tracker?
  - **Context from previous chat**:
      Looking at the original tasks.md, it had 60 detailed tasks across 7 phases with     extensive implementation notes, checkpoints, and dependency tracking. The new PLAN.md format is designed to be much more concise - just 2-3 tasks max per plan, focused on execution.

      The issue is that the original feature was a large, multi-phase effort that doesn't fit the new "plans are prompts" philosophy. The detailed task breakdown was useful during implementation but isn't appropriate for the new format.

      However, since this feature is already complete, the PLAN.md should serve as a historical record. Let me check what key information was lost and whether it matters:

      Lost from tasks.md:

      60 individual task IDs with status tracking
      Phase-by-phase breakdown (7 phases)
      Detailed dependency graph
      Spike documentation references
      Curation results summary
      Per-task verification notes
      What matters for a completed feature:

      What was done (summary) ✓
      Key decisions made → in RESEARCH.md ✓
      Final verification → in PLAN.md ✓
      For a completed feature, the detailed task tracking isn't needed - it served its    purpose during implementation. The condensed PLAN.md captures the essence.
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

## Technical Debt

- [x] Consolidate duplicate template files (planning/specs/templates/ vs skills/my-workflow/templates/)
  - **Resolution**: Moved legacy templates to planning/archive/legacy-templates/. The skills/my-workflow/templates/ is now the single source of truth.
- [x] Review and update README.md to reflect new planning/ structure
  - **Resolution**: Updated README.md with current structure, my-workflow commands, and planning/ directory documentation.
