# Claude Code Preferences & Decisions

This document tracks preferences, rules, and decisions for Claude Code customization.

---

## Skills, Agents & MCP Servers

### When to Use Which

| Use Case | Best Tool | Why |
|----------|-----------|-----|
| Reusable prompts/templates | **Skill** | Simple, shares conversation context |
| Domain knowledge/standards | **Skill** | Instructions loaded when relevant |
| Quick behavior enhancements | **Skill** | No subprocess overhead |
| Multi-step autonomous tasks | **Agent** | Runs independently, returns results |
| Parallel execution | **Agent** | Multiple agents can run simultaneously |
| Complex exploration/research | **Agent** | Isolated context, thorough investigation |
| External API integration | **MCP Server** | Direct tool access to external services |
| Real-time data from services | **MCP Server** | Live connection to databases, APIs, apps |
| Actions in external systems | **MCP Server** | Create, update, delete in connected services |

### Tool Selection Guide

```
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

Note: Both repos provided code-reviewer agents. Kept both with distinct purposes:
- `code-reviewer.md` — General comprehensive reviews (VoltAgent)
- `code-reviewer-plan.md` — Plan-alignment reviews (obra, works with writing-plans/executing-plans skills)

**MCP Servers — No conflicts found.**
- `notion` — Notion workspace integration (search, read, create, update pages/databases)
- `n8n-mcp` — n8n workflow automation (create, manage, execute workflows)

### Bundled Items

Some skills/agents contain sub-items in nested folders:

| Bundle | Contains |
|--------|----------|
| `skills/document-skills/` | `docx/`, `pdf/`, `pptx/`, `xlsx/` |

Each sub-folder has its own `SKILL.md` with type-specific instructions.

### Installation Rules

Applies to skills, agents, and MCP servers:

1. **Avoid duplicates** — Before installing, check if a similar one exists
2. **Clean install preferred** — When updating, delete the old directory first:
   ```bash
   rm -rf skills/my-skill && cp -R /source/my-skill skills/
   rm -rf agents/my-agent && cp -R /source/my-agent agents/
   ```
3. **Naming convention** — Use kebab-case for directories (e.g., `my-skill-name`, `my-agent-name`)
4. **Check for overlap** — If two items do similar things, keep only one or ensure they handle distinct use cases
5. **MCP server config** — Store in `.mcp.json` (project-level, gitignored for API keys) or `~/.claude.json` (user-level)

### Priority & Conflicts

When multiple skills/agents could handle a request:
- Skills: Both loaded into context (may cause unpredictable behavior if conflicting)
- Agents: User/Claude chooses which to invoke

**Resolution**: Remove duplicates or ensure clear separation of concerns

### Scaling Considerations

**Skills:**
| Concern | Impact | Notes |
|---------|--------|-------|
| Context bloat | Medium | More skills loaded = more tokens per request |
| Conflicts | Medium | Similar skills may give contradictory instructions |
| Noise | Low | Wrong skill may activate for your request |
| Maintenance | Low | More to update when things change |

*Skills only load when relevant — unused ones don't cost much.*

**Agents:**
| Concern | Impact | Notes |
|---------|--------|-------|
| Minimal overhead | Very Low | Only run when explicitly called |

*Install freely — agents are just available options until invoked.*

**MCP Servers:**
| Concern | Impact | Notes |
|---------|--------|-------|
| Startup time | Low-Medium | Each server initializes when Claude Code starts |
| Resource usage | Medium | Running processes/connections during session |
| API costs | Varies | Some services charge per call |
| Credential management | Medium | More API keys to secure/rotate |
| Rate limits | Varies | External APIs may throttle |

*Be selective with MCP servers — each one is an active dependency.*

### MCP Server Types

| Type | How it works | Example |
|------|--------------|---------|
| **stdio** | Local process spawned when Claude Code starts, killed on exit | `n8n-mcp` |
| **http** | Remote server, connection made on demand, no local process | `notion` |

MCP servers are **not always running** — they start with Claude Code sessions and can be enabled/disabled per project.

---

## Directory Structure

```
~/.claude/
├── skills/     → symlink to this project's skills/
├── agents/     → symlink to this project's agents/
└── ...

