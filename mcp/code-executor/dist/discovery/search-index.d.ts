import type { ToolIndex } from "../types/index.js";
import type { ServerPool } from "../bridge/server-pool.js";
/**
 * Searchable index of tools across all connected MCP servers
 */
export declare class ToolSearchIndex {
    private fuse;
    private tools;
    private indexedServers;
    /**
     * Build the search index from the server pool
     */
    buildIndex(pool: ServerPool): void;
    /**
     * Add tools from a newly-connected server to the index
     */
    addServerTools(serverName: string, tools: ToolIndex[]): void;
    /**
     * Check if a server is already indexed
     */
    isServerIndexed(serverName: string): boolean;
    /**
     * Rebuild the Fuse.js index
     */
    private rebuildFuseIndex;
    /**
     * Search for tools matching a query
     */
    search(query: string, options?: {
        server?: string;
        limit?: number;
        includeSchema?: boolean;
    }): {
        tools: Array<{
            server: string;
            tool: string;
            description: string;
            score?: number;
            inputSchema?: Record<string, unknown>;
        }>;
        total: number;
    };
    /**
     * Get all tools (optionally filtered by server)
     */
    listAll(server?: string): ToolIndex[];
    /**
     * Get total number of indexed tools
     */
    get count(): number;
}
//# sourceMappingURL=search-index.d.ts.map