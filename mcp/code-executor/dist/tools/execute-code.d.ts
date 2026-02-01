import type { ExecuteCodeInput, ExecutionResult, MCPConfig } from "../types/index.js";
import type { ServerPool } from "../bridge/server-pool.js";
/**
 * Execute JavaScript code in a sandboxed environment with access to MCP tools
 */
export declare function executeCode(pool: ServerPool, config: MCPConfig, input: ExecuteCodeInput): Promise<ExecutionResult>;
//# sourceMappingURL=execute-code.d.ts.map