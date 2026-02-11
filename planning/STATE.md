# Project State

**Stage**: building
**Last Updated**: 2026-02-11

## Active Features

### repo-documentation

- Status: complete (merged)
- Progress: 16/16
- PR: #6 (merged 2026-02-11)

## Feature Registry

| Feature                          | Status   |
|----------------------------------|----------|
| multi-feature-state              | ready    |
| enhance-research-template        | complete |
| commands-skills-migration        | complete |
| audit-agents                     | complete |
| repo-documentation               | complete |
| my-workflow-visual-design        | complete |
| clarify-blockers                 | complete |
| automate-stop                    | complete |
| everything-claude-code-migration | complete |
| reddit-mcp-server                | complete |
| auto-trigger-fix                 | complete |

## Current Focus

multi-feature-state feature planned. Ready for /build.

## Progress (repo-documentation) - Revised Plan

**Phase 1: Foundation (Complete)**
- [x] Task 1: Create documentation types reference
- [x] Task 2: Create missing templates
- [x] Task 3: Extract RESEARCH.md standalone template

**Phase 2: Architecture Revision**
- [x] Task 4: Revise documentation-types.md + rename template
- [x] Task 5: Create rules/ directory, migrate governance content (SessionStart hook removal deferred to merge)
- [x] Task 6: Slim CLAUDE.md to ~50 lines (37 lines)
- [x] Task 7: Define memory system boundaries
- [x] Task 8: Review architecture changes (checkpoint)

**Phase 3: Enforcement Agent**
- [x] Task 9: Create docs-enforcer agent
- [x] Task 10: Review agent definition (checkpoint)

**Phase 4: Cleanup**
- [x] Task 11: Clean up docs/ directory
- [x] Task 12: Fix root files, counts, and empty CLAUDE.md files
- [x] Task 13: Fix skills/README.md
- [x] Task 14: Fix misplaced files, broken @references, archive reference/
- [x] Task 15: Archive completed feature specs
- [x] Task 16: Final verification (checkpoint)

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

## Current State

**Last Updated**: 2026-02-11

### What's Working

- All 16 tasks complete across 4 phases
- documentation-types.md: 15 portable types, Scenario B only
- 9 templates created (8 new + research extracted)
- rules/: 8 files auto-loaded via ~/.claude/rules/, each with domain marker
- CLAUDE.md: 37 lines (slimmed from 89)
- memory-boundaries.md: 4 systems delineated with decision tree
- docs-enforcer agent: audit + fix modes, catalog maintenance, spec archiving enforcement
- docs/: cleaned (3 archived, solutions/ moved to planning/)
- docs/claude-slash-commands-reference.md: 91 slash commands cataloged
- README.md: accurate counts, current structure
- 4 empty CLAUDE.md files populated
- skills/README.md: replaced n8n content with directory overview
- 2 loose files moved, 4 broken @references fixed, reference/ archived
- 10 completed feature specs archived (PLAN/RESEARCH/SPEC to archive/)
- BACKLOG Inspiration Sources migrated to docs/external-resources-reference.md
- taches-create-plans duplicate removed (single source: my-workflow/references/)
- living-requirements referenced in external-resources
- core-principles.md eliminated: design philosophy inlined into technical-consistency.md, version control into behavioral-rules.md
- All ref/ directories renamed to references/, docs-enforcer enforces placement

### What's Not Working

(Nothing)

### Next Steps

1. Clean up repo-documentation worktree

### Open Questions

All 12 resolved. See Decisions Q1-Q12.
