# Claude Code Commands Reference

Complete reference for all Claude Code commands: native CLI interface, built-in commands, keyboard shortcuts, and custom slash commands.

---

## Table of Contents

**Part 1: Native CLI Commands**
1. [CLI Entry Points](#cli-entry-points)
2. [CLI Flags](#cli-flags)
3. [Built-in Slash Commands](#built-in-slash-commands)
4. [Keyboard Shortcuts](#keyboard-shortcuts)

**Part 2: Custom Slash Commands**
5. [Core Commands](#core-commands)
6. [CEK Workflow Commands](#cek-workflow-commands)
7. [Consider Commands (Mental Models)](#consider-commands-mental-models)

---

# Part 1: Native CLI Commands

## CLI Entry Points

### Main Commands

#### `claude`
**Description:** Launch Claude Code in interactive mode.

**Usage:**
```bash
claude
```

Opens the Claude Code REPL in the current directory.

---

#### `claude "query"`
**Description:** Start Claude Code with an initial prompt.

**Usage:**
```bash
claude "explain this codebase"
claude "fix the failing tests"
```

Launches interactive mode and immediately processes the given query.

---

#### `claude --continue`
**Description:** Resume the most recent conversation in the current directory.

**Usage:**
```bash
claude --continue
claude -c
```

Picks up where you left off in your last session for this directory.

---

#### `claude --resume`
**Description:** Interactive picker to select from all previous sessions.

**Usage:**
```bash
claude --resume
claude --resume "session-name"
claude --resume abc123
```

Without arguments, shows an interactive list. With argument, resumes a specific named session or session ID.

---

#### `claude -p "query"` (Print/Headless Mode)
**Description:** Run Claude in non-interactive (headless) mode, printing output directly.

**Usage:**
```bash
claude -p "what does this function do?"
cat file.py | claude -p "explain this code"
echo "fix this bug" | claude -p
```

Ideal for scripting, pipelines, and automation. Outputs response and exits.

---

### Utility Commands

#### `claude update`
**Description:** Check for and install Claude Code updates.

**Usage:**
```bash
claude update
```

---

#### `claude mcp`
**Description:** Manage MCP (Model Context Protocol) servers.

**Usage:**
```bash
claude mcp list                    # List configured servers
claude mcp add <name> <command>    # Add new server
claude mcp remove <name>           # Remove server
claude mcp get <name>              # Get server config
```

---

#### `claude --version`
**Description:** Display the current Claude Code version.

**Usage:**
```bash
claude --version
claude -v
```

---

#### `claude --help`
**Description:** Display help information and available options.

**Usage:**
```bash
claude --help
claude -h
```

---

#### `claude --doctor`
**Description:** Run diagnostics to check Claude Code health and setup.

**Usage:**
```bash
claude --doctor
```

Checks configuration, authentication, MCP servers, and system requirements.

---

## CLI Flags

### Session Management

| Flag | Description | Example |
|------|-------------|---------|
| `--continue`, `-c` | Resume most recent conversation in current directory | `claude --continue` |
| `--resume` | Interactive session picker or resume specific session | `claude --resume` |
| `--resume <id>` | Resume specific session by ID or name | `claude --resume my-project` |
| `--fork-session` | Fork an existing session to create a branch | `claude --fork-session abc123` |
| `--session-id <id>` | Specify session ID for the conversation | `claude --session-id project-x` |
| `--add-dir <path>` | Add directory to the context | `claude --add-dir ../shared` |

---

### Input/Output

| Flag | Description | Example |
|------|-------------|---------|
| `--print`, `-p` | Print mode - non-interactive, outputs response and exits | `claude -p "query"` |
| `--output-format <format>` | Output format: `text`, `json`, `stream-json` | `claude -p --output-format json "query"` |
| `--input-format <format>` | Input format: `text`, `stream-json` | `claude --input-format stream-json` |
| `--include-partial-messages` | Include partial messages in streaming output | `claude -p --include-partial-messages` |

**Output Format Details:**

- **text**: Plain text output (default for `-p`)
- **json**: Complete JSON response after generation finishes
- **stream-json**: NDJSON streaming with real-time updates

---

### Model Selection

| Flag | Description | Example |
|------|-------------|---------|
| `--model <model>` | Specify the model to use | `claude --model opus` |
| `--fallback-model <model>` | Fallback model if primary is unavailable | `claude --model opus --fallback-model sonnet` |

**Available Models:**
- `sonnet` (Claude 3.5 Sonnet - default)
- `opus` (Claude 3 Opus)
- `haiku` (Claude 3 Haiku)
- Full model IDs also accepted (e.g., `claude-3-5-sonnet-20241022`)

---

### System Prompt

| Flag | Description | Example |
|------|-------------|---------|
| `--system-prompt <text>` | Override the system prompt | `claude --system-prompt "Be concise"` |
| `--system-prompt-file <path>` | Load system prompt from file | `claude --system-prompt-file ./prompt.md` |
| `--append-system-prompt <text>` | Append to default system prompt | `claude --append-system-prompt "Focus on security"` |

---

### Tools

| Flag | Description | Example |
|------|-------------|---------|
| `--tools <list>` | Specify available tools | `claude --tools "Read,Write,Bash"` |
| `--allowedTools <list>` | Comma-separated list of allowed tools | `claude --allowedTools "Read,Glob,Grep"` |
| `--disallowedTools <list>` | Comma-separated list of disallowed tools | `claude --disallowedTools "Bash,Write"` |

**Built-in Tools:**
- `Read` - Read files
- `Write` - Write/create files
- `Edit` - Edit existing files
- `Bash` - Execute shell commands
- `Glob` - Find files by pattern
- `Grep` - Search file contents
- `WebFetch` - Fetch web content
- `WebSearch` - Search the web
- `Task` - Spawn subagent tasks
- `TodoRead` / `TodoWrite` - Manage todo list

---

### Permissions

| Flag | Description | Example |
|------|-------------|---------|
| `--permission-mode <mode>` | Permission mode: `default`, `plan`, `bypassPermissions` | `claude --permission-mode plan` |
| `--dangerously-skip-permissions` | Skip all permission prompts (use with caution) | `claude --dangerously-skip-permissions` |
| `--permission-prompt-tool <tool>` | MCP tool for custom permission prompts | `claude --permission-prompt-tool my-approver` |

**Permission Modes:**

| Mode | Description |
|------|-------------|
| `default` | Prompts for sensitive operations |
| `plan` | Planning mode - read-only, no execution |
| `bypassPermissions` | Dangerous - skips all prompts |

---

### MCP Configuration

| Flag | Description | Example |
|------|-------------|---------|
| `--mcp-config <path>` | Path to MCP configuration file | `claude --mcp-config ./my-mcp.json` |
| `--strict-mcp-config` | Fail if MCP config is invalid | `claude --strict-mcp-config` |

---

### Subagents

| Flag | Description | Example |
|------|-------------|---------|
| `--agent <name>` | Load a specific agent definition | `claude --agent code-reviewer` |
| `--agents <json>` | JSON configuration for available agents | See below |

**Agents JSON Format:**
```json
{
  "agents": [
    {
      "name": "reviewer",
      "description": "Code review specialist",
      "systemPrompt": "You are a code reviewer..."
    }
  ]
}
```

---

### Plugins

| Flag | Description | Example |
|------|-------------|---------|
| `--plugin-dir <path>` | Directory containing plugins to load | `claude --plugin-dir ./plugins` |

---

### IDE Integration

| Flag | Description | Example |
|------|-------------|---------|
| `--ide <ide>` | IDE integration mode | `claude --ide vscode` |
| `--chrome` | Enable Chrome browser integration | `claude --chrome` |
| `--no-chrome` | Disable Chrome browser integration | `claude --no-chrome` |

---

### Output Control

| Flag | Description | Example |
|------|-------------|---------|
| `--max-turns <n>` | Maximum conversation turns | `claude -p --max-turns 5 "query"` |
| `--json-schema <schema>` | JSON schema for structured output | `claude -p --json-schema '{"type":"object"}' "query"` |
| `--verbose` | Enable verbose logging | `claude --verbose` |
| `--debug` | Enable debug mode with detailed output | `claude --debug` |

---

### Advanced

| Flag | Description | Example |
|------|-------------|---------|
| `--betas <list>` | Enable beta features | `claude --betas "feature1,feature2"` |
| `--setting-sources` | Show where settings are loaded from | `claude --setting-sources` |
| `--settings` | Show current settings | `claude --settings` |
| `--enable-lsp-logging` | Enable LSP logging for debugging | `claude --enable-lsp-logging` |

---

## Built-in Slash Commands

### Session Commands

| Command | Description |
|---------|-------------|
| `/clear` | Clear conversation history and start fresh |
| `/exit` | Exit Claude Code |
| `/rename <name>` | Rename current session for easy retrieval |
| `/resume` | Resume a previous session (interactive picker) |
| `/rewind` | Rewind to a previous point in conversation |

---

### Information Commands

| Command | Description |
|---------|-------------|
| `/help` | Show help information |
| `/status` | Show current session status |
| `/cost` | Display token usage and estimated cost |
| `/stats` | Show detailed session statistics |
| `/context` | Show current context and loaded files |
| `/usage` | Display API usage information |
| `/doctor` | Run diagnostics and health checks |
| `/release-notes` | Show latest release notes |

---

### Model Commands

| Command | Description |
|---------|-------------|
| `/model` | Switch model (Sonnet/Opus/Haiku) |
| `/output-style` | Change output style/verbosity |
| `/vim` | Toggle vim mode for input |
| `/config` | Open configuration panel |

---

### File Commands

| Command | Description |
|---------|-------------|
| `/init` | Initialize CLAUDE.md in current directory |
| `/memory` | Edit CLAUDE.md memory files |
| `/add-dir <path>` | Add directory to context |
| `/export` | Export conversation to file |

---

### Security Commands

| Command | Description |
|---------|-------------|
| `/permissions` | Manage tool permissions |
| `/security-review` | Review security implications of actions |

---

### Development Commands

| Command | Description |
|---------|-------------|
| `/pr-comments` | View pull request comments |
| `/review` | Request code review |
| `/install-github-app` | Install GitHub integration |
| `/hooks` | Manage Claude Code hooks |
| `/mcp` | Show MCP server status and management |
| `/ide` | IDE integration settings |
| `/plugin` | Manage plugins |
| `/login` | Sign in or switch Anthropic accounts |
| `/logout` | Sign out of current account |
| `/terminal-setup` | Configure terminal integration |

---

### Specialized Commands

| Command | Description |
|---------|-------------|
| `/compact` | Compact conversation to save context window |
| `/bashes` | List running bash processes |
| `/todos` | View and manage todo list |
| `/sandbox` | Manage sandbox environment |
| `/privacy-settings` | Configure privacy options |

---

## Keyboard Shortcuts

### General Navigation

| Shortcut | Description |
|----------|-------------|
| `Ctrl+C` | Cancel current operation / Clear input |
| `Ctrl+D` | Exit Claude Code |
| `Ctrl+L` | Clear screen |
| `Ctrl+O` | Open file picker |
| `Ctrl+R` | Search command history |
| `Ctrl+V` / `Alt+V` | Paste from clipboard |
| `Ctrl+B` | Toggle sidebar (if available) |
| `Up Arrow` | Previous message / command |
| `Down Arrow` | Next message / command |
| `Esc Esc` | Cancel current action (double escape) |
| `Shift+Tab` / `Alt+M` | Toggle multiline mode |
| `Option+P` / `Alt+P` | Toggle plan mode |
| `?` | Show keyboard shortcuts help |

---

### Multiline Input

| Shortcut | Description |
|----------|-------------|
| `\` + `Enter` | Continue input on new line (escape newline) |
| `Option+Enter` | Insert newline (macOS) |
| `Shift+Enter` | Insert newline |
| `Ctrl+J` | Insert newline (alternative) |

---

### Quick Prefixes

Type these at the start of your input for quick actions:

| Prefix | Description | Example |
|--------|-------------|---------|
| `#` | Add file to context | `#src/main.py` |
| `/` | Slash command | `/help` |
| `!` | Shell command passthrough | `!ls -la` |
| `@` | Mention/reference | `@file.ts` |

---

### Vim Mode

When vim mode is enabled (`/vim`), standard vim keybindings are available:

**Normal Mode:**
| Key | Description |
|-----|-------------|
| `i` | Enter insert mode |
| `a` | Enter insert mode after cursor |
| `o` | New line below and insert |
| `O` | New line above and insert |
| `h/j/k/l` | Move cursor left/down/up/right |
| `w/b` | Move by word forward/backward |
| `0/$` | Move to line start/end |
| `gg/G` | Move to top/bottom |
| `dd` | Delete line |
| `yy` | Yank (copy) line |
| `p` | Paste |
| `u` | Undo |
| `Ctrl+R` | Redo |

**Insert Mode:**
| Key | Description |
|-----|-------------|
| `Esc` | Return to normal mode |
| `Ctrl+[` | Return to normal mode (alternative) |

---

# Part 2: Custom Slash Commands

All custom commands are located in `~/.claude/commands/`.

## Core Commands

### Planning and Execution

#### `/brainstorm`
**Description:** Explores requirements and design before implementation. MUST use before any creative work - creating features, building components, adding functionality, or modifying behavior.

**Usage:** `/brainstorm`

---

#### `/write-plan`
**Description:** Create detailed implementation plan with bite-sized tasks.

**Usage:** `/write-plan`

---

#### `/execute-plan`
**Description:** Execute plan in batches with review checkpoints.

**Usage:** `/execute-plan`

---

#### `/run-plan`
**Description:** Execute a PLAN.md file directly without loading planning skill context using intelligent segmentation for optimal quality.

**Arguments:** `<plan_path>` - Path to PLAN.md file (e.g., `.planning/phases/07-sidebar-reorganization/07-01-PLAN.md`)

**Usage:** `/run-plan .planning/phases/01-setup/01-01-PLAN.md`

---

#### `/create-plan`
**Description:** Create hierarchical project plans for solo agentic development (briefs, roadmaps, phase plans).

**Arguments:** `[what to plan]`

**Usage:** `/create-plan user authentication system`

---

### Creation Commands

#### `/create-prompt`
**Description:** Create a new prompt that another Claude can execute using XML tag structuring and best practices.

**Arguments:** `[task description]`

**Usage:** `/create-prompt build a REST API for user management`

---

#### `/run-prompt`
**Description:** Delegate one or more prompts to fresh sub-task contexts with parallel or sequential execution.

**Arguments:** `<prompt-number(s)-or-name> [--parallel|--sequential]`

**Usage:**
- `/run-prompt 005` - Run single prompt
- `/run-prompt 005 006 007 --parallel` - Run multiple prompts in parallel

---

#### `/create-agent-skill`
**Description:** Create or edit Claude Code skills with expert guidance on structure and best practices.

**Arguments:** `[skill description or requirements]`

**Usage:** `/create-agent-skill TDD enforcement skill`

---

#### `/create-hook`
**Description:** Invoke create-hooks skill for expert guidance on Claude Code hook development.

**Usage:** `/create-hook`

---

#### `/create-meta-prompt`
**Description:** Create optimized prompts for Claude-to-Claude pipelines (research -> plan -> implement).

**Arguments:** `[task description]`

**Usage:** `/create-meta-prompt multi-stage data processing pipeline`

---

#### `/create-slash-command`
**Description:** Create a new slash command following best practices and patterns.

**Arguments:** `[command description or requirements]`

**Usage:** `/create-slash-command code quality checker`

---

#### `/create-subagent`
**Description:** Create specialized Claude Code subagents with expert guidance.

**Arguments:** `[agent idea or description]`

**Usage:** `/create-subagent security auditor for API endpoints`

---

### Auditing Commands

#### `/audit-skill`
**Description:** Audit skill for YAML compliance, pure XML structure, progressive disclosure, and best practices.

**Arguments:** `<skill-path>`

**Usage:** `/audit-skill ~/.claude/skills/tdd/SKILL.md`

---

#### `/audit-slash-command`
**Description:** Audit slash command file for YAML, arguments, dynamic context, tool restrictions, and content quality.

**Arguments:** `<command-path>`

**Usage:** `/audit-slash-command ~/.claude/commands/my-command.md`

---

#### `/audit-subagent`
**Description:** Audit subagent configuration for role definition, prompt quality, tool selection, XML structure compliance, and effectiveness.

**Arguments:** `<subagent-path>`

**Usage:** `/audit-subagent ~/.claude/agents/code-reviewer.md`

---

### Task Management

#### `/add-to-todos`
**Description:** Add todo item to TO-DOS.md with context from conversation.

**Arguments:** `<todo-description>` (optional - infers from conversation if omitted)

**Usage:**
- `/add-to-todos Fix authentication bug in login flow`
- `/add-to-todos` (extracts from recent conversation)

---

#### `/check-todos`
**Description:** List outstanding todos and select one to work on.

**Usage:** `/check-todos`

---

#### `/whats-next`
**Description:** Analyze the current conversation and create a handoff document for continuing this work in a fresh context.

**Usage:** `/whats-next`

---

### Debugging and Maintenance

#### `/debug`
**Description:** Apply expert debugging methodology to investigate a specific issue with evidence gathering, hypothesis testing, and rigorous verification.

**Arguments:** `[issue description]`

**Usage:** `/debug API returns 500 error on large file uploads`

---

#### `/heal-skill`
**Description:** Heal skill documentation by applying corrections discovered during execution with approval workflow.

**Arguments:** `[optional: specific issue to fix]`

**Usage:** `/heal-skill incorrect API endpoint in examples`

---

---

## CEK Workflow Commands

### Development Phases (00-05)

#### `/cek-00-setup`
**Description:** Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync.

**Arguments:** Optional principle inputs or constitution parameters

**Usage:** `/cek-00-setup 5 principles focusing on security and testing`

---

#### `/cek-01-specify`
**Description:** Create or update the feature specification from a natural language feature description using SDD (Specification Driven Development).

**Arguments:** Feature description

**Usage:** `/cek-01-specify user authentication with OAuth2 support`

---

#### `/cek-02-plan`
**Description:** Plan the feature development based on the feature specification with codebase understanding and architecture focus.

**Arguments:** Plan specifics suggestions

**Usage:** `/cek-02-plan focus on minimal changes approach`

---

#### `/cek-03-tasks`
**Description:** Generate an actionable, dependency-ordered tasks.md for the feature based on available design artifacts, with complexity analysis.

**Arguments:** Optional task creation guidance or specific areas to focus on

**Usage:** `/cek-03-tasks prioritize API endpoints first`

---

#### `/cek-04-implement`
**Description:** Execute the implementation plan by processing and executing all tasks defined in tasks.md.

**Arguments:** Optional implementation preferences or specific tasks to prioritize

**Usage:** `/cek-04-implement start with database layer`

---

#### `/cek-05-document`
**Description:** Document completed feature implementation with API guides, architecture updates, and lessons learned.

**Arguments:** Optional documentation focus areas or specific sections to update

**Usage:** `/cek-05-document focus on API reference`

---

### Analysis and Problem Solving

#### `/cek-analyse`
**Description:** Auto-selects best Kaizen method (Gemba Walk, Value Stream, or Muda) for target analysis.

**Arguments:** Optional target description (e.g., code, workflow, or inefficiencies)

**Usage:**
- `/cek-analyse authentication implementation`
- `/cek-analyse deployment workflow`
- `/cek-analyse codebase for inefficiencies`

---

#### `/cek-analyse-problem`
**Description:** Comprehensive A3 one-page problem analysis with root cause and action plan.

**Arguments:** Optional problem description to document

**Usage:** `/cek-analyse-problem API response latency exceeds 3 seconds`

---

#### `/cek-cause-and-effect`
**Description:** Systematic Fishbone analysis exploring problem causes across six categories (People, Process, Technology, Environment, Methods, Materials).

**Arguments:** Optional problem description to analyze

**Usage:** `/cek-cause-and-effect flaky test suite`

---

#### `/cek-why`
**Description:** Iterative Five Whys root cause analysis drilling from symptoms to fundamentals.

**Arguments:** Optional issue or symptom description

**Usage:** `/cek-why deployment takes 2 hours instead of 30 minutes`

---

#### `/cek-root-cause-tracing`
**Description:** Use when errors occur deep in execution and you need to trace back to find the original trigger. Systematically traces bugs backward through call stack, adding instrumentation when needed.

**Usage:** `/cek-root-cause-tracing`

---

#### `/cek-plan-do-check-act`
**Description:** Iterative PDCA cycle for systematic experimentation and continuous improvement.

**Arguments:** Optional improvement goal or problem to address

**Usage:** `/cek-plan-do-check-act reduce build time`

---

#### `/cek-analyze-issue`
**Description:** Analyze a GitHub issue and create a detailed technical specification.

**Arguments:** Issue number (e.g., 42)

**Usage:** `/cek-analyze-issue 42`

---

### Code Review and Quality

#### `/cek-review-local-changes`
**Description:** Comprehensive review of local uncommitted changes using specialized agents with code improvement suggestions.

**Arguments:** `[review-aspects]` (optional)

**Usage:** `/cek-review-local-changes security`

---

#### `/cek-review-pr`
**Description:** Comprehensive pull request review using specialized agents with confidence scoring and line-specific comments.

**Arguments:** `[review-aspects]` (optional)

**Usage:** `/cek-review-pr`

---

#### `/cek-attach-review-to-pr`
**Description:** Add line-specific review comments to pull requests using GitHub CLI API.

**Arguments:** PR number or URL (optional - can work with current branch)

**Usage:** `/cek-attach-review-to-pr 123`

---

#### `/cek-critique`
**Description:** Comprehensive multi-perspective review using specialized judges with debate and consensus building.

**Arguments:** Optional file paths, commits, or context to review (defaults to recent changes)

**Usage:** `/cek-critique src/auth/*.ts`

---

#### `/cek-reflect`
**Description:** Reflect on previous response and output based on Self-refinement framework for iterative improvement with complexity triage and verification.

**Arguments:** Optional focus area or confidence threshold (e.g., "security" or "deep reflect if less than 90% confidence")

**Usage:** `/cek-reflect security`

---

#### `/cek-memorize`
**Description:** Curates insights from reflections and critiques into CLAUDE.md using Agentic Context Engineering.

**Arguments:** Optional source specification (last, selection, chat:<id>) or --dry-run for preview

**Usage:**
- `/cek-memorize`
- `/cek-memorize --dry-run`
- `/cek-memorize --max=5`

---

### Testing Commands

#### `/cek-write-tests`
**Description:** Systematically add test coverage for all local code changes using specialized review and development agents.

**Arguments:** What tests or modules to focus on

**Usage:** `/cek-write-tests src/auth/`

---

#### `/cek-fix-tests`
**Description:** Systematically fix all failing tests after business logic changes or refactoring.

**Arguments:** What tests or modules to focus on

**Usage:** `/cek-fix-tests user authentication tests`

---

#### `/cek-test-skill`
**Description:** Test skills with subagents before deployment using RED-GREEN-REFACTOR cycle to verify they work under pressure and resist rationalization.

**Usage:** `/cek-test-skill`

---

#### `/cek-test-prompt`
**Description:** Testing prompts with subagents using RED-GREEN-REFACTOR methodology.

**Usage:** `/cek-test-prompt`

---

### Git and GitHub Integration

#### `/cek-commit`
**Description:** Create well-formatted commits with conventional commit messages and emoji, including automatic pre-commit checks and intelligent commit splitting.

**Arguments:** Optional flags like --no-verify to skip pre-commit checks

**Usage:**
- `/cek-commit`
- `/cek-commit --no-verify`

---

#### `/cek-create-pr`
**Description:** Create pull requests using GitHub CLI with proper templates and formatting.

**Usage:** `/cek-create-pr`

---

#### `/cek-load-issues`
**Description:** Load all open issues from GitHub and save them as markdown files.

**Usage:** `/cek-load-issues`

---

### MCP Setup Commands

#### `/cek-build-mcp`
**Description:** Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools.

**Usage:** `/cek-build-mcp`

---

#### `/cek-setup-arxiv-mcp`
**Description:** Guide for setup arXiv paper search MCP server using Docker MCP.

**Arguments:** Optional - specific research topics or paper sources to configure

**Usage:** `/cek-setup-arxiv-mcp`

---

#### `/cek-setup-codemap-cli`
**Description:** Guide for setup Codemap CLI for intelligent codebase visualization and navigation.

**Arguments:** Optional - specific configuration preferences or OS type

**Usage:** `/cek-setup-codemap-cli`

---

#### `/cek-setup-context7-mcp`
**Description:** Guide for setup Context7 MCP server to load documentation for specific technologies.

**Arguments:** List of languages and frameworks to load documentation for

**Usage:** `/cek-setup-context7-mcp TypeScript, React, Node.js`

---

#### `/cek-setup-serena-mcp`
**Description:** Guide for setup Serena MCP server for semantic code retrieval and editing capabilities.

**Arguments:** Optional - specific configuration preferences or client type

**Usage:** `/cek-setup-serena-mcp`

---

#### `/cek-setup-code-formating`
**Description:** Sets up code formatting rules and style guidelines in CLAUDE.md.

**Usage:** `/cek-setup-code-formating`

---

### Skill and Command Development

#### `/cek-apply-anthropic-skill-best-practices`
**Description:** Comprehensive guide for skill development based on Anthropic's official best practices - use for complex skills requiring detailed structure.

**Arguments:** Optional skill name or path to skill being reviewed

**Usage:** `/cek-apply-anthropic-skill-best-practices ~/.claude/skills/tdd/SKILL.md`

---

#### `/cek-create-command`
**Description:** Interactive assistant for creating new Claude commands with proper structure, patterns, and MCP tool integration.

**Arguments:** Optional command name or description of command purpose

**Usage:** `/cek-create-command API documentation validator`

---

#### `/cek-create-hook`
**Description:** Create and configure git hooks with intelligent project analysis, suggestions, and automated testing.

**Arguments:** Optional hook type or description of desired behavior

**Usage:** `/cek-create-hook type check on file save`

---

#### `/cek-create-skill`
**Description:** Guide for creating effective skills using TDD approach with progressive disclosure and CSO optimization.

**Usage:** `/cek-create-skill`

---

#### `/cek-add-typescript-best-practices`
**Description:** Setup TypeScript best practices and code style rules in CLAUDE.md.

**Arguments:** Optional argument which practices to add or avoid

**Usage:** `/cek-add-typescript-best-practices`

---

### Ideation and Reflection

#### `/cek-brainstorm`
**Description:** Use when creating or developing, before writing code or implementation plans. Refines rough ideas into fully-formed designs through collaborative questioning, alternative exploration, and incremental validation.

**Arguments:** Optional initial feature concept or topic to brainstorm

**Usage:** `/cek-brainstorm real-time notification system`

---

#### `/cek-create-ideas`
**Description:** Generate ideas in one shot using creative sampling with probability distributions.

**Arguments:** Topic or problem to generate ideas for. Optional amount of ideas to generate.

**Usage:** `/cek-create-ideas ways to improve developer onboarding`

---

---

## Consider Commands (Mental Models)

All consider commands are located in `~/.claude/commands/consider/` and apply mental models/frameworks to analyze problems or make decisions.

### Decision Making

#### `/consider/10-10-10`
**Description:** Evaluate decisions across three time horizons (10 minutes, 10 months, 10 years).

**Arguments:** `[decision]` or leave blank for current context

**Usage:** `/consider/10-10-10 switching to microservices architecture`

---

#### `/consider/eisenhower-matrix`
**Description:** Apply Eisenhower matrix (urgent/important) to prioritize tasks or decisions.

**Arguments:** `[tasks]` or leave blank for current context

**Usage:** `/consider/eisenhower-matrix`

---

#### `/consider/one-thing`
**Description:** Identify the single highest-leverage action using "The One Thing" framework.

**Arguments:** `[goal]` or leave blank for current context

**Usage:** `/consider/one-thing increase developer productivity`

---

#### `/consider/opportunity-cost`
**Description:** Analyze what you give up by choosing this option.

**Arguments:** `[choice]` or leave blank for current context

**Usage:** `/consider/opportunity-cost building custom CMS vs using existing solution`

---

### Problem Analysis

#### `/consider/5-whys`
**Description:** Drill to root cause by asking why repeatedly.

**Arguments:** `[problem]` or leave blank for current context

**Usage:** `/consider/5-whys deployment failures every Friday`

---

#### `/consider/first-principles`
**Description:** Break down to fundamentals and rebuild from base truths.

**Arguments:** `[problem]` or leave blank for current context

**Usage:** `/consider/first-principles authentication system design`

---

#### `/consider/occams-razor`
**Description:** Find simplest explanation that fits all the facts.

**Arguments:** `[situation]` or leave blank for current context

**Usage:** `/consider/occams-razor intermittent API failures`

---

#### `/consider/second-order`
**Description:** Think through consequences of consequences ("And then what?").

**Arguments:** `[action]` or leave blank for current context

**Usage:** `/consider/second-order switching to serverless architecture`

---

### Strategic Thinking

#### `/consider/inversion`
**Description:** Solve problems backwards - what would guarantee failure?

**Arguments:** `[goal]` or leave blank for current context

**Usage:** `/consider/inversion successful product launch`

---

#### `/consider/pareto`
**Description:** Apply Pareto's principle (80/20 rule) to identify vital few factors driving majority of results.

**Arguments:** `[topic]` or leave blank for current context

**Usage:** `/consider/pareto reducing technical debt`

---

#### `/consider/swot`
**Description:** Map strengths, weaknesses, opportunities, and threats.

**Arguments:** `[subject]` or leave blank for current context

**Usage:** `/consider/swot new API platform`

---

#### `/consider/via-negativa`
**Description:** Improve by removing rather than adding.

**Arguments:** `[situation]` or leave blank for current context

**Usage:** `/consider/via-negativa simplify deployment process`

---

---

## Quick Reference by Use Case

| Use Case | Command |
|----------|---------|
| Start new session | `claude` |
| Resume last session | `claude --continue` or `claude -c` |
| Run headless query | `claude -p "query"` |
| Start new feature | `/cek-01-specify` |
| Plan implementation | `/cek-02-plan` or `/write-plan` |
| Create tasks from plan | `/cek-03-tasks` |
| Implement feature | `/cek-04-implement` |
| Review code before commit | `/cek-review-local-changes` |
| Create well-formatted commit | `/cek-commit` |
| Create PR | `/cek-create-pr` |
| Debug an issue | `/debug` |
| Find root cause | `/cek-why` or `/consider/5-whys` |
| Add test coverage | `/cek-write-tests` |
| Fix failing tests | `/cek-fix-tests` |
| Create new skill | `/create-agent-skill` |
| Audit existing skill | `/audit-skill` |
| Generate ideas | `/cek-brainstorm` or `/cek-create-ideas` |
| Prioritize tasks | `/consider/eisenhower-matrix` |
| Evaluate trade-offs | `/consider/opportunity-cost` |
| Simplify solution | `/consider/via-negativa` |
| Strategic analysis | `/consider/swot` |

---

## Command Count Summary

| Category | Count |
|----------|-------|
| **Native CLI** | |
| CLI Entry Points | 9 |
| CLI Flags | 40+ |
| Built-in Slash Commands | 43 |
| Keyboard Shortcuts | 25+ |
| **Custom Commands** | |
| Core Commands | 20 |
| CEK Workflow Commands | 39 |
| Consider Commands (Mental Models) | 12 |
| **Total** | **188+** |

---

*Generated: 2025-12-25*
