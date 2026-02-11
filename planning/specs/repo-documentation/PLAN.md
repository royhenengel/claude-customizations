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

## Tasks

### Task 1: Create documentation types reference (DONE)

**Status**: Complete
**Files**: skills/Planning/my-workflow/docs/documentation-types.md
**Output**: 19 document types defined with placement rules and content rules. Needs revision per Q2 (Task 4).

---

### Task 2: Create missing templates (DONE)

**Status**: Complete
**Files**: 8 new templates in skills/Planning/my-workflow/templates/
**Output**: claude-context, summary, incident, readme, state, backlog, overview, design templates created.

---

### Task 3: Extract RESEARCH.md standalone template (DONE)

**Status**: Complete
**Files**: skills/Planning/my-workflow/templates/research-template.md, workflows/plan.md updated
**Output**: Template extracted, plan.md references it.

---

### Task 4: Revise documentation-types.md + rename template

**Type**: auto
**Files**:
- skills/Planning/my-workflow/docs/documentation-types.md (modify)
- skills/Planning/my-workflow/templates/design-template.md (rename to discovery-template.md)

**Context**: Q2 decided documentation-types.md should cover Scenario B only (any my-workflow project). Currently it includes this-repo-specific types (skills/, agents/, hooks/, mcp/) which are not portable. Also, design-template.md was confirmed for rename to discovery-template.md.

**Action**:

1. **Revise documentation-types.md**:
   - Remove Scenario A types (Skill Definition, Agent Definition, Hook Context, MCP Context)
   - Remove the Canonical Directory Structure section that shows this repo's specific layout
   - Keep the generic my-workflow structure: CLAUDE.md cascade, planning/ hierarchy, docs/, README.md
   - Update the Document Type Registry table to only include portable types
   - Update Placement Rules to be generic (remove skills/, agents/, hooks/, mcp/ references)
   - Add a note: "For repo-specific structure (skills/, agents/, etc.), see that repo's CLAUDE.md"

2. **Rename template**:
   - Rename `design-template.md` to `discovery-template.md`
   - Update any references in documentation-types.md

**Verify**: documentation-types.md contains only portable types, no this-repo-specific references. discovery-template.md exists.

---

### Task 5: Create rules/ directory, migrate governance content

**Type**: auto
**Files**:
- rules/ (new directory at repo root = ~/.claude/rules/)
- rules/ai-chat-prefs.md (moved from AI-CHAT-PREFS.md)
- rules/behavioral-rules.md (new, extracted from docs/claude-code-prefs.md)
- rules/coding-standards.md (moved from skills/Planning/my-workflow/rules/)
- rules/security-checklist.md (moved from skills/Planning/my-workflow/rules/)
- rules/model-selection.md (moved from skills/Planning/my-workflow/rules/)
- rules/technical-consistency.md (moved from my-workflow/rules/, merged with claude-code-prefs.md content)
- rules/core-principles.md (new, extracted from CLAUDE.md + OVERVIEW.md)
- settings.json (modify: remove AI-CHAT-PREFS SessionStart hook)
- skills/Planning/my-workflow/SKILL.md (modify: remove @references to moved rules)
- skills/Planning/my-workflow/rules/CLAUDE.md (modify or remove)

**Context**: Q1/Q4/Q7/Q9 collectively establish that all governance content moves to `rules/` at repo root. Since this repo = `~/.claude/`, `rules/` = `~/.claude/rules/` which Claude Code auto-loads in every session via Anthropic's native mechanism. No @references or hooks needed.

**Action**:

1. **Create `rules/` directory** at repo root

2. **Move AI-CHAT-PREFS.md** (Q4):
   - Move `AI-CHAT-PREFS.md` to `rules/ai-chat-prefs.md`
   - Remove the SessionStart hook from `~/.claude/settings.json` that runs `cat ~/.claude/AI-CHAT-PREFS.md`
   - Verify no other references to root-level AI-CHAT-PREFS.md

