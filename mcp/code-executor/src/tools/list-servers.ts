import type { ServerPool } from "../bridge/server-pool.js";
import type { MCPConfig } from "../types/index.js";

/**
 * List all MCP servers - both connected and available for lazy loading
 */
export async function listServers(
  pool: ServerPool,
  config: MCPConfig
): Promise<{
  servers: Array<{
    name: string;
    status: string;
    toolCount: number;
    tools?: string[];
  }>;
  available: string[];
  totalTools: number;
}> {
  const connectedServers = pool.listServers(true);
  const connectedNames = new Set(connectedServers.map(s => s.name));

  // Get all available servers from config that aren't connected yet
  const availableServers = Object.keys(config.mcpServers)
    .filter(name => !connectedNames.has(name) && name !== "code-executor");

  return {
    servers: connectedServers.map(s => ({
      name: s.name,
      status: s.status,
      toolCount: s.toolCount,
      tools: s.tools
    })),
    available: availableServers,
    totalTools: pool.getTotalToolCount()
  };
}
