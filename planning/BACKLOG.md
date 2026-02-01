# Backlog

Persistent record of improvements, ideas, and technical debt discovered during work.

## Quick Wins

- [ ] Make the new project intro more fun

## Improvements

- [ ] Auto-trigger /fix process on issue detection
  - **Context**: Currently /fix is explicit. Could auto-detect bug/issue/problem/error language.
  - **Considerations**:
    - Detect issue-related language patterns
    - Could prompt: "This sounds like an issue. Run full /fix process?"
    - Or confidence threshold for auto-triggering
    - Avoid false positives on discussions about issues vs actual issues to fix
  - **Deferred**: Start with explicit /fix command, add auto-trigger later based on usage patterns
- [ ] Create /curate command for skill organization (deferred - manual process for now)
- [ ] Add skill dependency validation
- [ ] Create skill testing framework
- [ ] Skill versioning and changelog automation
- [ ] Skill health check command
- [ ] Commit every code change and use git history as context for fixes (avoid retrying failed solutions)
- [ ] Clarify Rule 3 (Blockers) definition and examples
  - **Context**: Current "auto-fix blocking issues" is ambiguous
  - **Question**: What counts as a blocker vs a bug vs a gap?
  - **Proposed definition**: "Can't proceed → Fix immediately" (not autofix)
  - **Categories to define**:
    - Blocker: Cannot proceed without resolution (missing dep, broken import)
    - Bug: Code error that breaks functionality → use /fix process
    - Gap: Missing functionality needed for feature → Rule 2 applies
- [ ] Audit agents
  - **Scope**: Review 142 agents for quality, relevance, and workflow integration
  - **Sub-tasks**:
    1. Map agents to workflow stages (which agents for planning, execution, review, etc.)
    2. Define agent invocation rules (when to use which agent, e.g., "Complex → planner")
    3. Consider adopting specialized agent pattern from GSD/CEK (executor, verifier, debugger, etc.)
    4. Wire CEK subagent-driven-development patterns into my-workflow build.md
    5. Adopt multi-perspective review pattern from Everything Claude:
       - Factual reviewer (checks accuracy of claims/data)
       - Senior engineer (evaluates technical soundness)
       - Security expert (identifies vulnerabilities)
       - Consistency reviewer (checks for contradictions)
       - Redundancy checker (identifies duplicate logic)
       - Each reviews same artifact, findings consolidated
  - **Delegation Comparison**:

    | Aspect | Everything Claude | GSD | CEK | My-Workflow |
    | ------ | ----------------- | --- | --- | ----------- |
    | Agent count | 9 | 11 | 13 | 1 (generic "developer") |
    | Invocation rules | Explicit (Complex→planner, Bugs→tdd) | Task type triggers | Role-based | None defined |
    | Specialized roles | factual, senior, security, consistency, redundancy | researcher, planner, executor, verifier, debugger | executor, verifier, reviewer, architect | N/A |
    | Multi-perspective | Yes (5 reviewers same artifact) | No | Partial (3 review agents) | Partial (Step 9 quality review) |
    | Parallel execution | Reviewers run parallel | Yes (fresh context each) | Yes | Sequential |  

