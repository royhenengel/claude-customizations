# Curation Log: My Workflow System

**Feature**: 001-my-workflow
**Date**: 2026-01-12
**Purpose**: Document key learnings, changes, and decisions during skill/command curation

---

## Skills Reviewed

### Skill Creation Family (6 skills reviewed)

| Original Name | Action | New Name | Reason |
|---------------|--------|----------|--------|
| `template-skill` | **DELETE** | - | Empty placeholder (7 lines), fully redundant |
| `skill-creator` | **REFERENCE** | - | Redundant with skill-assistant which contains it in catalog |
| `skill-assistant` | **RENAME** | `skill-catalog` | Better reflects its primary value: browsing/installing from catalog |
| `taches-create-agent-skills` | **KEEP** | - | Unique: opinionated XML structure + router pattern |
| `claude-skill-builder` | **RENAME** | `skill-builder` | Simpler name, remove vendor prefix |
| `skill-share` | **RENAME** | `skill-share-slack` | Clarifies the Slack-specific integration |

### Hook Creation Family (2 skills reviewed → merged)

| Original Name | Action | New Name | Reason |
|---------------|--------|----------|--------|
| `taches-create-hooks` | **MERGE** | `hook-builder` | Best modular structure, kept as base |
| `claude-hook-builder` | **REFERENCE** | - | Merged wizard workflow into hook-builder |

**Merged skill**: `hook-builder` combines:
- Modular structure with 7 reference files from taches-create-hooks
- Interactive wizard workflow from claude-hook-builder
- Best examples from both sources

### When to Use Hook-Builder

| Scenario | Approach |
|----------|----------|
| "Create a new hook" | Interactive wizard guides you through all decisions |
| "Understand hook events" | Reference: `references/hook-types.md` |
| "See working examples" | Reference: `references/examples.md` |
| "Debug hook issues" | Reference: `references/troubleshooting.md` |

### When to Use Each Skill

| Scenario | Use This Skill |
|----------|----------------|
| "I need a skill that already exists" | **skill-catalog** (browse 27+ pre-made skills) |
| "I want opinionated best practices with XML structure and router pattern" | **taches-create-agent-skills** |
| "I want an interactive wizard to guide me through skill creation" | **skill-builder** |
| "I need to create AND share a skill on Slack with my team" | **skill-share-slack** |
| "I need to create an agent, not a skill" | **skill-catalog** (has agent templates) |
| "I want to build a complex router-based skill with workflows" | **taches-create-agent-skills** |

---

## Key Learnings

### 1. Skill Overlap Discovery Process

When reviewing a skill, always ask: "What other similar/overlapping skills exist?"

This revealed:
- 6 skills all related to "creating skills"
- Only 1 was truly redundant (template-skill)
- Others had distinct use cases worth preserving

### 2. Naming Conventions

Good skill names should:
- Reflect primary value/use case (skill-assistant → skill-catalog)
- Be concise (claude-skill-builder → skill-builder)
- Clarify integrations (skill-share → skill-share-slack)

### 3. Reference vs Delete

- **DELETE**: Only when truly empty/broken (template-skill had 7 lines, no value)
- **REFERENCE**: When redundant but contains useful patterns to learn from

---

## Changes Applied

### Deletions
- [x] `~/.claude/skills/template-skill/` - Deleted

### Moves to Reference
- [x] `~/.claude/skills/skill-creator/` → `~/.claude/reference/skills/skill-creator/`
- [x] `~/.claude/skills/taches-create-hooks/` → `~/.claude/reference/skills/taches-create-hooks/`
- [x] `~/.claude/skills/anthropic/claude-hook-builder/` → `~/.claude/reference/skills/claude-hook-builder/`

### Merges
- [x] Created `~/.claude/skills/hook-builder/` from taches-create-hooks + claude-hook-builder

### Renames
- [x] `~/.claude/skills/skill-assistant/` → `~/.claude/skills/skill-catalog/` (frontmatter updated)
- [x] `~/.claude/skills/anthropic/claude-skill-builder/` → `~/.claude/skills/skill-builder/` (frontmatter updated)
- [x] `~/.claude/skills/skill-share/` → `~/.claude/skills/skill-share-slack/` (frontmatter updated)

---

## Curation Progress

### Category 1: Core Development Skills

#### taches-* Family

| Skill | Decision | Notes |
|-------|----------|-------|
| taches-create-agent-skills | KEEP | Unique XML structure + router pattern |
| taches-create-hooks | MERGED → hook-builder | Combined with claude-hook-builder |
| taches-create-meta-prompts | KEEP | Prompt engineering for Claude-to-Claude pipelines (.prompts/) - deeper analysis in Phase 5 |
| taches-create-plans | KEEP | Solo agentic planning (.planning/) - deeper analysis in Phase 5 |
| taches-create-slash-commands | KEEP | Comprehensive universal guidance |
| taches-create-subagents | KEEP | Subagent creation - deeper analysis in Phase 5 |
| taches-debug-like-expert | KEEP + MERGE | Merge debug.md techniques into skill |

#### cek-* Family
| Skill | Decision | Notes |
|-------|----------|-------|
| cek-kaizen | KEEP | Code principles - "always-on" philosophy (Four Pillars: Kaizen, Poka-Yoke, Standardized Work, JIT) |
| cek-why | KEEP | Companion command - Five Whys root cause analysis |
| cek-cause-and-effect | KEEP | Companion command - Fishbone/Ishikawa multi-factor analysis |
| cek-plan-do-check-act | KEEP | Companion command - PDCA iterative improvement cycle |
| cek-software-architecture | KEEP | Clean Architecture/DDD principles - deeper analysis in Phase 5 |
| cek-test-driven-development | KEEP | Code principles - strict TDD discipline (Red-Green-Refactor) + anti-patterns |
| cek-subagent-driven-development | KEEP | Subagent dispatch pattern - deeper analysis in Phase 5 |
| cek-prompt-engineering | KEEP | Theory/techniques for writing prompts (complements taches-create-meta-prompts) |

