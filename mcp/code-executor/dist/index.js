#!/usr/bin/env node
/**
 * Code Executor MCP Server
 *
 * Enables Claude to write and execute code with access to other MCP servers,
 * achieving significant token savings through progressive tool discovery
 * and in-environment data filtering.
 *
 * Based on: https://www.anthropic.com/engineering/code-execution-with-mcp
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { loadMCPConfig } from "./bridge/config-loader.js";
import { ServerPool } from "./bridge/server-pool.js";
import { ToolSearchIndex } from "./discovery/search-index.js";
import { executeCode } from "./tools/execute-code.js";
import { listServers } from "./tools/list-servers.js";
import { searchTools } from "./tools/search-tools.js";
import { getToolSignature } from "./tools/get-signature.js";
// Global state
let serverPool;
let searchIndex;
/**
 * Initialize MCP server and register tools
 */
async function main() {
    console.error("[code-executor] Starting Code Executor MCP Server...");
    // Load configuration
    const config = loadMCPConfig();
    // Initialize server pool
    serverPool = new ServerPool(config);
    await serverPool.initialize();
    // Build search index
    searchIndex = new ToolSearchIndex();
    searchIndex.buildIndex(serverPool);
    // Create MCP server
    const server = new McpServer({
        name: "code-executor-mcp",
        version: "1.0.0"
    });
    // Register execute_code tool
    server.tool("execute_code", `Execute JavaScript code with access to all connected MCP tools.

The code runs in a sandboxed environment with these built-in functions:
- callMCPTool(server, tool, params) - Call any MCP tool, returns the result
- listServers() - Get list of connected servers and their tools
- getToolSchema(server, tool) - Get the input schema for a specific tool

Example:
  const resources = await callMCPTool('notion', 'query_resources', { limit: 100 });
  const filtered = resources.filter(r => r.type === 'Video');
  return filtered.slice(0, 5);

The code should end with a return statement to send data back to Claude.
Console output (console.log) is captured and returned in the logs field.`, {
        code: z.string()
            .min(1, "Code cannot be empty")
            .describe("JavaScript/TypeScript code to execute"),
        timeout_ms: z.number()
            .int()
            .min(1000)
            .max(300000)
            .default(30000)
            .describe("Execution timeout in milliseconds (default: 30000, max: 300000)")
    }, async (params) => {
        const input = {
            code: params.code,
            timeout_ms: params.timeout_ms ?? 30000
        };
        const result = await executeCode(serverPool, input);
        return {
            content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
        };
    });
    // Register search_tools tool
    server.tool("search_tools", `Search for tools across all connected MCP servers.

Use this to discover available tools without loading all schemas upfront.
Returns matching tools with descriptions and optional input schemas.

Detail levels:
- minimal: Tool name and truncated description only
- standard: Full description (default)
- full: Description + complete input schema`, {
        query: z.string()
            .min(1, "Query cannot be empty")
            .describe("Search term to match against tool names and descriptions"),
        detail: z.enum(["minimal", "standard", "full"])
            .default("standard")
            .describe("Level of detail in results"),
        server: z.string()
            .optional()
            .describe("Filter to tools from a specific server"),
        limit: z.number()
            .int()
            .min(1)
            .max(100)
            .default(10)
            .describe("Maximum number of results to return")
    }, async (params) => {
        const input = {
            query: params.query,
            detail: params.detail ?? "standard",
            server: params.server,
            limit: params.limit ?? 10
        };
        const result = await searchTools(searchIndex, input);
        return {
            content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
        };
    });
    // Register get_tool_signature tool
    server.tool("get_tool_signature", `Get the TypeScript signature and full details for a specific tool.

Use this after search_tools to get the exact parameter requirements
before calling a tool via execute_code.`, {
        server: z.string()
            .min(1, "Server name is required")
            .describe("Name of the MCP server"),
        tool: z.string()
            .min(1, "Tool name is required")
            .describe("Name of the tool")
    }, async (params) => {
        try {
            const input = {
                server: params.server,
                tool: params.tool
            };
            const result = await getToolSignature(serverPool, input);
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify(result, null, 2)
                    }]
            };
        }
        catch (error) {
            return {
                content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`
                    }]
            };
        }
    });
    // Register list_servers tool
    server.tool("list_servers", `List all connected MCP servers and their status.

Returns the name, connection status, and tool count for each server.
Use this to see what's available before searching for specific tools.`, {}, async () => {
        const result = await listServers(serverPool);
        return {
            content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
        };
    });
    // Handle shutdown
    process.on("SIGINT", async () => {
        console.error("[code-executor] Shutting down...");
        await serverPool.shutdown();
        process.exit(0);
    });
    process.on("SIGTERM", async () => {
        console.error("[code-executor] Shutting down...");
        await serverPool.shutdown();
        process.exit(0);
    });
    // Connect to transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("[code-executor] Server running via stdio");
    console.error(`[code-executor] Connected servers: ${serverPool.listServers().filter(s => s.status === 'connected').length}`);
    console.error(`[code-executor] Total tools indexed: ${searchIndex.count}`);
}
// Run
main().catch((error) => {
    console.error("[code-executor] Fatal error:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map