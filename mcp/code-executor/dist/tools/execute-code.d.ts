import type { ExecuteCodeInput, ExecutionResult } from "../types/index.js";
import type { ServerPool } from "../bridge/server-pool.js";
/**
 * Execute JavaScript code in a sandboxed environment with access to MCP tools
 */
export declare function executeCode(pool: ServerPool, input: ExecuteCodeInput): Promise<ExecutionResult>;
//# sourceMappingURL=execute-code.d.ts.map