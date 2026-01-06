import type { ServerPool } from "../bridge/server-pool.js";
import type { GetToolSignatureInput } from "../types/index.js";
/**
 * Get the signature of a specific tool
 */
export declare function getToolSignature(pool: ServerPool, input: GetToolSignatureInput): Promise<{
    server: string;
    tool: string;
    signature: string;
    description: string;
    annotations?: Record<string, unknown>;
}>;
//# sourceMappingURL=get-signature.d.ts.map