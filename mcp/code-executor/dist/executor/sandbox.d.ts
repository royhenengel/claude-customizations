import type { ExecutionResult } from "../types/index.js";
/**
 * Sandboxed code execution using Node.js vm module
 *
 * Note: The vm module provides a basic sandbox but is not a security boundary.
 * It prevents accidental access to Node.js globals but determined code could
 * potentially escape. For this use case (executing code from Claude that only
 * calls MCP tools), this level of isolation is sufficient.
 */
export declare class Sandbox {
    private context;
    private logs;
    /**
     * Initialize the sandbox context with runtime functions
     */
    initialize(runtime: {
        callMCPTool: (server: string, tool: string, params: unknown) => Promise<unknown>;
        listServers: () => unknown;
        getToolSchema: (server: string, tool: string) => unknown;
    }): Promise<void>;
    /**
     * Execute code in the sandbox
     */
    execute(code: string, timeoutMs?: number): Promise<ExecutionResult>;
    /**
     * Dispose of the sandbox (no-op for vm module)
     */
    dispose(): void;
}
//# sourceMappingURL=sandbox.d.ts.map