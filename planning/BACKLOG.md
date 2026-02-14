# Backlog

Persistent record of improvements, ideas, and technical debt discovered during work.

## Quick Wins

(None currently)

## Improvements

### Workflow Guardrails

- [ ] Enforce my workflow build completion.
  - **Incident**: [INCIDENT-2026-02-06.md](specs/commands-skills-migration/INCIDENT-2026-02-06.md)
  - **Problem**: "Mark as complete" outside an active `/build` session bypasses steps 10-13 (SUMMARY.md, STATE.md finalization, worktree cleanup)
  - **Options**:
    1. Skill trigger: Add "mark as complete", "complete the feature", "done with feature" to build skill description so it auto-activates and dispatches to the completion flow
    2. Hook: UserPromptSubmit hook detects completion language, injects reminder to follow build.md steps 10-13
    3. Pre-merge check: Hook on `gh pr merge` that verifies SUMMARY.md exists and worktree cleanup is planned
  - **Minimum fix**: Add completion-related triggers to build skill description
- [ ] Project state timestamp must update within workflow
  - **Context**: Project STATE.md timestamp was stale (2026-02-11 instead of 2026-02-12) after active work. Workflows should auto-update this timestamp when modifying STATE.md.
  - **Fix**: Add timestamp update step to /build and /fix workflows wherever STATE.md is modified
- [ ] Error recovery paths for all workflows
  - **Context**: PR review identified missing error recovery in workflows. What happens when a subagent fails? When a file can't be created? When a template is missing? Workflows define the happy path but not recovery.
  - **Scope**: /build, /fix, /plan, /start - all need documented error recovery for common failure modes
- [ ] Feature registry consistency check
  - **Context**: Feature registry in project STATE.md can drift from actual worktree/branch state. Need documented validation step.
  - **Checks**: Worktree paths exist, branches exist in git, status matches actual state, no orphaned entries
  - **Where**: Could be /start dashboard step, doc-enforcer check, or standalone validation
- [ ] Current State updates outside /plan and /build
  - **Gap**: Current State only updates during formal workflow commands. Informal work ("fix this bug", "add this") leaves STATE.md stale.
  - **Current behavior**: claude-mem captures session activity, but STATE.md's Current State section doesn't reflect it
  - **Options**:
    1. Accept it (workflows are opt-in, informal work is informal)
    2. Add hook to auto-update on significant file changes
    3. Add lightweight manual refresh command (risk: recreating /stop)
  - **Consideration**: May be fine as-is if workflow adoption is expected for tracked projects
- [ ] Commit every code change and use git history as context for fixes (avoid retrying failed solutions)
- [ ] Add an action confidence score so that if Claude isn't sure in what it's doing I would get notified.

### Workflow UX

- [ ] Add lightweight mode to My-Workflow
  - **Context**: Some tasks don't need full workflow overhead (spec, research, plan files)
  - **Idea**: Auto-detect simple tasks and use Tasks API (persistent, dependency-aware) + direct execution instead
  - **Tasks API**: Replaced TodoWrite in v2.1.16 (Jan 2026). Persists to `~/.claude/tasks/`, supports dependencies, multi-session, multi-terminal. STATE.md remains single source of truth for full workflow; Tasks API for lightweight tasks.
  - **Triggers to consider**: Single file change, quick fix, less than 3 steps
  - **Deferred**: Decided to stick with full workflow for now; add lightweight mode later if needed
- [ ] Brownfield project support in /start
  - **Context**: Currently /start assumes greenfield. For existing projects, should offer to reorganize existing code to my-workflow structure.
  - **Considerations**: Detect existing files/structure, offer migration path, preserve existing work
- [ ] Override Explanatory output style insight banner to match workflow banner style
  - **Context**: `outputStyle: "Explanatory"` injects `★ Insight ─────` format (light lines). Workflow uses `━━━` (heavy lines) for banners.
  - **Options**: Override format in CLAUDE.md, or disable outputStyle and define custom insight behavior in workflow skill
  - **Goal**: Visual consistency across all workflow output

### Skill & Agent Architecture

- [ ] Audit skills vs agents distinction
  - **Question**: Should some skills be agents instead? (e.g., diagrams-builder)
  - **Criteria to evaluate**: Is it always-on context vs on-demand invocation?
  - **Examples to review**: diagrams-builder, notion-* skills, debugging-practices
- [ ] Add skill dependency validation
- [ ] Create skill testing framework
- [ ] Skill health check command
- [ ] Create /curate command for skill organization (deferred - manual process for now)
- [ ] Improve the diagram builder
- [ ] Agent Teams: team composition guidance in invocation rules
  - **Context**: Anthropic released Agent Teams (experimental). Currently documented as escalation pattern in multi-agent-orchestration.md.
  - **Idea**: Add a "team composition" section to agent-invocation-rules.md defining which agents to spawn together for common scenarios (e.g., cross-layer refactoring: backend-developer + frontend-developer + test-automator)
  - **Prerequisite**: Practical experience with Agent Teams to validate value
  - **Reference**: [Agent Teams docs](https://code.claude.com/docs/en/agent-teams)
- [ ] Link multi-agent orchestration to cost tracking
  - **Context**: multi-agent-orchestration.md documents Agent Teams as experimental with "Higher token cost without clear ROI threshold defined" as an open concern
  - **Idea**: Add cost tracking mechanisms (token usage per agent invocation, ROI thresholds for subagent vs Agent Teams, cost comparison framework)
  - **Goal**: Data-driven decisions about when multi-agent coordination costs are justified

### Docs & Knowledge Capture

- [ ] Document strategic decisions and rules automatically.
      For example No title truncating, Numbered List for Suggestions etc
- [ ] Apply /insights in the project

### Remote & Sessions

- [ ] Claude Code remote setup
  - [ ] Tried configured the terminal notifier but that doesn't seem to work reliably. Not sure if that is the right solution and if I should spend time configuring it.
  - [ ] Review TikTok links and capture what others have done.
- [ ] Resuming chats in VS Code Claude in different worktrees
- [ ] Possibly save session transcripts in claude-mem

### Learning & Mastery

- [ ] Master using instincts system
- [ ] Master using compound lessons system
- [ ] Master git worktrees (wired into /build as optional Step 2a)

---

## Technical Debt

- [ ] Fix auto-trigger-fix hooks false positives
  - **Incident**: [INCIDENT-2026-02-05.md](specs/auto-trigger-fix/INCIDENT-2026-02-05.md)
  - **Status**: Hooks disabled pending fix
  - **Root cause**: Overly broad regex patterns (`/error:/i`, `/\berror\b/i`)
  - **Fix needed**:
    1. Make patterns context-aware (line start, command type)
    2. Add exclusions for grep/search commands
    3. Add exclusions for meta-discussions about the feature
    4. Consider requiring multiple signals before triggering