# Reddit Sources Evaluation

Source: [r/ClaudeCode - Everyone's hyped on skills but Claude Code plugins](https://www.reddit.com/r/ClaudeCode/comments/1qrlgij/)

## Overview

| Repo | Purpose | Type | Overlap with Existing | Priority |
|------|---------|------|----------------------|----------|
| [claude-mem](https://github.com/thedotmack/claude-mem) | Persistent memory across sessions | Plugin + MCP | Medium (memory MCP) | **High** |
| [repomix](https://github.com/yamadashy/repomix) | Pack repo into AI-friendly file | CLI + Plugin | None | Medium |
| [superpowers](https://github.com/obra/superpowers) | Workflow (brainstorm → plan → execute) | Plugin | **High** (my-workflow) | Evaluate |
| [compound-engineering](https://github.com/EveryInc/compound-engineering-plugin) | Workflow (plan → work → review → compound) | Plugin | **High** (my-workflow) | Evaluate |
| [call-me](https://github.com/ZeframLou/call-me) | Phone calls on completion/blockers | MCP Server | None | Low |
| [plannotator](https://github.com/backnotprop/plannotator) | Visual plan annotation | Plugin | Low (planning) | Medium |

---

## 1. claude-mem

**Repository:** [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)
**Version:** 6.5.0
**License:** AGPL-3.0

### What It Does

Persistent memory compression system that automatically captures tool usage observations, generates semantic summaries, and injects relevant context into future sessions.

### Key Features

- **5 Lifecycle Hooks:** SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd
- **Auto-injection:** Last 50 observations injected at session start
- **AI Compression:** Every observation compressed by Claude
- **Semantic Search:** Chroma vector DB + SQLite FTS5
- **Progressive Disclosure:** 3-layer token optimization (~10x savings)
- **Web UI:** Real-time memory stream at localhost:37777
- **Privacy:** `<private>` tags exclude sensitive content

### Architecture

```
Claude Code → Hooks → Worker Service (port 37777)
                           ↓
              SQLite + Chroma Vector DB
                           ↓
              AI Compression (Claude)
                           ↓
              SessionStart → Context Injection
```

### Hooks Detail

| Hook | Trigger | Data Captured |
|------|---------|---------------|
| SessionStart | Session begins | Injects last 50 observations |
| UserPromptSubmit | User sends prompt | Prompt (privacy stripped) |
| PostToolUse | Tool executes | Tool name, inputs, outputs |
| Stop | User pauses | Last messages → AI summary |
| SessionEnd | Session ends | Status, completion reason |

### Progressive Disclosure

| Layer | What | Tokens |
|-------|------|--------|
| search | Compact index with IDs | ~50-100/result |
| timeline | Chronological context | Variable |
| get_observations | Full details | ~500-1000/result |

### Dependencies

- Node.js 18+
- Bun runtime
- uv (Python package manager)
- SQLite 3

### Overlap Analysis

- **Replaces:** Manual /stop, HANDOFF.md
- **Complements:** Knowledge Graph MCP (different purpose)
- **Supersedes:** Everything Claude session hooks (more comprehensive)

### Decision

**Recommended: Install**

Best-in-class session continuity. See [memory-systems-comparison.md](memory-systems-comparison.md) for detailed analysis.

---

## 2. repomix

**Repository:** [yamadashy/repomix](https://github.com/yamadashy/repomix)
**License:** MIT

### What It Does

Packs entire repository into a single AI-friendly file for feeding to LLMs.

### Key Features

- **AI-Optimized Formatting:** Structures code for AI comprehension
- **Token Counting:** Per-file and total token counts
- **Git-Aware:** Respects .gitignore, .ignore, .repomixignore
- **Security-Focused:** Secretlint integration for sensitive data detection
- **Code Compression:** Tree-sitter extracts key elements, reduces tokens
- **Multiple Formats:** XML (default), Markdown, JSON

### Usage

```bash
# Quick use
npx repomix@latest

# Output: repomix-output.xml
```

### When Useful

- Sharing codebase context with external AI tools
- Creating context files for Claude without full repo access
- Onboarding new Claude sessions with large codebases

### Overlap Analysis

- **No overlap** with existing setup
- **Complements:** Task tool's Explore agent (different use case)

### Decision

**Recommended: Install as utility**

Low overhead, useful for specific scenarios. Not workflow-critical.

---

## 3. superpowers

**Repository:** [obra/superpowers](https://github.com/obra/superpowers)
**License:** MIT

### What It Does

Complete software development workflow with composable skills that trigger automatically.

### Core Workflow

```
Brainstorm → Design → Plan → Execute → Review → Finish
```

### Skills Library

**Collaboration:**
- brainstorming - Socratic design refinement
- writing-plans - Detailed implementation plans (2-5 min tasks)
- executing-plans - Batch execution with checkpoints
- subagent-driven-development - Fast iteration with two-stage review
- requesting-code-review - Pre-review checklist
- using-git-worktrees - Parallel development branches

**Testing:**
- test-driven-development - RED-GREEN-REFACTOR (deletes code written before tests)

**Debugging:**
- systematic-debugging - 4-phase root cause process
- verification-before-completion - Ensure actually fixed

### Philosophy

- Test-Driven Development always
- Systematic over ad-hoc
- Simplicity as primary goal
- Evidence over claims

### Commands

```
/superpowers:brainstorm - Interactive design refinement
/superpowers:write-plan - Create implementation plan
/superpowers:execute-plan - Execute plan in batches
```

### Overlap Analysis

**HIGH OVERLAP with my-workflow:**

| Feature | superpowers | my-workflow |
|---------|-------------|-------------|
| Brainstorm | /superpowers:brainstorm | Merged into /plan |
| Plan | /superpowers:write-plan | /plan |
| Execute | /superpowers:execute-plan | /build |
| TDD | Built-in skill | Development Discipline |
| Subagents | Two-stage review | Step 9 quality review |
| Git worktrees | Built-in skill | Not included |

### Unique Value

- **Git worktrees** for parallel development
- **Skills trigger automatically** (not manual invocation)
- **Subagent two-stage review** (spec compliance + code quality)

### Decision

**Evaluate: Cherry-pick git-worktrees skill**

Core workflow duplicates my-workflow. Git worktrees feature is valuable addition.

---

## 4. compound-engineering

**Repository:** [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)
**License:** MIT

### What It Does

Workflow tools that make each unit of engineering work easier than the last through documentation and learning.

### Core Workflow

```
Plan → Work → Review → Compound → Repeat
```

### Philosophy

> "Each unit of engineering work should make subsequent units easier—not harder."

- **80% planning/review, 20% execution**
- Plans inform future plans
- Reviews catch issues AND capture learnings
- Codify knowledge so it's reusable

### Commands

| Command | Purpose |
|---------|---------|
| /workflows:plan | Turn feature ideas into detailed implementation plans |
| /workflows:work | Execute plans with worktrees and task tracking |
| /workflows:review | Multi-agent code review before merging |
| /workflows:compound | Document learnings to make future work easier |

### Key Differentiator: Compound Step

The `/workflows:compound` command explicitly captures learnings from each cycle:
- What worked well
- What patterns emerged
- What to do differently next time

This feeds back into future planning.

### Overlap Analysis

**HIGH OVERLAP with my-workflow:**

| Feature | compound-engineering | my-workflow |
|---------|---------------------|-------------|
| Plan | /workflows:plan | /plan |
| Work | /workflows:work | /build |
| Review | /workflows:review | Step 9 quality review |
| Compound | /workflows:compound | **Not included** |

### Unique Value

- **Compound step** explicitly captures learnings
- **Multi-agent review** (similar to my-workflow but more structured)
- **Cross-platform** (Claude Code, OpenCode, Codex)

### Decision

**Evaluate: Port /compound concept**

The "compound" learning step is valuable. Consider adding similar step to my-workflow or integrating with Everything Claude's instinct system.

---

## 5. call-me

**Repository:** [ZeframLou/call-me](https://github.com/ZeframLou/call-me)
**License:** MIT

### What It Does

Lets Claude Code call you on the phone when tasks complete, get stuck, or need decisions.

### Key Features

- **Minimal plugin** - Single purpose
- **Multi-turn conversations** - Talk through decisions naturally
- **Works anywhere** - Phone, smartwatch, landline
- **Tool-use composable** - Claude can search while on call

### Tools

| Tool | Purpose |
|------|---------|
| initiate_call | Start a phone call |
| continue_call | Continue with follow-up questions |
| speak_to_user | Speak without waiting for response |
| end_call | End the call |

### Requirements

- Phone provider (Telnyx or Twilio)
- OpenAI API key (speech-to-text, text-to-speech)
- ngrok account (webhook tunneling)

### Costs

- Outbound calls: ~$0.007-0.014/min
- Phone number: ~$1-1.15/month
- OpenAI (STT+TTS): ~$0.026/min
- **Total:** ~$0.03-0.04/minute

### Overlap Analysis

- **No overlap** with existing setup
- **Complements:** Any workflow (notification mechanism)

### Decision

**Recommended: Install if mobile workflow needed**

Useful for long-running autonomous tasks. Low priority for typical interactive sessions.

---

## 6. plannotator

**Repository:** [backnotprop/plannotator](https://github.com/backnotprop/plannotator)
**License:** BSL 1.1 (Business Source License)

### What It Does

Visual UI for annotating and reviewing AI agent plans before implementation.

### Key Features

- **Visual markup** - Delete, insert, replace, comment on plans
- **Code review** - Inline diff annotations with line selection
- **Image annotation** - Pen, arrow, circle tools
- **Auto-save** - Obsidian and Bear Notes integration
- **Shareable** - Team collaboration on plan reviews

### Workflow

```
Agent creates plan → Plannotator opens in browser
                          ↓
        User annotates visually (delete/insert/replace/comment)
                          ↓
     Approve → Agent proceeds | Request changes → Feedback to agent
```

### Commands

```
/plannotator-review - Review git diffs with inline annotations
```

### Overlap Analysis

- **Low overlap** with my-workflow
- **Complements:** /plan command (adds visual review layer)

### Unique Value

- **Visual annotation** vs text-based feedback
- **Team sharing** for collaborative review
- **Code review** capabilities with diff views

### License Concern

BSL 1.1 is more restrictive than MIT. Check terms for commercial use.

### Decision

**Evaluate: Consider for team workflows**

Visual annotation is valuable for complex plans. BSL license may be concern.

---

## Summary Matrix

| Repo | Install? | Rationale |
|------|----------|-----------|
| **claude-mem** | **Yes** | Best session continuity, complements instinct system |
| **repomix** | Yes (utility) | Useful tool, no workflow impact |
| **superpowers** | Cherry-pick | Git worktrees valuable, rest duplicates my-workflow |
| **compound-engineering** | Port concept | /compound step valuable, rest duplicates |
| **call-me** | Optional | Useful for mobile/async workflows |
| **plannotator** | Evaluate | Visual review valuable, BSL license concern |

---

## Recommended Action Plan

### Phase 1: Session Continuity (Immediate)

1. Install claude-mem
2. Remove Everything Claude session hooks (superseded)
3. Keep Everything Claude instinct system

### Phase 2: Workflow Enhancement (Next)

1. Port git-worktrees from superpowers to my-workflow
2. Add /compound or /learn step to capture learnings
3. Evaluate plannotator for visual review

### Phase 3: Utilities (As Needed)

1. Install repomix for codebase sharing
2. Consider call-me if mobile workflow needed

---

## Related Documents

- [memory-systems-comparison.md](memory-systems-comparison.md) - claude-mem vs Everything Claude deep dive
- [SPEC.md](SPEC.md) - Everything Claude migration specification
- [RESEARCH.md](RESEARCH.md) - Everything Claude migration research
