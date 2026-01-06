import type { MCPConfig, MCPServerConfig } from "../types/index.js";
/**
 * Load MCP configuration from .mcp.json file
 */
export declare function loadMCPConfig(configPath?: string): MCPConfig;
/**
 * Get list of servers to connect to from environment or config
 */
export declare function getConnectedServers(config: MCPConfig): string[];
/**
 * Get configuration for a specific server
 */
export declare function getServerConfig(config: MCPConfig, serverName: string): MCPServerConfig | null;
/**
 * Determine transport type for a server
 */
export declare function getTransportType(server: MCPServerConfig): "stdio" | "http" | "sse";
//# sourceMappingURL=config-loader.d.ts.map