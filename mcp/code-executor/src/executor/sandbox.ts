import vm from "vm";
import type { ExecutionResult } from "../types/index.js";
import { DEFAULT_TIMEOUT_MS } from "../types/index.js";

/**
 * Sandboxed code execution using Node.js vm module
 *
 * Note: The vm module provides a basic sandbox but is not a security boundary.
 * It prevents accidental access to Node.js globals but determined code could
 * potentially escape. For this use case (executing code from Claude that only
 * calls MCP tools), this level of isolation is sufficient.
 */
export class Sandbox {
  private context: vm.Context | null = null;
  private logs: string[] = [];

  /**
   * Initialize the sandbox context with runtime functions
   */
  async initialize(runtime: {
    callMCPTool: (server: string, tool: string, params: unknown) => Promise<unknown>;
    listServers: () => unknown;
    getToolSchema: (server: string, tool: string) => Promise<unknown>;
  }): Promise<void> {
    this.logs = [];

    // Create a minimal sandbox context
    const sandbox = {
      // Runtime functions
      callMCPTool: runtime.callMCPTool,
      listServers: runtime.listServers,
      getToolSchema: runtime.getToolSchema,

      // Console that captures output
      console: {
        log: (...args: unknown[]) => {
          this.logs.push(args.map(a =>
            typeof a === "object" ? JSON.stringify(a) : String(a)
          ).join(" "));
        },
        error: (...args: unknown[]) => {
          this.logs.push("[ERROR] " + args.map(a =>
            typeof a === "object" ? JSON.stringify(a) : String(a)
          ).join(" "));
        },
        warn: (...args: unknown[]) => {
          this.logs.push("[WARN] " + args.map(a =>
            typeof a === "object" ? JSON.stringify(a) : String(a)
          ).join(" "));
        }
      },

      // Essential JS globals
      JSON,
      Array,
      Object,
      String,
      Number,
      Boolean,
      Date,
      Math,
      RegExp,
      Error,
      TypeError,
      RangeError,
      Promise,
      Map,
      Set,
      parseInt,
      parseFloat,
      isNaN,
      isFinite,
      encodeURIComponent,
      decodeURIComponent,
      encodeURI,
      decodeURI,

      // Timeout functions (limited)
      setTimeout: (fn: () => void, ms: number) => setTimeout(fn, Math.min(ms, 5000)),
      clearTimeout
    };

    this.context = vm.createContext(sandbox);
  }

  /**
   * Execute code in the sandbox
   */
  async execute(code: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<ExecutionResult> {
    if (!this.context) {
      throw new Error("Sandbox not initialized");
    }

    const startTime = Date.now();
    this.logs = [];

    try {
      // Wrap code in async IIFE to support await and capture return value
      const wrappedCode = `
        (async () => {
          ${code}
        })()
      `;

      const script = new vm.Script(wrappedCode, {
        filename: "user-code.js"
      });

      const resultPromise = script.runInContext(this.context, {
        timeout: timeoutMs
      });

      // Wait for async result with timeout
      const result = await Promise.race([
        resultPromise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Execution timed out after ${timeoutMs}ms`)), timeoutMs)
        )
      ]);

      return {
        success: true,
        result,
        logs: this.logs.length > 0 ? this.logs : undefined,
        execution_ms: Date.now() - startTime
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      return {
        success: false,
        error: errorMessage,
        logs: this.logs.length > 0 ? this.logs : undefined,
        execution_ms: Date.now() - startTime
      };
    }
  }

  /**
   * Dispose of the sandbox (no-op for vm module)
   */
  dispose(): void {
    this.context = null;
    this.logs = [];
  }
}