#### Other Planning/Design Skills
| Skill | Decision | Notes |
|-------|----------|-------|
| living-requirements | KEEP | Living product requirements in features/ - deeper analysis in Phase 5 |
| brainstorming | KEEP | Design exploration via dialogue - deeper analysis in Phase 5 |

#### Skill Creation Family (reviewed within context)
| Skill | Decision | Notes |
|-------|----------|-------|
| skill-catalog (was skill-assistant) | KEEP | Catalog + agent creation |
| skill-builder (was claude-skill-builder) | KEEP | Interactive wizard |
| skill-share-slack (was skill-share) | KEEP | Slack integration |
| taches-create-agent-skills | KEEP | XML structure + router pattern |
| skill-creator | REFERENCE | Redundant with skill-catalog |
| template-skill | DELETE | Empty placeholder |

---

## Detailed Analysis: Planning & Prompt Skills

This section captures the strategic analysis performed during curation. These skills will be analyzed more deeply in Phase 5 when building `/build` command.

### Meta-Prompt Skills Comparison

#### taches-create-meta-prompts vs taches-create-plans

| Aspect | taches-create-meta-prompts | taches-create-plans |
|--------|---------------------------|---------------------|
| **Purpose** | Create prompts for Claude-to-Claude pipelines | Create PROJECT plans for solo agentic development |
| **Storage** | `.prompts/{number}-{topic}-{purpose}/` | `.planning/phases/` |
| **Output** | SUMMARY.md per prompt | BRIEF → ROADMAP → PLAN → SUMMARY hierarchy |
| **Use Case** | Any multi-stage LLM workflow | Project management and task breakdown |
| **Types** | 4 purpose types: Do, Plan, Research, Refine | Hierarchical: phases and tasks |

**Key Distinction**:
- **taches-create-meta-prompts** = **Prompt Engineering Tool** - Creates prompts that one Claude instance generates for another Claude instance to consume. It's about **prompt chaining** for any purpose.
- **taches-create-plans** = **Project Planning Tool** - Creates hierarchical project documentation for agentic execution. It's about **project structure** and task organization.

**Relationship**: Complementary. You might use taches-create-plans to plan your project phases, and taches-create-meta-prompts to create the actual prompts that execute each phase.

**Decision**: Both **KEEP** - they serve different purposes.

---

#### cek-prompt-engineering vs taches-create-meta-prompts

| Aspect | cek-prompt-engineering | taches-create-meta-prompts |
|--------|------------------------|---------------------------|
| **Purpose** | **Theory/Techniques** - How to write effective prompts | **Creation/Execution** - Create actual prompt files |
| **Output** | Knowledge/guidance (no files) | `.prompts/{folder}/SUMMARY.md` files |
| **Focus** | Patterns: few-shot, chain-of-thought, persuasion principles | Pipeline structure: Research → Plan → Do → Refine |
| **Use Case** | "How do I write a better prompt?" | "Create a meta-prompt for this workflow" |

**Key Distinction**:
- **cek-prompt-engineering** = **The "How"** (theory, techniques, patterns) - Teaches prompt engineering principles. Covers: few-shot learning, chain-of-thought, authority/commitment psychology. Reference material for writing ANY prompt.
- **taches-create-meta-prompts** = **The "What"** (create actual prompts) - Creates structured prompt files in `.prompts/` folder. Implements the techniques from cek-prompt-engineering. Produces executable Claude-to-Claude pipelines.

**Relationship**: Complementary. Use cek-prompt-engineering to learn HOW to write effective prompts, then use taches-create-meta-prompts to CREATE those prompts in a structured way.

**Decision**: Both **KEEP** - different purposes (theory vs creation).

---

### Planning Skills Ecosystem

#### Skills Related to taches-create-plans

| Skill | Purpose | Overlap Level |
|-------|---------|---------------|
| **taches-create-plans** | Hierarchical PROJECT plans for solo agentic dev (`.planning/`) | - |
| **living-requirements** | Living PRODUCT requirements that evolve with code (`features/`) | LOW |
| **brainstorming** | Turn ideas into designs via dialogue (`docs/plans/`) | MEDIUM |
| **cek-software-architecture** | Code quality principles (Clean Architecture, DDD) | LOW |

**Detailed Comparison**:

| Aspect | taches-create-plans | living-requirements | brainstorming |
|--------|---------------------|---------------------|---------------|
| **Focus** | Project execution plans | Product requirements tracking | Design exploration |
| **Storage** | `.planning/` folder | `features/` folder | `docs/plans/` folder |
| **Lifecycle** | Plan → Execute → Summary | Evolves with code changes | One-time design doc |
| **Structure** | BRIEF → ROADMAP → PLAN → SUMMARY | Cascading CLAUDE.md files | Design document |
| **When Used** | "Plan this project" | "Track requirements" | "Help me design this" |

**The Relationships**:

1. **taches-create-plans** = **Execution Planning** (solo dev workflow)
   - Creates PLAN.md files that ARE the prompts
   - Hierarchical: BRIEF → ROADMAP → PLAN → SUMMARY
   - Focus: "What tasks does Claude execute?"

2. **living-requirements** = **Requirements Tracking** (documentation)
   - Uses CLAUDE.md files in `features/` for cascading context
   - Auto-updates via hooks after code changes
   - Focus: "What was built vs what was planned?"

3. **brainstorming** = **Design Exploration** (ideation)
   - Collaborative dialogue to refine ideas
   - Produces one-time design documents
   - Focus: "What should we build?"

4. **cek-software-architecture** = **Code Quality** (principles)
   - Clean Architecture / DDD guidance
   - No file outputs - just coding guidance
   - Focus: "How should code be structured?"

**Typical Workflow**:
1. **brainstorming** → Explore idea, produce design doc
2. **taches-create-plans** → Create execution plan from design
3. **living-requirements** → Track what's built vs planned
4. **cek-software-architecture** → Apply during implementation

**Decision**: All **KEEP** - they serve different stages of the development lifecycle.

---

