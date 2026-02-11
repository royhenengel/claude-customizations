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
- [ ] Current State updates outside /plan and /build
  - **Gap**: Current State only updates during formal workflow commands. Informal work ("fix this bug", "add this") leaves STATE.md stale.
  - **Current behavior**: claude-mem captures session activity, but STATE.md's Current State section doesn't reflect it
  - **Options**:
    1. Accept it (workflows are opt-in, informal work is informal)
    2. Add hook to auto-update on significant file changes
    3. Add lightweight manual refresh command (risk: recreating /stop)
  - **Consideration**: May be fine as-is if workflow adoption is expected for tracked projects
- [ ] Commit every code change and use git history as context for fixes (avoid retrying failed solutions)

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
- [ ] Multiple features STATE support
- [ ] Double check and compare the Ralph Wiggum while loop impl with my workflow

### Skill & Agent Architecture

- [ ] Audit skills vs agents distinction
  - **Question**: Should some skills be agents instead? (e.g., diagrams-builder)
  - **Criteria to evaluate**: Is it always-on context vs on-demand invocation?
  - **Examples to review**: diagrams-builder, notion-* skills, debugging-practices
- [ ] Commands & skills migration - Anthropic just merged the two. Check the impact and see if these can be streamlined to avoid confusion working with commands & skills.
- [ ] Review the commands text format. i.e instead of cek-plan-01 --> cek:XXX . Add the source as the prefix
- [ ] Add skill dependency validation
- [ ] Create skill testing framework
- [ ] Skill health check command
- [ ] Create /curate command for skill organization (deferred - manual process for now)
- [ ] Improve the diagram builder
- [ ] Clarify /compound and integrate into workflow
  - **Gap**: /compound is standalone with no integration point in `/build`. memory-boundaries.md defines what goes there but nothing triggers it during workflow.
  - **Options**:
    1. Wire into build.md: After deviation rules 1-3 fix a bug, offer "Document this solution? (`/compound`)"
    2. Add to `/build` completion flow: "Any solutions worth documenting?"
    3. Periodic prompt: After N fixes in a session, suggest /compound
  - **Also**: Clarify compound vs MEMORY.md in practice (when to use which)
- [ ] Possibly automate /compound?
  - **Current gap**: build.md Step 5 uses generic "developer" subagent, Step 9 has 3 parallel review agents. No invocation rules defined for 136 available agents.
  - **References**:
    - GSD (11 agents): [glittercowboy/get-shit-done](https://github.com/glittercowboy/get-shit-done), local: skills/my-workflow/references/gsd/README.md
    - CEK (13 agents): [NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit), local: skills/software-development-practices/references/cek-subagent-driven-development/SKILL.md
    - Everything Claude (9 agents): [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code/blob/main/rules/agents.md)

### Docs & Knowledge Capture

- [ ] Document strategic decisions and rules automatically.
      For example No title truncating, Numbered List for Suggestions etc
- [x] Consolidate CLAUDE.md and claude-code-prefs.md relationship
  - **Resolved by**: repo-documentation feature (Q8/Q9)
  - behavioral rules -> rules/behavioral-rules.md, tool guidance -> rules/technical-consistency.md, stale content -> archive
  - See planning/specs/repo-documentation/PLAN.md Tasks 5-6
- [x] Cleanup docs
  - **Resolved by**: repo-documentation feature (Tasks 11-14)
  - docs/ reduced to 6 reference files, stale content archived, slash command catalog created
- [ ] Incident Report command

### Remote & Sessions

- [ ] Claude Code remote setup
  - [ ] Tried configured the terminal notifier but that doesn't seem to work reliably. Not sure if that is the right solution and if I should spend time configuring it.
  - [ ] Review TikTok links and capture what others have done.
- [ ] Resuming chats in VS Code Claude in different worktrees
- [ ] Possibly save session transcripts in claude-mem

### Learning & Mastery

- [ ] Master using instincts system
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
