# Changelog

## 1.0.0 (2025-01-06)

Initial release of the Code Executor MCP Server.

### Features

- **execute_code** tool - Execute JavaScript with access to all connected MCP tools
  - `callMCPTool(server, tool, params)` - Call any MCP tool
  - `listServers()` - Get connected servers
  - `getToolSchema(server, tool)` - Get tool input schema
  - Console output captured to logs
  - Configurable timeout (default 30s, max 5min)

- **search_tools** tool - Fuzzy search across all connected servers
  - Three detail levels: minimal, standard, full
  - Filter by server
  - Configurable result limit

- **get_tool_signature** tool - TypeScript signature generation
  - Full input schema
  - Tool description

- **list_servers** tool - View connected servers and status

### Architecture

- **MCP Bridge**: Connects to stdio-based MCP servers using `@modelcontextprotocol/sdk`
- **Sandbox**: Node.js `vm` module with limited globals
- **Search Index**: Fuse.js for fuzzy tool discovery
- **Type Safety**: Zod schemas for all tool inputs

### Configuration

- `MCP_CONFIG_PATH` - Path to .claude.json
- `CONNECTED_SERVERS` - Comma-separated server list

### Known Limitations

- Only stdio transport supported (HTTP/SSE planned)
- vm module is not a security boundary (suitable for Claude-generated code only)

### Implementation Notes

Originally planned to use `isolated-vm` for true V8 isolation, but it failed to compile on Node.js v24 due to C++20 requirements. Switched to Node.js built-in `vm` module which provides sufficient isolation for the use case of executing Claude-generated code.