#### CEK `/cek-02-plan` (Command) vs taches `taches-create-plans` (Skill)

| Aspect | CEK `/cek-02-plan` | taches `taches-create-plans` |
|--------|-------------------|------------------------------|
| **Type** | Command (`.md` file) | Skill (folder with SKILL.md) |
| **Storage** | `specs/FEATURE_NAME/plan.md` | `.planning/` folder |
| **Process** | 6 stages with agents | BRIEF → ROADMAP → PLAN → SUMMARY |
| **Agents** | researcher, code-explorer, software-architect | Domain expertise loading |
| **Focus** | SDD (Spec-Driven Development) | Solo agentic development |
| **Clarification** | Stage 3: Clarifying Questions (critical gate) | User gates at specific points |
| **Architecture** | 2-3 parallel architect agents with different focuses | Single plan document |
| **Output** | plan.md, design.md, data-model.md, contract.md | PLAN.md IS the prompt |

**Key Differences**:

1. **CEK `/cek-02-plan`** = **Team/Enterprise-style planning**
   - Multi-agent exploration (researcher, code-explorer, software-architect)
   - Multiple design approaches evaluated in parallel
   - Detailed artifacts (data models, API contracts)
   - Part of 6-stage workflow (00-setup → 05-document)
   - Heavy process with gates

2. **taches `taches-create-plans`** = **Solo dev planning**
   - "Plans are prompts" - PLAN.md executes directly
   - Scope control (quality degrades at 40-50% context)
   - Deviation rules built-in
   - Lighter weight, faster iteration
   - Domain expertise loading

**Overlap Assessment**: **HIGH** - Both are planning systems, but with different philosophies:
- CEK: More ceremony, more artifacts, team-oriented
- taches: Leaner, "plan = prompt", solo-oriented

**Decision**: Both **KEEP** for now. Deeper analysis in Phase 5 when building `/build` to decide which patterns to incorporate.

---

#### GSD (Get-Shit-Done) Pattern Analysis

GSD was documented in research.md as a **pattern**, not an installed skill.

| Aspect | GSD Pattern | taches-create-plans |
|--------|-------------|---------------------|
| **Origin** | External pattern (documented in research) | Installed skill |
| **Files** | PROJECT.md, ROADMAP.md, STATE.md | BRIEF.md, ROADMAP.md, PLAN.md, SUMMARY.md |
| **Key Concept** | Fresh context via subagents (200k tokens per task) | "Plans are prompts" + scope control |
| **Execution** | Subagent per task | `/run-plan` command |

**Research Decision** (from research.md):
> Cherry-pick fresh context approach and atomic commits, skip full file structure complexity.

**What This Means**: GSD's best ideas were already incorporated into taches-create-plans:
- Fresh context principle → Subagent execution in taches
- Atomic commits → Per-task commits in taches
- Scope control → Quality degradation awareness in taches

**GSD is not a competing skill** - it was a pattern that informed the design of taches-create-plans.

---

### Subagent Skills Comparison

#### taches-create-subagents vs cek-subagent-driven-development

Both deal with subagents but need deeper analysis in Phase 5. Marked as **KEEP** pending that analysis.

---

## Strategic Decision: Phase 5 Analysis

The following skills are marked **KEEP** with deeper analysis deferred to Phase 5 when building `/build` command:

| Skill | Reason for Deferral |
|-------|---------------------|
| taches-create-plans | Core planning - need to decide which patterns to use |
| living-requirements | Requirements tracking - may integrate with `/start` |
| brainstorming | Design exploration - may integrate with `/design` |
| cek-software-architecture | Code principles - applies during implementation |
| taches-create-meta-prompts | Prompt pipelines - may be used in workflow |
| cek-prompt-engineering | Prompt theory - reference material |
| cek-subagent-driven-development | Subagent patterns - `/build` may use |
| taches-create-subagents | Subagent creation - `/build` may use |

**Rationale**: These skills represent the core patterns that will inform `/build` command design. Rather than making premature decisions about merging or restructuring, we keep them available for detailed analysis when implementing the execution phase of My Workflow.

---

## Detailed Analysis: Slash Command Creation

### Slash Command Creation Family (4 items reviewed)

| Item | Type | Purpose | Key Features |
|------|------|---------|--------------|
| **taches-create-slash-commands** | SKILL | Comprehensive guidance for creating slash commands | XML structure, YAML frontmatter, dynamic context, tool restrictions, arguments, 3 reference files |
| **cek-create-command** | COMMAND | Interactive wizard for creating commands | Project-specific, MCP tool integration (Scopecraft), interview process |
| **create-slash-command** | COMMAND | Thin wrapper | Just invokes `taches-create-slash-commands` skill |
| **audit-slash-command** | COMMAND | Audit existing commands | Invokes slash-command-auditor subagent |

### taches-create-slash-commands vs cek-create-command

| Aspect | taches-create-slash-commands | cek-create-command |
|--------|------------------------------|-------------------|
| **Type** | Skill (always available when loaded) | Command (invoked with `/cek-create-command`) |
| **Focus** | Universal Claude Code commands | Scopecraft-specific commands |
| **Structure** | XML tags (`<objective>`, `<process>`, `<success_criteria>`) | Project-specific patterns (`<task>`, `<context>`) |
| **MCP Tools** | Not mentioned (generic) | Scopecraft MCP tools (`mcp__scopecraft-cmd__*`) |
| **References** | 3 reference files: patterns.md, arguments.md, tool-restrictions.md | References project docs (@/docs/) |
| **Approach** | Complete standalone guidance | Interactive interview process (5 phases) |
| **Frontmatter** | `description`, `argument-hint`, `allowed-tools` | `description`, `argument-hint` |
| **Location** | `~/.claude/skills/` or `.claude/skills/` | `~/.claude/commands/` or `.claude/commands/` |

**Key Distinction**:
- **taches-create-slash-commands** = **Universal slash command guidance** - Works for any Claude Code project, teaches XML structure and best practices
- **cek-create-command** = **Scopecraft-specific wizard** - Designed for Scopecraft workflow, uses MCP tools, references project documentation

