# Reddit MCP Server Implementation Plan

## Objective

Set up reddit-mcp-buddy as an MCP server to enable fetching Reddit content directly from Claude Code without browser automation.

## Context

@planning/specs/reddit-mcp-server/SPEC.md
@planning/specs/reddit-mcp-server/RESEARCH.md

## Task Summary

| # | Task | Type | Dependencies | Blocking |
|---|------|------|--------------|----------|
| 1 | Add reddit-mcp-buddy to MCP configuration | auto | - | - |
| 2 | Restart Claude Code to load server | checkpoint:human-action | Task 1 | yes |
| 3 | Verify server connection and tools | checkpoint:human-verify | Task 2 | yes |

## Tasks

### Task 1: Add reddit-mcp-buddy to MCP configuration

**Type**: auto
**Files**: `~/.claude.json`
**Dependencies**: None

**Context**: MCP servers are configured in ~/.claude.json under the mcpServers key. reddit-mcp-buddy is an npm package that follows the existing npx pattern used by other MCP servers.

**Action**:

Add the following entry to the `mcpServers` object in `~/.claude.json`:

```json
"reddit": {
  "command": "npx",
  "args": ["-y", "reddit-mcp-buddy"]
}
```

**Verify**: `cat ~/.claude.json | grep -A3 '"reddit"'`
**Done**: reddit entry exists in mcpServers with npx command

---

### Task 2: Restart Claude Code to load server

**Type**: checkpoint:human-action
**Blocking**: yes
**Dependencies**: Task 1

**Context**: Claude Code loads MCP servers at startup. A restart is required for the new server to be available.

**Action**:

1. Close the current Claude Code session
2. Reopen Claude Code in the same project

**Verify**: Claude Code starts without MCP errors
**Done**: Claude Code restarted successfully

---

### Task 3: Verify server connection and tools

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 2

**Context**: After restart, the reddit MCP server should be available. Verify tools are accessible.

**Action**:

1. Use ToolSearch to find reddit tools
2. Test one tool: fetch posts from a subreddit like "programming"

**Verify**:

- ToolSearch returns reddit-related tools
- Tool returns Reddit posts successfully

**Done**: Reddit MCP server is operational and returning data

## Verification

- [ ] reddit entry added to ~/.claude.json (npx pattern)
- [ ] Claude Code restarted
- [ ] reddit tools visible in ToolSearch
- [ ] Successful test fetch from Reddit

## Success Criteria

- MCP server runs and connects to Claude Code
- Can fetch posts from a subreddit via MCP tool
- Can retrieve comments on a specific post
- Can search Reddit for topics
