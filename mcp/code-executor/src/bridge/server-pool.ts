import type { MCPConfig, ServerInfo, ToolSchema, ToolIndex } from "../types/index.js";
import { MCPClientConnection } from "./mcp-client.js";
import { getConnectedServers, getServerConfig } from "./config-loader.js";

/**
 * Manages connections to multiple MCP servers
 */
export class ServerPool {
  private connections: Map<string, MCPClientConnection> = new Map();
  private config: MCPConfig;

  constructor(config: MCPConfig) {
    this.config = config;
  }

  /**
   * Initialize connections to all configured servers
   */
  async initialize(): Promise<void> {
    const serverNames = getConnectedServers(this.config);
    console.error(`[server-pool] Initializing connections to: ${serverNames.join(", ")}`);

    // Connect to all servers in parallel
    const connectionPromises = serverNames.map(async (name) => {
      const serverConfig = getServerConfig(this.config, name);
      if (!serverConfig) {
        console.error(`[server-pool] No config found for server: ${name}`);
        return;
      }

      const client = new MCPClientConnection(name, serverConfig);
      this.connections.set(name, client);

      try {
        await client.connect();
      } catch (error) {
        console.error(`[server-pool] Failed to connect to ${name}:`, error);
      }
    });

    await Promise.all(connectionPromises);

    const connected = this.listServers().filter(s => s.status === "connected");
    console.error(`[server-pool] Connected to ${connected.length}/${serverNames.length} servers`);
  }

  /**
   * Get list of all servers with their status
   */
  listServers(includeTools = false): ServerInfo[] {
    return Array.from(this.connections.entries()).map(([name, client]) => ({
      name,
      status: client.status,
      toolCount: client.tools.length,
      tools: includeTools ? client.tools.map(t => t.name) : undefined,
      error: client.error ?? undefined
    }));
  }

  /**
   * Get connection to a specific server
   */
  getServer(name: string): MCPClientConnection | null {
    return this.connections.get(name) ?? null;
  }

  /**
   * Call a tool on a specific server
   */
  async callTool(serverName: string, toolName: string, params: unknown): Promise<unknown> {
    const client = this.connections.get(serverName);
    if (!client) {
      throw new Error(`Server not found: ${serverName}`);
    }

    return client.callTool(toolName, params);
  }

  /**
   * Get schema for a specific tool
   */
  getToolSchema(serverName: string, toolName: string): ToolSchema | null {
    const client = this.connections.get(serverName);
    if (!client) {
      return null;
    }

    return client.getToolSchema(toolName);
  }

  /**
   * Get all tools across all servers as a flat index
   */
  getAllTools(): ToolIndex[] {
    const tools: ToolIndex[] = [];

    for (const [serverName, client] of this.connections) {
      if (client.status !== "connected") continue;

      for (const tool of client.tools) {
        tools.push({
          server: serverName,
          tool: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema
        });
      }
    }

    return tools;
  }

  /**
   * Get total number of tools across all connected servers
   */
  getTotalToolCount(): number {
    let count = 0;
    for (const client of this.connections.values()) {
      if (client.status === "connected") {
        count += client.tools.length;
      }
    }
    return count;
  }

  /**
   * Disconnect from all servers
   */
  async shutdown(): Promise<void> {
    console.error("[server-pool] Shutting down all connections...");

    const disconnectPromises = Array.from(this.connections.values())
      .map(client => client.disconnect());

    await Promise.all(disconnectPromises);
    this.connections.clear();
  }
}
