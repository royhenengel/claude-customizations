import { z } from "zod";
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
export type ServerStatus = "connected" | "disconnected" | "connecting" | "error";
export interface ServerInfo {
    name: string;
    status: ServerStatus;
    toolCount: number;
    tools?: string[];
    error?: string;
}
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
export declare const ExecuteCodeInputSchema: z.ZodObject<{
    code: z.ZodString;
    timeout_ms: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    code: string;
    timeout_ms: number;
}, {
    code: string;
    timeout_ms?: number | undefined;
}>;
export type ExecuteCodeInput = z.infer<typeof ExecuteCodeInputSchema>;
export declare const SearchToolsInputSchema: z.ZodObject<{
    query: z.ZodString;
    detail: z.ZodDefault<z.ZodEnum<["minimal", "standard", "full"]>>;
    server: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    query: string;
    detail: "minimal" | "standard" | "full";
    limit: number;
    server?: string | undefined;
}, {
    query: string;
    detail?: "minimal" | "standard" | "full" | undefined;
    server?: string | undefined;
    limit?: number | undefined;
}>;
export type SearchToolsInput = z.infer<typeof SearchToolsInputSchema>;
export declare const GetToolSignatureInputSchema: z.ZodObject<{
    server: z.ZodString;
    tool: z.ZodString;
}, "strict", z.ZodTypeAny, {
    server: string;
    tool: string;
}, {
    server: string;
    tool: string;
}>;
export type GetToolSignatureInput = z.infer<typeof GetToolSignatureInputSchema>;
export declare const DEFAULT_TIMEOUT_MS = 30000;
export declare const MAX_TIMEOUT_MS = 300000;
export declare const DEFAULT_MEMORY_LIMIT_MB = 128;
//# sourceMappingURL=index.d.ts.map