### Redundancy Analysis

1. **create-slash-command** command is a **wrapper for taches skill**:
   ```markdown
   ---
   description: Create a new slash command following best practices and patterns
   allowed-tools: Skill(create-slash-commands)
   ---
   Invoke the create-slash-commands skill for: $ARGUMENTS
   ```
   This invokes the taches skill. **Value**: Provides discoverability via `/help` and direct invocation path.
   **Action**: Rename to `taches-create-slash-command` to align with the family it invokes.

2. **audit-slash-command** is **complementary** (not overlapping):
   - Creates vs Audits - different lifecycle stage
   - Invokes `slash-command-auditor` subagent
   - Useful for validating commands after creation

3. **cek-create-command** has **valuable generic patterns**:
   - References Scopecraft MCP tools (not installed)
   - BUT contains valuable patterns:
     - 5-phase interview process for gathering requirements
     - Command categories: Planning, Implementation, Analysis, Workflow, Utility
   - **Action**: Keep for the patterns, ignore Scopecraft-specific references

### Decision

| Item | Action | Reason |
|------|--------|--------|
| **taches-create-slash-commands** | **KEEP** | Comprehensive universal guidance with 3 reference files |
| **cek-create-command** | **KEEP** | Valuable patterns: interview process, command categories (Planning, Implementation, Analysis, Workflow, Utility) |
| **create-slash-command** | **RENAME → taches-create-slash-command** | Aligns naming with the taches skill family it invokes |
| **audit-slash-command** | **KEEP** | Complementary utility (audit vs create) |

### When to Use Each

| Scenario | Use This |
|----------|----------|
| "Create a new slash command" | `/taches-create-slash-command` (invokes skill) or reference skill directly |
| "Audit an existing command" | `/audit-slash-command` command |
| "Understand command categories" | **cek-create-command** (Planning, Implementation, Analysis, Workflow, Utility) |
| "Learn command patterns" | Reference: `~/.claude/skills/taches-create-slash-commands/references/` |
| "See argument handling examples" | Reference: `references/arguments.md` |
| "Understand tool restrictions" | Reference: `references/tool-restrictions.md` |

### Naming Convention Insight

**Principle Established**: Commands that exist solely to invoke a specific skill family should be named with that family's prefix.

- `create-slash-command` → `taches-create-slash-command`

This makes it immediately clear:

1. What family the command belongs to
2. That it invokes a taches skill
3. The relationship between command and skill

### Slash Command Changes to Apply

- [ ] RENAME: `~/.claude/commands/create-slash-command.md` → `~/.claude/commands/taches-create-slash-command.md`
- [ ] UPDATE: Frontmatter in renamed file if needed

---

## Detailed Analysis: Debugging Skills

### Debugging Family (5 items reviewed)

| Item | Type | Purpose | Key Features |
|------|------|---------|--------------|
| **taches-debug-like-expert** | SKILL | Deep analysis debugging with scientific method | 310 lines + 5 reference files, domain expertise loading, hypothesis testing, verification patterns, cognitive bias awareness |
| **debug.md** | COMMAND | Systematic debugging workflow | 196 lines, hypothesis ranking, git bisect, rubber duck, minimal reproduction, common bug patterns list |
| **cek-fix-tests.md** | COMMAND | Fix failing tests after logic changes | Parallel developer agents, test-focused orchestration (not general debugging) |
| **ERROR_CATALOG.md** | SKILL FILE | n8n validation errors catalog | n8n-specific, comprehensive error types with examples and fixes |
| **ERROR_PATTERNS.md** | SKILL FILE | n8n Python Code node errors | n8n-specific, top 5 Python Code node failures |

### taches-debug-like-expert (Skill)

**Location**: `~/.claude/skills/taches-debug-like-expert/`

**Key Features**:
- **Domain Expertise Loading**: Scans `~/.claude/skills/expertise/` for domain-specific debugging knowledge
- **Domain Inference**: Auto-detects project type (Python, Rust, Swift, Go, etc.) and offers to load relevant expertise
- **Cognitive Bias Awareness**: "Treat code you wrote with MORE skepticism" - addresses blind spots
- **Scientific Method**: Evidence → Hypotheses → Testing → Verification
- **5 Reference Files**:
  - `debugging-mindset.md` - First principles, cognitive biases
  - `investigation-techniques.md` - Binary search, rubber duck, minimal reproduction
  - `hypothesis-testing.md` - Forming falsifiable hypotheses, experiment design
  - `verification-patterns.md` - Definition of "verified", regression testing
  - `when-to-research.md` - When to search vs reason

**Structure**: XML tags (`<objective>`, `<context_scan>`, `<domain_expertise>`, `<quick_start>`, `<critical_rules>`, `<success_criteria>`)

**Output Format**:
```
## Issue: [Problem Description]
### Evidence
### Investigation
### Root Cause
### Solution
### Verification
```

### debug.md (Command)

**Location**: `~/.claude/commands/debug.md`

**Key Features**:
- **Interactive Mode**: Structured questions if no issue provided
- **Practical Techniques Inline**:
  - Git bisect for "it was working before"
  - Console/logging patterns
  - Rubber duck methodology
  - Minimal reproduction steps
- **Common Bug Patterns**: Race conditions, null/undefined, state management, off-by-one, type coercion
- **Hypothesis Ranking**: Most likely → Less likely with evidence

**Output Format**: Debug Report with similar structure to taches

### Comparison: taches-debug-like-expert vs debug.md

| Aspect | taches-debug-like-expert | debug.md |
|--------|--------------------------|----------|
| **Type** | Skill (always loaded) | Command (invoked with `/debug`) |
| **Depth** | Deep - modular references | Medium - self-contained |
| **Domain Awareness** | Yes - expertise loading system | No |
| **Philosophy** | Scientific rigor, bias awareness | Practical workflow |
| **Unique Value** | Domain inference, 5 reference docs | Git bisect inline, bug patterns list |

**Overlap**: HIGH - Both provide systematic debugging with hypothesis testing

