# Repo Documentation Research

## Problem Analysis

### Problem Domain

Repos using my-workflow generate many document types (specs, plans, summaries, context files, state tracking) but have no governing type system. The workflow defines templates for 4 types (spec, plan, workflow, command) while 13+ types exist without templates. No rules define where docs should live. No mechanism detects drift.

### Current State

**Document types in use today:**

| Type | Template? | Instances | Where Found |
|------|-----------|-----------|-------------|
| SPEC.md | Yes | 12 | planning/specs/{feature}/ |
| PLAN.md | Yes | 12 | planning/specs/{feature}/ |
| RESEARCH.md | Inline only | 10 | planning/specs/{feature}/ |
| SUMMARY.md | No | 9 | planning/specs/{feature}/ |
| CLAUDE.md | No | 22 | Root, .claude/, directories |
| README.md | No | 4 | Root, skills/, mcp/ |
| STATE.md | No | 1 | planning/ |
| BACKLOG.md | No | 1 | planning/ |
| OVERVIEW.md | No | 1 | planning/ |
| INCIDENT-*.md | No | 3 | planning/specs/{feature}/ |
| DESIGN.md | No | 1 | planning/specs/{feature}/ |
| SKILL.md | Convention | 110 | skills/{group}/{name}/ |
| Agent .md | Convention | 135 | agents/ |
| Workflow .md | Yes | 5 | skills/Planning/my-workflow/workflows/ |
| Command .md | Yes (deprecated) | 0 active | Migrated to skills |

**Issues found during audit:**

1. 4 docs/ files are stale snapshots of discoverable content (no sync mechanism)
2. CLAUDE.md and README.md have stale counts (91 vs 110 skills, 33 vs 110 skills)
3. Core principles duplicated across CLAUDE.md, README.md, and OVERVIEW.md
4. 5 CLAUDE.md files are empty (only claude-mem activity, no useful context)
5. skills/README.md contains wrong content (n8n skill docs instead of skills overview)
6. 2 loose research files in planning/specs/ (should be in feature directories)
7. 4 broken @references in completed feature specs (old directory names)
8. 12 completed feature specs retain full PLAN/RESEARCH/SPEC files (could archive)

## Information Gathered

### Codebase Analysis

**Existing template location:** `skills/Planning/my-workflow/templates/`

Contains 4 templates:
- `spec-template.md` - Feature specification (Goal, User Stories, Requirements, Constraints, Success Criteria)
- `plan-template.md` - Implementation plan (Objective, Context, Task Summary, Tasks, Verification)
- `workflow-template.md` - Workflow definition (Purpose, When to Use, Steps, Output, Error Handling)
- `command-template.md` - Command/skill definition (YAML frontmatter, What This Does, When to Use, Usage)

**RESEARCH.md template** is defined inline in `plan.md` workflow (Step 7) but has no standalone template file. It's the most detailed inline definition (Problem Analysis, Information Gathered, Tradeoff Analysis, Approach, Key Decisions).

**Auto-loading behavior for CLAUDE.md:**
- Root `CLAUDE.md` is always loaded
- `.claude/CLAUDE.md` is always loaded
- Directory-level CLAUDE.md files load when working in that directory
- This makes CLAUDE.md the most impactful doc type: wrong/empty content wastes tokens or provides bad context

**Existing conventions without templates:**
- SKILL.md uses YAML frontmatter (name, description, triggers)
- Agent .md uses frontmatter (model, description)
- These are established patterns but lack formal template files

### Pattern Analysis

**What makes a good template:**
1. Clear section headers with placeholder descriptions
2. Validation checklist (spec-template.md has this)
3. Concise (current templates are 50-100 lines)
4. Documents the "why" for each section, not just structure

**Placement rules that already exist (implicit):**
- Feature specs go in `planning/specs/{feature}/`
- Skills go in `skills/{Group}/{name}/`
- Agents go in `agents/`
- Workflows go in `skills/Planning/my-workflow/workflows/`
- State tracking goes in `planning/`

**What's missing:**
- Where do standalone guides go? (Currently scattered between docs/ and skills/)
- Where do project-level docs go? (Currently in root, some in planning/)
- What's the role of docs/? (Currently a catch-all for everything)
- When should content be in CLAUDE.md vs README.md vs a separate doc?

## Tradeoff Analysis

| Factor | Choice Made | Alternative | Why This Choice |
|--------|-------------|-------------|-----------------|
| Template location | my-workflow/templates/ | Separate docs-system skill | Keeps all workflow artifacts together, already has 4 templates |
| Rules location | my-workflow/docs/documentation-types.md | Root CLAUDE.md section | Rules must be portable, not project-specific. Agent reads the reference, not CLAUDE.md |
| Agent type | Dedicated subagent (agents/) | Skill with /docs-audit command | Agent needs full file system access and autonomous operation |
| Data handling | Move to correct location, never delete | Flag and suggest | User values data capture; agent should act (with confirmation for moves) |
| Scope of types | All types found in this repo | Only planning types | Comprehensive coverage prevents future gaps |

### Risks

- Template proliferation: Too many templates becomes a maintenance burden. Mitigated by keeping templates minimal (under 100 lines each).
- Agent complexity: Scanning 500+ files and making placement decisions is complex. Mitigated by clear rules and a confirmation step for moves.
- Cross-repo portability: Different repos may have different directory structures. Mitigated by making rules based on my-workflow conventions (planning/, skills/), not hardcoded paths.

## Approach

Three phases:

1. **Documentation type system** - Define all types, create templates, write placement rules. Add to my-workflow/templates/ and my-workflow/docs/.
2. **Enforcement agent** - Create a subagent that reads the type system and validates/organizes a repo. Add to agents/.
3. **First run cleanup** - Run the agent on this repo. Fix all issues found in the audit. Validate results.

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Templates go in my-workflow | my-workflow/templates/ | Already has 4 templates, single location, portable |
| Placement rules go in my-workflow | my-workflow/docs/documentation-types.md | Portable reference, not project-specific |
| Agent is a subagent | agents/docs-enforcer.md | Needs file access, runs autonomously, fits agent pattern |
| Agent confirms before moving | Confirmation for moves, silent for validation | Balances autonomy with safety |
| RESEARCH.md gets standalone template | Extract from plan.md inline definition | Consistency with other types |

## Sources

- Audit of 502 markdown files in claude-customizations repo (Feb 7, 2026)
- Existing templates in skills/Planning/my-workflow/templates/
- RESEARCH.md inline template in skills/Planning/my-workflow/workflows/plan.md (Step 7)
- planning/OVERVIEW.md governance declarations
