import type { ServerPool } from "../bridge/server-pool.js";
/**
 * Runtime functions available inside the sandbox
 */
export declare class SandboxRuntime {
    private pool;
    constructor(pool: ServerPool);
    /**
     * Call an MCP tool (to be injected into sandbox)
     */
    callMCPTool(server: string, tool: string, params: unknown): Promise<unknown>;
    /**
     * List available servers (to be injected into sandbox)
     */
    listServers(): unknown;
    /**
     * Get tool schema (to be injected into sandbox)
     */
    getToolSchema(server: string, tool: string): unknown;
    /**
     * Get runtime object for sandbox initialization
     */
    getRuntime(): {
        callMCPTool: (server: string, tool: string, params: unknown) => Promise<unknown>;
        listServers: () => unknown;
        getToolSchema: (server: string, tool: string) => unknown;
    };
}
//# sourceMappingURL=runtime.d.ts.map