import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import type { MCPConfig, MCPServerConfig } from "../types/index.js";

/**
 * Load MCP configuration from .mcp.json file
 */
export function loadMCPConfig(configPath?: string): MCPConfig {
  // Priority: explicit path > env var > default locations
  const paths = [
    configPath,
    process.env.MCP_CONFIG_PATH,
    resolve(process.cwd(), ".mcp.json"),
    resolve(process.env.HOME || "~", ".claude", ".mcp.json")
  ].filter(Boolean) as string[];

  for (const path of paths) {
    if (existsSync(path)) {
      try {
        const content = readFileSync(path, "utf-8");
        const config = JSON.parse(content) as MCPConfig;
        console.error(`[config-loader] Loaded config from: ${path}`);
        return config;
      } catch (error) {
        console.error(`[config-loader] Failed to parse ${path}:`, error);
      }
    }
  }

  console.error("[config-loader] No .mcp.json found, using empty config");
  return { mcpServers: {} };
}

/**
 * Get list of servers to connect to from environment or config
 */
export function getConnectedServers(config: MCPConfig): string[] {
  const envServers = process.env.CONNECTED_SERVERS;

  if (envServers) {
    // Filter to only servers that exist in config and are not disabled
    return envServers.split(",")
      .map(s => s.trim())
      .filter(name => {
        const server = config.mcpServers[name];
        return server && !server.disabled;
      });
  }

  // Default: all non-disabled servers except ourselves
  return Object.entries(config.mcpServers)
    .filter(([name, server]) =>
      name !== "code-executor" && !server.disabled
    )
    .map(([name]) => name);
}

/**
 * Get configuration for a specific server
 */
export function getServerConfig(
  config: MCPConfig,
  serverName: string
): MCPServerConfig | null {
  return config.mcpServers[serverName] ?? null;
}

/**
 * Determine transport type for a server
 */
export function getTransportType(
  server: MCPServerConfig
): "stdio" | "http" | "sse" {
  if (server.transport) {
    return server.transport;
  }

  // Infer from config
  if (server.url) {
    return server.url.includes("/sse") ? "sse" : "http";
  }

  if (server.command) {
    return "stdio";
  }

  return "stdio";
}