- [ ] Master using instincts system
- [ ] Possibly save session transcripts in claude mem
- [x] Master git worktrees (wired into /build as optional Step 2a)
- [ ] Reevaluate /stop not that we have claude-mem which injects the context, or regardless maybe we should automate it in hooks?
- [ ] Possibly automate /compound?

  - **Current gap**: build.md Step 5 uses generic "developer" subagent, Step 9 has 3 parallel review agents. No invocation rules defined for 142 available agents.
  - **References**:
    - GSD (11 agents): [glittercowboy/get-shit-done](https://github.com/glittercowboy/get-shit-done), local: skills/my-workflow/ref/gsd/README.md
    - CEK (13 agents): [NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit), local: skills/software-development-practices/ref/cek-subagent-driven-development/SKILL.md
    - Everything Claude (9 agents): [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code/blob/main/rules/agents.md)
- [ ] Audit skills vs agents distinction
  - **Question**: Should some skills be agents instead? (e.g., diagrams-builder)
  - **Criteria to evaluate**: Is it always-on context vs on-demand invocation?
  - **Examples to review**: diagrams-builder, notion-* skills, debugging-practices
- [ ] Improve the diagram builder.
- [ ] Document strategic decisions and rules automatically.
      For example No title truncating, Numbered List for Suggestions etc
- [ ] Double check and compare the Ralph Wiggum while loop impl with my workflow
- [ ] Brownfield project support in /start
  - **Context**: Currently /start assumes greenfield. For existing projects, should offer to reorganize existing code to my-workflow structure.
  - **Considerations**: Detect existing files/structure, offer migration path, preserve existing work
- [ ] Merge /brainstorm into /plan
  - **Context**: Current design has /brainstorm (explore) and /plan (tasks) as separate commands
  - **Issue**: User doesn't need to know the distinction. They just want idea → executable plan.
  - **Decision**: Single /plan command that brainstorms first if requirements are unclear
  - **New flow**: /plan checks if SPEC exists or requirements are clear → if not, runs brainstorm phase → then creates PLAN.md
  - **Result**: User only needs /start → /plan → /build → /stop
- [ ] Add lightweight mode to My-Workflow
  - **Context**: Some tasks don't need full workflow overhead (spec, research, plan files)
  - **Idea**: Auto-detect simple tasks and use TodoWrite + direct execution instead
  - **Triggers to consider**: Single file change, quick fix, less than 3 steps
  - **Deferred**: Decided to stick with full workflow for now; add lightweight mode later if needed
- [ ] Enhance RESEARCH.md template with in-depth analysis requirements
  - **Context**: Research docs should include deep breakdowns, comparisons, and comprehensive topic exploration
  - **Current**: RESEARCH.md template focuses on approach/alternatives but lacks depth requirements
  - **Action**: Update template to require: topic deep-dives, comparison tables, tradeoff analysis, architectural breakdowns
- [ ] Consolidate CLAUDE.md and claude-code-prefs.md relationship
  - **Current**: CLAUDE.md = auto-loaded essentials, claude-code-prefs.md = detailed reference in docs/
  - **Status**: Deferred - the separation works, but claude-code-prefs.md is orphaned (not referenced from CLAUDE.md)
  - **Analysis** (2026-01-21):
    - claude-code-prefs.md has useful content: tool selection guide, session management, context preservation strategies
    - Some content is stale (predates my-workflow, references PREFERENCES.md which doesn't exist)
    - Context preservation now handled by /stop and HANDOFF.md
  - **Options when revisiting**:
    1. Archive it (my-workflow supersedes most content)
    2. Keep but link from CLAUDE.md and update stale references
    3. Extract still-valuable content (tool selection guide) to dedicated doc

## Inspiration Sources

Reference repositories being evaluated for cherry-picking. See [reddit-sources-evaluation.md](specs/reddit-sources-evaluation.md) for detailed analysis.

### Session Continuity & Memory

| Source | Status | Value |
| --- | --- | --- |
| [claude-mem](https://github.com/thedotmack/claude-mem) | **Complete** | Installed via plugin (v9.0.12). Session continuity, auto-injection, semantic search. |
| Everything Claude sessions | **Complete** | Superseded by claude-mem |
| Knowledge Graph MCP | Keep | Different purpose (curated facts vs automatic capture) |

### Workflow Systems

| Source | Status | Value |
| --- | --- | --- |
| [GSD](https://github.com/glittercowboy/get-shit-done) | Cherry-picked | Subagent patterns in my-workflow |
| [CEK](https://github.com/NeoLabHQ/context-engineering-kit) | Cherry-picked | TDD, Clean Architecture in my-workflow |
| [Everything Claude](https://github.com/affaan-m/everything-claude-code) | **Complete** | Instinct system, rules (18/18 tasks) |
| [superpowers](https://github.com/obra/superpowers) | **Complete** | Git worktrees skill cherry-picked (MIT) |
| [compound-engineering](https://github.com/EveryInc/compound-engineering-plugin) | **Complete** | /compound command ported (project-specific solutions → docs/solutions/) |

### Utilities

| Source | Status | Value |
| --- | --- | --- |
| [repomix](https://github.com/yamadashy/repomix) | Optional | Pack repo for external AI tools |
| [call-me](https://github.com/ZeframLou/call-me) | Optional | Phone notifications |
| [plannotator](https://github.com/backnotprop/plannotator) | **Complete** | Visual plan/diff annotation (v0.6.8, BSL license) |

### Learning Systems

| Source | Status | Value |
| --- | --- | --- |
| Everything Claude Continuous Learning v2 | **Complete** | Instincts, confidence scoring, evolution - integrated with claude-mem |
| claude-mem | **Complete** | Session capture + retrieval (plugin v9.0.12) |

### Recommended Strategy

**Hybrid approach:**

1. ~~**claude-mem** for session continuity (capture, search, injection)~~ ✓ Complete
2. ~~**Everything Claude instinct system** for pattern learning~~ ✓ Complete
3. ~~**Cherry-pick** git-worktrees from superpowers~~ ✓ Complete
4. ~~**Port** /compound concept for explicit learning capture~~ ✓ Complete

---

## Technical Debt

(None currently)
