# Feature Specification: My Workflow System

**Feature Branch**: `001-my-workflow`
**Created**: 2026-01-09
**Status**: Draft
**Input**: Create a personalized workflow system by curating existing skills (cek, taches, living-requirements) into a reference library, then building custom workflow commands that fit how I actually work. Incorporate ideas from get-shit-done, cek, taches, and cascading context.

## Vision

I have many installed skills and commands (cek-*, taches-*, living-requirements, etc.) that I either don't use or don't fully understand. Rather than deleting them, I want to:

1. **Archive them as reference material** - Move unused skills to a `reference/` folder where I can learn from them without them cluttering my active workflow
2. **Build MY workflow** - Create a streamlined set of commands that fit how I actually work, inspired by the best patterns from each source
3. **Keep it simple** - Start with what I need NOW, add complexity only when justified

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Curate My Skill Library (Priority: P1)

As a developer with too many installed skills, I want to organize them into "active" and "reference" categories, so that my Claude Code only loads the skills I actually use while keeping the others available for learning.

**Why this priority**: Can't build a clean workflow on top of clutter. Need to understand what I have before creating something new.

**Independent Test**: After running the curation workflow, only my chosen active skills appear in Claude Code's skill list, while reference materials remain accessible in a separate folder.

**Acceptance Scenarios**:

1. **Given** ~/.claude/skills contains 100+ skills, **When** I run `/curate`, **Then** the system lists all skills with brief descriptions and prompts me to categorize each as "keep", "reference", or "remove".

2. **Given** I mark several skills as "reference", **When** the curation completes, **Then** those skills are moved to `~/.claude/reference/skills/` and no longer auto-load, but I can still read them.

3. **Given** I'm unsure about a skill, **When** I select "explain", **Then** the system reads the SKILL.md and summarizes what it does and when it activates.

---

### User Story 2 - Understand the Patterns I'm Building From (Priority: P2)

As someone building a custom workflow, I want to understand the key patterns from GSD, CEK, taches, and cascading context, so that I can cherry-pick the best ideas without adopting entire systems.

**Why this priority**: Need to understand before building. The existing skills are complex - I need a distilled view of what's valuable.

**Independent Test**: A comprehensive pattern analysis exists in the research documentation that I can reference when building the workflow.

**Acceptance Scenarios**:

1. **Given** I need to understand patterns, **When** I read the research documentation, **Then** I find a structured comparison of:
   - **GSD**: Context engineering, subagent execution, atomic tasks, PROJECT/ROADMAP/STATE files
   - **CEK**: Numbered stages (00-05), specification-driven development, business analyst agents
   - **Taches**: Skill/agent/hook creation patterns, expertise loading
   - **Cascading context**: CLAUDE.md hierarchy, features/ structure, living requirements

2. **Given** I want deeper understanding of one pattern, **When** I read the reference skills, **Then** I can understand how it works with examples.

---

### User Story 3 - Create My Core Workflow Commands (Priority: P3)

As a solo developer, I want to create a small set of commands that handle my actual work patterns, so that I have ONE way to do things instead of choosing between 50 similar commands.

**Why this priority**: This is the core value - replacing chaos with clarity. A few well-designed commands beat dozens of unused ones.

**Independent Test**: After creating my workflow, I can complete a typical project using only my custom commands, without needing to remember which cek or taches command to use.

**Acceptance Scenarios**:

1. **Given** I want to start a new project, **When** I run `/start`, **Then** it:
   - Creates project structure with CLAUDE.md (cascading context pattern)
   - Captures my vision/goals (GSD BRIEF pattern)
   - Sets up features/ directory for requirements (living-requirements pattern)

2. **Given** I have a project and want to plan work, **When** I run `/design`, **Then** it:
   - Offers to explore the idea first if requirements are unclear (brainstorming pattern)
   - Uses specification-driven approach (CEK pattern)
   - Creates atomic, executable plans (GSD/taches pattern)
   - Respects context limits (taches scope_control principle)

3. **Given** I have a plan ready, **When** I run `/build`, **Then** it:
   - Executes with fresh subagent context (GSD pattern)
   - Auto-handles deviations (taches deviation_rules)
   - Updates requirements docs after changes (living-requirements pattern)
   - Commits atomically (GSD pattern)

4. **Given** I need to pause work, **When** I run `/stop`, **Then** it:
   - Creates context handoff (GSD/taches pattern)
   - Saves state so I can resume later

---

### User Story 4 - Extend My Workflow Over Time (Priority: P4)

As my needs evolve, I want to easily add new commands or modify existing ones, so that my workflow grows with me instead of becoming stale.

**Why this priority**: The workflow should be living, not frozen. But it's lower priority than getting the basics working.

**Independent Test**: I can add a new command to my workflow without breaking existing ones, and the new command integrates with the same patterns.

**Acceptance Scenarios**:

1. **Given** I want to add a new command, **When** I create a new `.md` file in `commands/`, **Then** it follows the established conventions from existing workflow commands.

