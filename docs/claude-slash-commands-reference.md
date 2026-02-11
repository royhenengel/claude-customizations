# Slash Command Reference

All slash commands available in Claude Code: native built-ins and custom skills.

**Total:** 91 custom skills + 11 native commands

---

## Native Claude Code Commands

| Command | Purpose |
|---------|---------|
| `/help` | Show all available commands |
| `/clear` | Clear conversation history |
| `/compact` | Summarize older messages to reduce context |
| `/config` | Configure settings interactively |
| `/allowed-tools` | Configure tool permissions |
| `/mcp` | Manage MCP servers |
| `/agents` | Manage and create subagents |
| `/hooks` | Configure hooks |
| `/vim` | Enable vim-style editing mode |
| `/terminal-setup` | Install terminal shortcuts |
| `/install-github-app` | Set up GitHub Actions integration |

---

## Custom Skills

### Planning & Workflow

| Command | Purpose |
|---------|---------|
| `/my-workflow` | Core workflow system (principles, stage awareness) |
| `/start` | Initialize project with planning structure |
| `/plan` | Plan work with spec-driven approach |
| `/build` | Execute plan with subagent delegation |
| `/status` | Show project planning status and progress |
| `/handoff` | Create handoff document for session continuity |
| `/stop` | Pause work cleanly (deprecated) |
| `/brainstorming` | Explore intent and requirements before implementation |
| `/living-requirements` | Manage living product requirements |
| `/cek` | Specification Driven Development methodology |

---

## Code Quality

| Command | Purpose |
|---------|---------|
| `/fix` | Fix workflow with root cause analysis |
| `/debug` | Systematic debugging workflow |
| `/test` | Run or create tests with coverage analysis |
| `/review` | Code review |
| `/analyse` | Analyze codebase, file, or pattern |
| `/map-codebase` | Analyze existing codebase structure |
| `/debugging-practices` | Deep analysis debugging for complex issues |
| `/quality-practices` | Continuous improvement with root cause analysis |
| `/software-development-practices` | Clean Architecture, TDD, subagent execution |
| `/webapp-testing` | Test local web apps using Playwright |

---

## Git & Version Control

| Command | Purpose |
|---------|---------|
| `/commit` | Smart conventional commits with analysis |
| `/git-pushing` | Stage, commit, and push changes |
| `/git-worktrees` | Create isolated git worktrees for features |
| `/pr` | Create a pull request with analysis |
| `/changelog-generator` | Generate changelogs from git commits |

---

## Documentation & Design

| Command | Purpose |
|---------|---------|
| `/diagrams-builder` | Create diagrams (Mermaid, PlantUML, Draw.io) |
| `/docx` | Create, edit, analyze Word documents |
| `/pdf` | PDF manipulation (extract, create, merge, forms) |
| `/pptx` | Create, edit, analyze presentations |
| `/xlsx` | Create, edit, analyze spreadsheets |
| `/canvas-design` | Create visual art in PNG/PDF |
| `/brand-guidelines` | Apply Anthropic brand colors and typography |
| `/theme-factory` | Style artifacts with preset or custom themes |
| `/web-asset-generator` | Generate favicons, app icons, social images |
| `/artifacts-builder` | Multi-component HTML artifacts (React, shadcn/ui) |

---

## Prompts & Meta

| Command | Purpose |
|---------|---------|
| `/prompt-engineering` | Write and optimize prompts for LLMs |
| `/create-prompt` | Create a prompt for another Claude to execute |
| `/create-meta-prompt` | Create prompts for Claude-to-Claude pipelines |
| `/run-prompt` | Delegate prompts to sub-task contexts |

---

## Tooling & Creation

| Command | Purpose |
|---------|---------|
| `/skill-creation` | Find, create, configure, validate skills |
| `/create-agent-skill` | Create or edit skills with expert guidance |
| `/create-subagent` | Create specialized subagents |
| `/subagent-design` | Expert guidance for subagents and Task tool |
| `/hook-builder` | Create and configure Claude Code hooks |
| `/create-hook` | Invoke hook-builder for hook development |
| `/slash-command-builder` | Create slash commands with YAML config |
| `/create-slash-command` | Create a new slash command |
| `/mcp-builder` | Create MCP servers (Python/TypeScript) |
| `/heal-skill` | Heal skill documentation with corrections |
| `/file-organizer` | Organize files and folders intelligently |

---

## Audit

| Command | Purpose |
|---------|---------|
| `/audit-skill` | Audit skill for YAML, XML, best practices |
| `/audit-slash-command` | Audit slash command for quality |
| `/audit-subagent` | Audit subagent configuration |

---

## Instinct System

| Command | Purpose |
|---------|---------|
| `/instinct-bootstrap` | Bootstrap instincts from AI Chat Prefs |
| `/instinct-status` | Show instincts with confidence scores |
| `/instinct-import` | Import instincts from file or URL |
| `/instinct-export` | Export instincts to file |
| `/evolve` | Analyze patterns and suggest evolved capabilities |

---

## Learning & Knowledge

| Command | Purpose |
|---------|---------|
| `/compound` | Document solved problems for future reference |
| `/ship-learn-next` | Transform learning content into action plans |

---

## Todos

| Command | Purpose |
|---------|---------|
| `/check-todos` | List outstanding todos |
| `/add-to-todos` | Add todo item with conversation context |

---

## Notion Integration

| Command | Purpose |
|---------|---------|
| `/notion-search` | Search Notion workspace |
| `/notion-find` | Find pages or databases by title |
| `/notion-create-page` | Create a new Notion page |
| `/notion-create-task` | Create a task in Notion tasks database |
| `/notion-create-database-row` | Insert a row into a Notion database |
| `/notion-database-query` | Query a Notion database |
| `/notion-meeting-intelligence` | Prepare meeting materials from Notion |
| `/notion-research-docs` | Synthesize Notion content into research docs |
| `/notion-knowledge-capture` | Transform conversations into Notion docs |
| `/notion-spec-to-implementation` | Turn specs into Notion implementation tasks |

---

## Platform

| Command | Purpose |
|---------|---------|
| `/n8n` | n8n workflow automation expertise |
| `/home-assistant-manager` | Home Assistant configuration management |
| `/notebooklm` | Query Google NotebookLM notebooks |

---

## Communications

| Command | Purpose |
|---------|---------|
| `/internal-comms` | Write internal communications |
| `/meeting-insights-analyzer` | Analyze meeting transcripts for insights |

---

## Research

| Command | Purpose |
|---------|---------|
| `/content-research-writer` | Research and write high-quality content |

---

## Plugin Commands

| Command | Purpose |
|---------|---------|
| `/hookify` | Create hooks to prevent unwanted behaviors |
| `/plannotator:plannotator-review` | Interactive code review for changes |
| `/claude-mem:do` | Execute a plan using subagents |
| `/claude-mem:make-plan` | Create implementation plan with docs discovery |

---

*Auto-generated catalog. Regenerate via docs-enforcer agent.*
