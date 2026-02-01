import type { ExecuteCodeInput, ExecutionResult, MCPConfig } from "../types/index.js";
import { Sandbox } from "../executor/sandbox.js";
import { SandboxRuntime } from "../executor/runtime.js";
import type { ServerPool } from "../bridge/server-pool.js";

/**
 * Execute JavaScript code in a sandboxed environment with access to MCP tools
 */
export async function executeCode(
  pool: ServerPool,
  config: MCPConfig,
  input: ExecuteCodeInput
): Promise<ExecutionResult> {
  // Create fresh sandbox for each execution
  const sandbox = new Sandbox();
  const runtime = new SandboxRuntime(pool, config);

  try {
    // Initialize sandbox with runtime functions
    await sandbox.initialize(runtime.getRuntime());

    // Execute the code
    const result = await sandbox.execute(input.code, input.timeout_ms);

    return result;
  } finally {
    // Always clean up
    sandbox.dispose();
  }
}
