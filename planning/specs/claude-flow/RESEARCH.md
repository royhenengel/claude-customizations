# Claude Flow Integration Research

## Problem Analysis

### Problem Domain

Multi-agent orchestration for complex tasks. The existing my-workflow system excels at structured solo development (spec, plan, build) but lacks native swarm coordination for tasks that benefit from parallel agent collaboration.

### Current State

- My-workflow handles single-agent development with subagent delegation via Task tool
- 132 agents available but invoked individually, not as coordinated teams
- Agent Teams (experimental, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) enabled but not actively used
- No persistent vector memory or learning across sessions (claude-mem handles observation capture, not routing optimization)

## Information Gathered

### Codebase Analysis

- MCP servers are lazily loaded via ToolSearch (deferred tools pattern)
- Settings at `~/.claude/settings.json` with `mcpServers` configured via `claude mcp add`
- Existing MCP servers: filesystem, github, memory, notion-workspace, code-executor, reddit, n8n-mcp, context7, figma, puppeteer, and more
- Adding one more MCP server follows established pattern

### External Research

#### Claude Flow Overview

| Attribute | Value |
|-----------|-------|
| Repository | [ruvnet/claude-flow](https://github.com/ruvnet/claude-flow) |
| Stars | ~14,000 |
| License | MIT |
| Language | TypeScript |
| Version | 3.1.0-alpha.28 |
| Package size | ~8MB (unpacked), ~340MB with optional deps |
| Runtime deps | zod, semver (minimal) |
| Install method | `npm install -g claude-flow@alpha` |
| MCP registration | `claude mcp add claude-flow -- claude-flow mcp start` |

#### Key Capabilities

- 60+ specialized agents with Q-Learning routing
- Swarm coordination (queen/worker hierarchy, mesh/ring/star topologies)
- 5 consensus algorithms (Raft, Byzantine, Gossip, CRDT, Majority)
- HNSW vector memory with persistent storage
- SONA self-optimization (<0.05ms adaptation)
- Agent Booster (WASM) for simple transforms without LLM calls
- Multi-provider support (Claude, GPT, Gemini, local models)
- Background workers for security audits, optimization

## Tradeoff Analysis

| Factor | Choice | Alternative | Why |
|--------|--------|-------------|-----|
| Coexistence vs Migration | Coexistence | Full migration | Preserves working my-workflow; adds capabilities without disruption |
| Full vs Minimal install | Full | `--omit=optional` | Evaluating the complete system; lazy loading prevents context cost |
| Global vs npx | Global | npx per invocation | Faster MCP server startup; no 20s cold start per session |

### Risks

- Alpha software (v3.1.0-alpha.28): May have stability issues
- Heavy optional dependencies (~340MB): Disk space, not context cost
- Environment variable pollution: Claude Flow uses many env vars; ensure they don't leak into our settings

## Architectural Implications

### System Boundaries

Claude Flow operates as an isolated MCP server process. It does not modify Claude Code internals, skills, or hooks. Communication happens exclusively through MCP tool calls.

```
User Session
  |
  +-- My-Workflow (skills, hooks, planning/)
  |     Direct Claude Code integration
  |
  +-- Claude Flow (MCP server)
        Separate process, tool-call interface
        Lazy-loaded via ToolSearch
```

### Dependencies

- Node.js 20+ (already satisfied)
- npm global install space (~340MB with optional)
- No internal code dependencies on existing customizations

### Integration Points

- MCP server registration in Claude Code
- ToolSearch deferred tools list
- No integration with my-workflow planning artifacts

## Approach

Install Claude Flow globally, register as MCP server, verify functionality. No my-workflow modifications needed. The two systems coexist through Claude Code's native MCP architecture.

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Relationship to my-workflow | Independent coexistence | Different strengths, user chooses per task |
| Install scope | Full (global + all deps) | Evaluating complete system; lazy loading handles context |
| MCP registration | Standard `claude mcp add` | Follows established pattern, gets deferred tool loading |

## Sources

- [ruvnet/claude-flow](https://github.com/ruvnet/claude-flow) - Repository and README
- [npm: claude-flow](https://www.npmjs.com/package/claude-flow) - Package registry
