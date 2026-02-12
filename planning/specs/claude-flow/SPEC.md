# Claude Flow Integration Specification

## Goal

Install and configure Claude Flow as a standalone MCP server alongside the existing my-workflow system. Both systems coexist independently: the user chooses which to use per task. Claude Flow provides multi-agent swarm orchestration capabilities that complement the existing spec-driven solo workflow.

## User Stories

- As a developer, I want Claude Flow available as an MCP server so that I can use swarm orchestration for complex multi-agent tasks
- As a developer, I want to choose between my-workflow and Claude Flow per task so that I use the right tool for the job
- As a developer, I want Claude Flow tools lazily loaded so that they don't impact my normal workflow context or startup

## Requirements

### Functional

- [ ] Claude Flow installed globally via npm
- [ ] Claude Flow registered as an MCP server in Claude Code
- [ ] Claude Flow tools appear in deferred tools list (lazy loaded via ToolSearch)
- [ ] Can invoke Claude Flow swarm commands from within Claude Code
- [ ] Existing skills, agents, hooks, and MCP servers remain unaffected

### Non-Functional

- [ ] No impact on session startup time beyond server process
- [ ] No context overhead until tools are explicitly loaded
- [ ] Compatible with existing lazy-loading MCP pattern

## Constraints

- Must not modify existing settings.json beyond adding the MCP server entry
- Must not conflict with existing hooks, skills, or agent configurations
- Claude Flow runs as a separate MCP server process, not integrated into my-workflow
- Installation uses the project's recommended method (npm global + MCP setup)

## Success Criteria

- [ ] Claude Flow installed and functional as an MCP server
- [ ] Can successfully ToolSearch for claude-flow tools
- [ ] Can execute at least one Claude Flow command (e.g., agent list, swarm status)
- [ ] Existing my-workflow commands (/start, /plan, /build) still work normally
