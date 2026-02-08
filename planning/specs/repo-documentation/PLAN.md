# Repo Documentation Implementation Plan

## Objective

Create a documentation type system with templates and placement rules, build an enforcement agent, and run it on this repo to clean up all issues found during the audit.

## Context

@planning/specs/repo-documentation/SPEC.md
@planning/specs/repo-documentation/RESEARCH.md

## Task Summary

**Phase 1: Documentation Type System**

| # | Task | Type | Dependencies |
|---|------|------|--------------|
| 1 | Create documentation types reference | auto | - |
| 2 | Create missing templates | auto | Task 1 |
| 3 | Extract RESEARCH.md standalone template | auto | Task 1 |
| 4 | Review type system | checkpoint:human-verify | Tasks 1-3 |

**Phase 2: Enforcement Agent**

| # | Task | Type | Dependencies |
|---|------|------|--------------|
| 5 | Create docs-enforcer agent | auto | Task 4 |
| 6 | Review agent definition | checkpoint:human-verify | Task 5 |

**Phase 3: Cleanup (First Run)**

| # | Task | Type | Dependencies |
|---|------|------|--------------|
| 7 | Consolidate root files and fix counts | auto | Task 6 |
| 8 | Clean up docs/ directory | auto | Task 6 |
| 9 | Fix skills/README.md | auto | - |
| 10 | Populate empty CLAUDE.md files | auto | Task 2 |
| 11 | Fix misplaced files and broken @references | auto | - |
| 12 | Archive completed feature specs | auto | Task 2 |
| 13 | Final verification | checkpoint:human-verify | Tasks 7-12 |

## Tasks

### Task 1: Create documentation types reference

**Type**: auto
**Files**: skills/Planning/my-workflow/docs/documentation-types.md (new)
**Dependencies**: None

**Context**: No reference exists for what document types are used in my-workflow repos, where they belong, or what they should contain. This is the root cause of documentation drift. The reference must be portable (lives in the workflow skill, not project-specific).

**Action**:

Create `skills/Planning/my-workflow/docs/documentation-types.md` with:

1. **Canonical Directory Structure** - The physical blueprint for a my-workflow repo:

```
repo-root/
├── CLAUDE.md                          # Project Context (auto-loaded, operational)
├── README.md                          # Project Intro (human-facing)
├── AI-CHAT-PREFS.md                   # Chat Preferences (loaded via hook)
│
├── docs/                              # Standalone guides and references
│   ├── {guide-name}.md                # Guide (no better home)
│   └── solutions/                     # Solved problems (/compound)
│       ├── INDEX.md                   # Solutions index
│       └── {category}/               # Problem categories
│           └── {solution}.md          # Individual solution
│
├── planning/                          # Project management
│   ├── CLAUDE.md                      # Planning Context (auto-loaded, navigation)
│   ├── OVERVIEW.md                    # Project Vision (authoritative governance)
│   ├── STATE.md                       # Project State (living tracker)
│   ├── BACKLOG.md                     # Project Backlog (persistent)
│   └── specs/                         # Feature specifications
│       └── {feature}/                 # One directory per feature
│           ├── CLAUDE.md              # Feature Context (auto-loaded)
│           ├── SPEC.md                # Feature Spec (requirements)
│           ├── RESEARCH.md            # Feature Research (analysis, decisions)
│           ├── PLAN.md                # Feature Plan (executable tasks)
│           ├── SUMMARY.md             # Feature Summary (outcomes, post-completion)
│           ├── INCIDENT-{date}.md     # Incident Report (optional, post-incident)
│           ├── DESIGN.md              # Design Document (optional, visual/arch)
│           └── archive/               # Archived artifacts (post-completion)
│
├── skills/                            # Skill definitions
│   ├── README.md                      # Skills overview (groups, counts, how-to)
│   └── {Group}/                       # Functional group (PascalCase)
│       └── {name}/                    # Individual skill (kebab-case)
│           ├── SKILL.md               # Skill Definition (frontmatter + instructions)
│           ├── CLAUDE.md              # Skill Context (optional, auto-loaded)
│           ├── README.md              # Skill Docs (optional, human-facing)
│           └── references/            # Supporting docs (optional)
│
├── agents/                            # Subagent definitions
│   └── {name}.md                      # Agent Definition (frontmatter + role)
│
├── hooks/                             # Event-driven behaviors
│   ├── CLAUDE.md                      # Hooks Context (auto-loaded)
│   └── scripts/                       # Hook implementations
│       ├── CLAUDE.md                  # Scripts Context (auto-loaded)
│       └── {hook-name}.js             # Hook script
│
├── mcp/                               # MCP server configurations
│   └── {server}/                      # Individual server
│       ├── CLAUDE.md                  # MCP Context (auto-loaded)
│       └── README.md                  # MCP Docs (human-facing)
│
├── scripts/                           # Utility scripts
│   └── CLAUDE.md                      # Scripts Context (auto-loaded)
│
├── reference/                         # External methodology (read-only)
│
└── archive/                           # Archived content
    └── docs/                          # Archived docs/ files
```

