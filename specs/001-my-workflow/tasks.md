# Tasks: My Workflow System

**Feature**: 001-my-workflow
**Input**: Design documents from `/specs/001-my-workflow/`
**Prerequisites**: plan.md, spec.md, research.md

**Implementation Strategy**: Top-to-Bottom (Workflow-First)

- Start with project structure and skill skeleton
- Build workflows that define the complete process
- Then create command wrappers that invoke workflows
- This approach validates the high-level workflow flow early

**Tests**: Not requested in specification - manual verification via Claude Code invocation

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US4)
- Include exact file paths in descriptions

## Path Conventions

- **Skills**: `skills/my-workflow/` (symlinked to `~/.claude/skills/`)
- **Commands**: `commands/` (symlinked to `~/.claude/commands/`)
- **Hooks**: `hooks/` (symlinked to `~/.claude/hooks/`)
- **Reference**: `~/.claude/reference/skills/` and `~/.claude/reference/commands/`

---

## Phase 1: Setup (Manual Curation)

**Purpose**: Clear workspace of unused skills/commands to create clean foundation

**Note**: This phase was completed via meta-skill consolidation documented in `curation-log.md`.

- [x] T001 [US1] Create reference directory structure at `~/.claude/reference/skills/` and `~/.claude/reference/commands/`
- [x] T002 [US1] Review skills with user and move unused to `~/.claude/reference/skills/`
- [ ] T003 [US1] Review commands with user and move unused to `~/.claude/reference/commands/`
- [ ] T004 [US1] Review plugins at `~/.claude/plugins/` with user and document active ones
- [ ] T005 [US1] Verify remaining skills/commands work and reference folder is populated

**Checkpoint**: ✅ Active skills/commands are curated, reference materials accessible, meta-skills consolidated

**Completed Work** (see `curation-log.md` for details):

- 8 meta-skills created: diagrams, skill-creation, subagent-design, quality-practices, software-development-practices, prompt-engineering, debugging-practices, slash-command-builder
- Original skills moved to `ref/` subdirectory within each meta-skill
- Companion commands kept separate (cek-why, cek-cause-and-effect, cek-plan-do-check-act)

**T002 Curation Results** (2025-01-15):

Skills kept active (38 directories):

- Core workflow: my-workflow, brainstorming, living-requirements, taches-create-plans
- Meta-skills: quality-practices, software-development-practices, debugging-practices, prompt-engineering, diagrams-practices
- Claude Code extensions: skill-creation, hook-builder, slash-command-builder, subagent-design, mcp-builder, anthropic
- Domain-specific: n8n, home-assistant-manager, supabase, notebooklm
- Utilities: git-pushing, webapp-testing, document-skills, artifacts-builder, content-research-writer, theme-factory, canvas-design, changelog-generator, web-asset-generator, brand-guidelines, internal-comms, ship-learn-next, file-organizer, meeting-insights-analyzer
- Supporting: examples, references, cross-service, services, scripts

Skills moved to `~/.claude/reference/skills/` (16):

- ios, move-code-quality-skill, youtube-transcript, image-enhancer, slack-gif-creator
- competitive-ads-extractor, developer-growth-analysis, invoice-organizer
- domain-name-brainstormer, lead-research-assistant, raffle-winner-picker, video-downloader
- taches-expertise, claude-hook-builder, skill-creator, taches-create-hooks

Loose files in skills/ kept as-is (reference materials loaded manually)

---

## Phase 2: Foundational (Skill Structure)

**Purpose**: Create the my-workflow skill skeleton that all workflows depend on

**CRITICAL**: This phase creates the core skill that commands will invoke

- [ ] T006 [US3] Create skill directory structure at `skills/my-workflow/`
- [ ] T007 [US3] Create `skills/my-workflow/SKILL.md` with frontmatter, triggers (.planning/ directory), and core principles extracted from taches/CEK/GSD
- [ ] T008 [US3] Create `skills/my-workflow/workflows/` directory for workflow definitions

