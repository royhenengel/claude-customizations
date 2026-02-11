# Repo Documentation Implementation Plan (Revised)

## Objective

Create a documentation architecture for repos using my-workflow: define document types with templates, establish placement rules, build an enforcement agent, and reorganize this repo's information architecture based on 12 architectural decisions (Q1-Q12).

Scope expanded from original plan (13 tasks) to include: rules/ directory using Anthropic's native auto-loading, CLAUDE.md slimming, claude-code-prefs.md decomposition, memory system delineation, and docs/ restructuring.

## Context

@planning/specs/repo-documentation/SPEC.md
@planning/specs/repo-documentation/RESEARCH.md
@planning/specs/repo-documentation/DISCOVERY.md

## Decision Reference

All decisions are recorded in DISCOVERY.md Section 13 and STATE.md "Decision Summary (Q1-Q12)". Key architectural choices:

| Q | Decision | Impact |
|---|----------|--------|
| Q1/Q7 | Governance docs move to `rules/` (= `~/.claude/rules/`), auto-loaded globally | New directory, file moves |
| Q2 | documentation-types.md scoped to Scenario B only (any my-workflow project) | Revise existing file |
| Q3 | `solutions/` moves to `planning/solutions/` | Directory move, /compound update |
| Q4 | AI-CHAT-PREFS.md moves to `rules/`, SessionStart hook eliminated | File move, hook removal |
| Q5 | `scripts/` stays at root | No change |
| Q6/Q10 | `docs/` kept: catalogs, external-resources-reference, new-repo-setup | Cleanup + agent maintenance |
| Q8 | CLAUDE.md slimmed to ~50 lines | Major rewrite |
| Q9 | claude-code-prefs.md decomposed (behavioral rules + technical consistency) | File split |
| Q11 | Memory system delineation (auto memory vs STATE.md vs claude-mem vs /compound) | New rules content |
| Q12 | Resolved by Q1/Q4/Q7 | No separate action |

## Task Summary

**Phase 1: Foundation (Complete)**

| # | Task | Status | Dependencies |
|---|------|--------|--------------|
| 1 | Create documentation types reference | done | - |
| 2 | Create missing templates | done | Task 1 |
| 3 | Extract RESEARCH.md standalone template | done | Task 1 |

**Phase 2: Architecture Revision**

| # | Task | Type | Dependencies |
|---|------|------|--------------|
| 4 | Revise documentation-types.md + rename template | auto | Tasks 1-3 |
| 5 | Create rules/ directory, migrate governance content | auto | Task 4 |
| 6 | Slim CLAUDE.md to ~50 lines | auto | Task 5 |
| 7 | Define memory system boundaries | auto | - |
| 8 | Review architecture changes | checkpoint:human-verify | Tasks 4-7 |

**Phase 3: Enforcement Agent**

| # | Task | Type | Dependencies |
|---|------|------|--------------|
| 9 | Create docs-enforcer agent | auto | Task 8 |
| 10 | Review agent definition | checkpoint:human-verify | Task 9 |

**Phase 4: Cleanup**

| # | Task | Type | Dependencies |
|---|------|------|--------------|
| 11 | Clean up docs/ directory | auto | Task 10 |
| 12 | Fix root files, counts, and empty CLAUDE.md files | auto | Task 6 |
| 13 | Fix skills/README.md | auto | - |
| 14 | Fix misplaced files, broken @references, archive reference/ | auto | - |
| 15 | Archive completed feature specs | auto | Task 2 |
| 16 | Final verification | checkpoint:human-verify | Tasks 11-15 |

See archive for full task details (file archived upon completion).
