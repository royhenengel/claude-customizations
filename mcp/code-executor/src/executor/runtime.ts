import type { ServerPool } from "../bridge/server-pool.js";
import type { MCPConfig } from "../types/index.js";

/**
 * Runtime functions available inside the sandbox
 */
export class SandboxRuntime {
  constructor(
    private pool: ServerPool,
    private config: MCPConfig
  ) {}

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
   * List all MCP servers - both connected and available for lazy loading
   * Returns both currently connected servers and all servers from config
   */
  listServers(): {
    connected: Array<{ name: string; status: string; toolCount: number; tools?: string[] }>;
    available: string[];
    all: string[];
  } {
    const connectedServers = this.pool.listServers(true);
    const connectedNames = new Set(connectedServers.map(s => s.name));

    // Get all available servers from config that aren't connected yet
    const availableServers = Object.keys(this.config.mcpServers)
      .filter(name => !connectedNames.has(name) && name !== "code-executor");

    // All servers = connected + available
    const allServers = [
      ...connectedServers.map(s => s.name),
      ...availableServers
    ];

    return {
      connected: connectedServers.map(s => ({
        name: s.name,
        status: s.status,
        toolCount: s.toolCount,
        tools: s.tools
      })),
      available: availableServers,
      all: allServers
    };
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
