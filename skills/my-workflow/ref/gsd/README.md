# GSD (Get Shit Done) Reference

**Source**: https://github.com/glittercowboy/get-shit-done
**Purpose**: Meta-prompting and context engineering system for Claude Code

## Philosophy

- Addresses "context rot" (quality degradation as context fills)
- Solo developer focus, rejects "enterprise theater"
- Plans as executable prompts, not transformation documents
- Fresh context windows per task (200k tokens each)

## 6-Step Workflow Cycle

1. **Initialize** (`/gsd:new-project`) - Questions, research, requirements, roadmap
2. **Discuss** (`/gsd:discuss-phase [N]`) - Capture decisions before planning
3. **Plan** (`/gsd:plan-phase [N]`) - XML-structured atomic tasks
4. **Execute** (`/gsd:execute-phase [N]`) - Parallel execution with fresh contexts
5. **Verify** (`/gsd:verify-work [N]`) - Manual UAT with automated diagnostics
6. **Iterate** - Repeat until milestone complete

## Context Management Files

| File | Purpose |
|------|---------|
| PROJECT.md | Vision (always loaded) |
| REQUIREMENTS.md | Scoped v1/v2 with phase traceability |
| ROADMAP.md | Progress tracking |
| STATE.md | Decisions and blockers |
| PLAN.md | XML-structured atomic tasks |

## Agents (11 total)

| Agent | Purpose |
|-------|---------|
| gsd-project-researcher | Initial project research |
| gsd-phase-researcher | Phase-specific research |
| gsd-research-synthesizer | Synthesize research findings |
| gsd-planner | Create execution plans |
| gsd-plan-checker | Verify plan quality |
| gsd-executor | Execute tasks |
| gsd-verifier | Verify completed work |
| gsd-debugger | Debug issues |
| gsd-integration-checker | Check integrations |
| gsd-codebase-mapper | Map existing codebases |
| gsd-roadmapper | Manage roadmap |

## Key Patterns for my-workflow

### Subagent Execution
- Fresh context window per task (prevents degradation)
- Parallel execution when tasks are independent
- Atomic git commits per task

### Task Sizing
- **2-3 tasks maximum per plan** (quality peaks at 0-30% context)
- Split aggressively when >3 tasks or >5 files per task
- Each task should be atomic and verifiable

### XML Task Structure
```xml
<task type="auto">
  <name>Task name</name>
  <files>file1.ts, file2.ts</files>
  <action>What to do</action>
  <verify>How to verify</verify>
  <done>Completion criteria</done>
</task>
```

### Checkpoint Types
- `human-verify` - Requires manual review
- `decision` - Requires user decision before proceeding

### Anti-Patterns (Banned)
- Enterprise patterns
- Vague tasks
- Assumptions about timing
- Generic XML tags
- "Let me", "Simply", sycophantic language

## Model Profiles

| Profile | Planning | Execution |
|---------|----------|-----------|
| Quality | Opus | Opus |
| Balanced | Opus | Sonnet |
| Budget | Sonnet | Haiku |

## Comparison to my-workflow

| Aspect | GSD | my-workflow |
|--------|-----|-------------|
| Task cap | 2-3 per plan | No cap (was 2-3, removed) |
| Files | PROJECT.md, REQUIREMENTS.md, ROADMAP.md, STATE.md, PLAN.md | OVERVIEW.md, SPEC.md, STATE.md, PLAN.md, BACKLOG.md |
| Agents | 11 specialized | Generic "developer" |
| Execution | Parallel with fresh context | Sequential via subagent |
| Verification | Dedicated verifier agent | 3 parallel review agents |

## What my-workflow Adopted from GSD

1. Task tool delegation for fresh context
2. STATE.md for session memory
3. Comprehensive documentation style
4. "Plans as prompts" philosophy
5. Deviation rules concept

## What Could Still Be Adopted

1. Specialized agents (executor, verifier, debugger)
2. Task type XML structure (`auto`, `checkpoint:human-verify`)
3. Model profile selection
4. 2-3 task cap (re-adopt?)
5. Parallel execution pattern