2. **Given** I find a useful pattern in my reference skills, **When** I want to incorporate it, **Then** I can copy the relevant section into my active workflow.

---

### Edge Cases

- What happens when moving skills breaks symlinks?
  - The curation process MUST verify symlinks before and after moves, offering to repair any broken links.

- What if I regret moving a skill to reference?
  - The system MUST support `/curate restore <skill-name>` to move it back to active.

- What if my custom commands conflict with existing ones?
  - Commands use direct verbs (`/start`, `/design`, `/build`, `/stop`) chosen to avoid conflicts with existing commands.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a curation workflow to categorize installed skills as active, reference, or remove.

- **FR-002**: System MUST create a `~/.claude/reference/` directory structure that mirrors `~/.claude/skills/` for archived skills.

- **FR-003**: Research documentation MUST include a comprehensive pattern analysis comparing GSD, CEK, taches, and cascading context approaches.

- **FR-004**: System MUST create custom commands with direct verbs (`/start`, `/design`, `/build`, `/stop`) to avoid conflicts.

- **FR-005**: Core workflow commands (`/start`, `/design`, `/build`, `/stop`) MUST integrate the best patterns:
  - Context engineering and handoffs (GSD)
  - Specification-driven development (CEK)
  - Atomic execution with deviation handling (taches)
  - Living requirements with cascading context

- **FR-006**: System MUST support restoring skills from reference back to active.

- **FR-007**: All custom commands MUST follow the skill-first design principle from the constitution.

- **FR-008**: System MUST NOT require me to understand all underlying systems - the workflow abstracts complexity.

### Key Entities

- **Active Skill**: A skill that loads automatically and is part of my daily workflow.

- **Reference Skill**: A skill moved to reference/ for learning purposes, not auto-loaded.

- **Workflow Command**: A custom command (e.g., `/start`, `/design`, `/build`) that orchestrates multiple patterns.

- **Pattern**: A reusable approach extracted from GSD/CEK/taches/cascading-context (e.g., "context handoff", "atomic execution", "living requirements").

### Assumptions

- **ASM-001**: The claude-customizations repository is symlinked to ~/.claude/ (existing setup).

- **ASM-002**: I'm the only user - no need for team features or multi-user considerations.

- **ASM-003**: I prefer fewer, better commands over many specialized ones.

- **ASM-004**: I want to understand the patterns, not just use them blindly.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After curation, my active skills list is reduced by at least 50% while reference materials remain accessible.

- **SC-002**: I can complete a typical project (start → design → build → stop) using only my workflow commands.

- **SC-003**: When I forget how something works, I can find the answer in my reference materials within 2 minutes.

- **SC-004**: My custom commands feel like ONE coherent system, not a patchwork of borrowed parts.

- **SC-005**: Adding a new command to my workflow takes less than 10 minutes.

## Inspiration Sources

### From get-shit-done (GSD)

- Context engineering with PROJECT.md, ROADMAP.md, STATE.md
- Subagent execution with fresh 200k-token contexts
- Atomic git commits per task
- XML-structured task format with verify/done sections

### From CEK (Context Engineering Kit)

- Numbered stages: 00-setup, 01-specify, 02-plan, 03-tasks, 04-implement, 05-document
- Specification-driven development
- Business analyst agent for requirements
- Quality checklists

### From Taches

- Skill/agent/hook creation patterns
- Domain expertise loading
- Scope control (stay within 50% context)
- Deviation rules (auto-fix vs ask user)
- Plans as prompts (PLAN.md IS the execution prompt)

### From Cascading Context (living-requirements)

- CLAUDE.md hierarchy that cascades context
- features/ directory structure
- Requirements that evolve with code
- PostToolUse hook for doc updates

## Resolved Decisions

1. **Reference location**: Subfolder at `~/.claude/reference/` - keeps everything in one place, simpler to manage.

2. **Architecture**: Hybrid approach - a skill (`my-workflow`) containing core principles and workflow definitions, plus thin command wrappers that invoke the skill's workflows.

3. **Core commands**:
   - `/start` - Begin a project (creates OVERVIEW.md, STATE.md, installs hook, offers /map-codebase for brownfield)
   - `/design` - Plan work (offers optional brainstorming for unclear requirements, then spec-driven approach)
   - `/build` - Execute plan (with deviation rules)
   - `/stop` - Pause with handoff (creates HANDOFF.md)

4. **Curation**: Manual cleanup of skills/commands as first step of build phase (not a command - just move files to `~/.claude/reference/`).

5. **Pattern analysis**: Done once during planning phase and documented in research.md, not a regenerating command.

6. **Command naming**: Direct verbs without prefix - short, no conflicts, clear intent.

7. **State management**: Both STATE.md (living, updated by hook) and HANDOFF.md (detailed snapshot on `/stop`).

## Future Improvements

1. **Curation undo/history**: Track curation changes to enable batch undo or "restore to previous state". Currently filesystem-only (no history).

## Open Questions

None - all questions resolved.
