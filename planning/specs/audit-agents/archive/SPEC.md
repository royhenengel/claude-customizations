# Audit Agents Specification

## Goal

Review the 135 agents for quality, relevance, and workflow integration. Define invocation rules and adopt specialized agent patterns from GSD/CEK/Everything Claude.

## Problem Statement

Current state:
- 135 agents exist but no invocation rules define when to use which
- build.md uses generic "developer" subagent only
- No mapping of agents to workflow stages (planning, execution, review)
- No multi-perspective review pattern adopted
- Unclear which agents are redundant, outdated, or useful

Reference systems show clear patterns:
- GSD: 11 agents with specific roles (researcher, planner, executor, verifier, debugger)
- CEK: 13 agents with role-based invocation
- Everything Claude: 9 agents with explicit invocation rules ("Complex → planner", "Bugs → tdd-guide")

## User Stories

- As a workflow user, I want clear rules for which agent to use so I don't have to guess
- As a workflow user, I want specialized agents for different tasks so quality improves
- As a maintainer, I want a curated agent set so the collection stays relevant

## Requirements

### Functional

- [ ] Categorize all 135 agents by workflow stage relevance
- [ ] Define invocation rules (trigger → agent mapping)
- [ ] Identify redundant or outdated agents for archive
- [ ] Wire selected agents into build.md execution
- [ ] Adopt multi-perspective review pattern for quality gates

### Non-Functional

- [ ] Invocation rules must be simple (if X → use agent Y)
- [ ] Agent count should decrease, not increase
- [ ] Changes must not break existing workflows

## Constraints

- Must work with existing Task tool delegation
- Must not require changes to Claude Code itself
- Agents kept must have clear, distinct purposes

## Scope

### In Scope

1. Audit: Review each agent's purpose, quality, and relevance
2. Categorize: Map agents to workflow stages (planning, execution, review, etc.)
3. Rules: Define when to invoke which agent
4. Integration: Wire into build.md (replace generic "developer")
5. Archive: Move redundant/outdated agents out

### Out of Scope

- Creating new agents from scratch
- Changing agent file format
- Modifying Task tool behavior

## Success Criteria

- [ ] Invocation rules documented (trigger → agent mapping)
- [ ] build.md uses specialized agents instead of generic "developer"
- [ ] Multi-perspective review pattern adopted in build.md Step 9
- [ ] Agent count reduced by archiving redundant/outdated ones
- [ ] Remaining agents have clear, distinct purposes

## Open Questions

(None - requirements clear from backlog and reference analysis)