3. **Move my-workflow rules** (Q7):
   - Move `skills/Planning/my-workflow/rules/coding-standards.md` to `rules/coding-standards.md`
   - Move `skills/Planning/my-workflow/rules/security-checklist.md` to `rules/security-checklist.md`
   - Move `skills/Planning/my-workflow/rules/model-selection.md` to `rules/model-selection.md`
   - Move `skills/Planning/my-workflow/rules/technical-consistency.md` to `rules/technical-consistency.md`
   - Update or remove `skills/Planning/my-workflow/rules/CLAUDE.md` (was an index file)
   - Update `skills/Planning/my-workflow/SKILL.md`: remove @references to moved rules files (they're now auto-loaded, no reference needed)

4. **Create behavioral-rules.md** (Q9):
   - Extract these 4 rules from `docs/claude-code-prefs.md`:
     1. Context-First Data Retrieval
     2. Git Commit Verification
     3. Verification Before Recommendation
     4. Proposal Validation
   - Write as `rules/behavioral-rules.md`

5. **Merge tool guidance into technical-consistency.md** (Q9):
   - From `docs/claude-code-prefs.md`, extract tool selection, installation rules, scaling guidance, MCP rules
   - Merge into `rules/technical-consistency.md` (which already has consistency framework + MCP hard rules)
   - Do not duplicate existing content in technical-consistency.md

6. **Create core-principles.md** (Q8):
   - Extract Core Principles and Quality Standards from CLAUDE.md
   - Write as `rules/core-principles.md`
   - These are currently duplicated in CLAUDE.md and OVERVIEW.md. After this, CLAUDE.md references OVERVIEW.md for governance and rules/ has the operational version.

**Verify**: `rules/` exists with all expected files. No references to old locations break. SessionStart hook removed. SKILL.md @references cleaned up. `ls rules/` shows: ai-chat-prefs.md, behavioral-rules.md, coding-standards.md, core-principles.md, model-selection.md, security-checklist.md, technical-consistency.md

---

### Task 6: Slim CLAUDE.md to ~50 lines

**Type**: auto
**Files**: CLAUDE.md (root)

**Context**: Q8 decided CLAUDE.md should be minimal: repo description, directory map, dev workflow, planning links. Everything else moves to rules/ (done in Task 5) or stays in OVERVIEW.md. Target ~50 lines.

**Action**:

1. Read current CLAUDE.md (89 lines)
2. Rewrite with only:
   - What this repo IS (1-2 sentences)
   - Directory map (what's where, correct counts from runtime discovery)
   - Development workflow (how to add skills, agents - brief)
   - Planning links (STATE.md, BACKLOG.md, OVERVIEW.md)
   - Note that `rules/` contains all behavioral and quality rules (auto-loaded)
3. Remove:
   - Core Principles section (now in rules/core-principles.md)
   - Quality Standards section (now in rules/core-principles.md)
   - Behavioral Rules section: Uncertainty Protocol (move to rules/behavioral-rules.md if not already there)
   - Behavioral Rules section: Performance Tips (move to rules/technical-consistency.md if not already there)
4. Keep counts as "See skills/ for current list" instead of hardcoded numbers that go stale

**Verify**: CLAUDE.md is ~50 lines. No duplicated content from OVERVIEW.md. No inline rules (all in rules/). Accurate directory map.

---

### Task 7: Define memory system boundaries

**Type**: auto
**Files**: rules/memory-boundaries.md (new)

**Context**: Q11 decided memory system delineation is part of this feature. The repo has 4 knowledge capture mechanisms with unclear boundaries: auto memory (MEMORY.md), STATE.md decisions, claude-mem observations, and /compound solutions. Users need clear rules for what goes where.

**Action**:

1. Research the 4 systems by reading:
   - Auto memory docs (Claude Code's built-in per-project MEMORY.md)
   - claude-mem plugin behavior (SessionStart injection, MCP search)
   - STATE.md decisions section (manual during workflow)
   - /compound skill (docs/solutions/ output)

2. Create `rules/memory-boundaries.md` with:
   - One-paragraph purpose for each system
   - Decision tree: "I learned something. Where does it go?"
   - Clear boundary rules (what belongs in each, what doesn't)
   - Overlap handling (when something fits multiple systems)

3. Reference DISCOVERY.md Section 6 "Memory vs Docs Delineation" as starting point

**Verify**: rules/memory-boundaries.md exists. Each system has a clear, non-overlapping purpose. Decision tree is unambiguous.

---

### Task 8: Review architecture changes

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Tasks 4-7

**Context**: Phase 2 makes foundational changes: new rules/ directory, moved files, slimmed CLAUDE.md, memory boundaries. Review before proceeding to agent creation and cleanup.

**Action**: Present summary of all Phase 2 changes:
- documentation-types.md revisions (what was removed)
- rules/ directory contents and where each file came from
- CLAUDE.md before/after comparison (line count, what was removed/added)
- memory-boundaries.md content
- SessionStart hook removal
- SKILL.md @reference updates
- Any files that were archived or removed

**Verify**: User confirms architecture is correct
**Done**: User approves Phase 2

---

### Task 9: Create docs-enforcer agent

**Type**: auto
**Files**: agents/docs-enforcer.md (new)
**Dependencies**: Task 8

**Context**: Q10 decided the agent should detect AND fix documentation drift, not just flag it. The agent maintains the 4 catalog files in docs/ and validates repo structure against the type system.

**Action**:

Create `agents/docs-enforcer.md` with:

1. **Frontmatter**: description, model preference (sonnet for speed)

2. **Role**: Documentation enforcement and maintenance agent for repos using my-workflow

3. **Two operating modes**:

   a. **Audit mode** (default): Scan and report
      - Read documentation-types.md for type registry and placement rules
      - Scan all markdown files in the repo
      - For each file: identify type, check location, check content against template
      - Generate findings report (table: file, issue, severity, recommendation)
      - Do NOT make changes

   b. **Fix mode** (explicit invocation): Scan, report, AND fix
      - Same scan as audit mode
      - After presenting findings, ask for confirmation
      - Apply fixes: move misplaced files, add missing sections, update stale content
      - For catalog files (docs/): regenerate from source of truth (skills/, agents/, mcp/)

4. **Catalog maintenance** (Q10):
   - When in fix mode, regenerate these from actual directory contents:
     - docs/claude-skills-reference.md (from skills/**/SKILL.md)
     - docs/claude-agents-reference.md (from agents/*.md)
     - docs/claude-commands-reference.md (archive or remove - commands migrated)
     - docs/claude-mcp-servers-reference.md (from .mcp.json or mcp/)

5. **Behavioral rules**:
   - Never discard information. Misplaced content gets moved, not deleted.
   - Ask for confirmation before any destructive action.
   - Skip: agents/*.md, skills/*/SKILL.md, reference/, archive/ (checking placement only)
   - Report findings in structured format with severity levels

6. **Invocation**: "audit documentation", "check docs", "enforce docs", or via Task tool with docs-enforcer type

**Verify**: Agent file created, references documentation-types.md, has both audit and fix modes, includes catalog maintenance logic.

---

### Task 10: Review agent definition

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 9

**Action**: Present the agent definition. Highlight: two modes (audit vs fix), catalog maintenance, behavioral rules, confirmation requirements.
**Verify**: User confirms agent behavior is appropriate
**Done**: User approves the agent

---

### Task 11: Clean up docs/ directory

**Type**: auto
**Files**: docs/, planning/solutions/ (new), archive/docs/ (new)
**Dependencies**: Task 10

**Context**: Q3/Q6/Q10 define docs/ final state. solutions/ moves to planning/. Stale files archive. Catalogs stay (maintained by docs-enforcer). claude-code-prefs.md already decomposed in Task 5.

**Action**:

1. **Move solutions/** (Q3):
   - Move `docs/solutions/` to `planning/solutions/`
   - Update /compound skill output path (search for `docs/solutions` in skills/)
   - Update any references to `docs/solutions/` across the repo

2. **Archive stale files**:
   - Create `archive/docs/` if not exists
   - Move `docs/claude-code-prefs.md` to `archive/docs/` (content already extracted in Task 5)
   - Move `docs/living-requirements.md` to `archive/docs/` (duplicates skills/Planning/living-requirements/SKILL.md)

3. **Final docs/ state**:
   - `docs/external-resources-reference.md` (keep)
   - `docs/new-repo-setup.md` (keep)
   - `docs/claude-skills-reference.md` (keep, maintained by docs-enforcer)
   - `docs/claude-agents-reference.md` (keep, maintained by docs-enforcer)
   - `docs/claude-mcp-servers-reference.md` (keep, maintained by docs-enforcer)
   - `docs/claude-commands-reference.md` (archive - commands migrated to skills)

4. **Update BACKLOG.md**: Mark "Consolidate CLAUDE.md and claude-code-prefs.md relationship" as addressed by this feature.

**Verify**: docs/ contains only approved files. planning/solutions/ exists. /compound output path updated. No broken references.

---

### Task 12: Fix root files, counts, and empty CLAUDE.md files

**Type**: auto
**Files**: README.md, hooks/CLAUDE.md, hooks/scripts/CLAUDE.md, scripts/CLAUDE.md, mcp/code-executor/CLAUDE.md
**Dependencies**: Task 6

**Context**: README.md has stale counts and references to commands/. Four CLAUDE.md files contain only claude-mem context with no useful content.

**Action**:

1. **Fix README.md**:
   - Get accurate counts: `find skills/ -name 'SKILL.md'`, `ls agents/*.md`
   - Update structure section with correct counts
   - Remove "commands/" references (migrated to skills)
   - Remove duplicated principles/quality sections (reference OVERVIEW.md)
   - Add `rules/` directory to the structure listing
   - Keep: what this repo is, directory structure, symlink explanation, getting started

2. **Populate empty CLAUDE.md files** (using claude-context-template.md as guide):
   - `hooks/CLAUDE.md`: Hooks system overview (event types, hook config location, key hooks in this repo)
   - `hooks/scripts/CLAUDE.md`: Hook script implementations (JS files, naming convention, what each does)
   - `scripts/CLAUDE.md`: Utility scripts (statusline-command.sh, toggle-hooks.sh, purpose of each)
   - `mcp/code-executor/CLAUDE.md`: Code executor MCP server (purpose, point to README.md for details)
   - Keep descriptions to 3-5 lines each. Preserve existing claude-mem context blocks.

**Verify**: README.md counts match reality. No "commands/" references. Each CLAUDE.md has a descriptive header above claude-mem section.

---

### Task 13: Fix skills/README.md

**Type**: auto
**Files**: skills/README.md, skills/Platform/n8n/README.md (new)
**Dependencies**: None

**Context**: skills/README.md contains n8n workflow patterns documentation instead of a skills directory overview.

**Action**:

1. Move current skills/README.md content to `skills/Platform/n8n/README.md`
2. Create new skills/README.md:
   - Title: Skills Directory
   - How skills work (auto-activate based on context, invoke via /name)
   - Table of skill groups with description and count
   - Total skill count
   - How to add a new skill (brief)

**Verify**: skills/README.md describes the skills system. n8n content preserved.

---

### Task 14: Fix misplaced files, broken @references, archive reference/

**Type**: auto
**Files**: planning/specs/*.md, planning/specs/*/PLAN.md, reference/, archive/reference/
**Dependencies**: None

**Context**: 2 loose files in planning/specs/, 4 broken @references in completed specs, and reference/ at root confirmed as duplicate of my-workflow/ref/.

**Action**:

1. **Move loose files**:
   - `planning/specs/reddit-sources-evaluation.md` -> `planning/specs/everything-claude-code-migration/`
   - `planning/specs/workflow-improvements-analysis.md` -> `planning/specs/my-workflow/`
   - Grep for references and update

2. **Fix @references**:
   - In `planning/specs/my-workflow/PLAN.md`: Replace `001-my-workflow` with `my-workflow`
   - In `planning/specs/clarify-blockers/PLAN.md`: Replace `clarify-rule-3-blockers` with `clarify-blockers`
   - Grep for any other old directory names

3. **Archive reference/** (confirmed duplicate of my-workflow/ref/):
   - Move `reference/` to `archive/reference/`
   - Update any references to `reference/` across the repo
   - Update BACKLOG.md if it references `specs/reddit-sources-evaluation.md`

**Verify**: No loose .md in planning/specs/. No broken @references. reference/ archived.

---

### Task 15: Archive completed feature specs

**Type**: auto
**Files**: planning/specs/{completed-features}/
**Dependencies**: Task 2 (uses summary-template.md for reference)

**Context**: 12 features are complete. Full PLAN/RESEARCH/SPEC files add clutter. CLAUDE.md + SUMMARY.md sufficient for future reference.

**Action**:

For each completed feature (all except audit-agents and repo-documentation):

1. Create `planning/specs/{feature}/archive/` subdirectory
2. Move PLAN.md, RESEARCH.md, SPEC.md into archive/
3. Keep at feature root: CLAUDE.md, SUMMARY.md, INCIDENT-*.md, actively-referenced artifacts
4. Update CLAUDE.md to note "Completed. See SUMMARY.md for outcomes."

**Special cases**:
- `fix-command/`: Normalize lowercase filenames to UPPERCASE before archiving
- `code-executor-http-oauth/`, `ai-chat-prefs-autoload/`: Already minimal, skip
- `commands-skills-migration/`: Keep INCIDENT files at root
- `my-workflow/`: Keep WORKTREE-WORKFLOW.md at root (active reference)

**Verify**: Each completed feature has CLAUDE.md + SUMMARY.md at root, rest in archive/.

---

### Task 16: Final verification

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Tasks 11-15

**Context**: All changes complete. Verify nothing was lost and the documentation system works.

**Action**:

Present summary of all changes across all phases:

1. **Phase 2 changes** (architecture):
   - documentation-types.md revised to Scenario B
   - rules/ directory created with 7+ files
   - CLAUDE.md slimmed to ~50 lines
   - memory-boundaries.md created
   - SessionStart hook removed

2. **Phase 3 changes** (agent):
   - docs-enforcer.md created with audit + fix modes

3. **Phase 4 changes** (cleanup):
   - docs/ restructured (stale archived, solutions/ moved)
   - Root files fixed (counts, references)
   - Empty CLAUDE.md files populated
   - skills/README.md replaced
   - Misplaced files moved, @references fixed
   - reference/ archived
   - Completed specs archived

4. **Verification checks**:
   - `grep -r "91 SKILL" .` returns zero
   - `grep -r "72 slash" .` returns zero
   - `grep -r "001-my-workflow" .` returns zero
   - `grep -r "clarify-rule-3-blockers" .` returns zero
   - `find planning/specs/ -maxdepth 1 -name '*.md'` returns zero
   - Every CLAUDE.md has substantive content
   - docs/ contains only approved files
   - rules/ contains all governance files
   - No broken @references

**Verify**: User reviews all changes and confirms
**Done**: User approves, feature complete

## Verification

- [ ] Documentation types reference revised to Scenario B only
- [ ] All document types have templates
- [ ] rules/ directory exists with all governance content
- [ ] SessionStart hook for AI-CHAT-PREFS eliminated
- [ ] CLAUDE.md is ~50 lines, no duplicated content
- [ ] Memory system boundaries defined
- [ ] Enforcement agent exists with audit + fix modes
- [ ] docs/ contains only approved files
- [ ] planning/solutions/ exists, /compound path updated
- [ ] All file counts accurate
- [ ] No empty CLAUDE.md files
- [ ] No loose files in planning/specs/
- [ ] No broken @references
- [ ] reference/ archived
- [ ] Completed feature specs archived to minimal form

## Success Criteria

- Every document type has a template in my-workflow/templates/
- Placement rules are defined and scoped to Scenario B (portable)
- rules/ directory contains all governance content, auto-loaded via native mechanism
- Enforcement agent can audit and fix documentation drift in any my-workflow repo
- This repo passes the agent's audit after cleanup
- Memory system boundaries are clear and documented
- Backlog item "Consolidate CLAUDE.md and claude-code-prefs.md" resolved