**Checkpoint**: ✅ Skill structure exists, SKILL.md has valid frontmatter with triggers, core principles documented

**Created**:

- `skills/my-workflow/SKILL.md` with:
  - YAML frontmatter (name, version, description, triggers)
  - Core principles: Scope Control, Deviation Rules, Handoff Protocol, Stage Awareness
  - Stage transitions documented
  - Quick reference for commands and project structure

---

## Phase 3: User Story 1 - Curate My Skill Library (Priority: P1)

**Goal**: Organize installed skills into "active" and "reference" categories

**Independent Test**: After curation, only chosen active skills appear in Claude Code's skill list, reference materials remain accessible in separate folder

**Note**: Most curation work is done in Phase 1 (Setup). This phase handles verification and restore capability.

### Implementation for User Story 1

- [ ] T009 [US1] Document the curation process in `skills/my-workflow/workflows/curate.md` for future reference
- [ ] T010 [US1] Verify symlinks work correctly after moves - no broken references
- [ ] T011 [US1] Test that reference skills do NOT auto-load in Claude Code
- [ ] T012 [US1] Test that active skills DO load correctly

**Checkpoint**: Skill library is organized, reference folder populated, all symlinks verified working

---

## Phase 4: User Story 2 - Understand the Patterns (Priority: P2)

**Goal**: Comprehensive pattern analysis exists in research documentation

**Independent Test**: Research documentation contains structured comparison of GSD, CEK, taches, and cascading context patterns

**Note**: Pattern analysis is already complete in `specs/001-my-workflow/research.md`. This phase verifies and enhances as needed.

### Implementation for User Story 2

- [ ] T013 [US2] Verify research.md contains complete pattern analysis for GSD, CEK, taches, and cascading context
- [ ] T014 [US2] Ensure pattern decisions are documented for each workflow (/start, /design, /build, /stop)
- [ ] T015 [US2] Add any missing pattern explanations or cross-references to source skills in reference/

**Checkpoint**: Pattern analysis is comprehensive, decisions documented, reference skills accessible for deeper study

---

## Phase 5: User Story 3 - Create Core Workflow Commands (Priority: P3)

**Goal**: Create /start, /design, /build, /stop commands that handle actual work patterns

**Independent Test**: Complete a typical project using only workflow commands, without needing to remember which cek or taches command to use

### Spike: External Skill References Audit

**Purpose**: Identify and resolve external dependencies BEFORE creating workflows

- [ ] T016 [SPIKE] [US3] Scan source skills for external references - check `skills/brainstorming/`, `skills/taches-*`, `skills/cek-*`, `skills/living-requirements/` for patterns like `superpowers:*`, `elements-of-style:*`, or other cross-skill references
- [ ] T017 [SPIKE] [US3] Check which referenced skills are installed vs missing - list all external refs found and their installation status
- [ ] T018 [SPIKE] [US3] Document findings in `.planning/spike-external-refs.md` - create decision matrix: install, remove reference, or substitute

**Checkpoint**: External dependencies are known and decisions made before workflow creation

### Workflow: start.md (Decomposed)

- [ ] T019 [US3] Review start patterns - read `skills/living-requirements/`, `skills/taches-create-plans/`, CEK setup patterns; note key elements
- [ ] T020 [US3] Select start approach with user - present options: cascading context (living-req), project files (GSD), or hybrid; get decision
- [ ] T021 [US3] Create `skills/my-workflow/workflows/start.md` - copy and adapt selected content; include: project structure, CLAUDE.md, .planning/, offer /map-codebase for brownfield
- [ ] T022 [US3] Verify start.md - test manually that workflow loads and key elements are present

### Workflow: brainstorm.md (Decomposed)

- [ ] T023 [US3] Review brainstorm source - read `skills/brainstorming/SKILL.md`; identify external refs from spike findings
- [ ] T024 [US3] Adapt brainstorm workflow - copy content; change output to `docs/plans/<date>-<topic>-design.md`; remove/substitute broken refs
- [ ] T025 [US3] Create `skills/my-workflow/workflows/brainstorm.md` - write adapted content
- [ ] T026 [US3] Verify brainstorm.md - test manually that workflow loads and produces expected output format

