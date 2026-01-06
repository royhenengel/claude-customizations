# Code Executor MCP Server

An MCP server that enables Claude to write and execute JavaScript code with access to other MCP servers. This achieves significant token savings and better control flow for complex multi-tool workflows.

Based on [Anthropic's Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp) engineering article.

## The Problem

When Claude uses MCP tools directly, each tool call requires:
1. Loading the full tool schema into context
2. Returning all results to Claude's context window
3. Multiple round-trips for loops and conditionals

For example, querying 100 resources and filtering to find 5 videos might use **~150K tokens** with direct tool calls.

## The Solution

With code-executor, Claude writes JavaScript that:
1. Calls MCP tools internally
2. Filters and transforms data in code
3. Returns only what's needed

The same workflow uses **~2K tokens** - a **98% reduction**.

```
Traditional approach:                    Code Executor approach:
┌─────────┐    ┌─────────┐              ┌─────────┐    ┌─────────────────┐
│ Claude  │◄──►│ notion  │ x50 calls   │ Claude  │───►│ code-executor   │ 1 call
│         │◄──►│ github  │              │         │◄───│   ├─► notion    │
│         │◄──►│ memory  │              │         │    │   ├─► github    │
└─────────┘    └─────────┘              └─────────┘    │   └─► memory    │
                                                        └─────────────────┘
~150K tokens                             ~2K tokens
```

## Features

- **Token Efficiency**: ~98% reduction by filtering data in code before returning
- **Better Control Flow**: Native JavaScript loops, conditionals, and async/await
- **Progressive Discovery**: Search for tools without loading all schemas upfront
- **Multi-Server Access**: Call tools across all connected MCP servers

## Installation

### Prerequisites

- Node.js 18+
- Claude Code CLI

### Build

```bash
cd mcp/code-executor
npm install
npm run build
```

### Add to Claude Code

```bash
claude mcp add -s user \
  -e MCP_CONFIG_PATH="$HOME/.claude.json" \
  -e CONNECTED_SERVERS="notion-workspace,filesystem,memory,github" \
  -- code-executor node "/path/to/mcp/code-executor/dist/index.js"
```

Or manually add to `~/.claude.json`:

```json
{
  "mcpServers": {
    "code-executor": {
      "command": "node",
      "args": ["/path/to/mcp/code-executor/dist/index.js"],
      "env": {
        "MCP_CONFIG_PATH": "/path/to/.claude.json",
        "CONNECTED_SERVERS": "notion-workspace,filesystem,memory,github"
      }
    }
  }
}
```

### Verify Installation

```bash
claude mcp list
# Should show: code-executor: ... - ✓ Connected
```

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MCP_CONFIG_PATH` | No | Path to .claude.json file. Auto-detected if not set. |
| `CONNECTED_SERVERS` | No | Comma-separated list of servers to connect to. Defaults to all non-disabled servers. |

### Choosing Which Servers to Connect

Only include servers that benefit from code-based access:
- **Include**: Data-heavy servers (notion, filesystem, memory, github)
- **Exclude**: Interactive servers (puppeteer), specialized servers (mermaid, plantuml)

## Tools

### `execute_code`

Execute JavaScript code with access to all connected MCP tools.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | string | Yes | JavaScript code to execute |
| `timeout_ms` | number | No | Timeout in ms (default: 30000, max: 300000) |

**Built-in Functions:**

```javascript
// Call any MCP tool on any connected server
await callMCPTool(server, tool, params)

// Get list of connected servers with tool counts
listServers()

// Get the input schema for a specific tool
getToolSchema(server, tool)
```

**Response:**
```json
{
  "success": true,
  "result": { /* return value */ },
  "logs": ["console output..."],
  "execution_ms": 1234
}
```

### `search_tools`

Search for tools across all connected MCP servers using fuzzy matching.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | Yes | Search term |
| `detail` | string | No | `"minimal"`, `"standard"` (default), or `"full"` |
| `server` | string | No | Filter to specific server |
| `limit` | number | No | Max results (default: 10, max: 100) |

**Example Response:**
```json
{
  "tools": [
    {
      "server": "notion-workspace",
      "tool": "query_resources",
      "description": "Search and filter resources from the database"
    }
  ],
  "total": 1
}
```

### `get_tool_signature`

Get TypeScript signature and details for a specific tool.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `server` | string | Yes | Server name |
| `tool` | string | Yes | Tool name |

**Response:**
```json
{
  "signature": "query_resources(params: { limit?: number, topics?: string[] }): Promise<Resource[]>",
  "description": "Search and filter resources from the database",
  "inputSchema": { /* JSON Schema */ }
}
```

### `list_servers`

List all connected MCP servers and their status.

**Response:**
```json
{
  "servers": [
    { "name": "notion-workspace", "status": "connected", "toolCount": 20 },
    { "name": "filesystem", "status": "connected", "toolCount": 14 },
    { "name": "memory", "status": "connected", "toolCount": 9 }
  ]
}
```

## Usage Examples

### Basic: Query and Filter

```javascript
// Get all resources, filter to videos, return top 5
const resources = await callMCPTool('notion-workspace', 'query_resources', {
  limit: 100
});
const videos = resources.filter(r => r.type === 'Video');
return videos.slice(0, 5).map(v => ({ title: v.title, url: v.url }));
```

### Intermediate: Multi-Server Workflow

```javascript
// Find topics in Notion, then search for related files
const topics = await callMCPTool('notion-workspace', 'list_topics', {});
const aiTopics = topics.filter(t => t.name.toLowerCase().includes('ai'));

// Search filesystem for related docs
const results = [];
for (const topic of aiTopics.slice(0, 3)) {
  const files = await callMCPTool('filesystem', 'search_files', {
    path: '/Users/me/docs',
    pattern: `**/*${topic.name.toLowerCase()}*.md`
  });
  results.push({ topic: topic.name, files: files.slice(0, 5) });
}
return results;
```

### Advanced: Data Aggregation

```javascript
// Aggregate data from multiple sources
const [resources, entities, files] = await Promise.all([
  callMCPTool('notion-workspace', 'query_resources', { limit: 50 }),
  callMCPTool('memory', 'search_nodes', { query: 'project' }),
  callMCPTool('filesystem', 'list_directory', { path: '/Users/me/projects' })
]);

// Process and combine
const summary = {
  notion: {
    total: resources.length,
    byType: resources.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {})
  },
  memory: {
    entities: entities.length,
    types: [...new Set(entities.map(e => e.entityType))]
  },
  filesystem: {
    directories: files.filter(f => f.startsWith('[DIR]')).length,
    files: files.filter(f => f.startsWith('[FILE]')).length
  }
};

