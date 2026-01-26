import type { ServerPool } from "../bridge/server-pool.js";

/**
 * Runtime functions available inside the sandbox
 */
export class SandboxRuntime {
  constructor(private pool: ServerPool) {}

  /**
   * Call an MCP tool (to be injected into sandbox)
   */
  async callMCPTool(server: string, tool: string, params: unknown): Promise<unknown> {
    try {
      return await this.pool.callTool(server, tool, params);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`MCP call failed (${server}/${tool}): ${message}`);
    }
  }

  /**
   * List available servers (to be injected into sandbox)
   */
  listServers(): unknown {
    return this.pool.listServers(true);
  }

  /**
   * Get tool schema (to be injected into sandbox)
   */
  async getToolSchema(server: string, tool: string): Promise<unknown> {
    return this.pool.getToolSchema(server, tool);
  }

  /**
   * Get runtime object for sandbox initialization
   */
  getRuntime(): {
    callMCPTool: (server: string, tool: string, params: unknown) => Promise<unknown>;
    listServers: () => unknown;
    getToolSchema: (server: string, tool: string) => Promise<unknown>;
  } {
    return {
      callMCPTool: this.callMCPTool.bind(this),
      listServers: this.listServers.bind(this),
      getToolSchema: this.getToolSchema.bind(this)
    };
  }
}