2. **Document Type Registry** - Every file type, its purpose, and where it lives:

| Type | Filename | Location | Purpose | Template? | Auto-loaded? |
|------|----------|----------|---------|-----------|-------------|
| Project Context | CLAUDE.md | repo root | Operational instructions for Claude | Yes | Yes |
| Directory Context | CLAUDE.md | any directory | Cascading context for that directory | Yes | Yes |
| Project Intro | README.md | repo root | Human-facing project overview | Yes | No |
| Chat Preferences | AI-CHAT-PREFS.md | repo root | Conversation behavior rules | No (personal) | Via hook |
| Project Vision | OVERVIEW.md | planning/ | Vision, scope, principles, governance | Yes | No |
| Project State | STATE.md | planning/ | Current stage, active features, decisions | Yes | No |
| Project Backlog | BACKLOG.md | planning/ | Improvements, ideas, technical debt | Yes | No |
| Feature Spec | SPEC.md | planning/specs/{feature}/ | Requirements for a feature | Yes | No |
| Feature Research | RESEARCH.md | planning/specs/{feature}/ | Analysis, tradeoffs, decisions | Yes | No |
| Feature Plan | PLAN.md | planning/specs/{feature}/ | Executable implementation tasks | Yes | No |
| Feature Summary | SUMMARY.md | planning/specs/{feature}/ | Outcomes after feature completion | Yes | No |
| Feature Context | CLAUDE.md | planning/specs/{feature}/ | Cascading context for feature | Yes | Yes |
| Incident Report | INCIDENT-{date}.md | planning/specs/{feature}/ | Post-incident documentation | Yes | No |
| Design Document | DESIGN.md | planning/specs/{feature}/ | Visual/architectural design decisions | Yes | No |
| Skill Definition | SKILL.md | skills/{Group}/{name}/ | Skill instructions and metadata | Convention | Yes |
| Agent Definition | {name}.md | agents/ | Subagent role and instructions | Convention | No |
| Workflow | {name}.md | my-workflow/workflows/ | Workflow step definitions | Yes | No |
| Guide | {name}.md | docs/ | Standalone guides with no better home | No | No |
| Solution | {category}/{name}.md | docs/solutions/ | Solved problem documentation | Yes | No |

3. **Placement Rules** - Decision tree for where a new doc goes:

   - Is it auto-loaded context for a directory? -> CLAUDE.md in that directory
   - Is it a feature artifact (spec, plan, research, summary)? -> planning/specs/{feature}/
   - Is it a skill or agent definition? -> skills/{Group}/{name}/ or agents/
   - Is it project management (state, backlog, governance)? -> planning/
   - Is it a standalone guide that doesn't belong to a skill? -> docs/
   - Is it human-facing documentation for a directory? -> README.md in that directory

4. **Role Separation for Root Files**:

   - CLAUDE.md: Operational instructions (structure, behavioral rules, doc architecture summary). Auto-loaded, token-sensitive. Keep concise.
   - README.md: Human introduction (what this repo is, how to use it, getting started). Not auto-loaded. Can be longer.
   - OVERVIEW.md: Authoritative governance (vision, principles, scope, versioning). Referenced, not duplicated.

5. **Content Rules**:

   - No content should exist in two places. Link, don't duplicate.
   - CLAUDE.md files must contain useful context (not just claude-mem activity).
   - Completed feature specs archive to CLAUDE.md + SUMMARY.md (PLAN/RESEARCH/SPEC go to archive/).
   - Stale content (counts, dates, references) must be verifiable against the source of truth.
   - Every directory with a CLAUDE.md should have content describing that directory's purpose and key files.

**Verify**: File exists, covers all types found in audit, placement rules are unambiguous
**Done**: Complete documentation type registry with placement rules

---

### Task 2: Create missing templates

**Type**: auto
**Files**: skills/Planning/my-workflow/templates/ (new files)
**Dependencies**: Task 1

**Context**: 9 document types have no template. Templates ensure consistency and make the enforcement agent's job possible (it compares files against templates).

**Action**:

Create these template files in `skills/Planning/my-workflow/templates/`:

