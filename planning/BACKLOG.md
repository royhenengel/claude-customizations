# Backlog

Persistent record of improvements, ideas, and technical debt discovered during work.

## Quick Wins

(None currently)

## Improvements

- [ ] Possibly automate /compound?
  - **Status**: Partially addressed by audit-agents. build.md Step 5 now uses invocation rules, Step 9 has 3 review agents. 132 active agents covered.
  - **References**:
    - GSD (11 agents): [glittercowboy/get-shit-done](https://github.com/glittercowboy/get-shit-done), local: skills/my-workflow/ref/gsd/README.md
    - CEK (13 agents): [NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit), local: skills/software-development-practices/ref/cek-subagent-driven-development/SKILL.md
    - Everything Claude (9 agents): [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code/blob/main/rules/agents.md)
- [ ] Claude Code remote setup
  - [ ] Tried configured the terminal notifier but that doesn't seem to work reliably. Not sure if that is the right solution and if I should spend time configuring it.
  - [ ] Review TikTok links and capture what others have done.
- [ ] Audit skills vs agents distinction
  - **Question**: Should some skills be agents instead? (e.g., diagrams-builder)
  - **Criteria to evaluate**: Is it always-on context vs on-demand invocation?
  - **Examples to review**: diagrams-builder, notion-* skills, debugging-practices
- [ ] Document strategic decisions and rules automatically.
      For example No title truncating, Numbered List for Suggestions etc
- [ ] Brownfield project support in /start
  - **Context**: Currently /start assumes greenfield. For existing projects, should offer to reorganize existing code to my-workflow structure.
  - **Considerations**: Detect existing files/structure, offer migration path, preserve existing work
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
- [ ] Cleanup docs - The second part of this doc shouldn't be here
- [ ] Review the commands text format. i.e instead of cek-plan-01 --> cek:XXX . Add the source as the prefix
- [ ] Add skill dependency validation
- [ ] Create skill testing framework
- [ ] Skill versioning and changelog automation
- [ ] Skill health check command
- [ ] Create /curate command for skill organization (deferred - manual process for now)
- [ ] Commit every code change and use git history as context for fixes (avoid retrying failed solutions)
- [ ] Master using instincts system
- [ ] Master git worktrees (wired into /build as optional Step 2a)
- [ ] Possibly save session transcripts in claude mem
- [ ] Improve the diagram builder.
- [ ] Double check and compare the Ralph Wiggum while loop impl with my workflow
- [ ] Add lightweight mode to My-Workflow
  - **Context**: Some tasks don't need full workflow overhead (spec, research, plan files)
  - **Idea**: Auto-detect simple tasks and use TodoWrite + direct execution instead
  - **Triggers to consider**: Single file change, quick fix, less than 3 steps
  - **Deferred**: Decided to stick with full workflow for now; add lightweight mode later if needed
- [ ] Agent Teams: team composition guidance in invocation rules
  - **Context**: Anthropic released Agent Teams (experimental). Currently documented as escalation pattern in multi-agent-orchestration.md.
  - **Idea**: Add a "team composition" section to agent-invocation-rules.md defining which agents to spawn together for common scenarios (e.g., cross-layer refactoring: backend-developer + frontend-developer + test-automator)
  - **Prerequisite**: Practical experience with Agent Teams to validate value
  - **Reference**: [Agent Teams docs](https://code.claude.com/docs/en/agent-teams)
- [ ] Override Explanatory output style insight banner to match workflow banner style
  - **Context**: `outputStyle: "Explanatory"` injects `★ Insight ─────` format (light lines). Workflow uses `━━━` (heavy lines) for banners.
  - **Options**: Override format in CLAUDE.md, or disable outputStyle and define custom insight behavior in workflow skill
  - **Goal**: Visual consistency across all workflow output
- [ ] Link multi-agent orchestration to cost tracking
  - **Context**: multi-agent-orchestration.md documents Agent Teams as experimental with "Higher token cost without clear ROI threshold defined" as an open concern
  - **Idea**: Add cost tracking mechanisms (token usage per agent invocation, ROI thresholds for subagent vs Agent Teams, cost comparison framework)
  - **Goal**: Data-driven decisions about when multi-agent coordination costs are justified
- [ ] Current State updates outside /plan and /build
  - **Gap**: Current State only updates during formal workflow commands. Informal work ("fix this bug", "add this") leaves STATE.md stale.
  - **Current behavior**: claude-mem captures session activity, but STATE.md's Current State section doesn't reflect it
  - **Options**:
    1. Accept it (workflows are opt-in, informal work is informal)
    2. Add hook to auto-update on significant file changes
    3. Add lightweight manual refresh command (risk: recreating /stop)
  - **Consideration**: May be fine as-is if workflow adoption is expected for tracked projects

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

- [x] **INCIDENT-001**: CEK Bias in Agent Comparison (RESOLVED)
  - **Issue**: Agent comparison analysis produced biased recommendations favoring CEK agents without evidence
  - **Remediation**: [agent-comparison-v2.md](specs/audit-agents/agent-comparison-v2.md) rewrote comparison with domain-focused criteria (Domain Depth, Breadth, Adaptability, Prompt Clarity, Completeness)
  - **Result**: Invocation rules and build.md updated with evidence-based agent selection. v1 archived.
  - **Incident report**: [INCIDENT-001-cek-bias.md](specs/audit-agents/INCIDENT-001-cek-bias.md)
  - **Prevention**: Evaluation bias rules documented in project memory ([evaluation-bias.md](../../.claude/projects/-Users-royengel-worktrees-claude-customizations-audit-agents/memory/evaluation-bias.md))
