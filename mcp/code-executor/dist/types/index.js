import { z } from "zod";
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
export const GetToolSignatureInputSchema = z.object({
    server: z.string()
        .min(1, "Server name is required")
        .describe("Name of the MCP server"),
    tool: z.string()
        .min(1, "Tool name is required")
        .describe("Name of the tool")
}).strict();
// Constants
export const DEFAULT_TIMEOUT_MS = 30000;
export const MAX_TIMEOUT_MS = 300000;
export const DEFAULT_MEMORY_LIMIT_MB = 128;
//# sourceMappingURL=index.js.map