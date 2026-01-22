import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { auth } from "@modelcontextprotocol/sdk/client/auth.js";
import { getTransportType } from "./config-loader.js";
import { CLIOAuthProvider } from "./oauth-provider.js";
/**
 * Wrapper around MCP SDK Client for connecting to individual MCP servers
 */
export class MCPClientConnection {
    name;
    config;
    client = null;
    transport = null;
    _status = "disconnected";
    _tools = [];
    _error = null;
    oauthProvider = null;
    constructor(name, config) {
        this.name = name;
        this.config = config;
    }
    get status() {
        return this._status;
    }
    get tools() {
        return this._tools;
    }
    get error() {
        return this._error;
    }
    /**
     * Connect to the MCP server
     */
    async connect() {
        const transportType = getTransportType(this.config);
        try {
            this._status = "connecting";
            console.error(`[mcp-client] Connecting to ${this.name} (${transportType})...`);
            if (transportType === "stdio") {
                await this.connectStdio();
            }
            else if (transportType === "http" || transportType === "sse") {
                await this.connectHttp();
            }
            else {
                throw new Error(`Unsupported transport type: ${transportType}`);
            }
            // Fetch tools
            await this.refreshTools();
            this._status = "connected";
            console.error(`[mcp-client] Connected to ${this.name} (${this._tools.length} tools)`);
        }
        catch (error) {
            this._status = "error";
            this._error = error instanceof Error ? error.message : String(error);
            console.error(`[mcp-client] Failed to connect to ${this.name}:`, this._error);
        }
    }
    /**
     * Connect using stdio transport
     */
    async connectStdio() {
        if (!this.config.command) {
            throw new Error("No command specified for stdio transport");
        }
        this.transport = new StdioClientTransport({
            command: this.config.command,
            args: this.config.args || [],
            env: { ...process.env, ...this.config.env }
        });
        this.client = new Client({ name: "code-executor", version: "1.0.0" }, { capabilities: {} });
        await this.client.connect(this.transport);
    }
    /**
     * Connect using HTTP/SSE transport with OAuth support
     */
    async connectHttp() {
        if (!this.config.url) {
            throw new Error("No URL specified for HTTP transport");
        }
        const serverUrl = new URL(this.config.url);
        this.oauthProvider = new CLIOAuthProvider(this.name);
        // Check if we have existing tokens
        const existingTokens = await this.oauthProvider.tokens();
        if (existingTokens) {
            console.error(`[mcp-client] ${this.name} has existing tokens, attempting connection...`);
            // Create transport and client with existing tokens
            this.transport = new StreamableHTTPClientTransport(serverUrl, {
                authProvider: this.oauthProvider
            });
            this.client = new Client({ name: "code-executor", version: "1.0.0" }, { capabilities: {} });
            try {
                await this.client.connect(this.transport);
                return; // Success with existing tokens
            }
            catch (error) {
                console.error(`[mcp-client] ${this.name} connection with existing tokens failed:`, error);
                // Clear tokens and fall through to OAuth flow
                this.oauthProvider.clearTokens();
            }
        }
        // No tokens or tokens failed - need to do OAuth flow
        console.error(`[mcp-client] ${this.name} initiating OAuth flow...`);
        // Perform OAuth flow
        const result = await auth(this.oauthProvider, {
            serverUrl: serverUrl.toString()
        });
        if (result === "REDIRECT") {
            // Wait for user to complete authorization
            console.error(`[mcp-client] Waiting for authorization...`);
            const code = await this.oauthProvider.waitForAuthorizationCode();
            console.error(`[mcp-client] Got authorization code, exchanging for tokens...`);
            // Complete the auth flow
            try {
                const authResult = await auth(this.oauthProvider, {
                    serverUrl: serverUrl.toString(),
                    authorizationCode: code
                });
                console.error(`[mcp-client] Token exchange result: ${authResult}`);
            }
            catch (authError) {
                console.error(`[mcp-client] Token exchange failed:`, authError);
                throw authError;
            }
            // Verify tokens were saved
            const tokens = await this.oauthProvider.tokens();
            if (!tokens) {
                throw new Error("OAuth completed but no tokens were saved");
            }
            console.error(`[mcp-client] Tokens saved successfully`);
        }
        // Connect with new tokens
        console.error(`[mcp-client] ${this.name} connecting with fresh tokens...`);
        this.transport = new StreamableHTTPClientTransport(serverUrl, {
            authProvider: this.oauthProvider
        });
        this.client = new Client({ name: "code-executor", version: "1.0.0" }, { capabilities: {} });
        await this.client.connect(this.transport);
    }
    /**
     * Refresh the list of available tools
     */
    async refreshTools() {
        if (!this.client || this._status !== "connected" && this._status !== "connecting") {
            return;
        }
        try {
            const response = await this.client.listTools();
            this._tools = (response.tools || []).map(tool => ({
                name: tool.name,
                description: tool.description || "",
                inputSchema: tool.inputSchema,
                annotations: tool.annotations
            }));
        }
        catch (error) {
            console.error(`[mcp-client] Failed to list tools for ${this.name}:`, error);
            this._tools = [];
        }
    }
    /**
     * Call a tool on this server
     */
    async callTool(toolName, params) {
        if (!this.client || this._status !== "connected") {
            throw new Error(`Server ${this.name} is not connected (status: ${this._status})`);
        }
        const response = await this.client.callTool({
            name: toolName,
            arguments: params
        });
        // Extract content from response
        if (response.content && Array.isArray(response.content)) {
            if (response.content.length === 1) {
                const item = response.content[0];
                if (item.type === "text") {
                    // Try to parse as JSON
                    try {
                        return JSON.parse(item.text);
                    }
                    catch {
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
    getToolSchema(toolName) {
        return this._tools.find(t => t.name === toolName) ?? null;
    }
    /**
     * Disconnect from the server
     */
    async disconnect() {
        if (this.client) {
            try {
                await this.client.close();
            }
            catch (error) {
                console.error(`[mcp-client] Error disconnecting from ${this.name}:`, error);
            }
        }
        this.client = null;
        this.transport = null;
        this._status = "disconnected";
        this._tools = [];
    }
    /**
     * Clear OAuth tokens for this server (forces re-authentication)
     */
    clearAuthTokens() {
        if (this.oauthProvider) {
            this.oauthProvider.clearTokens();
        }
    }
}
//# sourceMappingURL=mcp-client.js.map