return summary;
```

### Progressive Discovery Workflow

```javascript
// Step 1: Search for relevant tools
const searchResult = await callMCPTool('code-executor', 'search_tools', {
  query: 'resources topics',
  detail: 'standard'
});
console.log('Found tools:', searchResult.tools.map(t => `${t.server}.${t.tool}`));

// Step 2: Get signature for the tool you need
const sig = getToolSchema('notion-workspace', 'query_resources');
console.log('Schema:', JSON.stringify(sig, null, 2));

// Step 3: Call the tool with the right parameters
const data = await callMCPTool('notion-workspace', 'query_resources', {
  topics: ['AI'],
  limit: 10
});
return data;
```

## Architecture

```
code-executor-mcp
├── src/
│   ├── index.ts              # Server entry point, tool registration
│   ├── bridge/               # MCP client connections
│   │   ├── config-loader.ts  # Load and parse .claude.json
│   │   ├── mcp-client.ts     # MCP SDK client wrapper
│   │   └── server-pool.ts    # Manage multiple server connections
│   ├── executor/             # Code execution
│   │   ├── sandbox.ts        # Node.js vm sandbox
│   │   └── runtime.ts        # Built-in functions (callMCPTool, etc.)
│   ├── discovery/            # Tool search
│   │   └── search-index.ts   # Fuse.js fuzzy search index
│   ├── tools/                # MCP tool implementations
│   │   ├── execute-code.ts
│   │   ├── search-tools.ts
│   │   ├── get-signature.ts
│   │   └── list-servers.ts
│   └── types/
│       └── index.ts          # TypeScript types, Zod schemas
└── dist/                     # Compiled JavaScript
```

## Security

The code executes in a Node.js `vm` sandbox with:

| Feature | Status |
|---------|--------|
| Direct filesystem access | Blocked |
| Direct network access | Blocked |
| Node.js require/import | Blocked |
| process, child_process | Blocked |
| MCP tool calls | Allowed via `callMCPTool()` |
| Basic JS globals | Allowed (JSON, Array, Date, etc.) |
| Console output | Captured to logs |
| Timeout | Configurable (default 30s, max 5min) |

**Important:** The `vm` module is not a security boundary against malicious code. It's designed for executing code generated by Claude that only needs to call MCP tools. Do not use this to execute untrusted code.

## Troubleshooting

### Server shows "Connected to 0/0 servers"

Check that:
1. `MCP_CONFIG_PATH` points to your `.claude.json` file
2. `CONNECTED_SERVERS` lists valid server names from your config
3. The servers you're connecting to are not disabled

### Tool calls fail with "Server not connected"

The specified server might:
- Not be in your `CONNECTED_SERVERS` list
- Have failed to start (check stderr for connection errors)
- Use an unsupported transport (only stdio is currently supported)

### Code execution times out

- Default timeout is 30 seconds
- Maximum is 5 minutes (300000ms)
- Increase timeout in the tool call: `{ "timeout_ms": 60000 }`

### "Transport type 'http' not yet supported"

Currently only stdio-based MCP servers are supported. HTTP and SSE transports are planned for a future release.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run in development mode with auto-reload
npm run dev

# Clean build
npm run clean
```

## Dependencies

- `@modelcontextprotocol/sdk` - MCP client/server SDK
- `fuse.js` - Fuzzy search for tool discovery
- `zod` - Runtime type validation

## License

MIT

## Credits

Based on the architecture described in [Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp) by Anthropic.