### cek-fix-tests.md (Command)

**Location**: `~/.claude/commands/cek-fix-tests.md`

**Key Features**:
- **Purpose**: Fix failing tests AFTER business logic changes (not general debugging)
- **Approach**: Orchestrates parallel `developer` agents per failing test file
- **Constraint**: "Fix tests, not business logic" - preserves test intent
- **Workflow**: Discover → Verify single test → Launch parallel agents → Verify all

**NOT a debugging skill** - it's a test maintenance orchestrator.

### n8n Error Files

**ERROR_CATALOG.md** (17KB):
- Comprehensive n8n validation error types
- Priority/severity matrix
- Real examples with broken → fixed configurations
- Error types: missing_required, invalid_value, type_mismatch, invalid_expression, invalid_reference, operator_structure

**ERROR_PATTERNS.md** (14KB):
- Top 5 Python Code node errors
- ModuleNotFoundError (most critical - external libs not available)
- Empty Code / Missing Return
- KeyError, IndexError
- Incorrect Return Format

**These are n8n-specific reference files, not general debugging skills.**

### Decision

| Item | Action | Reason |
|------|--------|--------|
| **taches-debug-like-expert** | **KEEP + MERGE** | Base skill - add debug.md's inline techniques |
| **debug.md** | **MERGE → taches-debug-like-expert** | Valuable techniques (git bisect, bug patterns) enhance the skill |
| **cek-fix-tests.md** | **KEEP** | Different purpose - test maintenance, not debugging |
| **ERROR_CATALOG.md** | **KEEP** | n8n-specific, crucial for n8n workflows |
| **ERROR_PATTERNS.md** | **KEEP** | n8n-specific, crucial for n8n workflows |

### Merge Plan: debug.md → taches-debug-like-expert

**What to add to taches-debug-like-expert**:

1. **Git Bisect** (from debug.md):
   ```bash
   git bisect start
   git bisect bad HEAD
   git bisect good [known-good-commit]
   ```

2. **Common Bug Patterns** (from debug.md):
   - Race Conditions
   - Null/Undefined
   - State Management
   - Off-by-One
   - Type Coercion

3. **Interactive Mode** (from debug.md):
   - Structured questions when no issue provided

**After merge**: Delete debug.md command (functionality absorbed into skill)

### When to Use Each

| Scenario | Use This |
|----------|----------|
| "Debug a complex issue" | **taches-debug-like-expert** skill (comprehensive) |
| "Fix failing tests after refactor" | `/cek-fix-tests` command |
| "n8n validation errors" | Reference: `ERROR_CATALOG.md` |
| "n8n Python Code node errors" | Reference: `ERROR_PATTERNS.md` |

### Debugging Changes to Apply

- [ ] MERGE: Add git bisect, bug patterns, interactive mode from debug.md to taches-debug-like-expert
- [ ] DELETE: `~/.claude/commands/debug.md` (after merge)
- [ ] KEEP: `cek-fix-tests.md` (different purpose)
- [ ] KEEP: `ERROR_CATALOG.md` and `ERROR_PATTERNS.md` (n8n-specific)

---

## Detailed Analysis: cek-kaizen Code Principles Ecosystem

### Overview

The cek-kaizen ecosystem is a **code principles system** that guides how Claude writes code. It consists of:
- **1 core skill** (cek-kaizen) - "Always-on" philosophy principles
- **3+ companion commands** - Actionable tools for specific analysis methods

### cek-kaizen (Skill) - Code Writing Principles

**Location**: `~/.claude/skills/cek-kaizen/SKILL.md`

**What it is**: Japanese term "Kaizen" means "continuous improvement" - a philosophy from lean manufacturing (Toyota Production System). This skill codifies these principles as **rules for how Claude writes code**.

**The Four Pillars**:

| Pillar | Principle | In Code |
|--------|-----------|---------|
| **Kaizen** (Continuous Improvement) | Small, frequent improvements compound | Iterate: work → clear → efficient. One change at a time. |
| **Poka-Yoke** (Error Proofing) | Design prevents errors | Use types to make invalid states unrepresentable. Validate at boundaries. |
| **Standardized Work** | Follow proven patterns | Consistency over cleverness. Match existing codebase patterns. |
| **Just-In-Time** (JIT) | Build only what's needed | YAGNI. Rule of Three before abstracting. No speculative code. |

**Key Guidance**:
- First version: make it work
- Second pass: make it clear
- Third pass: make it efficient
- Don't try all three at once

**This skill is NOT directly invoked** - it's an "always-on" philosophy that guides all code writing.

### Companion Commands

These are the **actionable tools** that apply Kaizen principles to specific problems:

#### `/cek-why` - Five Whys Root Cause Analysis

**Location**: `~/.claude/commands/cek-why.md` (100 lines)

**Purpose**: Iteratively ask "why" to drill from symptoms to root causes.

**Method**:
1. State the problem
2. Ask "Why did this happen?"
3. Repeat 5 times (or until root cause reached)
4. Validate by working backwards

**Example**:
```
Problem: Users see 500 error on checkout
Why 1: Payment service throws exception
Why 2: Request timeout after 30 seconds
Why 3: Database query takes 45 seconds
Why 4: Missing index on transactions table
Why 5: Index creation wasn't in migration scripts
Root Cause: Migration review process doesn't check query performance
```

**Key Insight**: If "human error" appears, keep digging - why was the error possible?

#### `/cek-cause-and-effect` - Fishbone Analysis

**Location**: `~/.claude/commands/cek-cause-and-effect.md` (198 lines)

**Purpose**: Systematically explore causes across six categories (Ishikawa/Fishbone diagram).

**Six Categories**:
- **People**: Skills, training, communication
- **Process**: Workflows, procedures, reviews
- **Technology**: Tools, infrastructure, dependencies
- **Environment**: Workspace, deployment, external factors
- **Methods**: Approaches, patterns, architectures
- **Materials**: Data, dependencies, third-party services

**When to Use**: When problem has multiple contributing factors across domains.

