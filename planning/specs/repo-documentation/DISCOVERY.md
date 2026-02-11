# Repo Documentation Discovery (v2)

**Created**: 2026-02-08
**Updated**: 2026-02-08 (v2: expanded scope to cover full information architecture, memory vs docs, CLAUDE.md content, claude-code-prefs consolidation)

**Context**: During Task 4 (type system review) of the original plan, architectural questions surfaced that revealed gaps in the type system design. Scope then expanded to cover the full information architecture: all documents in docs/, the claude-code-prefs.md consolidation backlog item, memory vs docs delineation, and what CLAUDE.md should contain.

---

## 1. What Is This Project?

### Purpose

The **Claude Code environment configuration**. This repo defines how Claude Code works and everything it can do across all repos, local and remote.

It contains:
- **Capabilities**: skills, agents, MCP servers, hooks
- **Behavior**: prefs, rules, governance documents
- **Knowledge**: reference docs, solved problems, operational guides
- **Project management**: planning, state, backlog, feature specs

### Key Characteristics

- **This repo IS ~/.claude/**. The main repo at `/Users/royengel/Projects/Claude Code/claude-customizations/` is symlinked to `~/.claude/`. Every file at repo root is directly at `~/.claude/{file}`.
- **Global by default**. Skills, agents, hooks, rules, and prefs are available in ALL projects because Claude Code reads from `~/.claude/`.
- **Project override supported**. A specific project can override behavior with `.claude/CLAUDE.md` and `.claude/hooks.json`.
- **Worktrees isolate feature work**. Feature branches use git worktrees (e.g., `/Users/royengel/worktrees/claude-customizations/repo-documentation/`). Worktrees have their own `.claude/` override but share the same skill/agent/hook definitions from the main repo via symlink.

### Scope (from OVERVIEW.md)

- In scope: Skills, agents, hooks, plugins, reference materials
- Out of scope: Team collaboration, skill marketplace, automated testing

### Core Principles (from OVERVIEW.md)

1. Skill-First Design (self-contained, single responsibility)
2. Context Awareness (respect Claude Code's hierarchy)
3. Documentation-Driven (docs are source of truth)
4. Version Control Discipline (branches, PRs, semantic versioning)
5. Simplicity Over Complexity (YAGNI)

---

## 2. How Files Get Loaded

Three loading mechanisms exist. This determines what Claude "knows" during a session.

### Mechanism 1: Auto-loaded (CLAUDE.md cascade)

Claude Code automatically reads CLAUDE.md files based on where you're working:
- `~/.claude/CLAUDE.md` (user-level, always)
- `{project}/.claude/CLAUDE.md` (project override, if exists)
- `{project}/CLAUDE.md` (project root)
- `{project}/{dir}/CLAUDE.md` (directory-level, when working in that dir)

These are **always loaded**. Token cost is constant.

### Mechanism 2: Hook-injected (SessionStart)

The SessionStart hook in `~/.claude/settings.json` runs:
```json
"command": "cat ~/.claude/AI-CHAT-PREFS.md"
```

This injects AI-CHAT-PREFS.md (152 lines) into every session unconditionally. Any file could be injected this way by adding it to the hook.

### Mechanism 3: Skill-gated (@references)

When a skill activates (triggers match), its SKILL.md is loaded. Any @references in the SKILL.md are then available. Example: my-workflow/SKILL.md references `@rules/security-checklist.md`, which is only loaded when my-workflow activates.

Activation triggers for my-workflow:
- `planning/` directory exists
- `STATE.md` mentions workflow stages
- User mentions start/plan/build workflow

### Mechanism 4: Auto memory (per-project)

Claude Code maintains a per-project memory directory at `~/.claude/projects/{project-hash}/memory/`. The MEMORY.md file is auto-loaded into the system prompt. Additional topic files are read on demand.

### Mechanism 5: claude-mem plugin (session capture)

The claude-mem plugin (v9.0.12) automatically:
- Captures session observations at session end
- Injects recent context via SessionStart hook
- Provides MCP tools for semantic search over past sessions

### Loading Level Summary

| Level | Mechanism | When | Token cost | Current contents |
|-------|-----------|------|------------|------------------|
| Always | CLAUDE.md cascade | Every session | Constant | Project context, behavioral rules |
| Always | SessionStart hook | Every session | Constant | AI-CHAT-PREFS.md (152 lines), claude-mem context |
| Always | Auto memory MEMORY.md | Every session (per-project) | Constant | Project-specific lessons |
| Skill-gated | @references in SKILL.md | When skill activates | On activation | coding-standards, security-checklist, model-selection, technical-consistency |
| On-demand | Explicit file read | When referenced | Per read | Templates, workflows, docs |
| Automatic | claude-mem observations | Session end | Via search | Session history, cross-session context |

---

## 3. Current Repository Structure

### Root Level (6 files, 13 directories)

**Files:**
- `AI-CHAT-PREFS.md` (152 lines) - Conversation behavior rules, injected every session
- `CLAUDE.md` (89 lines) - Project context, behavioral rules, auto-loaded
- `README.md` (70 lines) - Human-facing repo overview
- `hooks.json` - Hook definitions (4 hooks: UserPromptSubmit, PostToolUse, Stop, SessionEnd)
- `.gitignore`

**Directories:**
| Directory | Files | Purpose | Visibility need |
|-----------|-------|---------|-----------------|
| skills/ | 649 | Skill definitions (110 SKILL.md across 94 subdirs) | High |
| agents/ | 135 | Subagent definitions | High |
| hooks/ | 10 | Event-driven hook scripts | High |
| mcp/ | 72 | MCP server configurations | High |
| planning/ | 79 | Project management (STATE, BACKLOG, specs) | High |
| archive/ | 118 | Archived content | Medium |
| docs/ | 9 | Mixed: guides, stale catalogs, prefs, solutions | Unclear |
| reference/ | 38 | External methodology (DUPLICATE of my-workflow/ref/) | Should be archived |
| scripts/ | 3 | Utility scripts (statusline, toggle-hooks) | Low |
| .claude/ | 2 | Worktree-specific overrides | System |
| .github/ | - | GitHub config | System |
| .worktrees/ | - | Worktree links | System |
| logs/ | - | Build/run logs | System |

### Actual File Counts (verified)

| Item | Count | Source |
|------|-------|--------|
| SKILL.md files | 110 | `find skills/ -name 'SKILL.md'` |
| Skill group directories | 94 | `ls -d skills/*/` |
| Agent definitions | 135 | `ls agents/*.md` |
| Total repository files | 1,130 | Full repo |
| Total directories | 288 | Full repo |

Note: CLAUDE.md and README.md currently say "91 SKILL.md files" and "33 active skills" respectively. Both stale.

---

## 4. Full Document Inventory

### 4.1 Prescriptive Documents (how Claude should behave)

| Document | Lines | Loaded via | Content | Status |
|----------|-------|------------|---------|--------|
| AI-CHAT-PREFS.md | 152 | Hook (always) | Communication, tone, reasoning, accountability | Active, healthy |
| CLAUDE.md (root) | 89 | Auto-loaded (always) | Project context, principles, quality standards, uncertainty protocol, performance tips | Active, some content stale |
| claude-code-prefs.md | 259 | Never (orphaned in docs/) | Tool selection, installation rules, 4 behavioral rules, context strategies | **Orphaned** - active rules never loaded |
| coding-standards.md | 49 | Skill-gated | Code quality, immutability, size limits | Active, possibly under-scoped |
| security-checklist.md | 36 | Skill-gated | Pre-commit security | Active, possibly under-scoped |
| model-selection.md | 54 | Skill-gated | Haiku/Sonnet/Opus criteria | Active, possibly under-scoped |
| technical-consistency.md | 62 | Skill-gated | Consistency framework, MCP hard rules | Active, possibly under-scoped |
| OVERVIEW.md | 170 | On-demand | Vision, scope, principles (duplicates CLAUDE.md), governance | Active, duplicated content |

### 4.2 Reference Catalogs (stale snapshots in docs/)

| Document | Content | Stale? |
|----------|---------|--------|
| claude-skills-reference.md | Skills catalog (says 73 skills) | Yes (actual: 110 SKILL.md) |
| claude-agents-reference.md | 142 agents catalog | Likely |
| claude-commands-reference.md | CLI + commands reference | Yes (commands migrated to skills) |
| claude-mcp-servers-reference.md | 12 MCP servers | Likely |

These are point-in-time exports with no sync mechanism. The actual files (skills/, agents/, settings) are the source of truth. Claude can discover them at runtime.

### 4.3 Operational Guides (how to do things)

| Document | Location | Content |
|----------|----------|---------|
| claude-code-prefs.md (mixed) | docs/ | Tool selection guide, session management, context preservation |
| new-repo-setup.md | docs/ | Notion sync workflow for new repos |
| living-requirements.md | docs/ | Living requirements methodology (from external source) |
| external-resources-reference.md | docs/ | External tools provenance tracking |

### 4.4 Knowledge Capture

| System | Content | Mechanism | Answers |
|--------|---------|-----------|---------|
| claude-mem | Session observations, cross-session context | Automatic capture + MCP search | "What did we do? What went wrong?" |
| Auto memory (MEMORY.md) | Project-specific lessons, patterns | Manual per-project | "What should I remember for this project?" |
| solutions/INDEX.md | Solved problems via /compound | Manual | "How did we fix this before?" |
| STATE.md decisions | Architectural decisions with dates | Manual during workflow | "Why was this decision made?" |

### 4.5 Project Management

| Document | Location | Content |
|----------|----------|---------|
| OVERVIEW.md | planning/ | Vision, scope, principles, governance |
| STATE.md | planning/ | Current stage, features, decisions, living state |
| BACKLOG.md | planning/ | Improvements, ideas, technical debt |
| Feature specs | planning/specs/{feature}/ | RESEARCH.md, SPEC.md, PLAN.md, SUMMARY.md per feature |

---

## 5. claude-code-prefs.md Deep Analysis (Backlog Item)

**Backlog item**: "Consolidate CLAUDE.md and claude-code-prefs.md relationship"

### Current State

claude-code-prefs.md (259 lines) sits in docs/ and is never loaded. It contains a mix of:

**Still valuable:**
- Tool selection guide (skills vs agents vs MCP decision tree)
- Installation rules (avoid duplicates, clean install, naming convention)
- 4 behavioral rules: Context-First Data Retrieval, Git Commit Verification, Verification Before Recommendation, Proposal Validation

**Stale or superseded:**
- Overlap analysis (dated 2024-12-22, counts wrong)
- Directory structure diagram (stale)
- Session management tips (superseded by my-workflow)
- Context preservation strategies (partially superseded by my-workflow + claude-mem)

### The Orphaned Rules Problem

The 4 behavioral rules in claude-code-prefs.md are substantive:

1. **Context-First Data Retrieval**: Check existing context before making external API calls
2. **Git Commit Verification**: Review all staged changes before committing
3. **Verification Before Recommendation**: Research before recommending, never present unverified solutions
4. **Proposal Validation**: Walk through a concrete scenario before presenting a solution

These are on par with the Uncertainty Protocol in CLAUDE.md. They should apply to every session. Currently they're never loaded.

### Proposed Decomposition

| Content block | Destination | Reasoning |
|---------------|-------------|-----------|
| Tool selection guide | Keep in docs/ as standalone reference | Useful guide, not a behavioral rule |
| Installation rules | Merge into CLAUDE.md or keep in docs/ | Operational guidance |
| 4 behavioral rules | Promote to always-loaded level | Active rules, currently orphaned |
| Overlap analysis | Archive | Stale |
| Directory structure | Delete | Stale, CLAUDE.md has current version |
| Session management | Archive | Superseded by my-workflow |
| Context preservation | Archive or merge useful bits | Partially superseded |

---

## 6. Memory vs Docs Delineation

### The Distinction

| Dimension | Memory (claude-mem + auto memory) | Docs (files in repo) |
|-----------|----------------------------------|----------------------|
| **Nature** | Descriptive (what happened) | Prescriptive (what should happen) |
| **Lifecycle** | Session-scoped, decays in relevance | Persistent, version-controlled |
| **Authoring** | Automatic (claude-mem) or reactive (MEMORY.md) | Intentional (human/Claude authored) |
| **Question answered** | "What did we do?" "What context do I need?" | "How should we behave?" "What's available?" |
| **Retrieval** | Semantic search (MCP tools) or auto-injected | File read (@reference or explicit) |

### What Goes Where

**Memory (claude-mem / auto MEMORY.md):**
- Session observations and outcomes
- Debugging context and solutions found during work
- User preference discoveries (learned during interaction)
- Cross-session continuity (what was discussed previously)
- Mistakes and lessons learned (reactive)

**Docs (files):**
- Prescriptive rules (how to behave, standards to follow)
- Reference catalogs (what's available, how things work)
- Operational guides (how to do specific tasks)
- Curated solutions (docs/solutions/ via /compound)
- Project state and decisions (STATE.md, BACKLOG.md)

**Boundary cases:**
- solutions/INDEX.md sits at the boundary: learned knowledge but intentionally curated. Correctly in docs/ because it's persistent, structured, and version-controlled.
- Decisions in STATE.md are learned during sessions but belong in docs because they're governance (future sessions must follow them).

---

## 7. What Should CLAUDE.md Contain?

### Current Content (89 lines)

1. Project description (1 line)
2. Structure section (6 bullet points listing directories)
3. Core Principles (4 principles with descriptions)
4. Quality Standards (Skills, Agents, Code Quality subsections)
5. Development Workflow (Adding Skills, Adding Agents)
6. Behavioral Rules (Uncertainty Protocol, Performance Tips)
7. Planning section (3 links)

### Analysis

CLAUDE.md is auto-loaded every session. It's the most expensive persistent document (token cost on every interaction). Current issues:

1. **Duplicated content**: Core Principles and Quality Standards appear identically in OVERVIEW.md (with more detail). CLAUDE.md doesn't need both.
2. **Missing rules**: 4 behavioral rules from claude-code-prefs.md are never loaded.
3. **Stale counts**: "91 SKILL.md files" is wrong (actual: 110).
4. **No @references**: Doesn't leverage @references to pull in always-needed rules without bloating the file.

### What CLAUDE.md Should Be

CLAUDE.md should be a **minimal, high-signal orientation file**:

| Should contain | Why |
|----------------|-----|
| What this repo IS (1-2 sentences) | Orient Claude quickly |
| Directory map (what's where) | Navigate the repo |
| Behavioral rules that apply to EVERY action | Non-negotiable behavior |
| @references to detailed rules files | Load rules without bloating CLAUDE.md |
| Pointers to deeper docs | Where to find more |

| Should NOT contain | Why | Where instead |
|--------------------|-----|---------------|
| Full principles with rationale | Too verbose for always-loaded | OVERVIEW.md |
| Quality standards detail | Could be a rules file | Separate file or OVERVIEW.md |
| Detailed operational guides | On-demand is sufficient | docs/ files |
| Stale counts/inventories | Goes stale immediately | Discoverable at runtime |

---

## 8. my-workflow Internal Structure

The my-workflow skill is the largest skill in the repo (67 files, 3,459 lines). It defines the personal development workflow and contains several sub-systems.

```
skills/Planning/my-workflow/
├── SKILL.md (345 lines)          # Core skill definition, principles, triggers
├── README.md                      # Workflow overview (human-facing)
├── my-workflow-flow.md            # Detailed workflow flowchart
├── my-workflow-flow.mmd           # Mermaid diagram source
├── my-workflow-diagram.png        # Visual diagram
├── my-workflow-flow.png           # Flow diagram export
│
├── docs/ (2 files)                # Workflow guidance documents
│   ├── documentation-types.md     # NEW: Type registry (created in Task 1)
│   └── multi-feature.md           # Multi-feature management guide
│
├── rules/ (5 files)               # Behavioral standards
│   ├── CLAUDE.md                  # Index to all rules
│   ├── coding-standards.md        # Code quality standards
│   ├── security-checklist.md      # Security verification
│   ├── model-selection.md         # Model selection guide
│   └── technical-consistency.md   # Consistency framework
│
├── templates/ (14 files)          # Document templates
│   ├── spec-template.md           # Feature specification
│   ├── plan-template.md           # Implementation plan
│   ├── research-template.md       # NEW: Research (extracted from plan.md)
│   ├── workflow-template.md       # Workflow definition
│   ├── command-template.md        # Command/skill definition
│   ├── claude-context-template.md # NEW: CLAUDE.md
│   ├── summary-template.md        # NEW: Feature summary
│   ├── incident-template.md       # NEW: Incident report
│   ├── readme-template.md         # NEW: README
│   ├── state-template.md          # NEW: STATE.md
│   ├── backlog-template.md        # NEW: BACKLOG.md
│   ├── overview-template.md       # NEW: OVERVIEW.md
│   └── design-template.md         # NEW: Design document (rename to discovery-template)
│
├── workflows/ (6+ files)          # Stage workflows
│   ├── CLAUDE.md                  # Workflow context
│   ├── build.md                   # /build execution
│   ├── plan.md                    # /plan creation
│   ├── start.md                   # /start initialization
│   ├── map-codebase.md            # Codebase analysis
│   └── archive/stop.md            # Deprecated
│
├── ref/ (30+ files)               # External methodology references
│   ├── taches-create-plans/       # Planning methodology (refs, templates, workflows)
│   └── gsd/                       # Get-Shit-Done methodology
│
├── hooks/ (2 files)               # Hook definitions for workflow stages
└── archive/ (1 file)              # Historical content
```

### Sub-system purposes within my-workflow:

| Sub-directory | Purpose | Consumer | Portability |
|---------------|---------|----------|-------------|
| rules/ | Technical standards | Referenced by SKILL.md + build.md | Travels with skill |
| templates/ | Document structure | Referenced by workflows | Travels with skill |
| workflows/ | Stage execution logic | Invoked by /start, /plan, /build | Travels with skill |
| docs/ | Guidance documents | Read on demand | Travels with skill |
| ref/ | External methodology | Read on demand | Travels with skill |
| hooks/ | Stage-specific hooks | Event-driven | Travels with skill |

---

## 9. Known Issues

### From original audit

1. **Stale counts**: CLAUDE.md says "91 SKILL.md files" and "33 active skills", README.md says "33 active skills". Actual: 110 SKILL.md files.
2. **Duplicated content**: CLAUDE.md, README.md, and OVERVIEW.md share core principles and quality standards sections.
3. **Empty CLAUDE.md files**: 4 files with only claude-mem context, no useful content:
   - hooks/CLAUDE.md
   - hooks/scripts/CLAUDE.md
   - scripts/CLAUDE.md
   - mcp/code-executor/CLAUDE.md
4. **Wrong content in skills/README.md**: Contains n8n workflow patterns instead of skills directory overview.
5. **Duplicate reference/**: Root reference/ duplicates content already in my-workflow/ref/ (taches-create-plans). Legacy from commands-to-skills migration.
6. **Loose files in planning/specs/**: 2 research files not in feature directories.
7. **Broken @references**: 4 old directory names in completed feature specs.
8. **12 completed features** retain full PLAN/RESEARCH/SPEC files (could archive).

### Discovered during expanded analysis

9. **Orphaned behavioral rules**: claude-code-prefs.md contains 4 active behavioral rules that are never loaded into any session.
10. **4 stale catalog files**: claude-skills-reference.md, claude-agents-reference.md, claude-commands-reference.md, claude-mcp-servers-reference.md are all stale snapshots with no sync mechanism.
11. **claude-code-prefs.md is a mixed bag**: Contains active rules, stale catalogs, superseded tips, and useful guides all in one file.
12. **CLAUDE.md content overlap with OVERVIEW.md**: Principles and quality standards duplicated.
13. **No @references in root CLAUDE.md**: Doesn't use @references to load rules files, forcing all always-needed rules to be inline.

---

## 10. Architectural Questions

### 10.1 What belongs at root?

The repo root = ~/.claude/. Everything at root is high visibility.

| Item | Current | Desired visibility |
|------|---------|-------------------|
| skills/, agents/, hooks/, mcp/, planning/ | Root | High (correct) |
| archive/ | Root | Medium (acceptable at root) |
| AI-CHAT-PREFS.md | Root | Medium |
| docs/ | Root | Unclear |
| reference/ | Root | Low (should be archived, duplicate) |
| scripts/ | Root | Low |

### 10.2 Where do prefs and rules live?

Current state:
- AI-CHAT-PREFS.md at root, loaded via hook
- Rules in my-workflow/rules/, loaded via skill activation

Both are behavioral governance. The user sees them as related but unclear if they should be together.

**Unresolved tension**: Rules are skill-portable (travel with my-workflow) but conceptually global. Moving them out of the skill breaks portability. Keeping them in the skill gates them behind skill activation.

### 10.3 What is the scope of each governance document?

Not yet defined. Specifically:
- Is coding-standards.md code-specific or broader?
- Should security-checklist.md apply to all sessions or only coding sessions?
- Are these "always-on" or "context-activated"?

### 10.4 Three scenarios conflated

The type system was trying to serve three audiences simultaneously:

| Scenario | Description |
|----------|-------------|
| A: This repo | Structure of claude-customizations (skills/, agents/, hooks/, etc.) |
| B: Any my-workflow project | Structure any project using my-workflow should follow (planning/, docs/) |
| C: The overlap | my-workflow lives INSIDE this repo, so both structures coexist |

The documentation-types.md created in Task 1 mixed Scenario A (this repo's unique structure) with Scenario B (portable workflow structure). These need separation.

### 10.5 docs/ directory purpose

Current docs/ contents (9 files):
- claude-code-prefs.md - Mixed: rules + guides + stale content (259 lines)
- claude-skills-reference.md - Stale catalog
- claude-agents-reference.md - Stale catalog
- claude-commands-reference.md - Stale catalog
- claude-mcp-servers-reference.md - Stale catalog
- external-resources-reference.md - Provenance tracker (active, useful)
- living-requirements.md - Methodology guide (active, useful)
- new-repo-setup.md - Setup guide (active, useful)
- solutions/INDEX.md - Solved problems catalog (active, empty)

After cleanup (removing stale catalogs, decomposing claude-code-prefs.md), docs/ would contain:
- external-resources-reference.md
- living-requirements.md
- new-repo-setup.md
- tool-selection-guide.md (extracted from claude-code-prefs.md)
- solutions/

These are **project reference material**: things someone looks up about this project specifically, that aren't governance, aren't templates, and aren't planning artifacts.

### 10.6 Utility scripts placement

scripts/ contains 2 utility scripts (statusline-command.sh, toggle-hooks.sh). Low visibility desired but convention suggests root. No decision made.

### 10.7 design-template rename

User requested: rename design-template.md to discovery-template.md. Not yet applied.

### 10.8 What should CLAUDE.md contain?

See Section 7 for detailed analysis. Core question: how to restructure CLAUDE.md to be minimal, high-signal, and use @references for rules instead of duplicating content.

### 10.9 Memory vs docs boundary enforcement

See Section 6 for the delineation. Question: should the documentation system explicitly define what belongs in memory vs docs, or is the current implicit boundary sufficient?

---

## 11. Organizing Principles Selected

The user selected 8 applicable principles for directory organization:

1. **Capability type** - What the thing does
2. **Consumer** - Who reads/uses it
3. **Lifecycle stage** - When it's used
5. **Scope** - What level it applies to
6. **Content type** - What kind of document
9. **Portability** - Project-specific vs reusable
10. **Dependency direction** - What depends on what
12. **Domain** - Subject area

Plus a user-introduced concept: **Visibility** (how prominent something should be in the directory tree based on human navigation frequency).

### Visibility Levels Defined

| Level | Meaning | Placement |
|-------|---------|-----------|
| High | Frequently accessed/managed | Root |
| Medium | Occasionally accessed | Root or one level deep |
| Low | Rarely directly accessed, referenced by systems | Nested within structures |

---

## 12. Decisions Made So Far

| Decision | Status |
|----------|--------|
| Feature docs stay per-feature (planning/specs/{feature}/) | Confirmed |
| reference/ at root should be archived (duplicate of my-workflow/ref/) | Confirmed |
| archive/ stays at root | Confirmed |
| design-template.md should be renamed to discovery-template.md | Confirmed, not yet applied |
| Global rules and prefs should be conceptually together | Confirmed direction, placement TBD |
| Skill-specific rules stay in the skill | Confirmed direction |
| claude-code-prefs.md consolidation pulled into this feature | Confirmed |

---

## 13. Open Questions (Unresolved)

### Foundational

1. **What is the scope of each governance document?** We need to define whether coding-standards, security-checklist, etc. are code-specific, session-specific, or universal. This determines their loading level.

2. **Should the type system define Scenario A (this repo), Scenario B (any my-workflow project), or both?** And if both, how do we separate them?

3. **What counts as "project knowledge"?** Is there a coherent category for docs/ contents, or are they unrelated items sharing a directory?

### Structural

4. **Where do prefs live?** AI-CHAT-PREFS.md needs medium visibility. A prefs/ directory at root? Stay at root as single file?

5. **Where do utility scripts live?** Low visibility desired. Root scripts/ feels too prominent. But where else?

6. **What is docs/ for?** After cleanup, is it "project reference material"? Does that category hold?

7. **How do rules move between skill-level and always-on level without duplication?** If a rule is both portable (travels with skill) and global (should always apply), how do we avoid two copies?

### Content Architecture

8. **What should CLAUDE.md contain?** Current file duplicates OVERVIEW.md content and misses orphaned rules. See Section 7 for detailed analysis.

9. **How should claude-code-prefs.md be decomposed?** The proposed split (Section 5) needs confirmation: which rules promote to always-loaded, which content archives, which moves.

10. **Should stale catalog files be archived or deleted?** The 4 reference catalogs (skills, agents, commands, MCP) are all stale. Are they worth maintaining, or should they be archived/deleted since the source files are discoverable?

11. **Should memory vs docs boundary be explicit?** Should the documentation system define what belongs where, or is the implicit boundary sufficient?

### Naming

12. **What to call the prefs/rules directory?** (If one is needed.) Options: prefs/, rules/, governance/, config/, standards/

---

## 14. What Was Built Before Discovery (Tasks 1-3)

These files were created and may need revision based on architectural decisions:

| File | Status | May need revision? |
|------|--------|-------------------|
| my-workflow/docs/documentation-types.md | Created (116 lines) | Yes - mixed Scenario A and B |
| my-workflow/templates/research-template.md | Created (134 lines) | Likely OK |
| my-workflow/templates/claude-context-template.md | Created (17 lines) | Likely OK |
| my-workflow/templates/summary-template.md | Created (38 lines) | Likely OK |
| my-workflow/templates/incident-template.md | Created (39 lines) | Likely OK |
| my-workflow/templates/readme-template.md | Created (24 lines) | Likely OK |
| my-workflow/templates/state-template.md | Created (51 lines) | Likely OK |
| my-workflow/templates/backlog-template.md | Created (30 lines) | Likely OK |
| my-workflow/templates/overview-template.md | Created (36 lines) | Likely OK |
| my-workflow/templates/design-template.md | Created (25 lines) | Needs rename to discovery-template |
| plan.md Step 7 | Modified (references template) | Likely OK |

---

## 15. Next Steps

1. Resolve foundational questions (Sections 13.1-13.3): governance scopes, type system scope, project knowledge definition
2. Resolve content architecture questions (Sections 13.8-13.11): CLAUDE.md redesign, claude-code-prefs decomposition, stale catalogs, memory boundary
3. Resolve structural questions (Sections 13.4-13.7): prefs placement, scripts placement, docs/ purpose, rule loading
4. Revise documentation-types.md based on decisions
5. Revise the implementation plan to reflect expanded scope
6. Execute revised plan