### Workflow: design.md (Decomposed)

- [ ] T027 [US3] Review design patterns - read taches spec-driven patterns, CEK `cek-01-specify.md`; note key elements
- [ ] T028 [US3] Select design approach with user - present options: spec-driven (CEK), plans-as-prompts (taches), or hybrid; include brainstorm offer decision
- [ ] T029 [US3] Create `skills/my-workflow/workflows/design.md` - copy and adapt; integrate optional brainstorm offer for unclear requirements
- [ ] T030 [US3] Verify design.md - test manually that workflow offers brainstorm when appropriate

### Workflow: build.md (Decomposed)

- [ ] T031 [US3] Review build patterns - read taches deviation rules, GSD subagent execution, atomic commit patterns
- [ ] T032 [US3] Select build approach with user - present deviation rules options: auto-fix bugs, ask on architecture, log enhancements
- [ ] T033 [US3] Create `skills/my-workflow/workflows/build.md` - copy and adapt; include deviation handling and atomic commits
- [ ] T034 [US3] Verify build.md - test manually that deviation rules are clear and actionable

### Workflow: stop.md (Decomposed)

- [ ] T035 [US3] Review stop/handoff patterns - read existing `commands/stop.md`, taches handoff, GSD context preservation
- [ ] T036 [US3] Select stop approach with user - confirm HANDOFF.md format and what context to capture
- [ ] T037 [US3] Create `skills/my-workflow/workflows/stop.md` - copy and adapt; ensure HANDOFF.md creation with complete context
- [ ] T038 [US3] Verify stop.md - test manually that HANDOFF.md contains resumable context

### Post-Workflow Audit

- [ ] T039 [US3] Final audit of all workflows - verify no broken external refs remain; cross-check against spike findings
- [ ] T040 [US3] Install missing skills or update references - based on spike decisions, install needed skills or remove refs

### Commands Implementation

- [ ] T041 [P] [US3] Create `commands/start.md` - thin wrapper (~15 lines) that loads skill and invokes `workflows/start.md`
- [ ] T042 [P] [US3] Create `commands/design.md` - thin wrapper (~15 lines) that loads skill and invokes `workflows/design.md`
- [ ] T043 [P] [US3] Create `commands/build.md` - thin wrapper (~15 lines) that loads skill and invokes `workflows/build.md`
- [ ] T044 [US3] Verify or update `commands/stop.md` - check if existing suffices or needs wrapper to invoke skill workflow

### Supporting Infrastructure

- [ ] T045 [US3] Create `hooks/state-update.md` - PostToolUse hook for STATE.md updates (~40 lines), triggers on Write/Edit to code files

### Verification

- [ ] T046 [US3] Test `/start` command - verify creates project structure, CLAUDE.md, .planning/ directory
- [ ] T047 [US3] Test `/design` command - verify offers brainstorm for unclear requirements, creates spec-driven plan
- [ ] T048 [US3] Test `/build` command - verify executes with deviation rules, updates STATE.md via hook
- [ ] T049 [US3] Test `/stop` command - verify creates HANDOFF.md with complete context

**Checkpoint**: Full workflow (/start -> /design -> /build -> /stop) completes successfully on test project

---

## Phase 6: User Story 4 - Extend Workflow Over Time (Priority: P4)

**Goal**: Workflow is easily extensible without breaking existing commands

**Independent Test**: Add a new command that integrates with established patterns

### Implementation for User Story 4

- [ ] T050 [US4] Document command creation pattern in `skills/my-workflow/README.md`
- [ ] T051 [US4] Create command template that follows established conventions
- [ ] T052 [US4] Document how to incorporate patterns from reference skills
- [ ] T053 [US4] Verify adding new command doesn't break existing workflow