**Example**: API Response Latency analysis explores causes in each category, then prioritizes solutions by impact × feasibility ÷ effort.

#### `/cek-plan-do-check-act` - PDCA Improvement Cycle

**Location**: `~/.claude/commands/cek-plan-do-check-act.md` (256 lines)

**Purpose**: Iterative problem-solving through measured experiments.

**Four Phases**:
1. **PLAN**: Define problem → baseline metrics → hypothesis → success criteria
2. **DO**: Implement change (small scale) → document → collect data
3. **CHECK**: Measure results vs criteria → analyze if hypothesis held
4. **ACT**: Standardize if successful, adjust and retry if not

**When to Use**: When you want to systematically improve a process with measurable outcomes.

**Example**: Build time reduction (45min → 4.5min over 2 PDCA cycles)

### How They Work Together

```
cek-kaizen (always-on principles)
    │
    ├── /cek-why           → "What's the root cause?"
    ├── /cek-cause-and-effect → "What factors contribute?"
    └── /cek-plan-do-check-act → "How do we systematically improve?"
```

- **cek-kaizen** guides daily code writing
- **Commands** are invoked for specific problem-solving

### Decision

| Item | Action | Notes |
|------|--------|-------|
| **cek-kaizen** | **KEEP** | Core code principles - "always-on" philosophy for how Claude writes code |
| **cek-why** | **KEEP** | Five Whys root cause analysis - drilling to systemic issues |
| **cek-cause-and-effect** | **KEEP** | Fishbone/Ishikawa multi-factor analysis |
| **cek-plan-do-check-act** | **KEEP** | PDCA iterative improvement cycle |

### Usage Guide

| Scenario | Use This |
|----------|----------|
| "How should Claude write code?" | **cek-kaizen** principles (always applied) |
| "Why did this bug happen?" | `/cek-why` - drill to root cause |
| "Multiple things seem to be wrong" | `/cek-cause-and-effect` - systematic multi-factor analysis |
| "I want to improve build time/bugs/etc" | `/cek-plan-do-check-act` - measured improvement cycle |

### cek-kaizen Ecosystem Changes to Apply

- [ ] KEEP: `~/.claude/skills/cek-kaizen/SKILL.md` (code principles)
- [ ] KEEP: `~/.claude/commands/cek-why.md` (Five Whys)
- [ ] KEEP: `~/.claude/commands/cek-cause-and-effect.md` (Fishbone)
- [ ] KEEP: `~/.claude/commands/cek-plan-do-check-act.md` (PDCA)

---

## Detailed Analysis: cek-test-driven-development

**Location**: `~/.claude/skills/cek-test-driven-development/SKILL.md` (699 lines)

### Overview

This is the second "always-on" code principles skill (alongside cek-kaizen). It provides strict TDD discipline that Claude applies when writing code.

**Key Differentiator**: Unlike typical TDD guides, this skill is unusually strict - it treats any deviation as a violation requiring immediate correction.

### Part 1: TDD Core (Lines 1-382)

#### The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

- Write code before test? **Delete it. Start over.**
- No keeping as "reference" or "adapting" it
- Delete means delete

#### Red-Green-Refactor Cycle

```
RED → Verify RED → GREEN → Verify GREEN → REFACTOR → Repeat
```

1. **RED**: Write one minimal failing test
   - One behavior
   - Clear name
   - Real code (no mocks unless unavoidable)

2. **Verify RED** (MANDATORY):
   - Run test, confirm it fails
   - Fails for expected reason (feature missing, not typo)
   - Test passes? Fix test - you're testing existing behavior

3. **GREEN**: Write minimal code to pass
   - Just enough to pass
   - No extra features, refactoring, or "improvements"

4. **Verify GREEN** (MANDATORY):
   - Test passes
   - Other tests still pass
   - Output pristine (no errors/warnings)

5. **REFACTOR**: Clean up after green only
   - Remove duplication
   - Improve names
   - Keep tests green

#### Common Rationalizations (All Rejected)

| Excuse | Reality |
|--------|---------|
| "Too simple to test" | Simple code breaks. Test takes 30 seconds. |
| "I'll test after" | Tests passing immediately prove nothing. |
| "Deleting X hours is wasteful" | Sunk cost fallacy. Keeping unverified code is technical debt. |
| "TDD will slow me down" | TDD faster than debugging. |
| "Manual test faster" | Manual doesn't prove edge cases. |

#### Red Flags - STOP and Start Over

- Code before test
- Test passes immediately
- "I already manually tested it"
- "Just this once"
- "This is different because..."

### Part 2: Testing Anti-Patterns (Lines 385-699)

**Core principle**: Test what the code does, not what the mocks do.

#### The Three Iron Laws

```
1. NEVER test mock behavior
2. NEVER add test-only methods to production classes
3. NEVER mock without understanding dependencies
```

#### Anti-Pattern 1: Testing Mock Behavior

**Bad**: Asserting on mock elements (e.g., `expect(screen.getByTestId('sidebar-mock'))`)
**Fix**: Test real component or don't mock it

#### Anti-Pattern 2: Test-Only Methods in Production

**Bad**: Adding `destroy()` method only used by tests
**Fix**: Put cleanup logic in test utilities, not production classes

#### Anti-Pattern 3: Mocking Without Understanding

**Bad**: Over-mocking "to be safe" → breaks actual behavior test depends on
**Fix**:
1. Understand what side effects the real method has
2. Check if test depends on those side effects
3. Mock at the correct level (the slow/external operation, not high-level method)

#### Anti-Pattern 4: Incomplete Mocks

**Bad**: Partial mock missing fields downstream code uses
**Fix**: Mirror real API completeness - include ALL fields

#### Anti-Pattern 5: Integration Tests as Afterthought

**Bad**: "Implementation complete ✅ No tests ❌ Ready for testing"
**Fix**: Testing is part of implementation, not optional follow-up

### Why This Skill Matters

