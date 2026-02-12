# Project State

**Last Updated**: 2026-02-11

## Feature Registry

| Feature | Type | Status | Branch | Worktree |
|---------|------|--------|--------|----------|
| multi-feature-state | feature | active | multi-feature-state | .worktrees/multi-feature-state |
| repo-documentation | feature | complete | - | - |
| audit-agents | feature | complete | - | - |
| commands-skills-migration | feature | complete | - | - |
| enhance-research-template | feature | complete | - | - |
| my-workflow-visual-design | feature | complete | - | - |
| clarify-blockers | feature | complete | - | - |
| automate-stop | feature | complete | - | - |
| everything-claude-code-migration | feature | complete | - | - |
| reddit-mcp-server | feature | complete | - | - |
| auto-trigger-fix | fix | complete | - | - |

## Decisions

- (2026-02-10) repo-documentation Q12: Resolved by Q1/Q4/Q7 revisions. rules/ at root (= ~/.claude/rules/) using Anthropic's native auto-loading. No naming question remains.
- (2026-02-10) repo-documentation Q11 (REVISED): No explicit memory vs docs rule needed (directory structure is self-evident). Memory system delineation (auto memory vs STATE.md vs claude-mem vs /compound) is part of this feature, not a separate backlog item. Needs research + clear boundary rules added to the revised plan.
- (2026-02-10) repo-documentation Q10: Keep 4 catalog files in docs/ (agents, skills, MCP, commands). docs-enforcer agent maintains them (detect + fix drift, not just flag). docs/ restored: external-resources-reference.md, new-repo-setup.md, 4 catalogs. Supersedes Q6 REVISED x2 (docs/ elimination reversed).
- (2026-02-10) repo-documentation Q9: claude-code-prefs.md decomposed. 4 behavioral rules → new rules/behavioral-rules.md. Tool selection, installation, scaling, conflicts, MCP guidance → merge into rules/technical-consistency.md. Context preservation strategies redundant with my-workflow → archive. Overlap analysis, directory structure, session mgmt, bundled items → archive.
- (2026-02-10) repo-documentation Q8: CLAUDE.md slimmed to ~50 lines: repo description, directory map, dev workflow, planning links. Core Principles, Quality Standards, behavioral rules (Uncertainty Protocol, Performance Tips) all move to rules/ (universal, no paths: scoping). OVERVIEW.md duplication removed.
- (2026-02-10) repo-documentation Q7 (REVISED): Rules move from my-workflow/rules/ to root rules/ (= ~/.claude/rules/). Auto-loaded globally via Anthropic's native mechanism. No @references needed.
- (2026-02-10) repo-documentation Q6 (REVISED x2): docs/ eliminated entirely. external-resources-reference.md and new-repo-setup.md content merges into root README.md. All other docs/ files archived or moved (solutions/ to planning/, AI-CHAT-PREFS to rules/, catalogs archived, claude-code-prefs decomposed).
- (2026-02-10) repo-documentation Q5: scripts/ stays at root. Two files, clear purpose, no move needed.
- (2026-02-10) repo-documentation Q4 (REVISED): AI-CHAT-PREFS.md moves from root to rules/ (= ~/.claude/rules/). Auto-loaded globally. SessionStart hook eliminated. Rules also move to rules/ (see Q1/Q7 revision).
- (2026-02-10) repo-documentation Q3: docs/ is repo infrastructure docs (external-resources-reference, new-repo-setup). solutions/ moves from docs/ to planning/solutions/ (project knowledge, same level as specs/). /compound output path needs updating.
- (2026-02-08) repo-documentation Q2: documentation-types.md scoped to Scenario B only (any my-workflow project). This repo's unique structure (skills/, agents/, hooks/, mcp/) described in CLAUDE.md and README.md, not in the portable type system.
- (2026-02-08) repo-documentation Q1 (REVISED): Governance docs + AI-CHAT-PREFS move to root rules/ directory (= ~/.claude/rules/). Auto-loaded globally via Anthropic's native user-level rules mechanism. Replaces both skill-gating and SessionStart hook.
- (2026-02-08) repo-documentation: Scope expanded to full information architecture. Pulled "Consolidate CLAUDE.md and claude-code-prefs.md" backlog item into this feature. DISCOVERY.md v2 written.
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
- (2026-02-08) FAILURE: STATE.md not updated during 90-min architectural discussion at Task 4 checkpoint. Rule 4 stop triggered but not recorded. All pivot context was only in chat history. Must update STATE.md at every state change, not just task completions.
- (2026-02-03) automate-stop worktree cleaned up, branch deleted
- (2026-02-03) Planning automate-stop feature - Living Current State pattern
- This project is adopting the workflow system it created (meta/dogfooding)
- Migration from specs/ to planning/ completed
- Original constitution.md preserved in planning/archive/ for reference
