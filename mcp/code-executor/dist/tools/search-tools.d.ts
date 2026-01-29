import type { SearchToolsInput, MCPConfig } from "../types/index.js";
import type { ToolSearchIndex } from "../discovery/search-index.js";
import type { ServerPool } from "../bridge/server-pool.js";
/**
 * Search for tools across connected MCP servers.
 * Supports lazy loading: if query matches a server name that isn't connected yet,
 * it will connect and index that server's tools before searching.
 */
export declare function searchTools(searchIndex: ToolSearchIndex, serverPool: ServerPool, config: MCPConfig, input: SearchToolsInput): Promise<{
    tools: Array<{
        server: string;
        tool: string;
        description: string;
        score?: number;
        inputSchema?: Record<string, unknown>;
    }>;
    total: number;
    query: string;
    lazyLoaded?: string[];
}>;
//# sourceMappingURL=search-tools.d.ts.map