1. **Strict Discipline**: Rejects all common rationalizations developers use to skip TDD
2. **Verification Requirements**: Both RED and GREEN phases have mandatory verification
3. **Anti-Pattern Coverage**: Addresses the subtle ways tests can be misleading
4. **Clear Rules**: No ambiguity - if you violate the rules, delete and start over

### Relationship to cek-kaizen

| Skill | Focus | When Applied |
|-------|-------|--------------|
| **cek-kaizen** | How to write code (small improvements, error-proofing, patterns) | Always |
| **cek-test-driven-development** | How to verify code (test-first, strict cycle, no mocks of mocks) | Always (when writing testable code) |

Together they form a complete discipline:
- cek-kaizen: The **philosophy** of writing good code
- cek-test-driven-development: The **process** of verifying code correctness

### Decision

| Item | Action | Notes |
|------|--------|-------|
| **cek-test-driven-development** | **KEEP** | Core testing principles - strict TDD discipline with anti-patterns |

### Changes to Apply

- [ ] KEEP: `~/.claude/skills/cek-test-driven-development/SKILL.md`

---

## Meta-Skill Consolidation (2026-01-14)

### Rationale

Multiple skills covering the same domain create conflicting guidance and maintenance burden. Consolidating into meta-skills provides:
- Single source of truth per domain
- No conflicting instructions
- Easier maintenance
- Clear organization

### Completed Consolidations

| Meta-Skill | Source Skills | Location | Status |
|------------|---------------|----------|--------|
| `diagrams` | architecture-diagrams, diagram-strategist, discover-diagrams, drawio-diagrams-enhanced, mermaid-diagram, plantuml, visualizing-with-mermaid | `~/.claude/skills/diagrams/` | DONE |
| `skill-creation` | skill-catalog, skill-builder, skill-share-slack | `~/.claude/skills/skill-creation/` | DONE |
| `subagent-design` | taches-create-subagents (renamed) | `~/.claude/skills/subagent-design/` | DONE |
| `quality-practices` | cek-kaizen | `~/.claude/skills/quality-practices/` | DONE |
| `software-development-practices` | cek-software-architecture, cek-test-driven-development, cek-subagent-driven-development | `~/.claude/skills/software-development-practices/` | DONE |
| `prompt-engineering` | cek-prompt-engineering, taches-create-meta-prompts | `~/.claude/skills/prompt-engineering/` | DONE |
| `debugging-practices` | taches-debug-like-expert | `~/.claude/skills/debugging-practices/` | DONE |
| `slash-command-builder` | taches-create-slash-commands | `~/.claude/skills/slash-command-builder/` | DONE |

**Note**: Original skills moved to `ref/` subdirectory within each meta-skill folder for reference.

### Companion Commands (Kept Separate)

The following commands remain as standalone invokable commands (not absorbed into meta-skills):

| Command | Related Meta-Skill | Purpose |
|---------|-------------------|---------|
| `/cek-why` | quality-practices | Five Whys root cause analysis |
| `/cek-cause-and-effect` | quality-practices | Fishbone/Ishikawa diagram analysis |
| `/cek-plan-do-check-act` | quality-practices | PDCA iterative improvement cycle |

**Rationale**: These commands are actionable tools that apply quality-practices principles. They remain invokable via `/command` for explicit use, while the quality-practices skill provides the underlying philosophy.

### Keep Separate (No Consolidation)

| Skill | Reason |
|-------|--------|
| `hook-builder` | Already consolidated from 2 sources |
| `subagent-design` | User-facing (authoring agent configs) vs Claude-facing (execution patterns) |
| `quality-practices` companion commands | Actionable tools (cek-why, cek-cause-and-effect, cek-plan-do-check-act) kept as invokable commands |
| Planning skills (taches-create-plans, living-requirements, brainstorming) | Deferred to planning phase |

### Decision Log

1. **Kaizen → quality-practices**: User prefers clearer English name over Japanese term
2. **development-workflows → software-development-practices**: Avoids confusion with n8n workflows
3. **subagent-design separate from software-development-practices**: Different domain (Claude config vs coding practices)
4. **prompt-engineering separate from software-development-practices**: Distinct skill applicable beyond software dev
5. **Companion commands kept separate**: cek-why, cek-cause-and-effect, cek-plan-do-check-act remain as invokable commands (not absorbed) because they are actionable tools, not philosophy
6. **All consolidations completed (2026-01-14)**: 8 meta-skills now serve as single sources of truth for their domains

---

## T003 Command Curation (2026-01-15)

### Summary

Reviewed 69+ commands across 7 categories. Fixed 6 broken wrapper commands, moved 7 commands to reference, renamed 8 commands for clarity.

### Commands Kept Active (62 commands)

**Core Workflow (10)**: init, plan, execute, status, stop, debug, commit, pr, review, test

**CEK Pipeline (6)**: cek-00-setup, cek-01-specify, cek-02-plan, cek-03-tasks, cek-04-implement, cek-05-document

**CEK Analysis (4)**: cek-analyse, cek-analyse-problem, cek-analyze-issue, cek-root-cause-tracing

**CEK Quality (5)**: cek-why, cek-cause-and-effect, cek-plan-do-check-act, cek-reflect, cek-critique

**CEK Creation (8)**: cek-brainstorm, cek-create-ideas, cek-create-skill, cek-create-command, cek-create-hook, cek-create-pr, cek-commit, cek-build-mcp

**CEK Testing/Review (7)**: cek-test-skill, cek-test-prompt, cek-fix-tests, cek-write-tests, cek-review-pr, cek-review-local-changes, cek-attach-review-to-pr

**CEK Setup (6)**: cek-setup-arxiv-mcp, cek-setup-codemap-cli, cek-setup-context7-mcp, cek-setup-serena-mcp, cek-setup-code-formating, cek-add-typescript-best-practices

**CEK Other (2)**: cek-memorize, cek-apply-anthropic-skill-best-practices

**Creation Wrappers (7)**: create-agent-skill, create-hook, create-meta-prompt, create-plan, create-prompt, create-slash-command, create-subagent

