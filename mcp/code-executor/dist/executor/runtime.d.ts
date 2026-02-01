import type { ServerPool } from "../bridge/server-pool.js";
import type { MCPConfig } from "../types/index.js";
/**
 * Runtime functions available inside the sandbox
 */
export declare class SandboxRuntime {
    private pool;
    private config;
    constructor(pool: ServerPool, config: MCPConfig);
    /**
     * Call an MCP tool (to be injected into sandbox)
     */
    callMCPTool(server: string, tool: string, params: unknown): Promise<unknown>;
    /**
     * List all MCP servers - both connected and available for lazy loading
     * Returns both currently connected servers and all servers from config
     */
    listServers(): {
        connected: Array<{
            name: string;
            status: string;
            toolCount: number;
            tools?: string[];
        }>;
        available: string[];
        all: string[];
    };
    /**
     * Get tool schema (to be injected into sandbox)
     */
    getToolSchema(server: string, tool: string): Promise<unknown>;
    /**
     * Get runtime object for sandbox initialization
     */
    getRuntime(): {
        callMCPTool: (server: string, tool: string, params: unknown) => Promise<unknown>;
        listServers: () => unknown;
        getToolSchema: (server: string, tool: string) => Promise<unknown>;
    };
}
//# sourceMappingURL=runtime.d.ts.map