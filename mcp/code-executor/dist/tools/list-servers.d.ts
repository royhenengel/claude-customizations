import type { ServerPool } from "../bridge/server-pool.js";
/**
 * List all connected MCP servers and their status
 */
export declare function listServers(pool: ServerPool): Promise<{
    servers: Array<{
        name: string;
        status: string;
        toolCount: number;
        tools?: string[];
    }>;
    totalTools: number;
}>;
//# sourceMappingURL=list-servers.d.ts.map