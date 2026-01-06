import { z } from "zod";

// Server configuration from .mcp.json
export interface MCPServerConfig {
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  url?: string;
  transport?: "stdio" | "http" | "sse";
  disabled?: boolean;
}

export interface MCPConfig {
  mcpServers: Record<string, MCPServerConfig>;
}

// Server connection status
export type ServerStatus = "connected" | "disconnected" | "connecting" | "error";

export interface ServerInfo {
  name: string;
  status: ServerStatus;
  toolCount: number;
  tools?: string[];
  error?: string;
}

// Tool schema types
export interface ToolSchema {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: {
    readOnlyHint?: boolean;
    destructiveHint?: boolean;
    idempotentHint?: boolean;
    openWorldHint?: boolean;
  };
}

export interface ToolIndex {
  server: string;
  tool: string;
  description: string;
  inputSchema?: Record<string, unknown>;
}

// Execution types
export interface ExecutionResult {
  success: boolean;
  result?: unknown;
  error?: string;
  logs?: string[];
  execution_ms: number;
}

export interface ExecutionContext {
  callMCPTool: (server: string, tool: string, params: unknown) => Promise<unknown>;
  listServers: () => ServerInfo[];
  getToolSchema: (server: string, tool: string) => ToolSchema | null;
}

// Zod schemas for tool inputs
export const ExecuteCodeInputSchema = z.object({
  code: z.string()
    .min(1, "Code cannot be empty")
    .describe("JavaScript/TypeScript code to execute"),
  timeout_ms: z.number()
    .int()
    .min(1000)
    .max(300000)
    .default(30000)
    .describe("Execution timeout in milliseconds (default: 30000, max: 300000)")
}).strict();

export type ExecuteCodeInput = z.infer<typeof ExecuteCodeInputSchema>;

export const SearchToolsInputSchema = z.object({
  query: z.string()
    .min(1, "Query cannot be empty")
    .describe("Search term to match against tool names and descriptions"),
  detail: z.enum(["minimal", "standard", "full"])
    .default("standard")
    .describe("Level of detail in results"),
  server: z.string()
    .optional()
    .describe("Filter to tools from a specific server"),
  limit: z.number()
    .int()
    .min(1)
    .max(100)
    .default(10)
    .describe("Maximum number of results to return")
}).strict();

export type SearchToolsInput = z.infer<typeof SearchToolsInputSchema>;

export const GetToolSignatureInputSchema = z.object({
  server: z.string()
    .min(1, "Server name is required")
    .describe("Name of the MCP server"),
  tool: z.string()
    .min(1, "Tool name is required")
    .describe("Name of the tool")
}).strict();

export type GetToolSignatureInput = z.infer<typeof GetToolSignatureInputSchema>;

// Constants
export const DEFAULT_TIMEOUT_MS = 30000;
export const MAX_TIMEOUT_MS = 300000;
export const DEFAULT_MEMORY_LIMIT_MB = 128;