/Users/royengel/Projects/Claude Code/claude-customizations/
├── skills/           # All installed skills
├── agents/           # Custom agents
├── commands/         # Slash commands (symlinked to ~/.claude/commands)
├── mcp/              # MCP server docs/configs
├── CLAUDE.md         # Auto-loaded by Claude Code
├── PREFERENCES.md    # This file (referenced by CLAUDE.md)
└── .mcp.json         # MCP server config (gitignored)
```

---

## Session Management

### Resuming Conversations

| Command | Purpose |
|---------|---------|
| `claude --continue` | Resume most recent conversation in current directory |
| `claude --resume` | Interactive picker for all sessions |
| `claude --resume <name>` | Resume specific named session |

### Best Practice

Always name important sessions with `/rename <name>` for easy retrieval later.

---

## Context Preservation Strategies

Long conversations degrade as context compacts. Use these strategies to stay on course:

### 1. Write Plans to Files (Recommended)

Before executing, dump your plan to a file:
```
PLAN.md or .claude/scratchpad.md
```
Files survive context compaction. Re-read anytime to stay aligned.

### 2. Use Subagents for Execution

After gathering context, delegate execution to fresh agents:
```
"Use the Task tool to implement X based on the plan in PLAN.md"
```
Subagents start with clean 200K context and can read your plan file.

### 3. Break Into Separate Conversations

When you finish research/planning:
1. Have Claude write findings to a file (e.g., `CONTEXT.md`)
2. Start a new conversation
3. Begin with "Read CONTEXT.md and continue implementing..."

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
```
"Summarize our current state and next steps to a file"
```

### Quick Reference

| Strategy | When to Use |
|----------|-------------|
| PLAN.md file | Multi-step tasks, before execution phase |
| Subagents | Discrete tasks that can run independently |
| New conversation | Topic shift, context feels degraded |
| TodoWrite | Track progress, maintain focus |
| Plan mode | Architectural decisions, multi-file changes |
| Periodic anchoring | Long sessions (10+ messages) |

**Golden Rule**: Files are permanent; conversation context is not.

---

## Behavioral Rules

### Context-First Data Retrieval

**Trigger:** Any request to "load", "read", "check", or "follow" rules/content from external sources (Notion, APIs, files).

**Before making external API calls, ALWAYS:**

1. **Check existing context first**
   - Read MCP memory for previously stored content
   - Review conversation summary for already-extracted information
   - Check if the data was loaded in a previous session

2. **If content exists in memory/context:**
   - Confirm rules are present
   - State "ready" or summarize what's loaded
   - Do NOT re-fetch from source

3. **If content does NOT exist:**
   - Fetch only what's needed
   - For large documents (Notion pages with nested blocks): extract key rules, not full content
   - Stop when you have actionable information

**Never:**
- Re-fetch data that's already in memory or conversation context
- Chase nested content (toggles, children) when top-level summaries suffice
- Interpret "load rules" as "fetch complete document structure"
- Make multiple sequential API calls when a summary already exists

**Why this matters:**
- Notion pages can exceed 80K+ characters
- Nested block fetching multiplies API calls (6-10+ per document)
- Token limits cause failures and file dumps
- User time is wasted on redundant operations

**"Load" means:** Verify rules are accessible and follow them. Not: re-download everything.

---

## Skills vs Agents

| Aspect | Skills | Agents |
|--------|--------|--------|
| What they are | Markdown prompts/instructions | Subprocesses via Task tool |
| Location | `skills/` directory | Built-in or `agents/` directory |
| Invocation | `/skill-name` or auto-matched | Task tool with `subagent_type` |
| Context | Shares main conversation | Isolated subprocess |
| Use case | Reusable prompts, domain knowledge | Multi-step autonomous tasks |

---

## Installed MCP Servers

### Active (no auth required)

| Server | Purpose | Capabilities |
|--------|---------|--------------|
| `notion` | Notion workspace | Search, fetch, create/update pages & databases, manage comments |
| `n8n-mcp` | Workflow automation | Create/manage n8n workflows, search nodes, deploy templates, execute workflows |
| `sequential-thinking` | Structured reasoning | Break complex problems into logical steps |
| `filesystem` | Local file access | Read, write, edit files in home directory |
| `memory` | Persistent memory | Context retention across sessions |
| `puppeteer` | Browser automation | Web scraping, testing, UI automation |

### Disabled (needs credentials)

| Server | Purpose | Setup Required |
|--------|---------|----------------|
| `github` | GitHub integration | GitHub Personal Access Token |
| `postgres` | Database queries | PostgreSQL connection string |
| `apidog` | API specs to code | OpenAPI spec URL or path |
| `figma` | Design to code | Figma API key |

To enable disabled servers, edit `.mcp.json`:
1. Add your credentials
2. Set `"disabled": false`

### MCP Server Selection

| Need | Server |
|------|--------|
| Note-taking, documentation, databases | `notion` |
| Workflow automation, integrations | `n8n-mcp` |
| Complex problem solving | `sequential-thinking` |
| File operations | `filesystem` |
| Cross-session memory | `memory` |
| Web automation, scraping | `puppeteer` |
| GitHub repos, PRs, issues | `github` (needs token) |
| Database queries | `postgres` (needs connection) |
| API development | `apidog` (needs spec) |
| Design implementation | `figma` (needs token) |

---

## Skill & Agent Resources

| Resource | Description |
|----------|-------------|
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | Curated skills collection (installed) |
| [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | Curated list with community skills |
| [obra/superpowers](https://github.com/obra/superpowers) | 14 skills + 1 agent: TDD, debugging, git workflows, code review (installed) |
| [K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills) | 125+ scientific skills: drug discovery, bioinformatics, ML |
| [anthropics/skills](https://github.com/anthropics/skills) | Official Anthropic skills repository |
| [BehiSecc/awesome-claude-skills](https://github.com/BehiSecc/awesome-claude-skills) | Curated list with 50+ skills |
| [zxkane/aws-skills](https://github.com/zxkane/aws-skills) | AWS skills: CDK, serverless, cost ops (installed) |
| [michalparkola/tapestry-skills](https://github.com/michalparkola/tapestry-skills-for-claude-code) | YouTube transcripts, article extraction (installed) |
| [raintree-technology/claude-starter](https://github.com/raintree-technology/claude-starter) | 40+ skills starter pack (cherry-picked: anthropic, ios, supabase) |
| [VoltAgent/awesome-claude-skills](https://github.com/VoltAgent/awesome-claude-skills) | Community skills collection |
| [PleasePrompto/notebooklm-skill](https://github.com/PleasePrompto/notebooklm-skill) | NotebookLM integration (installed) |
| [czlonkowski/n8n-skills](https://github.com/czlonkowski/n8n-skills) | n8n workflow skills - complements n8n-mcp (installed) |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | 125 specialized Task tool agents (installed) |
| [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | Curated directory of Claude Code resources |
| [glittercowboy/taches-cc-resources](https://github.com/glittercowboy/taches-cc-resources) | TÂCHES: 8 skills + 3 agents + 29 commands (installed) |
| [NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit) | CEK: 5 skills + 13 agents + 37 commands (installed) |

---

## Installed Skills

Source: [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills), [alonw0/web-asset-generator](https://github.com/alonw0/web-asset-generator), [glittercowboy/taches-cc-resources](https://github.com/glittercowboy/taches-cc-resources), [NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit)

### By Category

**Development**
- artifacts-builder
- changelog-generator
- mcp-builder
- skill-creator
- webapp-testing

**Documents**
- document-skills (docx, pdf, pptx, xlsx)

**Business**
- brand-guidelines
- competitive-ads-extractor
- domain-name-brainstormer
- internal-comms
- lead-research-assistant

**Writing**
- content-research-writer
- meeting-insights-analyzer

**Creative**
- canvas-design
- image-enhancer
- slack-gif-creator
- theme-factory
- video-downloader
- web-asset-generator

**Productivity**
- file-organizer
- invoice-organizer
- raffle-winner-picker

**Meta**
- skill-assistant
- skill-share
- template-skill
- using-superpowers
- writing-skills

**Workflow (from obra/superpowers)**
- brainstorming
- dispatching-parallel-agents
- executing-plans
- writing-plans

**Development Practices (from obra/superpowers)**
- test-driven-development
- systematic-debugging
- verification-before-completion
- subagent-driven-development

**Code Review (from obra/superpowers)**
- requesting-code-review
- receiving-code-review

**Git (from obra/superpowers)**
- using-git-worktrees
- finishing-a-development-branch

**AWS (from zxkane/aws-skills)**
- aws-agentic-ai
- aws-cdk-development
- aws-cost-operations
- aws-serverless-eda

**Media**
- youtube-transcript

**Learning**
- ship-learn-next

**Move/Blockchain**
- move-code-quality-skill

**Git Automation**
- git-pushing

**Platform/API (from claude-starter)**
- anthropic
- ios
- supabase

**NotebookLM**
- notebooklm

**n8n Workflow (complements n8n-mcp server)**
- n8n-code-javascript
- n8n-code-python
- n8n-expression-syntax
- n8n-mcp-tools-expert
- n8n-node-configuration
- n8n-validation-expert
- n8n-workflow-patterns

**TÂCHES (from glittercowboy/taches-cc-resources)**
- taches-create-agent-skills
- taches-create-hooks
- taches-create-meta-prompts
- taches-create-plans
- taches-create-slash-commands
- taches-create-subagents
- taches-debug-like-expert
- taches-expertise

**Context Engineering Kit (from NeoLabHQ/context-engineering-kit)**
- cek-kaizen
- cek-prompt-engineering
- cek-software-architecture
- cek-subagent-driven-development
- cek-test-driven-development

---

## Installed Agents

Source: [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents), [glittercowboy/taches-cc-resources](https://github.com/glittercowboy/taches-cc-resources), [NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit)

### By Category

**Core Development (11)**
- api-designer, backend-developer, electron-pro, frontend-developer, fullstack-developer
- graphql-architect, microservices-architect, mobile-developer, ui-designer
- websocket-engineer, wordpress-master

**Language Specialists (26)**
- angular-architect, cpp-pro, csharp-developer, django-developer, dotnet-core-expert
- dotnet-framework-4.8-expert, flutter-expert, golang-pro, java-architect, javascript-pro
- kotlin-specialist, laravel-specialist, nextjs-developer, php-pro, powershell-5.1-expert
- powershell-7-expert, python-pro, rails-expert, react-specialist, rust-engineer
- spring-boot-engineer, sql-pro, swift-expert, typescript-pro, vue-expert

**Infrastructure (14)**
- azure-infra-engineer, cloud-architect, database-administrator, deployment-engineer
- devops-engineer, devops-incident-responder, incident-responder, kubernetes-specialist
- network-engineer, platform-engineer, security-engineer, sre-engineer
- terraform-engineer, windows-infra-admin

**Quality & Security (13)**
- accessibility-tester, architect-reviewer, chaos-engineer, code-reviewer
- code-reviewer-plan (obra), compliance-auditor, debugger, error-detective
- penetration-tester, performance-engineer, powershell-security-hardening, qa-expert, test-automator

**Data & AI (12)**
- ai-engineer, data-analyst, data-engineer, data-scientist, database-optimizer
- llm-architect, machine-learning-engineer, ml-engineer, mlops-engineer
- nlp-engineer, postgres-pro, prompt-engineer

**Developer Experience (12)**
- build-engineer, cli-developer, dependency-manager, documentation-engineer
- dx-optimizer, git-workflow-manager, legacy-modernizer, mcp-developer
- powershell-module-architect, powershell-ui-architect, refactoring-specialist, tooling-engineer

**Specialized Domains (12)**
- api-documenter, blockchain-developer, embedded-systems, fintech-engineer
- game-developer, iot-engineer, m365-admin, mobile-app-developer
- payment-integration, quant-analyst, risk-manager, seo-specialist

**Business & Product (10)**
- business-analyst, content-marketer, customer-success-manager, legal-advisor
- product-manager, project-manager, sales-engineer, scrum-master
- technical-writer, ux-researcher

**Meta & Orchestration (9)**
- agent-organizer, context-manager, error-coordinator, it-ops-orchestrator
- knowledge-synthesizer, multi-agent-coordinator, performance-monitor
- task-distributor, workflow-orchestrator

**Research & Analysis (7)**
- competitive-analyst, data-researcher, market-researcher, research-analyst
- search-specialist, trend-analyst

**TÂCHES Auditors (3)**
- skill-auditor, slash-command-auditor, subagent-auditor

**Context Engineering Kit (13)**
- cek-bug-hunter, cek-business-analyst, cek-code-explorer, cek-code-quality-reviewer
- cek-contracts-reviewer, cek-developer, cek-historical-context-reviewer
- cek-researcher, cek-security-auditor, cek-software-architect
- cek-tech-lead, cek-tech-writer, cek-test-coverage-reviewer

---

## CLI Flags

Command-line options when launching Claude Code:

| Flag | Description |
|------|-------------|
| `--continue` | Resume most recent conversation in current directory |
| `--resume` | Interactive picker for all sessions |
| `--resume <id>` | Resume specific session by ID |
| `--print` | Print response without interactive mode |
| `--output-format` | Output format: text, json, stream-json |
| `--model <model>` | Specify model (sonnet, opus, haiku) |
| `--permission-mode` | Set permission mode: default, plan, bypassPermissions |
| `--allowedTools` | Comma-separated list of allowed tools |
| `--disallowedTools` | Comma-separated list of disallowed tools |
| `--mcp-config` | Path to MCP config file |
| `--add-dir <path>` | Add directory to context |
| `--verbose` | Enable verbose logging |
| `--dangerously-skip-permissions` | Skip all permission prompts (use with caution) |
| `-p, --prompt <text>` | Start with initial prompt |
| `-h, --help` | Show help |
| `-v, --version` | Show version |

---

## Native Commands (Built-in)

These are Claude Code's built-in slash commands:

| Command | Description |
|---------|-------------|
| `/bug` | Report bugs (sends conversation to Anthropic) |
| `/clear` | Clear conversation history |
| `/compact` | Compact conversation to save context |
| `/config` | Open config panel |
| `/cost` | Show token usage and cost |
| `/doctor` | Check Claude Code health/setup |
| `/help` | Show help |
| `/init` | Initialize CLAUDE.md in current directory |
| `/login` | Switch Anthropic accounts |
| `/logout` | Sign out |
| `/mcp` | Show MCP server status |
| `/memory` | Edit CLAUDE.md files |
| `/model` | Switch model (Sonnet/Opus/Haiku) |
| `/permissions` | Manage tool permissions |
| `/pr-comments` | View PR comments |
| `/review` | Request code review |
| `/status` | Show session status |
| `/terminal-setup` | Configure terminal integration |
| `/vim` | Toggle vim mode |

---

## Installed Commands

Source: [obra/superpowers](https://github.com/obra/superpowers), [glittercowboy/taches-cc-resources](https://github.com/glittercowboy/taches-cc-resources), [NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit)

**obra/superpowers (3)**
- /brainstorm, /execute-plan, /write-plan

**TÂCHES (29)**
- /add-to-todos, /audit-skill, /audit-slash-command, /audit-subagent
- /check-todos, /create-agent-skill, /create-hook, /create-meta-prompt
- /create-plan, /create-prompt, /create-slash-command, /create-subagent
- /debug, /heal-skill, /run-plan, /run-prompt, /whats-next
- /consider:10-10-10, /consider:5-whys, /consider:eisenhower-matrix
- /consider:first-principles, /consider:inversion, /consider:occams-razor
- /consider:one-thing, /consider:opportunity-cost, /consider:pareto
- /consider:second-order, /consider:swot, /consider:via-negativa

**Context Engineering Kit (37)**
- /cek-review-local-changes, /cek-review-pr, /cek-setup-code-formating
- /cek-analyse-problem, /cek-analyse, /cek-cause-and-effect
- /cek-plan-do-check-act, /cek-root-cause-tracing, /cek-why
- /cek-critique, /cek-memorize, /cek-reflect
- /cek-00-setup, /cek-01-specify, /cek-02-plan, /cek-03-tasks
- /cek-04-implement, /cek-05-document, /cek-brainstorm
- /cek-create-ideas, /cek-fix-tests, /cek-write-tests
- /cek-analyze-issue, /cek-attach-review-to-pr, /cek-commit, /cek-create-pr
- /cek-load-issues, /cek-build-mcp, /cek-setup-arxiv-mcp
- /cek-setup-codemap-cli, /cek-setup-context7-mcp, /cek-setup-serena-mcp
- /cek-apply-anthropic-skill-best-practices, /cek-create-command
- /cek-create-hook, /cek-create-skill, /cek-test-prompt, /cek-test-skill
- /cek-add-typescript-best-practices

---

## Changelog

| Date | Change |
|------|--------|
| 2024-12-22 | Initial document created |
| 2024-12-22 | Installed 23 skills from awesome-claude-skills |
| 2024-12-22 | Set up symlinks for ~/.claude/skills and ~/.claude/agents |
| 2024-12-22 | Unified skills & agents management with decision criteria |
| 2024-12-22 | Added MCP servers to tool selection framework (notion, n8n-mcp) |
| 2024-12-22 | Added scaling considerations and MCP server types (stdio vs http) |
| 2024-12-22 | Added skill resources section; installed web-asset-generator |
| 2024-12-22 | Installed obra/superpowers (14 skills + code-reviewer agent) |
| 2024-12-22 | Installed commands: /brainstorm, /write-plan, /execute-plan |
| 2024-12-22 | Installed youtube-transcript and aws-skills (4 AWS skills) |
| 2024-12-22 | Fixed obra/superpowers installation; added ship-learn-next, move-code-quality-skill, git-pushing |
| 2024-12-22 | Cherry-picked from claude-starter: anthropic, ios, supabase (replaced anthropic-best-practices.md) |
| 2024-12-22 | Installed notebooklm skill and n8n-skills (7 skills complementing n8n-mcp server) |
| 2024-12-22 | Installed 125 agents from VoltAgent/awesome-claude-code-subagents |
| 2024-12-22 | Kept both code-reviewers: code-reviewer (VoltAgent, general) + code-reviewer-plan (obra, plan-alignment) |
| 2024-12-22 | Installed TÂCHES: 8 skills, 3 agents, 29 commands (including 12 /consider: thinking models) |
| 2024-12-22 | Installed Context Engineering Kit: 5 skills, 13 agents, 37 commands |
| 2024-12-22 | Added Native Commands (Built-in) reference section |
| 2024-12-22 | Added CLI Flags reference section (--continue, --resume, etc.) |
| 2024-12-22 | Installed 8 new MCP servers: sequential-thinking, filesystem, memory, puppeteer, github, postgres, apidog, figma |
| 2024-12-24 | Added "Context-First Data Retrieval" behavioral rule to prevent redundant API fetching |
