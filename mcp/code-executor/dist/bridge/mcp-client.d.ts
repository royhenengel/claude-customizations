import type { MCPServerConfig, ToolSchema, ServerStatus } from "../types/index.js";
/**
 * Wrapper around MCP SDK Client for connecting to individual MCP servers
 */
export declare class MCPClientConnection {
    readonly name: string;
    private config;
    private client;
    private transport;
    private _status;
    private _tools;
    private _error;
    constructor(name: string, config: MCPServerConfig);
    get status(): ServerStatus;
    get tools(): ToolSchema[];
    get error(): string | null;
    /**
     * Connect to the MCP server
     */
    connect(): Promise<void>;
    /**
     * Refresh the list of available tools
     */
    refreshTools(): Promise<void>;
    /**
     * Call a tool on this server
     */
    callTool(toolName: string, params: unknown): Promise<unknown>;
    /**
     * Get schema for a specific tool
     */
    getToolSchema(toolName: string): ToolSchema | null;
    /**
     * Disconnect from the server
     */
    disconnect(): Promise<void>;
}
//# sourceMappingURL=mcp-client.d.ts.map