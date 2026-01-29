import type { ServerPool } from "../bridge/server-pool.js";
import type { MCPConfig } from "../types/index.js";
/**
 * List all MCP servers - both connected and available for lazy loading
 */
export declare function listServers(pool: ServerPool, config: MCPConfig): Promise<{
    servers: Array<{
        name: string;
        status: string;
        toolCount: number;
        tools?: string[];
    }>;
    available: string[];
    totalTools: number;
}>;
//# sourceMappingURL=list-servers.d.ts.map