1. **claude-context-template.md** - For CLAUDE.md files (both root and directory-level):
   - Sections: purpose description, key files/references, working notes
   - Placeholder for claude-mem context block
   - Guidance on what belongs here vs README.md
   - Keep under 30 lines (auto-loaded = token cost)

2. **research-template.md** - Extract from plan.md workflow Step 7:
   - Sections: Problem Analysis, Current State, Information Gathered, Tradeoff Analysis, Approach, Key Decisions, Sources
   - Already well-defined inline; just needs to be a standalone file

3. **summary-template.md** - For completed feature outcomes:
   - Sections: Feature name, What was built, Key decisions made, Files created/modified, Lessons learned
   - Brief (under 40 lines)

4. **incident-template.md** - For post-incident documentation:
   - Sections: Date, Severity, What happened, Root cause, Impact, Resolution, Prevention
   - Based on existing INCIDENT files in the repo

5. **readme-template.md** - For project/directory READMEs:
   - Sections: Title, Description, Structure, Getting Started, Usage
   - Lighter than CLAUDE.md (human-focused, not token-sensitive)

6. **state-template.md** - For STATE.md:
   - Sections: Stage, Active Features, Feature Registry, Current Focus, Decisions, Current State
   - Based on existing STATE.md structure

7. **backlog-template.md** - For BACKLOG.md:
   - Sections: Quick Wins, Improvements (categorized), Technical Debt, Inspiration Sources
   - Based on existing BACKLOG.md structure

8. **overview-template.md** - For OVERVIEW.md:
   - Sections: Vision, Problem Statement, Scope, Principles, Quality Standards, Governance
   - Based on existing OVERVIEW.md structure

9. **design-template.md** - For DESIGN.md:
   - Sections: Design Goal, Visual/Architectural Decisions, Constraints, Examples, Rationale
   - Based on existing DESIGN.md in my-workflow-visual-design

Each template should be under 100 lines with placeholder descriptions explaining what goes in each section.

**Verify**: All 9 templates created, each under 100 lines, consistent style with existing templates
**Done**: Every document type has a template

---

### Task 3: Extract RESEARCH.md standalone template

**Type**: auto
**Files**: skills/Planning/my-workflow/templates/research-template.md, skills/Planning/my-workflow/workflows/plan.md
**Dependencies**: Task 1

**Context**: RESEARCH.md is defined inline in plan.md Step 7 (50+ line markdown block). This should be extracted to a standalone template file and referenced from plan.md, matching how spec-template.md and plan-template.md work.

**Action**:

1. Create `skills/Planning/my-workflow/templates/research-template.md` with the structure from plan.md Step 7
2. In plan.md Step 7, replace the inline template with a reference: "Use the template at `@skills/Planning/my-workflow/templates/research-template.md`"
3. Keep the inline guidance about what to research (codebase analysis, external research, tradeoffs) but remove the duplicated template block

**Verify**: Template file exists, plan.md Step 7 references it, no duplication
**Done**: RESEARCH.md template is standalone and referenced

---

### Task 4: Review type system

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Tasks 1-3

**Context**: The documentation type system is the foundation for everything else. User should review the type registry, placement rules, and templates before the agent is built on top of them.

**Action**: Present summary of all created files, type registry, and placement rules for review.
**Verify**: User confirms types, rules, and templates are correct
**Done**: User approves the type system

---

### Task 5: Create docs-enforcer agent

**Type**: auto
**Files**: agents/docs-enforcer.md (new)
**Dependencies**: Task 4

**Context**: The enforcement agent reads the documentation type system and validates/organizes a repo. It should work in any repo that uses my-workflow.

**Action**:

Create `agents/docs-enforcer.md` with:

1. **Frontmatter**: description, model preference (sonnet for speed)

2. **Role**: Documentation enforcement agent for repos using my-workflow

