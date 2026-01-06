import type { MCPConfig, ServerInfo, ToolSchema, ToolIndex } from "../types/index.js";
import { MCPClientConnection } from "./mcp-client.js";
/**
 * Manages connections to multiple MCP servers
 */
export declare class ServerPool {
    private connections;
    private config;
    constructor(config: MCPConfig);
    /**
     * Initialize connections to all configured servers
     */
    initialize(): Promise<void>;
    /**
     * Get list of all servers with their status
     */
    listServers(includeTools?: boolean): ServerInfo[];
    /**
     * Get connection to a specific server
     */
    getServer(name: string): MCPClientConnection | null;
    /**
     * Call a tool on a specific server
     */
    callTool(serverName: string, toolName: string, params: unknown): Promise<unknown>;
    /**
     * Get schema for a specific tool
     */
    getToolSchema(serverName: string, toolName: string): ToolSchema | null;
    /**
     * Get all tools across all servers as a flat index
     */
    getAllTools(): ToolIndex[];
    /**
     * Get total number of tools across all connected servers
     */
    getTotalToolCount(): number;
    /**
     * Disconnect from all servers
     */
    shutdown(): Promise<void>;
}
//# sourceMappingURL=server-pool.d.ts.map