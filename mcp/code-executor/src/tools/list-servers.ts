import type { ServerPool } from "../bridge/server-pool.js";

/**
 * List all connected MCP servers and their status
 */
export async function listServers(pool: ServerPool): Promise<{
  servers: Array<{
    name: string;
    status: string;
    toolCount: number;
    tools?: string[];
  }>;
  totalTools: number;
}> {
  const servers = pool.listServers(true);

  return {
    servers: servers.map(s => ({
      name: s.name,
      status: s.status,
      toolCount: s.toolCount,
      tools: s.tools
    })),
    totalTools: pool.getTotalToolCount()
  };
}