**Utilities (9)**: add-to-todos, check-todos, analyse, run-prompt, handoff (was whats-next), heal-skill, audit-skill, audit-slash-command, audit-subagent

**Consider Folder (5)**: first-principles, inversion, simplest-explanation (was occams-razor), priority-one (was one-thing), option-cost (was opportunity-cost), vital-few (was pareto), consequences (was second-order), strengths-weaknesses (was swot), simplify-by-removing (was via-negativa)

### Commands Moved to Reference (7)

| Command | Reason |
|---------|--------|
| `execute-plan.md` | Redundant stub - execute.md has full implementation |
| `cek-load-issues.md` | Specialized GitHub import - rarely used |
| `run-plan.md` | Overlaps with execute.md |
| `write-plan.md` | Broken - references non-existent skill |
| `consider/10-10-10.md` | Rarely used time-horizon framework |
| `consider/5-whys.md` | Overlaps with cek-why |
| `consider/eisenhower-matrix.md` | Rarely used prioritization matrix |

### Commands Renamed (10)

| Original | New Name | Reason |
|----------|----------|--------|
| `whats-next.md` | `handoff.md` | Clearer purpose |
| `consider/first-principles.md` | `consider/challenge-assumptions.md` | Describes the action |
| `consider/inversion.md` | `consider/failure-backwards.md` | Clearer: think backwards from failure |
| `consider/occams-razor.md` | `consider/simplest-explanation.md` | Clearer action |
| `consider/one-thing.md` | `consider/priority-one.md` | Clearer outcome |
| `consider/opportunity-cost.md` | `consider/option-cost.md` | Simpler |
| `consider/pareto.md` | `consider/vital-few.md` | Describes what it finds |
| `consider/second-order.md` | `consider/consequences.md` | Clearer purpose |
| `consider/swot.md` | `consider/strengths-weaknesses.md` | More descriptive |
| `consider/via-negativa.md` | `consider/simplify-by-removing.md` | Clearer action |

### Commands Fixed (6)

Updated wrapper commands to use correct skill names after consolidation:

| Command | Old Reference | New Reference |
|---------|---------------|---------------|
| `create-agent-skill.md` | create-agent-skills | skill-creation |
| `create-hook.md` | create-hooks | hook-builder |
| `create-meta-prompt.md` | create-meta-prompts | prompt-engineering |
| `create-plan.md` | create-plans | taches-create-plans |
| `create-slash-command.md` | create-slash-commands | slash-command-builder |
| `create-subagent.md` | create-subagents | subagent-design |

### Consider Folder Commands - Detailed Use Cases

**Final Consider Folder (9 commands)**:

| Command | Use Case | When to Use |
|---------|----------|-------------|
| `challenge-assumptions` | Break down assumptions, rebuild from fundamentals | Hard problems, challenging conventions |
| `failure-backwards` | Ask "what would guarantee failure?" | Risk identification, avoiding pitfalls |
| `simplest-explanation` | Find explanation with fewest assumptions | Debugging, choosing between approaches |
| `priority-one` | Find single highest-leverage action | Decision paralysis, focus needed |
| `option-cost` | Analyze hidden costs of choices | Build vs buy, resource allocation |
| `vital-few` | Find 20% that drives 80% of results | Optimization, prioritization |
| `consequences` | Think through consequences of consequences | Preventing unintended effects |
| `strengths-weaknesses` | Map internal/external factors | Strategic planning |
| `simplify-by-removing` | Improve by subtraction, not addition | Cleanup, simplification |

---

## T004 Plugin Curation (2026-01-15)

### Summary

Reviewed 3 plugins from the official Anthropic marketplace. Extracted Notion plugin content before removal to avoid plugin update overwrites.

### Plugins Kept Active (2)

| Plugin | Version | Purpose |
|--------|---------|---------|
| **kotlin-lsp** | 1.0.0 | Kotlin language server for code intelligence (.kt, .kts files) |
| **ralph-loop** | ee2f72662645 | Iterative AI development loops (Ralph Wiggum technique) |

### Notion Plugin → Extracted & Removed

**Rationale**: Plugin content can be overwritten by plugin updates. Extracted all useful content to personal folders for full control.

**Skills Copied** (4) to `~/.claude/skills/`:
- `notion-research-docs` - Search Notion, synthesize findings, create documentation
- `notion-knowledge-capture` - Transform conversations into structured Notion docs
- `notion-meeting-intelligence` - Pre-meeting prep (pre-read + agenda)
- `notion-spec-to-implementation` - Turn specs into implementation plans with tasks

**Commands Copied** (10) to `~/.claude/commands/`:
- From plugin: `/notion-search`, `/notion-create-page`, `/notion-create-task`, `/notion-database-query`, `/notion-find`, `/notion-create-database-row`
- Skill wrappers: `/notion-research-docs`, `/notion-knowledge-capture`, `/notion-meeting-intelligence`, `/notion-spec-to-implementation`

**MCP Configuration**: Added standalone official Notion MCP (`https://mcp.notion.com/mcp`) to `~/.claude.json` - required for copied skills/commands.

### Notion Integration Architecture (Post-Curation)

| Component | Source | Purpose |
|-----------|--------|---------|
| **notion-workspace MCP** | Custom project | PARA+ database operations |
| **notion MCP** | Official (standalone) | General Notion API for skills/commands |
| **4 Notion skills** | Extracted from plugin | Research, knowledge, meetings, specs |
| **10 Notion commands** | Extracted from plugin | `/notion-*` actions |

### Plugin Details

#### kotlin-lsp Plugin (v1.0.0)
- **Purpose**: Kotlin code intelligence, refactoring, analysis
- **Requires**: `brew install JetBrains/utils/kotlin-lsp`
- **File types**: `.kt`, `.kts`

#### ralph-loop Plugin
- **Purpose**: Implements iterative AI development loops using a Stop hook
- **Commands**: `/ralph-loop "<prompt>" --max-iterations N --completion-promise "DONE"`, `/cancel-ralph`
- **Use case**: Well-defined tasks requiring autonomous iteration until completion