**Checkpoint**: Documentation enables future extension, template available, extensibility verified

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements affecting multiple user stories

- [ ] T054 Update root `CLAUDE.md` with new command documentation and cross-references
- [ ] T055 Update `commands/` index or documentation with new workflow commands
- [ ] T056 Create `skills/my-workflow/README.md` with usage examples and troubleshooting
- [ ] T057 Verify all workflows follow constitution principles (skill-first, context-aware, documentation-driven)
- [ ] T058 Run full workflow test on real project: /start -> /design -> /build -> /stop
- [ ] T059 Verify STATE.md updates automatically after code changes via hook
- [ ] T060 Clean up any temporary files or test artifacts

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup/Curation)**: No dependencies - manual user interaction
- **Phase 2 (Foundational)**: Can start after Phase 1 - creates skill structure
- **Phase 3 (US1 Verification)**: Depends on Phase 1 - verifies curation worked
- **Phase 4 (US2 Patterns)**: Can run in parallel with Phase 3 - documentation only
- **Phase 5 (US3 Commands)**: Depends on Phase 2 - needs skill structure
- **Phase 6 (US4 Extension)**: Depends on Phase 5 - needs working commands
- **Phase 7 (Polish)**: Depends on all previous phases

### User Story Dependencies

- **US1 (P1 - Curation)**: Independent - clears workspace
- **US2 (P2 - Patterns)**: Independent - already mostly complete in research.md
- **US3 (P3 - Commands)**: Depends on US1 (clean workspace) and Phase 2 (skill structure)
- **US4 (P4 - Extension)**: Depends on US3 (working commands to extend)

### Within Phase 5 (Core Implementation)

```text
Spike (T016-T018): External refs audit - MUST complete first
    |
    v
Workflows (T019-T040): Sequential by workflow, each has 4 steps:
  - Review patterns
  - Select approach with user
  - Create workflow file
  - Verify manually
    |
    v
Commands (T041-T044): Can run in parallel [P] - different files
    |
    v
Hook (T045): Independent, can run in parallel with commands
    |
    v
Verification (T046-T049): Sequential, tests full workflow
```

### Parallel Opportunities

```bash
# After Phase 2 completes, can run in parallel:
Phase 3 (US1 verification) || Phase 4 (US2 patterns)

# Within Phase 5, commands can run in parallel:
T041 (start.md) || T042 (design.md) || T043 (build.md)

# Polish tasks can run in parallel:
T054 (CLAUDE.md) || T055 (commands index) || T056 (README)
```

---

## Implementation Strategy

### MVP First (User Story 3 Core)

1. Complete Phase 1: Manual Curation (with user)
2. Complete Phase 2: Skill Structure
3. Complete Phase 5 through T049: Core Commands + Verification
4. **STOP and VALIDATE**: Test full workflow on real project
5. Proceed only if MVP works

### Recommended Sequence

1. **Phase 1 (Curation)**: Interactive session with user
2. **Phase 2 (Foundational)**: Create skill skeleton
3. **Phase 5 (Commands)**: Build core workflow - THIS IS THE MVP
4. **Phase 3 + 4**: Verify curation and patterns (can be quick)
5. **Phase 6 (Extension)**: Document extensibility
6. **Phase 7 (Polish)**: Final documentation and cleanup

### Key Decision Points

- **After T007**: User reviews and approves SKILL.md principles
- **After T018**: Spike complete - external ref decisions made
- **After T020, T028, T032, T036**: User selects approach for each workflow
- **After T049**: Full workflow test determines if MVP is complete
- **After T058**: Final validation on real project

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [SPIKE] tasks = research/discovery tasks that inform later decisions
- [Story] label maps task to specific user story (US1-US4)
- Manual verification via Claude Code invocation (no automated tests)
- This is a Markdown/skills project, not traditional code
- User interaction required for curation decisions (Phase 1) and approach selection (T020, T028, T032, T036)
- Commit after each workflow or logical group of tasks
- Stop at checkpoints to validate independently
