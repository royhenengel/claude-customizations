# Project State

**Stage**: building
**Last Updated**: 2026-02-08

## Active Feature

(None - between features)

## Feature Registry

| Feature                          | Status   |
|----------------------------------|----------|
| enhance-research-template        | complete |
| commands-skills-migration        | complete |
| audit-agents                     | complete |
| my-workflow-visual-design        | complete |
| clarify-blockers                 | complete |
| automate-stop                    | complete |
| everything-claude-code-migration | complete |
| reddit-mcp-server                | complete |
| auto-trigger-fix                 | complete |
| repo-documentation               | active   |

## Current Focus

repo-documentation feature in progress (worktree at ~/worktrees/claude-customizations/repo-documentation).

## Decisions

- (2026-02-07) Workflow: Parallel work mode enabled. Multiple features can be active in separate worktrees. Single-active constraint temporarily suspended.
- (2026-02-06) Workflow: Decouple worktree creation from /plan and /build. Worktree is conversational setup, auto-opens VS Code window. /plan and /build are directory-agnostic. Project-local .worktrees/ default. See specs/my-workflow/WORKTREE-WORKFLOW.md.
- (2026-02-05) Workflow: Worktree creation moved from /build to /plan (Step 3a). All feature artifacts now live in feature branch from start. (Superseded by 2026-02-06 decision)
- (2026-02-05) commands-skills-migration: Skills-only structure chosen (migrate all commands to skills/, archive commands/). CEK commands will be consolidated into single skill with references/.
- (2026-02-03) my-workflow-visual-design: Visual format uses thick lines (━), icon + text, 50 char minimum, polished/professional/warm tone
- (2026-01-31) Selected reddit-mcp-buddy: npm package (technical consistency), ~360 stars, optional auth (anonymous 10 req/min)
- (2026-01-31) claude-mem installed via plugin system (v9.0.12) instead of manual hooks - cleaner, auto-updates
- (2026-01-31) **Pivot**: claude-mem replaces Phase 1 (session hooks). Phase 3 modified to integrate instinct system with claude-mem's SQLite. Task count reduced from 22 to 18.
- (2026-01-28) Integrate 3 features from affaan-m/everything-claude-code: session hooks, rules system, continuous learning v2
- (2026-01-28) Gap Protocol requires user approval before modifying plan (consistency with Rule 4)
- (2026-01-28) Rules 1-3 tested by design (same pattern as 4/5)
- (2026-01-22) AI Chat Prefs stored in repo with symlink to ~/.claude/, loaded via SessionStart hook for cross-tool consistency
- (2026-01-22) Added HTTP transport + OAuth to code-executor for connecting to official Notion MCP server
- (2026-01-21) Designed /fix command for thorough fix workflow (always thorough, git history, convention checks, regression checklists)
- (2026-01-18) Adopted my-workflow system for this project (dogfooding)
- (2026-01-18) Migrated constitution.md content into OVERVIEW.md
- (2026-01-15) Curated 38 active skills, moved 16 to reference
- (2026-01-15) Curated 62 active commands, moved 7 to reference
- (2026-01-09) Ratified constitution v1.0.0

## Notes

- (2026-02-08) audit-agents merged via PR #4. 135 agents audited, 132 kept, 3 archived.
- (2026-02-03) automate-stop worktree cleaned up, branch deleted
- (2026-02-03) Planning automate-stop feature - Living Current State pattern
- This project is adopting the workflow system it created (meta/dogfooding)
- Migration from specs/ to planning/ completed
- Original constitution.md preserved in planning/archive/ for reference

## Current State

**Last Updated**: 2026-02-08

### What's Working

- 91 SKILL.md files organized in 17 functional groups
- All slash commands invocable by flat name (no group prefix)
- Agent invocation rules: trigger, language, stage, fullstack-developer fallback
- Parallel worktree development enabled

### What's Not Working

(None)

### Next Steps

- Continue repo-documentation feature in worktree
- Live-test key skills: /commit, /vital-few, /notion-search

### Open Questions

(None)
