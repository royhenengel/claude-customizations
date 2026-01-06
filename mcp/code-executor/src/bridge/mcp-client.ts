import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import type { MCPServerConfig, ToolSchema, ServerStatus } from "../types/index.js";
import { getTransportType } from "./config-loader.js";

/**
 * Wrapper around MCP SDK Client for connecting to individual MCP servers
 */
export class MCPClientConnection {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;
  private _status: ServerStatus = "disconnected";
  private _tools: ToolSchema[] = [];
  private _error: string | null = null;

  constructor(
    public readonly name: string,
    private config: MCPServerConfig
  ) {}

  get status(): ServerStatus {
    return this._status;
  }

  get tools(): ToolSchema[] {
    return this._tools;
  }

  get error(): string | null {
    return this._error;
  }

  /**
   * Connect to the MCP server
   */
  async connect(): Promise<void> {
    const transportType = getTransportType(this.config);

    if (transportType !== "stdio") {
      this._status = "error";
      this._error = `Transport type '${transportType}' not yet supported`;
      console.error(`[mcp-client] ${this.name}: ${this._error}`);
      return;
    }

    if (!this.config.command) {
      this._status = "error";
      this._error = "No command specified for stdio transport";
      console.error(`[mcp-client] ${this.name}: ${this._error}`);
      return;
    }

    try {
      this._status = "connecting";
      console.error(`[mcp-client] Connecting to ${this.name}...`);

      // Create transport using the MCP SDK's expected format
      this.transport = new StdioClientTransport({
        command: this.config.command,
        args: this.config.args || [],
        env: { ...process.env, ...this.config.env } as Record<string, string>
      });

      // Create client
      this.client = new Client(
        { name: "code-executor", version: "1.0.0" },
        { capabilities: {} }
      );

      // Connect
      await this.client.connect(this.transport);

      // Fetch tools
      await this.refreshTools();

      this._status = "connected";
      console.error(`[mcp-client] Connected to ${this.name} (${this._tools.length} tools)`);
    } catch (error) {
      this._status = "error";
      this._error = error instanceof Error ? error.message : String(error);
      console.error(`[mcp-client] Failed to connect to ${this.name}:`, this._error);
    }
  }

  /**
   * Refresh the list of available tools
   */
  async refreshTools(): Promise<void> {
    if (!this.client || this._status !== "connected" && this._status !== "connecting") {
      return;
    }

    try {
      const response = await this.client.listTools();
      this._tools = (response.tools || []).map(tool => ({
        name: tool.name,
        description: tool.description || "",
        inputSchema: tool.inputSchema as Record<string, unknown>,
        annotations: tool.annotations as ToolSchema["annotations"]
      }));
    } catch (error) {
      console.error(`[mcp-client] Failed to list tools for ${this.name}:`, error);
      this._tools = [];
    }
  }

  /**
   * Call a tool on this server
   */
  async callTool(toolName: string, params: unknown): Promise<unknown> {
    if (!this.client || this._status !== "connected") {
      throw new Error(`Server ${this.name} is not connected (status: ${this._status})`);
    }

    const response = await this.client.callTool({
      name: toolName,
      arguments: params as Record<string, unknown>
    });

    // Extract content from response
    if (response.content && Array.isArray(response.content)) {
      if (response.content.length === 1) {
        const item = response.content[0];
        if (item.type === "text") {
          // Try to parse as JSON
          try {
            return JSON.parse(item.text);
          } catch {
            return item.text;
          }
        }
        return item;
      }
      return response.content;
    }

    return response;
  }

  /**
   * Get schema for a specific tool
   */
  getToolSchema(toolName: string): ToolSchema | null {
    return this._tools.find(t => t.name === toolName) ?? null;
  }

  /**
   * Disconnect from the server
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      try {
        await this.client.close();
      } catch (error) {
        console.error(`[mcp-client] Error disconnecting from ${this.name}:`, error);
      }
    }
    this.client = null;
    this.transport = null;
    this._status = "disconnected";
    this._tools = [];
  }
}
