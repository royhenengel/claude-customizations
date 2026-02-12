# Claude Flow Integration Implementation Plan

## Objective

Install Claude Flow as a standalone MCP server alongside the existing my-workflow system. Both systems coexist independently.

## Context

@planning/specs/claude-flow/SPEC.md
@planning/specs/claude-flow/RESEARCH.md

## Task Summary

| # | Task | Type | Dependencies | Blocking |
|---|------|------|--------------|----------|
| 1 | Snapshot current MCP state | auto | - | - |
| 2 | Install Claude Flow globally | auto | Task 1 | - |
| 3 | Register Claude Flow as MCP server | auto | Task 2 | - |
| 4 | Initialize Claude Flow project config | auto | Task 3 | - |
| 5 | Verify MCP server starts and tools are available | checkpoint:human-verify | Task 4 | yes |
| 6 | Test Claude Flow functionality | auto | Task 5 | - |
| 7 | Verify existing system unaffected | auto | Task 6 | - |

## Tasks

### Task 1: Snapshot current MCP state

**Type**: auto
**Files**: (none modified)
**Dependencies**: None

**Context**: Capture baseline before changes so we can verify nothing breaks.

**Action**:
- Run `claude mcp list` and save output
- Verify current ToolSearch deferred tools list is accessible
- Run a quick test of an existing MCP tool (e.g., filesystem list_directory)

**Verify**: Baseline captured
**Done**: Current MCP server list and tool counts documented

---

### Task 2: Install Claude Flow globally

**Type**: auto
**Files**: (system-level npm install)
**Dependencies**: Task 1

**Context**: Full install to get all capabilities including ML/embeddings and WASM booster.

**Action**:
- Run `npm install -g claude-flow@alpha`
- Verify installation: `claude-flow --version`
- Check binary is accessible: `which claude-flow`

**Pitfalls**:
- If npm global prefix is not in PATH, `claude-flow` won't be found
- Alpha version may have breaking changes; pin to current version if needed
- Large install (~340MB with optional deps); ensure disk space

**Verify**: `claude-flow --version` returns `3.1.0-alpha.28` or later
**Done**: claude-flow binary installed and accessible globally

---

### Task 3: Register Claude Flow as MCP server

**Type**: auto
**Files**: `~/.claude/settings.json` (modified by claude mcp add)
**Dependencies**: Task 2

**Context**: Register using standard `claude mcp add` command. This adds the server to Claude Code's MCP configuration, where it will be lazily loaded.

**Action**:
- Run `claude mcp add claude-flow -- claude-flow mcp start`
- Verify entry appears in MCP server list: `claude mcp list`

**Pitfalls**:
- The `claude mcp add` command modifies MCP configuration. Verify it doesn't alter existing servers.
- If the server name conflicts with anything existing, use a different name.

**Verify**: `claude mcp list` shows `claude-flow` entry
**Done**: Claude Flow registered as MCP server in Claude Code

---

### Task 4: Initialize Claude Flow project config

**Type**: auto
**Files**: Project-level configuration (if created)
**Dependencies**: Task 3

**Context**: Claude Flow's `init` command creates project-level configuration. Run it to set up default config without the interactive wizard (use defaults).

**Action**:
- Run `claude-flow init` (non-interactive if possible, or `--wizard` if required)
- Review any files it creates
- Ensure it doesn't modify existing project files (CLAUDE.md, settings.json, etc.)

**Pitfalls**:
- Init may try to create `.claude/` files that conflict with existing setup
- Review any generated config before accepting
- If it modifies existing files, revert those changes

**Verify**: Claude Flow config exists, no existing files modified
**Done**: Claude Flow project configuration initialized

---

### Task 5: Verify MCP server starts and tools are available

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 4

**Context**: Need to start a fresh Claude Code session to pick up the new MCP server. The user must verify in a new session that Claude Flow tools appear in the deferred tools list.

**Action**:
- Start a new Claude Code session (or restart current one)
- Run ToolSearch for "claude-flow" to check if tools are available
- List available Claude Flow tools

**Verify**: User confirms claude-flow MCP tools appear in ToolSearch results
**Done**: Claude Flow tools accessible via ToolSearch in Claude Code

---

### Task 6: Test Claude Flow functionality

**Type**: auto
**Dependencies**: Task 5

**Context**: Verify Claude Flow actually works by running basic commands.

**Action**:
- Load Claude Flow tools via ToolSearch
- Test basic operations:
  - List available agents
  - Check swarm status
  - Run a simple agent task (if available without complex setup)
- Document which tools are available and what they do

**Verify**: At least one Claude Flow tool executes successfully
**Done**: Claude Flow functional, basic operations confirmed

---

### Task 7: Verify existing system unaffected

**Type**: auto
**Dependencies**: Task 6

**Context**: Confirm the installation didn't break anything in the existing setup.

**Action**:
- Verify existing MCP servers still work (test one tool from each key server)
- Verify my-workflow skills still load (/plan, /build, /start)
- Verify hooks still fire (SessionStart, UserPromptSubmit)
- Compare MCP server list with baseline from Task 1

**Verify**: All existing functionality intact
**Done**: Existing system verified unaffected by Claude Flow installation

## Verification

- [ ] Claude Flow installed globally and accessible
- [ ] Registered as MCP server in Claude Code
- [ ] Tools appear in ToolSearch deferred list
- [ ] At least one Claude Flow command executes successfully
- [ ] Existing my-workflow and MCP servers unaffected

## Success Criteria

Claude Flow installed and functional as an MCP server, coexisting independently with my-workflow.