3. **Instructions**:
   - Read the documentation types reference (`skills/Planning/my-workflow/docs/documentation-types.md`)
   - Scan all markdown files in the repo
   - For each file, determine:
     a. What document type is it? (match against type registry)
     b. Is it in the correct location? (check placement rules)
     c. Does it contain the expected sections? (compare against template)
     d. Does it contain content that belongs elsewhere?
   - Generate a findings report with:
     - Files in wrong locations (with recommended location)
     - Files missing required sections (with what's missing)
     - Content that should be relocated (with source and destination)
     - Stale content detected (counts, dates, broken references)
     - Empty or near-empty files that should have content

4. **Behavioral rules**:
   - Never discard information. If content is misplaced, propose moving it.
   - Ask for confirmation before moving files or restructuring content.
   - Validate silently; only surface issues.
   - Respect exclusions: skip agents/*.md, skills/*/SKILL.md, reference/, archive/ (unless checking placement)
   - Report findings in a structured format (table of issues with severity, location, recommendation)

5. **Invocation pattern**: User invokes via "audit documentation", "check docs", "enforce documentation rules", or explicitly via Task tool with docs-enforcer agent type.

**Verify**: Agent file created, references documentation-types.md, has clear validation logic
**Done**: Agent definition is complete and ready for use

---

### Task 6: Review agent definition

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 5

**Context**: Agent behavior should be reviewed before it's used to modify the repo.

**Action**: Present the agent definition for review. Highlight the behavioral rules and confirmation requirements.
**Verify**: User confirms agent behavior is appropriate
**Done**: User approves the agent

---

### Task 7: Consolidate root files and fix counts

**Type**: auto
**Files**: CLAUDE.md, README.md
**Dependencies**: Task 6

**Context**: CLAUDE.md and README.md have stale counts and duplicate content from OVERVIEW.md. Per the type system, each file has a distinct role.

**Action**:

1. **Get accurate counts**:
   - `find skills/ -name 'SKILL.md' | wc -l` for skill count
   - `ls -d skills/*/ | wc -l` for group count
   - `ls agents/*.md | wc -l` for agent count

2. **CLAUDE.md** (operational instructions, auto-loaded):
   - Update structure section with correct counts
   - Remove duplicated core principles (replace with: "See planning/OVERVIEW.md for project vision, principles, and governance")
   - Remove duplicated quality standards (same reference)
   - Keep: structure overview, behavioral rules, development workflow (concise), planning links
   - Add brief doc architecture summary (2-3 lines referencing documentation-types.md)

3. **README.md** (human introduction, not auto-loaded):
   - Update structure section with correct counts
   - Remove "commands/" references (all migrated to skills)
   - Remove duplicated principles and quality sections (reference OVERVIEW.md)
   - Keep: what this repo is, directory structure, symlink explanation, getting started, workflow overview

**Verify**: Counts match actual files, no duplicated content between the three root files
**Done**: Each root file has a distinct role, accurate counts

---

### Task 8: Clean up docs/ directory

**Type**: auto
**Files**: docs/, archive/docs/ (new)
**Dependencies**: Task 6

**Context**: 6 docs/ files are stale snapshots or duplicates. 3 are useful and stay.

**Action**:

1. Create `archive/docs/` directory

2. Before moving, grep for references to each file across the repo. Update any references found.

3. **Archive** (move to archive/docs/):
   - `claude-agents-reference.md` (stale snapshot of agents/)
   - `claude-commands-reference.md` (documents migrated commands)
   - `claude-skills-reference.md` (stale snapshot of skills/)
   - `claude-mcp-servers-reference.md` (duplicates .mcp.json)
   - `claude-code-prefs.md` (overlaps CLAUDE.md, stale Dec 2024 analysis)
   - `living-requirements.md` (duplicates skills/Planning/living-requirements/SKILL.md)

4. **Keep in docs/**:
   - `new-repo-setup.md` (unique guide)
   - `external-resources-reference.md` (useful integration map)
   - `solutions/INDEX.md` (used by /compound)

5. Update BACKLOG.md references if any point to archived files.

**Verify**: docs/ contains only: new-repo-setup.md, external-resources-reference.md, solutions/
**Done**: Stale/duplicate docs archived with references updated

---

### Task 9: Fix skills/README.md

**Type**: auto
**Files**: skills/README.md, skills/Platform/n8n/README.md (new)
**Dependencies**: None

**Context**: skills/README.md contains n8n workflow patterns documentation. It should describe the skills directory.

**Action**:

1. Move current skills/README.md content to `skills/Platform/n8n/README.md`
2. Create new skills/README.md:
   - Title: Skills Directory
   - How skills work (auto-activate based on context, invoke via /name)
   - Table of skill groups with brief description and count
   - Total skill count
   - How to add a new skill (reference OVERVIEW.md development workflow)

**Verify**: skills/README.md describes the skills system, n8n content is preserved
**Done**: skills/README.md accurately represents the skills directory

---

### Task 10: Populate empty CLAUDE.md files

**Type**: auto
**Files**: hooks/CLAUDE.md, hooks/scripts/CLAUDE.md, scripts/CLAUDE.md, mcp/code-executor/CLAUDE.md
**Dependencies**: Task 2 (uses claude-context-template.md)

**Context**: These CLAUDE.md files contain only claude-mem activity. When Claude works in these directories, the cascading context provides nothing useful.

**Action**:

Using the claude-context-template.md as guide, add descriptive headers to each:

1. **hooks/CLAUDE.md**: Hooks system overview (event types, configuration location, key hooks)
2. **hooks/scripts/CLAUDE.md**: Hook script implementations (JS files executed by hooks, naming convention)
3. **scripts/CLAUDE.md**: Utility scripts directory (statusline, helpers)
4. **mcp/code-executor/CLAUDE.md**: Code executor MCP server (brief purpose, point to README.md for details)

Keep descriptions to 3-5 lines each. Preserve existing claude-mem context blocks.

**Verify**: Each CLAUDE.md has a descriptive header before the claude-mem section
**Done**: No empty CLAUDE.md files

---

### Task 11: Fix misplaced files and broken @references

**Type**: auto
**Files**: planning/specs/*.md, planning/specs/*/PLAN.md
**Dependencies**: None

**Context**: 2 loose files in planning/specs/ and 4 broken @references in completed feature specs.

**Action**:

1. **Move loose files**:
   - `planning/specs/reddit-sources-evaluation.md` -> `planning/specs/everything-claude-code-migration/reddit-sources-evaluation.md`
   - `planning/specs/workflow-improvements-analysis.md` -> `planning/specs/my-workflow/workflow-improvements-analysis.md`
   - Grep for references and update any found

2. **Fix @references**:
   - In `planning/specs/my-workflow/PLAN.md`: Replace `001-my-workflow` with `my-workflow`
   - In `planning/specs/clarify-blockers/PLAN.md`: Replace `clarify-rule-3-blockers` with `clarify-blockers`
   - Grep for any other instances of old directory names

**Verify**: No loose .md files in planning/specs/, no broken @references
**Done**: All files in correct locations, all references resolve

---

### Task 12: Archive completed feature specs

**Type**: auto
**Files**: planning/specs/{completed-features}/
**Dependencies**: Task 2 (uses summary-template.md for reference)

**Context**: 12 features are complete. Full PLAN/RESEARCH/SPEC files add clutter. CLAUDE.md + SUMMARY.md are sufficient for future reference.

**Action**:

For each completed feature (all except audit-agents and repo-documentation):

1. Create `planning/specs/{feature}/archive/` subdirectory
2. Move PLAN.md, RESEARCH.md, SPEC.md into archive/
3. Keep at feature root: CLAUDE.md, SUMMARY.md, INCIDENT-*.md, and actively-referenced artifacts
4. Update CLAUDE.md to note "Completed. See SUMMARY.md for outcomes."

**Special cases**:
- `fix-command/`: Normalize lowercase filenames to UPPERCASE before archiving
- `code-executor-http-oauth/`, `ai-chat-prefs-autoload/`: Already minimal, skip
- `commands-skills-migration/`: Keep INCIDENT files at root
- `my-workflow/`: Keep WORKTREE-WORKFLOW.md at root (active reference)

**Verify**: Each completed feature has CLAUDE.md + SUMMARY.md at root, rest in archive/
**Done**: Completed specs in minimal form

---

### Task 13: Final verification

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Tasks 7-12

**Context**: All changes complete. Verify nothing was lost and the documentation system works.

**Action**:

Present summary of all changes:
- New files created (type system, templates, agent)
- Files archived (with destinations)
- Files moved (with old/new paths)
- Files modified (with change descriptions)
- Verification checks:
  - `grep -r "91 SKILL" .` returns zero
  - `grep -r "72 slash" .` returns zero
  - `grep -r "001-my-workflow" .` returns zero
  - `grep -r "clarify-rule-3-blockers" .` returns zero
  - `find planning/specs/ -maxdepth 1 -name '*.md'` returns zero
  - Every CLAUDE.md has substantive content
  - docs/ contains only approved files

**Verify**: User reviews all changes and confirms
**Done**: User approves, feature complete

## Verification

- [ ] Documentation types reference exists and covers all types
- [ ] All document types have templates
- [ ] Enforcement agent exists and references the type system
- [ ] All file counts in CLAUDE.md and README.md are accurate
- [ ] No duplicated content across root files
- [ ] No stale reference files in docs/
- [ ] No empty CLAUDE.md files
- [ ] No loose files in planning/specs/
- [ ] No broken @references
- [ ] Completed feature specs archived to minimal form

## Success Criteria

- Every document type has a template in my-workflow/templates/
- Placement rules are defined and unambiguous
- Enforcement agent can be invoked on any my-workflow repo
- This repo passes the agent's validation after cleanup
