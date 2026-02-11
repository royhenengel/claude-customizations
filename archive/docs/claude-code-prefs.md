This document tracks preferences, rules, and decisions for Claude Code customization.

---

## Skills, Agents & MCP Servers

### When to Use Which

### Tool Selection Guide

```plain text
Need to extend Claude's knowledge/behavior?
├── Static instructions or templates? → Skill
├── Autonomous multi-step work? → Agent
└── Connect to external service/API? → MCP Server

Need to interact with external system?
├── Read/write data? → MCP Server
├── One-time API call? → Skill (with fetch) or MCP Server
└── Complex workflow automation? → MCP Server + Agent
```

### Overlap Analysis (Last checked: 2024-12-22)

**Skills — No conflicts found.**

Checked pairs:

- `skill-assistant` vs `skill-creator` — **Complementary**, not conflicting. One finds/installs skills, the other guides creation.

- `anthropic` (new) replaced `anthropic-best-practices.md` (loose file) — new skill is more comprehensive.

**Agents — 142 installed.**

Sources:

- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) (125 agents)

- [obra/superpowers](https://github.com/obra/superpowers) (1 agent)

- [glittercowboy/taches-cc-resources](https://github.com/glittercowboy/taches-cc-resources) (3 agents)

- [NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit) (13 agents)

- [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) (9 agents) — Hackathon-winning config with session hooks, rules system, continuous learning

- [glittercowboy/get-shit-done](https://github.com/glittercowboy/get-shit-done) (11 agents) — Meta-prompting system with context engineering, 6-step workflow cycle

Note: Both repos provided code-reviewer agents. Kept both with distinct purposes:

- `code-reviewer.md` — General comprehensive reviews (VoltAgent)

- `code-reviewer-plan.md` — Plan-alignment reviews (obra, works with writing-plans/executing-plans skills)

**MCP Servers — No conflicts found.**

- `notion` — Notion workspace integration (search, read, create, update pages/databases)

- `n8n-mcp` — n8n workflow automation (create, manage, execute workflows)

### Bundled Items

Some skills/agents contain sub-items in nested folders:

Each sub-folder has its own `SKILL.md` with type-specific instructions.

### Installation Rules

Applies to skills, agents, and MCP servers:

1. **Avoid duplicates** — Before installing, check if a similar one exists

1. **Clean install preferred** — When updating, delete the old directory first:

```bash
   rm -rf skills/my-skill && cp -R /source/my-skill skills/
   rm -rf agents/my-agent && cp -R /source/my-agent agents/
```

1. **Naming convention** — Use kebab-case for directories (e.g., `my-skill-name`, `my-agent-name`)

1. **Check for overlap** — If two items do similar things, keep only one or ensure they handle distinct use cases

1. **MCP server config** — Store in `.mcp.json` (project-level, gitignored for API keys) or `~/.claude.json` (user-level)

### Priority & Conflicts

When multiple skills/agents could handle a request:

- Skills: Both loaded into context (may cause unpredictable behavior if conflicting)

- Agents: User/Claude chooses which to invoke

**Resolution**: Remove duplicates or ensure clear separation of concerns

### Scaling Considerations

**Skills:**

*Skills only load when relevant — unused ones don't cost much.*

**Agents:**

*Install freely — agents are just available options until invoked.*

**MCP Servers:**

*Be selective with MCP servers — each one is an active dependency.*

### MCP Server Types

MCP servers are **not always running** — they start with Claude Code sessions and can be enabled/disabled per project.

---

## Directory Structure

```plain text
~/.claude/
├── skills/     → symlink to this project's skills/
├── agents/     → symlink to this project's agents/
└── ...

/Users/royengel/Projects/Claude Code/claude-customizations/
├── skills/           # All skills (17 groups + depth-2 symlinks for discovery)
├── agents/           # Custom agents
├── archive/          # Archived items (original commands/, etc.)
├── mcp/              # MCP server docs/configs
├── docs/             # Preferences and documentation
├── CLAUDE.md         # Auto-loaded by Claude Code
└── .mcp.json         # MCP server config (gitignored)
```

---

## Session Management

### Resuming Conversations

### Best Practice

Always name important sessions with `/rename <name>` for easy retrieval later.

---

## Context Preservation Strategies

Long conversations degrade as context compacts. Use these strategies to stay on course:

### 1. Write Plans to Files (Recommended)

Before executing, dump your plan to a file:

```plain text
PLAN.md or .claude/scratchpad.md
```

Files survive context compaction. Re-read anytime to stay aligned.

### 2. Use Subagents for Execution

After gathering context, delegate execution to fresh agents:

```plain text
"Use the Task tool to implement X based on the plan in PLAN.md"
```

Subagents start with clean 200K context and can read your plan file.

### 3. Break Into Separate Conversations

When you finish research/planning:

1. Have Claude write findings to a file (e.g., `CONTEXT.md`)

1. Start a new conversation

1. Begin with "Read CONTEXT.md and continue implementing..."

### 4. Use TodoWrite Aggressively

The todo list persists better than conversation context. Add detailed notes in task descriptions, not just titles.

### 5. Use Plan Mode for Complex Tasks

Say "enter plan mode" — this creates a dedicated plan file that becomes the source of truth. Benefits:

- Forces exploration before proposing changes

- Requires your approval before execution

- Separates thinking from doing

- Catches ambiguity early

- Creates a checkpoint if execution goes wrong

### 6. Periodic Anchoring

Every 10-15 messages on long tasks:

```plain text
"Summarize our current state and next steps to a file"
```

### Quick Reference

**Golden Rule**: Files are permanent; conversation context is not.

---

## Behavioral Rules

### Context-First Data Retrieval

**Trigger:** Any request to "load", "read", "check", or "follow" rules/content from external sources (Notion, APIs, files).

**Before making external API calls, ALWAYS:**

1. **Check existing context first**

### Git Commit Verification

**Trigger:** Any request to commit changes.

**Before committing, ALWAYS:**

1. Review all staged changes (`git status`)
2. Verify each staged file relates to the current task
3. Unstage unrelated changes before proceeding
4. Never assume pre-staged changes are intentional

### Verification Before Recommendation

**Trigger:** Any request for a solution, fix, or recommendation.

**Rules:**

1. **Research before recommending.** Treat solution requests as "research then recommend", not "brainstorm options." Verify feasibility before presenting.
2. **Never present unverified solutions.** If you haven't confirmed something works, say so explicitly. Do not present unverified ideas as options in comparison tables or recommendation lists.
3. **Check project docs first.** Before proposing changes, read existing documentation for prior decisions, failed approaches, and rationale. This project uses `planning/specs/{feature}/` with RESEARCH.md, SPEC.md, PLAN.md, SUMMARY.md.
4. **State uncertainty explicitly.** "This might work but I haven't confirmed it" is acceptable. Presenting guesses as validated options is not.
5. **Verify primary sources, not just documentation about them.** Documentation labels (e.g., "thin wrapper", "deprecated", "unused") are categorizations, not facts. Always inspect the actual artifact (file, code, config) before acting on what a document says about it.

**Why:** The user's trust depends on accuracy. Plausible-sounding suggestions that turn out to be wrong or already rejected waste time and erode confidence.

### Proposal Validation

**Trigger:** Before proposing any structural, architectural, or design change.

**Before presenting a solution, ALWAYS:**

1. Pick one concrete scenario the user described
2. Walk through it step-by-step with the proposed solution
3. Trace data flow at each step (where does X come from? where does it go?)
4. Only present if the walkthrough succeeds

**Why:** Solutions that "sound reasonable" often break when simulated. The user shouldn't have to catch flaws that would surface from a simple walkthrough.
