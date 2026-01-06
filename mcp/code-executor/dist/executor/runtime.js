/**
 * Runtime functions available inside the sandbox
 */
export class SandboxRuntime {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    /**
     * Call an MCP tool (to be injected into sandbox)
     */
    async callMCPTool(server, tool, params) {
        try {
            return await this.pool.callTool(server, tool, params);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`MCP call failed (${server}/${tool}): ${message}`);
        }
    }
    /**
     * List available servers (to be injected into sandbox)
     */
    listServers() {
        return this.pool.listServers(true);
    }
    /**
     * Get tool schema (to be injected into sandbox)
     */
    getToolSchema(server, tool) {
        return this.pool.getToolSchema(server, tool);
    }
    /**
     * Get runtime object for sandbox initialization
     */
    getRuntime() {
        return {
            callMCPTool: this.callMCPTool.bind(this),
            listServers: this.listServers.bind(this),
            getToolSchema: this.getToolSchema.bind(this)
        };
    }
}
//# sourceMappingURL=runtime.js.map